import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { textbookCatalog } from '../src/lib/textbooks.js'
import { textbookLessons, textbookQuestions } from '../src/content/books/mathGrade1.js'
import { seedId } from './generate-database-seed.mjs'
import { cpReference, findCpElement } from '../src/lib/cpReference.js'

const quote = (value) => `'${String(value).replaceAll("'", "''")}'`
const json = (value) => `${quote(JSON.stringify(value))}::jsonb`
export function generateTextbookSeed() {
  const lines = [
    '-- Bahan ajar orisinal Matematika kelas 1: 8 bab dan 40 soal DRAFT.',
    '-- Jalankan sesudah empat migration dan seed.sql; tidak menimpa suntingan editor.',
    'begin;',
  ]
  for (const l of textbookLessons)
    lines.push(
      `insert into public.lessons(id,subject_id,title,slug,grade,phase,chapter,difficulty,status,duration,content) values(${quote(seedId(l.id))},${quote(seedId(l.subject_id))},${quote(l.title)},${quote(l.slug)},${l.grade},${quote(l.phase)},${quote(l.chapter)},${quote(l.difficulty)},'draft',${l.duration},${json(l.content)}) on conflict(id) do nothing;`,
    )
  for (const q of textbookQuestions) {
    lines.push(
      `insert into public.questions(id,lesson_id,prompt,options,difficulty,status) values(${quote(seedId(q.id))},${quote(seedId(q.lesson_id))},${quote(q.prompt)},${json(q.options)},${quote(q.difficulty)},'draft') on conflict(id) do nothing;`,
    )
    lines.push(
      `insert into private.question_keys(question_id,correct_option,explanation) values(${quote(seedId(q.id))},${q.correct_option},${quote(q.explanation)}) on conflict(question_id) do nothing;`,
    )
  }
  return [...lines, 'commit;', ''].join('\n')
}
export function textbookManifest() {
  return {
    version: '2026-10-17',
    scope:
      'Satu bahan ajar kelas/pelajaran ditulis per bab; kelompok lain masih berupa ringkasan awal.',
    books: textbookCatalog,
    lesson_count: textbookLessons.length,
    question_count: textbookQuestions.length,
    lessons: textbookLessons.map((l) => ({
      id: l.id,
      database_id: seedId(l.id),
      slug: l.slug,
      title: l.title,
      grade: l.grade,
      chapter: l.chapter,
      content_kind: l.content.content_kind,
      cp_reference: l.content.cp_reference,
      objectives: l.content.objectives,
      section_titles: l.content.blocks.filter((b) => b.heading).map((b) => b.heading),
      status: 'draft',
      review_status: 'needs_teacher_review',
      source_refs: l.content.source_refs,
    })),
  }
}
export async function exportTextbooks() {
  const base = new URL('../docs/materi/matematika/kelas-1/', import.meta.url)
  await mkdir(base, { recursive: true })
  const book = textbookCatalog[0]
  const index = [
    '# Matematika kelas 1 — bahan ajar per bab',
    '',
    'Penulisan 8 bab dan 25 subbab tersedia, dengan penjelasan, contoh orisinal, kegiatan, latihan mandiri/pembahasan, refleksi dan catatan pendamping. Terdapat 40 soal kuis tambahan. Status seluruh bab masih draf menunggu review guru; ini bukan salinan buku pemerintah atau pengganti buku resminya.',
    '',
    `Acuan urutan: [${book.source_title}, ${book.source_authors}, ${book.source_year}](${book.source_url}) serta [panduan guru](${book.teacher_url}). Identitas dan daftar isi buku siswa diperiksa pada halaman PDF 2 dan 5–7. Teks, contoh dan soal aplikasi ditulis baru; ilustrasi dan soal buku tidak disalin. CP proyek tetap memakai 046/H/KR/2025; buku ini tidak sendirian mencakup target Fase A yang berakhir di kelas 2.`,
    '',
    '## Cara belajar',
    '',
    'Buka [perpustakaan per bab](http://127.0.0.1:5174/sumber-belajar?grade=1&subject=matematika#buku-per-bab), masuk sebagai siswa, lalu pilih bab. Pelajari satu subbab setiap kali, gunakan benda aman, ceritakan cara berpikir, kerjakan latihan sebelum membuka pembahasan. Kuiz akhir bab memeriksa sebagian kemampuan; praktik tetap diamati pendamping.',
    '',
    '## Daftar bab',
    '',
    '| Bab | Materi aplikasi | Halaman cetak sumber | Penulisan | Review guru |',
    '| --- | --- | --- | --- | --- |',
    ...book.chapters.map(
      (c) =>
        `| ${c.order} | [${c.title}](bab-${String(c.order).padStart(2, '0')}.md) | ${c.source_print_pages.join('–')} | [x] | [ ] |`,
    ),
    '',
    '## Pemasangan database',
    '',
    'Jalankan `supabase/books/matematika-kelas-1-2022.sql` setelah keempat migration aktif dan `seed.sql`. Paket berisi 8 bab/40 soal draf. ID deterministik dan ON CONFLICT DO NOTHING menjaga pemasangan ulang tidak menimpa suntingan. Paket tidak memublikasikan bab. Kunci kuis disimpan di schema private; pembahasan latihan belajar memang bagian bacaan, berbeda dari kunci kuis server.',
    '',
    '## Status keseluruhan',
    '',
    'Paket ini melengkapi ringkasan yang sudah ada. Total demo sekarang 260 materi/1.300 soal. Database baru dengan seed awal, curriculum-draft.sql dan paket buku ini berjumlah 260 materi/1.305 soal; lima soal ekstra hanya ada di seed awal. Jumlah tersebut bukan jumlah bab resmi seluruh pelajaran.',
    '',
    'Kelompok kelas/pelajaran lainnya masih memerlukan pemilihan buku/edisi, pemeriksaan daftar isi, penulisan per bab serta review. IPAS/Inggris kelas 1–2 tetap pengayaan, dan seni mengikuti cabang sekolah. Jangan menyebut 216 ringkasan sebelumnya sebagai buku lengkap.',
    '',
    'Jalankan `npm run content:books` setelah menyunting `src/content/books/mathGrade1.js` atau metadata buku. Generator memperbarui delapan dokumen, SQL dan manifest tanpa mengubah cloud.',
    '',
  ]
  await writeFile(new URL('README.md', base), index.join('\n'), 'utf8')
  for (const l of textbookLessons) {
    const c = book.chapters.find((c) => c.id === l.id)
    const lines = [
      `# Bab ${c.order} — ${c.title}`,
      '',
      '[Kembali ke daftar bab](README.md)',
      '',
      'Bahan ajar orisinal aplikasi; penulisan tersedia dan menunggu review guru. Pelajari per subbab bersama pendamping.',
      '',
      `Urutan sumber: buku pemerintah 2022, hlm. cetak ${c.source_print_pages.join('–')}. [Buka sumber](${book.student_pdf_url}#page=${c.source_pdf_start}).`,
      '',
      '## Kaitan dengan CP dari JSON sumber',
      '',
      'Hubungan berikut masih usulan dan mencakup sebagian target fase. Menyelesaikan bab kelas 1 tidak otomatis menuntaskan CP akhir Fase A kelas 1–2. Guru tetap menetapkan TP/ATP serta memeriksa bukti asesmen.',
      '',
      ...c.cp_element_ids.map((id) => {
        const element = findCpElement(id)
        return `- [${element.source_code}. ${element.label}](${cpReference.source.official_pdf_url}#page=${element.source_pdf_pages[0]}) — ${id}`
      }),
      '',
      ...l.content.blocks.flatMap((b) =>
        b.heading ? [`## ${b.heading}`, '', b.body, ''] : ['**Coba sendiri:** ' + b.body, ''],
      ),
      '## Lanjut belajar',
      '',
      ...(c.order < 8
        ? [`[Bab berikutnya](bab-${String(c.order + 1).padStart(2, '0')}.md)`, '']
        : [
            'Kamu telah mencapai akhir urutan buku kelas 1. Tinjau bagian yang masih membutuhkan bantuan bersama pendamping.',
            '',
          ]),
    ]
    await writeFile(
      new URL(`bab-${String(c.order).padStart(2, '0')}.md`, base),
      lines.join('\n'),
      'utf8',
    )
  }
  await mkdir(new URL('../supabase/books/', import.meta.url), { recursive: true })
  await writeFile(
    new URL('../supabase/books/matematika-kelas-1-2022.sql', import.meta.url),
    generateTextbookSeed(),
    'utf8',
  )
  await writeFile(
    new URL('../content/textbook-manifest.json', import.meta.url),
    JSON.stringify(textbookManifest(), null, 2) + '\n',
    'utf8',
  )
  console.log('Bahan ajar kelas 1: 8 bab, 25 subbab, 40 kuis; dokumen dan SQL draf dibuat.')
}
if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url)
  await exportTextbooks()
