// Bentuk tampilan bacaan di klien agar teks scenes tidak perlu disalin ke database.
// Blok hasil suntingan editor tetap diprioritaskan untuk materi format lama.
export function materialBlocks(content = {}) {
  if (Array.isArray(content.blocks) && content.blocks.length) return content.blocks
  if (!Array.isArray(content.scenes)) return []
  return content.scenes.flatMap((scene) => {
    if (scene?.type === 'dialog' && typeof scene.text === 'string')
      return [{ type: 'text', heading: scene.speaker || 'Cerita', body: scene.text }]
    if (scene?.type === 'comic_panel' && typeof scene.caption === 'string')
      return [{ type: 'text', heading: 'Bayangkan gambarnya', body: scene.caption }]
    if (
      scene?.type === 'mini_check' &&
      typeof scene.question === 'string' &&
      Array.isArray(scene.options)
    ) {
      const blocks = [
        {
          type: 'text',
          heading: 'Tebak cepat',
          body: `${scene.question}\n${scene.options.map((option, i) => `${i + 1}. ${option}`).join('\n')}`,
        },
      ]
      if (
        Number.isInteger(scene.correct_index) &&
        scene.correct_index >= 0 &&
        scene.correct_index < scene.options.length
      )
        blocks.push({
          type: 'text',
          heading: 'Pembahasan tebak cepat',
          body: `Jawaban: ${scene.options[scene.correct_index]}. ${scene.feedback || ''}`,
          collapsible: true,
        })
      return blocks
    }
    return []
  })
}
