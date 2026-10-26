import { useRef, useState } from 'react'
import { BookOpen, CheckCircle2, Database, Download, FileJson, Upload } from 'lucide-react'
import { Button, Field, LinkButton, Notice, PageHeading, Tag } from '../../components/ui/Primitives'
import { useLearning } from '../../context/LearningContext'
import ContentStudio from '../../components/ContentStudio'
import AdminOperations from '../../components/AdminOperations'
import { csvExample, jsonExample, validateImport } from '../../services/importService'

export default function AdminPage() {
  const {
    importQuestions,
    mode,
    lessons,
    editorialNotice,
    getSubject,
    questionCount,
    importedCount,
  } = useLearning()
  const jsonSample = jsonExample.replaceAll(
    'matematika-3',
    mode === 'demo' ? 'matematika-3' : lessons[0]?.id || '',
  )
  const csvSample = csvExample.replaceAll(
    'matematika-3',
    mode === 'demo' ? 'matematika-3' : lessons[0]?.id || '',
  )
  const batch = useRef(crypto.randomUUID())
  const [busy, setBusy] = useState(false)
  const [format, setFormat] = useState('json')
  const [text, setText] = useState(jsonSample)
  const [preview, setPreview] = useState(null)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [grade, setGrade] = useState(3)
  function resetFeedback() {
    setPreview(null)
    setError('')
    setMessage('')
  }
  function example(nextFormat = format) {
    setFormat(nextFormat)
    setText(nextFormat === 'csv' ? csvSample : jsonSample)
    resetFeedback()
  }
  function validate(event) {
    batch.current = crypto.randomUUID()
    event.preventDefault()
    setMessage('')
    setError('')
    try {
      setPreview(
        validateImport(
          text,
          format,
          lessons.map((lesson) => lesson.id),
        ),
      )
    } catch (err) {
      setPreview(null)
      setError(err.message)
    }
  }
  async function readFile(event) {
    const file = event.target.files?.[0]
    if (!file) return
    resetFeedback()
    if (file.size > 512_000) {
      setError('File maksimal 500 KB untuk demo.')
      return
    }
    if (!/\.(csv|json)$/i.test(file.name)) {
      setError('Gunakan file .csv atau .json.')
      return
    }
    try {
      setText(await file.text())
      setFormat(file.name.toLowerCase().endsWith('.csv') ? 'csv' : 'json')
    } catch {
      setError('File belum dapat dibaca. Coba tempel isinya ke kotak di bawah.')
    }
  }
  function downloadExample() {
    const blob = new Blob([format === 'csv' ? csvSample : jsonSample], {
      type: format === 'csv' ? 'text/csv;charset=utf-8' : 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `contoh-soal.${format}`
    link.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }
  return (
    <>
      <PageHeading eyebrow="STUDIO KONTEN" title="Pengetahuan yang dirawat bersama.">
        Siapkan materi yang jelas, soal yang adil, dan pembahasan yang membantu.
      </PageHeading>
      <p>
        <LinkButton to="/sumber-belajar" variant="secondary">
          Buku resmi & kerangka materi
        </LinkButton>
      </p>
      <Notice>
        {mode === 'demo'
          ? 'Studio ini adalah demo lokal. Impor menyimpan contoh soal di browser ini dan tidak menulis ke Supabase. Publikasi konten nyata baru tersedia setelah backend siap.'
          : 'Impor tersimpan sebagai draf. Tinjau ketepatan materi dan soal sebelum memublikasikannya melalui studio.'}
      </Notice>
      <div className="stat-grid">
        <div className="stat-card">
          <span className="stat-icon tone-mint">
            <BookOpen size={22} />
          </span>
          <div>
            <strong>{lessons.length}</strong>
            <span>Materi contoh</span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon tone-peach">
            <Database size={22} />
          </span>
          <div>
            <strong>{questionCount}</strong>
            <span>Soal demo tersedia</span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon tone-lavender">
            <Upload size={22} />
          </span>
          <div>
            <strong>{importedCount}</strong>
            <span>Soal diimpor lokal</span>
          </div>
        </div>
      </div>
      <section className="panel import-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">BANK SOAL CONTOH</p>
            <h2>Impor soal, periksa bersama.</h2>
          </div>
          <Button variant="secondary" onClick={downloadExample}>
            <Download size={16} />
            Unduh contoh
          </Button>
        </div>
        <p className="muted">
          Pilih JSON atau CSV. Kunci jawaban menggunakan indeks 0–3. Maksimal 200 soal dan 500 KB
          per batch demo.
        </p>
        <div className="form-grid">
          <Field label="Format berkas">
            <select value={format} onChange={(event) => example(event.target.value)}>
              <option value="json">JSON</option>
              <option value="csv">CSV</option>
            </select>
          </Field>
          <Field label="Buka file contoh">
            <input type="file" accept=".json,.csv" onChange={readFile} />
          </Field>
        </div>
        <form onSubmit={validate}>
          <Field
            label={`Isi ${format.toUpperCase()}`}
            hint="lesson_id harus cocok dengan ID pada katalog di bawah. Empat opsi harus berbeda dan memiliki pembahasan."
          >
            <textarea
              className="code-input"
              value={text}
              onChange={(event) => {
                setText(event.target.value)
                resetFeedback()
              }}
              rows={12}
              spellCheck={false}
              required
            />
          </Field>
          <div className="row wrap gap-sm">
            <Button type="submit">
              <FileJson size={17} />
              Validasi dahulu
            </Button>
            <Button type="button" variant="ghost" onClick={() => example()}>
              Muat contoh lagi
            </Button>
          </div>
        </form>
        {error && <Notice error>{error}</Notice>}
        {message && <Notice>{message}</Notice>}
        {preview && (
          <div className="import-preview">
            <div className="row between wrap gap-sm">
              <h3>Hasil pemeriksaan</h3>
              <Tag color={preview.errors.length ? 'peach' : 'mint'}>
                {preview.valid.length}/{preview.total} soal valid
              </Tag>
            </div>
            {preview.errors.length > 0 && (
              <Notice error>
                <ul>
                  {preview.errors.map((issue) => (
                    <li key={issue}>{issue}</li>
                  ))}
                </ul>
                Seluruh batch harus valid sebelum disimpan.
              </Notice>
            )}
            {preview.valid.slice(0, 5).map((item, index) => (
              <div className="preview-question" key={index}>
                <strong>
                  {index + 1}. {item.prompt}
                </strong>
                <p>{item.options.map((option, i) => `${'ABCD'[i]}. ${option}`).join(' · ')}</p>
                <small>
                  Materi: {item.lesson_id} · Kunci: {'ABCD'[item.correct_option]}
                </small>
              </div>
            ))}
            {preview.valid.length > 5 && (
              <p className="small muted">
                Menampilkan lima soal pertama dari {preview.valid.length} soal valid.
              </p>
            )}
            <Button
              disabled={busy || Boolean(preview.errors.length) || !preview.valid.length}
              onClick={async () => {
                if (busy) return
                setBusy(true)
                try {
                  await importQuestions(preview.valid, batch.current)
                  setMessage(
                    mode === 'demo'
                      ? preview.valid.length +
                          ' soal tersimpan di demo browser. Soal dapat muncul pada latihan materi terkait.'
                      : preview.valid.length +
                          ' soal tersimpan sebagai draf. Tinjau di studio sebelum publikasi.',
                  )
                  setPreview(null)
                } catch (err) {
                  setError(err.message)
                } finally {
                  setBusy(false)
                }
              }}
            >
              <CheckCircle2 size={17} />
              {mode === 'demo' ? 'Simpan batch valid ke demo' : 'Simpan batch sebagai draf'}
            </Button>
          </div>
        )}
      </section>
      <section className="panel catalog-panel">
        <div className="section-heading">
          <div>
            <h2>Katalog materi contoh</h2>
            <p className="muted">Konten ini belum melewati review pedagogis.</p>
          </div>
          <Field label="Tingkat">
            <select value={grade} onChange={(event) => setGrade(Number(event.target.value))}>
              {[1, 2, 3, 4, 5, 6].map((value) => (
                <option key={value} value={value}>
                  Kelas {value}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <div className="catalog-table" role="list">
          {lessons
            .filter((lesson) => lesson.grade === grade)
            .map((lesson) => (
              <article className="catalog-row" key={lesson.id} role="listitem">
                <div>
                  <span className="small muted">{getSubject(lesson.subject_id)?.name}</span>
                  <h3>{lesson.title}</h3>
                  <code>{lesson.id}</code>
                </div>
                <Tag color="cream">{mode === 'demo' ? 'Published · contoh' : lesson.status}</Tag>
              </article>
            ))}
        </div>
        <p className="editorial-note">{editorialNotice}</p>
      </section>
      {mode === 'supabase' && (
        <>
          <ContentStudio />
          <AdminOperations />
        </>
      )}
    </>
  )
}
