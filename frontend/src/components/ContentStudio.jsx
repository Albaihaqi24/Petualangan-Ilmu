import { useEffect, useRef, useState } from 'react'
import { useLearning } from '../context/LearningContext'
import { Button, Field, Notice, Tag } from './ui/Primitives'

const blank = {
  title: '',
  slug: '',
  grade: 3,
  subject_id: '',
  chapter: 'Bab 1',
  summary: '',
  video_url: '',
  blocks: '[{"type":"text","body":""}]',
}
export default function ContentStudio() {
  const api = useLearning()
  const admin = api.session.role === 'admin'
  const available = api.lessons.filter((l) => admin || l.author_id === api.session.user_id)
  const [selected, setSelected] = useState('')
  const [form, setForm] = useState(blank)
  const [questions, setQuestions] = useState([])
  const [reviewed, setReviewed] = useState(false)
  const [dirty, setDirty] = useState(false)
  const [busy, setBusy] = useState(false),
    [error, setError] = useState(''),
    [message, setMessage] = useState('')
  const current = available.find((l) => l.id === selected)
  const sceneFormat =
    Array.isArray(current?.content?.scenes) &&
    current.content.scenes.length > 0 &&
    !current.content.blocks?.length
  const editor = useRef(api.editorQuestions)
  const [version, setVersion] = useState(0)
  useEffect(() => {
    let active = true
    setQuestions([])
    setReviewed(false)
    if (selected)
      editor
        .current(selected)
        .then((q) => {
          if (active) setQuestions(q)
        })
        .catch((err) => {
          if (active) setError(err.message)
        })
    return () => {
      active = false
    }
  }, [selected, version])
  function choose(id) {
    const lesson = available.find((l) => l.id === id)
    setSelected(id)
    setDirty(false)
    setError('')
    setMessage('')
    setForm(
      lesson
        ? {
            ...lesson,
            summary: lesson.content.summary || '',
            video_url: lesson.content.video_url || '',
            blocks: JSON.stringify(
              lesson.content.blocks?.length ? lesson.content.blocks : lesson.content.scenes || [],
              null,
              2,
            ),
          }
        : blank,
    )
  }
  function field(name, value) {
    setForm((previous) => ({ ...previous, [name]: value }))
    setReviewed(false)
    setDirty(true)
  }
  async function action(task, success) {
    if (busy) return
    setBusy(true)
    setError('')
    setMessage('')
    try {
      await task()
      setMessage(success)
      setVersion((v) => v + 1)
      setReviewed(false)
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }
  return (
    <section className="panel content-studio">
      <h2>Studio materi dan soal</h2>
      <p className="muted">
        Simpan sebagai draf, tinjau isi dan pembahasan, lalu minta admin memublikasikannya.
        Menyunting materi terbit mengembalikannya menjadi draf.
      </p>
      <Field label="Materi yang dikerjakan">
        <select value={selected} onChange={(e) => choose(e.target.value)} disabled={busy}>
          <option value="">Buat materi baru</option>
          {available.map((l) => (
            <option key={l.id} value={l.id}>
              {l.title} · {l.status}
            </option>
          ))}
        </select>
      </Field>
      {current && <Tag>{current.status}</Tag>}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          action(async () => {
            const blocks = JSON.parse(form.blocks)
            const id = await api.saveLesson(
              {
                subject_id: form.subject_id || api.subjects[0]?.id,
                title: form.title,
                slug: form.slug,
                grade: Number(form.grade),
                chapter: form.chapter,
                content: {
                  ...current?.content,
                  summary: form.summary,
                  video_url: form.video_url || null,
                  ...(sceneFormat ? { blocks: [], scenes: blocks } : { blocks }),
                  review_status: 'needs_teacher_review',
                },
              },
              selected || null,
            )
            setSelected(id)
            setDirty(false)
          }, 'Draf materi tersimpan.')
        }}
      >
        <div className="form-grid">
          <Field label="Judul materi">
            <input
              required
              maxLength={160}
              value={form.title}
              onChange={(e) => field('title', e.target.value)}
            />
          </Field>
          <Field label="Slug unik" hint="Huruf kecil, angka, dan tanda hubung.">
            <input
              required
              pattern="[a-z0-9]+(-[a-z0-9]+)*"
              value={form.slug}
              onChange={(e) => field('slug', e.target.value)}
            />
          </Field>
        </div>
        <div className="form-grid">
          <Field label="Mata pelajaran">
            <select
              required
              value={form.subject_id || api.subjects[0]?.id || ''}
              onChange={(e) => field('subject_id', e.target.value)}
            >
              {api.subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Kelas materi">
            <select value={form.grade} onChange={(e) => field('grade', Number(e.target.value))}>
              {[1, 2, 3, 4, 5, 6].map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <Field label="Bab">
          <input
            required
            maxLength={80}
            value={form.chapter}
            onChange={(e) => field('chapter', e.target.value)}
          />
        </Field>
        <Field label="Ringkasan">
          <textarea
            required
            maxLength={2000}
            value={form.summary}
            onChange={(e) => field('summary', e.target.value)}
          />
        </Field>
        <Field label="Video YouTube opsional">
          <input
            type="url"
            value={form.video_url}
            onChange={(e) => field('video_url', e.target.value)}
          />
        </Field>
        <Field
          label={sceneFormat ? 'Adegan komik (JSON)' : 'Blok materi (JSON)'}
          hint={
            sceneFormat
              ? 'Sunting dialog, caption panel dan mini-check. Isi komik disimpan sekali sebagai scenes.'
              : 'Tipe text/tip memakai body; image memakai url HTTPS dan caption. Contoh: [{"type":"text","body":"Ayo amati tiga kelompok benda."}]'
          }
        >
          <textarea
            className="code-input"
            required
            rows={8}
            value={form.blocks}
            onChange={(e) => field('blocks', e.target.value)}
          />
        </Field>
        <Button disabled={busy || (!admin && current?.status === 'published')} type="submit">
          Simpan draf materi
        </Button>
      </form>
      {selected && (
        <>
          {dirty && <Notice>Simpan perubahan materi sebelum melakukan publikasi.</Notice>}
          <h3>Soal dan pembahasan untuk ditinjau</h3>
          <p className="small muted">
            Kunci di bagian ini hanya tersedia bagi editor yang berwenang.
          </p>
          {questions.map((q, i) => (
            <article className="review-card" key={q.id}>
              <h4>
                {i + 1}. {q.prompt}
              </h4>
              <p>{q.options.map((o, j) => `${'ABCD'[j]}. ${o}`).join(' · ')}</p>
              <p>
                <strong>Kunci: {'ABCD'[q.correct_option]}</strong> · {q.explanation}
              </p>
              <Tag>{q.status}</Tag>
            </article>
          ))}
          {!questions.length && (
            <p>Belum ada soal. Tambahkan soal draf di bawah atau gunakan impor admin.</p>
          )}
          {(admin || current?.status === 'draft') && (
            <DraftQuestion
              key={selected}
              lessonId={selected}
              onSaved={() => {
                setVersion((v) => v + 1)
                setReviewed(false)
              }}
            />
          )}
          {admin && (
            <div className="publish-controls">
              <label className="review-confirm">
                <input
                  type="checkbox"
                  checked={reviewed}
                  onChange={(e) => setReviewed(e.target.checked)}
                />{' '}
                Saya telah meninjau ketepatan materi, seluruh soal, kunci, pembahasan, dan
                kesesuaian usia bersama peninjau pembelajaran.
              </label>
              <div className="row wrap gap-sm">
                <Button
                  disabled={busy || dirty || !reviewed || questions.length < 5}
                  onClick={() =>
                    action(
                      () => api.publishLesson(selected, true, reviewed),
                      'Materi dan seluruh soal berhasil dipublikasikan.',
                    )
                  }
                >
                  Publikasikan materi
                </Button>
                <Button
                  disabled={busy}
                  variant="secondary"
                  onClick={() =>
                    action(
                      () => api.publishLesson(selected, false, false),
                      'Materi dikembalikan menjadi draf.',
                    )
                  }
                >
                  Tarik publikasi
                </Button>
              </div>
            </div>
          )}
        </>
      )}
      {error && <Notice error>{error}</Notice>}
      {message && <Notice>{message}</Notice>}
    </section>
  )
}
function DraftQuestion({ lessonId, onSaved }) {
  const { saveDraftQuestion } = useLearning()
  const [prompt, setPrompt] = useState(''),
    [options, setOptions] = useState(['', '', '', '']),
    [correct, setCorrect] = useState(0),
    [explanation, setExplanation] = useState('')
  const [busy, setBusy] = useState(false),
    [error, setError] = useState(''),
    [message, setMessage] = useState('')
  return (
    <form
      className="draft-question"
      onSubmit={async (e) => {
        e.preventDefault()
        if (busy) return
        setBusy(true)
        setError('')
        setMessage('')
        try {
          await saveDraftQuestion({
            lesson_id: lessonId,
            prompt,
            options,
            correct_option: Number(correct),
            explanation,
          })
          setPrompt('')
          setOptions(['', '', '', ''])
          setExplanation('')
          setMessage('Soal draf tersimpan.')
          onSaved()
        } catch (err) {
          setError(err.message)
        } finally {
          setBusy(false)
        }
      }}
    >
      <h3>Tambah soal draf</h3>
      <Field label="Pertanyaan">
        <textarea
          required
          maxLength={3000}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </Field>
      <div className="form-grid">
        {options.map((option, i) => (
          <Field label={`Opsi ${'ABCD'[i]}`} key={i}>
            <input
              required
              maxLength={500}
              value={option}
              onChange={(e) =>
                setOptions((previous) => previous.map((v, j) => (j === i ? e.target.value : v)))
              }
            />
          </Field>
        ))}
      </div>
      <Field label="Jawaban tepat">
        <select value={correct} onChange={(e) => setCorrect(Number(e.target.value))}>
          {options.map((_, i) => (
            <option key={i} value={i}>
              {'ABCD'[i]}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Pembahasan yang membantu">
        <textarea
          required
          maxLength={3000}
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
        />
      </Field>
      <Button disabled={busy} type="submit">
        Simpan soal draf
      </Button>
      {error && <Notice error>{error}</Notice>}
      {message && <Notice>{message}</Notice>}
    </form>
  )
}
