// Adapter/Auth diuji dengan layanan tiruan; bukan bukti koneksi Supabase cloud.
import assert from 'node:assert/strict'
import { after, afterEach, test } from 'node:test'
import React, { act } from 'react'
import { Window } from 'happy-dom'
import { createServer } from 'vite'
import { readConfig } from '../src/lib/config.js'
import { createSupabaseService } from '../src/services/supabaseService.js'
import { completeSeedData } from '../scripts/generate-seed-materi-lengkap.mjs'

const dom = new Window({
  url: 'http://localhost:5174',
  settings: {
    disableCSSFileLoading: true,
    disableJavaScriptFileLoading: true,
    disableIframePageLoading: true,
  },
})
for (const key of [
  'window',
  'document',
  'HTMLElement',
  'HTMLInputElement',
  'HTMLTextAreaElement',
  'Event',
  'MouseEvent',
  'FormData',
  'localStorage',
])
  Object.defineProperty(globalThis, key, {
    value: key === 'window' ? dom : dom[key],
    configurable: true,
    writable: true,
  })
globalThis.requestAnimationFrame = dom.requestAnimationFrame.bind(dom)
globalThis.cancelAnimationFrame = dom.cancelAnimationFrame.bind(dom)
globalThis.IS_REACT_ACT_ENVIRONMENT = true
dom.scrollTo = () => {}
const { createRoot } = await import('react-dom/client')
const { MemoryRouter } = await import('react-router-dom')
const server = await createServer({
  server: { middlewareMode: true, hmr: false, ws: false },
  appType: 'custom',
})
const { default: Provider } = await server.ssrLoadModule('/src/context/SupabaseProvider.jsx')
const { useLearning } = await server.ssrLoadModule('/src/context/LearningContext.jsx')
const { default: App } = await server.ssrLoadModule('/src/App.jsx')
let root, context
function Probe() {
  context = useLearning()
  return null
}
async function flush() {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0))
  })
}
async function mount(client, route = '/student') {
  if (root) await act(async () => root.unmount())
  document.body.innerHTML = '<div id="root"></div>'
  root = createRoot(document.getElementById('root'))
  await act(async () =>
    root.render(
      React.createElement(
        Provider,
        { client },
        React.createElement(Probe),
        React.createElement(MemoryRouter, { initialEntries: [route] }, React.createElement(App)),
      ),
    ),
  )
  await flush()
}
function fakeClient(initial = 'student') {
  const calls = [],
    listeners = new Set()
  let session = initial ? { user: { id: 'student-1' } } : null
  let role = initial || 'student',
    xp = 0
  const lesson = {
    id: 'lesson-1',
    subject_id: 'subject-1',
    title: 'Belajar bersama server',
    slug: 'belajar-bersama-server',
    grade: 3,
    phase: 'B',
    chapter: 'Bab 1',
    status: 'published',
    duration: 5,
    content: {
      summary: 'Amati benda di sekitarmu.',
      blocks: [{ type: 'text', body: 'Ayo belajar.' }],
    },
  }
  const quiz = Array.from({ length: 5 }, (_, i) => ({
    id: `q-${i}`,
    lesson_id: lesson.id,
    prompt: `Soal server ${i + 1}`,
    options: ['Satu', 'Dua', 'Tiga', 'Empat'],
  }))
  const client = {
    calls,
    lesson,
    quiz,
    failTable: null,
    hook: null,
    emit(event, next) {
      session = next
      for (const listener of listeners) listener(event, next)
    },
    auth: {
      onAuthStateChange(listener) {
        listeners.add(listener)
        return {
          data: {
            subscription: {
              unsubscribe() {
                listeners.delete(listener)
              },
            },
          },
        }
      },
      async getSession() {
        return { data: { session }, error: null }
      },
      async signInWithPassword(params) {
        calls.push(['login', params])
        client.emit('SIGNED_IN', { user: { id: 'student-1' } })
        return { data: { session }, error: null }
      },
      async signUp(params) {
        calls.push(['signup', params])
        return { data: { session: null }, error: null }
      },
      async signOut() {
        client.emit('SIGNED_OUT', null)
        return { data: {}, error: null }
      },
      async resetPasswordForEmail(email, params) {
        calls.push(['reset', email, params])
        return { data: {}, error: null }
      },
      async updateUser(params) {
        calls.push(['password', params])
        return { data: {}, error: null }
      },
    },
    from(table) {
      const query = {
        table,
        filters: [],
        singleRow: false,
        head: false,
        updates: null,
        select(columns, options = {}) {
          query.columns = columns
          query.head = options.head
          return query
        },
        eq(column, value) {
          query.filters.push([column, value])
          return query
        },
        order() {
          return query
        },
        not() {
          return query
        },
        single() {
          query.singleRow = true
          return query
        },
        update(value) {
          query.updates = value
          return query
        },
        then(resolve, reject) {
          return Promise.resolve()
            .then(async () => {
              calls.push(['table', { ...query }])
              if (client.hook) await client.hook(query)
              if (client.failTable === table)
                return { data: null, error: { message: 'Koneksi uji terputus' } }
              if (query.updates) return { data: null, error: null }
              let data = []
              if (table === 'subjects')
                data = [
                  { id: 'subject-1', name: 'Matematika', slug: 'matematika', is_active: true },
                ]
              if (table === 'lessons') data = [lesson]
              if (table === 'profiles')
                data = query.singleRow
                  ? {
                      id: query.filters.find((f) => f[0] === 'id')[1],
                      display_name: 'Nara cloud',
                      role,
                      grade: 3,
                      avatar: 'fox',
                      total_xp: xp,
                      level: 1,
                    }
                  : []
              return { data, error: null, count: 5 }
            })
            .then(resolve, reject)
        },
      }
      return query
    },
    async rpc(name, params) {
      calls.push(['rpc', name, params])
      if (name === 'get_lesson_quiz')
        return {
          data: { attempt_id: 'attempt-1', lesson_id: lesson.id, questions: quiz },
          error: null,
        }
      if (name === 'submit_quiz_answers' || name === 'get_quiz_result') {
        xp = 55
        return {
          data: {
            attempt_id: 'attempt-1',
            lesson_id: lesson.id,
            score: 100,
            correct_count: 5,
            total_questions: 5,
            xp_earned: 55,
            xp_granted_now: 55,
            details: quiz.map((q) => ({
              ...q,
              question_id: q.id,
              selected_option: 0,
              correct_option: 0,
              is_correct: true,
              explanation: 'Pembahasan dari server.',
            })),
          },
          error: null,
        }
      }
      if (name === 'get_editor_questions')
        return {
          data: quiz.map((q) => ({
            ...q,
            correct_option: 0,
            explanation: 'Pembahasan editor.',
            status: 'draft',
          })),
          error: null,
        }
      if (name === 'import_questions') return { data: params.p_items.length, error: null }
      if (name === 'join_class')
        return { data: { ok: false, message: 'Kode kelas belum cocok.' }, error: null }
      return { data: [], error: null }
    },
    storage: {
      from() {
        return {
          async upload(path, file, options) {
            calls.push(['upload', path, file.size, options])
            return { data: { path }, error: null }
          },
          async createSignedUrl(path, seconds) {
            calls.push(['signed', path, seconds])
            return { data: { signedUrl: 'https://storage.example.test/private' }, error: null }
          },
          async remove(paths) {
            calls.push(['remove', paths])
            return { data: [], error: null }
          },
        }
      },
    },
  }
  return client
}
afterEach(async () => {
  if (root) {
    await act(async () => root.unmount())
    root = null
  }
  await dom.happyDOM.cancelAsync()
})
after(async () => {
  await server.close()
  await dom.happyDOM.close()
})

test('Konfigurasi menolak placeholder, mode asing, secret dan JWT service-role', () => {
  assert.equal(readConfig({}).mode, 'demo')
  assert.ok(readConfig({ VITE_APP_MODE: 'lain' }).error)
  const base = { VITE_APP_MODE: 'supabase', VITE_SUPABASE_URL: 'https://test.supabase.co' }
  for (const key of [
    'YOUR_PUBLISHABLE_KEY',
    'sb_secret_private',
    `x.${btoa(JSON.stringify({ role: 'service_role' }))}.x`,
  ])
    assert.ok(readConfig({ ...base, VITE_SUPABASE_PUBLISHABLE_KEY: key }).error)
  assert.equal(
    readConfig({ ...base, VITE_SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_test' }).error,
    null,
  )
})
test('Adapter hanya mengambil kolom profil yang dapat diubah dan memakai kontrak sesi', async () => {
  const client = fakeClient(),
    service = createSupabaseService(client)
  await service.updateProfile('student-1', {
    display_name: 'Nara',
    grade: 3,
    avatar: 'fox',
    role: 'admin',
    total_xp: 999,
  })
  assert.deepEqual(client.calls[0][1].updates, { display_name: 'Nara', grade: 3, avatar: 'fox' })
  await service.submitQuiz('attempt-1', [{ question_id: 'q-0', selected_option: 0 }])
  assert.deepEqual(client.calls.at(-1).slice(1), [
    'submit_quiz_answers',
    { p_attempt_id: 'attempt-1', p_answers: [{ question_id: 'q-0', selected_option: 0 }] },
  ])
  await assert.rejects(service.joinClass('SALAH1'), /Kode kelas/)
})
test('Lampiran memvalidasi MIME/ukuran, nama privat acak, signed URL 60 detik', async () => {
  const client = fakeClient(),
    service = createSupabaseService(client)
  await assert.rejects(service.uploadFile('s', 'a', { type: 'text/html', size: 10 }), /5 MB/)
  await assert.rejects(
    service.uploadFile('s', 'a', { type: 'application/pdf', size: 6 * 1024 * 1024 }),
    /5 MB/,
  )
  const path = await service.uploadFile('s', 'a', { type: 'application/pdf', size: 100 })
  assert.match(path, /^s\/a\/[a-f0-9-]+\.pdf$/)
  assert.equal(client.calls[0][3].upsert, false)
  await service.signedFile(path)
  assert.equal(client.calls.at(-1)[2], 60)
})
test('Auth nyata tidak menyediakan pilihan peran demo dan login memakai layanan', async () => {
  const client = fakeClient(null)
  await mount(client, '/login')
  assert.doesNotMatch(document.body.textContent, /Demo tutor|Demo admin/)
  const email = document.querySelector('input[type=email]'),
    password = document.querySelector('input[type=password]')
  const setValue = Object.getOwnPropertyDescriptor(dom.HTMLInputElement.prototype, 'value').set
  await act(async () => {
    setValue.call(email, 'wali@example.test')
    email.dispatchEvent(new dom.Event('input', { bubbles: true }))
    setValue.call(password, 'rahasia-uji')
    password.dispatchEvent(new dom.Event('input', { bubbles: true }))
  })
  await act(async () =>
    document
      .querySelector('form')
      .dispatchEvent(new dom.Event('submit', { bubbles: true, cancelable: true })),
  )
  await flush()
  assert.deepEqual(client.calls.find((c) => c[0] === 'login')[1], {
    email: 'wali@example.test',
    password: 'rahasia-uji',
  })
  assert.equal(context.session.role, 'student')
  assert.match(document.body.textContent, /Halo, Nara cloud/)
  assert.equal(
    client.calls.some((c) => c[0] === 'table' && c[1].table === 'questions'),
    false,
  )
})
test('Pembaruan token mempertahankan jawaban kuis; submit mengirim seluruh opsi ke RPC', async () => {
  const client = fakeClient()
  await mount(client, '/student/quiz/lesson-1')
  await act(async () => document.querySelector('input[type=radio]').click())
  await act(async () => client.emit('TOKEN_REFRESHED', { user: { id: 'student-1' } }))
  await flush()
  assert.equal(document.querySelector('input[type=radio]').checked, true)
  for (let i = 1; i < 5; i++) {
    await act(async () =>
      [...document.querySelectorAll('button')]
        .find((b) => b.textContent.trim() === 'Selanjutnya')
        .click(),
    )
    await act(async () => document.querySelector('input[type=radio]').click())
  }
  await act(async () =>
    [...document.querySelectorAll('button')]
      .find((b) => b.textContent.includes('Kumpulkan latihan'))
      .click(),
  )
  await flush()
  assert.equal(client.calls.find((c) => c[1] === 'submit_quiz_answers')[2].p_answers.length, 5)
  assert.match(document.body.textContent, /Usahamu membuahkan hasil/)
  assert.equal(context.total_xp, 55)
})
test('Respons data akun lama dibuang setelah akun berganti', async () => {
  const client = fakeClient()
  await mount(client)
  let release, entered
  const started = new Promise((resolve) => {
    entered = resolve
  })
  const blocked = new Promise((resolve) => {
    release = resolve
  })
  let once = true
  client.hook = async (query) => {
    if (once && query.table === 'profiles') {
      once = false
      entered()
      await blocked
    }
  }
  let pending
  await act(async () => {
    pending = context.refresh()
    await started
  })
  await act(async () => client.emit('SIGNED_IN', { user: { id: 'student-2' } }))
  await flush()
  await act(async () => {
    release()
    await pending
  })
  assert.equal(context.session.user_id, 'student-2')
  await act(async () => context.logout())
  await flush()
  assert.equal(context.session, null)
})
test('Gagal mengambil data menampilkan retry dan halaman role tetap ditolak', async () => {
  const client = fakeClient()
  client.failTable = 'lessons'
  await mount(client)
  assert.match(document.body.textContent, /Data belum dapat dimuat/)
  client.failTable = null
  await act(async () =>
    [...document.querySelectorAll('button')].find((b) => b.textContent === 'Coba lagi').click(),
  )
  await flush()
  assert.equal(context.session.role, 'student')
  await mount(client, '/admin')
  assert.match(document.body.textContent, /Ruang ini untuk peran yang berbeda/)
})
test('Halaman tutor, admin, akun, pemulihan, dan registrasi merender pada mode Supabase', async () => {
  for (const [role, route] of [
    ['tutor', '/tutor'],
    ['admin', '/admin'],
    ['student', '/student/classes'],
    ['student', '/student/progress'],
    ['student', '/student/profile'],
    ['student', '/student/lesson/belajar-bersama-server'],
    ['student', '/account'],
    [null, '/register'],
    [null, '/forgot-password'],
  ]) {
    await mount(fakeClient(role), route)
    assert.ok(document.querySelector('h1'), route)
    assert.doesNotMatch(
      document.body.textContent,
      /Data belum dapat dimuat|Unexpected|TypeError/,
      route,
    )
  }
})
test('Editor scenes menyimpan perubahan komik tanpa menyalin teks ke blocks', async () => {
  const client = fakeClient('admin')
  const compact = completeSeedData().lessons.find((l) => l.subject === 'ipa' && l.grade === 4)
  client.lesson.content = structuredClone(compact.content)
  await mount(client, '/admin')
  const select = document.querySelector('.content-studio select')
  await act(async () => {
    select.value = 'lesson-1'
    select.dispatchEvent(new dom.Event('change', { bubbles: true }))
  })
  await flush()
  assert.match(document.querySelector('.content-studio').textContent, /Adegan komik \(JSON\)/)
  const editor = document.querySelector('.content-studio textarea.code-input')
  const scenes = JSON.parse(editor.value)
  scenes[0].text = 'Tobi membawa tanaman hijau untuk diamati bersama teman-teman di kelas.'
  const setValue = Object.getOwnPropertyDescriptor(dom.HTMLTextAreaElement.prototype, 'value').set
  await act(async () => {
    setValue.call(editor, JSON.stringify(scenes))
    editor.dispatchEvent(new dom.Event('input', { bubbles: true }))
    editor.dispatchEvent(new dom.Event('change', { bubbles: true }))
  })
  await act(async () =>
    document
      .querySelector('.content-studio form')
      .dispatchEvent(new dom.Event('submit', { bubbles: true, cancelable: true })),
  )
  await flush()
  const saved = client.calls.find((c) => c[1] === 'save_lesson')?.[2]
  assert.ok(saved)
  assert.deepEqual(saved.p_document.content.blocks, [])
  assert.equal(saved.p_document.content.scenes[0].text, scenes[0].text)
  assert.equal(saved.p_lesson_id, 'lesson-1')
  assert.equal(saved.p_document.content.scenes.length, compact.content.scenes.length)
})

test('Admin mengimpor draf lewat RPC dan publikasi memerlukan konfirmasi tinjauan', async () => {
  const client = fakeClient('admin')
  await mount(client, '/admin')
  const find = (text) =>
    [...document.querySelectorAll('button')].find((b) => b.textContent.trim() === text)
  await act(async () => find('Validasi dahulu').click())
  await act(async () => find('Simpan batch sebagai draf').click())
  assert.ok(client.calls.find((c) => c[1] === 'import_questions')[2].p_batch_id)
  assert.match(document.body.textContent, /soal tersimpan sebagai draf/)
  const select = document.querySelector('.content-studio select')
  await act(async () => {
    select.value = 'lesson-1'
    select.dispatchEvent(new dom.Event('change', { bubbles: true }))
  })
  await flush()
  assert.equal(find('Publikasikan materi').disabled, true)
  await act(async () => document.querySelector('.publish-controls input[type=checkbox]').click())
  assert.equal(find('Publikasikan materi').disabled, false)
  await act(async () => find('Publikasikan materi').click())
  assert.deepEqual(client.calls.find((c) => c[1] === 'publish_lesson')[2], {
    p_lesson_id: 'lesson-1',
    p_publish: true,
    p_review_confirmed: true,
  })
})
