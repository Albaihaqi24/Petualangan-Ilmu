// Empat butir baru per bab: dua penerapan dan dua penalaran/visual.
// Dua butir easy diambil dari naskah bab orisinal yang sudah tersedia.
const q = (prompt, answer, wrong, explanation) => ({
  prompt,
  answer: String(answer),
  wrong: wrong.map(String),
  explanation,
})
const entry = (subject, grade, chapter, opening, visual, medium, hard) => ({
  subject,
  grade,
  chapter,
  opening,
  visual,
  medium,
  hard,
})
export const adaptiveSeedUnits = [
  entry(
    'matematika',
    1,
    1,
    'Kapten Rubi menyiapkan kartu untuk teman-teman di dermaga Numeria. Kartu berserakan membuatnya ragu apakah semua teman sudah mendapat satu. Yuk, susun dan hitung tanpa melewatkan kartu!',
    'Model kelompok: satu bingkai sepuluh penuh dan empat titik lepas menyatakan 14. Benda yang sama dipindah susunannya tetap berjumlah sama.',
    [
      q(
        'Rubi mempunyai satu ikatan berisi 10 kartu dan 7 kartu lepas. Banyak kartu semuanya …',
        17,
        [7, 10, 16],
        'Satu kelompok sepuluh dan tujuh satuan menyatakan 17 kartu.',
      ),
      q(
        'Label kursi berturut-turut 12, 13, 14, … . Label kursi berikutnya adalah …',
        15,
        [11, 14, 16],
        'Urutan bertambah satu; sesudah 14 adalah 15.',
      ),
    ],
    [
      q(
        'Data gambar: A = ●●●●● ●●●●●; B = ●●●●● ●●●●● ●●●. Pernyataan tepat …',
        'B mempunyai 3 benda lebih banyak',
        ['A lebih banyak 3', 'Keduanya 10', 'B hanya mempunyai 3'],
        'A berisi 10, B berisi 13; pasangkan sepuluh dan tersisa tiga pada B.',
      ),
      q(
        'Ada 18 kartu tersusun satu baris. Kartu yang sama disusun menjadi dua baris tanpa ditambah/diambil. Jumlahnya …',
        18,
        [9, 20, 36],
        'Mengubah susunan tidak mengubah banyak kartu. Dua baris tidak berarti jumlah otomatis dibagi dua.',
      ),
    ],
  ),
  entry(
    'matematika',
    1,
    2,
    'Keranjang Rubi mula-mula berisi buah. Sebagian buah datang dari kebun, sebagian diberikan kepada teman. Ia ingin tahu kapan perlu menggabungkan dan kapan perlu mencari sisa.',
    'Gambar bagian-keseluruhan: 6 kartu merah + 4 kartu biru = 10 kartu. Pada pengurangan, tandai kartu yang dipindah dan hitung yang masih ada.',
    [
      q(
        'Di piring ada 8 kue. Rubi menambahkan 5 kue. Sekarang ada … kue.',
        13,
        [3, 12, 14],
        'Gabungkan kedua kelompok: 8 + 5 = 13 kue.',
      ),
      q(
        'Ada 17 pensil, lalu 6 dipinjam teman. Pensil yang masih ada …',
        11,
        [6, 12, 23],
        'Yang ditanyakan sisa, sehingga 17 − 6 = 11 pensil.',
      ),
    ],
    [
      q(
        'Tabel kartu: awal 9, datang 4, diberikan 3. Banyak kartu akhir adalah …',
        10,
        [8, 13, 16],
        'Ikuti dua kejadian: 9 + 4 = 13, lalu 13 − 3 = 10.',
      ),
      q(
        'Model: kotak berisi ? benda + 5 benda = 12 benda. Isi kotak adalah …',
        7,
        [5, 12, 17],
        'Cari bagian yang hilang: 12 − 5 = 7. Periksa 7 + 5 = 12.',
      ),
    ],
  ),
  entry(
    'matematika',
    2,
    1,
    'Rubi menata persediaan menjadi kotak seratus, ikatan sepuluh, dan benda satuan. Sebuah label kehilangan angka nol. Bagaimana memastikan nilai tempatnya tidak tertukar?',
    'Tabel nilai tempat: Ratusan | Puluhan | Satuan = 4 | 0 | 7, sehingga bilangan 407. Nol menjaga tempat puluhan yang kosong.',
    [
      q(
        'Gudang mempunyai 3 kotak seratus, 2 ikatan sepuluh dan 6 kartu satuan. Banyak kartu …',
        326,
        [362, 236, 306],
        'Gabungkan nilai tempat 300 + 20 + 6 = 326.',
      ),
      q(
        'Pada nomor rak 504, angka 5 menyatakan … kartu.',
        500,
        [5, 50, 54],
        'Angka 5 berada di tempat ratusan, sehingga nilainya 500.',
      ),
    ],
    [
      q(
        'Tabel pesanan: A=4 ratusan,2 puluhan,8 satuan; B=4 ratusan,8 puluhan,2 satuan. Pernyataan tepat …',
        'B lebih besar daripada A',
        ['A lebih besar', 'Sama karena angkanya sama', 'A=482 dan B=428'],
        'A=428 dan B=482. Ratusan sama, tetapi puluhan B lebih besar.',
      ),
      q(
        'Rubi menulis 6 ratusan + 0 puluhan + 9 satuan menjadi 69. Perbaikannya …',
        '609, karena nol menjaga tempat puluhan',
        ['690, karena satuan harus nol', '69 sudah benar', '6009, karena nol ditambah sembarang'],
        '600 + 0 + 9 = 609. Menghapus nol menjadikan 6 bernilai puluhan, bukan ratusan.',
      ),
    ],
  ),
  entry(
    'matematika',
    2,
    2,
    'Toko Rubi menerima dua kiriman buku dan meminjamkan sebagian. Ia menyusun angka agar satuan bertemu satuan, lalu menukar sepuluh satuan menjadi satu puluhan ketika diperlukan.',
    'Model kolom: R | P | S. Saat 8+7=15, tulis lima satuan dan pindahkan satu puluhan ke kolom P; jumlah benda tidak berubah.',
    [
      q(
        'Perpustakaan mempunyai 168 buku dan menerima 127 buku. Jumlah sekarang …',
        295,
        [285, 2915, 305],
        '8+7=15, simpan satu puluhan; 6+2+1=9 puluhan; ratusan 1+1=2.',
      ),
      q(
        'Ada 352 kartu, sebanyak 136 dibagikan. Sisa kartu …',
        216,
        [224, 226, 488],
        'Tukar satu puluhan: 12−6=6, 4−3=1 puluhan, 3−1=2 ratusan.',
      ),
    ],
    [
      q(
        'Tabel stok: awal 240; masuk 85; keluar 126. Stok akhir …',
        199,
        [189, 209, 451],
        '240+85=325; 325−126=199. Dua tahap harus mengikuti catatan.',
      ),
      q(
        'Siswa menghitung 203−118 dengan membalik angka tiap kolom sehingga mendapat 115. Penjelasan tepat …',
        'Hasilnya 85; perlu pengelompokan ulang',
        ['115 benar karena 8−3=5', 'Hasilnya 321 karena tambah', 'Hasilnya 95 tanpa pertukaran'],
        '203 dapat ditukar menjadi 1 ratusan 9 puluhan 13 satuan; 13−8=5, 9−1=8, 1−1=0.',
      ),
    ],
  ),
  entry(
    'matematika',
    3,
    1,
    'Kapal Numeria membawa buku untuk dua pos belajar. Rubi mencatat stok awal, kiriman dan buku keluar. Ia perlu menjaga nilai tempat serta memeriksa dua langkah hitungnya.',
    'Garis stok: 500 → tambah 120 → kurangi 75. Tulis makna setiap hasil antara sebelum memilih jawaban akhir.',
    [
      q(
        'Ada 475 buku lalu datang 218 buku. Total buku …',
        693,
        [683, 703, 793],
        '475+218=693, dengan satu puluhan dari 5+8=13.',
      ),
      q(
        'Dari 900 stiker, 365 dibagikan. Sisa …',
        535,
        [545, 635, 565],
        '900−365=535. Periksa 535+365=900.',
      ),
    ],
    [
      q(
        'Tabel gudang: awal 650; masuk 175; keluar 280. Saldo akhir …',
        545,
        [435, 555, 825],
        '650+175=825; kurangi 280 menjadi 545. Jangan berhenti pada saldo setelah kiriman.',
      ),
      q(
        'Setelah menerima 120 buku dan meminjamkan 85, rak berisi 435 buku. Stok awal adalah …',
        400,
        [350, 470, 640],
        'Balik urutan kejadian: 435+85−120=400; periksa 400+120−85=435.',
      ),
    ],
  ),
  entry(
    'matematika',
    3,
    2,
    'Rubi menyiapkan paket dengan isi yang sama. Ia dapat menghitung satu per satu, tetapi susunan baris dan kolom akan membantunya menjelaskan perkalian dengan lebih cepat.',
    'Susunan 4 baris × 5 titik berisi 20 titik. Membaginya menjadi dua blok masing-masing 2 baris tidak mengubah jumlah seluruhnya.',
    [
      q(
        'Ada 7 piring, masing-masing berisi 4 kue. Jumlah kue …',
        28,
        [11, 24, 32],
        'Tujuh kelompok empat ditulis 7×4=28 kue.',
      ),
      q(
        'Rubi menata 6 baris kursi dengan 8 kursi tiap baris. Jumlah kursi …',
        48,
        [14, 42, 56],
        '6×8=48, bukan 6+8, karena setiap baris berisi delapan.',
      ),
    ],
    [
      q(
        'Diagram kursi: 5 baris, tiap baris 6 kursi. Dua baris ditutup. Kursi yang masih dipakai …',
        18,
        [12, 24, 30],
        'Sisa 5−2=3 baris; 3×6=18 kursi.',
      ),
      q(
        'Paket A: 4 kantong × 9 kartu. Paket B: 6 kantong × 6 kartu. Perbandingan total …',
        'Sama-sama 36 kartu',
        ['A lebih banyak 3', 'B lebih banyak 2', 'A=13 dan B=12'],
        '4×9=36 dan 6×6=36. Kelompok berbeda dapat mempunyai total sama.',
      ),
    ],
  ),
  entry(
    'matematika',
    4,
    1,
    'Dua lampu pelabuhan berkedip dengan selang berbeda, sementara Rubi membagi pensil dan penghapus menjadi paket identik. Apakah kedua masalah memakai cara yang sama?',
    'Daftar faktor untuk paket; garis kelipatan untuk jadwal. Contoh faktor 12: 1,2,3,4,6,12; kelipatan positif 4: 4,8,12,16.',
    [
      q(
        '18 pensil dan 24 penghapus dibagi menjadi paket identik terbanyak tanpa sisa. Banyak paket …',
        6,
        [3, 8, 12],
        'FPB 18 dan 24 adalah 6; setiap paket berisi 3 pensil dan 4 penghapus.',
      ),
      q(
        'Lampu A berkedip tiap 4 detik, B tiap 6 detik, mulai bersama. Bersama lagi setelah … detik.',
        12,
        [2, 10, 24],
        'KPK positif 4 dan 6 adalah 12.',
      ),
    ],
    [
      q(
        'Tabel rancangan paket untuk 20 kartu merah dan 30 biru: A=5 paket, B=10, C=15. Pilihan paket identik terbanyak tanpa sisa …',
        'B, karena 10 membagi kedua jumlah',
        ['C, karena 15 paling besar', 'A pasti maksimum', 'Semua pilihan habis membagi'],
        'FPB 20 dan 30=10. Lima juga dapat, tetapi bukan maksimum; lima belas tidak membagi 20.',
      ),
      q(
        'Jadwal A setiap 3 hari dan B setiap 4 hari mulai bersama hari ke-0. Tabel pertemuan yang benar …',
        'Hari 12, 24, 36',
        ['Hari 7, 14, 21', 'Hari 3, 6, 9', 'Hari 4, 8, 16'],
        'KPK 3 dan 4 adalah 12; pertemuan berikutnya kelipatan dua belas.',
      ),
    ],
  ),
  entry(
    'matematika',
    4,
    2,
    'Resep Numeria menuliskan bagian bahan dengan pecahan, desimal dan persen. Rubi ingin memastikan tiga label berbeda benar-benar menyatakan bagian yang sama dari satu keseluruhan.',
    'Petak 10×10: 50 petak diwarnai = 50/100 = 0,50 = 50% = 1/2. Besar keseluruhan harus disebutkan.',
    [
      q(
        'Resep memakai 3/4 liter air. Pada gelas desimal, nilainya … liter.',
        '0,75',
        ['0,34', '0,25', '3,4'],
        '3/4=75/100=0,75 liter.',
      ),
      q(
        'Dari 80 kartu, 20 berwarna merah. Bagian merah adalah …',
        '25%',
        ['20%', '40%', '75%'],
        '20/80=1/4=25/100=25%.',
      ),
    ],
    [
      q(
        'Tabel label: A=0,5; B=50%; C=1/4. Label yang setara …',
        'A dan B',
        ['A dan C', 'B dan C', 'Semua setara'],
        '0,5=1/2=50%, sedangkan 1/4=25%.',
      ),
      q(
        'Kotak A berisi 20 kartu, 50% merah. Kotak B berisi 40 kartu, 25% merah. Banyak merah …',
        'Sama, masing-masing 10',
        ['A dua kali B', 'B dua kali A', 'Tidak dapat dihitung'],
        '50%×20=10 dan 25%×40=10. Persen berbeda dapat memberi banyak sama jika total berbeda.',
      ),
    ],
  ),
  entry(
    'matematika',
    5,
    1,
    'Dua potong pita untuk hiasan kapal memakai pecahan berbeda. Rubi harus menyamakan ukuran bagian sebelum menjumlahkan; menjumlah angka penyebut begitu saja akan mengubah maknanya.',
    'Pita satuan sama: 1/2=3/6 dan 1/3=2/6. Setelah satuan bagian sama, pembilang dapat dijumlah.',
    [
      q(
        'Pita merah 1/2 m dan biru 1/4 m disambung. Panjang total … m.',
        '3/4',
        ['2/6', '1/4', '1'],
        '1/2=2/4, lalu 2/4+1/4=3/4 m.',
      ),
      q(
        'Ada 5/6 liter jus, diminum 1/4 liter. Sisanya … liter.',
        '7/12',
        ['4/2', '1/2', '11/12'],
        '5/6=10/12 dan 1/4=3/12; selisih 7/12 liter.',
      ),
    ],
    [
      q(
        'Tabel cara 1/2+1/3: A=2/5; B=5/6; C=1/6. Cara yang benar …',
        'B, dengan satuan perenam',
        ['A, cukup tambah semua angka', 'C, cukup kurangi pembilang', 'Semua sama'],
        'Ubah ke 3/6+2/6=5/6. Penyebut menunjukkan ukuran bagian dan tidak dijumlah langsung.',
      ),
      q(
        'Pita awal 2 m. Dipakai 3/4 m lalu 2/3 m. Panjang sisa … m.',
        '7/12',
        ['17/12', '1/12', '5/6'],
        '24/12−9/12−8/12=7/12. Hitung kedua pemakaian sebelum menyatakan sisa.',
      ),
    ],
  ),
  entry(
    'matematika',
    5,
    2,
    'Rubi membagi jus ke gelas kecil dan mencari sebagian dari sisa kue. Mengambil sebagian berbeda dari menghitung berapa gelas yang dapat diisi. Mari modelkan kedua makna itu.',
    'Dua liter memuat delapan bagian seperempat liter: 2÷1/4=8. Sebaliknya seperempat dari dua liter adalah 1/2 liter.',
    [
      q(
        'Ada 3 liter jus. Setiap gelas berisi 1/4 liter. Banyak gelas penuh …',
        12,
        [3, 6, 8],
        'Setiap liter memuat empat gelas seperempat liter. Tiga liter memuat 3÷1/4=3×4=12 gelas.',
      ),
      q(
        'Rubi memakai 2/3 dari pita sepanjang 3/4 m. Panjang yang dipakai … m.',
        '1/2',
        ['2/7', '3/8', '5/7'],
        'Mengambil dua pertiga dari tiga perempat berarti mengalikan: 2/3×3/4=6/12=1/2 m.',
      ),
    ],
    [
      q(
        'Dua resep memakai 1/2 dari 3/4 liter dan 3/4 dari 1/2 liter. Perbandingan hasil …',
        'Sama, masing-masing 3/8 liter',
        ['Pertama dua kali kedua', 'Kedua 1 liter', 'Tidak bisa dibandingkan'],
        'Perkalian pecahan bersifat komutatif: 1/2×3/4=3/4×1/2=3/8.',
      ),
      q(
        'Tabel pembagian 2 liter: gelas A=1/2 L, B=1/4 L, C=1/8 L. Gelas penuh terbanyak diperoleh dengan …',
        'C, sebanyak 16',
        ['A, sebanyak 4', 'B, sebanyak 4', 'Semua 8'],
        'Ukuran lebih kecil memuat lebih banyak bagian: 2÷1/8=16, dibanding 4 dan 8.',
      ),
    ],
  ),
  entry(
    'matematika',
    6,
    1,
    'Rubi mencatat suhu pada skala dengan titik nol. Suhu dapat berada di bawah nol dan bergerak naik/turun. Kita memakai data rekaan agar tidak perlu mencoba suhu ekstrem.',
    'Garis bilangan: −5,−4,−3,−2,−1,0,1,2,3,4,5. Bergerak kanan menambah nilai, bergerak kiri menguranginya.',
    [
      q(
        'Suhu awal −3°C naik 8°C. Suhu akhir … °C.',
        5,
        [-11, -5, 11],
        '−3+8=5; delapan langkah ke kanan dari −3.',
      ),
      q(
        'Lift dari lantai 2 turun 5 tingkat, dengan lantai 0 sebagai acuan. Berhenti di …',
        -3,
        [3, 7, -7],
        '2−5=−3 pada model lantai yang diberikan.',
      ),
    ],
    [
      q(
        'Tabel suhu: A=−7°C, B=−2°C, C=1°C. Urutan dari terdingin …',
        'A, B, C',
        ['B, A, C', 'C, B, A', 'A, C, B'],
        'Bilangan lebih kecil berarti suhu lebih rendah: −7<−2<1.',
      ),
      q(
        'Saldo permainan mulai −4 poin, mendapat 3 paket masing-masing 6 poin, lalu kehilangan 5. Akhirnya … poin.',
        9,
        [-11, 5, 19],
        '−4+3×6−5=−4+18−5=9. Kerjakan perkalian sebelum tambah/kurang.',
      ),
    ],
  ),
  entry(
    'matematika',
    6,
    2,
    'Roda mainan Rubi berbentuk lingkaran. Ia membedakan jarak pusat-ke-tepi, panjang sekeliling dan daerah yang diwarnai agar tidak tertukar antara jari-jari, keliling dan luas.',
    'Diagram teks: tepi — r — pusat — r — tepi. Diameter=2r, keliling=πd, luas=πr². Gunakan pendekatan pi sesuai soal.',
    [
      q(
        'Tutup bundar berdiameter 28 cm. Jari-jarinya … cm.',
        14,
        [7, 28, 56],
        'Jari-jari adalah setengah diameter: 28÷2=14 cm.',
      ),
      q(
        'Roda berdiameter 21 cm. Dengan π≈22/7, kelilingnya … cm.',
        66,
        [33, 42, 1386],
        'Keliling πd=(22/7)×21=66 cm.',
      ),
    ],
    [
      q(
        'Tabel lingkaran: A jari-jari 7 cm, B jari-jari 14 cm. Luas B dibanding A …',
        'Empat kali luas A',
        ['Dua kali luas A', 'Sama', 'Setengah luas A'],
        'Luas bergantung kuadrat jari-jari; (14/7)²=4.',
      ),
      q(
        'Daerah setengah lingkaran berdiameter 14 cm. Dengan π≈22/7, seluruh keliling batasnya … cm.',
        36,
        [22, 44, 154],
        'Busur setengah lingkaran 22 cm ditambah sisi lurus diameter 14 cm, total 36 cm.',
      ),
    ],
  ),
  entry(
    'bahasa-indonesia',
    1,
    1,
    'Bobo menerima kartu huruf untuk memberi nama benda di Pulau Kata. Dua kata tampak mirip, tetapi bunyi akhirnya berbeda. Ia mengajakmu membaca semua huruf sebelum memilih gambar.',
    'Kartu suku kata: bu | ku → buku; bo | la → bola. Huruf terakhir perlu diperhatikan agar kata mirip tidak tertukar.',
    [
      q(
        'Bobo melihat gambar sapi. Kartu yang merangkai namanya adalah …',
        'sa + pi',
        ['si + pa', 'su + pu', 'pa + sa'],
        'Bunyi sa diikuti pi membentuk sapi.',
      ),
      q(
        'Kartu ma disambung ta. Benda yang cocok adalah …',
        'Mata',
        ['Meja', 'Bola', 'Susu'],
        'ma-ta dirangkai menjadi mata; perhatikan kedua suku kata.',
      ),
    ],
    [
      q(
        'Tabel kata: A=batu; B=bata. Pernyataan tepat …',
        'Bunyi akhir berbeda: u dan a',
        ['Keduanya pasti dibaca batu', 'Huruf awal berbeda', 'Keduanya tidak punya vokal'],
        'Kedua kata diawali bat, tetapi huruf akhir u dan a mengubah bunyi serta makna.',
      ),
      q(
        'Kartu kata: buku = bu-ku; tas = tas. Banyak suku kata kedua kata itu …',
        'Buku dua, tas satu',
        ['Keduanya dua', 'Buku satu, tas dua', 'Keduanya empat'],
        'Tepuk menurut suku kata, bukan banyak huruf: bu-ku dua, tas satu.',
      ),
    ],
  ),
  entry(
    'bahasa-indonesia',
    1,
    2,
    'Bobo membuat album tokoh keluarga rekaan. Ia ingin memberi label hubungan dan kegiatan tanpa menuliskan alamat atau informasi rahasia. Sebutan kakak dan adik bergantung siapa yang berbicara.',
    'Bagan tokoh: Lala lebih tua dari Rani; Rani lebih tua dari Adi. Panah menunjukkan urutan usia, bukan siapa yang lebih berharga.',
    [
      q(
        'Rani mempunyai saudara bernama Lala yang lebih tua. Rani menyebut Lala …',
        'Kakak',
        ['Adik', 'Cucu', 'Keponakan'],
        'Kakak menyatakan saudara yang lebih tua dari pembicara.',
      ),
      q(
        'Bobo ingin menulis kegiatan nenek. Kalimat yang jelas adalah …',
        'Nenek membaca buku.',
        ['Nenek yang dan.', 'Buku nenek ke.', 'Membaca di dan.'],
        'Kalimat menyebut pelaku dan kegiatan dengan jelas.',
      ),
    ],
    [
      q(
        'Bagan: Lala lebih tua dari Rani; Adi lebih muda dari Rani. Pernyataan benar …',
        'Rani adalah adik Lala dan kakak Adi',
        ['Rani kakak semua', 'Rani adik semua', 'Adi lebih tua dari Lala'],
        'Sebutan bergantung hubungan: Rani lebih muda dari Lala tetapi lebih tua dari Adi.',
      ),
      q(
        'Dua kartu perkenalan: A=nama panggilan dan hobi; B=password dan alamat lengkap. Pilihan aman …',
        'A, karena cukup untuk berkenalan',
        ['B, agar semua tahu rahasia', 'Keduanya harus dibagikan', 'Tak boleh menyebut hobi'],
        'Perkenalan tidak memerlukan password atau alamat lengkap. Gunakan informasi yang aman.',
      ),
    ],
  ),
  entry(
    'bahasa-indonesia',
    2,
    1,
    'Bobo ingin meminjam alat gambar lalu tidak sengaja menyenggol kertas temannya. Kata sopan perlu disertai tindakan yang tepat, bukan dipakai untuk memaksa atau menghapus tanggung jawab.',
    'Urutan percakapan: meminta bantuan → menunggu jawaban → menerima/menolak dengan sopan → berterima kasih. Saat salah: akui → perbaiki.',
    [
      q(
        'Bobo ingin meminjam penggaris. Kalimat sesuai …',
        'Tolong pinjamkan penggarismu sebentar, boleh?',
        ['Wajib beri aku penggaris!', 'Penggarismu jelek.', 'Aku ambil tanpa bertanya.'],
        'Permintaan jelas, sopan dan memberi kesempatan pemilik menjawab.',
      ),
      q(
        'Bobo tidak sengaja menjatuhkan pensil teman. Tindakan tepat …',
        'Minta maaf dan membantu mengambilnya',
        ['Tertawa lalu pergi', 'Menyalahkan teman', 'Mengambil pensil sebagai miliknya'],
        'Maaf disertai tanggung jawab dan perbaikan yang aman.',
      ),
    ],
    [
      q(
        'Dialog A: Tolong bantu. — Aku belum bisa. — Baik, aku minta pendamping. Sikap terakhir menunjukkan …',
        'Menghargai jawaban dan mencari bantuan lain',
        ['Memaksa teman', 'Mengejek penolakan', 'Mengabaikan keselamatan'],
        'Orang lain boleh belum bisa membantu; tanggapan tetap menghargai batasnya.',
      ),
      q(
        'Tabel: A=minta maaf lalu sengaja mengulang; B=minta maaf lalu memperbaiki. Yang menunjukkan tanggung jawab …',
        'B',
        ['A', 'Keduanya sama baik', 'Tidak ada karena kata maaf tak berguna'],
        'Tindakan perbaikan mendukung ucapan maaf; mengulang sengaja bertentangan dengan tanggung jawab.',
      ),
    ],
  ),
  entry(
    'bahasa-indonesia',
    2,
    2,
    'Papan ruang baca Bobo memuat informasi, permintaan dan larangan. Ia perlu menyusun kalimat agar teman tahu apakah sedang diberi kabar atau diminta melakukan sesuatu.',
    'Tiga kartu: Buku tertata rapi. = berita; Tolong rapikan buku. = permintaan; Jangan merobek buku! = larangan.',
    [
      q(
        'Ingin meminta teman merapikan meja dengan sopan. Pilihan tepat …',
        'Tolong rapikan meja setelah dipakai.',
        ['Meja itu biru.', 'Siapa pemilik meja?', 'Meja telah rapi kemarin.'],
        'Kalimat memakai tolong dan tindakan yang diminta secara jelas.',
      ),
      q(
        'Bobo memberi kabar perpustakaan dibuka pagi ini. Kalimat berita …',
        'Perpustakaan dibuka pagi ini.',
        ['Bukalah perpustakaan!', 'Kapan dibuka?', 'Jangan membuka pintu!'],
        'Pilihan ini menyampaikan informasi, bukan meminta atau menanyakan.',
      ),
    ],
    [
      q(
        'Tabel label: A=Jangan berlari! diberi label berita; B=Hujan turun. diberi label berita. Penilaian tepat …',
        'A salah, B benar',
        ['A benar, B salah', 'Keduanya salah', 'Keduanya benar'],
        'Jangan berlari adalah larangan; Hujan turun menyampaikan kejadian.',
      ),
      q(
        'Siswa mengubah Pintu sudah tertutup. menjadi Pintu sudah tertutup! dan menyebutnya perintah. Tanggapan tepat …',
        'Ganti maksud menjadi Tolong tutup pintu.',
        ['Tanda seru saja selalu cukup', 'Hapus kata pintu saja', 'Semua kalimat adalah perintah'],
        'Jenis kalimat ditentukan maksud dan susunannya, bukan tanda akhir saja.',
      ),
    ],
  ),
  entry(
    'bahasa-indonesia',
    3,
    1,
    'Bobo membaca beberapa catatan tentang kebun. Ada gagasan umum dan ada rincian kegiatan. Ia ingin membuat ringkasan yang menaungi semua rincian tanpa menambah informasi baru.',
    'Peta gagasan: perawatan kebun bersama → menyiram, membersihkan, mencatat. Rincian menjelaskan gagasan umum, bukan berdiri sebagai simpulan seluruh bacaan.',
    [
      q(
        'Teks: Sepeda dirawat agar aman dipakai. Ban diperiksa. Rem dicoba. Ide pokoknya …',
        'Perawatan sepeda membantu keamanan',
        ['Ban selalu merah', 'Rem tidak diperlukan', 'Semua sepeda baru'],
        'Pemeriksaan ban dan rem mendukung gagasan perawatan untuk keamanan.',
      ),
      q(
        'Teks: Kelompok membaca rutin. Mereka bertukar cerita dan bertanya arti kata. Rincian yang disebut …',
        'Bertanya arti kata',
        ['Membeli kapal', 'Mengukur hujan', 'Menutup semua buku'],
        'Rincian itu tertulis langsung dalam bacaan.',
      ),
    ],
    [
      q(
        'Teks: Kelas memilah kertas. Botol dipakai ulang. Keran ditutup setelah digunakan. Gagasan yang menaungi ketiganya …',
        'Kelas mengurangi pemborosan dan sampah',
        [
          'Semua kegiatan hanya tentang buku',
          'Kelas membeli alat baru',
          'Air adalah satu-satunya topik',
        ],
        'Ketiga tindakan berkaitan penggunaan sumber daya secara bertanggung jawab; gagasan tidak boleh terlalu sempit.',
      ),
      q(
        'Tabel bacaan: 8 siswa memilih apel, 5 jeruk. Ringkasan A=apel paling banyak pada kelompok itu; B=seluruh kota suka apel. Yang didukung …',
        'A saja',
        ['B saja', 'Keduanya', 'Tidak ada data sama sekali'],
        'Data kelompok kecil mendukung perbandingan kelompok itu, bukan seluruh kota.',
      ),
    ],
  ),
  entry(
    'bahasa-indonesia',
    3,
    2,
    'Bobo menyunting pengumuman yang penuh pengulangan dan kata bermakna ganda. Ia ingin pembaca mengerti siapa melakukan apa tanpa kehilangan informasi penting.',
    'Tabel suntingan: Para siswa-siswa membaca. → Para siswa membaca. Hilangkan pengulangan, tetapi pertahankan waktu/tempat yang diperlukan.',
    [
      q(
        'Kalimat pengumuman yang paling hemat adalah …',
        'Para peserta membawa buku.',
        [
          'Para peserta-peserta semuanya membawa buku.',
          'Semua para peserta-peserta membawa buku.',
          'Para peserta seluruh semuanya membawa buku.',
        ],
        'Para sudah menunjukkan jamak; pengulangan tidak diperlukan.',
      ),
      q(
        'Dalam Tanaman layu karena kekurangan air, kata layu berarti …',
        'Tidak segar',
        ['Sangat ramai', 'Berbentuk kotak', 'Bertambah keras selalu'],
        'Hubungan kekurangan air membantu memahami keadaan tanaman.',
      ),
    ],
    [
      q(
        'Tabel konteks: A=kepala sekolah; B=kepala boneka. Makna kepala …',
        'A pemimpin, B bagian tubuh/model tubuh',
        ['Keduanya selalu pemimpin', 'Keduanya harga', 'A warna, B waktu'],
        'Satu kata dapat mempunyai arti berbeda; konteks sekolah dan boneka membedakannya.',
      ),
      q(
        'Kalimat: Besok pagi siswa kelas tiga membawa buku ke aula. Suntingan A menghapus besok pagi; B hanya menghapus pengulangan yang tak perlu jika ada. Prinsip tepat …',
        'Jangan hilangkan waktu yang penting bagi maksud',
        [
          'Hapus semua keterangan selalu',
          'Kalimat terpendek pasti terbaik',
          'Hapus pelaku agar hemat',
        ],
        'Efektif berarti jelas dan tepat; waktu kegiatan dapat menjadi informasi inti.',
      ),
    ],
  ),
  entry(
    'bahasa-indonesia',
    4,
    1,
    'Bobo menulis dua adegan: seseorang membawa payung dan seseorang berlari di halaman. Ia bertanya apakah kata setelah predikat selalu objek. Kita periksa struktur dan maknanya.',
    'Pola: Lala | membawa | tas = subjek-predikat-objek. Lala | berlari | di halaman = subjek-predikat-keterangan.',
    [
      q(
        'Pada Bima menanam bunga, objeknya adalah …',
        'Bunga',
        ['Bima', 'Menanam', 'Tidak ada'],
        'Bunga dikenai tindakan dan dapat menjadi subjek pasif: Bunga ditanam Bima.',
      ),
      q(
        'Pada Rani tidur di kamar, di kamar merupakan …',
        'Keterangan tempat',
        ['Objek langsung', 'Subjek', 'Predikat utama'],
        'Tidur tidak memerlukan objek; frasa di kamar menyatakan tempat.',
      ),
    ],
    [
      q(
        'Tabel: A=Dita membaca buku; B=Dita berjalan ke taman. Kalimat transitif …',
        'A saja',
        ['B saja', 'Keduanya', 'Tidak ada'],
        'A mempunyai objek buku yang dapat dipasifkan. Ke taman pada B adalah keterangan arah/tempat.',
      ),
      q(
        'Pasangan aktif-pasif yang menjaga makna …',
        'Raka membuka kotak. → Kotak dibuka Raka.',
        [
          'Raka tidur. → Tidur ditidur Raka.',
          'Raka membuka kotak. → Raka dibuka kotak.',
          'Raka berjalan. → Jalan membaca Raka.',
        ],
        'Objek kotak menjadi subjek pasif; pelaku tetap Raka.',
      ),
    ],
  ),
  entry(
    'bahasa-indonesia',
    4,
    2,
    'Bobo menemukan kata akar pada dua bacaan. Satu tentang tanaman dan satu tentang penyebab masalah. Memilih arti pertama tanpa membaca konteks bisa membuat penjelasan salah.',
    'Mini kamus: akar (1) bagian tumbuhan; (2) asal/sebab masalah. Cocokkan arti dengan kalimat, bukan panjang definisi.',
    [
      q(
        'Bobo mencari membawa dalam keluarga kata dasar. Kata dasarnya …',
        'Bawa',
        ['Memb', 'Membawa-bawa selalu', 'Awa'],
        'Awalan meN- membentuk membawa dari kata dasar bawa.',
      ),
      q(
        'Pada Akar masalahnya adalah jadwal yang tidak jelas, akar berarti …',
        'Asal atau penyebab',
        ['Bagian tumbuhan', 'Alat menggali', 'Nama buah'],
        'Konteks masalah memakai makna kias penyebab.',
      ),
    ],
    [
      q(
        'Tabel daftar kata: makan, mata, meja, minum. Urutan alfabet …',
        'makan, mata, meja, minum',
        ['mata, makan, minum, meja', 'meja, makan, mata, minum', 'minum, meja, mata, makan'],
        'Huruf m sama; bandingkan huruf kedua, lalu huruf berikutnya pada makan dan mata.',
      ),
      q(
        'Mini kamus rapat: (1) pertemuan; (2) tidak berjarak/renggang. Pada Tutup pintu rapat agar angin tidak masuk, arti tepat …',
        'Makna 2',
        ['Makna 1', 'Keduanya berarti pertemuan', 'Tidak ada arti yang bisa dipilih'],
        'Kalimat tentang kondisi pintu, bukan kegiatan pertemuan; konteks memilih arti kedua.',
      ),
    ],
  ),
  entry(
    'bahasa-indonesia',
    5,
    1,
    'Bobo ingin mendeskripsikan taman tanpa mengulang kata yang sama. Ia mencari sinonim dan antonim, lalu memeriksa apakah penggantian itu tetap cocok dengan benda dan situasinya.',
    'Tabel kata: ramai ↔ sepi; teliti ≈ cermat. Tanda mirip tidak berarti semua kata dapat ditukar dalam semua kalimat.',
    [
      q(
        'Taman itu sepi setelah acara selesai. Antonim sepi dalam konteks ini …',
        'Ramai',
        ['Sunyi', 'Lengang', 'Hening'],
        'Ramai berlawanan dengan keadaan sepi; pilihan lain dekat makna sepi.',
      ),
      q(
        'Rani memeriksa tugas dengan teliti. Pengganti teliti yang cocok …',
        'Cermat',
        ['Ceroboh', 'Lalai', 'Asal-asalan'],
        'Cermat menekankan ketelitian, bukan ketergesaan.',
      ),
    ],
    [
      q(
        'Tabel konteks: A=beban ringan; B=tugas ringan. Lawan yang sesuai …',
        'A berat; B sulit jika ringan berarti mudah',
        ['A panjang; B biru', 'Keduanya selalu gelap', 'A cepat; B lambat selalu'],
        'Lawan kata dipilih dari makna yang digunakan, bukan satu pasangan untuk semua konteks.',
      ),
      q(
        'Siswa mengganti sepatu besar menjadi sepatu agung karena menganggap besar dan agung selalu sinonim. Evaluasi tepat …',
        'Tidak tepat; kecocokan konteks perlu diperiksa',
        [
          'Selalu tepat karena panjang huruf sama',
          'Agung berarti ukuran sepatu pasti',
          'Semua sinonim wajib ditukar',
        ],
        'Agung tidak lazim sebagai ukuran sepatu; kedekatan makna tidak menjamin pemakaian sama.',
      ),
    ],
  ),
  entry(
    'bahasa-indonesia',
    5,
    2,
    'Bobo melaporkan ucapan teman pada hari berbeda. Ia harus menjaga siapa yang berbicara dan hari yang dimaksud, bukan hanya menghapus tanda petik.',
    'Kartu acuan: ucapan Senin “Aku datang besok.” → yang dimaksud Selasa. Laporan Rabu tetap menyebut Selasa agar waktu tidak bergeser.',
    [
      q(
        'Dita berkata, “Aku membawa peta.” Laporan yang sesuai …',
        'Dita berkata bahwa ia membawa peta.',
        [
          'Dita berkata bahwa aku selalu membawa peta.',
          'Peta berkata Dita membawa.',
          'Dita membawa bahwa berkata.',
        ],
        'Aku pada ucapan Dita dirujuk sebagai ia oleh pelapor lain.',
      ),
      q(
        'Bobo hendak mengutip ucapan persis teman. Penanda tulisan yang diperlukan …',
        'Tanda petik dan kata yang akurat',
        ['Tanda persen', 'Huruf besar semua', 'Angka yang dikarang'],
        'Kutipan langsung menjaga kata asli dan diapit tanda petik.',
      ),
    ],
    [
      q(
        'Tabel waktu: ucapan Senin=“Besok aku datang”; dilaporkan Rabu. Acuan hari yang benar …',
        'Selasa',
        ['Kamis', 'Rabu', 'Senin'],
        'Besok mengacu pada waktu ucapan, yaitu sehari setelah Senin, bukan sehari setelah laporan.',
      ),
      q(
        'Ucapan Rani: “Aku menunggu di sini.” Pelapor pindah tempat. Prinsip laporan tepat …',
        'Sebut Rani dan lokasi asal bila perlu agar acuan jelas',
        [
          'Biarkan aku dan di sini selalu tanpa cek',
          'Ubah Rani menjadi pelapor',
          'Tambahkan ucapan yang tak pernah ada',
        ],
        'Kata ganti dan tempat bergantung konteks; pelaporan harus menjaga maksud asli.',
      ),
    ],
  ),
  entry(
    'bahasa-indonesia',
    6,
    1,
    'Bobo merangkum pengamatan beberapa buku. Ia ingin menyebut temuan yang benar-benar dicatat dan tidak memperluas satu kelompok kecil menjadi seluruh sekolah.',
    'Tabel pengamatan: 6 buku diperiksa; 4 sampul utuh; 2 sampul rusak. Simpulan harus tetap menyebut enam buku yang diamati.',
    [
      q(
        'Laporan menyebut 10 pot diamati, 7 bertunas. Simpulan yang sesuai …',
        'Tujuh dari sepuluh pot yang diamati bertunas.',
        ['Semua tanaman kota bertunas.', 'Tidak ada pot bertunas.', 'Tujuh kota pasti hijau.'],
        'Simpulan mempertahankan jumlah dan lingkup objek.',
      ),
      q(
        'Paragraf berisi tinggi tanaman hari pertama, kedua dan ketiga. Ide pokok yang sesuai …',
        'Perubahan tinggi selama pengamatan',
        ['Warna semua gedung', 'Harga pupuk tanpa data', 'Semua tanaman sama tinggi'],
        'Ketiga rincian membahas perubahan tinggi dalam periode pengamatan.',
      ),
    ],
    [
      q(
        'Tabel buku: diperiksa 8; sampul utuh 5; rusak 3. Klaim “Semua buku sekolah rusak” …',
        'Tidak didukung; data hanya delapan buku dan tiga rusak',
        ['Pasti benar', 'Benar karena ada angka', 'Benar jika judul besar'],
        'Klaim melampaui sampel dan bertentangan dengan lima sampul utuh.',
      ),
      q(
        'Dua simpulan: A menyebut hasil dan waktu pengamatan; B menambah penyebab yang tidak diukur. Yang lebih dapat dipertanggungjawabkan …',
        'A',
        ['B karena lebih meyakinkan', 'Keduanya otomatis sama', 'B jika memakai kata pasti'],
        'Simpulan harus mengikuti bukti. Dugaan penyebab perlu diberi label dan diuji terpisah.',
      ),
    ],
  ),
  entry(
    'bahasa-indonesia',
    6,
    2,
    'Bobo menyiapkan pidato agar buku dikembalikan tepat waktu. Ia ingin ajakan yang jelas dan berbukti, sekaligus memberi solusi bagi teman yang mengalami kesulitan.',
    'Peta pidato: masalah → alasan/bukti → langkah konkret → penutup. Bedakan data, pendapat dan ajakan, lalu periksa sumbernya.',
    [
      q(
        'Ajakan yang paling dapat dilakukan pendengar adalah …',
        'Periksa tanggal kembali buku sebelum pulang.',
        ['Jadilah sempurna selamanya.', 'Semua harus sama.', 'Pikirkan sesuatu saja.'],
        'Ajakan menyebut satu tindakan konkret dan waktu melakukannya.',
      ),
      q(
        'Bobo hendak memakai angka dalam pidato. Langkah tepat …',
        'Periksa sumber, tanggal dan konteksnya',
        ['Buat angka sebesar mungkin', 'Hapus sumber agar singkat', 'Gunakan rumor saja'],
        'Data perlu dapat ditelusuri agar menjadi bukti yang layak.',
      ),
    ],
    [
      q(
        'Data rekaan: 12 dari 20 peminjam mengembalikan tepat waktu. Kalimat pidato yang sesuai …',
        'Sebagian peminjam masih perlu dukungan pengingat',
        ['Tak seorang pun tepat waktu', 'Semua pasti malas', 'Seluruh kota terlambat'],
        'Delapan belum tepat waktu, tetapi data tidak membuktikan sifat pribadi atau seluruh kota. Dukungan pengingat adalah usulan yang wajar.',
      ),
      q(
        'Tabel usulan: A=mengingatkan jadwal dan menyediakan bantuan; B=mengejek yang terlambat. Persuasi yang menghargai pendengar …',
        'A, karena mengajak dengan solusi',
        ['B, karena hinaan selalu bukti', 'Keduanya sama', 'B jika berteriak'],
        'Ajakan efektif menjelaskan tindakan dan membantu hambatan, bukan merendahkan orang.',
      ),
    ],
  ),
  entry(
    'ipa',
    1,
    1,
    'Ilmuwan Tobi menemukan kain lembut, kartu berwarna dan bunyi ketukan pelan. Ia ingin tahu informasi mana yang diperoleh tiap indra tanpa mencicipi atau menyentuh bahan asing.',
    'Tabel aman: kartu → warna/bentuk → mata; kain → halus/kasar → kulit; ketukan pelan → bunyi → telinga.',
    [
      q(
        'Tobi ingin membedakan kartu merah dan biru. Indra yang terutama dipakai …',
        'Penglihatan',
        ['Pengecapan', 'Penciuman', 'Pendengaran'],
        'Warna diketahui melalui informasi cahaya yang diterima mata.',
      ),
      q(
        'Permukaan kain terasa halus saat diraba dengan aman. Informasi ini berasal dari …',
        'Kulit',
        ['Lidah', 'Gigi', 'Rambut saja'],
        'Kulit membantu mengenali tekstur melalui sentuhan.',
      ),
    ],
    [
      q(
        'Tabel catatan: A=kartu berwarna hijau; B=kartu pasti mahal. Catatan indra yang dapat langsung didukung …',
        'A saja',
        ['B saja', 'Keduanya', 'Tidak ada warna yang dapat diamati'],
        'Hijau adalah pengamatan visual; harga perlu informasi lain dan tidak diketahui dari warna.',
      ),
      q(
        'Tobi menemukan cairan tak dikenal. Pilihan A=mencicipi untuk tahu; B=tidak menyentuh dan bertanya pendamping. Pilihan ilmiah yang aman …',
        'B',
        ['A', 'Keduanya wajib', 'A asal sedikit'],
        'Pengamatan tidak boleh mengorbankan keselamatan; bahan asing tidak diuji dengan mulut atau dicium dekat-dekat.',
      ),
    ],
  ),
  entry(
    'ipa',
    1,
    2,
    'Tobi membuat jadwal kebiasaan sehat untuk tokoh komik. Ia belajar merawat gigi dengan lembut dan meminta bantuan saat ada masalah, bukan menilai atau mempermalukan kondisi tubuh teman.',
    'Kartu kebiasaan: sesudah toilet → cuci tangan; setelah sarapan dan sebelum tidur → sikat gigi sesuai arahan pendamping; keluhan → minta bantuan.',
    [
      q(
        'Sesudah bermain tanah, Tobi akan makan. Langkah tepat …',
        'Mencuci tangan dengan sabun dan air bersih',
        ['Mengusap tangan pada baju saja', 'Langsung memegang makanan', 'Menjilat tangan'],
        'Mencuci membantu membersihkan kotoran yang terlihat maupun tidak terlihat.',
      ),
      q(
        'Tokoh merasa giginya sakit. Tindakan yang tepat …',
        'Beri tahu pendamping agar mendapat bantuan',
        ['Mencabut sendiri', 'Memakai obat teman', 'Menyembunyikan terus'],
        'Pemeriksaan dan penanganan dibantu orang dewasa/tenaga kesehatan, bukan ditebak dari komik.',
      ),
    ],
    [
      q(
        'Tabel cara menyikat: A=lembut sesuai arahan; B=sekeras mungkin sampai gusi sakit. Penilaian tepat …',
        'A lebih tepat; keras tidak berarti lebih bersih',
        ['B selalu lebih baik', 'Keduanya harus sampai sakit', 'Tidak perlu membersihkan gigi'],
        'Tekanan berlebihan bukan tujuan perawatan. Ikuti arahan pendamping/dokter gigi dan alat sesuai usia.',
      ),
      q(
        'Catatan dua tokoh: A tangannya tampak bersih, B tampak kotor. Sebelum makan …',
        'Keduanya tetap perlu kebiasaan cuci tangan yang benar',
        ['Hanya B perlu, kuman selalu terlihat', 'A boleh berbagi sikat gigi', 'B harus dicela'],
        'Kotoran/kuman tidak semuanya terlihat. Kebiasaan kebersihan tidak boleh menjadi alasan mengejek.',
      ),
    ],
  ),
  entry(
    'ipa',
    2,
    1,
    'Tobi memindahkan air ke wadah lebar dan sebuah penghapus ke kotak lain. Tinggi air berubah, tetapi apakah jumlahnya otomatis berubah? Ia menyiapkan catatan agar bentuk tidak tertukar dengan volume.',
    'Tabel benda: penghapus → bentuk relatif tetap; air → mengikuti wadah dengan volume relatif tetap; udara → mengisi ruang yang tersedia.',
    [
      q(
        'Air 100 mL dipindah tanpa tumpah ke mangkuk. Volumenya kira-kira …',
        'Tetap 100 mL',
        ['Pasti 200 mL', 'Pasti nol', 'Sama dengan tinggi mangkuk'],
        'Memindah wadah mengubah bentuk, bukan otomatis jumlah air.',
      ),
      q(
        'Botol yang tampak kosong di ruang kelas sebenarnya berisi …',
        'Udara',
        ['Tidak ada materi sama sekali', 'Api', 'Air padat selalu'],
        'Udara adalah campuran gas yang menempati ruang walau tak terlihat.',
      ),
    ],
    [
      q(
        'Tabel uji: benda A bentuk tetap saat dipindah; B bentuk mengikuti wadah, volume tetap. Model wujud yang paling sesuai …',
        'A padat, B cair',
        ['A gas, B padat', 'A cair, B gas', 'Keduanya bukan materi'],
        'Gunakan ciri bentuk dan volume bersama, bukan warna atau ukuran.',
      ),
      q(
        'Dua gelas berisi air sama banyak: A sempit-tinggi, B lebar-rendah. Kesimpulan tepat …',
        'Tinggi permukaan saja tidak membuktikan volume berbeda',
        ['A selalu lebih banyak', 'B selalu nol', 'Air berubah jenis di B'],
        'Bentuk wadah memengaruhi tinggi permukaan. Bandingkan volume dengan ukuran yang sama.',
      ),
    ],
  ),
  entry(
    'ipa',
    2,
    2,
    'Tobi memberi label bagian tanaman pada gambar, lalu menghubungkannya dengan kebutuhan hidup. Ia tidak mencabut tanaman teman untuk melihat akar dan tidak menganggap tanah adalah makanan jadi.',
    'Diagram alur: akar menyerap air/mineral → batang mengangkut → daun menerima cahaya untuk membuat gula; bunga/buah/biji terkait perkembangbiakan pada tumbuhan berbunga.',
    [
      q(
        'Tanaman memerlukan air dari lingkungan akar. Bagian yang terutama menyerap air/mineral …',
        'Akar',
        ['Buah saja', 'Bunga saja', 'Kelopak saja'],
        'Akar menambatkan tumbuhan serta membantu penyerapan air dan mineral.',
      ),
      q(
        'Tobi melihat biji di dalam buah. Fungsi buah yang sesuai …',
        'Melindungi biji pada banyak tumbuhan berbunga',
        ['Mengunyah tanah', 'Mendengar bunyi', 'Menggantikan semua akar'],
        'Buah terkait perkembangan bunga dan dapat melindungi biji.',
      ),
    ],
    [
      q(
        'Tabel label: A=daun membuat gula dengan bantuan cahaya; B=akar memakan tanah utuh sebagai nasi. Label yang benar …',
        'A; B perlu diperbaiki',
        ['B; A salah', 'Keduanya benar', 'Keduanya tak ada hubungannya'],
        'Tumbuhan membuat gula melalui fotosintesis; akar menyerap air/mineral, bukan tanah sebagai makanan jadi.',
      ),
      q(
        'Gambar tanaman belum menunjukkan bunga. Kesimpulan tepat …',
        'Bunga belum diamati; tidak boleh langsung menyimpulkan semua tanaman tak berbunga',
        [
          'Pasti bukan tumbuhan',
          'Pasti tak pernah berkembang biak',
          'Harus dicabut untuk membuktikan',
        ],
        'Tahap hidup dan jenis berbeda. Tidak terlihat pada satu pengamatan bukan berarti tidak pernah ada.',
      ),
    ],
  ),
  entry(
    'ipa',
    3,
    1,
    'Tobi membandingkan tanaman, batu dan mobil mainan. Mainan bergerak ketika didorong, sementara biji tampak diam. Ia perlu beberapa bukti agar tidak menyebut gerak sebagai satu-satunya tanda hidup.',
    'Tabel bukti: tanaman tumbuh dan merespons; mobil mainan berpindah karena dorongan; biji dapat dorman. Gunakan gabungan proses kehidupan.',
    [
      q(
        'Mobil mainan bergerak setelah didorong. Apakah gerak itu cukup membuktikan mainan hidup?',
        'Tidak',
        ['Ya selalu', 'Ya jika cepat', 'Ya jika berwarna hijau'],
        'Benda tak hidup juga dapat bergerak; perlu proses kehidupan lain sebagai bukti.',
      ),
      q(
        'Biji belum berkecambah pada satu pengamatan. Kesimpulan hati-hati …',
        'Bisa masih hidup dan dorman',
        ['Pasti mati', 'Pasti menjadi batu', 'Tidak membutuhkan kondisi apa pun'],
        'Biji dapat belum aktif tumbuh dan memerlukan kondisi sesuai; diam bukan bukti mati.',
      ),
    ],
    [
      q(
        'Tabel: A bertambah besar karena pasir dituang; B tanaman menambah daun. Bukti pertumbuhan organisme …',
        'B, karena terkait proses hidup',
        ['A saja', 'Keduanya pasti organisme', 'Tidak ada tanaman hidup'],
        'Tumpukan bertambah dari luar berbeda dari pertumbuhan melalui proses kehidupan.',
      ),
      q(
        'Catatan: daun mengarah ke cahaya, akar bertambah, tanaman memerlukan air. Kesimpulan paling didukung …',
        'Ada beberapa bukti proses kehidupan',
        [
          'Tanaman hanya hidup jika berjalan',
          'Tanaman tidak berespirasi',
          'Semua benda hijau pasti hidup',
        ],
        'Pertumbuhan, kebutuhan dan respons bersama mendukung identifikasi makhluk hidup.',
      ),
    ],
  ),
  entry(
    'ipa',
    3,
    2,
    'Album Tobi mencampur gambar ulat, pupa, kupu-kupu dan nimfa belalang. Ia ingin menyusun urutan dan membedakan dua pola metamorfosis tanpa menangkap hewan.',
    'Dua jalur: kupu-kupu = telur → larva → pupa → dewasa; belalang = telur → nimfa → dewasa. Panah dewasa ke telur berarti generasi berikutnya.',
    [
      q(
        'Dalam album kupu-kupu, tahap setelah ulat adalah …',
        'Pupa',
        ['Nimfa belalang', 'Telur kembali langsung', 'Berudu'],
        'Ulat adalah larva, kemudian menjadi pupa sebelum dewasa.',
      ),
      q(
        'Tobi menyusun siklus belalang. Tahap yang perlu dipakai setelah telur …',
        'Nimfa',
        ['Pupa', 'Ulat kupu-kupu', 'Berudu'],
        'Belalang berkembang melalui telur-nimfa-dewasa tanpa pupa.',
      ),
    ],
    [
      q(
        'Tabel album: A=kupu-kupu tanpa pupa; B=belalang tanpa pupa. Penilaian tepat …',
        'A kurang satu tahap; B sesuai',
        ['Keduanya benar', 'Keduanya wajib pupa', 'A sesuai, B salah'],
        'Kupu-kupu mengalami pupa, sedangkan belalang tidak mempunyai tahap pupa.',
      ),
      q(
        'Diagram dewasa → telur pada siklus hidup berarti …',
        'Dewasa menghasilkan telur generasi berikutnya',
        [
          'Individu dewasa berubah kembali menjadi telur',
          'Semua dewasa mati menjadi batu',
          'Pupa selalu tidur tanpa perubahan',
        ],
        'Siklus menunjukkan keberlanjutan generasi, bukan satu individu kembali ke awal sebagai telur.',
      ),
    ],
  ),
  entry(
    'ipa',
    4,
    1,
    'Tobi membuat diagram makanan tumbuhan. Ia menempatkan air, udara dan cahaya, lalu bertanya bagian mana merupakan bahan, sumber energi dan hasil fotosintesis.',
    'Diagram: air + karbon dioksida, dengan energi cahaya → gula + oksigen. Tumbuhan juga melakukan respirasi siang dan malam.',
    [
      q(
        'Pada diagram fotosintesis, energi utama yang ditangkap tumbuhan berasal dari …',
        'Cahaya',
        ['Tanah sebagai nasi', 'Bunyi bel', 'Warna pot'],
        'Cahaya menyediakan energi; air dan karbon dioksida menjadi bahan.',
      ),
      q(
        'Tobi melengkapi hasil fotosintesis pada diagram. Pilihan tepat …',
        'Gula dan oksigen',
        ['Batu dan minyak tanah', 'Tanah dan plastik', 'Garam dapur saja'],
        'Fotosintesis menghasilkan bahan organik seperti gula dan melepaskan oksigen.',
      ),
    ],
    [
      q(
        'Tabel uji cahaya: A=jenis/umur/air serupa, cahaya berbeda; B=jenis/air/cahaya semua berbeda. Perbandingan lebih adil …',
        'A, meski keterbatasan tetap dicatat',
        [
          'B karena lebih banyak perbedaan',
          'Keduanya membuktikan semua sebab',
          'Tidak perlu mengukur apa pun',
        ],
        'Mengubah satu faktor yang diuji sambil menjaga faktor lain serupa membantu menilai pengaruh cahaya.',
      ),
      q(
        'Label diagram berbunyi “Tumbuhan hanya berespirasi malam.” Perbaikan tepat …',
        'Respirasi berlangsung siang dan malam',
        [
          'Respirasi tidak pernah terjadi',
          'Fotosintesis selalu tanpa cahaya',
          'Tanah menggantikan respirasi',
        ],
        'Tumbuhan memakai energi melalui respirasi juga pada siang; fotosintesis bukan pengganti respirasi.',
      ),
    ],
  ),
  entry(
    'ipa',
    4,
    2,
    'Mobil mainan Tobi meluncur berbeda di kain dan meja. Sebuah magnet menarik penjepit kertas tetapi tidak semua benda logam. Ia mencari penjelasan yang mengikuti bukti, bukan nama benda saja.',
    'Tabel interaksi: dorongan/tarikan = gaya; permukaan bersentuhan = gesekan; kutub sejenis magnet menolak, berbeda menarik.',
    [
      q(
        'Sepatu membantu anak tidak mudah tergelincir terutama karena …',
        'Gesekan sol dan lantai',
        ['Tidak ada gaya sama sekali', 'Matahari berhenti', 'Semua lantai bermagnet'],
        'Gesekan memberi cengkeraman; kondisi permukaan tetap memengaruhi keselamatan.',
      ),
      q(
        'Dua kutub utara magnet didekatkan. Keduanya cenderung …',
        'Tolak-menolak',
        ['Selalu menarik', 'Mencair', 'Menjadi air'],
        'Kutub sejenis saling menolak; kutub berbeda saling menarik.',
      ),
    ],
    [
      q(
        'Tabel uji magnet: besi tertarik, kayu tidak, aluminium tidak pada uji tersebut. Kesimpulan tepat …',
        'Tidak semua bahan/logam tertarik seperti besi',
        ['Semua logam pasti tertarik', 'Kayu selalu magnet kuat', 'Aluminium bukan materi'],
        'Hasil mengingatkan bahwa sifat magnet bergantung bahan, bukan sekadar disebut logam.',
      ),
      q(
        'Dua panah gaya pada benda sama besar dan berlawanan; benda tetap diam. Penjelasan tepat …',
        'Gaya dapat seimbang meski tetap ada',
        [
          'Diam membuktikan tak ada gaya',
          'Gaya selalu membuat berpindah',
          'Benda tidak punya massa',
        ],
        'Resultan gaya dapat nol; adanya gaya tidak selalu menghasilkan perubahan gerak yang terlihat.',
      ),
    ],
  ),
  entry(
    'ipa',
    5,
    1,
    'Tobi melihat pensil tampak bengkok di air dan mendengar bunyi penggaris bergetar. Kedua kejadian perlu penjelasan berbeda. Ia menggunakan model aman tanpa cahaya kuat atau bunyi keras.',
    'Tabel fenomena: cermin → pemantulan; pensil dalam air → pembiasan; penggaris bergetar → sumber bunyi. Cahaya dan bunyi berbeda kebutuhan medium.',
    [
      q(
        'Pensil utuh tampak bengkok saat sebagian berada dalam air. Penyebab yang sesuai …',
        'Pembiasan cahaya',
        ['Pensil pasti patah', 'Air selalu bermagnet', 'Fotosintesis'],
        'Arah cahaya berubah pada batas medium, sehingga posisi tampak berbeda.',
      ),
      q(
        'Penggaris plastik digetarkan pelan dan terdengar bunyi. Sumber bunyinya …',
        'Getaran penggaris',
        ['Warna penggaris', 'Angka tertulis saja', 'Cahaya lampu saja'],
        'Getaran sumber menimbulkan gangguan yang merambat melalui medium.',
      ),
    ],
    [
      q(
        'Tabel model: A cahaya melalui ruang hampa; B bunyi melalui ruang hampa tanpa medium. Yang sesuai …',
        'A saja',
        ['B saja', 'Keduanya', 'Tidak ada cahaya bisa merambat'],
        'Cahaya dapat merambat di ruang hampa; bunyi membutuhkan medium materi.',
      ),
      q(
        'Tabel bahan: kaca bening meneruskan banyak cahaya; karton menghalangi. Model penggunaan tepat …',
        'Karton dapat menjadi penghalang pembentuk bayangan',
        [
          'Karton pasti tembus pandang',
          'Kaca tidak pernah meneruskan cahaya',
          'Semua bahan identik',
        ],
        'Benda opak seperti karton menghalangi cahaya dan dapat membentuk bayangan; bentuk sumber/jarak juga berpengaruh.',
      ),
    ],
  ),
  entry(
    'ipa',
    5,
    2,
    'Peta kebun Tobi menunjukkan tumbuhan, pemakan tumbuhan dan pemangsa. Ia memberi arah panah dari makanan ke pemakan agar aliran bahan dan energi tidak terbalik.',
    'Model rantai: rumput → belalang → katak → ular. Pengurai terkait sisa berbagai organisme; jaring sebenarnya dapat memiliki banyak jalur.',
    [
      q(
        'Dalam rumput → kelinci, arti panah adalah …',
        'Kelinci memperoleh bahan/energi dari rumput',
        ['Rumput memakan kelinci', 'Rumput berjalan ke kelinci', 'Kelinci membuat matahari'],
        'Panah model ini menunjuk dari sumber makanan ke pemakan.',
      ),
      q(
        'Sisa organisme di kebun diuraikan banyak jamur dan bakteri. Peran ini disebut …',
        'Pengurai',
        ['Produsen yang selalu berfotosintesis', 'Benda mati', 'Satelit'],
        'Pengurai membantu memecah sisa dan mengembalikan unsur ke lingkungan.',
      ),
    ],
    [
      q(
        'Jaring model: padi→belalang; padi→tikus; belalang→burung; tikus→ular. Pernyataan yang didukung …',
        'Padi menjadi sumber makanan bagi dua konsumen pada model',
        ['Burung pasti memakan ular', 'Tikus memakan burung pada model', 'Panah tidak punya arti'],
        'Ada dua panah keluar dari padi menuju belalang dan tikus; hubungan lain tidak boleh dikarang.',
      ),
      q(
        'Pada model sederhana pemangsa berkurang, lalu mangsa dapat bertambah. Kesimpulan ilmiah …',
        'Itu kemungkinan; makanan, penyakit dan habitat juga perlu dinilai',
        [
          'Pasti sama di semua ekosistem',
          'Semua mangsa langsung hilang',
          'Tidak perlu data lanjutan',
        ],
        'Jaring dan faktor lingkungan membuat akibat tidak selalu satu pola pasti.',
      ),
    ],
  ),
  entry(
    'ipa',
    6,
    1,
    'Tobi membuat model karton lengan dan menggambar jalur informasi. Ia ingin menjelaskan kerja sama tulang, sendi, otot dan saraf tanpa memaksa gerakan atau menilai kesehatan teman.',
    'Diagram: informasi indra → sistem saraf → sinyal ke otot → tarikan pada tulang melalui sendi. Model adalah penyederhanaan, bukan alat diagnosis.',
    [
      q(
        'Pada model lengan, tulang bergerak terutama karena …',
        'Tarikan otot yang terkoordinasi',
        ['Tulang memendek sendiri seperti otot', 'Warna kulit', 'Nama sendi'],
        'Otot menarik tulang dan geraknya dikoordinasi sistem tubuh.',
      ),
      q(
        'Tobi membandingkan siku dan bahu. Pernyataan sesuai …',
        'Rentang geraknya berbeda karena bentuk sendinya berbeda',
        [
          'Semua sendi bebas diputar sama',
          'Siku perlu dipaksa seperti bahu',
          'Sendi tidak memengaruhi gerak',
        ],
        'Siku terutama engsel, bahu mempunyai gerak lebih beragam. Jangan memaksa posisi.',
      ),
    ],
    [
      q(
        'Tabel fungsi: A=rangka melindungi/menopang; B=saraf menerima dan mengirim informasi. Model hubungan tepat …',
        'Keduanya bekerja bersama otot dan sendi',
        ['Saraf menggantikan tulang', 'Tulang saja cukup untuk semua gerak', 'Otot tidak berperan'],
        'Gerak/koordinasi memerlukan kerja sama beberapa sistem, bukan fungsi satu bagian saja.',
      ),
      q(
        'Dalam permainan reaksi, satu anak lebih lambat pada satu percobaan. Kesimpulan tepat …',
        'Belum dapat menilai kesehatan atau kecerdasannya',
        ['Pasti gangguan saraf', 'Pasti tidak cerdas', 'Harus dipaksa mengulang sampai sakit'],
        'Respons dipengaruhi banyak kondisi; permainan kelas bukan pemeriksaan kesehatan.',
      ),
    ],
  ),
  entry(
    'ipa',
    6,
    2,
    'Tobi memegang bola bumi sementara lampu model tetap di satu tempat. Ia memutar bola pada poros lalu menggerakkannya mengelilingi lampu untuk membedakan dua gerak.',
    'Tabel gerak: rotasi bumi ≈ satu hari → siang/malam; revolusi ≈ satu tahun. Urutan planet: Merkurius, Venus, Bumi, Mars, Jupiter, Saturnus, Uranus, Neptunus.',
    [
      q(
        'Satu titik pada bola berganti masuk bagian terang dan gelap saat bola diputar. Ini memodelkan …',
        'Rotasi dan siang-malam',
        ['Bumi menjadi matahari', 'Pengembunan', 'Bulan membuat cahaya sendiri'],
        'Rotasi mengganti arah suatu wilayah terhadap matahari.',
      ),
      q(
        'Bumi bergerak mengelilingi matahari sekitar sekali setahun. Gerak itu disebut …',
        'Revolusi',
        ['Rotasi saja', 'Metamorfosis', 'Respirasi'],
        'Revolusi adalah gerak mengorbit benda lain.',
      ),
    ],
    [
      q(
        'Tabel gerak: A=berputar pada poros sekitar sehari; B=mengelilingi matahari sekitar setahun. Pasangan benar …',
        'A rotasi, B revolusi',
        ['A revolusi, B rotasi', 'Keduanya rotasi', 'Keduanya bukan gerak'],
        'Poros dan orbit adalah gerak berbeda dengan periode berbeda.',
      ),
      q(
        'Model musim menunjukkan sumbu bumi miring saat berevolusi. Pernyataan tepat …',
        'Kemiringan dan revolusi memengaruhi pola penyinaran',
        [
          'Musim terutama karena matahari dimatikan',
          'Jarak adalah satu-satunya penyebab musim',
          'Semua wilayah selalu sama musimnya',
        ],
        'Sudut serta lama penyinaran berubah menurut lintang dan posisi orbit; kemiringan sumbu berperan utama pada musim lintang menengah.',
      ),
    ],
  ),
]
