// Validasi lokal Tahap 2. Penyimpanan ke database baru dibuat setelah kontrak backend disepakati.
function parseCsv(text) {
  const rows = []
  let row = []
  let field = ''
  let quoted = false
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i]
    if (char === '"') {
      if (quoted && text[i + 1] === '"') {
        field += '"'
        i += 1
      } else if (quoted || field === '') quoted = !quoted
      else throw new Error('Tanda kutip CSV tidak valid.')
    } else if (char === ',' && !quoted) {
      row.push(field)
      field = ''
    } else if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && text[i + 1] === '\n') i += 1
      row.push(field)
      if (row.some((value) => value.trim())) rows.push(row)
      row = []
      field = ''
    } else field += char
  }
  if (quoted) throw new Error('Tanda kutip CSV belum ditutup.')
  row.push(field)
  if (row.some((value) => value.trim())) rows.push(row)
  if (rows.length < 2) throw new Error('CSV harus memiliki header dan minimal satu soal.')
  const headers = rows.shift().map((value) => value.trim())
  const required = [
    'lesson_id',
    'prompt',
    'option_a',
    'option_b',
    'option_c',
    'option_d',
    'correct_option',
    'explanation',
  ]
  if (!required.every((key) => headers.includes(key)))
    throw new Error(`Header CSV: ${required.join(',')}`)
  return rows.map((values, index) => {
    if (values.length !== headers.length)
      throw new Error(`Baris ${index + 2}: jumlah kolom tidak sesuai header.`)
    const item = Object.fromEntries(headers.map((key, i) => [key, values[i]]))
    return {
      ...item,
      options: [item.option_a, item.option_b, item.option_c, item.option_d],
      correct_option: /^\d$/.test(item.correct_option.trim())
        ? Number(item.correct_option)
        : item.correct_option,
    }
  })
}

export function validateImport(text, format, lessonIds) {
  if (new TextEncoder().encode(text).length > 512_000)
    throw new Error('Ukuran contoh impor maksimal 500 KB.')
  let data
  try {
    data = format === 'csv' ? parseCsv(text.replace(/^\uFEFF/, '')) : JSON.parse(text)
  } catch (error) {
    throw new Error(
      format === 'csv' ? error.message : 'JSON tidak valid. Periksa koma dan tanda kutip.',
    )
  }
  if (!Array.isArray(data) || data.length < 1 || data.length > 200)
    throw new Error('Gunakan array berisi 1–200 soal per batch demo.')
  const errors = []
  const valid = []
  data.forEach((item, index) => {
    const prefix = `Soal ${index + 1}`
    if (!item || typeof item !== 'object' || Array.isArray(item)) {
      errors.push(`${prefix}: harus berupa objek.`)
      return
    }
    const issues = []
    if (!lessonIds.includes(item.lesson_id)) issues.push('lesson_id tidak dikenal')
    if (typeof item.prompt !== 'string' || !item.prompt.trim() || item.prompt.length > 2000)
      issues.push('pertanyaan wajib, maksimal 2.000 karakter')
    if (
      !Array.isArray(item.options) ||
      item.options.length !== 4 ||
      item.options.some(
        (option) => typeof option !== 'string' || !option.trim() || option.length > 500,
      ) ||
      new Set(
        item.options.map((option) =>
          typeof option === 'string' ? option.trim().toLowerCase() : option,
        ),
      ).size !== 4
    )
      issues.push('empat opsi teks berbeda wajib diisi')
    if (
      !Number.isInteger(item.correct_option) ||
      item.correct_option < 0 ||
      item.correct_option > 3
    )
      issues.push('correct_option harus bilangan bulat 0–3')
    if (
      typeof item.explanation !== 'string' ||
      !item.explanation.trim() ||
      item.explanation.length > 3000
    )
      issues.push('pembahasan wajib, maksimal 3.000 karakter')
    if (issues.length) errors.push(`${prefix}: ${issues.join('; ')}.`)
    else
      valid.push({
        lesson_id: item.lesson_id,
        prompt: item.prompt.trim(),
        options: item.options.map((option) => option.trim()),
        correct_option: item.correct_option,
        explanation: item.explanation.trim(),
        difficulty: ['dasar', 'sedang', 'lanjut'].includes(item.difficulty)
          ? item.difficulty
          : 'dasar',
      })
  })
  return { valid, errors, total: data.length }
}

export const jsonExample = JSON.stringify(
  [
    {
      lesson_id: 'matematika-3',
      prompt: '3 × 4 = …',
      options: ['7', '12', '16', '9'],
      correct_option: 1,
      explanation: '3 kelompok berisi 4 benda: 4 + 4 + 4 = 12.',
      difficulty: 'dasar',
    },
  ],
  null,
  2,
)
export const csvExample =
  'lesson_id,prompt,option_a,option_b,option_c,option_d,correct_option,explanation\nmatematika-3,3 × 4 = …,7,12,16,9,1,3 kelompok berisi 4 benda sama dengan 12.'
