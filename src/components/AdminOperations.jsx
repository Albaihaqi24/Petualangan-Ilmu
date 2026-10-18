import { useState } from 'react'
import { useLearning } from '../context/LearningContext'
import { Button, Field, Notice, formatDate } from './ui/Primitives'

export default function AdminOperations() {
  const api = useLearning()
  const [student, setStudent] = useState(''),
    [confirmed, setConfirmed] = useState(false)
  const [subject, setSubject] = useState({ name: '', slug: '', description: '', is_active: true })
  const [busy, setBusy] = useState(false),
    [error, setError] = useState(''),
    [message, setMessage] = useState('')
  async function action(task, text) {
    if (busy) return
    setBusy(true)
    setError('')
    setMessage('')
    try {
      await task()
      setMessage(text)
      setConfirmed(false)
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }
  return (
    <>
      <section className="panel admin-operations">
        <h2>Pengelolaan tutor dan katalog</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (confirmed)
              action(
                () => api.promoteTutor(student),
                'Peran tutor diberikan. Pengguna perlu memuat ulang akun.',
              )
          }}
        >
          <Field label="Akun calon tutor">
            <select
              required
              value={student}
              onChange={(e) => {
                setStudent(e.target.value)
                setConfirmed(false)
              }}
            >
              <option value="">Pilih akun yang sudah diverifikasi</option>
              {api.students
                .filter((s) => s.role === 'student')
                .map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.display_name} · {s.id}
                  </option>
                ))}
            </select>
          </Field>
          <label className="review-confirm">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
            />{' '}
            Identitas dan kelayakan pendamping telah diverifikasi pengelola.
          </label>
          <Button disabled={busy || !student || !confirmed} type="submit">
            Berikan peran tutor
          </Button>
        </form>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            action(() => api.saveSubject(subject), 'Mata pelajaran tersimpan.')
          }}
        >
          <h3>Katalog mata pelajaran</h3>
          <Field label="Pilih mata pelajaran">
            <select
              value={subject.id || ''}
              onChange={(e) =>
                setSubject(
                  api.subjects.find((s) => s.id === e.target.value) || {
                    name: '',
                    slug: '',
                    description: '',
                    is_active: true,
                  },
                )
              }
            >
              <option value="">Tambah baru</option>
              {api.subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Nama mata pelajaran">
            <input
              required
              maxLength={80}
              value={subject.name}
              onChange={(e) => setSubject({ ...subject, name: e.target.value })}
            />
          </Field>
          <Field label="Slug mata pelajaran">
            <input
              required
              pattern="[a-z0-9]+(-[a-z0-9]+)*"
              value={subject.slug}
              onChange={(e) => setSubject({ ...subject, slug: e.target.value })}
            />
          </Field>
          <Field label="Deskripsi">
            <textarea
              maxLength={2000}
              value={subject.description}
              onChange={(e) => setSubject({ ...subject, description: e.target.value })}
            />
          </Field>
          <label className="review-confirm">
            <input
              type="checkbox"
              checked={subject.is_active}
              onChange={(e) => setSubject({ ...subject, is_active: e.target.checked })}
            />
            Tampilkan pada katalog
          </label>
          <Button disabled={busy} type="submit">
            Simpan mata pelajaran
          </Button>
        </form>
        {error && <Notice error>{error}</Notice>}
        {message && <Notice>{message}</Notice>}
      </section>
      <section className="panel">
        <h2>Permintaan penghapusan akun</h2>
        <p>
          Proses melalui prosedur operasional setelah memverifikasi pemohon. Daftar ini belum
          menghapus akun secara otomatis.
        </p>
        {api.deletionRequests.length ? (
          api.deletionRequests.map((r) => (
            <article key={r.student_id} className="catalog-row">
              <code>{r.student_id}</code>
              <span>
                {r.status} · {formatDate(r.requested_at)}
              </span>
            </article>
          ))
        ) : (
          <p>Belum ada permintaan.</p>
        )}
      </section>
      <section className="panel">
        <h2>Audit perubahan terbaru</h2>
        {api.auditLog.length ? (
          api.auditLog.map((event) => (
            <article key={event.id} className="catalog-row">
              <div>
                <strong>{event.action}</strong>
                <p className="small">
                  Pelaku: {event.actor_id || 'akun dihapus'} · Target: {event.target_id}
                </p>
              </div>
              <span>{formatDate(event.created_at)}</span>
            </article>
          ))
        ) : (
          <p>Belum ada perubahan tercatat.</p>
        )}
      </section>
    </>
  )
}
