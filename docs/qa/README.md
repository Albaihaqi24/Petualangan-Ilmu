# Paket QA Petualangan Ilmu

Tanggal penyusunan: **18 Oktober 2026, Asia/Jakarta**. Versi aplikasi pada `package.json`: **0.2.0**. Dokumen disusun dari kode kerja saat ini, bukan dari asumsi bahwa seluruh fitur sudah aktif di cloud.

Laporan terbaru: [upgrade clay UI — 112 tes lulus dan QA browser](LAPORAN-CLAY-UI-2026-10-18.md). [Laporan paket 72 bab — 92 tes](LAPORAN-PAKET-72-BAB-2026-10-18.md) dan laporan awal 83 tes dipertahankan sebagai baseline historis.

## 1. Isi paket

| Dokumen                                                      | Kegunaan                                                                           |
| ------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| [BLACKBOX.md](BLACKBOX.md)                                   | Kasus uji dari sisi pengguna, langkah, data, dan hasil yang diharapkan             |
| [WHITEBOX.md](WHITEBOX.md)                                   | Pengujian fungsi, percabangan, database, race condition, dan pemetaan tes otomatis |
| [LAPORAN-2026-10-18.md](LAPORAN-2026-10-18.md)               | Hasil eksekusi aktual, coverage, bukti, dan batas kesimpulan                       |
| [TEMPLATE-EKSEKUSI-DAN-BUG.md](TEMPLATE-EKSEKUSI-DAN-BUG.md) | Lembar eksekusi, laporan bug, retest, dan keputusan rilis                          |
| [Tes batas tambahan](../../tests/qa-boundaries.test.mjs)     | Dua belas kelompok tes otomatis untuk batas input dan logika bisnis                |
| [evidence/](evidence/)                                       | Log tes, build, dan hasil smoke HTTP                                               |

## 2. Tujuan dan ruang lingkup

Memastikan siswa dapat belajar dan memperoleh hasil yang benar; tutor hanya mengelola kelasnya; admin mengendalikan konten; data akun terisolasi; serta kegagalan jaringan/input menghasilkan pemulihan yang jelas. QA mencakup tamu, siswa, tutor, admin; desktop/mobile; mode demo dan Supabase; materi, kuis, XP, profil, kelas, tugas, penilaian, impor, studio, file privat, dan permintaan penghapusan.

Black-box memeriksa perilaku yang terlihat tanpa membaca implementasi saat mengeksekusi kasus. White-box memakai struktur fungsi, kondisi, state, RPC, dan policy SQL. Tes DOM yang menginjeksi provider adalah integrasi lokal; keberhasilannya tidak menggantikan browser/perangkat nyata.

Kebenaran pedagogis, kelengkapan CP/ATP, email nyata, performa cloud, dan backup/restore memerlukan lingkungan atau peninjau tersendiri. Kasusnya tetap dicantumkan, tetapi hanya boleh lulus setelah ada bukti yang sesuai.

## 3. Acuan kebutuhan

| ID  | Kebutuhan                              | Rujukan kode/dokumen                                                 | Kasus utama                  |
| --- | -------------------------------------- | -------------------------------------------------------------------- | ---------------------------- |
| R01 | Server dan navigasi dapat dipulihkan   | `JALANKAN-LOKAL.cmd`, `frontend/src/App.jsx`                                  | BB-001–008; WB-01            |
| R02 | Autentikasi dan proteksi peran         | `ProtectedRoute.jsx`, `SupabaseAuthPage.jsx`, `SupabaseProvider.jsx` | BB-009–025; WB-02, 14–17, 21 |
| R03 | Katalog, sumber, dan bahan ajar        | `DashboardPage.jsx`, `ResourceLibraryPage.jsx`, `LessonPage.jsx`     | BB-026–039; WB-03, 33–35     |
| R04 | Kuis, skor, hasil, dan XP konsisten    | `learning.js`, `QuizPage.jsx`, migration 001                         | BB-040–056; WB-04–08, 22–25  |
| R05 | Profil, progres, dan persistensi       | `DemoContext.jsx`, `ProfilePage.jsx`, migration 001                  | BB-057–062; WB-18–20         |
| R06 | Kelas, tugas, dan penilaian terisolasi | `ClassesPage.jsx`, `TutorPage.jsx`, migration 002                    | BB-063–078; WB-26–29         |
| R07 | Impor atomik dan publikasi terkendali  | `importService.js`, `ContentStudio.jsx`, migration 002/004           | BB-079–090; WB-09–12, 30–31  |
| R08 | Berkas privat dan privasi akun         | `supabaseService.js`, `AccountPage.jsx`, migration 003               | BB-091–100; WB-13, 32        |
| R09 | Aksesibilitas, visual, dan ketahanan   | `index.css`, layout, renderer, provider                              | BB-101–112; WB-16–17         |
| R10 | Build dan isi ekspor aman              | `production-build.test.mjs`, manifest, generator                     | BB-113–116; WB-33–36         |

Nomor BB/WB merupakan katalog rencana. Nomor `QA-WB-01` dalam file tes adalah nama kelompok tes tambahan, bukan penomoran katalog WB.

## 4. Lingkungan dan data uji

| Kode | Lingkungan       | Persiapan                                                                                                          |
| ---- | ---------------- | ------------------------------------------------------------------------------------------------------------------ |
| D    | Demo lokal       | Node >=22.12; dependensi terpasang; `VITE_APP_MODE=demo`; browser/profil khusus QA                                 |
| C    | Supabase staging | Proyek uji terpisah, empat migration berurutan, seed draf, publish konten uji setelah review, URL/key publik benar |
| H    | Harness lokal    | `node:test`, Vite, happy-dom, mock Supabase, dan PGlite; tidak mengirim email atau memakai cloud nyata             |
| P    | Preview build    | Build sesuai mode lalu preview melalui HTTP; bukan membuka HTML dengan `file://`                                   |

Gunakan akun rekaan: `qa.student.a@example.test` kelas 3, siswa B kelas 3, siswa C kelas 4, tutor A, tutor B, admin A, serta tamu. Alamat `.test` hanya untuk fixture; uji email sungguhan harus memakai kotak masuk uji milik tim. Peran tutor/admin staging disiapkan pemilik proyek melalui prosedur yang berlaku. Jangan memakai data anak atau akun produksi.

Sediakan kelas A milik tutor A, kelas B milik tutor B, tugas belum lewat tenggat, tugas lewat tenggat, kiriman belum/sudah dinilai, materi published berisi 5 dan 10 soal, materi draf, serta pelajaran inactive. Demo menyediakan kode `ILMU03` untuk kelas 3. ID cloud harus diambil dari staging; ID demo tidak dapat disalin menjadi UUID cloud.

Gunakan origin yang tetap: `http://127.0.0.1:5173`. Port `5174` adalah origin berbeda. Bila server memakai `5174`, semua tautan dan bukti harus memakai port itu. Reset progres hanya pada profil browser QA; jangan menghapus penyimpanan browser pengguna.

## 5. Strategi dan urutan eksekusi

1. Catat versi/snapshot kode, waktu WIB, mode, URL, browser, dan perangkat pada lembar eksekusi.
2. Jalankan smoke: server, landing, login demo, baca, kuis, progres, dan proteksi role.
3. Jalankan unit/integrasi/database/build lokal, lalu cocokkan dengan katalog WB.
4. Jalankan BB demo dengan data baru; ulangi peran siswa → tutor → siswa → admin.
5. Siapkan staging dan jalankan BB cloud, direct API/RLS, Storage, email, serta dua akun terisolasi.
6. Jalankan viewport, keyboard, pembaca layar, jaringan lambat/offline, dan uji konkurensi pada staging.
7. Catat bug beserta bukti; retest perbaikan dan jalankan regresi area terdampak.
8. Terapkan exit criteria dan tulis keputusan rilis beserta kasus yang belum diuji.

Teknik utama: equivalence partitioning, boundary value analysis, decision table, state transition, negative testing, pengujian otorisasi lintas akun, serta pengujian integrasi. Randomisasi kuis diuji dengan invariants; unit test dapat menginjeksi random deterministik. Tidak perlu menuntut urutan berbeda pada setiap dua percobaan karena urutan yang sama masih mungkin secara acak.

## 6. Prioritas, severity, dan status

| Prioritas | Arti                | Contoh                                                        |
| --------- | ------------------- | ------------------------------------------------------------- |
| P0        | Wajib sebelum rilis | Isolasi akun, kunci soal cloud, hasil/XP, role, berkas privat |
| P1        | Alur utama          | Login, materi, kelas, tugas, impor, publikasi                 |
| P2        | Pendukung           | Filter lanjutan, empty state, visual minor                    |

| Severity bug | Dampak                                                   |
| ------------ | -------------------------------------------------------- |
| S1 Critical  | Data/kunci bocor, eskalasi akses, kehilangan data luas   |
| S2 Major     | Alur inti gagal atau skor/XP salah tanpa pemulihan wajar |
| S3 Moderate  | Fungsi terganggu tetapi ada jalan lain yang layak        |
| S4 Minor     | Kosmetik atau teks yang tidak menghambat penggunaan      |

Prioritas kasus dan severity bug berbeda. Status: **NOT RUN** belum dieksekusi; **PASS** aktual sesuai harapan dan ada bukti; **FAIL** ada ketidaksesuaian; **BLOCKED** prasyarat tidak tersedia; **N/A** tidak berlaku dengan alasan tertulis. Ketiadaan browser adalah blocker pengujian visual, bukan bug aplikasi.

Semua kasus katalog dimulai sebagai NOT RUN. Hanya lembar eksekusi/laporan aktual yang memberi status. Lulusnya satu tes otomatis tidak otomatis meluluskan seluruh baris BB yang lebih luas.

## 7. Entry dan exit criteria

**Entry:** dependensi/runtime tersedia; mode dan data uji jelas; baseline tersimpan; akun/role staging siap untuk kasus cloud; tidak ada pengujian destruktif terhadap produksi; tester dapat menyimpan bukti.

**Exit untuk demo internal:** semua P0/P1 demo dieksekusi; tidak ada S1/S2 terbuka; tes dan build lulus; browser desktop dan viewport mobile utama diperiksa; temuan tersisa memiliki pemilik dan keputusan tertulis.

**Exit untuk rilis publik Supabase:** seluruh P0/P1 cloud lulus pada layanan nyata; tidak ada S1/S2 terbuka; isolasi Data API/Storage terbukti; email/recovery, konkurensi, backup/restore dan penghapusan pada staging diuji; materi terbit disetujui peninjau pendidikan; performa/aksesibilitas sesuai target yang disepakati. BLOCKED tidak boleh dihitung sebagai PASS.

Target coverage yang diusulkan: fungsi bisnis kritis >=90% line dan >=85% branch; semua cabang otorisasi utama memiliki uji izin/tolak. Ini target tim, bukan standar eksternal. Persentase global yang tinggi tidak boleh menutup modul penting dengan coverage rendah.

## 8. Perintah menjalankan

Jika Node/npm sudah pada PATH, dari root aplikasi:

```powershell
.\JALANKAN-LOKAL.cmd
npm test
node --experimental-test-coverage --test --test-concurrency=1 'tests/*.test.mjs'
node --test tests/qa-boundaries.test.mjs
npm run build
```

Jalankan launcher pada terminal tersendiri dan biarkan terbuka. Alternatif port: `.\JALANKAN-LOKAL.cmd 5174`.

Fallback Windows yang dipakai pada mesin penyusunan:

```powershell
$qaNode = Join-Path $env:USERPROFILE '.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe'
$env:PATH = (Split-Path -Parent $qaNode) + ';' + $env:PATH
& $qaNode --experimental-test-coverage --test --test-concurrency=1 'tests/*.test.mjs'
& $qaNode node_modules/vite/bin/vite.js build
```

Tes produksi dalam suite mengompilasi Supabase dengan konfigurasi publik rekaan ke `.verification-build/` secara offline. Untuk deployment nyata, ikuti `docs/OPERASIONAL.md` dan skrip `build:production`; konfigurasi offline bukan kredensial staging dan tidak membuktikan koneksi cloud.

## 9. Tanggung jawab dan bukti

QA menyiapkan data, mengeksekusi kasus, menyimpan bukti, dan memverifikasi perbaikan. Developer menganalisis/memperbaiki bug serta menjaga unit/integrasi. Pemilik staging menyiapkan Auth/DB/Storage dan restore. Peninjau pendidikan menyetujui konsep, bahasa, kunci, dan keselarasan materi. Penanggung jawab rilis menerima atau menolak risiko tersisa.

Bukti minimal: ID run dan kasus, timestamp WIB, versi, mode, akun rekaan/peran, langkah, expected/actual, screenshot atau log relevan, serta defect ID bila gagal. Jangan menyimpan password, token sesi, service-role key, signed URL aktif, atau data pribadi dalam bukti yang dibagikan.
