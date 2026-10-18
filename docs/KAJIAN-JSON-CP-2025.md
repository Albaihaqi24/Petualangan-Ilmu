# Acuan CP yang dipakai Petualangan Ilmu

Cakupan proyek: enam pelajaran SD kelas 1–6. Bagian JSON yang dipakai adalah capaian Fase A (kelas 1–2), B (3–4), dan C (5–6) dari Lampiran II. Bagian jenjang dan pelajaran lain cukup disimpan pada arsip sumber.

## Enam pelajaran proyek

| Pelajaran aplikasi | Acuan yang digunakan |
| --- | --- |
| Matematika | Fase A, B, C |
| Bahasa Indonesia | Fase A, B, C |
| IPAS / Alam & Sekitar | Fase B, C; kelas 1–2 berlabel pengayaan |
| Pendidikan Pancasila | Fase A, B, C |
| Bahasa Inggris | Fase B, C; kelas 1–2 berlabel pengayaan |
| Seni & Budaya | Fase A, B, C; pilih satu cabang sesuai sekolah: rupa, musik, tari, atau teater |

CP menjelaskan target akhir fase. Isi per bab disusun dari buku siswa dan panduan guru; pembagian kelas/semester disesuaikan dengan ATP sekolah. Rumusan CP tidak otomatis menjadi bab atau bukti materi sudah lengkap.

## Paket yang sedang dikerjakan

[Matematika kelas 1](materi/matematika/kelas-1/README.md) sudah mempunyai delapan bab dan 25 subbab. Hubungan berikut masih usulan dan hanya mencakup sebagian target Fase A (kelas 1–2). Guru perlu menyetujui tujuan dan asesmen sebelum publikasi.

| Bab | Materi | Elemen rujukan |
| --- | --- | --- |
| 1 | Bilangan 0–10 | Bilangan |
| 2 | Penjumlahan hingga 10 | Bilangan; Aljabar |
| 3 | Pengurangan hingga 10 | Bilangan; Aljabar |
| 4 | Bentuk di sekitar kita | Geometri |
| 5 | Bilangan 11–20 | Bilangan |
| 6 | Tambah dan kurang hingga 20 | Bilangan; Aljabar |
| 7 | Mengukur panjang | Pengukuran |
| 8 | Mengelompokkan data dan diagram gambar | Analisis Data dan Peluang |

Urutan pengerjaan berikutnya ada pada [roadmap pendidikan](ROADMAP-PENDIDIKAN.md). Kelompok kelas–pelajaran lain dilengkapi satu per satu sesuai buku/edisinya; 216 ringkasan awal tetap menjadi inventaris draf.

## Cara tampil di aplikasi

- Pilih kelas dan satu pelajaran pada perpustakaan. Acuan CP pendamping tersedia sebagai panel opsional; pilihan buku siswa menyembunyikan panel itu.
- Pada seni, pilih satu cabang sebelum rumusan ditampilkan.
- Pada bahan ajar per bab, panel hanya memuat elemen yang dirujuk bab tersebut.
- Semua hubungan ke bab/unit tetap menunggu review guru; membuka acuan tidak menambah XP atau menerbitkan materi.

## Sumber untuk peninjau dan pengembang

[PDF pemerintah](https://bpmpbabel.kemendikdasmen.go.id/PPID/wp-content/uploads/2025/07/KepKaBSKAP-046_2025-ttg-CP.pdf) dan [data CP SD terpilih](../content/cp-sd-2025.json) menyimpan rumusan serta halaman rujukan. Data terpilih berisi 25 kelompok fase / 109 butir untuk enam pelajaran; empat cabang seni disimpan terpisah agar dapat dipilih.

[Salinan JSON utuh](source/Kepka_BSKAP_046_H_KR_2025.json) dipertahankan sebagai arsip. Nomor dokumen: 046/H/KR/2025. SHA-256: 21cd9cc4916760195c8857b48517b3e3b08e22543709a12edbc9f8ebf2fc0f04.

Catatan sumber yang relevan: heading/terjemahan Inggris Fase C memiliki ketidakkonsistenan; contoh visual Aljabar Fase A tidak tersedia dari ekstraksi teks. Catatan dan teks asli tetap dicatat pada data terpilih; periksa PDF saat menyusun materi terkait.

Pengembang: jalankan `npm run content:cp` untuk menghasilkan ulang data, ringkasan dan referensi bab. Proses ini tidak mengubah cloud atau status review guru.
