import { writeFile, mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import {
  curriculumLessons,
  curriculumQuestions,
  reviewNotice,
} from '../src/content/curriculumDraft.js'
import { subjects } from '../src/lib/dummyData.js'
import { seedId } from './generate-database-seed.mjs'
const q = (value) => `'${String(value).replaceAll("'", "''")}'`
const json = (value) => `${q(JSON.stringify(value))}::jsonb`
export function generateCurriculumSeed() {
  const sql = [
    '-- Draf materi orisinal; dihasilkan scripts/generate-curriculum-draft.mjs.',
    '-- 216 materi / 1080 soal tambahan, semuanya DRAFT dan belum direview guru.',
    '-- Jalankan setelah migration aktif; idempoten dan tidak menimpa perubahan editor.',
    'begin;',
  ]
  for (const s of subjects)
    sql.push(
      `insert into public.subjects(id,name,slug,description) values(${q(seedId(s.id))},${q(s.name)},${q(s.slug)},${q(s.description)}) on conflict(id) do nothing;`,
    )
  for (const l of curriculumLessons)
    sql.push(
      `insert into public.lessons(id,subject_id,title,slug,grade,phase,chapter,difficulty,status,duration,content) values(${q(seedId(l.id))},${q(seedId(l.subject_id))},${q(l.title)},${q(l.slug)},${l.grade},${q(l.phase)},${q(l.chapter)},${q(l.difficulty)},'draft',${l.duration},${json(l.content)}) on conflict(id) do nothing;`,
    )
  for (const item of curriculumQuestions) {
    sql.push(
      `insert into public.questions(id,lesson_id,prompt,options,difficulty,status) values(${q(seedId(item.id))},${q(seedId(item.lesson_id))},${q(item.prompt)},${json(item.options)},${q(item.difficulty)},'draft') on conflict(id) do nothing;`,
    )
    sql.push(
      `insert into private.question_keys(question_id,correct_option,explanation) values(${q(seedId(item.id))},${item.correct_option},${q(item.explanation)}) on conflict(question_id) do nothing;`,
    )
  }
  return [...sql, 'commit;', ''].join('\n')
}
export function curriculumManifest() {
  return {
    notice: reviewNotice,
    version: '2026-10-16',
    lesson_count: curriculumLessons.length,
    question_count: curriculumQuestions.length,
    assessment_scope:
      'Soal nonmatematika memeriksa pengenalan/pemahaman konsep. Praktik bahasa, seni, pengamatan dan sikap perlu penilaian pendamping.',
    lessons: curriculumLessons.map((l) => ({
      id: l.id,
      database_id: seedId(l.id),
      subject: l.subject_id,
      grade: l.grade,
      phase: l.phase,
      title: l.title,
      slug: l.slug,
      chapter: l.chapter,
      status: 'draft',
      review_status: 'needs_teacher_review',
      question_count: curriculumQuestions.filter((q) => q.lesson_id === l.id).length,
      objectives: l.content.objectives,
      enrichment: l.content.enrichment,
      source_refs: l.content.source_refs,
    })),
  }
}
async function exportFiles() {
  await mkdir(new URL('../content/', import.meta.url), { recursive: true })
  await writeFile(
    new URL('../supabase/curriculum-draft.sql', import.meta.url),
    generateCurriculumSeed(),
    'utf8',
  )
  const manifest = curriculumManifest()
  await writeFile(
    new URL('../content/curriculum-manifest.json', import.meta.url),
    JSON.stringify(manifest, null, 2) + '\n',
    'utf8',
  )
  const lines = [
    '# Paket materi enam pelajaran — siap direview',
    '',
    '216 materi draf dan 1.080 soal baru telah diisi. Ini adalah paket orisinal aplikasi, bukan salinan buku pemerintah atau klaim pemetaan kurikulum lengkap yang disahkan guru.',
    '',
    '## Isi setiap unit',
    '',
    'Tujuan, penjelasan bertahap, lima konsep dengan contoh, contoh dan penalaran, aktivitas, tips, rangkuman, refleksi, lima soal konsep/latihan beserta pembahasan, serta tautan bacaan pendamping.',
    '',
    'Draf kelas 1–2 perlu dibaca bersama pendamping. IPAS dan Inggris kelas 1–2 adalah pengayaan. Cabang seni disesuaikan pilihan sekolah. Soal nonmatematika terutama memeriksa identifikasi/pemahaman konsep; kemampuan praktik, menyimak, berbicara, menulis, berkarya dan sikap tidak dianggap tuntas hanya dari kuis.',
    '',
    '## Cara mencoba',
    '',
    '1. Buka mode demo di http://127.0.0.1:5174/sumber-belajar.',
    '2. Pilih kelas/pelajaran, masuk sebagai siswa, lalu pilih Baca & latihan. Draf juga ada pada katalog siswa dengan filter bab.',
    '3. Baca pemberitahuan draf, coba aktivitas yang sesuai usia dengan pendamping, kemudian kerjakan lima soal.',
    '4. Tutor/admin memakai buku resmi sebagai bacaan pendamping dan meninjau draf sebelum publikasi nyata.',
    '',
    '## Memasang di Supabase nanti',
    '',
    'Jalankan supabase/curriculum-draft.sql setelah migration aktif. Paket boleh dipasang setelah seed awal. ID deterministik dan ON CONFLICT DO NOTHING menjaga pemasangan ulang tidak menggandakan atau menimpa suntingan editor. Paket ini tidak memublikasikan materi. Setelah seed awal dan paket ini, database awal memiliki 252 materi dan 1.265 soal draf. Paket buku Matematika kelas 1 opsional menambah 8 bab/40 soal, menjadi 260 materi/1.305 soal. Demo memuat ketiganya: 260 materi/1.300 soal karena lima soal ekstra hanya ada pada seed awal. Jumlah dapat bertambah setelah impor/editorial.',
    '',
    '## Gerbang review per unit',
    '',
    'Gunakan [peta CP dan sumber pemerintah](PETA-KURIKULUM-PEMERINTAH.md) serta [roadmap pendidikan R01–R10](ROADMAP-PENDIDIKAN.md). Daftar di bawah menandai review unit; daftar tersebut bukan bukti keselarasan CP yang sudah disahkan.',
    '',
    'Periksa ketepatan konsep dan hitungan, keterbacaan, kesesuaian tujuan/ATP sekolah, aktivitas aman, jawaban tunggal dan pengecoh, hak penggunaan sumber, serta kebutuhan diferensiasi. Catat nama peninjau, tanggal, temuan dan revisi. Centang hanya setelah review dan uji materi selesai.',
    '',
    '| Kelas | Pelajaran | Bab | Unit | Review guru |',
    '| --- | --- | --- | --- | --- |',
    ...manifest.lessons.map(
      (l) =>
        `| ${l.grade} | ${l.subject} | ${l.chapter} | [${l.title}](http://127.0.0.1:5174/student/lesson/${l.slug}) | [ ] |`,
    ),
    '',
    '## Berkas dan regenerasi',
    '',
    '- src/content/: penulisan orisinal per pelajaran dan penghasil struktur materi/soal.',
    '- src/lib/demoCatalog.js: menggabungkan contoh lama dengan paket draf pada mode demo.',
    '- supabase/curriculum-draft.sql: paket pemasangan database, bukan berkas publik web.',
    '- content/curriculum-manifest.json: daftar aman tanpa kunci jawaban, untuk pencatatan editorial.',
    '- Jalankan npm run content:generate setelah mengubah materi, lalu tes dan build ulang.',
    '',
    'Materi/soal draf hanya masuk bundle demo. Build Supabase mengambil konten yang diizinkan database, dan tes build memeriksa bahwa modul src/content serta demoCatalog tidak ikut bundle tersebut.',
    '',
  ]
  await writeFile(
    new URL('../docs/MATERI-SIAP-REVIEW.md', import.meta.url),
    lines.join('\n'),
    'utf8',
  )
  console.log('Paket draf: 216 materi, 1080 soal; SQL dan manifest dibuat tanpa koneksi cloud.')
}
if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  await exportFiles()
  await import('./export-learning-resources.mjs')
  const { exportGovernmentCurriculum } = await import('./export-government-curriculum.mjs')
  await exportGovernmentCurriculum()
  const { exportTextbooks } = await import('./export-textbooks.mjs')
  await exportTextbooks()
}
