import { readdir, readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

export async function verifyProduction(root = 'dist') {
  const assets = await readdir(resolve(root, 'assets'))
  const scripts = assets.filter((name) => name.endsWith('.js'))
  if (!scripts.length) throw new Error('Bundle JavaScript belum ditemukan.')
  const contents = (
    await Promise.all(scripts.map((name) => readFile(resolve(root, 'assets', name), 'utf8')))
  ).join('\n')
  // Nama fungsi/kunci RPC memang ada pada editor dan hasil. Periksa data fixture/penyimpanan demo.
  for (const marker of [
    'petualangan-ilmu:demo:v2',
    'Perkalian di kebun Nara',
    'demo-student',
    'quiz-first:',
    'SupabaseProvider-',
  ]) {
    if (marker === 'SupabaseProvider-') {
      if (!assets.some((name) => name.startsWith(marker)))
        throw new Error('Build ini belum memakai provider Supabase.')
      continue
    }
    if (contents.includes(marker))
      throw new Error(`Data demo ditemukan pada build produksi: ${marker}`)
  }
  if (/sb_secret_[A-Za-z0-9_-]+/.test(contents)) throw new Error('Secret key ditemukan pada build.')
  console.log('Audit bundle produksi lulus.')
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href)
  await verifyProduction()
