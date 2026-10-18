import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react'
import { Button, EmptyState, LinkButton, Notice, Tag } from '../../components/ui/Primitives'
import { useLearning } from '../../context/LearningContext'

export default function QuizRoute() {
  const { lessonId } = useParams()
  return <QuizPage key={lessonId} lessonId={lessonId} />
}

function QuizPage({ lessonId }) {
  const { getLesson, startQuiz, submitQuiz, mode } = useLearning()
  const lesson = getLesson(lessonId)
  const [quiz, setQuiz] = useState([])
  const [attemptId, setAttemptId] = useState('')
  const [loading, setLoading] = useState(true)
  const [retry, setRetry] = useState(0)
  const start = useRef(startQuiz)
  useEffect(() => {
    let active = true
    setLoading(true)
    setError('')
    Promise.resolve()
      .then(() => start.current(lessonId))
      .then((session) => {
        if (active) {
          setQuiz(session.questions)
          setAttemptId(session.attempt_id)
        }
      })
      .catch((err) => {
        if (active) setError(err.message)
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [lessonId, retry])
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [error, setError] = useState('')
  const submitted = useRef(false)
  const [busy, setBusy] = useState(false)
  const navigate = useNavigate()
  if (loading) return <p role="status">Menyiapkan latihanmu…</p>
  if (error && !quiz.length)
    return (
      <>
        <Notice error>{error}</Notice>
        <Button onClick={() => setRetry((n) => n + 1)}>Coba lagi</Button>
        <LinkButton to="/student">Kembali ke peta</LinkButton>
      </>
    )
  if (!lesson || quiz.length < 5)
    return (
      <EmptyState
        title="Latihan belum tersedia"
        action={<LinkButton to="/student">Kembali ke peta</LinkButton>}
      >
        Kita butuh minimal lima soal. Pilih materi lainnya dulu, ya.
      </EmptyState>
    )
  const question = quiz[index]
  const answered = Object.keys(answers).length
  const last = index === quiz.length - 1
  async function collect() {
    if (submitted.current) return
    const missing = quiz.findIndex((item) => answers[item.id] === undefined)
    if (missing !== -1) {
      setIndex(missing)
      setError('Masih ada soal yang belum dijawab. Coba dulu, tidak apa-apa jika belum yakin.')
      return
    }
    try {
      submitted.current = true
      setBusy(true)
      await submitQuiz(
        attemptId,
        lessonId,
        quiz.map((item) => item.id),
        answers,
      )
      navigate(`/student/quiz/${lessonId}/result/${attemptId}`, { replace: true })
    } catch (err) {
      submitted.current = false
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }
  return (
    <div className="quiz-layout">
      <Link to={`/student/lesson/${lesson.slug}`} className="back-link">
        <ArrowLeft size={17} />
        Kembali ke materi
      </Link>
      <div className="quiz-header">
        <Tag color="peach">
          <Sparkles size={14} /> TANTANGAN KECIL
        </Tag>
        <h1>{lesson.title}</h1>
        <p className="muted">Tanpa hitung mundur. Ambil waktumu dan coba yang terbaik.</p>
      </div>
      <div className="quiz-progress">
        <div className="row between">
          <strong>
            Soal {index + 1} dari {quiz.length}
          </strong>
          <span>{answered} terjawab</span>
        </div>
        <div className="xp-track">
          <span style={{ width: `${(answered / quiz.length) * 100}%` }} />
        </div>
      </div>
      <article className="quiz-question">
        <span className="question-number">{String(index + 1).padStart(2, '0')}</span>
        <fieldset>
          <legend>{question.prompt}</legend>
          <div className="quiz-options">
            {question.options.map((option, optionIndex) => (
              <label
                className={`quiz-option ${answers[question.id] === optionIndex ? 'selected' : ''}`}
                key={optionIndex}
              >
                <input
                  type="radio"
                  name={question.id}
                  value={optionIndex}
                  checked={answers[question.id] === optionIndex}
                  onChange={() => {
                    setAnswers((previous) => ({ ...previous, [question.id]: optionIndex }))
                    setError('')
                  }}
                />
                <span className="option-letter" aria-hidden="true">
                  {'ABCD'[optionIndex]}
                </span>
                <span>{option}</span>
                {answers[question.id] === optionIndex && <Check size={19} aria-hidden="true" />}
              </label>
            ))}
          </div>
        </fieldset>
        {error && <Notice error>{error}</Notice>}
        <div className="quiz-controls">
          <Button variant="secondary" disabled={index === 0} onClick={() => setIndex(index - 1)}>
            <ArrowLeft size={16} />
            Sebelumnya
          </Button>
          {last ? (
            <Button onClick={collect} disabled={busy}>
              Kumpulkan latihan <CheckCircle2 size={17} />
            </Button>
          ) : (
            <Button onClick={() => setIndex(index + 1)}>
              Selanjutnya
              <ArrowRight size={17} />
            </Button>
          )}
        </div>
      </article>
      <div className="question-dots" aria-label="Pindah soal">
        {quiz.map((item, itemIndex) => (
          <button
            key={item.id}
            aria-label={`Soal ${itemIndex + 1}${answers[item.id] !== undefined ? ', sudah dijawab' : ''}`}
            aria-current={index === itemIndex ? 'step' : undefined}
            className={`${answers[item.id] !== undefined ? 'answered' : ''} ${index === itemIndex ? 'current' : ''}`}
            onClick={() => setIndex(itemIndex)}
          >
            {itemIndex + 1}
          </button>
        ))}
      </div>
      <p className="small muted center">
        {mode === 'demo'
          ? 'Latihan demo dinilai di browser. Penilaian server menyusul setelah Supabase terhubung.'
          : 'Jawaban dinilai oleh server. Sesi berlaku 24 jam; buka ulang latihan jika sesi kedaluwarsa.'}
      </p>
    </div>
  )
}

export function QuizResultPage() {
  const { lessonId, attemptId } = useParams()
  const { attempts, getLesson, fetchQuizResult, mode } = useLearning()
  const cached = attempts.find(
    (entry) => entry.id === attemptId && entry.lesson_id === lessonId && entry.details,
  )
  const [remote, setRemote] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(!cached)
  const fetch = useRef(fetchQuizResult)
  useEffect(() => {
    if (cached) {
      setLoading(false)
      return
    }
    let active = true
    setLoading(true)
    setRemote(null)
    setError('')
    Promise.resolve()
      .then(() => fetch.current(attemptId))
      .then((result) => {
        if (active && result?.lesson_id === lessonId) setRemote(result)
      })
      .catch((err) => {
        if (active) setError(err.message)
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [attemptId, lessonId, cached])
  const attempt = cached || remote
  const lesson = getLesson(lessonId)
  if (loading) return <p role="status">Memuat pembahasan…</p>
  if (error)
    return (
      <>
        <Notice error>{error}</Notice>
        <LinkButton to="/student/progress">Kembali ke progres</LinkButton>
      </>
    )
  if (!attempt || !lesson)
    return (
      <EmptyState
        title="Hasil latihan belum ditemukan"
        action={<LinkButton to="/student">Kembali ke peta</LinkButton>}
      >
        {mode === 'demo'
          ? 'Hasil demo hanya tersedia di browser tempat kamu mengerjakannya.'
          : 'Hasil hanya tersedia untuk akun yang mengerjakan latihan ini.'}
      </EmptyState>
    )
  return (
    <div className="result-layout">
      <section className="result-hero">
        <span className="result-celebration" aria-hidden="true">
          🌟
        </span>
        <Tag color="mint">SATU LANGKAH LAGI BERTUMBUH</Tag>
        <h1>{attempt.score >= 60 ? 'Usahamu membuahkan hasil!' : 'Terima kasih sudah mencoba!'}</h1>
        <p>
          {attempt.score >= 60
            ? 'Ada pengetahuan baru yang kamu bawa pulang hari ini.'
            : 'Belum semua tepat? Yuk, baca pembahasannya. Kita belajar bersama.'}
        </p>
        <div className="result-stats">
          <div>
            <strong>
              {attempt.score}
              <small>/100</small>
            </strong>
            <span>Nilai latihan</span>
          </div>
          <div>
            <strong>
              {attempt.correct_count}
              <small>/{attempt.total_questions}</small>
            </strong>
            <span>Jawaban tepat</span>
          </div>
          <div>
            <strong>
              +{attempt.xp_earned}
              <small> XP</small>
            </strong>
            <span>{mode === 'demo' ? 'Hadiah usaha demo' : 'Hadiah percobaan ini'}</span>
          </div>
        </div>
        <div className="row center wrap gap-sm">
          <LinkButton to="/student">
            Kembali ke peta
            <ArrowRight size={17} />
          </LinkButton>
          <LinkButton to={`/student/quiz/${lessonId}`} variant="secondary">
            <RotateCcw size={16} />
            Latihan lagi
          </LinkButton>
        </div>
        <p className="small muted">
          XP untuk konsistensi. Nilai untuk melihat pemahaman. Keduanya berbeda.
        </p>
      </section>
      <section className="review-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">YUK, PAHAMI BERSAMA</p>
            <h2>Pembahasan latihan</h2>
          </div>
          <span className="small muted">{lesson.title}</span>
        </div>
        {attempt.details.map((detail, index) => (
          <article
            className={`review-card ${detail.is_correct ? 'review-correct' : 'review-learn'}`}
            key={detail.question_id}
          >
            <div className="row between">
              <Tag color={detail.is_correct ? 'mint' : 'peach'}>
                {detail.is_correct ? 'Sudah tepat' : 'Ayo pelajari lagi'}
              </Tag>
              <span className="small muted">Soal {index + 1}</span>
            </div>
            <h3>{detail.prompt}</h3>
            <p className="answer-line">
              Jawabanmu:{' '}
              <strong>
                {'ABCD'[detail.selected_option]}. {detail.options[detail.selected_option]}
              </strong>
            </p>
            {!detail.is_correct && (
              <p className="answer-line">
                Jawaban tepat:{' '}
                <strong>
                  {'ABCD'[detail.correct_option]}. {detail.options[detail.correct_option]}
                </strong>
              </p>
            )}
            <div className="review-explanation">
              <BookIcon />
              {detail.explanation}
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}
function BookIcon() {
  return <span aria-hidden="true">💡</span>
}
