import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  Check,
  Clock3,
  Flag,
  Search,
  Sparkles,
  Star,
  Users,
} from 'lucide-react'
import { AdventureMap } from '../../components/adventure/AdventureMap'
import CharacterAvatar from '../../components/adventure/CharacterAvatar'
import FloatingDecorations from '../../components/ui/FloatingDecorations'
import {
  EmptyState,
  Field,
  LinkButton,
  PageHeading,
  SubjectIcon,
  Tag,
  TextLink,
} from '../../components/ui/Primitives'
import { useLearning } from '../../context/LearningContext'

export default function DashboardPage() {
  const {
    profile,
    updateProfile,
    total_xp,
    readLessonIds,
    attempts,
    memberships,
    getSubject,
    lessons,
    subjects,
    editorialNotice,
  } = useLearning()
  const [params, setParams] = useSearchParams()
  const selectedSubject = params.get('subject') || ''
  const selectedChapter = params.get('chapter') || ''
  const chapters = [
    ...new Set(
      lessons
        .filter(
          (l) =>
            l.grade === profile.grade && (!selectedSubject || l.subject_id === selectedSubject),
        )
        .map((l) => l.chapter),
    ),
  ]
  const [search, setSearch] = useState('')
  const available = useMemo(
    () =>
      lessons.filter(
        (lesson) =>
          lesson.grade === profile.grade &&
          (!selectedSubject || lesson.subject_id === selectedSubject) &&
          (!selectedChapter || lesson.chapter === selectedChapter) &&
          `${lesson.title} ${lesson.content.summary}`.toLowerCase().includes(search.toLowerCase()),
      ),
    [profile.grade, selectedSubject, selectedChapter, search, lessons],
  )
  const gradeLessons = lessons.filter((lesson) => lesson.grade === profile.grade)
  const completed = gradeLessons.filter((lesson) => readLessonIds.includes(lesson.id)).length
  const next = gradeLessons.find((lesson) => !readLessonIds.includes(lesson.id)) || gradeLessons[0]
  return (
    <>
      <PageHeading
        eyebrow="HARI BARU, PENEMUAN BARU"
        title={`Halo, ${profile.display_name}!`}
        action={
          <Field label="Petualangan untuk">
            <select
              value={profile.grade}
              onChange={(event) =>
                Promise.resolve(updateProfile({ grade: Number(event.target.value) })).catch(
                  () => {},
                )
              }
            >
              {[1, 2, 3, 4, 5, 6].map((grade) => (
                <option key={grade} value={grade}>
                  Kelas {grade} SD
                </option>
              ))}
            </select>
          </Field>
        }
      >
        Siap menemukan satu hal menarik hari ini? <span aria-hidden="true">🌿</span>
      </PageHeading>
      <section className="welcome-banner">
        <FloatingDecorations theme="numeria" />
        <div>
          <Tag color="cream">
            <Sparkles size={13} /> LANGKAH KECIL HARI INI
          </Tag>
          <h2>
            Rasa ingin tahumu
            <br />
            membawamu lebih jauh.
          </h2>
          <p>
            {completed
              ? `${completed} dari ${gradeLessons.length} materi kelas ${profile.grade} sudah kamu baca. Yuk, lanjutkan!`
              : 'Mulai dari satu cerita. Tidak perlu terburu-buru.'}
          </p>
          <LinkButton to={next ? `/student/lesson/${next.slug}` : '/student#materi'}>
            Mulai belajar <ArrowRight size={17} />
          </LinkButton>
        </div>
        <div className="banner-illustration" aria-hidden="true">
          <span className="orbit orbit-one" />
          <span className="orbit orbit-two" />
          <span className="banner-star">✦</span>
          <span className="fox-character">
            <CharacterAvatar character="rubi" emotion="semangat" size={170} decorative />
          </span>
          <span className="leaf-character">🌱</span>
          <span className="banner-label">Aku menemanimu!</span>
        </div>
      </section>
      <div className="stat-grid">
        <div className="stat-card">
          <span className="stat-icon tone-mint">
            <BookOpen size={21} />
          </span>
          <div>
            <strong>
              {completed}
              <small> / {gradeLessons.length}</small>
            </strong>
            <span>Materi selesai di kelas ini</span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon tone-peach">
            <Flag size={21} />
          </span>
          <div>
            <strong>{attempts.length}</strong>
            <span>Latihan sudah dicoba</span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon tone-yellow">
            <Star size={21} />
          </span>
          <div>
            <strong>
              {total_xp}
              <small> XP</small>
            </strong>
            <span>Usahamu terus bertumbuh</span>
          </div>
        </div>
      </div>
      <section className="map-section">
        <div className="section-heading">
          <div>
            <h2>Ke mana kita hari ini?</h2>
            <p className="muted">{subjects.length} pulau pengetahuan menunggu untuk dijelajahi.</p>
          </div>
          <Tag color="cream">
            <span className="status-dot" /> Semua pulau terbuka
          </Tag>
        </div>
        <AdventureMap grade={profile.grade} completed={readLessonIds} />
      </section>
      <section id="materi" className="lesson-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">SATU BAB, SATU PENEMUAN</p>
            <h2>Bekal petualanganmu</h2>
          </div>
          <span className="small muted">
            Kelas {profile.grade} · {available.length} materi
          </span>
        </div>
        <div className="filter-bar">
          <label className="search-box">
            <Search size={19} aria-hidden="true" />
            <span className="sr-only">Cari materi</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Mau belajar apa hari ini?"
              type="search"
            />
          </label>
          <label className="subject-select">
            <span className="sr-only">Filter mata pelajaran</span>
            <select
              value={selectedSubject}
              onChange={(event) =>
                setParams(event.target.value ? { subject: event.target.value } : {})
              }
            >
              <option value="">Semua pulau</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </label>
          <label className="subject-select">
            <span className="sr-only">Filter bab</span>
            <select
              value={selectedChapter}
              onChange={(e) => {
                const next = new URLSearchParams(params)
                if (e.target.value) next.set('chapter', e.target.value)
                else next.delete('chapter')
                setParams(next)
              }}
            >
              <option value="">Semua bab</option>
              {chapters.map((chapter) => (
                <option key={chapter} value={chapter}>
                  {chapter}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="lesson-grid">
          {available.map((lesson) => {
            const subject = getSubject(lesson.subject_id)
            const done = readLessonIds.includes(lesson.id)
            return (
              <article className="lesson-card" key={lesson.id}>
                <div className={`lesson-card-art tone-${subject.color}`}>
                  <SubjectIcon name={subject.icon} size={42} />
                  <span className="art-symbol">
                    {subject.slug === 'matematika'
                      ? '× ÷ +'
                      : subject.slug === 'bahasa-inggris'
                        ? 'hello!'
                        : '✦'}
                  </span>
                  <span className="lesson-grade">Kelas {lesson.grade}</span>
                </div>
                <div className="lesson-card-body">
                  <div className="row between">
                    <span className="eyebrow">{subject.name}</span>
                    {done && (
                      <span className="completed-label">
                        <Check size={13} />
                        Dibaca
                      </span>
                    )}
                  </div>
                  <h3>
                    <Link to={`/student/lesson/${lesson.slug}`}>{lesson.title}</Link>
                  </h3>
                  {lesson.content.content_kind === 'full_chapter' && (
                    <Tag color="mint">Bahan ajar per bab</Tag>
                  )}
                  {lesson.slug.startsWith('belajar-') && <Tag>Ringkasan awal</Tag>}
                  {lesson.status === 'draft' && <Tag color="peach">Draf · perlu review guru</Tag>}
                  <p>{lesson.content.summary}</p>
                  <div className="lesson-meta">
                    <span>
                      <Clock3 size={14} />±{lesson.duration} menit
                    </span>
                    <span>
                      <BookOpen size={14} />
                      {lesson.chapter}
                    </span>
                  </div>
                  <TextLink to={`/student/lesson/${lesson.slug}`}>
                    {done ? 'Baca lagi' : 'Yuk, jelajahi'}
                  </TextLink>
                </div>
              </article>
            )
          })}
        </div>
        {!available.length && (
          <EmptyState
            title="Materinya belum ketemu"
            action={
              <button
                className="text-link"
                onClick={() => {
                  setSearch('')
                  setParams({})
                }}
              >
                Tampilkan semua materi
              </button>
            }
          >
            Coba kata yang lebih singkat atau pilih pulau lain.
          </EmptyState>
        )}
        <p className="editorial-note">{editorialNotice}</p>
      </section>
      <section className="class-invitation">
        <span className="stat-icon tone-peach">
          <Users size={24} />
        </span>
        <div>
          <h3>Belajar bersama terasa lebih hangat.</h3>
          <p>
            {memberships.length
              ? 'Lihat tugas dan pesan semangat dari kakak tutor.'
              : 'Punya kode kelas dari kakak tutor? Gabung dan belajar bersama.'}
          </p>
        </div>
        <LinkButton to="/student/classes" variant="secondary">
          {memberships.length ? 'Buka kelas saya' : 'Gabung kelas'}
          <ArrowRight size={16} />
        </LinkButton>
      </section>
    </>
  )
}
