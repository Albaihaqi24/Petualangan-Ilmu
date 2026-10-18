// Pengujian DOM komponen; QA visual tetap membutuhkan browser nyata.
import assert from 'node:assert/strict'
import { after, afterEach, beforeEach, test } from 'node:test'
import React, { act } from 'react'
import { Window } from 'happy-dom'
import { createServer } from 'vite'
import { questions } from '../src/lib/dummyData.js'
import { curriculumQuestions } from '../src/content/curriculumDraft.js'
import { textbookQuestions } from '../src/content/books/mathGrade1.js'
import { adventureLessons, adventureQuestions } from '../src/content/adventure/index.js'
import { completeSeedData } from '../scripts/generate-seed-materi-lengkap.mjs'
const dom = new Window({
  url: 'http://localhost:5173',
  settings: {
    disableCSSFileLoading: true,
    disableJavaScriptFileLoading: true,
    disableIframePageLoading: true,
  },
})
// Happy DOM belum meniru cancellation promise WAAPI seperti browser.
// Tes interaksi memakai driver JS; animasi native diperiksa terpisah di Edge.
delete dom.Element.prototype.animate
for (const key of [
  'window',
  'document',
  'HTMLElement',
  'Element',
  'SVGElement',
  'SVGSVGElement',
  'HTMLInputElement',
  'HTMLTextAreaElement',
  'Event',
  'MouseEvent',
  'FormData',
  'localStorage',
]) {
  Object.defineProperty(globalThis, key, {
    value: key === 'window' ? dom : dom[key],
    configurable: true,
    writable: true,
  })
}
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
const { default: App } = await server.ssrLoadModule('/src/App.jsx')
const { preloadAdventureMotion } = await server.ssrLoadModule(
  '/src/components/adventure/AdventureMotion.jsx',
)
await preloadAdventureMotion()
const { DemoProvider, useDemo } = await server.ssrLoadModule('/src/context/DemoContext.jsx')
let root
let context
const runtimeErrors = []
const originalConsoleError = console.error
console.error = (...args) => {
  runtimeErrors.push(args.map(String).join(' '))
  originalConsoleError(...args)
}
beforeEach(() => {
  runtimeErrors.length = 0
})
function Probe() {
  context = useDemo()
  return null
}
async function mount(route, role = null, preserveStorage = false) {
  if (root) await act(async () => root.unmount())
  if (!preserveStorage) localStorage.clear()
  document.body.innerHTML = '<div id="root"></div>'
  root = createRoot(document.getElementById('root'))
  await act(async () =>
    root.render(React.createElement(DemoProvider, null, React.createElement(Probe))),
  )
  if (role) await act(async () => context.enterDemo(role))
  await act(async () =>
    root.render(
      React.createElement(
        DemoProvider,
        null,
        React.createElement(Probe),
        React.createElement(MemoryRouter, { initialEntries: [route] }, React.createElement(App)),
      ),
    ),
  )
}
async function clickText(text) {
  const element = [...document.querySelectorAll('button,a')].find(
    (item) => item.textContent.trim() === text,
  )
  assert.ok(element, `Kontrol tidak ditemukan: ${text}`)
  await act(async () => element.click())
}
afterEach(async () => {
  if (root) {
    await act(async () => root.unmount())
    root = null
  }
  await dom.happyDOM.cancelAsync()
  assert.deepEqual(
    runtimeErrors,
    [],
    'Tidak boleh ada error runtime tersembunyi pada pengujian UI.',
  )
})
after(async () => {
  console.error = originalConsoleError
  await server.close()
  await dom.happyDOM.close()
})
test('Publik mendapat katalog dan halaman 404 memiliki jalan kembali', async () => {
  await mount('/jelajah/matematika')
  assert.match(document.body.textContent, /Pulau Numeria/)
  assert.equal(document.querySelectorAll('.catalog-list article').length, 74)
  assert.equal(document.querySelectorAll('.quiz-options').length, 0)
  await mount('/tidak-ada')
  assert.match(document.body.textContent, /mengambil jalan lain/)
})

test('Perpustakaan menampilkan paket petualangan menurut kelas/pelajaran dan login siswa', async () => {
  await mount('/sumber-belajar?grade=1&subject=ipas')
  assert.equal(document.querySelectorAll('.adventure-course-card').length, 1)
  assert.match(document.querySelector('.adventure-course-card').textContent, /Pengayaan sains/)
  assert.equal(document.querySelectorAll('.adventure-course-card a[href="/login"]').length, 4)
  await mount('/sumber-belajar?grade=6&subject=matematika', 'student')
  assert.equal(
    document.querySelectorAll('.adventure-course-card a[href^="/student/lesson/"]').length,
    4,
  )
  assert.match(document.querySelector('.adventure-course-card').textContent, /Kapten Rubi/)
})

test(
  'Seluruh 72 bab merender navigasi, tiga subbab, latihan dan pembahasan tertutup',
  { timeout: 60000 },
  async () => {
    for (const lesson of adventureLessons) {
      await mount(`/student/lesson/${lesson.slug}`, 'student')
      assert.equal(document.querySelector('.reading-header h1').textContent, lesson.title)
      assert.equal(document.querySelectorAll('.adventure-navigation a').length, 4)
      assert.equal(
        document.querySelectorAll('.adventure-navigation [aria-current="page"]').length,
        1,
      )
      assert.equal(document.querySelectorAll('details.material-section').length, 2)
      assert.equal(document.querySelectorAll('details.material-section[open]').length, 0)
      assert.equal(document.querySelectorAll('.quiz-options').length, 0)
      for (const heading of ['A.', 'B.', 'C.'])
        assert.ok(
          [...document.querySelectorAll('.material-section h2')].some((h) =>
            h.textContent.startsWith(heading),
          ),
        )
    }
  },
)

test('Paket baru: baca ke kuis, nilai, pembahasan, XP sekali dan navigasi bab berikutnya', async () => {
  await mount('/student/lesson/petualangan-matematika-kelas-5-bab-1', 'student')
  await clickText('Bab 2: Perkalian & Pembagian Pecahan')
  assert.equal(
    document.querySelector('.reading-header h1').textContent,
    'Perkalian & Pembagian Pecahan',
  )
  await clickText('Bab 1: Penjumlahan & Pengurangan Pecahan Beda Penyebut')
  await clickText('Selesai membaca & mulai latihan')
  assert.equal(context.total_xp, 5)
  for (let i = 0; i < 5; i++) {
    const input = document.querySelector('input[type="radio"]')
    const item = adventureQuestions.find((q) => q.id === input.name)
    assert.ok(item)
    await act(async () =>
      document.querySelectorAll('input[type="radio"]')[item.correct_option].click(),
    )
    await clickText(i < 4 ? 'Selanjutnya' : 'Kumpulkan latihan')
  }
  assert.equal(context.attempts[0].score, 100)
  assert.equal(context.total_xp, 60)
  assert.equal(document.querySelectorAll('.review-explanation').length, 5)
  const first = context.attempts[0]
  await act(async () => context.submitQuiz(first.id, first.lesson_id, [], {}))
  assert.equal(context.total_xp, 60)
})
test('Perpustakaan publik memfilter kelas, pelajaran dan jenis pembaca tanpa memuat PDF', async () => {
  await mount('/sumber-belajar?grade=1&audience=student')
  assert.match(document.body.textContent, /Buku utuh, langkah belajar terarah/)
  assert.equal(document.querySelectorAll('.resource-card').length, 2)
  assert.equal(document.querySelectorAll('.curriculum-card').length, 6)
  assert.match(document.body.textContent, /Pengayaan awal/)
  assert.match(document.body.textContent, /Draf terisi · menunggu review guru/)
  assert.equal(document.querySelectorAll('iframe').length, 0)
  assert.equal(document.querySelectorAll('.official-material-card').length, 2)
  for (const link of document.querySelectorAll('.official-material-card a')) {
    assert.equal(new URL(link.href).hostname, 'murid.kemendikdasmen.go.id')
    assert.equal(link.target, '_blank')
    assert.ok(link.rel.includes('noopener'))
  }
  for (const link of document.querySelectorAll('.resource-card a')) {
    assert.equal(new URL(link.href).hostname, 'buku.kemendikdasmen.go.id')
    assert.equal(link.target, '_blank')
    assert.ok(link.rel.includes('noopener'))
  }
  const select = document.querySelector('select')
  await act(async () => {
    select.value = '5'
    select.dispatchEvent(new dom.Event('change', { bubbles: true }))
  })
  assert.match(document.body.textContent, /Buku dan panduan kelas 5/)
  assert.equal(document.querySelectorAll('.resource-card').length, 4)
  await mount('/sumber-belajar?grade=6&subject=seni-budaya&audience=teacher')
  assert.equal(document.querySelectorAll('.resource-card').length, 1)
  assert.equal(document.querySelectorAll('.curriculum-card').length, 1)
  assert.match(document.body.textContent, /Panduan Guru Seni Rupa/)
  await mount('/sumber-belajar?grade=1&subject=ipas&audience=student')
  assert.match(document.body.textContent, /Belum ada rujukan yang cocok/)
})

test('Form demo masuk ke peta tanpa menyimpan email atau kata sandi', async () => {
  await mount('/register')
  await act(async () =>
    document
      .querySelector('form')
      .dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })),
  )
  assert.match(document.body.textContent, /Halo, Nara/)
  assert.equal(context.session.role, 'student')
  const stored = localStorage.getItem('petualangan-ilmu:demo:v2')
  assert.ok(!stored.includes('contoh-belajar'))
  assert.ok(!stored.includes('nara@example.test'))
})

test('Progres demo bertahan saat aplikasi dimuat ulang', async () => {
  await mount('/student', 'student')
  await act(async () => context.completeReading('matematika-3'))
  await mount('/student/progress', null, true)
  assert.equal(context.total_xp, 5)
  assert.deepEqual(context.readLessonIds, ['matematika-3'])
  assert.match(document.body.textContent, /Lihat, kamu sudah bertumbuh/)
})

test('Renderer video meminta klik sebelum memuat iframe pihak ketiga', async () => {
  await mount('/')
  const { default: MaterialRenderer } = await server.ssrLoadModule(
    '/src/components/ui/MaterialRenderer.jsx',
  )
  await act(async () =>
    root.render(
      React.createElement(MaterialRenderer, {
        content: {
          blocks: [
            { type: 'text', body: 'Contoh materi.' },
            { type: 'tip', body: 'Amati perlahan.' },
          ],
          video_url: 'https://youtu.be/abcdefghijk',
        },
      }),
    ),
  )
  assert.equal(document.querySelector('iframe'), null)
  await clickText('Muat video')
  assert.equal(
    document.querySelector('iframe').getAttribute('src'),
    'https://www.youtube-nocookie.com/embed/abcdefghijk',
  )
})
test('Materi ringan menampilkan semua scenes tanpa salinan blocks; pembahasan mini-check tertutup', async () => {
  await mount('/')
  const { default: MaterialRenderer } = await server.ssrLoadModule(
    '/src/components/ui/MaterialRenderer.jsx',
  )
  for (const lesson of completeSeedData().lessons) {
    assert.deepEqual(lesson.content.blocks, [])
    await act(async () =>
      root.render(
        React.createElement(MaterialRenderer, { key: lesson.id, content: lesson.content }),
      ),
    )
    const text = document.body.textContent
    for (const scene of lesson.content.scenes) {
      if (scene.type === 'dialog') assert.ok(text.includes(scene.text))
      if (scene.type === 'comic_panel') assert.ok(text.includes(scene.caption))
      if (scene.type === 'mini_check') {
        assert.ok(text.includes(scene.question))
        assert.ok(scene.options.every((option) => text.includes(option)))
      }
    }
    const feedback = document.querySelector('details.material-section')
    assert.ok(feedback)
    assert.equal(feedback.open, false)
    await act(async () => {
      feedback.open = true
    })
    assert.match(feedback.textContent, /Jawaban:/)
  }
})

test('Enam karakter SVG mendukung empat ekspresi dan label yang dapat dibaca pembaca layar', async () => {
  await mount('/')
  const { default: CharacterAvatar } = await server.ssrLoadModule(
    '/src/components/adventure/CharacterAvatar.jsx',
  )
  for (const character of ['rubi', 'bobo', 'tobi', 'kiki', 'momo', 'piko'])
    for (const emotion of ['senang', 'berpikir', 'kaget', 'semangat']) {
      await act(async () =>
        root.render(React.createElement(CharacterAvatar, { character, emotion, idle: false })),
      )
      const svg = document.querySelector('svg[data-character]')
      assert.equal(svg.dataset.character, character)
      assert.equal(svg.dataset.emotion, emotion)
      assert.equal(svg.getAttribute('role'), 'img')
      assert.ok(svg.getAttribute('aria-label').includes(emotion))
      assert.equal(document.querySelector('img'), null)
    }
})

test('Komik berpindah adegan, mini-check memberi umpan balik tanpa mengubah XP atau data belajar', async () => {
  await mount('/', 'student')
  const before = localStorage.getItem('petualangan-ilmu:demo:v2')
  const { default: Reader } = await server.ssrLoadModule(
    '/src/components/adventure/ComicStoryReader.jsx',
  )
  const scenes = [
    {
      type: 'dialog',
      speaker: 'Rubi',
      emotion: 'kaget',
      text: 'Rubi membawa dua keranjang apel untuk teman-temannya.',
    },
    { type: 'comic_panel', caption: 'Dua keranjang, masing-masing berisi satu buah apel.' },
    {
      type: 'mini_check',
      question: 'Berapa jumlah seluruh apel?',
      options: ['Satu', 'Dua', 'Tiga'],
      correct_index: 1,
      feedback: 'Satu ditambah satu sama dengan dua buah apel.',
    },
  ]
  await act(async () => root.render(React.createElement(Reader, { scenes, character: 'rubi' })))
  const next = () =>
    act(async () => document.querySelector('[aria-label="Adegan berikutnya"]').click())
  assert.match(document.body.textContent, /Rubi membawa dua keranjang/)
  await next()
  assert.match(document.body.textContent, /masing-masing berisi satu/)
  await next()
  assert.equal(document.querySelector('[aria-label="Adegan berikutnya"]').disabled, true)
  await act(async () => document.querySelectorAll('.comic-choice')[0].click())
  assert.match(document.querySelector('.comic-feedback').textContent, /Hampir tepat/)
  assert.equal(document.querySelector('[data-character]').dataset.emotion, 'semangat')
  await act(async () => document.querySelectorAll('.comic-choice')[1].click())
  assert.match(document.querySelector('.comic-feedback').textContent, /Tepat!/)
  assert.equal(document.querySelectorAll('.comic-choice')[1].getAttribute('aria-pressed'), 'true')
  assert.equal(localStorage.getItem('petualangan-ilmu:demo:v2'), before)
})

test('Avatar Piko dapat dipilih, disimpan dan dipulihkan setelah profil dimuat ulang', async () => {
  await mount('/student/profile', 'student')
  const option = [...document.querySelectorAll('.avatar-options label')].find((label) =>
    label.textContent.includes('Piko'),
  )
  assert.ok(option)
  await act(async () => option.querySelector('input').click())
  await clickText('Simpan profil demo')
  assert.equal(context.profile.avatar, 'piko')
  await mount('/student/profile', null, true)
  assert.equal(context.profile.avatar, 'piko')
  assert.equal(document.querySelector('.profile-chip [data-character]').dataset.character, 'piko')
})

test('XPBar menampilkan progres aktual dan memperbarui level pada batas 100 XP', async () => {
  await mount('/')
  const { default: XPBar } = await server.ssrLoadModule('/src/components/ui/XPBar.jsx')
  await act(async () => root.render(React.createElement(XPBar, { xp: 95 })))
  assert.equal(document.querySelector('[role=progressbar]').getAttribute('aria-valuenow'), '95')
  await act(async () => root.render(React.createElement(XPBar, { xp: 110 })))
  assert.match(document.body.textContent, /Level 2/)
  assert.equal(document.querySelector('[role=progressbar]').getAttribute('aria-valuenow'), '10')
  assert.match(document.querySelector('.xp-gain').textContent, /\+15 XP/)
})

test('Perayaan jawaban tidak mengklaim +10 XP jika hasil tidak memberi hadiah sebesar itu', async () => {
  await mount('/', 'student')
  const { AnswerReaction } = await server.ssrLoadModule(
    '/src/components/adventure/QuizFeedback.jsx',
  )
  const before = context.total_xp
  await act(async () =>
    root.render(
      React.createElement(AnswerReaction, { detail: { is_correct: true }, rewarded: false }),
    ),
  )
  await clickText('Tos dengan Momo! ✋')
  assert.match(document.body.textContent, /Hebat! ✦/)
  assert.doesNotMatch(document.body.textContent, /\+10 XP/)
  assert.equal(context.total_xp, before)
})

test('Tamu diarahkan ke form demo; siswa ditolak dari ruang tutor', async () => {
  await mount('/student')
  assert.match(document.body.textContent, /Masuk ke demo siswa/)
  await mount('/tutor', 'student')
  assert.match(document.body.textContent, /peran yang berbeda/)
  assert.equal(document.querySelectorAll('.tutor-grid').length, 0)
})
test('Seluruh halaman utama merender sesuai peran', async () => {
  for (const [route, role, expected] of [
    ['/', null, 'Rasa ingin tahu'],
    ['/register', null, 'Siap jadi petualang'],
    ['/student', 'student', 'Halo, Nara'],
    ['/student/lesson/matematika-kelas-3', 'student', 'Perkalian di kebun Nara'],
    ['/student/quiz/matematika-3', 'student', 'Soal 1 dari 5'],
    ['/student/classes', 'student', 'Punya kode kelas'],
    ['/student/progress', 'student', 'Lihat, kamu sudah bertumbuh'],
    ['/student/profile', 'student', 'Kenalkan dirimu'],
    ['/tutor', 'tutor', 'Temani setiap langkah kecil'],
    ['/admin', 'admin', 'Pengetahuan yang dirawat bersama'],
  ]) {
    await mount(route, role)
    assert.ok(document.body.textContent.includes(expected), route)
  }
})
test('Baca → XP sekali → kuis → nilai dan pembahasan', async () => {
  await mount('/student/lesson/matematika-kelas-3', 'student')
  assert.ok(document.querySelector('.material-tip'))
  assert.equal(
    document.querySelector('figure img').getAttribute('src'),
    '/assets/kebun-belajar.svg',
  )
  await clickText('Selesai membaca & mulai latihan')
  assert.equal(context.total_xp, 5)
  assert.equal(document.querySelectorAll('.review-explanation').length, 0)
  await act(async () => context.completeReading('matematika-3'))
  assert.equal(context.total_xp, 5)
  for (let i = 0; i < 5; i += 1) {
    const input = document.querySelector('input[type="radio"]')
    const item = questions.find((question) => question.id === input.name)
    await act(async () =>
      document.querySelectorAll('input[type="radio"]')[item.correct_option].click(),
    )
    await clickText(i < 4 ? 'Selanjutnya' : 'Kumpulkan latihan')
  }
  assert.match(document.body.textContent, /Usahamu membuahkan hasil/)
  assert.equal(document.querySelectorAll('.review-explanation').length, 5)
  assert.equal(context.attempts[0].score, 100)
  assert.equal(context.total_xp, 60)
  const first = context.attempts[0]
  await act(async () => context.submitQuiz(first.id, first.lesson_id, [], {}))
  assert.equal(context.total_xp, 60)
  assert.equal(context.attempts.length, 1)
})
test('Buku per bab menampilkan delapan navigasi, subbab, pembahasan tertutup dan kuis', async () => {
  await mount('/student/lesson/buku-matematika-kelas-1-bab-1', 'student')
  assert.equal(document.querySelectorAll('.textbook-navigation a').length, 8)
  assert.match(
    document.querySelector('.textbook-navigation [aria-current=page]').textContent,
    /Bab 1/,
  )
  assert.match(document.body.textContent, /A\. Menghitung dan menulis/)
  assert.match(document.body.textContent, /D\. Menyusun dan mengurai bilangan/)
  assert.ok(document.querySelectorAll('.chapter-contents a').length > 10)
  assert.equal(document.querySelectorAll('.material-section[open]').length, 0)
  assert.equal(document.querySelectorAll('details.material-section').length, 2)
  await clickText('Selesai membaca & mulai latihan')
  for (let i = 0; i < 5; i++) {
    const question = textbookQuestions.find(
      (q) => q.id === document.querySelector('input[type=radio]').name,
    )
    assert.ok(question)
    await act(async () =>
      document.querySelectorAll('input[type=radio]')[question.correct_option].click(),
    )
    await clickText(i < 4 ? 'Selanjutnya' : 'Kumpulkan latihan')
  }
  assert.equal(context.attempts[0].score, 100)
  assert.equal(context.total_xp, 60)
})

test('Panel CP mengikuti bab/pelajaran pilihan dan menampilkan satu cabang seni', async () => {
  await server.ssrLoadModule('/src/components/ui/CpReferenceDetails.jsx')
  await mount('/student/lesson/buku-matematika-kelas-1-bab-1', 'student')
  assert.equal(document.querySelectorAll('.cp-criterion').length, 0)
  const panel = document.querySelector('.cp-reference-panel')
  assert.ok(panel)
  await act(async () => {
    panel.open = true
    panel.dispatchEvent(new dom.Event('toggle'))
    await new Promise((resolve) => setImmediate(resolve))
  })
  assert.equal(document.querySelectorAll('.cp-criterion').length, 1)
  assert.match(panel.textContent, /Bilangan/)
  assert.match(panel.textContent, /sampai 100/)
  assert.match(panel.textContent, /kelas 1–2/)
  await mount('/sumber-belajar?grade=1&subject=ipas')
  assert.equal(document.querySelectorAll('.cp-reference-panel').length, 0)
  await mount('/sumber-belajar?grade=3')
  assert.equal(document.querySelectorAll('.cp-reference-panel').length, 0)
  await mount('/sumber-belajar?grade=3&subject=matematika&audience=student')
  assert.equal(document.querySelectorAll('.cp-reference-panel').length, 0)
  await mount('/sumber-belajar?grade=3&subject=seni-budaya')
  const artsPanel = document.querySelector('.cp-reference-panel')
  await act(async () => {
    artsPanel.open = true
    artsPanel.dispatchEvent(new dom.Event('toggle'))
    await new Promise((resolve) => setImmediate(resolve))
  })
  assert.equal(artsPanel.querySelectorAll('.cp-criterion').length, 0)
  const branch = artsPanel.querySelector('select')
  assert.equal(branch.options.length, 5)
  await act(async () => {
    branch.value = 'cp2025-seni-rupa-b'
    branch.dispatchEvent(new dom.Event('change', { bubbles: true }))
  })
  assert.equal(artsPanel.querySelectorAll('.cp-criterion').length, 5)
  assert.equal(artsPanel.querySelectorAll('h4').length, 1)
  assert.match(artsPanel.querySelector('h4').textContent, /Seni Rupa/)
  await act(async () => {
    branch.value = 'cp2025-seni-musik-b'
    branch.dispatchEvent(new dom.Event('change', { bubbles: true }))
  })
  assert.equal(artsPanel.querySelectorAll('.cp-criterion').length, 5)
  assert.equal(artsPanel.querySelectorAll('h4').length, 1)
  assert.match(artsPanel.querySelector('h4').textContent, /Seni Musik/)
})

test('Submit kosong mengarahkan kembali ke soal yang belum dijawab', async () => {
  await mount('/student/quiz/matematika-3', 'student')
  for (let i = 0; i < 4; i += 1) await clickText('Selanjutnya')
  await clickText('Kumpulkan latihan')
  assert.match(document.querySelector('[role="alert"]').textContent, /belum dijawab/)
  assert.match(document.body.textContent, /Soal 1 dari 5/)
  assert.equal(context.total_xp, 0)
})
test('Draf baru dapat dibaca, menyimpan XP demo, dan menampilkan pembahasan lima soal', async () => {
  await mount('/student/lesson/belajar-matematika-kelas-4-unit-5', 'student')
  assert.match(document.body.textContent, /Luas, keliling, dan sudut/)
  assert.match(document.body.textContent, /Draf materi orisinal/)
  assert.match(document.body.textContent, /Rujukan pendamping/)
  assert.match(document.body.textContent, /Contoh dan penalaran/)
  await clickText('Selesai membaca & mulai latihan')
  assert.equal(context.total_xp, 5)
  for (let i = 0; i < 5; i++) {
    const question = curriculumQuestions.find(
      (q) => q.id === document.querySelector('input[type=radio]').name,
    )
    assert.ok(question)
    await act(async () =>
      document.querySelectorAll('input[type=radio]')[question.correct_option].click(),
    )
    await clickText(i < 4 ? 'Selanjutnya' : 'Kumpulkan latihan')
  }
  assert.equal(context.attempts[0].score, 100)
  assert.equal(context.total_xp, 60)
  assert.equal(document.querySelectorAll('.review-explanation').length, 5)
  await mount('/student?subject=matematika&chapter=Bab+2', 'student')
  assert.equal(document.querySelectorAll('.lesson-card').length, 1)
  assert.match(document.body.textContent, /Operasi hitung dan masalah sehari-hari/)
})
test('Kode kelas → kiriman → nilai tutor → hadiah sekali', async () => {
  await mount('/student/classes', 'student')
  assert.throws(() => context.joinClass('SALAH1'), /belum ditemukan/)
  await act(async () => context.joinClass('ilmu03'))
  assert.match(document.body.textContent, /Perkalian di sekitarmu/)
  await act(async () =>
    context.submitAssignment('tugas-kebun', '3 piring berisi 2 pisang = 6 pisang.'),
  )
  assert.equal(context.total_xp, 0)
  await act(async () => context.enterDemo('tutor'))
  assert.throws(() => context.gradeSubmission(context.submissions[0].id, 101, 'Coba lagi'), /0–100/)
  await act(async () =>
    context.gradeSubmission(context.submissions[0].id, 90, 'Pengelompokanmu jelas.'),
  )
  assert.equal(context.total_xp, 15)
  await act(async () =>
    context.gradeSubmission(context.submissions[0].id, 95, 'Terima kasih sudah memperbaiki.'),
  )
  assert.equal(context.total_xp, 15)
  await act(async () => context.enterDemo('student'))
  assert.match(document.body.textContent, /Nilai 95\/100/)
  assert.throws(() => context.submitAssignment('tugas-kebun', 'Ubah jawaban'), /sudah dinilai/)
})
test('Filter dan perubahan kelas menampilkan materi sesuai tingkat', async () => {
  await mount('/student?subject=matematika', 'student')
  assert.equal(document.querySelectorAll('.lesson-card').length, 11)
  await act(async () => context.updateProfile({ grade: 6, display_name: 'Alya' }))
  assert.match(document.body.textContent, /Halo, Alya/)
  assert.match(document.querySelector('.lesson-card').textContent, /Persentase di kebun sekolah/)
  assert.throws(() => context.joinClass('ILMU03'), /kelas 3/)
})
test('Admin memvalidasi dan menyimpan batch impor lokal', async () => {
  await mount('/admin', 'admin')
  await act(async () =>
    document
      .querySelector('form')
      .dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })),
  )
  assert.match(document.body.textContent, /1\/1 soal valid/)
  await clickText('Simpan batch valid ke demo')
  assert.equal(context.importedQuestions.length, 1)
  assert.match(document.body.textContent, /1 soal tersimpan/)
})
test('Tugas tutor harus memiliki materi dengan tingkat yang sama', async () => {
  await mount('/tutor', 'tutor')
  let classroom
  await act(async () => {
    classroom = context.createClass('Klub Kelas 6', 6)
  })
  assert.match(classroom.join_code, /^[A-Z2-9]{6}$/)
  assert.throws(
    () =>
      context.createAssignment({
        class_id: classroom.id,
        lesson_id: 'matematika-3',
        title: 'Salah',
        instructions: 'Contoh',
        due_at: '2026-11-01T00:00:00Z',
      }),
    /tingkat yang sama/,
  )
  await act(async () =>
    context.createAssignment({
      class_id: classroom.id,
      lesson_id: 'matematika-6',
      title: 'Amati persentase',
      instructions: 'Cari contohnya.',
      due_at: '2026-11-01T00:00:00Z',
    }),
  )
  assert.match(document.body.textContent, /Amati persentase/)
})
