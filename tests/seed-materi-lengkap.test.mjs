import assert from 'node:assert/strict'
import test from 'node:test'
import { readFile } from 'node:fs/promises'
import { randomUUID } from 'node:crypto'
import { PGlite } from '@electric-sql/pglite'
import {
  completeSeedData,
  generateCompleteSeedSql,
} from '../scripts/generate-seed-materi-lengkap.mjs'
import { generateSeed, seedId } from '../scripts/generate-database-seed.mjs'
import { materialBlocks } from '../frontend/src/lib/materialBlocks.js'

test('Seed komik: 3 mapel ×6 kelas ×2 bab, scenes CRA dan 2 easy/2 medium/2 hard', () => {
  const data = completeSeedData()
  assert.deepEqual(
    data.subjects.map((s) => [s.slug, s.island, s.mascot, s.character]),
    [
      ['matematika', 'Pulau Numeria', 'Kapten Rubi', 'rubi'],
      ['bahasa-indonesia', 'Pulau Kata', 'Bobo', 'bobo'],
      ['ipa', 'Pulau Eksplora', 'Ilmuwan Tobi', 'tobi'],
    ],
  )
  assert.equal(data.lessons.length, 36)
  assert.equal(new Set(data.lessons.map((l) => l.slug)).size, 36)
  const ids = new Set()
  for (const subject of data.subjects)
    for (let grade = 1; grade <= 6; grade++)
      assert.equal(
        data.lessons.filter((l) => l.subject === subject.slug && l.grade === grade).length,
        2,
      )
  for (const lesson of data.lessons) {
    assert.equal(lesson.status, 'published')
    assert.equal(lesson.content.video_url, '')
    assert.equal(lesson.content.scenes[0].stage, 'concrete')
    assert.equal(lesson.content.scenes[0].emotion, 'kaget')
    assert.ok(lesson.content.scenes.some((s) => s.stage === 'representational'))
    assert.ok(lesson.content.scenes.some((s) => s.stage === 'abstract'))
    for (const scene of lesson.content.scenes) {
      if (scene.type === 'dialog')
        assert.ok(scene.speaker && scene.emotion && scene.text.length > 30)
      else if (scene.type === 'comic_panel') {
        assert.equal(scene.image_url, '/images/lessons/default-illustration.webp')
        assert.ok(scene.caption.length > 30)
      } else {
        assert.equal(scene.type, 'mini_check')
        assert.equal(new Set(scene.options).size, 3)
        assert.ok(scene.correct_index >= 0 && scene.correct_index <= 2)
        assert.ok(scene.feedback)
        assert.ok(!lesson.questions.some((q) => q.prompt === scene.question))
      }
    }
    for (const difficulty of ['easy', 'medium', 'hard'])
      assert.equal(lesson.questions.filter((q) => q.difficulty === difficulty).length, 2)
    assert.equal(new Set(lesson.questions.map((q) => q.prompt)).size, 6)
    for (const question of lesson.questions) {
      assert.ok(!ids.has(question.id))
      ids.add(question.id)
      assert.equal(new Set(question.options.map((s) => s.trim().toLowerCase())).size, 4)
      assert.ok(question.options.every((s) => typeof s === 'string' && s.trim()))
      assert.ok(
        Number.isInteger(question.correct_option) &&
          question.correct_option >= 0 &&
          question.correct_option < 4,
      )
      assert.ok(question.explanation.trim().length > 20)
      assert.equal(question.status, 'published')
    }
  }
  assert.equal(ids.size, 216)
})

test('File SQL sesuai generator dan memakai target conflict tiga kolom yang diminta', async () => {
  const sql = await readFile(
    new URL('../database/seed_materi_lengkap.sql', import.meta.url),
    'utf8',
  )
  assert.equal(sql, generateCompleteSeedSql())
  assert.equal((sql.match(/ON CONFLICT \(subject_id, grade, slug\) DO UPDATE/g) || []).length, 36)
  assert.equal((sql.match(/INSERT INTO public\.questions/g) || []).length, 36)
  // Anggaran ukuran mencegah teks cadangan berulang kembali tersimpan di DB.
  assert.ok(Buffer.byteLength(sql) < 360_000)
  const lessons = completeSeedData().lessons
  assert.ok(
    lessons.reduce((size, l) => size + Buffer.byteLength(JSON.stringify(l.content)), 0) < 160_000,
  )
  assert.ok(lessons.every((l) => l.content.blocks.length === 0))
  assert.match(
    sql,
    /CREATE UNIQUE INDEX IF NOT EXISTS lessons_subject_grade_slug_seed_lengkap_uidx/,
  )
  assert.match(sql, /INSERT INTO private\.question_keys/)
  assert.match(sql, /GRANT SELECT \(id,lesson_id,author_id,prompt,options,difficulty,status\)/)
})

test('Tiga contoh pengguna menggantikan bab sepadan dengan pengajaran dan bank soal yang selaras', () => {
  const lessons = completeSeedData().lessons
  const merged = lessons.filter((lesson) => lesson.content.source_example)
  assert.deepEqual(merged.map((l) => l.title).sort(), [
    'Membaca Peta Data & Membandingkan Pecahan Bekal',
    'Misi Detektif Bobo: Menemukan Ide Pokok Cerita!',
    'Rahasia Dapur Hijau: Bagaimana Tumbuhan Memasak?',
  ])
  for (const lesson of merged) {
    assert.equal(lesson.id, seedId(lesson.slug))
    assert.equal(lesson.questions.length, 6)
    assert.ok(!lessons.some((other) => other.slug === lesson.content.source_example.slug))
    const fallback = materialBlocks(lesson.content)
      .map((b) => b.body)
      .join('\n')
    for (const scene of lesson.content.scenes.filter((s) => s.type !== 'mini_check'))
      assert.ok(fallback.includes(scene.text || scene.caption))
    assert.ok(lesson.content.source_example.source_title)
    assert.equal(
      materialBlocks(lesson.content).find((b) => b.heading === 'Pembahasan tebak cepat')
        .collapsible,
      true,
    )
  }
  const math = merged.find((l) => l.subject === 'matematika')
  const mean = math.questions.find((q) => q.prompt.includes('rata-rata'))
  assert.equal(mean.options[mean.correct_option], '20 kg')
  assert.match(
    materialBlocks(math.content)
      .map((b) => b.body)
      .join('\n'),
    /80÷4=20/,
  )
  const ipa = merged.find((l) => l.subject === 'ipa')
  const scienceText = JSON.stringify(ipa.content)
  assert.match(scienceText, /Klorofil adalah zat warna hijau/)
  assert.match(scienceText, /Ubah hanya kondisi cahaya/)
  assert.doesNotMatch(scienceText, /karbon dioksida \(udara kotor\/panas\)/i)
  const language = merged.find((l) => l.subject === 'bahasa-indonesia')
  assert.match(JSON.stringify(language.content), /tersirat/)
  assert.equal(language.phase, 'B')
  assert.equal(math.phase, 'C')
})

test(
  'SQL komik kompatibel migration proyek, aman diulang, kunci privat dan RPC tetap bekerja',
  { timeout: 120000 },
  async (t) => {
    const db = new PGlite()
    t.after(() => db.close())
    await db.exec(`create role anon; create role authenticated; create schema auth;
    create table auth.users(id uuid primary key,raw_user_meta_data jsonb default '{}');
    create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;
    grant usage on schema public,auth to anon,authenticated;
    create schema storage;
    create table storage.buckets(id text primary key,name text,public boolean,file_size_limit bigint,allowed_mime_types text[]);
    create table storage.objects(id uuid primary key default gen_random_uuid(),bucket_id text,name text);
    alter table storage.objects enable row level security;
    grant usage on schema storage to authenticated;
    grant select,insert,update,delete on storage.objects to authenticated;
    alter default privileges in schema public grant all on tables to anon,authenticated;
    alter default privileges in schema public grant execute on functions to anon,authenticated;`)
    for (const file of [
      '202610160001_initial_schema.sql',
      '202610160002_platform_features.sql',
      '202610160003_private_storage.sql',
      '202610160004_editor_questions.sql',
    ])
      await db.exec(
        await readFile(new URL(`../database/migrations/${file}`, import.meta.url), 'utf8'),
      )
    await db.exec(generateSeed())
    const existingIpa = randomUUID(),
      existingLesson = randomUUID()
    await db.query("insert into public.subjects(id,name,slug) values($1,'IPA sebelumnya','ipa')", [
      existingIpa,
    ])
    await db.query(
      "insert into public.lessons(id,subject_id,title,slug,grade,phase) values($1,$2,'Materi sebelumnya','komik-matematika-kelas-1-bab-1',1,'A')",
      [existingLesson, seedId('matematika')],
    )
    // Simulasikan versi sebelumnya yang sudah dipasang: ID khusus harus tetap dipakai.
    const oldRevisedLessonId = randomUUID()
    const revisedIpa = completeSeedData().lessons.find((l) => l.slug === 'komik-ipa-kelas-4-bab-1')
    await db.query(
      "insert into public.lessons(id,subject_id,title,slug,grade,phase) values($1,$2,'Fotosintesis versi lama',$3,4,'B')",
      [oldRevisedLessonId, existingIpa, revisedIpa.slug],
    )
    for (const question of revisedIpa.questions)
      await db.query(
        'insert into public.questions(id,lesson_id,prompt,options) values($1,$2,$3,$4)',
        [question.id, oldRevisedLessonId, 'Pertanyaan versi lama', question.options],
      )
    const sql = generateCompleteSeedSql()
    await db.exec(sql)
    const scope = "l.content->>'package_id'='seed-materi-lengkap-cra-v1'"
    const counts = async () =>
      (
        await db.query(
          `select count(distinct l.id)::int lessons,count(q.id)::int questions from public.lessons l join public.questions q on q.lesson_id=l.id where ${scope}`,
        )
      ).rows[0]
    await t.test('Published 36/216, cakupan tiap kelas dan label kesulitan tepat', async () => {
      assert.deepEqual(await counts(), { lessons: 36, questions: 216 })
      const groups = (
        await db.query(
          `select s.slug,l.grade,count(distinct l.id)::int n from public.lessons l join public.subjects s on s.id=l.subject_id where ${scope} group by s.slug,l.grade`,
        )
      ).rows
      assert.equal(groups.length, 18)
      assert.ok(groups.every((g) => g.n === 2))
      const bad = (
        await db.query(
          `select l.id from public.lessons l where ${scope} and (l.status<>'published' or not private.valid_content(l.content) or jsonb_typeof(l.content->'scenes')<>'array')`,
        )
      ).rows
      assert.deepEqual(bad, [])
      const tiers = (
        await db.query(
          `select q.lesson_id,q.difficulty,count(*)::int n from public.questions q join public.lessons l on l.id=q.lesson_id where ${scope} group by q.lesson_id,q.difficulty`,
        )
      ).rows
      assert.equal(tiers.length, 108)
      assert.ok(tiers.every((g) => g.n === 2 && ['easy', 'medium', 'hard'].includes(g.difficulty)))
      const mismatch = (
        await db.query(
          `select q.id from public.questions q join public.lessons l on l.id=q.lesson_id left join private.question_keys k on k.question_id=q.id where ${scope} and (q.status<>'published' or q.correct_option is null or q.explanation is null or k.correct_option is distinct from q.correct_option or k.explanation is distinct from q.explanation)`,
        )
      ).rows
      assert.deepEqual(mismatch, [])
    })
    await t.test(
      'Penggabungan memperbarui bab dan enam soal lama tanpa mengganti hubungan lesson_id',
      async () => {
        const lesson = (
          await db.query('select id,title,content from public.lessons where slug=$1', [
            revisedIpa.slug,
          ])
        ).rows[0]
        assert.equal(lesson.id, oldRevisedLessonId)
        assert.equal(lesson.title, revisedIpa.title)
        assert.equal(lesson.content.source_example.slug, 'fotosintesis-tumbuhan-kelas-4')
        const updated = (
          await db.query('select id,prompt,status from public.questions where lesson_id=$1', [
            oldRevisedLessonId,
          ])
        ).rows
        assert.equal(updated.length, 6)
        assert.ok(
          updated.every((q) => q.status === 'published' && q.prompt !== 'Pertanyaan versi lama'),
        )
        assert.deepEqual(
          updated.map((q) => q.id).sort(),
          revisedIpa.questions.map((q) => q.id).sort(),
        )
      },
    )
    await t.test('Seed identik tidak menulis ulang row materi, soal dan kunci', async () => {
      const versions = async () =>
        (
          await db.query(`
        select 'subject' kind,id::text,xmin::text version from public.subjects where slug in ('matematika','bahasa-indonesia','ipa')
        union all select 'lesson',id::text,xmin::text from public.lessons l where ${scope}
        union all select 'question',q.id::text,q.xmin::text from public.questions q join public.lessons l on l.id=q.lesson_id where ${scope}
        union all select 'key',k.question_id::text,k.xmin::text from private.question_keys k join public.questions q on q.id=k.question_id join public.lessons l on l.id=q.lesson_id where ${scope}
        order by kind,id`)
        ).rows
      const before = await versions()
      await db.exec(sql)
      assert.equal(before.length, 3 + 36 + 216 + 216)
      assert.deepEqual(await versions(), before)
    })
    await t.test(
      'Upsert memakai ID yang telah ada, mempertahankan mapel lama dan mengulang tanpa duplikasi',
      async () => {
        assert.equal(
          (await db.query("select id from public.subjects where slug='ipa'")).rows[0].id,
          existingIpa,
        )
        assert.equal(
          (
            await db.query(
              "select id from public.lessons where slug='komik-matematika-kelas-1-bab-1'",
            )
          ).rows[0].id,
          existingLesson,
        )
        assert.equal(
          (await db.query("select count(*)::int n from public.subjects where slug='ipas'")).rows[0]
            .n,
          1,
        )
        await db.query("update public.lessons set title='Uji rerun' where id=$1", [existingLesson])
        await db.exec(sql)
        assert.deepEqual(await counts(), { lessons: 36, questions: 216 })
        assert.equal(
          (await db.query('select title from public.lessons where id=$1', [existingLesson])).rows[0]
            .title,
          'Mengenal Angka 1–20',
        )
      },
    )
    const student = randomUUID(),
      admin = randomUUID()
    for (const id of [student, admin])
      await db.query('insert into auth.users(id,raw_user_meta_data) values($1,$2)', [
        id,
        { grade: 3, display_name: 'QA Komik' },
      ])
    await db.query("update public.profiles set role='admin' where id=$1", [admin])
    const as = async (id, task) => {
      await db.exec('set role authenticated')
      await db.query("select set_config('request.jwt.claim.sub',$1,false)", [id])
      try {
        return await task()
      } finally {
        await db.exec('reset role')
        await db.query("select set_config('request.jwt.claim.sub','',false)")
      }
    }
    await t.test(
      'Katalog terbit dapat dibaca, kolom kunci dan tabel privat ditolak dari klien',
      async () => {
        await as(student, async () => {
          assert.equal(
            (await db.query(`select id from public.lessons l where ${scope}`)).rows.length,
            36,
          )
          assert.deepEqual(
            (await db.query('select id,prompt,options,difficulty from public.questions')).rows,
            [],
          )
          await assert.rejects(
            db.query('select correct_option,explanation from public.questions'),
            /permission denied/,
          )
          await assert.rejects(db.query('select * from private.question_keys'), /permission denied/)
        })
        await as(admin, async () => {
          assert.ok((await db.query('select id from public.questions')).rows.length >= 216)
          await assert.rejects(
            db.query('select correct_option from public.questions'),
            /permission denied/,
          )
          const edited = (
            await db.query('select public.get_editor_questions($1) r', [existingLesson])
          ).rows[0].r
          assert.equal(edited.length, 6)
          assert.ok(edited.every((q) => Number.isInteger(q.correct_option)))
        })
      },
    )
    await t.test(
      'Enam soal tetap dapat dinilai RPC, respons awal tanpa kunci dan replay XP sekali',
      async () => {
        const lesson = (
          await db.query(
            "select id from public.lessons where slug='komik-matematika-kelas-3-bab-1'",
          )
        ).rows[0].id
        const quiz = await as(
          student,
          async () => (await db.query('select public.get_lesson_quiz($1) r', [lesson])).rows[0].r,
        )
        assert.equal(quiz.questions.length, 6)
        assert.doesNotMatch(JSON.stringify(quiz), /correct_option|explanation/)
        const answers = []
        for (const q of quiz.questions)
          answers.push({
            question_id: q.id,
            selected_option: (
              await db.query(
                'select correct_option from private.question_keys where question_id=$1',
                [q.id],
              )
            ).rows[0].correct_option,
          })
        const submit = () =>
          as(
            student,
            async () =>
              (
                await db.query('select public.submit_quiz_answers($1,$2) r', [
                  quiz.attempt_id,
                  answers,
                ])
              ).rows[0].r,
          )
        const first = await submit()
        assert.equal(first.score, 100)
        assert.equal(first.xp_earned, 65)
        await submit()
        assert.equal(
          (await db.query('select total_xp from public.profiles where id=$1', [student])).rows[0]
            .total_xp,
          65,
        )
      },
    )
    await t.test('Perubahan/hapus kunci oleh editor tidak meninggalkan mirror basi', async () => {
      const id = completeSeedData().lessons[0].questions[0].id
      await db.query(
        'update private.question_keys set correct_option=2,explanation=$2 where question_id=$1',
        [id, 'Pembahasan revisi untuk menguji sinkronisasi.'],
      )
      assert.equal(
        (await db.query('select correct_option from public.questions where id=$1', [id])).rows[0]
          .correct_option,
        2,
      )
      await db.query('delete from private.question_keys where question_id=$1', [id])
      assert.deepEqual(
        (
          await db.query('select correct_option,explanation from public.questions where id=$1', [
            id,
          ])
        ).rows[0],
        { correct_option: null, explanation: null },
      )
      await db.exec(sql)
      assert.deepEqual(await counts(), { lessons: 36, questions: 216 })
      assert.equal(
        (await db.query('select correct_option from public.questions where id=$1', [id])).rows[0]
          .correct_option,
        completeSeedData().lessons[0].questions[0].correct_option,
      )
    })
  },
)
