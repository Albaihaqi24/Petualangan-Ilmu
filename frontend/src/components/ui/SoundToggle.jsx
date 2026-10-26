import { useEffect, useLayoutEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Pause, Play, Volume2, VolumeX } from 'lucide-react'
import { playSound, setSoundEnabled, soundState, subscribeSound } from '../../lib/adventureSound'
import { useAdventureMotion } from '../adventure/AdventureMotion'

export default function SoundToggle() {
  const [sound, setSound] = useState(soundState)
  const [slot, setSlot] = useState(null)
  const { paused, toggle, reduced } = useAdventureMotion()
  useLayoutEffect(() => {
    let current
    const sync = () => {
      const next = document.getElementById('adventure-controls-slot')
      if (next !== current) {
        current = next
        setSlot(next)
      }
    }
    sync()
    const observer = new window.MutationObserver(sync)
    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])
  useEffect(() => subscribeSound(setSound), [])
  useEffect(() => {
    const onClick = (event) => {
      if (
        event.target.closest?.('button:not([disabled]), a, .quiz-option, .avatar-options label') &&
        !event.target.closest?.('[data-sound-toggle]')
      )
        playSound('pop')
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
  const controls = (
    <div
      className={`adventure-controls ${slot ? 'controls-in-header' : 'controls-fallback'}`}
      aria-label="Suara dan gerakan"
    >
      <button
        type="button"
        className="sound-toggle"
        data-sound-toggle
        aria-pressed={sound.enabled}
        aria-label={sound.enabled ? 'Matikan suara' : 'Nyalakan suara'}
        disabled={!sound.supported}
        onClick={() => setSoundEnabled(!sound.enabled)}
        title={
          !sound.supported
            ? 'Suara tidak didukung browser ini'
            : sound.enabled
              ? 'Matikan suara'
              : 'Nyalakan suara'
        }
      >
        {sound.enabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
        <span>Suara {sound.enabled ? 'on' : 'off'}</span>
      </button>
      <button
        type="button"
        className="motion-toggle"
        aria-pressed={paused || reduced}
        disabled={reduced}
        aria-label={
          reduced
            ? 'Animasi mengikuti pengaturan perangkat'
            : paused
              ? 'Lanjutkan animasi'
              : 'Jeda animasi'
        }
        title={reduced ? 'Mengikuti pengaturan kurangi gerakan perangkat' : 'Atur animasi'}
        onClick={toggle}
      >
        {paused || reduced ? <Play size={16} /> : <Pause size={16} />}
        <span className="sr-only">Animasi</span>
      </button>
    </div>
  )
  return slot ? createPortal(controls, slot) : controls
}
