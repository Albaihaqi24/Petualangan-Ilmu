import { createHash } from 'node:crypto'
import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { subjects, lessons, questions, editorialNotice } from '../frontend/src/lib/dummyData.js'

// UUID deterministik: regenerasi seed tidak menciptakan duplikat baru.
export function seedId(value) {
  const bytes = createHash('sha256').update(`petualangan-ilmu:${value}`).digest().subarray(0, 16)
  bytes[6] = (bytes[6] & 15) | 80
  bytes[8] = (bytes[8] & 63) | 128
  const hex = bytes.toString('hex')
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
}
const quote = (value) => `'${String(value).replaceAll("'", "''")}'`
const json = (value) => `${quote(JSON.stringify(value))}::jsonb`
const extraQuestions = [
  [8, 3],
  [9, 2],
  [5, 5],
  [6, 4],
  [7, 3],
].map(([a, b], index) => ({
  id: `matematika-3-q${index + 6}`,
  lesson_id: 'matematika-3',
  prompt: `${a} kelompok masing-masing berisi ${b} benda. Berapa jumlah seluruhnya?`,
  options: [String(a * b + 1), String(a * b), String(a * b + 3), String(a * b - 1)],
  correct_option: 1,
  explanation: `${a} × ${b} = ${a * b}. Jumlahkan ${b} sebanyak ${a} kali.`,
  difficulty: 'dasar',
}))
export function generateSeed() {
  const sql = [
    '-- Dihasilkan oleh scripts/generate-database-seed.mjs; jangan edit manual.',
    '-- 6 mata pelajaran, 36 materi, 185 soal. Semua materi/soal DRAFT.',
    '-- Untuk database uji. Belum merupakan konten yang ditinjau guru.',
    '-- ON CONFLICT DO NOTHING mempertahankan perubahan editorial yang sudah ada.',
    'begin;',
  ]
  for (const item of subjects)
    sql.push(
      `insert into public.subjects(id,name,slug,description) values (${quote(seedId(item.id))},${quote(item.name)},${quote(item.slug)},${quote(item.description)}) on conflict (id) do nothing;`,
    )
  for (const item of lessons)
    sql.push(
      `insert into public.lessons(id,subject_id,title,slug,grade,phase,chapter,difficulty,status,duration,content) values (${quote(seedId(item.id))},${quote(seedId(item.subject_id))},${quote(item.title)},${quote(item.slug)},${item.grade},${quote(item.phase)},${quote(item.chapter)},${quote(item.difficulty)},'draft',${item.duration},${json({ ...item.content, editorial_notice: editorialNotice })}) on conflict (id) do nothing;`,
    )
  for (const item of [...questions, ...extraQuestions]) {
    sql.push(
      `insert into public.questions(id,lesson_id,prompt,options,difficulty,status) values (${quote(seedId(item.id))},${quote(seedId(item.lesson_id))},${quote(item.prompt)},${json(item.options)},${quote(item.difficulty)},'draft') on conflict (id) do nothing;`,
    )
    sql.push(
      `insert into private.question_keys(question_id,correct_option,explanation) values (${quote(seedId(item.id))},${item.correct_option},${quote(item.explanation)}) on conflict (question_id) do nothing;`,
    )
  }
  sql.push('commit;', '')
  return sql.join('\n')
}

// Impor modul ini dalam tes tidak menulis berkas.
if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  await writeFile(new URL('../database/seed.sql', import.meta.url), generateSeed(), 'utf8')
  console.log(
    'Seed DRAFT dibuat: 6 mata pelajaran, 36 materi, 185 soal. Tidak ada koneksi ke database/cloud.',
  )
}
