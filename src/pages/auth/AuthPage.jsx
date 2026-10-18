import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, GraduationCap, ShieldCheck, Sparkles } from 'lucide-react'
import { useLearning } from '../../context/LearningContext'
import { avatars } from '../../lib/catalog'
import SupabaseAuthPage from './SupabaseAuthPage'
import { Brand, Button, Field, Notice } from '../../components/ui/Primitives'

export default function AuthPage({ register = false }) {
  const { mode } = useLearning()
  return mode === 'supabase' ? (
    <SupabaseAuthPage register={register} />
  ) : (
    <DemoAuthPage register={register} />
  )
}
function DemoAuthPage({ register }) {
  const { enterDemo, profile } = useLearning()
  const navigate = useNavigate()
  const [name, setName] = useState(profile.display_name)
  const [grade, setGrade] = useState(profile.grade)
  const [avatar, setAvatar] = useState(profile.avatar)
  const [error, setError] = useState('')
  function start(role) {
    const displayName = name.trim()
    if (role === 'student' && (!displayName || displayName.length > 24)) {
      setError('Isi nama panggilan, maksimal 24 karakter.')
      return
    }
    enterDemo(role, { display_name: displayName, grade: Number(grade), avatar })
    navigate(role === 'student' ? '/student' : `/${role}`)
  }
  return (
    <div className="auth-page">
      <div className="auth-art">
        <Brand />
        <div>
          <span className="auth-fox">🦊</span>
          <p className="eyebrow">SELAMAT DATANG, PETUALANG</p>
          <h1>
            Setiap pertanyaan
            <br />
            membuka dunia baru.
          </h1>
          <p>Tak apa belum tahu. Kita cari tahu bersama.</p>
          <div className="auth-small-stars">
            ✦ <span>✧</span> ✦
          </div>
        </div>
        <Link to="/">← Kembali ke beranda</Link>
      </div>
      <main className="auth-form-wrap">
        <div className="auth-mobile-brand">
          <Brand />
        </div>
        <div className="auth-form">
          <span className="tag tone-mint">
            <Sparkles size={14} /> DEMO TAHAP 2
          </span>
          <h2>{register ? 'Siap jadi petualang?' : 'Halo, senang kamu kembali!'}</h2>
          <p className="muted">
            {register
              ? 'Pilih nama panggilan dan teman petualanganmu.'
              : 'Lanjutkan langkah kecilmu hari ini.'}
          </p>
          <Notice>
            Ini demo lokal. Email dan kata sandi contoh tidak dikirim atau disimpan. Gunakan data
            rekaan.
          </Notice>
          <form
            onSubmit={(event) => {
              event.preventDefault()
              start('student')
            }}
          >
            <Field label="Nama panggilan">
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                maxLength={24}
                required
                autoComplete="off"
                placeholder="Contoh: Nara"
              />
            </Field>
            <div className="form-grid">
              <Field label="Kelas">
                <select value={grade} onChange={(event) => setGrade(Number(event.target.value))}>
                  {[1, 2, 3, 4, 5, 6].map((value) => (
                    <option key={value} value={value}>
                      Kelas {value}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Email contoh">
                <input type="email" defaultValue="nara@example.test" required autoComplete="off" />
              </Field>
            </div>
            <Field
              label="Kata sandi contoh"
              hint="Form ini hanya demonstrasi tampilan; belum memverifikasi akun."
            >
              <input
                type="password"
                defaultValue="contoh-belajar"
                minLength={8}
                required
                autoComplete="off"
              />
            </Field>
            <fieldset className="avatar-field">
              <legend>Pilih teman petualangan</legend>
              <div className="avatar-options">
                {avatars.map((item) => (
                  <label key={item.id} className={avatar === item.id ? 'selected' : ''}>
                    <input
                      type="radio"
                      name="avatar"
                      value={item.id}
                      checked={avatar === item.id}
                      onChange={() => setAvatar(item.id)}
                    />
                    <span aria-hidden="true">{item.emoji}</span>
                    <span className="sr-only">{item.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            {error && <Notice error>{error}</Notice>}
            <Button type="submit" className="full-width">
              {register ? 'Mulai demo petualangan' : 'Masuk ke demo siswa'}
              <ArrowRight size={17} />
            </Button>
          </form>
          <p className="auth-switch">
            {register ? 'Sudah mencoba demo?' : 'Baru mulai bertualang?'}{' '}
            <Link to={register ? '/login' : '/register'}>
              {register ? 'Masuk' : 'Atur profil demo'}
            </Link>
          </p>
          <div className="demo-role-divider">
            <span>Jelajahi peran lainnya</span>
          </div>
          <div className="role-buttons">
            <Button variant="secondary" onClick={() => start('tutor')}>
              <GraduationCap size={18} />
              Demo tutor
            </Button>
            <Button variant="secondary" onClick={() => start('admin')}>
              <ShieldCheck size={18} />
              Demo admin
            </Button>
          </div>
          <p className="small muted center">
            Pemilihan peran ini khusus demo, bukan pengangkatan role akun nyata.
          </p>
        </div>
      </main>
    </div>
  )
}
