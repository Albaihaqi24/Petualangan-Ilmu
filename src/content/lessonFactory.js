import { unitAlignmentNotes } from '../lib/governmentCurriculum.js'

// Materi orisinal berupa draf. Rujukan untuk orientasi, bukan salinan isi buku.
export const reviewNotice =
  'Draf materi orisinal Petualangan Ilmu. Belum ditinjau guru; bukan buku resmi atau pemetaan CP yang disahkan.'
export const card = (term, meaning, example) => ({ term, meaning, example })
export const unit = (activity, cards) => ({ activity, cards })
export function conceptQuestions(cards) {
  return cards.map((item, index) => {
    const scenario = index % 2 === 1
    const answer = scenario ? item.term : item.meaning
    const pool = cards.filter((_, i) => i !== index).map((c) => (scenario ? c.term : c.meaning))
    return {
      prompt: scenario
        ? `Konsep yang berarti “${item.meaning}”, dengan contoh “${item.example}”, disebut …`
        : `Pada materi ini, penjelasan yang tepat untuk “${item.term}” adalah …`,
      answer,
      distractors: pool.slice(0, 3),
      explanation: `${item.term}: ${item.meaning}. Contohnya: ${item.example}`,
      skill: scenario ? 'identifikasi-konsep' : 'pemahaman-konsep',
    }
  })
}
export function buildLesson(plan, unitInfo, index, sourceRefs) {
  const grade = plan.grade,
    topic = plan.units[index]
  const id = `kurikulum-${plan.subject}-${grade}-${index + 1}`
  const scaffolding =
    grade <= 2
      ? 'Gunakan benda atau gambar. Minta pendamping membacakan bagian yang belum kamu pahami.'
      : grade <= 4
        ? 'Amati contoh, jelaskan alasanmu, lalu coba contoh lain.'
        : 'Bandingkan contoh dan jelaskan alasan dengan informasi yang kamu temukan.'
  const cards = unitInfo.cards
  const objectives = unitInfo.objectives || [
    `Menjelaskan ${topic.title.toLowerCase()} dengan contoh.`,
    `Menerapkan konsep pada aktivitas sesuai usia dan menceritakan alasannya.`,
  ]
  const example =
    unitInfo.workedExample ||
    (unitInfo.questions
      ? `${unitInfo.questions[0].prompt} Jawaban: ${unitInfo.questions[0].answer}. ${unitInfo.questions[0].explanation}`
      : `${cards[0].example} Kita mengenal ${cards[0].term.toLowerCase()} sebagai ${cards[0].meaning.toLowerCase()}. Periksa ciri tersebut sebelum mengambil kesimpulan.`)
  const lesson = {
    id,
    subject_id: plan.subject,
    title: topic.title,
    slug: `belajar-${plan.subject}-kelas-${grade}-unit-${index + 1}`,
    grade,
    phase: plan.phase,
    chapter: `Bab ${index + 1}`,
    difficulty: index < 3 ? 'dasar' : 'sedang',
    status: 'draft',
    duration: grade <= 2 ? 8 : 12,
    content: {
      summary: `${topic.title}. Belajar melalui penjelasan, contoh, aktivitas, dan latihan konsep.`,
      video_url: null,
      review_status: 'needs_teacher_review',
      editorial_notice: reviewNotice,
      objectives,
      source_refs: sourceRefs,
      curriculum_note: [plan.note, unitAlignmentNotes[id]].filter(Boolean).join(' '),
      enrichment: plan.enrichment,
      blocks: [
        { type: 'text', body: `Tujuan belajar: ${objectives.join(' ')}` },
        {
          type: 'text',
          body: `Mari belajar ${topic.title.toLowerCase()}. ${scaffolding} Kita akan menggunakan lima gagasan berikut. Hubungkan setiap gagasan dengan contoh; jangan hanya menghafal namanya.`,
        },
        ...cards.map((c, i) => ({
          type: 'text',
          body: `${i + 1}. ${c.term}. ${c.meaning}. Contoh: ${c.example}`,
        })),
        { type: 'text', body: `Contoh dan penalaran: ${example}` },
        {
          type: 'tip',
          body:
            unitInfo.tip ||
            'Jika bingung, kembali ke ciri atau informasi pada contoh. Jelaskan alasan pilihanmu; jawaban berbeda boleh dibahas bersama pendamping.',
        },
        { type: 'text', body: `Ayo mencoba: ${unitInfo.activity}` },
        {
          type: 'text',
          body: `Rangkuman: ${cards.map((c) => `${c.term}: ${c.meaning}`).join('; ')}.`,
        },
        {
          type: 'text',
          body: `Refleksi: apa yang sudah bisa kamu jelaskan? Bagian mana yang masih membingungkan? Tunjukkan satu contoh baru dan ceritakan alasanmu. Aktivitas praktik perlu diamati pendamping; latihan pilihan ganda hanya memeriksa sebagian pemahaman.`,
        },
      ],
    },
  }
  const raw = unitInfo.questions || conceptQuestions(cards)
  const questions = raw.map((q, i) => {
    const answers = [q.answer, ...q.distractors].map(String)
    if (new Set(answers).size !== 4) throw new Error(`Opsi tidak unik: ${id}/${i}`)
    const position = (grade + index + i) % 4
    const options = answers.slice(1)
    options.splice(position, 0, answers[0])
    return {
      id: `${id}-q${i + 1}`,
      lesson_id: id,
      prompt: q.prompt,
      options,
      correct_option: position,
      explanation: q.explanation,
      difficulty: lesson.difficulty,
      skill: q.skill || 'penerapan',
    }
  })
  return { lesson, questions }
}
