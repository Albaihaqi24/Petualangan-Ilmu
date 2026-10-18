import { useState } from 'react'
import { Check } from 'lucide-react'
import { Button, Field, Notice, PageHeading } from '../../components/ui/Primitives'
import { useLearning } from '../../context/LearningContext'
import { avatars } from '../../lib/catalog'
import { Link } from 'react-router-dom'

export default function ProfilePage() {
  const { profile, updateProfile, mode } = useLearning()
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [name, setName] = useState(profile.display_name)
  const [grade, setGrade] = useState(profile.grade)
  const [avatar, setAvatar] = useState(profile.avatar)
  const [saved, setSaved] = useState(false)
  return (
    <>
      <PageHeading eyebrow="TEMAN PETUALANGAN" title="Kenalkan dirimu.">
        Gunakan nama panggilan dan pilih teman petualanganmu.
      </PageHeading>
      <form
        className="panel profile-form"
        onSubmit={async (event) => {
          event.preventDefault()
          setError('')
          setBusy(true)
          setSaved(false)
          try {
            await updateProfile({ display_name: name, grade: Number(grade), avatar })
            setSaved(true)
          } catch (err) {
            setError(err.message)
          } finally {
            setBusy(false)
          }
        }}
      >
        <Field label="Nama panggilan">
          <input
            value={name}
            onChange={(event) => {
              setName(event.target.value)
              setSaved(false)
            }}
            maxLength={24}
            required
          />
        </Field>
        <Field label="Tingkat kelas">
          <select
            value={grade}
            onChange={(event) => {
              setGrade(Number(event.target.value))
              setSaved(false)
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((value) => (
              <option value={value} key={value}>
                Kelas {value}
              </option>
            ))}
          </select>
        </Field>
        <fieldset className="avatar-field">
          <legend>Avatar petualang</legend>
          <div className="avatar-options">
            {avatars.map((item) => (
              <label className={avatar === item.id ? 'selected' : ''} key={item.id}>
                <input
                  type="radio"
                  name="avatar"
                  checked={avatar === item.id}
                  onChange={() => {
                    setAvatar(item.id)
                    setSaved(false)
                  }}
                />
                <span aria-hidden="true">{item.emoji}</span>
                <span className="sr-only">{item.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
        {error && <Notice error>{error}</Notice>}
        {saved && (
          <Notice>
            Profil {mode === 'demo' ? 'demo ' : ''}tersimpan. Selamat melanjutkan petualangan!
          </Notice>
        )}
        <Button type="submit" disabled={busy}>
          {mode === 'demo' ? 'Simpan profil demo' : 'Simpan profil'}
          <Check size={17} />
        </Button>
      </form>
      {mode === 'supabase' && (
        <p>
          <Link to="/account">Keamanan dan pengaturan akun</Link>
        </p>
      )}
    </>
  )
}
