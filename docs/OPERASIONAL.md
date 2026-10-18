# Operasional Petualangan Ilmu

Dokumen ini adalah prosedur yang harus dijalankan pemilik proyek. Penyediaan prosedur bukan bukti bahwa cloud sudah terpasang atau siap rilis. Gunakan proyek pengembangan terpisah dan akun/data rekaan untuk pengujian.

## Pemasangan dan akses pertama

1. Buat proyek Supabase baru. Jalankan migration 001–005 sesuai urutan nama, lalu pilih paket seed. Migration 005 menambah avatar Kiki/Momo/Piko; pada proyek yang sudah memakai 001–004, cukup jalankan migration tambahan itu. Untuk pemasangan ringan, gunakan `seed_materi_lengkap.sql` sesuai [panduan seed ringan](../supabase/README-seed-materi-lengkap.md); `seed.sql` adalah paket awal alternatif, tidak wajib dipasang bersamaan. Lanjutkan dengan `verify-setup.sql` dan `verify-platform.sql`. Jika proyek sudah memiliki skema lama, buat migration konversi terpisah. Jangan menimpa tabel.
2. Aktifkan Email/Password dan konfirmasi email. Atur Site URL serta Redirect URLs `/auth/callback` dan `/reset-password` untuk origin lokal dan domain rilis. Aplikasi memakai PKCE; tautan email perlu dibuka pada browser/origin yang menyimpan verifier. Jika perangkat berbeda, kembali ke browser awal atau minta tautan baru.
3. Siapkan SMTP untuk email produksi, aturan kata sandi, dan batas permintaan Auth. Uji email konfirmasi dan pemulihan benar-benar sampai. Rujukan: [password Auth](https://supabase.com/docs/guides/auth/passwords), [redirect URLs](https://supabase.com/docs/guides/auth/redirect-urls), [rate limits](https://supabase.com/docs/guides/auth/rate-limits).
4. Daftarkan akun pemilik melalui UI. Pemilik database mengangkat **akun miliknya yang sudah diverifikasi** melalui SQL Editor, menggunakan UUID Auth yang benar:

```sql
update public.profiles set role='admin' where id='UUID_AKUN_PEMILIK';
```

5. Muat ulang akun admin. Verifikasi identitas/kelayakan calon tutor sebelum memberi role melalui panel admin. Registrasi publik selalu student. Tidak ada pengangkatan admin dari UI.
6. Jangan tambahkan `private` ke Exposed schemas. Jangan menambahkan policy Storage yang memberi akses publik. Bucket `student-submissions` harus privat. [Panduan Storage/RLS](https://supabase.com/docs/guides/storage/security/access-control).

## Review pembelajaran

Paket bahan ajar per bab Matematika kelas 1 tersedia di `supabase/books/matematika-kelas-1-2022.sql`: 8 bab/40 kuis draf, dipasang setelah keempat migration dan seed awal. Jika seluruh paket awal, ringkasan dan buku dipasang, total database baru menjadi 260 materi/1.305 soal. Ikuti [panduan bahan ajar](PANDUAN-BAHAN-AJAR.md) dan [daftar bab](materi/matematika/kelas-1/README.md); penulisan tersedia belum berarti review guru selesai.

Mulai dari [peta kurikulum pemerintah](PETA-KURIKULUM-PEMERINTAH.md) dan [roadmap pendidikan](ROADMAP-PENDIDIKAN.md). Kunci CP/TP/ATP, edisi/bab sumber serta bukti asesmen sebelum menyetujui publikasi. Register pemetaan masih usulan; metadata sumber tidak menggantikan review isi.

Paket tambahan tersedia di `supabase/curriculum-draft.sql`. Pasang setelah keempat migration dan `seed.sql` bila ingin memasukkan 216 materi dan 1.080 soal baru; semua tetap draf. Pada database baru dengan kedua paket, totalnya 252 materi dan 1.265 soal. Ikuti [daftar materi dan checklist review](MATERI-SIAP-REVIEW.md). IPAS dan Bahasa Inggris kelas 1–2 diperlakukan sebagai pengayaan; pilihan cabang seni mengikuti sekolah. Paket ini belum membuktikan seluruh CP nasional tercakup.

Paket awal `seed.sql` memuat 36 materi dan 185 soal draf. Paket ringan `seed_materi_lengkap.sql` memuat 36 materi dan 216 soal published, dengan metadata review guru yang masih diperlukan. Guru/peninjau perlu mencatat nama peninjau, tanggal, ID materi, tingkat kelas, ketepatan konsep, bahasa, kunci/pembahasan, hak penggunaan media, serta hasil revisi. Dokumen ini belum mengklaim kesesuaian kurikulum resmi; tinjau khusus sains kelas 1–2.

Tutor membuat materi dan soal draf. Admin memeriksa seluruh soal melalui studio, memastikan minimal lima soal lengkap, lalu menandai konfirmasi review dan memublikasikan materi. Publikasi menerbitkan **seluruh soal** milik materi tersebut. Impor tidak langsung menerbitkan soal. Menyunting materi terbit melalui admin mengembalikannya menjadi draf. Gunakan penarikan publikasi untuk koreksi; sesi kuis yang sudah dimulai tetap memakai snapshot lama.

Video hanya dimuat setelah siswa menekan tombol. Tinjau video nyata dan tautannya sebelum publikasi. Signed URL berkas berlaku 60 detik, tetapi pengguna berwenang dapat menyimpan salinan file yang sudah diunduh.

Publikasi mencatat konfirmasi admin, waktu, dan identitas akun peninjau pada metadata materi. Catatan tersebut merupakan pernyataan admin; bukti review guru tetap perlu disimpan dalam catatan editorial. Penyuntingan atau penarikan publikasi mengembalikan status review menjadi perlu ditinjau.

## Pengujian cloud dan konkurensi

Siapkan dua siswa uji, dua tutor uji, serta admin uji. Publikasikan satu materi yang sudah ditinjau pada proyek uji. Skrip berikut mengubah progres dua akun uji dan menjalankan dua koneksi akun pertama secara bersamaan. Jalankan hanya pada proyek uji, memakai environment terminal privat:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
CLOUD_TEST_CONFIRM=petualangan-ilmu-test
CLOUD_TEST_LESSON_ID=UUID_MATERI_UJI
CLOUD_TEST_STUDENT_1_EMAIL
CLOUD_TEST_STUDENT_1_PASSWORD
CLOUD_TEST_STUDENT_2_EMAIL
CLOUD_TEST_STUDENT_2_PASSWORD
```

```sh
node scripts/verify-cloud.mjs
```

Skrip memeriksa isolasi profil, penolakan update XP/bank soal/schema privat, hadiah membaca dan submit bersamaan, replay, serta penolakan hasil milik siswa lain. Skrip tidak membuktikan seluruh fitur cloud lulus.

Lanjutkan uji manual di browser/perangkat berbeda: tutor A membuat kelas/tugas; siswa A bergabung/kirim file; tutor A menilai; siswa A membaca komentar. Siswa B dan tutor B harus ditolak saat mencoba UUID/URL kiriman A maupun Storage API langsung. Uji tenggat, unggahan terlalu besar/MIME salah, signed URL kedaluwarsa, refresh, logout, kehilangan koneksi, dan sesi email. Simpan tanggal, versi commit, akun rekaan, langkah, hasil, dan bukti pengujian.

## Penghapusan akun dan berkas

Siswa/staf dapat mengajukan permintaan melalui `/account`. Permintaan ini belum menghapus akun. Admin meninjau antrean; pemilik memverifikasi identitas pemohon melalui kanal yang disepakati, mencatat persetujuan/ruang lingkup, lalu menjalankan alat server di terminal privat. Alat ini belum diuji terhadap Auth/Storage cloud.

1. Isi `SUPABASE_URL` dan `SUPABASE_SERVICE_ROLE_KEY` pada environment terminal privat. **Jangan memakai awalan `VITE_`, memasukkan key ke repository, atau menempelkan key ke browser/chat.** Hapus variabel sesi setelah selesai.
2. Jalankan pemeriksaan baca-saja:

```sh
node scripts/process-account-deletion.mjs --request UUID_PEMOHON
```

3. Periksa ID pemohon dan jumlah berkas. Alat menolak akun admin dan tutor yang masih memiliki kelas; alihkan pendampingan secara terkontrol sebelum menghapus tutor.
4. Setelah verifikasi dan persetujuan pemohon, eksekusi permanen:

```sh
node scripts/process-account-deletion.mjs --request UUID_PEMOHON --confirm-delete UUID_PEMOHON
```

Alat menghapus berkas melalui Storage API sebelum menghapus Auth user; data profil/progres ikut cascade. Audit editorial mempertahankan aksi/UUID target, dengan pelaku menjadi null saat profil dihapus. Permintaan ikut cascade dan bukan arsip identitas permanen. Catat hasil minimum pada catatan operasional dengan masa simpan yang disepakati. [Admin deleteUser](https://supabase.com/docs/reference/javascript/auth-admin-deleteuser).

Jika tahap Storage berhasil tetapi Auth gagal, akun belum dihapus; status dapat tertinggal `processing`. Tinjau kegagalan dan jalankan ulang secara terkontrol. Jangan menghapus baris `storage.objects` secara SQL karena objek fisik harus dikelola melalui Storage API. Berkas tidak terpakai dari unggahan/gagal kirim atau penggantian lampiran perlu dibersihkan berkala setelah dipastikan tidak dirujuk `submissions.file_path` dan tidak berasal dari pengiriman yang masih berlangsung. Jangan menghapus lampiran secara otomatis hanya karena respons submit terputus; transaksi mungkin sudah berhasil.

## Backup, pemulihan, dan insiden

Tetapkan jadwal backup, batas kehilangan data yang diterima, lama pemulihan, pemilik, dan retensi sebelum rilis. Tinjau fasilitas paket yang dipakai; tidak ada klaim backup gratis/unlimited. Backup database tidak mencakup objek Storage, sehingga rencanakan backup media terpisah. [Dokumentasi backup](https://supabase.com/docs/guides/platform/backups).

Uji restore ke proyek terisolasi, pasang konfigurasi test, jalankan verifikasi SQL, lalu periksa profil/progres/kiriman dan objek privat menggunakan akun uji. Jangan restore percobaan di atas produksi. Pastikan prosedur restore juga mempertimbangkan permintaan penghapusan yang sudah diproses agar data yang telah dihapus tidak dipulihkan ke layanan aktif.

Pantau error aplikasi/Auth/database/Storage, ukuran database, penggunaan kuota, percobaan kode kelas, audit impor/publikasi/promosi, dan lonjakan trafik. Ledger/sesi dan kode kelas memiliki batas server; lakukan penyesuaian batas infrastruktur/Auth sesuai hasil beban. Jangan merekam kata sandi, JWT, service key, isi jawaban anak, atau signed URL pada log.

Jika terjadi akses tidak sah: batasi akses/deployment terdampak, simpan bukti minimum, perbaiki policy/secret yang terdampak, uji ulang lintas akun, dan ikuti prosedur pemberitahuan organisasi. Rahasia yang pernah berada pada bundle harus diganti; menghapusnya dari source saja tidak cukup.

## Gerbang rilis

- [ ] Keempat migration, seed, dan verifikasi berhasil pada proyek uji dan target rilis.
- [ ] Auth/email/role, dua siswa/dua tutor/admin, Storage dan konkurensi diuji lewat Data API nyata.
- [ ] Materi/soal/media ditinjau guru, dan catatan review tersedia.
- [ ] Tampilan 375 px, 412 px, desktop, keyboard/fokus, Android, video, dan koneksi lambat diperiksa.
- [ ] Backup/restore serta penghapusan akun/berkas diuji pada data rekaan.
- [ ] Kebijakan penggunaan/data anak, kontak pengelola, persetujuan wali yang diperlukan, dan retensi ditetapkan organisasi.
- [ ] `npm test`, `npm run format:check`, `npm run build:production`, dan `npm run verify:production` lulus untuk versi rilis.
- [ ] Vercel memakai `npm run build:production`, output `dist`, dan environment publik benar; domain publik, callback email, serta refresh rute bertingkat diuji.

Tanda centang ditambahkan hanya setelah tindakan tersebut dijalankan dan hasilnya dicatat.
