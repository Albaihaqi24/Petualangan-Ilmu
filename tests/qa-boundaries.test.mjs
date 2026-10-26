import assert from 'node:assert/strict'
import test from 'node:test'
import { readConfig } from '../frontend/src/lib/config.js'
import {
  jakartaDate,
  levelFromXp,
  quizXp,
  safeImageUrl,
  scoreDemoQuiz,
  shuffled,
  youtubeEmbedUrl,
} from '../frontend/src/lib/learning.js'
import { validateImport } from '../frontend/src/services/importService.js'

const lessonId = 'qa-lesson'
const makeItem = (overrides = {}) => ({
  lesson_id: lessonId,
  prompt: 'Berapa dua ditambah dua?',
  options: ['1', '2', '3', '4'],
  correct_option: 3,
  explanation: 'Dua ditambah dua sama dengan empat.',
  ...overrides,
})
const validate = (items) => validateImport(JSON.stringify(items), 'json', [lessonId])
const makeQuestions = (count) =>
  Array.from({ length: count }, (_, index) => ({ ...makeItem(), id: `qa-${index}` }))
const answersFor = (questions, correctCount = questions.length) =>
  Object.fromEntries(questions.map((q, index) => [q.id, index < correctCount ? 3 : 0]))

test('QA-WB-01: konfigurasi demo, URL HTTPS, key kosong dan legacy anon', () => {
  assert.deepEqual(readConfig({}), { mode: 'demo', error: null })
  const env = {
    VITE_APP_MODE: 'supabase',
    VITE_SUPABASE_URL: 'https://qa.invalid',
    VITE_SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_qa_only',
  }
  assert.equal(readConfig(env).error, null)
  for (const url of ['http://qa.invalid', 'alamat-rusak', 'javascript:alert(1)'])
    assert.match(readConfig({ ...env, VITE_SUPABASE_URL: url }).error, /HTTPS/)
  for (const key of ['', 'YOUR_KEY', 'sb_secret_qa_only', 'jwt-rusak'])
    assert.ok(readConfig({ ...env, VITE_SUPABASE_PUBLISHABLE_KEY: key }).error)
  const anonPayload = Buffer.from(JSON.stringify({ role: 'anon' })).toString('base64url')
  assert.equal(
    readConfig({ ...env, VITE_SUPABASE_PUBLISHABLE_KEY: `header.${anonPayload}.signature` }).error,
    null,
  )
  // Validasi format lokal bukan verifikasi tanda tangan JWT atau konektivitas cloud.
})

test('QA-WB-02: batas level dan normalisasi input XP', () => {
  for (const value of [-1, -100, undefined, null, 'bukan-angka', 0])
    assert.deepEqual(levelFromXp(value), { level: 1, progress: 0 })
  for (const [value, level, progress] of [
    [99.9, 1, 99],
    [100, 2, 0],
    ['199', 2, 99],
    [200, 3, 0],
  ])
    assert.deepEqual(levelFromXp(value), { level, progress })
})

test('QA-WB-03: jumlah soal 4/5/10/11, skor nol, penuh dan pembulatan', () => {
  for (const count of [4, 11]) {
    const questions = makeQuestions(count)
    assert.throws(() => scoreDemoQuiz(questions, answersFor(questions)), /5–10/)
  }
  for (const count of [5, 10]) {
    const questions = makeQuestions(count)
    assert.equal(scoreDemoQuiz(questions, answersFor(questions)).score, 100)
    assert.equal(scoreDemoQuiz(questions, answersFor(questions, 0)).score, 0)
  }
  const questions = makeQuestions(6)
  const result = scoreDemoQuiz(questions, answersFor(questions, 4))
  assert.equal(result.score, 67)
  assert.equal(result.correct_count, 4)
  assert.equal(result.total_questions, 6)
  assert.equal(result.details.filter((detail) => detail.is_correct).length, 4)
})

test('QA-WB-04: jawaban bukan integer dan ID soal duplikat ditolak', () => {
  const questions = makeQuestions(5)
  for (const selected of [undefined, null, '3', -1, 4, 1.5, false])
    assert.throws(
      () => scoreDemoQuiz(questions, { ...answersFor(questions), [questions[0].id]: selected }),
      /Jawab semua/,
    )
  assert.throws(
    () => scoreDemoQuiz([...questions.slice(0, 4), questions[0]], answersFor(questions)),
    /duplikat/,
  )
})

test('QA-WB-05: shuffle menjaga sumber pada array kosong, tunggal dan random batas', () => {
  assert.deepEqual(
    shuffled([], () => 0),
    [],
  )
  assert.deepEqual(
    shuffled(['a'], () => 0),
    ['a'],
  )
  const source = Object.freeze([1, 2, 3])
  assert.deepEqual(
    shuffled(source, () => 0),
    [2, 3, 1],
  )
  assert.deepEqual(
    shuffled(source, () => 0.999999),
    [1, 2, 3],
  )
  assert.deepEqual(source, [1, 2, 3])
})

test('QA-WB-06: remedial batas skor 59/60 dan pergantian tanggal Jakarta', () => {
  const beforeMidnight = new Date('2026-10-18T16:59:59Z')
  const midnight = new Date('2026-10-18T17:00:00Z')
  const first = { lesson_id: lessonId, reward_type: 'first_quiz', created_at: beforeMidnight }
  const remedial = {
    lesson_id: 'pelajaran-lain',
    reward_type: 'remedial',
    created_at: beforeMidnight,
  }
  assert.equal(quizXp({ score: 0, correct_count: 0 }, [], lessonId, beforeMidnight), 5)
  assert.equal(quizXp({ score: 59 }, [first], lessonId, beforeMidnight), 3)
  assert.equal(quizXp({ score: 60 }, [first], lessonId, beforeMidnight), 0)
  assert.equal(quizXp({ score: 59 }, [first, remedial], lessonId, beforeMidnight), 0)
  assert.equal(quizXp({ score: 59 }, [first, remedial], lessonId, midnight), 3)
  assert.equal(jakartaDate(beforeMidnight), '2026-10-18')
  assert.equal(jakartaDate(midnight), '2026-10-19')
})

test('QA-WB-07: URL gambar membatasi skema dan jalur aset', () => {
  for (const value of [
    null,
    42,
    {},
    '',
    '/assets/../rahasia',
    '/assets/a b.svg',
    '//qa.invalid/a.png',
    'http://qa.invalid/a.png',
    'data:image/png;base64,AA',
    'javascript:alert(1)',
    'bukan-url',
  ])
    assert.equal(safeImageUrl(value), null)
  assert.equal(safeImageUrl('/assets/folder/a-b_1.svg'), '/assets/folder/a-b_1.svg')
  assert.equal(safeImageUrl('https://qa.invalid/a.png'), 'https://qa.invalid/a.png')
})

test('QA-WB-08: variasi URL YouTube sah dan host/ID/skema palsu', () => {
  const id = 'abcdefghijk'
  const expected = `https://www.youtube-nocookie.com/embed/${id}`
  for (const value of [
    `https://youtube.com/watch?v=${id}`,
    `https://www.youtube.com/embed/${id}`,
    `https://www.youtube-nocookie.com/embed/${id}`,
    `https://youtu.be/${id}`,
  ])
    assert.equal(youtubeEmbedUrl(value), expected)
  for (const value of [
    null,
    'rusak',
    `http://youtu.be/${id}`,
    `https://youtube.com.qa.invalid/watch?v=${id}`,
    'https://youtu.be/pendek',
    `https://youtube.com/shorts/${id}`,
    'https://youtube.com/watch',
    `https://youtu.be/${id}lebihpanjang`,
  ])
    assert.equal(youtubeEmbedUrl(value), null)
})

test('QA-WB-09: impor batas batch 0/1/200/201 dan ukuran UTF-8 512000 byte', () => {
  for (const count of [0, 201])
    assert.throws(() => validate(Array.from({ length: count }, () => makeItem())), /1–200/)
  for (const count of [1, 200]) {
    const result = validate(Array.from({ length: count }, () => makeItem()))
    assert.equal(result.valid.length, count)
    assert.deepEqual(result.errors, [])
  }
  assert.throws(() => validate({}), /1–200/)
  const json = JSON.stringify([makeItem({ prompt: 'Angka empat: 四' })])
  const atLimit = json + ' '.repeat(512_000 - Buffer.byteLength(json))
  assert.equal(validateImport(atLimit, 'json', [lessonId]).valid.length, 1)
  assert.throws(() => validateImport(atLimit + ' ', 'json', [lessonId]), /500 KB/)
  assert.throws(() => validateImport('{rusak', 'json', [lessonId]), /JSON tidak valid/)
})

test('QA-WB-10: batas panjang pertanyaan, opsi dan pembahasan impor', () => {
  assert.deepEqual(
    validate([
      makeItem({
        prompt: 'p'.repeat(2000),
        options: ['a'.repeat(500), 'b', 'c', 'd'],
        explanation: 'e'.repeat(3000),
      }),
    ]).errors,
    [],
  )
  for (const overrides of [
    { prompt: 'p'.repeat(2001) },
    { prompt: ' ' },
    { prompt: 12 },
    { options: ['a'.repeat(501), 'b', 'c', 'd'] },
    { options: ['a', 'b', 'c'] },
    { options: ['a', 'b', 'c', null] },
    { explanation: 'e'.repeat(3001) },
    { explanation: ' ' },
  ]) {
    const result = validate([makeItem(overrides)])
    assert.equal(result.valid.length, 0)
    assert.equal(result.errors.length, 1)
  }
})

test('QA-WB-11: tipe record, materi asing, opsi ganda dan normalisasi impor', () => {
  for (const item of [null, [], 'teks', 42])
    assert.match(validate([item]).errors[0], /harus berupa objek/)
  for (const overrides of [
    { lesson_id: 'asing' },
    { options: [' A ', 'a', 'c', 'd'] },
    ...[-1, 4, 1.5, '3', null].map((value) => ({ correct_option: value })),
  ])
    assert.equal(validate([makeItem(overrides)]).valid.length, 0)
  const result = validate([
    makeItem({
      prompt: ' Pertanyaan ',
      options: [' A ', 'B', 'C', 'D'],
      explanation: ' Penjelasan ',
      difficulty: 'tidak-dikenal',
    }),
  ]).valid[0]
  assert.equal(result.prompt, 'Pertanyaan')
  assert.equal(result.options[0], 'A')
  assert.equal(result.explanation, 'Penjelasan')
  assert.equal(result.difficulty, 'dasar')
})

test('QA-WB-12: CSV BOM/CRLF, kutip, header dan jumlah kolom', () => {
  const header = 'lesson_id,prompt,option_a,option_b,option_c,option_d,correct_option,explanation'
  const validRow = `${lessonId},"Dua, tambah dua?",1,2,3,4,3,"Dua ""pasang""\nmenjadi empat."`
  const result = validateImport(`\uFEFF${header}\r\n${validRow}\r\n`, 'csv', [lessonId])
  assert.deepEqual(result.errors, [])
  assert.equal(result.valid[0].prompt, 'Dua, tambah dua?')
  assert.equal(result.valid[0].explanation, 'Dua "pasang"\nmenjadi empat.')
  for (const [csv, pattern] of [
    [header, /header dan minimal/],
    ['lesson_id,prompt\nqa-lesson,tanya', /Header CSV/],
    [`${header}\n${lessonId},"belum ditutup`, /belum ditutup/],
    [`${header}\n${lessonId},tan"ya,1,2,3,4,3,jelas`, /kutip CSV tidak valid/],
    [`${header}\n${lessonId},tanya,1,2,3,4,3`, /jumlah kolom/],
  ])
    assert.throws(() => validateImport(csv, 'csv', [lessonId]), pattern)
})
