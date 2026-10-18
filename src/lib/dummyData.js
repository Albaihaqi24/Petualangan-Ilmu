export const avatars = [
  { id: 'fox', emoji: '🦊', label: 'Rubah penasaran' },
  { id: 'panda', emoji: '🐼', label: 'Panda penyabar' },
  { id: 'rabbit', emoji: '🐰', label: 'Kelinci ceria' },
  { id: 'tiger', emoji: '🐯', label: 'Harimau pemberani' },
]

export const subjects = [
  {
    id: 'matematika',
    name: 'Matematika',
    slug: 'matematika',
    description: 'Bermain angka, menemukan pola.',
    icon: 'calculator',
    color: 'mint',
    island: 'Pulau Angka',
  },
  {
    id: 'bahasa-indonesia',
    name: 'Bahasa Indonesia',
    slug: 'bahasa-indonesia',
    description: 'Membaca cerita, merangkai makna.',
    icon: 'book',
    color: 'peach',
    island: 'Hutan Cerita',
  },
  {
    id: 'ipas',
    name: 'Alam & Sekitar',
    slug: 'ipas',
    description: 'Mengenal sains dari keseharian.',
    icon: 'leaf',
    color: 'lime',
    island: 'Kebun Penemuan',
  },
  {
    id: 'pancasila',
    name: 'Pendidikan Pancasila',
    slug: 'pancasila',
    description: 'Belajar peduli dan hidup bersama.',
    icon: 'heart',
    color: 'pink',
    island: 'Desa Sahabat',
  },
  {
    id: 'bahasa-inggris',
    name: 'Bahasa Inggris',
    slug: 'bahasa-inggris',
    description: 'Say hello to a new adventure!',
    icon: 'globe',
    color: 'blue',
    island: 'Teluk Bahasa',
  },
  {
    id: 'seni-budaya',
    name: 'Seni & Budaya',
    slug: 'seni-budaya',
    description: 'Berani mencoba dan berkarya.',
    icon: 'palette',
    color: 'lavender',
    island: 'Bukit Kreasi',
  },
]

function question(prompt, answer, distractors, explanation) {
  return { prompt, answer, distractors, explanation }
}

const math = [
  {
    title: 'Ayo menghitung buah',
    summary: 'Menghitung benda sampai 10 dan mencoba penjumlahan sederhana.',
    story:
      'Nara membawa 3 apel. Kakak memberinya 2 apel lagi. Yuk, hitung satu per satu: 1, 2, 3, 4, 5. Sekarang Nara memiliki 5 apel.',
    tip: 'Gunakan jari atau benda kecil. Tambah berarti jumlahnya bertambah.',
    pairs: [
      [2, 1],
      [3, 2],
      [4, 1],
      [2, 4],
      [5, 3],
    ],
  },
  {
    title: 'Penjumlahan dua bilangan',
    summary: 'Mengenal puluhan dan satuan melalui penjumlahan.',
    story:
      'Di perpustakaan ada 24 buku cerita. Datang 13 buku baru. Jumlahkan satuan: 4 + 3 = 7. Lalu puluhan: 20 + 10 = 30. Jadi, ada 37 buku.',
    tip: 'Pisahkan puluhan dan satuan agar lebih mudah menghitung.',
    pairs: [
      [12, 15],
      [23, 14],
      [31, 26],
      [42, 17],
      [25, 32],
    ],
  },
  {
    title: 'Perkalian di kebun Nara',
    summary: 'Menemukan perkalian sebagai penjumlahan berulang.',
    story:
      'Nara menanam 4 baris wortel. Setiap baris berisi 3 tanaman. Banyak tanaman adalah 3 + 3 + 3 + 3 = 12. Kita juga dapat menulis 4 × 3 = 12.',
    tip: 'Gambarkan kelompok dengan jumlah anggota yang sama, lalu hitung semuanya.',
    pairs: [
      [3, 4],
      [5, 2],
      [4, 4],
      [6, 3],
      [7, 2],
    ],
  },
  {
    title: 'Membagi bekal dengan adil',
    summary: 'Memahami pembagian sebagai kelompok yang sama banyak.',
    story:
      'Ada 24 potong buah untuk 6 teman. Setiap teman mendapat jumlah yang sama. Karena 6 × 4 = 24, setiap teman menerima 4 potong. Kita menulis 24 ÷ 6 = 4.',
    tip: 'Gunakan perkalian untuk memeriksa hasil pembagian.',
    pairs: [
      [24, 6],
      [35, 5],
      [48, 8],
      [36, 4],
      [63, 7],
    ],
  },
  {
    title: 'Pecahan dalam kehidupan',
    summary: 'Menghitung bagian dari suatu kumpulan dengan pecahan sederhana.',
    story:
      'Ada 20 biji kacang. Separuhnya akan ditanam hari ini. Separuh berarti satu dari dua bagian yang sama besar. Jadi, 20 ÷ 2 = 10 biji ditanam hari ini.',
    tip: 'Untuk mencari 1/n bagian dari kumpulan, bagi jumlah benda dengan n.',
    pairs: [
      [20, 2],
      [24, 3],
      [40, 4],
      [30, 5],
      [36, 6],
    ],
  },
  {
    title: 'Persentase di kebun sekolah',
    summary: 'Menghubungkan persen dengan bagian dari seratus.',
    story:
      'Sebanyak 25% dari 40 bibit adalah bibit tomat. Karena 25% = 25/100 = 1/4, banyak bibit tomat adalah 40 ÷ 4 = 10.',
    tip: '50% = 1/2, 25% = 1/4, dan 10% = 1/10. Pecahan ini membantu menghitung cepat.',
    pairs: [
      [40, 25],
      [60, 50],
      [80, 25],
      [150, 10],
      [200, 50],
    ],
  },
]

const passages = [
  [
    'Kucing di teras',
    'Mimi adalah kucing Nara. Bulunya putih. Setiap pagi, Mimi duduk di teras. Nara memberi Mimi air bersih.',
    'Mimi',
    'putih',
    'teras',
    'pagi',
    'air bersih',
  ],
  [
    'Bekal untuk sahabat',
    'Bima membawa roti ke sekolah. Saat istirahat, Bima melihat Dita lupa membawa bekal. Bima membagi rotinya. Mereka makan bersama di bangku taman.',
    'Bima',
    'roti',
    'bangku taman',
    'istirahat',
    'membagi roti',
  ],
  [
    'Kebun kecil Nara',
    'Nara menanam kacang hijau dalam pot. Setiap pagi ia menyiramnya secukupnya. Pot diletakkan dekat jendela agar mendapat cahaya. Setelah beberapa hari, tunas muncul. Nara mencatat pertumbuhannya di buku.',
    'Nara',
    'kacang hijau',
    'dekat jendela',
    'pagi',
    'mencatat pertumbuhan',
  ],
  [
    'Perpustakaan keliling',
    'Sinta membantu perpustakaan keliling setiap Sabtu. Ia menata buku cerita di rak mobil. Mobil berhenti di balai desa. Anak-anak bergantian meminjam buku. Sinta mencatat peminjaman agar buku dapat dikembalikan tepat waktu.',
    'Sinta',
    'buku cerita',
    'balai desa',
    'Sabtu',
    'mencatat peminjaman',
  ],
  [
    'Menjaga sungai bersama',
    'Rafi mengajak teman-temannya membersihkan tepi sungai pada Minggu pagi. Mereka memilah sampah plastik dan daun. Sampah plastik dibawa ke tempat pengumpulan. Setelah selesai, Rafi menulis laporan agar kegiatan berikutnya dapat direncanakan lebih baik.',
    'Rafi',
    'sampah plastik dan daun',
    'tepi sungai',
    'Minggu pagi',
    'menulis laporan',
  ],
  [
    'Penelitian taman sekolah',
    'Alya mengamati kupu-kupu di taman sekolah setiap Jumat pagi. Ia mencatat jenis bunga yang dikunjungi. Pengamatan dilakukan dari jarak aman agar kupu-kupu tidak terganggu. Setelah empat minggu, Alya menyusun laporan berdasarkan catatannya, bukan dugaan semata.',
    'Alya',
    'kupu-kupu',
    'taman sekolah',
    'Jumat pagi',
    'menyusun laporan',
  ],
]

function contentFor(subjectId, grade) {
  if (subjectId === 'matematika') {
    const item = math[grade - 1]
    return {
      ...item,
      questions: item.pairs.map(([a, b]) => {
        const answer = grade <= 2 ? a + b : grade === 3 ? a * b : grade <= 5 ? a / b : (a * b) / 100
        const prompt =
          grade <= 2
            ? `${a} + ${b} = …`
            : grade === 3
              ? `Ada ${a} kelompok. Setiap kelompok berisi ${b} benda. Berapa jumlah semuanya?`
              : grade === 4
                ? `${a} benda dibagi rata kepada ${b} anak. Berapa benda untuk setiap anak?`
                : grade === 5
                  ? `Berapa 1/${b} bagian dari ${a} benda?`
                  : `Berapa ${b}% dari ${a}?`
        return question(
          prompt,
          String(answer),
          [String(answer + 1), String(answer + 3), String(Math.max(0, answer - 1))],
          grade <= 2
            ? `${a} ditambah ${b} sama dengan ${answer}.`
            : grade === 3
              ? `${a} × ${b} = ${answer}. Perkalian menjumlahkan kelompok yang sama banyak.`
              : grade <= 5
                ? `${a} ÷ ${b} = ${answer}.`
                : `${b}/100 × ${a} = ${answer}.`,
        )
      }),
    }
  }
  if (subjectId === 'bahasa-indonesia') {
    const [title, story, who, what, where, when, action] = passages[grade - 1]
    return {
      title,
      summary: 'Membaca dengan teliti dan menemukan informasi dalam cerita.',
      story,
      tip: 'Cari kata tanya: siapa, apa, di mana, dan kapan. Jawab berdasarkan cerita.',
      questions: [
        question(
          'Siapa tokoh utama dalam cerita?',
          who,
          ['Lani', 'Tono', 'Doni'],
          `Tokoh utama yang disebut dalam cerita adalah ${who}.`,
        ),
        question(
          grade === 1
            ? 'Apa warna bulu Mimi?'
            : 'Apa yang dibawa, diamati, atau dipilah dalam cerita?',
          what,
          grade === 1 ? ['hitam', 'cokelat', 'abu-abu'] : ['layang-layang', 'sepeda', 'sepatu'],
          `Cerita menyebut ${what}. Baca kembali bagian yang memuat informasi ini.`,
        ),
        question(
          grade === 1 ? 'Di mana Mimi duduk?' : 'Di mana kegiatan dalam cerita berlangsung?',
          where,
          ['stasiun', 'bandara', 'pantai'],
          `Lokasi yang disebut dalam cerita adalah ${where}.`,
        ),
        question(
          'Kapan kegiatan dalam cerita dilakukan?',
          when,
          ['tengah malam', 'setiap Desember', 'saat gerhana'],
          `Keterangan waktu dalam cerita adalah ${when}.`,
        ),
        question(
          grade === 1
            ? 'Apa yang Nara berikan kepada Mimi?'
            : `Apa salah satu tindakan ${who} dalam cerita?`,
          action,
          ['berlomba renang', 'membeli sepeda', 'mengecat pagar'],
          `${grade === 1 ? 'Nara memberi Mimi' : `${who} melakukan kegiatan`} ${action}.`,
        ),
      ],
    }
  }
  if (subjectId === 'ipas')
    return {
      title:
        grade <= 2
          ? 'Merawat tubuh dan lingkungan'
          : grade <= 4
            ? 'Tumbuhan juga butuh perawatan'
            : 'Rantai makanan di kebun',
      summary:
        grade <= 2
          ? 'Mengenali kebiasaan sehat dan lingkungan bersih.'
          : grade <= 4
            ? 'Mengenali bagian tumbuhan dan kebutuhannya.'
            : 'Mengenali hubungan makhluk hidup dalam ekosistem.',
      story:
        grade <= 2
          ? 'Nara mencuci tangan dengan sabun sebelum makan. Ia minum air bersih, makan beragam makanan, dan cukup beristirahat. Sampah dibuang pada tempatnya agar lingkungan nyaman.'
          : grade <= 4
            ? 'Akar menyerap air dari tanah. Batang menopang tumbuhan. Daun menggunakan cahaya untuk membantu membuat makanan. Tanaman di kebun Nara mendapat air secukupnya dan sinar matahari.'
            : 'Rumput menggunakan energi matahari untuk membuat makanan. Belalang memakan rumput. Katak memakan belalang. Hubungan ini membentuk rantai makanan: rumput → belalang → katak. Setiap makhluk hidup berperan dalam ekosistem.',
      tip: 'Amati lingkungan tanpa merusak tumbuhan atau mengganggu hewan. Mintalah pendampingan orang dewasa.',
      questions:
        grade <= 2
          ? [
              question(
                'Kapan kita perlu mencuci tangan?',
                'Sebelum makan',
                ['Hanya hari Minggu', 'Sekali sebulan', 'Tidak perlu'],
                'Cuci tangan dengan sabun sebelum makan membantu menjaga kebersihan.',
              ),
              question(
                'Air seperti apa yang baik untuk diminum?',
                'Air minum bersih',
                ['Air selokan', 'Air berlumpur', 'Air bekas mencuci'],
                'Minumlah air yang aman dan bersih.',
              ),
              question(
                'Ke mana sampah dibuang?',
                'Tempat sampah',
                ['Sungai', 'Jalan', 'Selokan'],
                'Buang sampah pada tempatnya agar lingkungan bersih.',
              ),
              question(
                'Apa yang tubuh perlukan setelah beraktivitas?',
                'Istirahat cukup',
                ['Bermain semalaman', 'Tidak tidur', 'Melewatkan makan'],
                'Istirahat membantu tubuh pulih.',
              ),
              question(
                'Kebiasaan mana yang membantu menjaga kesehatan?',
                'Makan beragam makanan',
                ['Hanya makan permen', 'Tidak minum', 'Tidak mencuci tangan'],
                'Makanan yang beragam membantu memenuhi kebutuhan tubuh.',
              ),
            ]
          : grade <= 4
            ? [
                question(
                  'Bagian tumbuhan yang menyerap air adalah …',
                  'Akar',
                  ['Bunga', 'Buah', 'Biji'],
                  'Akar menyerap air dari tanah.',
                ),
                question(
                  'Bagian yang menopang tumbuhan adalah …',
                  'Batang',
                  ['Buah', 'Biji', 'Kelopak'],
                  'Batang menopang tumbuhan dan menghubungkan akar dengan daun.',
                ),
                question(
                  'Daun membutuhkan … untuk membantu membuat makanan.',
                  'Cahaya matahari',
                  ['Plastik', 'Asap', 'Cat'],
                  'Cahaya matahari membantu proses fotosintesis di daun.',
                ),
                question(
                  'Bagaimana menyiram tanaman?',
                  'Secukupnya sesuai kebutuhan',
                  ['Selalu sampai banjir', 'Dengan minyak', 'Tidak pernah'],
                  'Kebutuhan air berbeda-beda; air berlebihan juga dapat merusak tanaman.',
                ),
                question(
                  'Sikap baik saat mengamati tanaman adalah …',
                  'Mengamati tanpa merusak',
                  ['Mencabut semua daun', 'Mematahkan batang', 'Menginjak akar'],
                  'Kita belajar dengan menjaga makhluk hidup.',
                ),
              ]
            : [
                question(
                  'Produsen pada rantai rumput → belalang → katak adalah …',
                  'Rumput',
                  ['Belalang', 'Katak', 'Batu'],
                  'Rumput membuat makanannya sendiri dengan bantuan cahaya matahari.',
                ),
                question(
                  'Apa yang dimakan belalang dalam contoh?',
                  'Rumput',
                  ['Katak', 'Batu', 'Plastik'],
                  'Pada rantai ini, belalang memakan rumput.',
                ),
                question(
                  'Katak memperoleh energi dengan memakan …',
                  'Belalang',
                  ['Tanah', 'Cahaya langsung', 'Air saja'],
                  'Dalam contoh ini, katak memakan belalang.',
                ),
                question(
                  'Sumber energi awal dalam contoh rantai ini adalah …',
                  'Matahari',
                  ['Plastik', 'Pasir', 'Kaca'],
                  'Energi matahari ditangkap tumbuhan lalu berpindah melalui rantai makanan.',
                ),
                question(
                  'Jika rumput berkurang, apa yang mungkin terjadi?',
                  'Makanan belalang berkurang',
                  [
                    'Belalang mendapat lebih banyak rumput',
                    'Katak membuat makanan sendiri',
                    'Semua hewan tidak terpengaruh',
                  ],
                  'Perubahan pada satu bagian ekosistem dapat memengaruhi bagian lain.',
                ),
              ],
    }
  if (subjectId === 'pancasila')
    return {
      title:
        grade <= 2
          ? 'Teman berbeda, tetap bersama'
          : grade <= 4
            ? 'Musyawarah di kelas kita'
            : 'Tanggung jawab dan keputusan bersama',
      summary: 'Berlatih menghargai perbedaan, mendengar, dan bertanggung jawab.',
      story:
        'Kelas Nara ingin merawat taman. Setiap anak boleh menyampaikan pendapat. Mereka mendengarkan tanpa mengejek, lalu bermusyawarah. Tugas dibagi dengan adil. Saat ada teman kesulitan, teman lain membantu. Semua menjaga keputusan bersama.',
      tip: 'Berbeda pendapat itu wajar. Dengarkan alasan teman dan bicaralah dengan sopan.',
      questions: [
        question(
          'Saat teman menyampaikan pendapat, kita sebaiknya …',
          'Mendengarkan',
          ['Mengejek', 'Berteriak', 'Memotong terus'],
          'Mendengarkan menunjukkan penghargaan kepada teman.',
        ),
        question(
          'Cara menyepakati rencana bersama adalah …',
          'Bermusyawarah',
          ['Memaksa teman', 'Bertengkar', 'Menghindar'],
          'Musyawarah memberi kesempatan setiap orang menyampaikan pendapat.',
        ),
        question(
          'Jika teman berbeda kebiasaan dengan kita, kita …',
          'Menghargainya',
          ['Mengucilkannya', 'Mengejeknya', 'Melarangnya berteman'],
          'Perbedaan tidak menghalangi kita berteman dan bekerja sama.',
        ),
        question(
          'Tugas kelompok sebaiknya dibagi …',
          'Dengan adil',
          ['Hanya kepada satu anak', 'Tanpa berdiskusi', 'Agar teman kewalahan'],
          'Pembagian adil memperhatikan kemampuan dan tanggung jawab bersama.',
        ),
        question(
          'Setelah keputusan bersama dibuat, kita perlu …',
          'Melaksanakannya dengan tanggung jawab',
          ['Mengabaikannya', 'Menyalahkan teman', 'Mengganggu kegiatan'],
          'Keputusan bersama perlu dilaksanakan dengan tanggung jawab.',
        ),
      ],
    }
  if (subjectId === 'bahasa-inggris')
    return {
      title:
        grade <= 2
          ? 'Hello, new friends!'
          : grade <= 4
            ? 'A day in the garden'
            : 'Describing our little garden',
      summary: 'Mengenal kosakata bahasa Inggris melalui kalimat sederhana.',
      story:
        'Hello! My name is Nara. I have a little garden. The leaves are green. There are three flowers. I water the plants every morning. Thank you for helping me!',
      tip: 'Baca perlahan. Cocokkan kata dengan benda atau kegiatan di sekitarmu.',
      questions: [
        question(
          '“Hello” digunakan untuk …',
          'Menyapa',
          ['Menghitung', 'Mewarnai', 'Menutup pintu'],
          'Hello berarti halo dan digunakan untuk menyapa.',
        ),
        question(
          'Apa arti “green”?',
          'Hijau',
          ['Merah', 'Biru', 'Kuning'],
          'Green berarti hijau, seperti warna daun dalam cerita.',
        ),
        question(
          'Berapa arti “three flowers”?',
          'Tiga bunga',
          ['Dua bunga', 'Empat bunga', 'Lima bunga'],
          'Three berarti tiga; flowers berarti bunga-bunga.',
        ),
        question(
          '“Every morning” berarti …',
          'Setiap pagi',
          ['Setiap malam', 'Minggu depan', 'Kemarin sore'],
          'Every morning berarti setiap pagi.',
        ),
        question(
          'Kapan kita mengucapkan “Thank you”?',
          'Saat berterima kasih',
          ['Saat menghitung', 'Saat menyebut warna', 'Saat menyebut angka'],
          'Thank you adalah ungkapan terima kasih.',
        ),
      ],
    }
  return {
    title:
      grade <= 2
        ? 'Warna-warni di sekitarku'
        : grade <= 4
          ? 'Membuat kolase kebun'
          : 'Berkarya dari bahan sekitar',
    summary: 'Mengenal warna dan kolase sambil berani mengekspresikan ide.',
    story:
      'Nara membuat kolase taman dari potongan kertas. Ia menggabungkan merah dan kuning untuk mendapatkan jingga pada cat. Bentuk disusun sebelum direkatkan. Nara menggunakan bahan dengan hemat dan merapikan meja setelah berkarya. Setiap karya boleh berbeda.',
    tip: 'Gunakan gunting dengan pendampingan orang dewasa. Hargai karyamu dan karya teman.',
    questions: [
      question(
        'Campuran cat merah dan kuning menghasilkan …',
        'Jingga',
        ['Ungu', 'Hijau', 'Biru'],
        'Merah dan kuning dapat dicampur untuk menghasilkan warna jingga.',
      ),
      question(
        'Kolase dibuat dengan cara …',
        'Menempel berbagai potongan bahan',
        ['Hanya bernyanyi', 'Menghitung langkah', 'Memukul alat musik'],
        'Kolase menyusun dan menempel potongan bahan menjadi karya.',
      ),
      question(
        'Sebelum menempel, sebaiknya kita …',
        'Menyusun bentuk terlebih dahulu',
        ['Membuang semua kertas', 'Menutup mata', 'Membasahi meja'],
        'Menyusun terlebih dahulu membantu merencanakan komposisi.',
      ),
      question(
        'Saat menggunakan gunting, kita perlu …',
        'Berhati-hati dan didampingi',
        ['Berlari-lari', 'Mengarahkannya ke teman', 'Bermain lempar'],
        'Alat tajam perlu digunakan dengan aman dan pendampingan sesuai usia.',
      ),
      question(
        'Setelah berkarya, sikap yang baik adalah …',
        'Merapikan alat dan meja',
        ['Meninggalkan sampah', 'Merusak karya teman', 'Membuang alat'],
        'Merapikan alat menjaga ruang bersama tetap nyaman.',
      ),
    ],
  }
}

export const lessons = []
export const questions = []
for (let grade = 1; grade <= 6; grade += 1) {
  subjects.forEach((subject) => {
    const item = contentFor(subject.id, grade)
    const id = `${subject.id}-${grade}`
    lessons.push({
      id,
      subject_id: subject.id,
      title: item.title,
      slug: `${subject.slug}-kelas-${grade}`,
      grade,
      phase: grade <= 2 ? 'A' : grade <= 4 ? 'B' : 'C',
      difficulty: 'dasar',
      status: 'published',
      chapter: 'Bab 1',
      duration: 5,
      content: {
        summary: item.summary,
        video_url: null,
        blocks: [
          { type: 'text', body: item.story },
          {
            type: 'image',
            url: '/assets/kebun-belajar.svg',
            caption: 'Kebun Nara: tempat mengamati, bercerita, dan belajar bersama.',
          },
          { type: 'tip', body: item.tip },
          {
            type: 'text',
            body: 'Coba ceritakan kembali dengan bahasamu sendiri. Apa satu hal baru yang kamu pelajari? Setelah siap, kerjakan latihan. Tidak apa-apa jika belum benar; kita bisa mencoba lagi.',
          },
        ],
      },
    })
    item.questions.forEach((entry, index) => {
      const options = [...new Set([entry.answer, ...entry.distractors])]
      const position = index % 4
      const ordered = [
        ...options.slice(1, position + 1),
        entry.answer,
        ...options.slice(position + 1),
      ]
      questions.push({
        id: `${id}-q${index + 1}`,
        lesson_id: id,
        prompt: entry.prompt,
        options: ordered,
        correct_option: ordered.indexOf(entry.answer),
        explanation: entry.explanation,
        difficulty: 'dasar',
      })
    })
  })
}

export const editorialNotice =
  'Materi contoh untuk menguji aplikasi. Belum ditinjau guru atau dipetakan sebagai kurikulum resmi.'
export const getSubject = (id) => subjects.find((subject) => subject.id === id)
export const getLesson = (id) => lessons.find((lesson) => lesson.id === id || lesson.slug === id)
