import { section as s, practice as p, numberQuestion as q } from './helpers.js'

export const mathChapters = [
  {
    start:
      'Siapkan dua puluh tutup botol besar atau kartu. Kapten Rubi mengajakmu mengetahui banyak benda, bukan sekadar menyanyikan urutan angka. Mintalah pendamping menjaga benda kecil agar tidak masuk mulut.',
    sections: [
      s(
        'Satu benda, satu hitungan',
        'Sentuh atau pindahkan satu benda setiap menyebut satu bilangan. Mulailah dari satu, lalu dua, tiga, dan seterusnya. Bilangan terakhir menyatakan banyak seluruh benda. Jangan menghitung benda yang sama dua kali. Susunan boleh berjajar atau melingkar; selama tidak ada benda ditambah atau diambil, banyaknya tetap.',
        'Pindahkan tujuh kartu ke wadah sambil menghitung. Bilangan terakhir tujuh, jadi ada 7 kartu meskipun kartunya kemudian disusun dua baris.',
      ),
      s(
        'Belasan sebagai sepuluh dan sisanya',
        'Buat satu kelompok berisi sepuluh benda. Bilangan sebelas sampai sembilan belas dapat dilihat sebagai sepuluh ditambah beberapa satuan. Dua puluh berarti dua kelompok sepuluh. Bentuk kelompok memudahkan pemeriksaan sehingga kamu tidak perlu selalu mengulang hitungan dari awal.',
        'Ada 10 kartu dalam ikatan dan 6 kartu lepas. Jumlahnya 16, dibaca enam belas. Dua ikatan sepuluh berjumlah 20.',
      ),
      s(
        'Membandingkan dan mengurutkan',
        'Pasangkan benda dari dua kelompok satu per satu. Kelompok yang masih mempunyai sisa lebih banyak. Jika tidak ada sisa pada kedua kelompok, keduanya sama banyak. Pada urutan bilangan, maju satu langkah berarti bertambah satu dan mundur satu langkah berarti berkurang satu. Lambang bilangan menuliskan banyak itu.',
        'Kelompok 12 memiliki dua benda tersisa saat dipasangkan dengan kelompok 10. Maka 12 lebih banyak dari 10. Urutan 14, 15, 16 selalu naik satu.',
      ),
    ],
    activity:
      'Buat toko kartu berlabel 1–20. Pendamping memilih satu label; ambil benda sebanyak labelnya, kelompokkan sepuluh jika memungkinkan, lalu jelaskan cara memeriksa jumlah. Tukar peran dan bandingkan dua pesanan.',
    practice: [
      p('Tuliskan bilangan untuk satu kelompok sepuluh dan empat satuan.', '14', '10 + 4 = 14.'),
      p(
        'Urutkan 9, 6, 8 dari kecil.',
        '6, 8, 9',
        'Enam paling sedikit, lalu delapan, kemudian sembilan.',
      ),
      p(
        'Ada 11 sendok dan 13 gelas. Mana lebih banyak?',
        'Gelas, selisih dua.',
        'Sebelas pasangan terbentuk dan dua gelas tersisa.',
      ),
    ],
    recap:
      'Hitungan terakhir menyatakan jumlah. Belasan tersusun dari sepuluh dan satuan. Bandingkan dengan pasangan dan urutkan menurut banyaknya.',
    trap: 'Jika anak menunjuk terlalu cepat, pindahkan benda yang telah dihitung. Lanjutkan dari sampai 5, kemudian 10 dan 20; pengayaan berupa mencari beberapa susunan berbeda dengan jumlah sama.',
    quiz: [
      q('Bilangan setelah 16 adalah …', 17, [15, 16, 18], 'Maju satu dari 16 sampai di 17.'),
      q(
        'Sepuluh benda dan delapan benda berjumlah …',
        18,
        [8, 17, 20],
        'Gabungkan satu kelompok sepuluh dan delapan satuan: 10 + 8 = 18.',
      ),
      q(
        'Bilangan yang paling kecil adalah …',
        7,
        [11, 15, 19],
        '7 mendahului 11, 15, dan 19 dalam urutan hitungan.',
      ),
      q(
        'Ada 19 kartu. Ditambah satu menjadi …',
        20,
        [18, 10, 21],
        'Satu langkah sesudah 19 adalah 20.',
      ),
      q(
        'Dua kelompok masing-masing sepuluh berisi … benda.',
        20,
        [2, 10, 12],
        'Dua kelompok sepuluh digabung: 10 + 10 = 20 benda.',
      ),
    ],
  },
  {
    start:
      'Penjumlahan mencari banyak setelah digabung atau ditambah. Pengurangan dapat mencari sisa atau selisih. Gunakan paling banyak dua puluh benda agar cerita dapat diperagakan sebelum ditulis dengan lambang.',
    sections: [
      s(
        'Menggabungkan dua bagian',
        'Pisahkan dua kelompok dengan warna berbeda, lalu gabungkan. Banyak seluruh benda adalah hasil penjumlahan. Tanda + dibaca tambah. Tanda = menyatakan nilai di kedua sisi sama. Menambah nol tidak mengubah jumlah karena tidak ada benda baru. Menukar urutan dua kelompok juga tidak mengubah jumlahnya.',
        'Enam kartu merah dan lima kartu biru menjadi 11 kartu. Tulis 6 + 5 = 11. Kita dapat memeriksa dengan 5 + 6 = 11.',
      ),
      s(
        'Mengambil dan membandingkan',
        'Pada cerita mengambil, buat kelompok awal, pindahkan bagian yang diambil, lalu hitung sisa. Tanda − dibaca kurang. Untuk mencari selisih dua kelompok, buat pasangan dan hitung yang tidak berpasangan. Jangan memilih operasi hanya dari satu kata; tanyakan apa yang terjadi dan apa yang ingin diketahui.',
        'Ada 14 kelereng besar, empat dipindahkan. Sisanya 10: 14 − 4 = 10. Dua kelompok berisi 8 dan 5 benda mempunyai selisih 3.',
      ),
      s(
        'Strategi dan pemeriksaan',
        'Hitung maju untuk menambah dan mundur untuk mengurangi. Jangan menghitung posisi awal sebagai langkah tambahan. Jika mendekati sepuluh, pisahkan tambahan menjadi bagian yang melengkapi sepuluh dan sisanya. Periksa pengurangan dengan menjumlahkan sisa dan bagian yang diambil; hasilnya harus sama dengan banyak semula.',
        '8 + 5 dapat dipikirkan 8 + 2 + 3 = 13. Untuk memeriksa 13 − 5 = 8, hitung 8 + 5 = 13.',
      ),
    ],
    activity:
      'Mainkan cerita toko. Buat dua cerita menggabungkan dan dua cerita mengambil dengan kartu. Teman menulis kalimat matematika lalu memeriksa dengan benda. Minta teman menerangkan makna setiap bilangan, bukan hanya menyebut hasil.',
    practice: [
      p('Hitung 7 + 6 dengan melengkapi sepuluh.', '13', '7 + 3 + 3 = 13.'),
      p('Ada 16 buku, lima dipinjam. Berapa sisa?', '11 buku', '16 − 5 = 11; periksa 11 + 5 = 16.'),
      p('Apa hasil 9 + 0?', '9', 'Kelompok kosong tidak menambah benda.'),
    ],
    recap:
      'Pahami cerita, buat model, tulis operasi, hitung, dan periksa. Nol tidak menambah atau mengambil benda. Penjumlahan dapat memeriksa pengurangan.',
    trap: 'Bedakan bagian yang diambil dengan sisa. Jika menghitung maju masih keliru, gunakan garis bilangan dan buat satu gerakan untuk satu langkah. Pengayaan: dua operasi berbeda dengan hasil sama.',
    quiz: [
      q(
        '9 + 4 = …',
        13,
        [5, 12, 14],
        'Pisahkan empat menjadi satu dan tiga; lengkapi sepuluh: 9 + 1 + 3 = 13.',
      ),
      q('18 − 6 = …', 12, [6, 11, 24], 'Mengambil enam dari delapan belas menyisakan dua belas.'),
      q(
        'Lima pensil ditambah tiga pensil menjadi … pensil.',
        8,
        [2, 7, 9],
        'Gabungkan lima dan tiga pensil, lalu hitung seluruhnya: 5 + 3 = 8.',
      ),
      q(
        'Ada 12 buah, semuanya diambil. Sisanya …',
        0,
        [1, 12, 24],
        'Semua dua belas buah diambil sehingga tidak ada sisa: 12 − 12 = 0.',
      ),
      q(
        'Kelompok 10 dan 7 benda mempunyai selisih …',
        3,
        [7, 10, 17],
        'Pasangkan tujuh; tiga benda kelompok pertama tersisa.',
      ),
    ],
  },
  {
    start:
      'Amati permukaan buku, ubin, dan roda mainan. Benda nyata mempunyai ketebalan; bangun datar adalah model bentuk pada permukaannya. Kita mengelompokkan bentuk berdasarkan ciri, bukan warna atau ukuran.',
    sections: [
      s(
        'Sisi dan titik sudut',
        'Sisi adalah batas lurus pada bangun bersisi lurus. Dua sisi bertemu di titik sudut. Telusuri batas bentuk dengan jari dan tandai setiap sudut agar tidak dihitung berulang. Bentuk yang diputar tetap mempunyai banyak sisi dan sudut yang sama. Lingkaran mempunyai batas melengkung, tidak mempunyai sisi lurus dan titik sudut.',
        'Segitiga kertas memiliki tiga sisi lurus dan tiga sudut. Ketika diputar menghadap bawah, bentuknya tetap segitiga.',
      ),
      s(
        'Segitiga, persegi, dan persegi panjang',
        'Segitiga memiliki tiga sisi. Persegi mempunyai empat sisi sama panjang dan empat sudut siku-siku. Persegi panjang mempunyai empat sudut siku-siku serta pasangan sisi berhadapan sama panjang. Pada pembelajaran ini nama persegi dipakai untuk kasus empat sisi sama; persegi juga termasuk keluarga persegi panjang.',
        'Permukaan penggaris segitiga memberi contoh tiga sisi. Kartu persegi panjang mempunyai dua sisi panjang dan dua sisi pendek; warna kartunya tidak menentukan bentuk.',
      ),
      s(
        'Mengelompokkan dan menyusun bentuk',
        'Pilih satu aturan, misalnya banyak sisi atau jenis batas. Jelaskan alasan setiap benda masuk kelompok. Bentuk kecil dapat disusun menjadi gambar baru, dan bentuk besar dapat dipotong menjadi bagian. Gambar benda dengan menggabungkan bentuk tanpa menganggap nama benda sama dengan nama bangunnya.',
        'Dua segitiga yang tepat dapat disusun menjadi sebuah persegi. Sebuah gambar rumah dapat memakai persegi untuk badan dan segitiga untuk atap.',
      ),
    ],
    activity:
      'Buat kartu lingkaran, segitiga, persegi, dan persegi panjang dengan bantuan pendamping saat memotong. Kelompokkan menurut jumlah sudut, lalu susun menjadi kendaraan. Ceritakan bentuk yang dipakai dan periksa apakah bentuk berubah namanya saat diputar.',
    practice: [
      p('Berapa sudut segitiga?', '3', 'Setiap pertemuan dua sisi dihitung sekali.'),
      p(
        'Bentuk apa yang mempunyai batas melengkung tanpa sudut?',
        'Lingkaran',
        'Lingkaran tidak mempunyai titik sudut.',
      ),
      p(
        'Apakah segitiga biru yang diputar menjadi bentuk lain?',
        'Tidak',
        'Putaran tidak mengubah jumlah sisi dan sudut.',
      ),
    ],
    recap:
      'Kenali bentuk dari sisi, sudut, dan batas melengkung. Ukuran, warna, dan arah hadap tidak mengubah jenis bentuk.',
    trap: 'Jangan hanya menampilkan segitiga dengan ujung di atas. Berikan bentuk berbagai orientasi. Pengayaan: jelaskan mengapa persegi memenuhi ciri persegi panjang.',
    quiz: [
      q(
        'Bangun dengan tiga sisi lurus disebut …',
        'Segitiga',
        ['Lingkaran', 'Persegi', 'Persegi panjang'],
        'Tiga sisi lurus adalah ciri segitiga.',
      ),
      q(
        'Persegi memiliki … sisi sama panjang.',
        4,
        [2, 3, 5],
        'Keempat sisi persegi sama panjang.',
      ),
      q(
        'Bangun tanpa titik sudut adalah …',
        'Lingkaran',
        ['Segitiga', 'Persegi', 'Persegi panjang'],
        'Batas lingkaran melengkung dan tidak membentuk sudut.',
      ),
      q(
        'Saat persegi diputar, banyak sisinya …',
        'Tetap empat',
        ['Menjadi tiga', 'Menjadi lima', 'Hilang'],
        'Putaran tidak menambah atau mengurangi sisi.',
      ),
      q(
        'Dasar terbaik untuk mengelompokkan bentuk adalah …',
        'Ciri sisi dan sudut',
        ['Warna saja', 'Nama pemilik', 'Harga kertas'],
        'Ciri geometri menentukan kelompok bentuk.',
      ),
    ],
  },
  {
    start:
      'Dua benda dapat berbeda panjang dan beratnya. Dalam percakapan sehari-hari kita mengatakan berat; timbangan sederhana membandingkan massa benda. Kita akan membandingkan dengan cara yang adil tanpa mengangkat benda berbahaya.',
    sections: [
      s(
        'Membandingkan panjang secara langsung',
        'Letakkan dua benda lurus berdampingan dengan salah satu ujung sejajar. Benda yang ujung lainnya lebih jauh adalah yang lebih panjang. Jika ujung awal tidak sama, perbandingan bisa menipu. Untuk benda melengkung gunakan tali sebagai pembanding lalu luruskan. Gunakan kata lebih panjang, lebih pendek, atau sama panjang.',
        'Pita merah dan biru diletakkan mulai garis yang sama. Ujung merah melewati biru, sehingga pita merah lebih panjang walaupun pita biru lebih lebar.',
      ),
      s(
        'Membandingkan berat secara aman',
        'Neraca seimbang membandingkan dua benda pada kedua sisinya. Sisi yang turun menunjukkan benda lebih berat jika neraca bekerja benar. Benda besar belum tentu lebih berat: kotak kosong dapat lebih ringan daripada batu kecil. Hindari membandingkan hanya dari penampilan; gunakan alat atau benda yang aman diangkat.',
        'Pada neraca, sisi berisi kantong beras turun dibanding sisi kapas. Kantong beras lebih berat dalam perbandingan ini, bukan karena warnanya.',
      ),
      s(
        'Mengurutkan dengan satuan sama',
        'Urutkan tiga benda dengan membandingkan secara berpasangan. Panjang dapat dinyatakan dengan satuan tidak baku, misalnya balok yang sama ukuran. Susun satuan rapat tanpa celah atau tumpang tindih dari ujung awal. Hasil berbeda jika ukuran satuan berbeda, sehingga aturan satuan perlu disebutkan saat melaporkan pengukuran.',
        'Pensil sepanjang lima balok yang sama dan pita sepanjang tujuh balok. Karena satuannya sama, pita lebih panjang dua balok.',
      ),
    ],
    activity:
      'Pilih tiga pensil atau pita. Sejajarkan ujungnya dan urutkan dari pendek. Ukur dengan balok sama ukuran. Pendamping memperagakan neraca memakai benda ringan dan mencatat perbandingan; anak menjelaskan bukti yang dilihat.',
    practice: [
      p(
        'Mengapa ujung awal dua pita perlu sejajar?',
        'Agar dibandingkan dari titik awal yang sama.',
        'Selisih ujung akhir lalu mewakili perbedaan panjang.',
      ),
      p(
        'Kotak besar kosong dan batu kecil: dapatkah berat dipastikan dari ukuran?',
        'Tidak',
        'Ukuran tidak selalu menentukan massa; perlu perbandingan aman.',
      ),
      p(
        'A panjangnya 4 balok, B 6 balok sama ukuran. Mana lebih panjang?',
        'B, dua balok lebih panjang.',
        '6 − 4 = 2 satuan yang sama.',
      ),
    ],
    recap:
      'Sejajarkan ujung saat membandingkan panjang. Bandingkan massa dengan alat aman. Gunakan satuan seukuran dan tanpa celah agar hasil dapat dibandingkan.',
    trap: 'Jangan menyimpulkan benda paling besar pasti paling berat. Pendamping menangani alat/beban. Pengayaan: ukur benda sama dengan satuan kecil dan besar lalu jelaskan perbedaan bilangannya.',
    quiz: [
      q(
        'Langkah awal membandingkan dua pita adalah …',
        'Menyejajarkan salah satu ujung',
        ['Melipat acak', 'Membedakan warna', 'Membuat celah'],
        'Ujung awal sama membuat perbandingan panjang adil.',
      ),
      q(
        'Benda yang lebih berat pada neraca sederhana membuat sisinya …',
        'Turun',
        ['Naik selalu', 'Menghilang', 'Berubah warna'],
        'Sisi beban lebih berat turun bila neraca berfungsi baik.',
      ),
      q(
        'Meja sepanjang 8 balok, bangku 5 balok sama ukuran. Selisihnya …',
        3,
        [2, 5, 13],
        'Gunakan satuan balok sama dan kurangkan panjang: 8 − 5 = 3 balok.',
      ),
      q(
        'Pengukuran dengan balok harus …',
        'Rapat tanpa tumpang tindih',
        ['Banyak celah', 'Ditumpuk acak', 'Berbeda ukuran terus'],
        'Satuan harus seukuran dan tersusun rapat.',
      ),
      q(
        'Kotak besar selalu lebih berat daripada kotak kecil. Pernyataan ini …',
        'Belum tentu benar',
        ['Selalu benar', 'Pasti benar untuk kapas', 'Tidak perlu diperiksa'],
        'Bahan dan isi juga menentukan massa.',
      ),
    ],
  },
  {
    start:
      'Kamu sudah mengenal kelompok sepuluh. Sekarang bangun kelompok seratus dari sepuluh kelompok sepuluh. Bilangan sampai ratusan pada paket ini merupakan perluasan yang perlu disesuaikan guru dengan kesiapan dan ATP kelas.',
    sections: [
      s(
        'Membentuk ratusan, puluhan, satuan',
        'Sepuluh satuan dapat ditukar satu puluhan. Sepuluh puluhan dapat ditukar satu ratusan. Pertukaran mengubah bentuk kelompok, bukan jumlah benda. Gunakan kartu atau gambar bundel untuk menunjukkan ketiga tempat. Tuliskan tempat ratusan di kiri, puluhan di tengah, dan satuan di kanan.',
        'Dua lembar seratus, tiga ikatan sepuluh dan empat kartu satuan menyatakan 234. Bentuk panjangnya 200 + 30 + 4.',
      ),
      s(
        'Nilai angka bergantung tempat',
        'Angka yang sama mempunyai nilai berbeda menurut letaknya. Dalam 343, angka 3 pertama bernilai 300, sedangkan angka 3 terakhir bernilai 3. Nol menandakan tidak ada kelompok pada tempat itu dan menjaga posisi angka lain. Saat membaca bilangan, sebut bagian ratusan, puluhan, dan satuannya dengan urut.',
        'Bilangan 407 mempunyai empat ratusan, nol puluhan, dan tujuh satuan. Menulisnya 47 akan menghilangkan nilai ratusannya.',
      ),
      s(
        'Mengurai dan membandingkan',
        'Urai bilangan menjadi jumlah nilai tempat. Untuk membandingkan dua bilangan tiga angka, mulai dari ratusan. Jika sama, bandingkan puluhan; jika masih sama, bandingkan satuan. Cara ini lebih cepat daripada menghitung semua benda. Pemeriksaan dilakukan dengan membentuk kembali bundel sesuai uraian.',
        '352 lebih besar daripada 329: ratusannya sama-sama 3, tetapi 5 puluhan lebih banyak daripada 2 puluhan. Pada 216 dan 219, satuanlah yang menentukan.',
      ),
    ],
    activity:
      'Buat toko bundel dengan kartu R, P, dan S. Satu anak memesan bilangan tiga angka, anak lain menguraikan dan menukar sepuluh satuan menjadi puluhan. Jelaskan bahwa jumlah tetap sama setelah pertukaran.',
    practice: [
      p('Uraikan 582.', '500 + 80 + 2', 'Masing-masing angka dikalikan nilai tempatnya.'),
      p('Apa nilai angka 6 pada 461?', '60', 'Angka 6 berada di tempat puluhan.'),
      p(
        'Mana lebih besar: 405 atau 450?',
        '450',
        'Ratusan sama; lima puluhan lebih dari nol puluhan.',
      ),
    ],
    recap:
      'Satu ratusan setara sepuluh puluhan. Nilai angka ditentukan tempat, dan nol menjaga tempat yang kosong. Bandingkan dari tempat terbesar.',
    trap: 'Bedakan angka dengan nilainya. Gunakan bundel nyata sebelum simbol. Jika sampai 100 belum mantap, kembali ke dua tempat dahulu; lanjutkan ratusan sebagai pengayaan bertahap.',
    quiz: [
      q(
        'Nilai angka 7 pada 372 adalah …',
        70,
        [7, 700, 72],
        '7 berada di tempat puluhan sehingga bernilai 70.',
      ),
      q(
        '400 + 20 + 9 = …',
        429,
        [492, 249, 409],
        'Gabungkan empat ratusan, dua puluhan, sembilan satuan.',
      ),
      q(
        'Bilangan terbesar adalah …',
        608,
        [580, 599, 506],
        '608 memiliki enam ratusan, lebih besar daripada lima ratusan.',
      ),
      q(
        'Pada 305, banyak puluhannya di tabel nilai tempat adalah …',
        0,
        [3, 5, 30],
        'Angka pada tempat puluhan adalah 0.',
      ),
      q(
        'Sepuluh puluhan setara …',
        100,
        [10, 20, 1000],
        'Sepuluh kelompok masing-masing sepuluh menjadi satu ratusan: 10 × 10 = 100.',
      ),
    ],
  },
  {
    start:
      'Hitung bersusun membantu menata nilai tempat. Cara ini bukan aturan memindahkan angka tanpa makna: setiap penyimpanan atau pengelompokan ulang mewakili pertukaran sepuluh satuan dengan satu puluhan, atau sebaliknya.',
    sections: [
      s(
        'Menata kolom dan menjumlahkan',
        'Tuliskan satuan tepat di bawah satuan, puluhan di bawah puluhan dan ratusan di bawah ratusan. Mulai menjumlah dari satuan. Jika jumlah satuan mencapai sepuluh, tukarkan menjadi satu puluhan dan sisakan satuannya. Sertakan puluhan hasil pertukaran ketika menjumlah kolom berikutnya.',
        'Pada 158 + 126, satuan 8 + 6 = 14: tulis 4, simpan 1 puluhan. Puluhan 5 + 2 + 1 = 8. Ratusan 1 + 1 = 2. Hasil 284.',
      ),
      s(
        'Mengurangi dengan pengelompokan ulang',
        'Kurangi dari tempat satuan. Jika satuan yang tersedia lebih kecil daripada yang diambil, tukarkan satu puluhan menjadi sepuluh satuan. Nilai seluruh bilangan tetap sama. Jangan membalik angka kecil-besar pada tiap kolom karena itu mengubah cerita pengurangan. Catat tempat yang sudah berkurang akibat pertukaran.',
        'Pada 243 − 118, ubah 4 puluhan menjadi 3 puluhan dan 3 satuan menjadi 13 satuan. 13 − 8 = 5, 3 − 1 = 2, 2 − 1 = 1. Hasilnya 125.',
      ),
      s(
        'Memeriksa dengan operasi kebalikan',
        'Jumlahkan hasil pengurangan dengan bilangan yang dikurangkan; hasilnya harus kembali ke bilangan awal. Gunakan perkiraan untuk mendeteksi kesalahan besar. Pada penjumlahan, hitung kembali dengan urutan bagian ditukar atau model nilai tempat. Jawaban soal cerita perlu menyebut satuan atau benda yang dihitung.',
        'Untuk memeriksa 321 − 106 = 215, hitung 215 + 106 = 321. Jika hasil ratusan jauh dari perkiraan 300 − 100, periksa kembali kolomnya.',
      ),
    ],
    activity:
      'Gambar tabel ratusan-puluhan-satuan. Peragakan satu penjumlahan yang perlu menyimpan dan satu pengurangan yang perlu menukar puluhan. Pasanganmu menjelaskan setiap perubahan sebelum kalian menuliskan hasil bersusunnya.',
    practice: [
      p('Hitung 147 + 135.', '282', '7 + 5 = 12; simpan satu puluhan, lalu 4 + 3 + 1 = 8.'),
      p('Hitung 264 − 137.', '127', 'Tukar satu puluhan: 14 − 7 = 7, 5 − 3 = 2, 2 − 1 = 1.'),
      p(
        'Periksa 350 − 125 = 225.',
        '225 + 125 = 350',
        'Penjumlahan hasil dan pengurang mengembalikan bilangan awal.',
      ),
    ],
    recap:
      'Sejajarkan nilai tempat, mulai satuan, dan pahami pertukaran. Simpan atau pinjam adalah pengelompokan ulang dengan nilai tetap.',
    trap: 'Jika anak menghitung 3 − 8 menjadi 5 dengan membalik urutan, kembali ke bundel. Kerjakan pengurangan tanpa pertukaran dahulu, kemudian satu pertukaran; tantangan berikutnya melibatkan nol.',
    quiz: [
      q('126 + 147 = …', 273, [263, 2630, 283], '6 + 7 = 13, kemudian 2 + 4 + 1 = 7 puluhan.'),
      q(
        '325 − 112 = …',
        213,
        [223, 237, 437],
        'Kurangi masing-masing nilai tempat: 3 satuan, 1 puluhan, 2 ratusan.',
      ),
      q(
        '241 − 126 = …',
        115,
        [125, 135, 367],
        'Tukar satu puluhan, sehingga satuan 11 − 6 = 5 dan puluhan 3 − 2 = 1.',
      ),
      q(
        '208 + 105 = …',
        313,
        [303, 311, 413],
        '8 + 5 = 13; puluhan mendapat satu hasil pertukaran.',
      ),
      q(
        'Dalam hitung bersusun, angka satuan diletakkan …',
        'Di bawah satuan',
        ['Di bawah ratusan selalu', 'Acak', 'Di kolom judul'],
        'Kolom harus sesuai nilai tempat agar operasi benar.',
      ),
    ],
  },
  {
    start:
      'Jam membantu menyatakan kapan kegiatan terjadi; durasi menyatakan berapa lama. Mulailah dari jam tepat, setengah jam, lalu menit. Model jam karton lebih aman daripada membongkar jam listrik.',
    sections: [
      s(
        'Mengenal jarum jam',
        'Jarum pendek menunjukkan jam dan jarum panjang menunjukkan menit. Satu putaran jarum panjang memerlukan enam puluh menit, setara satu jam. Pada jam tepat jarum panjang menunjuk 12. Jarum pendek bergerak perlahan sepanjang satu jam sehingga tidak selalu tepat pada angka.',
        'Pukul 08.00: jarum pendek di 8, jarum panjang di 12. Pukul 08.30: jarum panjang di 6 dan jarum pendek sudah berada di antara 8 dan 9.',
      ),
      s(
        'Membaca menit dan penulisan waktu',
        'Jarak antara dua angka besar pada jam analog mewakili lima menit bagi jarum panjang. Dari 12, hitung 5, 10, 15, dan seterusnya. Jam digital menunjukkan jam dan menit langsung. Sebut pagi/siang/sore jika memakai format dua belas jam agar tidak rancu. Dalam format 24 jam, pukul 14.00 berarti pukul dua siang.',
        'Jarum panjang di angka 3 berarti 15 menit. Jika jarum pendek sedikit lewat 10, waktunya 10.15. Pukul 18.00 adalah pukul enam sore.',
      ),
      s(
        'Menghitung durasi sederhana',
        'Gambarkan waktu mulai dan akhir pada garis waktu. Hitung lompatan jam lalu menit. Jika menit melewati enam puluh, tukar enam puluh menit menjadi satu jam. Tidak semua pengurangan tampilan jam boleh dilakukan seperti bilangan biasa karena basis menit adalah enam puluh, bukan seratus.',
        'Belajar dari 09.15 sampai 10.00: dari 09.15 ke 09.30 ada 15 menit, lalu ke 10.00 ada 30 menit. Total 45 menit.',
      ),
    ],
    activity:
      'Buat jadwal rekaan tiga kegiatan sehari. Atur jarum model sesuai waktu mulai, lalu tentukan waktu selesai dengan lompatan lima belas menit. Pasangan memeriksa durasinya. Tidak perlu membagikan jadwal pribadi atau alamat.',
    practice: [
      p(
        'Jarum panjang di 6 menunjukkan berapa menit?',
        '30 menit',
        'Enam langkah angka besar ×5 menit.',
      ),
      p(
        'Berapa durasi 07.30 sampai 08.00?',
        '30 menit',
        'Setengah putaran menit menuju jam tepat.',
      ),
      p('Tuliskan 3 sore dengan format 24 jam.', '15.00', 'Jam sore setelah 12 ditambah tiga jam.'),
    ],
    recap:
      'Satu jam adalah 60 menit. Bedakan waktu dengan durasi, baca kedua jarum, dan gunakan lompatan pada garis waktu.',
    trap: 'Jangan membaca jarum panjang di 4 sebagai empat menit: nilainya 20 menit. Pengayaan: durasi melintasi pergantian jam dengan menit tidak bulat.',
    quiz: [
      q(
        'Satu jam sama dengan … menit.',
        60,
        [10, 30, 100],
        'Satu putaran jarum menit memerlukan 60 menit.',
      ),
      q(
        'Jarum panjang di angka 9 menunjukkan … menit.',
        45,
        [9, 30, 90],
        'Tiap langkah angka besar lima menit; sembilan langkah berarti 9 × 5 = 45 menit.',
      ),
      q(
        'Dari 10.00 sampai 10.30 berlangsung … menit.',
        30,
        [10, 20, 60],
        'Selisih waktu tersebut setengah jam atau 30 menit.',
      ),
      q(
        'Pukul 13.00 sama dengan …',
        'Pukul satu siang',
        ['Pukul tiga pagi', 'Pukul satu pagi', 'Pukul sebelas malam'],
        'Dalam format 24 jam, 13 − 12 = 1 siang.',
      ),
      q(
        'Mulai 08.45, selesai 09.00. Durasinya … menit.',
        15,
        [45, 55, 60],
        'Dari menit 45 ke menit 60 tersisa 15 menit.',
      ),
    ],
  },
  {
    start:
      'Data adalah catatan yang membantu menjawab pertanyaan. Piktogram memakai gambar untuk menyatakan banyaknya data. Gambar perlu keterangan nilai agar pembaca tahu apakah satu gambar berarti satu, dua, atau lebih benda.',
    sections: [
      s(
        'Mengumpulkan dan mengelompokkan data',
        'Tentukan pertanyaan yang jelas, misalnya buah pilihan sekelompok anak. Setiap jawaban dicatat satu kali sesuai aturan. Kelompokkan jawaban yang sejenis dan hitung frekuensinya. Jangan mengubah pilihan agar sesuai dugaan kita. Data pilihan kelompok kecil hanya menceritakan kelompok yang diamati.',
        'Lima anak memilih pisang dan tiga memilih jeruk. Tabel mencatat pisang 5, jeruk 3. Jumlah responden adalah delapan, bukan hanya banyaknya jenis buah.',
      ),
      s(
        'Menggambar piktogram dan membaca kunci',
        'Gunakan gambar sejenis dan ukuran sama. Cantumkan judul, kategori, dan kunci nilai satu gambar. Jika satu gambar mewakili dua anak, tiga gambar berarti enam anak. Bila jumlah tidak habis dibagi nilai gambar, pilih kunci yang sesuai atau jelaskan gambar sebagian; pada latihan awal gunakan jumlah yang habis dibagi.',
        'Kunci satu bintang = 2 suara. Baris apel mempunyai empat bintang, sehingga apel mendapat 4 × 2 = 8 suara.',
      ),
      s(
        'Membandingkan dan menyimpulkan',
        'Baca nilai kategori sebelum mencari jumlah atau selisih. Terbanyak berarti frekuensi paling tinggi; paling sedikit berarti frekuensi paling rendah. Gunakan angka pada diagram untuk mendukung pernyataan. Diagram tidak memberitahukan alasan seseorang memilih kecuali alasan itu juga dikumpulkan.',
        'Dengan kunci satu lingkaran = satu anak, mangga 6 lingkaran dan salak 4 lingkaran berbeda dua anak. Kita tidak dapat menyimpulkan semua anak di sekolah memilih mangga.',
      ),
    ],
    activity:
      'Tanyakan pilihan dua warna pada anggota kelompok belajar tanpa mencatat nama. Buat tabel dan piktogram dengan kunci satu gambar satu suara. Pasangan membaca kategori terbanyak dan membuktikan total gambar sama dengan jumlah jawaban.',
    practice: [
      p('Satu gambar = 2 buku. Lima gambar berarti?', '10 buku', '5 × 2 = 10.'),
      p('Data A=7 dan B=4. Berapa selisihnya?', '3', '7 − 4 = 3.'),
      p(
        'Apa yang wajib dijelaskan agar gambar dapat dihitung?',
        'Kunci nilai satu gambar.',
        'Tanpa kunci, jumlah yang diwakili tiap gambar belum jelas.',
      ),
    ],
    recap:
      'Data dicatat dan dikelompokkan. Piktogram mempunyai judul, kategori, dan kunci. Hitung nilai gambar sebelum menyimpulkan.',
    trap: 'Anak sering menghitung gambar tanpa membaca kunci. Minta anak menulis nilai tiap gambar dahulu. Pengayaan: tampilkan data sama dengan kunci satu gambar dua suara.',
    quiz: [
      q(
        'Satu gambar = 3 siswa. Empat gambar menyatakan … siswa.',
        12,
        [4, 7, 9],
        'Empat gambar masing-masing mewakili tiga siswa: 4 × 3 = 12 siswa.',
      ),
      q(
        'Merah 8 suara, biru 5 suara. Pilihan terbanyak adalah …',
        'Merah',
        ['Biru', 'Sama banyak', 'Tidak ada data'],
        '8 lebih besar daripada 5.',
      ),
      q(
        'Data 6, 3, dan 5 mempunyai total …',
        14,
        [8, 11, 15],
        'Total mencakup ketiga kategori: 6 + 3 + 5 = 14.',
      ),
      q(
        'Keterangan satu gambar mewakili banyak benda disebut …',
        'Kunci diagram',
        ['Nama pemilik', 'Arah angin', 'Nomor halaman'],
        'Kunci memberi nilai untuk setiap gambar.',
      ),
      q(
        'Survei 9 anak dapat langsung membuktikan pilihan seluruh kota?',
        'Tidak',
        ['Ya selalu', 'Ya jika gambarnya besar', 'Ya jika satu warna'],
        'Sampel kecil itu hanya langsung menggambarkan kelompok yang disurvei.',
      ),
    ],
  },
  {
    start:
      'Bilangan sampai seribu dapat dibentuk dari ratusan, puluhan, dan satuan. Bacalah cerita sebelum memilih operasi. Tuliskan satuan benda dan perkirakan hasil agar kesalahan nilai tempat mudah ditemukan.',
    sections: [
      s(
        'Membaca dan membandingkan bilangan',
        'Nilai angka ditentukan tempatnya. Urai bilangan menjadi jumlah ratusan, puluhan, dan satuan; seribu adalah sepuluh ratusan. Bandingkan dari tempat paling besar, lalu bergerak ke kanan jika nilainya sama. Nol menjaga tempat kosong dan tidak boleh dihapus sesuka hati.',
        '706 = 700 + 0 + 6. Bilangan 760 lebih besar daripada 706 karena puluhannya lebih besar, walaupun kedua bilangan mempunyai angka yang sama.',
      ),
      s(
        'Menjumlahkan dan mengurangkan',
        'Sejajarkan kolom. Pada penjumlahan, sepuluh satuan ditukar menjadi satu puluhan; pada pengurangan pertukaran dapat dibalik. Catat perubahan pada kolom yang dipakai. Kerjakan dari satuan agar pertukaran masuk ke kolom berikutnya. Gunakan operasi kebalikan untuk memeriksa, bukan mengandalkan hafalan prosedur.',
        '368 + 257 = 625: 8 + 7 = 15, 6 + 5 + 1 = 12 puluhan, lalu 3 + 2 + 1 = 6 ratusan. Periksa dengan 625 − 257 = 368.',
      ),
      s(
        'Menyelesaikan masalah dua langkah',
        'Tandai apa yang diketahui dan ditanyakan. Jika ada dua kejadian, ikuti urutannya atau buat diagram. Hitung satu langkah, tulis maknanya, lalu lanjutkan. Tanda kurung membantu menampilkan bagian yang digabung. Perkiraan menggunakan ratusan terdekat dapat memberi pemeriksaan kasar tetapi bukan mengganti hasil tepat.',
        'Perpustakaan mempunyai 450 buku, menerima 125 buku lalu meminjamkan 80. Setelah tambahan ada 575; setelah dipinjam tersisa 495 buku. Ceritanya 450 + 125 − 80.',
      ),
    ],
    activity:
      'Rancang toko buku rekaan dengan stok di bawah seribu. Catat stok awal, tambahan, dan buku keluar. Tukar catatan dengan teman untuk dihitung dan diperiksa memakai operasi kebalikan serta perkiraan.',
    practice: [
      p('Uraikan 809.', '800 + 0 + 9', 'Nol menyatakan tidak ada puluhan.'),
      p('Hitung 476 + 218.', '694', 'Satuan 14 menambah satu ke puluhan; hasilnya 694.'),
      p(
        'Stok 600, terjual 135 lalu masuk 40. Berapa stok akhir?',
        '505',
        '600 − 135 = 465; 465 + 40 = 505.',
      ),
    ],
    recap:
      'Nilai tempat membantu membaca, membandingkan, dan berhitung. Pada cerita dua langkah, urutkan kejadian dan periksa hasil dengan cara lain.',
    trap: 'Jika operasi melintasi nol sulit, gambarkan pertukaran satu ratusan menjadi sepuluh puluhan. Pengayaan: buat dua cerita berbeda dengan operasi dan hasil yang sama.',
    quiz: [
      q('Angka 8 pada 483 bernilai …', 80, [8, 800, 83], '8 berada pada tempat puluhan.'),
      q(
        '527 + 186 = …',
        713,
        [703, 613, 723],
        '7 + 6 = 13, puluhan 2 + 8 + 1 = 11, ratusan 5 + 1 + 1 = 7.',
      ),
      q(
        '800 − 275 = …',
        525,
        [535, 575, 625],
        '800 ditukar menjadi 7 ratusan 9 puluhan 10 satuan; hasil 525.',
      ),
      q(
        'Bilangan terbesar adalah …',
        915,
        [591, 159, 905],
        '915 dan 905 memiliki 9 ratusan, tetapi 915 mempunyai lebih banyak puluhan.',
      ),
      q(
        'Ada 240 buku, masuk 60 lalu keluar 25. Sisanya …',
        275,
        [265, 285, 325],
        '240 + 60 − 25 = 300 − 25 = 275.',
      ),
    ],
  },
  {
    start:
      'Perkalian merangkum penjumlahan kelompok sama banyak. Dalam bab ini a × b dimaknai a kelompok, tiap kelompok berisi b. Gunakan gambar kelompok sebelum menghafal hasilnya.',
    sections: [
      s(
        'Kelompok sama banyak',
        'Sebuah situasi dapat dinyatakan sebagai perkalian jika setiap kelompok berisi sama banyak. Tentukan banyak kelompok dan isi tiap kelompok. Jika isinya berbeda, penjumlahan biasa lebih tepat. Menyebut satuan pada jawaban menjaga hubungan antara operasi dengan cerita.',
        'Empat kantong masing-masing berisi tiga jeruk berarti 3 + 3 + 3 + 3 = 12, atau 4 × 3 = 12 jeruk.',
      ),
      s(
        'Susunan baris dan kolom',
        'Gambar benda sebagai baris yang sama panjang. Banyak seluruh benda dapat dihitung menurut baris atau kolom. Pertukaran faktor memberi hasil sama, meski makna kelompok dalam cerita dapat berbeda. Satu kelompok berisi b benda berjumlah b; kelompok kosong atau nol kelompok memberikan jumlah nol.',
        'Tiga baris masing-masing lima titik berisi 15 titik. Jika dilihat sebagai lima kolom masing-masing tiga, hasil 5 × 3 juga 15.',
      ),
      s(
        'Mengurai perkalian',
        'Gunakan hasil yang sudah dikenal untuk mencari yang baru. Pecah salah satu faktor menjadi dua bagian yang mudah. Hitung hasil tiap bagian lalu gabungkan. Strategi ini disebut sifat distributif dan dapat dibuktikan dengan membagi gambar persegi panjang menjadi dua bagian tanpa kehilangan titik.',
        '6 × 7 = 6 × (5 + 2). Bagian pertama 30, kedua 12; total 42. Periksa dengan enam kelompok tujuh benda.',
      ),
    ],
    activity:
      'Susun kartu dalam empat baris yang masing-masing berisi enam. Baca menurut baris dan kolom. Tutup dua kolom lalu jelaskan bagaimana jumlah keseluruhan diperoleh dari dua bagian yang tidak saling tumpang tindih.',
    practice: [
      p('Lima piring masing-masing empat kue. Berapa kue?', '20 kue', '5 × 4 = 4 + 4 + 4 + 4 + 4.'),
      p('Jelaskan 7 × 3 dengan dua bagian.', '5 × 3 + 2 × 3 = 21', '15 + 6 = 21.'),
      p(
        'Apakah kelompok berisi 2, 3, dan 4 dapat langsung ditulis 3 × 3?',
        'Tidak sebagai model kelompoknya.',
        'Isinya tidak sama; jumlah 2 + 3 + 4 memang 9, tetapi model kelompok berbeda.',
      ),
    ],
    recap:
      'Perkalian menggunakan kelompok sama banyak. Baris-kolom menjelaskan pertukaran faktor; penguraian faktor memudahkan perhitungan.',
    trap: 'Bedakan faktor dengan hasil. Minta anak menggambar dua faktor sebelum berhitung. Pengayaan: periksa satu perkalian dengan dua penguraian berbeda.',
    quiz: [
      q(
        'Enam kotak masing-masing dua pensil berisi … pensil.',
        12,
        [8, 10, 14],
        'Enam kotak masing-masing berisi dua pensil: 6 × 2 = 12 pensil.',
      ),
      q('8 × 4 = …', 32, [12, 24, 36], '8 × (2 + 2) = 16 + 16 = 32.'),
      q('5 × 0 = …', 0, [1, 5, 50], 'Kelompok yang masing-masing kosong berisi nol benda.'),
      q(
        'Penjumlahan yang sesuai 3 kelompok berisi 7 adalah …',
        '7 + 7 + 7',
        ['3 + 7', '3 + 3 + 3', '7 − 3'],
        'Ada tiga kelompok, sehingga tujuh dijumlah tiga kali.',
      ),
      q(
        '9 × 6 dapat dihitung sebagai 9 × 5 + 9 × 1, hasilnya …',
        54,
        [45, 46, 63],
        'Urai enam menjadi lima dan satu: 9×5=45 dan 9×1=9, lalu 45 + 9 = 54.',
      ),
    ],
  },
  {
    start:
      'Pembagian menjawab dua pertanyaan: berapa isi setiap kelompok jika banyak kelompok diketahui, atau berapa kelompok dapat dibentuk jika isi tiap kelompok diketahui. Keduanya membutuhkan kelompok yang sama banyak.',
    sections: [
      s(
        'Berbagi rata',
        'Bagikan benda satu per satu bergiliran ke sejumlah wadah. Setelah semua habis dibagikan, periksa setiap wadah berisi sama banyak. Lambang ÷ dibaca dibagi. Bilangan pertama menyatakan jumlah awal, pembagi menyatakan banyak penerima pada cerita berbagi, dan hasil menyatakan bagian tiap penerima.',
        'Dua puluh kartu dibagi rata ke lima anak. Setiap putaran membagikan lima kartu. Setelah empat putaran setiap anak mendapat empat: 20 ÷ 5 = 4.',
      ),
      s(
        'Membuat kelompok dan menghubungkan perkalian',
        'Jika setiap kelompok harus berisi jumlah tertentu, bentuk kelompok itu sampai benda habis. Hasilnya adalah banyak kelompok. Perkalian dapat memeriksa pembagian: banyak kelompok dikali isi harus sama dengan jumlah awal. Jelaskan satuan hasil agar banyak kelompok tidak tertukar dengan isi tiap kelompok.',
        'Ada 24 kancing; tiap kantong diisi enam. Terbentuk empat kantong: 24 ÷ 6 = 4. Pemeriksaan 4 × 6 = 24.',
      ),
      s(
        'Sisa dan aturan dasar',
        'Tidak semua jumlah habis dibagi. Sisa harus lebih kecil daripada pembagi; jika masih cukup membuat satu kelompok, pembagian belum selesai. Nol benda dibagi ke jumlah kelompok bukan nol menghasilkan nol. Pembagian dengan nol tidak didefinisikan dan tidak boleh dijawab nol. Dalam cerita tertentu benda boleh dipecah, tetapi di sini hitung benda utuh.',
        'Tujuh belas pensil dimasukkan tiga per kotak. Terbentuk lima kotak penuh dan sisa dua, sebab 5 × 3 + 2 = 17 dan 2 lebih kecil dari 3.',
      ),
    ],
    activity:
      'Gunakan 18 kartu. Pertama bagikan kepada tiga boneka; kemudian susun menjadi kelompok berisi tiga. Bandingkan arti hasil enam pada kedua cerita. Ulangi dengan 19 kartu dan jelaskan sisanya.',
    practice: [
      p('28 stiker dibagi rata ke 4 anak.', '7 stiker per anak', '4 × 7 = 28.'),
      p(
        'Berapa kelompok isi 5 dari 23 kartu?',
        '4 kelompok, sisa 3',
        '4 × 5 + 3 = 23 dan sisa kurang dari 5.',
      ),
      p(
        'Mengapa 12 ÷ 0 tidak boleh dijawab 0?',
        'Tidak ada hasil yang memenuhi.',
        '0 dikali bilangan apa pun bukan 12.',
      ),
    ],
    recap:
      'Pembagian memakai kelompok sama banyak. Hasil harus sesuai arti pertanyaan dan dapat diperiksa dengan perkalian; sisa lebih kecil daripada pembagi.',
    trap: 'Minta anak menamai hasil: anak, kantong, atau benda per anak. Jika bingung, kembali ke berbagi konkret. Pengayaan: satu jumlah dapat memberi sisa berbeda untuk pembagi berbeda.',
    quiz: [
      q(
        '30 ÷ 5 = …',
        6,
        [5, 7, 25],
        'Cari bilangan yang dikali lima menghasilkan tiga puluh: 5 × 6 = 30.',
      ),
      q(
        '21 permen dibagi rata kepada 3 anak. Masing-masing mendapat …',
        7,
        [3, 6, 18],
        'Tiga anak masing-masing mendapat tujuh; pemeriksaannya 3 × 7 = 21.',
      ),
      q(
        '26 benda dikelompokkan empat-empat. Hasilnya …',
        '6 kelompok sisa 2',
        ['5 kelompok sisa 6', '7 kelompok sisa 2', '6 kelompok sisa 4'],
        '6 × 4 = 24 dan 26 − 24 = 2; sisa harus kurang dari 4.',
      ),
      q('0 ÷ 8 = …', 0, [1, 8, 80], 'Tidak ada benda dibagikan, setiap kelompok mendapat nol.'),
      q(
        'Pemeriksaan tepat untuk 36 ÷ 9 = 4 adalah …',
        '9 × 4 = 36',
        ['9 + 4 = 36', '36 × 9 = 4', '36 − 4 = 9'],
        'Pembagian dan perkalian saling berkaitan.',
      ),
    ],
  },
  {
    start:
      'Pecahan menyatakan bagian dari keseluruhan yang dibagi sama besar. Keseluruhannya harus jelas: setengah satu pita tidak dapat dibandingkan langsung dengan setengah pita lain yang panjangnya berbeda.',
    sections: [
      s(
        'Membagi sama besar',
        'Lipat gambar persegi panjang menjadi dua, tiga, atau empat bagian sama luas. Satu dari dua bagian ditulis 1/2, satu dari tiga 1/3, dan satu dari empat 1/4. Banyak potongan saja tidak cukup; setiap bagian harus sama besar. Dua bagian tidak sama besar tidak otomatis disebut dua setengah.',
        'Satu kertas dibagi empat kotak sama luas. Mewarnai satu kotak berarti mewarnai 1/4 kertas. Mewarnai tiga berarti 3/4.',
      ),
      s(
        'Pembilang dan penyebut',
        'Angka di bawah garis pecahan adalah penyebut: banyak bagian sama besar pada satu keseluruhan. Angka di atas adalah pembilang: banyak bagian yang dipilih. Jika pembilang sama dengan penyebut, semua bagian terambil sehingga nilainya satu utuh. Gambarkan dahulu sebelum menghubungkan ke lambang.',
        'Pada 2/3, keseluruhan dibagi tiga bagian sama besar dan dua dipilih. Pada 4/4, keempat bagian dipilih, sehingga sama dengan satu.',
      ),
      s(
        'Membandingkan pecahan satuan',
        'Untuk keseluruhan yang sama, semakin banyak bagian pembagiannya, semakin kecil satu bagiannya. Karena itu 1/2 lebih besar daripada 1/3, dan 1/3 lebih besar daripada 1/4. Gunakan pita sama panjang atau garis bilangan 0 sampai 1. Jangan menyimpulkan penyebut lebih besar selalu membuat nilai pecahan lebih besar.',
        'Dua pita sama panjang masing-masing dibagi dua dan empat. Satu bagian dari pita pertama menutupi dua bagian pita kedua: 1/2 = 2/4.',
      ),
    ],
    activity:
      'Lipat dua kertas sama ukuran menjadi dua dan empat bagian. Warnai satu bagian masing-masing, bandingkan luasnya, lalu tunjukkan dua bagian seperempat yang menutupi satu setengah. Gunting hanya dengan bantuan pendamping.',
    practice: [
      p(
        'Apa arti 3/4?',
        'Tiga dari empat bagian sama besar.',
        'Penyebut menunjukkan empat bagian, pembilang tiga yang dipilih.',
      ),
      p(
        'Mana lebih besar: 1/3 atau 1/4 dari kertas sama ukuran?',
        '1/3',
        'Tiga bagian membuat tiap bagian lebih besar daripada empat bagian.',
      ),
      p(
        'Tuliskan pecahan seluruh tiga potong dari tiga bagian.',
        '3/3 = 1',
        'Semua bagian dari satu keseluruhan diambil.',
      ),
    ],
    recap:
      'Pecahan memerlukan bagian sama besar dan keseluruhan jelas. Pembilang memilih bagian, penyebut menyatakan pembagian keseluruhan.',
    trap: 'Jika anak memilih 1/4 lebih besar dari 1/2 karena angka 4, kembali ke pita sama panjang. Pengayaan: temukan pecahan senilai melalui lipatan.',
    quiz: [
      q(
        'Satu dari tiga bagian sama besar ditulis …',
        '1/3',
        ['3/1', '1/2', '3/3'],
        'Penyebut tiga menyatakan pembagian, pembilang satu menyatakan bagian yang dipilih.',
      ),
      q('Penyebut pada 3/4 adalah …', 4, [1, 3, 7], 'Angka bawah garis pecahan adalah penyebut.'),
      q(
        'Untuk keseluruhan sama, pecahan terbesar adalah …',
        '1/2',
        ['1/3', '1/4', '1/8'],
        'Membagi dua menghasilkan bagian satuan terbesar di antara pilihan.',
      ),
      q('Dua dari dua bagian sama besar bernilai …', 1, [0, 2, 4], '2/2 adalah satu keseluruhan.'),
      q(
        'Syarat dua potongan disebut masing-masing setengah adalah …',
        'Keduanya sama besar',
        ['Warnanya sama', 'Keduanya bernama sama', 'Salah satunya lebih besar'],
        'Pecahan bagian keseluruhan memerlukan pembagian sama besar.',
      ),
    ],
  },
  {
    start:
      'Faktor membagi suatu bilangan sampai habis. Kelipatan diperoleh dari perkalian dengan bilangan bulat. FPB berguna untuk membagi menjadi kelompok terbesar yang sama, sedangkan KPK dapat mencari pertemuan jadwal berulang.',
    sections: [
      s(
        'Mencari faktor dan kelipatan',
        'Buat pasangan perkalian untuk menemukan faktor positif. Faktor dari 12 muncul pada 1 × 12, 2 × 6, dan 3 × 4. Kelipatan positif 12 diperoleh dari 12 × 1, 12 × 2, dan seterusnya. Daftar faktor terbatas, sedangkan kelipatan dapat diteruskan. Nol dapat dipandang kelipatan, tetapi tidak dipakai saat mencari KPK positif.',
        'Faktor 12 adalah 1, 2, 3, 4, 6, 12. Beberapa kelipatan positif 4 adalah 4, 8, 12, 16, 20.',
      ),
      s(
        'Faktor persekutuan terbesar',
        'Daftarkan faktor kedua bilangan, pilih yang sama, lalu ambil yang paling besar. FPB dapat menunjukkan banyak paket identik maksimum yang dapat dibuat dari dua jenis benda tanpa sisa. Setiap paket harus mempunyai komposisi yang sama, bukan sekadar total benda yang sama.',
        'Faktor 18: 1, 2, 3, 6, 9, 18. Faktor 24: 1, 2, 3, 4, 6, 8, 12, 24. Faktor sama terbesar adalah 6. Jadi 18 kartu dan 24 stiker dapat menjadi enam paket identik.',
      ),
      s(
        'Kelipatan persekutuan terkecil',
        'Tuliskan kelipatan positif kedua bilangan sampai menemukan yang sama paling kecil. Pada cerita jadwal, tetapkan titik mulai yang sama dan cari lama sampai kedua kejadian bertemu lagi. Tidak semua cerita menggunakan KPK; periksa apakah situasinya pengulangan waktu atau pembentukan kelompok.',
        'Lampu A berkedip tiap 4 detik, B tiap 6 detik, mulai bersama. Kelipatan 4: 4, 8, 12; kelipatan 6: 6, 12. Keduanya bersama lagi setelah 12 detik.',
      ),
    ],
    activity:
      'Gunakan kartu bilangan 1–30. Tandai faktor dua bilangan dengan warna berbeda dan cari irisannya. Pada garis waktu terpisah tandai lompatan dua jadwal untuk mencari pertemuan pertama. Jelaskan perbedaan kedua proses.',
    practice: [
      p('Tuliskan faktor 16.', '1, 2, 4, 8, 16', 'Pasangannya 1×16, 2×8, dan 4×4.'),
      p('Tentukan FPB 12 dan 20.', '4', 'Faktor sama 1, 2, 4; terbesar 4.'),
      p('Tentukan KPK 3 dan 5.', '15', 'Kelipatan positif pertama yang sama adalah 15.'),
    ],
    recap:
      'Faktor membagi habis, kelipatan berasal dari perkalian. FPB memilih faktor sama terbesar; KPK memilih kelipatan positif sama terkecil.',
    trap: 'Gunakan daftar faktor untuk pembagian paket dan daftar kelipatan untuk jadwal. Jangan menentukan operasi hanya dari kata bersama; jelaskan besaran yang dicari.',
    quiz: [
      q('Yang merupakan faktor 18 adalah …', 6, [4, 5, 7], '18 ÷ 6 = 3 tanpa sisa.'),
      q('FPB 16 dan 24 adalah …', 8, [4, 6, 12], 'Faktor persekutuan 1, 2, 4, 8; terbesar 8.'),
      q(
        'KPK 6 dan 8 adalah …',
        24,
        [12, 14, 48],
        '24 adalah kelipatan positif terkecil yang dibagi habis oleh 6 dan 8.',
      ),
      q(
        'Dua jadwal berulang tiap 5 dan 10 hari mulai bersama. Bertemu lagi setelah … hari.',
        10,
        [5, 15, 50],
        'KPK 5 dan 10 adalah 10.',
      ),
      q(
        '15 pensil dan 20 penghapus dibuat paket identik terbanyak tanpa sisa. Banyak paket …',
        5,
        [3, 10, 15],
        'FPB 15 dan 20 adalah 5; tiap paket berisi 3 pensil dan 4 penghapus.',
      ),
    ],
  },
  {
    start:
      'Pecahan, desimal, dan persen adalah cara berbeda menuliskan nilai. Gunakan satu keseluruhan yang sama, misalnya satu persegi seratus petak, agar hubungan nilainya terlihat.',
    sections: [
      s(
        'Pecahan senilai',
        'Kalikan atau bagi pembilang dan penyebut dengan bilangan bukan nol yang sama. Nilainya tetap karena keseluruhan dan bagian dipotong dengan perbandingan yang sama. Menambah angka sama pada pembilang dan penyebut bukan aturan pecahan senilai. Sederhanakan dengan membagi oleh faktor persekutuan.',
        '2/3 = 4/6 karena pembilang dan penyebut dikali 2. Pecahan 6/8 disederhanakan menjadi 3/4 dengan membagi keduanya oleh 2.',
      ),
      s(
        'Desimal persepuluhan dan perseratusan',
        'Angka pertama setelah koma menyatakan persepuluhan, yang kedua perseratusan. Pecahan 3/10 ditulis 0,3 dan 7/100 ditulis 0,07. Nol di akhir desimal tidak mengubah nilai: 0,5 = 0,50. Bandingkan dengan menyamakan banyak tempat desimal atau memakai model petak.',
        'Pada 0,46 ada empat persepuluhan dan enam perseratusan, total 46/100. Nilai 0,6 lebih besar daripada 0,46 karena 60/100 > 46/100.',
      ),
      s(
        'Persen sebagai per seratus',
        'Simbol % berarti per seratus. Ubah pecahan ke penyebut 100 jika memungkinkan, lalu tulis persennya. Ubah desimal ke persen dengan mengalikan nilai dengan 100 dan memberi simbol persen. Persen harus terkait suatu keseluruhan; 50% dari dua jumlah berbeda dapat memberi banyak yang berbeda.',
        '3/4 = 75/100 = 0,75 = 75%. Setengah dari 20 benda adalah 10 benda, sedangkan setengah dari 40 adalah 20 benda; keduanya tetap 50% kelompoknya.',
      ),
    ],
    activity:
      'Warnai 25 dari seratus petak, lalu tulis sebagai pecahan sederhana, desimal, dan persen. Buat dua contoh lain dan minta pasangan menempatkannya pada garis bilangan 0–1.',
    practice: [
      p('Sederhanakan 8/12.', '2/3', 'Bagi pembilang dan penyebut dengan 4.'),
      p('Ubah 0,4 ke persen.', '40%', '0,4 = 40/100.'),
      p(
        'Mana lebih besar: 0,35 atau 0,5?',
        '0,5',
        '0,5 = 0,50; 50 perseratus lebih besar dari 35 perseratus.',
      ),
    ],
    recap:
      'Pecahan senilai memakai perkalian/pembagian faktor sama. Desimal bergantung nilai tempat, dan persen berarti bagian dari seratus.',
    trap: 'Jangan membandingkan hanya jumlah digit: 0,8 lebih besar daripada 0,75. Kembali ke petak seratus. Pengayaan: persen suatu kumpulan dengan keseluruhan berbeda.',
    quiz: [
      q(
        'Pecahan senilai 1/2 adalah …',
        '3/6',
        ['2/3', '1/4', '3/4'],
        'Pembilang dan penyebut dikali 3.',
      ),
      q(
        '0,25 sama dengan …',
        '25%',
        ['2,5%', '250%', '0,25%'],
        '0,25 adalah 25/100; persen berarti per seratus, sehingga nilainya 25%.',
      ),
      q(
        '3/5 ditulis sebagai desimal …',
        '0,6',
        ['0,3', '0,35', '0,06'],
        'Kalikan pembilang dan penyebut dengan dua: 3/5 = 6/10 = 0,6.',
      ),
      q(
        '75% sama dengan …',
        '3/4',
        ['1/4', '1/2', '3/5'],
        '75/100 disederhanakan dengan membagi 25 menjadi 3/4.',
      ),
      q(
        'Nilai terbesar adalah …',
        '0,9',
        ['0,75', '0,09', '0,8'],
        'Samakan menjadi 0,90; 0,75; 0,09; 0,80.',
      ),
    ],
  },
  {
    start:
      'Keliling mengukur panjang batas, sedangkan luas mengukur daerah di dalam batas. Dua bangun dapat berkeliling sama namun luasnya berbeda. Tuliskan satuan yang sesuai agar kedua besaran tidak tertukar.',
    sections: [
      s(
        'Keliling sebagai perjalanan di tepi',
        'Telusuri seluruh batas satu kali dan jumlahkan panjang tiap sisi. Persegi dengan sisi s mempunyai keliling 4 × s. Persegi panjang dengan panjang p dan lebar l mempunyai keliling 2 × (p + l). Semua panjang harus dalam satuan yang sama sebelum dijumlahkan.',
        'Kebun persegi panjang 8 m × 5 m mempunyai batas 8 + 5 + 8 + 5 = 26 m. Angka 40 bukan kelilingnya karena 8 × 5 menghitung luas.',
      ),
      s(
        'Luas dengan petak satuan',
        'Tutupi daerah dengan petak sama besar tanpa celah atau tumpang tindih. Persegi panjang berisi l baris dengan p petak tiap baris sehingga luas p × l. Satuan luas ditulis persegi, misalnya cm². Persegi merupakan kasus p dan l sama: luas s × s.',
        'Kertas 7 cm × 4 cm dapat ditutup 28 petak masing-masing satu cm². Jadi luasnya 28 cm²; kelilingnya 22 cm.',
      ),
      s(
        'Segitiga dan bangun gabungan',
        'Dua segitiga kongruen dapat membentuk satu persegi panjang atau jajargenjang. Luas segitiga adalah setengah alas kali tinggi tegak lurus. Untuk daerah gabungan, pecah menjadi bagian tidak tumpang tindih, hitung lalu jumlahkan atau kurangi bagian yang hilang. Tinggi harus tegak lurus alas, bukan sembarang sisi miring.',
        'Segitiga dengan alas 10 cm dan tinggi 6 cm luasnya 1/2 × 10 × 6 = 30 cm². Memiringkan gambar tidak mengubah aturan alas-tinggi.',
      ),
    ],
    activity:
      'Pada kertas petak, gambar dua persegi panjang berkeliling 20 satuan, misalnya 6×4 dan 7×3. Hitung luasnya dan jelaskan mengapa keliling sama tidak menjamin luas sama. Uji dengan menghitung petak.',
    practice: [
      p('Persegi sisi 9 cm: keliling dan luas?', '36 cm dan 81 cm²', 'Keliling 4×9; luas 9×9.'),
      p('Persegi panjang 12 m × 3 m: luas?', '36 m²', '12×3 petak persegi meter.'),
      p('Segitiga alas 8 cm tinggi 5 cm: luas?', '20 cm²', 'Setengah dari 8×5.'),
    ],
    recap:
      'Keliling menjumlah panjang batas. Luas menghitung petak daerah. Rumus berasal dari susunan bentuk, dan satuannya berbeda.',
    trap: 'Minta siswa menyebut apakah pagar atau ubin yang dicari. Gunakan benang untuk batas dan petak untuk luas. Pengayaan: daerah berbentuk L dengan sisi yang belum tertulis.',
    quiz: [
      q(
        'Keliling persegi sisi 6 cm adalah … cm.',
        24,
        [12, 18, 36],
        'Jumlah empat sisi sama panjang: 4 × 6 = 24 cm.',
      ),
      q(
        'Luas persegi panjang 9 cm × 5 cm adalah … cm².',
        45,
        [14, 28, 40],
        'Luas = panjang kali lebar: 9 × 5 = 45 petak satu sentimeter persegi.',
      ),
      q(
        'Segitiga alas 12 cm tinggi 4 cm luasnya … cm².',
        24,
        [16, 48, 32],
        'Luas segitiga setengah alas kali tinggi: 1/2 × 12 × 4 = 24 cm².',
      ),
      q(
        'Satuan yang tepat untuk luas lantai adalah …',
        'm²',
        ['m', 'cm per detik', 'kg'],
        'Luas mengukur daerah dua dimensi dalam satuan persegi.',
      ),
      q(
        'Persegi panjang 7 m × 2 m memerlukan pagar sepanjang … m.',
        18,
        [9, 14, 28],
        'Keliling 2 × (7 + 2) = 18 m.',
      ),
    ],
  },
  {
    start:
      'Diagram batang menyajikan banyak data dengan panjang batang. Kita perlu membaca judul, sumbu, satuan, dan skala sebelum membandingkan. Tinggi batang saja belum cukup tanpa tahu angka skalanya.',
    sections: [
      s(
        'Dari tabel ke diagram',
        'Tentukan kategori pada satu sumbu dan frekuensi pada sumbu lainnya. Gunakan batang dengan lebar sama dan jarak yang konsisten. Untuk data kategori, batang terpisah membantu membedakan kelompok. Tuliskan judul dan satuan. Mulai skala frekuensi dari nol pada diagram sederhana supaya perbandingan panjang tidak menyesatkan.',
        'Tabel tanaman: cabai 8, tomat 6, terung 4. Buat tiga batang dengan tinggi 8, 6, dan 4 pada skala satu kotak satu tanaman.',
      ),
      s(
        'Membaca skala dengan teliti',
        'Lihat selisih dua tanda angka berurutan. Jika tanda sumbu adalah 0, 5, 10, 15, tiap interval bernilai lima. Hitung posisi ujung batang sesuai skala, bukan banyak garis tanpa memperhatikan nilainya. Sumbu yang dipotong atau tidak berawal nol perlu dijelaskan karena dapat memperbesar perbedaan tampak.',
        'Batang mencapai tanda ketiga setelah nol pada skala 0, 2, 4, 6. Nilainya 6, bukan 3. Skala satu kotak dua harus diterapkan untuk semua batang.',
      ),
      s(
        'Membuat kesimpulan berbukti',
        'Cari kategori terbesar/terkecil, total, dan selisih menggunakan nilai yang terbaca. Pisahkan temuan dari dugaan penyebab. Diagram penjualan tidak langsung menjelaskan mengapa suatu hari lebih laku. Batas sampel dan waktu pengumpulan perlu disebut supaya kesimpulan tidak meluas ke kelompok yang tidak diamati.',
        'Senin 12 buku, Selasa 18 buku, Rabu 10 buku. Total 40; Selasa terbanyak dan enam lebih banyak dari Senin. Alasan kenaikan belum diketahui dari diagram saja.',
      ),
    ],
    activity:
      'Catat jumlah tiga jenis benda kelas tanpa data pribadi. Buat tabel dan dua diagram dengan skala satu dan dua jika sesuai. Minta pasangan membaca keduanya; hasil numeriknya harus tetap sama walau tinggi dalam kotak berbeda.',
    practice: [
      p('Data A=14, B=8, C=10. Berapa total?', '32', '14 + 8 + 10 = 32.'),
      p('Apa selisih A dan B?', '6', '14 − 8 = 6.'),
      p(
        'Satu interval bernilai 5. Batang empat interval dari nol bernilai?',
        '20',
        '4×5 = 20, bukan 4.',
      ),
    ],
    recap:
      'Judul, sumbu, skala dan satuan memberi makna diagram. Kesimpulan yang baik menyebut angka dan batas data.',
    trap: 'Jika siswa menghitung garis sebagai satuan, tuliskan nilai setiap tanda sumbu. Pengayaan: bandingkan dua diagram data sama dengan skala berbeda dan temukan potensi pembacaan menyesatkan.',
    quiz: [
      q(
        'Batang 3 interval dengan nilai tiap interval 4 menunjukkan …',
        12,
        [3, 4, 7],
        'Banyak interval dikali nilai tiap interval: 3 × 4 = 12.',
      ),
      q(
        'Data 9, 15, 6 mempunyai total …',
        30,
        [21, 24, 36],
        'Jumlahkan seluruh kategori untuk total: 9 + 15 + 6 = 30.',
      ),
      q(
        'Selisih data terbesar 15 dan terkecil 6 adalah …',
        9,
        [6, 8, 21],
        'Selisih adalah nilai terbesar dikurangi terkecil: 15 − 6 = 9.',
      ),
      q(
        'Yang perlu dibaca sebelum tinggi batang adalah …',
        'Skala sumbu',
        ['Warna baju pembuat', 'Harga kertas', 'Nama teman'],
        'Skala menentukan nilai setiap interval.',
      ),
      q(
        'Diagram penjualan naik membuktikan pembeli suka warna toko?',
        'Belum dapat disimpulkan',
        ['Ya pasti', 'Ya jika batang tinggi', 'Tidak perlu data lagi'],
        'Penyebab kenaikan memerlukan informasi lain.',
      ),
    ],
  },
  {
    start:
      'Menjumlahkan pecahan memerlukan satuan bagian yang sama. Setengah dan sepertiga tidak dapat langsung dihitung sebagai bagian sejenis. Gunakan pita atau petak untuk melihat mengapa penyebut perlu disamakan.',
    sections: [
      s(
        'Mencari satuan pecahan bersama',
        'Pecahan senilai mempunyai nilai sama walaupun tulisan berbeda. Pilih kelipatan bersama penyebut, kemudian kalikan pembilang dan penyebut dengan faktor yang sama. KPK biasanya memberi penyebut bersama terkecil sehingga hitungan lebih sederhana. Mengubah penyebut saja akan mengubah nilai.',
        'Untuk 1/4 dan 1/6, gunakan penyebut 12. Nilainya menjadi 3/12 dan 2/12. Keduanya sekarang memakai bagian berukuran seperdua belas.',
      ),
      s(
        'Menjumlah dan mengurangi pembilang',
        'Setelah penyebut sama, jumlahkan atau kurangi pembilangnya dan pertahankan penyebut. Penyebut menyatakan ukuran satu bagian, bukan banyak bagian yang terkumpul. Sederhanakan hasil jika mungkin. Pada pengurangan dalam bab ini pilih bilangan pertama tidak lebih kecil jika belum mempelajari pecahan negatif.',
        '2/3 + 1/4 = 8/12 + 3/12 = 11/12. Sementara 5/6 − 1/3 = 5/6 − 2/6 = 3/6 = 1/2.',
      ),
      s(
        'Pecahan campuran dan pemeriksaan',
        'Pecahan campuran terdiri atas bagian bulat dan pecahan. Ubah ke pecahan biasa dengan mengalikan bilangan bulat oleh penyebut lalu menambahkan pembilang. Hitung memakai penyebut bersama, lalu ubah kembali jika diperlukan. Perkirakan hasil dan bandingkan dengan pecahan awal agar kesalahan mudah terlihat.',
        '1 1/2 + 2/3 = 3/2 + 2/3 = 9/6 + 4/6 = 13/6 = 2 1/6. Hasil harus lebih besar dari 1 1/2 karena ditambah bilangan positif.',
      ),
    ],
    activity:
      'Buat dua pita satuan sama panjang. Tandai seperdua dan seperempat, lalu bagilah pita menjadi bagian yang sama untuk menunjukkan penjumlahan. Tuliskan perhitungan di bawah gambar dan jelaskan mengapa penyebut hasil bukan jumlah penyebut.',
    practice: [
      p('Hitung 1/2 + 1/3.', '5/6', '3/6 + 2/6 = 5/6.'),
      p('Hitung 3/4 − 1/6.', '7/12', '9/12 − 2/12 = 7/12.'),
      p('Hitung 1 1/4 + 1/2.', '1 3/4', '5/4 + 2/4 = 7/4.'),
    ],
    recap:
      'Samakan ukuran bagian dengan pecahan senilai, operasikan pembilang, pertahankan penyebut, lalu sederhanakan dan periksa.',
    trap: 'Kesalahan 1/2 + 1/3 = 2/5 dapat diuji dengan gambar: hasilnya harus lebih dari setengah, sedangkan 2/5 kurang dari setengah. Mulai dari penyebut berkelipatan dahulu.',
    quiz: [
      q('1/3 + 1/6 = …', '1/2', ['2/9', '1/9', '2/3'], '2/6 + 1/6 = 3/6 = 1/2.'),
      q('3/5 − 1/4 = …', '7/20', ['2/1', '2/9', '11/20'], '12/20 − 5/20 = 7/20.'),
      q('2/3 + 1/5 = …', '13/15', ['3/8', '7/15', '11/15'], '10/15 + 3/15 = 13/15.'),
      q(
        '1 1/2 − 1/4 = …',
        '1 1/4',
        ['1/4', '1 3/4', '2'],
        'Ubah ke perempat: 6/4 − 1/4 = 5/4, yaitu satu dan seperempat.',
      ),
      q(
        'Langkah tepat sebelum menjumlah 1/4 dan 1/3 adalah …',
        'Mencari penyebut sama',
        ['Menjumlah penyebut', 'Mengurangi penyebut', 'Menghapus pembilang'],
        'Bagian yang dihitung harus mempunyai ukuran sama.',
      ),
    ],
  },
  {
    start:
      'Perkalian pecahan dapat dimaknai mengambil sebagian dari sebagian. Pembagian pecahan menanyakan berapa kali suatu bagian termuat. Model gambar membantu memahami prosedur sebelum memakai aturan hitung.',
    sections: [
      s(
        'Sebagian dari sebagian',
        'Untuk mengalikan dua pecahan, kalikan pembilang dengan pembilang dan penyebut dengan penyebut. Model persegi panjang menunjukkan daerah irisan dua pembagian. Jika faktor positif kurang dari satu, hasil perkalian lebih kecil dari bilangan yang dikalikan; perkalian tidak selalu memperbesar.',
        'Setengah dari tiga perempat kertas adalah 1/2 × 3/4 = 3/8. Bagi kertas menjadi empat kolom lalu dua baris; irisan mencakup tiga dari delapan petak.',
      ),
      s(
        'Pembagian dan kebalikan',
        'Membagi dengan pecahan bukan nol sama dengan mengalikan kebalikannya. Kebalikan a/b adalah b/a jika a bukan nol. Alasannya, kita mencari berapa kelompok berukuran pembagi yang termuat pada jumlah awal. Tidak perlu menyamakan penyebut untuk memakai aturan ini, walau model bagian sama dapat membantu pembuktian.',
        'Dua liter dibagi ke gelas berisi 1/4 liter menghasilkan 8 gelas: 2 ÷ 1/4 = 2 × 4 = 8. Membagi bilangan positif dengan bagian kurang dari satu dapat memperbesar hasil.',
      ),
      s(
        'Menyederhanakan dan memeriksa',
        'Ubah pecahan campuran menjadi pecahan biasa sebelum operasi. Sederhanakan faktor pembilang dan penyebut yang mempunyai faktor bersama, lalu kalikan. Pada pembagian balik hanya pecahan pembagi, bukan keduanya. Periksa dengan mengalikan hasil bagi oleh pembagi untuk kembali ke jumlah awal.',
        '1 1/2 ÷ 3/4 = 3/2 × 4/3 = 2. Pemeriksaan: 2 × 3/4 = 3/2 = 1 1/2.',
      ),
    ],
    activity:
      'Gambar pita dua satuan dan tandai bagian seperdua. Hitung berapa bagian seperdua di dalam dua satuan, kemudian bandingkan dengan setengah dari dua. Jelaskan mengapa pembagian dan perkalian menghasilkan jawaban berbeda.',
    practice: [
      p('Hitung 2/3 × 3/5.', '2/5', '6/15 disederhanakan menjadi 2/5.'),
      p('Hitung 3 ÷ 1/2.', '6', 'Ada enam bagian setengah dalam tiga satuan.'),
      p('Hitung 5/6 ÷ 5/3.', '1/2', '5/6 × 3/5 = 15/30.'),
    ],
    recap:
      'Perkalian menghitung bagian dari bagian. Pembagian dengan pecahan bukan nol mengalikan kebalikan pembagi. Periksa makna dan ukuran hasil.',
    trap: 'Jangan membalik pecahan pertama pada pembagian. Jika hasil terasa aneh, gambarkan banyak gelas kecil dalam sejumlah liter. Pengayaan: soal campuran dengan satuan yang konsisten.',
    quiz: [
      q('3/4 × 2/5 = …', '3/10', ['5/9', '6/9', '3/5'], '6/20 disederhanakan menjadi 3/10.'),
      q('4 ÷ 1/2 = …', 8, [2, 4, 6], 'Empat satuan memuat delapan bagian setengah.'),
      q('2/3 ÷ 4/5 = …', '5/6', ['8/15', '6/5', '2/5'], '2/3 × 5/4 = 10/12 = 5/6.'),
      q('1 1/2 × 2/3 = …', 1, ['1/2', 2, 3], '3/2 × 2/3 = 6/6 = 1.'),
      q(
        'Yang dibalik saat menghitung a ÷ b, b pecahan bukan nol, adalah …',
        'Pecahan pembagi b',
        ['Keduanya selalu', 'Pecahan a saja', 'Tidak ada, jumlahkan saja'],
        'Pembagian menjadi perkalian dengan kebalikan pembagi.',
      ),
    ],
  },
  {
    start:
      'Kecepatan rata-rata membandingkan jarak dengan waktu tempuh total. Gunakan cerita perjalanan rekaan; tidak perlu menguji kecepatan di jalan. Satuan jarak dan waktu harus sesuai sebelum dihitung.',
    sections: [
      s(
        'Makna kecepatan rata-rata',
        'Kecepatan rata-rata dihitung jarak total dibagi waktu total. Satuan km/jam menyatakan banyak kilometer yang setara ditempuh tiap jam secara rata-rata. Kecepatan sesaat dapat berubah sepanjang perjalanan. Jika soal memasukkan berhenti dalam waktu total, waktu berhenti harus ikut dihitung.',
        'Sebuah bus menempuh 120 km dalam 3 jam, termasuk waktu berhenti yang disebut soal. Kecepatan rata-ratanya 120 ÷ 3 = 40 km/jam.',
      ),
      s(
        'Hubungan jarak, waktu, dan kecepatan',
        'Jika kecepatan dianggap tetap, jarak = kecepatan × waktu dan waktu = jarak ÷ kecepatan. Rumus berasal dari pengulangan jarak setiap satuan waktu, bukan dari hafalan letak huruf. Tuliskan apa yang diketahui dan ditanya agar operasi yang dipilih sesuai.',
        'Sepeda bergerak rata-rata 12 km/jam selama 2 jam. Jarak 24 km. Untuk jarak 18 km pada laju sama, waktunya 18/12 = 1,5 jam.',
      ),
      s(
        'Konversi dan kewajaran hasil',
        'Satu jam sama dengan 60 menit, sehingga 30 menit adalah 1/2 jam dan 15 menit adalah 1/4 jam. Satu kilometer sama dengan 1000 meter. Jangan memakai 30 sebagai jam ketika satuan kecepatan km/jam. Periksa: pada laju sama, waktu dua kali lebih lama memberi jarak dua kali lebih jauh.',
        'Berjalan 6 km/jam selama 20 menit berarti 20/60 = 1/3 jam. Jaraknya 6 × 1/3 = 2 km, bukan 120 km.',
      ),
    ],
    activity:
      'Buat tabel perjalanan tokoh dengan laju tetap pada 15, 30, dan 60 menit. Gambar grafik jarak sederhana dan bandingkan pengaruh durasi. Jelaskan asumsi tidak ada perubahan laju pada model tersebut.',
    practice: [
      p('Jarak 150 km dalam 3 jam. Kecepatan rata-rata?', '50 km/jam', '150 ÷ 3 = 50.'),
      p('Laju 8 km/jam selama 45 menit. Jarak?', '6 km', '45/60 = 3/4 jam; 8×3/4 = 6.'),
      p('Jarak 24 km pada 16 km/jam. Waktu?', '1,5 jam', '24 ÷ 16 = 1,5; setara 90 menit.'),
    ],
    recap:
      'Kecepatan rata-rata = jarak total/waktu total. Samakan satuan, pilih hubungan yang sesuai, lalu periksa kewajaran hasil.',
    trap: '0,5 jam bukan lima menit tetapi 30 menit. Pengayaan: kecepatan rata-rata dua ruas tidak selalu rata-rata aritmetika dua kecepatannya; gunakan jarak total dan waktu total.',
    quiz: [
      q(
        '180 km ditempuh 3 jam. Kecepatan rata-rata … km/jam.',
        60,
        [30, 90, 540],
        'Kecepatan rata-rata = jarak total dibagi waktu total: 180 ÷ 3 = 60 km/jam.',
      ),
      q(
        'Laju 10 km/jam selama 30 menit menempuh … km.',
        5,
        [3, 10, 300],
        '30 menit = 1/2 jam; 10×1/2 = 5.',
      ),
      q(
        'Waktu untuk 36 km pada 12 km/jam adalah … jam.',
        3,
        [2, 4, 24],
        'Waktu = jarak dibagi kecepatan: 36 km ÷ 12 km/jam = 3 jam.',
      ),
      q(
        '15 menit sama dengan … jam.',
        '1/4',
        ['1/15', '1/2', '15'],
        'Satu jam berisi enam puluh menit; 15/60 disederhanakan menjadi 1/4 jam.',
      ),
      q(
        'Dua ruas masing-masing 30 km ditempuh 1 jam dan 2 jam. Kecepatan rata-rata total … km/jam.',
        20,
        [15, 22.5, 30],
        'Jarak total 60 km, waktu total 3 jam; 60÷3 = 20.',
      ),
    ],
  },
  {
    start:
      'Volume mengukur ruang yang ditempati bangun. Satuan kubik berasal dari kubus satuan. Amati kotak tanpa memanjat atau membawa beban berat; buat model dengan balok ringan.',
    sections: [
      s(
        'Kubus satuan dan lapisan',
        'Isi model kotak dengan kubus berukuran sama tanpa celah. Hitung banyak kubus di dasar, lalu kalikan banyak lapisan. Balok panjang p, lebar l dan tinggi t mempunyai volume p × l × t karena tiap lapisan berisi p × l satuan dan ada t lapisan. Satuan panjang harus sama.',
        'Balok 5 cm × 3 cm × 4 cm memuat 15 kubus per lapisan dan empat lapisan. Volumenya 60 cm³.',
      ),
      s(
        'Kubus dan rusuk',
        'Kubus adalah balok dengan seluruh rusuk sama panjang. Jika rusuk s, volumenya s × s × s atau s³. Pangkat tiga bukan berarti mengalikan angka dengan tiga. Volume berbeda dari luas permukaan: volume mengisi bagian dalam, luas permukaan menutupi sisi luarnya.',
        'Kubus rusuk 4 cm bervolume 4×4×4 = 64 cm³, bukan 12 cm³. Satu lapis berisi 16 kubus dan ada empat lapis.',
      ),
      s(
        'Satuan dan ukuran yang belum diketahui',
        'Satu liter setara satu dm³ dan 1000 cm³. Ketika mencari tinggi, bagi volume oleh luas alas yang sesuai. Bedakan ukuran luar kotak dengan kapasitas dalam jika ketebalan dinding diketahui. Dalam soal dasar kita menggunakan ukuran ruang dalam atau mengabaikan ketebalan jika dinyatakan demikian.',
        'Kotak volume 120 cm³ mempunyai alas 6 cm × 5 cm. Tinggi = 120 ÷ 30 = 4 cm. Kapasitas 2000 cm³ setara 2 liter.',
      ),
    ],
    activity:
      'Susun 24 kubus satuan menjadi beberapa balok, misalnya 6×2×2 dan 4×3×2. Catat ukuran dan volume. Jelaskan mengapa bentuk berubah tetapi volume tetap 24 satuan kubik.',
    practice: [
      p('Balok 8 cm × 3 cm × 2 cm: volume?', '48 cm³', '8×3 kubus per lapis, dua lapis.'),
      p('Kubus sisi 5 cm: volume?', '125 cm³', '5×5×5 = 125.'),
      p('Volume 72 cm³, alas 6×4 cm. Tinggi?', '3 cm', '72 ÷ 24 = 3.'),
    ],
    recap:
      'Volume balok = p×l×t, kubus = s³. Volume bersatuan kubik; kapasitas liter dapat dikonversi dengan hubungan 1 liter = 1000 cm³.',
    trap: 'Minta siswa menunjuk satuan kubus, petak dan ruas untuk membedakan volume, luas dan panjang. Pengayaan: dua balok bervolume sama tetapi ukuran berbeda.',
    quiz: [
      q(
        'Volume balok 7×4×3 cm adalah … cm³.',
        84,
        [14, 28, 42],
        'Satu lapisan memuat 7×4=28 kubus, tiga lapisan memuat 28×3=84 cm³.',
      ),
      q(
        'Kubus rusuk 3 cm mempunyai volume … cm³.',
        27,
        [9, 12, 18],
        'Volume kubus mengalikan tiga ukuran rusuk: 3³ = 3×3×3 = 27 cm³.',
      ),
      q('3000 cm³ setara … liter.', 3, [30, 300, 0.3], 'Satu liter = 1000 cm³.'),
      q(
        'Balok volume 100 cm³, alas 5×4 cm. Tingginya … cm.',
        5,
        [4, 10, 20],
        'Luas alas 5×4=20 cm²; tinggi = volume/luas alas = 100÷20=5 cm.',
      ),
      q(
        'Satuan volume yang tepat adalah …',
        'cm³',
        ['cm', 'cm²', 'kg'],
        'Volume diukur dengan kubus satuan.',
      ),
    ],
  },
  {
    start:
      'Bilangan negatif membantu memodelkan nilai di bawah titik acuan, misalnya suhu atau lantai bawah tanah. Paket bilangan bulat negatif ini adalah topik pilihan aplikasi; penempatannya harus disesuaikan guru dengan CP dan kesiapan anak.',
    sections: [
      s(
        'Garis bilangan dan urutan',
        'Nol adalah titik acuan, bilangan positif berada di kanan dan negatif di kiri. Semakin ke kanan semakin besar nilainya. Jarak dari nol disebut nilai mutlak, sehingga −7 lebih kecil daripada −3 walaupun jaraknya dari nol lebih jauh. Angka negatif tidak selalu berarti benda buruk; artinya bergantung konteks.',
        'Suhu −2°C lebih tinggi daripada −6°C karena −2 berada lebih ke kanan. Jarak −6 dari nol adalah 6 satuan.',
      ),
      s(
        'Penjumlahan dan pengurangan',
        'Menambah bilangan positif bergerak ke kanan; menambah negatif bergerak ke kiri. Mengurangi suatu bilangan sama dengan menambahkan lawannya. Lawan 5 adalah −5 dan lawan −5 adalah 5. Gunakan langkah pada garis bilangan untuk memeriksa hasil sebelum memakai aturan singkat.',
        '−4 + 7 = 3: mulai −4, bergerak tujuh ke kanan. 3 − (−2) = 3 + 2 = 5. Mengurangi negatif berbeda dengan mengurangi positif.',
      ),
      s(
        'Perkalian, pembagian, dan urutan operasi',
        'Dua faktor dengan tanda sama menghasilkan positif; tanda berbeda menghasilkan negatif. Aturan yang sama berlaku untuk pembagian dengan pembagi bukan nol. Kerjakan kurung, lalu kali/bagi dari kiri ke kanan, lalu tambah/kurang dari kiri ke kanan. Nilai nol tidak memiliki tanda positif atau negatif.',
        '−3 × 4 = −12, sedangkan −3 × (−4) = 12. Pada −2 + 3 × 4, hitung perkalian dahulu sehingga hasilnya −2 + 12 = 10.',
      ),
    ],
    activity:
      'Buat garis bilangan −10 sampai 10 di kertas. Gunakan pion untuk memeragakan tambah positif, tambah negatif, dan kurang negatif. Teman membaca langkah sebelum kalian menulis hasil; jangan memakai percobaan suhu dingin ekstrem.',
    practice: [
      p('Urutkan −1, −5, 2 dari kecil.', '−5, −1, 2', 'Posisi kiri menunjukkan nilai lebih kecil.'),
      p('Hitung −6 + 9.', '3', 'Sembilan langkah ke kanan dari −6.'),
      p('Hitung 8 − (−3).', '11', 'Mengurangi negatif tiga sama dengan menambah tiga.'),
    ],
    recap:
      'Urutan mengikuti posisi pada garis bilangan. Kurang berarti tambah lawan. Kali/bagi ditentukan tanda dan urutan operasi tetap berlaku.',
    trap: 'Bedakan tanda negatif pada bilangan dengan tanda operasi kurang. Jika aturan tanda dihafal tanpa makna, kembali ke pola perkalian dan garis bilangan.',
    quiz: [
      q('−7 + 4 = …', -3, [-11, 3, 11], 'Dari −7 maju empat ke kanan sampai −3.'),
      q(
        '5 − (−6) = …',
        11,
        [-1, 1, -11],
        'Mengurangi negatif enam sama dengan menambah lawannya: 5 + 6 = 11.',
      ),
      q('−4 × (−3) = …', 12, [-12, -7, 7], 'Dua faktor negatif menghasilkan positif.'),
      q('−18 ÷ 3 = …', -6, [6, -15, 15], 'Tanda berbeda menghasilkan negatif; 18÷3 = 6.'),
      q('−5 + 2 × 6 = …', 7, [-18, 2, 17], 'Perkalian dahulu: 12; kemudian −5 + 12 = 7.'),
    ],
  },
  {
    start:
      'Lingkaran adalah himpunan titik pada bidang yang berjarak sama dari pusat. Keliling dan luas lingkaran dalam paket ini merupakan perluasan pilihan; guru perlu meninjau penempatan topik dan pendekatan sebelum dipublikasikan.',
    sections: [
      s(
        'Pusat, jari-jari, dan diameter',
        'Jari-jari r menghubungkan pusat ke batas lingkaran. Diameter d melewati pusat dan menghubungkan dua titik batas, sehingga d = 2r. Tali busur menghubungkan dua titik batas tetapi tidak selalu melalui pusat. Semua diameter adalah tali busur, tetapi tidak semua tali busur diameter.',
        'Jika jari-jari tutup bundar 7 cm, diameternya 14 cm. Garis yang menghubungkan dua titik tepi tanpa melewati pusat bukan diameter.',
      ),
      s(
        'Keliling dan bilangan pi',
        'Perbandingan keliling dengan diameter selalu pi (π), sehingga K = πd = 2πr. Pi bilangan tak berhingga yang tidak berulang; 3,14 dan 22/7 adalah pendekatan, bukan nilai tepat pi. Gunakan pendekatan yang diminta soal dan tulis satuan panjang.',
        'Dengan π≈22/7 dan diameter 14 cm, keliling ≈22/7 ×14 = 44 cm. Pengukuran benang sekeliling benda hanya memberi perkiraan karena ketelitian alat.',
      ),
      s(
        'Luas dan bagian lingkaran',
        'Luas lingkaran L = πr². Pastikan yang dikuadratkan adalah jari-jari, bukan diameter. Luas setengah lingkaran adalah setengah luas penuh. Namun keliling setengah daerah lingkaran meliputi busur setengah keliling ditambah diameter lurus; jangan menyamakan keliling dengan panjang busur saja.',
        'r=10 cm dan π≈3,14 memberi luas ≈314 cm². Keliling daerah setengah lingkaran r=7 dengan π≈22/7 adalah 22 + 14 = 36 cm.',
      ),
    ],
    activity:
      'Ukur diameter dan keliling tiga benda bundar aman memakai benang dan penggaris. Bagi keliling dengan diameter lalu bandingkan hasil mendekati 3,14. Catat kemungkinan galat pengukuran; jangan menuntut semua hasil tepat sama.',
    practice: [
      p('Diameter 18 cm. Berapa jari-jari?', '9 cm', 'r = d/2.'),
      p('r=7 cm, π≈22/7. Luas?', '154 cm²', '22/7×7×7 = 154.'),
      p('d=20 cm, π≈3,14. Keliling?', '62,8 cm', '3,14×20 = 62,8.'),
    ],
    recap:
      'Diameter dua kali jari-jari. K=πd dan L=πr². Pi pada hitungan dasar didekati; keliling bagian lingkaran mencakup semua batasnya.',
    trap: 'Tandai r dan d pada gambar sebelum menghitung. Pengayaan: bandingkan pertambahan keliling dan luas ketika jari-jari digandakan.',
    quiz: [
      q(
        'Jari-jari 14 cm mempunyai diameter … cm.',
        28,
        [7, 14, 44],
        'Diameter terdiri dari dua jari-jari: d = 2×14 = 28 cm.',
      ),
      q(
        'Dengan π≈22/7, keliling lingkaran r=7 cm adalah … cm.',
        44,
        [22, 49, 154],
        'Keliling = 2πr; gunakan pendekatan pi sesuai soal: 2×22/7×7 = 44 cm.',
      ),
      q(
        'Dengan π≈3,14, luas lingkaran r=5 cm adalah … cm².',
        '78,5',
        ['31,4', '15,7', '157'],
        'Luas = πr², sehingga 3,14×5×5 = 78,5 cm² dengan pendekatan tersebut.',
      ),
      q(
        'Tali busur yang melalui pusat disebut …',
        'Diameter',
        ['Jari-jari', 'Busur', 'Titik sudut'],
        'Diameter menghubungkan dua titik batas melalui pusat.',
      ),
      q(
        'Keliling daerah setengah lingkaran d=14 cm, π≈22/7, adalah … cm.',
        36,
        [22, 44, 154],
        'Setengah keliling 22 ditambah diameter 14 = 36.',
      ),
    ],
  },
  {
    start:
      'Bangun ruang gabungan dapat dipecah menjadi bangun yang lebih sederhana. Gambar, ukuran dan bagian yang saling menempel perlu jelas. Volume dan luas permukaan membutuhkan cara penghitungan berbeda.',
    sections: [
      s(
        'Memecah menjadi bagian tidak tumpang tindih',
        'Pilih potongan yang membentuk balok atau kubus dengan ukuran diketahui. Volume gabungan adalah jumlah volume bagian yang tidak bertumpang tindih. Jika sebuah bagian dihitung dua kali, kurangi volume irisan. Untuk bangun berlubang, kurangi volume lubang dari bangun penuh. Satuan semua ukuran harus sama.',
        'Dua balok 6×4×3 cm dan 2×4×3 cm ditempel berdampingan tanpa irisan. Volume 72 + 24 = 96 cm³. Panjang gabungan pada arah itu menjadi 8 cm.',
      ),
      s(
        'Menentukan ukuran yang belum tertulis',
        'Gunakan hubungan panjang total dan bagian. Jika panjang keseluruhan 12 dan satu bagian 7, bagian lainnya 5. Tandai arah panjang, lebar dan tinggi pada sketsa. Sisi yang tidak terlihat tetap mempunyai ukuran dan tidak boleh diabaikan. Buat tabel dimensi tiap komponen sebelum menggunakan rumus.',
        'Bangun berbentuk L berasal dari balok 10×6×4 yang dipotong bagian 3×2×4. Volume penuh 240, potongan 24, sisa 216 cm³.',
      ),
      s(
        'Luas permukaan dan bidang pertemuan',
        'Permukaan yang saling menempel menjadi bagian dalam dan tidak termasuk permukaan luar gabungan. Untuk dua bangun yang menempel tepat pada satu bidang, jumlahkan luas permukaannya lalu kurangi dua kali luas bidang pertemuan. Rumus ini berbeda dari volume, sebab volume bagian menempel tidak hilang jika tidak ada irisan.',
        'Dua kubus rusuk 2 cm ditempel satu sisi. Luas permukaan awal 24+24=48 cm². Bidang pertemuan 4 cm² dihitung dua kali; permukaan luar 48−8=40 cm².',
      ),
    ],
    activity:
      'Tempel dua kotak identik dengan perekat yang mudah dilepas. Warnai hanya bidang yang masih terlihat. Buat sketsa pemecahan, hitung volume dan diskusikan sisi yang tidak boleh dihitung dalam luas permukaan luar.',
    practice: [
      p('Balok 4×3×2 dan 2×3×2 ditempel tanpa irisan. Volume?', '36 satuan³', '24 + 12 = 36.'),
      p('Kubus sisi 5 dilubangi balok 1×1×5. Volume sisa?', '120 satuan³', '125 − 5 = 120.'),
      p(
        'Dua kubus sisi 3 menempel satu sisi. Luas permukaan luar?',
        '90 satuan²',
        '54 + 54 − 2×9 = 90.',
      ),
    ],
    recap:
      'Volume gabungan menjumlah bagian tanpa irisan atau mengurangi lubang. Luas permukaan hanya menghitung bidang luar; bidang pertemuan dikeluarkan.',
    trap: 'Jangan mengurangi bidang pertemuan dari volume karena bidang tidak mempunyai ketebalan. Pengayaan: cari beberapa pemecahan yang menghasilkan volume sama.',
    quiz: [
      q(
        'Volume balok 5×4×2 ditambah kubus sisi 2 tanpa irisan adalah …',
        48,
        [40, 42, 56],
        '40 + 8 = 48 satuan³.',
      ),
      q(
        'Balok 8×5×3 dipotong 2×2×3. Volume sisa …',
        108,
        [96, 112, 132],
        'Volume penuh 8×5×3=120, potongan 2×2×3=12; sisa 120−12=108 satuan³.',
      ),
      q(
        'Panjang total 15 cm dan bagian pertama 9 cm. Bagian kedua … cm.',
        6,
        [5, 9, 24],
        'Panjang total dikurangi bagian pertama: 15−9 = 6 cm untuk bagian kedua.',
      ),
      q(
        'Bidang tempat dua kotak menempel termasuk …',
        'Bagian dalam gabungan',
        ['Seluruh permukaan luar', 'Volume tambahan', 'Lubang selalu'],
        'Bidang yang tertutup kotak lain tidak menjadi permukaan luar.',
      ),
      q(
        'Dua kubus sisi 1 menempel satu sisi. Luas permukaan luar …',
        10,
        [6, 8, 12],
        '6 + 6 − 2×1 = 10 satuan².',
      ),
    ],
  },
  {
    start:
      'Mean, median, dan modus merangkum data dengan cara berbeda. Topik ini disertakan sebagai pilihan pendalaman dan perlu ditinjau penempatan fasenya. Selalu baca konteks dan seluruh data sebelum memilih ukuran yang mewakili.',
    sections: [
      s(
        'Mean atau rata-rata',
        'Jumlahkan seluruh nilai lalu bagi banyak data. Mean menggambarkan pembagian total secara merata, bukan selalu satu nilai yang benar-benar ada pada data. Perhatikan satuan dan pastikan setiap data dihitung sekali. Nilai sangat besar atau kecil dapat menarik mean sehingga kurang mewakili nilai kebanyakan.',
        'Data 4, 6, 8 mempunyai jumlah 18 dan banyak data 3. Mean = 18/3 = 6. Data 2, 2, 20 mempunyai mean 8 meski dua dari tiga nilainya hanya 2.',
      ),
      s(
        'Median atau nilai tengah',
        'Urutkan data dari kecil terlebih dahulu. Jika banyak data ganjil, ambil satu nilai tepat di tengah. Jika genap, hitung rata-rata dua nilai tengah. Median bergantung urutan posisi, bukan nilai pada daftar asli yang belum diurutkan. Menambah nilai ekstrem sering memengaruhi mean lebih besar daripada median.',
        'Data 9, 3, 7, 5 diurutkan 3, 5, 7, 9. Dua nilai tengah 5 dan 7 sehingga median 6. Median tidak harus muncul sebagai nilai asli.',
      ),
      s(
        'Modus dan pemilihan ukuran',
        'Modus adalah nilai atau kategori yang paling sering muncul. Data dapat memiliki satu modus, lebih dari satu modus, atau tidak mempunyai modus tunggal bila semua frekuensi sama. Untuk ukuran baju, modus sering berguna karena menunjukkan ukuran paling banyak diminta. Jangan menyebut nilai terbesar sebagai modus kecuali memang paling sering.',
        'Data 2, 3, 3, 4, 4, 5 memiliki dua modus: 3 dan 4. Pada data 1, 2, 3 masing-masing muncul sekali sehingga tidak ada modus tunggal.',
      ),
    ],
    activity:
      'Gunakan delapan kartu angka rekaan, bukan nilai pribadi teman. Hitung ketiga ukuran lalu ganti satu kartu dengan angka jauh lebih besar. Bandingkan perubahan mean, median, dan modus serta jelaskan ukuran mana yang lebih mewakili data itu.',
    practice: [
      p('Mean dari 5, 7, 9?', '7', 'Jumlah 21 dibagi tiga data.'),
      p('Median 8, 2, 6, 4?', '5', 'Urut 2,4,6,8; (4+6)/2 = 5.'),
      p('Modus 1, 2, 2, 3, 4?', '2', 'Angka 2 muncul dua kali, lainnya sekali.'),
    ],
    recap:
      'Mean membagi total dengan banyak data; median memerlukan urutan; modus memakai frekuensi. Pilih ukuran berdasarkan kebutuhan dan sebaran data.',
    trap: 'Hitung banyak data, bukan banyak nilai berbeda, untuk penyebut mean. Pengayaan: data dua modus atau data ekstrem yang mengubah mean tetapi tidak banyak mengubah median.',
    quiz: [
      q('Mean data 6, 8, 10 adalah …', 8, [6, 9, 24], '(6+8+10)/3 = 24/3 = 8.'),
      q('Median data 7, 1, 5 adalah …', 5, [1, 4, 7], 'Urut 1,5,7 sehingga nilai tengah 5.'),
      q('Median data 2, 4, 8, 10 adalah …', 6, [4, 5, 8], 'Dua tengah 4 dan 8; rata-ratanya 6.'),
      q(
        'Modus data 3, 3, 5, 6, 6, 6 adalah …',
        6,
        [3, 5, 29],
        '6 muncul tiga kali, paling sering.',
      ),
      q(
        'Mean dapat berubah besar karena satu nilai ekstrem. Pernyataan ini …',
        'Benar',
        ['Salah selalu', 'Hanya jika data satu warna', 'Sama dengan definisi modus'],
        'Mean menggunakan semua nilai sehingga dipengaruhi nilai ekstrem.',
      ),
    ],
  },
]
