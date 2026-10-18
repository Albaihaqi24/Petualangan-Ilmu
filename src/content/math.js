import { card as c, unit as u } from './lessonFactory.js'
const n = (prompt, answer, explanation, wrong) => ({
  prompt,
  answer: String(answer),
  distractors: (wrong || [Number(answer) + 1, Number(answer) + 2, Number(answer) + 3]).map(String),
  explanation,
})
const fixed = (prompt, answer, wrong, explanation) => ({
  prompt,
  answer,
  distractors: wrong,
  explanation,
})
const make = (activity, cards, questions, workedExample) => ({
  ...u(activity, cards),
  questions,
  workedExample,
})
const digits = [
  c('Bilangan', 'Menyatakan banyak atau urutan', 'Ada 12 biji di mangkuk'),
  c('Nilai tempat', 'Nilai angka bergantung posisinya', 'Pada 24, angka 2 bernilai 20'),
  c(
    'Membandingkan',
    'Menentukan lebih banyak, lebih sedikit, atau sama',
    '8 lebih banyak daripada 5',
  ),
  c('Mengurutkan', 'Menyusun bilangan menurut nilainya', '3, 5, 9 berurutan dari kecil'),
  c(
    'Memeriksa hasil',
    'Menghitung kembali dengan cara lain',
    'Cocokkan 10 biji dengan dua kelompok lima',
  ),
]
const operations = [
  c('Penjumlahan', 'Menggabungkan dua banyak benda', '3 apel dan 2 apel menjadi 5 apel'),
  c('Pengurangan', 'Mengambil atau mencari selisih', '7 biji dikurangi 2 tersisa 5'),
  c('Perkalian', 'Menghitung kelompok sama banyak', '3 kelompok berisi 4 benda berjumlah 12'),
  c(
    'Pembagian',
    'Membagi rata atau menentukan banyak kelompok',
    '12 benda dibagi untuk 3 anak, masing-masing 4',
  ),
  c(
    'Kalimat matematika',
    'Lambang yang menyatakan hubungan bilangan',
    '3 + 2 = 5 menyatakan hasil penjumlahan',
  ),
]
const measure = [
  c('Panjang', 'Ukuran dari satu ujung ke ujung lain', 'Pita diukur dari tanda nol penggaris'),
  c(
    'Massa',
    'Besaran yang diukur menggunakan neraca atau timbangan',
    'Massa tepung dicatat dalam gram',
  ),
  c('Durasi', 'Lama suatu kegiatan berlangsung', 'Belajar dari pukul 8 sampai 9 selama satu jam'),
  c('Satuan', 'Acuan ukuran yang disepakati', 'Sentimeter merupakan satuan panjang'),
  c(
    'Konversi',
    'Menyatakan ukuran sama dengan satuan berbeda',
    '1 meter sama panjang dengan 100 sentimeter',
  ),
]
const shapes = [
  c('Sisi', 'Ruas pembatas pada bangun datar bersisi lurus', 'Persegi memiliki empat sisi'),
  c('Sudut', 'Daerah pertemuan dua sinar atau sisi', 'Pojok buku membentuk sudut'),
  c('Keliling', 'Jumlah panjang batas bangun datar', 'Panjang empat sisi persegi dijumlahkan'),
  c('Luas', 'Ukuran daerah yang ditutupi suatu bangun', 'Lantai ditutup dengan petak satuan'),
  c(
    'Data',
    'Informasi yang dikumpulkan untuk menjawab pertanyaan',
    'Jumlah pemilih buah dicatat dalam tabel',
  ),
]
const fractions = [
  c(
    'Pecahan',
    'Bilangan yang menyatakan bagian sama besar dari keseluruhan',
    'Satu dari empat bagian sama besar ditulis 1/4',
  ),
  c('Pembilang', 'Angka yang menyatakan banyak bagian yang dipilih', 'Pada 3/5, pembilangnya 3'),
  c(
    'Penyebut',
    'Angka yang menyatakan pembagian sama besar pada keseluruhan',
    'Pada 3/5, keseluruhan dibagi lima bagian',
  ),
  c('Pecahan senilai', 'Pecahan berbeda tulisan tetapi bernilai sama', '1/2 senilai dengan 2/4'),
  c(
    'Keseluruhan yang sama',
    'Acuan yang harus disamakan ketika membandingkan bagian',
    'Bandingkan setengah dua pita yang sama panjang',
  ),
]
const data = [
  c('Tabel', 'Penyajian data dalam baris dan kolom', 'Jumlah pemilih dicatat menurut buah'),
  c(
    'Diagram batang',
    'Penyajian data dengan panjang batang sesuai banyaknya',
    'Batang lebih tinggi berarti jumlah lebih besar',
  ),
  c(
    'Frekuensi',
    'Banyak kemunculan suatu nilai atau kategori',
    'Lima anak memilih mangga, frekuensinya lima',
  ),
  c(
    'Kesimpulan data',
    'Pernyataan yang didukung catatan pengamatan',
    'Pilihan terbanyak ditentukan dari jumlah terbesar',
  ),
  c(
    'Kemungkinan',
    'Ukuran atau gambaran peluang suatu kejadian',
    'Mengambil bola merah lebih mungkin jika jumlahnya lebih banyak',
  ),
]
export const mathUnits = [
  [
    make(
      'Susun sampai 20 benda kecil yang aman. Hitung satu per satu sambil menunjuk setiap benda.',
      digits,
      [
        ...[
          [3, 2],
          [4, 1],
          [6, 2],
          [5, 4],
          [8, 2],
        ].map(([a, b]) =>
          n(
            `Ada ${a} biji lalu ditambah ${b}. Berapa seluruh biji?`,
            a + b,
            `${a} + ${b} = ${a + b}. Setiap biji dihitung sekali.`,
          ),
        ),
      ],
      'Ada 4 kancing dan 2 kancing lagi. Tunjuk keenamnya sambil menghitung: 1, 2, 3, 4, 5, 6. Jadi 4 + 2 = 6.',
    ),
    make('Buat dua baris benda. Pasangkan satu-satu untuk membandingkan jumlahnya.', digits, [
      n(
        'Bilangan mana yang paling besar: 4, 7, 2, 5?',
        7,
        'Pada urutan bilangan, 7 lebih besar dari 4, 2, dan 5.',
        [4, 2, 5],
      ),
      n('Bilangan tepat setelah 9 adalah …', 10, 'Menghitung maju dari 9 menghasilkan 10.'),
      n('Bilangan tepat sebelum 6 adalah …', 5, 'Menghitung mundur satu dari 6 menghasilkan 5.'),
      n(
        'Mana yang lebih kecil, 8 atau 3?',
        3,
        '3 terletak sebelum 8 pada urutan bilangan.',
        [8, 9, 10],
      ),
      fixed(
        'Urutan dari paling sedikit ke paling banyak adalah …',
        '2, 4, 6',
        ['6, 4, 2', '4, 2, 6', '2, 6, 4'],
        'Bilangan bertambah dari 2 ke 4 lalu 6.',
      ),
    ]),
    make(
      'Gunakan dua warna benda untuk membuat penjumlahan yang hasilnya sampai 20.',
      operations,
      [
        [2, 3],
        [5, 2],
        [6, 4],
        [7, 5],
        [9, 3],
      ].map(([a, b]) =>
        n(
          `${a} benda digabung dengan ${b} benda. Jumlahnya …`,
          a + b,
          `${a} + ${b} = ${a + b}. Gabungkan lalu hitung seluruh benda.`,
        ),
      ),
    ),
    make(
      'Siapkan 10 benda. Ambil sebagian, lalu hitung yang masih tinggal.',
      operations,
      [
        [5, 1],
        [7, 2],
        [9, 4],
        [10, 3],
        [8, 5],
      ].map(([a, b]) =>
        n(
          `Ada ${a} buah. Sebanyak ${b} diambil. Tersisa …`,
          a - b,
          `${a} − ${b} = ${a - b}. Yang dihitung adalah benda yang belum diambil.`,
        ),
      ),
    ),
    make(
      'Susun pola merah-biru-merah-biru dengan kertas. Cari bentuk segitiga dan persegi di sekitar.',
      [
        c(
          'Pola berulang',
          'Susunan yang mengulang bagian tetap',
          'Merah-biru lalu merah-biru lagi',
        ),
        ...shapes.slice(0, 2),
        c('Segitiga', 'Bangun datar dengan tiga sisi lurus', 'Potongan kertas bersisi tiga'),
        c(
          'Persegi',
          'Bangun datar bersisi empat sama panjang dengan empat sudut siku-siku',
          'Satu petak pada papan catur',
        ),
      ],
      [
        fixed(
          'Pola merah, biru, merah, biru dilanjutkan dengan …',
          'Merah',
          ['Hijau', 'Kuning', 'Ungu'],
          'Bagian berulangnya merah-biru.',
        ),
        n('Berapa sisi segitiga?', 3, 'Segitiga dibatasi tiga sisi lurus.'),
        n('Berapa sisi persegi?', 4, 'Persegi memiliki empat sisi sama panjang.'),
        n('Pola 2, 4, 6 dilanjutkan dengan …', 8, 'Setiap langkah bertambah 2.'),
        fixed(
          'Bentuk yang tidak memiliki sisi lurus adalah …',
          'Lingkaran',
          ['Persegi', 'Segitiga', 'Persegi panjang'],
          'Batas lingkaran berupa garis lengkung.',
        ),
      ],
    ),
    make(
      'Bandingkan panjang dua pensil dari ujung yang sejajar. Ceritakan kegiatan sebelum dan sesudah sarapan.',
      measure,
      [
        fixed(
          'Agar membandingkan panjang dua pensil adil, kita …',
          'Menyamakan posisi ujung awal',
          ['Meletakkan sembarang', 'Melihat warnanya saja', 'Menghitung huruf mereknya'],
          'Panjang dibandingkan dari titik awal yang sejajar.',
        ),
        n(
          'Pita A panjangnya 5 klip, pita B 3 klip. Selisihnya … klip.',
          2,
          '5 − 3 = 2; klip yang dipakai harus sama panjang.',
        ),
        fixed(
          'Kegiatan yang biasa dilakukan sesudah bangun pagi adalah …',
          'Merapikan tempat tidur',
          ['Mengulang hari kemarin', 'Menyebut besok sebagai kemarin', 'Melompat ke minggu lalu'],
          'Urutan waktu membantu menceritakan kegiatan.',
        ),
        n(
          'Dua balok sama panjang disambung, lalu satu lagi. Ada … balok.',
          3,
          '2 + 1 = 3 satuan balok.',
        ),
        fixed(
          'Benda diukur sepanjang 6 balok. Angka 6 menyatakan …',
          'Banyak balok satuan yang menutupi panjang',
          ['Warna benda', 'Nama benda', 'Jumlah huruf'],
          'Pengukuran memakai satuan yang sama dan tanpa celah.',
        ),
      ],
    ),
  ],
  [
    make(
      'Kelompokkan lidi aman menjadi puluhan dan satuan. Wakili tiga bilangan sampai 100.',
      digits,
      [
        n('Pada bilangan 47, angka 4 bernilai …', 40, '4 berada di tempat puluhan: 4 × 10 = 40.'),
        n('6 puluhan dan 3 satuan membentuk …', 63, '60 + 3 = 63.'),
        n('Bilangan setelah 89 adalah …', 90, 'Tambahkan satu pada 89.'),
        n(
          'Dari 52, 25, 45, 19, bilangan terbesar adalah …',
          52,
          '52 memiliki nilai terbesar.',
          [25, 45, 19],
        ),
        n('70 + 8 sama dengan …', 78, '7 puluhan ditambah 8 satuan menghasilkan 78.'),
      ],
    ),
    make(
      'Tuliskan satu penjumlahan dan satu pengurangan. Periksa dengan operasi kebalikannya.',
      operations,
      [
        [24, 13],
        [35, 22],
        [41, 18],
        [52, 17],
        [63, 25],
      ].map(([a, b], i) =>
        n(
          `${a} ${i % 2 ? '−' : '+'} ${b} = …`,
          i % 2 ? a - b : a + b,
          i % 2
            ? `${a} − ${b} = ${a - b}. Periksa: ${a - b} + ${b} = ${a}.`
            : `Gabungkan puluhan dan satuannya: ${a} + ${b} = ${a + b}.`,
        ),
      ),
    ),
    make(
      'Buat tiga kelompok tutup botol, masing-masing empat. Tulis penjumlahan berulangnya.',
      operations,
      [
        [2, 3],
        [3, 4],
        [4, 2],
        [5, 3],
        [2, 5],
      ].map(([a, b]) =>
        n(
          `${a} kelompok masing-masing ${b} benda berjumlah …`,
          a * b,
          `${b} dijumlahkan ${a} kali: ${a} × ${b} = ${a * b}.`,
        ),
      ),
    ),
    make(
      'Bagikan 12 benda sama banyak kepada tiga boneka. Periksa apakah masih ada sisa.',
      operations,
      [
        [6, 2],
        [8, 4],
        [10, 2],
        [12, 3],
        [15, 5],
      ].map(([a, b]) =>
        n(
          `${a} benda dibagikan rata kepada ${b} anak. Setiap anak mendapat …`,
          a / b,
          `${a} ÷ ${b} = ${a / b}; ${b} × ${a / b} = ${a}.`,
        ),
      ),
    ),
    make(
      'Ukur panjang buku memakai penggaris dari nol. Amati tulisan satuan pada timbangan bersama pendamping.',
      measure,
      [
        n(
          '1 meter sama panjang dengan … sentimeter.',
          100,
          'Satu meter terdiri dari 100 sentimeter.',
        ),
        n('2 meter sama dengan … sentimeter.', 200, '2 × 100 = 200 sentimeter.'),
        n('Pita 30 cm dipotong 10 cm. Sisanya … cm.', 20, '30 − 10 = 20 sentimeter.'),
        n(
          'Dari pukul 8 tepat ke pukul 9 tepat berlalu … jam.',
          1,
          'Satu langkah jam penuh dari 8 ke 9 adalah satu jam.',
        ),
        fixed(
          'Alat untuk membandingkan massa benda adalah …',
          'Neraca',
          ['Penggaris', 'Jam', 'Busur derajat'],
          'Neraca digunakan untuk membandingkan atau mengukur massa.',
        ),
      ],
    ),
    make(
      'Tanyakan buah favorit lima anggota keluarga. Buat turus atau gambar satu orang per gambar.',
      shapes,
      [
        n('Segiempat mempunyai … sisi.', 4, 'Segiempat memiliki empat sisi.'),
        n('Segitiga mempunyai … sudut.', 3, 'Tiga sisi bertemu pada tiga sudut.'),
        n('Ada 4 pemilih apel dan 3 pemilih mangga. Jumlah pemilih …', 7, '4 + 3 = 7 orang.'),
        n(
          'Satu gambar mewakili 1 anak. Lima gambar berarti … anak.',
          5,
          'Setiap gambar dihitung satu anak.',
        ),
        fixed(
          'Untuk mengetahui buah terfavorit, pilih buah dengan …',
          'Jumlah pemilih paling banyak',
          ['Nama paling panjang', 'Warna gambar paling gelap', 'Urutan terakhir dalam tabel'],
          'Kesimpulan harus berdasarkan jumlah pemilih.',
        ),
      ],
    ),
  ],
  [
    make('Wakili 348 dengan tiga ratusan, empat puluhan, dan delapan satuan.', digits, [
      n('Pada 348, angka 3 bernilai …', 300, '3 berada di tempat ratusan.'),
      n('500 + 40 + 6 = …', 546, 'Jumlahkan ratusan, puluhan, dan satuan.'),
      n('Bilangan tepat setelah 699 adalah …', 700, '699 ditambah 1 menjadi 700.'),
      n('Nilai angka 8 pada 582 adalah …', 80, '8 puluhan bernilai 80.'),
      n(
        'Pilih bilangan terkecil: 213, 231, 312, 321.',
        213,
        'Bandingkan ratusan, lalu puluhan.',
        [231, 312, 321],
      ),
    ]),
    make(
      'Buat cerita tentang menambah dan mengurangi persediaan buku. Tulis operasi yang sesuai.',
      operations,
      [
        [125, 34],
        [208, 52],
        [312, 105],
        [450, 125],
        [325, 75],
      ].map(([a, b], i) =>
        n(
          `${a} ${i % 2 ? '−' : '+'} ${b} = …`,
          i % 2 ? a - b : a + b,
          `${a} ${i % 2 ? '−' : '+'} ${b} = ${i % 2 ? a - b : a + b}; periksa nilai tempat saat menghitung.`,
        ),
      ),
    ),
    make(
      'Gambar baris dan kolom benda, lalu hubungkan perkalian dengan pembagian.',
      operations,
      [
        [4, 6],
        [5, 8],
        [6, 3],
        [7, 4],
        [9, 2],
      ].map(([a, b], i) =>
        i % 2
          ? n(
              `${a * b} benda dibagi rata ke ${a} kelompok, tiap kelompok …`,
              b,
              `${a * b} ÷ ${a} = ${b} karena ${a} × ${b} = ${a * b}.`,
            )
          : n(`${a} × ${b} = …`, a * b, `${a} kelompok berisi ${b} berarti ${a * b}.`),
      ),
    ),
    make(
      'Lipat dua kertas sama ukuran menjadi dua dan empat bagian sama besar. Bandingkan bagiannya.',
      fractions,
      [
        fixed(
          'Satu dari empat bagian sama besar ditulis …',
          '1/4',
          ['1/2', '4/1', '3/4'],
          'Pembilang 1 menyatakan satu bagian; penyebut 4 menyatakan empat bagian sama besar.',
        ),
        n(
          'Pembilang pecahan 3/5 adalah …',
          3,
          'Angka di atas menyatakan banyak bagian yang dipilih.',
          [5, 8, 2],
        ),
        n(
          'Penyebut pecahan 2/7 adalah …',
          7,
          'Angka di bawah menyatakan banyak bagian sama besar.',
          [2, 5, 9],
        ),
        fixed(
          'Untuk dua kue sama besar, bagian yang lebih besar adalah …',
          '1/2',
          ['1/4', '1/8', '1/10'],
          'Membagi keseluruhan sama menjadi lebih sedikit bagian membuat tiap bagian lebih besar.',
        ),
        fixed(
          'Dua dari empat bagian sama besar senilai dengan …',
          '1/2',
          ['1/3', '1/4', '3/4'],
          'Dua per empat sama dengan setengah keseluruhan.',
        ),
      ],
    ),
    make(
      'Catat satu pengukuran panjang, massa, dan durasi. Sebut satuan yang digunakan.',
      measure,
      [
        n('3 meter = … sentimeter.', 300, '3 × 100 = 300.'),
        n('1 kilogram = … gram.', 1000, 'Satu kilogram terdiri dari 1.000 gram.'),
        n('2 jam = … menit.', 120, '2 × 60 = 120 menit.'),
        n('250 cm + 50 cm = … cm.', 300, 'Satuan sudah sama, jadi 250 + 50 = 300.'),
        n(
          'Pukul 09.00 sampai 09.30 berlangsung … menit.',
          30,
          'Dari menit 00 ke 30 berlalu 30 menit.',
        ),
      ],
    ),
    make(
      'Buat tabel banyak pensil tiga warna. Tulis satu pertanyaan yang dapat dijawab dari tabelmu.',
      [...shapes.slice(0, 3), ...data.slice(0, 2)],
      [
        n('Persegi sisi 4 cm memiliki keliling … cm.', 16, 'Keliling = 4 + 4 + 4 + 4 = 16.'),
        n(
          'Persegi panjang memiliki … sudut siku-siku.',
          4,
          'Keempat sudut persegi panjang adalah siku-siku.',
        ),
        n('Merah 5, biru 3, hijau 4. Jumlah seluruh pensil …', 12, '5 + 3 + 4 = 12.'),
        fixed(
          'Warna paling banyak dari merah 5, biru 3, hijau 4 adalah …',
          'Merah',
          ['Biru', 'Hijau', 'Semuanya sama'],
          'Frekuensi merah 5, lebih besar dari 4 dan 3.',
        ),
        n('Selisih pemilih 8 dan 5 adalah …', 3, '8 − 5 = 3.'),
      ],
    ),
  ],
  [
    make('Tulis tiga bilangan empat angka. Jelaskan nilai tiap angka dan urutkan.', digits, [
      n('Angka 6 pada 6.245 bernilai …', 6000, 'Angka 6 berada di tempat ribuan.'),
      n('3.000 + 200 + 40 + 7 = …', 3247, 'Gabungkan nilai tempat yang berbeda.'),
      n('9.999 ditambah 1 menjadi …', 10000, 'Satu setelah 9.999 adalah 10.000.'),
      n(
        'Pilih yang terbesar: 4.052, 4.502, 4.205, 4.025.',
        4502,
        'Bandingkan ribuan lalu ratusan.',
        [4052, 4205, 4025],
      ),
      n('Nilai 8 pada 2.846 adalah …', 800, '8 ratusan = 800.'),
    ]),
    make(
      'Gunakan benda untuk menyusun persegi panjang dengan 12 benda. Cari pasangan faktornya.',
      [
        c(
          'Faktor',
          'Bilangan pembagi yang menghasilkan pembagian tanpa sisa',
          '3 faktor dari 12 karena 12 ÷ 3 = 4',
        ),
        c(
          'Kelipatan',
          'Hasil perkalian bilangan dengan bilangan bulat',
          '6, 12, 18 adalah kelipatan 6',
        ),
        c(
          'Pasangan faktor',
          'Dua faktor yang hasil kalinya bilangan tertentu',
          '3 dan 4 membentuk pasangan faktor 12',
        ),
        c('Sisa nol', 'Tanda bahwa pembagian habis', '20 dibagi 5 bersisa nol'),
        c(
          'Pola kelipatan',
          'Susunan bilangan dengan pertambahan tetap',
          'Kelipatan 4 bertambah empat setiap langkah',
        ),
      ],
      [
        n('Kelipatan positif pertama 6 adalah …', 6, '6 × 1 = 6.'),
        n('Kelipatan keempat 3 adalah …', 12, '3 × 4 = 12.'),
        n('Faktor 18 di antara 4, 5, 6, 7 adalah …', 6, '18 ÷ 6 = 3 tanpa sisa.', [4, 5, 7]),
        n('Pasangan 4 untuk membentuk hasil kali 20 adalah …', 5, '4 × 5 = 20.'),
        n('Sesudah 8, 16, 24, kelipatan 8 berikutnya …', 32, '24 + 8 = 32.'),
      ],
    ),
    make('Buat dua gambar keseluruhan sama besar untuk menunjukkan pecahan senilai.', fractions, [
      fixed(
        '1/2 senilai dengan …',
        '2/4',
        ['1/4', '2/3', '3/4'],
        'Kalikan pembilang dan penyebut dengan 2.',
      ),
      fixed(
        '3/8 dibanding 5/8 adalah …',
        'Lebih kecil',
        ['Lebih besar', 'Sama besar', 'Tidak bisa dibandingkan'],
        'Penyebut sama; 3 bagian lebih sedikit daripada 5.',
      ),
      fixed('2/3 senilai dengan …', '4/6', ['2/6', '3/4', '4/3'], '2 × 2 = 4 dan 3 × 2 = 6.'),
      fixed(
        'Pecahan terbesar adalah …',
        '3/4',
        ['1/4', '2/4', '0/4'],
        'Untuk penyebut sama, pembilang terbesar memberi nilai terbesar.',
      ),
      fixed(
        '4/8 dalam bentuk sederhana adalah …',
        '1/2',
        ['1/4', '2/3', '3/8'],
        'Bagi pembilang dan penyebut dengan 4.',
      ),
    ]),
    make(
      'Gunakan petak seratus untuk mewarnai 25 bagian. Hubungkan dengan pecahan dan persen.',
      fractions,
      [
        fixed('0,5 sama dengan …', '1/2', ['1/5', '1/4', '5/1'], '0,5 = 5/10 = 1/2.'),
        n('25% berarti … bagian dari 100.', 25, 'Persen berarti per seratus.'),
        n('50% dari 20 adalah …', 10, '50% = setengah, sehingga 20 ÷ 2 = 10.'),
        fixed(
          '0,25 sama dengan …',
          '25/100',
          ['25/10', '2/5', '1/25'],
          'Dua tempat desimal menyatakan perseratusan.',
        ),
        n('10% dari 30 adalah …', 3, '10/100 × 30 = 3.'),
      ],
    ),
    make(
      'Gambar persegi panjang pada kertas berpetak. Hitung keliling dan luas tanpa tertukar.',
      shapes,
      [
        n(
          'Persegi panjang 8 cm × 3 cm, luasnya … cm².',
          24,
          'Luas = panjang × lebar = 8 × 3 = 24.',
        ),
        n('Persegi sisi 5 cm, kelilingnya … cm.', 20, 'Keliling = 4 × 5 = 20.'),
        n('Persegi sisi 6 cm, luasnya … cm².', 36, 'Luas = 6 × 6 = 36.'),
        n('Sudut siku-siku besarnya … derajat.', 90, 'Sudut siku-siku adalah seperempat putaran.'),
        n('Persegi panjang 7 cm × 4 cm, kelilingnya … cm.', 22, '2 × (7 + 4) = 22.'),
      ],
    ),
    make(
      'Kumpulkan pilihan permainan dari teman tanpa data pribadi. Buat diagram batang dengan skala jelas.',
      data,
      [
        n('A 12 pemilih, B 8, C 10. Total … pemilih.', 30, '12 + 8 + 10 = 30.'),
        fixed(
          'Pilihan terbanyak dari A 12, B 8, C 10 adalah …',
          'A',
          ['B', 'C', 'Semua sama'],
          '12 adalah frekuensi terbesar.',
        ),
        n('Selisih A 12 dan B 8 adalah …', 4, '12 − 8 = 4.'),
        n('Satu petak mewakili 2 siswa. Enam petak mewakili … siswa.', 12, '6 × 2 = 12 siswa.'),
        fixed(
          'Diagram yang jujur perlu …',
          'Skala yang konsisten',
          ['Batang tanpa label', 'Angka diubah agar menarik', 'Kategori dihapus'],
          'Skala konsisten membuat perbandingan sesuai data.',
        ),
      ],
    ),
  ],
  [
    make(
      'Pecahkan cerita persediaan barang dan jelaskan pilihan operasi. Periksa kewajaran hasil.',
      operations,
      [
        [1250, 340],
        [2400, 650],
        [150, 12],
        [840, 7],
        [2750, 1250],
      ].map(([a, b], i) =>
        n(
          `${a} ${['+', '−', '×', '÷', '+'][i]} ${b} = …`,
          [a + b, a - b, a * b, a / b, a + b][i],
          `Gunakan operasi yang tertulis. Hasilnya ${[a + b, a - b, a * b, a / b, a + b][i]}.`,
        ),
      ),
    ),
    make(
      'Daftar faktor 12 dan 18 serta kelipatan 4 dan 6. Bedakan faktor persekutuan dengan kelipatan persekutuan.',
      [
        c(
          'Faktor persekutuan',
          'Faktor yang sama pada dua bilangan',
          '1, 2, 3, 6 membagi 12 dan 18',
        ),
        c('FPB', 'Faktor persekutuan terbesar', 'FPB 12 dan 18 adalah 6'),
        c(
          'Kelipatan persekutuan',
          'Kelipatan yang dimiliki bersama',
          '12 adalah kelipatan 4 sekaligus 6',
        ),
        c('KPK', 'Kelipatan persekutuan positif terkecil', 'KPK 4 dan 6 adalah 12'),
        c(
          'Menguji pembagian',
          'Memeriksa hasil dengan perkalian',
          '12 ÷ 3 = 4 diperiksa dengan 3 × 4',
        ),
      ],
      [
        n('FPB 12 dan 18 adalah …', 6, 'Faktor bersama 1, 2, 3, 6; yang terbesar 6.'),
        n('KPK 4 dan 6 adalah …', 12, 'Kelipatan positif pertama yang sama ialah 12.'),
        n('FPB 8 dan 12 adalah …', 4, 'Faktor bersama 1, 2, 4; yang terbesar 4.'),
        n('KPK 3 dan 5 adalah …', 15, '15 adalah kelipatan positif terkecil yang sama.'),
        n(
          'Paket identik dari 12 pensil dan 18 penghapus paling banyak … paket.',
          6,
          'Banyak paket maksimum adalah FPB 12 dan 18, yaitu 6.',
        ),
      ],
    ),
    make(
      'Gunakan garis bilangan atau gambar pecahan untuk menjelaskan satu operasi, bukan hanya rumus.',
      fractions,
      [
        fixed(
          '1/4 + 2/4 = …',
          '3/4',
          ['3/8', '2/4', '1/2'],
          'Penyebut sama: jumlahkan pembilang 1 + 2.',
        ),
        fixed('1/2 + 1/4 = …', '3/4', ['2/6', '1/6', '1/4'], 'Samakan penyebut: 2/4 + 1/4 = 3/4.'),
        fixed(
          '0,6 + 0,2 = …',
          '0,8',
          ['0,4', '0,12', '8,0'],
          '6 persepuluh ditambah 2 persepuluh menjadi 8 persepuluh.',
        ),
        n('3/5 dari 20 adalah …', 12, '20 ÷ 5 × 3 = 12.'),
        fixed('3/4 − 1/4 = …', '1/2', ['1/4', '2/8', '1/8'], '3/4 − 1/4 = 2/4 = 1/2.'),
      ],
    ),
    make(
      'Buat sketsa persegi panjang dan segitiga beserta ukurannya. Jelaskan satuan luasnya.',
      shapes,
      [
        n(
          'Luas segitiga alas 10 cm dan tinggi 6 cm adalah … cm².',
          30,
          'Luas = 1/2 × 10 × 6 = 30.',
        ),
        n('Luas persegi sisi 9 cm adalah … cm².', 81, '9 × 9 = 81.'),
        n('Keliling persegi panjang 12 cm × 5 cm adalah … cm.', 34, '2 × (12 + 5) = 34.'),
        n('1 m² = … cm².', 10000, '1 m = 100 cm, maka 100 × 100 = 10.000 cm².'),
        n(
          'Luas dua persegi masing-masing 16 cm² berjumlah … cm².',
          32,
          '16 + 16 = 32, tanpa daerah saling menumpuk.',
        ),
      ],
    ),
    make(
      'Susun kubus satuan menjadi balok. Hitung banyak kubus per lapis dan banyak lapis.',
      [
        c('Volume', 'Ukuran ruang yang ditempati bangun', 'Balok berisi dua lapis kubus satuan'),
        c(
          'Kubus satuan',
          'Acuan volume berbentuk kubus dengan rusuk satu satuan',
          'Kubus rusuk 1 cm bervolume 1 cm³',
        ),
        c(
          'Kubus',
          'Bangun ruang dengan enam sisi persegi sama besar',
          'Dadu yang ideal berbentuk kubus',
        ),
        c(
          'Balok',
          'Bangun ruang bersisi enam persegi panjang dengan sudut siku-siku',
          'Kotak sepatu berbentuk balok',
        ),
        c(
          'Lapis',
          'Susunan sejajar yang membantu menghitung volume',
          'Dua lapis masing-masing enam kubus berjumlah 12',
        ),
      ],
      [
        n('Volume balok 4 cm × 3 cm × 2 cm adalah … cm³.', 24, '4 × 3 × 2 = 24.'),
        n('Volume kubus rusuk 3 cm adalah … cm³.', 27, '3 × 3 × 3 = 27.'),
        n('Tiga lapis masing-masing 8 kubus berjumlah … kubus.', 24, '3 × 8 = 24.'),
        n('Volume balok 5 cm × 2 cm × 4 cm adalah … cm³.', 40, '5 × 2 × 4 = 40.'),
        n('Kubus memiliki … sisi.', 6, 'Kubus dibatasi enam sisi berbentuk persegi.'),
      ],
    ),
    make(
      'Gunakan tabel atau kantong benda berwarna. Jelaskan kesimpulan dengan jumlah yang tercatat.',
      data,
      [
        n('Data 4, 6, 8 berjumlah …', 18, '4 + 6 + 8 = 18.'),
        n('Rata-rata 4, 6, 8 adalah …', 6, 'Jumlah 18 dibagi tiga data = 6.'),
        fixed(
          'Dari 5 bola merah dan 1 biru, yang lebih mungkin terambil adalah …',
          'Merah',
          ['Biru', 'Pasti biru', 'Tidak ada bola'],
          'Merah lebih banyak; hasil satu pengambilan tetap belum pasti.',
        ),
        n(
          'Data 3, 5, 7, 9 memiliki jangkauan …',
          6,
          'Nilai terbesar dikurangi terkecil: 9 − 3 = 6.',
        ),
        fixed(
          'Pada kantong hanya berisi bola hijau, mengambil bola hijau adalah …',
          'Pasti',
          ['Mustahil', 'Lebih kecil dari nol', 'Selalu merah'],
          'Semua benda yang dapat terambil berwarna hijau.',
        ),
      ],
    ),
  ],
  [
    make(
      'Tuliskan urutan pengerjaan hitung campuran. Periksa dengan cerita atau perkiraan hasil.',
      operations,
      [
        n('3 × (4 + 2) = …', 18, 'Kerjakan kurung: 4 + 2 = 6, lalu 3 × 6 = 18.'),
        n('24 ÷ 6 + 5 = …', 9, 'Pembagian dahulu: 4 + 5 = 9.'),
        n('40 − 3 × 8 = …', 16, 'Perkalian dahulu: 40 − 24 = 16.'),
        n('(18 + 12) ÷ 5 = …', 6, 'Jumlah dalam kurung 30; 30 ÷ 5 = 6.'),
        n('7 × 12 − 20 = …', 64, '7 × 12 = 84, kemudian 84 − 20 = 64.'),
      ],
    ),
    make('Gambarkan hubungan pecahan, desimal, dan persen memakai petak seratus.', fractions, [
      n('25% dari 80 adalah …', 20, '25% = 1/4; 80 ÷ 4 = 20.'),
      fixed('0,75 dalam persen adalah …', '75%', ['7,5%', '0,75%', '750%'], '0,75 = 75/100 = 75%.'),
      n('3/4 dari 28 adalah …', 21, '28 ÷ 4 × 3 = 21.'),
      fixed('1/5 dalam bentuk desimal adalah …', '0,2', ['0,5', '1,5', '0,05'], '1 ÷ 5 = 0,2.'),
      n(
        'Harga Rp100.000 dikurangi 10%, menjadi Rp …',
        90000,
        'Potongan 10% × 100.000 = 10.000; sisa 90.000.',
      ),
    ]),
    make(
      'Campurkan dua warna benda dalam rasio tertentu. Jelaskan apa arti setiap bagian rasio.',
      [
        c('Rasio', 'Perbandingan dua besaran dengan urutan yang jelas', 'Merah:biru = 2:3'),
        c(
          'Bagian rasio',
          'Satuan perbandingan yang ukurannya sama',
          'Rasio 2:3 memuat lima bagian seluruhnya',
        ),
        c('Rasio senilai', 'Rasio dengan perbandingan yang sama', '2:3 senilai dengan 4:6'),
        c('Proporsi', 'Kesamaan dua rasio', '2/3 = 4/6'),
        c(
          'Urutan besaran',
          'Penentu arti angka pada rasio',
          'Merah:biru berbeda penulisan dari biru:merah',
        ),
      ],
      [
        n(
          'Rasio merah:biru 2:3. Jika merah 4, biru …',
          6,
          'Merah dikalikan 2, maka biru 3 × 2 = 6.',
        ),
        n(
          'Rasio 1:4 dengan total 20 benda. Bagian pertama … benda.',
          4,
          'Total bagian 5; 20 ÷ 5 = 4 tiap bagian.',
        ),
        n(
          '3 buku seharga Rp15.000. Dengan harga satuan sama, 5 buku Rp …',
          25000,
          'Satu buku 15.000 ÷ 3 = 5.000; lima buku 25.000.',
        ),
        n(
          'Resep 2 gelas air untuk 1 gelas sirup. Untuk 3 gelas sirup, air … gelas.',
          6,
          'Rasio air:sirup 2:1; 2 × 3 = 6.',
        ),
        fixed(
          'Rasio senilai dengan 3:5 adalah …',
          '6:10',
          ['3:10', '5:3', '6:5'],
          'Kalikan kedua bagian dengan angka yang sama, yaitu 2.',
        ),
      ],
    ),
    make(
      'Bandingkan satuan panjang, luas, dan volume. Jelaskan mengapa faktor konversinya berbeda.',
      [
        ...measure.slice(0, 3),
        shapes[3],
        c('Volume', 'Ukuran ruang dalam satuan kubik', '1 cm³ berupa kubus rusuk 1 cm'),
      ],
      [
        n('Luas persegi panjang 15 m × 8 m adalah … m².', 120, '15 × 8 = 120.'),
        n('Volume balok 6 cm × 4 cm × 5 cm adalah … cm³.', 120, '6 × 4 × 5 = 120.'),
        n('2 liter = … mililiter.', 2000, '1 liter = 1.000 mL; 2 liter = 2.000 mL.'),
        n('Luas segitiga alas 12 cm, tinggi 8 cm adalah … cm².', 48, '1/2 × 12 × 8 = 48.'),
        n('Kubus rusuk 4 cm volumenya … cm³.', 64, '4 × 4 × 4 = 64.'),
      ],
    ),
    make(
      'Gunakan kotak kemasan bersih untuk mengamati sisi, rusuk, dan titik sudut. Minta pendamping membuka sambungannya.',
      [
        c(
          'Sisi bangun ruang',
          'Permukaan pembatas bangun ruang',
          'Kubus memiliki enam sisi persegi',
        ),
        c(
          'Rusuk',
          'Pertemuan dua sisi berupa ruas garis',
          'Dua sisi kotak bertemu pada sebuah tepi',
        ),
        c('Titik sudut', 'Pertemuan beberapa rusuk', 'Pojok kotak merupakan titik sudut'),
        c(
          'Jaring-jaring',
          'Susunan bangun datar yang dapat dilipat membentuk bangun ruang',
          'Enam persegi tersusun tepat dapat membentuk kubus',
        ),
        c(
          'Tampak bangun',
          'Gambar bangun dari arah pandang tertentu',
          'Kotak dapat dilihat dari depan atau atas',
        ),
      ],
      [
        n('Kubus memiliki … rusuk.', 12, 'Kubus memiliki 12 rusuk yang sama panjang.'),
        n('Balok memiliki … titik sudut.', 8, 'Ada empat titik sudut di atas dan empat di bawah.'),
        n(
          'Jaring-jaring kubus tersusun atas … persegi.',
          6,
          'Setiap persegi menjadi satu dari enam sisi kubus.',
        ),
        fixed(
          'Pernyataan benar tentang enam persegi adalah …',
          'Belum tentu semuanya membentuk jaring-jaring kubus',
          ['Pasti selalu menjadi kubus', 'Tidak mungkin menjadi kubus', 'Selalu membentuk limas'],
          'Susunannya harus dapat dilipat tanpa sisi saling menumpuk.',
        ),
        n(
          'Kubus memiliki … pasang sisi berhadapan.',
          3,
          'Enam sisi membentuk tiga pasangan berhadapan.',
        ),
      ],
    ),
    make('Baca data kecil, hitung ringkasannya, lalu bedakan kejadian mungkin dan pasti.', data, [
      n('Rata-rata 6, 8, 10, 12 adalah …', 9, 'Jumlah 36 dibagi 4 = 9.'),
      n('Jangkauan data 4, 7, 9, 12 adalah …', 8, '12 − 4 = 8.'),
      n('Modus data 2, 3, 3, 4, 5 adalah …', 3, '3 muncul paling sering.'),
      fixed(
        'Dadu biasa bernomor 1 sampai 6 menghasilkan angka 7 adalah …',
        'Mustahil',
        ['Pasti', 'Lebih mungkin dari angka 1', 'Selalu terjadi'],
        'Tidak ada sisi bernomor 7 pada dadu tersebut.',
      ),
      fixed(
        'Dari 3 bola merah dan 3 biru, peluang mengambil merah dibanding biru adalah …',
        'Sama besar',
        ['Merah pasti', 'Biru mustahil', 'Merah dua kali lebih besar'],
        'Jumlah kedua warna sama sehingga kemungkinannya sama.',
      ),
    ]),
  ],
]
