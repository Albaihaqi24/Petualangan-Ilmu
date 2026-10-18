# Roadmap pendidikan Petualangan Ilmu

Panduan kerja enam pelajaran SD kelas 1–6. Kerjakan satu kelompok kelas–pelajaran sampai selesai, baru lanjut kelompok berikutnya.

**Tambahan 18 Oktober 2026:** [72 bab dari daftar pilihan pengguna](materi/paket-72-bab/README.md) telah dikembangkan untuk Matematika, Bahasa Indonesia, IPA & Sains kelas 1–6, dengan 360 soal kuis serta 216 latihan mandiri berpembahasan. Paket ini dapat dicoba di demo dan mempunyai SQL draf tersendiri. Urutan empat bab adalah rancangan aplikasi, bukan pengganti daftar isi buku/ATP atau bukti kurikulum nasional lengkap. Seluruh bab masih menunggu review guru; IPAS kelas 1–2 berlabel pengayaan dan aspek sosial IPAS memerlukan cakupan tambahan.

**Tempat mencari buku:** [katalog SIBI Kemendikdasmen](https://buku.kemendikdasmen.go.id/katalog). Pilih SD/MI, kelas dan pelajaran, lalu buku siswa serta panduan guru yang sesuai. Catat judul, edisi/tahun, bab/halaman dan tautan detail buku agar setiap paket mempunyai rujukan yang jelas. Jika buku belum ditemukan di SIBI, catat sebagai rujukan yang perlu dilengkapi.

## Cakupan yang dipakai

| Pelajaran | Cakupan |
| --- | --- |
| Matematika | Kelas 1–6, Fase A–C |
| Bahasa Indonesia | Kelas 1–6, Fase A–C |
| Pendidikan Pancasila | Kelas 1–6, Fase A–C |
| IPAS | Kelas 3–6, Fase B–C; kelas 1–2 pengayaan |
| Bahasa Inggris | Kelas 3–6, Fase B–C; kelas 1–2 pengayaan |
| Seni dan Budaya | Kelas 1–6, Fase A–C; pilih cabang sesuai sekolah |

Fase A mencakup kelas 1–2, B kelas 3–4, C kelas 5–6. JSON pemerintah digunakan untuk target capaian yang relevan. Isi dan urutan bab mengikuti buku siswa/panduan guru; guru menyesuaikannya dengan alur tujuan pembelajaran (ATP) sekolah. Jumlah bab tiap buku dapat berbeda.

## Mulai dari paket ini

**Matematika kelas 1:** [delapan bab dan 25 subbab](materi/matematika/kelas-1/README.md) sudah ditulis, dengan 40 soal kuis. Materi masih draf dan menunggu review guru. Pemetaan ke CP Fase A masih usulan serta parsial, karena fase mencakup dua tingkat kelas.

- [x] Sumber CP SD yang relevan dan buku acuan dipisahkan dari dokumen lengkap.
- [x] Paket Matematika kelas 1 tersedia per bab pada dokumentasi dan demo.
- [ ] Guru menyetujui isi, tujuan, latihan dan bukti asesmen delapan bab.
- [ ] Hasil uji pembelajaran serta tampilan HP/desktop dicatat dan diperbaiki.

Sebanyak 216 ringkasan awal kelas 1–6 menjadi inventaris untuk dikembangkan. Setiap paket berikutnya perlu memeriksa daftar isi buku/edisi terlebih dahulu; ringkasan tersebut belum menjadi buku lengkap.

## Urutan pengerjaan sampai rilis

| Langkah | Kerjakan | Hasil yang harus ada |
| --- | --- | --- |
| R01 — Pilih sumber | Pengelola dan guru memilih buku siswa/panduan guru dari katalog SIBI, lalu mencocokkan CP terkait | Judul, kelas, edisi/tahun, bab/halaman dan tautan detail buku tercatat |
| R02 — Tentukan tujuan | Guru menurunkan CP menjadi tujuan pembelajaran dan mengurutkannya dalam ATP | Tujuan, prasyarat, posisi bab dan celah cakupan disetujui; saat ini masih usulan |
| R03 — Tulis bab | Penulis melengkapi semua bab/subbab pada satu paket | Bacaan utuh, contoh bertahap, kegiatan, rangkuman dan sumber |
| R04 — Buat asesmen | Guru memeriksa soal serta menyiapkan tugas keterampilan dan rubrik | Kuis berpembahasan, bantuan, remedial dan bukti praktik sesuai tujuan |
| R05 — Review | Guru memeriksa konsep, bahasa, urutan, media dan jawaban; penulis merevisi | Nama peninjau, tanggal, versi dan keputusan tercatat; belum selesai |
| R06 — Uji coba | Tutor/guru mendampingi uji pembelajaran; pengembang memeriksa HP/desktop | Instruksi mudah dipahami, alur dapat digunakan dan temuan diperbaiki |
| R07 — Lanjut paket | Gunakan pola yang sudah ditinjau untuk kelas/pelajaran berikutnya | Seluruh bab pada tiap paket disetujui dan celah CP ditindaklanjuti |
| R08 — Uji cloud | Pemilik menyiapkan Supabase; pengembang menguji akun/data nyata | Auth, RLS, kuis/XP, kelas/tugas, berkas, konkurensi dan pemulihan lulus |
| R09 — Terbitkan | Admin menerbitkan batch yang disetujui; pemilik melakukan deployment | Domain dan seluruh alur diuji; versi serta prosedur pemulihan tercatat |
| R10 — Rawat | Pengelola/guru memeriksa temuan belajar dan perubahan sumber | Catatan revisi, penanggung jawab dan jadwal pemeriksaan berikutnya |

R08 dapat berjalan sambil peninjauan materi. Publikasi menunggu review, uji pembelajaran, QA perangkat dan layanan nyata. Kode tersedia dan tes lokal sudah lulus; Supabase serta deployment belum dibuat. Jadwal paket berikutnya ditetapkan setelah kecepatan review/revisi paket pertama diketahui.

## Pola isi setiap bab

1. Tujuan belajar dan pengetahuan awal.
2. Penjelasan per subbab dengan contoh bertahap.
3. Kegiatan/praktik sesuai usia serta bantuan pendamping.
4. Latihan mandiri, pembahasan dan tugas keterampilan sesuai pelajaran.
5. Rangkuman, refleksi, remedial/pengayaan dan catatan sumber.

Kuis dan XP membantu latihan; kemampuan berbahasa, penyelidikan IPAS dan karya seni juga memerlukan bukti praktik. Guru menyepakati kriteria ketercapaian tujuan.

## Dokumen saat dibutuhkan

- [Daftar bab Matematika kelas 1](materi/matematika/kelas-1/README.md): paket yang dikerjakan sekarang.
- [Panduan penulisan bahan ajar](PANDUAN-BAHAN-AJAR.md): pola lebih rinci untuk penulis/guru.
- [Peta kurikulum dan sumber](PETA-KURIKULUM-PEMERINTAH.md): rincian per fase/kelas untuk penyusunan paket berikutnya.
- [Panduan teknis](../README.md#delapan-fase-pengerjaan): pemasangan serta pengujian aplikasi.

Rincian roadmap sebelumnya dipertahankan dalam arsip proyek. Untuk pekerjaan harian, gunakan urutan pada halaman ini.
