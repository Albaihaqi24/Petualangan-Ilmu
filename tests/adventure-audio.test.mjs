import assert from 'node:assert/strict'
import test from 'node:test'
import {
  playSound,
  setSoundEnabled,
  soundState,
  subscribeSound,
} from '../src/lib/adventureSound.js'

test('Web Audio opt-in: satu context, nada terbatas, mute dan fallback tanpa dukungan audio', async (t) => {
  const previous = globalThis.AudioContext
  const calls = { contexts: 0, resumes: 0, suspended: 0, notes: [], disconnected: 0 }
  class FakeAudio {
    constructor() {
      calls.contexts++
      this.currentTime = 1
      this.state = 'suspended'
      this.destination = {}
      FakeAudio.last = this
    }
    async resume() {
      calls.resumes++
      this.state = 'running'
    }
    async suspend() {
      calls.suspended++
      this.state = 'suspended'
    }
    createOscillator() {
      const note = { values: [] }
      calls.notes.push(note)
      return {
        frequency: {
          setValueAtTime: (v) => note.values.push(v),
          exponentialRampToValueAtTime: (v) => note.values.push(v),
        },
        connect() {},
        disconnect() {
          calls.disconnected++
        },
        start(time) {
          note.start = time
        },
        stop(time) {
          note.stop = time
          this.onended?.()
        },
      }
    }
    createGain() {
      return {
        gain: { setValueAtTime() {}, exponentialRampToValueAtTime() {} },
        connect() {},
        disconnect() {
          calls.disconnected++
        },
      }
    }
  }
  globalThis.AudioContext = FakeAudio
  t.after(async () => {
    await setSoundEnabled(false)
    globalThis.AudioContext = previous
  })
  const states = []
  const unsubscribe = subscribeSound((state) => states.push(state.enabled))
  assert.equal(soundState().enabled, false)
  playSound('correct')
  assert.equal(calls.contexts, 0, 'Tidak membuka audio sebelum pengguna mengaktifkannya')
  assert.equal(await setSoundEnabled(true), true)
  assert.equal(calls.contexts, 1)
  assert.equal(calls.resumes, 1)
  assert.equal(calls.notes.length, 1)
  playSound('correct')
  assert.equal(calls.notes.length, 3, 'Nada benar terdiri dari dua nada')
  playSound('level')
  assert.equal(calls.notes.length, 7, 'Fanfare terdiri dari empat nada')
  playSound('level')
  playSound('pop')
  assert.equal(calls.notes.length, 7, 'Mencegah suara ganda pada frame yang sama')
  FakeAudio.last.currentTime = 2
  playSound('pop')
  assert.equal(calls.notes.length, 8)
  assert.ok(calls.notes.every((n) => n.stop > n.start && n.stop - n.start < 0.4))
  assert.equal(calls.disconnected, 16)
  await setSoundEnabled(false)
  playSound('correct')
  assert.equal(calls.notes.length, 8)
  assert.equal(calls.suspended, 1)
  assert.deepEqual(states, [true, false])
  unsubscribe()
  globalThis.AudioContext = undefined
  assert.equal(await setSoundEnabled(true), false)
  assert.equal(soundState().supported, false)
})
