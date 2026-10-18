import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { cpReference } from '../src/lib/cpReference.js'
import {
  curriculumPlan,
  curriculumSources,
  learningResources,
  resourceSubjects,
} from '../src/lib/learningResources.js'
import {
  governmentCheckedAt,
  governmentScopes,
  governmentMaterials,
  getGovernmentScope,
  officialCp,
  officialMaterialsIndex,
  englishTransitionUrl,
  unitAlignmentNotes,
} from '../src/lib/governmentCurriculum.js'

const name = (id) => resourceSubjects.find((s) => s.id === id)?.name || id
const cell = (value) => String(value).replaceAll('|', '\\|').replaceAll('\n', ' ')
const phaseLabel = (p) => (p.enrichment ? 'Pengayaan' : `Fase ${p.phase}`)
const sourceLink = (s) => `[${s.title}](${s.url})`
const startMarker = '<!-- government-curriculum:start -->'
const endMarker = '<!-- government-curriculum:end -->'

export function curriculumAlignmentManifest() {
  return {
    version: governmentCheckedAt,
    scope: 'Enam pelajaran aplikasi kelas 1–6; bukan seluruh mata pelajaran SD.',
    mapping_status: 'proposed_mapping',
    notice:
      'Register kerja editorial. Pembagian semester, CP ke unit dan kesesuaian isi belum disahkan guru.',
    official_cp: officialCp,
    cp_source: {
      json: 'content/cp-sd-2025.json',
      source_json: cpReference.source.source_json_url,
      sha256: cpReference.source.sha256,
      scope_count: cpReference.selection.scope_count,
      element_count: cpReference.selection.element_count,
    },
    sources: curriculumSources,
    official_materials: governmentMaterials,
    phase_scopes: governmentScopes,
    unit_count: 216,
    units: curriculumPlan.flatMap((plan) =>
      plan.units.map((unit) => {
        const scope = getGovernmentScope(plan.subject, plan.grade)
        return {
          id: unit.id,
          slug: unit.slug,
          title: unit.title,
          subject: plan.subject,
          grade: plan.grade,
          app_phase: plan.phase,
          government_phase: scope.government_phase,
          proposed_semester: unit.order <= 3 ? 1 : 2,
          order: unit.order,
          phase_scope_id: scope.id,
          cp_reference: scope.government_phase
            ? { url: officialCp.url, pdf_pages: scope.cp_pdf_pages, scope_ids: scope.cp_scope_ids }
            : null,
          book_references: learningResources
            .filter((r) => r.subject === plan.subject && r.grade === plan.grade)
            .map(({ title, url, audience }) => ({ title, url, audience })),
          role:
            plan.enrichment ||
            [
              'kurikulum-matematika-2-3',
              'kurikulum-matematika-2-4',
              'kurikulum-matematika-2-5',
            ].includes(unit.id)
              ? 'enrichment_proposed'
              : 'pending_review',
          alignment_note: unitAlignmentNotes[unit.id] || plan.note,
          review_priorities: scope.review_priorities,
          mapping_status: 'proposed_mapping',
          cp_element_confirmed: null,
          learning_objective_confirmed: null,
          atp_position_confirmed: null,
          book_chapter_or_page_confirmed: null,
          assessment_evidence_confirmed: null,
          reviewed_by: null,
          reviewed_at: null,
        }
      }),
    ),
  }
}

function semesterRows() {
  return [...curriculumPlan]
    .sort(
      (a, b) =>
        a.grade - b.grade ||
        resourceSubjects.findIndex((s) => s.id === a.subject) -
          resourceSubjects.findIndex((s) => s.id === b.subject),
    )
    .map(
      (p) =>
        `| ${p.grade} | ${name(p.subject)} | ${phaseLabel(p)} | ${cell(
          p.units
            .slice(0, 3)
            .map((u) => u.title)
            .join('; '),
        )} | ${cell(
          p.units
            .slice(3)
            .map((u) => u.title)
            .join('; '),
        )} |`,
    )
}

function readmeSection() {
  return [
    startMarker,
    '## Acuan pemerintah dan roadmap materi',
    '',
    'Materi disusun per bab dari buku siswa/panduan guru pemerintah, lalu dicocokkan dengan CP dan ATP sekolah. Cakupan aplikasi dibatasi pada:',
    '',
    '| Pelajaran | Kelas dalam proyek |',
    '| --- | --- |',
    '| Matematika | 1–6 |',
    '| Bahasa Indonesia | 1–6 |',
    '| Pendidikan Pancasila | 1–6 |',
    '| IPAS | 3–6; kelas 1–2 pengayaan |',
    '| Bahasa Inggris | 3–6; kelas 1–2 pengayaan |',
    '| Seni dan Budaya | 1–6; satu cabang sesuai sekolah |',
    '',
    '**Pencarian referensi buku berikutnya:** gunakan [katalog SIBI Kemendikdasmen](https://buku.kemendikdasmen.go.id/katalog). Pilih buku siswa/panduan guru sesuai kelas dan pelajaran; catat judul, edisi/tahun, bab/halaman serta URL detail buku. Jika belum ditemukan di katalog, tandai rujukan yang perlu dilengkapi.',
    '',
    '**Fokus sekarang:** tuntaskan peninjauan [delapan bab Matematika kelas 1](docs/materi/matematika/kelas-1/README.md), lalu lanjutkan kelompok kelas–pelajaran berikutnya. Sebanyak 216 unit lama masih ringkasan awal; jumlah bab mengikuti buku yang dipilih.',
    '',
    'Ikuti [roadmap pendidikan](docs/ROADMAP-PENDIDIKAN.md) untuk urutan sumber → tujuan → penulisan bab → asesmen → review → uji coba → publikasi. Aktifkan Supabase dan deployment setelah layanan tersedia serta pemeriksaan teknis selesai.',
    '',
    'Rincian seluruh kelas/semester dan tautan sumber tetap tersedia pada [peta kurikulum](docs/PETA-KURIKULUM-PEMERINTAH.md) bila diperlukan.',
    endMarker,
    '',
  ].join('\n')
}

export async function exportGovernmentCurriculum() {
  const manifest = curriculumAlignmentManifest()
  const lines = [
    '# Peta kurikulum dan materi pemerintah',
    '',
    `Pemeriksaan ${governmentCheckedAt}. Peta ini mendampingi [README](../README.md#acuan-pemerintah-dan-roadmap-materi) dan [roadmap](ROADMAP-PENDIDIKAN.md). Hubungan unit terhadap CP/TP/ATP tetap berupa usulan; belum ada persetujuan guru.`,
    '',
    '## Dasar dan cara menelusuri sumber',
    '',
    `1. Baca ${sourceLink(officialCp)}. Penunjuk di bawah memakai halaman PDF mulai 1 dari halaman pertama berkas, bukan nomor halaman buku cetak. Bagian keenam pelajaran SD telah dibaca; dokumen lengkap juga memuat jenjang/pelajaran lain.`,
    '2. Periksa penjelasan pemerintah tentang perubahan CP 2026 pada daftar sumber. Enam pelajaran ini tetap memakai CP 2025.',
    '3. Pilih edisi buku siswa dan panduan guru pada [SIBI](https://buku.kemendikdasmen.go.id/katalog). Metadata 34 buku tetap mencatat pemeriksaan 16 Oktober 2026; edisi/halaman setiap unit belum diaudit.',
    `4. Gunakan [indeks materi SD Ruang Murid](${officialMaterialsIndex}) untuk pelengkap. Kelompok kelas pada katalog tidak otomatis merupakan bukti pemenuhan CP.`,
    '5. Turunkan TP, tetapkan ATP sekolah, pilih kegiatan dan asesmen, lalu catat hasil review. Nama topik yang mirip tidak cukup untuk menyatakan selaras.',
    '',
    '### Catatan ketidakkonsistenan sumber',
    '',
    'Pada salinan CP 046/2025 yang diperiksa, halaman PDF 134 menuliskan Fase C Bahasa Inggris dengan kelas III–IV dan terjemahan elemen menyimak-berbicara yang tidak konsisten. Label tersebut tidak disalin sebagai pembagian kelas aplikasi. Peta memakai pembagian umum Fase C kelas V–VI dan pemeriksaan silang [Panduan Bahasa Inggris 2025, halaman PDF 25–26](https://repositori.kemendikdasmen.go.id/33628/1/3.%20Final%20Panduan%20Mata%20Pelajaran%20Bahasa%20Inggris_12_09_2025_Revisi%203.pdf#page=25). Catatan ini bukan surat ralat resmi; konfirmasi kepada sekolah/pengelola kurikulum bila diperlukan.',
    '',
    '## Rujukan resmi',
    '',
    ...curriculumSources.map((s) => `- ${sourceLink(s)}`),
    `- [Kebijakan transisi Bahasa Inggris SD](${englishTransitionUrl})`,
    '',
    'Sebagian endpoint panduan PDF mengalami timeout pada pemeriksaan langsung; metadata indeks atau repositori digunakan sebagai rujukan alternatif. Jangan menyamakan tautan tersedia dengan seluruh buku, media, dan izin reproduksi telah diaudit.',
    '',
    '## Cakupan per fase',
    '',
    'Ringkasan berikut merupakan parafrasa editorial dan titik pemeriksaan, bukan kutipan CP lengkap. Baca sumber untuk seluruh rumusan, konteks dan detail. IPAS/Inggris Fase A adalah pengayaan aplikasi. Seni dipisahkan menurut cabang dalam dokumen CP.',
    '',
    '| Pelajaran | Fase/kelas | Arah isi | Bukti belajar yang perlu disiapkan | Halaman PDF CP |',
    '| --- | --- | --- | --- | --- |',
    ...governmentScopes.map(
      (s) =>
        `| ${name(s.subject)} | ${s.government_phase ? s.phase : 'Pengayaan A'} / ${s.phase === 'A' ? '1–2' : s.phase === 'B' ? '3–4' : '5–6'} | ${cell(s.focus)} | ${cell(s.assessment)} | ${s.cp_pdf_pages.length ? `[${s.cp_pdf_pages.join(', ')}](${officialCp.url}#page=${s.cp_pdf_pages[0]})` : 'Tidak ada CP mapel Fase A pada sumber yang diperiksa'} |`,
    ),
    '',
    '## Prioritas audit per fase',
    '',
    ...governmentScopes.flatMap((s) => [
      `### ${name(s.subject)} — ${s.phase}`,
      '',
      ...s.review_priorities.map((p) => `- [ ] ${p}`),
      '',
    ]),
    '## Contoh bahan pendamping pemerintah',
    '',
    'Judul dan kelompok kelas diperiksa pada indeks, serta metadata judul pada halaman tujuan. Halaman bersifat dinamis; pemutaran, isi lengkap dan kebutuhan login belum diuji. Satu tautan indeks yang mengarah ke judul berbeda tidak dimasukkan. Enam contoh ini tidak mewakili seluruh materi pemerintah.',
    '',
    '| Pelajaran | Kelas | Materi | Bentuk |',
    '| --- | --- | --- | --- |',
    ...governmentMaterials.map(
      (m) => `| ${name(m.subject)} | ${m.grades.join('–')} | ${sourceLink(m)} | ${m.format} |`,
    ),
    '',
    '## Urutan kelas dan semester usulan',
    '',
    'Semester dapat diubah guru. Tiga unit per semester adalah pembagian kerja aplikasi; bukan beban belajar/kalender resmi. Semua unit masih draf. Lihat [checklist 216 unit](MATERI-SIAP-REVIEW.md).',
    '',
    '| Kelas | Pelajaran | Lingkup | Semester 1 — usulan | Semester 2 — usulan |',
    '| --- | --- | --- | --- | --- |',
    ...semesterRows(),
    '',
    '## Register tiap unit dan rujukan buku',
    '',
    'Elemen CP dan halaman buku per unit belum dikonfirmasi. Tautan di bawah menunjuk buku/panduan kelas terkait untuk ditelusuri guru, bukan bukti bahwa topik tersebut ditemukan pada halaman tertentu. Daftar tanpa buku tidak digantikan tautan rekaan. Rujukan cabang seni yang masih kurang harus dilengkapi.',
    '',
  ]
  for (const plan of curriculumPlan) {
    const refs = learningResources.filter(
      (r) => r.subject === plan.subject && r.grade === plan.grade,
    )
    const scope = getGovernmentScope(plan.subject, plan.grade)
    lines.push(
      `### Kelas ${plan.grade} — ${name(plan.subject)}`,
      '',
      `${phaseLabel(plan)}. ${plan.note}`,
      '',
      ...(refs.length
        ? refs.map(
            (r) => `- ${r.audience === 'teacher' ? 'Guru/pendamping' : 'Siswa'}: ${sourceLink(r)}`,
          )
        : [
            '- Buku khusus kelas ini belum ada pada register; cari melalui SIBI dan catat hasilnya.',
          ]),
      '',
      `Arah fase: ${scope.focus}`,
      '',
      '| ID unit | Materi | Semester usulan | Pemetaan/review |',
      '| --- | --- | --- | --- |',
      ...plan.units.map(
        (u) =>
          `| ${u.id} | ${u.title}${unitAlignmentNotes[u.id] ? ` — ${unitAlignmentNotes[u.id]}` : ''} | ${u.order <= 3 ? 1 : 2} | [ ] Guru mengisi CP/TP/ATP, halaman sumber, asesmen dan hasil review |`,
      ),
      '',
    )
  }
  lines.push(
    '## Berkas dan regenerasi',
    '',
    '- [curriculum-alignment.json](../content/curriculum-alignment.json) memuat 216 unit, fase acuan, rujukan, semester usulan, dan kolom konfirmasi kosong. Tidak ada kunci soal.',
    '- [Roadmap pendidikan](ROADMAP-PENDIDIKAN.md) memuat langkah R01–R10, rubrik usulan dan kartu kerja per unit.',
    '- Jalankan `npm run content:roadmap` setelah mengubah acuan/peta; `npm run content:generate` juga memperbarui paket materi.',
    '- Generator tidak membuat akun, tidak mengubah database cloud dan tidak menyetujui review guru.',
    '',
  )
  await mkdir(new URL('../content/', import.meta.url), { recursive: true })
  await writeFile(
    new URL('../content/curriculum-alignment.json', import.meta.url),
    JSON.stringify(manifest, null, 2) + '\n',
    'utf8',
  )
  await writeFile(
    new URL('../docs/PETA-KURIKULUM-PEMERINTAH.md', import.meta.url),
    lines.join('\n'),
    'utf8',
  )
  const readmeUrl = new URL('../README.md', import.meta.url)
  const readme = await readFile(readmeUrl, 'utf8')
  const appendixStart = readme.indexOf('## Sumber lengkap')
  if (appendixStart < 0) throw new Error('Batas sumber asli README tidak ditemukan')
  let main = readme.slice(0, appendixStart)
  const appendix = readme.slice(appendixStart)
  if (main.includes(startMarker)) {
    const start = main.indexOf(startMarker)
    const end = main.indexOf(endMarker, start)
    if (end < start) throw new Error('Batas section kurikulum tidak lengkap')
    main =
      main.slice(0, start) +
      readmeSection() +
      main.slice(end + endMarker.length).replace(/^\r?\n/, '')
  } else {
    const insertAt = main.indexOf('## Visi dan kebutuhan produk')
    if (insertAt < 0) throw new Error('Lokasi section README tidak ditemukan')
    main = main.slice(0, insertAt) + readmeSection() + '\n' + main.slice(insertAt)
  }
  const toc = '- [Acuan pemerintah dan roadmap materi](#acuan-pemerintah-dan-roadmap-materi)'
  if (!main.includes(toc))
    main = main.replace('- [Visi dan kebutuhan produk]', `${toc}\n- [Visi dan kebutuhan produk]`)
  const original = await readFile(
    new URL('../docs/source/MASTER-PRD-ASLI.txt', import.meta.url),
    'utf8',
  )
  const output = main + appendix
  if (!output.includes(original.trim())) throw new Error('Naskah asli README berubah')
  await writeFile(readmeUrl, output, 'utf8')
  console.log(
    'Peta 18 kelompok fase, 216 unit dan roadmap README diperbarui; review guru/cloud tetap menunggu.',
  )
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  await exportGovernmentCurriculum()
}
