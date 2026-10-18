# Petualangan Ilmu

Bimbel digital gratis dan game edukasi SD kelas 1–6. README ini menjadi **Master PRD dan panduan pengerjaan dari persiapan sampai rilis**.

**Status 16 Oktober 2026:** fondasi Tahap 1 dan implementasi lokal Tahap 2 tersedia. Persiapan **Tahap 3** sekarang mencakup migration database, RLS, RPC kuis/XP, seed draft, dan pemeriksaan pemasangan. SQL sudah dijalankan dan diuji pada PostgreSQL lokal di memori. **32 tes lulus dalam satu pengujian lengkap: 19 tes UI/aturan belajar dan 13 tes database, termasuk tes induk.** Proyek Supabase cloud dan integrasi frontend belum tersedia. QA visual browser tetap belum dinyatakan lulus; Tahap 4–8 belum dikerjakan sebagai fitur produksi.

## Checklist penyelesaian

**Dokumentasi README selesai disusun. Pengerjaan produk masih bertahap.** Tanda `[x]` berarti pekerjaan tersebut sudah dilakukan dan memiliki bukti sesuai lingkup yang disebutkan; `[ ]` berarti masih perlu dikerjakan atau diverifikasi. Pengujian lokal tidak otomatis menyelesaikan pengujian Supabase cloud.

### Sudah selesai

- [x] Master PRD, peran pengguna, F-01–F-08, dan kriteria selesai didokumentasikan.
- [x] Teknologi, struktur folder, cara menjalankan, serta konfigurasi contoh tersedia.
- [x] Panduan delapan fase dan checklist tiap fase tersedia.
- [x] Fondasi React, Vite, Tailwind, dan server lokal diuji.
- [x] UI demo siswa, tutor, dan admin dibuat serta diuji dengan DOM.
- [x] Data demo menyediakan 36 materi dan 180 soal untuk kelas 1–6.
- [x] Migration database, RLS, trigger profil, serta RPC kuis/XP dibuat.
- [x] Seed database menyediakan 36 materi dan 185 soal berstatus draft.
- [x] Migration dan aturan akses dijalankan pada PostgreSQL lokal di memori.
- [x] Seluruh 32 tes otomatis lulus; build produksi dan format kode lulus.
- [x] Naskah PRD asli, arsip SQL lama, dan bukti verifikasi dipertahankan.

### Masih harus diselesaikan sebelum rilis

- [ ] QA visual pada HP 375–412 px dan desktop.
- [ ] Proyek Supabase dibuat, migration/seed dipasang, dan konfigurasi publik diisi.
- [ ] Registrasi, login, sesi, serta proteksi role memakai Supabase Auth nyata.
- [ ] Materi, kuis, progres, kelas, dan tugas terhubung ke database cloud.
- [ ] Studio konten, publikasi, dan impor admin bekerja melalui server.
- [ ] Akses file privat dan isolasi data diuji lintas akun/perangkat.
- [ ] Konkurensi, pemulihan akun, penghapusan data, dan prosedur operasional diuji.
- [ ] Materi dan soal ditinjau guru sebelum dipublikasikan.
- [ ] Deployment dan pengujian akhir domain publik selesai.

**Pekerjaan terdekat:** buat proyek Supabase baru, lalu ikuti [Tahap 3](#tahap-3-database-dan-rpc). Jangan mencentang pemasangan cloud hanya karena tes lokal sudah lulus.

## Pelaksanaan saat ini: langkah yang jelas

### 1. Pahami batas hasil yang sudah tersedia

| Tahap | Hasil sekarang | Bukti atau kebutuhan berikutnya |
| --- | --- | --- |
| 1 — Fondasi | Lolos pemeriksaan teknis | Server HTTP 200, JSX/CSS terkompilasi, 11 folder tersedia |
| 2 — UI dan dummy | Implementasi dan tes otomatis selesai; QA visual menunggu | 36 materi, 180 soal awal, 6 mata pelajaran, 6 tingkat kelas; 19 tes lulus |
| 3 — Supabase | Migration, seed, RLS, dan RPC siap; pengujian PostgreSQL lokal lulus | Menunggu pemasangan pada proyek Supabase baru milik pengguna |
| 4–8 — Integrasi dan rilis | Belum dikerjakan sebagai fitur produksi | Memerlukan database, Auth/RLS/RPC, pengujian lintas akun, lalu deployment |

Fitur kelas, XP, dan impor yang dapat dicoba saat ini adalah **simulasi Tahap 2 pada satu browser**. Ini belum membuktikan autentikasi, keamanan XP, isolasi pengguna, maupun penyimpanan database. Semua peran demo mengakses satu set data contoh lokal. Email/kata sandi formulir tidak disimpan atau dikirim; gunakan data rekaan. Konten perlu ditinjau guru sebelum digunakan dalam pembelajaran nyata.

### 2. Jalankan aplikasi di laptop

1. Buka folder yang berisi `package.json` dan `JALANKAN-LOKAL.cmd`.
2. Klik dua kali `JALANKAN-LOKAL.cmd`. Launcher memakai Node pada PATH atau runtime lokal yang sudah tersedia.
3. Buka **http://127.0.0.1:5173**. Biarkan terminal server terbuka.
4. Jika port 5173 sedang digunakan, buka terminal di folder proyek dan jalankan:

```powershell
.\JALANKAN-LOKAL.cmd 5174
```

Lalu buka **http://127.0.0.1:5174**. Tidak perlu menghentikan proses aplikasi lain. Mengganti port berarti origin browser berbeda; progres demo pada port sebelumnya tidak otomatis ikut terbawa.

Jika Node/npm sudah tersedia pada PATH, perintah standar tetap:

```sh
npm ci
npm run dev
# Alternatif jika port 5173 dipakai:
npm run dev -- --port 5174
```

### 3. Coba alur siswa dari awal sampai akhir

1. Dari landing, pilih **Mulai petualangan**.
2. Gunakan nama rekaan, pilih **Kelas 3**, dan avatar. Tekan **Mulai demo petualangan**.
3. Pada peta, pilih **Pulau Angka**, lalu buka **Perkalian di kebun Nara**.
4. Baca cerita, ilustrasi, dan kotak tips. Tekan **Selesai membaca & mulai latihan**.
5. Bacaan pertama memberi **+5 XP demo**. Membaca ulang bab yang sama tidak mengulang hadiah.
6. Jawab lima soal; gunakan **Sebelumnya/Selanjutnya** bila ingin memeriksa jawaban.
7. Tekan **Kumpulkan latihan**. Jawaban yang masih kosong akan ditandai dan diarahkan kembali.
8. Lihat nilai, jumlah benar, XP, serta pembahasan setiap soal. Lima jawaban tepat pada percobaan selesai pertama memberi **+55 XP demo**.
9. Buka **Progres belajar** untuk membaca riwayat dan membuka kembali pembahasan.
10. Coba kelas 1–6 dan filter mata pelajaran; daftar materi harus mengikuti pilihan kelas.

### 4. Coba alur pendampingan tutor

1. Pada demo siswa kelas 3, buka **Kelas saya**, masukkan **ILMU03**, lalu pilih **Gabung**.
2. Kerjakan tugas **Perkalian di sekitarmu**, kemudian simpan jawaban demo.
3. Tekan **Mode demo** di header, lalu pilih **Demo tutor**.
4. Di **Waktunya memberi semangat**, temukan jawaban siswa tadi. Isi nilai 0–100 dan komentar yang menyebut apa yang sudah baik serta langkah berikutnya.
5. Simpan umpan balik. Hadiah tugas diberikan **+15 XP demo sekali**; mengubah nilai tidak mengulang hadiah.
6. Pilih kembali demo siswa melalui **Mode demo**. Buka kelas untuk membaca komentar dan nilai.
7. Untuk menguji kelas baru, buat kelas pada demo tutor, salin kode enam karakter, lalu gabung lewat demo siswa dengan tingkat kelas yang sama.

Alur tersebut berjalan pada browser/origin yang sama. Berbagi kode ini ke perangkat lain belum menghubungkan data karena database belum tersedia.

### 5. Coba studio admin

1. Pilih **Mode demo → Demo admin**.
2. Gunakan JSON contoh, tekan **Validasi dahulu**, periksa ringkasannya, lalu **Simpan batch valid ke demo**.
3. Ulangi dengan format CSV atau unduh contoh berkasnya.
4. Coba kunci di luar 0–3, opsi ganda, atau `lesson_id` tidak dikenal. Batch yang memiliki kesalahan harus ditolak seluruhnya.
5. Soal yang disimpan hanya menambah bank soal lokal dan dapat muncul pada latihan materi terkait.

### 6. Pemeriksaan visual yang masih perlu dilakukan

Sesi ini tidak menyediakan browser yang dapat dikendalikan, sehingga pengujian DOM tidak dianggap sebagai QA tampilan. Buka DevTools browser dan periksa **375 px, 412 px, dan desktop**:

- [ ] Landing, peta, materi, kuis, hasil, kelas, tutor, dan admin tidak menyebabkan gulir horizontal halaman.
- [ ] Teks utama mudah dibaca dan tombol dapat disentuh dengan nyaman.
- [ ] Fokus keyboard terlihat; formulir dan pilihan kuis dapat dioperasikan tanpa mouse.
- [ ] Ilustrasi SVG tampil; navigasi tidak menampilkan layar kosong atau error console.
- [ ] Refresh rute dan progres demo bekerja pada origin yang sama.
- [ ] Guru meninjau ketepatan materi/soal, kesesuaian usia, dan bahasa umpan balik.

Renderer video sudah diuji dengan fixture DOM dan hanya memuat iframe setelah klik. Materi contoh belum memiliki tautan video sungguhan; pemutaran YouTube nyata perlu diuji setelah video dipilih dan ditinjau.

### 7. Siapkan kebutuhan Tahap 3

Anda menyatakan belum mempunyai proyek Supabase. Langkah pemilik proyek berikutnya:

1. Buka [dashboard Supabase](https://supabase.com/dashboard), lalu masuk atau buat akun sendiri.
2. Buat proyek baru bernama **petualangan-ilmu**. Pilih organisasi dan region yang tersedia, serta simpan password database secara pribadi.
3. Tunggu proyek siap. Pada panel **Connect** atau pengaturan API, ambil **Project URL** dan **publishable key**. Langkah konfigurasi React dijelaskan di [quickstart resmi Supabase](https://supabase.com/docs/guides/getting-started/quickstarts/reactjs).
4. Salin `.env.example` menjadi `.env.local`, kemudian isi kedua nilai publik tersebut. Jangan masukkan password database, secret key, atau service-role key.
5. Ikuti [Tahap 3: Database dan RPC](#tahap-3-database-dan-rpc) untuk memasang migration aktif, seed draft, dan query verifikasi. SQL lama telah diarsipkan; SQL lampiran tetap menjadi sumber historis dan tidak dijalankan bersama migration baru.

Membuat `.env.local` saja belum menghubungkan demo ke Supabase. Integrasi harus dikerjakan dan diuji pada tahap berikutnya; sampai saat itu aplikasi tetap memakai `DemoContext` dan data contoh.

### 8. Jalankan pemeriksaan teknis

```sh
npm test
npm run test:db
npm run verify:stage1 -- --port=0
npm run build
npm run format:check
```

`npm test` mencakup tes UI dan database; `npm run test:db` hanya untuk mengulang pengujian SQL. `--port=0` meminta port sementara yang kosong dan menutup server setelah pemeriksaan, sehingga tidak mengganggu port 5173. UI diuji dengan Happy DOM, database dengan PGlite/PostgreSQL lokal di memori. Tidak ada akun atau data cloud yang dibuat oleh tes. Prettier menjaga format source; `npm run format` merapikan kode setelah perubahan.

## Daftar isi

- [Checklist penyelesaian](#checklist-penyelesaian)
- [Pelaksanaan dan cara mencoba](#pelaksanaan-saat-ini-langkah-yang-jelas)
- [Menjalankan proyek](#menjalankan-proyek)
- [Teknologi](#teknologi)
- [Struktur folder](#struktur-folder)
- [Visi dan pengguna](#visi-dan-pengguna)
- [Hak akses](#hak-akses)
- [Fitur dan kriteria selesai](#fitur-dan-kriteria-selesai)
- [XP dan level](#xp-dan-level)
- [Penyimpanan](#penyimpanan)
- [Data dan kontrak Supabase](#data-dan-kontrak-supabase)
- [Tahap pengerjaan](#tahap-pengerjaan)
- [Jadwal](#jadwal)
- [Verifikasi](#verifikasi)
- [Sumber lengkap](#sumber-lengkap)

## Menjalankan proyek

Jalankan dari folder aplikasi, bukan `work/npm-cache`. Prasyaratnya Git dan Node.js **22.12 atau lebih baru**, sesuai `engines` proyek. Node 18 pada naskah awal tidak cocok dengan Vite yang terpasang; lihat [persyaratan resmi Vite](https://vite.dev/guide/).

```powershell
cd "C:\Users\J2ACER NITRO\Documents\Codex\2026-10-16\bu\outputs\petualangan-ilmu"
node --version
npm ci
npm run dev
```

Buka http://localhost:5173. Alternatif Windows: setelah dependensi terpasang, klik dua kali `JALANKAN-LOKAL.cmd` dan biarkan terminal terbuka.

```sh
npm run build          # menghasilkan dist/
npm run preview        # http://localhost:4173
npm run verify:stage1  # pemeriksaan fondasi; port 5173 harus kosong
```

Hasil build Vite dijalankan melalui HTTP; membuka `dist/index.html` menggunakan `file://` bukan cara menjalankan aplikasi ini.

Pada Tahap 3, salin `.env.example` menjadi `.env.local`, lalu isi:

```dotenv
VITE_SUPABASE_URL=https://PROJECT_ID.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
```

Aplikasi demo sekarang belum memakai konfigurasi tersebut. Variabel `VITE_*` terlihat di browser; gunakan publishable/anon key, simpan `service_role` hanya di server. `.env.local` diabaikan Git.

## Teknologi

Pertahankan **React + Vite + Tailwind CSS**, JavaScript, dan React Router yang sudah terpasang. SPA ini sesuai untuk peta interaktif, materi, kuis, serta dashboard dengan backend Supabase. Mulai dari dummy, lalu sambungkan layanan nyata bertahap.

| Teknologi | Kegunaan |
| --- | --- |
| React dan React DOM | Komponen dan interaksi antarmuka |
| Vite dan plugin React | Server lokal dan build |
| Tailwind CSS dan `@tailwindcss/vite` | Tampilan mobile-first |
| React Router | Navigasi dan proteksi halaman |
| `@supabase/supabase-js` | Auth, database, Storage, RPC |
| Lucide React | Ikon |
| `clsx`, `tailwind-merge` | Penyusunan kelas CSS |
| Supabase PostgreSQL | Data, penilaian kuis, dan XP di server |
| Vercel | Target hosting pada Tahap 8 |

Gunakan `npm ci` dan `package-lock.json` untuk instalasi berulang. Pembaruan dependensi dilakukan secara sengaja. Konfigurasi mengikuti [panduan Tailwind dengan Vite](https://tailwindcss.com/docs/installation/using-vite):

```js
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({ plugins: [react(), tailwindcss()] })
```

```css
/* src/index.css */
@import "tailwindcss";
```

## Struktur folder

```text
petualangan-ilmu/
├── README.md                     # PRD dan panduan utama
├── .env.example                  # contoh konfigurasi tanpa rahasia
├── .gitignore
├── .openai/hosting.json           # konfigurasi hosting yang sudah ada
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── vercel.json                   # fallback rute SPA
├── JALANKAN-LOKAL.cmd
├── public/assets/                # peta, avatar, ilustrasi publik
├── src/
│   ├── App.jsx                   # aplikasi dan rute
│   ├── main.jsx                  # entry React dan BrowserRouter
│   ├── index.css                 # Tailwind dan gaya global
│   ├── components/
│   │   ├── ui/                   # tombol, kartu, XPBar, LevelBadge
│   │   ├── adventure/            # pulau dan peta belajar
│   │   └── quiz/                 # pertanyaan, opsi, hasil
│   ├── context/                  # DemoContext; AuthContext pada tahap integrasi
│   ├── layouts/                  # kerangka halaman per peran
│   ├── lib/                      # utilitas, dummyData, klien Supabase
│   ├── pages/
│   │   ├── auth/                 # login dan registrasi
│   │   ├── student/              # peta, materi, kuis, tugas
│   │   ├── tutor/                # kelas dan penilaian
│   │   └── admin/                # konten dan impor
│   └── services/                 # akses database/RPC per fitur
├── scripts/verify-stage1.mjs      # pemeriksaan fondasi
├── tests/                        # tes aturan belajar dan alur DOM
├── supabase/
│   ├── migrations/202610160001_initial_schema.sql # migration aktif untuk proyek baru
│   ├── seed.sql                   # 36 materi / 185 soal DRAFT, dihasilkan skrip
│   ├── verify-setup.sql           # pemeriksaan baca-saja setelah pemasangan
│   ├── schema.sql                # penunjuk berkas, bukan installer
│   └── legacy/schema-before-stage3.sql # arsip skema terdahulu
├── docs/
│   ├── source/                   # sumber PRD asli
│   └── archive/                  # README dan checkpoint sebelumnya
├── legacy/                       # demo HTML lama, diabaikan Git
├── dist/                         # hasil build, diabaikan Git
└── node_modules/                 # dependensi lokal, diabaikan Git
```

Folder yang masih kosong diberi `.gitkeep` agar terbawa Git. Halaman publik ada di `src/pages/`, halaman tiap peran di subfoldernya, dan state demo di `context/DemoContext.jsx`. Akses Supabase nanti ditempatkan dalam `services/`; utilitas belajar dan data contoh ada di `lib/`.

Folder saudara `work/` berisi cache dan alat kerja, bukan source aplikasi. Lokasi proyek dipertahankan agar referensi dan konfigurasi hosting tetap berlaku.

## Visi dan pengguna

**Petualangan Ilmu — Bimbel Digital & Game Edukasi SD Gratis** menyasar siswa Indonesia usia 6–12 tahun, tutor/relawan pengajar, orang tua, dan admin. Bimbel berbayar belum terjangkau semua keluarga; latihan soal biasa mudah membosankan dan tidak menyediakan pendampingan guru.

Solusinya adalah peta petualangan 2D: siswa membuka pulau mata pelajaran, membaca materi bergambar/video, mengerjakan kuis berhadiah XP/level, dan belajar dalam kelas virtual bersama tutor.

Prioritaskan HP Android dan koneksi beragam. Angka 90% akses HP pada naskah awal merupakan asumsi perencanaan yang perlu divalidasi. Uji lebar 375–412 px, teks minimal `text-base`/`text-lg`, tombol kuis besar dan kontras, serta tanpa gulir horizontal.

## Hak akses

| Peran | Hak | Batasan |
| --- | --- | --- |
| Tamu (`guest`) | Landing dan contoh katalog publik | Tidak mengerjakan kuis, menyimpan XP, atau masuk kelas |
| Siswa (`student`) | Pilih kelas/avatar, materi published, kuis, XP/level, gabung kelas, kirim tugas | Tidak melihat kunci sebelum submit, mengubah XP, atau membaca nilai teman |
| Tutor (`tutor`) | Buat kelas/kode, tugas, pantau anggota, nilai/komentar, buat draf materi/soal | Hanya mengelola kelas sendiri; tidak mengangkat admin |
| Admin (`admin`) | Verifikasi/publikasi konten, impor CSV/JSON, katalog, angkat tutor | Admin ditetapkan langsung oleh pemilik database, bukan registrasi publik |
| Orang tua | Laporan perkembangan anak pada pengembangan lanjutan | Memerlukan hubungan wali–anak terverifikasi; detail role belum dirancang |

Registrasi selalu membuat student, XP 0, level 1. Proteksi rute harus disertai RLS dan validasi peran di server.

## Fitur dan kriteria selesai

| Kode | Fitur | Prioritas | Kriteria selesai |
| --- | --- | --- | --- |
| F-01 | Auth dan profil | P0 | Email/password, kelas 1–6, avatar hewan; profil otomatis student, level 1, XP 0 |
| F-02 | Peta dan katalog | P0 | Pulau pengetahuan, filter kelas/bab; siswa kelas 3 otomatis melihat materi published kelas 3 |
| F-03 | Pembaca multi-format | P0 | Teks cerita, tips, gambar cloud, embed YouTube dari JSONB tampil rapi di HP |
| F-04 | Kuis dan pembahasan | P0 | 5–10 soal acak A/B/C/D, penilaian server; kunci tidak bocor di Network; pembahasan sesudah submit |
| F-05 | XP dan level | P0 | XP otomatis dari server, level per 100 XP, pembatasan spam hadiah |
| F-06 | Kelas dan tugas tutor | P0 | Kode unik 6 karakter; gabung kelas, kirim teks/link, baca nilai/komentar |
| F-07 | Studio dan impor | P0 | Tutor membuat draf; admin memverifikasi/publikasi dan mengimpor puluhan/ratusan soal CSV/JSON |
| F-08 | Ringkasan orang tua | P1 | Jumlah materi selesai, rata-rata nilai, dan catatan tutor untuk wali terverifikasi |

P0 adalah target MVP; P1 dikerjakan sesudah MVP, berbeda dengan Tahap 2 pengerjaan UI.

## XP dan level

| Aktivitas | Hadiah | Batas |
| --- | --- | --- |
| Selesai membaca bab baru | +5 XP | Sekali per bab per siswa |
| Jawaban benar pada kuis pertama selesai | +10 XP per jawaban | Hadiah utama sekali per bab |
| Bonus menuntaskan sesi pertama | +5 XP | Mengikuti batas hadiah utama per bab |
| Tugas yang sudah dinilai tutor | +15 XP | Sekali per tugas, bukan setiap pengiriman/perubahan nilai |
| Remedial materi/kuis belum lulus | +3 XP | Maksimal sekali sehari per siswa, zona Asia/Jakarta |

```text
level = floor(total_xp / 100) + 1
progres_bar_persen = total_xp % 100
score = round(jumlah_benar / jumlah_soal * 100)
```

0–99 XP = level 1; 100–199 XP = level 2; 250 XP = level 3 dengan progres 50%. XP mengukur konsistensi; skor kuis/tugas 0–100 mengukur pemahaman akademik.

Naskah awal menyebut “percobaan pertama yang lulus atau dibatasi per bab”. Fondasi lama memilih **percobaan selesai pertama per bab**, dengan remedial kuis di bawah nilai 60, dibatasi sekali per tanggal Asia/Jakarta secara global. Gunakan keputusan ini sebagai aturan kerja sampai produk mengubahnya. Remedial membaca belum didukung fondasi lama.

Hadiah dihitung server melalui ledger unik dan transaksi; uji klik ganda, replay, dan submit bersamaan. Tombol selesai membaca menandai penyelesaian, belum membuktikan pemahaman atau durasi membaca.

## Penyimpanan

| Data | Layanan | Bentuk |
| --- | --- | --- |
| Kode dan aset game | GitHub + Vercel | React, SVG/WebP peta dan avatar |
| Akun, teks materi, soal | Supabase PostgreSQL | Relasional dan JSONB |
| Gambar materi/soal, PDF | Cloudinary atau Cloudflare R2 | WebP target <150 KB; database menyimpan URL |
| Berkas tugas | Supabase Storage | Bucket privat `student-submissions`, signed URL |
| Video | YouTube Unlisted | `https://www.youtube.com/embed/ID_VIDEO` |

Naskah awal mencantumkan PostgreSQL 500 MB (~250.000 soal), media 10–25 GB, Storage tugas 1 GB, serta deployment/video “unlimited”. Ini asumsi sumber yang **belum diverifikasi sebagai kuota layanan terkini atau jaminan gratis**. Kapasitas nyata bergantung ukuran soal, indeks, trafik, dan paket penyedia. Periksa sebelum rilis. Video Unlisted dapat dibuka siapa pun yang memiliki tautan.

## Data dan kontrak Supabase

Model target PRD terdiri dari sepuluh tabel: `profiles`, `subjects`, `lessons`, `questions`, `quiz_attempts`, `xp_events`, `classes`, `class_members`, `assignments`, `submissions`.

Dummy Tahap 2 menggunakan bentuk berikut (notasi kontrak, bukan kode siap eksekusi):

```js
subjects: [{ id, name, slug, description }]
lessons: [{
  id, subject_id, title, slug, grade, phase, difficulty, status,
  content: { summary, video_url, blocks: [
    { type: 'text', body }, { type: 'image', url, caption }, { type: 'tip', body }
  ] }
}]
questions: [{
  id, lesson_id, prompt, options: ['A', 'B', 'C', 'D'],
  correct_option: 1, explanation, difficulty
}]
```

Kunci dalam dummy hanya untuk pengembangan lokal; hapus dari bundle saat integrasi produksi. Kontrak aktif menggunakan `correct_option`/`selected_option` berbasis 0–3; kunci database hanya disimpan di schema privat.

### Kontrak database yang dipilih pada Tahap 3

Sumber SQL aktif adalah [`supabase/migrations/202610160001_initial_schema.sql`](supabase/migrations/202610160001_initial_schema.sql). Skema sebelumnya dipertahankan sebagai [arsip](supabase/legacy/schema-before-stage3.sql). `supabase/schema.sql` sekarang hanya menunjuk berkas aktif. SQL lampiran historis tidak dipasang bersama migration ini.

| Kebutuhan | Keputusan migration aktif |
| --- | --- |
| Sepuluh tabel PRD | `profiles`, `subjects`, `lessons`, `questions`, `quiz_attempts`, `xp_events`, `classes`, `class_members`, `assignments`, `submissions` |
| Profil dan konten | `display_name`, `total_xp`, `subject_id`, `content`, slug/fase/kesulitan mengikuti kontrak PRD; level dihitung database |
| Kunci dan pembahasan | Hanya di `private.question_keys`; tidak ada pada tabel `public.questions` |
| Sesi kuis | Soal, opsi, kunci, dan pembahasan disalin ke `private.quiz_session_questions` saat sesi dimulai |
| Penilaian | Wajib memakai ID sesi yang dimiliki siswa, seluruh soal dijawab satu kali, opsi bilangan bulat 0–3 |
| XP | Ledger unik `student_id + event_key`, pembaruan profil dalam transaksi; mutasi langsung klien ditolak |
| Role | Registrasi selalu student, metadata role/XP diabaikan; update profil dibatasi nama, kelas, avatar |
| Kelas/tugas | Struktur dan kebijakan baca tersedia; RPC mutasi dan integrasi nyata ditunda sampai Tahap 7 |

Kontrak RPC untuk integrasi frontend pada Tahap 4–6:

```js
// Nama variabel berikut adalah contoh kontrak, belum dipanggil oleh aplikasi demo.
const { data: session } = await supabase.rpc('get_lesson_quiz', {
  p_lesson_id: lessonUuid,
  p_limit: 10, // bilangan bulat 5–10
})
// session = { attempt_id, lesson_id, questions: [{ id, lesson_id, prompt, options }] }

const { data: result } = await supabase.rpc('submit_quiz_answers', {
  p_attempt_id: session.attempt_id,
  p_answers: [{ question_id: questionUuid, selected_option: 1 }],
  // Kirim tepat satu jawaban untuk SETIAP soal yang dikembalikan sesi.
})
// result: score, correct_count, total_questions, details, xp_earned,
//         xp_granted_now, replayed, attempt_id, lesson_id

await supabase.rpc('complete_lesson_reading', { p_lesson_id: lessonUuid })
await supabase.rpc('get_quiz_result', { p_attempt_id: session.attempt_id })
```

`p_attempt_id` menggantikan `p_lesson_id` pada RPC submit contoh awal PRD. Dengan sesi, klien tidak bisa memilih soal sendiri atau mengirim satu soal mudah berulang kali. Membuka ulang latihan yang masih aktif mengembalikan sesi yang sama. Sesi berlaku 24 jam; pembukaan sesi baru dibatasi 20 per jam per siswa. Belum ada timer hitung mundur pada UI.

Pengumpulan ulang dengan jawaban sama mengembalikan hasil terdahulu, `replayed: true`, dan `xp_granted_now: 0`. `xp_earned` tetap menunjukkan hadiah historis percobaan itu. Jawaban berbeda setelah selesai ditolak. Frontend nanti memuat ulang `profiles.total_xp`, bukan menambah saldo hanya berdasarkan respons yang mungkin diputar ulang.

Kunci dan `details` hanya dikembalikan setelah submit valid atau melalui `get_quiz_result` untuk sesi selesai milik siswa sendiri. Schema `private` harus tetap di luar Exposed schemas Data API. Izin fungsi dibatasi dan fungsi berhak khusus memakai `search_path` kosong, mengikuti [panduan fungsi Supabase](https://supabase.com/docs/guides/database/functions). RLS dan grant diperiksa bersama sesuai [panduan RLS Supabase](https://supabase.com/docs/guides/database/postgres/row-level-security).

ID pada dummy berupa teks seperti `matematika-3`; ID seed database berupa UUID deterministik. `lessons.slug` tetap konsisten untuk routing. Penyelarasan ID, penggantian `DemoContext`, dan pengambilan data nyata menjadi pekerjaan integrasi berikutnya.

## Tahap pengerjaan

Kerjakan berurutan; lanjut setelah checklist tahap sebelumnya diuji. Estimasi mengikuti rencana awal.

### Tahap 1 — Fondasi React (2 jam)

Fondasi tersedia. Jalankan petunjuk instalasi di atas. Untuk pembuatan ulang di folder baru:

```sh
npm create vite@latest petualangan-ilmu -- --template react
cd petualangan-ilmu
npm install
npm install @supabase/supabase-js react-router-dom lucide-react clsx tailwind-merge
npm install -D tailwindcss @tailwindcss/vite
```

Pasang plugin Vite/Tailwind dan struktur `src/` seperti bagian teknologi.

- [x] Server lokal memberikan HTTP 200; diuji menggunakan port sementara yang kosong.
- [x] JSX, Tailwind, dan CSS aplikasi berhasil dikompilasi.
- [x] Semua direktori `src/` tersedia dan siap dilacak Git.
- [ ] Pemeriksaan visual pada browser/perangkat nyata.

### Tahap 2 — UI dan dummy (6–8 jam)

Buat `src/lib/dummyData.js` sesuai kontrak. Hubungkan landing, auth, peta, pembaca, kuis, dashboard tutor/admin menggunakan React Router.

| Rute | Halaman |
| --- | --- |
| `/` | Landing dan contoh katalog |
| `/login`, `/register` | Auth |
| `/student` | Peta, progres, kelas/tugas |
| `/student/lesson/:slug` | Materi |
| `/student/quiz/:lessonId` | Kuis dan hasil |
| `/tutor` | Kelas dan penilaian |
| `/admin` | Konten dan impor |

Uji lebar 375–412 px, teks cukup besar, pilihan kontras, gambar/tips/embed, dan alur semua soal sampai ringkasan.

- [x] Semua rute utama dirender dan navigasi belajar diuji dengan DOM.
- [x] Renderer teks, tips, gambar, dan video opsional diuji dengan fixture DOM.
- [x] Kuis selesai dan menampilkan skor serta pembahasan sesudah submit.
- [x] `npm run build` berhasil.
- [x] 19 tes otomatis lulus, termasuk tugas tutor dan validasi impor demo.
- [ ] QA visual lebar 375–412 px dan desktop, termasuk gulir horizontal.
- [ ] Pemutaran video nyata setelah tautan materi yang sesuai tersedia.

### Tahap 3: Database dan RPC

Estimasi rencana awal: 3–4 jam.

**Hasil fase ini:** migration, seed draft, RPC kuis/XP, RLS, dan query verifikasi tersedia. Pengujian PostgreSQL lokal lulus. Pemasangan cloud masih menunggu proyek Supabase Anda; tampilan aplikasi tetap demo sampai integrasi Tahap 4–6.

#### Berkas yang dipakai

| Berkas | Tujuan |
| --- | --- |
| [Migration aktif](supabase/migrations/202610160001_initial_schema.sql) | Membuat 10 tabel publik, 2 tabel privat, indeks, trigger, kebijakan akses, dan RPC |
| [Seed draft](supabase/seed.sql) | Menambah 6 mata pelajaran, 36 materi, 185 soal tanpa memublikasikannya |
| [Verifikasi pemasangan](supabase/verify-setup.sql) | Pemeriksaan baca-saja terhadap tabel, RLS, izin kunci/XP, dan fungsi |
| [Penghasil seed](scripts/generate-database-seed.mjs) | Menghasilkan ulang seed dari materi demo dan 5 soal tambahan matematika kelas 3 |
| [Tes database](tests/database.test.mjs) | Menjalankan SQL dan perilaku akses pada PGlite/PostgreSQL dalam memori |

#### Langkah pemasangan satu per satu

1. **Buat proyek uji baru.** Buka [dashboard Supabase](https://supabase.com/dashboard), buat proyek `petualangan-ilmu`, dan simpan password database secara pribadi. Jika database Anda sudah memakai skema lama, hentikan di sini: perlu migration konversi tersendiri, bukan memasang ulang migration awal.
2. **Pasang struktur.** Buka SQL Editor → New query. Salin **seluruh isi** `supabase/migrations/202610160001_initial_schema.sql`, kemudian Run. Hasil yang diharapkan: query selesai tanpa error. Migration memakai transaksi; jika gagal, jangan lanjut ke seed. Salin pesan error untuk diperiksa. Menjalankannya untuk kedua kali sengaja ditolak agar data lama tidak tertimpa.
3. **Isi data contoh.** Buat query baru, tempel seluruh `supabase/seed.sql`, lalu Run. Hasil yang diharapkan: 6 subjects, 36 lessons, 185 questions. Materi/soal berstatus `draft`, dan hanya untuk persiapan/review. Menjalankan seed ulang tidak menggandakan ID atau menimpa perubahan editorial.
4. **Periksa pemasangan.** Buat query baru dari `supabase/verify-setup.sql`, kemudian Run. Hasil yang diharapkan: pesan **Struktur dan izin dasar Tahap 3 lulus**, hitungan 6/36/185, dan 36 materi draft. Tabel kedua menunjukkan fungsi dan pengaturan `search_path`. Pemeriksaan ini tidak mengubah data.
5. **Periksa schema privat.** Pastikan `private` tidak ditambahkan ke Exposed schemas Data API. Kunci berada di `private.question_keys`, snapshot sesi di `private.quiz_session_questions`. Tamu maupun siswa tidak boleh memiliki izin SELECT pada keduanya.
6. **Isi konfigurasi publik lokal.** Dari Connect/pengaturan API, ambil Project URL dan publishable key. Jika `.env.local` belum ada, salin `.env.example` menjadi `.env.local`, lalu isi kedua variabel. Jangan masukkan password database atau service-role/secret key. Berkas lokal tersebut sudah diabaikan Git.
7. **Catat hasil.** Pastikan langkah 2–6 benar-benar selesai sebelum menandai pemasangan cloud lulus. UI saat ini tidak otomatis beralih ke Supabase; pengaitan klien/Auth dikerjakan pada Tahap 4.

Semua seed disimpan sebagai draft karena belum melewati review pedagogis. Kuis cloud untuk materi draft akan ditolak, sesuai desain. Saat menguji lewat akun sungguhan nanti, pilih materi/soal yang sudah ditinjau lalu publikasikan secara terkontrol; jangan memublikasikan seluruh bank contoh sebagai konten pembelajaran resmi.

#### Bukti pengujian lokal dan batasnya

Jalankan `npm run test:db`. Pengujian memakai [PGlite](https://pglite.dev/docs/about), yaitu PostgreSQL dalam proses Node. Schema Auth/identitas pengguna disimulasikan **hanya dalam fixture tes**; migration tidak membuat ulang Auth pada Supabase.

Yang sudah diuji: pemasangan seluruh SQL, seed idempoten/draft, RLS, trigger student, larangan update role/XP, privasi kunci/hasil, validasi jawaban, penilaian server, XP pertama/remedial, replay, snapshot, kedaluwarsa sesi, pembatasan sesi, dan penolakan pemasangan ulang.

Yang belum diuji: Supabase cloud, JWT/Auth sungguhan, PostgREST/Data API, koneksi banyak pengguna secara bersamaan, Storage, dan integrasi UI. Penguncian baris/transaksi tersedia pada SQL, tetapi uji konkurensi lintas koneksi tetap diperlukan sebelum rilis. Indeks sudah disiapkan; klaim latensi 1 milidetik pada sumber belum dibuktikan.

- [x] Sepuluh tabel target dan dua tabel privat berhasil dibuat pada PostgreSQL lokal.
- [x] Trigger profil dan RPC kuis/XP lulus pengujian lokal.
- [x] RLS, izin kolom profil, privasi kunci, serta replay diuji.
- [x] Seed draft dan query verifikasi pemasangan tersedia dan diuji.
- [x] Kontrak ID sesi, UUID, bentuk jawaban, dan respons terdokumentasi.
- [x] Aturan `.gitignore` mengecualikan `.env.local`.
- [ ] Proyek Supabase baru dibuat oleh pemilik.
- [ ] Migration, seed, dan verifikasi berhasil dijalankan pada proyek tersebut.
- [ ] `.env.local` diisi URL/publishable key yang benar.
- [ ] Integrasi Auth/UI dan pengujian akun nyata, dilanjutkan pada Tahap 4–6.

### Tahap 4 — Auth, RLS, dan peran (4–5 jam)

**Prasyarat:** pemasangan Supabase pada Tahap 3 selesai. **Hasil yang dituju:** sesi akun nyata menggantikan pemilihan peran demo.

Siapkan Email/Password Supabase. Konfirmasi email boleh dimatikan sementara pada proyek pengembangan terpisah bila diperlukan untuk uji; aktifkan sebelum rilis. Buat `supabaseClient.js`, `AuthContext.jsx`, `ProtectedRoute`.

RLS mengizinkan katalog aktif/materi published sesuai kebijakan publik, profil sendiri, dan akses tutor berwenang. Update profil dibatasi pada nama, kelas, avatar melalui izin kolom/RPC; role/XP/level tidak boleh diubah klien. Tinjau policy yang membaca tabelnya sendiri agar tidak rekursif.

Daftarkan dua akun uji (contoh sumber `siswa1@test.com`, `tutor1@test.com`). Pemilik database mengangkat tutor uji secara manual.

Urutan implementasi:

1. Buat klien Supabase dari environment dan tampilkan pesan konfigurasi yang jelas jika nilai belum diisi.
2. Buat `AuthContext` untuk membaca sesi, berlangganan perubahan Auth, memuat profil, serta menangani loading/error/logout.
3. Hubungkan formulir ke registrasi/login nyata. Role berasal dari profil database, tanpa tombol pemilihan peran pada alur akun nyata.
4. Hubungkan proteksi rute ke sesi dan role server. Uji login, refresh, logout, URL terlarang, serta permintaan API langsung memakai akun yang berbeda.

- [x] Trigger profil student, XP 0, level 1 sudah diuji pada PostgreSQL lokal.
- [x] Izin kolom menolak update role/XP langsung pada pengujian lokal.
- [ ] Registrasi membuat student, XP 0, level 1.
- [ ] Siswa masuk `/student`, ditolak dari `/tutor` dan `/admin`.
- [ ] Tutor masuk `/tutor` dan hanya mengakses kelasnya.
- [ ] Permintaan database langsung juga mematuhi izin.

### Tahap 5 — Materi dan kuis server (6–8 jam)

**Prasyarat:** Auth nyata pada Tahap 4 selesai. **Hasil yang dituju:** seluruh alur belajar menggunakan data cloud dan ID sesi server.

Isi enam mata pelajaran: matematika, bahasa-indonesia, ipas, pancasila, bahasa-inggris, seni-budaya; minimal satu materi dengan sepuluh soal terverifikasi. Materi contoh bukan klaim pemetaan kurikulum resmi; IPAS kelas 1–2 memerlukan review pedagogis.

Ganti dummy melalui `services/`. Jangan mengambil `questions.select('*')` dari klien siswa. Gunakan kontrak aktif `get_lesson_quiz({ p_lesson_id, p_limit })`, lalu `submit_quiz_answers({ p_attempt_id, p_answers })`. Simpan ID sesi dari server dan gunakan `get_quiz_result` untuk pembahasan percobaan selesai milik siswa.

Urutan implementasi:

1. Tinjau materi/soal uji, lalu publikasikan konten yang dipilih secara terkontrol pada proyek uji.
2. Buat layanan katalog dan materi dengan filter kelas/status, penanganan data kosong, loading, serta kegagalan koneksi.
3. Sambungkan halaman kuis ke pembuatan/pelanjutan sesi dan submit RPC. Tangani jawaban tidak lengkap, sesi kedaluwarsa, serta percobaan selesai.
4. Sambungkan riwayat ke `get_quiz_result`. Periksa Network dan bundle produksi untuk memastikan dummy/kunci tidak ikut pada alur produksi.

- [x] Seed draft enam mata pelajaran, 36 materi, dan 185 soal tersedia.
- [x] RPC lokal menolak soal asing, jawaban duplikat, opsi salah format, dan akses hasil siswa lain.
- [ ] Katalog/bab berasal dari database sesuai kelas/status.
- [ ] Network dan bundle produksi tidak membocorkan kunci sebelum submit.
- [ ] Pemeriksaan sesi/pemilik/jawaban lulus kembali melalui Supabase cloud dan UI terintegrasi.
- [ ] Hasil menampilkan skor 0–100, jumlah benar, XP, pembahasan.

### Tahap 6 — XP dan anti-exploit (4–5 jam)

**Prasyarat:** alur materi/kuis cloud pada Tahap 5 selesai. **Hasil yang dituju:** saldo dan level di UI selalu mengikuti hasil server.

Hubungkan XPBar/LevelBadge ke profil server. Tombol “Selesai Membaca & Lanjut Kuis” memanggil completion lalu memperbarui profil. Ledger unik membuat klaim ganda menghasilkan 0.

Urutan implementasi:

1. Ambil `total_xp`/`level` dari profil setelah login, completion materi, dan pengumpulan kuis.
2. Tampilkan hadiah dari server dan muat ulang saldo. Pada replay, `xp_granted_now` bernilai 0; jangan menambahkan kembali `xp_earned` historis.
3. Uji bacaan berulang, remedial lintas tanggal Asia/Jakarta, refresh, koneksi terputus, dan pengiriman ulang.
4. Jalankan pengujian bersamaan dari dua koneksi/tab pada database cloud untuk memeriksa transaksi dan ledger.

- [x] Hadiah membaca sekali, hadiah kuis pertama, remedial harian, serta level diuji pada database lokal.
- [x] Pengumpulan ulang identik tidak menggandakan XP pada pengujian lokal.
- [ ] Bacaan pertama +5 XP; bacaan sama tidak menambah lagi.
- [ ] Hadiah kuis utama 10 × benar + 5 hanya sekali per bab.
- [ ] Remedial yang memenuhi syarat +3 maksimal sekali sehari.
- [ ] Level naik per 100 XP.
- [ ] Replay, klik ganda, dan submit bersamaan tidak menggandakan XP.

### Tahap 7 — Kelas dan tugas (6–8 jam)

**Prasyarat:** Auth, materi, dan XP cloud pada Tahap 4–6 selesai. **Hasil yang dituju:** tutor dan siswa berinteraksi lintas akun/perangkat dengan akses terbatas.

Aktifkan RLS kelas, anggota, tugas, kiriman. Tutor membuat kelas/kode, melihat anggota, memilih bab, menulis instruksi/tenggat, menilai 0–100, dan memberi komentar. Siswa bergabung, mengirim teks/link, membaca umpan balik.

Target kode enam karakter alfanumerik; contoh `BIM-3A` pada sumber mengandung tanda hubung. Tetapkan satu format kanonis, tangani tabrakan kode, dan batasi upaya menebak kode di server.

Urutan implementasi:

1. Buat RPC/layanan pembuatan kelas dan kode unik, gabung kelas, serta pembacaan anggota/progres oleh tutor pemilik.
2. Buat mutasi tugas dan kiriman dengan pemeriksaan keanggotaan, tingkat kelas, tenggat, dan batas panjang jawaban.
3. Buat penilaian tutor dan hadiah tugas +15 XP satu kali dalam transaksi; perubahan nilai tidak mengulang hadiah.
4. Ganti simulasi di dashboard dengan layanan tersebut. Uji dua siswa dan dua tutor agar kelas/kiriman tidak terbaca oleh akun yang tidak berwenang.

- [x] Tabel kelas, anggota, tugas, dan kiriman tersedia dengan RLS pada migration yang diuji lokal.
- [x] Alur gabung → kirim tugas → nilai/komentar serta hadiah sekali sudah diuji sebagai simulasi satu browser.
- [ ] Tutor membuat kelas dengan kode unik.
- [ ] Siswa bergabung menggunakan kode.
- [ ] Tugas → kiriman → penilaian → umpan balik berjalan lintas akun.
- [ ] Tugas dinilai memberi +15 sekali; perubahan nilai tidak mengulang XP.
- [ ] Data kelas/nilai terisolasi antar siswa dan tutor.

### Tahap 8 — Impor, audit, rilis (4–5 jam)

**Prasyarat:** fitur cloud Tahap 3–7 dan QA visual selesai. **Hasil yang dituju:** konten terverifikasi dapat dikelola admin dan aplikasi siap dipakai pada domain publik.

Bangun impor CSV/JSON di `/admin`: validasi materi, pertanyaan, empat opsi, kunci, pembahasan; tampilkan ringkasan dan kesalahan sebelum simpan. Gunakan endpoint/RPC khusus admin dengan batas batch/transaksi. Tutor membuat draf, admin memublikasikan. Migration aktif belum memiliki API impor atau alur publikasi admin.

Audit logging, izin, replay/konkurensi, dan privasi. Buat bucket privat `student-submissions` dengan policy keanggotaan dan signed URL berumur pendek. Validasi URL media dan blok JSONB. Lengkapi rate limit, audit log, backup, pemulihan akun, penghapusan data. Uji Android/koneksi lambat dan review materi oleh guru.

Saat source benar-benar siap diunggah, hubungkan repo GitHub. Proyek sudah memiliki `.git`; tidak perlu `git init` ulang. Contoh sumber (jalankan hanya setelah meninjau berkas/remote):

```sh
git status
git add .
git commit -m "MVP Petualangan Ilmu siap rilis"
git branch -M main
git remote add origin https://github.com/USERNAME_KAMU/petualangan-ilmu.git
git push -u origin main
```

Di Vercel: Add New Project → pilih repo → preset Vite → build `npm run build` → output `dist` → isi variabel Supabase. Pastikan `.env.local` tidak masuk GitHub. `vercel.json` menyediakan fallback SPA:

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

Konfigurasi bukan tanda sudah deploy. Konfigurasi `.openai/hosting.json` lama dipertahankan.

Urutan penutupan rilis:

1. Sambungkan validasi impor lokal ke endpoint admin yang memeriksa role, menyimpan soal/kunci secara transaksional, dan menolak batch salah.
2. Lengkapi editor draft/published dan prosedur review guru; siapkan unggahan privat, kebijakan file, serta audit perubahan.
3. Uji akun dan data lintas pengguna, pembatasan percobaan, konkurensi, pemulihan/penghapusan data, dan penggunaan di HP/koneksi lambat.
4. Jalankan tes, build, dan pemeriksaan format untuk versi yang akan dirilis; periksa source agar konfigurasi rahasia dan kunci dummy tidak ikut.
5. Deploy versi terverifikasi ke Vercel, uji login dan seluruh rute dari domain tersebut, lalu catat URL serta hasil pemeriksaan rilis.

- [x] Validasi JSON/CSV, kesalahan batch, dan penyimpanan impor demo lokal diuji.
- [x] `vercel.json` menyediakan fallback rute SPA.
- [x] Build produksi dan format source versi lokal saat ini lulus.
- [ ] Impor valid tersimpan di server; input salah ditolak tanpa menyimpan sebagian batch.
- [ ] Tes, build, dan format diulang serta lulus untuk versi rilis terintegrasi.
- [ ] RLS dan privasi tabel kunci lulus melalui Data API Supabase pada lingkungan rilis.
- [ ] Uji peran, konkurensi, replay, dan berkas lintas akun lulus.
- [ ] Domain publik bekerja di HP; refresh rute bertingkat tidak 404.
- [ ] Konten dan prosedur data anak siap dipakai nyata.

## Jadwal

| Hari | Fokus |
| --- | --- |
| 1–2 | Tahap 1–2: fondasi dan UI dummy |
| 3–4 | Tahap 3–4: database, RPC, auth, RLS |
| 5–7 | Tahap 5–6: materi/kuis server, XP/level |
| 8–10 | Tahap 7–8: kelas, tugas, admin, audit, deploy |

Fokus pada checklist terdekat. Referensi “Prompt Tahap 1–6” dan “SQL rancangan awal” pada sumber tidak melampirkan seluruh prompt/skema. Panduan ini menjelaskan hasil yang harus dibuat tanpa mengasumsikan berkas yang belum tersedia.

## Verifikasi

Hasil pengerjaan Tahap 1–2 dan persiapan lokal Tahap 3 pada 16 Oktober 2026:

| Pemeriksaan | Hasil |
| --- | --- |
| Build produksi | Berhasil dengan Node 24.19.0 dan Vite 8.3.4; JS sekitar 362 KB / 114 KB gzip |
| Tes aturan dan alur UI | 19/19 lulus, tanpa error console tersembunyi pada pengujian |
| Seluruh tes setelah Tahap 3 | 32/32 lulus dalam satu pengujian lengkap |
| Format source | Semua source yang diperiksa lulus Prettier |
| Keutuhan naskah | Isi sumber terbaru ditemukan utuh di lampiran README |
| Tautan dokumen lokal | Semua tautan `docs/` dan `supabase/` tersedia |
| Struktur fitur | Seluruh 11 direktori fitur memiliki `.gitkeep` |
| Konfigurasi | `package.json` dan `vercel.json` valid |
| Sintaks skrip yang dipindahkan | `node --check scripts/verify-stage1.mjs` berhasil |
| Pemeriksaan server Tahap 1 | Lulus HTTP 200 di 127.0.0.1 dengan port sementara; server ditutup setelah tes |
| Browser nyata | Belum tersedia sesi browser; QA visual mobile/desktop belum dinyatakan lulus |
| Database lokal | Migration dan 12 skenario SQL lulus; Node melaporkan 13 tes termasuk induknya |
| Database cloud | Proyek Supabase belum tersedia; Auth/Data API dan integrasi UI belum diuji |

Build dan tes dijalankan melalui runtime Node lokal karena `node`/`npm` belum tersedia pada PATH terminal agen. Launcher Windows dapat memakai runtime tersebut. Untuk pemeriksaan tanpa mengganggu proses lain, gunakan `npm run verify:stage1 -- --port=0`.

Checkpoint lama di `docs/archive/TAHAP-1.md` adalah catatan historis dan memuat jalur sebelum penataan. Implementasi lokal Tahap 2 tersedia; verifikasi visual dan integrasi database tetap belum selesai.

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
