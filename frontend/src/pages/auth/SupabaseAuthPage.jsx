import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Brand, Button, Field, Notice, LinkButton } from '../../components/ui/Primitives'
import { useLearning } from '../../context/LearningContext'
import { avatars } from '../../lib/catalog'
import CharacterAvatar from '../../components/adventure/CharacterAvatar'

export default function SupabaseAuthPage({ register = false }) {
  const { session, signIn, signUp } = useLearning()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [grade, setGrade] = useState(3)
  const [avatar, setAvatar] = useState('fox')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  if (session) return <Navigate to={`/${session.role}`} replace />
  async function submit(event) {
    event.preventDefault()
    if (busy) return
    setBusy(true)
    setError('')
    setMessage('')
    try {
      if (register) {
        const result = await signUp(
          email.trim(),
          password,
          { display_name: name.trim(), grade: Number(grade), avatar },
          `${window.location.origin}/auth/callback`,
        )
        if (result.session) navigate('/student')
        else {
          setMessage(
            'Periksa email untuk melanjutkan pendaftaran. Jika akun sudah ada, gunakan halaman masuk.',
          )
          setPassword('')
        }
      } else {
        await signIn(email.trim(), password)
        setPassword('')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }
  return (
    <main className="standalone auth-form">
      <Brand />
      <h1>{register ? 'Mulai petualanganmu' : 'Selamat datang kembali'}</h1>
      <p className="muted">
        {register
          ? 'Gunakan email yang didampingi orang tua atau wali.'
          : 'Masuk untuk melanjutkan progres belajarmu.'}
      </p>
      <form onSubmit={submit}>
        {register && (
          <>
            <Field label="Nama panggilan">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={24}
                required
                autoComplete="nickname"
              />
            </Field>
            <Field label="Kelas">
              <select value={grade} onChange={(e) => setGrade(Number(e.target.value))}>
                {[1, 2, 3, 4, 5, 6].map((g) => (
                  <option key={g} value={g}>
                    Kelas {g}
                  </option>
                ))}
              </select>
            </Field>
            <fieldset className="avatar-field">
              <legend>Teman petualangan</legend>
              <div className="avatar-options">
                {avatars.map((a) => (
                  <label key={a.id} className={avatar === a.id ? 'selected' : ''}>
                    <input
                      type="radio"
                      name="avatar"
                      checked={avatar === a.id}
                      onChange={() => setAvatar(a.id)}
                    />
                    <span aria-hidden="true">
                      {a.character ? (
                        <CharacterAvatar
                          character={a.character}
                          size={60}
                          decorative
                          idle={false}
                        />
                      ) : (
                        a.emoji
                      )}
                    </span>
                    <span className="sr-only">{a.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </>
        )}
        <Field label="Email">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            maxLength={254}
          />
        </Field>
        <Field label="Kata sandi" hint="Minimal 8 karakter, sesuai ketentuan akun.">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            autoComplete={register ? 'new-password' : 'current-password'}
          />
        </Field>
        {error && <Notice error>{error}</Notice>}
        {message && <Notice>{message}</Notice>}
        <Button disabled={busy} type="submit" className="full-width">
          {busy ? 'Mohon tunggu…' : register ? 'Daftar akun' : 'Masuk'}
        </Button>
      </form>
      <p className="auth-switch">
        <Link to={register ? '/login' : '/register'}>
          {register ? 'Sudah punya akun? Masuk' : 'Belum punya akun? Daftar'}
        </Link>
      </p>
      {!register && (
        <p className="auth-switch">
          <Link to="/forgot-password">Lupa kata sandi?</Link>
        </p>
      )}
      <p className="auth-switch">
        <Link to="/">Kembali ke beranda</Link>
      </p>
    </main>
  )
}

export function PasswordPage({ reset = false }) {
  const { mode, session, resetPassword, updatePassword } = useLearning()
  const [email, setEmail] = useState(''),
    [password, setPassword] = useState(''),
    [repeat, setRepeat] = useState('')
  const [busy, setBusy] = useState(false),
    [error, setError] = useState(''),
    [message, setMessage] = useState('')
  if (mode === 'demo')
    return (
      <main className="standalone">
        <h1>Pemulihan akun</h1>
        <Notice>
          Fitur email pemulihan tersedia pada mode Supabase. Demo tidak menyimpan kata sandi.
        </Notice>
        <LinkButton to="/login">Kembali ke demo</LinkButton>
      </main>
    )
  async function submit(event) {
    event.preventDefault()
    setError('')
    setMessage('')
    if (reset && password !== repeat) {
      setError('Kedua kata sandi harus sama.')
      return
    }
    setBusy(true)
    try {
      if (reset) {
        await updatePassword(password)
        setMessage('Kata sandi diperbarui.')
        setPassword('')
        setRepeat('')
      } else {
        await resetPassword(email.trim(), `${window.location.origin}/reset-password`)
        setMessage('Jika email terdaftar, tautan pemulihan akan dikirim. Periksa kotak masuk.')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }
  return (
    <main className="standalone auth-form">
      <Brand />
      <h1>{reset ? 'Atur kata sandi baru' : 'Pulihkan akunmu'}</h1>
      {reset && !session ? (
        <Notice>Buka tautan pemulihan dari email terlebih dahulu, atau masuk ke akunmu.</Notice>
      ) : (
        <form onSubmit={submit}>
          {reset ? (
            <>
              <Field label="Kata sandi baru">
                <input
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </Field>
              <Field label="Ulangi kata sandi baru">
                <input
                  type="password"
                  required
                  minLength={8}
                  value={repeat}
                  onChange={(e) => setRepeat(e.target.value)}
                  autoComplete="new-password"
                />
              </Field>
            </>
          ) : (
            <Field label="Email akun">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </Field>
          )}
          {error && <Notice error>{error}</Notice>}
          {message && <Notice>{message}</Notice>}
          <Button type="submit" disabled={busy}>
            {busy ? 'Mohon tunggu…' : reset ? 'Simpan kata sandi' : 'Kirim tautan pemulihan'}
          </Button>
        </form>
      )}
      <p className="auth-switch">
        <Link to="/login">Kembali ke halaman masuk</Link>
      </p>
    </main>
  )
}

export function AuthCallbackPage() {
  const { session, storageNotice, recovery } = useLearning()
  if (session) return <Navigate to={recovery ? '/reset-password' : `/${session.role}`} replace />
  return (
    <main className="standalone">
      <h1>Lanjutkan ke akunmu</h1>
      {storageNotice && <Notice error>{storageNotice}</Notice>}
      <p>
        Silakan masuk untuk melanjutkan. Jika tautan email sudah kedaluwarsa, minta tautan baru
        melalui halaman pemulihan.
      </p>
      <LinkButton to="/login">Masuk</LinkButton>
    </main>
  )
}
