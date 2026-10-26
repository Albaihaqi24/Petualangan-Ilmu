import assert from 'node:assert/strict'
import test from 'node:test'
import { lessons, questions, subjects } from '../frontend/src/lib/dummyData.js'
import {
  jakartaDate,
  levelFromXp,
  quizXp,
  safeImageUrl,
  scoreDemoQuiz,
  shuffled,
  youtubeEmbedUrl,
} from '../frontend/src/lib/learning.js'
import { csvExample, jsonExample, validateImport } from '../frontend/src/services/importService.js'

test('Setiap kelas memiliki enam materi dan lima soal valid per materi', () => {
  assert.equal(lessons.length, 36)
  assert.equal(new Set(lessons.map((lesson) => lesson.slug)).size, 36)
  for (let grade = 1; grade <= 6; grade += 1) {
    const entries = lessons.filter((lesson) => lesson.grade === grade)
    assert.deepEqual(
      new Set(entries.map((lesson) => lesson.subject_id)),
      new Set(subjects.map((subject) => subject.id)),
    )
    for (const lesson of entries) {
      const items = questions.filter((question) => question.lesson_id === lesson.id)
      assert.equal(items.length, 5)
      for (const item of items) {
        assert.equal(new Set(item.options).size, 4, item.id)
        assert.ok(item.options.every((option) => typeof option === 'string' && option.trim()))
        assert.ok(
          Number.isInteger(item.correct_option) &&
            item.correct_option >= 0 &&
            item.correct_option < 4,
        )
      }
      assert.equal(
        scoreDemoQuiz(
          items,
          Object.fromEntries(items.map((item) => [item.id, item.correct_option])),
        ).score,
        100,
      )
    }
  }
})
test('Kuis menolak jawaban kosong, opsi di luar rentang, dan soal duplikat', () => {
  const items = questions.slice(0, 5)
  assert.throws(() => scoreDemoQuiz(items, {}), /Jawab semua/)
  const answers = Object.fromEntries(items.map((item) => [item.id, item.correct_option]))
  assert.throws(() => scoreDemoQuiz(items, { ...answers, [items[0].id]: 4 }), /Jawab semua/)
  assert.throws(() => scoreDemoQuiz([...items.slice(0, 4), items[0]], answers), /duplikat/)
  assert.equal(
    scoreDemoQuiz(
      items,
      Object.fromEntries(items.map((item) => [item.id, (item.correct_option + 1) % 4])),
    ).score,
    0,
  )
})
test('XP utama sekali per bab dan remedial sekali per tanggal Jakarta', () => {
  const time = new Date('2026-10-16T10:00:00Z')
  const result = { score: 40, correct_count: 2 }
  const initial = { lesson_id: 'a', created_at: time.toISOString(), reward_type: 'first_quiz' }
  const remedial = { lesson_id: 'b', created_at: time.toISOString(), reward_type: 'remedial' }
  assert.equal(quizXp(result, [], 'a', time), 25)
  assert.equal(quizXp(result, [initial], 'a', time), 3)
  assert.equal(quizXp(result, [initial, remedial], 'a', time), 0)
  assert.equal(quizXp({ score: 80, correct_count: 4 }, [initial], 'a', time), 0)
  assert.equal(quizXp(result, [initial, remedial], 'a', new Date('2026-10-16T17:01:00Z')), 3)
  assert.equal(jakartaDate(new Date('2026-10-16T17:01:00Z')), '2026-10-17')
})
test('Level melewati batas 100 XP dan pengacakan tidak merusak sumber', () => {
  assert.deepEqual(levelFromXp(99), { level: 1, progress: 99 })
  assert.deepEqual(levelFromXp(100), { level: 2, progress: 0 })
  assert.deepEqual(levelFromXp(250), { level: 3, progress: 50 })
  const original = [1, 2, 3, 4, 5]
  assert.deepEqual(new Set(shuffled(original)), new Set(original))
  assert.deepEqual(original, [1, 2, 3, 4, 5])
})
test('Media menolak skema berbahaya dan host YouTube tiruan', () => {
  assert.equal(safeImageUrl('javascript:alert(1)'), null)
  assert.equal(safeImageUrl('/assets/../secret'), null)
  assert.equal(safeImageUrl('/assets/kebun-belajar.svg'), '/assets/kebun-belajar.svg')
  assert.equal(youtubeEmbedUrl('https://youtube.com.evil.test/watch?v=abcdefghijk'), null)
  assert.equal(youtubeEmbedUrl('http://youtube.com/watch?v=abcdefghijk'), null)
  assert.equal(
    youtubeEmbedUrl('https://youtu.be/abcdefghijk'),
    'https://www.youtube-nocookie.com/embed/abcdefghijk',
  )
})
test('Impor memvalidasi materi, empat opsi, kunci, dan pembahasan', () => {
  const ids = lessons.map((lesson) => lesson.id)
  assert.equal(validateImport(jsonExample, 'json', ids).errors.length, 0)
  assert.equal(validateImport(csvExample, 'csv', ids).valid.length, 1)
  assert.throws(() => validateImport('{broken', 'json', ids), /JSON tidak valid/)
  const bad = [
    {
      lesson_id: 'tidak-ada',
      prompt: '',
      options: ['sama', 'sama', 'C', 'D'],
      correct_option: 4,
      explanation: '',
    },
  ]
  const result = validateImport(JSON.stringify(bad), 'json', ids)
  assert.equal(result.valid.length, 0)
  for (const pattern of [/lesson_id/, /empat opsi/, /0–3/]) assert.match(result.errors[0], pattern)
  assert.throws(() => validateImport('x'.repeat(512001), 'json', ids), /500 KB/)
})
test('CSV mendukung koma, baris baru, dan tanda kutip dalam kolom', () => {
  const csv =
    'lesson_id,prompt,option_a,option_b,option_c,option_d,correct_option,explanation\r\nmatematika-3,"Berapa 3, lalu tambah 4?",7,8,9,10,0,"Dengan ""kutip""\ndan baris baru."'
  const result = validateImport(
    csv,
    'csv',
    lessons.map((lesson) => lesson.id),
  )
  assert.equal(result.errors.length, 0)
  assert.equal(result.valid[0].prompt, 'Berapa 3, lalu tambah 4?')
  assert.match(result.valid[0].explanation, /"kutip"\ndan baris baru/)
})
