import { card as c, unit as u } from './lessonFactory.js'
const lines = [
  c(
    'Garis',
    'Jejak yang memanjang dan dapat berbeda arah atau sifat',
    'Goresan pensil dapat lurus, melengkung, atau berkelok',
  ),
  c(
    'Bentuk',
    'Rupa bidang atau benda yang dapat dikenali',
    'Potongan kertas dapat berbentuk lingkaran',
  ),
  c(
    'Titik',
    'Unsur rupa kecil yang dapat disusun menjadi pola',
    'Beberapa titik disusun membentuk jejak',
  ),
  c(
    'Arah',
    'Orientasi gerak atau letak unsur rupa',
    'Garis dapat menuju atas, samping, atau diagonal',
  ),
  c(
    'Pengamatan visual',
    'Memperhatikan ciri yang terlihat sebelum menggambar',
    'Anak mengamati bentuk daun tanpa memetiknya',
  ),
]
const colours = [
  c(
    'Warna',
    'Unsur rupa yang berkaitan dengan pengalaman melihat cahaya',
    'Daun tampak memiliki berbagai warna hijau',
  ),
  c(
    'Campuran warna',
    'Hasil menggabungkan bahan warna yang dapat berbeda menurut mediumnya',
    'Cat merah dan kuning dapat menghasilkan jingga',
  ),
  c(
    'Bahan aman',
    'Bahan yang sesuai usia dan digunakan menurut petunjuk pendamping',
    'Krayon yang diperuntukkan anak dipakai pada kertas',
  ),
  c(
    'Alat berkarya',
    'Perlengkapan yang digunakan untuk membuat karya',
    'Kuas digunakan untuk mengoleskan cat',
  ),
  c(
    'Perawatan alat',
    'Tindakan menjaga alat tetap layak dan ruang tetap aman',
    'Kuas dibersihkan dan alat disimpan setelah digunakan',
  ),
]
const observation = [
  c(
    'Objek gambar',
    'Hal yang dipilih untuk diamati atau digambarkan',
    'Anak memilih sepatu sebagai objek',
  ),
  c(
    'Detail',
    'Bagian kecil yang membantu memperjelas gambaran',
    'Tali dan lubang sepatu diamati bentuknya',
  ),
  c(
    'Sketsa',
    'Gambar awal untuk merencanakan bentuk atau susunan',
    'Goresan ringan membantu mencoba letak objek',
  ),
  c(
    'Ekspresi',
    'Cara menyampaikan pengalaman atau perasaan melalui karya',
    'Anak memilih garis dan warna untuk menyampaikan suasana',
  ),
  c(
    'Pilihan pribadi',
    'Keputusan pencipta yang membuat karya mempunyai ciri sendiri',
    'Dua anak boleh menggambar pengalaman sama dengan cara berbeda',
  ),
]
const texture = [
  c(
    'Tekstur',
    'Sifat permukaan yang dapat dirasakan atau digambarkan',
    'Permukaan kain dapat halus atau berumbai',
  ),
  c(
    'Kolase',
    'Karya yang menyusun dan menempel potongan bahan pada bidang',
    'Potongan kertas bersih disusun menjadi taman',
  ),
  c(
    'Cetak sederhana',
    'Membuat jejak bentuk dari permukaan yang diberi warna',
    'Cap aman pada kertas meninggalkan bentuk berulang',
  ),
  c(
    'Susunan',
    'Cara menempatkan bagian-bagian dalam karya',
    'Potongan besar dan kecil disusun sebelum ditempel',
  ),
  c(
    'Percobaan bahan',
    'Menguji kemungkinan bahan secara aman sebelum dipakai',
    'Anak mencoba sisa kertas pada bidang kecil',
  ),
]
const appreciation = [
  c(
    'Apresiasi',
    'Mengamati, memahami, dan menghargai karya',
    'Anak memperhatikan pilihan warna teman sebelum menanggapi',
  ),
  c(
    'Deskripsi karya',
    'Penjelasan tentang hal yang benar-benar tampak atau terdengar',
    'Anak menyebut garis melengkung dalam gambar',
  ),
  c(
    'Tanggapan santun',
    'Komentar yang membahas karya tanpa merendahkan penciptanya',
    'Anak mengatakan bagian yang menarik beserta alasannya',
  ),
  c(
    'Alasan penilaian',
    'Penjelasan yang mendukung suatu pendapat tentang karya',
    'Komentar menyebut hubungan warna dengan suasana',
  ),
  c(
    'Perbedaan tafsir',
    'Kemungkinan orang memahami karya dengan cara berbeda',
    'Dua penonton dapat mempunyai kesan berbeda terhadap gambar',
  ),
]
const composition = [
  c(
    'Komposisi',
    'Pengaturan unsur agar membentuk hubungan dalam karya',
    'Bentuk besar ditempatkan bersama bentuk kecil secara sengaja',
  ),
  c(
    'Keseimbangan',
    'Hubungan bobot visual yang terasa teratur dalam susunan',
    'Warna gelap kecil dapat diimbangi unsur lain',
  ),
  c(
    'Pusat perhatian',
    'Bagian yang sengaja dibuat paling menarik perhatian',
    'Warna yang berbeda menonjolkan satu objek',
  ),
  c(
    'Pengulangan',
    'Pemakaian unsur yang berulang untuk membentuk irama visual',
    'Motif daun diulang pada tepian',
  ),
  c(
    'Ruang',
    'Bagian bidang atau kedalaman yang digunakan atau dibiarkan',
    'Area kosong membantu objek utama terbaca',
  ),
]
const dimensions = [
  c(
    'Dua dimensi',
    'Karya yang terutama mempunyai ukuran panjang dan lebar',
    'Gambar pada kertas merupakan karya bidang',
  ),
  c(
    'Tiga dimensi',
    'Karya yang mempunyai panjang, lebar, dan tinggi atau kedalaman',
    'Model dari bahan aman dapat dilihat dari beberapa arah',
  ),
  c(
    'Volume rupa',
    'Kesan atau isi ruang pada bentuk tiga dimensi',
    'Model kotak mempunyai bagian yang menempati ruang',
  ),
  c(
    'Sambungan',
    'Cara menghubungkan bagian bahan menjadi satu karya',
    'Potongan kertas dihubungkan dengan perekat aman',
  ),
  c(
    'Kestabilan',
    'Keadaan karya dapat berdiri atau tersusun dengan aman',
    'Dasar yang cukup membantu model tidak mudah roboh',
  ),
]
const design = [
  c(
    'Gagasan karya',
    'Ide yang ingin diwujudkan pencipta',
    'Anak ingin membuat poster merawat buku',
  ),
  c(
    'Tujuan karya',
    'Hal yang ingin dikomunikasikan atau dicapai',
    'Poster dirancang untuk mengajak pembaca melakukan tindakan',
  ),
  c(
    'Rancangan',
    'Rencana bentuk, bahan, dan susunan sebelum berkarya',
    'Anak membuat beberapa sketsa pilihan',
  ),
  c(
    'Revisi',
    'Perubahan untuk memperbaiki hubungan bentuk dengan tujuan',
    'Tulisan diperbesar agar pesan lebih mudah dibaca',
  ),
  c(
    'Refleksi proses',
    'Penilaian terhadap langkah dan keputusan selama berkarya',
    'Pencipta menjelaskan perubahan yang dilakukan dan alasannya',
  ),
]
const materials = [
  c(
    'Bahan alam',
    'Bahan yang berasal dari alam dan digunakan dengan bertanggung jawab',
    'Daun gugur yang bersih dipakai tanpa memetik tanaman',
  ),
  c(
    'Bahan buatan',
    'Bahan yang diolah manusia untuk kebutuhan tertentu',
    'Kertas dibuat melalui proses pengolahan',
  ),
  c(
    'Guna ulang',
    'Memakai bahan yang masih layak untuk kebutuhan lain',
    'Kotak bersih dijadikan wadah alat',
  ),
  c(
    'Teknik',
    'Cara menggunakan alat atau bahan untuk menghasilkan karya',
    'Melipat dan menempel adalah teknik yang berbeda',
  ),
  c(
    'Keselamatan kerja',
    'Tindakan menjaga diri, orang lain, dan ruang selama berkarya',
    'Alat tajam hanya digunakan sesuai usia dengan pendampingan',
  ),
]
const rhythm = [
  c('Bunyi', 'Getaran yang dapat didengar melalui medium', 'Tepukan tangan menghasilkan bunyi'),
  c(
    'Ketukan',
    'Denyut teratur yang menjadi acuan waktu musik',
    'Anak menepuk dengan jarak waktu yang tetap',
  ),
  c(
    'Irama',
    'Pola panjang-pendek dan penempatan bunyi terhadap waktu',
    'Tepuk singkat dan panjang disusun menjadi pola',
  ),
  c(
    'Diam dalam musik',
    'Bagian waktu tanpa bunyi yang disengaja',
    'Peserta berhenti satu ketukan sesuai pola',
  ),
  c(
    'Tempo',
    'Cepat atau lambatnya acuan ketukan musik',
    'Pola yang sama dapat dilakukan perlahan atau lebih cepat',
  ),
]
const melody = [
  c(
    'Nada',
    'Bunyi dengan tinggi tertentu',
    'Suara yang dinyanyikan dapat terdengar lebih tinggi atau rendah',
  ),
  c(
    'Melodi',
    'Rangkaian nada yang tersusun menjadi gagasan musikal',
    'Urutan nada membentuk bagian lagu',
  ),
  c(
    'Dinamika',
    'Kuat-lemahnya bunyi dalam penyajian musik',
    'Bagian musik dinyanyikan lembut sesuai maksud',
  ),
  c(
    'Frasa musik',
    'Kelompok bunyi atau nada yang terasa sebagai satu bagian',
    'Penyanyi memberi jeda pada akhir gagasan musikal',
  ),
  c(
    'Mendengar aktif',
    'Memperhatikan hubungan bunyi sebelum menanggapi atau meniru',
    'Anak menyimak pola sebelum mencoba membunyikannya',
  ),
]
const groupMusic = [
  c(
    'Ansambel',
    'Permainan musik bersama beberapa pemain',
    'Kelompok membawakan pola bunyi yang saling melengkapi',
  ),
  c(
    'Peran musikal',
    'Tugas bunyi yang dipegang anggota dalam kelompok',
    'Satu kelompok menjaga ketukan, kelompok lain memberi pola',
  ),
  c(
    'Koordinasi',
    'Penyesuaian tindakan dengan anggota lain',
    'Peserta mulai dan berhenti menurut aba-aba',
  ),
  c(
    'Keseimbangan bunyi',
    'Pengaturan agar bagian penting tetap terdengar',
    'Pemain tidak menutupi suara teman dengan bunyi terlalu kuat',
  ),
  c(
    'Evaluasi musik',
    'Pembahasan hasil penyajian untuk menentukan perbaikan',
    'Kelompok membahas apakah ketukan tetap terjaga',
  ),
]
const movement = [
  c('Gerak', 'Perubahan posisi tubuh atau bagian tubuh', 'Tangan bergerak membentuk lengkungan'),
  c(
    'Ruang gerak',
    'Tempat dan arah yang dipakai tubuh ketika bergerak',
    'Anak memberi jarak aman dari temannya',
  ),
  c(
    'Tenaga',
    'Kualitas penggunaan kekuatan dalam gerak',
    'Gerak dapat dilakukan ringan atau lebih tegas',
  ),
  c(
    'Waktu gerak',
    'Hubungan durasi dan kecepatan gerakan',
    'Gerakan lambat membutuhkan waktu lebih panjang',
  ),
  c(
    'Kesadaran tubuh',
    'Perhatian pada kemampuan dan keadaan tubuh sendiri',
    'Anak berhenti saat merasa gerak tidak nyaman',
  ),
]
const dance = [
  c(
    'Rangkaian gerak',
    'Susunan beberapa gerakan yang saling berkaitan',
    'Langkah kecil dihubungkan dengan gerak tangan',
  ),
  c(
    'Level',
    'Tinggi-rendah posisi tubuh dalam gerak',
    'Gerak dapat dilakukan pada posisi tinggi atau rendah sesuai kemampuan',
  ),
  c(
    'Pola lantai',
    'Jalur atau susunan posisi penari dalam ruang',
    'Kelompok bergerak pada jalur lurus atau melengkung',
  ),
  c(
    'Ekspresi gerak',
    'Cara menyampaikan suasana atau gagasan melalui gerakan',
    'Gerak ringan digunakan untuk menggambarkan kegembiraan',
  ),
  c(
    'Kerja kelompok tari',
    'Penyesuaian gerak dan ruang dengan anggota lain',
    'Peserta menjaga jarak dan mengikuti kesepakatan awal',
  ),
]
const theatre = [
  c(
    'Tokoh',
    'Sosok yang diperankan dalam cerita atau pertunjukan',
    'Anak memerankan penjaga taman rekaan',
  ),
  c(
    'Ekspresi wajah',
    'Perubahan raut untuk menyampaikan keadaan tokoh',
    'Tokoh tampak heran melalui raut wajahnya',
  ),
  c(
    'Gestur',
    'Gerak tubuh yang membantu menyampaikan maksud',
    'Tokoh menunjuk arah untuk memberi petunjuk',
  ),
  c('Dialog', 'Percakapan antartokoh', 'Dua tokoh saling bertanya dan menjawab'),
  c(
    'Imajinasi',
    'Kemampuan membayangkan keadaan atau kemungkinan',
    'Kursi dibayangkan sebagai halte dalam permainan peran',
  ),
]
const theatreAdvanced = [
  c(
    'Alur dramatik',
    'Rangkaian kejadian yang membangun tindakan dalam pertunjukan',
    'Tokoh menghadapi masalah lalu mencoba menyelesaikannya',
  ),
  c(
    'Motivasi tokoh',
    'Alasan yang mendorong tindakan tokoh',
    'Tokoh mencari buku karena ingin mengembalikannya',
  ),
  c(
    'Improvisasi',
    'Pengembangan tindakan atau ucapan secara spontan dalam batas kesepakatan',
    'Pemain menanggapi kejadian rekaan tanpa naskah rinci',
  ),
  c(
    'Properti',
    'Benda yang digunakan untuk mendukung tindakan dalam pertunjukan',
    'Kotak aman digunakan sebagai barang bawaan tokoh',
  ),
  c(
    'Kesepakatan bermain',
    'Batas dan aturan yang menjaga permainan peran tetap aman',
    'Peserta sepakat tidak memakai kekerasan nyata atau mengejek identitas',
  ),
]
const exhibition = [
  c(
    'Kurasi sederhana',
    'Memilih dan menyusun karya berdasarkan tujuan penyajian',
    'Kelompok memilih karya yang menunjukkan proses belajar',
  ),
  c(
    'Label karya',
    'Keterangan yang membantu pengunjung memahami karya',
    'Judul dan bahan dicatat tanpa data pribadi berlebihan',
  ),
  c(
    'Penyajian',
    'Cara menempatkan atau membawakan karya kepada penonton',
    'Karya diletakkan agar aman dan dapat dilihat',
  ),
  c(
    'Peran penonton',
    'Sikap menyimak dan menghargai penyajian karya',
    'Pengunjung tidak menyentuh karya tanpa izin',
  ),
  c(
    'Refleksi pameran',
    'Pembahasan pengalaman menyajikan serta menerima tanggapan',
    'Pencipta mencatat bagian penyajian yang perlu diperbaiki',
  ),
]
export const artsUnits = [
  [
    u(
      'Cari tiga garis dan bentuk dari benda sekitar. Gambarkan tanpa harus sama persis dengan karya teman.',
      lines,
    ),
    u(
      'Coba dua warna pada kertas sisa dengan bahan aman. Jangan mencampur bahan yang tidak diketahui.',
      colours,
    ),
    u(
      'Gambarkan satu pengalaman yang nyaman untuk diceritakan. Pilih warna dan bentuk menurut maksudmu.',
      observation,
    ),
    u(
      'Buat pola tepuk pendek dengan jeda. Gunakan volume wajar agar tidak mengganggu atau menyakiti telinga.',
      rhythm,
    ),
    u(
      'Coba gerak kecil di tempat yang cukup luas bersama pendamping. Sesuaikan dengan kemampuan tubuhmu.',
      movement,
    ),
    u(
      'Perankan tokoh rekaan yang meminta bantuan dengan sopan. Semua peserta boleh memilih tidak memerankan hal yang tidak nyaman.',
      theatre,
    ),
  ],
  [
    u(
      'Buat gambar yang memakai dua tekstur dan beberapa bentuk. Gunakan bahan yang bersih serta aman.',
      texture,
    ),
    u(
      'Buat kolase dari sisa kertas atau cap dengan alat aman. Susun bentuk sebelum direkatkan.',
      texture,
    ),
    u(
      'Amati karya teman. Sebut satu hal yang terlihat dan satu hal yang menarik beserta alasannya.',
      appreciation,
    ),
    u(
      'Tepuk pola dua ketukan dan empat ketukan. Tunjukkan bagian diam tanpa mempercepat ketukan.',
      rhythm,
    ),
    u(
      'Hubungkan dua gerak sederhana dengan ketukan. Hindari gerak yang menyakitkan atau memaksa kelenturan.',
      movement,
    ),
    u(
      'Gunakan wajah dan gerak tangan untuk memerankan tokoh rekaan. Jangan menirukan identitas orang lain untuk mengejek.',
      theatre,
    ),
  ],
  [
    u(
      'Amati unsur rupa di satu benda sekitar. Buat sketsa dan jelaskan pilihan garis atau bentuknya.',
      lines,
    ),
    u('Susun motif sederhana yang berulang. Coba dua komposisi sebelum memilih.', composition),
    u(
      'Buat gambar bidang dan model kecil dari bahan aman. Jelaskan bagaimana cara melihat keduanya berbeda.',
      dimensions,
    ),
    u(
      'Buat pola bunyi dengan tepuk atau benda yang aman. Jaga volume, ketukan, dan bagian diam.',
      rhythm,
    ),
    u(
      'Susun tiga gerak untuk menceritakan kejadian rekaan. Beri ruang aman kepada peserta.',
      dance,
    ),
    u(
      'Berikan tanggapan karya berdasarkan hal yang diamati. Hindari menilai kemampuan atau harga diri penciptanya.',
      appreciation,
    ),
  ],
  [
    u(
      'Buat dua susunan bentuk yang mempunyai pusat perhatian berbeda. Jelaskan keputusan penempatannya.',
      composition,
    ),
    u(
      'Coba teknik melipat atau menyusun pada bahan sisa yang bersih. Pilih alat sesuai usia dengan pendamping.',
      materials,
    ),
    u(
      'Kembangkan motif dari pengamatan lingkungan tanpa merusak objek atau menyalin simbol bermakna khusus sembarangan.',
      observation,
    ),
    u(
      'Tirukan pola nada pendek dari pendamping pada tinggi suara yang nyaman. Dengarkan dan beri jeda sesuai frasa.',
      melody,
    ),
    u('Susun gerak kelompok dengan jalur dan level yang sesuai kemampuan setiap peserta.', dance),
    u(
      'Buat adegan pendek dengan awal, dialog, dan akhir. Sepakati batas aman sebelum bermain.',
      theatreAdvanced,
    ),
  ],
  [
    u(
      'Rancang karya yang menyampaikan pesan pilihanmu. Buat dua sketsa dan jelaskan alasan memilihnya.',
      design,
    ),
    u(
      'Eksplorasi dua bahan aman untuk maksud sama. Catat kelebihan, keterbatasan, dan sisa bahannya.',
      materials,
    ),
    u(
      'Buat karya dari bahan sekitar yang bersih dan diizinkan. Utamakan guna ulang tanpa mengambil benda berbahaya.',
      materials,
    ),
    u(
      'Buat pola bunyi kelompok yang menyampaikan suasana. Atur ketukan, dinamika, dan giliran masuk.',
      groupMusic,
    ),
    u(
      'Susun gerak dengan variasi arah dan level. Jelaskan hubungan gerak dengan gagasan tanpa memaksakan bentuk tubuh.',
      dance,
    ),
    u(
      'Mainkan adegan rekaan dengan motivasi tokoh yang jelas. Setelahnya bahas keputusan dan perbaikan.',
      theatreAdvanced,
    ),
  ],
  [
    u(
      'Pilih karya yang pernah dibuat. Revisi satu keputusan bentuk atau susunan berdasarkan tujuan yang ingin disampaikan.',
      design,
    ),
    u(
      'Bandingkan dua pilihan teknik atau komposisi. Jelaskan bagaimana pilihan tersebut memengaruhi pesan.',
      composition,
    ),
    u(
      'Siapkan pameran kecil dengan label yang menjaga privasi. Minta izin sebelum memajang atau merekam karya orang lain.',
      exhibition,
    ),
    u(
      'Rancang penyajian musik kelompok singkat. Berlatih memberi aba-aba, menjaga keseimbangan bunyi, dan mengevaluasi hasil.',
      groupMusic,
    ),
    u(
      'Sajikan rangkaian tari sederhana yang aman dan inklusif. Sesuaikan ruang serta gerak dengan kebutuhan peserta.',
      dance,
    ),
    u(
      'Buat pertunjukan singkat dengan tugas pemain dan pendukung. Catat hasil refleksi proses, bukan hanya penilaian penonton.',
      theatreAdvanced,
    ),
  ],
]
