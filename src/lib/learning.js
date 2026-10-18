export function levelFromXp(xp) {
  const safeXp = Math.max(0, Math.floor(Number(xp) || 0))
  return { level: Math.floor(safeXp / 100) + 1, progress: safeXp % 100 }
}

export function shuffled(items, random = Math.random) {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function scoreDemoQuiz(quizQuestions, answers) {
  if (quizQuestions.length < 5 || quizQuestions.length > 10)
    throw new Error('Latihan harus berisi 5–10 soal.')
  const ids = new Set(quizQuestions.map((question) => question.id))
  if (ids.size !== quizQuestions.length) throw new Error('Soal latihan tidak boleh duplikat.')
  const details = quizQuestions.map((question) => {
    const selected = answers[question.id]
    if (!Number.isInteger(selected) || selected < 0 || selected >= question.options.length)
      throw new Error('Jawab semua soal sebelum mengumpulkan.')
    return {
      question_id: question.id,
      prompt: question.prompt,
      options: question.options,
      selected_option: selected,
      correct_option: question.correct_option,
      is_correct: selected === question.correct_option,
      explanation: question.explanation,
    }
  })
  const correct = details.filter((detail) => detail.is_correct).length
  return {
    score: Math.round((correct / details.length) * 100),
    correct_count: correct,
    total_questions: details.length,
    details,
  }
}

export function jakartaDate(value = new Date()) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Jakarta',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(value)
}

export function quizXp(result, previousAttempts, lessonId, date = new Date()) {
  const completedBefore = previousAttempts.some((attempt) => attempt.lesson_id === lessonId)
  if (!completedBefore) return result.correct_count * 10 + 5
  const remedialToday = previousAttempts.some(
    (attempt) =>
      attempt.reward_type === 'remedial' &&
      jakartaDate(new Date(attempt.created_at)) === jakartaDate(date),
  )
  return result.score < 60 && !remedialToday ? 3 : 0
}

export function safeImageUrl(value) {
  if (typeof value !== 'string') return null
  if (/^\/assets\/[a-zA-Z0-9_./-]+$/.test(value) && !value.includes('..')) return value
  try {
    const url = new URL(value)
    return url.protocol === 'https:' ? url.href : null
  } catch {
    return null
  }
}

export function youtubeEmbedUrl(value) {
  if (!value) return null
  try {
    const url = new URL(value)
    if (url.protocol !== 'https:') return null
    let id = null
    if (['youtube.com', 'www.youtube.com', 'www.youtube-nocookie.com'].includes(url.hostname)) {
      id = url.pathname.startsWith('/embed/')
        ? url.pathname.split('/')[2]
        : url.pathname === '/watch'
          ? url.searchParams.get('v')
          : null
    } else if (url.hostname === 'youtu.be') id = url.pathname.slice(1)
    return /^[a-zA-Z0-9_-]{11}$/.test(id || '')
      ? `https://www.youtube-nocookie.com/embed/${id}`
      : null
  } catch {
    return null
  }
}
