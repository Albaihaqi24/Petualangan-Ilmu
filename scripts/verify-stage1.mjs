import { createServer } from 'vite'
import { existsSync, readFileSync } from 'node:fs'
import assert from 'node:assert/strict'
import { fileURLToPath } from 'node:url'
process.chdir(fileURLToPath(new URL('../', import.meta.url)))
const folders = [
  'components/ui',
  'components/adventure',
  'components/quiz',
  'context',
  'layouts',
  'lib',
  'pages/auth',
  'pages/student',
  'pages/tutor',
  'pages/admin',
  'services',
]
for (const folder of folders) assert(existsSync(`src/${folder}`), `Missing folder: ${folder}`)
assert.match(readFileSync('src/index.css', 'utf8'), /@import\s+(['"])tailwindcss\1\s*;/)
const portArgument = process.argv.find((argument) => argument.startsWith('--port='))
const port = portArgument ? Number(portArgument.split('=')[1]) : 5173
assert(Number.isInteger(port) && port >= 0 && port <= 65535, 'Port tidak valid')
const server = await createServer({
  server: { host: '127.0.0.1', port, strictPort: true, ws: false },
})
try {
  await server.listen()
  const address = server.httpServer.address()
  const url = `http://127.0.0.1:${address.port}`
  const res = await fetch(url, { signal: AbortSignal.timeout(10000) })
  assert.equal(res.status, 200)
  const transformed = await server.transformRequest('/src/index.css')
  assert(transformed.code.includes('tailwindcss') && transformed.code.includes('.button-primary'))
  const app = await server.transformRequest('/src/App.jsx')
  assert(app.code.includes('react-router-dom'))
  console.log(
    `PASS Tahap 1: ${url} HTTP 200; React JSX compiled; Tailwind and application CSS compiled; all 11 folders exist.`,
  )
} finally {
  await server.close()
}
