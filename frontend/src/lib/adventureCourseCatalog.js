// Metadata publik saja; isi bab dan bank kuis hanya diimpor provider demo.
export const adventurePackageId = 'petualangan-72-2026'
export const adventurePackageNotice =
  'Bahan ajar orisinal berdasarkan pilihan topik aplikasi. Draf menunggu review guru; bukan daftar bab resmi nasional.'
export const adventureSubjects = [
  {
    id: 'matematika',
    name: 'Matematika',
    island: 'Pulau Numeria',
    mentor: 'Kapten Rubi',
    grades: [
      [
        'Mengenal Angka 1–20',
        'Penjumlahan & Pengurangan Benda',
        'Mengenal Bangun Datar Sederhana',
        'Membandingkan Berat & Panjang',
      ],
      [
        'Nilai Tempat Ratusan, Puluhan, Satuan',
        'Penjumlahan & Pengurangan Bersusun',
        'Membaca Jam & Waktu',
        'Mengenal Diagram Gambar (Piktogram)',
      ],
      [
        'Operasi Hitung Bilangan sampai 1.000',
        'Konsep Perkalian Dasar',
        'Konsep Pembagian Sama Rata',
        'Mengenal Pecahan Sederhana',
      ],
      [
        'Faktor & Kelipatan Bilangan (FPB & KPK Dasar)',
        'Pecahan Senilai, Desimal, & Persen',
        'Keliling & Luas Bangun Datar',
        'Membaca Diagram Batang',
      ],
      [
        'Penjumlahan & Pengurangan Pecahan Beda Penyebut',
        'Perkalian & Pembagian Pecahan',
        'Kecepatan, Jarak, dan Waktu',
        'Volume Kubus dan Balok',
      ],
      [
        'Operasi Hitung Bilangan Bulat (Positif & Negatif)',
        'Unsur, Keliling, & Luas Lingkaran',
        'Gabungan Bangun Ruang',
        'Statistika Dasar: Mean, Median, Modus',
      ],
    ],
  },
  {
    id: 'bahasa-indonesia',
    name: 'Bahasa Indonesia',
    island: 'Pulau Kata',
    mentor: 'Bobo',
    grades: [
      [
        'Bunyi Huruf & Suku Kata',
        'Kosakata Anggota Tubuh & Keluarga',
        'Membaca Cerita Bergambar',
        'Kalimat Tanya & Tanda Baca Dasar',
      ],
      [
        'Kata Ajaib: Tolong, Maaf, Terima Kasih',
        'Kalimat Berita & Kalimat Perintah',
        'Membaca Dongeng Hewan (Fabel)',
        'Menulis Cerita Pengalaman Harian',
      ],
      [
        'Mencari Ide Pokok Paragraf',
        'Kalimat Efektif & Kosakata Baru',
        'Membaca Petunjuk & Denah Lokasi',
        'Mengenal Puisi Anak',
      ],
      [
        'Kalimat Transitif & Intransitif',
        'Mencari Arti Kata di Kamus',
        'Wawancara & Laporan Pengamatan',
        'Memahami Pesan Moral Cerita Rakyat',
      ],
      [
        'Kata Sifat, Sinonim, dan Antonim',
        'Kalimat Langsung & Tidak Langsung',
        'Membedakan Fakta dan Opini',
        'Teks Eksplanasi Fenomena Alam',
      ],
      [
        'Ide Pokok & Kesimpulan Teks Laporan',
        'Menyusun Teks Pidato Persuasif',
        'Membaca Infografis & Data Visual',
        'Menulis Surat Resmi & Pribadi',
      ],
    ],
  },
  {
    id: 'ipas',
    name: 'IPA & Sains',
    island: 'Pulau Eksplora',
    mentor: 'Ilmuwan Tobi',
    grades: [
      [
        'Mengenal Panca Indra Kita',
        'Merawat Tubuh & Kesehatan Gigi',
        'Mengenal Hewan & Tumbuhan Sekitar',
        'Benda Siang dan Malam Hari',
      ],
      [
        'Benda Padat, Cair, dan Gas',
        'Bagian-Bagian Tumbuhan & Fungsinya',
        'Tempat Hidup Hewan (Darat & Air)',
        'Mengenal Cuaca: Cerah, Berawan, Hujan',
      ],
      [
        'Ciri-Ciri Makhluk Hidup',
        'Siklus Hidup Hewan (Metamorfosis)',
        'Perubahan Wujud Benda: Mencair, Membeku',
        'Sumber Energi di Sekitar Kita',
      ],
      [
        'Proses Fotosintesis Tumbuhan',
        'Gaya di Sekitar Kita: Otot, Gesek, Magnet',
        'Perubahan Bentuk Energi',
        'Siklus Air & Pelestarian Alam',
      ],
      [
        'Cahaya dan Sifatnya & Bunyi',
        'Rantai Makanan & Jaring Ekosistem',
        'Organ Pernapasan & Pencernaan Manusia',
        'Listrik, Magnet, & Teknologi Sehari-hari',
      ],
      [
        'Sistem Rangka, Sendi, & Saraf Manusia',
        'Sistem Tata Surya, Rotasi, & Revolusi Bumi',
        'Adaptasi Makhluk Hidup: Bunglon, Kaktus, Teratai',
        'Krisis Energi & Energi Terbarukan',
      ],
    ],
  },
]
export const adventureCourses = adventureSubjects.flatMap((subject) =>
  subject.grades.map((titles, index) => {
    const grade = index + 1
    return {
      id: `${adventurePackageId}-${subject.id}-${grade}`,
      subject: subject.id,
      name: subject.name,
      island: subject.island,
      mentor: subject.mentor,
      grade,
      phase: ['A', 'A', 'B', 'B', 'C', 'C'][index],
      enrichment: subject.id === 'ipas' && grade <= 2,
      chapters: titles.map((title, chapter) => ({
        order: chapter + 1,
        title,
        id: `petualangan-${subject.id}-${grade}-${chapter + 1}`,
        slug: `petualangan-${subject.id}-kelas-${grade}-bab-${chapter + 1}`,
      })),
    }
  }),
)
export const findAdventureCourse = (id) => adventureCourses.find((course) => course.id === id)
