import { importCpReference } from './import-cp-reference.mjs'

await importCpReference()
// Muat modul setelah data ditulis agar cache modul JSON tidak memakai versi lama.
const { exportCpReview } = await import('./export-cp-review.mjs')
await exportCpReview()
const { exportGovernmentCurriculum } = await import('./export-government-curriculum.mjs')
await exportGovernmentCurriculum()
const { exportTextbooks } = await import('./export-textbooks.mjs')
await exportTextbooks()
