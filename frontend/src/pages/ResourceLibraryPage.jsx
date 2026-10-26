import { Link, useSearchParams } from 'react-router-dom'
import { ArrowUpRight, BookOpen, Library, ListOrdered } from 'lucide-react'
import { useLearning } from '../context/LearningContext'
import { Brand, EmptyState, Field, LinkButton, Notice, Tag } from '../components/ui/Primitives'
import {
  curriculumPlan,
  curriculumSources,
  learningResources,
  officialCatalogUrl,
  resourceCheckedAt,
  resourceSubjects,
} from '../lib/learningResources'
import {
  getGovernmentScope,
  governmentMaterials,
  governmentCheckedAt,
  officialCp,
  officialMaterialsIndex,
  unitAlignmentNotes,
} from '../lib/governmentCurriculum'
import { textbookCatalog } from '../lib/textbooks'
import CpReferencePanel from '../components/ui/CpReferencePanel'
import AdventureCoursePanel from '../components/AdventureCoursePanel'

export default function ResourceLibraryPage() {
  const { session, profile, lessons, getSubject, mode } = useLearning()
  const [params, setParams] = useSearchParams()
  const rawGrade = Number(params.get('grade'))
  const grade =
    Number.isInteger(rawGrade) && rawGrade >= 1 && rawGrade <= 6 ? rawGrade : profile.grade || 3
  const subject = resourceSubjects.some((s) => s.id === params.get('subject'))
    ? params.get('subject')
    : ''
  const audience = ['student', 'teacher'].includes(params.get('audience'))
    ? params.get('audience')
    : ''
  const search = params.get('q') || ''
  function filter(key, value) {
    const next = new URLSearchParams(params)
    next.set('grade', String(grade))
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }
  const resources = learningResources.filter(
    (r) =>
      r.grade === grade &&
      (!subject || r.subject === subject) &&
      (!audience || r.audience === audience) &&
      `${r.title} ${r.provider}`.toLowerCase().includes(search.toLowerCase()),
  )
  const plans = curriculumPlan.filter(
    (p) => p.grade === grade && (!subject || p.subject === subject),
  )
  const officialExamples = governmentMaterials.filter(
    (item) => item.grades.includes(grade) && (!subject || item.subject === subject),
  )
  const books = textbookCatalog.filter(
    (book) => book.grade === grade && (!subject || book.subject === subject),
  )
  return (
    <div className="resource-library">
      <header className="landing-header">
        <Brand />
        <LinkButton to={session ? `/${session.role}` : '/'} variant="secondary">
          {session ? 'Ke ruang belajar' : 'Ke beranda'}
        </LinkButton>
      </header>
      <main className="standalone resource-main">
        <Tag color="mint">
          <Library size={16} /> PERPUSTAKAAN BELAJAR
        </Tag>
        <h1>Buku utuh, langkah belajar terarah.</h1>
        <p className="muted">
          Pilih kelas dan pelajaran. Buku serta panduan lengkap dibuka di situs resmi
          Kemendikdasmen; latihan interaktif tersedia terpisah di aplikasi.
        </p>
        <div className="stat-grid">
          <div className="stat-card">
            <BookOpen />
            <div>
              <strong>{learningResources.length}</strong>
              <span>Rujukan buku resmi</span>
            </div>
          </div>
          <div className="stat-card">
            <Library />
            <div>
              <strong>6</strong>
              <span>Kelas dengan rencana belajar</span>
            </div>
          </div>
          <div className="stat-card">
            <ListOrdered />
            <div>
              <strong>{curriculumPlan.reduce((sum, p) => sum + p.units.length, 0)}</strong>
              <span>Draf materi untuk ditinjau</span>
            </div>
          </div>
        </div>
        <section className="panel resource-filters" aria-label="Pilih sumber belajar">
          <div className="form-grid">
            <Field label="Kelas sumber">
              <select value={grade} onChange={(e) => filter('grade', e.target.value)}>
                {[1, 2, 3, 4, 5, 6].map((g) => (
                  <option key={g} value={g}>
                    Kelas {g}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Mata pelajaran sumber">
              <select value={subject} onChange={(e) => filter('subject', e.target.value)}>
                <option value="">Semua pelajaran</option>
                {resourceSubjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Jenis pembaca">
              <select value={audience} onChange={(e) => filter('audience', e.target.value)}>
                <option value="">Siswa dan pendamping</option>
                <option value="student">Buku siswa / interaktif</option>
                <option value="teacher">Panduan guru / pendamping</option>
              </select>
            </Field>
            <Field label="Cari judul buku">
              <input
                type="search"
                value={search}
                onChange={(e) => filter('q', e.target.value)}
                placeholder="Misalnya Matematika"
              />
            </Field>
          </div>
        </section>
        <AdventureCoursePanel grade={grade} subject={subject} lessons={lessons} session={session} />
        <section id="buku-per-bab" aria-labelledby="bahan-ajar-bab">
          <h2 id="bahan-ajar-bab">Bahan ajar berurutan per bab</h2>
          <p className="muted">
            Bacaan, subbab, kegiatan, latihan mandiri dan pembahasan. Urutan mengacu buku
            pemerintah; penjelasan serta soal aplikasi ditulis orisinal dan menunggu review guru.
          </p>
          {books.map((book) => (
            <article className="panel textbook-card" key={book.id}>
              <Tag color="mint">
                {book.chapters.length} bab · Kelas {book.grade}
              </Tag>
              <h3>{book.title}</h3>
              <p>
                Acuan: {book.source_title}, {book.source_year}. {book.source_authors}.
              </p>
              <ol>
                {book.chapters.map((chapter) => (
                  <li key={chapter.id}>
                    {lessons.some((l) => l.id === chapter.id) ? (
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
          {!books.length && (
            <p>
              Bahan ajar utuh per bab untuk pilihan ini sedang disusun. Unit ringkasan awal tetap
              tersedia pada bagian rencana belajar.
            </p>
          )}
        </section>
        <section aria-labelledby="buku-resmi">
          <h2 id="buku-resmi">Buku dan panduan kelas {grade}</h2>
          <p className="small muted" role="status">
            {resources.length} rujukan sesuai filter · metadata diperiksa {resourceCheckedAt}
          </p>
          <div className="resource-grid">
            {resources.map((resource) => (
              <article className="panel resource-card" key={resource.id}>
                <div className="row wrap gap-sm">
                  <Tag color={resource.audience === 'teacher' ? 'peach' : 'mint'}>
                    {resource.audience === 'teacher' ? 'Panduan guru' : 'Buku siswa'} ·{' '}
                    {resource.format}
                  </Tag>
                  <Tag>Kelas {resource.grade}</Tag>
                </div>
                <p className="eyebrow">
                  {resourceSubjects.find((s) => s.id === resource.subject)?.name}
                </p>
                <h3>{resource.title}</h3>
                <p className="small muted">{resource.provider}</p>
                <a
                  className="button button-secondary"
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${resource.audience === 'teacher' ? 'Buka panduan' : 'Buka buku'}: ${resource.title} (tab baru)`}
                >
                  Buka di SIBI <ArrowUpRight size={16} />
                </a>
              </article>
            ))}
          </div>
          {!resources.length && (
            <EmptyState title="Belum ada rujukan yang cocok">
              Ubah filter atau cari judul di{' '}
              <a href={officialCatalogUrl} target="_blank" rel="noopener noreferrer">
                katalog resmi SIBI
              </a>
              . Daftar ini masih dikurasi.
            </EmptyState>
          )}
          <Notice>
            Beberapa judul yang ditemukan berupa panduan guru. Gunakan bersama pendamping. Situs
            sumber dapat meminta akun; mintalah bantuan orang tua atau tutor. PDF tidak dimuat
            otomatis agar kuota tetap terjaga.
          </Notice>
        </section>
        <section aria-labelledby="contoh-pemerintah">
          <h2 id="contoh-pemerintah">Materi pendamping dari Ruang Murid</h2>
          <p className="muted">
            Buka bahan belajar di situs pemerintah bersama pendamping. Contoh mengikuti kelompok
            kelas pada indeks resmi; pilih bahan yang sesuai dengan tujuan belajar Anda.
          </p>
          <div className="resource-grid">
            {officialExamples.map((item) => (
              <article className="panel official-material-card" key={item.id}>
                <Tag color="mint">{item.format}</Tag>
                <h3>{item.title}</h3>
                <p className="small muted">
                  {item.provider} · Kelas {item.grades.join('–')}
                </p>
                <a
                  className="button button-secondary"
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Buka materi resmi <ArrowUpRight size={16} />
                </a>
              </article>
            ))}
          </div>
          <p className="small muted">
            {officialExamples.length
              ? 'Judul dan metadata tujuan diperiksa'
              : 'Contoh kurasi untuk filter ini belum tersedia; telusuri'}{' '}
            <a href={officialMaterialsIndex} target="_blank" rel="noopener noreferrer">
              daftar materi SD pemerintah
            </a>
            . Pemeriksaan {governmentCheckedAt} belum mencakup isi lengkap atau pemutaran; situs
            sumber dapat meminta akun.
          </p>
        </section>
        <section className="resource-plans" aria-labelledby="rencana-belajar">
          <h2 id="rencana-belajar">Urutan belajar yang disarankan</h2>
          <p className="muted">
            Tiap topik memiliki draf bacaan, contoh, aktivitas dan lima soal konsep. Draf dapat
            dicoba pada mode demo dan menunggu review guru sebelum publikasi cloud. Urutan ini
            merupakan usulan aplikasi, bukan salinan daftar isi buku atau ATP resmi sekolah.
          </p>
          {plans.map((plan) => {
            const scope = getGovernmentScope(plan.subject, grade)
            const ready = lessons.filter(
              (l) => l.grade === grade && getSubject(l.subject_id)?.slug === plan.subject,
            )
            return (
              <article key={plan.id} className="panel curriculum-card">
                <div className="row between wrap gap-sm">
                  <h3>{resourceSubjects.find((s) => s.id === plan.subject)?.name}</h3>
                  <Tag color={plan.enrichment ? 'peach' : 'mint'}>
                    {plan.enrichment ? 'Pengayaan awal' : `Fase ${plan.phase}`} · Kelas {grade}
                  </Tag>
                </div>
                <p className="small muted">{plan.note}</p>
                {subject && audience !== 'student' && (
                  <CpReferencePanel key={scope.id} scopeIds={scope.cp_scope_ids} />
                )}
                <p className="small">
                  <strong>Arah belajar:</strong> {scope.focus}
                </p>
                {scope.government_phase && (
                  <p className="small muted">
                    <a
                      href={`${officialCp.url}#page=${scope.cp_pdf_pages[0]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Lihat acuan CP Fase {scope.government_phase}
                    </a>
                    . Pemetaan tiap unit menunggu pemeriksaan guru.
                  </p>
                )}
                <ol>
                  {plan.units.map((unit) => (
                    <li key={unit.order}>
                      <span>{unit.title}</span>
                      <small>Draf terisi · menunggu review guru</small>
                      {unitAlignmentNotes[unit.id] && <small>{unitAlignmentNotes[unit.id]}</small>}
                      {ready.some((l) => l.slug === unit.slug) && (
                        <Link
                          to={
                            session?.role === 'student' ? `/student/lesson/${unit.slug}` : '/login'
                          }
                        >
                          Baca & latihan
                        </Link>
                      )}
                    </li>
                  ))}
                </ol>
                {ready.length > 0 && (
                  <div className="available-lessons">
                    <h4>
                      {mode === 'demo'
                        ? 'Contoh interaktif yang sudah dapat dicoba'
                        : 'Materi interaktif yang tersedia untuk akun ini'}
                    </h4>
                    {ready
                      .filter((l) => !l.slug.startsWith('belajar-'))
                      .map((lesson) => (
                        <p key={lesson.id}>
                          <Link
                            to={
                              session?.role === 'student'
                                ? `/student/lesson/${lesson.slug}`
                                : '/login'
                            }
                          >
                            {lesson.title}
                          </Link>
                        </p>
                      ))}
                  </div>
                )}
              </article>
            )
          })}
        </section>
        <section className="panel">
          <h2>Acuan untuk pendamping dan pengelola</h2>
          <p>
            CP disusun per fase; pembagian menjadi kelas dan bab perlu menyesuaikan kebutuhan anak
            serta ATP sekolah. IPAS dan pengenalan Inggris kelas 1–2 pada aplikasi diberi label
            pengayaan. Cabang seni mengikuti pilihan sekolah.
          </p>
          <ul className="source-links">
            {curriculumSources.map((source) => (
              <li key={source.id}>
                <a href={source.url} target="_blank" rel="noopener noreferrer">
                  {source.title} ↗
                </a>
              </li>
            ))}
          </ul>
          <p className="small muted">
            Daftar ini menghubungkan sumber resmi. Seluruh isi PDF, akses unduh, dan kesesuaian
            setiap bab belum diaudit. Materi interaktif buatan aplikasi memerlukan review
            tersendiri.
          </p>
        </section>
      </main>
    </div>
  )
}
