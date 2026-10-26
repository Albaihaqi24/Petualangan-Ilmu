// Metadata acuan dan usulan editorial; tidak berisi salinan buku atau bank soal.
export const governmentCheckedAt = '2026-10-17'
export const officialCp = {
  title: 'Keputusan Kepala BSKAP 046/H/KR/2025 tentang Capaian Pembelajaran',
  url: 'https://bpmpbabel.kemendikdasmen.go.id/PPID/wp-content/uploads/2025/07/KepKaBSKAP-046_2025-ttg-CP.pdf',
}
export const officialMaterialsIndex =
  'https://pusatinformasi.rumahpendidikan.kemendikdasmen.go.id/hc/id/articles/52341557298201-Materi-Sumber-Belajar-Jenjang-Sekolah-Dasar-SD'
export const englishTransitionUrl =
  'https://www.kemendikdasmen.go.id/siaran-pers/13897-perkuat-kompetensi-global-bahasa-inggris-akan-wajib-pada-sekolah-dasar-mulai-ta-20272028'

// Judul dan kelompok kelas dicocokkan dengan indeks resmi dan metadata halaman tujuan.
// Pemutaran, isi lengkap, akses akun dan kesesuaian pedagogis masih perlu diperiksa.
export const governmentMaterials = [
  {
    id: 'ruang-murid-bangun-datar',
    subject: 'matematika',
    grades: [1, 2],
    title: 'Bahan Ajar Komik: Mengenal Bangun Datar',
    format: 'Komik',
    url: 'https://murid.kemendikdasmen.go.id/sumber-belajar/sub-unit/094f9b43-8752-442a-88d2-172ef203ee56/materi/bahan-ajar-komik-mengenal-bangun-datar-cd37e02f-7877-4e20-b717-e82b445d27d8',
  },
  {
    id: 'ruang-murid-ide-pokok',
    subject: 'bahasa-indonesia',
    grades: [3, 4],
    title: 'Memahami Ide Pokok dan Ide Pendukung dalam Teks Informasi',
    format: 'Video',
    url: 'https://murid.kemendikdasmen.go.id/sumber-belajar/materi/video/memahami-ide-pokok-dan-ide-pendukung-dalam-teks-74900273-cf17-4283-a0ec-adb37d1867a7',
  },
  {
    id: 'ruang-murid-ekosistem',
    subject: 'ipas',
    grades: [5, 6],
    title: 'Harmoni dalam Ekosistem: Komponen dan Hubungan Antarmakhluk Hidup',
    format: 'Teks',
    url: 'https://murid.kemendikdasmen.go.id/sumber-belajar/materi/teks/harmoni-dalam-ekosistem-komponen-dan-hubungan-antarmakhluk-hidup-54cf695a-6385-494f-a568-267e370a00f8',
  },
  {
    id: 'ruang-murid-kerja-sama',
    subject: 'pancasila',
    grades: [1, 2],
    title: 'Komik: Bentuk Kerja Sama di Sekitarku',
    format: 'Komik',
    url: 'https://murid.kemendikdasmen.go.id/sumber-belajar/materi/gambar/komik-bentuk-kerja-sama-di-sekitarku-eee32aba-2bc3-44bf-aaf9-1548a3bb41cd',
  },
  {
    id: 'ruang-murid-daily-activities',
    subject: 'bahasa-inggris',
    grades: [3, 4],
    title: 'Fun Things I Do Every Day',
    format: 'Gim edukasi',
    url: 'https://murid.kemendikdasmen.go.id/sumber-belajar/materi/gim-edukasi/fun-things-i-do-every-day-c11e0f05-565b-4a8b-8f33-fc0de154b9de?id_sub_unit=6a863901-04fb-434d-8b9d-bd048e3e959b',
  },
  {
    id: 'ruang-murid-karya-dimensi',
    subject: 'seni-budaya',
    grades: [3, 4],
    title: 'Mengenal 2D & 3D',
    format: 'Gim edukasi · Seni Rupa',
    url: 'https://murid.kemendikdasmen.go.id/sumber-belajar/materi/gim-edukasi/mengenal-2d-3d-df49bff2-63d9-428a-9e8d-fe3dbaf8462d?id_sub_unit=22534f63-dbda-448c-8cd3-9ea9d0a493de',
  },
].map((item) => ({
  ...item,
  provider: 'Ruang Murid · Kemendikdasmen',
  checked_at: governmentCheckedAt,
  index_url: officialMaterialsIndex,
  verification:
    'Judul/kelompok kelas pada indeks dan metadata tujuan; isi/pemutaran belum diaudit.',
}))

const scope = (subject, phase, pages, focus, assessment, gaps) => ({
  id: `${subject}-${phase}`,
  subject,
  phase,
  government_phase: ['ipas', 'bahasa-inggris'].includes(subject) && phase === 'A' ? null : phase,
  cp_pdf_pages: pages,
  focus,
  assessment,
  review_priorities: gaps,
  status: 'proposed_mapping',
  reviewed_by: null,
  reviewed_at: null,
})

// Ringkasan editorial dari bagian SD CP, bukan kutipan atau ATP yang disahkan.
// Penomoran halaman PDF dihitung dari halaman pertama berkas, mulai 1.
export const governmentScopes = [
  scope(
    'matematika',
    'A',
    [111, 112],
    'Bilangan sampai 100; tambah/kurang konkret sampai 20; setengah/seperempat; kesetaraan dan pola; ukuran tidak baku; bentuk/posisi; turus/piktogram.',
    'Model benda, penjelasan lisan, pengukuran dan penyajian data sederhana.',
    [
      'Pastikan pecahan setengah/seperempat, makna tanda sama dengan, posisi serta komposisi bentuk tercakup.',
      'Pisahkan perkalian/pembagian dan operasi melampaui 20 dari target inti Fase A.',
    ],
  ),
  scope(
    'matematika',
    'B',
    [112, 113, 114],
    'Bilangan sampai 10.000; tambah/kurang sampai 1.000; kali/bagi sampai 100; faktor/kelipatan; pecahan/desimal/persen; pola; satuan; bentuk dan data.',
    'Masalah kontekstual, model pecahan, pengukuran luas/volume dengan satuan dan diagram.',
    [
      'Lengkapi nilai tak diketahui, pola, komposisi bangun serta pengukuran luas/volume.',
      'Bedakan rumus keliling dan pengukuran sudut sebagai perluasan dari target inti Fase C.',
    ],
  ),
  scope(
    'matematika',
    'C',
    [114, 115, 116],
    'Bilangan sampai 1.000.000; operasi sampai 100.000; uang; KPK/FPB; pecahan; rasio; luas/keliling, waktu/sudut; visualisasi ruang/peta; data dan kemungkinan.',
    'Penalaran, pemecahan masalah, model ruang/peta dan pembacaan data.',
    [
      'KPK/FPB termasuk inti Fase C, bukan sekadar pengayaan.',
      'Periksa kecukupan rentang bilangan, operasi pecahan, nilai tak diketahui, peta berpetak, durasi dan peluang.',
    ],
  ),
  scope(
    'bahasa-indonesia',
    'A',
    [94, 95],
    'Simakan tentang diri/sekitar; membaca kata dan isi teks; percakapan santun; bercerita; tulisan permulaan dan teks sederhana.',
    'Simakan yang dibacakan, membaca nyata, cerita lisan dan contoh tulisan.',
    [
      'Sediakan teks utuh serta naskah simakan; soal definisi belum mengukur kefasihan membaca.',
      'Nilai proses menulis dan kemampuan menanggapi percakapan.',
    ],
  ),
  scope(
    'bahasa-indonesia',
    'B',
    [95],
    'Ide pokok/pendukung dan pesan; kosakata baru; diskusi dan cerita kembali; menulis beragam teks sederhana dengan kaidah yang sesuai.',
    'Tanggapan simakan, pemahaman bacaan, diskusi dan tulisan dengan revisi.',
    [
      'Lengkapi tugas simakan dan teks sastra/nonsastra utuh.',
      'Periksa penggunaan makna denotatif serta tingkat kesulitan ungkapan kiasan.',
    ],
  ),
  scope(
    'bahasa-indonesia',
    'C',
    [95, 96],
    'Analisis teks lisan, visual dan audiovisual; presentasi gagasan; ekspresi sastra; tulisan kreatif dengan kalimat kompleks dan kosakata kontekstual.',
    'Analisis bacaan/simakan, presentasi serta portofolio tulisan dan suntingan.',
    [
      'Tambahkan bukti analisis dan tulisan mandiri, bukan hanya pengenalan istilah.',
      'Sesuaikan perbandingan sumber dengan kebutuhan fase; evaluasi kredibilitas mendalam tidak otomatis menjadi tuntutan inti SD.',
    ],
  ),
  scope(
    'ipas',
    'A',
    [],
    'Pengayaan pengamatan diri dan lingkungan; dokumen CP IPAS yang diperiksa dimulai pada Fase B.',
    'Percakapan dan pengamatan aman bersama pendamping.',
    [
      'Jangan membuat klaim CP IPAS Fase A atau kewajiban mata pelajaran tersendiri.',
      'Integrasikan sesuai konteks pembelajaran sekolah.',
    ],
  ),
  scope(
    'ipas',
    'B',
    [149, 150, 151],
    'Pancaindra/siklus hidup; sumber daya, zat, energi/gaya; peran sosial; peta setempat, bentang alam/budaya/sejarah; uang; keterampilan proses.',
    'Pengamatan, pertanyaan/prediksi, penyelidikan terbimbing, data, refleksi dan laporan.',
    [
      'Pancaindra perlu ditinjau pada kelas 3–4 walau ada pengayaan kelas 1.',
      'Sediakan penyelidikan dan pencatatan data; tinjau peta kabupaten/provinsi, sejarah lokal serta pengelolaan uang.',
    ],
  ),
  scope(
    'ipas',
    'C',
    [151, 152, 153],
    'Sistem organ/kesehatan; ekosistem; bunyi/cahaya; hemat/energi alternatif dan iklim; tata surya; geografi, sejarah, budaya/ekonomi; penyelidikan.',
    'Penyelidikan, analisis data dengan bukti, laporan beralasan dan refleksi perbaikan.',
    [
      'Lengkapi kegiatan yang menghasilkan data serta argumentasi, bukan hanya bacaan konsep.',
      'Periksa sejarah pahlawan setempat, keragaman budaya dan penerapan ekonomi dalam konteks lokal.',
    ],
  ),
  scope(
    'pancasila',
    'A',
    [82, 83],
    'Bendera/lagu kebangsaan dan Pancasila; aturan keluarga; identitas serta Bhinneka Tunggal Ika; lingkungan dan kerja sama.',
    'Cerita pengalaman, simulasi aturan dan praktik kerja sama.',
    [
      'Periksa cakupan bendera, lagu, semboyan dan simbol secara eksplisit.',
      'Nilai tindakan/refleksi, bukan hanya jawaban tentang sikap.',
    ],
  ),
  scope(
    'pancasila',
    'B',
    [83, 84],
    'Makna sila/keteladanan perumus; aturan, hak/kewajiban; identitas beragam; wilayah setempat dan persatuan dalam kerja sama.',
    'Pembahasan situasi, pengenalan wilayah, tugas kelompok dan refleksi.',
    [
      'Karakter perumus dan bahasa persatuan perlu ditinjau pada Fase B.',
      'Periksa wilayah RT/RW/desa/kelurahan/kecamatan dalam contoh lokal.',
    ],
  ),
  scope(
    'pancasila',
    'C',
    [84, 85],
    'Sejarah kelahiran/kesatuan sila; norma, hak/kewajiban, Pembukaan UUD 1945 dan musyawarah; budaya; kabupaten/provinsi dan gotong royong.',
    'Musyawarah, alasan keputusan, peta wilayah dan tindakan/refleksi bersama.',
    [
      'Lengkapi kronologi, kesatuan sila serta pengenalan Pembukaan UUD 1945.',
      'Cocokkan fakta sejarah dan contoh kewargaan dengan sumber yang tepat.',
    ],
  ),
  scope(
    'bahasa-inggris',
    'A',
    [],
    'Pengenalan sukarela yang sesuai usia; panduan CP Bahasa Inggris yang diperiksa dimulai pada Fase B.',
    'Permainan, respons lisan/nonverbal dan lagu dengan pendamping.',
    [
      'Tidak diberi label CP Bahasa Inggris Fase A.',
      'Jangan menggeser prioritas literasi bahasa Indonesia; ikuti kesiapan sekolah/anak.',
    ],
  ),
  scope(
    'bahasa-inggris',
    'B',
    [133, 134],
    'Merespons teks lisan/multimodal keseharian, memahami teks pendek serta menyampaikan ide dalam tulisan/multimodal sederhana.',
    'Menyimak, dialog, membaca gambar/teks dan produksi pesan sederhana.',
    [
      'Tambahkan model audio/naskah yang dibacakan dan praktik komunikasi.',
      'Daftar kosakata atau tata bahasa saja belum memenuhi tiga elemen keterampilan.',
    ],
  ),
  scope(
    'bahasa-inggris',
    'C',
    [134, 135],
    'Alur informasi, gagasan utama/rincian teks keseharian; respons lisan singkat; teks sederhana tentang ide dan pengalaman.',
    'Respons simakan/bacaan, percakapan dan teks/presentasi sederhana.',
    [
      'Gunakan topik/tata bahasa sebagai sarana komunikasi, bukan daftar grammar wajib nasional.',
      'Periksa tiga elemen keterampilan pada panduan Inggris 2025, halaman PDF 25–26.',
    ],
  ),
  scope(
    'seni-budaya',
    'A',
    [239, 246, 247, 256, 257, 264],
    'Pilih cabang: eksplorasi rupa; nada/irama; gerak-ruang-waktu-tenaga; atau peran/suara. Berkarya dan merefleksikan sesuai cabang.',
    'Proses eksplorasi, karya/penampilan dan cerita pengalaman.',
    [
      'Setiap cabang mempunyai CP tersendiri; enam unit campuran belum mencakup satu cabang secara lengkap.',
      'Gunakan bahan aman dan catat pilihan cabang sekolah.',
    ],
  ),
  scope(
    'seni-budaya',
    'B',
    [239, 240, 247, 257, 264, 265],
    'Unsur/prinsip dan teknik rupa; pola irama/melodi; pengembangan gerak; atau tokoh/properti. Refleksi dan penciptaan sesuai cabang.',
    'Karya/penampilan, jurnal proses dan umpan balik santun.',
    [
      'Pisahkan TP dan rubrik rupa, musik, tari dan teater.',
      'Rujukan Seni Rupa tidak membuktikan keselarasan unit musik/tari/teater.',
    ],
  ),
  scope(
    'seni-budaya',
    'C',
    [240, 241, 247, 248, 257, 258, 265, 266],
    'Pilihan teknik/desain rupa; variasi irama/tempo/melodi; rancangan gerak tari; atau pengembangan karakter/lakon. Karya dan refleksi sesuai cabang.',
    'Portofolio proses, karya/penampilan dan alasan pilihan artistik.',
    [
      'Lengkapi latihan serta progresi dalam cabang yang dipilih, bukan tuntutan empat cabang sekaligus.',
      'Nilai proses, ekspresi dan refleksi; kuis istilah bukan bukti kemampuan berkarya.',
    ],
  ),
].map((scope) => ({
  ...scope,
  cp_scope_ids: !scope.government_phase
    ? []
    : (scope.subject === 'seni-budaya'
        ? ['seni-rupa', 'seni-musik', 'seni-tari', 'seni-teater']
        : [scope.subject]
      ).map((subject) => `cp2025-${subject}-${scope.phase.toLowerCase()}`),
}))

export function getGovernmentScope(subject, grade) {
  const phase = grade <= 2 ? 'A' : grade <= 4 ? 'B' : 'C'
  return governmentScopes.find((item) => item.subject === subject && item.phase === phase)
}

export const unitAlignmentNotes = {
  'kurikulum-matematika-2-2':
    'Periksa operasi yang melampaui 20; beri bantuan/label pengayaan sesuai ATP.',
  'kurikulum-matematika-2-3':
    'Perkalian adalah pengayaan awal; target inti operasi perkalian terdapat pada Fase B.',
  'kurikulum-matematika-2-4':
    'Pembagian adalah pengayaan awal; target inti operasi pembagian terdapat pada Fase B.',
  'kurikulum-matematika-2-5':
    'Satuan baku perlu diberi label pengayaan; inti pengukuran Fase A memakai satuan tidak baku.',
  'kurikulum-matematika-4-5':
    'Bedakan estimasi luas/volume Fase B dari rumus keliling serta pengukuran sudut pada Fase C.',
  'kurikulum-matematika-5-2':
    'KPK/FPB termasuk capaian inti Fase C; kedalaman dan penerapan perlu ditinjau.',
}
