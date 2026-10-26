import assert from 'node:assert/strict'
import test from 'node:test'
import { readFile } from 'node:fs/promises'
import { randomUUID } from 'node:crypto'
import { PGlite } from '@electric-sql/pglite'
import { generateSeed, seedId } from '../scripts/generate-database-seed.mjs'
import { generateCurriculumSeed } from '../scripts/generate-curriculum-draft.mjs'
import { generateTextbookSeed } from '../scripts/export-textbooks.mjs'
import { generateAdventureSeed } from '../scripts/export-adventure-package.mjs'

test(
  'Fitur produksi: tutor, studio admin, file privat, dan batas akses',
  { timeout: 120000 },
  async (t) => {
    const db = new PGlite()
    t.after(() => db.close())
    await db.exec(`create role anon; create role authenticated; create schema auth;
    create table auth.users(id uuid primary key,raw_user_meta_data jsonb default '{}');
    create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;
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
    ]) {
      try {
        await db.exec(
          await readFile(new URL(`../database/migrations/${file}`, import.meta.url), 'utf8'),
        )
      } catch (error) {
        await db.exec('rollback')
        throw error
      }
    }
    await db.exec(generateSeed())
    async function account(role = 'student', grade = 3) {
      const id = randomUUID()
      await db.query('insert into auth.users(id,raw_user_meta_data) values($1,$2)', [
        id,
        { display_name: role, grade },
      ])
      if (role !== 'student')
        await db.query('update public.profiles set role=$2 where id=$1', [id, role])
      return id
    }
    async function as(id, task) {
      await db.exec('set role authenticated')
      await db.query("select set_config('request.jwt.claim.sub',$1,false)", [id])
      try {
        return await task()
      } finally {
        await db.exec('reset role')
        await db.query("select set_config('request.jwt.claim.sub','',false)")
      }
    }
    async function rpc(id, call, values = []) {
      return as(
        id,
        async () => (await db.query(`select public.${call} as result`, values)).rows[0].result,
      )
    }
    const tutor = await account('tutor'),
      otherTutor = await account('tutor'),
      student = await account(),
      otherStudent = await account(),
      admin = await account('admin')
    const lesson = seedId('matematika-3')
    let classroom, assignment, submission
    await t.test(
      'Paket 72 bab/360 soal valid, draf, idempoten, privat sebelum publish dan kuis tanpa kunci',
      async () => {
        await db.exec(generateAdventureSeed())
        const count = async () =>
          (
            await db.query(
              "select count(*)::int n from public.lessons where slug like 'petualangan-%'",
            )
          ).rows[0].n
        assert.equal(await count(), 72)
        assert.equal(
          (
            await db.query(
              "select count(*)::int n from public.questions where lesson_id in (select id from public.lessons where slug like 'petualangan-%')",
            )
          ).rows[0].n,
          360,
        )
        assert.equal(
          (
            await db.query(
              "select count(*)::int n from public.lessons where slug like 'petualangan-%' and (status<>'draft' or not private.valid_content(content))",
            )
          ).rows[0].n,
          0,
        )
        await as(student, async () => assert.equal(await count(), 0))
        const id = seedId('petualangan-matematika-3-2')
        await db.query("update public.lessons set title='Revisi guru paket 72' where id=$1", [id])
        await db.exec(generateAdventureSeed())
        assert.equal(await count(), 72)
        assert.equal(
          (await db.query('select title from public.lessons where id=$1', [id])).rows[0].title,
          'Revisi guru paket 72',
        )
        await rpc(admin, 'publish_lesson($1,true,true)', [id])
        const quiz = await rpc(student, 'get_lesson_quiz($1)', [id])
        assert.equal(quiz.questions.length, 5)
        assert.doesNotMatch(JSON.stringify(quiz.questions), /correct_option|explanation/)
        await rpc(admin, 'publish_lesson($1,false,false)', [id])
      },
    )
    await t.test('Siswa/tutor tidak dapat mengimpor atau memublikasikan konten', async () => {
      await assert.rejects(rpc(student, 'import_questions($1,$2)', [[], randomUUID()]), /admin/)
      await assert.rejects(rpc(tutor, 'publish_lesson($1,true,true)', [lesson]), /admin/)
      await assert.rejects(rpc(student, 'create_class($1,$2)', ['Kelas', 3]), /tutor/)
      await assert.rejects(rpc(admin, 'publish_lesson($1,true,false)', [lesson]), /Konfirmasi/)
      await rpc(admin, 'publish_lesson($1,true,true)', [lesson])
    })
    await t.test('Tutor membuat kelas, siswa bergabung, dan akun lain terisolasi', async () => {
      classroom = await rpc(tutor, 'create_class($1,$2)', ['Klub Kelas 3', 3])
      assert.match(classroom.join_code, /^[A-Z0-9]{6}$/)
      assert.equal((await rpc(student, 'join_class($1)', [classroom.join_code])).ok, true)
      await assert.rejects(
        rpc(otherTutor, 'get_class_students($1)', [classroom.id]),
        /Kelas tidak tersedia/,
      )
      assert.equal((await rpc(tutor, 'get_class_students($1)', [classroom.id]))[0].id, student)
      await as(otherStudent, async () =>
        assert.equal((await db.query('select * from public.classes')).rows.length, 0),
      )
      await as(otherTutor, async () =>
        assert.equal((await db.query('select * from public.class_members')).rows.length, 0),
      )
    })
    await t.test('Kode salah tetap dihitung dan tingkat kelas harus cocok', async () => {
      const wrongGrade = await account('student', 4)
      assert.equal((await rpc(wrongGrade, 'join_class($1)', [classroom.join_code])).ok, false)
      for (let i = 0; i < 10; i++)
        assert.equal((await rpc(otherStudent, 'join_class($1)', ['ZZZZZZ'])).ok, false)
      assert.match(
        (await rpc(otherStudent, 'join_class($1)', [classroom.join_code])).message,
        /Batas percobaan/,
      )
      assert.equal(
        (
          await db.query('select count(*)::int n from private.join_attempts where student_id=$1', [
            otherStudent,
          ])
        ).rows[0].n,
        10,
      )
    })
    await t.test('Tugas hanya dibuat pemilik kelas dengan materi yang sesuai', async () => {
      const args = [
        classroom.id,
        lesson,
        'Amati kelompok',
        'Ceritakan perkalian.',
        new Date(Date.now() + 86400000),
      ]
      await assert.rejects(
        rpc(otherTutor, 'create_assignment($1,$2,$3,$4,$5)', args),
        /Kelas tidak tersedia/,
      )
      await assert.rejects(
        rpc(tutor, 'create_assignment($1,$2,$3,$4,$5)', [...args.slice(0, 4), new Date(0)]),
        /Tenggat/,
      )
      assignment = await rpc(tutor, 'create_assignment($1,$2,$3,$4,$5)', args)
      await assert.rejects(
        rpc(otherStudent, 'submit_assignment($1,$2)', [assignment.id, 'Jawaban']),
        /Gabung/,
      )
      submission = await rpc(student, 'submit_assignment($1,$2)', [
        assignment.id,
        '3 kelompok berisi 4 benda = 12.',
      ])
      await as(otherStudent, async () =>
        assert.equal((await db.query('select * from public.submissions')).rows.length, 0),
      )
    })
    await t.test('Berkas privat hanya untuk siswa pemilik dan tutor kelasnya', async () => {
      const name = `${student}/${assignment.id}/${randomUUID()}.pdf`
      await as(student, () =>
        db.query("insert into storage.objects(bucket_id,name) values('student-submissions',$1)", [
          name,
        ]),
      )
      await as(otherStudent, async () => {
        assert.equal((await db.query('select * from storage.objects')).rows.length, 0)
        await assert.rejects(
          db.query("insert into storage.objects(bucket_id,name) values('student-submissions',$1)", [
            name,
          ]),
          /row-level security/,
        )
      })
      await as(tutor, async () =>
        assert.equal((await db.query('select * from storage.objects')).rows.length, 1),
      )
      await as(otherTutor, async () =>
        assert.equal((await db.query('select * from storage.objects')).rows.length, 0),
      )
      await assert.rejects(
        rpc(student, 'submit_assignment($1,$2,$3)', [
          assignment.id,
          'Jawaban',
          `${otherStudent}/${assignment.id}/fake.pdf`,
        ]),
        /Lokasi/,
      )
    })
    await t.test(
      'Penilaian dibatasi pemilik, XP +15 hanya sekali, jawaban dinilai terkunci',
      async () => {
        await assert.rejects(
          rpc(otherTutor, 'grade_submission($1,$2,$3)', [submission.id, 90, 'Bagus']),
          /Kiriman tidak tersedia/,
        )
        assert.equal(
          (
            await rpc(tutor, 'grade_submission($1,$2,$3)', [
              submission.id,
              90,
              'Cara mengelompokkanmu tepat.',
            ])
          ).xp_granted_now,
          15,
        )
        assert.equal(
          (
            await rpc(tutor, 'grade_submission($1,$2,$3)', [
              submission.id,
              95,
              'Terima kasih memperbaiki.',
            ])
          ).xp_granted_now,
          0,
        )
        await assert.rejects(
          rpc(student, 'submit_assignment($1,$2)', [assignment.id, 'Ubah']),
          /sudah dinilai/,
        )
        await as(student, async () =>
          assert.equal((await db.query('delete from storage.objects returning id')).rows.length, 0),
        )
      },
    )
    await t.test('Impor atomik, validasi server, idempotensi batch, dan status draft', async () => {
      const item = {
        lesson_id: lesson,
        prompt: '6 × 2 = …',
        options: ['12', '14', '16', '18'],
        correct_option: 0,
        explanation: '6 × 2 = 12.',
      }
      const before = (await db.query('select count(*)::int n from public.questions')).rows[0].n
      await assert.rejects(
        rpc(admin, 'import_questions($1,$2)', [
          [item, { ...item, correct_option: 9 }],
          randomUUID(),
        ]),
        /0–3/,
      )
      assert.equal(
        (await db.query('select count(*)::int n from public.questions')).rows[0].n,
        before,
      )
      const batch = randomUUID()
      assert.equal(await rpc(admin, 'import_questions($1,$2)', [[item], batch]), 1)
      assert.equal(await rpc(admin, 'import_questions($1,$2)', [[item], batch]), 1)
      assert.equal(
        (await db.query('select count(*)::int n from public.questions')).rows[0].n,
        before + 1,
      )
      assert.equal(
        (await db.query('select status from public.questions where author_id=$1', [admin])).rows[0]
          .status,
        'draft',
      )
    })
    await t.test('Editor hanya mengubah draf miliknya; konten berbahaya ditolak', async () => {
      const document = {
        subject_id: seedId('matematika'),
        title: 'Materi tutor',
        slug: 'materi-tutor-baru',
        grade: 3,
        content: { summary: 'Contoh', blocks: [{ type: 'text', body: 'Mari belajar.' }] },
      }
      const id = await rpc(tutor, 'save_lesson($1)', [document])
      const item = {
        lesson_id: id,
        prompt: 'Dua ditambah dua?',
        options: ['4', '3', '2', '1'],
        correct_option: 0,
        explanation: 'Dua benda ditambah dua benda menjadi empat.',
      }
      const questionId = await rpc(tutor, 'save_draft_question($1)', [item])
      assert.equal(
        (await db.query('select status from public.questions where id=$1', [questionId])).rows[0]
          .status,
        'draft',
      )
      await assert.rejects(rpc(otherTutor, 'save_draft_question($1)', [item]), /editor ini/)
      await assert.rejects(rpc(student, 'save_draft_question($1)', [item]), /editor/)
      await assert.rejects(
        rpc(tutor, 'save_draft_question($1)', [{ ...item, correct_option: 9 }]),
        /0–3/,
      )
      assert.equal((await rpc(tutor, 'get_editor_questions($1)', [id])).length, 1)
      await assert.rejects(rpc(otherTutor, 'save_lesson($1,$2)', [document, id]), /editor ini/)
      await assert.rejects(
        rpc(tutor, 'save_lesson($1)', [
          {
            ...document,
            content: { summary: 'X', blocks: [{ type: 'image', url: 'javascript:alert(1)' }] },
          },
        ]),
        /Konten/,
      )
      await assert.rejects(rpc(student, 'get_editor_questions($1)', [lesson]), /editor ini/)
      assert.ok(
        (await rpc(admin, 'get_editor_questions($1)', [lesson])).every((q) =>
          Number.isInteger(q.correct_option),
        ),
      )
    })
    await t.test(
      'Promosi hanya tutor oleh admin dan audit tidak tersedia untuk siswa',
      async () => {
        const target = await account()
        await assert.rejects(rpc(tutor, 'promote_tutor($1)', [target]), /admin/)
        await rpc(admin, 'promote_tutor($1)', [target])
        assert.equal(
          (await db.query('select role from public.profiles where id=$1', [target])).rows[0].role,
          'tutor',
        )
        assert.ok(
          (await rpc(admin, 'get_audit_log()')).some(
            (row) => row.action === 'profile.promoted_tutor',
          ),
        )
        await assert.rejects(rpc(student, 'get_audit_log()'), /admin/)
      },
    )
    await t.test(
      'Permintaan penghapusan akun bersifat pribadi dan tidak menghapus diam-diam',
      async () => {
        await rpc(student, 'request_account_deletion()')
        await rpc(student, 'request_account_deletion()')
        await as(student, async () =>
          assert.equal(
            (await db.query('select * from public.account_deletion_requests')).rows.length,
            1,
          ),
        )
        await as(otherStudent, async () =>
          assert.equal(
            (await db.query('select * from public.account_deletion_requests')).rows.length,
            0,
          ),
        )
        assert.equal(
          (
            await db.query(
              'select status from public.account_deletion_requests where student_id=$1',
              [student],
            )
          ).rows[0].status,
          'pending',
        )
      },
    )
    await t.test('Query verifikasi platform memeriksa seluruh RPC dan bucket privat', async () => {
      await db.exec(
        await readFile(new URL('../database/verify-platform.sql', import.meta.url), 'utf8'),
      )
    })
    await t.test(
      'Buku delapan bab dan 40 kuis valid, draf, privat serta tidak menimpa suntingan',
      async () => {
        await db.exec(generateTextbookSeed())
        const predicate = "content->>'book_id'='matematika-1-2022'"
        assert.equal(
          (await db.query(`select count(*)::int n from public.lessons where ${predicate}`)).rows[0]
            .n,
          8,
        )
        assert.equal(
          (
            await db.query(
              `select count(*)::int n from public.lessons where ${predicate} and (status<>'draft' or not private.valid_content(content))`,
            )
          ).rows[0].n,
          0,
        )
        assert.equal(
          (
            await db.query(
              `select count(*)::int n from private.question_keys k join public.questions q on q.id=k.question_id join public.lessons l on l.id=q.lesson_id where l.${predicate}`,
            )
          ).rows[0].n,
          40,
        )
        await as(student, async () =>
          assert.equal(
            (await db.query(`select count(*)::int n from public.lessons where ${predicate}`))
              .rows[0].n,
            0,
          ),
        )
        const id = seedId('buku-matematika-1-2022-bab-1')
        await db.query("update public.lessons set title='Buku ditinjau' where id=$1", [id])
        await db.exec(generateTextbookSeed())
        assert.equal(
          (await db.query('select title from public.lessons where id=$1', [id])).rows[0].title,
          'Buku ditinjau',
        )
      },
    )
    await t.test(
      'Paket 216 materi/1080 soal terpasang sebagai draf, valid dan idempoten',
      async () => {
        await db.exec(generateCurriculumSeed())
        const count = async () =>
          (await db.query("select count(*)::int n from public.lessons where slug like 'belajar-%'"))
            .rows[0].n
        assert.equal(await count(), 216)
        assert.equal(
          (
            await db.query(
              "select count(*)::int n from public.questions where lesson_id in (select id from public.lessons where slug like 'belajar-%')",
            )
          ).rows[0].n,
          1080,
        )
        assert.equal(
          (
            await db.query(
              "select count(*)::int n from public.lessons where slug like 'belajar-%' and (status<>'draft' or not private.valid_content(content))",
            )
          ).rows[0].n,
          0,
        )
        const id = seedId('kurikulum-matematika-1-1')
        await db.query("update public.lessons set title='Suntingan peninjau' where id=$1", [id])
        await db.exec(generateCurriculumSeed())
        assert.equal(await count(), 216)
        assert.equal(
          (await db.query('select title from public.lessons where id=$1', [id])).rows[0].title,
          'Suntingan peninjau',
        )
        await as(student, async () =>
          assert.equal(
            (
              await db.query(
                "select count(*)::int n from public.lessons where slug like 'belajar-%'",
              )
            ).rows[0].n,
            0,
          ),
        )
        await rpc(admin, 'publish_lesson($1,true,true)', [id])
        const content = (await db.query('select content from public.lessons where id=$1', [id]))
          .rows[0].content
        assert.equal(content.review_status, 'review_confirmed_by_admin')
        assert.equal(content.editorial_notice, undefined)
        await rpc(admin, 'publish_lesson($1,false,false)', [id])
        assert.equal(
          (await db.query('select content from public.lessons where id=$1', [id])).rows[0].content
            .review_status,
          'needs_teacher_review',
        )
      },
    )
  },
)
