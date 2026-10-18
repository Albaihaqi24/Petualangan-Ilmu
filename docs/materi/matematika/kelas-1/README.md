# Matematika kelas 1 — bahan ajar per bab

Penulisan 8 bab dan 25 subbab tersedia, dengan penjelasan, contoh orisinal, kegiatan, latihan mandiri/pembahasan, refleksi dan catatan pendamping. Terdapat 40 soal kuis tambahan. Status seluruh bab masih draf menunggu review guru; ini bukan salinan buku pemerintah atau pengganti buku resminya.

Acuan urutan: [Matematika untuk SD/MI Kelas I, Dara Retno Wulan dan Rasfaniwaty, 2022](https://repositori.kemendikdasmen.go.id/35868/) serta [panduan guru](https://repositori.kemendikdasmen.go.id/35861/). Identitas dan daftar isi buku siswa diperiksa pada halaman PDF 2 dan 5–7. Teks, contoh dan soal aplikasi ditulis baru; ilustrasi dan soal buku tidak disalin. CP proyek tetap memakai 046/H/KR/2025; buku ini tidak sendirian mencakup target Fase A yang berakhir di kelas 2.

## Cara belajar

Buka [perpustakaan per bab](http://127.0.0.1:5174/sumber-belajar?grade=1&subject=matematika#buku-per-bab), masuk sebagai siswa, lalu pilih bab. Pelajari satu subbab setiap kali, gunakan benda aman, ceritakan cara berpikir, kerjakan latihan sebelum membuka pembahasan. Kuiz akhir bab memeriksa sebagian kemampuan; praktik tetap diamati pendamping.

## Daftar bab

| Bab | Materi aplikasi | Halaman cetak sumber | Penulisan | Review guru |
| --- | --- | --- | --- | --- |
| 1 | [Bilangan 0–10](bab-01.md) | 1–40 | [x] | [ ] |
| 2 | [Penjumlahan hingga 10](bab-02.md) | 41–74 | [x] | [ ] |
| 3 | [Pengurangan hingga 10](bab-03.md) | 75–114 | [x] | [ ] |
| 4 | [Bentuk di sekitar kita](bab-04.md) | 115–144 | [x] | [ ] |
| 5 | [Bilangan 11–20](bab-05.md) | 145–174 | [x] | [ ] |
| 6 | [Tambah dan kurang hingga 20](bab-06.md) | 175–196 | [x] | [ ] |
| 7 | [Mengukur panjang](bab-07.md) | 197–218 | [x] | [ ] |
| 8 | [Mengelompokkan data dan diagram gambar](bab-08.md) | 219–242 | [x] | [ ] |

## Pemasangan database

Jalankan `supabase/books/matematika-kelas-1-2022.sql` setelah keempat migration aktif dan `seed.sql`. Paket berisi 8 bab/40 soal draf. ID deterministik dan ON CONFLICT DO NOTHING menjaga pemasangan ulang tidak menimpa suntingan. Paket tidak memublikasikan bab. Kunci kuis disimpan di schema private; pembahasan latihan belajar memang bagian bacaan, berbeda dari kunci kuis server.

## Status keseluruhan

Paket ini melengkapi ringkasan yang sudah ada. Total demo sekarang 260 materi/1.300 soal. Database baru dengan seed awal, curriculum-draft.sql dan paket buku ini berjumlah 260 materi/1.305 soal; lima soal ekstra hanya ada di seed awal. Jumlah tersebut bukan jumlah bab resmi seluruh pelajaran.

Kelompok kelas/pelajaran lainnya masih memerlukan pemilihan buku/edisi, pemeriksaan daftar isi, penulisan per bab serta review. IPAS/Inggris kelas 1–2 tetap pengayaan, dan seni mengikuti cabang sekolah. Jangan menyebut 216 ringkasan sebelumnya sebagai buku lengkap.

Jalankan `npm run content:books` setelah menyunting `src/content/books/mathGrade1.js` atau metadata buku. Generator memperbarui delapan dokumen, SQL dan manifest tanpa mengubah cloud.
