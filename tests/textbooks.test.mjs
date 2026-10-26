import assert from 'node:assert/strict'
import test from 'node:test'
import { readFile } from 'node:fs/promises'
import { textbookCatalog } from '../frontend/src/lib/textbooks.js'
import { textbookLessons, textbookQuestions } from '../frontend/src/content/books/mathGrade1.js'
import { generateTextbookSeed, textbookManifest } from '../scripts/export-textbooks.mjs'

test('Bahan ajar kelas 1 mencakup delapan bab dan 25 subbab pada urutan buku yang dipilih', () => {
  const book = textbookCatalog[0]
  assert.equal(book.chapters.length, 8)
  assert.equal(
    book.chapters.reduce((n, c) => n + c.subchapters.length, 0),
    25,
  )
  assert.deepEqual(
    book.chapters.map((c) => c.source_print_pages[0]),
    [1, 41, 75, 115, 145, 175, 197, 219],
  )
  assert.equal(textbookLessons.length, 8)
  assert.equal(textbookQuestions.length, 40)
  for (const chapter of book.chapters) {
    const lesson = textbookLessons.find((l) => l.id === chapter.id)
    assert.equal(lesson.status, 'draft')
    assert.equal(lesson.content.review_status, 'needs_teacher_review')
    assert.equal(lesson.content.content_kind, 'full_chapter')
    const headings = lesson.content.blocks.map((b) => b.heading).filter(Boolean)
    for (const title of chapter.subchapters)
      assert.ok(
        headings.some((h) => h.endsWith(title)),
        title,
      )
    for (const title of [
      'Tujuan dan bekal awal',
      'Kegiatan penerapan',
      'Rangkuman bab',
      'Latihan mandiri',
      'Pembahasan latihan mandiri',
      'Refleksi belajar',
      'Catatan pendamping: bantuan dan pengayaan',
    ])
      assert.ok(headings.includes(title))
    assert.ok(
      lesson.content.blocks.find((b) => b.heading === 'Pembahasan latihan mandiri').collapsible,
    )
    assert.doesNotMatch(
      lesson.content.blocks.map((b) => b.body).join(' '),
      /lorem ipsum|TODO|isi materi di sini/i,
    )
    const questions = textbookQuestions.filter((q) => q.lesson_id === lesson.id)
    assert.equal(questions.length, 5)
    for (const q of questions) {
      assert.equal(new Set(q.options).size, 4)
      assert.ok(q.options[q.correct_option])
      assert.ok(q.explanation.trim())
    }
  }
  for (const [prompt, answer] of [
    ['2 + 5 = …', '7'],
    ['8 − 2 = …', '6'],
    ['8 + 6 = …', '14'],
    ['15 − 7 = …', '8'],
  ]) {
    const q = textbookQuestions.find((q) => q.prompt === prompt)
    assert.equal(q.options[q.correct_option], answer)
  }
})

test('Paket SQL dan ekspor buku sesuai sumber; manifest tidak membawa bank atau kunci kuis', async () => {
  assert.equal(
    await readFile(
      new URL('../database/books/matematika-kelas-1-2022.sql', import.meta.url),
      'utf8',
    ),
    generateTextbookSeed(),
  )
  const manifest = JSON.parse(
    await readFile(new URL('../content/textbook-manifest.json', import.meta.url), 'utf8'),
  )
  assert.deepEqual(manifest, textbookManifest())
  assert.doesNotMatch(JSON.stringify(manifest), /correct_option|selected_option|wrong|explanation/)
  for (let i = 1; i <= 8; i++) {
    const markdown = await readFile(
      new URL(
        `../docs/materi/matematika/kelas-1/bab-${String(i).padStart(2, '0')}.md`,
        import.meta.url,
      ),
      'utf8',
    )
    assert.ok(markdown.includes('## Latihan mandiri'))
    assert.ok(markdown.includes('## Pembahasan latihan mandiri'))
  }
})
