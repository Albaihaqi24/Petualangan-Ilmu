# Paket materi enam pelajaran — siap direview

216 materi draf dan 1.080 soal baru telah diisi. Ini adalah paket orisinal aplikasi, bukan salinan buku pemerintah atau klaim pemetaan kurikulum lengkap yang disahkan guru.

## Isi setiap unit

Tujuan, penjelasan bertahap, lima konsep dengan contoh, contoh dan penalaran, aktivitas, tips, rangkuman, refleksi, lima soal konsep/latihan beserta pembahasan, serta tautan bacaan pendamping.

Draf kelas 1–2 perlu dibaca bersama pendamping. IPAS dan Inggris kelas 1–2 adalah pengayaan. Cabang seni disesuaikan pilihan sekolah. Soal nonmatematika terutama memeriksa identifikasi/pemahaman konsep; kemampuan praktik, menyimak, berbicara, menulis, berkarya dan sikap tidak dianggap tuntas hanya dari kuis.

## Cara mencoba

1. Buka mode demo di http://127.0.0.1:5174/sumber-belajar.
2. Pilih kelas/pelajaran, masuk sebagai siswa, lalu pilih Baca & latihan. Draf juga ada pada katalog siswa dengan filter bab.
3. Baca pemberitahuan draf, coba aktivitas yang sesuai usia dengan pendamping, kemudian kerjakan lima soal.
4. Tutor/admin memakai buku resmi sebagai bacaan pendamping dan meninjau draf sebelum publikasi nyata.

## Memasang di Supabase nanti

Jalankan supabase/curriculum-draft.sql setelah migration aktif. Paket boleh dipasang setelah seed awal. ID deterministik dan ON CONFLICT DO NOTHING menjaga pemasangan ulang tidak menggandakan atau menimpa suntingan editor. Paket ini tidak memublikasikan materi. Setelah seed awal dan paket ini, database awal memiliki 252 materi dan 1.265 soal draf. Paket buku Matematika kelas 1 opsional menambah 8 bab/40 soal, menjadi 260 materi/1.305 soal. Demo memuat ketiganya: 260 materi/1.300 soal karena lima soal ekstra hanya ada pada seed awal. Jumlah dapat bertambah setelah impor/editorial.

## Gerbang review per unit

Gunakan [peta CP dan sumber pemerintah](PETA-KURIKULUM-PEMERINTAH.md) serta [roadmap pendidikan R01–R10](ROADMAP-PENDIDIKAN.md). Daftar di bawah menandai review unit; daftar tersebut bukan bukti keselarasan CP yang sudah disahkan.

Periksa ketepatan konsep dan hitungan, keterbacaan, kesesuaian tujuan/ATP sekolah, aktivitas aman, jawaban tunggal dan pengecoh, hak penggunaan sumber, serta kebutuhan diferensiasi. Catat nama peninjau, tanggal, temuan dan revisi. Centang hanya setelah review dan uji materi selesai.

| Kelas | Pelajaran | Bab | Unit | Review guru |
| --- | --- | --- | --- | --- |
| 1 | matematika | Bab 1 | [Bilangan sampai 20](http://127.0.0.1:5174/student/lesson/belajar-matematika-kelas-1-unit-1) | [ ] |
| 1 | matematika | Bab 2 | [Membandingkan dan mengurutkan](http://127.0.0.1:5174/student/lesson/belajar-matematika-kelas-1-unit-2) | [ ] |
| 1 | matematika | Bab 3 | [Penjumlahan dengan benda](http://127.0.0.1:5174/student/lesson/belajar-matematika-kelas-1-unit-3) | [ ] |
| 1 | matematika | Bab 4 | [Pengurangan dengan benda](http://127.0.0.1:5174/student/lesson/belajar-matematika-kelas-1-unit-4) | [ ] |
| 1 | matematika | Bab 5 | [Pola dan bentuk di sekitar](http://127.0.0.1:5174/student/lesson/belajar-matematika-kelas-1-unit-5) | [ ] |
| 1 | matematika | Bab 6 | [Panjang dan waktu sederhana](http://127.0.0.1:5174/student/lesson/belajar-matematika-kelas-1-unit-6) | [ ] |
| 2 | matematika | Bab 1 | [Bilangan dan nilai tempat sampai 100](http://127.0.0.1:5174/student/lesson/belajar-matematika-kelas-2-unit-1) | [ ] |
| 2 | matematika | Bab 2 | [Penjumlahan dan pengurangan](http://127.0.0.1:5174/student/lesson/belajar-matematika-kelas-2-unit-2) | [ ] |
| 2 | matematika | Bab 3 | [Kelompok sama banyak](http://127.0.0.1:5174/student/lesson/belajar-matematika-kelas-2-unit-3) | [ ] |
| 2 | matematika | Bab 4 | [Berbagi sama banyak](http://127.0.0.1:5174/student/lesson/belajar-matematika-kelas-2-unit-4) | [ ] |
| 2 | matematika | Bab 5 | [Pengukuran panjang dan massa](http://127.0.0.1:5174/student/lesson/belajar-matematika-kelas-2-unit-5) | [ ] |
| 2 | matematika | Bab 6 | [Bangun datar dan data gambar](http://127.0.0.1:5174/student/lesson/belajar-matematika-kelas-2-unit-6) | [ ] |
| 3 | matematika | Bab 1 | [Bilangan sampai 1.000](http://127.0.0.1:5174/student/lesson/belajar-matematika-kelas-3-unit-1) | [ ] |
| 3 | matematika | Bab 2 | [Operasi hitung dan masalah sehari-hari](http://127.0.0.1:5174/student/lesson/belajar-matematika-kelas-3-unit-2) | [ ] |
| 3 | matematika | Bab 3 | [Perkalian dan pembagian](http://127.0.0.1:5174/student/lesson/belajar-matematika-kelas-3-unit-3) | [ ] |
| 3 | matematika | Bab 4 | [Pecahan sederhana](http://127.0.0.1:5174/student/lesson/belajar-matematika-kelas-3-unit-4) | [ ] |
| 3 | matematika | Bab 5 | [Satuan panjang, massa, dan waktu](http://127.0.0.1:5174/student/lesson/belajar-matematika-kelas-3-unit-5) | [ ] |
| 3 | matematika | Bab 6 | [Bentuk dan tabel data](http://127.0.0.1:5174/student/lesson/belajar-matematika-kelas-3-unit-6) | [ ] |
| 4 | matematika | Bab 1 | [Bilangan sampai 10.000](http://127.0.0.1:5174/student/lesson/belajar-matematika-kelas-4-unit-1) | [ ] |
| 4 | matematika | Bab 2 | [Faktor dan kelipatan sederhana](http://127.0.0.1:5174/student/lesson/belajar-matematika-kelas-4-unit-2) | [ ] |
| 4 | matematika | Bab 3 | [Pecahan senilai dan perbandingan pecahan](http://127.0.0.1:5174/student/lesson/belajar-matematika-kelas-4-unit-3) | [ ] |
| 4 | matematika | Bab 4 | [Desimal dan persen sederhana](http://127.0.0.1:5174/student/lesson/belajar-matematika-kelas-4-unit-4) | [ ] |
| 4 | matematika | Bab 5 | [Luas, keliling, dan sudut](http://127.0.0.1:5174/student/lesson/belajar-matematika-kelas-4-unit-5) | [ ] |
| 4 | matematika | Bab 6 | [Tabel dan diagram batang](http://127.0.0.1:5174/student/lesson/belajar-matematika-kelas-4-unit-6) | [ ] |
| 5 | matematika | Bab 1 | [Bilangan dan operasi hitung](http://127.0.0.1:5174/student/lesson/belajar-matematika-kelas-5-unit-1) | [ ] |
| 5 | matematika | Bab 2 | [KPK dan FPB dalam pemecahan masalah](http://127.0.0.1:5174/student/lesson/belajar-matematika-kelas-5-unit-2) | [ ] |
| 5 | matematika | Bab 3 | [Operasi pecahan dan desimal](http://127.0.0.1:5174/student/lesson/belajar-matematika-kelas-5-unit-3) | [ ] |
| 5 | matematika | Bab 4 | [Pengukuran dan luas bangun](http://127.0.0.1:5174/student/lesson/belajar-matematika-kelas-5-unit-4) | [ ] |
| 5 | matematika | Bab 5 | [Bangun ruang dan volume](http://127.0.0.1:5174/student/lesson/belajar-matematika-kelas-5-unit-5) | [ ] |
| 5 | matematika | Bab 6 | [Membaca data dan peluang sederhana](http://127.0.0.1:5174/student/lesson/belajar-matematika-kelas-5-unit-6) | [ ] |
| 6 | matematika | Bab 1 | [Operasi bilangan dan pemecahan masalah](http://127.0.0.1:5174/student/lesson/belajar-matematika-kelas-6-unit-1) | [ ] |
| 6 | matematika | Bab 2 | [Pecahan, desimal, dan persen](http://127.0.0.1:5174/student/lesson/belajar-matematika-kelas-6-unit-2) | [ ] |
| 6 | matematika | Bab 3 | [Rasio dan proporsi sederhana](http://127.0.0.1:5174/student/lesson/belajar-matematika-kelas-6-unit-3) | [ ] |
| 6 | matematika | Bab 4 | [Pengukuran luas dan volume](http://127.0.0.1:5174/student/lesson/belajar-matematika-kelas-6-unit-4) | [ ] |
| 6 | matematika | Bab 5 | [Visualisasi bangun ruang](http://127.0.0.1:5174/student/lesson/belajar-matematika-kelas-6-unit-5) | [ ] |
| 6 | matematika | Bab 6 | [Analisis data dan kemungkinan kejadian](http://127.0.0.1:5174/student/lesson/belajar-matematika-kelas-6-unit-6) | [ ] |
| 1 | bahasa-indonesia | Bab 1 | [Menyimak bunyi dan instruksi](http://127.0.0.1:5174/student/lesson/belajar-bahasa-indonesia-kelas-1-unit-1) | [ ] |
| 1 | bahasa-indonesia | Bab 2 | [Huruf dan suku kata](http://127.0.0.1:5174/student/lesson/belajar-bahasa-indonesia-kelas-1-unit-2) | [ ] |
| 1 | bahasa-indonesia | Bab 3 | [Kosakata benda sekitar](http://127.0.0.1:5174/student/lesson/belajar-bahasa-indonesia-kelas-1-unit-3) | [ ] |
| 1 | bahasa-indonesia | Bab 4 | [Membaca kata dan kalimat pendek](http://127.0.0.1:5174/student/lesson/belajar-bahasa-indonesia-kelas-1-unit-4) | [ ] |
| 1 | bahasa-indonesia | Bab 5 | [Bercerita tentang diri](http://127.0.0.1:5174/student/lesson/belajar-bahasa-indonesia-kelas-1-unit-5) | [ ] |
| 1 | bahasa-indonesia | Bab 6 | [Menulis kalimat sederhana](http://127.0.0.1:5174/student/lesson/belajar-bahasa-indonesia-kelas-1-unit-6) | [ ] |
| 2 | bahasa-indonesia | Bab 1 | [Menyimak cerita pendek](http://127.0.0.1:5174/student/lesson/belajar-bahasa-indonesia-kelas-2-unit-1) | [ ] |
| 2 | bahasa-indonesia | Bab 2 | [Membaca lancar bertahap](http://127.0.0.1:5174/student/lesson/belajar-bahasa-indonesia-kelas-2-unit-2) | [ ] |
| 2 | bahasa-indonesia | Bab 3 | [Kalimat tanya dan tanda baca](http://127.0.0.1:5174/student/lesson/belajar-bahasa-indonesia-kelas-2-unit-3) | [ ] |
| 2 | bahasa-indonesia | Bab 4 | [Mengurutkan kejadian](http://127.0.0.1:5174/student/lesson/belajar-bahasa-indonesia-kelas-2-unit-4) | [ ] |
| 2 | bahasa-indonesia | Bab 5 | [Mendeskripsikan keluarga dan lingkungan](http://127.0.0.1:5174/student/lesson/belajar-bahasa-indonesia-kelas-2-unit-5) | [ ] |
| 2 | bahasa-indonesia | Bab 6 | [Menulis pengalaman singkat](http://127.0.0.1:5174/student/lesson/belajar-bahasa-indonesia-kelas-2-unit-6) | [ ] |
| 3 | bahasa-indonesia | Bab 1 | [Informasi penting dalam bacaan](http://127.0.0.1:5174/student/lesson/belajar-bahasa-indonesia-kelas-3-unit-1) | [ ] |
| 3 | bahasa-indonesia | Bab 2 | [Tokoh dan urutan cerita](http://127.0.0.1:5174/student/lesson/belajar-bahasa-indonesia-kelas-3-unit-2) | [ ] |
| 3 | bahasa-indonesia | Bab 3 | [Kosakata dan kalimat efektif](http://127.0.0.1:5174/student/lesson/belajar-bahasa-indonesia-kelas-3-unit-3) | [ ] |
| 3 | bahasa-indonesia | Bab 4 | [Petunjuk dan prosedur sederhana](http://127.0.0.1:5174/student/lesson/belajar-bahasa-indonesia-kelas-3-unit-4) | [ ] |
| 3 | bahasa-indonesia | Bab 5 | [Percakapan dan tanggapan santun](http://127.0.0.1:5174/student/lesson/belajar-bahasa-indonesia-kelas-3-unit-5) | [ ] |
| 3 | bahasa-indonesia | Bab 6 | [Paragraf pengalaman](http://127.0.0.1:5174/student/lesson/belajar-bahasa-indonesia-kelas-3-unit-6) | [ ] |
| 4 | bahasa-indonesia | Bab 1 | [Gagasan pokok dan pendukung](http://127.0.0.1:5174/student/lesson/belajar-bahasa-indonesia-kelas-4-unit-1) | [ ] |
| 4 | bahasa-indonesia | Bab 2 | [Narasi dan deskripsi](http://127.0.0.1:5174/student/lesson/belajar-bahasa-indonesia-kelas-4-unit-2) | [ ] |
| 4 | bahasa-indonesia | Bab 3 | [Teks petunjuk dan laporan pengamatan](http://127.0.0.1:5174/student/lesson/belajar-bahasa-indonesia-kelas-4-unit-3) | [ ] |
| 4 | bahasa-indonesia | Bab 4 | [Wawancara sederhana](http://127.0.0.1:5174/student/lesson/belajar-bahasa-indonesia-kelas-4-unit-4) | [ ] |
| 4 | bahasa-indonesia | Bab 5 | [Kosakata kiasan dalam konteks](http://127.0.0.1:5174/student/lesson/belajar-bahasa-indonesia-kelas-4-unit-5) | [ ] |
| 4 | bahasa-indonesia | Bab 6 | [Menyunting paragraf](http://127.0.0.1:5174/student/lesson/belajar-bahasa-indonesia-kelas-4-unit-6) | [ ] |
| 5 | bahasa-indonesia | Bab 1 | [Menyimpulkan informasi](http://127.0.0.1:5174/student/lesson/belajar-bahasa-indonesia-kelas-5-unit-1) | [ ] |
| 5 | bahasa-indonesia | Bab 2 | [Unsur cerita dan sudut pandang](http://127.0.0.1:5174/student/lesson/belajar-bahasa-indonesia-kelas-5-unit-2) | [ ] |
| 5 | bahasa-indonesia | Bab 3 | [Fakta dan pendapat](http://127.0.0.1:5174/student/lesson/belajar-bahasa-indonesia-kelas-5-unit-3) | [ ] |
| 5 | bahasa-indonesia | Bab 4 | [Laporan dan teks penjelasan](http://127.0.0.1:5174/student/lesson/belajar-bahasa-indonesia-kelas-5-unit-4) | [ ] |
| 5 | bahasa-indonesia | Bab 5 | [Presentasi dan diskusi](http://127.0.0.1:5174/student/lesson/belajar-bahasa-indonesia-kelas-5-unit-5) | [ ] |
| 5 | bahasa-indonesia | Bab 6 | [Menulis dan menyunting teks](http://127.0.0.1:5174/student/lesson/belajar-bahasa-indonesia-kelas-5-unit-6) | [ ] |
| 6 | bahasa-indonesia | Bab 1 | [Membandingkan dua sumber](http://127.0.0.1:5174/student/lesson/belajar-bahasa-indonesia-kelas-6-unit-1) | [ ] |
| 6 | bahasa-indonesia | Bab 2 | [Menilai informasi dan alasan](http://127.0.0.1:5174/student/lesson/belajar-bahasa-indonesia-kelas-6-unit-2) | [ ] |
| 6 | bahasa-indonesia | Bab 3 | [Teks narasi dan informatif](http://127.0.0.1:5174/student/lesson/belajar-bahasa-indonesia-kelas-6-unit-3) | [ ] |
| 6 | bahasa-indonesia | Bab 4 | [Pidato dan presentasi](http://127.0.0.1:5174/student/lesson/belajar-bahasa-indonesia-kelas-6-unit-4) | [ ] |
| 6 | bahasa-indonesia | Bab 5 | [Laporan pengamatan terstruktur](http://127.0.0.1:5174/student/lesson/belajar-bahasa-indonesia-kelas-6-unit-5) | [ ] |
| 6 | bahasa-indonesia | Bab 6 | [Refleksi dan revisi tulisan](http://127.0.0.1:5174/student/lesson/belajar-bahasa-indonesia-kelas-6-unit-6) | [ ] |
| 1 | ipas | Bab 1 | [Mengamati dengan pancaindra](http://127.0.0.1:5174/student/lesson/belajar-ipas-kelas-1-unit-1) | [ ] |
| 1 | ipas | Bab 2 | [Bagian tubuh dan kebiasaan sehat](http://127.0.0.1:5174/student/lesson/belajar-ipas-kelas-1-unit-2) | [ ] |
| 1 | ipas | Bab 3 | [Benda hidup di sekitar](http://127.0.0.1:5174/student/lesson/belajar-ipas-kelas-1-unit-3) | [ ] |
| 1 | ipas | Bab 4 | [Bahan dan sifat benda sederhana](http://127.0.0.1:5174/student/lesson/belajar-ipas-kelas-1-unit-4) | [ ] |
| 1 | ipas | Bab 5 | [Cuaca yang diamati](http://127.0.0.1:5174/student/lesson/belajar-ipas-kelas-1-unit-5) | [ ] |
| 1 | ipas | Bab 6 | [Merawat lingkungan rumah](http://127.0.0.1:5174/student/lesson/belajar-ipas-kelas-1-unit-6) | [ ] |
| 2 | ipas | Bab 1 | [Kebutuhan tumbuhan dan hewan](http://127.0.0.1:5174/student/lesson/belajar-ipas-kelas-2-unit-1) | [ ] |
| 2 | ipas | Bab 2 | [Perubahan yang dapat diamati](http://127.0.0.1:5174/student/lesson/belajar-ipas-kelas-2-unit-2) | [ ] |
| 2 | ipas | Bab 3 | [Air dan penggunaannya](http://127.0.0.1:5174/student/lesson/belajar-ipas-kelas-2-unit-3) | [ ] |
| 2 | ipas | Bab 4 | [Lingkungan rumah dan sekolah](http://127.0.0.1:5174/student/lesson/belajar-ipas-kelas-2-unit-4) | [ ] |
| 2 | ipas | Bab 5 | [Pekerjaan di sekitar](http://127.0.0.1:5174/student/lesson/belajar-ipas-kelas-2-unit-5) | [ ] |
| 2 | ipas | Bab 6 | [Kegiatan mengurangi sampah](http://127.0.0.1:5174/student/lesson/belajar-ipas-kelas-2-unit-6) | [ ] |
| 3 | ipas | Bab 1 | [Makhluk hidup dan lingkungannya](http://127.0.0.1:5174/student/lesson/belajar-ipas-kelas-3-unit-1) | [ ] |
| 3 | ipas | Bab 2 | [Siklus hidup](http://127.0.0.1:5174/student/lesson/belajar-ipas-kelas-3-unit-2) | [ ] |
| 3 | ipas | Bab 3 | [Sifat dan perubahan wujud benda](http://127.0.0.1:5174/student/lesson/belajar-ipas-kelas-3-unit-3) | [ ] |
| 3 | ipas | Bab 4 | [Energi dalam kehidupan](http://127.0.0.1:5174/student/lesson/belajar-ipas-kelas-3-unit-4) | [ ] |
| 3 | ipas | Bab 5 | [Keluarga dan lingkungan sosial](http://127.0.0.1:5174/student/lesson/belajar-ipas-kelas-3-unit-5) | [ ] |
| 3 | ipas | Bab 6 | [Peta lingkungan dan bentang alam](http://127.0.0.1:5174/student/lesson/belajar-ipas-kelas-3-unit-6) | [ ] |
| 4 | ipas | Bab 1 | [Bentuk dan fungsi bagian tubuh tumbuhan](http://127.0.0.1:5174/student/lesson/belajar-ipas-kelas-4-unit-1) | [ ] |
| 4 | ipas | Bab 2 | [Gaya dan gerak](http://127.0.0.1:5174/student/lesson/belajar-ipas-kelas-4-unit-2) | [ ] |
| 4 | ipas | Bab 3 | [Energi dan perubahannya](http://127.0.0.1:5174/student/lesson/belajar-ipas-kelas-4-unit-3) | [ ] |
| 4 | ipas | Bab 4 | [Sumber daya dan pelestarian](http://127.0.0.1:5174/student/lesson/belajar-ipas-kelas-4-unit-4) | [ ] |
| 4 | ipas | Bab 5 | [Keberagaman budaya dan sejarah daerah](http://127.0.0.1:5174/student/lesson/belajar-ipas-kelas-4-unit-5) | [ ] |
| 4 | ipas | Bab 6 | [Kebutuhan, uang, dan kegiatan ekonomi](http://127.0.0.1:5174/student/lesson/belajar-ipas-kelas-4-unit-6) | [ ] |
| 5 | ipas | Bab 1 | [Sistem tubuh dan pemeliharaan kesehatan](http://127.0.0.1:5174/student/lesson/belajar-ipas-kelas-5-unit-1) | [ ] |
| 5 | ipas | Bab 2 | [Ekosistem dan hubungan makhluk hidup](http://127.0.0.1:5174/student/lesson/belajar-ipas-kelas-5-unit-2) | [ ] |
| 5 | ipas | Bab 3 | [Cahaya, bunyi, dan energi](http://127.0.0.1:5174/student/lesson/belajar-ipas-kelas-5-unit-3) | [ ] |
| 5 | ipas | Bab 4 | [Bumi dan perubahan lingkungan](http://127.0.0.1:5174/student/lesson/belajar-ipas-kelas-5-unit-4) | [ ] |
| 5 | ipas | Bab 5 | [Kondisi geografis Indonesia](http://127.0.0.1:5174/student/lesson/belajar-ipas-kelas-5-unit-5) | [ ] |
| 5 | ipas | Bab 6 | [Kegiatan ekonomi dan budaya](http://127.0.0.1:5174/student/lesson/belajar-ipas-kelas-5-unit-6) | [ ] |
| 6 | ipas | Bab 1 | [Sistem tubuh dan kesehatan](http://127.0.0.1:5174/student/lesson/belajar-ipas-kelas-6-unit-1) | [ ] |
| 6 | ipas | Bab 2 | [Energi dan pemanfaatannya](http://127.0.0.1:5174/student/lesson/belajar-ipas-kelas-6-unit-2) | [ ] |
| 6 | ipas | Bab 3 | [Bumi dan tata surya](http://127.0.0.1:5174/student/lesson/belajar-ipas-kelas-6-unit-3) | [ ] |
| 6 | ipas | Bab 4 | [Perubahan lingkungan dan tindakan bersama](http://127.0.0.1:5174/student/lesson/belajar-ipas-kelas-6-unit-4) | [ ] |
| 6 | ipas | Bab 5 | [Peristiwa sejarah dan kehidupan masyarakat](http://127.0.0.1:5174/student/lesson/belajar-ipas-kelas-6-unit-5) | [ ] |
| 6 | ipas | Bab 6 | [Indonesia dalam hubungan antarwilayah](http://127.0.0.1:5174/student/lesson/belajar-ipas-kelas-6-unit-6) | [ ] |
| 1 | pancasila | Bab 1 | [Mengenal diri dan teman](http://127.0.0.1:5174/student/lesson/belajar-pancasila-kelas-1-unit-1) | [ ] |
| 1 | pancasila | Bab 2 | [Aturan sederhana di rumah](http://127.0.0.1:5174/student/lesson/belajar-pancasila-kelas-1-unit-2) | [ ] |
| 1 | pancasila | Bab 3 | [Simbol dan nilai Pancasila](http://127.0.0.1:5174/student/lesson/belajar-pancasila-kelas-1-unit-3) | [ ] |
| 1 | pancasila | Bab 4 | [Berbagi dan bergiliran](http://127.0.0.1:5174/student/lesson/belajar-pancasila-kelas-1-unit-4) | [ ] |
| 1 | pancasila | Bab 5 | [Menghargai perbedaan](http://127.0.0.1:5174/student/lesson/belajar-pancasila-kelas-1-unit-5) | [ ] |
| 1 | pancasila | Bab 6 | [Merawat lingkungan bersama](http://127.0.0.1:5174/student/lesson/belajar-pancasila-kelas-1-unit-6) | [ ] |
| 2 | pancasila | Bab 1 | [Kebiasaan sesuai nilai Pancasila](http://127.0.0.1:5174/student/lesson/belajar-pancasila-kelas-2-unit-1) | [ ] |
| 2 | pancasila | Bab 2 | [Aturan dan kesepakatan](http://127.0.0.1:5174/student/lesson/belajar-pancasila-kelas-2-unit-2) | [ ] |
| 2 | pancasila | Bab 3 | [Hak dan tanggung jawab sederhana](http://127.0.0.1:5174/student/lesson/belajar-pancasila-kelas-2-unit-3) | [ ] |
| 2 | pancasila | Bab 4 | [Identitas dan keragaman](http://127.0.0.1:5174/student/lesson/belajar-pancasila-kelas-2-unit-4) | [ ] |
| 2 | pancasila | Bab 5 | [Kerja sama dan tolong-menolong](http://127.0.0.1:5174/student/lesson/belajar-pancasila-kelas-2-unit-5) | [ ] |
| 2 | pancasila | Bab 6 | [Lingkungan sebagai bagian Indonesia](http://127.0.0.1:5174/student/lesson/belajar-pancasila-kelas-2-unit-6) | [ ] |
| 3 | pancasila | Bab 1 | [Nilai Pancasila dalam kehidupan](http://127.0.0.1:5174/student/lesson/belajar-pancasila-kelas-3-unit-1) | [ ] |
| 3 | pancasila | Bab 2 | [Aturan, hak, dan kewajiban](http://127.0.0.1:5174/student/lesson/belajar-pancasila-kelas-3-unit-2) | [ ] |
| 3 | pancasila | Bab 3 | [Kesepakatan bersama](http://127.0.0.1:5174/student/lesson/belajar-pancasila-kelas-3-unit-3) | [ ] |
| 3 | pancasila | Bab 4 | [Keberagaman identitas](http://127.0.0.1:5174/student/lesson/belajar-pancasila-kelas-3-unit-4) | [ ] |
| 3 | pancasila | Bab 5 | [Gotong royong di lingkungan](http://127.0.0.1:5174/student/lesson/belajar-pancasila-kelas-3-unit-5) | [ ] |
| 3 | pancasila | Bab 6 | [Mengenal wilayah tempat tinggal](http://127.0.0.1:5174/student/lesson/belajar-pancasila-kelas-3-unit-6) | [ ] |
| 4 | pancasila | Bab 1 | [Penerapan sila-sila Pancasila](http://127.0.0.1:5174/student/lesson/belajar-pancasila-kelas-4-unit-1) | [ ] |
| 4 | pancasila | Bab 2 | [Norma dan kesepakatan](http://127.0.0.1:5174/student/lesson/belajar-pancasila-kelas-4-unit-2) | [ ] |
| 4 | pancasila | Bab 3 | [Musyawarah sederhana](http://127.0.0.1:5174/student/lesson/belajar-pancasila-kelas-4-unit-3) | [ ] |
| 4 | pancasila | Bab 4 | [Menghormati keberagaman](http://127.0.0.1:5174/student/lesson/belajar-pancasila-kelas-4-unit-4) | [ ] |
| 4 | pancasila | Bab 5 | [Persatuan dalam kegiatan bersama](http://127.0.0.1:5174/student/lesson/belajar-pancasila-kelas-4-unit-5) | [ ] |
| 4 | pancasila | Bab 6 | [Wilayah Indonesia dan lingkungan](http://127.0.0.1:5174/student/lesson/belajar-pancasila-kelas-4-unit-6) | [ ] |
| 5 | pancasila | Bab 1 | [Sejarah dan keteladanan perumusan Pancasila](http://127.0.0.1:5174/student/lesson/belajar-pancasila-kelas-5-unit-1) | [ ] |
| 5 | pancasila | Bab 2 | [Nilai Pancasila dan keputusan sehari-hari](http://127.0.0.1:5174/student/lesson/belajar-pancasila-kelas-5-unit-2) | [ ] |
| 5 | pancasila | Bab 3 | [Hak, kewajiban, dan tanggung jawab](http://127.0.0.1:5174/student/lesson/belajar-pancasila-kelas-5-unit-3) | [ ] |
| 5 | pancasila | Bab 4 | [Musyawarah dan alasan yang adil](http://127.0.0.1:5174/student/lesson/belajar-pancasila-kelas-5-unit-4) | [ ] |
| 5 | pancasila | Bab 5 | [Keberagaman budaya](http://127.0.0.1:5174/student/lesson/belajar-pancasila-kelas-5-unit-5) | [ ] |
| 5 | pancasila | Bab 6 | [Menjaga persatuan Indonesia](http://127.0.0.1:5174/student/lesson/belajar-pancasila-kelas-5-unit-6) | [ ] |
| 6 | pancasila | Bab 1 | [Pancasila sebagai pedoman tindakan](http://127.0.0.1:5174/student/lesson/belajar-pancasila-kelas-6-unit-1) | [ ] |
| 6 | pancasila | Bab 2 | [Norma dan tanggung jawab warga](http://127.0.0.1:5174/student/lesson/belajar-pancasila-kelas-6-unit-2) | [ ] |
| 6 | pancasila | Bab 3 | [Musyawarah dan penyelesaian perbedaan](http://127.0.0.1:5174/student/lesson/belajar-pancasila-kelas-6-unit-3) | [ ] |
| 6 | pancasila | Bab 4 | [Menghormati identitas dan keyakinan](http://127.0.0.1:5174/student/lesson/belajar-pancasila-kelas-6-unit-4) | [ ] |
| 6 | pancasila | Bab 5 | [Gotong royong untuk masalah bersama](http://127.0.0.1:5174/student/lesson/belajar-pancasila-kelas-6-unit-5) | [ ] |
| 6 | pancasila | Bab 6 | [Persatuan dan keutuhan wilayah](http://127.0.0.1:5174/student/lesson/belajar-pancasila-kelas-6-unit-6) | [ ] |
| 1 | bahasa-inggris | Bab 1 | [Greetings](http://127.0.0.1:5174/student/lesson/belajar-bahasa-inggris-kelas-1-unit-1) | [ ] |
| 1 | bahasa-inggris | Bab 2 | [My name and feelings](http://127.0.0.1:5174/student/lesson/belajar-bahasa-inggris-kelas-1-unit-2) | [ ] |
| 1 | bahasa-inggris | Bab 3 | [Colours and numbers](http://127.0.0.1:5174/student/lesson/belajar-bahasa-inggris-kelas-1-unit-3) | [ ] |
| 1 | bahasa-inggris | Bab 4 | [Classroom objects](http://127.0.0.1:5174/student/lesson/belajar-bahasa-inggris-kelas-1-unit-4) | [ ] |
| 1 | bahasa-inggris | Bab 5 | [Family words](http://127.0.0.1:5174/student/lesson/belajar-bahasa-inggris-kelas-1-unit-5) | [ ] |
| 1 | bahasa-inggris | Bab 6 | [Simple instructions](http://127.0.0.1:5174/student/lesson/belajar-bahasa-inggris-kelas-1-unit-6) | [ ] |
| 2 | bahasa-inggris | Bab 1 | [Introducing myself](http://127.0.0.1:5174/student/lesson/belajar-bahasa-inggris-kelas-2-unit-1) | [ ] |
| 2 | bahasa-inggris | Bab 2 | [Numbers and colours](http://127.0.0.1:5174/student/lesson/belajar-bahasa-inggris-kelas-2-unit-2) | [ ] |
| 2 | bahasa-inggris | Bab 3 | [Things around us](http://127.0.0.1:5174/student/lesson/belajar-bahasa-inggris-kelas-2-unit-3) | [ ] |
| 2 | bahasa-inggris | Bab 4 | [Family and friends](http://127.0.0.1:5174/student/lesson/belajar-bahasa-inggris-kelas-2-unit-4) | [ ] |
| 2 | bahasa-inggris | Bab 5 | [Animals and actions](http://127.0.0.1:5174/student/lesson/belajar-bahasa-inggris-kelas-2-unit-5) | [ ] |
| 2 | bahasa-inggris | Bab 6 | [Polite expressions](http://127.0.0.1:5174/student/lesson/belajar-bahasa-inggris-kelas-2-unit-6) | [ ] |
| 3 | bahasa-inggris | Bab 1 | [Greetings and introductions](http://127.0.0.1:5174/student/lesson/belajar-bahasa-inggris-kelas-3-unit-1) | [ ] |
| 3 | bahasa-inggris | Bab 2 | [Numbers and classroom language](http://127.0.0.1:5174/student/lesson/belajar-bahasa-inggris-kelas-3-unit-2) | [ ] |
| 3 | bahasa-inggris | Bab 3 | [People and objects](http://127.0.0.1:5174/student/lesson/belajar-bahasa-inggris-kelas-3-unit-3) | [ ] |
| 3 | bahasa-inggris | Bab 4 | [Likes and simple choices](http://127.0.0.1:5174/student/lesson/belajar-bahasa-inggris-kelas-3-unit-4) | [ ] |
| 3 | bahasa-inggris | Bab 5 | [Daily actions](http://127.0.0.1:5174/student/lesson/belajar-bahasa-inggris-kelas-3-unit-5) | [ ] |
| 3 | bahasa-inggris | Bab 6 | [Short spoken messages](http://127.0.0.1:5174/student/lesson/belajar-bahasa-inggris-kelas-3-unit-6) | [ ] |
| 4 | bahasa-inggris | Bab 1 | [Descriptions of people and places](http://127.0.0.1:5174/student/lesson/belajar-bahasa-inggris-kelas-4-unit-1) | [ ] |
| 4 | bahasa-inggris | Bab 2 | [Daily routines](http://127.0.0.1:5174/student/lesson/belajar-bahasa-inggris-kelas-4-unit-2) | [ ] |
| 4 | bahasa-inggris | Bab 3 | [Time expressions](http://127.0.0.1:5174/student/lesson/belajar-bahasa-inggris-kelas-4-unit-3) | [ ] |
| 4 | bahasa-inggris | Bab 4 | [Food and preferences](http://127.0.0.1:5174/student/lesson/belajar-bahasa-inggris-kelas-4-unit-4) | [ ] |
| 4 | bahasa-inggris | Bab 5 | [Simple questions and answers](http://127.0.0.1:5174/student/lesson/belajar-bahasa-inggris-kelas-4-unit-5) | [ ] |
| 4 | bahasa-inggris | Bab 6 | [Short texts with pictures](http://127.0.0.1:5174/student/lesson/belajar-bahasa-inggris-kelas-4-unit-6) | [ ] |
| 5 | bahasa-inggris | Bab 1 | [Describing experiences](http://127.0.0.1:5174/student/lesson/belajar-bahasa-inggris-kelas-5-unit-1) | [ ] |
| 5 | bahasa-inggris | Bab 2 | [Routines and activities](http://127.0.0.1:5174/student/lesson/belajar-bahasa-inggris-kelas-5-unit-2) | [ ] |
| 5 | bahasa-inggris | Bab 3 | [Places and directions](http://127.0.0.1:5174/student/lesson/belajar-bahasa-inggris-kelas-5-unit-3) | [ ] |
| 5 | bahasa-inggris | Bab 4 | [Comparisons in familiar contexts](http://127.0.0.1:5174/student/lesson/belajar-bahasa-inggris-kelas-5-unit-4) | [ ] |
| 5 | bahasa-inggris | Bab 5 | [Reading short informative texts](http://127.0.0.1:5174/student/lesson/belajar-bahasa-inggris-kelas-5-unit-5) | [ ] |
| 5 | bahasa-inggris | Bab 6 | [Writing simple connected sentences](http://127.0.0.1:5174/student/lesson/belajar-bahasa-inggris-kelas-5-unit-6) | [ ] |
| 6 | bahasa-inggris | Bab 1 | [Talking about past activities](http://127.0.0.1:5174/student/lesson/belajar-bahasa-inggris-kelas-6-unit-1) | [ ] |
| 6 | bahasa-inggris | Bab 2 | [Plans in familiar contexts](http://127.0.0.1:5174/student/lesson/belajar-bahasa-inggris-kelas-6-unit-2) | [ ] |
| 6 | bahasa-inggris | Bab 3 | [Descriptions and comparisons](http://127.0.0.1:5174/student/lesson/belajar-bahasa-inggris-kelas-6-unit-3) | [ ] |
| 6 | bahasa-inggris | Bab 4 | [Giving simple instructions](http://127.0.0.1:5174/student/lesson/belajar-bahasa-inggris-kelas-6-unit-4) | [ ] |
| 6 | bahasa-inggris | Bab 5 | [Understanding short narratives](http://127.0.0.1:5174/student/lesson/belajar-bahasa-inggris-kelas-6-unit-5) | [ ] |
| 6 | bahasa-inggris | Bab 6 | [Writing and presenting short texts](http://127.0.0.1:5174/student/lesson/belajar-bahasa-inggris-kelas-6-unit-6) | [ ] |
| 1 | seni-budaya | Bab 1 | [Garis dan bentuk](http://127.0.0.1:5174/student/lesson/belajar-seni-budaya-kelas-1-unit-1) | [ ] |
| 1 | seni-budaya | Bab 2 | [Warna dan bahan aman](http://127.0.0.1:5174/student/lesson/belajar-seni-budaya-kelas-1-unit-2) | [ ] |
| 1 | seni-budaya | Bab 3 | [Menggambar pengalaman](http://127.0.0.1:5174/student/lesson/belajar-seni-budaya-kelas-1-unit-3) | [ ] |
| 1 | seni-budaya | Bab 4 | [Bunyi dan irama sederhana](http://127.0.0.1:5174/student/lesson/belajar-seni-budaya-kelas-1-unit-4) | [ ] |
| 1 | seni-budaya | Bab 5 | [Gerak tubuh dan ruang](http://127.0.0.1:5174/student/lesson/belajar-seni-budaya-kelas-1-unit-5) | [ ] |
| 1 | seni-budaya | Bab 6 | [Bercerita melalui peran](http://127.0.0.1:5174/student/lesson/belajar-seni-budaya-kelas-1-unit-6) | [ ] |
| 2 | seni-budaya | Bab 1 | [Bentuk, warna, dan tekstur](http://127.0.0.1:5174/student/lesson/belajar-seni-budaya-kelas-2-unit-1) | [ ] |
| 2 | seni-budaya | Bab 2 | [Kolase dan cetak sederhana](http://127.0.0.1:5174/student/lesson/belajar-seni-budaya-kelas-2-unit-2) | [ ] |
| 2 | seni-budaya | Bab 3 | [Mengamati karya teman](http://127.0.0.1:5174/student/lesson/belajar-seni-budaya-kelas-2-unit-3) | [ ] |
| 2 | seni-budaya | Bab 4 | [Pola irama](http://127.0.0.1:5174/student/lesson/belajar-seni-budaya-kelas-2-unit-4) | [ ] |
| 2 | seni-budaya | Bab 5 | [Gerak mengikuti irama](http://127.0.0.1:5174/student/lesson/belajar-seni-budaya-kelas-2-unit-5) | [ ] |
| 2 | seni-budaya | Bab 6 | [Ekspresi tokoh sederhana](http://127.0.0.1:5174/student/lesson/belajar-seni-budaya-kelas-2-unit-6) | [ ] |
| 3 | seni-budaya | Bab 1 | [Unsur rupa dalam lingkungan](http://127.0.0.1:5174/student/lesson/belajar-seni-budaya-kelas-3-unit-1) | [ ] |
| 3 | seni-budaya | Bab 2 | [Komposisi dan pola](http://127.0.0.1:5174/student/lesson/belajar-seni-budaya-kelas-3-unit-2) | [ ] |
| 3 | seni-budaya | Bab 3 | [Karya dua dan tiga dimensi](http://127.0.0.1:5174/student/lesson/belajar-seni-budaya-kelas-3-unit-3) | [ ] |
| 3 | seni-budaya | Bab 4 | [Irama dan suara](http://127.0.0.1:5174/student/lesson/belajar-seni-budaya-kelas-3-unit-4) | [ ] |
| 3 | seni-budaya | Bab 5 | [Gerak dan cerita](http://127.0.0.1:5174/student/lesson/belajar-seni-budaya-kelas-3-unit-5) | [ ] |
| 3 | seni-budaya | Bab 6 | [Apresiasi karya dengan bahasa santun](http://127.0.0.1:5174/student/lesson/belajar-seni-budaya-kelas-3-unit-6) | [ ] |
| 4 | seni-budaya | Bab 1 | [Bentuk dan komposisi](http://127.0.0.1:5174/student/lesson/belajar-seni-budaya-kelas-4-unit-1) | [ ] |
| 4 | seni-budaya | Bab 2 | [Teknik dan bahan berkarya](http://127.0.0.1:5174/student/lesson/belajar-seni-budaya-kelas-4-unit-2) | [ ] |
| 4 | seni-budaya | Bab 3 | [Motif dan karya lingkungan](http://127.0.0.1:5174/student/lesson/belajar-seni-budaya-kelas-4-unit-3) | [ ] |
| 4 | seni-budaya | Bab 4 | [Melodi dan irama sederhana](http://127.0.0.1:5174/student/lesson/belajar-seni-budaya-kelas-4-unit-4) | [ ] |
| 4 | seni-budaya | Bab 5 | [Gerak tari dan kerja kelompok](http://127.0.0.1:5174/student/lesson/belajar-seni-budaya-kelas-4-unit-5) | [ ] |
| 4 | seni-budaya | Bab 6 | [Cerita dan permainan peran](http://127.0.0.1:5174/student/lesson/belajar-seni-budaya-kelas-4-unit-6) | [ ] |
| 5 | seni-budaya | Bab 1 | [Rancangan karya dan pesan](http://127.0.0.1:5174/student/lesson/belajar-seni-budaya-kelas-5-unit-1) | [ ] |
| 5 | seni-budaya | Bab 2 | [Eksplorasi bahan dan teknik](http://127.0.0.1:5174/student/lesson/belajar-seni-budaya-kelas-5-unit-2) | [ ] |
| 5 | seni-budaya | Bab 3 | [Karya dari lingkungan](http://127.0.0.1:5174/student/lesson/belajar-seni-budaya-kelas-5-unit-3) | [ ] |
| 5 | seni-budaya | Bab 4 | [Musik dan ekspresi](http://127.0.0.1:5174/student/lesson/belajar-seni-budaya-kelas-5-unit-4) | [ ] |
| 5 | seni-budaya | Bab 5 | [Tari dan pola gerak](http://127.0.0.1:5174/student/lesson/belajar-seni-budaya-kelas-5-unit-5) | [ ] |
| 5 | seni-budaya | Bab 6 | [Teater dan refleksi karya](http://127.0.0.1:5174/student/lesson/belajar-seni-budaya-kelas-5-unit-6) | [ ] |
| 6 | seni-budaya | Bab 1 | [Merancang dan merevisi karya](http://127.0.0.1:5174/student/lesson/belajar-seni-budaya-kelas-6-unit-1) | [ ] |
| 6 | seni-budaya | Bab 2 | [Komposisi dan pilihan teknik](http://127.0.0.1:5174/student/lesson/belajar-seni-budaya-kelas-6-unit-2) | [ ] |
| 6 | seni-budaya | Bab 3 | [Apresiasi dan pameran sederhana](http://127.0.0.1:5174/student/lesson/belajar-seni-budaya-kelas-6-unit-3) | [ ] |
| 6 | seni-budaya | Bab 4 | [Karya musik kelompok](http://127.0.0.1:5174/student/lesson/belajar-seni-budaya-kelas-6-unit-4) | [ ] |
| 6 | seni-budaya | Bab 5 | [Penyajian tari sederhana](http://127.0.0.1:5174/student/lesson/belajar-seni-budaya-kelas-6-unit-5) | [ ] |
| 6 | seni-budaya | Bab 6 | [Pementasan dan refleksi proses](http://127.0.0.1:5174/student/lesson/belajar-seni-budaya-kelas-6-unit-6) | [ ] |

## Berkas dan regenerasi

- src/content/: penulisan orisinal per pelajaran dan penghasil struktur materi/soal.
- src/lib/demoCatalog.js: menggabungkan contoh lama dengan paket draf pada mode demo.
- supabase/curriculum-draft.sql: paket pemasangan database, bukan berkas publik web.
- content/curriculum-manifest.json: daftar aman tanpa kunci jawaban, untuk pencatatan editorial.
- Jalankan npm run content:generate setelah mengubah materi, lalu tes dan build ulang.

Materi/soal draf hanya masuk bundle demo. Build Supabase mengambil konten yang diizinkan database, dan tes build memeriksa bahwa modul src/content serta demoCatalog tidak ikut bundle tersebut.
