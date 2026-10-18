import assert from 'node:assert/strict'
import test from 'node:test'
import { readFile } from 'node:fs/promises'
import { curriculumLessons, curriculumQuestions } from '../src/content/curriculumDraft.js'
import { curriculumPlan } from '../src/lib/learningResources.js'
import { lessons as demoLessons, questions as demoQuestions } from '../src/lib/demoCatalog.js'
import {
  generateCurriculumSeed,
  curriculumManifest,
} from '../scripts/generate-curriculum-draft.mjs'
import { scoreDemoQuiz } from '../src/lib/learning.js'

test('Seluruh 216 topik berisi materi, aktivitas, sumber, dan tepat lima soal draf', () => {
  assert.equal(curriculumLessons.length, 216)
  assert.equal(curriculumQuestions.length, 1080)
  assert.equal(new Set(curriculumLessons.map((l) => l.id)).size, 216)
  assert.equal(new Set(curriculumLessons.map((l) => l.slug)).size, 216)
  assert.equal(new Set(curriculumQuestions.map((q) => q.id)).size, 1080)
  for (const plan of curriculumPlan)
    for (const unit of plan.units) {
      const lesson = curriculumLessons.find((l) => l.id === unit.id)
      assert.ok(lesson, unit.id)
      assert.equal(lesson.title, unit.title)
      assert.equal(lesson.slug, unit.slug)
      assert.equal(lesson.status, 'draft')
      assert.equal(lesson.grade, plan.grade)
      assert.equal(lesson.phase, plan.phase)
      assert.equal(lesson.content.review_status, 'needs_teacher_review')
      assert.ok(lesson.content.objectives.length >= 2)
      assert.equal(lesson.content.enrichment, plan.enrichment)
      assert.ok(lesson.content.blocks.length >= 12)
      const text = lesson.content.blocks.map((b) => b.body).join(' ')
      for (const label of [
        'Tujuan belajar:',
        'Contoh dan penalaran:',
        'Ayo mencoba:',
        'Rangkuman:',
        'Refleksi:',
      ])
        assert.ok(text.includes(label), `${unit.id}: ${label}`)
      assert.doesNotMatch(text, /lorem ipsum|TODO|isi materi di sini/i)
      assert.ok(lesson.content.source_refs.length > 0)
      for (const ref of lesson.content.source_refs)
        assert.equal(new URL(ref.url).protocol, 'https:')
      const questions = curriculumQuestions.filter((q) => q.lesson_id === lesson.id)
      assert.equal(questions.length, 5)
      assert.equal(new Set(questions.map((q) => q.prompt)).size, 5)
      for (const q of questions) {
        assert.equal(new Set(q.options).size, 4)
        assert.ok(q.options.every((o) => typeof o === 'string' && o.trim()))
        assert.ok(q.correct_option >= 0 && q.correct_option <= 3)
        assert.ok(q.explanation.trim())
      }
      assert.equal(
        scoreDemoQuiz(questions, Object.fromEntries(questions.map((q) => [q.id, q.correct_option])))
          .score,
        100,
      )
    }
  assert.equal(demoLessons.length, 332)
  assert.equal(demoQuestions.length, 1660)
})
test('Contoh matematika pecahan, satuan, FPB, rasio dan volume mempunyai hasil yang benar', () => {
  const check = (prompt, answer) => {
    const q = curriculumQuestions.find((q) => q.prompt === prompt)
    assert.ok(q, prompt)
    assert.equal(q.options[q.correct_option], answer)
  }
  check('1/2 + 1/4 = …', '3/4')
  check('1 m² = … cm².', '10000')
  check('FPB 12 dan 18 adalah …', '6')
  check('Rasio merah:biru 2:3. Jika merah 4, biru …', '6')
  check('Volume balok 4 cm × 3 cm × 2 cm adalah … cm³.', '24')
  check('0,75 dalam persen adalah …', '75%')
})
test('SQL dan manifest sesuai draf; manifest tidak membawa kunci atau opsi bank soal', async () => {
  assert.equal(
    await readFile(new URL('../supabase/curriculum-draft.sql', import.meta.url), 'utf8'),
    generateCurriculumSeed(),
  )
  const manifest = JSON.parse(
    await readFile(new URL('../content/curriculum-manifest.json', import.meta.url), 'utf8'),
  )
  assert.deepEqual(manifest, curriculumManifest())
  assert.doesNotMatch(JSON.stringify(manifest), /correct_option|distractors|selected_option/)
  assert.equal(manifest.lesson_count, 216)
  assert.equal(manifest.question_count, 1080)
})
