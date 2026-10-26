import assert from 'node:assert/strict'
import test from 'node:test'
import { readFile } from 'node:fs/promises'
import { adventureCourses } from '../frontend/src/lib/adventureCourseCatalog.js'
import {
  adventureDrafts,
  adventureLessons,
  adventureQuestions,
} from '../frontend/src/content/adventure/index.js'
import { lessons, questions } from '../frontend/src/lib/demoCatalog.js'
import { scoreDemoQuiz } from '../frontend/src/lib/learning.js'
import { adventureManifest, generateAdventureSeed } from '../scripts/export-adventure-package.mjs'

test('Paket 72 bab memiliki 18 urutan kelas/pelajaran, subbab, praktik dan penanda review', () => {
  assert.equal(adventureCourses.length, 18)
  assert.equal(adventureLessons.length, 72)
  assert.equal(adventureQuestions.length, 360)
  assert.equal(new Set(lessons.map((l) => l.id)).size, lessons.length)
  assert.equal(new Set(lessons.map((l) => l.slug)).size, lessons.length)
  assert.equal(new Set(questions.map((q) => q.id)).size, questions.length)
  for (let grade = 1; grade <= 6; grade++) {
    for (const subject of ['matematika', 'bahasa-indonesia', 'ipas']) {
      const entries = adventureLessons.filter((l) => l.grade === grade && l.subject_id === subject)
      assert.equal(entries.length, 4, `${subject}/${grade}`)
      assert.deepEqual(
        entries.map((l) => l.content.chapter_number),
        [1, 2, 3, 4],
      )
      assert.ok(entries.every((l) => l.phase === ['A', 'A', 'B', 'B', 'C', 'C'][grade - 1]))
    }
  }
  for (const { draft, lesson } of adventureDrafts) {
    assert.equal(lesson.status, 'draft')
    assert.equal(lesson.content.review_status, 'needs_teacher_review')
    assert.equal(lesson.content.enrichment, lesson.subject_id === 'ipas' && lesson.grade <= 2)
    assert.equal(draft.sections.length, 3)
    for (const section of draft.sections) {
      assert.ok(section.body.length >= 140, `${lesson.id}: isi subbab terlalu pendek`)
      assert.ok(section.example.length >= 60, `${lesson.id}: contoh belum menjelaskan`)
    }
    assert.equal(draft.practice.length, 3)
    for (const item of draft.practice) assert.ok(item.prompt && item.answer && item.reason)
    const headings = lesson.content.blocks.map((b) => b.heading)
    for (const title of [
      'Kegiatan penerapan',
      'Latihan mandiri',
      'Pembahasan latihan mandiri',
      'Rangkuman bab',
      'Refleksi belajar',
      'Catatan pendamping: bantuan dan pengayaan',
    ])
      assert.ok(headings.includes(title))
    assert.equal(
      lesson.content.blocks.find((b) => b.heading === 'Pembahasan latihan mandiri').collapsible,
      true,
    )
    const reading = lesson.content.blocks.map((b) => b.body || '').join(' ')
    assert.doesNotMatch(reading, /lorem ipsum|TODO|isi materi di sini|undefined/)
    assert.ok(reading.split(/\s+/).length >= 300, `${lesson.id}: bacaan terlalu singkat`)
  }
})

test('Setiap bab baru mempunyai lima soal unik, empat opsi dan kontrak skor 0/100 yang valid', () => {
  for (const lesson of adventureLessons) {
    const bank = adventureQuestions.filter((q) => q.lesson_id === lesson.id)
    assert.equal(bank.length, 5)
    assert.equal(new Set(bank.map((q) => q.prompt)).size, 5)
    for (const item of bank) {
      assert.equal(item.options.length, 4)
      assert.equal(new Set(item.options.map((o) => o.trim().toLowerCase())).size, 4)
      assert.ok(item.options.every((o) => typeof o === 'string' && o.trim()))
      assert.ok(item.correct_option >= 0 && item.correct_option <= 3)
      assert.ok(item.explanation.trim().length >= 20)
    }
    const perfect = Object.fromEntries(bank.map((q) => [q.id, q.correct_option]))
    const wrong = Object.fromEntries(bank.map((q) => [q.id, (q.correct_option + 1) % 4]))
    assert.equal(scoreDemoQuiz(bank, perfect).score, 100)
    assert.equal(scoreDemoQuiz(bank, wrong).score, 0)
    const draft = adventureDrafts.find((d) => d.lesson.id === lesson.id).draft
    for (const exercise of draft.practice)
      assert.ok(!bank.some((q) => q.prompt === exercise.prompt))
  }
})

test('Oracle terpilih memeriksa pecahan, laju gabungan, permukaan gabungan dan miskonsepsi sains', () => {
  const answer = (lessonId, pattern) => {
    const item = adventureQuestions.find((q) => q.lesson_id === lessonId && pattern.test(q.prompt))
    assert.ok(item, `${lessonId}/${pattern}`)
    return item.options[item.correct_option]
  }
  assert.equal(answer('petualangan-matematika-5-1', /^3\/5/), `${3 * 4 - 1 * 5}/20`)
  assert.equal(answer('petualangan-matematika-5-2', /^2\/3/), '5/6')
  assert.equal(answer('petualangan-matematika-5-3', /^Dua ruas/), String((30 + 30) / (1 + 2)))
  assert.equal(answer('petualangan-matematika-6-2', /^Keliling daerah/), String(22 + 14))
  assert.equal(answer('petualangan-matematika-6-3', /^Dua kubus/), String(6 + 6 - 2))
  assert.equal(answer('petualangan-matematika-6-4', /^Median data 2/), String((4 + 8) / 2))
  assert.equal(answer('petualangan-ipas-2-3', /^Paus/), 'Paru-paru')
  assert.equal(answer('petualangan-ipas-1-4', /^Bulan dapat/), 'Ya, pada kondisi tertentu')
  assert.equal(answer('petualangan-ipas-4-1', /^Tumbuhan melakukan respirasi/), 'Siang dan malam')
  assert.equal(
    answer('petualangan-ipas-5-1', /^Perbedaan penting/),
    'Bunyi memerlukan medium, cahaya dapat melalui ruang hampa',
  )
  assert.equal(answer('petualangan-bahasa-indonesia-5-3', /^Angka pada/), 'Tidak')
})

test('Ekspor 72 dokumen dan panduan 360 kuis konsisten; gambar lokal tersedia', async () => {
  const base = new URL('../docs/materi/paket-72-bab/', import.meta.url)
  for (const { course, chapter, lesson } of adventureDrafts) {
    const path = `${course.subject}/kelas-${course.grade}/bab-${String(chapter.order).padStart(2, '0')}.md`
    const markdown = await readFile(new URL(path, base), 'utf8')
    assert.ok(markdown.includes(chapter.title))
    assert.ok(markdown.includes('## Latihan mandiri'))
    assert.ok(markdown.includes('## Pembahasan latihan mandiri'))
    assert.doesNotMatch(markdown, /## undefined/)
    for (const block of lesson.content.blocks.filter((b) => b.type === 'image')) {
      const svg = await readFile(new URL(`../frontend/public${block.url}`, import.meta.url), 'utf8')
      assert.match(svg, /<svg/)
      assert.ok(block.caption.length > 20)
    }
  }
  const guide = await readFile(new URL('KUIS-PENDAMPING.md', base), 'utf8')
  assert.equal((guide.match(/^### Soal /gm) || []).length, 360)
  assert.equal((guide.match(/^\*\*Kunci:/gm) || []).length, 360)
})

test('Manifest publik bebas bank/kunci dan SQL draf sesuai sumber generator', async () => {
  const manifest = JSON.parse(
    await readFile(new URL('../content/paket-72-manifest.json', import.meta.url), 'utf8'),
  )
  assert.deepEqual(manifest, adventureManifest())
  assert.doesNotMatch(
    JSON.stringify(manifest),
    /correct_option|selected_option|explanation|distractors|"options"|"quiz"/,
  )
  const sql = await readFile(new URL('../database/paket-72-bab.sql', import.meta.url), 'utf8')
  assert.equal(sql, generateAdventureSeed())
  assert.equal((sql.match(/insert into public\.lessons/g) || []).length, 72)
  assert.equal((sql.match(/insert into public\.questions/g) || []).length, 360)
  assert.equal((sql.match(/insert into private\.question_keys/g) || []).length, 360)
})
