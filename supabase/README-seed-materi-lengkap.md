# Seed materi komik CRA

File utama: [seed_materi_lengkap.sql](seed_materi_lengkap.sql).

Isi: tiga mata pelajaran (`matematika`, `bahasa-indonesia`, `ipa`), kelas 1–6, dua bab per kombinasi kelas/pelajaran, **36 materi published dan 216 soal published**. Tiap bab berisi dua easy, dua medium, dua hard. Soal penerapan dan penalaran ditulis sesuai topik; hard menggunakan tabel, diagram teks atau analisis alasan, bukan sekadar angka yang diperbesar.

## Cara memakai

1. Gunakan proyek yang sudah memasang migration Petualangan Ilmu `202610160001` sampai `202610160004`. Jangan mengulang migration awal pada database yang sudah terpasang.
2. Pasang frontend terbaru pada folder proyek ini: pembaca dan editor sudah mendukung `scenes` dengan `blocks: []`.
3. Buka file SQL dan jalankan seluruh isinya melalui SQL Editor sebagai pemilik database. Tidak memerlukan service-role key dalam kode browser.
4. Periksa tabel ringkasan pada akhir eksekusi: 18 baris kelas/pelajaran; setiap baris dua materi dan 12 soal. Seluruh proses berada dalam satu transaksi.

Script ini **belum dijalankan pada Supabase pengguna**. Pengujian dilakukan pada database lokal PGlite yang terisolasi.

## Penyimpanan ringan

Isi komik disimpan sekali pada `scenes`. `blocks` tetap berupa array kosong untuk memenuhi skema/validator lama; aplikasi membentuk tampilan baca saat diperlukan. Metadata rujukan dipangkas menjadi judul dan URL, sedangkan informasi penting tentang pengayaan dan review tetap ada. Gambar/video tidak disimpan sebagai binary atau base64 di database.

| Ukuran                                                        | Sebelum | Sesudah | Berkurang |
| ------------------------------------------------------------- | ------: | ------: | --------: |
| File SQL (byte UTF-8)                                         | 580.497 | 285.009 |    50,90% |
| Seluruh content JSON (byte UTF-8)                             | 313.653 | 140.602 |    55,17% |
| Nilai content JSONB lokal sebelum kompresi penyimpanan (byte) | 330.353 | 149.154 |    54,85% |

Angka JSONB adalah jumlah `pg_column_size` atas nilai JSONB di PGlite, bukan ukuran seluruh database Supabase. Ukuran disk nyata dipengaruhi TOAST, indeks, page, WAL dan data pengguna. Bukti ukuran: [pengukuran](../docs/qa/evidence/2026-10-18-seed-lightweight-size.json).

Soal diinsert enam sekaligus per bab; pembahasan cukup ditulis sekali di file SQL, lalu dipakai untuk kunci privat. Kedua lokasi kunci tetap dipertahankan agar kompatibel dengan kontrak sebelumnya. Semua upsert melewati data identik dengan `IS DISTINCT FROM`, termasuk sinkronisasi kunci; rerun tidak membuat versi row materi/soal/kunci baru ketika isinya sama. Ini mengurangi penulisan yang tidak diperlukan, tetapi tidak menghapus WAL/riwayat lama.

Untuk database baru yang hanya membutuhkan paket ini, cukup jalankan migration 001–004 dan file seed ini. Paket alternatif `seed.sql`, `paket-72-bab.sql`, `curriculum-draft.sql`, dan seed buku tidak perlu ditambahkan. Untuk database yang sudah berisi versi sebelumnya, jalankan ulang file ini untuk memperbarui record yang sama menjadi ringan. Materi lain, akun, progres, dan riwayat kuis tidak dihapus.

## Penggabungan tiga contoh pengguna

Tiga contoh lampiran menggantikan bab yang sepadan, bukan menambah duplikat. Total tetap 36 materi dan 216 soal; setiap contoh dilengkapi menjadi 2 easy, 2 medium, 2 hard, panel komik, mini-check tersendiri, dan tampilan teks yang dibentuk dari scenes.

| Judul contoh                                     | Slug kanonis yang dipertahankan        |
| ------------------------------------------------ | -------------------------------------- |
| Rahasia Dapur Hijau: Bagaimana Tumbuhan Memasak? | `komik-ipa-kelas-4-bab-1`              |
| Misi Detektif Bobo: Menemukan Ide Pokok Cerita!  | `komik-bahasa-indonesia-kelas-3-bab-1` |
| Membaca Peta Data & Membandingkan Pecahan Bekal  | `komik-matematika-kelas-5-bab-1`       |

Slug usulan dan judul referensi lampiran disimpan dalam `content.source_example`, karena skema lama tidak memiliki kolom `source_title`. Judul buku tersebut berasal dari pengguna dan belum diverifikasi edisi/halamannya. Tidak ada klaim bahwa naskah diambil langsung dari buku itu. Phase tetap `B/C`, sedangkan difficulty materi memakai label skema lama; difficulty soal tetap `easy/medium/hard`.

Penyuntingan menjelaskan klorofil sebagai zat warna penangkap cahaya, menggunakan perbandingan percobaan dengan faktor lain sama, serta mengganti klaim karbon dioksida sebagai udara kotor/panas. Bobo mengajarkan gagasan tersirat, sehingga anak tidak hanya menebak posisi kalimat. Materi Rubi menambahkan pembelajaran tabel dan rata-rata sebelum soal panen. Slug dan ID bab/soal kanonis tetap dipakai agar progres yang sudah terkait tidak kehilangan hubungan.

## Kompatibilitas skema proyek

- Menambahkan metadata `island`, `mascot`, `character` pada subjects; upsert berdasarkan slug mempertahankan ID mata pelajaran yang sudah ada.
- Membuat unique index `(subject_id, grade, slug)` untuk target `ON CONFLICT (subject_id, grade, slug) DO UPDATE` yang diminta. Unique slug global lama dipertahankan.
- Menambahkan `correct_option` dan `explanation` pada `public.questions`, serta menerima `easy/medium/hard` di samping label lama `dasar/sedang/lanjut`.
- Kedua kolom kunci tidak dibuka untuk SELECT langsung role browser. Admin/editor memakai RPC berizin yang sudah ada. `private.question_keys` tetap dipakai untuk penilaian/snapshot dan disinkronkan dengan kolom baru melalui trigger.
- `content.scenes` memuat dialog, panel, mini-check dan tahap CRA. `content.blocks: []` memenuhi validator lama; pembaca aplikasi terbaru membentuk teks dari scenes tanpa menyimpannya lagi.
- Mata pelajaran `ipa` ditambahkan sesuai permintaan; `ipas` dan materi lain tidak dihapus atau diganti slug-nya.

Menjalankan ulang akan memperbarui judul, konten, status dan enam soal pada namespace slug `komik-...` milik seed ini. Ini sengaja mengikuti `DO UPDATE`; suntingan manual pada record seed dapat tertimpa. ID materi yang sudah ada pada kombinasi konflik dipertahankan, sehingga hubungan progres tidak diganti ID baru.

## Cakupan frontend dan pedagogi

Path panel mengikuti permintaan: `/images/lessons/default-illustration.webp`. Aset tersebut perlu disediakan untuk penayangan gambar komik. Pembaca aplikasi terbaru menampilkan dialog dan caption sebagai teks, serta mini-check dengan pembahasan tertutup yang dapat dibuka. Pembaca tidak mengunduh gambar placeholder. Animasi komik dan pemeriksaan pilihan secara otomatis belum ditambahkan.

Bank disiapkan dengan tingkat seimbang. RPC kuis lama masih memilih soal secara acak; mesin pemilihan adaptif berdasarkan performa siswa tidak diimplementasikan oleh seed data. Mini-check memakai butir tersendiri, bukan salah satu dari enam pertanyaan bank bab tersebut.

Status published mengikuti permintaan pengguna; metadata tetap `needs_teacher_review` agar tidak mengaku review guru sudah selesai. Sains kelas 1–2 ditandai pengayaan dan cakupan ini tidak diklaim sebagai seluruh kurikulum nasional.

## Regenerasi dan verifikasi

```powershell
npm run db:seed:complete
node --test tests/seed-materi-lengkap.test.mjs
npm test
```

Generator: `scripts/generate-seed-materi-lengkap.mjs`. Data penerapan/penalaran: `scripts/seed-materi-adaptif.mjs`. Penyuntingan tiga contoh: `scripts/seed-materi-contoh-pengguna.mjs`. Bab lain memakai dua soal easy serta penjelasan dari naskah orisinal paket bab proyek.

Hasil optimasi 18 Oktober 2026: **105 tes lulus, 0 gagal**. Tes mencakup 36/216 record published, cakupan dan tingkat kesulitan, pembaruan bab/soal lama tanpa mengganti hubungan ID, pembacaan seluruh scenes, suntingan scenes tanpa menyalin blocks, anggaran ukuran file/data, rerun tanpa perubahan versi row identik, akses kunci, RPC enam soal, skor/XP dan replay idempoten. Audit bundle produksi juga lulus. Bukti: [regresi versi ringan](../docs/qa/evidence/2026-10-18-seed-lightweight-regression.txt).
