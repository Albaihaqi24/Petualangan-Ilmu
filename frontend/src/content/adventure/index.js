import {
  adventureCourses,
  adventurePackageId,
  adventurePackageNotice,
} from '../../lib/adventureCourseCatalog.js'
import { learningResources } from '../../lib/learningResources.js'
import { mathChapters } from './math.js'
import { languageChapters } from './language.js'
import { scienceChapters } from './science.js'

const manuscripts = {
  matematika: mathChapters,
  'bahasa-indonesia': languageChapters,
  ipas: scienceChapters,
}
const text = (heading, body, extra = {}) => ({ type: 'text', heading, body, ...extra })
const numbered = (items) => items.map((item, index) => `${index + 1}. ${item}`).join('\n')
const illustrations = {
  'petualangan-bahasa-indonesia-1-3': [
    'petualangan-cerita-nia.svg',
    'Cerita Nia: menanam biji, merawat, lalu muncul tunas setelah beberapa hari.',
  ],
  'petualangan-bahasa-indonesia-3-3': [
    'petualangan-denah.svg',
    'Denah rekaan: utara di atas; gerbang di selatan taman dan perpustakaan di timur taman. Tidak berskala.',
  ],
  'petualangan-matematika-3-4': [
    'petualangan-pecahan.svg',
    'Dua pita sama panjang membandingkan setengah dengan seperempat.',
  ],
  'petualangan-ipas-4-4': [
    'petualangan-siklus-air.svg',
    'Model beberapa jalur air: penguapan, pengembunan, hujan, aliran dan peresapan.',
  ],
}
export const adventureLessons = []
export const adventureQuestions = []
export const adventureDrafts = []

for (const course of adventureCourses) {
  for (const chapter of course.chapters) {
    const draft = manuscripts[course.subject][(course.grade - 1) * 4 + chapter.order - 1]
    if (
      !draft ||
      draft.sections.length !== 3 ||
      draft.practice.length !== 3 ||
      draft.quiz.length !== 5
    )
      throw new Error(`Naskah bab belum lengkap: ${chapter.id}`)
    const objectives = draft.sections.map(
      (part) => `Menjelaskan ${part.heading.toLowerCase()} dengan contoh dan alasan.`,
    )
    const refs = learningResources
      .filter((ref) => ref.subject === course.subject && ref.grade === course.grade)
      .map(({ title, url, audience }) => ({
        title,
        url,
        audience,
        usage:
          'Bacaan pendamping; naskah dan asesmen aplikasi ditulis orisinal, bukan salinan buku.',
      }))
    if (course.subject === 'ipas')
      refs.push({
        title: 'Panduan mata pelajaran IPAS Fase B dan C, 2025',
        url: 'https://repositori.kemendikdasmen.go.id/33599/',
        audience: 'teacher',
      })
    if (course.subject === 'ipas' && course.grade === 1 && chapter.order === 2)
      refs.push({
        title: 'Kemenkes — Cara Mencegah Penyakit Gigi dan Mulut',
        url: 'https://ayosehat.kemkes.go.id/cara-mencegah-penyakit-gigi-dan-mulut',
        audience: 'teacher',
      })
    const note = course.enrichment
      ? 'Pengayaan sains kelas 1–2. Bukan klaim CP IPAS wajib Fase A. Pendamping menyesuaikan kegiatan dengan kesiapan anak.'
      : course.subject === 'ipas'
        ? 'Paket ini berfokus sains; unsur sosial IPAS tetap perlu paket lain. Topik dan penempatan kelas adalah pilihan aplikasi yang menunggu pemetaan TP/ATP dan review guru.'
        : 'Urutan empat bab per kelas adalah pilihan aplikasi, bukan daftar isi resmi. Cakupan dan penempatan topik, termasuk ratusan, bilangan negatif, lingkaran dan statistika, menunggu pemeriksaan CP/ATP oleh guru.'
    const rubric =
      course.subject === 'matematika'
        ? 'Periksa pemodelan, langkah hitung, hasil/satuan dan penjelasan pemeriksaan. Jawaban akhir saja tidak cukup: minta anak menunjukkan gambar, benda atau alasan. Strategi lain yang benar diterima.'
        : course.subject === 'bahasa-indonesia'
          ? 'Nilai pemahaman dengan bukti teks, keruntutan gagasan, ketepatan bahasa dan perbaikan setelah umpan balik. Tugas berbicara/menulis dinilai dari karya atau penyampaian, bukan skor pilihan ganda saja; bentuk lisan/dikte/alat bantu dapat disesuaikan.'
          : 'Nilai pertanyaan pengamatan, catatan bukti, penjelasan hubungan, batas kesimpulan dan keselamatan. Bedakan yang diamati dari yang dipelajari dari sumber. Jangan meminta percobaan berisiko atau menilai tubuh/kemampuan pribadi teman.'
    const lesson = {
      id: chapter.id,
      slug: chapter.slug,
      title: chapter.title,
      subject_id: course.subject,
      grade: course.grade,
      phase: course.phase,
      chapter: `Petualangan · Bab ${chapter.order}`,
      difficulty: course.grade <= 2 ? 'dasar' : 'sedang',
      duration: course.grade <= 2 ? 20 : 25,
      status: 'draft',
      content: {
        summary: `${course.island} bersama ${course.mentor}: ${chapter.title}. Tiga subbab, contoh bertahap, kegiatan, latihan mandiri dan kuis.`,
        video_url: null,
        package_id: adventurePackageId,
        course_id: course.id,
        mentor: course.mentor,
        chapter_number: chapter.order,
        content_kind: 'full_chapter',
        review_status: 'needs_teacher_review',
        editorial_notice: adventurePackageNotice,
        objectives,
        enrichment: course.enrichment,
        curriculum_note: note,
        source_refs: refs,
        blocks: [
          text(
            'Tujuan dan bekal awal',
            numbered(objectives) +
              '\nMulai dengan mengingat contoh sehari-hari yang berkaitan. Bila belum mengenal kata atau langkah pada judul, minta pendamping menjelaskannya dahulu. Tujuan ini masih draf untuk ditinjau guru.',
          ),
          text('Sebelum mulai', draft.start),
          ...(illustrations[chapter.id]
            ? [
                {
                  type: 'image',
                  url: `/assets/${illustrations[chapter.id][0]}`,
                  caption: illustrations[chapter.id][1],
                },
              ]
            : []),
          ...draft.sections.flatMap((part, index) => [
            text(`${String.fromCharCode(65 + index)}. ${part.heading}`, part.body),
            text(`Contoh bertahap ${index + 1}`, part.example),
          ]),
          text('Kegiatan penerapan', draft.activity),
          text(
            'Latihan mandiri',
            numbered(draft.practice.map((item) => item.prompt)) +
              '\nCobalah dahulu tanpa membuka pembahasan. Untuk jawaban terbuka, tunjukkan alasan atau karya; lebih dari satu jawaban dapat diterima jika memenuhi pertanyaan dan didukung bukti.',
          ),
          text(
            'Pembahasan latihan mandiri',
            numbered(draft.practice.map((item) => `${item.answer} ${item.reason}`)),
            { collapsible: true },
          ),
          text('Rangkuman bab', draft.recap),
          text(
            'Refleksi belajar',
            'Jelaskan satu gagasan dengan kata sendiri, tunjukkan satu contoh baru, dan sebutkan bagian yang masih perlu bantuan. Periksa kembali contoh jika jawaban belum tepat. Kesalahan memberi petunjuk langkah yang perlu dilatih; kamu boleh mengulang sebelum kuis.',
          ),
          text(
            'Catatan pendamping: bantuan dan pengayaan',
            draft.trap +
              '\n' +
              rubric +
              '\nGunakan rubrik 0 = belum tampak, 1 = dengan banyak bantuan, 2 = sebagian mandiri, 3 = mandiri disertai alasan pada tiap kriteria. Catat bukti dan bantuan yang diperlukan; kriteria ketercapaian disepakati guru, bukan otomatis ditentukan XP.',
            { collapsible: true },
          ),
        ],
      },
    }
    adventureLessons.push(lesson)
    adventureDrafts.push({ course, chapter, draft, lesson })
    draft.quiz.forEach((item, index) => {
      const correct = (course.grade + chapter.order + index) % 4
      const options = [...item.wrong]
      options.splice(correct, 0, item.answer)
      if (options.length !== 4 || new Set(options.map((v) => v.trim().toLowerCase())).size !== 4)
        throw new Error(`Opsi kuis tidak unik: ${chapter.id}/${index + 1}`)
      adventureQuestions.push({
        id: `${chapter.id}-q${index + 1}`,
        lesson_id: chapter.id,
        prompt: item.prompt,
        options,
        correct_option: correct,
        explanation: item.explanation,
        skill: item.skill,
        difficulty: lesson.difficulty,
      })
    })
  }
}
