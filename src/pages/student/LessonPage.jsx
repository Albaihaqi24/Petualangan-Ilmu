import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Clock3, Star } from 'lucide-react'
import MaterialRenderer from '../../components/ui/MaterialRenderer'
import { Button, LinkButton, Notice, SubjectIcon, Tag } from '../../components/ui/Primitives'
import { useLearning } from '../../context/LearningContext'
import { findTextbook } from '../../lib/textbooks'
import CpReferencePanel from '../../components/ui/CpReferencePanel'
import { findAdventureCourse } from '../../lib/adventureCourseCatalog'

export default function LessonPage() {
  const { slug } = useParams()
  const { readLessonIds, completeReading, getLesson, getSubject, editorialNotice, mode } =
    useLearning()
  const lesson = getLesson(slug)
  const navigate = useNavigate()
  const [error, setError] = useState('')
  if (!lesson)
    return (
      <div className="panel">
        <h1>Materi belum ditemukan</h1>
        <LinkButton to="/student">Kembali ke peta</LinkButton>
      </div>
    )
  const subject = getSubject(lesson.subject_id)
  const book = findTextbook(lesson.content.book_id)
  const course = findAdventureCourse(lesson.content.course_id)
  const complete = readLessonIds.includes(lesson.id)
  async function finish() {
    try {
      await completeReading(lesson.id)
      navigate(`/student/quiz/${lesson.id}`)
    } catch (err) {
      setError(err.message)
    }
  }
  return (
    <div className="reading-layout">
      <Link to={`/student?subject=${subject.id}#materi`} className="back-link">
        <ArrowLeft size={17} />
        Kembali ke {subject.island}
      </Link>
      <header className="reading-header">
        <div className="row gap-sm wrap">
          <Tag color={subject.color}>
            <SubjectIcon name={subject.icon} size={14} />
            {subject.name}
          </Tag>
          <Tag color="cream">
            Kelas {lesson.grade} · {lesson.chapter}
          </Tag>
        </div>
        <h1>{lesson.title}</h1>
        <p className="reading-summary">{lesson.content.summary}</p>
        <div className="lesson-meta">
          <span>
            <Clock3 size={15} />±{lesson.duration} menit membaca
          </span>
          <span>
            <Star size={15} />
            {complete ? 'Hadiah membaca sudah diperoleh' : '+5 XP untuk bacaan pertama'}
          </span>
        </div>
      </header>
      <article className="reading-article">
        {course && (
          <nav className="panel adventure-navigation" aria-label="Daftar bab petualangan">
            <h2>
              {course.island} — kelas {course.grade}
            </h2>
            <p>
              Belajar bersama {course.mentor}.{' '}
              {course.enrichment ? 'Pengayaan sains.' : `Fase ${course.phase}.`}
            </p>
            <ol>
              {course.chapters.map((chapter) => (
                <li key={chapter.id}>
                  {getLesson(chapter.slug) ? (
                    <Link
                      to={`/student/lesson/${chapter.slug}`}
                      aria-current={lesson.slug === chapter.slug ? 'page' : undefined}
                    >
                      Bab {chapter.order}: {chapter.title}
                    </Link>
                  ) : (
                    <span>
                      Bab {chapter.order}: {chapter.title} · belum tersedia untuk akun ini
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        {book && (
          <nav className="panel textbook-navigation" aria-label="Daftar bab buku">
            <h2>{book.title}</h2>
            <p>
              Pelajari satu subbab setiap kali. Pendamping dapat membacakan petunjuk dan
              mendengarkan penjelasanmu.
            </p>
            <ol>
              {book.chapters.map((chapter) => (
                <li key={chapter.id}>
                  {getLesson(chapter.slug) ? (
                    <Link
                      to={`/student/lesson/${chapter.slug}`}
                      aria-current={lesson.id === chapter.id ? 'page' : undefined}
                    >
                      Bab {chapter.order}: {chapter.title}
                    </Link>
                  ) : (
                    <span>
                      Bab {chapter.order}: {chapter.title} · belum tersedia untuk akun ini
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div className="reading-start">
          <BookOpen size={20} />
          <span>Baca perlahan. Kamu boleh mengulang kapan saja.</span>
        </div>
        <MaterialRenderer key={lesson.id} content={lesson.content} />
        {lesson.content.cp_reference && (
          <CpReferencePanel
            key={`cp-${lesson.id}`}
            elementIds={lesson.content.cp_reference.element_ids}
          />
        )}
        <section className="panel">
          <h2>Baca lebih jauh</h2>
          <p>Buka buku atau panduan resmi untuk kelas dan pelajaran ini bersama pendampingmu.</p>
          <LinkButton
            to={`/sumber-belajar?grade=${lesson.grade}&subject=${subject.slug}`}
            variant="secondary"
          >
            Buku & sumber pendamping
          </LinkButton>
        </section>
        <div className="finish-reading">
          <span className="finish-icon">
            <CheckCircle2 size={30} />
          </span>
          <h2>Sudah menemukan hal baru?</h2>
          <p>
            Yuk, coba lima soal pendek. Jawaban yang belum tepat adalah kesempatan untuk belajar.
          </p>
          {error && <Notice error>{error}</Notice>}
          <Button onClick={finish}>
            {complete ? 'Lanjut ke latihan' : 'Selesai membaca & mulai latihan'}
            <ArrowRight size={17} />
          </Button>
          <small>
            {complete
              ? 'Membaca ulang tidak mengulang hadiah XP.'
              : `Bacaan pertama +5 XP${mode === 'demo' ? ' demo' : ''} · tanpa batas waktu`}
          </small>
        </div>
      </article>
      <p className="editorial-note">{editorialNotice}</p>
    </div>
  )
}
