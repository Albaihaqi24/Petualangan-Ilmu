import { Link } from 'react-router-dom'
import { adventureCourses } from '../lib/adventureCourseCatalog'
import { Tag } from './ui/Primitives'

export default function AdventureCoursePanel({ grade, subject = '', lessons, session }) {
  const courses = adventureCourses.filter(
    (course) => course.grade === grade && (!subject || course.subject === subject),
  )
  if (!courses.length) return null
  return (
    <section id="paket-72-bab" aria-labelledby="paket-petualangan-title">
      <h2 id="paket-petualangan-title">Petualangan 72 bab — kelas 1–6</h2>
      <p className="muted">
        Bahan ajar dengan contoh, kegiatan, latihan berpembahasan dan lima soal kuis setiap bab.
        Pilih satu bab dan pelajari bertahap bersama pendamping.
      </p>
      <div className="resource-grid">
        {courses.map((course) => (
          <article className="panel adventure-course-card" key={course.id}>
            <Tag color={course.enrichment ? 'peach' : 'mint'}>
              {course.enrichment ? 'Pengayaan sains' : `Fase ${course.phase}`} · Kelas{' '}
              {course.grade}
            </Tag>
            <h3>
              {course.island} — {course.name}
            </h3>
            <p>Bersama {course.mentor} · 4 bab · 20 soal kuis</p>
            <ol>
              {course.chapters.map((chapter) => (
                <li key={chapter.id}>
                  {lessons.some((lesson) => lesson.slug === chapter.slug) ? (
                    <Link
                      to={
                        session?.role === 'student' ? `/student/lesson/${chapter.slug}` : '/login'
                      }
                    >
                      Bab {chapter.order}: {chapter.title}
                    </Link>
                  ) : (
                    <span>
                      Bab {chapter.order}: {chapter.title} · belum dipublikasikan
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </article>
        ))}
      </div>
      <p className="small muted">
        Draf bahan ajar; urutan bab pilihan aplikasi menunggu review guru dan penyesuaian ATP. Paket
        sains ini belum mencakup seluruh unsur sosial IPAS.
      </p>
    </section>
  )
}
