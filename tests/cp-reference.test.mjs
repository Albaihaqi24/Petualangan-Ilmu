import assert from 'node:assert/strict'
import test from 'node:test'
import { readFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { cpReference, findCpElement, scopesForApp } from '../frontend/src/lib/cpReference.js'
import { extractCpReference, cpSnapshotUrl, cpOutputUrl } from '../scripts/import-cp-reference.mjs'
import { governmentScopes } from '../frontend/src/lib/governmentCurriculum.js'
import { textbookCatalog } from '../frontend/src/lib/textbooks.js'
import { textbookLessons } from '../frontend/src/content/books/mathGrade1.js'
import { curriculumAlignmentManifest } from '../scripts/export-government-curriculum.mjs'

test('JSON sumber menjadi 25 kelompok/109 CP SD tanpa mengambil fase atau lampiran lain', async () => {
  const raw = await readFile(cpSnapshotUrl)
  assert.equal(
    createHash('sha256').update(raw).digest('hex'),
    '21cd9cc4916760195c8857b48517b3e3b08e22543709a12edbc9f8ebf2fc0f04',
  )
  assert.deepEqual(extractCpReference(raw), JSON.parse(await readFile(cpOutputUrl, 'utf8')))
  assert.equal(cpReference.source.metadata.jumlah_halaman_pdf, 1691)
  assert.equal(cpReference.scopes.length, 25)
  const elements = cpReference.scopes.flatMap((s) => s.elements)
  assert.equal(elements.length, 109)
  assert.equal(new Set(elements.map((e) => e.id)).size, 109)
  assert.ok(
    cpReference.scopes.every(
      (s) => s.source_appendix === 'lampiran_ii' && ['A', 'B', 'C'].includes(s.phase),
    ),
  )
  assert.equal(scopesForApp('ipas', 'A').length, 0)
  assert.equal(scopesForApp('bahasa-inggris', 'A').length, 0)
  for (const phase of ['A', 'B', 'C']) assert.equal(scopesForApp('seni-budaya', phase).length, 4)
  assert.equal(scopesForApp('matematika', 'B')[0].elements.length, 5)
  assert.match(findCpElement('cp2025-matematika-b-1').text, /10\.000/)
  assert.match(findCpElement('cp2025-matematika-c-1').text, /1\.000\.000/)
  assert.match(findCpElement('cp2025-matematika-c-1').text, /100\.000/)
})

test('Setiap rumusan dapat direkonstruksi dari halaman JSON; ketidakkonsistenan sumber dicatat', async () => {
  const document = JSON.parse(await readFile(cpSnapshotUrl, 'utf8'))
  const normalize = (text) => text.replace(/\s+/g, ' ').trim()
  for (const scope of cpReference.scopes)
    for (const element of scope.elements) {
      const text = element.source_spans
        .map((span) => {
          const page = document.halaman[span.page - 1]
          assert.equal(page.bagian_id, 'lampiran_ii')
          return normalize(page.teks).slice(span.normalized_text_start, span.normalized_text_end)
        })
        .join(' ')
      assert.equal(normalize(text), element.source_excerpt, element.id)
      assert.ok(element.source_excerpt.includes(element.text), element.id)
    }
  const english = scopesForApp('bahasa-inggris', 'C')[0]
  assert.match(english.source_heading, /Kelas III dan IV/)
  assert.deepEqual(english.grades, [5, 6])
  assert.ok(english.warnings.length)
  assert.match(english.elements[0].source_label, /Listening - Writing/)
  assert.ok(english.elements[0].warnings.length)
  assert.ok(findCpElement('cp2025-matematika-a-2').warnings.length)
  const badNumber = structuredClone(document)
  badNumber.metadata.nomor = 'dokumen-lain'
  assert.throws(() => extractCpReference(JSON.stringify(badNumber)), /Nomor dokumen/)
  const badPage = structuredClone(document)
  badPage.halaman[0].nomor_halaman_pdf = 2
  assert.throws(() => extractCpReference(JSON.stringify(badPage)), /Urutan/)
})

test('Referensi CP pada peta dan delapan bab valid tanpa mengesahkan cakupan atau review guru', () => {
  const scopeIds = new Set(cpReference.scopes.map((s) => s.id))
  for (const scope of governmentScopes) {
    assert.ok(scope.cp_scope_ids.every((id) => scopeIds.has(id)))
    if (!scope.government_phase) assert.deepEqual(scope.cp_scope_ids, [])
    assert.equal(scope.reviewed_by, null)
  }
  for (const chapter of textbookCatalog[0].chapters) {
    assert.ok(chapter.cp_element_ids.length)
    for (const id of chapter.cp_element_ids) assert.ok(findCpElement(id))
    const lesson = textbookLessons.find((l) => l.id === chapter.id)
    assert.equal(lesson.content.cp_reference.mapping_status, 'proposed_mapping')
    assert.equal(lesson.content.cp_reference.phase_coverage, 'partial')
    assert.equal(lesson.content.cp_reference.reviewed_by, null)
    assert.equal(lesson.status, 'draft')
  }
  const manifest = curriculumAlignmentManifest()
  assert.equal(manifest.cp_source.element_count, 109)
  assert.equal(manifest.cp_source.sha256, cpReference.source.sha256)
  assert.ok(
    manifest.units.every(
      (u) => !u.cp_reference || u.cp_reference.scope_ids.every((id) => scopeIds.has(id)),
    ),
  )
  assert.ok(manifest.units.every((u) => u.cp_element_confirmed === null && u.reviewed_by === null))
})
