import { useState } from 'react'
import { BookOpen, Check, ClipboardList, Plus, Users } from 'lucide-react'
import {
  Button,
  EmptyState,
  Field,
  LinkButton,
  formatDate,
  Notice,
  PageHeading,
  Tag,
} from '../../components/ui/Primitives'
import { useLearning } from '../../context/LearningContext'
import ContentStudio from '../../components/ContentStudio'
import SubmissionFile from '../../components/ui/SubmissionFile'

export default function TutorPage() {
  const demo = useLearning()
  const { lessons, mode } = demo
  const [className, setClassName] = useState('')
  const [grade, setGrade] = useState(3)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [assignmentClass, setAssignmentClass] = useState(demo.classes[0]?.id || '')
  const currentClass = demo.classes.find((item) => item.id === assignmentClass)
  const [title, setTitle] = useState('')
  const [instructions, setInstructions] = useState('')
  const [lessonId, setLessonId] = useState('')
  const [due, setDue] = useState(new Date(Date.now() + 7 * 86_400_000).toISOString().slice(0, 10))
  async function action(task) {
    if (busy) return
    setBusy(true)
    setError('')
    setMessage('')
    try {
      setMessage(await task())
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }
  const filteredLessons = lessons.filter(
    (lesson) =>
      lesson.grade === currentClass?.grade && (mode === 'demo' || lesson.status === 'published'),
  )
  return (
    <>
      <PageHeading eyebrow="RUANG KAKAK TUTOR" title="Temani setiap langkah kecil.">
        Rancang latihan bermakna dan berikan umpan balik yang menguatkan.
      </PageHeading>
      <p>
        <LinkButton to="/sumber-belajar" variant="secondary">
          Buku resmi & kerangka materi
        </LinkButton>
      </p>
      <Notice>
        {mode === 'demo'
          ? 'Simulasi tutor pada browser ini. Buat kelas, lalu pilih demo siswa untuk mencoba bergabung dan mengirim tugas.'
          : 'Bagikan kode kelas hanya kepada siswa yang Anda dampingi. Berikan komentar yang jelas dan ramah.'}
      </Notice>
      <div className="stat-grid">
        <div className="stat-card">
          <span className="stat-icon tone-mint">
            <Users size={22} />
          </span>
          <div>
            <strong>{demo.classes.length}</strong>
            <span>{mode === 'demo' ? 'Kelas demo' : 'Kelas didampingi'}</span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon tone-peach">
            <ClipboardList size={22} />
          </span>
          <div>
            <strong>{demo.assignments.length}</strong>
            <span>Tugas dibuat</span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon tone-lavender">
            <BookOpen size={22} />
          </span>
          <div>
            <strong>
              {demo.submissions.filter((submission) => submission.score === null).length}
            </strong>
            <span>Menunggu umpan balik</span>
          </div>
        </div>
      </div>
      {message && <Notice>{message}</Notice>}
      {error && <Notice error>{error}</Notice>}
      <div className="tutor-grid">
        <section className="panel">
          <h2>Buat ruang belajar</h2>
          <form
            onSubmit={(event) => {
              event.preventDefault()
              action(async () => {
                const classroom = await demo.createClass(className, grade)
                setClassName('')
                setAssignmentClass(classroom.id)
                return `Kelas dibuat. Bagikan kode ${classroom.join_code}.`
              })
            }}
          >
            <Field label="Nama kelas">
              <input
                value={className}
                onChange={(event) => setClassName(event.target.value)}
                maxLength={80}
                required
                placeholder="Contoh: Klub Penjelajah Angka"
              />
            </Field>
            <Field label="Tingkat kelas">
              <select value={grade} onChange={(event) => setGrade(Number(event.target.value))}>
                {[1, 2, 3, 4, 5, 6].map((value) => (
                  <option key={value} value={value}>
                    Kelas {value}
                  </option>
                ))}
              </select>
            </Field>
            <Button type="submit" disabled={busy}>
              <Plus size={17} />
              {mode === 'demo' ? 'Buat kelas demo' : 'Buat kelas'}
            </Button>
          </form>
        </section>
        <section className="panel">
          <h2>Kelas yang didampingi</h2>
          <div className="tutor-class-list">
            {demo.classes.map((classroom) => (
              <article key={classroom.id}>
                <div className="row between">
                  <h3>{classroom.name}</h3>
                  <Tag>Kelas {classroom.grade}</Tag>
                </div>
                <p className="small muted">
                  {demo.students
                    .filter((s) => s.class_id === classroom.id)
                    .map(
                      (s) =>
                        s.display_name +
                        (s.average_score != null ? ' · rata-rata ' + s.average_score : ''),
                    )
                    .join(', ') || 'Belum ada anggota'}
                </p>
                <div className="class-code">
                  <span>KODE GABUNG</span>
                  <strong>{classroom.join_code}</strong>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
      <section className="panel assignment-creator">
        <div className="section-heading">
          <div>
            <p className="eyebrow">TANTANGAN YANG BERMAKNA</p>
            <h2>Buat tugas kecil</h2>
          </div>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            action(async () => {
              await demo.createAssignment({
                class_id: assignmentClass,
                title,
                instructions,
                lesson_id: lessonId || filteredLessons[0]?.id,
                due_at: `${due}T16:59:59.000Z`,
              })
              setTitle('')
              setInstructions('')
              return mode === 'demo'
                ? 'Tugas demo tersimpan dan tersedia bagi siswa yang bergabung.'
                : 'Tugas tersimpan dan tersedia bagi anggota kelas.'
            })
          }}
        >
          <div className="form-grid">
            <Field label="Untuk kelas">
              <select
                value={assignmentClass}
                onChange={(event) => {
                  setAssignmentClass(event.target.value)
                  setLessonId('')
                }}
                required
              >
                {demo.classes.map((classroom) => (
                  <option key={classroom.id} value={classroom.id}>
                    {classroom.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Materi pendamping">
              <select
                value={lessonId || filteredLessons[0]?.id || ''}
                onChange={(event) => setLessonId(event.target.value)}
                required
              >
                {filteredLessons.map((lesson) => (
                  <option key={lesson.id} value={lesson.id}>
                    {lesson.title}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <div className="form-grid">
            <Field label="Judul tugas">
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                maxLength={120}
                required
                placeholder="Contoh: Temukan pola di rumah"
              />
            </Field>
            <Field label="Tenggat (akhir hari WIB)">
              <input
                type="date"
                value={due}
                onChange={(event) => setDue(event.target.value)}
                required
                min={new Date().toISOString().slice(0, 10)}
              />
            </Field>
          </div>
          <Field label="Instruksi yang jelas dan ramah">
            <textarea
              value={instructions}
              onChange={(event) => setInstructions(event.target.value)}
              maxLength={3000}
              rows={3}
              required
              placeholder="Apa yang perlu anak amati, lakukan, dan ceritakan?"
            />
          </Field>
          <Button type="submit" disabled={busy}>
            <Plus size={17} />
            {mode === 'demo' ? 'Simpan tugas demo' : 'Simpan tugas'}
          </Button>
        </form>
      </section>
      <section className="history-section">
        <div className="section-heading">
          <div>
            <h2>Waktunya memberi semangat</h2>
            <p className="muted">
              Umpan balik membantu anak tahu apa yang sudah baik dan langkah selanjutnya.
            </p>
          </div>
        </div>
        {demo.submissions.length ? (
          demo.submissions.map((submission) => (
            <GradeCard
              key={submission.id}
              submission={submission}
              assignment={demo.assignments.find(
                (assignment) => assignment.id === submission.assignment_id,
              )}
              student={
                demo.students.find((s) => s.id === submission.student_id)?.display_name || 'Siswa'
              }
              gradeSubmission={demo.gradeSubmission}
            />
          ))
        ) : (
          <EmptyState title="Belum ada jawaban yang dikirim">
            {mode === 'demo'
              ? 'Coba masuk sebagai siswa, gabung ILMU03, lalu kumpulkan tugas. Kiriman akan muncul di sini pada browser yang sama.'
              : 'Kiriman anggota kelas akan muncul setelah tugas dikumpulkan.'}
          </EmptyState>
        )}
      </section>
      <section className="panel">
        <h2>Tugas yang sudah dibuat</h2>
        {demo.assignments.map((assignment) => (
          <div className="assignment-summary" key={assignment.id}>
            <div>
              <h3>{assignment.title}</h3>
              <p>{demo.classes.find((classroom) => classroom.id === assignment.class_id)?.name}</p>
            </div>
            <span className="small muted">{formatDate(assignment.due_at)}</span>
          </div>
        ))}
      </section>
      {mode === 'supabase' && <ContentStudio />}
    </>
  )
}

function GradeCard({ submission, assignment, student, gradeSubmission }) {
  const { mode } = useLearning()
  const [busy, setBusy] = useState(false)
  const [score, setScore] = useState(submission.score ?? '')
  const [feedback, setFeedback] = useState(submission.feedback || '')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  return (
    <article className="panel grade-card">
      <Tag color={submission.score === null ? 'peach' : 'mint'}>
        {submission.score === null ? 'Belum dinilai' : 'Sudah diberi umpan balik'}
      </Tag>
      <h3>{assignment?.title}</h3>
      <p className="small muted">
        {student} · {formatDate(submission.submitted_at)}
      </p>
      <blockquote className="preserve-lines">{submission.answer}</blockquote>
      {submission.file_path && <SubmissionFile path={submission.file_path} />}
      <form
        onSubmit={async (event) => {
          event.preventDefault()
          setError('')
          setMessage('')
          if (busy) return
          setBusy(true)
          try {
            await gradeSubmission(submission.id, score, feedback)
            setMessage('Nilai dan komentar tersimpan. Hadiah tugas hanya diberikan satu kali.')
          } catch (err) {
            setError(err.message)
          } finally {
            setBusy(false)
          }
        }}
      >
        <div className="grade-fields">
          <Field label="Nilai 0–100">
            <input
              type="number"
              min={0}
              max={100}
              value={score}
              onChange={(event) => setScore(event.target.value)}
              required
            />
          </Field>
          <Field label="Komentar penyemangat">
            <textarea
              value={feedback}
              onChange={(event) => setFeedback(event.target.value)}
              maxLength={2000}
              rows={2}
              placeholder="Kamu sudah … Langkah berikutnya, coba …"
              required
            />
          </Field>
        </div>
        {error && <Notice error>{error}</Notice>}
        {message && <Notice>{message}</Notice>}
        <Button type="submit" disabled={busy}>
          <Check size={17} />
          {mode === 'demo' ? 'Simpan umpan balik demo' : 'Simpan umpan balik'}
        </Button>
      </form>
    </article>
  )
}
