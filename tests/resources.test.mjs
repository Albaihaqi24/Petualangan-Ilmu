import assert from 'node:assert/strict'
import test from 'node:test'
import { readFile } from 'node:fs/promises'
import {
  governmentMaterials,
  governmentScopes,
  getGovernmentScope,
} from '../frontend/src/lib/governmentCurriculum.js'
import { curriculumAlignmentManifest } from '../scripts/export-government-curriculum.mjs'
import {
  curriculumPlan,
  curriculumSources,
  learningResources,
  resourceSubjects,
} from '../frontend/src/lib/learningResources.js'

test('Perpustakaan menyimpan rujukan resmi unik dengan jenis pembaca yang jelas', () => {
  assert.equal(learningResources.length, 34)
  assert.equal(new Set(learningResources.map((r) => r.id)).size, learningResources.length)
  assert.equal(new Set(learningResources.map((r) => r.url)).size, learningResources.length)
  for (const resource of learningResources) {
    assert.ok(resource.grade >= 1 && resource.grade <= 6)
    assert.ok(['teacher', 'student'].includes(resource.audience))
    assert.ok(resourceSubjects.some((s) => s.id === resource.subject))
    const url = new URL(resource.url)
    assert.equal(url.protocol, 'https:')
    assert.equal(url.hostname, 'buku.kemendikdasmen.go.id')
    assert.match(url.pathname, /^\/katalog\/[a-zA-Z0-9-]+$/)
    assert.equal(resource.checked_at, '2026-10-16')
    if (resource.title.startsWith('Panduan')) assert.equal(resource.audience, 'teacher')
  }
  for (const source of curriculumSources) {
    assert.equal(new URL(source.url).protocol, 'https:')
  }
})
test('Peta pemerintah menjaga batas pengayaan, sumber resmi dan review yang belum dilakukan', async () => {
  assert.equal(governmentScopes.length, 18)
  assert.equal(new Set(governmentScopes.map((s) => s.id)).size, 18)
  for (const subject of ['ipas', 'bahasa-inggris']) {
    assert.equal(getGovernmentScope(subject, 1).government_phase, null)
    assert.equal(getGovernmentScope(subject, 2).government_phase, null)
    assert.equal(getGovernmentScope(subject, 3).government_phase, 'B')
    assert.equal(getGovernmentScope(subject, 6).government_phase, 'C')
  }
  assert.equal(new Set(governmentMaterials.map((m) => m.subject)).size, 6)
  for (const material of governmentMaterials) {
    const url = new URL(material.url)
    assert.equal(url.protocol, 'https:')
    assert.equal(url.hostname, 'murid.kemendikdasmen.go.id')
    assert.deepEqual(
      material.grades,
      material.grades[0] === 1 ? [1, 2] : material.grades[0] === 3 ? [3, 4] : [5, 6],
    )
  }
  const manifest = curriculumAlignmentManifest()
  assert.equal(manifest.units.length, 216)
  assert.equal(new Set(manifest.units.map((u) => u.id)).size, 216)
  for (const unit of manifest.units) {
    assert.equal(unit.mapping_status, 'proposed_mapping')
    assert.equal(unit.reviewed_by, null)
    assert.equal(unit.reviewed_at, null)
    assert.equal(unit.cp_element_confirmed, null)
    assert.equal(unit.learning_objective_confirmed, null)
    if (!unit.government_phase) assert.equal(unit.cp_reference, null)
  }
  assert.equal(
    manifest.units.find((u) => u.id === 'kurikulum-matematika-2-3').role,
    'enrichment_proposed',
  )
  assert.doesNotMatch(
    manifest.units.find((u) => u.id === 'kurikulum-matematika-5-2').title,
    /pengayaan/i,
  )
  assert.doesNotMatch(JSON.stringify(manifest), /correct_option|selected_option|distractors/)
  assert.deepEqual(
    JSON.parse(
      await readFile(new URL('../content/curriculum-alignment.json', import.meta.url), 'utf8'),
    ),
    manifest,
  )
})

test('Kerangka mencakup enam pelajaran per kelas dan membedakan pengayaan dari materi siap', () => {
  assert.equal(curriculumPlan.length, 36)
  assert.equal(
    curriculumPlan.reduce((sum, p) => sum + p.units.length, 0),
    216,
  )
  for (let grade = 1; grade <= 6; grade++) {
    const plans = curriculumPlan.filter((p) => p.grade === grade)
    assert.deepEqual(
      new Set(plans.map((p) => p.subject)),
      new Set(resourceSubjects.map((s) => s.id)),
    )
    for (const plan of plans) {
      assert.equal(plan.phase, grade <= 2 ? 'A' : grade <= 4 ? 'B' : 'C')
      assert.equal(plan.enrichment, grade <= 2 && ['ipas', 'bahasa-inggris'].includes(plan.subject))
      assert.equal(new Set(plan.units.map((u) => u.title)).size, 6)
      assert.ok(
        plan.units.every(
          (unit, i) =>
            unit.status === 'draft' &&
            unit.order === i + 1 &&
            unit.review_status === 'needs_teacher_review',
        ),
      )
    }
  }
})
