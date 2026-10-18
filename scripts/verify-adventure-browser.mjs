// Opsional: Playwright + Edge lokal. Tidak memerlukan perubahan dependensi produksi.
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { mkdir, writeFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { questions } from '../src/lib/dummyData.js'

const require = createRequire(import.meta.url)
const { chromium } = require(process.env.BROWSER_QA_MODULE || 'playwright')
const base = process.argv[2] || 'http://127.0.0.1:4173'
const date = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Jakarta',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
}).format(new Date())
const root = resolve('docs/qa/evidence')
await mkdir(root, { recursive: true })
const report = {
  date,
  browser: 'Microsoft Edge headless on Windows',
  base,
  androidHardwareTested: false,
  checks: [],
  pageErrors: [],
}
const browser = await chromium.launch({
  executablePath:
    process.env.BROWSER_QA_EXECUTABLE ||
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  headless: true,
})
console.log('Browser siap')
const context = await browser.newContext({ viewport: { width: 390, height: 844 } })
const page = await context.newPage()
page.setDefaultTimeout(20000)
page.on('pageerror', (error) => report.pageErrors.push(error.message))
await page.addInitScript(() => {
  window.__audioContexts = 0
  const Native = window.AudioContext
  if (Native)
    window.AudioContext = new Proxy(Native, {
      construct(target, args) {
        window.__audioContexts++
        return Reflect.construct(target, args)
      },
    })
})
const screenshot = (name) =>
  page.screenshot({ path: join(root, `${date}-clay-${name}.png`), animations: 'disabled' })
const snippet = async (selector, name) => {
  const target = page.locator(selector).first()
  await target.evaluate((element) => scrollBy(0, element.getBoundingClientRect().top - 15))
  await target.screenshot({ path: join(root, `${date}-clay-${name}.png`), animations: 'disabled' })
}
try {
  await page.goto(`${base}/login`, { waitUntil: 'domcontentloaded' })
  await page.getByRole('radio', { name: 'Piko si Pinguin Penjelajah' }).check()
  await page.getByRole('button', { name: 'Masuk ke demo siswa', exact: true }).click()
  await page.locator('.welcome-banner').waitFor()
  assert.equal(
    await page.locator('.profile-chip [data-character]').getAttribute('data-character'),
    'piko',
  )
  report.checks.push({ check: 'avatar-piko', pass: true })
  console.log('Login demo dan avatar Piko lulus')
  for (const width of [375, 390, 412, 1440]) {
    await page.setViewportSize({ width, height: 1000 })
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)
    assert.equal(overflow, false)
    report.checks.push({ check: 'responsive', width, overflow })
  }
  await page.evaluate(() => scrollTo(0, 0))
  await screenshot('dashboard-desktop')
  await snippet('.map-section', 'map-desktop')
  await page.setViewportSize({ width: 390, height: 1040 })
  await page.evaluate(() => scrollTo(0, 0))
  await screenshot('dashboard-mobile')
  await snippet('.map-section', 'map-mobile')
  await page.getByRole('button', { name: 'Jeda animasi', exact: true }).click()
  const states = await page
    .locator('.floating-decorations')
    .evaluateAll((nodes) => nodes.map((node) => node.dataset.motion))
  assert.ok(states.length > 0 && states.every((state) => state === 'off'))
  report.checks.push({ check: 'pause', states })
  await page.getByRole('button', { name: 'Lanjutkan animasi', exact: true }).click()
  assert.equal(await page.evaluate(() => window.__audioContexts), 0)
  await page.getByRole('button', { name: 'Nyalakan suara', exact: true }).click()
  await page.getByRole('button', { name: 'Matikan suara', exact: true }).waitFor()
  assert.equal(await page.evaluate(() => window.__audioContexts), 1)
  report.checks.push({ check: 'audio-opt-in', contextsBefore: 0, contextsAfter: 1 })
  await page.getByRole('button', { name: 'Matikan suara', exact: true }).click()
  console.log('Responsif, jeda dan audio opt-in lulus')

  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto(`${base}/student/lesson/matematika-kelas-3`, { waitUntil: 'domcontentloaded' })
  await page.locator('.comic-reader').waitFor()
  await snippet('.comic-reader', 'reader-mobile')
  await page.getByRole('button', { name: 'Adegan berikutnya', exact: true }).click()
  assert.equal(
    await page.locator('.comic-mentor [data-character]').getAttribute('data-character'),
    'kiki',
  )
  report.checks.push({ check: 'comic-next-scene', character: 'kiki' })
  await page.goto(`${base}/student/quiz/matematika-3`, { waitUntil: 'domcontentloaded' })
  await page.locator('.quiz-options').waitFor()
  await screenshot('quiz-mobile')
  for (let i = 0; i < 5; i++) {
    const id = await page.locator('.quiz-options input').first().getAttribute('name')
    const q = questions.find((question) => question.id === id)
    assert.ok(q)
    await page
      .locator('.quiz-option')
      .nth(i < 3 ? q.correct_option : (q.correct_option + 1) % 4)
      .click()
    await page
      .getByRole('button', { name: i === 4 ? 'Kumpulkan latihan' : 'Selanjutnya', exact: true })
      .click()
  }
  await page.locator('.result-hero').waitFor()
  assert.equal(await page.locator('.review-correct').count(), 3)
  assert.equal(await page.locator('.review-learn').count(), 2)
  assert.equal(
    await page.locator('.quiz-celebration [data-character]').getAttribute('data-character'),
    'momo',
  )
  report.checks.push({ check: 'graded-feedback', correct: 3, learning: 2, character: 'momo' })
  await screenshot('result-mobile')
  await page.getByRole('button', { name: 'Tos dengan Momo! ✋', exact: true }).first().click()
  assert.equal(await page.locator('.floating-xp').first().textContent(), '+10 XP')
  await snippet('.review-learn', 'feedback-mobile')
  assert.equal(
    await page
      .locator('.adventure-controls')
      .evaluate((element) => getComputedStyle(element).position),
    'static',
  )
  report.checks.push({ check: 'controls-in-header', pass: true })
  const resultUrl = page.url()
  const reduced = await browser.newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: 'reduce',
    storageState: await context.storageState(),
  })
  const reducedPage = await reduced.newPage()
  reducedPage.on('pageerror', (error) => report.pageErrors.push(error.message))
  await reducedPage.goto(resultUrl, { waitUntil: 'domcontentloaded' })
  await reducedPage.locator('.quiz-celebration').waitFor()
  assert.equal(await reducedPage.locator('.confetti-burst').count(), 0)
  assert.equal(
    await reducedPage
      .getByRole('button', { name: 'Animasi mengikuti pengaturan perangkat' })
      .isDisabled(),
    true,
  )
  report.checks.push({ check: 'reduced-motion', confetti: 0, toggleDisabled: true })
  await reduced.close()
  assert.deepEqual(report.pageErrors, [])
  report.passed = true
  console.log('Komik, hasil kuis, XP dan reduced motion lulus')
} catch (error) {
  report.passed = false
  report.error = error.message
  report.url = page.url()
  report.visibleText = (await page.locator('body').innerText()).slice(0, 700)
  console.error(error.message)
  process.exitCode = 1
} finally {
  await writeFile(
    join(root, `${date}-clay-browser-checks.json`),
    JSON.stringify(report, null, 2) + '\n',
  )
  await browser.close()
}
