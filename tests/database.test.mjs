import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { randomUUID } from 'node:crypto'
import test from 'node:test'
import { PGlite } from '@electric-sql/pglite'
import { generateSeed, seedId } from '../scripts/generate-database-seed.mjs'

const migration = await readFile(
  new URL('../database/migrations/202610160001_initial_schema.sql', import.meta.url),
  'utf8',
)
const lessonId = seedId('matematika-3')
const secondLessonId = seedId('bahasa-indonesia-3')
const checkedInSeed = await readFile(new URL('../database/seed.sql', import.meta.url), 'utf8')
assert.equal(
  checkedInSeed,
  generateSeed(),
  'Seed yang dipasang harus sama dengan keluaran generator.',
)

test('Tahap 3: migration dan perilaku akses PostgreSQL lokal', { timeout: 120000 }, async (t) => {
  const db = new PGlite()
  t.after(async () => db.close())
  // HANYA fixture tes. Supabase asli sudah memiliki schema Auth dan role-role ini.
  await db.exec(`
    create role anon;
    create role authenticated;
    create schema auth;
    create table auth.users(id uuid primary key, raw_user_meta_data jsonb default '{}');
    create function auth.uid() returns uuid language sql stable as $$
      select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid
    $$;
    grant usage on schema public, auth to anon, authenticated;
    grant execute on function auth.uid() to anon, authenticated;
    alter default privileges in schema public grant all on tables to anon, authenticated;
    alter default privileges in schema public grant execute on functions to anon, authenticated;
  `)
  try {
    await db.exec(migration)
  } catch (error) {
    await db.exec('rollback')
    throw error
  }
  await db.exec(generateSeed())
  const verifySql = await readFile(new URL('../database/verify-setup.sql', import.meta.url), 'utf8')
  await db.exec(verifySql)

  async function asRole(userId, task, role = 'authenticated') {
    assert.ok(['authenticated', 'anon'].includes(role))
    await db.exec(`set role ${role}`)
    await db.query("select set_config('request.jwt.claim.sub', $1, false)", [userId || ''])
    try {
      return await task()
    } finally {
      await db.exec('reset role')
      await db.query("select set_config('request.jwt.claim.sub', '', false)")
    }
  }
  async function student(metadata = {}) {
    const id = randomUUID()
    await db.query('insert into auth.users(id,raw_user_meta_data) values($1,$2::jsonb)', [
      id,
      JSON.stringify(metadata),
    ])
    return id
  }
  async function rpc(userId, name, values, types) {
    assert.ok(
      [
        'get_lesson_quiz',
        'submit_quiz_answers',
        'complete_lesson_reading',
        'get_quiz_result',
      ].includes(name),
    )
    const params = values.map((_, i) => `$${i + 1}${types?.[i] ? `::${types[i]}` : ''}`).join(',')
    return asRole(
      userId,
      async () =>
        (await db.query(`select public.${name}(${params}) as result`, values)).rows[0].result,
    )
  }
  const start = (userId, id = lessonId, limit = 10) => rpc(userId, 'get_lesson_quiz', [id, limit])
  const submit = (userId, attemptId, answers) =>
    rpc(userId, 'submit_quiz_answers', [attemptId, JSON.stringify(answers)], ['uuid', 'jsonb'])
  async function answersFor(attemptId, correct = true) {
    const { rows } = await db.query(
      'select question_id,correct_option from private.quiz_session_questions where attempt_id=$1 order by position',
      [attemptId],
    )
    return rows.map((row) => ({
      question_id: row.question_id,
      selected_option: correct ? row.correct_option : (row.correct_option + 1) % 4,
    }))
  }
  const xp = async (userId) =>
    (await db.query('select total_xp from public.profiles where id=$1', [userId])).rows[0].total_xp

  await t.test(
    '10 tabel publik dan 2 tabel privat memiliki RLS; seed tetap draft dan idempoten',
    async () => {
      const { rows } = await db.query(
        "select relname,relrowsecurity from pg_class c join pg_namespace n on n.oid=c.relnamespace where n.nspname in ('public','private') and c.relkind='r'",
      )
      assert.equal(rows.length, 12)
      assert.ok(rows.every((row) => row.relrowsecurity))
      await db.exec(generateSeed())
      assert.equal((await db.query('select count(*)::int n from public.lessons')).rows[0].n, 36)
      assert.equal((await db.query('select count(*)::int n from public.questions')).rows[0].n, 185)
      assert.equal(
        (await db.query("select count(*)::int n from public.lessons where status='draft'")).rows[0]
          .n,
        36,
      )
    },
  )
  await t.test(
    'Tamu hanya melihat katalog aktif dan materi published; RPC kuis ditolak',
    async () => {
      await asRole(
        null,
        async () => {
          assert.equal((await db.query('select * from public.subjects')).rows.length, 6)
          assert.equal((await db.query('select * from public.lessons')).rows.length, 0)
          await assert.rejects(
            db.query('select public.get_lesson_quiz($1,10)', [lessonId]),
            /permission denied/,
          )
          await assert.rejects(db.query('select * from public.questions'), /permission denied/)
        },
        'anon',
      )
      // Publikasi hanya untuk fixture database dalam memori; seed berkas tetap DRAFT.
      await db.exec(
        "update public.lessons set status='published'; update public.questions set status='published'",
      )
    },
  )
  await t.test('Trigger memaksa student meskipun metadata mencoba admin/XP', async () => {
    const id = await student({
      display_name: 'Alya',
      grade: 'bukan-angka',
      role: 'admin',
      total_xp: 9999,
      avatar: 'unknown',
    })
    const profile = (await db.query('select * from public.profiles where id=$1', [id])).rows[0]
    assert.equal(profile.role, 'student')
    assert.equal(profile.grade, 1)
    assert.equal(profile.total_xp, 0)
    assert.equal(profile.level, 1)
    assert.equal(profile.avatar, 'fox')
  })
  await t.test('Siswa hanya membaca profil sendiri dan tidak dapat mengubah role/XP', async () => {
    const a = await student()
    const b = await student()
    await asRole(a, async () => {
      assert.equal((await db.query('select id from public.profiles')).rows.length, 1)
      assert.equal(
        (await db.query('select id from public.profiles where id=$1', [b])).rows.length,
        0,
      )
      await db.query("update public.profiles set display_name='Nara',grade=3 where id=$1", [a])
      await assert.rejects(
        db.query("update public.profiles set role='admin' where id=$1", [a]),
        /permission denied/,
      )
      await assert.rejects(
        db.query('update public.profiles set total_xp=999 where id=$1', [a]),
        /permission denied/,
      )
      await assert.rejects(
        db.query(
          "insert into public.xp_events(student_id,event_type,event_key,reference_id,amount) values($1,'quiz_first','fake',$2,100)",
          [a, lessonId],
        ),
        /permission denied/,
      )
    })
  })
  await t.test(
    'Sesi mengirim 5–10 soal tanpa kunci dan dilanjutkan dengan ID yang sama',
    async () => {
      const id = await student()
      const session = await start(id)
      assert.equal(session.questions.length, 10)
      const serialized = JSON.stringify(session)
      for (const secret of ['correct_option', 'explanation', 'selected_option'])
        assert.ok(!serialized.includes(secret))
      assert.equal((await start(id)).attempt_id, session.attempt_id)
      await assert.rejects(start(id, lessonId, 11), /5 sampai 10/)
      await assert.rejects(start(id, lessonId, null), /5 sampai 10/)
      await asRole(id, async () => {
        assert.equal((await db.query('select * from public.questions')).rows.length, 0)
        await assert.rejects(db.query('select * from private.question_keys'), /permission denied/)
        await assert.rejects(
          db.query('select * from private.quiz_session_questions'),
          /permission denied/,
        )
        await assert.rejects(
          db.query("select private.award_xp($1,'quiz_first','fake',$2,100)", [id, lessonId]),
          /permission denied/,
        )
      })
      await assert.rejects(rpc(id, 'get_quiz_result', [session.attempt_id]), /belum tersedia/)
    },
  )
  await t.test(
    'Jawaban kosong, null, opsi string/di luar rentang, duplikat dan soal asing ditolak',
    async () => {
      const id = await student()
      const session = await start(id)
      const valid = await answersFor(session.attempt_id)
      for (const bad of [
        null,
        [],
        valid.slice(1),
        valid.map(() => valid[0]),
        [{ ...valid[0], selected_option: 4 }, ...valid.slice(1)],
        [{ ...valid[0], selected_option: '1' }, ...valid.slice(1)],
        [{ ...valid[0], question_id: randomUUID() }, ...valid.slice(1)],
      ]) {
        await assert.rejects(submit(id, session.attempt_id, bad))
      }
      assert.equal(await xp(id), 0)
      assert.equal(
        (
          await db.query('select completed_at from public.quiz_attempts where id=$1', [
            session.attempt_id,
          ])
        ).rows[0].completed_at,
        null,
      )
    },
  )
  await t.test(
    'Skor di server, hadiah pertama, replay idempoten, hasil hanya untuk pemilik',
    async () => {
      const id = await student()
      const other = await student()
      const session = await start(id)
      const answers = await answersFor(session.attempt_id)
      await assert.rejects(submit(other, session.attempt_id, answers), /Sesi kuis tidak tersedia/)
      const result = await submit(id, session.attempt_id, answers)
      assert.equal(result.score, 100)
      assert.equal(result.xp_earned, 105)
      assert.equal(result.xp_granted_now, 105)
      assert.equal(result.details.length, 10)
      assert.equal(result.replayed, false)
      const replay = await submit(id, session.attempt_id, answers)
      assert.equal(replay.xp_granted_now, 0)
      assert.equal(replay.replayed, true)
      assert.equal(await xp(id), 105)
      await assert.rejects(
        submit(id, session.attempt_id, await answersFor(session.attempt_id, false)),
        /tidak dapat diubah/,
      )
      assert.equal((await rpc(id, 'get_quiz_result', [session.attempt_id])).score, 100)
      await assert.rejects(rpc(other, 'get_quiz_result', [session.attempt_id]), /belum tersedia/)
      await asRole(other, async () =>
        assert.equal(
          (await db.query('select * from public.quiz_attempts where id=$1', [session.attempt_id]))
            .rows.length,
          0,
        ),
      )
    },
  )
  await t.test(
    'Hadiah membaca sekali, level dihitung database, draft/inactive ditolak',
    async () => {
      const id = await student()
      assert.equal(await rpc(id, 'complete_lesson_reading', [lessonId]), 5)
      assert.equal(await rpc(id, 'complete_lesson_reading', [lessonId]), 0)
      const session = await start(id)
      await submit(id, session.attempt_id, await answersFor(session.attempt_id))
      const profile = (
        await db.query('select total_xp,level from public.profiles where id=$1', [id])
      ).rows[0]
      assert.deepEqual(profile, { total_xp: 110, level: 2 })
      await db.query("update public.lessons set status='draft' where id=$1", [secondLessonId])
      await assert.rejects(start(id, secondLessonId), /Materi tidak tersedia/)
      await assert.rejects(
        rpc(id, 'complete_lesson_reading', [secondLessonId]),
        /Materi tidak tersedia/,
      )
      await db.query("update public.lessons set status='published' where id=$1", [secondLessonId])
      await db.query('update public.subjects set is_active=false where id=$1', [
        seedId('matematika'),
      ])
      await assert.rejects(start(id), /Materi tidak tersedia/)
      await db.query('update public.subjects set is_active=true where id=$1', [
        seedId('matematika'),
      ])
    },
  )
  await t.test(
    'Remedial kurang dari 60 hanya memberi +3 sekali per hari secara global',
    async () => {
      const id = await student()
      let session = await start(id)
      await submit(id, session.attempt_id, await answersFor(session.attempt_id, false))
      assert.equal(await xp(id), 5)
      session = await start(id)
      assert.equal(
        (await submit(id, session.attempt_id, await answersFor(session.attempt_id, false)))
          .xp_granted_now,
        3,
      )
      session = await start(id)
      assert.equal(
        (await submit(id, session.attempt_id, await answersFor(session.attempt_id, false)))
          .xp_granted_now,
        0,
      )
      session = await start(id, secondLessonId)
      await submit(id, session.attempt_id, await answersFor(session.attempt_id, false))
      session = await start(id, secondLessonId)
      assert.equal(
        (await submit(id, session.attempt_id, await answersFor(session.attempt_id, false)))
          .xp_granted_now,
        0,
      )
      assert.equal(await xp(id), 13)
    },
  )
  await t.test('Sesi kedaluwarsa ditolak dan snapshot tahan perubahan bank soal', async () => {
    const id = await student()
    const session = await start(id)
    const answers = await answersFor(session.attempt_id)
    const questionId = answers[0].question_id
    const original = (
      await db.query('select correct_option from private.question_keys where question_id=$1', [
        questionId,
      ])
    ).rows[0].correct_option
    await db.query(
      'update private.question_keys set correct_option=($2+1)%4 where question_id=$1',
      [questionId, original],
    )
    assert.equal((await submit(id, session.attempt_id, answers)).score, 100)
    await db.query('update private.question_keys set correct_option=$2 where question_id=$1', [
      questionId,
      original,
    ])
    const expired = await start(id)
    await db.query(
      "update public.quiz_attempts set expires_at=now()-interval '1 minute' where id=$1",
      [expired.attempt_id],
    )
    await assert.rejects(
      submit(id, expired.attempt_id, await answersFor(expired.attempt_id)),
      /kedaluwarsa/,
    )
    assert.notEqual((await start(id)).attempt_id, expired.attempt_id)
  })
  await t.test(
    'Batas 20 sesi/jam diperiksa di server; tutor tidak memperoleh XP siswa',
    async () => {
      const id = await student()
      await db.query(
        "insert into public.quiz_attempts(student_id,lesson_id,total_questions,expires_at,started_at) select $1,$2,5,now()-interval '1 minute',now()-interval '2 minutes' from generate_series(1,20)",
        [id, lessonId],
      )
      await assert.rejects(start(id), /Batas sesi/)
      const tutor = await student()
      await db.query("update public.profiles set role='tutor' where id=$1", [tutor])
      await assert.rejects(start(tutor), /Akses siswa/)
      await assert.rejects(rpc(tutor, 'complete_lesson_reading', [lessonId]), /Akses siswa/)
    },
  )
  await t.test('Migration kedua berhenti tanpa menghapus data yang sudah ada', async () => {
    await assert.rejects(db.exec(migration), /Database sudah memiliki profiles/)
    await db.exec('rollback')
    assert.equal((await db.query('select count(*)::int n from public.lessons')).rows[0].n, 36)
  })
})
