import { useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  ArrowUpRight,
  BookOpen,
  Compass,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Settings2,
  ShieldCheck,
  Sprout,
  Users,
} from 'lucide-react'
import { useLearning } from '../context/LearningContext'
import { avatars } from '../lib/catalog'
import { Brand, Notice, XPBar } from '../components/ui/Primitives'

const studentLinks = [
  { to: '/student', end: true, label: 'Peta belajar', icon: Compass },
  { to: '/student#materi', label: 'Jelajahi materi', icon: BookOpen },
  { to: '/student/classes', label: 'Kelas saya', icon: Users },
  { to: '/student/progress', label: 'Progres belajar', icon: Sprout },
  { to: '/sumber-belajar', label: 'Buku & sumber belajar', icon: BookOpen },
]
export function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (hash)
        document
          .getElementById(hash.slice(1))
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      else window.scrollTo({ top: 0, behavior: 'instant' })
      const title = document.querySelector('h1')?.textContent
      document.title = title ? `${title} · Petualangan Ilmu` : 'Petualangan Ilmu'
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])
  return null
}

export default function AppLayout() {
  const { session, profile, total_xp, logout, storageNotice, mode } = useLearning()
  const navigate = useNavigate()
  const location = useLocation()
  const student = session.role === 'student'
  const links = student
    ? studentLinks
    : session.role === 'tutor'
      ? [{ to: '/tutor', label: 'Ruang tutor', icon: GraduationCap }]
      : [{ to: '/admin', label: 'Studio konten', icon: LayoutDashboard }]
  const avatar = avatars.find((entry) => entry.id === profile.avatar) || avatars[0]
  return (
    <div className="app-shell">
      <a className="skip-link" href="#konten">
        Langsung ke isi
      </a>
      <aside className="sidebar">
        <Brand />
        <p className="sidebar-caption">
          {student
            ? 'RUANG PETUALANG'
            : session.role === 'tutor'
              ? 'RUANG PENDAMPING'
              : 'RUANG PENGELOLA'}
        </p>
        <nav aria-label="Navigasi utama" className="side-nav">
          {links.map(({ to, label, icon: Icon, end }) => {
            const selected = to.includes('#')
              ? location.pathname === '/student' && location.hash === '#materi'
              : to === '/student'
                ? location.pathname === '/student' && !location.hash
                : location.pathname === to
            return (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={() => `nav-link ${selected ? 'active' : ''}`}
              >
                <Icon size={20} aria-hidden="true" />
                {label}
                {selected && <span className="nav-dot" />}
              </NavLink>
            )
          })}
        </nav>
        <div className="sidebar-bottom">
          {student ? (
            <XPBar xp={total_xp} />
          ) : (
            <div className="tutor-note">
              <ShieldCheck size={24} />
              <h3>Belajar yang bermakna</h3>
              <p>Dampingi dengan sabar. Rayakan usaha, bukan hanya angka.</p>
            </div>
          )}
          <Link to="/" className="sidebar-home">
            Tentang Petualangan Ilmu <ArrowUpRight size={16} />
          </Link>
          <button
            className="nav-link logout"
            onClick={async () => {
              try {
                await logout()
                navigate('/')
              } catch {
                /* Provider menampilkan kegagalan. */
              }
            }}
          >
            <LogOut size={18} />
            {mode === 'demo' ? 'Keluar dari demo' : 'Keluar'}
          </button>
        </div>
      </aside>
      <div className="app-main">
        <header className="app-header">
          <span className="header-label">
            <span className="status-dot" />
            {student
              ? 'Sedikit belajar, banyak bertumbuh.'
              : 'Setiap anak punya langkahnya sendiri.'}
          </span>
          <div className="row gap-sm">
            <Link to={mode === 'demo' ? '/login' : '/account'} className="demo-pill">
              {mode === 'demo' ? 'Mode demo' : 'Akun belajar'} <ArrowUpRight size={13} />
            </Link>
            <Link
              to={student ? '/student/profile' : mode === 'demo' ? '/login' : '/account'}
              className="profile-chip"
              aria-label={
                mode === 'demo' ? (student ? 'Atur profil demo' : 'Pilih peran demo') : 'Atur akun'
              }
            >
              <span className="avatar-small">
                {student ? avatar.emoji : session.role === 'tutor' ? '🌱' : '🎨'}
              </span>
              <span>
                {student ? profile.display_name : session.display_name}
                <small>
                  {student
                    ? `Kelas ${profile.grade}`
                    : session.role === 'tutor'
                      ? 'Kakak tutor'
                      : mode === 'demo'
                        ? 'Admin demo'
                        : 'Admin'}
                </small>
              </span>
              <Settings2 size={16} />
            </Link>
          </div>
        </header>
        <main id="konten" className="page-content">
          {storageNotice && <Notice error>{storageNotice}</Notice>}
          <Outlet />
        </main>
        <footer className="app-footer">
          <Link to="/sumber-belajar">Buku dan panduan resmi</Link>
          <span>
            Petualangan Ilmu <span aria-hidden="true">✦</span> Tumbuh lewat rasa ingin tahu.
          </span>
          <span>
            {mode === 'demo'
              ? 'Data contoh · tersimpan di browser ini'
              : 'Progres tersimpan pada akun belajarmu'}
          </span>
        </footer>
      </div>
      <nav className="mobile-nav" aria-label="Navigasi HP">
        {links
          .filter((entry) => !entry.to.includes('#'))
          .map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} end={to === '/student'}>
              <Icon size={20} />
              <span>{label}</span>
            </NavLink>
          ))}
      </nav>
    </div>
  )
}
