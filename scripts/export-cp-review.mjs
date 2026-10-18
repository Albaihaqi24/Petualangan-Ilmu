import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { cpReference, findCpElement } from '../src/lib/cpReference.js'
import { textbookCatalog } from '../src/lib/textbooks.js'
import { resourceSubjects } from '../src/lib/learningResources.js'

const cell = (value) => String(value).replaceAll('|', '\\|').replaceAll('\n', ' ')
const firstMarker = '<!-- cp-json:start -->'
const lastMarker = '<!-- cp-json:end -->'

export async function exportCpReview() {
  const data = cpReference
  const lines = [
    '# Acuan CP yang dipakai Petualangan Ilmu',
    '',
    'Cakupan proyek: enam pelajaran SD kelas 1–6. Bagian JSON yang dipakai adalah capaian Fase A (kelas 1–2), B (3–4), dan C (5–6) dari Lampiran II. Bagian jenjang dan pelajaran lain cukup disimpan pada arsip sumber.',
    '',
    '## Enam pelajaran proyek',
    '',
    '| Pelajaran aplikasi | Acuan yang digunakan |',
    '| --- | --- |',
    ...resourceSubjects.map((subject) => {
      const phases = [
        ...new Set(
          data.scopes
            .filter((scope) => scope.app_subject === subject.id)
            .map((scope) => scope.phase),
        ),
      ]
      const note =
        subject.id === 'seni-budaya'
          ? '; pilih satu cabang sesuai sekolah: rupa, musik, tari, atau teater'
          : ['ipas', 'bahasa-inggris'].includes(subject.id)
            ? '; kelas 1–2 berlabel pengayaan'
            : ''
      return '| ' + subject.name + ' | Fase ' + phases.join(', ') + note + ' |'
    }),
    '',
    'CP menjelaskan target akhir fase. Isi per bab disusun dari buku siswa dan panduan guru; pembagian kelas/semester disesuaikan dengan ATP sekolah. Rumusan CP tidak otomatis menjadi bab atau bukti materi sudah lengkap.',
    '',
    '## Paket yang sedang dikerjakan',
    '',
    '[Matematika kelas 1](materi/matematika/kelas-1/README.md) sudah mempunyai delapan bab dan 25 subbab. Hubungan berikut masih usulan dan hanya mencakup sebagian target Fase A (kelas 1–2). Guru perlu menyetujui tujuan dan asesmen sebelum publikasi.',
    '',
    '| Bab | Materi | Elemen rujukan |',
    '| --- | --- | --- |',
    ...textbookCatalog[0].chapters.map(
      (chapter) =>
        '| ' +
        chapter.order +
        ' | ' +
        cell(chapter.title) +
        ' | ' +
        chapter.cp_element_ids.map((id) => findCpElement(id).label).join('; ') +
        ' |',
    ),
    '',
    'Urutan pengerjaan berikutnya ada pada [roadmap pendidikan](ROADMAP-PENDIDIKAN.md). Kelompok kelas–pelajaran lain dilengkapi satu per satu sesuai buku/edisinya; 216 ringkasan awal tetap menjadi inventaris draf.',
    '',
    '## Cara tampil di aplikasi',
    '',
    '- Pilih kelas dan satu pelajaran pada perpustakaan. Acuan CP pendamping tersedia sebagai panel opsional; pilihan buku siswa menyembunyikan panel itu.',
    '- Pada seni, pilih satu cabang sebelum rumusan ditampilkan.',
    '- Pada bahan ajar per bab, panel hanya memuat elemen yang dirujuk bab tersebut.',
    '- Semua hubungan ke bab/unit tetap menunggu review guru; membuka acuan tidak menambah XP atau menerbitkan materi.',
    '',
    '## Sumber untuk peninjau dan pengembang',
    '',
    '[PDF pemerintah](' +
      data.source.official_pdf_url +
      ') dan [data CP SD terpilih](../content/cp-sd-2025.json) menyimpan rumusan serta halaman rujukan. Data terpilih berisi ' +
      data.selection.scope_count +
      ' kelompok fase / ' +
      data.selection.element_count +
      ' butir untuk enam pelajaran; empat cabang seni disimpan terpisah agar dapat dipilih.',
    '',
    '[Salinan JSON utuh](source/Kepka_BSKAP_046_H_KR_2025.json) dipertahankan sebagai arsip. Nomor dokumen: ' +
      data.source.metadata.nomor +
      '. SHA-256: ' +
      data.source.sha256 +
      '.',
    '',
    'Catatan sumber yang relevan: heading/terjemahan Inggris Fase C memiliki ketidakkonsistenan; contoh visual Aljabar Fase A tidak tersedia dari ekstraksi teks. Catatan dan teks asli tetap dicatat pada data terpilih; periksa PDF saat menyusun materi terkait.',
    '',
    'Pengembang: jalankan `npm run content:cp` untuk menghasilkan ulang data, ringkasan dan referensi bab. Proses ini tidak mengubah cloud atau status review guru.',
    '',
  ]
  await writeFile(
    new URL('../docs/KAJIAN-JSON-CP-2025.md', import.meta.url),
    lines.join('\n'),
    'utf8',
  )
  const section = [
    firstMarker,
    '## Acuan JSON CP yang dipakai',
    '',
    'JSON pemerintah sudah disaring untuk **enam pelajaran SD kelas 1–6**. Yang digunakan hanya Fase A–C dari Lampiran II; sumber lengkap disimpan sebagai arsip.',
    '',
    'IPAS dan Bahasa Inggris kelas 1–2 berlabel pengayaan. Seni mengikuti satu cabang pilihan sekolah. Rumusan CP tersedia sebagai acuan opsional pendamping sesuai pilihan pelajaran atau bab.',
    '',
    '- [x] Acuan yang relevan dipilih dan ditautkan ke register materi serta delapan bab Matematika kelas 1.',
    '- [ ] Guru menyetujui tujuan pembelajaran, urutan dan asesmen sebelum materi diterbitkan.',
    '',
    'Bila perlu memeriksa sumber, buka [ringkasan penerapan CP](docs/KAJIAN-JSON-CP-2025.md). Untuk pengerjaan sehari-hari, cukup ikuti roadmap di bawah.',
    lastMarker,
    '',
  ].join('\n')
  const readmeUrl = new URL('../README.md', import.meta.url)
  const readme = await readFile(readmeUrl, 'utf8')
  const appendixStart = readme.indexOf('## Sumber lengkap')
  if (appendixStart < 0) throw new Error('Batas sumber PRD tidak ditemukan')
  let main = readme.slice(0, appendixStart)
  const appendix = readme.slice(appendixStart)
  if (main.includes(firstMarker)) {
    const start = main.indexOf(firstMarker)
    const end = main.indexOf(lastMarker, start)
    if (end < start) throw new Error('Batas section JSON tidak lengkap')
    main =
      main.slice(0, start) + section + main.slice(end + lastMarker.length).replace(/^\r?\n/, '')
  } else {
    const target = main.indexOf('<!-- government-curriculum:start -->')
    if (target < 0) throw new Error('Bagian kurikulum tidak ditemukan')
    main = main.slice(0, target) + section + '\n' + main.slice(target)
  }
  const toc = '- [Acuan JSON CP yang dipakai](#acuan-json-cp-yang-dipakai)'
  if (!main.includes(toc))
    main = main.replace(
      '- [Acuan pemerintah dan roadmap materi]',
      `${toc}\n- [Acuan pemerintah dan roadmap materi]`,
    )
  const original = await readFile(
    new URL('../docs/source/MASTER-PRD-ASLI.txt', import.meta.url),
    'utf8',
  )
  if (!(main + appendix).includes(original.trim())) throw new Error('Naskah PRD asli berubah')
  await writeFile(readmeUrl, main + appendix, 'utf8')
  console.log('Ringkasan CP enam pelajaran dan README diperbarui; review guru tetap menunggu.')
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url)
  await exportCpReview()
