import { curriculumPlan, curriculumSources, learningResources } from '../lib/learningResources.js'
import { mathUnits } from './math.js'
import { mathGuidance } from './mathGuidance.js'
import { indonesianUnits } from './indonesian.js'
import { scienceUnits } from './science.js'
import { civicsUnits } from './civics.js'
import { englishUnits } from './english.js'
import { artsUnits } from './arts.js'
import { buildLesson, reviewNotice } from './lessonFactory.js'

const authored = {
  matematika: mathUnits,
  'bahasa-indonesia': indonesianUnits,
  ipas: scienceUnits,
  pancasila: civicsUnits,
  'bahasa-inggris': englishUnits,
  'seni-budaya': artsUnits,
}
export const curriculumLessons = []
export const curriculumQuestions = []
for (const plan of curriculumPlan) {
  const units = authored[plan.subject]?.[plan.grade - 1]
  if (units?.length !== plan.units.length) throw new Error(`Jumlah materi belum cocok: ${plan.id}`)
  const books = learningResources.filter(
    (r) => r.subject === plan.subject && r.grade === plan.grade,
  )
  const refs = books.map(({ title, url, audience }) => ({
    title,
    url,
    audience,
    usage: 'Bacaan pendamping; bukan salinan atau adaptasi halaman tertentu.',
  }))
  if (!refs.length)
    refs.push({
      title: 'Panduan mata pelajaran untuk pendamping',
      url: curriculumSources.find((s) => s.id === 'guidance').url,
      usage: 'Acuan pendamping; pengayaan Fase A bukan klaim CP mapel wajib.',
    })
  units.forEach((unit, index) => {
    if (unit.cards.length !== 5)
      throw new Error(`Butuh lima konsep terisi: ${plan.id}/${index + 1}`)
    const prepared =
      plan.subject === 'matematika'
        ? { ...unit, workedExample: mathGuidance[plan.grade - 1][index] }
        : unit
    const { lesson, questions } = buildLesson(plan, prepared, index, refs)
    curriculumLessons.push(lesson)
    curriculumQuestions.push(...questions)
  })
}
export { reviewNotice }
