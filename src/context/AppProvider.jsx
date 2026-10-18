import { lazy, Suspense } from 'react'
import { readConfig } from '../lib/config'

// Vite mengganti kondisi ini saat build: modul demo tidak masuk build Supabase.
const Provider =
  import.meta.env.VITE_APP_MODE === 'supabase'
    ? lazy(() => import('./SupabaseProvider'))
    : lazy(() => import('./DemoContext').then((module) => ({ default: module.DemoProvider })))

export default function AppProvider({ children }) {
  const config = readConfig()
  if (config.error)
    return (
      <main className="standalone">
        <h1>Konfigurasi aplikasi belum lengkap</h1>
        <p role="alert">{config.error}</p>
        <p>Periksa konfigurasi deployment atau .env.local, lalu jalankan ulang server.</p>
      </main>
    )
  return (
    <Suspense
      fallback={
        <main className="standalone" role="status">
          Menyiapkan petualangan…
        </main>
      }
    >
      <Provider>{children}</Provider>
    </Suspense>
  )
}
