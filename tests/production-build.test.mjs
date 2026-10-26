import test from 'node:test'
import assert from 'node:assert/strict'
import { build } from 'vite'
import { fileURLToPath } from 'node:url'
import { verifyProduction } from '../scripts/verify-production.mjs'

test(
  'Build Supabase tidak menyertakan modul dummyData atau DemoContext',
  { timeout: 60000 },
  async () => {
    let checked = false
    let cpLoadedSeparately = false
    await build({
      logLevel: 'error',
      build: {
        outDir: fileURLToPath(new URL('../.verification-build', import.meta.url)),
        emptyOutDir: false,
      },
      define: {
        'import.meta.env.VITE_APP_MODE': JSON.stringify('supabase'),
        'import.meta.env.VITE_SUPABASE_URL': JSON.stringify('https://offline-test.supabase.co'),
        'import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY': JSON.stringify(
          'sb_publishable_offline_compile_test',
        ),
      },
      plugins: [
        {
          name: 'verify-no-demo',
          generateBundle(_options, bundle) {
            for (const output of Object.values(bundle))
              if (output.type === 'chunk')
                for (const id of Object.keys(output.modules)) {
                  assert.doesNotMatch(id, /[/\\](dummyData\.js|demoCatalog\.js|DemoContext\.jsx)$/)
                  assert.doesNotMatch(id.replaceAll('\\', '/'), /\/src\/content\//)
                  assert.doesNotMatch(id.replaceAll('\\', '/'), /\/docs\/source\//)
                  if (id.replaceAll('\\', '/').endsWith('/content/cp-sd-2025.json')) {
                    assert.equal(
                      output.isDynamicEntry,
                      true,
                      'Rumusan CP harus dimuat melalui panel dinamis',
                    )
                    cpLoadedSeparately = true
                  }
                }
            checked = true
          },
        },
      ],
    })
    assert.equal(checked, true)
    assert.equal(cpLoadedSeparately, true)
    await verifyProduction('.verification-build')
  },
)
