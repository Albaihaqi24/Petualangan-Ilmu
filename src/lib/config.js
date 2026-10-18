export function readConfig(env = import.meta.env) {
  const mode = env.VITE_APP_MODE || 'demo'
  if (!['demo', 'supabase'].includes(mode))
    return { mode, error: 'VITE_APP_MODE harus demo atau supabase.' }
  if (mode === 'demo') return { mode, error: null }
  const url = env.VITE_SUPABASE_URL || ''
  const key = env.VITE_SUPABASE_PUBLISHABLE_KEY || ''
  if (!url || !key || url.includes('PROJECT_ID') || key.includes('YOUR_'))
    return { mode, error: 'Isi URL proyek dan publishable key Supabase pada konfigurasi aplikasi.' }
  try {
    if (new URL(url).protocol !== 'https:') throw new Error()
  } catch {
    return { mode, error: 'URL Supabase harus berupa alamat HTTPS yang valid.' }
  }
  if (key.startsWith('sb_secret_'))
    return {
      mode,
      error: 'Secret key dilarang berada pada konfigurasi browser. Gunakan publishable key.',
    }
  if (!key.startsWith('sb_publishable_')) {
    try {
      const encoded = key.split('.')[1].replaceAll('-', '+').replaceAll('_', '/')
      const payload = JSON.parse(atob(encoded))
      if (payload.role !== 'anon') throw new Error()
    } catch {
      return {
        mode,
        error: 'Gunakan publishable key atau legacy anon key, bukan service-role key.',
      }
    }
  }
  return { mode, url, key, error: null }
}
