// Alat pemilik proyek di terminal privat. Tidak diimpor frontend.
import { createClient } from '@supabase/supabase-js'
const args = process.argv.slice(2)
const id = args[args.indexOf('--request') + 1]
if (
  !args.includes('--request') ||
  !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id || '')
)
  throw new Error(
    'Gunakan --request UUID_PEMOHON. Tanpa --confirm-delete UUID, hanya pemeriksaan baca-saja.',
  )
const url = process.env.SUPABASE_URL,
  key = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !key)
  throw new Error(
    'Isi SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY pada environment terminal privat, tanpa awalan VITE_.',
  )
const client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } })
async function unwrap(request) {
  const { data, error } = await request
  if (error) throw new Error(error.message)
  return data
}
const request = await unwrap(
  client.from('account_deletion_requests').select('*').eq('student_id', id).single(),
)
if (!request || request.status === 'completed') throw new Error('Permintaan aktif tidak ditemukan.')
const profile = await unwrap(client.from('profiles').select('id,role').eq('id', id).single())
if (profile.role === 'admin')
  throw new Error('Penghapusan admin perlu penanganan pemilik secara terpisah.')
const classrooms = await unwrap(client.from('classes').select('id').eq('tutor_id', id))
if (classrooms.length)
  throw new Error(
    'Tutor masih memiliki kelas. Alihkan pendampingan dan periksa berkas anggota sebelum menghapus akun.',
  )
const storage = client.storage.from('student-submissions')
async function files(prefix) {
  const all = []
  for (let offset = 0; ; offset += 100) {
    const page = await unwrap(
      storage.list(prefix, { limit: 100, offset, sortBy: { column: 'name', order: 'asc' } }),
    )
    for (const item of page) {
      const path = `${prefix}/${item.name}`
      if (item.id) all.push(path)
      else all.push(...(await files(path)))
    }
    if (page.length < 100) break
  }
  return all
}
const paths = await files(id)
console.log(
  `Permintaan ditemukan. Berkas milik pemohon: ${paths.length}. Identitas pemohon harus diverifikasi sebelum eksekusi.`,
)
if (!args.includes('--confirm-delete') || args[args.indexOf('--confirm-delete') + 1] !== id) {
  console.log('Pemeriksaan baca-saja selesai; akun dan berkas belum diubah.')
  process.exit(0)
}
await unwrap(
  client.from('account_deletion_requests').update({ status: 'processing' }).eq('student_id', id),
)
for (let offset = 0; offset < paths.length; offset += 100)
  await unwrap(storage.remove(paths.slice(offset, offset + 100)))
await unwrap(client.auth.admin.deleteUser(id))
console.log(
  'Akun dihapus. Data profil/belajar mengikuti cascade; permintaan terkait ikut dihapus. Periksa hasil dan catat bukti operasional tanpa menyimpan kredensial.',
)
