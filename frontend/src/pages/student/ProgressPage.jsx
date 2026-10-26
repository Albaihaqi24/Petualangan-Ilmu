import { ArrowRight, BookOpen, Flag, Star } from 'lucide-react'
import {
  EmptyState,
  formatDate,
  LinkButton,
  PageHeading,
  Tag,
  XPBar,
} from '../../components/ui/Primitives'
import { useLearning } from '../../context/LearningContext'

export default function ProgressPage() {
  const { total_xp, readLessonIds, attempts, profile, getLesson, subjects, lessons } = useLearning()
  const average = attempts.length
    ? Math.round(attempts.reduce((sum, attempt) => sum + attempt.score, 0) / attempts.length)
    : null
  return (
    <>
      <PageHeading eyebrow="JEJAK LANGKAHMU" title="Lihat, kamu sudah bertumbuh.">
        Kemajuan kecil tetap kemajuan. Terima kasih sudah terus mencoba.
      </PageHeading>
      <div className="progress-overview">
        <XPBar xp={total_xp} />
        <div className="panel progress-stats">
          <div>
            <BookOpen size={21} />
            <strong>{readLessonIds.length}</strong>
            <span>Materi dibaca</span>
          </div>
          <div>
            <Flag size={21} />
            <strong>{attempts.length}</strong>
            <span>Latihan dicoba</span>
          </div>
          <div>
            <Star size={21} />
            <strong>{average ?? '—'}</strong>
            <span>Rata-rata nilai</span>
          </div>
        </div>
      </div>
      <section className="panel">
        <div className="section-heading">
          <div>
            <h2>Pulau yang kamu kenal</h2>
            <p className="muted">Materi kelas {profile.grade} yang sudah dibaca.</p>
          </div>
        </div>
        <div className="subject-progress-list">
          {subjects.map((subject) => {
            const done = lessons.some(
              (l) =>
                l.subject_id === subject.id &&
                l.grade === profile.grade &&
                readLessonIds.includes(l.id),
            )
            return (
              <div className="subject-progress" key={subject.id}>
                <span>{subject.name}</span>
                <div className="xp-track">
                  <span style={{ width: done ? '100%' : '0%' }} />
                </div>
                <Tag color={done ? 'mint' : 'cream'}>{done ? 'Sudah dibaca' : 'Belum mulai'}</Tag>
              </div>
            )
          })}
        </div>
      </section>
      <section className="history-section">
        <div className="section-heading">
          <div>
            <h2>Cerita latihanmu</h2>
            <p className="muted">Buka pembahasan kapan pun ingin mengingat kembali.</p>
          </div>
        </div>
        {!attempts.length ? (
          <EmptyState
            title="Halaman ini menunggu cerita pertamamu"
            action={
              <LinkButton to="/student">
                Mulai dari peta
                <ArrowRight size={17} />
              </LinkButton>
            }
          >
            Selesaikan satu latihan untuk melihat riwayat belajarmu.
          </EmptyState>
        ) : (
          <div className="history-list">
            {[...attempts].reverse().map((attempt) => (
              <article className="panel history-item" key={attempt.id}>
                <div>
                  <span className="small muted">{formatDate(attempt.created_at)}</span>
                  <h3>{getLesson(attempt.lesson_id)?.title || 'Materi contoh'}</h3>
                  <p>
                    {attempt.correct_count}/{attempt.total_questions} tepat · +{attempt.xp_earned}{' '}
                    XP
                  </p>
                </div>
                <Tag color={attempt.score >= 60 ? 'mint' : 'peach'}>{attempt.score}/100</Tag>
                <LinkButton
                  variant="secondary"
                  to={`/student/quiz/${attempt.lesson_id}/result/${attempt.id}`}
                >
                  Pembahasan
                  <ArrowRight size={15} />
                </LinkButton>
              </article>
            ))}
          </div>
        )}
      </section>
      <p className="editorial-note">
        Ringkasan ini untuk siswa. Portal wali dengan akses terverifikasi baru direncanakan pada P1.
      </p>
    </>
  )
}
