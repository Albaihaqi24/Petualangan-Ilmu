# Petualangan Ilmu (arsip sebelum penataan)

> **Checkpoint terbaru:** folder ini kini memiliki pondasi React + Vite + Tailwind. Tahap 2 belum dimulai karena akses HTTP localhost Tahap 1 mengalami timeout. Baca [TAHAP-1.md](TAHAP-1.md) untuk hasil verifikasi dan cara menjalankan. Penjelasan demo di bawah merujuk ke salinan lama di `legacy/dist/`; `dist/` sekarang adalah hasil build React Tahap 1. Jangan membuka hasil build Vite melalui file://.

Implementasi awal berdasarkan Master PRD yang diberikan. Produk **belum siap digunakan oleh siswa sungguhan**. Aplikasi web saat ini adalah demo interaktif; schema Supabase disertakan sebagai fondasi backend terpisah, belum dihubungkan atau diuji pada database berjalan.

## Menjalankan demo

Buka `dist/index.html` dengan browser, atau layani folder `dist` melalui HTTP. Tidak memerlukan instalasi paket atau build. Font Google bersifat opsional; ada font cadangan sistem. Data demo disimpan dalam localStorage dengan kunci `pi-demo-v1`. Jangan memasukkan data pribadi siswa. Menghapus data situs akan menghapus progres demo.

## Yang dapat dicoba

- Profil nama panggilan dan empat avatar, pilihan kelas 1–6.
- Empat pulau mata pelajaran, 24 materi contoh dengan konten yang disesuaikan menurut kelompok kelas.
- Pembaca materi teks dan ilustrasi SVG responsif, pencarian dan filter katalog.
- Lima soal per sesi, nilai 0–100, pembahasan sesudah pengumpulan.
- XP demo: membaca sekali +5; kuis pertama per materi +10 per jawaban benar dan bonus +5; level setiap 100 XP. Pengulangan kuis demo tidak menambah XP.
- Kelas simulasi dengan kode ILMU03 dan pengumpulan tugas teks lokal. Tidak ada tutor sungguhan atau pemberian nilai otomatis tugas.
- Ringkasan progres dan riwayat nilai; validasi JSON dan unduhan contoh bank soal.

## Fondasi Supabase

`supabase/schema.sql` ditujukan untuk proyek Supabase baru, dijalankan oleh pemilik database. Termasuk trigger profil siswa, RLS, peran, materi draft/published, kunci jawaban dalam schema private, sesi kuis, penilaian RPC di server, ledger XP unik, kelas, tugas, dan penilaian tutor. Frontend demo **tidak memanggil RPC ini**.

Alur integrasi berikutnya:

1. Sediakan proyek Supabase, jalankan migration di lingkungan uji, aktifkan Email/Password Auth dan konfirmasi email sesuai kebijakan produk.
2. Hubungkan supabase-js dengan URL dan publishable/anon key. Jangan menaruh service_role key di browser.
3. Ganti localStorage dengan data akun. Sesi tamu hanya dapat membuka katalog publik; kuis dan kelas harus mensyaratkan auth.
4. Gunakan `complete_lesson`, `start_quiz`, `submit_quiz`, `join_class`, dan `grade_submission`; hapus kunci jawaban demo dari bundle produksi.
5. Lengkapi API konten admin/tutor, validasi blok JSONB, impor CSV/JSON secara transaksional di server, serta audit perubahan konten. Schema pertanyaan private belum memiliki API impor.
6. Tambahkan renderer blok gambar dan video dengan allowlist URL; video YouTube tidak publik bukan kontrol akses privat.
7. Buat bucket privat student-submissions dengan kebijakan berdasarkan keanggotaan kelas dan signed URL berumur pendek. Unggahan berkas belum diimplementasikan.
8. Lengkapi portal orang tua dengan relasi wali–anak yang diverifikasi; jangan membagikan laporan menggunakan ID anak saja.
9. Tambahkan rate limit join-code di endpoint server, retry tabrakan kode kelas, audit log, backup, pemulihan akun, dan penghapusan data.
10. Uji isolasi siswa/tutor, serangan concurrent submit, replay RPC, data input tidak valid, akses kunci jawaban sebelum submit, serta akses file lintas pengguna. Lakukan uji perangkat Android dan koneksi lambat.

Admin pertama ditetapkan langsung oleh pemilik database. Promosi tutor melalui proses admin terverifikasi masih perlu endpoint khusus. Pengguna tidak diberi hak UPDATE role/xp/level.

## Keputusan produk yang masih perlu disepakati

PRD menyebut XP kuis pada percobaan pertama yang lulus atau dibatasi per bab. Fondasi SQL memilih **satu hadiah kuis pada percobaan selesai pertama per bab**, ambang lulus 60 untuk remedial. Remedial yang belum lulus mendapat +3 maksimal sekali per tanggal Asia/Jakarta secara global. Demo memakai aturan sederhana tanpa bonus remedial. Waktu minimum membaca belum diterapkan; completion hanya membuktikan tombol selesai ditekan, bukan pemahaman.

Nilai IPAS kelas 1–2 adalah pengenalan alam contoh, bukan klaim pemetaan kurikulum resmi. Materi dan soal perlu review pedagogis guru, pemetaan capaian pembelajaran, serta desain aksesibilitas sebelum rilis. Klaim kuota gratis dalam PRD belum diverifikasi dan tidak menjadi jaminan biaya operasional.

## Status cakupan PRD

| Fitur | Status |
|---|---|
| F-01 Auth & profil | Profil demo; trigger backend tersedia, autentikasi UI belum |
| F-02 Peta & katalog | Demo responsif dengan contoh materi |
| F-03 Multi-format | Teks, tips, SVG; gambar eksternal/video JSONB belum |
| F-04 Kuis aman | Demo lokal; RPC server disiapkan, belum diintegrasikan/diuji |
| F-05 XP | Demo lokal; ledger anti-duplikasi backend disiapkan |
| F-06 Kelas tutor | Simulasi siswa; schema dan RPC dasar tersedia, UI tutor belum |
| F-07 Studio & impor | Validasi JSON lokal; CSV, import server, editorial workflow belum |
| F-08 Laporan wali | Ringkasan lokal; akses wali terverifikasi belum |

## Verifikasi

Pemeriksaan sintaks JavaScript dilakukan terpisah. Migration SQL belum dieksekusi karena belum tersedia proyek/database Supabase. Demo tidak menyatakan perlindungan anti-cheat atau autentikasi produksi.
