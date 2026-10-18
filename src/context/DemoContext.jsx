import { useEffect, useState } from 'react'
import { LearningContext, useLearning } from './LearningContext'
import {
  getLesson,
  getSubject,
  lessons,
  subjects,
  questions,
  editorialNotice,
} from '../lib/demoCatalog'
import { quizXp, scoreDemoQuiz, shuffled } from '../lib/learning'

const STORAGE_KEY = 'petualangan-ilmu:demo:v2'
const DemoContext = LearningContext
const roles = ['student', 'tutor', 'admin']
const uuid = () => crypto.randomUUID()

function initialState() {
  return {
    version: 2,
    session: null,
    profile: { id: 'demo-student', display_name: 'Nara', grade: 3, avatar: 'fox' },
    total_xp: 0,
    readLessonIds: [],
    attempts: [],
    classes: [
      {
        id: 'kelas-kebun',
        tutor_id: 'demo-tutor',
        name: 'Klub Petualang Kelas 3',
        grade: 3,
        join_code: 'ILMU03',
      },
    ],
    memberships: [],
    assignments: [
      {
        id: 'tugas-kebun',
        class_id: 'kelas-kebun',
        title: 'Perkalian di sekitarmu',
        lesson_id: 'matematika-3',
        instructions:
          'Temukan tiga kelompok benda di rumah. Tulis banyak kelompok, isi setiap kelompok, dan jumlah seluruhnya. Contoh: 3 piring berisi 2 pisang = 6 pisang.',
        due_at: new Date(Date.now() + 7 * 86_400_000).toISOString(),
      },
    ],
    submissions: [],
    rewardedSubmissionIds: [],
    importedQuestions: [],
  }
}

function loadState() {
  const fallback = initialState()
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
    if (
      !saved ||
      saved.version !== 2 ||
      !saved.profile ||
      !Number.isInteger(saved.profile.grade) ||
      saved.profile.grade < 1 ||
      saved.profile.grade > 6
    )
      return fallback
    const arrays = [
      'readLessonIds',
      'attempts',
      'classes',
      'memberships',
      'assignments',
      'submissions',
      'rewardedSubmissionIds',
      'importedQuestions',
    ]
    if (arrays.some((key) => !Array.isArray(saved[key]))) return fallback
    if (
      saved.classes.some(
        (entry) => !entry || typeof entry.id !== 'string' || typeof entry.join_code !== 'string',
      ) ||
      saved.assignments.some(
        (entry) => !entry || typeof entry.id !== 'string' || typeof entry.title !== 'string',
      ) ||
      saved.attempts.some(
        (entry) => !entry || !Array.isArray(entry.details) || !Number.isFinite(entry.score),
      )
    )
      return fallback
    return {
      ...fallback,
      ...saved,
      total_xp: Math.max(0, Number(saved.total_xp) || 0),
      profile: {
        ...fallback.profile,
        ...saved.profile,
        display_name: String(saved.profile.display_name || 'Nara').slice(0, 24),
      },
      session: roles.includes(saved.session?.role) ? saved.session : null,
    }
  } catch {
    return fallback
  }
}

export function DemoProvider({ children }) {
  const [data, setData] = useState(loadState)
  const [storageNotice, setStorageNotice] = useState('')
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      setStorageNotice('')
    } catch {
      setStorageNotice(
        'Browser tidak dapat menyimpan progres demo. Progres mungkin hilang saat halaman ditutup.',
      )
    }
  }, [data])

  function enterDemo(role = 'student', profile = {}) {
    if (!roles.includes(role)) throw new Error('Peran demo tidak dikenal.')
    setData((previous) => ({
      ...previous,
      session: {
        role,
        display_name:
          role === 'tutor'
            ? 'Kak Dita'
            : role === 'admin'
              ? 'Tim Konten'
              : String(profile.display_name || previous.profile.display_name),
      },
      profile:
        role === 'student'
          ? { ...previous.profile, ...profile, id: 'demo-student' }
          : previous.profile,
    }))
  }

  function updateProfile(profile) {
    const grade = Number(profile.grade)
    if (!Number.isInteger(grade) || grade < 1 || grade > 6) return
    setData((previous) => ({
      ...previous,
      profile: {
        ...previous.profile,
        grade,
        display_name:
          String(profile.display_name || previous.profile.display_name)
            .trim()
            .slice(0, 24) || 'Nara',
        avatar: ['fox', 'panda', 'rabbit', 'tiger'].includes(profile.avatar)
          ? profile.avatar
          : previous.profile.avatar,
      },
    }))
  }

  function completeReading(lessonId) {
    if (data.session?.role !== 'student' || !getLesson(lessonId))
      throw new Error('Masuk ke demo siswa untuk menyelesaikan materi.')
    setData((previous) =>
      previous.readLessonIds.includes(lessonId)
        ? previous
        : {
            ...previous,
            readLessonIds: [...previous.readLessonIds, lessonId],
            total_xp: previous.total_xp + 5,
          },
    )
  }

  function submitQuiz(attemptId, lessonId, questionIds, answers) {
    if (data.session?.role !== 'student') throw new Error('Latihan tersedia untuk demo siswa.')
    if (data.attempts.some((attempt) => attempt.id === attemptId)) return attemptId
    const allQuestions = [...questions, ...data.importedQuestions]
    if (!getLesson(lessonId) || new Set(questionIds).size !== questionIds.length)
      throw new Error('Sesi latihan tidak valid.')
    const selected = questionIds.map((id) =>
      allQuestions.find((question) => question.id === id && question.lesson_id === lessonId),
    )
    if (selected.some((question) => !question)) throw new Error('Soal latihan tidak ditemukan.')
    const result = scoreDemoQuiz(selected, answers)
    setData((previous) => {
      if (previous.attempts.some((attempt) => attempt.id === attemptId)) return previous
      const xp = quizXp(result, previous.attempts, lessonId)
      const first = !previous.attempts.some((attempt) => attempt.lesson_id === lessonId)
      const attempt = {
        ...result,
        id: attemptId,
        lesson_id: lessonId,
        xp_earned: xp,
        reward_type: first ? 'first_quiz' : xp === 3 ? 'remedial' : 'practice',
        created_at: new Date().toISOString(),
      }
      return {
        ...previous,
        attempts: [...previous.attempts, attempt],
        total_xp: previous.total_xp + xp,
      }
    })
    return attemptId
  }

  function joinClass(rawCode) {
    if (data.session?.role !== 'student') throw new Error('Gunakan demo siswa untuk bergabung.')
    const classroom = data.classes.find((entry) => entry.join_code === rawCode.trim().toUpperCase())
    if (!classroom) throw new Error('Kode belum ditemukan. Coba kode contoh ILMU03.')
    if (classroom.grade !== data.profile.grade)
      throw new Error(
        `Kelas ini untuk kelas ${classroom.grade}. Pilih tingkat yang sesuai pada profil demo.`,
      )
    setData((previous) =>
      previous.memberships.includes(classroom.id)
        ? previous
        : { ...previous, memberships: [...previous.memberships, classroom.id] },
    )
    return classroom
  }

  function createClass(name, grade) {
    if (data.session?.role !== 'tutor') throw new Error('Gunakan demo tutor.')
    if (
      !name.trim() ||
      name.trim().length > 80 ||
      !Number.isInteger(Number(grade)) ||
      Number(grade) < 1 ||
      Number(grade) > 6
    )
      throw new Error('Isi nama kelas dan tingkat 1–6.')
    const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
    let code
    do {
      code = Array.from(
        crypto.getRandomValues(new Uint8Array(6)),
        (value) => alphabet[value % alphabet.length],
      ).join('')
    } while (data.classes.some((entry) => entry.join_code === code))
    const classroom = {
      id: uuid(),
      tutor_id: 'demo-tutor',
      name: name.trim(),
      grade: Number(grade),
      join_code: code,
    }
    setData((previous) => ({ ...previous, classes: [...previous.classes, classroom] }))
    return classroom
  }

  function createAssignment(assignment) {
    if (data.session?.role !== 'tutor') throw new Error('Gunakan demo tutor.')
    const classroom = data.classes.find(
      (entry) => entry.id === assignment.class_id && entry.tutor_id === 'demo-tutor',
    )
    const lesson = getLesson(assignment.lesson_id)
    if (!classroom || !lesson || lesson.grade !== classroom.grade)
      throw new Error('Pilih kelas dan materi dengan tingkat yang sama.')
    if (
      !assignment.title.trim() ||
      !assignment.instructions.trim() ||
      !Number.isFinite(Date.parse(assignment.due_at))
    )
      throw new Error('Judul, instruksi, dan tenggat wajib diisi.')
    setData((previous) => ({
      ...previous,
      assignments: [
        ...previous.assignments,
        {
          ...assignment,
          id: uuid(),
          title: assignment.title.trim(),
          instructions: assignment.instructions.trim(),
        },
      ],
    }))
  }

  function submitAssignment(assignmentId, answer) {
    const assignment = data.assignments.find((entry) => entry.id === assignmentId)
    if (
      data.session?.role !== 'student' ||
      !assignment ||
      !data.memberships.includes(assignment.class_id)
    )
      throw new Error('Gabung kelas terlebih dahulu.')
    if (!answer.trim() || answer.length > 3000)
      throw new Error('Jawaban wajib diisi, maksimal 3.000 karakter.')
    if (new Date(assignment.due_at).getTime() < Date.now())
      throw new Error('Tenggat tugas sudah lewat. Hubungi kakak tutor.')
    const existing = data.submissions.find((entry) => entry.assignment_id === assignmentId)
    if (existing?.score !== null && existing?.score !== undefined)
      throw new Error('Tugas sudah dinilai. Jawaban tidak dapat diubah.')
    setData((previous) => ({
      ...previous,
      submissions: [
        ...previous.submissions.filter((entry) => entry.assignment_id !== assignmentId),
        {
          id: existing?.id || uuid(),
          assignment_id: assignmentId,
          student_id: 'demo-student',
          answer: answer.trim(),
          score: null,
          feedback: '',
          submitted_at: new Date().toISOString(),
        },
      ],
    }))
  }

  function gradeSubmission(submissionId, score, feedback) {
    const submission = data.submissions.find((entry) => entry.id === submissionId)
    const assignment = data.assignments.find((entry) => entry.id === submission?.assignment_id)
    if (
      data.session?.role !== 'tutor' ||
      !data.classes.some(
        (entry) => entry.id === assignment?.class_id && entry.tutor_id === 'demo-tutor',
      )
    )
      throw new Error('Kiriman tidak tersedia untuk tutor ini.')
    if (
      String(score).trim() === '' ||
      !Number.isFinite(Number(score)) ||
      Number(score) < 0 ||
      Number(score) > 100 ||
      !feedback.trim()
    )
      throw new Error('Isi nilai 0–100 dan komentar penyemangat.')
    setData((previous) => {
      const rewarded = previous.rewardedSubmissionIds.includes(submissionId)
      return {
        ...previous,
        total_xp: previous.total_xp + (rewarded ? 0 : 15),
        rewardedSubmissionIds: rewarded
          ? previous.rewardedSubmissionIds
          : [...previous.rewardedSubmissionIds, submissionId],
        submissions: previous.submissions.map((entry) =>
          entry.id === submissionId
            ? { ...entry, score: Number(score), feedback: feedback.trim() }
            : entry,
        ),
      }
    })
  }

  function importQuestions(items) {
    if (data.session?.role !== 'admin' || !items.length)
      throw new Error('Validasi soal sebagai admin terlebih dahulu.')
    // ID lokal sengaja berbeda dari UUID database: ini demonstrasi, bukan impor produksi.
    const additions = items.map((item) => ({ ...item, id: `import-${uuid()}` }))
    setData((previous) => ({
      ...previous,
      importedQuestions: [...previous.importedQuestions, ...additions],
    }))
  }

  return (
    <DemoContext.Provider
      value={{
        ...data,
        mode: 'demo',
        loading: false,
        lessons,
        subjects,
        getLesson,
        getSubject,
        editorialNotice,
        questionCount: questions.length + data.importedQuestions.length,
        importedCount: data.importedQuestions.length,
        students: data.memberships.map((class_id) => ({ ...data.profile, class_id })),
        startQuiz: (lessonId) => ({
          attempt_id: uuid(),
          questions: shuffled(
            [...questions, ...data.importedQuestions].filter((q) => q.lesson_id === lessonId),
          )
            .slice(0, 10)
            .map(({ id, prompt, options }) => ({ id, prompt, options })),
        }),
        fetchQuizResult: (id) => data.attempts.find((attempt) => attempt.id === id),
        storageNotice,
        enterDemo,
        updateProfile,
        completeReading,
        submitQuiz,
        joinClass,
        createClass,
        createAssignment,
        submitAssignment,
        gradeSubmission,
        importQuestions,
        logout: () => setData((previous) => ({ ...previous, session: null })),
      }}
    >
      {children}
    </DemoContext.Provider>
  )
}

export function useDemo() {
  return useLearning()
}
