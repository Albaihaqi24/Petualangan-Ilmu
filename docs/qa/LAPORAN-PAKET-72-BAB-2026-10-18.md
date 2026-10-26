# Hasil QA paket 72 bab — 18 Oktober 2026

**92 tes otomatis lulus, 0 gagal. Build demo dan build/audit Supabase offline lulus.** Laporan ini menambahkan hasil setelah [run QA sebelumnya](LAPORAN-2026-10-18.md) yang masih memakai 83 tes dan koleksi 260 materi.

## Hasil penambahan

| Artefak | Jumlah / perilaku |
| --- | --- |
| Kelas dan pelajaran | 6 kelas × 3 pelajaran × 4 bab = 72 bab |
| Penjelasan dan contoh | 216 subbab dan 216 contoh bertahap |
| Kegiatan | 72 kegiatan penerapan dengan arahan pendamping |
| Latihan mandiri | 216 butir dengan jawaban dan alasan; pembahasan tertutup pada pembaca |
| Kuis | 360 soal; setiap bab 5 soal, 4 opsi unik, kunci dan pembahasan |
| Ilustrasi/diagram | 4 SVG orisinal: cerita Nia, pecahan, denah, siklus air |
| Dokumen | 72 naskah bab + indeks paket + panduan kuis pendamping |
| Demo gabungan | 332 materi dan 1660 soal; koleksi lama tetap tersedia |
| Database | SQL 72 materi/360 soal draf; idempoten dan tidak menimpa suntingan |

## Bukti eksekusi

| Pemeriksaan | Hasil | Bukti |
| --- | --- | --- |
| Regresi seluruh suite | 92 pass, 0 fail/cancelled/skipped/todo; 47814.6682 ms | [Log tes dan coverage](evidence/2026-10-18-paket-72-tests.txt) |
| Kontrak isi semua bab | Struktur, kelengkapan, ID/slug unik, status draf, penanda pengayaan, minimal isi, tanpa placeholder lulus | `tests/adventure-package.test.mjs` pada log |
| Seluruh bank kuis | 72 bank ×5 soal, opsi unik, hasil scorer 0/100, pembahasan valid | Tes paket pada log; pemeriksaan ini tidak menggantikan review setiap kunci oleh guru |
| Oracle terpilih | Pecahan, laju rata-rata dua ruas, keliling setengah lingkaran, permukaan gabungan dan konsep sains terpilih lulus | Tes oracle paket |
| Render 72 halaman | Semua judul, navigasi empat bab, tiga subbab, dua panel tertutup dan tidak ada opsi kuis pada halaman bacaan lulus | Tes DOM di `tests/app.test.mjs` |
| Alur pembelajaran | Navigasi bab 1→2→1, baca→kuis→hasil/pembahasan, skor 100, XP baca 5 + kuis 55, replay tidak menambah hadiah lulus | Tes alur paket |
| Filter perpustakaan | Kelas/pelajaran, label pengayaan dan tautan login/siswa lulus | Tes panel paket |
| SQL pada PGlite | 72 bab/360 soal valid/draf; siswa tak melihat draf; pemasangan ulang menjaga revisi; publish uji memberi 5 soal tanpa kunci; unpublish lulus | Subtes paket di `tests/platform-database.test.mjs` |
| Ekspor | Markdown dan panduan kuis tersedia; manifest tanpa opsi/kunci; SQL identik generator lulus | Tes artefak paket |
| Build demo | 1983 modul; selesai 3.02 detik | [Log build](evidence/2026-10-18-paket-72-build.txt) |
| Build Supabase | Naskah/bank `frontend/src/content` serta modul demo tidak masuk bundle; audit lulus | Tes `production-build.test.mjs` |
| Format | Prettier check seluruh file yang berubah lulus | Perintah pemeriksaan format dijalankan setelah perubahan akhir |

Coverage Node untuk berkas terinstrumentasi: line **95.43%**, branch **93.86%**, function **78.92%**. `frontend/src/content/adventure/index.js`: 100% line, 94.29% branch, 100% function. Angka global dipengaruhi data statis; JSX hasil transform dan SQL tidak dilaporkan sebagai coverage sumber lengkap. Direct coverage `supabaseService.js` tetap 41.15% line/26.67% function dan tidak ditingkatkan oleh naskah baru.

## Batas hasil

Browser automation kembali diperiksa dan inventory masih `apps=[]`, `browsers=[]`. Karena itu render DOM bukan klaim QA visual desktop/Android, keyboard, pembaca layar, atau gambar pada browser nyata. Build berhasil juga tidak membuktikan semua tautan eksternal aktif atau seluruh materi sudah benar secara pedagogis.

Pengujian database memakai PGlite, bukan proyek Supabase nyata. Paket SQL tersedia untuk staging, tetapi Auth/Data API/Storage, konkurensi, deployment dan publikasi nyata tidak dijalankan. Semua materi tetap draf. Peninjau guru perlu memeriksa setiap bab/soal, kedalaman, bahasa, CP/ATP dan bukti praktik.

Topik mengikuti daftar pengguna sebagai rancangan aplikasi. Sains kelas 1–2 berlabel pengayaan; unsur sosial IPAS belum tercakup penuh dan tiga pelajaran ini bukan seluruh kurikulum nasional. Penempatan ratusan, bilangan negatif, lingkaran dan statistika memerlukan peninjauan, sehingga tidak diberi label daftar bab resmi nasional.

## Cara mengulang

```powershell
npm run content:adventure
node --test tests/adventure-package.test.mjs
npm test
npm run build
```

Pada mesin yang Node/npm-nya tidak ada di PATH, gunakan runtime lokal seperti pada [rencana QA](README.md). Jalankan [pemeriksa tautan/diagram](evidence/verify-adventure-documents.ps1) untuk memeriksa berkas hasil ekspor. [Paket materi](../materi/paket-72-bab/README.md) mempunyai register review guru per bab.

Keputusan: implementasi dan regresi lokal lulus; publikasi tetap menunggu review pendidikan dan QA layanan/perangkat nyata.
