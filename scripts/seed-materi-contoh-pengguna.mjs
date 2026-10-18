// Tiga contoh lampiran pengguna, disunting dan dilengkapi tanpa mengganti identitas bab seed.
const q = (prompt, answer, wrong, explanation) => ({ prompt, answer, wrong, explanation })
const section = (heading, body, example) => ({ heading, body, example })

export const userExampleRevisions = {
  'komik-ipa-kelas-4-bab-1': {
    title: 'Rahasia Dapur Hijau: Bagaimana Tumbuhan Memasak?',
    source_example: {
      slug: 'fotosintesis-tumbuhan-kelas-4',
      source_title: 'Buku IPAS SD Kelas 4 Kurikulum Merdeka',
      provenance:
        'Judul referensi dari lampiran pengguna; edisi dan halaman belum diverifikasi. Naskah aplikasi disunting secara orisinal.',
    },
    summary:
      'Menyelidiki cara tumbuhan hijau membuat makanan melalui fotosintesis, peran cahaya dan klorofil, serta membaca bukti percobaan sederhana.',
    opening:
      'Halo Peneliti Cilik! Pernahkah kamu melihat pohon mangga pergi ke warung untuk membeli makanan? Tentu tidak! Dari mana pohon mendapat makanan supaya bisa tumbuh besar?',
    visual:
      'Diagram dapur daun: akar menyerap air → batang mengangkut air ke daun; daun menerima karbon dioksida dan cahaya. Fotosintesis menghasilkan makanan berupa gula dan oksigen.',
    sections: [
      section(
        'Dapur hijau dan penangkap cahaya',
        'Tumbuhan hijau membuat makanan melalui fotosintesis. Klorofil adalah zat warna hijau yang membantu menangkap cahaya, bukan nama dapur atau makanan. Proses ini memerlukan air dan karbon dioksida dengan bantuan energi cahaya.',
        'Bayangkan daun sebagai dapur dan klorofil sebagai penangkap cahaya: cahaya membantu proses air + karbon dioksida → gula + oksigen. Cahaya adalah sumber energi, bukan bahan makanan yang diserap akar.',
      ),
      section(
        'Perjalanan air dan hasil fotosintesis',
        'Akar menyerap air dan mineral dari tanah. Air diangkut melalui batang ke daun. Gula hasil fotosintesis digunakan tumbuhan untuk tumbuh dan dapat disimpan; oksigen dilepaskan. Tumbuhan juga bernapas, baik siang maupun malam.',
        'Kartu alur: tanah → akar → batang → daun. Kartu hasil: gula untuk tumbuhan dan oksigen yang juga diperlukan manusia untuk bernapas. Karbon dioksida adalah gas bahan fotosintesis, bukan nama lain udara kotor atau panas.',
      ),
      section(
        'Membaca bukti dengan hati-hati',
        'Untuk menyelidiki pengaruh cahaya, bandingkan tumbuhan sejenis dengan ukuran awal, air, tanah dan lama pengamatan yang sama. Ubah hanya kondisi cahaya. Daun layu saja belum membuktikan penyebabnya, karena air dan keadaan lain juga bisa berpengaruh.',
        'Data rekaan percobaan pelepasan gas tumbuhan air selama 5 menit: terang 18 gelembung, redup 6, gelap 0. Dengan kondisi lain sama, pelepasan gelembung lebih banyak di tempat terang. Ulangi pengamatan; hitungan ini bukan bukti bahwa semua jenis tumbuhan selalu menghasilkan jumlah yang sama.',
      ),
    ],
    mini: q(
      'Apa nama zat warna hijau pada daun yang membantu menangkap cahaya untuk fotosintesis?',
      'Klorofil',
      ['Akar serabut', 'Batang kayu'],
      'Tepat! Klorofil adalah zat warna hijau yang membantu menangkap energi cahaya untuk fotosintesis.',
    ),
    recap:
      'Fotosintesis menggunakan air dan karbon dioksida dengan bantuan cahaya untuk menghasilkan gula dan oksigen. Klorofil membantu menangkap cahaya.',
    activity:
      'Bersama pendamping, gambar alur air dari tanah ke daun dan beri label bahan, sumber energi, serta hasil fotosintesis. Tidak perlu menyimpan tanaman hidup di lemari tertutup.',
    easy: [
      q(
        'Proses tumbuhan hijau membuat makanannya sendiri dengan bantuan cahaya matahari disebut...',
        'Fotosintesis',
        ['Penguapan', 'Pencernaan', 'Pembekuan'],
        'Fotosintesis adalah proses tumbuhan hijau membuat makanan dari air dan karbon dioksida dengan bantuan energi cahaya.',
      ),
      q(
        'Gas hasil fotosintesis yang juga dibutuhkan manusia untuk bernapas adalah...',
        'Oksigen',
        ['Karbon dioksida', 'Asap', 'Nitrogen'],
        'Fotosintesis menghasilkan gula dan oksigen. Manusia memerlukan oksigen untuk bernapas; asap bukan hasil fotosintesis.',
      ),
    ],
    medium: [
      q(
        'Rani membandingkan dua tanaman sejenis dengan ukuran awal, air dan tanah sama. Tanaman A mendapat cahaya, B berada di tempat gelap. Mengapa B lebih sulit membuat makanan melalui fotosintesis?',
        'B tidak mendapat cahaya yang diperlukan untuk fotosintesis',
        [
          'B tidak perlu air lagi',
          'B memperoleh makanan dari gelap',
          'Akar B berubah menjadi makanan',
        ],
        'Cahaya menyediakan energi untuk fotosintesis. Perbandingan ini menyamakan kondisi lain; gelap menghambat fotosintesis, tetapi layu saja tidak selalu menunjukkan satu penyebab.',
      ),
      q(
        'Tanah pot Lala masih lembap. Bagian tumbuhan mana yang menyerap air dari tanah sebelum air diangkut lewat batang menuju daun?',
        'Akar',
        ['Bunga', 'Buah', 'Biji di buah'],
        'Akar menyerap air dan mineral dari tanah. Air kemudian diangkut melalui batang menuju daun untuk membantu fotosintesis dan kebutuhan tumbuhan lainnya.',
      ),
    ],
    hard: [
      q(
        'Dua tumbuhan air sejenis diamati 5 menit dengan kondisi lain sama. Data gelembung: terang 18, redup 6, gelap 0. Kesimpulan mana paling sesuai dengan data?',
        'Pada percobaan ini, pelepasan gelembung paling banyak saat terang',
        [
          'Gelap selalu membuat semua tumbuhan mati seketika',
          'Cahaya tidak berhubungan dengan hasil pengamatan',
          'Semua tumbuhan pasti menghasilkan 18 gelembung',
        ],
        'Bandingkan 18, 6 dan 0: nilai terbesar muncul saat terang. Kesimpulan dibatasi pada percobaan ini; data tidak membuktikan semua tumbuhan selalu menghasilkan jumlah yang sama.',
      ),
      q(
        'Tobi ingin menguji pengaruh cahaya terhadap fotosintesis. Rancangan mana paling membantu membedakan pengaruh cahaya dari pengaruh air?',
        'Dua tanaman sejenis berukuran awal sama, air dan tanah sama, tetapi pencahayaan berbeda',
        [
          'Tanaman terang disiram, tanaman gelap tidak disiram',
          'Bandingkan kaktus besar dengan kecambah kecil di tempat berbeda',
          'Ubah air, tanah dan cahaya sekaligus',
        ],
        'Ubah satu faktor, yaitu cahaya, sambil menyamakan faktor lain. Jika air dan jenis tanaman juga berbeda, kita sulit mengetahui faktor mana yang memengaruhi hasil.',
      ),
    ],
  },
  'komik-bahasa-indonesia-kelas-3-bab-1': {
    title: 'Misi Detektif Bobo: Menemukan Ide Pokok Cerita!',
    source_example: {
      slug: 'mencari-ide-pokok-kelas-3',
      source_title: 'Buku Bahasa Indonesia SD Kelas 3 Kurikulum Merdeka',
      provenance:
        'Judul referensi dari lampiran pengguna; edisi dan halaman belum diverifikasi. Naskah aplikasi disunting secara orisinal.',
    },
    summary:
      'Menjadi detektif bacaan bersama Bobo: membedakan ide pokok dan rincian, lalu membuktikan jawaban dengan isi seluruh paragraf.',
    opening:
      'Huhu! Selamat datang di Pulau Kata! Aku Bobo, teman detektif bacaanmu. Ada tiga kalimat tentang kelinci di surat ini. Apakah semuanya membawa pesan yang sama? Mari cari inti ceritanya!',
    visual:
      'Papan petunjuk Bobo: kartu tengah bertuliskan ide pokok, dikelilingi kartu rincian. Untuk paragraf kelinci, kartu inti berbunyi kelinci lincah; kartu rinciannya melompat dan berlari cepat.',
    sections: [
      section(
        'Ide pokok adalah inti pembicaraan',
        'Ide pokok adalah gagasan utama dalam paragraf. Kalimat utama menyatakan gagasan itu, sedangkan kalimat penjelas memberi rincian. Ide pokok dapat kita tulis dengan kata sendiri asalkan maknanya tetap sesuai bacaan.',
        'Kelinci adalah hewan yang lincah. Ia melompat di padang rumput. Kakinya yang kuat membantu berlari cepat. Intinya kelincahan kelinci; melompat dan berlari adalah bukti pendukung.',
      ),
      section(
        'Cari bukti, jangan hanya menebak posisi',
        'Baca semua kalimat dan tanyakan: paragraf ini terutama membahas apa? Kalimat utama dapat berada di awal atau akhir; ada juga paragraf yang menyampaikan gagasan secara tersirat. Posisi saja belum cukup untuk menentukan jawaban.',
        'Dina menyapu lantai kelas. Raka mengelap meja. Siti merapikan rak buku. Walau tidak tertulis sebagai satu kalimat utama, semua rincian mendukung gagasan kegiatan membersihkan dan merapikan kelas.',
      ),
      section(
        'Uji gagasan dengan rincian',
        'Cocokkan calon ide pokok dengan semua kalimat penjelas. Pilih gagasan yang mencakup isi paragraf, bukan satu rincian kecil atau topik terlalu luas. Untuk paragraf simpulan, kalimat terakhir merangkum rincian sebelumnya.',
        'Ibu menanam cabai, tomat dan bayam. Kami menyiram dan memberi pupuk secara teratur. Kebun keluarga kami dirawat dengan baik. Kalimat terakhir merangkum kegiatan sebelumnya: perawatan kebun keluarga.',
      ),
    ],
    mini: q(
      'Bacalah: "Kelinci adalah hewan yang sangat lincah. Ia suka melompat di padang rumput. Kakinya yang kuat membantu berlari cepat." Apa inti paragraf itu?',
      'Kelincahan kelinci',
      ['Warna rumput di taman', 'Cara memberi makan kelinci'],
      'Mata detektifmu tajam! Melompat dan berlari cepat mendukung gagasan bahwa kelinci lincah.',
    ),
    recap:
      'Ide pokok merangkum inti paragraf. Bacalah seluruh kalimat dan gunakan rinciannya sebagai bukti, termasuk ketika gagasan disampaikan secara tersirat.',
    activity:
      'Pilih paragraf pendek bersama pendamping. Tulis ide pokok dengan kata sendiri, lalu tunjuk dua rincian yang mendukungnya.',
    easy: [
      q(
        'Inti pembicaraan yang menjadi gagasan utama sebuah paragraf disebut...',
        'Ide pokok',
        ['Tanda baca', 'Nama pengarang', 'Nomor halaman'],
        'Ide pokok adalah inti pembicaraan dalam paragraf. Rincian dan contoh dalam paragraf membantu menjelaskan gagasan itu.',
      ),
      q(
        'Kalimat yang memberi rincian atau contoh untuk mendukung gagasan utama disebut...',
        'Kalimat penjelas',
        ['Kalimat tanya saja', 'Judul buku', 'Nama tokoh'],
        'Kalimat penjelas menambahkan rincian, alasan atau contoh yang mendukung gagasan utama. Gagasan utama tidak selalu dinyatakan dalam satu kalimat yang jelas.',
      ),
    ],
    medium: [
      q(
        'Bacalah: "Sarapan pagi penting bagi anak sekolah. Sarapan memberi energi untuk belajar. Tubuh yang cukup energi membantu kita mengikuti kegiatan kelas." Apa ide pokoknya?',
        'Pentingnya sarapan bagi anak sekolah',
        ['Cara memasak nasi goreng', 'Warna meja kelas', 'Jadwal pulang sekolah'],
        'Semua kalimat membahas pentingnya sarapan. Energi untuk belajar dan mengikuti kegiatan kelas adalah rincian yang mendukung gagasan tersebut.',
      ),
      q(
        'Bacalah: "Bobo merawat buku perpustakaan dengan baik. Ia menyampul buku yang mudah rusak. Ia juga menyimpan buku di rak kering." Kalimat mana merupakan rincian pendukung?',
        'Ia juga menyimpan buku di rak kering',
        ['Semua buku berwarna merah', 'Bobo ingin berenang', 'Perpustakaan menjual buah'],
        'Menyimpan buku di rak kering adalah tindakan merawat buku dan tertulis dalam bacaan. Pilihan lain tidak menjadi bukti dalam paragraf.',
      ),
    ],
    hard: [
      q(
        'Bacalah: "Ibu menanam cabai, tomat dan bayam. Kami menyiram dan memberi pupuk secara teratur. Kebun keluarga kami dirawat dengan baik." Kalimat mana paling tepat merangkum dua kalimat sebelumnya?',
        'Kebun keluarga kami dirawat dengan baik',
        [
          'Ibu menanam cabai, tomat dan bayam',
          'Kami menyiram dan memberi pupuk secara teratur',
          'Kebun keluarga tidak pernah dirawat',
        ],
        'Kalimat terakhir merangkum penanaman, penyiraman dan pemberian pupuk sebagai perawatan kebun. Dua kalimat awal memberikan rincian kegiatan.',
      ),
      q(
        'Bacalah: "Dina menyapu lantai kelas. Raka mengelap meja. Siti merapikan rak buku." Ide pokok tersirat mana yang didukung semua kalimat?',
        'Anak-anak membersihkan dan merapikan kelas',
        [
          'Dina hanya ingin membeli sapu',
          'Semua anak sedang makan siang',
          'Sekolah akan mengadakan lomba renang',
        ],
        'Ketiga tindakan berkaitan dengan membersihkan atau merapikan kelas. Kita menyimpulkan inti bersama dari rincian tanpa menambahkan kegiatan yang tidak disebutkan.',
      ),
    ],
  },
  'komik-matematika-kelas-5-bab-1': {
    title: 'Membaca Peta Data & Membandingkan Pecahan Bekal',
    source_example: {
      slug: 'pecahan-dan-data-kelas-5',
      source_title: 'Buku Matematika SD Kelas 5 Kurikulum Merdeka',
      provenance:
        'Judul referensi dari lampiran pengguna; edisi dan halaman belum diverifikasi. Naskah aplikasi disunting secara orisinal.',
    },
    summary:
      'Menjumlahkan pecahan berbeda penyebut, membandingkan bekal, serta membaca tabel dan rata-rata hasil panen bersama Kapten Rubi.',
    opening:
      'Siap berlayar, Kapten Muda? Ada 1/2 liter air jeruk dan 1/4 liter air madu di kapal. Jika keduanya dituangkan ke satu botol besar dalam model hitungan kita, berapa liter jumlah bekalnya?',
    visual:
      'Dua gelas ukur bermodel sama: gelas jeruk berisi 2 dari 4 bagian liter, gelas madu 1 dari 4 bagian liter. Diagram gabungan menunjukkan 3 dari 4 bagian, yaitu 3/4 liter.',
    sections: [
      section(
        'Samakan ukuran bagian',
        'Penyebut menunjukkan pembagian satu keseluruhan menjadi bagian sama besar. Untuk menjumlahkan pecahan, gunakan satuan dan ukuran keseluruhan yang sama, lalu samakan penyebut. Jumlahkan pembilang dan pertahankan penyebut.',
        '1/2 liter = 2/4 liter. Jadi 1/2 + 1/4 = 2/4 + 1/4 = 3/4 liter. Jangan menjumlahkan penyebut menjadi 6, karena ukuran bagian harus tetap sama.',
      ),
      section(
        'Bandingkan bekal dengan gambar',
        'Untuk membandingkan pecahan, samakan penyebut atau gunakan gambar dengan keseluruhan sama besar. Perhatikan juga satuannya. Dua wadah berukuran berbeda yang sama-sama setengah penuh belum tentu berisi volume sama.',
        'Pita perempat liter: bekal A 3/4 = [■ ■ ■ □], bekal B 1/2 = [■ ■ □ □]. Selisihnya satu bagian perempat liter: 3/4 − 2/4 = 1/4 liter.',
      ),
      section(
        'Baca tabel lalu bagi rata',
        'Data panen dapat ditulis dalam tabel atau diagram. Untuk mencari rata-rata, jumlahkan semua nilai lalu bagi dengan banyak data. Rata-rata adalah nilai jika total dibagi sama rata; bukan selalu nilai tertinggi atau nilai yang paling sering muncul.',
        'Tabel panen: Senin | 15 kg; Selasa | 20 kg; Rabu | 25 kg; Kamis | 20 kg. Jumlah 15+20+25+20=80 kg selama 4 hari. Rata-rata 80÷4=20 kg per hari. Panen terbesar Rabu, walau rata-ratanya 20 kg.',
      ),
    ],
    mini: q(
      'Manakah penyebut bersama terkecil untuk menjumlahkan 1/3 + 1/6?',
      '6',
      ['3', '9'],
      'Tepat! Enam dapat dibagi tiga dan enam. Ubah 1/3 menjadi 2/6, lalu 2/6 + 1/6 = 3/6 = 1/2.',
    ),
    recap:
      'Samakan penyebut untuk menjumlahkan dan membandingkan pecahan. Baca satuan pada data; rata-rata = jumlah seluruh nilai ÷ banyak data.',
    activity:
      'Gambar pita perempat untuk bekal 1/2 + 1/4 liter. Lalu buat empat data panen rekaan, jumlahkan dan cari rata-ratanya.',
    easy: [
      q(
        'Hasil penjumlahan 1/4 + 2/4 adalah...',
        '3/4',
        ['3/8', '2/4', '1/4'],
        'Penyebutnya sama, yaitu empat. Jumlahkan pembilang 1+2=3 dan pertahankan penyebut, sehingga hasilnya 3/4.',
      ),
      q(
        'Pecahan yang senilai dengan 1/2 dan berpenyebut 4 adalah...',
        '2/4',
        ['1/4', '3/4', '4/4'],
        'Kalikan pembilang dan penyebut 1/2 dengan dua: (1×2)/(2×2)=2/4. Nilainya tetap sama karena keseluruhan dan ukuran bagiannya sesuai.',
      ),
    ],
    medium: [
      q(
        'Kapten Rubi menyiapkan 1/2 liter air jeruk dan 1/4 liter air madu. Dalam model penjumlahan volume, berapa liter jumlah bekalnya?',
        '3/4 liter',
        ['2/6 liter', '2/4 liter', '4/4 liter'],
        'Samakan penyebut menjadi empat: 1/2=2/4. Jumlahnya 2/4+1/4=3/4 liter. Penyebut tidak ikut dijumlahkan.',
      ),
      q(
        'Bobo membawa 3/4 liter air dan Tobi membawa 1/2 liter air. Berapa liter lebih banyak air yang dibawa Bobo?',
        '1/4 liter',
        ['1/2 liter', '3/4 liter', '5/4 liter'],
        'Ubah 1/2 menjadi 2/4. Selisih air Bobo dan Tobi adalah 3/4−2/4=1/4 liter; satuannya sama-sama liter.',
      ),
    ],
    hard: [
      q(
        'Tabel panen Rubi: Senin 15 kg | Selasa 20 kg | Rabu 25 kg | Kamis 20 kg. Berapa rata-rata panen per hari selama empat hari?',
        '20 kg',
        ['15 kg', '22 kg', '25 kg'],
        'Jumlahkan 15+20+25+20=80 kg. Ada empat hari, sehingga rata-rata 80÷4=20 kg per hari. Gunakan semua data, bukan hanya panen terbesar.',
      ),
      q(
        'Tabel bekal: A 1/2 liter | B 1/4 liter | C 3/4 liter. Rubi hanya boleh memilih dua bekal dan botolnya berkapasitas 1 liter. Pasangan mana tepat mengisi botol tanpa sisa ruang?',
        'B dan C',
        ['A dan B', 'A dan C', 'A saja'],
        'Samakan penyebut menjadi empat: B+C=1/4+3/4=4/4=1 liter. A+B=3/4 liter masih kurang, sedangkan A+C=5/4 liter melebihi kapasitas.',
      ),
    ],
  },
}
