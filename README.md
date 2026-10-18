# Petualangan Ilmu

Paket pengujian: [QA black-box, white-box, dan laporan hasil](docs/qa/README.md).

**Tambahan 18 Oktober 2026:** [paket 72 bab kelas 1–6](docs/materi/paket-72-bab/README.md) untuk Matematika, Bahasa Indonesia, serta IPA & Sains: 216 subbab, 216 latihan mandiri berpembahasan dan 360 soal kuis. Buka [perpustakaan paket](http://127.0.0.1:5173/sumber-belajar?grade=1#paket-72-bab), pilih kelas/pelajaran dan masuk demo siswa. Total demo menjadi **332 materi/1660 soal**. Ini bahan ajar draf pilihan aplikasi, bukan daftar bab resmi; guru masih perlu meninjau isi/kunci dan CP/ATP. Sains kelas 1–2 adalah pengayaan; paket ini belum mencakup seluruh aspek sosial IPAS.

Generator: `npm run content:adventure`. Paket cloud: `supabase/paket-72-bab.sql`, dipasang sesudah empat migration dan seed awal; semua draf dan tidak otomatis diterbitkan. [Panduan kuis pendamping](docs/materi/paket-72-bab/KUIS-PENDAMPING.md) menyimpan soal, kunci dan alasan untuk review. Rincian status 17 Oktober di bawah merupakan catatan sebelum tambahan paket ini.

Bimbel digital gratis dan petualangan belajar untuk SD kelas 1–6. Dokumen ini memuat **Master PRD, cara menjalankan, delapan fase implementasi, kontrak server, dan checklist rilis**.

**Mulai dari [roadmap ringkas](docs/ROADMAP-PENDIDIKAN.md).** Cakupan materi tetap enam pelajaran proyek. Fokus paket sekarang: [delapan bab Matematika kelas 1](docs/materi/matematika/kelas-1/README.md); kelompok lain dilengkapi satu per satu.

**Status 17 Oktober 2026:** kode MVP Tahap 1–8 tersedia untuk mode demo dan integrasi Supabase. **71 tes lokal lulus**, build demo dan build Supabase untuk pemeriksaan offline lulus. Acuan pemerintah, register 216 ringkasan awal dan roadmap pendidikan tersedia. Paket pertama bahan ajar Matematika kelas 1 telah ditulis dalam delapan bab/25 subbab dengan 40 kuis tambahan. Anda belum membuat proyek Supabase dan meminta kode dilanjutkan dahulu. Karena itu, pemasangan cloud, pengiriman email, pengujian lintas perangkat, review guru, dan deployment belum dinyatakan selesai.

## Checklist penyelesaian

Tanda `[x]` berarti selesai sesuai lingkup yang ditulis. Tes layanan tiruan/PGlite tidak membuktikan layanan Supabase nyata sudah bekerja.

- [x] PRD, arsitektur, struktur folder, cara menjalankan, dan panduan delapan fase selesai.
- [x] React, Vite, Tailwind, Router, serta server lokal tersedia dan diperiksa.
- [x] Demo siswa/tutor/admin: 260 materi/1.300 soal, termasuk 8 bab/40 kuis bahan ajar Matematika kelas 1, 216 ringkasan awal dan 36 materi lama.
- [x] Empat migration, RLS, RPC, seed 36 materi/185 soal draf, dan verifikasi SQL tersedia.
- [x] Kode registrasi/login/logout, sesi, pemulihan kata sandi, profil, dan proteksi peran Supabase terhubung ke halaman.
- [x] Kode katalog, filter kelas/pelajaran/bab, materi, kuis berbasis sesi, hasil, riwayat, dan XP terhubung ke layanan server.
- [x] Kode kelas, keanggotaan, tugas, penilaian, komentar, dan hadiah sekali terhubung ke RPC.
- [x] Studio draf materi/soal, impor JSON/CSV, publikasi admin, katalog, promosi tutor, serta audit tersedia.
- [x] Unggahan privat, validasi jenis/ukuran file, dan tautan berumur pendek tersedia dalam kode.
- [x] Permintaan penghapusan akun, alat pemilik proyek, panduan backup/restore, dan skrip uji cloud disiapkan.
- [x] 71 tes otomatis lokal lulus; build demo, kompilasi Supabase offline, dan audit pemisahan bank soal demo lulus.
- [x] Peta fase/semester, sumber pemerintah dan roadmap pendidikan tersedia sebagai rancangan yang menunggu persetujuan guru.
- [x] Naskah asli lengkap dan SQL historis dipertahankan.
- [ ] Supabase dibuat; migration, seed, verifikasi, dan konfigurasi dipasang.
- [ ] Auth/email, Data API/RLS, Storage, kelas/tugas, dan konkurensi diuji pada akun nyata.
- [ ] QA visual HP 375 px, 412 px, desktop, Android, keyboard, video, dan koneksi lambat selesai.
- [ ] Guru meninjau materi/soal/media dan mencatat hasil review.
- [ ] Backup/restore serta penghapusan akun/berkas diuji pada proyek uji.
- [ ] Kebijakan data anak dan operasional disetujui pengelola; domain publik diuji.

**Pekerjaan kode dapat ditinjau sekarang. Aktivasi berikutnya:** ikuti [Tahap 3](#tahap-3-database-dan-rpc), lalu jalankan checklist cloud Tahap 4–8. Jangan menandai rilis selesai hanya karena tes lokal lulus.

## Daftar isi

- [Jalankan dan lihat hasil](#jalankan-dan-lihat-hasil)
- [Cara mencoba](#cara-mencoba)
- [Bahan ajar per bab](#bahan-ajar-per-bab)
- [Perpustakaan buku dan kerangka materi](#perpustakaan-buku-dan-kerangka-materi)
- [Acuan JSON CP yang dipakai](#acuan-json-cp-yang-dipakai)
- [Acuan pemerintah dan roadmap materi](#acuan-pemerintah-dan-roadmap-materi)
- [Visi dan kebutuhan produk](#visi-dan-kebutuhan-produk)
- [Teknologi dan struktur folder](#teknologi-dan-struktur-folder)
- [Hak akses](#hak-akses)
- [Aturan XP](#aturan-xp)
- [Data, media, dan kontrak server](#data-media-dan-kontrak-server)
- [Delapan fase pengerjaan](#delapan-fase-pengerjaan)
- [Verifikasi](#verifikasi)
- [Batas rilis dan operasional](#batas-rilis-dan-operasional)
- [Sumber lengkap](#sumber-lengkap)

## Jalankan dan lihat hasil

Jalankan dari folder aplikasi yang memiliki `package.json`, bukan `work/npm-cache`. Gunakan Node.js **22.12 atau lebih baru**, sesuai `engines`; instalasi yang telah diuji memakai Node 24.19.0. Pertahankan `package-lock.json` dan gunakan `npm ci`.

### 1. Lihat demo tanpa Supabase

Di Windows, klik dua kali **JALANKAN-LOKAL.cmd** dan biarkan terminal terbuka. Launcher memakai Node pada PATH atau runtime lokal yang tersedia. Buka **http://127.0.0.1:5173**.

Jika port dipakai, jalankan di terminal folder aplikasi:

```powershell
.\JALANKAN-LOKAL.cmd 5174
```

Buka **http://127.0.0.1:5174**. Port berbeda berarti origin berbeda; progres demo tidak otomatis berpindah port/perangkat.

Perintah standar jika Node/npm tersedia pada PATH:

```powershell
cd "C:\Users\J2ACER NITRO\Documents\Codex\2026-10-16\bu\outputs\petualangan-ilmu"
npm ci
npm run dev
```

Tanpa `VITE_APP_MODE`, aplikasi memakai demo. Jika sudah mempunyai `.env.local`, atur `VITE_APP_MODE=demo` untuk kembali ke demo, lalu mulai ulang server.

### 2. Aktifkan mode Supabase setelah proyek siap

Salin `.env.example` menjadi `.env.local`, lalu isi:

```dotenv
VITE_APP_MODE=supabase
VITE_SUPABASE_URL=https://PROJECT_ID.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
```

Ganti kedua placeholder dengan nilai proyek sendiri. Jalankan ulang server. Mode Supabase memakai database/Auth nyata dan tidak otomatis mengisi katalog dari dummy. Seed masih draf, sehingga katalog siswa dapat kosong sampai konten ditinjau dan dipublikasikan. Jika konfigurasi salah, aplikasi menampilkan petunjuk; tidak beralih diam-diam ke demo.

`VITE_*` terlihat oleh browser. Gunakan publishable/legacy anon key. Jangan memasukkan password database, secret key, atau service-role key. `.env.local` diabaikan Git. Konfigurasi diperiksa formatnya; keberhasilan koneksi tetap perlu diuji.

### 3. Build dan preview

```sh
npm run build                # mengikuti VITE_APP_MODE; default demo
npm run preview              # http://127.0.0.1:4173
npm run build:production     # wajib konfigurasi publik; memaksa mode Supabase
npm run verify:production    # audit hasil dist/ Supabase
```

`build:production` menolak konfigurasi kosong/placeholder dan secret key. Tes otomatis mengompilasi mode Supabase dengan konfigurasi publik rekaan secara offline ke `.verification-build/`; konfigurasi rekaan tersebut bukan koneksi cloud dan jangan dipakai untuk rilis. Audit memastikan `dummyData.js` dan `DemoContext.jsx` tidak ikut build Supabase. Editor admin dan pembahasan hasil tetap memiliki nama field kunci karena memang memerlukan respons server yang berwenang.

Hasil Vite dijalankan melalui HTTP. Membuka `dist/index.html` menggunakan `file://` bukan cara menjalankan aplikasi.

## Cara mencoba

### Alur siswa pada demo

1. Pilih **Mulai petualangan**, gunakan nama rekaan, kelas 3, dan avatar.
2. Buka **Pulau Angka → Perkalian di kebun Nara**.
3. Baca materi, kemudian tekan **Selesai membaca & mulai latihan**. Bacaan pertama memberi +5 XP demo; membaca ulang tidak mengulang hadiah.
4. Jawab seluruh lima soal; navigasi Sebelumnya/Selanjutnya tersedia. Jawaban kosong ditandai saat dikumpulkan.
5. Kumpulkan latihan, baca skor, jumlah benar, XP, dan pembahasan. Lima jawaban tepat pada percobaan selesai pertama memberi +55 XP demo.
6. Buka **Progres belajar** dan hasil terdahulu. Coba tingkat kelas, filter pelajaran/bab, dan pencarian.
7. Di mode Supabase, alur yang sama memakai ID sesi/RPC; hasil dan saldo berasal dari server.

### Kelas dan tutor

1. Demo siswa kelas 3: buka **Kelas saya**, gabung dengan kode **ILMU03**, kemudian kirim tugas.
2. Pilih **Mode demo → Demo tutor**. Pada **Waktunya memberi semangat**, beri nilai 0–100 dan komentar yang menyebut apa yang sudah baik serta langkah berikutnya.
3. Kembali ke demo siswa untuk membaca komentar. Penilaian pertama memberi +15 XP demo; perubahan nilai tidak mengulang hadiah.
4. Coba buat kelas/tugas baru. Pilih materi yang sesuai tingkat kelas.
5. Di mode Supabase, tutor menggunakan akun yang diangkat admin, membagikan kode nyata, melihat anggota/rata-rata kuis tingkat kelas, dan menilai kiriman kelasnya sendiri. Lampiran opsional berupa JPG/PNG/WebP/PDF maksimal 5 MB, disimpan privat.

Data demo hanya dibagikan antarmode pada browser/origin yang sama. Kode kelas demo tidak menghubungkan perangkat lain. Form email/password demo tidak menyimpan atau mengirim kredensial; gunakan data rekaan.

### Admin dan studio konten

1. Demo admin: gunakan contoh JSON/CSV, tekan **Validasi dahulu**, lalu **Simpan batch valid ke demo**.
2. Coba kunci di luar 0–3, opsi ganda, atau ID materi asing. Batch salah harus ditolak seluruhnya.
3. Mode Supabase: impor valid tersimpan sebagai **draf** melalui RPC khusus admin. Contoh otomatis memakai ID materi database yang tersedia; ID katalog dapat disalin dari panel.
4. Tutor/admin membuat materi draf pada studio, mengisi blok teks/tips/gambar/video, dan menambahkan soal beserta kunci/pembahasan.
5. Admin membuka materi, meninjau seluruh soal bersama peninjau pendidikan, menandai konfirmasi review, lalu memublikasikan minimal lima soal lengkap. Publikasi menerbitkan seluruh soal materi terpilih.
6. Panel admin juga menyediakan katalog pelajaran, promosi tutor setelah verifikasi, audit terbaru, dan antrean permintaan penghapusan. Akun admin pertama ditetapkan pemilik database, bukan registrasi publik.

## Bahan ajar per bab

Permintaan materi diperjelas menjadi bahan ajar utuh dengan urutan bab/subbab. **Paket pertama Matematika kelas 1 telah ditulis dalam 8 bab dan 25 subbab**, mengikuti daftar isi buku siswa pemerintah 2022. Teks, cerita, contoh, kegiatan serta soal aplikasi ditulis orisinal. Penulisan ini belum menyatakan persetujuan guru atau pemenuhan seluruh CP Fase A.

Tidak perlu membuat panduan ajar dari nol. Buku siswa dan panduan guru resmi yang tersedia menjadi acuan; CP terbaru dan ATP sekolah digunakan untuk memeriksa tujuan serta urutan belajar. [Panduan bahan ajar](docs/PANDUAN-BAHAN-AJAR.md) menjelaskan prasyarat, pendampingan, asesmen, bantuan dan pengayaan.

| Bab | Bahan ajar | Subbab |
| --- | --- | --- |
| 1 | [Bilangan 0–10](docs/materi/matematika/kelas-1/bab-01.md) | Menghitung/menulis, membandingkan, urutan, pasangan bilangan |
| 2 | [Penjumlahan hingga 10](docs/materi/matematika/kelas-1/bab-02.md) | Cerita, strategi, soal cerita |
| 3 | [Pengurangan hingga 10](docs/materi/matematika/kelas-1/bab-03.md) | Sisa, strategi, hubungan operasi, soal cerita |
| 4 | [Bentuk di sekitar](docs/materi/matematika/kelas-1/bab-04.md) | Ciri bentuk, pengelompokan, susun/urai |
| 5 | [Bilangan 11–20](docs/materi/matematika/kelas-1/bab-05.md) | Membilang, urutan, puluhan/satuan, perbandingan |
| 6 | [Tambah dan kurang hingga 20](docs/materi/matematika/kelas-1/bab-06.md) | Selisih, penjumlahan, pengurangan |
| 7 | [Mengukur panjang](docs/materi/matematika/kelas-1/bab-07.md) | Perbandingan/urutan panjang, satuan tidak baku |
| 8 | [Data dan diagram gambar](docs/materi/matematika/kelas-1/bab-08.md) | Pengelompokan data, diagram gambar |

Setiap bab memiliki tujuan, pengantar, penjelasan per subbab, contoh bertahap, kegiatan, rangkuman, latihan mandiri/pembahasan, refleksi dan catatan pendamping. **40 soal kuis** ditambahkan terpisah. Pembahasan latihan mandiri dapat dibuka setelah mencoba. Kuis tidak menggantikan pengamatan praktik oleh pendamping.

**Coba:** buka [bahan ajar per bab](http://127.0.0.1:5174/sumber-belajar?grade=1&subject=matematika#buku-per-bab), masuk sebagai siswa, lalu pilih bab. Navigasi delapan bab dan daftar isi subbab tersedia pada pembaca. [Daftar seluruh bab](docs/materi/matematika/kelas-1/README.md) juga dapat dibaca sebagai dokumen.

Paket SQL terpisah [matematika-kelas-1-2022.sql](supabase/books/matematika-kelas-1-2022.sql) dipasang setelah keempat migration dan seed awal. Semua bab/soal tetap draf. Manifest [textbook-manifest.json](content/textbook-manifest.json) tidak memuat bank/kunci kuis. Jalankan `npm run content:books` setelah mengubah isi atau metadata buku.

- [x] Identitas dan daftar isi sumber buku dipilih/diperiksa.
- [x] Delapan bab/25 subbab, latihan/pembahasan dan 40 kuis ditulis.
- [x] Navigasi, daftar isi, dokumen bacaan dan paket SQL tersedia.
- [ ] Guru meninjau konsep, bahasa, kegiatan, kunci, kedalaman dan keselarasan CP/ATP.
- [ ] Ilustrasi/LKPD yang diperlukan, pilot dan QA visual perangkat nyata diselesaikan.
- [ ] Paket dipasang dan diuji pada Supabase, lalu diterbitkan sesuai persetujuan.

**Kelompok pelajaran/kelas lain masih ringkasan awal.** Lanjut satu kelompok sekaligus dengan buku/edisi yang dipilih, periksa daftar isi, tulis seluruh bab, lalu review dan uji. Jumlah bab tidak dipaksakan enam. Bahan ajar kelas 1 juga belum mencakup target Fase A sampai akhir kelas 2.

## Perpustakaan buku dan kerangka materi

Enam pelajaran kelas 1–6 sekarang memiliki **216 draf materi orisinal dan 1.080 soal baru**. Tiap kelas mempunyai enam unit baru per pelajaran, sesuai 216 topik yang sebelumnya berupa kerangka. Paket menunggu review guru; tidak otomatis diterbitkan ke cloud.

| Pelajaran | Draf kelas 1–6 | Soal baru |
| --- | --- | --- |
| Matematika | 36 | 180 |
| Bahasa Indonesia | 36 | 180 |
| IPAS / Alam & Sekitar | 36 | 180 |
| Pendidikan Pancasila | 36 | 180 |
| Bahasa Inggris | 36 | 180 |
| Seni & Budaya | 36 | 180 |

Setiap unit berisi tujuan, penjelasan bertahap, lima konsep dengan contoh, contoh dan penalaran, tips, aktivitas, rangkuman, refleksi, lima soal dan pembahasan, serta tautan bacaan pendamping. Contoh matematika memakai bilangan berbeda dari latihan. Soal nonmatematika terutama memeriksa pemahaman/identifikasi konsep; pendamping tetap menilai praktik bahasa, pengamatan, sikap, dan karya.

### Lihat dan coba materinya

1. Buka **http://127.0.0.1:5174/sumber-belajar** dan masuk ke demo siswa.
2. Pilih kelas dan pelajaran, lalu tekan **Baca & latihan** pada unit yang diinginkan. Draf juga ada pada katalog siswa dengan filter Bab 1–6.
3. Contoh langsung: [Matematika kelas 4 — Luas, keliling, dan sudut](http://127.0.0.1:5174/student/lesson/belajar-matematika-kelas-4-unit-5).
4. Perhatikan label draf. Untuk kelas 1–2, pendamping membacakan petunjuk sesuai kebutuhan. Aktivitas disesuaikan kemampuan dan keselamatan anak.

Demo mempertahankan 36 materi/180 soal lama, 216 ringkasan awal/1.080 soal, dan menambah 8 bab/40 soal bahan ajar Matematika kelas 1. **Total demo: 260 materi dan 1.300 soal.** Buku pemerintah utuh tetap dibuka dari sumber resminya; PDF tidak disalin ke aplikasi. Sebagian rujukan masih berupa panduan guru dan terdapat celah tautan buku siswa yang dicatat pada dokumen sumber.

### Paket database dan review

Setelah migration aktif, pasang [curriculum-draft.sql](supabase/curriculum-draft.sql). SQL ini menambah 216 materi dan 1.080 soal sebagai draf, dengan ID deterministik dan pemasangan ulang yang tidak menimpa suntingan. Jika dipasang bersama seed awal 36 materi/185 soal, total database awal **252 materi/1.265 soal**; lima soal tambahan hanya ada pada seed database awal. Materi draf tidak terlihat oleh siswa cloud sampai dipublikasikan admin setelah review.

- [x] Isi 216 unit dan 1.080 soal orisinal tersedia.
- [x] Navigasi bacaan → kuis → pembahasan/XP demo diuji untuk unit baru.
- [x] Paket SQL diuji lokal: status draf, format konten valid, idempoten, tidak terlihat oleh siswa sebelum publikasi.
- [x] Build Supabase diperiksa agar src/content dan bank demo tidak ikut bundle.
- [ ] Guru menyelesaikan review konsep, bahasa, aktivitas, kunci, pengecoh, diferensiasi, dan kecocokan CP/ATP per unit.
- [ ] Paket dipasang, diuji, dan dipublikasikan secara terkontrol pada Supabase nyata.

Panduan [MATERI-SIAP-REVIEW.md](docs/MATERI-SIAP-REVIEW.md) menyediakan checklist per unit; [SUMBER-MATERI.md](docs/SUMBER-MATERI.md) mencatat rujukan dan batas cakupan. [curriculum-manifest.json](content/curriculum-manifest.json) berisi daftar materi tanpa kunci. Jalankan npm run content:generate setelah mengubah src/content; generator juga memperbarui daftar sumber dan urutan editorial.

IPAS dan pengenalan Inggris kelas 1–2 tetap pengayaan. Pilihan cabang seni disesuaikan sekolah. **Selesai mengisi 216 topik pilihan aplikasi tidak berarti seluruh CP nasional telah dipetakan atau disahkan guru.** PJOK, agama, dan muatan lokal berada di luar paket enam pelajaran ini.

<!-- cp-json:start -->
## Acuan JSON CP yang dipakai

JSON pemerintah sudah disaring untuk **enam pelajaran SD kelas 1–6**. Yang digunakan hanya Fase A–C dari Lampiran II; sumber lengkap disimpan sebagai arsip.

IPAS dan Bahasa Inggris kelas 1–2 berlabel pengayaan. Seni mengikuti satu cabang pilihan sekolah. Rumusan CP tersedia sebagai acuan opsional pendamping sesuai pilihan pelajaran atau bab.

- [x] Acuan yang relevan dipilih dan ditautkan ke register materi serta delapan bab Matematika kelas 1.
- [ ] Guru menyetujui tujuan pembelajaran, urutan dan asesmen sebelum materi diterbitkan.

Bila perlu memeriksa sumber, buka [ringkasan penerapan CP](docs/KAJIAN-JSON-CP-2025.md). Untuk pengerjaan sehari-hari, cukup ikuti roadmap di bawah.
<!-- cp-json:end -->

<!-- government-curriculum:start -->
## Acuan pemerintah dan roadmap materi

Materi disusun per bab dari buku siswa/panduan guru pemerintah, lalu dicocokkan dengan CP dan ATP sekolah. Cakupan aplikasi dibatasi pada:

| Pelajaran | Kelas dalam proyek |
| --- | --- |
| Matematika | 1–6 |
| Bahasa Indonesia | 1–6 |
| Pendidikan Pancasila | 1–6 |
| IPAS | 3–6; kelas 1–2 pengayaan |
| Bahasa Inggris | 3–6; kelas 1–2 pengayaan |
| Seni dan Budaya | 1–6; satu cabang sesuai sekolah |

**Pencarian referensi buku berikutnya:** gunakan [katalog SIBI Kemendikdasmen](https://buku.kemendikdasmen.go.id/katalog). Pilih buku siswa/panduan guru sesuai kelas dan pelajaran; catat judul, edisi/tahun, bab/halaman serta URL detail buku. Jika belum ditemukan di katalog, tandai rujukan yang perlu dilengkapi.

**Fokus sekarang:** tuntaskan peninjauan [delapan bab Matematika kelas 1](docs/materi/matematika/kelas-1/README.md), lalu lanjutkan kelompok kelas–pelajaran berikutnya. Sebanyak 216 unit lama masih ringkasan awal; jumlah bab mengikuti buku yang dipilih.

Ikuti [roadmap pendidikan](docs/ROADMAP-PENDIDIKAN.md) untuk urutan sumber → tujuan → penulisan bab → asesmen → review → uji coba → publikasi. Aktifkan Supabase dan deployment setelah layanan tersedia serta pemeriksaan teknis selesai.

Rincian seluruh kelas/semester dan tautan sumber tetap tersedia pada [peta kurikulum](docs/PETA-KURIKULUM-PEMERINTAH.md) bila diperlukan.
<!-- government-curriculum:end -->

## Visi dan kebutuhan produk

**Petualangan Ilmu — Bimbel Digital & Game Edukasi SD Gratis** melayani siswa Indonesia usia 6–12 tahun, tutor/relawan, dan pengelola. Peta pulau 2D menghubungkan bacaan bergambar, latihan, XP/level, dan kelas tutor. Prioritaskan HP serta koneksi yang beragam. Angka 90% akses HP pada naskah asli adalah asumsi perencanaan yang perlu divalidasi.

| Kode | Fitur | Prioritas | Target penerimaan |
| --- | --- | --- | --- |
| F-01 | Auth dan profil | P0 | Email/password, nama panggilan, kelas 1–6, avatar; registrasi selalu student, XP 0, level 1 |
| F-02 | Peta dan katalog | P0 | Pulau pelajaran, filter kelas/pelajaran/bab; siswa melihat konten published |
| F-03 | Pembaca multi-format | P0 | JSONB teks, tips, gambar dan video opsional; nyaman pada HP |
| F-04 | Kuis/pembahasan | P0 | 5–10 soal acak A/B/C/D per sesi; nilai server; kunci hanya setelah submit |
| F-05 | XP dan level | P0 | Ledger server, hadiah terbatas, saldo profil, level setiap 100 XP |
| F-06 | Kelas dan tugas | P0 | Kode enam karakter, keanggotaan, tenggat, kiriman, nilai/komentar, file privat |
| F-07 | Studio dan impor | P0 | Tutor membuat draf, admin memeriksa/publikasi, impor JSON/CSV atomik |
| F-08 | Portal wali | P1 | Laporan anak kepada wali yang hubungannya sudah diverifikasi |

F-01–F-07 memiliki implementasi kode; penerimaan cloud/visual tetap mengikuti checklist. **F-08 adalah pengembangan setelah MVP**: belum ada role/hubungan wali–anak atau portal wali. Ringkasan siswa yang tersedia tidak boleh dianggap akses wali terverifikasi.

## Teknologi dan struktur folder

Pertahankan **React + Vite + Tailwind CSS + JavaScript + React Router**, dengan Supabase untuk backend. Framework ini mendukung peta/interaksi SPA dan server lokal yang sudah ada. Tidak perlu mengganti framework untuk menyelesaikan MVP.

| Teknologi | Peran |
| --- | --- |
| React/React DOM, React Router | UI dan navigasi/proteksi halaman |
| Vite, plugin React | Dev server dan build |
| Tailwind CSS, plugin Vite | Gaya responsif dan komponen |
| Supabase JS/PostgreSQL/Auth/Storage | Sesi, data, transaksi RPC, file privat |
| Lucide, clsx, tailwind-merge | Ikon/utilitas tampilan |
| Node test, Happy DOM, PGlite | Tes alur, adapter, SQL dan aturan akses lokal |
| Prettier | Format source |
| Vercel | Target deployment setelah verifikasi cloud |

Konfigurasi mengikuti [Vite](https://vite.dev/guide/) dan [Tailwind dengan Vite](https://tailwindcss.com/docs/installation/using-vite). Update dependensi dilakukan sengaja; jangan menghapus lockfile demi instalasi berulang.

```text
petualangan-ilmu/
├── README.md
├── .env.example
├── package.json / package-lock.json
├── vite.config.js / vercel.json
├── JALANKAN-LOKAL.cmd
├── .openai/hosting.json           # konfigurasi lama dipertahankan
├── public/assets/                # SVG/aset publik
├── src/
│   ├── main.jsx / App.jsx / index.css
│   ├── components/               # peta, UI, studio, pengelolaan admin
│   ├── context/
│   │   ├── LearningContext.jsx   # kontrak data/aksi halaman
│   │   ├── AppProvider.jsx       # pemilihan mode saat build
│   │   ├── DemoContext.jsx       # data contoh lokal
│   │   └── SupabaseProvider.jsx  # sesi, profil, data dan mutasi server
│   ├── lib/                      # config, learningResources, governmentCurriculum, utilitas, dummy
│   ├── content/                  # isi draf orisinal; hanya untuk bundle demo/paket SQL
│   ├── layouts/
│   ├── pages/                    # publik, auth, akun, student/tutor/admin
│   └── services/                 # adapter Supabase dan validasi impor
├── content/                      # manifest/urutan/alignment editorial tanpa kunci
├── supabase/
│   ├── migrations/
│   │   ├── 202610160001_initial_schema.sql
│   │   ├── 202610160002_platform_features.sql
│   │   ├── 202610160003_private_storage.sql
│   │   └── 202610160004_editor_questions.sql
│   ├── curriculum-draft.sql       # tambahan 216 materi / 1080 soal DRAFT
│   ├── books/                     # bahan ajar 8 bab / 40 kuis Matematika kelas 1 DRAFT
│   ├── seed.sql
│   ├── verify-setup.sql / verify-platform.sql
│   ├── schema.sql                # penunjuk; bukan installer
│   └── legacy/                   # SQL historis; jangan dipasang bersama migration
├── scripts/                      # build/audit, seed, uji cloud, penghapusan
├── tests/
├── docs/
│   ├── OPERASIONAL.md
│   ├── PETA-KURIKULUM-PEMERINTAH.md # fase, sumber, urutan kelas/semester dan register unit
│   ├── ROADMAP-PENDIDIKAN.md       # R01–R10, penanggung jawab, prasyarat dan checklist
│   ├── PANDUAN-BAHAN-AJAR.md        # pola bab, prasyarat, pendampingan dan asesmen
│   ├── KAJIAN-JSON-CP-2025.md       # ringkasan CP enam pelajaran dan kaitan bab
│   ├── materi/matematika/kelas-1/   # delapan dokumen bacaan per bab
│   ├── SUMBER-MATERI.md / MATERI-SIAP-REVIEW.md
│   ├── source/                   # naskah asli
│   └── archive/                  # checkpoint dokumentasi
├── legacy/                       # demo lama, diabaikan Git
├── dist/ / .verification-build/  # keluaran build, diabaikan Git
└── node_modules/                 # diabaikan Git
```

Folder saudara `work/` berisi cache dan alat kerja, bukan source aplikasi. Lokasi proyek dipertahankan agar referensi hosting tetap berlaku. Direktori fitur kosong memakai `.gitkeep`.

## Hak akses

| Peran | Dapat melakukan | Batas server |
| --- | --- | --- |
| Tamu | Landing/katalog published | Tidak menyimpan XP, kuis, atau kelas |
| Student | Materi, kuis, profil sendiri, kelas/tugas sendiri | Tidak mengubah role/XP, membaca kiriman teman, atau membaca kunci sebelum submit |
| Tutor | Kelas sendiri, daftar anggota/progres, tugas/nilai, draf milik sendiri | Tidak mengelola kelas tutor lain, mengimpor massal/publikasi, atau mengangkat admin |
| Admin | Draf/katalog, impor/publikasi, promosi tutor, audit/antrean penghapusan | Admin awal ditetapkan pemilik database |
| Wali | Target P1 | Belum tersedia; memerlukan hubungan wali–anak terverifikasi |

Role dibaca dari profil database. Proteksi rute membantu navigasi; RLS, grant, serta pemeriksaan RPC tetap menegakkan akses saat API dipanggil langsung. Callback Auth tidak menjalankan permintaan bersarang. Pergantian akun membuang respons data lama; pembaruan token tidak mengosongkan jawaban kuis.

## Aturan XP

| Aktivitas | Hadiah | Batas |
| --- | --- | --- |
| Menyelesaikan bacaan baru | +5 | Sekali per materi per siswa |
| Jawaban benar pada kuis pertama selesai | +10 per jawaban | Hadiah utama sekali per materi |
| Menyelesaikan kuis pertama | +5 | Mengikuti batas hadiah utama |
| Tugas dinilai | +15 | Sekali per tugas; revisi nilai tidak memberi ulang |
| Remedial kuis nilai <60 | +3 | Maksimal sekali sehari secara global per siswa, Asia/Jakarta |

```text
level = floor(total_xp / 100) + 1
progres_bar_persen = total_xp % 100
score = round(jumlah_benar / jumlah_soal * 100)
```

250 XP berarti level 3 dan progres 50%. XP mengukur konsistensi, skor mengukur pemahaman. Keputusan aktif adalah **percobaan selesai pertama**, sesuai fondasi sebelumnya; remedial membaca belum didukung. Tombol selesai membaca menandai penyelesaian, bukan membuktikan pemahaman/durasi.

Ledger unik dan penguncian baris menjaga hadiah dalam transaksi. Replay respons menampilkan hadiah historis tetapi tidak menggandakan saldo. Frontend memuat ulang profil, bukan menambahkan `xp_earned` ke saldo secara optimistis.

## Data, media, dan kontrak server

Sepuluh tabel awal: `profiles`, `subjects`, `lessons`, `questions`, `quiz_attempts`, `xp_events`, `classes`, `class_members`, `assignments`, `submissions`. Platform menambah `account_deletion_requests`. Lima tabel privat menyimpan kunci soal, snapshot kuis, audit, percobaan kode kelas, dan batch impor.

| Data | Penyimpanan |
| --- | --- |
| Akun/profil, materi JSONB, soal/progres | Supabase Auth/PostgreSQL |
| Peta, avatar, ilustrasi umum | Aset publik aplikasi |
| Gambar/PDF materi | URL HTTPS dari penyedia media; unggahan editorial media eksternal dikelola pemilik |
| Berkas tugas | Bucket privat student-submissions, maksimal 5 MB/file |
| Video | YouTube yang sudah ditinjau; iframe setelah klik |

Klaim kuota gratis 500 MB/1 GB/10–25 GB dan unlimited pada naskah asli adalah asumsi historis, bukan jaminan paket terkini. Periksa kebutuhan nyata, kuota, dan biaya sebelum rilis. Video Unlisted dapat diakses siapa pun yang memiliki tautan.

ID demo seperti `matematika-3` berbeda dengan UUID database. Routing materi memakai slug atau UUID. Metadata tampilan pulau memakai slug pelajaran; tidak memuat soal/kunci.

### RPC belajar

```js
const { data: session, error } = await supabase.rpc('get_lesson_quiz', {
  p_lesson_id: lessonUuid,
  p_limit: 10,
})
// session: { attempt_id, lesson_id, questions: [{ id, prompt, options }] }
// Tangani error sebelum memakai data.

await supabase.rpc('submit_quiz_answers', {
  p_attempt_id: session.attempt_id,
  p_answers: session.questions.map(q => ({
    question_id: q.id,
    selected_option: answers[q.id], // bilangan bulat 0–3, semua soal wajib
  })),
})
await supabase.rpc('complete_lesson_reading', { p_lesson_id: lessonUuid })
await supabase.rpc('get_quiz_result', { p_attempt_id: session.attempt_id })
```

Sesi aktif dilanjutkan dengan ID sama, berlaku 24 jam, dan sesi baru dibatasi 20/jam/siswa. Soal/opsi/kunci/pembahasan disnapshot di server. Klien tidak memilih subset soal. Jawaban asing, duplikat, tidak lengkap, dan opsi salah format ditolak.

Hasil memuat `score`, `correct_count`, `total_questions`, `details`, `xp_earned`, serta pada submit `xp_granted_now` dan `replayed`. Submit identik mengembalikan hasil lama dan hadiah baru 0; jawaban berbeda setelah selesai ditolak. Kunci/pembahasan hanya dikembalikan untuk sesi selesai milik siswa sendiri.

### RPC kelas dan editorial

| Fitur | RPC |
| --- | --- |
| Kelas/anggota | create_class, join_class, get_class_students |
| Tugas/kiriman/nilai | create_assignment, submit_assignment, grade_submission |
| Draf/review | save_lesson, save_draft_question, get_editor_questions |
| Impor/publikasi | import_questions, publish_lesson |
| Pengelolaan/audit | promote_tutor, save_subject, get_audit_log |
| Penghapusan | request_account_deletion |

Parameter dan penanganan error berada di [supabaseService.js](src/services/supabaseService.js); implementasi aturan ada pada migration. Kode kelas enam karakter alfanumerik, dibuat server dengan pemeriksaan tabrakan. Maksimal 10 upaya gabung/jam/siswa; gagal menebak tetap dihitung. Tenggat/keanggotaan/role dipastikan server.

Impor maksimal 200 soal/500 KB, transaksi satu batch, ID batch untuk retry idempoten. Soal/kunci disimpan terpisah dan selalu draf. Tutor hanya mengakses kunci editorial materi miliknya. Akun siswa tidak memakai API editorial.

Storage memeriksa path milik siswa dan tugas, keanggotaan, tenggat, serta status belum dinilai untuk unggah/hapus. Tidak ada overwrite; tautan baca dibuat 60 detik. Izin isi file berdasarkan MIME/ukuran tidak menggantikan review berkas pengelola. Alur pemulihan/pembersihan berkas dijelaskan dalam [operasional](docs/OPERASIONAL.md).

## Delapan fase pengerjaan

Fase berikut memisahkan hasil kode lokal dari tindakan cloud. Estimasi sumber adalah rencana awal, bukan durasi yang sudah diukur.

### Tahap 1 — Fondasi React

1. Instal Node sesuai engines dan jalankan `npm ci`.
2. Jalankan server; buka URL dari terminal.
3. Periksa fondasi melalui `npm run verify:stage1 -- --port=0`.

- [x] React/Vite/Tailwind/Router, direktori fitur, HTTP 200, dan kompilasi JSX/CSS.
- [ ] Pemeriksaan tampilan browser/perangkat nyata.

### Tahap 2 — UI dan dummy

1. Jalankan mode demo.
2. Ikuti alur siswa → kelas → tutor → admin di atas.
3. Jalankan tes DOM/aturan belajar.

- [x] Halaman utama, navigasi, bacaan, kuis/hasil, progres, kelas/tugas/nilai, dan impor demo.
- [x] 36 contoh lama + 216 materi draf baru; 180 + 1.080 soal; tes alur/aturan lokal.
- [ ] QA visual 375/412 px/desktop dan video materi sungguhan.

### Tahap 3: Database dan RPC

**Anda belum mempunyai proyek Supabase. Kode tersedia, pemasangan berikut dikerjakan setelah proyek dibuat.**

1. Buat proyek baru pada [dashboard Supabase](https://supabase.com/dashboard). Simpan password database secara pribadi.
2. Pada SQL Editor, jalankan satu per satu sesuai urutan:
   - [001 — schema dan kuis/XP](supabase/migrations/202610160001_initial_schema.sql)
   - [002 — kelas, editorial, audit](supabase/migrations/202610160002_platform_features.sql)
   - [003 — Storage privat](supabase/migrations/202610160003_private_storage.sql)
   - [004 — soal draf tutor/admin](supabase/migrations/202610160004_editor_questions.sql)
3. Pastikan setiap query selesai tanpa error sebelum lanjut. Migration awal khusus database baru dan sengaja menolak pemasangan ulang. Jika proyek sudah memakai skema lama, susun migration konversi terpisah.
4. Jalankan [seed.sql](supabase/seed.sql): target awal 6 pelajaran, 36 materi, 185 soal **draf**. Seed idempoten dan tidak menimpa perubahan editorial.
5. Jalankan [verify-setup.sql](supabase/verify-setup.sql) dan [verify-platform.sql](supabase/verify-platform.sql). Hasil yang diharapkan: struktur/izin dasar dan platform/bucket privat lulus. Jumlah berubah setelah editor menambahkan konten.
6. Pastikan schema private tidak diekspos Data API.
7. Isi konfigurasi publik dan mode Supabase pada `.env.local`. Gunakan [quickstart React resmi](https://supabase.com/docs/guides/getting-started/quickstarts/reactjs) untuk menemukan konfigurasi proyek.
8. Simpan tanggal/hasil pemasangan. SQL sumber historis dan `supabase/legacy/` tidak dijalankan bersama migration aktif.

- [x] Empat migration, seed, verifikasi dan tes SQL lokal.
- [x] RLS/grant, profil student, sesi/snapshot, penilaian, XP/replay, kelas, editorial, dan bucket diuji di PGlite.
- [ ] Migration/seed/verifikasi berhasil pada Supabase nyata.
- [ ] URL/publishable key dan mode cloud diisi.

### Tahap 4 — Auth, RLS, dan peran

1. Atur Email/Password, konfirmasi, SMTP, Site URL, serta redirect callback/reset.
2. Daftarkan akun pemilik dan tetapkan admin pertama secara terkontrol; lihat [operasional](docs/OPERASIONAL.md).
3. Daftarkan siswa/tutor uji. Verifikasi calon tutor lalu angkat lewat admin.
4. Uji login, refresh, logout, email, URL terlarang, API langsung, dan pergantian akun.

- [x] Klien, provider sesi/profil, loading/error/retry, formulir nyata dan proteksi role tersedia.
- [x] Tes adapter/Auth tiruan memeriksa login, pembaruan token, dan pembuangan respons akun lama.
- [ ] Email/JWT/Auth sungguhan, pemulihan, dan izin Data API lulus.

### Tahap 5 — Materi dan kuis server

1. Tinjau satu materi beserta minimal lima soal pada proyek uji.
2. Publikasikan melalui studio admin; jangan langsung menerbitkan seluruh seed.
3. Uji filter/pembaca → sesi kuis → submit → pembahasan/riwayat.
4. Periksa Network sebagai siswa dan bundle rilis; kunci hanya tersedia setelah submit valid.

- [x] Halaman belajar menggunakan adapter data dan sesi server saat mode Supabase.
- [x] Loading/error, jawaban kosong, hasil jarak jauh, dan build tanpa bank soal dummy diuji lokal.
- [ ] Katalog/materi/hasil dan privasi kunci diuji melalui cloud dan Network browser.

### Tahap 6 — XP dan anti-exploit

1. Selesaikan bacaan, ulangi, kemudian kerjakan kuis.
2. Periksa saldo profil; replay tidak menambah hadiah historis.
3. Uji remedial/tanggal Jakarta, klik ganda, dan dua koneksi pada akun uji.
4. Jalankan skrip uji cloud sesuai dokumen operasional.

- [x] Hadiah transaksi/ledger, level, remedial harian, replay dan aturan server diuji lokal.
- [x] Frontend menampilkan saldo server dan mempertahankan jawaban saat token diperbarui.
- [ ] Konkurensi lintas koneksi, refresh/perangkat, dan pemulihan koneksi diuji cloud.

### Tahap 7 — Kelas dan tugas

1. Tutor membuat kelas/kode, siswa tingkat sesuai bergabung.
2. Tutor membuat tugas dengan materi published/tenggat.
3. Siswa mengirim jawaban dan lampiran opsional, tutor menilai/komentar.
4. Uji siswa/tutor lain tidak bisa membaca atau mengubah data tersebut.

- [x] RPC dan UI kelas/anggota/progres, tugas, kiriman, penilaian serta hadiah sekali.
- [x] Bucket/policy privat dan adapter signed URL; uji akses SQL serta validasi file lokal.
- [ ] Dua siswa/dua tutor/perangkat, Storage API, tenggat, dan tautan kedaluwarsa diuji nyata.

### Tahap 8 — Studio, audit, dan rilis

1. Uji draf → impor → review → publikasi/penarikan publikasi melalui akun admin.
2. Uji pengangkatan tutor, audit, pemulihan, penghapusan, backup/restore dan prosedur data.
3. Selesaikan QA visual serta review pendidikan.
4. Ulangi tes/format/build produksi untuk versi rilis.
5. Hubungkan repository ke Vercel: preset Vite, build **npm run build:production**, output **dist**. Isi mode Supabase dan dua variabel publik; jangan unggah `.env.local`.
6. Uji domain publik, login/email redirect, seluruh role, dan refresh rute bertingkat. `vercel.json` menyediakan fallback `index.html`.
7. Catat URL, versi, tanggal, hasil pengujian dan pemilik operasional. Repository yang sudah punya `.git` tidak perlu diinisialisasi ulang.

- [x] Kode studio/draf/soal, impor transaksi, publikasi terkonfirmasi, promosi tutor, katalog dan audit.
- [x] Akun/pemulihan/permintaan penghapusan, alat pemilik, dan panduan operasional.
- [x] Build/audit pemisahan demo dan konfigurasi fallback SPA.
- [ ] Penerimaan cloud/visual, review guru, prosedur data, backup/restore dan penghapusan diuji.
- [ ] Deployment/domain publik dan pengujian rilis selesai.

## Verifikasi

Jalankan dari folder aplikasi:

```sh
npm test
npm run test:db
npm run verify:stage1 -- --port=0
npm run build
npm run format:check
```

`npm test` menjalankan berkas tes secara berurutan setelah eksekusi paralel sempat macet pada lingkungan Windows ini. Pengujian ini tidak menggantikan uji konkurensi cloud. Cakupannya meliputi tes UI, aturan belajar, adapter/Auth tiruan, SQL lokal dan kompilasi Supabase offline. `test:db` mengulang dua suite SQL. Tidak ada akun/data cloud yang dibuat oleh tes otomatis. `npm run format` merapikan source.

| Pemeriksaan terakhir | Hasil dan batas |
| --- | --- |
| Seluruh tes | 71 lulus, 0 gagal pada 17 Oktober 2026; termasuk tes induk Node |
| UI demo + aturan belajar | 23 tes |
| Metadata sumber, kerangka dan peta pemerintah | 3 tes; memeriksa batas pengayaan, rujukan dan status review, bukan keselarasan pedagogis |
| Paket materi orisinal | 3 tes: cakupan/isian, contoh hitungan, SQL/manifest |
| Import JSON CP | 3 tes: cakupan SD, ketepatan jejak teks sumber, rujukan bab/peta tanpa persetujuan palsu |
| Bahan ajar per bab | 2 tes: delapan bab/25 subbab dan kuis, SQL/manifest/dokumen |
| Adapter/Auth/UI Supabase tiruan | 9 tes; tidak menghubungi cloud |
| Database awal | 13 tes termasuk induk; PGlite |
| Database platform | 14 tes termasuk induk; Auth/Storage berupa fixture lokal |
| Build Supabase offline | 1 tes; bank demo dan JSON sumber penuh tidak masuk bundle, rumusan CP terpilih dimuat dinamis |
| Build demo | Lulus; menghasilkan dist/ |
| Fondasi/server | HTTP 200, JSX/CSS dan 11 direktori lulus; server pemeriksaan ditutup |
| Format | Diperiksa menggunakan Prettier |
| Cloud/visual | Belum dinyatakan lulus |

Tes SQL mencakup role/profil/XP, privasi kunci, snapshot/kedaluwarsa/rate limit sesi, jawaban/replay, ledger, kelas/keanggotaan, tenggat, penilaian, draf/editor, impor atomik/idempoten, publikasi, promosi/audit, file privat, serta antrean penghapusan. PGlite menggunakan PostgreSQL dalam proses Node; identitas Auth dan tabel Storage disimulasikan hanya di fixture tes. Pengujian ini tidak menggantikan JWT, PostgREST, Storage service, atau konkurensi Supabase nyata.

## Batas rilis dan operasional

Panduan rinci tersedia pada [docs/OPERASIONAL.md](docs/OPERASIONAL.md): konfigurasi Auth, review guru, uji lintas akun, uji konkurensi cloud, penghapusan, backup/restore, insiden dan gerbang rilis. Skrip cloud/penghapusan disiapkan tetapi **belum dijalankan terhadap layanan nyata**.

QA visual masih harus memeriksa landing, peta, materi, kuis/hasil, profil, kelas, tutor dan admin pada 375/412 px/desktop; teks/tombol, fokus/keyboard, gulir horizontal, refresh rute, error console, SVG, serta video nyata. Sesi pengerjaan belum memiliki browser yang dapat dikendalikan untuk menyatakan pemeriksaan tersebut lulus.

Rencana urutan sumber tetap: hari 1–2 fondasi/UI; 3–4 database/Auth; 5–7 belajar/XP; 8–10 kelas/admin/audit/rilis. Jadwal merupakan estimasi awal. Hasil lokal saat ini menyiapkan kode seluruh fase; tindakan cloud tetap mengikuti urutan dan bukti masing-masing checklist.

## Sumber lengkap

Naskah terbaru dipertahankan di [`docs/source/MASTER-PRD-ASLI.txt`](docs/source/MASTER-PRD-ASLI.txt). Dokumen awal proyek disimpan di [`docs/source/PRD-ASLI-SEBELUMNYA.txt`](docs/source/PRD-ASLI-SEBELUMNYA.txt). Arsip README/checkpoint ada di `docs/archive/`; demo lama tetap di `legacy/`.

Lampiran di bawah mempertahankan seluruh naskah terbaru, termasuk SQL, perintah, prompt tambahan, checklist, estimasi. SQL sumber adalah referensi historis; baca perbedaan kontrak dan perbaikan keamanan di atas sebelum mengeksekusi.

<details>
<summary>Naskah Master PRD asli lengkap (termasuk seluruh contoh SQL)</summary>

```text
Dokumen ini adalah Master PRD (Product Requirements Document) sekaligus Panduan Eksekusi Teknis Step-by-Step dari Nol Sampai Rilis untuk proyek Petualangan Ilmu. Kamu bisa menyimpannya sebagai file PRD_DAN_PANDUAN.md di dalam folder proyekmu sebagai acuan utama saat ngoding bersama OpenCode.BAGIAN 1: Product Requirements Document (PRD)1.1 Identitas & Visi ProdukNama Produk: Petualangan Ilmu (Bimbel Digital & Game Edukasi SD Gratis)Target Pengguna Utama: Siswa SD Kelas 1–6 di Indonesia (usia 6–12 tahun), Tutor/Relawan Pengajar, Orang Tua, dan Admin.Masalah yang Diselesaikan:Bimbel konvensional berbayar mahal dan belum tentu terjangkau semua keluarga.Website latihan soal biasa membosankan bagi anak SD dan tidak memberikan pendampingan guru.Solusi: Platform web interaktif bergaya peta petualangan 2D tempat siswa membaca materi bergambar/video, mengerjakan kuis berhadiah XP & Level, serta bergabung ke kelas virtual yang dibimbing langsung oleh tutor.Target Perangkat: Mobile-First (90% siswa SD di Indonesia mengakses lewat layar HP Android dengan koneksi internet beragam).1.2 Peran Pengguna & Hak Akses (Role-Based Access)Peran (role)Deskripsi PenggunaHak Akses Utama di SistemBatasan Keamanan (Dilarang)Tamu (guest)Pengunjung belum loginMelihat Landing Page & katalog contoh materi publik.Tidak bisa mengerjakan kuis, simpan XP, atau masuk kelas.Siswa (student)Anak SD Kelas 1–6Memilih kelas (1–6), membuka peta belajar, membaca materi published, mengerjakan kuis, mendapat XP/Level, gabung kelas tutor via kode, dan mengumpulkan tugas.Tidak bisa melihat kunci jawaban sebelum kuis selesai, tidak bisa mengubah XP sendiri, tidak bisa melihat nilai teman lain.Tutor (tutor)Guru / Kakak PembimbingMembuat kelas bimbel, membagikan kode kelas (join_code), membuat tugas, melihat progres & nilai siswa di kelasnya, memberi nilai & komentar tugas, serta membuat draf materi/soal.Tidak bisa melihat atau mengubah kelas milik tutor lain; tidak bisa mengubah role pengguna menjadi admin.Admin (admin)Pengelola PlatformMemverifikasi dan memublikasikan materi/soal (draft → published), melakukan bulk import ribuan soal (CSV/JSON), mengelola katalog mata pelajaran, dan mengangkat akun Tutor.Hanya boleh diakses oleh akun yang di-set langsung dari database Supabase.1.3 Spesifikasi Fitur & Kriteria Selesai (Acceptance Criteria)KodeModul FiturPrioritasDetail Kebutuhan FungsionalKriteria Selesai (Definition of Done)F-01Autentikasi & Profil AnakP0 (Wajib)Daftar & Login dengan Email/Password, pilih kelas (1–6), dan pilih avatar hewan kartun.Akun baru otomatis tercatat di tabel profiles dengan role student, level 1, dan XP 0.F-02Peta Petualangan & Katalog MateriP0 (Wajib)Daftar mata pelajaran tampil sebagai "Pulau Pengetahuan". Materi dapat difilter per Kelas (1–6) dan Bab.Siswa kelas 3 otomatis melihat daftar pulau mata pelajaran kelas 3 yang berstatus published.F-03Pembaca Materi Multi-FormatP0 (Wajib)Menampilkan teks cerita, kotak tips, gambar ilustrasi (dari Cloud Storage), dan video embed YouTube.Halaman materi merender blok JSONB dengan rapi di layar HP tanpa perlu scroll menyamping.F-04Pertarungan Kuis & PembahasanP0 (Wajib)Kuis pilihan ganda (A/B/C/D) sebanyak 5–10 soal acak per sesi. Penilaian di sisi server.Kunci jawaban tidak muncul di tab Network browser sebelum dikumpulkan; pembahasan muncul setelah dijawab.F-05Mesin Gamifikasi (XP & Level)P0 (Wajib)Pemberian XP otomatis dari server setelah baca materi, selesai kuis, dan kumpul tugas.Bar XP bertambah otomatis; setiap kelipatan 100 XP menaikkan 1 Level; anti-spam XP aktif.F-06Ruang Kelas & Tugas TutorP0 (Wajib)Tutor membuat kelas dengan kode unik 6 karakter, memberi tugas, dan menilai kiriman siswa.Siswa bisa gabung dengan kode kelas, mengirim jawaban teks/link, dan membaca umpan balik tutor.F-07Studio Konten & Import MassalP0 (Wajib)Halaman khusus Admin/Tutor untuk menambah materi dan mengimpor ratusan soal via CSV/JSON.Admin bisa mengunggah file CSV/JSON berisi puluhan soal dan langsung tersimpan di tabel questions.F-08Ringkasan Progres Orang TuaP1 (Tahap 2)Halaman laporan belajar anak (jumlah materi selesai, rata-rata nilai kuis, catatan dari tutor).Orang tua dapat memantau perkembangan anak tanpa perlu mengutak-atik fitur belajar siswa.1.4 Aturan Bisnis Gamifikasi & Anti-CheatTabel Perolehan XP:Menyelesaikan baca 1 bab materi baru: +5 XP (Maksimal 1 kali per bab per siswa).Menjawab 1 soal kuis dengan benar: +10 XP (Dihitung pada percobaan pertama yang lulus atau dibatasi per bab).Bonus menuntaskan 1 sesi kuis sampai akhir: +5 XP.Mengumpulkan tugas yang dinilai tutor: +15 XP.Mengulang materi/kuis yang belum lulus (remedial): +3 XP (Maksimal 1 kali sehari untuk mencegah farming XP).Rumus Kenaikan Level:Setiap 100 XP menaikkan 1 level:$$\text{Level Siswa} = \lfloor \frac{\text{Total XP}}{100} \rfloor + 1$$Contoh: 0–99 XP = Level 1; 100–199 XP = Level 2; 250 XP = Level 3 (progres bar 50%).Pemisahan XP dan Nilai Akademik:XP hanya mengukur kerajinan/konsistensi belajar, sedangkan score (0–100) di tabel quiz_attempts dan submissions mengukur pemahaman akademik yang dipantau tutor.1.5 Arsitektur Penyimpanan Gratis Kapasitas BesarAgar aplikasi 100% gratis namun sanggup menampung puluhan ribu soal dan ribuan siswa:Komponen DataLayanan PenyimpananKuota GratisFormat Data yang DisimpanKode Website & Aset GameVercel + Repo GitHubUnlimited DeployKode React, ikon UI, gambar peta pulau, dan gambar avatar hewan (.svg / .webp).Teks Materi, Bank Soal, & AkunSupabase PostgreSQL500 MB (~250.000 soal)Tabel relasional + kolom JSONB untuk isi materi dan pilihan jawaban kuis.Gambar Materi, Gambar Soal, & PDFCloudinary / Cloudflare R210 GB – 25 GBFile gambar .webp (di bawah 150 KB) dan modul .pdf. Hanya URL-nya yang disimpan di Supabase.File Tugas Siswa (Privat)Supabase Storage1 GBFoto/dokumen jawaban tugas siswa di bucket privat student-submissions.Video PembelajaranYouTube (Mode Unlisted)UnlimitedVideo diunggah ke YouTube Tidak Publik, dipanggil via URL [youtube.com/embed/ID_VIDEO](https://youtube.com/embed/ID_VIDEO).BAGIAN 2: Blueprint Step-by-Step Pengerjaan (Tahap 1 s/d Tahap 8)Ikuti 8 tahap ini secara berurutan. Jangan melompat ke tahap berikutnya sebelum semua kotak checklist di tahap saat ini berhasil diuji.TAHAP 1: Persiapan Alat & Inisialisasi Proyek React (Estimasi: 2 Jam)Tujuan: Membuat pondasi aplikasi React + Vite + Tailwind CSS di komputer lokal sampai bisa dibuka di browser.Langkah Demi Langkah:Pastikan Node.js (versi 18 atau lebih baru) dan Git sudah terinstal di laptopmu. Cek di terminal dengan mengetik node -v.Buat folder proyek baru dan instal semua pustaka utama dengan menjalankan perintah ini satu per satu di terminal:Bashnpm create vite@latest petualangan-ilmu -- --template react
cd petualangan-ilmu
npm install
npm install @supabase/supabase-js react-router-dom lucide-react clsx tailwind-merge
npm install tailwindcss @tailwindcss/vite
Buka file vite.config.js dan pastikan plugin @tailwindcss/vite sudah terdaftar:JavaScriptimport { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
Buka file src/index.css dan ganti isinya menjadi satu baris ini:CSS@import "tailwindcss";
Buat struktur folder kosong di dalam folder src/ agar OpenCode bekerja dengan rapi:Plaintextsrc/
├── components/
│   ├── ui/
│   ├── adventure/
│   └── quiz/
├── context/
├── layouts/
├── lib/
├── pages/
│   ├── auth/
│   ├── student/
│   ├── tutor/
│   └── admin/
└── services/
Jalankan npm run dev di terminal dan buka http://localhost:5173.Checklist Selesai Tahap 1:[ ] Server lokal berjalan di http://localhost:5173 tanpa pesan error merah.[ ] Tailwind CSS berfungsi (uji dengan memberi class bg-sky-100 text-sky-900 pada teks di App.jsx).[ ] Struktur folder di dalam src/ sudah lengkap.TAHAP 2: Membangun UI/UX Ramah Anak & Navigasi Dummy (Estimasi: 6–8 Jam)Tujuan: Membuat seluruh halaman dan tampilan peta petualangan menggunakan data contoh (dummyData.js) sebelum menyentuh database.Langkah Demi Langkah:Buka OpenCode di folder proyek petualangan-ilmu.Salin dan jalankan Prompt Tahap 1 (yang ada di rencana awalmu) ke OpenCode, lalu tambahkan instruksi spesifik ini agar struktur datanya langsung cocok dengan database nanti:PlaintextTambahan penting untuk Tahap 1:
Buat file src/lib/dummyData.js yang memiliki struktur data persis seperti tabel database kita nanti:
- subjects: [{ id, name, slug, description }]
- lessons: [{ id, subject_id, title, slug, grade, phase, difficulty, status, content: { summary, video_url, blocks: [{ type: 'text'|'image'|'tip', body, url, caption }] } }]
- questions: [{ id, lesson_id, prompt, options: ["A", "B", "C", "D"], correct_option: 1, explanation, difficulty }]
Pastikan semua halaman (Landing, Login/Register, Dashboard Peta Siswa, Baca Materi, Kuis, Dashboard Tutor, dan Dashboard Admin) terhubung dengan React Router di App.jsx.
Periksa setiap halaman yang dibuat oleh OpenCode di browser menggunakan mode layar HP (Inspect Element → pilih ukuran layar iPhone SE / Galaxy S20 lebar 375px–412px).Pastikan tombol pilihan ganda di halaman kuis berukuran besar, berwarna kontras, dan tidak ada teks yang terlalu kecil bagi anak SD (minimal ukuran font text-base atau text-lg).Checklist Selesai Tahap 2:[ ] Semua rute URL berfungsi (/, /login, /register, /student, /student/lesson/:slug, /student/quiz/:lessonId, /tutor, /admin).[ ] Halaman baca materi mampu menampilkan teks, kotak tips, gambar, dan embed video dari dummyData.js.[ ] Halaman kuis bisa diklik dari soal nomor 1 sampai selesai dan menampilkan halaman ringkasan nilai + pembahasan.[ ] npm run build berjalan sukses tanpa error.TAHAP 3: Setup Proyek Supabase, Skema Database, & Fungsi RPC Aman (Estimasi: 3–4 Jam)Tujuan: Menyiapkan database PostgreSQL untuk puluhan ribu soal, pemicu profil otomatis, dan fungsi penilaian kuis di server.Langkah Demi Langkah:Buka supabase.com, buat akun, dan klik New Project (beri nama petualangan-ilmu, simpan password database-nya baik-baik).Setelah proyek aktif, buka menu SQL Editor → New Query.Bagian A (Tabel Utama): Jalankan script SQL pembuatan 10 tabel utama yang sudah kamu miliki di rancangan awal (profiles, subjects, lessons, questions, quiz_attempts, xp_events, classes, class_members, assignments, submissions).Bagian B (Index Kecepatan Puluhan Ribu Soal, Trigger Profil, & RPC Kuis Anti-Cheat): Buat query baru di SQL Editor, lalu tempel dan jalankan script pelengkap yang sangat penting ini:SQL-- 1. Tambah kolom total_xp di profiles agar perhitungan level super cepat
alter table public.profiles
  add column if not exists total_xp integer not null default 0;

-- 2. Index khusus agar pencarian dari puluhan ribu soal selesai dalam 1 milidetik
create index if not exists questions_lesson_id_idx
  on public.questions (lesson_id, difficulty);

-- 3. Trigger Otomatis: Saat user daftar di Supabase Auth, otomatis buat baris di public.profiles
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, role, grade, avatar)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', 'Petualang Cilik'),
    'student', -- Paksa selalu student saat daftar dari web demi keamanan
    coalesce((new.raw_user_meta_data->>'grade')::smallint, 1),
    coalesce(new.raw_user_meta_data->>'avatar', 'fox')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 4. Fungsi RPC untuk mengambil soal TANPA mengirim kunci jawaban (correct_option) ke browser
create or replace function public.get_lesson_quiz(p_lesson_id uuid, p_limit integer default 10)
returns table (
  id uuid,
  lesson_id uuid,
  prompt text,
  options jsonb,
  difficulty text
)
language sql
security definer set search_path = public
as $$
  select q.id, q.lesson_id, q.prompt, q.options, q.difficulty
  from public.questions q
  join public.lessons l on l.id = q.lesson_id
  where q.lesson_id = p_lesson_id
    and l.status = 'published'
  order by random()
  limit least(p_limit, 20);
$$;

-- 5. Fungsi RPC untuk menilai kuis di server, memberi XP anti-cheat, & mengembalikan pembahasan
create or replace function public.submit_quiz_answers(
  p_lesson_id uuid,
  p_answers jsonb -- Format dari React: [{"question_id": "uuid", "selected_option": 1}, ...]
)
returns jsonb
language plpgsql
security definer set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_total integer := 0;
  v_correct integer := 0;
  v_score integer := 0;
  v_xp_earned integer := 0;
  v_already_completed boolean := false;
  v_results jsonb := '[]'::jsonb;
  v_item jsonb;
  v_question record;
  v_is_correct boolean;
begin
  if v_user_id is null then
    raise exception 'Harus login terlebih dahulu untuk mengumpulkan kuis';
  end if;

  -- Cek apakah siswa sudah pernah menuntaskan kuis di bab ini sebelumnya
  select exists (
    select 1 from public.quiz_attempts
    where student_id = v_user_id and lesson_id = p_lesson_id
  ) into v_already_completed;

  -- Periksa setiap jawaban siswa terhadap kunci jawaban di tabel questions
  for v_item in select * from jsonb_array_elements(p_answers)
  loop
    select * into v_question
    from public.questions
    where id = (v_item->>'question_id')::uuid
      and lesson_id = p_lesson_id;

    if found then
      v_total := v_total + 1;
      v_is_correct := (v_question.correct_option = (v_item->>'selected_option')::integer);
      if v_is_correct then
        v_correct := v_correct + 1;
      end if;

      v_results := v_results || jsonb_build_object(
        'question_id', v_question.id,
        'selected_option', (v_item->>'selected_option')::integer,
        'correct_option', v_question.correct_option,
        'is_correct', v_is_correct,
        'explanation', v_question.explanation
      );
    end if;
  end loop;

  if v_total = 0 then
    raise exception 'Tidak ada jawaban valid yang dikirim';
  end if;

  v_score := round((v_correct::numeric / v_total::numeric) * 100);

  -- Hitung XP: Percobaan pertama dapat (10 XP x benar) + 5 bonus; pengulangan dapat 3 XP latihan
  if not v_already_completed then
    v_xp_earned := (v_correct * 10) + 5;
  else
    v_xp_earned := 3;
  end if;

  -- Simpan riwayat kuis
  insert into public.quiz_attempts (student_id, lesson_id, score, correct_count, total_questions, xp_earned)
  values (v_user_id, p_lesson_id, v_score, v_correct, v_total, v_xp_earned);

  -- Catat XP dan perbarui total_xp di profil siswa
  insert into public.xp_events (student_id, event_type, reference_id, amount)
  values (v_user_id, 'quiz_attempt', gen_random_uuid(), v_xp_earned);

  update public.profiles
  set total_xp = total_xp + v_xp_earned
  where id = v_user_id;

  return jsonb_build_object(
    'score', v_score,
    'correct_count', v_correct,
    'total_questions', v_total,
    'xp_earned', v_xp_earned,
    'details', v_results
  );
end;
$$;
Buka menu Project Settings → API di Supabase, salin Project URL dan anon / publishable key, lalu buat file .env.local di folder proyekmu:Cuplikan kodeVITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOi...
Checklist Selesai Tahap 3:[ ] Semua 10 tabel muncul di menu Table Editor Supabase.[ ] Fungsi handle_new_user, get_lesson_quiz, dan submit_quiz_answers berhasil dibuat tanpa error di SQL Editor.[ ] File .env.local sudah dibuat dan namanya sudah tercatat di dalam .gitignore.TAHAP 4: Integrasi Autentikasi, RLS Dasar, & Proteksi Role (Estimasi: 4–5 Jam)Tujuan: Menghubungkan form Daftar/Masuk di React ke Supabase Auth dan mengunci halaman berdasarkan role (student, tutor, admin).Langkah Demi Langkah:Di dashboard Supabase, buka Authentication → Providers → Email, lalu matikan sementara opsi Confirm email saat tahap development agar kamu bisa mudah mencoba daftar banyak akun siswa/tutor tanpa harus cek inbox email terus-menerus (nyalakan kembali saat mau rilis).Jalankan SQL kebijakan keamanan dasar (RLS) untuk tabel profiles, subjects, dan lessons di SQL Editor:SQLalter table public.profiles enable row level security;
alter table public.subjects enable row level security;
alter table public.lessons enable row level security;
alter table public.questions enable row level security;

-- Semua orang bisa baca daftar mata pelajaran aktif & materi yang sudah published
create policy "Subjects publik" on public.subjects for select using (is_active = true);
create policy "Lessons published publik" on public.lessons for select using (status = 'published');

-- Pengguna bisa membaca profilnya sendiri
create policy "Baca profil sendiri" on public.profiles for select using (auth.uid() = id);

-- Pengguna hanya boleh mengubah nama, kelas, dan avatar miliknya (tidak boleh ubah role/total_xp)
create policy "Update profil sendiri" on public.profiles for update
  using (auth.uid() = id)
  with check (
    auth.uid() = id
    and role = (select role from public.profiles where id = auth.uid())
    and total_xp = (select total_xp from public.profiles where id = auth.uid())
  );
Jalankan Prompt Tahap 2 di OpenCode untuk membuat src/lib/supabaseClient.js, AuthContext.jsx, dan ProtectedRoute.jsx.Uji daftar 2 akun baru lewat halaman /register di webmu:Akun 1: siswa1@test.com (biarkan sebagai student).Akun 2: tutor1@test.com (buka menu Table Editor → profiles di Supabase, ubah kolom role milik tutor1 secara manual menjadi tutor).Checklist Selesai Tahap 4:[ ] Daftar akun baru di /register otomatis membuat baris baru di tabel profiles dengan role student.[ ] Login dengan siswa1@test.com mengarahkan pengguna ke /student dan menolak akses jika URL diganti ke /tutor atau /admin.[ ] Login dengan tutor1@test.com berhasil membuka halaman /tutor.TAHAP 5: Menghubungkan Materi, Bank Soal, & Kuis Server-Side (Estimasi: 6–8 Jam)Tujuan: Mengganti data dummy dengan data asli dari database Supabase serta menjalankan kuis aman menggunakan RPC get_lesson_quiz dan submit_quiz_answers.Langkah Demi Langkah:Masukkan minimal 6 mata pelajaran (matematika, bahasa-indonesia, ipas, pancasila, bahasa-inggris, seni-budaya) ke tabel subjects, serta 1 materi contoh beserta 10 soal menggunakan SQL (seperti contoh SQL materi di pembahasan kita sebelumnya).Jalankan Prompt Tahap 3 di OpenCode dengan catatan teknis berikut:PlaintextSaat mengambil daftar soal di halaman kuis, JANGAN memanggil supabase.from('questions').select('*').
Gunakan supabase.rpc('get_lesson_quiz', { p_lesson_id: lessonId, p_limit: 10 }).
Saat siswa menekan tombol Kumpulkan Kuis, kirim jawaban ke supabase.rpc('submit_quiz_answers', { p_lesson_id: lessonId, p_answers: formattedAnswers }) dan tampilkan skor, XP yang didapat, serta pembahasan tiap soal dari respons RPC tersebut.
Uji coba mengerjakan kuis dari akun siswa1@test.com.Checklist Selesai Tahap 5:[ ] Daftar pulau mata pelajaran dan bab materi di web sudah diambil langsung dari database Supabase.[ ] Saat membuka tab Network di Inspect Element browser ketika kuis berlangsung, tidak ada kolom correct_option yang bocor.[ ] Setelah klik "Selesai Kuis", nilai (0–100), jumlah benar, tambahan XP, dan pembahasan tiap soal tampil dengan benar.TAHAP 6: Gamifikasi Lengkap (XP Materi, Level Bar, & Anti-Exploit) (Estimasi: 4–5 Jam)Tujuan: Menghubungkan total_xp dari database ke XPBar dan LevelBadge di layar siswa, serta memberi +5 XP saat siswa selesai membaca materi.Langkah Demi Langkah:Tambahkan fungsi RPC singkat di SQL Editor Supabase untuk klaim +5 XP saat siswa menuntaskan baca materi (otomatis menolak klaim ganda berkat constraint unique (student_id, event_type, reference_id) di tabel xp_events):SQLcreate or replace function public.complete_lesson_reading(p_lesson_id uuid)
returns integer
language plpgsql
security definer set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_inserted_id uuid;
begin
  if v_user_id is null then
    raise exception 'Harus login';
  end if;

  insert into public.xp_events (student_id, event_type, reference_id, amount)
  values (v_user_id, 'read_lesson', p_lesson_id, 5)
  on conflict (student_id, event_type, reference_id) do nothing
  returning id into v_inserted_id;

  if v_inserted_id is not null then
    update public.profiles set total_xp = total_xp + 5 where id = v_user_id;
    return 5;
  end if;

  return 0; -- Sudah pernah klaim XP untuk bab ini
end;
$$;
Jalankan Prompt Tahap 4 di OpenCode agar tombol "Selesai Membaca & Lanjut Kuis" memanggil supabase.rpc('complete_lesson_reading', { p_lesson_id }) dan memperbarui tampilan XPBar serta LevelBadge di Navbar.Checklist Selesai Tahap 6:[ ] Selesai membaca materi pertama kali menambah +5 XP; jika materi yang sama dibuka lagi, XP tidak bertambah ganda.[ ] Selesai kuis pertama kali memberi 10 XP per jawaban benar + 5 XP bonus; jika kuis yang sama diulang terus-menerus, hanya memberi 3 XP latihan.[ ] Level siswa di pojok layar otomatis naik setiap kelipatan 100 XP.TAHAP 7: Fitur Kelas Bimbel Tutor, Kode Gabung, & Tugas (Estimasi: 6–8 Jam)Tujuan: Menghidupkan interaksi antara Tutor dan Siswa (membuat kelas, bagi kode kelas, memberi tugas, mengumpulkan tugas, dan memberi nilai + komentar).Langkah Demi Langkah:Aktifkan RLS untuk tabel classes, class_members, assignments, dan submissions di SQL Editor Supabase.Jalankan Prompt Tahap 5 di OpenCode.Pastikan fitur yang dibuat mencakup:Di halaman Tutor (/tutor): Tombol "Buat Kelas Baru" (otomatis membuat join_code 6 karakter seperti BIM-3A), daftar siswa yang tergabung, tombol "Buat Tugas" (memilih bab materi + instruksi + tenggat waktu), dan daftar kiriman tugas siswa untuk diberi skor (0–100) serta komentar semangat.Di halaman Siswa (/student): Kotak "Gabung Kelas Kakak Tutor" (masukkan join_code), daftar tugas dari kelas yang diikuti, form pengumpulan jawaban, dan tampilan nilai/komentar dari tutor.Checklist Selesai Tahap 7:[ ] Akun tutor1@test.com berhasil membuat kelas dan mendapatkan kode gabung.[ ] Akun siswa1@test.com berhasil masuk ke kelas tersebut menggunakan kode gabung.[ ] Tutor membuat tugas → muncul di dashboard Siswa → Siswa mengirim jawaban → muncul di dashboard Tutor → Tutor memberi nilai & komentar → tampil di layar Siswa.TAHAP 8: Fitur Import Soal Admin, Audit Keamanan, & Rilis ke Vercel (Estimasi: 4–5 Jam)Tujuan: Memudahkan pengisian ribuan soal lewat halaman Admin, memastikan keamanan privasi anak SD, dan meng-online-kan website agar bisa diakses dari HP siapa saja.Langkah Demi Langkah:Minta OpenCode menambahkan fitur "Import Soal JSON/CSV" di halaman /admin sehingga kamu bisa menempelkan hasil olahan soal dari internet (format JSON/CSV) langsung lewat browser tanpa perlu membuka SQL Editor lagi.Jalankan Prompt Tahap 6 di OpenCode untuk melakukan audit keamanan, menghapus console.log yang tidak perlu, dan mengecek npm run build.Buat repositori baru di GitHub (set sebagai Private atau Public), lalu unggah kodinganmu:Bashgit init
git add .
git commit -m "MVP Petualangan Ilmu siap rilis"
git branch -M main
git remote add origin https://github.com/USERNAME_KAMU/petualangan-ilmu.git
git push -u origin main
(Pastikan file .env.local tidak ikut ter-upload ke GitHub).Buka vercel.com, login dengan akun GitHub-mu, lalu klik Add New Project → pilih repositori petualangan-ilmu.Pada bagian Environment Variables di Vercel, masukkan VITE_SUPABASE_URL dan VITE_SUPABASE_PUBLISHABLE_KEY sesuai isi .env.local milikmu.Tambahkan file vercel.json kecil di root proyekmu agar ketika halaman di-refresh pada rute seperti /student/map tidak muncul error 404:JSON{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
Klik Deploy dan tunggu sekitar 1 menit hingga link publik websitemu aktif!Checklist Selesai Tahap 8 (Siap Dipakai Siswa):[ ] npm run build berjalan 100% bersih tanpa error.[ ] Semua tabel di Supabase memiliki status RLS Enabled.[ ] Website sudah online di domain .vercel.app, dibuka dari HP berjalan lancar, dan saat halaman di-refresh tidak terjadi 404 Not Found.Ringkasan Urutan Eksekusi Harianmu Mulai SekarangSupaya kamu tidak pusing melihat panjangnya dokumen ini, fokuskan pikiranmu hanya pada satu kotak terdekat:Hari 1–2: Kerjakan Tahap 1 & Tahap 2 (Setup Vite + jalankan Prompt Tahap 1 di OpenCode sampai tampilan web jalan pakai data dummy).Hari 3–4: Kerjakan Tahap 3 & Tahap 4 (Buat proyek Supabase, jalankan SQL di atas, dan sambungkan fitur Login/Register).Hari 5–7: Kerjakan Tahap 5 & Tahap 6 (Sambungkan materi, kuis RPC aman, dan XP/Level).Hari 8–10: Kerjakan Tahap 7 & Tahap 8 (Buat fitur Kelas Tutor, halaman Admin, dan Deploy ke Vercel).
```

</details>
