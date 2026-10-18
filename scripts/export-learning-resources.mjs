import { mkdir, writeFile } from 'node:fs/promises'
import {
  learningResources,
  curriculumPlan,
  curriculumSources,
  resourceSubjects,
  resourceCheckedAt,
} from '../src/lib/learningResources.js'

const name = (id) => resourceSubjects.find((s) => s.id === id)?.name || id
const lines = [
  '# Sumber materi dan rencana pengisian',
  '',
  `Pemeriksaan metadata: ${resourceCheckedAt}. Ada ${learningResources.length} rujukan buku/panduan resmi, ${curriculumPlan.length} kelompok kelas–pelajaran, dan ${curriculumPlan.reduce((n, p) => n + p.units.length, 0)} topik usulan.`,
  '',
  '**Status:** perpustakaan sumber dan 216 draf materi orisinal sudah masuk aplikasi. Tiap draf berisi bacaan, contoh, aktivitas dan lima soal. Seluruh draf menunggu review guru, bukan publikasi resmi. Buku lengkap tetap dibuka dari SIBI; isi PDF tidak disalin atau diunggah ulang. Lihat [paket siap review](MATERI-SIAP-REVIEW.md).',
  '',
  '## Tempat mencari referensi buku',
  '',
  'Sesuai pilihan pengguna, pencarian buku untuk paket berikutnya menggunakan [katalog SIBI Kemendikdasmen](https://buku.kemendikdasmen.go.id/katalog). Pilih SD/MI, kelas, mata pelajaran, buku siswa dan panduan guru yang sesuai; buka detail buku serta periksa edisi dan daftar isinya.',
  '',
  'Simpan judul, penulis, kelas, edisi/tahun, bab/halaman, URL detail buku dan tanggal akses pada paket. Jika belum ditemukan di SIBI, tandai rujukan belum lengkap. Akses buku dapat memerlukan akun/pendamping. Dokumen CP dan panduan mata pelajaran pada bagian acuan kurikulum tetap digunakan untuk memeriksa tujuan belajar.',
  '',
  '## Cakupan dan batas',
  '',
  'Pemeriksaan CP dan roadmap diperbarui pada 17 Oktober 2026. Gunakan [peta CP, sumber dan urutan semester](PETA-KURIKULUM-PEMERINTAH.md) bersama [roadmap pendidikan](ROADMAP-PENDIDIKAN.md); tanggal metadata buku di bawah tetap 16 Oktober 2026.',
  '',
  'Fokus awal enam pelajaran aplikasi untuk kelas 1–6. Ini belum mencakup seluruh mata pelajaran sekolah: PJOK, agama, muatan lokal dan cabang seni tambahan memerlukan kurasi tersendiri. Buku guru diberi label pendamping, tidak disamarkan sebagai buku siswa.',
  '',
  'CP menggunakan fase A (kelas 1–2), B (3–4), C (5–6). Pembagian topik per kelas di sini merupakan usulan aplikasi, bukan daftar isi buku atau ATP resmi yang sudah disahkan. IPAS dan pengenalan Inggris kelas 1–2 diberi label pengayaan; jangan mengklaim CP IPAS/Inggris Fase A berdasarkan daftar ini. Cabang seni mengikuti pilihan sekolah.',
  '',
  'Beberapa kelompok baru memiliki panduan guru. Tautan buku siswa spesifik, khususnya IPAS kelas 6, masih perlu dilengkapi melalui katalog resmi. Pemeriksaan metadata tidak membuktikan seluruh PDF dapat diunduh, semua bab sudah dibaca, atau seluruh edisi adalah edisi paling baru.',
  '',
  '## Daftar rujukan',
  '',
  '| Kelas | Pelajaran | Judul dan tautan resmi | Peruntukan | Bentuk |',
  '| --- | --- | --- | --- | --- |',
  ...learningResources.map(
    (r) =>
      `| ${r.grade} | ${name(r.subject)} | [${r.title}](${r.url}) | ${r.audience === 'teacher' ? 'Guru/pendamping' : 'Siswa'} | ${r.format} |`,
  ),
  '',
  '## Acuan kurikulum',
  '',
  ...curriculumSources.map((s) => `- [${s.title}](${s.url})`),
  '',
  '## Urutan topik usulan',
  '',
]
for (const plan of curriculumPlan) {
  lines.push(
    `### Kelas ${plan.grade} — ${name(plan.subject)}`,
    '',
    `${plan.enrichment ? 'Pengayaan awal' : `Fase ${plan.phase}`}. ${plan.note}`,
    '',
    ...plan.units.map(
      (u) =>
        `- [ ] ${u.order}. ${u.title} — draf bacaan, contoh, aktivitas dan lima soal terisi; review guru menunggu.`,
    ),
    '',
  )
}
lines.push(
  '## Cara mengubah rujukan menjadi materi interaktif',
  '',
  '1. Pilih satu kelas/pelajaran dan edisi buku siswa beserta panduan guru dari katalog SIBI. Catat judul, penulis/penerbit, kelas, edisi/tahun, bab/halaman, URL detail buku dan tanggal akses.',
  '2. Cocokkan dengan CP/ATP sekolah; tentukan tujuan pembelajaran dan pengetahuan awal. Jangan menganggap judul buku atau jumlah topik sebagai bukti cakupan lengkap.',
  '3. Susun bacaan orisinal dengan bahasa sesuai usia: tujuan, penjelasan bertahap, contoh dengan langkah, aktivitas aman, tips/miskonsepsi, rangkuman dan refleksi. Untuk kutipan/gambar adaptasi, periksa izin/lisensi dan atribusinya; akses gratis tidak otomatis berarti bebas mengunggah ulang seluruh buku.',
  '4. Susun 5–10 soal per sesi dengan satu jawaban tepat, pengecoh yang masuk akal, dan pembahasan. Variasikan pemahaman, penerapan dan penalaran. Latihan pilihan ganda tidak menggantikan penilaian praktik/menyimak/berbicara atau berkarya.',
  '5. Gunakan studio tutor/admin untuk menyimpan dan meninjau draf. Demo memiliki 260 materi dan 1.300 soal: 216 ringkasan awal/1.080 soal, 36 materi/180 soal lama, serta 8 bab/40 soal bahan ajar Matematika kelas 1. Ringkasan awal bukan buku lengkap. Lihat [bahan ajar per bab](materi/matematika/kelas-1/README.md). Seluruh tambahan tetap draf dan bukan klaim kelengkapan seluruh CP.',
  '6. Guru meninjau ketepatan, keterbacaan, kunci, kesesuaian usia, inklusivitas, kegiatan, media dan cakupan. Catat peninjau, tanggal dan hasil revisi sebelum publikasi admin.',
  '7. Uji alur membaca/kuis dan sumber pada HP, cek Network/privasi kunci, lalu tandai pekerjaan per topik yang benar-benar selesai.',
  '',
  '## Berkas data',
  '',
  '- `src/lib/learningResources.js`: sumber metadata perpustakaan dan kerangka usulan, tanpa bank soal.',
  '- `content/learning-outline.json`: ekspor urutan terstruktur; status setiap unit `draft` dan `needs_teacher_review`. Isi ada pada `src/content/` dan paket SQL.',
  '- `scripts/export-learning-resources.mjs`: menghasilkan ulang dokumen ini dan ekspor JSON.',
  '',
  'Tidak ada data Supabase yang diubah oleh penghasil dokumen. Pemasangan cloud tetap mengikuti README utama. Naskah PRD asli tetap dipertahankan.',
  '',
)
await mkdir(new URL('../content/', import.meta.url), { recursive: true })
await writeFile(new URL('../docs/SUMBER-MATERI.md', import.meta.url), lines.join('\n'), 'utf8')
await writeFile(
  new URL('../content/learning-outline.json', import.meta.url),
  JSON.stringify(
    {
      checked_at: resourceCheckedAt,
      notice:
        'Urutan usulan dengan isi draf orisinal terpisah; bukan materi terbit atau klaim pemetaan kurikulum lengkap.',
      resources: learningResources,
      curriculum_sources: curriculumSources,
      plans: curriculumPlan,
    },
    null,
    2,
  ) + '\n',
  'utf8',
)
console.log(
  'Daftar sumber dan kerangka editorial diekspor; tidak ada materi cloud yang dipublikasikan.',
)
