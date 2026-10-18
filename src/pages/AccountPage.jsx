import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Field, Notice, PageHeading } from '../components/ui/Primitives'
import { useLearning } from '../context/LearningContext'

export default function AccountPage() {
  const { mode, requestDeletion, deletionRequests, session } = useLearning()
  const [confirmation, setConfirmation] = useState(''),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(''),
    [sent, setSent] = useState(false)
  const pending = deletionRequests?.some((r) => r.student_id === session?.user_id)
  return (
    <>
      <PageHeading eyebrow="PENGATURAN AKUN" title="Akun dan privasimu">
        Kelola akses dan permintaan penghapusan data.
      </PageHeading>
      {mode === 'demo' ? (
        <Notice>Demo tidak memiliki akun server. Progres demo tersimpan di browser ini.</Notice>
      ) : (
        <>
          <section className="panel">
            <h2>Akses akun</h2>
            <Link className="text-link" to="/reset-password">
              Ubah kata sandi
            </Link>
          </section>
          <section className="panel account-deletion">
            <h2>Permintaan penghapusan akun</h2>
            <p>
              Permintaan akan ditinjau pengelola agar akun dan berkas terkait dihapus dengan benar.
              Mengirim permintaan belum langsung menghapus akun. Pengelola akan memverifikasi
              identitas pemohon terlebih dahulu.
            </p>
            {pending || sent ? (
              <Notice>Permintaan penghapusan sudah tercatat dan menunggu proses pengelola.</Notice>
            ) : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault()
                  if (confirmation !== 'HAPUS') return
                  setBusy(true)
                  setError('')
                  try {
                    await requestDeletion()
                    setSent(true)
                  } catch (err) {
                    setError(err.message)
                  } finally {
                    setBusy(false)
                  }
                }}
              >
                <Field label="Ketik HAPUS untuk mengirim permintaan">
                  <input
                    value={confirmation}
                    onChange={(e) => setConfirmation(e.target.value)}
                    required
                    pattern="HAPUS"
                    autoComplete="off"
                  />
                </Field>
                {error && <Notice error>{error}</Notice>}
                <Button
                  variant="secondary"
                  type="submit"
                  disabled={busy || confirmation !== 'HAPUS'}
                >
                  {busy ? 'Mengirim…' : 'Ajukan penghapusan akun'}
                </Button>
              </form>
            )}
          </section>
        </>
      )}
    </>
  )
}
