// Mutasi terbatas akun/proyek UJI; tidak berjalan sebagai bagian npm test.
import assert from 'node:assert/strict'
import { createClient } from '@supabase/supabase-js'
import { readConfig } from '../src/lib/config.js'
if (process.env.CLOUD_TEST_CONFIRM !== 'petualangan-ilmu-test')
  throw new Error(
    'Khusus proyek uji: set CLOUD_TEST_CONFIRM=petualangan-ilmu-test setelah meninjau skrip.',
  )
const config = readConfig({ ...process.env, VITE_APP_MODE: 'supabase' })
if (config.error) throw new Error(config.error)
const lessonId = process.env.CLOUD_TEST_LESSON_ID
if (!lessonId)
  throw new Error(
    'Isi CLOUD_TEST_LESSON_ID dengan UUID materi yang telah ditinjau dan dipublikasikan di proyek uji.',
  )
const clients = Array.from({ length: 3 }, () =>
  createClient(config.url, config.key, {
    auth: { persistSession: false, autoRefreshToken: false },
  }),
)
async function unwrap(request) {
  const { data, error } = await request
  if (error) throw new Error(error.message)
  return data
}
try {
  for (let i = 0; i < 3; i++) {
    const n = i === 2 ? 2 : 1
    const email = process.env[`CLOUD_TEST_STUDENT_${n}_EMAIL`],
      password = process.env[`CLOUD_TEST_STUDENT_${n}_PASSWORD`]
    if (!email || !password)
      throw new Error(
        'Siapkan dua akun siswa uji terkonfirmasi melalui environment terminal privat.',
      )
    await unwrap(clients[i].auth.signInWithPassword({ email, password }))
  }
  const [first, second, other] = clients
  const user = (await unwrap(first.auth.getUser())).user
  const otherUser = (await unwrap(other.auth.getUser())).user
  assert.notEqual(user.id, otherUser.id, 'Dua siswa harus berbeda')
  const profile = () => unwrap(first.from('profiles').select('*').eq('id', user.id).single())
  assert.equal((await profile()).role, 'student')
  assert.ok(
    (await first.from('profiles').update({ total_xp: 999999 }).eq('id', user.id)).error,
    'XP tidak boleh diubah langsung',
  )
  assert.ok(
    (await first.schema('private').from('question_keys').select('*')).error,
    'Schema private tidak boleh diekspos',
  )
  const bank = await unwrap(first.from('questions').select('*'))
  assert.equal(bank.length, 0, 'Siswa tidak membaca bank soal langsung')
  assert.equal((await unwrap(other.from('profiles').select('id').eq('id', user.id))).length, 0)
  const beforeRead = (await profile()).total_xp
  const reading = await Promise.all(
    [first, second].map((c) => unwrap(c.rpc('complete_lesson_reading', { p_lesson_id: lessonId }))),
  )
  assert.ok(reading.filter((x) => x > 0).length <= 1)
  assert.equal(
    (await profile()).total_xp - beforeRead,
    reading.reduce((a, b) => a + b, 0),
  )
  const session = await unwrap(first.rpc('get_lesson_quiz', { p_lesson_id: lessonId, p_limit: 5 }))
  assert.ok(session.questions.length >= 5)
  for (const q of session.questions) {
    assert.equal(q.correct_option, undefined)
    assert.equal(q.explanation, undefined)
  }
  const answers = session.questions.map((q) => ({ question_id: q.id, selected_option: 0 }))
  const beforeQuiz = (await profile()).total_xp
  const results = await Promise.all(
    [first, second].map((c) =>
      unwrap(
        c.rpc('submit_quiz_answers', { p_attempt_id: session.attempt_id, p_answers: answers }),
      ),
    ),
  )
  assert.equal(results[0].score, results[1].score)
  assert.ok(results.filter((r) => r.xp_granted_now > 0).length <= 1)
  assert.equal(
    (await profile()).total_xp - beforeQuiz,
    results.reduce((sum, r) => sum + r.xp_granted_now, 0),
  )
  assert.ok((await other.rpc('get_quiz_result', { p_attempt_id: session.attempt_id })).error)
  const replay = await unwrap(
    first.rpc('submit_quiz_answers', { p_attempt_id: session.attempt_id, p_answers: answers }),
  )
  assert.equal(replay.xp_granted_now, 0)
  console.log(
    'Uji cloud siswa/Data API/konkurensi RPC lulus. Lengkapi QA tutor/admin, Storage, email, dan perangkat sesuai checklist rilis.',
  )
} finally {
  await Promise.allSettled(clients.map((c) => c.auth.signOut({ scope: 'local' })))
}
