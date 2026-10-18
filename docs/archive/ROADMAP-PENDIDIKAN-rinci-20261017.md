# Roadmap materi dan rilis Petualangan Ilmu

Versi 17 Oktober 2026. Roadmap ini melanjutkan delapan tahap teknis pada [README](../README.md#delapan-fase-pengerjaan). Cakupan sekarang adalah enam pelajaran aplikasi, kelas 1–6. Agama, PJOK, muatan lokal, dan portal wali terverifikasi berada pada pengembangan berikutnya.

## Hasil yang dituju

**Acuan JSON sudah dipasang:** [kajian CP dari JSON pengguna](KAJIAN-JSON-CP-2025.md) mencatat pilihan 109 butir dalam 25 kelompok mata pelajaran–fase SD dari Lampiran II. Setiap butir memiliki ID dan halaman sumber; empat cabang seni dipisahkan. Buku Matematika kelas 1 memiliki hubungan awal ke elemen CP yang masih berstatus usulan/parsial. JSON memuat target capaian, bukan buku atau modul ajar siap pakai.

**Arah pengerjaan yang diperjelas:** susun bahan ajar utuh per bab/subbab sesuai buku pemerintah yang dipilih. Register 216 unit sebelumnya masih ringkasan awal, bukan 36 buku lengkap. Paket pertama [Matematika kelas 1](materi/matematika/kelas-1/README.md) telah ditulis dalam delapan bab/25 subbab dengan 40 soal kuis; review guru dan pilot menunggu. [Panduan bahan ajar](PANDUAN-BAHAN-AJAR.md) menjelaskan sumber, pola bab, pendampingan dan kriteria belajar.

Pengguna tidak perlu membuat panduan ajar dari nol. Gunakan buku siswa, panduan guru dan CP resmi yang tersedia, lalu sesuaikan dengan ATP sekolah jika sudah ditentukan. Jumlah bab tidak dipaksakan enam. Berikutnya lanjut satu kelompok kelas–pelajaran, periksa daftar isi buku/edisinya dan tulis seluruh bab sebelum menandai penulisannya selesai.

Siswa mendapatkan jalur belajar sesuai fase dan kebutuhan awal, membaca materi yang sudah ditinjau, mencoba kegiatan, menerima umpan balik, dan mengulang bagian yang belum dipahami. Tutor dapat menelusuri setiap unit sampai tujuan pembelajaran, elemen CP, sumber pemerintah, dan bukti asesmennya.

**Dasar acuan:** [Keputusan Kepala BSKAP 046/H/KR/2025](https://bpmpbabel.kemendikdasmen.go.id/PPID/wp-content/uploads/2025/07/KepKaBSKAP-046_2025-ttg-CP.pdf). [Penjelasan Kemendikdasmen 23 Juni 2026](https://www.kemendikdasmen.go.id/siaran-pers/15636-capaian-pembelajaran-baru-telah-terbit-yang-berubah-hanya-mata-pelajaran-agama-dan-budi-pekerti) menyatakan perubahan CP 2026 terbatas pada Agama dan Budi Pekerti; mata pelajaran lain tetap mengacu pada CP 2025.

CP menetapkan capaian akhir fase: A untuk kelas 1–2, B untuk 3–4, C untuk 5–6. Tujuan pembelajaran (TP) menjabarkan kemampuan yang dapat diamati; alur tujuan pembelajaran (ATP) mengurutkannya. Pembagian semester dalam aplikasi adalah rancangan kerja yang perlu disepakati guru/sekolah. Enam bab aplikasi per kelas bukan jumlah bab yang diwajibkan pemerintah.

## Kondisi awal dan ukuran kemajuan

| Komponen | Kondisi saat ini | Ukuran selesai berikutnya |
| --- | --- | --- |
| Isi aplikasi | 216 ringkasan awal, 36 materi lama, 8 bab Matematika kelas 1; demo 260 materi/1.300 soal | Bahan ajar per bab ditulis, terpetakan dan disetujui guru |
| Referensi | 34 metadata buku SIBI; tautan CP, panduan dan contoh Ruang Murid | Edisi, bab/halaman, akses, dan kecocokan setiap unit dicatat |
| Pemetaan | Urutan per kelas adalah usulan; draf belum disahkan guru | Semua elemen CP dalam cakupan memiliki bukti unit/asesmen atau keputusan tindak lanjut |
| Asesmen | Lima pilihan ganda per unit; tugas tutor tersedia | Pengetahuan dan keterampilan diuji dengan bukti yang sesuai |
| Sistem | Implementasi demo/Supabase dan tes lokal tersedia | Auth, RLS, API, Storage, konkurensi dan perangkat nyata lulus |
| Rilis | Cloud dan domain belum aktif | Pilot, review, prosedur operasional dan rilis bertahap lulus |

Pemetaan lengkap berarti seluruh capaian dalam cakupan yang dipilih sudah diperiksa. Tidak ada angka persentase keselarasan atau jumlah unit lulus review yang dinyatakan tanpa catatan peninjau.

## R01 — Kunci sumber dan versi

Penanggung jawab: pengelola konten bersama guru tiap pelajaran. Prasyarat: memilih kurikulum/ATP sekolah sasaran.

1. Buka sumber pada [peta kurikulum](PETA-KURIKULUM-PEMERINTAH.md) dan [daftar buku](SUMBER-MATERI.md).
2. Pilih buku siswa serta panduan guru dengan kelas/edisi yang tepat; catat penulis, tahun, ISBN bila tersedia, bab/halaman, URL, dan tanggal pemeriksaan.
3. Catat kendala akses dan tautan yang berubah. Jangan mengganti judul buku siswa dengan buku guru tanpa label.
4. Simpan keputusan versi pada catatan editorial. Tautkan materi asli; adaptasi teks/gambar memerlukan pemeriksaan hak penggunaan.

- [x] Titik masuk CP, panduan, SIBI, dan contoh sumber belajar pemerintah didokumentasikan.
- [x] JSON 1.691 halaman dipelajari; salinan utuh, sidik sumber, dan 109 butir SD terpilih disimpan.
- [ ] Edisi dan halaman semua rujukan per unit dikunci guru.
- [ ] Tautan buku siswa yang masih kurang ditemukan atau kebutuhan alternatif dicatat.

**Bukti keluar:** register sumber yang dapat ditelusuri. Pemeriksaan metadata tidak berarti seluruh buku sudah dibaca atau media berhasil diputar.

## R02 — Petakan CP → TP → ATP → unit

Penanggung jawab: guru pelajaran; pengembang menyiapkan struktur data. Prasyarat: R01.

1. Baca bagian rasional, elemen, dan capaian fase yang relevan dari dokumen CP.
2. Bandingkan semua unit pada [peta kurikulum](PETA-KURIKULUM-PEMERINTAH.md) dengan CP dan ATP sekolah.
3. Rumuskan TP yang menyebut kemampuan, lingkup, aktivitas, dan bukti yang dapat diamati. Jangan memakai kata “memahami” tanpa indikator.
4. Tentukan prasyarat dan urutan, lalu beri label inti, pengayaan, perlu revisi, atau perlu materi baru.
5. Catat setiap capaian yang belum memiliki materi/asesmen. Tutup celah tersebut sebelum menyatakan cakupan fase lengkap.

- [x] Register 216 unit dan rancangan urutan kelas/semester tersedia.
- [x] Register menunjuk ID kelompok CP; delapan bab Matematika kelas 1 diberi rujukan elemen usulan tanpa mengisi persetujuan guru.
- [ ] Nomor/bagian CP, TP, ATP, prasyarat dan bukti asesmen setiap unit disetujui guru.
- [ ] Seluruh celah cakupan dicatat dan diberi tindak lanjut.

**Bukti keluar:** matriks yang menghubungkan capaian dengan unit serta asesmen. Hubungan yang dibuat pengembang tetap berstatus usulan sampai ditinjau.

## R03 — Perbaiki dan lengkapi isi

Penanggung jawab: penulis konten dan guru. Prasyarat: temuan R02.

1. Dahulukan celah fase dasar: literasi awal, konsep bilangan, serta keterampilan proses yang menjadi prasyarat.
2. Susun penjelasan orisinal, contoh bertahap, latihan dengan data berbeda, kegiatan aman, rangkuman dan refleksi.
3. Periksa batas bilangan, operasi, satuan dan konsep agar tidak terlalu dini atau melebihi tujuan tanpa label pengayaan.
4. Tambahkan bacaan utuh, naskah/audio simakan, dialog, LKPD pengamatan, atau tugas karya sesuai kompetensi; bukan hanya definisi dan pengenalan istilah.
5. Simpan sumber serta riwayat revisi. Pertahankan status draf sampai lolos peninjauan.

- [x] Struktur bacaan/contoh/aktivitas/rangkuman/refleksi dan lima soal tersedia pada 216 draf.
- [ ] Kedalaman, kelengkapan konsep dan urutan sesuai hasil pemetaan diperbaiki.
- [ ] Teks/audio/gambar pendukung yang diperlukan sudah tersedia dan dapat digunakan.

**Bukti keluar:** isi unit memenuhi TP dan catatan sumber, tanpa mengandalkan judul/topik sebagai bukti kecocokan.

## R04 — Lengkapi asesmen dan diferensiasi

Penanggung jawab: guru; pengembang menghubungkan tugas dan umpan balik. Prasyarat: TP R02 dan isi R03.

| Pelajaran | Bukti belajar tambahan yang diperlukan |
| --- | --- |
| Matematika | Penyelesaian masalah, penggunaan benda/model, dan penjelasan alasan |
| Bahasa Indonesia | Simakan, membaca teks, berbicara/menyajikan, serta tulisan dengan revisi |
| IPAS | Pertanyaan, pengamatan/data, penjelasan berbasis bukti, dan laporan/refleksi |
| Pendidikan Pancasila | Tanggapan pada situasi, musyawarah, kerja sama dan refleksi tindakan |
| Bahasa Inggris | Menyimak/merespons, dialog, membaca/memirsa, dan teks/presentasi sederhana |
| Seni dan Budaya | Proses eksplorasi, karya/penampilan, apresiasi dan refleksi sesuai cabang |

Siapkan pemeriksaan awal singkat, contoh untuk murid yang memerlukan bantuan, kegiatan mandiri, latihan lanjutan, dan remedial. Sediakan alternatif jawaban lisan/tertulis sesuai kebutuhan; jangan mewajibkan perekaman wajah anak untuk membuktikan tugas.

**Rancangan rubrik internal:** skor 1 membutuhkan pendampingan penuh; 2 mulai menunjukkan kemampuan dengan banyak bantuan; 3 menunjukkan kemampuan sesuai TP dengan sedikit bantuan; 4 menunjukkan kemampuan dan dapat menjelaskan pilihannya. Guru menyesuaikan indikator per tugas. Ini usulan aplikasi, bukan batas ketuntasan nasional. Jika perlu nilai 0–100, tetapkan konversi bersama guru dan catat; XP tidak dipakai sebagai nilai akademik.

- [ ] Pemeriksaan awal dan strategi bantuan/pengayaan tersedia untuk setiap unit.
- [ ] Pilihan ganda memiliki satu jawaban tepat, pengecoh masuk akal dan pembahasan.
- [ ] Keterampilan praktik memiliki tugas, rubrik dan contoh bukti yang layak.
- [ ] Kriteria ketercapaian TP disepakati guru; tidak ada skor kelulusan nasional yang dibuat aplikasi.

## R05 — Review enam unit percontohan

Penanggung jawab: guru masing-masing pelajaran dan pengelola. Prasyarat: R01–R04.

Pilih satu unit inti per pelajaran pada kelas yang memiliki rujukan memadai. Untuk Bahasa Inggris/IPAS gunakan kelas 3–6. Untuk Seni pilih satu cabang yang diselenggarakan sekolah. Enam unit ini menjadi standar mutu; bukan bukti semua kelas sudah selesai.

1. Peninjau memeriksa konsep, bahasa, inklusivitas, keamanan kegiatan, sumber, kunci/pembahasan, dan kesesuaian TP.
2. Penulis memperbaiki temuan; guru memeriksa ulang.
3. Catat nama/role peninjau, tanggal, versi, temuan dan keputusan: revisi atau layak uji coba.

- [ ] Enam unit percontohan lolos review dengan bukti tertulis.
- [ ] Minimal satu contoh tugas praktik dan rubrik per pelajaran disetujui.
- [ ] Tidak ada temuan kritis terbuka pada unit yang akan diuji.

## R06 — Uji coba pembelajaran dan aksesibilitas

Penanggung jawab: guru/tutor dan pengembang. Prasyarat: unit R05, persetujuan pengelola serta wali untuk pelibatan anak.

Uji dalam kelompok kecil dengan pendamping. Amati apakah instruksi dipahami, waktu cukup, contoh membantu, dan umpan balik dapat ditindaklanjuti. Catat kesalahan konsep yang muncul; jangan menyimpulkan efektivitas hanya dari XP atau skor kuis. Gunakan data minimum dan hasil ringkas tanpa identitas anak pada laporan terbuka.

- [ ] Instruksi, bacaan, tugas dan umpan balik diuji bersama pengguna sasaran.
- [ ] HP 375/412 px dan desktop: teks, keyboard, fokus, sentuhan, media serta gulir horizontal diperiksa.
- [ ] Audio/video memiliki alternatif yang diperlukan; koneksi lambat dan keadaan kosong/gagal ditangani.
- [ ] Temuan prioritas diperbaiki dan diuji ulang.

## R07 — Perluas review ke seluruh kelas

Penanggung jawab: guru per fase/pelajaran dan pengelola konten. Prasyarat: standar mutu R05–R06 stabil.

Kerjakan per kelompok kelas–pelajaran; tidak perlu menerbitkan 216 draf sekaligus. Dahulukan unit fondasi dan prasyarat, lalu keterampilan penerapan dan proyek. [Checklist 216 unit](MATERI-SIAP-REVIEW.md) dan [peta sumber](PETA-KURIKULUM-PEMERINTAH.md) menjadi register kerja.

- [ ] Fase A: literasi, numerasi, Pancasila, seni yang dipilih; IPAS/Inggris berlabel pengayaan.
- [ ] Fase B: keenam pelajaran, tugas keterampilan dan remedial sesuai tujuan.
- [ ] Fase C: keenam pelajaran, penalaran/penerapan, portofolio dan refleksi.
- [ ] Semua capaian dalam cakupan sudah diperiksa; tambahan unit dibuat bila enam bab awal belum cukup.

**Bukti keluar:** setiap unit yang akan dipublikasikan memiliki persetujuan guru; seluruh temuan cakupan mempunyai tindak lanjut. Materi lama 36 unit juga wajib direview atau dikeluarkan dari katalog rilis.

## R08 — Aktifkan dan uji layanan nyata

Penanggung jawab: pemilik proyek dan pengembang. Dapat menyiapkan cloud sambil review berjalan; publikasi tetap menunggu persetujuan unit.

1. Buat proyek Supabase uji; pasang empat migration, seed dan paket draf sesuai [panduan operasional](OPERASIONAL.md).
2. Isi konfigurasi publik lokal; uji registrasi, konfirmasi, sesi, pemulihan dan proteksi peran.
3. Uji dua siswa, dua tutor dan admin: isolasi data, kunci kuis, XP sekali, kelas/tugas, berkas privat, signed URL, impor dan audit.
4. Uji submit bersamaan, replay, koneksi terputus, tenggat, backup/restore dan penghapusan data.

- [ ] Seluruh pemeriksaan cloud memiliki catatan hasil pada proyek uji.
- [ ] Prosedur data anak, pengelola, retensi dan pemulihan disiapkan.
- [ ] Source/bundle rilis tidak memuat bank soal/kunci demo atau rahasia server.

## R09 — Publikasikan bertahap

Penanggung jawab: admin konten, pemilik proyek dan guru. Prasyarat: unit lolos R05/R07, pilot R06, layanan R08 dan QA.

Publikasikan hanya batch yang lolos review. Admin memeriksa bahwa konfirmasi review sesuai catatan guru. Deploy mode Supabase, uji login dan refresh rute pada domain publik, lalu lakukan uji alur siswa/tutor/admin. Siapkan cara menarik materi bermasalah, kembali ke versi sebelumnya, dan menghubungi pengelola.

- [ ] Daftar unit terbit, versi, sumber, peninjau dan tanggal tercatat.
- [ ] Domain, email, media, unggahan privat, rute dan perangkat sasaran diuji.
- [ ] Tidak ada masalah akses/kunci/XP atau temuan pembelajaran kritis terbuka.
- [ ] Pemilik menandatangani keputusan rilis berdasarkan bukti.

## R10 — Evaluasi dan pemeliharaan

Penanggung jawab: pengelola produk dan guru. Prasyarat: pilot/layanan sudah digunakan.

Tinjau keterbacaan dan pola salah per unit, kualitas umpan balik, gangguan teknis, serta ketercapaian TP dari tugas dan kuis. Utamakan perbaikan yang paling membantu belajar; jumlah klik bukan ukuran tunggal. Periksa tautan sumber, edisi buku dan pembaruan CP secara berkala serta saat pemerintah menerbitkan perubahan.

- [ ] Ada siklus review konten dan pemeriksaan sumber yang dijadwalkan pengelola.
- [ ] Laporan masalah dan perubahan materi memiliki penanggung jawab.
- [ ] Unit yang berubah kembali menjadi draf dan ditinjau sebelum terbit ulang.
- [ ] Pengembangan berikutnya memiliki spesifikasi tersendiri: wali terverifikasi, tambahan pelajaran/cabang seni, dan akses luring.

## Urutan pelaksanaan dan kapasitas

R01 → R02 → R03/R04 → R05 → R06 → R07 → R09; R08 dapat berjalan sejajar setelah desain konten/data stabil. R10 berjalan setelah pilot dan berlanjut setelah rilis. Dependensi dan mutu menentukan perpindahan tahap.

Jadwal kalender ditetapkan sesudah tersedia guru peninjau dan hasil pilot. Ukur lama review/revisi enam unit percontohan, lalu estimasikan per kelompok dengan menyertakan revisi serta uji ulang. Tidak ada janji seluruh 216 unit selesai dalam delapan atau sepuluh hari hanya karena kode aplikasi sudah tersedia.

## Kartu kerja yang disalin untuk tiap unit

```text
ID unit / kelas / fase / pelajaran / cabang seni:
Status: draf | perlu revisi | layak uji | disetujui | terbit | ditarik
Dokumen CP / bagian-elemen / halaman PDF:
TP dan indikator yang dapat diamati:
Posisi ATP / semester usulan / prasyarat:
Buku dan edisi / bab-halaman / URL / tanggal akses:
Aktivitas / bantuan / pengayaan / remedial:
Asesmen / kunci-pembahasan / rubrik / kriteria ketercapaian:
Hak penggunaan media / alternatif akses:
Temuan / revisi / versi:
Guru peninjau / tanggal / keputusan:
Bukti uji pembelajaran dan UI / tindak lanjut:
Admin publikasi / tanggal / versi rilis:
```

## Pekerjaan terdekat

1. Tinjau paket delapan bab Matematika kelas 1 dan gunakan struktur bahan ajar untuk kelompok berikutnya; register 216 unit menjadi inventaris awal.
2. Guru menetapkan enam unit percontohan, CP/TP dan ATP yang dipakai.
3. Tutup celah materi/asesmen percontohan sebelum pilot.
4. Siapkan Supabase uji dan lakukan QA nyata; centang hanya berdasarkan bukti yang benar-benar tersedia.
