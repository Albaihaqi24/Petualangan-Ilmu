// Bentuk ringkas untuk naskah yang ditulis per topik, bukan pembuat soal dari definisi.
export const section = (heading, body, example) => ({ heading, body, example })
export const practice = (prompt, answer, reason) => ({ prompt, answer, reason })
export const question = (prompt, answer, wrong, explanation, skill = 'penerapan') => ({
  prompt,
  answer: String(answer),
  wrong: wrong.map(String),
  explanation,
  skill,
})
export const numberQuestion = (prompt, answer, wrong, explanation) =>
  question(prompt, answer, wrong, explanation)
