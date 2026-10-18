// Satu AudioContext, dibuat setelah gesture pengguna. Tidak memuat file/audio eksternal.
let context
let enabled = false
let lastPop = -Infinity
const lastMelody = {}
let unsupported = false
const listeners = new Set()
const melodies = {
  pop: [[480, 0, 0.07]],
  correct: [
    [660, 0, 0.13],
    [880, 0.12, 0.2],
  ],
  level: [
    [523, 0, 0.12],
    [659, 0.13, 0.12],
    [784, 0.26, 0.13],
    [1047, 0.4, 0.3],
  ],
}

export function soundState() {
  return { enabled, supported: !unsupported }
}
export function subscribeSound(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}
function publish() {
  listeners.forEach((listener) => listener(soundState()))
}

export async function setSoundEnabled(next) {
  if (!next) {
    enabled = false
    try {
      await context?.suspend?.()
    } catch {
      /* Tetap mute bila perangkat audio berubah. */
    }
    publish()
    return false
  }
  const Audio = globalThis.AudioContext || globalThis.webkitAudioContext
  if (!Audio) {
    unsupported = true
    enabled = false
    publish()
    return false
  }
  try {
    context ||= new Audio()
    if (context.state === 'suspended') await context.resume()
    enabled = context.state === 'running'
  } catch {
    enabled = false
  }
  publish()
  if (enabled) playSound('pop')
  return enabled
}

export function playSound(kind = 'pop') {
  if (
    !enabled ||
    !context ||
    context.state !== 'running' ||
    globalThis.document?.visibilityState === 'hidden'
  )
    return
  const now = context.currentTime
  if (kind === 'pop' && now - lastPop < 0.065) return
  if (kind === 'pop') lastPop = now
  if (kind !== 'pop' && lastMelody[kind] !== undefined && now - lastMelody[kind] < 0.2) return
  if (kind !== 'pop') lastMelody[kind] = now
  for (const [frequency, delay, duration] of melodies[kind] || melodies.pop) {
    const oscillator = context.createOscillator()
    const gain = context.createGain()
    const start = now + delay
    oscillator.type = kind === 'pop' ? 'sine' : 'triangle'
    oscillator.frequency.setValueAtTime(frequency, start)
    if (kind === 'pop') oscillator.frequency.exponentialRampToValueAtTime(240, start + duration)
    gain.gain.setValueAtTime(0.0001, start)
    gain.gain.exponentialRampToValueAtTime(0.065, start + 0.012)
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration)
    oscillator.connect(gain)
    gain.connect(context.destination)
    oscillator.onended = () => {
      oscillator.disconnect()
      gain.disconnect()
    }
    oscillator.start(start)
    oscillator.stop(start + duration + 0.02)
  }
}
