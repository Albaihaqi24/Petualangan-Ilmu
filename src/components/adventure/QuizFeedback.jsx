import { useEffect, useState } from 'react'
import { m } from 'framer-motion'
import CharacterAvatar from './CharacterAvatar'
import { useAdventureMotion } from './AdventureMotion'
import ConfettiBurst from '../ui/ConfettiBurst'
import { playSound } from '../../lib/adventureSound'

export function QuizCelebration({ attempt }) {
  const passed = attempt.score >= 60
  const { enabled } = useAdventureMotion()
  useEffect(() => {
    if (passed) playSound('correct')
  }, [passed])
  return (
    <div className="quiz-celebration">
      {passed && <ConfettiBurst burstKey={attempt.id} />}
      <m.div
        initial={enabled ? { scale: 0.9, y: 8 } : false}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 12 }}
      >
        <CharacterAvatar
          character={passed ? 'momo' : 'kiki'}
          emotion={passed ? 'senang' : 'semangat'}
          size={140}
        />
      </m.div>
      <span className="celebration-sticker">
        {passed ? 'Momo bangga padamu!' : 'Kiki menemanimu mencoba lagi!'}
      </span>
    </div>
  )
}

// Hanya dipakai pada hasil yang sudah dinilai. Tidak membaca/membuka kunci kuis aktif.
export function AnswerReaction({ detail, rewarded = false }) {
  const [cheer, setCheer] = useState(false)
  const { enabled } = useAdventureMotion()
  const correct = detail.is_correct
  return (
    <div className={`answer-reaction ${correct ? 'reaction-correct' : 'reaction-learning'}`}>
      <m.div
        className="reaction-character"
        key={String(cheer)}
        initial={false}
        animate={enabled && cheer ? { y: [0, -14, 0], rotate: [0, -6, 6, 0] } : { y: 0 }}
        transition={{ duration: 0.55 }}
      >
        <CharacterAvatar
          character={correct ? 'momo' : 'kiki'}
          emotion={correct ? 'senang' : 'semangat'}
          size={66}
          idle={false}
          decorative
        />
        {cheer && correct && <ConfettiBurst />}
        {cheer && correct && (
          <m.span
            aria-hidden="true"
            className="floating-xp"
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: enabled ? -40 : 0, opacity: enabled ? 0 : 1 }}
            transition={{ duration: 1.5 }}
          >
            {rewarded ? '+10 XP' : 'Hebat! ✦'}
          </m.span>
        )}
      </m.div>
      <div>
        <strong>
          {correct ? 'Tepat! Kamu menemukan jawabannya!' : 'Hampir tepat! Yuk lihat rahasianya…'}
        </strong>
        <p>
          {correct
            ? 'Perhatikan langkahnya supaya kamu makin paham.'
            : 'Belum tepat itu bagian dari belajar. Baca pembahasan di bawah, ya.'}
        </p>
        {correct && (
          <button
            className="reaction-cheer"
            type="button"
            disabled={cheer}
            onClick={() => {
              setCheer(true)
              playSound('correct')
            }}
          >
            {cheer ? 'Sudah dirayakan! ✨' : 'Tos dengan Momo! ✋'}
          </button>
        )}
      </div>
    </div>
  )
}
