# Petualangan Ilmu

Aplikasi belajar interaktif untuk siswa SD kelas 1–6. Anak dapat membaca materi, mengerjakan kuis, mengumpulkan XP, dan mengikuti kelas bersama tutor.

**Mulai cepat:** jalankan demo tanpa database. Untuk akun dan progres antarpengguna, aktifkan mode Supabase.

## Daftar isi

- [Fitur](#fitur)
- [Jalankan di komputer](#jalankan-di-komputer)
- [Mode demo dan Supabase](#mode-demo-dan-supabase)
- [Pasang database ringan](#pasang-database-ringan)
- [Perintah pengembangan](#perintah-pengembangan)
- [Build dan deployment](#build-dan-deployment)
- [Struktur proyek](#struktur-proyek)
- [Status dan dokumentasi](#status-dan-dokumentasi)
- [Mengatasi masalah umum](#mengatasi-masalah-umum)

## Fitur

| Pengguna | Fitur utama                                                               |
| -------- | ------------------------------------------------------------------------- |
| Siswa    | Pilih kelas, baca materi, kerjakan kuis, lihat pembahasan, XP dan progres |
| Tutor    | Buat kelas, bagikan kode bergabung, beri tugas, nilai dan komentar        |
| Admin    | Kelola materi dan soal, impor JSON/CSV, tinjau publikasi dan akses tutor  |

Materi mendukung teks, dialog komik, caption ilustrasi, mini-check, dan video opsional. Pada mode Supabase, penilaian kuis dan pemberian XP dilakukan oleh server.

Teknologi: **React, Vite, Tailwind CSS, React Router, dan Supabase**. Pengujian memakai Node.js Test Runner, Happy DOM, dan PGlite.

## Jalankan di komputer

Siapkan **Git** dan **Node.js 22.12 atau lebih baru**, beserta npm. Instalasi proyek telah diuji memakai Node.js 24.19.0.

```sh
git clone https://github.com/Albaihaqi24/Petualangan-Ilmu.git
cd Petualangan-Ilmu
npm ci
npm run dev
```

Buka **http://127.0.0.1:5173** dan biarkan terminal tetap berjalan. Tanpa konfigurasi tambahan, aplikasi memakai mode demo.

Di Windows, setelah dependensi terpasang, kamu juga dapat menjalankan `JALANKAN-LOKAL.cmd` dari folder proyek.

## Mode demo dan Supabase

| Mode     | Perlu database? | Penyimpanan progres               |
| -------- | --------------- | --------------------------------- |
| Demo     | Tidak           | Browser dan alamat/port yang sama |
| Supabase | Ya              | Akun dan database proyek Supabase |

**Mencoba demo:** masuk sebagai siswa, pilih kelas, buka materi, lalu kerjakan kuis. Mode tutor dan admin tersedia untuk mencoba alur kelas serta pengelolaan konten. Gunakan data rekaan pada demo.

Mode demo memuat paket materi yang lebih besar untuk eksplorasi. Paket demo tidak otomatis dimasukkan ke database Supabase, dan bank soal demo tidak disertakan pada build produksi Supabase.

### Mengaktifkan Supabase

1. Pasang skema dan seed melalui [panduan database ringan](#pasang-database-ringan).
2. Salin `.env.example` menjadi `.env.local` di folder proyek.
3. Isi konfigurasi berikut dengan nilai proyekmu, lalu mulai ulang server:

```dotenv
VITE_APP_MODE=supabase
VITE_SUPABASE_URL=https://PROJECT_ID.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
```

Variabel `VITE_*` dapat dibaca browser. Gunakan **publishable key** atau legacy anon key; simpan kredensial server di lingkungan server. `.env.local` sudah diabaikan Git.

Atur Email/Password Auth serta Site URL dan Redirect URLs untuk `/auth/callback` dan `/reset-password`. Akun baru memperoleh peran siswa; pengangkatan admin pertama dilakukan pemilik database. Rincian ada di [panduan operasional](docs/OPERASIONAL.md).

## Pasang database ringan

Paket utama: **[supabase/seed_materi_lengkap.sql](supabase/seed_materi_lengkap.sql)**.

| Isi                  |                               Jumlah |
| -------------------- | -----------------------------------: |
| Mata pelajaran       | 3: Matematika, Bahasa Indonesia, IPA |
| Kelas                |                                  1–6 |
| Materi               |      36: dua bab per kelas/pelajaran |
| Soal                 |            216: enam soal per materi |
| Kesulitan per materi |             2 easy, 2 medium, 2 hard |

### Urutan pemasangan pada proyek Supabase baru

Jalankan melalui SQL Editor sebagai pemilik database:

1. [Migration 001 — skema awal](supabase/migrations/202610160001_initial_schema.sql).
2. [Migration 002 — fitur platform](supabase/migrations/202610160002_platform_features.sql).
3. [Migration 003 — penyimpanan privat](supabase/migrations/202610160003_private_storage.sql).
4. [Migration 004 — editor soal](supabase/migrations/202610160004_editor_questions.sql).
5. [Seed materi lengkap](supabase/seed_materi_lengkap.sql).
6. [Verifikasi skema](supabase/verify-setup.sql) dan [fitur platform](supabase/verify-platform.sql).

Jika migration sudah terpasang, lanjutkan dengan seed; migration awal ditujukan untuk database baru. Untuk pemasangan ringan, paket ini sudah cukup. `seed.sql`, `paket-72-bab.sql`, `curriculum-draft.sql`, dan seed buku adalah pilihan paket lain yang tidak perlu dijalankan bersamaan.

### Cara menghemat penyimpanan

- Teks materi disimpan sekali dalam `content.scenes`; aplikasi membentuk tampilan bacanya saat diperlukan.
- Kolom `blocks` tetap berupa array kosong untuk kompatibilitas skema.
- Database menyimpan URL media, tanpa menyertakan binary atau base64 gambar/video.
- ID materi dan soal tetap konsisten; seed dapat dijalankan ulang tanpa membuat duplikat.
- Record yang isinya identik dilewati agar tidak ditulis ulang.

File SQL berukuran sekitar **285 KB**, turun dari 580 KB. Ukuran JSON materi turun sekitar **55%**; angka ini bukan ukuran keseluruhan database beserta indeks dan riwayat pengguna.

Seed menerbitkan materi dan soal sebagai `published`. Metadata tetap mencatat bahwa review guru diperlukan. Bank soal bertingkat tersedia; pemilihan adaptif berdasarkan performa siswa belum diimplementasikan.

Baca [panduan seed lengkap](supabase/README-seed-materi-lengkap.md) untuk cakupan, kompatibilitas dan hasil pengukuran.

## Perintah pengembangan

Jalankan dari folder yang memiliki `package.json`.

| Perintah                    | Kegunaan                                                 |
| --------------------------- | -------------------------------------------------------- |
| `npm run dev`               | Server pengembangan di port 5173                         |
| `npm test`                  | Seluruh tes otomatis                                     |
| `npm run test:db`           | Tes skema dan perilaku database lokal                    |
| `npm run db:seed:complete`  | Regenerasi SQL seed ringan                               |
| `npm run content:adventure` | Ekspor paket tambahan 72 bab                             |
| `npm run build`             | Build sesuai mode; default demo                          |
| `npm run preview`           | Preview hasil build di port 4173                         |
| `npm run build:production`  | Build mode Supabase dengan konfigurasi publik yang valid |
| `npm run verify:production` | Audit pemisahan data demo dari hasil build Supabase      |

## Build dan deployment

Untuk mencoba hasil build demo:

```sh
npm run build
npm run preview
```

Untuk deployment Supabase, isi konfigurasi publik yang valid pada lingkungan build, lalu jalankan:

```sh
npm run build:production
```

Hasil build berada di `dist/`. Konfigurasi `vercel.json` sudah menyediakan fallback rute aplikasi. Jika memakai Vercel, gunakan build command `npm run build:production`, output directory `dist`, dan variabel lingkungan Supabase milik proyekmu. Sesuaikan URL Auth dengan domain deployment.

## Struktur proyek

```text
Petualangan-Ilmu/
├── src/
│   ├── components/     Komponen materi, kelas, kuis, dan studio
│   ├── pages/          Halaman siswa, tutor, admin, dan autentikasi
│   ├── context/        State demo dan integrasi Supabase
│   ├── services/       Akses layanan dan impor soal
│   ├── lib/            Katalog, validasi dan utilitas
│   └── content/        Naskah paket materi demo
├── supabase/           Migration, seed dan verifikasi SQL
├── scripts/            Generator konten, build dan pemeriksaan
├── tests/              Tes aplikasi, database dan batas input
├── public/             Aset statis
├── content/            Manifest dan referensi pembelajaran
└── docs/               Panduan materi, operasional dan QA
```

## Status dan dokumentasi

Hasil pemeriksaan lokal **18 Oktober 2026: 105 tes lulus**, termasuk kompatibilitas seed, rerun tanpa duplikat atau perubahan row identik, pembaca/editor scenes, penilaian kuis, akses kunci dan audit bundle produksi.

Pemasangan dan pengujian Supabase cloud serta QA visual perangkat nyata belum dinyatakan selesai. Isi materi masih memerlukan review guru; paket ini tidak diklaim mencakup seluruh kurikulum nasional. Sains kelas 1–2 diperlakukan sebagai pengayaan.

| Panduan                                                                              | Isi                                                       |
| ------------------------------------------------------------------------------------ | --------------------------------------------------------- |
| [Database ringan](supabase/README-seed-materi-lengkap.md)                            | Instalasi, penghematan dan kompatibilitas seed            |
| [QA black-box dan white-box](docs/qa/README.md)                                      | Skenario, pengujian, bug dan laporan                      |
| [Hasil regresi terbaru](docs/qa/evidence/2026-10-18-seed-lightweight-regression.txt) | Bukti 105 tes lulus                                       |
| [Operasional](docs/OPERASIONAL.md)                                                   | Auth, admin pertama, pengujian cloud dan pengelolaan data |
| [Paket tambahan 72 bab](docs/materi/paket-72-bab/README.md)                          | Materi dan kuis tambahan untuk review                     |
| [Roadmap pendidikan](docs/ROADMAP-PENDIDIKAN.md)                                     | Rencana pengembangan bahan ajar                           |
| [Arsip panduan teknis](PANDUAN-TEKNIS-ARSIP.md)                                      | PRD dan catatan implementasi terdahulu                    |

Arsip mencatat kondisi versi sebelumnya. Untuk instalasi saat ini, ikuti README ini dan panduan database ringan.

## Mengatasi masalah umum

**`ERR_CONNECTION_REFUSED` saat membuka localhost**

Pastikan `npm run dev` masih berjalan dan buka alamat beserta port yang ditampilkan terminal. Server default memakai **5173**.

**Port 5173 sedang dipakai**

Jalankan dengan port lain, lalu buka alamat port tersebut:

```sh
npm run dev -- --port 5174
```

**Perintah `npm` tidak ditemukan**

Pasang Node.js beserta npm, buka ulang terminal, lalu periksa `node --version` dan `npm --version`.

**Materi tidak muncul pada mode Supabase**

Periksa konfigurasi `.env.local`, status pemasangan migration/seed, serta status `published` materi. Mode Supabase memakai katalog database sendiri.

**Progres demo berbeda saat mengganti port**

Penyimpanan demo mengikuti origin browser. `127.0.0.1:5173` dan `127.0.0.1:5174` memakai penyimpanan terpisah.
