import { useState } from 'react'
import { CheckCircle2, Clock3, KeyRound, Send, Users } from 'lucide-react'
import {
  Button,
  EmptyState,
  Field,
  formatDate,
  Notice,
  PageHeading,
  Tag,
  TextLink,
} from '../../components/ui/Primitives'
import SubmissionFile from '../../components/ui/SubmissionFile'
import { useLearning } from '../../context/LearningContext'
import CharacterAvatar from '../../components/adventure/CharacterAvatar'

export default function ClassesPage() {
  const { classes, memberships, assignments, submissions, joinClass, submitAssignment, mode } =
    useLearning()
  const [code, setCode] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [joining, setJoining] = useState(false)
  const mine = classes.filter((classroom) => memberships.includes(classroom.id))
  async function join(event) {
    event.preventDefault()
    if (joining) return
    setJoining(true)
    setError('')
    setMessage('')
    try {
      const classroom = await joinClass(code)
      setMessage(`Kamu sudah bergabung dengan ${classroom.name}. Selamat belajar bersama!`)
      setCode('')
    } catch (err) {
      setError(err.message)
    } finally {
      setJoining(false)
    }
  }
  return (
    <>
      <PageHeading eyebrow="TUMBUH BERSAMA" title="Kelas kecil, semangat besar.">
        Ada kakak tutor yang menemani langkah belajarmu.
      </PageHeading>
      <div className="buddy-tip">
        <CharacterAvatar character="piko" emotion="semangat" size={76} decorative />
        <p>
          <strong>Pesan kecil dari Piko</strong>
          <br />
          Buka tugas kelasmu dan periksa tanggalnya. Kamu boleh meminta bantuan kakak tutor jika ada
          yang belum jelas.
        </p>
      </div>
      <section className="join-panel">
        <div className="join-copy">
          <span className="stat-icon tone-peach">
            <KeyRound size={25} />
          </span>
          <div>
            <h2>Punya kode kelas?</h2>
            <p>
              {mode === 'demo' ? (
                <>
                  Masukkan kode dari kakak tutor. Untuk mencoba, pakai <strong>ILMU03</strong>{' '}
                  dengan profil kelas 3.
                </>
              ) : (
                'Masukkan kode enam karakter dari tutor kelasmu.'
              )}
            </p>
          </div>
        </div>
        <form onSubmit={join} className="join-form">
          <Field label="Kode kelas">
            <input
              value={code}
              onChange={(event) => setCode(event.target.value.toUpperCase())}
              maxLength={6}
              minLength={6}
              required
              autoComplete="off"
              placeholder="ILMU03"
            />
          </Field>
          <Button type="submit" disabled={joining}>
            Gabung
            <Users size={17} />
          </Button>
        </form>
      </section>
      {message && <Notice>{message}</Notice>}
      {error && <Notice error>{error}</Notice>}
      {!mine.length && (
        <EmptyState title="Teman belajar menunggumu">
          Belum ada kelas yang diikuti. Masukkan kode di atas untuk mencoba alur tugas bersama
          tutor.
        </EmptyState>
      )}
      {mine.map((classroom) => (
        <section className="class-section" key={classroom.id}>
          <div className="section-heading">
            <div>
              <Tag color="mint">Kelas {classroom.grade}</Tag>
              <h2>{classroom.name}</h2>
              <p className="muted">
                {mode === 'demo' ? 'Didampingi Kak Dita · Kode' : 'Kode kelas'}{' '}
                {classroom.join_code}
              </p>
            </div>
            <span className="stat-icon tone-mint">
              <Users size={24} />
            </span>
          </div>
          {assignments
            .filter((assignment) => assignment.class_id === classroom.id)
            .map((assignment) => (
              <AssignmentCard
                key={assignment.id}
                assignment={assignment}
                submission={submissions.find((entry) => entry.assignment_id === assignment.id)}
                onSubmit={submitAssignment}
              />
            ))}
          {!assignments.some((assignment) => assignment.class_id === classroom.id) && (
            <EmptyState title="Belum ada tugas baru">
              Sambil menunggu kakak tutor, kamu bisa menjelajahi pulau pengetahuan.
            </EmptyState>
          )}
        </section>
      ))}
      <p className="editorial-note">
        {mode === 'demo'
          ? 'Kelas dan tutor pada halaman ini adalah simulasi di browser yang sama. Tidak ada percakapan atau pengiriman data ke tutor sungguhan.'
          : 'Kumpulkan jawaban sebelum tenggat. Hanya kamu dan tutor kelas yang dapat membaca kirimanmu.'}
      </p>
    </>
  )
}

function AssignmentCard({ assignment, submission, onSubmit }) {
  const { mode, uploadFile } = useLearning()
  const [file, setFile] = useState(null)
  const [busy, setBusy] = useState(false)
  const [answer, setAnswer] = useState(submission?.answer || '')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const graded = submission?.score !== null && submission?.score !== undefined
  const overdue = new Date(assignment.due_at).getTime() < Date.now()
  return (
    <article className="assignment-card panel">
      <div className="row between wrap gap-sm">
        <Tag color={graded ? 'mint' : submission ? 'blue' : 'peach'}>
          {graded
            ? 'Sudah ada umpan balik'
            : submission
              ? 'Menunggu kakak tutor'
              : 'Petualangan bersama'}
        </Tag>
        <span className="small muted row gap-sm">
          <Clock3 size={14} />
          {formatDate(assignment.due_at)}
        </span>
      </div>
      <h3>{assignment.title}</h3>
      <p className="preserve-lines">{assignment.instructions}</p>
      <TextLink to={`/student/lesson/${assignment.lesson_id}`}>Baca materi pendamping</TextLink>
      {submission?.file_path && <SubmissionFile path={submission.file_path} />}
      {graded ? (
        <div className="graded-feedback">
          <CheckCircle2 size={24} />
          <div>
            <h4>
              {mode === 'demo' ? 'Komentar Kak Dita' : 'Komentar tutor'} · Nilai {submission.score}
              /100
            </h4>
            <p>{submission.feedback}</p>
            <p className="small">Jawabanmu: {submission.answer}</p>
            <Tag color="cream">+15 XP{mode === 'demo' ? ' demo' : ''} pada penilaian pertama</Tag>
          </div>
        </div>
      ) : (
        <form
          onSubmit={async (event) => {
            event.preventDefault()
            setError('')
            setMessage('')
            if (busy) return
            setBusy(true)
            let uploaded = null
            try {
              if (file) uploaded = await uploadFile(assignment.id, file)
              await onSubmit(assignment.id, answer, uploaded || submission?.file_path || null)
              setFile(null)
              setMessage(
                mode === 'demo'
                  ? 'Jawaban demo tersimpan. Kakak tutor dapat meninjaunya lewat demo tutor.'
                  : 'Jawaban tersimpan dan dapat ditinjau tutor kelasmu.',
              )
            } catch (err) {
              setError(err.message)
              // Respons putus bisa terjadi sesudah commit. Jangan hapus lampiran yang mungkin sudah dirujuk kiriman.
            } finally {
              setBusy(false)
            }
          }}
        >
          <Field
            label="Ceritakan jawabanmu"
            hint="Jawaban teks atau tautan, maksimal 3.000 karakter. Jangan masukkan data pribadi."
          >
            <textarea
              rows={4}
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              maxLength={3000}
              required
              disabled={overdue}
              placeholder="Aku menemukan tiga kelompok …"
            />
          </Field>
          {mode === 'supabase' && (
            <Field
              label="Lampiran opsional"
              hint="JPG, PNG, WebP atau PDF; maksimal 5 MB. Hindari foto yang memuat data pribadi."
            >
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,application/pdf"
                disabled={overdue || busy}
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </Field>
          )}
          {overdue && <Notice>Tenggat sudah lewat. Hubungi tutor untuk langkah berikutnya.</Notice>}
          {error && <Notice error>{error}</Notice>}
          {message && <Notice>{message}</Notice>}
          <Button type="submit" disabled={overdue || busy}>
            {mode === 'demo'
              ? submission
                ? 'Perbarui jawaban demo'
                : 'Simpan jawaban demo'
              : submission
                ? 'Perbarui jawaban'
                : 'Kirim jawaban'}
            <Send size={16} />
          </Button>
        </form>
      )}
    </article>
  )
}
