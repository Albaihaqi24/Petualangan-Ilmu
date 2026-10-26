// Identitas dan navigasi buku; tidak mengandung isi materi atau kunci kuis.
export const textbookCatalog = [
  {
    id: 'matematika-1-2022',
    title: 'Matematika kelas 1 — bahan ajar per bab',
    subject: 'matematika',
    grade: 1,
    phase: 'A',
    source_year: 2022,
    source_authors: 'Dara Retno Wulan dan Rasfaniwaty',
    source_title: 'Matematika untuk SD/MI Kelas I',
    source_url: 'https://repositori.kemendikdasmen.go.id/35868/',
    student_pdf_url: 'https://repositori.kemendikdasmen.go.id/35868/1/Matematika-BS-KLS-I.pdf',
    teacher_url: 'https://repositori.kemendikdasmen.go.id/35861/',
    teacher_pdf_url: 'https://repositori.kemendikdasmen.go.id/35861/1/Matematika-BG-KLS-I.pdf',
    checked_at: '2026-10-17',
    structure_verification:
      'Identitas dan daftar isi buku siswa halaman PDF 2, 5–7 diperiksa; panduan guru sebagai acuan pendamping.',
    content_status: 'authored_full_chapters_draft',
    review_status: 'needs_teacher_review',
    chapters: [
      [
        'Bilangan 0–10',
        1,
        40,
        [
          'Menghitung dan menulis',
          'Membandingkan banyak benda',
          'Urutan maju dan mundur',
          'Menyusun dan mengurai bilangan',
        ],
      ],
      [
        'Penjumlahan hingga 10',
        41,
        74,
        ['Cerita menggabungkan', 'Strategi menjumlahkan', 'Menyelesaikan soal cerita'],
      ],
      [
        'Pengurangan hingga 10',
        75,
        114,
        [
          'Cerita mengambil dan mencari sisa',
          'Strategi mengurangkan',
          'Hubungan dengan penjumlahan',
          'Soal cerita pengurangan',
        ],
      ],
      [
        'Bentuk di sekitar kita',
        115,
        144,
        ['Mendeskripsikan bentuk', 'Mengelompokkan benda', 'Menyusun dan mengurai bentuk'],
      ],
      [
        'Bilangan 11–20',
        145,
        174,
        [
          'Menghitung dan menulis 11–20',
          'Urutan maju dan mundur',
          'Puluhan dan satuan',
          'Membandingkan bilangan',
        ],
      ],
      [
        'Tambah dan kurang hingga 20',
        175,
        196,
        [
          'Lebih banyak, lebih sedikit, dan selisih',
          'Penjumlahan hingga 20',
          'Pengurangan hingga 20',
        ],
      ],
      [
        'Mengukur panjang',
        197,
        218,
        ['Membandingkan dan mengurutkan panjang', 'Mengukur dengan satuan tidak baku'],
      ],
      [
        'Mengelompokkan data dan diagram gambar',
        219,
        242,
        ['Mengelompokkan data', 'Membaca dan membuat diagram gambar'],
      ],
    ].map(([title, start, end, subchapters], index) => ({
      order: index + 1,
      title,
      id: `buku-matematika-1-2022-bab-${index + 1}`,
      slug: `buku-matematika-kelas-1-bab-${index + 1}`,
      source_print_pages: [start, end],
      source_pdf_start: start + 12,
      subchapters,
      cp_element_ids: [[1], [1, 2], [1, 2], [4], [1], [1, 2], [3], [5]][index].map(
        (element) => `cp2025-matematika-a-${element}`,
      ),
      cp_mapping_status: 'proposed_mapping',
      cp_phase_coverage: 'partial',
    })),
  },
]

export const findTextbook = (id) => textbookCatalog.find((book) => book.id === id)
