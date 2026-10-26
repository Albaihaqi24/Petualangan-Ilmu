import { card as c, unit as u } from './lessonFactory.js'
const identity = [
  c(
    'Identitas',
    'Ciri atau keterangan yang membantu mengenali seseorang',
    'Anak memperkenalkan nama panggilan dan kesukaan',
  ),
  c(
    'Persamaan',
    'Ciri yang dimiliki bersama oleh beberapa orang',
    'Dua teman sama-sama senang membaca',
  ),
  c(
    'Perbedaan',
    'Ciri yang tidak sama antara satu orang dan lainnya',
    'Teman mempunyai kesukaan berbeda',
  ),
  c(
    'Menghargai',
    'Memperlakukan orang lain dengan hormat',
    'Anak tidak mengejek cara bicara temannya',
  ),
  c(
    'Privasi',
    'Hal pribadi yang perlu dijaga dan tidak dibagikan sembarangan',
    'Anak tidak menyebarkan alamat atau nomor telepon teman',
  ),
]
const rulesA = [
  c(
    'Aturan',
    'Ketentuan untuk menjaga keteraturan dan kenyamanan',
    'Anggota keluarga merapikan alat setelah digunakan',
  ),
  c('Kesepakatan', 'Hal yang disetujui bersama', 'Kelompok menyetujui giliran memakai mainan'),
  c(
    'Giliran',
    'Kesempatan yang diberikan secara bergantian',
    'Anak menunggu teman selesai memakai alat',
  ),
  c(
    'Tanggung jawab',
    'Kesediaan menjalankan tugas dan menjaga akibat tindakan',
    'Anak mengembalikan buku yang dipinjam',
  ),
  c(
    'Konsekuensi',
    'Akibat yang berkaitan dengan tindakan dan perlu dipahami',
    'Mainan yang tidak dirapikan dapat menghalangi jalan',
  ),
]
const valuesA = [
  c(
    'Ketuhanan',
    'Nilai menghormati keyakinan dan menjalankan ajaran agama masing-masing',
    'Anak tidak mengganggu teman yang beribadah',
  ),
  c(
    'Kemanusiaan',
    'Nilai memperlakukan orang dengan hormat dan peduli',
    'Anak membantu teman yang mengalami kesulitan',
  ),
  c(
    'Persatuan',
    'Nilai menjaga kebersamaan dalam perbedaan',
    'Teman yang berbeda kesukaan tetap bekerja bersama',
  ),
  c(
    'Musyawarah',
    'Membahas pilihan dengan mendengarkan pendapat bersama',
    'Kelompok mendiskusikan permainan yang akan dipilih',
  ),
  c(
    'Keadilan',
    'Nilai memperlakukan orang secara layak sesuai hak dan kebutuhannya',
    'Anak membagi kesempatan memakai alat dengan wajar',
  ),
]
const fairness = [
  c(
    'Berbagi',
    'Memberi kesempatan menggunakan sesuatu bersama secara wajar',
    'Anak menawarkan alat yang tidak sedang digunakan',
  ),
  c(
    'Bergiliran',
    'Menggunakan kesempatan satu demi satu menurut kesepakatan',
    'Setelah Rani mencoba, Bima mendapat kesempatan',
  ),
  c(
    'Meminta izin',
    'Meminta persetujuan sebelum memakai milik orang lain',
    'Anak bertanya sebelum meminjam pensil',
  ),
  c(
    'Menjaga barang',
    'Menggunakan benda dengan hati-hati sesuai fungsinya',
    'Pensil pinjaman dikembalikan dalam keadaan baik',
  ),
  c(
    'Batas pribadi',
    'Hal yang boleh atau tidak boleh dilakukan terhadap diri atau milik seseorang',
    'Teman boleh menolak meminjamkan barang yang masih dipakai',
  ),
]
const rightsA = [
  c(
    'Hak',
    'Hal yang layak diterima atau dimiliki seseorang',
    'Anak berhak diperlakukan aman dan dihargai',
  ),
  c(
    'Kewajiban',
    'Hal yang perlu dilaksanakan sesuai peran dan aturan',
    'Anggota kelas perlu menjaga kebersihan ruang bersama',
  ),
  c(
    'Tanggung jawab',
    'Kesediaan melaksanakan tugas dan memperbaiki akibat tindakan',
    'Anak merapikan alat yang ia gunakan',
  ),
  c(
    'Menghormati hak',
    'Menjaga agar tindakan tidak merugikan kesempatan orang lain',
    'Anak tidak mengganggu teman yang sedang membaca',
  ),
  c(
    'Mencari pertolongan',
    'Meminta bantuan ketika hak atau keselamatan terganggu',
    'Anak bercerita kepada orang dewasa tepercaya ketika dirundung',
  ),
]
const cooperationA = [
  c(
    'Kerja sama',
    'Melakukan usaha bersama untuk mencapai tujuan',
    'Kelompok menata sudut baca bersama',
  ),
  c(
    'Pembagian tugas',
    'Membagi pekerjaan sesuai kemampuan dan kesepakatan',
    'Seorang anak menyusun buku, yang lain menyiapkan label',
  ),
  c(
    'Tolong-menolong',
    'Membantu orang lain sesuai kemampuan tanpa merendahkan',
    'Teman membantu membawa benda yang aman',
  ),
  c(
    'Peduli',
    'Memperhatikan keadaan dan kebutuhan orang lain',
    'Anak menyadari temannya belum mendapat giliran',
  ),
  c(
    'Gotong royong',
    'Bekerja bersama demi kepentingan bersama',
    'Warga sekolah merawat taman secara bersama',
  ),
]
const territoryA = [
  c(
    'Lingkungan tempat tinggal',
    'Tempat dan kehidupan di sekitar rumah',
    'Anak mengenali jalan dan ruang bersama dengan pendamping',
  ),
  c(
    'Wilayah',
    'Bagian tempat yang mempunyai batas tertentu',
    'Desa atau kelurahan merupakan contoh wilayah',
  ),
  c(
    'Simbol negara',
    'Lambang yang mewakili identitas negara',
    'Bendera Merah Putih adalah bendera Indonesia',
  ),
  c(
    'Indonesia',
    'Negara tempat beragam masyarakat hidup bersama',
    'Berbagai daerah menjadi bagian dari Indonesia',
  ),
  c(
    'Merawat tempat bersama',
    'Menjaga kebersihan dan fungsi fasilitas yang digunakan banyak orang',
    'Anak tidak mencoret bangku taman',
  ),
]
const valuesB = [
  c(
    'Nilai Pancasila',
    'Pedoman nilai untuk hidup bersama secara berketuhanan, manusiawi, bersatu, bermusyawarah, dan adil',
    'Kelompok menilai apakah keputusannya menghormati semua anggota',
  ),
  c(
    'Keteladanan',
    'Perilaku baik yang dapat dicontoh dengan memahami alasannya',
    'Anak mengembalikan barang yang ditemukan',
  ),
  c(
    'Penerapan nilai',
    'Tindakan nyata yang menunjukkan nilai yang diyakini',
    'Keputusan kelompok memberi kesempatan anggota yang belum berbicara',
  ),
  c(
    'Pertimbangan akibat',
    'Memikirkan pengaruh tindakan terhadap diri dan orang lain',
    'Anak memikirkan apakah lelucon dapat melukai perasaan teman',
  ),
  c(
    'Refleksi tindakan',
    'Menilai kembali perbuatan untuk memperbaiki perilaku',
    'Anak mengakui kesalahan dan merencanakan perbaikan',
  ),
]
const rightsB = [
  c(
    'Hak bersama',
    'Hak yang perlu dijaga untuk semua anggota kelompok',
    'Seluruh siswa berhak mendapat lingkungan belajar yang aman',
  ),
  c(
    'Kewajiban sesuai peran',
    'Tugas yang berkaitan dengan kedudukan dalam kegiatan',
    'Petugas kelompok melaksanakan tugas yang disepakati',
  ),
  c(
    'Tanggung jawab atas akibat',
    'Kesediaan memperbaiki dampak perbuatan sendiri',
    'Anak membantu memperbaiki keadaan setelah menumpahkan air',
  ),
  c(
    'Norma',
    'Pedoman perilaku yang berlaku dalam kehidupan bersama',
    'Masyarakat mengharapkan orang berbicara sopan',
  ),
  c(
    'Keseimbangan hak dan kewajiban',
    'Menjalankan tugas sambil menghormati hak setiap orang',
    'Anak menjaga ketertiban tanpa menghalangi hak teman belajar',
  ),
]
const deliberationB = [
  c(
    'Musyawarah',
    'Membahas masalah bersama dengan mendengarkan alasan peserta',
    'Kelompok mencari jadwal kegiatan yang dapat diikuti anggota',
  ),
  c(
    'Pendapat',
    'Pandangan seseorang tentang suatu hal',
    'Seorang anggota mengusulkan kegiatan membaca',
  ),
  c(
    'Alasan relevan',
    'Penjelasan yang berhubungan dengan masalah yang dibahas',
    'Usulan tempat didukung alasan akses yang mudah',
  ),
  c(
    'Mufakat',
    'Kesepakatan bersama setelah pembahasan',
    'Anggota menyepakati pilihan yang dapat diterima bersama',
  ),
  c(
    'Pelaksanaan keputusan',
    'Menjalankan hasil kesepakatan dengan tanggung jawab',
    'Kelompok melakukan tugas sesuai keputusan yang dibuat',
  ),
]
const diversityB = [
  c(
    'Identitas budaya',
    'Ciri budaya yang berkaitan dengan kehidupan seseorang atau kelompok',
    'Bahasa keluarga dapat menjadi bagian identitas budaya',
  ),
  c(
    'Toleransi',
    'Menghormati perbedaan tanpa memaksakan pilihan pribadi',
    'Anak memberi ruang teman menjalankan kebiasaannya yang tidak merugikan',
  ),
  c(
    'Stereotip',
    'Anggapan menyamaratakan orang berdasarkan kelompoknya',
    'Menyebut semua orang suatu daerah pasti bersifat sama adalah penyamarataan',
  ),
  c(
    'Inklusif',
    'Memberi ruang partisipasi kepada anggota dengan kebutuhan beragam',
    'Kelompok menyesuaikan cara agar teman dapat ikut',
  ),
  c(
    'Kesetaraan martabat',
    'Pandangan bahwa setiap orang layak dihormati sebagai manusia',
    'Anak tidak mengukur harga diri teman dari latar keluarganya',
  ),
]
const unityB = [
  c(
    'Persatuan',
    'Kebersamaan sebagai satu kelompok dengan tetap menghargai perbedaan',
    'Anak berbeda pendapat tetap menjaga hubungan baik',
  ),
  c(
    'Kepentingan bersama',
    'Kebutuhan yang bermanfaat bagi banyak anggota',
    'Tempat belajar yang aman menjadi kebutuhan semua siswa',
  ),
  c(
    'Solidaritas',
    'Kesediaan mendukung orang lain dalam kehidupan bersama',
    'Kelompok membantu anggota yang mengalami kesulitan',
  ),
  c(
    'Pembagian peran adil',
    'Pembagian usaha sesuai kemampuan dan kebutuhan tanpa merendahkan',
    'Tugas disesuaikan agar setiap anak dapat berkontribusi',
  ),
  c(
    'Menghargai kontribusi',
    'Mengakui usaha yang diberikan orang lain',
    'Kelompok berterima kasih kepada semua pelaksana tugas',
  ),
]
const territoryB = [
  c(
    'Wilayah tempat tinggal',
    'Bagian daerah yang menjadi lingkungan kehidupan sehari-hari',
    'Desa atau kelurahan memiliki lingkungan dan pengelolaan tertentu',
  ),
  c(
    'Bagian dari Indonesia',
    'Hubungan daerah dengan keseluruhan negara',
    'Daerah berbeda berada dalam satu Indonesia',
  ),
  c(
    'Kekayaan daerah',
    'Potensi alam dan budaya yang perlu dipelajari serta dijaga',
    'Kesenian lokal dipelajari dengan menghormati masyarakatnya',
  ),
  c(
    'Bhinneka Tunggal Ika',
    'Semboyan yang menegaskan persatuan dalam keberagaman',
    'Perbedaan budaya dipahami sebagai bagian kebersamaan Indonesia',
  ),
  c(
    'Kepedulian wilayah',
    'Tindakan menjaga kehidupan dan lingkungan daerah',
    'Anak ikut kegiatan aman untuk merawat fasilitas bersama',
  ),
]
const historyC = [
  c(
    'Perumusan',
    'Proses menyusun gagasan melalui pemikiran dan pembahasan',
    'Gagasan dasar negara dibahas dalam proses sejarah',
  ),
  c(
    'Tokoh sejarah',
    'Orang yang berperan dalam peristiwa masa lalu',
    'Peran tokoh dipelajari berdasarkan sumber sejarah',
  ),
  c(
    'Kronologi',
    'Urutan kejadian berdasarkan waktu',
    'Tahapan pembahasan disusun menurut urutannya',
  ),
  c(
    'Keteladanan kebangsaan',
    'Sikap baik yang dapat dipelajari dari perjuangan bersama',
    'Kemauan mendengar dan mengutamakan bangsa dipelajari dari sejarah',
  ),
  c(
    'Bukti sejarah',
    'Sumber yang menjadi dasar penjelasan peristiwa',
    'Dokumen diperiksa sebelum menyimpulkan suatu kejadian',
  ),
]
const valuesC = [
  c(
    'Pancasila sebagai pedoman',
    'Nilai dasar yang menjadi arah pertimbangan tindakan dalam kehidupan bersama',
    'Siswa menilai keputusan berdasarkan kemanusiaan, persatuan, dan keadilan',
  ),
  c(
    'Konsistensi nilai',
    'Kesesuaian antara nilai yang diucapkan dengan tindakan',
    'Anak menyatakan menghargai perbedaan dan tidak mengejek teman',
  ),
  c(
    'Penalaran moral',
    'Pertimbangan alasan, hak, dan dampak sebelum bertindak',
    'Kelompok memikirkan pilihan yang paling menghormati semua anggota',
  ),
  c(
    'Tanggung jawab warga',
    'Peran aktif menjaga kehidupan bersama sesuai kemampuan',
    'Anak menggunakan fasilitas umum dengan tertib',
  ),
  c(
    'Perbaikan diri',
    'Usaha mengubah tindakan setelah memahami kesalahannya',
    'Anak meminta maaf dan melakukan langkah memperbaiki akibat',
  ),
]
const rightsC = [
  c(
    'Hak asasi',
    'Hak dasar yang melekat pada setiap manusia',
    'Setiap anak layak diperlakukan bermartabat dan aman',
  ),
  c(
    'Kewajiban warga',
    'Tugas hidup bersama sesuai aturan dan peran',
    'Warga menjaga ketertiban serta menghormati hak orang lain',
  ),
  c(
    'Akuntabilitas sederhana',
    'Kesediaan menjelaskan tindakan dan bertanggung jawab atasnya',
    'Pengurus kelompok menerangkan penggunaan bahan bersama',
  ),
  c(
    'Kepentingan umum',
    'Kebutuhan yang berkaitan dengan kesejahteraan banyak orang',
    'Akses fasilitas aman bermanfaat bagi seluruh warga',
  ),
  c(
    'Perlindungan pihak rentan',
    'Upaya menjaga orang yang memerlukan dukungan lebih',
    'Kelompok menyesuaikan kegiatan agar teman tidak tersisih',
  ),
]
const rulesC = [
  c(
    'Norma hukum',
    'Pedoman perilaku yang ditetapkan lembaga berwenang dengan akibat hukum',
    'Peraturan lalu lintas merupakan contoh aturan resmi',
  ),
  c(
    'Norma kesopanan',
    'Pedoman tata perilaku yang dianggap pantas dalam masyarakat',
    'Berbicara santun kepada orang lain menjaga hubungan',
  ),
  c(
    'Norma kesusilaan',
    'Pedoman baik-buruk yang berkaitan dengan hati nurani',
    'Anak memilih jujur meskipun tidak diawasi',
  ),
  c(
    'Kesepakatan kelompok',
    'Aturan bersama yang dibentuk untuk mengelola kegiatan',
    'Anggota menyepakati batas waktu memakai alat',
  ),
  c(
    'Penyelesaian bertanggung jawab',
    'Menghadapi pelanggaran dengan bukti, keadilan, dan bantuan yang tepat',
    'Kelompok mencari perbaikan tanpa mempermalukan pelaku',
  ),
]
const conflictC = [
  c(
    'Perbedaan pendapat',
    'Ketidaksamaan pandangan yang dapat dibahas dengan hormat',
    'Dua anak mengusulkan kegiatan berbeda',
  ),
  c(
    'Mendengar aktif',
    'Memperhatikan dan memastikan pemahaman sebelum menanggapi',
    'Anak mengulang inti alasan teman dengan benar',
  ),
  c(
    'Kompromi',
    'Penyesuaian sebagian keinginan untuk memperoleh pilihan yang dapat diterima',
    'Anggota mengubah sebagian rencana setelah memahami kebutuhan lain',
  ),
  c(
    'Mediasi sederhana',
    'Bantuan pihak netral untuk memudahkan pembicaraan',
    'Pendamping membantu dua pihak menyampaikan kebutuhan tanpa saling menyerang',
  ),
  c(
    'Kesepakatan adil',
    'Keputusan yang mempertimbangkan hak, kebutuhan, dan alasan semua pihak',
    'Kelompok memilih cara yang tidak mengorbankan keselamatan anggotanya',
  ),
]
const cooperationC = [
  c(
    'Masalah bersama',
    'Keadaan yang memengaruhi banyak anggota dan perlu ditangani bersama',
    'Ruang belajar sulit digunakan karena buku tidak tertata',
  ),
  c(
    'Identifikasi kebutuhan',
    'Usaha memahami hal yang benar-benar perlu diperbaiki',
    'Kelompok bertanya bagian mana yang paling menghambat penggunaan ruang',
  ),
  c(
    'Rencana aksi',
    'Langkah, peran, waktu, dan alat untuk menjalankan perbaikan',
    'Kelompok membagi tugas merapikan serta memberi label',
  ),
  c(
    'Partisipasi',
    'Keterlibatan sesuai kemampuan dalam kegiatan bersama',
    'Setiap anggota dapat mengambil peran yang sesuai',
  ),
  c(
    'Evaluasi bersama',
    'Pembahasan hasil tindakan untuk menentukan perbaikan berikutnya',
    'Kelompok memeriksa apakah susunan baru memudahkan semua anggota',
  ),
]
const territoryC = [
  c(
    'Keutuhan wilayah',
    'Keberlangsungan wilayah negara sebagai satu kesatuan',
    'Berbagai pulau dan daerah dipahami sebagai bagian Indonesia',
  ),
  c(
    'Persatuan nasional',
    'Kebersamaan sebagai bangsa di tengah perbedaan daerah dan identitas',
    'Warga menghormati daerah lain sebagai bagian bangsa yang sama',
  ),
  c(
    'Tanggung jawab lingkungan',
    'Peran merawat alam dan ruang hidup yang dipakai bersama',
    'Tindakan lokal menjaga sumber air dapat bermanfaat bagi wilayah lain',
  ),
  c(
    'Informasi bertanggung jawab',
    'Penyampaian kabar yang diperiksa agar tidak memecah hubungan',
    'Anak mengecek sumber sebelum menyebarkan kabar tentang kelompok lain',
  ),
  c(
    'Kerja sama antarwilayah',
    'Usaha daerah yang berbeda untuk kepentingan bersama',
    'Wilayah saling membantu saat menghadapi kebutuhan bersama',
  ),
]
export const civicsUnits = [
  [
    u(
      'Perkenalkan diri dengan nama panggilan dan kesukaan. Temukan satu persamaan dan satu perbedaan dengan teman tanpa mengejek.',
      identity,
    ),
    u(
      'Buat dua aturan kegiatan rumah bersama pendamping. Jelaskan tujuan dan akibat bila tidak dijalankan.',
      rulesA,
    ),
    u(
      'Ceritakan satu tindakan sesuai nilai Pancasila. Hubungkan dengan alasan menghormati orang lain.',
      valuesA,
    ),
    u(
      'Praktikkan meminta izin dan bergiliran memakai alat. Teman boleh menolak ketika masih memakainya.',
      fairness,
    ),
    u(
      'Gambar kesukaan teman yang berbeda darimu. Tanyakan dengan sopan tanpa membagikan data pribadinya.',
      identity,
    ),
    u(
      'Pilih satu fasilitas yang dipakai bersama dan lakukan tindakan aman untuk merawatnya.',
      cooperationA,
    ),
  ],
  [
    u(
      'Amati satu kegiatan sehari-hari. Jelaskan nilai Pancasila yang tampak tanpa menganggap tindakan hanya berkaitan dengan satu nilai.',
      valuesA,
    ),
    u(
      'Susun aturan permainan yang memberi kesempatan semua peserta. Coba dan perbaiki setelah bermain.',
      rulesA,
    ),
    u(
      'Pasangkan contoh hak dengan tindakan menghormati hak teman. Hak aman tidak hilang ketika seseorang melakukan kesalahan.',
      rightsA,
    ),
    u(
      'Buat gambar tentang kebiasaan keluarga yang boleh dibagikan. Hormati teman yang memilih tidak menceritakan hal pribadi.',
      identity,
    ),
    u(
      'Bagilah tugas sederhana merapikan ruang sesuai kemampuan. Ucapkan terima kasih atas setiap kontribusi.',
      cooperationA,
    ),
    u(
      'Gunakan peta atau gambar untuk mengenal daerah sebagai bagian Indonesia tanpa menuliskan alamat pribadi.',
      territoryA,
    ),
  ],
  [
    u(
      'Bahas contoh anak yang menemukan barang. Jelaskan tindakan serta alasan yang sesuai nilai Pancasila.',
      valuesB,
    ),
    u(
      'Pilih satu kegiatan sekolah. Jelaskan hak peserta, kewajiban sesuai peran, dan tanggung jawab atas akibat tindakan.',
      rightsB,
    ),
    u(
      'Lakukan musyawarah memilih kegiatan kelompok. Setiap anggota menyampaikan alasan dan didengar.',
      deliberationB,
    ),
    u(
      'Bandingkan dua kebiasaan budaya dari sumber yang baik. Hindari menyimpulkan sifat semua anggota kelompok.',
      diversityB,
    ),
    u(
      'Rencanakan kerja sama merawat sudut baca. Bagilah peran dan catat bagaimana anggota saling membantu.',
      cooperationA,
    ),
    u(
      'Cari satu informasi tentang daerah dari sumber terpercaya. Jelaskan hubungannya dengan Indonesia.',
      territoryB,
    ),
  ],
  [
    u(
      'Nilai dua pilihan tindakan saat teman kesulitan. Jelaskan pilihan berdasarkan nilai dan akibatnya.',
      valuesB,
    ),
    u(
      'Bedakan norma, aturan kegiatan, dan kesepakatan. Bahas cara memperbaiki pelanggaran tanpa mempermalukan.',
      rightsB,
    ),
    u(
      'Musyawarahkan penggunaan alat yang terbatas. Pastikan kebutuhan anggota yang belum berbicara ikut dipertimbangkan.',
      deliberationB,
    ),
    u(
      'Perbaiki satu pernyataan yang menyamaratakan suatu kelompok. Ganti dengan informasi yang terukur dan hormat.',
      diversityB,
    ),
    u(
      'Buat kegiatan yang memungkinkan setiap anak berkontribusi sesuai kemampuan. Evaluasi pembagian perannya.',
      unityB,
    ),
    u(
      'Amati peta Indonesia dan satu kekayaan daerah. Jelaskan mengapa perbedaan daerah tidak menghilangkan persatuan.',
      territoryB,
    ),
  ],
  [
    u(
      'Gunakan sumber sejarah yang dipilih pendamping. Susun urutan proses perumusan dasar negara dan sikap yang dapat diteladani.',
      historyC,
    ),
    u(
      'Bandingkan ucapan dan tindakan pada cerita. Jelaskan apakah keduanya konsisten dengan nilai Pancasila.',
      valuesC,
    ),
    u(
      'Bahas penggunaan fasilitas umum. Jelaskan cara memenuhi kewajiban sambil tetap melindungi hak semua orang.',
      rightsC,
    ),
    u(
      'Bahas pilihan kegiatan dengan kebutuhan peserta yang berbeda. Cari alasan dan kesepakatan yang adil.',
      conflictC,
    ),
    u(
      'Pelajari satu karya budaya dari sumber resmi. Catat asal informasi dan cara menghargainya tanpa menyamaratakan masyarakatnya.',
      diversityB,
    ),
    u(
      'Buat pesan tentang persatuan yang menghormati perbedaan. Hindari stereotip dan periksa informasi yang digunakan.',
      territoryC,
    ),
  ],
  [
    u(
      'Gunakan nilai Pancasila untuk menilai pilihan pada masalah sehari-hari. Berikan alasan, bukan sekadar menyebut nama sila.',
      valuesC,
    ),
    u(
      'Bandingkan contoh norma dalam kehidupan. Untuk masalah hukum nyata, minta pendamping menggunakan sumber resmi yang berlaku.',
      rulesC,
    ),
    u(
      'Latih penyelesaian perbedaan dengan mendengar, menjelaskan kebutuhan, dan meminta bantuan netral bila perlu.',
      conflictC,
    ),
    u(
      'Rancang kegiatan yang menghormati identitas dan keyakinan peserta. Tidak memaksa teman mengikuti praktik yang berbeda.',
      diversityB,
    ),
    u(
      'Pilih masalah kecil yang dapat ditangani bersama. Buat rencana, laksanakan secara aman, lalu nilai hasilnya.',
      cooperationC,
    ),
    u(
      'Jelaskan hubungan tindakan lokal dengan persatuan dan keutuhan Indonesia. Gunakan informasi yang dapat diperiksa.',
      territoryC,
    ),
  ],
]
