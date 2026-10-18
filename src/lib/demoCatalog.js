// Hanya diimpor provider demo; bank draf tidak masuk build Supabase.
import {
  lessons as originalLessons,
  questions as originalQuestions,
  subjects as originalSubjects,
  avatars,
} from './dummyData.js'
import { curriculumLessons, curriculumQuestions, reviewNotice } from '../content/curriculumDraft.js'
import { textbookLessons, textbookQuestions } from '../content/books/mathGrade1.js'
import { adventureLessons, adventureQuestions } from '../content/adventure/index.js'
import { decorateSubject } from './catalog.js'
export const subjects = originalSubjects.map(decorateSubject)
export const lessons = [
  ...textbookLessons,
  ...originalLessons,
  ...curriculumLessons,
  ...adventureLessons,
]
export const questions = [
  ...originalQuestions,
  ...curriculumQuestions,
  ...textbookQuestions,
  ...adventureQuestions,
]
export { avatars }
export const editorialNotice = `${reviewNotice} Contoh lama tetap tersedia untuk alur demo.`
export const getLesson = (id) => lessons.find((l) => l.id === id || l.slug === id)
export const getSubject = (id) => subjects.find((s) => s.id === id || s.slug === id)
