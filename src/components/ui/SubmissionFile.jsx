import { useState } from 'react'
import { useLearning } from '../../context/LearningContext'
import { Button, Notice } from './Primitives'

export default function SubmissionFile({ path }) {
  const { signedFile } = useLearning()
  const [url, setUrl] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  return (
    <div className="attachment">
      <Button
        variant="secondary"
        disabled={busy}
        onClick={async () => {
          setBusy(true)
          setError('')
          setUrl('')
          try {
            setUrl(await signedFile(path))
          } catch (err) {
            setError(err.message)
          } finally {
            setBusy(false)
          }
        }}
      >
        {busy ? 'Menyiapkan lampiran…' : 'Siapkan tautan lampiran'}
      </Button>
      {url && (
        <p>
          <a href={url} target="_blank" rel="noreferrer">
            Buka lampiran (tautan berlaku 60 detik)
          </a>
        </p>
      )}
      {error && <Notice error>{error}</Notice>}
    </div>
  )
}
