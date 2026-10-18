import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

export const cpSnapshotUrl = new URL(
  '../docs/source/Kepka_BSKAP_046_H_KR_2025.json',
  import.meta.url,
)
export const cpOutputUrl = new URL('../content/cp-sd-2025.json', import.meta.url)
const officialUrl =
  'https://bpmpbabel.kemendikdasmen.go.id/PPID/wp-content/uploads/2025/07/KepKaBSKAP-046_2025-ttg-CP.pdf'
const configs = [
  ['pancasila', 'pancasila', 'PENDIDIKAN PANCASILA', 'Pendidikan Pancasila', ['A', 'B', 'C'], 4],
  [
    'bahasa-indonesia',
    'bahasa-indonesia',
    'BAHASA INDONESIA',
    'Bahasa Indonesia',
    ['A', 'B', 'C'],
    4,
  ],
  ['matematika', 'matematika', 'MATEMATIKA', 'Matematika', ['A', 'B', 'C'], 5],
  ['bahasa-inggris', 'bahasa-inggris', 'BAHASA INGGRIS', 'Bahasa Inggris', ['B', 'C'], 3],
  ['ipas', 'ipas', 'ILMU PENGETAHUAN ALAM DAN SOSIAL (IPAS)', 'IPAS', ['B', 'C'], 2],
  ['seni-musik', 'seni-budaya', 'SENI MUSIK', 'Seni Musik', ['A', 'B', 'C'], 5],
  ['seni-rupa', 'seni-budaya', 'SENI RUPA', 'Seni Rupa', ['A', 'B', 'C'], 5],
  ['seni-tari', 'seni-budaya', 'SENI TARI', 'Seni Tari', ['A', 'B', 'C'], 5],
  ['seni-teater', 'seni-budaya', 'SENI TEATER', 'Seni Teater', ['A', 'B', 'C'], 5],
]
const labelPatterns = {
  pancasila:
    /^(Pancasila|Undang-Undang Dasar Negara Republik Indonesia Tahun 1945|Bhinneka Tunggal Ika|Negara Kesatuan Republik Indonesia)\b/,
  'bahasa-indonesia': /^(Menyimak|Membaca dan Memirsa|Berbicara dan Mempresentasikan|Menulis)\b/,
  matematika: /^(Bilangan|Aljabar|Pengukuran|Geometri|Analisis Data dan Peluang)\b/,
  'bahasa-inggris':
    /^(Menyimak\s*[-–]\s*Berbicara|Membaca\s*[-–]\s*Memirsa|Menulis\s*[-–]\s*Mempresentasikan)\s*\([^)]*\)/,
  ipas: /^(Pemahaman IPAS|Keterampilan Proses)\b/,
  'seni-budaya':
    /^(Mengalami|Merefleksikan|Berpikir dan Bekerja Artistik|Bekerja Secara Artistik|Menciptakan|Berdampak)\s*\([^)]*\)/,
}
const clean = (value) => value.replace(/\s+/g, ' ').trim()

export function extractCpReference(raw) {
  const buffer = Buffer.isBuffer(raw) ? raw : Buffer.from(raw)
  const document = JSON.parse(buffer.toString('utf8').replace(/^\uFEFF/, ''))
  if (document.metadata?.nomor !== '046/H/KR/2025') throw new Error('Nomor dokumen CP tidak sesuai')
  if (!Array.isArray(document.halaman) || !Array.isArray(document.daftar_isi))
    throw new Error('Halaman/indeks JSON tidak tersedia')
  if (document.halaman.length !== document.metadata.jumlah_halaman_pdf)
    throw new Error('Jumlah halaman tidak sesuai metadata')
  document.halaman.forEach((page, index) => {
    if (page.nomor_halaman_pdf !== index + 1 || typeof page.teks !== 'string')
      throw new Error(`Urutan/teks halaman ${index + 1} tidak valid`)
  })
  const toc = document.daftar_isi.find((item) => /^Lampiran II\./.test(item.judul))?.subbagian
  if (!Array.isArray(toc)) throw new Error('Indeks Lampiran II tidak ditemukan')
  const scopes = []
  const sourcePages = new Set()
  for (const [id, appSubject, suffix, name, allowedPhases, expectedCount] of configs) {
    const tocIndex = toc.findIndex((item) => item.judul.endsWith(suffix))
    const item = toc[tocIndex]
    const startPage = item?.subbagian?.find((section) => /^D\./.test(section.judul))?.halaman_pdf
    const endPage = toc[tocIndex + 1]?.halaman_pdf || 347
    if (!startPage) throw new Error(`Bagian capaian ${name} tidak ditemukan`)
    let joined = ''
    const segments = []
    for (const page of document.halaman.filter(
      (p) =>
        p.bagian_id === 'lampiran_ii' &&
        p.nomor_halaman_pdf >= startPage &&
        p.nomor_halaman_pdf <= endPage,
    )) {
      const text = clean(page.teks)
      segments.push({
        page: page.nomor_halaman_pdf,
        start: joined.length,
        end: joined.length + text.length,
        text,
      })
      joined += text + '\n'
    }
    const dStart = joined.search(/D\.\s*Capaian Pembelajaran/)
    if (dStart < 0) throw new Error(`Judul bagian D ${name} tidak ditemukan`)
    const body = joined.slice(dStart)
    const nextSubject = body.search(/[IVXLCDM]+\.(?:\d+\.)?\s*CAPAIAN PEMBELAJARAN/)
    const dBody = nextSubject < 0 ? body : body.slice(0, nextSubject)
    const phaseMatches = [...dBody.matchAll(/\b([1-6])\.\s*Fase\s+([A-F])\s*\(/g)]
    for (let i = 0; i < phaseMatches.length; i++) {
      const phaseMatch = phaseMatches[i]
      const phase = phaseMatch[2]
      if (!allowedPhases.includes(phase)) continue
      const phaseStart = dStart + phaseMatch.index
      const phaseEnd = dStart + (phaseMatches[i + 1]?.index ?? dBody.length)
      const phaseText = joined.slice(phaseStart, phaseEnd).trimEnd()
      // Wajib titik + spasi dan ordinal 1–5: 10.000 / 1.000.000 bukan nomor elemen.
      const elementMatches = [...phaseText.matchAll(/\b([1-6])\.([1-5])\.\s+/g)]
      if (elementMatches.length !== expectedCount)
        throw new Error(
          `Jumlah elemen ${name} ${phase}: ${elementMatches.length}, diharapkan ${expectedCount}`,
        )
      const warnings = []
      const elements = elementMatches.map((match, index) => {
        if (match[1] !== phaseMatch[1] || Number(match[2]) !== index + 1)
          throw new Error(`Urutan elemen ${name} ${phase} tidak konsisten`)
        const start = phaseStart + match.index
        const end = phaseStart + (elementMatches[index + 1]?.index ?? phaseText.length)
        const afterCode = clean(joined.slice(start + match[0].length, end))
        const label = afterCode.match(labelPatterns[appSubject])?.[0]
        if (!label)
          throw new Error(`Label elemen belum dikenali: ${name}/${phase}/${afterCode.slice(0, 90)}`)
        const spans = segments
          .filter((s) => s.end > start && s.start < end)
          .map((s) => ({
            page: s.page,
            normalized_text_start: Math.max(0, start - s.start),
            normalized_text_end: Math.min(s.text.length, end - s.start),
          }))
        spans.forEach((s) => sourcePages.add(s.page))
        const elementWarnings = []
        if (id === 'bahasa-inggris' && phase === 'C' && index === 0)
          elementWarnings.push(
            'Label sumber Inggris tertulis Listening - Writing untuk Menyimak - Berbicara; dipertahankan sebagai catatan sumber, bukan dibetulkan diam-diam.',
          )
        if (id === 'matematika' && phase === 'A' && index === 1)
          elementWarnings.push(
            'Contoh visual setelah kata Contoh tidak dapat dipulihkan dari ekstraksi teks JSON; lihat PDF asli.',
          )
        return {
          id: `cp2025-${id}-${phase.toLowerCase()}-${index + 1}`,
          source_code: `${match[1]}.${match[2]}`,
          label: label.replace(/\s*\([^)]*\)$/, '').trim(),
          source_label: label,
          text: afterCode.slice(label.length).trim(),
          source_excerpt: clean(joined.slice(start, end)),
          source_pdf_pages: spans.map((s) => s.page),
          source_spans: spans,
          warnings: elementWarnings,
        }
      })
      const heading = clean(phaseText.slice(0, elementMatches[0].index))
      if (id === 'bahasa-inggris' && phase === 'C')
        warnings.push(
          'Heading sumber menyebut kelas III dan IV pada Fase C. Kelas aplikasi tetap 5–6 menurut pembagian fase umum; teks heading sumber dipertahankan. Catatan ini bukan ralat resmi.',
        )
      scopes.push({
        id: `cp2025-${id}-${phase.toLowerCase()}`,
        subject: id,
        app_subject: appSubject,
        name,
        phase,
        grades: phase === 'A' ? [1, 2] : phase === 'B' ? [3, 4] : [5, 6],
        grade_mapping:
          'Pembagian umum fase aplikasi; bukan pembagian TP per kelas yang disahkan sekolah.',
        source_appendix: 'lampiran_ii',
        source_section: item.judul,
        source_heading: heading,
        source_pdf_pages: [...new Set(elements.flatMap((e) => e.source_pdf_pages))],
        warnings,
        elements,
      })
    }
    const found = scopes.filter((s) => s.subject === id).map((s) => s.phase)
    if (found.join(',') !== allowedPhases.join(','))
      throw new Error(`Fase ${name} tidak lengkap: ${found}`)
  }
  const elementCount = scopes.reduce((n, s) => n + s.elements.length, 0)
  if (scopes.length !== 25 || elementCount !== 109)
    throw new Error('Cakupan SD yang dipilih tidak lengkap')
  return {
    schema_version: '1.0',
    source: {
      filename: 'Kepka_BSKAP_046_H_KR_2025.json',
      sha256: createHash('sha256').update(buffer).digest('hex'),
      bytes: buffer.length,
      metadata: document.metadata,
      extraction_notes: document.catatan_ekstraksi,
      official_pdf_url: officialUrl,
      source_json_url: 'docs/source/Kepka_BSKAP_046_H_KR_2025.json',
    },
    selection: {
      appendix: 'lampiran_ii',
      education: 'SD/MI pada jalur umum; tidak memakai CP SMK, Paket atau pendidikan khusus.',
      phases: ['A', 'B', 'C'],
      app_subject_count: 6,
      government_subject_count: configs.length,
      scope_count: scopes.length,
      element_count: elementCount,
      selected_pdf_pages: [...sourcePages].sort((a, b) => a - b),
    },
    limitations: [
      'JSON adalah hasil ekstraksi teks CP, bukan buku pelajaran atau modul ajar.',
      'Spasi/baris dinormalisasi untuk keterbacaan; nomor bagian dan rumusan sumber dipertahankan.',
      'Gambar dan contoh visual tidak tersedia dari JSON; periksa PDF jika diperlukan.',
      'Kelas 1–2 IPAS/Inggris adalah pengayaan aplikasi; tidak dibuatkan CP Fase A.',
      'Cabang seni mempunyai capaian terpisah; sekolah menentukan cabang yang dipakai.',
      'Hubungan CP ke bab/unit, TP, ATP dan bukti asesmen tetap usulan sampai ditinjau guru.',
    ],
    scopes,
  }
}

export async function importCpReference(sourcePath) {
  const raw = await readFile(sourcePath || cpSnapshotUrl)
  const data = extractCpReference(raw)
  await mkdir(new URL('../docs/source/', import.meta.url), { recursive: true })
  await mkdir(new URL('../content/', import.meta.url), { recursive: true })
  if (sourcePath && resolve(sourcePath) !== fileURLToPath(cpSnapshotUrl))
    await writeFile(cpSnapshotUrl, raw)
  await writeFile(cpOutputUrl, JSON.stringify(data, null, 2) + '\n', 'utf8')
  console.log(
    `CP JSON dipelajari: ${data.source.metadata.jumlah_halaman_pdf} halaman, dipilih ${data.selection.scope_count} mapel–fase / ${data.selection.element_count} elemen SD; sumber utuh disimpan tanpa perubahan.`,
  )
  return data
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  const arg = process.argv.slice(2).find((value) => value.startsWith('--source='))
  await importCpReference(arg ? resolve(arg.slice('--source='.length)) : undefined)
}
