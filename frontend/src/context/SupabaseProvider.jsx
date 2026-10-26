import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { LearningContext } from './LearningContext'
import { getSupabaseClient } from '../lib/supabaseClient'
import { createSupabaseService } from '../services/supabaseService'
import { Button, Notice } from '../components/ui/Primitives'

export default function SupabaseProvider({ children, client: injectedClient }) {
  const client = useMemo(() => injectedClient || getSupabaseClient(), [injectedClient])
  const service = useMemo(() => createSupabaseService(client), [client])
  const [authSession, setAuthSession] = useState(null)
  const [ready, setReady] = useState(false)
  const [loading, setLoading] = useState(true)
  const [state, setState] = useState(null)
  const [error, setError] = useState('')
  const [recovery, setRecovery] = useState(false)
  const [importedCount, setImportedCount] = useState(0)
  const userRef = useRef(null)
  const generation = useRef(0)
  const refresh = useCallback(async () => {
    const user = userRef.current
    const id = ++generation.current
    try {
      const next = await service.loadSnapshot(user)
      if (generation.current === id) {
        setState(next)
        setError('')
      }
      return next
    } catch (err) {
      if (generation.current === id) setError(err.message)
      throw err
    }
  }, [service])
  useEffect(() => {
    let active = true
    let events = 0
    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((event, session) => {
      if (!active) return
      events += 1
      // Tidak ada await/panggilan Supabase di callback Auth: hindari kunci sesi bersarang.
      const changed = userRef.current?.id !== session?.user?.id
      userRef.current = session?.user || null
      if (changed) {
        generation.current += 1
        setLoading(true)
        setState(null)
        setImportedCount(0)
      }
      setAuthSession(session)
      setReady(true)
      if (event === 'PASSWORD_RECOVERY') setRecovery(true)
      if (event === 'SIGNED_OUT') setRecovery(false)
    })
    const atStart = events
    client.auth
      .getSession()
      .then(({ data, error: authError }) => {
        if (!active || events !== atStart) return
        if (authError) setError(authError.message)
        userRef.current = data?.session?.user || null
        setAuthSession(data?.session || null)
        setReady(true)
      })
      .catch((err) => {
        if (active) {
          setError(err.message)
          setReady(true)
        }
      })
    return () => {
      active = false
      generation.current += 1
      subscription.unsubscribe()
    }
  }, [client])
  useEffect(() => {
    if (!ready) return
    let active = true
    refresh()
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [ready, authSession, refresh])
  useEffect(() => {
    const resume = () => {
      if (document.visibilityState === 'visible') refresh().catch(() => {})
    }
    document.addEventListener('visibilitychange', resume)
    window.addEventListener('online', resume)
    return () => {
      document.removeEventListener('visibilitychange', resume)
      window.removeEventListener('online', resume)
    }
  }, [refresh])
  async function mutate(task) {
    const actor = userRef.current?.id
    // Mutasi yang sudah berhasil tidak diulang bila hanya pemuatan ulang yang gagal.
    try {
      const result = await task()
      if (userRef.current?.id === actor) await refresh().catch(() => {})
      return result
    } catch (err) {
      if (userRef.current?.id === actor) setError(err.message)
      throw err
    }
  }
  if (loading || !ready)
    return (
      <main className="standalone" role="status">
        <h1>Menyiapkan petualanganmu…</h1>
        <p>Sedang menghubungkan akun dan materi belajar.</p>
      </main>
    )
  if (!state)
    return (
      <main className="standalone">
        <h1>Data belum dapat dimuat</h1>
        <Notice error>{error || 'Periksa koneksi dan konfigurasi Supabase.'}</Notice>
        <Button
          onClick={() => {
            setLoading(true)
            refresh()
              .catch(() => {})
              .finally(() => setLoading(false))
          }}
        >
          Coba lagi
        </Button>
      </main>
    )
  const value = {
    ...state,
    mode: 'supabase',
    loading: false,
    recovery,
    storageNotice: error,
    importedCount,
    editorialNotice: '',
    profile: state.profile || { display_name: '', grade: 1, avatar: 'fox' },
    getLesson: (id) => state.lessons.find((l) => l.id === id || l.slug === id),
    getSubject: (id) => state.subjects.find((s) => s.id === id || s.slug === id),
    refresh,
    signIn: service.signIn,
    signUp: service.signUp,
    logout: async () => {
      try {
        await service.signOut()
      } catch (err) {
        setError(err.message)
        throw err
      }
      userRef.current = null
      generation.current += 1
      setAuthSession(null)
      setState(null)
      setLoading(true)
    },
    updateProfile: (profile) =>
      mutate(() => service.updateProfile(userRef.current.id, { ...state.profile, ...profile })),
    completeReading: (id) => mutate(() => service.completeReading(id)),
    startQuiz: service.startQuiz,
    submitQuiz: async (attemptId, lessonId, ids, answers) => {
      const actor = userRef.current?.id
      const result = await service.submitQuiz(
        attemptId,
        ids.map((id) => ({ question_id: id, selected_option: answers[id] })),
      )
      if (userRef.current?.id !== actor)
        throw new Error('Akun telah berubah. Buka hasil melalui akun yang mengerjakan.')
      await refresh().catch(() => {})
      setState((previous) =>
        previous?.session?.user_id === actor
          ? {
              ...previous,
              attempts: [
                ...previous.attempts.filter((a) => a.id !== attemptId),
                { ...result, id: attemptId, created_at: new Date().toISOString() },
              ],
            }
          : previous,
      )
      return attemptId
    },
    fetchQuizResult: async (id) => {
      const result = await service.getQuizResult(id)
      return { ...result, id }
    },
    joinClass: (code) => mutate(() => service.joinClass(code)),
    createClass: (name, grade) => mutate(() => service.createClass(name, grade)),
    createAssignment: (assignment) => mutate(() => service.createAssignment(assignment)),
    submitAssignment: (id, answer, filePath) =>
      mutate(() => service.submitAssignment(id, answer, filePath)),
    gradeSubmission: (id, score, feedback) =>
      mutate(() => service.gradeSubmission(id, score, feedback)),
    importQuestions: async (items, batchId = crypto.randomUUID()) => {
      const count = await mutate(() => service.importQuestions(items, batchId))
      setImportedCount((n) => n + count)
      return count
    },
    saveLesson: (document, id) => mutate(() => service.saveLesson(document, id)),
    editorQuestions: service.editorQuestions,
    saveDraftQuestion: (item) => mutate(() => service.saveDraftQuestion(item)),
    publishLesson: (id, published, confirmed) =>
      mutate(() => service.publishLesson(id, published, confirmed)),
    promoteTutor: (id) => mutate(() => service.promoteTutor(id)),
    saveSubject: (s) => mutate(() => service.saveSubject(s)),
    requestDeletion: () => mutate(service.requestDeletion),
    resetPassword: service.resetPassword,
    updatePassword: async (password) => {
      await service.updatePassword(password)
      setRecovery(false)
    },
    uploadFile: (assignmentId, file) => service.uploadFile(userRef.current.id, assignmentId, file),
    removeFile: service.removeFile,
    signedFile: service.signedFile,
  }
  return <LearningContext.Provider value={value}>{children}</LearningContext.Provider>
}
