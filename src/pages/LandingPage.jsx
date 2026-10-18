import { Link, useParams } from 'react-router-dom'
import { ArrowRight, BookOpen, Check, Compass, HeartHandshake, Sparkles, Star } from 'lucide-react'
import { AdventureMap } from '../components/adventure/AdventureMap'
import { Brand, LinkButton, SubjectIcon, Tag, TextLink } from '../components/ui/Primitives'
import { useLearning } from '../context/LearningContext'
import CharacterAvatar from '../components/adventure/CharacterAvatar'

export default function LandingPage() {
  const { subjects, mode } = useLearning()
  return (
    <div className="landing">
      <a className="skip-link" href="#utama">
        Langsung ke isi
      </a>
      <header className="landing-header">
        <Brand />
        <nav aria-label="Navigasi publik">
          <a href="#cara-belajar">Cara belajar</a>
          <a href="#pulau">Pulau pengetahuan</a>
          <Link to="/sumber-belajar">Buku & sumber belajar</Link>
        </nav>
        <div id="adventure-controls-slot" />
        <LinkButton to="/login" variant="secondary">
          Masuk <ArrowRight size={16} />
        </LinkButton>
      </header>
      <main id="utama">
        <section className="hero">
          <div className="hero-copy">
            <div className="hero-tag">
              <span className="status-dot" /> UNTUK SETIAP ANAK YANG INGIN TAHU
            </div>
            <h1>
              Rasa ingin tahu,
              <br />
              awal{' '}
              <span>
                petualangan
                <br className="desktop-break" /> besarmu.
              </span>
              <svg viewBox="0 0 310 12" aria-hidden="true">
                <path
                  d="M3 8Q145 -1 306 7"
                  stroke="#d7a365"
                  strokeWidth="5"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </h1>
            <p>
              Belajar terasa lebih seru ketika jadi petualangan. Jelajahi pulau pengetahuan,
              pecahkan tantangan, dan tumbuh bersama kakak tutor.
            </p>
            <div className="hero-actions">
              <LinkButton to="/register">
                Mulai petualangan <ArrowRight size={18} />
              </LinkButton>
              <a className="button button-ghost" href="#pulau">
                <Compass size={18} />
                Intip peta belajar
              </a>
            </div>
            <div className="hero-trust">
              <span>
                <Check size={15} /> Untuk kelas 1–6 SD
              </span>
              <span>
                <Check size={15} /> Misi belajar gratis
              </span>
            </div>
          </div>
          <div className="hero-map">
            <div className="map-sticker">
              <span>
                <CharacterAvatar character="rubi" size={68} decorative />
              </span>
              <div>
                Hei, aku Rubi!<small>Ayo temukan hal baru.</small>
              </div>
            </div>
            <AdventureMap compact publicMode />
            <div className="floating-note">
              <Star size={17} fill="currentColor" />
              Usaha kecil. Kemajuan besar.
            </div>
          </div>
        </section>
        <div className="landing-strip">
          <span>Setiap anak punya cara belajarnya sendiri.</span>
          <div>
            <BookOpen size={18} /> Materi singkat
          </div>
          <div>
            <Sparkles size={18} /> Latihan menyenangkan
          </div>
          <div>
            <HeartHandshake size={18} /> Pendampingan tutor
          </div>
        </div>
        <section id="pulau" className="landing-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">DUNIA PENUH PENEMUAN</p>
              <h2>{subjects.length} pulau, banyak cerita baru.</h2>
            </div>
            <p className="muted">
              Mulai dari angka hingga karya.
              <br />
              Ada tempat untuk rasa ingin tahumu.
            </p>
          </div>
          <div className="subject-grid">
            {subjects.map((subject) => (
              <Link
                to={`/jelajah/${subject.slug}`}
                key={subject.id}
                className={`subject-card tone-${subject.color}`}
                data-island={subject.theme}
              >
                <span className="subject-icon">
                  <SubjectIcon name={subject.icon} size={27} />
                </span>
                <h3>{subject.island}</h3>
                <p>{subject.description}</p>
                <span className="subject-bottom">
                  {subject.name}
                  <ArrowRight size={17} />
                </span>
              </Link>
            ))}
          </div>
        </section>
        <section id="cara-belajar" className="landing-section how-section">
          <div>
            <p className="eyebrow">LANGKAH KECIL, SETIAP HARI</p>
            <h2>
              Tidak harus langsung bisa.
              <br />
              Yang penting, mau mencoba.
            </h2>
            <p className="muted">Belajar tanpa terburu-buru. Ulangi kapan saja.</p>
            <LinkButton to="/login" variant="secondary">
              {mode === 'demo' ? 'Coba demo belajar' : 'Mulai belajar'} <ArrowRight size={17} />
            </LinkButton>
          </div>
          <ol className="how-steps">
            {[
              ['Pilih pulaumu', 'Temukan materi sesuai kelas dan rasa ingin tahumu.'],
              ['Baca, amati, coba', 'Pahami cerita singkat dan kerjakan latihan kecil.'],
              ['Rayakan kemajuan', 'Dapatkan XP, baca pembahasan, dan coba lagi.'],
            ].map(([title, body], index) => (
              <li key={title}>
                <span>0{index + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
        <section className="landing-cta">
          <span className="cta-sparkle">✦</span>
          <p className="eyebrow">PETUALANGANMU MENUNGGU</p>
          <h2>
            Satu hal baru hari ini.
            <br />
            Bisa dimulai dari sini.
          </h2>
          <LinkButton to="/register">
            Ayo, mulai belajar <ArrowRight size={18} />
          </LinkButton>
          <p className="small">
            {mode === 'demo'
              ? 'Versi demo lokal · belum ada pendaftaran akun sungguhan'
              : 'Belajar gratis bersama pendamping dan teman petualangan'}
          </p>
        </section>
      </main>
      <footer className="landing-footer">
        <Brand />
        <p>Dibuat untuk rasa ingin tahu yang terus tumbuh.</p>
        <Link to="/login">
          Coba sebagai siswa, tutor, atau admin <ArrowRight size={15} />
        </Link>
      </footer>
    </div>
  )
}

export function PublicCatalogPage() {
  const { subjects, lessons, editorialNotice, mode } = useLearning()
  const { subjectSlug } = useParams()
  const subject = subjects.find((item) => item.slug === subjectSlug)
  if (!subject)
    return (
      <main className="standalone">
        <h1>Pulau belum ditemukan</h1>
        <LinkButton to="/">Kembali ke beranda</LinkButton>
      </main>
    )
  return (
    <div className="public-catalog">
      <header className="landing-header">
        <Brand />
        <LinkButton to="/login" variant="secondary">
          {mode === 'demo' ? 'Masuk demo' : 'Masuk'}
        </LinkButton>
      </header>
      <main className="standalone">
        <Tag color={subject.color}>{subject.name}</Tag>
        <h1>{subject.island}</h1>
        <p className="muted">{subject.description}</p>
        <p className="editorial-note">{editorialNotice}</p>
        <div className="catalog-list">
          {lessons
            .filter((lesson) => lesson.subject_id === subject.id)
            .map((lesson) => (
              <article className="panel" key={lesson.id}>
                <Tag>Kelas {lesson.grade}</Tag>
                <h2>{lesson.title}</h2>
                <p>{lesson.content.summary}</p>
                <p className="preview-text">
                  {lesson.content.blocks[0]?.body ||
                    lesson.content.scenes?.[0]?.text ||
                    lesson.content.summary}
                </p>
                <TextLink to="/login">
                  {mode === 'demo'
                    ? 'Masuk demo untuk melanjutkan dan berlatih'
                    : 'Masuk untuk melanjutkan dan berlatih'}
                </TextLink>
              </article>
            ))}
        </div>
      </main>
    </div>
  )
}
