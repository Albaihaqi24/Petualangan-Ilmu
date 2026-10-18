# Katalog pengujian black-box

Versi 1.0 — 18 Oktober 2026. **116 kasus rencana**, bukan klaim 116 kasus sudah lulus. Gunakan [lembar eksekusi](TEMPLATE-EKSEKUSI-DAN-BUG.md) untuk actual result dan status. Hasil yang benar-benar dijalankan ada pada [laporan](LAPORAN-2026-10-18.md).

## Petunjuk pelaksanaan

Kode lingkungan: D = demo; C = Supabase staging; P = preview build. Semua kasus memerlukan server aktif dan profil browser khusus QA kecuali dinyatakan lain. Semua data di bawah adalah data rekaan. Prioritas P0/P1/P2 dijelaskan pada [rencana QA](README.md).

Setiap baris memuat prasyarat/data khusus, tindakan berurutan, dan oracle hasil. Bila baris memuat beberapa nilai, eksekusi setiap nilai sebagai subrun, misalnya `BB-010/24-karakter`; catat status masing-masing. Jangan menyimpulkan PASS hanya dari tombol yang terlihat: verifikasi hasil, persistensi, dan tidak adanya efek samping yang disebutkan.

Sediakan lembar jawaban fixture yang disetujui untuk kuis uji. Tester black-box memakai lembar itu sebagai oracle tanpa mengekstrak kunci dari bundle cloud. Pisahkan dataset kuis pertama dan remedial agar XP dapat dihitung tepat.

## A. Server, navigasi, dan konfigurasi

Prasyarat bersama: belum masuk akun; origin utama `http://127.0.0.1:5173`.

| ID | Mode / prioritas | Data dan langkah | Hasil yang diharapkan |
| --- | --- | --- | --- |
| BB-001 | D / P1 | Jalankan `JALANKAN-LOKAL.cmd`; buka URL yang dicetak launcher. | Landing tampil dan navigasi utama bisa digunakan; terminal menunjukkan URL yang sama. |
| BB-002 | D / P1 | Hentikan server QA; muat ulang URL; hidupkan kembali; muat ulang lagi. | Saat server mati koneksi gagal; setelah hidup halaman pulih. `ERR_CONNECTION_REFUSED` tidak diperlakukan sebagai error validasi aplikasi. |
| BB-003 | D / P1 | Jalankan launcher dengan argumen `5174`; buka port itu. | URL launcher dan server sesuai 5174; origin/progres demo terpisah dari 5173. |
| BB-004 | D / P1 | Dengan port sudah dipakai server QA, jalankan instance kedua di port yang sama. | Instance kedua gagal dengan pesan port terpakai; tidak diam-diam pindah port karena `strictPort`. |
| BB-005 | D,C / P1 | Dari landing buka katalog, sumber belajar, login, lalu Back/Forward. | Navigasi sesuai tujuan dan tidak menghasilkan halaman kosong/crash. |
| BB-006 | D,C,P / P1 | Buka `/halaman-tidak-ada-qa`; klik kembali ke beranda. | Halaman fallback aplikasi tampil dan tautan kembali bekerja. HTTP 200 SPA sendiri bukan bukti UI fallback benar. |
| BB-007 | C / P0 | Pada konfigurasi uji, kosongkan URL/key; coba mode asing, URL HTTP, placeholder, secret key. Mulai ulang server setiap perubahan. | Pesan konfigurasi jelas; tidak menampilkan mode demo seolah akun cloud berhasil. Jangan memasukkan secret sungguhan. |
| BB-008 | C,P / P1 | Pada deployment staging, buka langsung dan refresh `/student/progress` sebagai siswa yang sah. | Hosting mengembalikan shell SPA, sesi pulih, halaman yang sesuai tampil; tidak 404 dari hosting. |

## B. Demo, autentikasi, dan hak akses

Prasyarat bersama: browser QA baru. Untuk C gunakan siswa A/B, tutor A/B, admin A dan kotak email uji.

| ID | Mode / prioritas | Data dan langkah | Hasil yang diharapkan |
| --- | --- | --- | --- |
| BB-009 | D / P1 | Masuk demo siswa: nama `Nara QA`, kelas 3, avatar pilihan. | Terbuka `/student`; nama, kelas, dan avatar sesuai. |
| BB-010 | D,C / P1 | Uji nama kosong, hanya spasi, 1 karakter, 24 karakter, 25 karakter. | Nama kosong/spasi ditolak; 1–24 diterima; melebihi 24 dicegah/ditolak tanpa menyimpan nama terlalu panjang. |
| BB-011 | D / P0 | Isi email/password rekaan unik; masuk; periksa penyimpanan dan request aplikasi melalui DevTools. | Kredensial contoh tidak disimpan atau dikirim sebagai autentikasi; profil/progres demo boleh tersimpan. |
| BB-012 | D / P1 | Pilih demo tutor dan demo admin dari halaman login. | Masing-masing masuk ruang yang sesuai; penggantian peran jelas berlabel demo. |
| BB-013 | D,C / P0 | Sebagai tamu buka `/student`, `/tutor`, `/admin`, dan `/account`. | Dialihkan ke login; data privat tidak ditampilkan. |
| BB-014 | D,C / P0 | Siswa membuka `/tutor` dan `/admin`; tutor membuka `/admin`; admin membuka `/student`. | Halaman peran berbeda ditolak dengan jalan kembali; tidak memperoleh data/aksi peran lain. |
| BB-015 | C / P1 | Registrasi siswa dengan email uji baru, password >=8, profil kelas 3. | Layanan menerima permintaan; instruksi verifikasi/sesi sesuai konfigurasi Auth; profil akhir berperan student. |
| BB-016 | C / P1 | Registrasi dengan email rusak dan password 7/8 karakter. | Email rusak dan password <8 dicegah; 8 karakter dapat diteruskan dengan tetap mengikuti kebijakan Auth staging. |
| BB-017 | C / P1 | Registrasi email yang sudah ada; kemudian login salah password. | Kegagalan/instruksi aman dan dapat dipahami; tidak terjadi sesi palsu atau kebocoran password. Respons detail mengikuti konfigurasi Auth. |
| BB-018 | C / P1 | Login akun valid; refresh halaman; tutup/buka tab pada profil yang sama. | Sesi pulih sesuai kebijakan persistensi; data tetap milik akun itu. |
| BB-019 | C / P0 | Logout lalu kunjungi URL privat dan gunakan Back. | Akses privat kembali memerlukan login; data akun lama tidak aktif kembali. |
| BB-020 | C / P1 | Buka lupa password; kirim email uji yang ada dan yang tidak ada. | Pesan netral muncul; untuk akun uji terdaftar email masuk dan link menuju origin staging yang benar. |
| BB-021 | C / P1 | Buka reset tanpa sesi; lalu gunakan link sah dan konfirmasi password berbeda/sama. | Tanpa sesi ada petunjuk; konfirmasi berbeda ditolak; konfirmasi sama yang memenuhi kebijakan berhasil pada akun uji. |
| BB-022 | C / P1 | Buka callback dengan link kedaluwarsa/tidak sah; coba minta link baru. | Ada jalan login/pemulihan dan tidak crash atau memberi sesi yang tidak sah. |
| BB-023 | C / P0 | Siswa A sedang menjawab kuis; lakukan refresh token normal pada sesi uji. | Jawaban sementara tetap ada; submit tetap mengacu akun/sesi kuis yang benar. |
| BB-024 | C / P0 | Perlambat jaringan; mulai request akun A; logout lalu masuk B sebelum respons A selesai. | Respons A tidak menimpa tampilan/data B; hasil kuis A tidak terbuka melalui B. |
| BB-025 | C / P1 | Putus koneksi saat login atau memuat snapshot awal; sambungkan dan pilih Coba lagi. | Pesan gagal dan retry tersedia; loading selesai; retry memulihkan sesi/data yang tepat tanpa login demo otomatis. |

## C. Katalog, sumber belajar, dan materi

Prasyarat bersama: katalog terisi. Untuk C publikasikan hanya fixture yang telah ditinjau. Untuk D siswa kelas 3 kecuali kasus kelas 1.

| ID | Mode / prioritas | Data dan langkah | Hasil yang diharapkan |
| --- | --- | --- | --- |
| BB-026 | D,C / P1 | Filter kelas 1 lalu 6; buka tiap pelajaran yang tersedia. | Daftar cocok dengan kelas/pelajaran; tidak tercampur data kelas sebelumnya. |
| BB-027 | D,C / P1 | Gabungkan kelas, pelajaran, bab, dan pencarian judul fixture. | Hanya materi yang memenuhi seluruh filter yang muncul; reset mengembalikan daftar. |
| BB-028 | D,C / P2 | Cari string yang tidak cocok dengan data apa pun. | Empty state jelas, filter tetap dapat diubah dan tidak crash. |
| BB-029 | D,C / P1 | Sebagai tamu buka `/sumber-belajar`; pilih kelas 1, Matematika, jenis pembaca. | Rujukan sesuai pilihan, label pembaca terlihat, tidak perlu login untuk perpustakaan publik. |
| BB-030 | D,C / P2 | Buka tautan buku resmi dan kembali ke aplikasi. | Tautan menuju sumber yang dicatat; kegagalan sumber eksternal dicatat terpisah dari bug navigasi internal. |
| BB-031 | C / P0 | Sebagai siswa/tamu cari materi draf dan materi pelajaran inactive; coba URL langsung. | Konten yang tidak boleh terbit tidak terbaca melalui UI maupun API yang dipanggil UI. |
| BB-032 | D / P1 | Buka salah satu unit berlabel draf di katalog demo. | Label/status draf jelas; dapat dicoba sebagai demo tanpa menyatakan konten cloud sudah published atau disetujui guru. |
| BB-033 | D,C / P1 | Buka satu materi dengan teks, tips dan gambar sah. | Isi terbaca, urutan blok benar, gambar/alternatif teks tidak merusak layout. |
| BB-034 | D,C / P1 | Buka materi video; amati sebelum klik lalu klik muat video. | Iframe pihak ketiga baru dimuat setelah tindakan pengguna; pemutar sah tampil. |
| BB-035 | C / P0 | Dengan fixture editor, coba skema gambar `javascript:`/`data:`, path `..`, host YouTube tiruan. | Input ditolak atau tidak dirender sebagai sumber aktif; skrip tidak berjalan. |
| BB-036 | D,C / P1 | Buka `/student/lesson/slug-tidak-ada-qa`. | Pesan materi tidak tersedia dan jalan kembali; tidak memuat materi lain sebagai pengganti diam-diam. |
| BB-037 | D / P1 | Dari buku Matematika kelas 1 telusuri delapan bab dan daftar isi subbab. | Delapan navigasi sesuai urutan; keseluruhan 25 subbab dapat diakses tanpa tautan internal rusak. |
| BB-038 | D / P1 | Pada bahan ajar, coba latihan mandiri lalu buka pembahasan dan lanjut kuis. | Pembahasan mandiri awalnya tertutup; dapat dibuka setelah mencoba; kuis mengarah bab yang benar. |
| BB-039 | D,C / P1 | Ubah kelas/pelajaran/bab pada panel CP, termasuk IPAS/Inggris kelas 1–2 dan seni. | Referensi mengikuti pilihan; pengayaan berlabel; seni memakai cabang yang dipilih; tidak mengklaim seluruh CP atau review sudah terpenuhi. |

## D. Kuis, skor, dan XP

Prasyarat bersama: siswa A, saldo awal dicatat, fixture soal 5/10 dengan oracle jawaban. Setiap uji hadiah pertama memakai materi yang belum pernah diselesaikan.

| ID | Mode / prioritas | Data dan langkah | Hasil yang diharapkan |
| --- | --- | --- | --- |
| BB-040 | D,C / P0 | Baca materi baru; tekan selesai membaca; catat XP; ulangi lalu refresh. | +5 XP sekali untuk materi tersebut; pengulangan/refresh tidak menambah hadiah membaca lagi. |
| BB-041 | D,C / P1 | Mulai kuis; catat soal; gunakan Sebelumnya/Selanjutnya. | Ada 5–10 soal sesuai bank; tidak duplikat; pilihan jawaban tetap saat berpindah. |
| BB-042 | D,C / P1 | Kosongkan satu jawaban lalu kumpulkan. | Pengumpulan ditahan, petunjuk mengarah soal kosong, hasil/XP belum diberikan. |
| BB-043 | D,C / P0 | Kuis 5 soal, jawab benar 5 sesuai fixture; kumpulkan sekali. | Skor 100, benar 5/5, hadiah kuis pertama +55; pembahasan sesuai jawaban. Hadiah membaca dihitung terpisah. |
| BB-044 | D,C / P0 | Kuis pertama 5 soal, jawab semuanya salah. | Skor 0, benar 0/5, hadiah kuis pertama +5; hasil tidak menandai jawaban salah sebagai benar. |
| BB-045 | D,C / P0 | Fixture 5 soal benar 3; bila tersedia fixture 6 soal benar 4. | Skor 60 untuk 3/5 dan 67 untuk 4/6; jumlah benar dan denominator konsisten. |
| BB-046 | D,C / P0 | Ulangi kuis materi yang pernah selesai dan peroleh skor >=60. | Tidak memperoleh hadiah utama lagi dan tidak mendapat remedial +3. |
| BB-047 | D,C / P0 | Setelah percobaan pertama, ulangi dengan skor <60; ulangi lagi pada tanggal Jakarta sama, termasuk materi lain yang juga pernah selesai. | Remedial +3 hanya sekali per siswa per tanggal Jakarta secara global, bukan sekali per materi. |
| BB-048 | C / P0 | Pada staging terkendali, uji remedial di 23:59:59 dan 00:00:00 WIB hari berikutnya. | Kuota harian berganti pada tanggal Jakarta; tidak memakai zona perangkat sebagai sumber aturan server. |
| BB-049 | D,C / P0 | Klik kumpulkan berulang cepat; setelah selesai refresh halaman hasil. | Satu percobaan selesai tidak memberi XP berulang; hasil stabil; tombol busy mencegah pengiriman tidak perlu. |
| BB-050 | C / P0 | Mulai kuis; refresh atau buka kembali kuis materi sama sebelum selesai. | Sesi aktif yang sama dilanjutkan selama masih sah; tidak membentuk hadiah pertama ganda. Jawaban lokal yang belum tersimpan hanya dinilai sesuai kontrak UI. |
| BB-051 | C / P0 | Buka sesi fixture yang telah kedaluwarsa 24 jam; coba submit. | Submit kedaluwarsa ditolak dengan instruksi mulai lagi; tidak memberi skor/XP baru. |
| BB-052 | C / P0 | Dengan klien API uji berizin, ganti opsi menjadi -1/4/string/null, ID soal asing/duplikat atau jumlah jawaban kurang. | Server menolak seluruh submit, tidak menyimpan hasil parsial atau menambah XP. |
| BB-053 | C / P0 | Siswa B membuka ID hasil kuis milik A melalui URL/API. | Akses ditolak/tidak tersedia; jawaban, pembahasan dan skor A tidak bocor. |
| BB-054 | C / P0 | Mulai kuis; pantau payload awal dan Data API sebagai siswa. | Respons awal tidak berisi `correct_option`/pembahasan kunci; tabel kunci privat tidak dapat dibaca siswa. Bundle demo tidak dijadikan oracle cloud. |
| BB-055 | C / P1 | Siapkan 20 sesi baru dalam satu jam di staging; minta sesi baru berikutnya, lalu coba melanjutkan sesi aktif sah. | Pembuatan sesi baru melebihi batas ditolak; resume sesi yang memang masih aktif mengikuti kontrak dan tidak menggandakan sesi. |
| BB-056 | C / P0 | Dua tab/klien siswa A mengirim jawaban sama ke attempt yang sama bersamaan; lalu coba jawaban berbeda. | Replay identik menghasilkan hasil yang konsisten dan satu hadiah; perubahan jawaban setelah selesai ditolak. Periksa saldo akhir melalui layanan nyata. |

## E. Profil, progres, dan penyimpanan

| ID | Mode / prioritas | Data dan langkah | Hasil yang diharapkan |
| --- | --- | --- | --- |
| BB-057 | D,C / P1 | Siswa mengubah nama, kelas, dan avatar; simpan; refresh. | Data valid tersimpan dan tampilan/filter mengikuti kelas baru; progres tidak tertukar akun. |
| BB-058 | C / P0 | Coba kirim perubahan profil beserta `role=admin` atau `total_xp` melalui request uji. | Field privilege tidak dapat dinaikkan; saldo/peran tetap otoritatif dari server. |
| BB-059 | D,C / P1 | Siapkan XP 99/100/199/200 melalui fixture yang sah; buka progres. | Level/progress: 1/99, 2/0, 2/99, 3/0; riwayat sesuai aktivitas nyata. |
| BB-060 | D / P1 | Selesaikan bacaan/kuis; reload pada origin sama lalu buka port/origin lain. | Origin sama mempertahankan progres; origin lain tidak otomatis berbagi data demo dan bukan kehilangan data server. |
| BB-061 | D / P1 | Pada profil QA saja, isi localStorage demo dengan JSON rusak, versi lama, atau struktur array salah; reload. | Aplikasi pulih dengan state awal yang valid dan tidak crash. |
| BB-062 | D / P1 | Pada profil QA, blok penyimpanan browser atau simulasi kuota penuh; lakukan aktivitas. | Notice bahwa progres tidak dapat disimpan muncul; halaman tetap dapat digunakan tanpa mengklaim persistensi berhasil. |

## F. Kelas, tugas, dan penilaian

Prasyarat bersama: kelas A/tutor A, kelas B/tutor B, siswa A kelas 3, siswa C kelas 4. Demo menggunakan satu tutor/siswa simulasi; isolasi multiakun harus diuji pada C.

| ID | Mode / prioritas | Data dan langkah | Hasil yang diharapkan |
| --- | --- | --- | --- |
| BB-063 | D,C / P1 | Siswa kelas 3 masukkan kode kelas yang cocok; pada demo gunakan `ILMU03`, lalu variasi huruf kecil/spasi luar. | Bergabung dengan kelas tepat; normalisasi kode sesuai kontrak; keanggotaan tercatat. |
| BB-064 | D,C / P1 | Masukkan kode salah, panjang 5/6/7 karakter, lalu kode kelas tingkat berbeda. | Kode tidak valid atau kelas berbeda ditolak; tidak terjadi keanggotaan salah. |
| BB-065 | D,C / P1 | Gabung kelas yang sama dua kali; refresh. | Tidak ada anggota/keanggotaan duplikat. |
| BB-066 | C / P1 | Lakukan 10 percobaan kode dalam satu jam pada akun uji; lanjut percobaan berikutnya. | Batas percobaan server diterapkan; percobaan kode salah ikut dihitung. |
| BB-067 | D,C / P1 | Tutor membuat kelas bernama valid, kelas 1/6; coba nama kosong/spasi/81 karakter dan tingkat di luar 1–6 lewat request uji. | Data valid tersimpan; data di luar kontrak ditolak. |
| BB-068 | C / P0 | Tutor B membuka anggota/kelas A melalui URL/API; siswa nonanggota melihat tugas A. | Data kelas milik pihak lain tidak tersedia di luar izin yang ditetapkan. |
| BB-069 | D,C / P1 | Tutor A membuat tugas dengan materi published tingkat sama, judul, instruksi, dan tenggat masa depan. | Tugas terlihat untuk anggota kelas A dengan materi serta tanggal yang benar. |
| BB-070 | D,C / P1 | Buat tugas dengan materi tingkat berbeda, kelas tutor lain, judul/instruksi kosong atau tenggat lampau. | Pembuatan ditolak; tidak ada tugas parsial. |
| BB-071 | D,C / P1 | Siswa anggota mengirim jawaban 1 dan 3000 karakter sebelum tenggat. | Jawaban valid tersimpan dan dapat dibaca tutor pemilik. |
| BB-072 | D,C / P1 | Kirim jawaban kosong/spasi/3001 karakter; coba sebagai nonanggota. | Kiriman ditolak dengan alasan sesuai; data lama tidak hilang. |
| BB-073 | D,C / P1 | Kirim setelah tenggat; uji sesaat sebelum dan sesudah batas WIB. | Setelah tenggat ditolak; sebelum tenggat diterima; waktu tampilan dan server konsisten. |
| BB-074 | D,C / P1 | Ubah kiriman yang belum dinilai; lalu ulangi setelah tutor memberi nilai. | Sebelum dinilai dapat diperbarui sesuai tenggat; setelah dinilai jawaban terkunci. |
| BB-075 | D,C / P0 | Tutor A menilai kiriman pertama kali dengan nilai 0 dan 100 pada fixture terpisah, komentar valid. | Nilai dan komentar muncul untuk siswa; hadiah penilaian +15 sekali per kiriman. |
| BB-076 | D,C / P1 | Coba nilai -1/101, komentar kosong/spasi/2001 karakter. | Penilaian tidak valid ditolak tanpa mengubah nilai/XP tersimpan. |
| BB-077 | D,C / P0 | Tutor mengubah nilai dan komentar kiriman yang sudah dinilai; refresh siswa. | Nilai/komentar diperbarui tetapi +15 tidak diulang. |
| BB-078 | C / P0 | Tutor B mencoba menilai kiriman kelas A; siswa B mencoba membaca kiriman A. | Akses ditolak; tidak ada perubahan nilai atau kebocoran jawaban/berkas. |

## G. Admin, impor, dan studio konten

Prasyarat bersama: admin A; fixture impor mengacu lesson ID lingkungan yang benar. Untuk studio cloud sediakan draf milik tutor A dan B.

| ID | Mode / prioritas | Data dan langkah | Hasil yang diharapkan |
| --- | --- | --- | --- |
| BB-079 | D,C / P1 | Validasi lalu simpan JSON valid 1 dan 200 soal. | Ringkasan valid tepat; batch tersimpan satu kali. Cloud menyimpan sebagai draf, bukan langsung terbit. |
| BB-080 | D,C / P1 | Impor CSV dengan BOM, CRLF, koma dalam kutip, kutip ganda, dan newline dalam field. | Field tidak terpecah salah; hasil cocok dengan isi asli. |
| BB-081 | D,C / P1 | Uji JSON rusak, CSV kutip tak tertutup, header hilang, kolom kurang. | Pesan menjelaskan format/baris yang bermasalah; tidak menyimpan sebagian data. |
| BB-082 | D,C / P1 | Batch 0/201 soal; data UTF-8 di atas 512000 byte. | Validasi ukuran/jumlah menolak batch. Batas byte frontend diuji terpisah dari ukuran serialisasi JSONB server. |
| BB-083 | D,C / P1 | Campur satu soal valid dengan ID materi asing, opsi ganda beda kapital/spasi, kunci -1/4/string, atau pembahasan kosong. | Kesalahan terdeteksi; tombol simpan batch tidak menerapkan bagian valid saja; server juga atomik. |
| BB-084 | C / P0 | Kirim ulang batch dengan ID sama sebagai admin sama; lalu ID sama dari actor lain yang berizin. | Replay admin sama tidak menggandakan soal; penggunaan lintas actor tidak mengambil alih batch. |
| BB-085 | C / P0 | Siswa/tutor mencoba RPC impor/publikasi tanpa lewat panel admin. | Ditolak oleh server meskipun UI dilewati. |
| BB-086 | C / P1 | Tutor A membuat draf materi dan lima soal lengkap; simpan dan buka lagi. | Draf tersimpan milik tutor A, editor memuat soal/kunci sesuai izin, belum terlihat siswa. |
| BB-087 | C / P0 | Tutor B mencoba mengubah draf A; tutor A mencoba mengubah materi published di luar izin. | Perubahan terlarang ditolak; isi/status tetap. |
| BB-088 | C / P0 | Admin mencoba publish tanpa konfirmasi review, dengan <5 soal lengkap, atau konten tidak valid. | Publikasi ditahan di UI dan server; tidak menerbitkan materi/soal sebagian. |
| BB-089 | C / P0 | Admin meninjau fixture, konfirmasi review, publish; sebagai siswa cari/buka/kuis; admin unpublish lalu cek lagi. | Materi dan seluruh soal diterbitkan bersama; unpublish menutup akses publik/siswa sesuai status. |
| BB-090 | C / P0 | Admin membuat/mengubah pelajaran aktif, mempromosikan siswa uji menjadi tutor; lihat audit; coba tindakan sama sebagai tutor. | Aksi valid tercatat dan role berubah sesuai izin; tutor tidak dapat mempromosikan atau membaca audit admin. |

## H. Lampiran dan privasi akun

Prasyarat bersama: C, tugas aktif, anggota sah, bucket privat. Ukuran berkas: batas tepat **5242880 byte**; gunakan fixture uji tanpa data pribadi.

| ID | Mode / prioritas | Data dan langkah | Hasil yang diharapkan |
| --- | --- | --- | --- |
| BB-091 | C / P1 | Unggah JPG, PNG, WebP, dan PDF sah masing-masing lalu kirim tugas. | File tersimpan privat dengan nama acak; kiriman menunjuk file yang tepat. |
| BB-092 | C / P1 | Uji file 0 byte, 1 byte yang bertipe didukung, batas 5242880, dan 5242881 byte. | Nol/lebih batas ditolak; batas ukuran tidak menolak file sah. Fixture 1 byte hanya untuk validasi ukuran, bukan bukti format file valid. |
| BB-093 | C / P0 | Coba SVG/HTML/EXE, MIME kosong, ekstensi/MIME tidak selaras. | Jenis di luar allowlist ditolak. Catat kemampuan validasi isi aktual; MIME/ekstensi saja tidak membuktikan pemeriksaan isi berkas. |
| BB-094 | C / P0 | Buka objek tanpa signed URL sebagai tamu; akses file A sebagai B/tutor kelas lain. | Bucket tidak publik; actor tanpa hak tidak dapat mengunduh atau menerbitkan URL sah. |
| BB-095 | C / P0 | Pemilik/tutor sah membuka signed URL segera lalu setelah masa berlaku 60 detik dengan cache dinonaktifkan. | Akses sah awal berhasil; request baru setelah expiry ditolak; cache lama tidak dijadikan bukti token masih aktif. |
| BB-096 | C / P0 | Manipulasi path menjadi user/tugas lain atau mengandung `..`. | Upload/pengaitan/download yang tidak berizin ditolak oleh service/policy server. |
| BB-097 | C / P1 | Putus jaringan setelah upload, sebelum submit; coba kirim ulang atau ganti lampiran. | Error dapat dipulihkan; jawaban tidak diklaim terkirim bila submit gagal; periksa cleanup/orphan dan catat hasil aktual. |
| BB-098 | D / P1 | Buka `/account` pada demo. | Ada penjelasan demo tidak mempunyai akun server; tidak menjalankan penghapusan akun cloud. |
| BB-099 | C / P0 | Pada akun uji, isi konfirmasi selain `HAPUS`, lalu `HAPUS`; kirim ulang. | Konfirmasi salah tidak mengirim; permintaan benar dicatat, status pending terlihat, akun tidak langsung terhapus dan permintaan tidak berulang tanpa kendali. |
| BB-100 | C / P0 | Buka permintaan penghapusan A sebagai B; pada staging disposable jalankan prosedur pemilik untuk penghapusan/restore sesuai panduan. | Permintaan privat; admin melihat antrean; proses terkontrol mencakup Auth/data/file dan memiliki bukti. Pengiriman permintaan saja belum membuktikan penghapusan selesai. |

## I. Visual, aksesibilitas, ketahanan, dan performa

Kasus berikut memerlukan browser/perangkat nyata; happy-dom dan HTTP 200 tidak meluluskannya.

| ID | Mode / prioritas | Data dan langkah | Hasil yang diharapkan |
| --- | --- | --- | --- |
| BB-101 | D,C / P1 | Uji landing, dashboard, materi, kuis, kelas, tutor, admin pada viewport 375×812 dan 412×915. | Teks/tombol tidak tertutup, navigasi dapat diakses, form/tabel dapat dipakai tanpa overflow yang menghalangi. |
| BB-102 | D,C / P1 | Uji desktop 1366×768 dan 1920×1080; zoom 200%. | Konten tetap terbaca dan aksi penting dapat dijangkau; tidak ada overlap penghalang. |
| BB-103 | D,C / P1 | Jalankan alur siswa dengan Tab, Shift+Tab, Enter, Space, dan tombol arah radio/select. | Urutan fokus masuk akal, fokus terlihat, tidak ada keyboard trap; semua aksi inti terjangkau. |
| BB-104 | D,C / P1 | Dengan pembaca layar, periksa label input, avatar, error, status loading dan skor. | Nama kontrol jelas; perubahan penting dapat diketahui tanpa hanya mengandalkan tampilan visual. |
| BB-105 | D,C / P1 | Periksa kontras teks, focus ring, pilihan jawaban dan pesan sukses/error menggunakan alat ukur. | Target usulan: rasio 4.5:1 untuk teks normal dan 3:1 teks besar; hasil ukur dicatat. Target bukan klaim audit WCAG lengkap. |
| BB-106 | D,C / P1 | Jalankan smoke pada Chrome dan Edge desktop serta Chrome Android nyata. | Fungsi inti konsisten; versi browser/OS dicatat; satu browser tidak mewakili semuanya. |
| BB-107 | C / P1 | Simulasikan koneksi lambat lalu offline saat katalog, kuis dan kiriman. | Ada loading/error yang jelas; tidak infinite loading; tidak menampilkan sukses palsu atau menggandakan transaksi setelah retry. |
| BB-108 | C / P0 | Setelah mutasi server sukses, gagalkan refresh snapshot; lalu sambungkan kembali. | Mutasi yang sudah sukses tidak dieksekusi ulang hanya karena refresh gagal; data dapat disinkronkan kembali. |
| BB-109 | C / P0 | Jalankan submit kuis sama dan penilaian sama dari dua klien sah bersamaan pada staging. | Satu efek hadiah per kunci aturan; saldo/hasil akhir konsisten; tidak ada data lintas akun. |
| BB-110 | D,C / P2 | Uji nama/judul panjang, karakter Indonesia, emoji, dan teks mirip HTML pada field yang mengizinkan teks. | Teks tampil aman; batas panjang diterapkan; tidak menjalankan HTML/skrip atau merusak layout. |
| BB-111 | C,P / P1 | Jalankan 5 kali pengukuran landing/dashboard pada profil cold-cache mobile dan catat konfigurasi throttle. | Laporkan median/p95 yang tersedia. Target usulan: LCP <=2.5 dtk, CLS <=0.1; INP <=200 ms memerlukan interaksi/alat yang sesuai. Setujui target sebelum menjadikannya gate. |
| BB-112 | C / P1 | Pada staging disposable, mulai 10 virtual user, naik 25 lalu 50 dengan izin pemilik kapasitas; pantau 10 menit/tahap. | Ukur latensi/error/limit dan saldo benar; target awal usulan error <1%, p95 baca API <2 dtk. Jangan mengeksekusi beban terhadap produksi tanpa ruang lingkup tersendiri. |

## J. Build, konten, dan kesiapan rilis

| ID | Mode / prioritas | Data dan langkah | Hasil yang diharapkan |
| --- | --- | --- | --- |
| BB-113 | D,P / P1 | Build demo; jalankan preview HTTP; buka landing dan alur belajar. | Build selesai; aset termuat; mode sesuai; membuka `file://` bukan prosedur preview yang valid. |
| BB-114 | C,P / P0 | Build Supabase dengan konfigurasi publik uji; audit modul/bank demo dan manifest publik. | DemoContext/dummyData/src-content tidak ikut bundle cloud; manifest publik tidak membawa bank/kunci kuis. Editor berizin tetap boleh menerima kunci melalui kontrak server. |
| BB-115 | C / P1 | Pada database staging disposable, pasang seed/paket buku/draf dua kali dan bandingkan data suntingan. | Seed tetap draf dan idempoten; suntingan yang seharusnya dipertahankan tidak tertimpa. Migration awal yang dipasang ulang harus berhenti secara aman, bukan dianggap seed. |
| BB-116 | D,C / P0 | Peninjau pendidikan memeriksa materi, soal, kunci, pembahasan, sumber, pengayaan, dan kesesuaian CP/ATP sebelum publish. | Ada persetujuan per unit dan catatan revisi; jumlah 260 materi demo/1300 soal bukan bukti seluruh kurikulum telah terpenuhi. |

## Smoke pack yang disarankan

Untuk perubahan kecil: BB-001, 005, 009, 013, 014, 026, 033, 040, 042, 043, 057, 063, 071, 075, 079, 101, 113. Untuk rilis cloud tambahkan BB-018, 019, 024, 031, 052–056, 068, 078, 085, 088–089, 094–096, 099, 108–109, 114, 116. Smoke tidak menggantikan regresi lengkap sebelum rilis besar.
