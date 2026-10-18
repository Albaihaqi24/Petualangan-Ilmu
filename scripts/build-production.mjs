import { build, loadEnv } from 'vite'
import { readConfig } from '../src/lib/config.js'
import { verifyProduction } from './verify-production.mjs'

const env = {
  ...loadEnv('production', process.cwd(), ''),
  ...process.env,
  VITE_APP_MODE: 'supabase',
}
const config = readConfig(env)
if (config.error) throw new Error(config.error)
process.env.VITE_APP_MODE = 'supabase'
await build({ define: { 'import.meta.env.VITE_APP_MODE': JSON.stringify('supabase') } })
await verifyProduction()
console.log(
  'Build Supabase selesai; bank soal demo tidak disertakan. Koneksi cloud tetap perlu diuji.',
)
