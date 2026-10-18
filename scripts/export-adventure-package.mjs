import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import {
  adventureCourses,
  adventurePackageNotice,
  adventurePackageId,
} from '../src/lib/adventureCourseCatalog.js'
import {
  adventureDrafts,
  adventureLessons,
  adventureQuestions,
} from '../src/content/adventure/index.js'
import { seedId } from './generate-database-seed.mjs'

const quote = (value) => `'${String(value).replaceAll("'", "''")}'`
const json = (value) => `${quote(JSON.stringify(value))}::jsonb`
export function generateAdventureSeed() {
  const lines = [
    '-- Paket 72 bab pilihan aplikasi dan 360 soal. Semua DRAFT; review guru diperlukan.',
    '-- Sesudah empat migration dan seed.sql. ID deterministik; tidak menimpa suntingan.',
    'begin;',
  ]
  for (const l of adventureLessons)
    lines.push(
      `insert into public.lessons(id,subject_id,title,slug,grade,phase,chapter,difficulty,status,duration,content) values(${quote(seedId(l.id))},${quote(seedId(l.subject_id))},${quote(l.title)},${quote(l.slug)},${l.grade},${quote(l.phase)},${quote(l.chapter)},${quote(l.difficulty)},'draft',${l.duration},${json(l.content)}) on conflict(id) do nothing;`,
    )
  for (const q of adventureQuestions) {
    lines.push(
      `insert into public.questions(id,lesson_id,prompt,options,difficulty,status) values(${quote(seedId(q.id))},${quote(seedId(q.lesson_id))},${quote(q.prompt)},${json(q.options)},${quote(q.difficulty)},'draft') on conflict(id) do nothing;`,
    )
    lines.push(
      `insert into private.question_keys(question_id,correct_option,explanation) values(${quote(seedId(q.id))},${q.correct_option},${quote(q.explanation)}) on conflict(question_id) do nothing;`,
    )
  }
  return [...lines, 'commit;', ''].join('\n')
}
export function adventureManifest() {
  return {
    version: '2026-10-18',
    package_id: adventurePackageId,
    notice: adventurePackageNotice,
    lesson_count: adventureLessons.length,
    question_count: adventureQuestions.length,
    courses: adventureCourses,
    lessons: adventureLessons.map((lesson) => ({
      id: lesson.id,
      database_id: seedId(lesson.id),
      slug: lesson.slug,
      title: lesson.title,
      subject: lesson.subject_id,
      grade: lesson.grade,
      phase: lesson.phase,
      status: lesson.status,
      review_status: lesson.content.review_status,
      enrichment: lesson.content.enrichment,
      objectives: lesson.content.objectives,
      section_titles: lesson.content.blocks.filter((b) => b.heading).map((b) => b.heading),
      source_refs: lesson.content.source_refs,
      curriculum_note: lesson.content.curriculum_note,
    })),
  }
}
const chapterPath = (course, chapter) =>
  `${course.subject}/kelas-${course.grade}/bab-${String(chapter.order).padStart(2, '0')}.md`
export async function exportAdventurePackage() {
  const base = new URL('../docs/materi/paket-72-bab/', import.meta.url)
  await mkdir(base, { recursive: true })
  const index = [
    '# Paket bahan ajar 72 bab — kelas 1–6',
    '',
    adventurePackageNotice,
    '',
    '**Isi:** 72 bab, 216 subbab, 216 contoh bertahap, 72 kegiatan penerapan, 216 latihan mandiri berpembahasan, dan 360 soal kuis dengan pembahasan. Tiga pelajaran: Matematika, Bahasa Indonesia, IPA & Sains. Materi orisinal ini dikembangkan dari daftar pilihan pengguna; bukan salinan buku atau daftar bab resmi nasional.',
    '',
    '## Cara membuka di aplikasi',
    '',
    'Buka server lokal, lalu [perpustakaan paket](http://127.0.0.1:5173/sumber-belajar?grade=1#paket-72-bab). Pilih kelas dan pelajaran, masuk sebagai demo siswa, kemudian pilih bab. Bacaan mempunyai daftar isi dan empat navigasi bab per kelas/pelajaran. Kerjakan latihan sebelum membuka pembahasan; kuis terpisah dari latihan mandiri.',
    '',
    'Untuk Supabase, pasang SQL draf pada staging lalu tinjau/publikasikan melalui admin. Bab belum tersedia untuk siswa cloud sampai dipublikasikan. Demo menyimpan progres pada browser/origin yang sama.',
    '',
    '## Batas cakupan kurikulum',
    '',
    'Fase A mencakup kelas 1–2, B kelas 3–4, C kelas 5–6. CP ditetapkan per fase; urutan empat bab adalah rancangan aplikasi yang memerlukan penurunan TP/ATP. Sains kelas 1–2 diberi label pengayaan. Paket sains belum memuat seluruh aspek sosial IPAS; tiga pelajaran ini juga tidak mencakup seluruh mata pelajaran nasional. Penempatan topik seperti ratusan, bilangan negatif, lingkaran dan mean/median/modus harus ditinjau guru, bukan diklaim otomatis sebagai target wajib kelas tersebut.',
    '',
    'Paket ini menambah koleksi lama: total demo 332 materi dan 1660 soal. Koleksi lama 216 ringkasan dan delapan bab Matematika kelas 1 tetap merupakan paket berbeda, bukan dipaksa menjadi empat bab.',
    '',
    '## Rujukan dan status review',
    '',
    '- [CP 046/H/KR/2025 pada sumber pemerintah](https://bpmpbabel.kemendikdasmen.go.id/PPID/wp-content/uploads/2025/07/KepKaBSKAP-046_2025-ttg-CP.pdf); data CP proyek dipertahankan sebagai acuan, bukan bukti pemetaan selesai.',
    '- [Panduan perumusan TP/ATP](https://pusatinformasi.rumahpendidikan.kemendikdasmen.go.id/hc/id/articles/52513306767897-Perumusan-Tujuan-Pembelajaran-TP-dan-Penyusunan-Alur-Tujuan-Pembelajaran-ATP): guru menurunkan tujuan dan urutan dari capaian fase.',
    '- [Panduan IPAS Fase B dan C](https://repositori.kemendikdasmen.go.id/33599/): IPAS memadukan alam dan sosial; daftar ini berfokus sains.',
    '- [Siaran Kemendikdasmen 23 Juni 2026](https://www.kemendikdasmen.go.id/siaran-pers/15636-capaian-pembelajaran-baru-telah-terbit-yang-berubah-hanya-mata-pelajaran-agama-dan-budi-pekerti): perubahan CP 2026 diberitakan terbatas pada Agama dan Budi Pekerti. Dokumen perubahan tersebut bukan materi paket tiga pelajaran ini.',
    '- Buku pendamping per kelas ditautkan di setiap bab. Identitas rujukan berasal dari katalog proyek; tidak ada klaim semua halaman buku telah diaudit atau naskah mengikuti daftar isinya.',
    '',
    '- [x] Naskah, contoh, kegiatan, latihan, kuis dan ekspor tersedia.',
    '- [ ] Guru menyetujui ketepatan konsep/bahasa/kunci, kedalaman serta penempatan CP/ATP per bab.',
    '- [ ] Pilot pembelajaran dan QA browser/perangkat nyata dicatat.',
    '- [ ] Paket diuji dan dipublikasikan pada Supabase nyata.',
    '',
    '## Daftar bab',
    '',
  ]
  for (const course of adventureCourses) {
    index.push(
      `### Kelas ${course.grade} — ${course.name}`,
      '',
      `${course.island} · ${course.mentor} · Fase ${course.phase}${course.enrichment ? ' · pengayaan' : ''}`,
      '',
      ...course.chapters.map(
        (chapter) => `- [Bab ${chapter.order}: ${chapter.title}](${chapterPath(course, chapter)})`,
      ),
      '',
    )
  }
  index.push(
    '## Panduan asesmen dan pemasangan',
    '',
    '[Panduan kuis dan kunci pendamping](KUIS-PENDAMPING.md) memuat 360 soal, opsi dan pembahasan; bukan manifest publik. Rubrik praktik terdapat dalam tiap bab. Nilai kuis bukan satu-satunya bukti keterampilan bahasa, penyelidikan sains atau pemodelan matematika.',
    '',
    'Jalankan `npm run content:adventure` setelah mengubah naskah/metadata. Hasil: 72 dokumen bab, panduan kuis, manifest aman dan `supabase/paket-72-bab.sql`. Pasang SQL sesudah empat migration dan seed awal. Seluruh status draf, ID deterministik, `ON CONFLICT DO NOTHING` menjaga suntingan; menjalankan generator tidak mengubah layanan cloud.',
    '',
    '## Register review guru',
    '',
    '| Bab | Peninjau | Tanggal | Konsep/bahasa/kunci | CP/ATP | Pilot | Keputusan |',
    '| --- | --- | --- | --- | --- | --- | --- |',
    ...adventureDrafts.map(
      ({ course, chapter }) =>
        `| ${course.subject} kelas ${course.grade} bab ${chapter.order} | Belum | — | Belum ditinjau | Belum dipetakan/disetujui | Belum | Draf |`,
    ),
    '',
  )
  await writeFile(new URL('README.md', base), index.join('\n'), 'utf8')
  const quizGuide = [
    '# Kuis dan pembahasan pendamping — 72 bab',
    '',
    '360 soal orisinal. Gunakan untuk review guru dan setelah anak mencoba. Kunci ini tidak diimpor halaman publik/Supabase bundle; SQL menaruh kunci dalam schema private. Semua butir masih draf.',
    '',
  ]
  for (const { course, chapter, lesson } of adventureDrafts) {
    const path = chapterPath(course, chapter)
    await mkdir(new URL(`${course.subject}/kelas-${course.grade}/`, base), { recursive: true })
    const lines = [
      `# Kelas ${course.grade} — Bab ${chapter.order}: ${chapter.title}`,
      '',
      '[Daftar paket](../../README.md)',
      '',
      `${course.island} bersama ${course.mentor}. ${adventurePackageNotice}`,
      '',
      lesson.content.curriculum_note,
      '',
      ...lesson.content.blocks.flatMap((block) =>
        block.type === 'image'
          ? [`![${block.caption}](../../../../../public${block.url})`, '']
          : [`## ${block.heading}`, '', block.body, ''],
      ),
      '## Kuis akhir bab',
      '',
      'Lima soal interaktif tersedia pada aplikasi. Latihan mandiri di atas memakai contoh berbeda. Pendamping dapat meninjau bank lengkap pada [panduan kuis](../../KUIS-PENDAMPING.md).',
      '',
      '## Sumber pendamping',
      '',
      ...lesson.content.source_refs.map((ref) => `- [${ref.title}](${ref.url})`),
      '',
      ...(chapter.order < 4
        ? [
            `[Lanjut bab ${chapter.order + 1}](bab-${String(chapter.order + 1).padStart(2, '0')}.md)`,
            '',
          ]
        : [
            'Selesai satu paket kelas/pelajaran. Tinjau bagian yang belum dikuasai sebelum memilih paket berikutnya.',
            '',
          ]),
    ]
    await writeFile(new URL(path, base), lines.join('\n'), 'utf8')
    quizGuide.push(
      `## ${course.name} kelas ${course.grade} — Bab ${chapter.order}: ${chapter.title}`,
      '',
    )
    for (const [index, item] of adventureQuestions
      .filter((question) => question.lesson_id === lesson.id)
      .entries()) {
      quizGuide.push(
        `### Soal ${index + 1}`,
        '',
        item.prompt,
        '',
        ...item.options.map((option, i) => `- ${'ABCD'[i]}. ${option}`),
        '',
        `**Kunci: ${'ABCD'[item.correct_option]}. ${item.options[item.correct_option]}**`,
        '',
        item.explanation,
        '',
      )
    }
  }
  await writeFile(new URL('KUIS-PENDAMPING.md', base), quizGuide.join('\n'), 'utf8')
  await writeFile(
    new URL('../content/paket-72-manifest.json', import.meta.url),
    JSON.stringify(adventureManifest(), null, 2) + '\n',
    'utf8',
  )
  await writeFile(
    new URL('../supabase/paket-72-bab.sql', import.meta.url),
    generateAdventureSeed(),
    'utf8',
  )
  console.log(
    `Paket petualangan: ${adventureLessons.length} bab, ${adventureQuestions.length} kuis; dokumen, manifest dan SQL draf diekspor.`,
  )
}
if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url)
  await exportAdventurePackage()
