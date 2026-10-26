import { useState } from 'react'
import { m } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, Sparkles } from 'lucide-react'
import CharacterAvatar from './CharacterAvatar'
import { useAdventureMotion } from './AdventureMotion'
import ConfettiBurst from '../ui/ConfettiBurst'
import { characterNames } from '../../lib/islandThemes'
import { playSound } from '../../lib/adventureSound'
import FloatingDecorations from '../ui/FloatingDecorations'

function StoryText({ text, enabled }) {
  const words = String(text || '').split(' ')
  return (
    <p className="comic-dialog-text">
      {words.slice(0, 18).map((word, i) => (
        <m.span
          key={i}
          initial={enabled ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ delay: enabled ? i * 0.018 : 0, duration: 0.16 }}
        >
          {word}{' '}
        </m.span>
      ))}
      {words.slice(18).join(' ')}
    </p>
  )
}

export default function ComicStoryReader({ scenes = [], character = 'rubi', compact = false }) {
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const { enabled } = useAdventureMotion()
  if (!scenes.length) return null
  const current = scenes[Math.min(index, scenes.length - 1)]
  const activeCharacter = current.character || character
  const selected = answers[index]
  const mini = current.type === 'mini_check'
  const checked = mini && selected !== undefined
  const correct = checked && selected === current.correct_index
  const emotion = checked
    ? correct
      ? 'senang'
      : 'semangat'
    : current.emotion || (mini ? 'berpikir' : 'senang')
  const go = (next) => setIndex(Math.max(0, Math.min(next, scenes.length - 1)))
  return (
    <section
      className={`comic-reader ${compact ? 'comic-reader-compact' : ''}`}
      data-island={character === 'bobo' ? 'kata' : character === 'tobi' ? 'eksplora' : 'numeria'}
      aria-label="Cerita petualangan interaktif"
    >
      <FloatingDecorations
        theme={character === 'bobo' ? 'kata' : character === 'tobi' ? 'eksplora' : 'numeria'}
      />
      <div className="comic-reader-heading">
        <span className="tag">
          <Sparkles size={14} /> CERITA PETUALANGAN
        </span>
        <span className="small">
          Adegan {index + 1} / {scenes.length}
        </span>
      </div>
      <div className="comic-stage">
        <m.div
          className="comic-mentor"
          key={`character-${index}-${selected ?? ''}`}
          initial={enabled ? { scale: 0.9, y: 5 } : false}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 13 }}
        >
          <CharacterAvatar
            character={activeCharacter}
            emotion={emotion}
            size={compact ? 112 : 160}
          />
          <span className="mentor-name">
            {characterNames[activeCharacter] || characterNames.rubi}
          </span>
          {correct && <ConfettiBurst burstKey={`${index}-${selected}`} />}
        </m.div>
        <m.div
          key={`scene-${index}`}
          className={`comic-speech ${mini ? 'comic-speech-check' : ''}`}
          initial={enabled ? { opacity: 0, y: 8 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22 }}
        >
          {current.type === 'comic_panel' ? (
            <>
              <div className="comic-concept-art" aria-hidden="true">
                <svg viewBox="0 0 200 65">
                  {character === 'tobi' ? (
                    <>
                      <circle cx="40" cy="25" r="16" fill="#ffd475" />
                      <path
                        d="M40 2V5M17 25H20M60 25H64M24 9L27 12"
                        stroke="#e4b75e"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      <path
                        d="M101 55V28M101 39Q76 40 80 17Q102 17 101 39ZM103 45Q127 43 127 24Q105 23 103 45Z"
                        fill="#8bd1a4"
                        stroke="#6b9a7c"
                        strokeWidth="3"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M163 13Q145 36 151 45Q163 59 175 45Q181 36 163 13Z"
                        fill="#a9ddef"
                        stroke="#7fb6cd"
                        strokeWidth="3"
                      />
                    </>
                  ) : character === 'bobo' ? (
                    <>
                      <path
                        d="M20 14Q45 7 69 20Q93 7 118 14V53Q92 46 69 59Q45 46 20 53Z"
                        fill="#d8ceff"
                        stroke="#9e8abd"
                        strokeWidth="3"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M69 20V57M31 24L53 29M84 29L106 24M31 34L53 39"
                        stroke="#a38cbf"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      <circle
                        cx="156"
                        cy="28"
                        r="18"
                        fill="#d2ecff"
                        stroke="#87b5d7"
                        strokeWidth="4"
                      />
                      <path
                        d="M169 42L183 56"
                        stroke="#ac98cb"
                        strokeWidth="8"
                        strokeLinecap="round"
                      />
                    </>
                  ) : (
                    <>
                      <rect x="12" y="12" width="48" height="42" rx="13" fill="#ffdb8b" />
                      <path
                        d="M28 33H44M36 25V41M77 32H113M104 24L113 32L104 40"
                        stroke="#6e648c"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                      <circle cx="155" cy="33" r="23" fill="#c6d2fc" />
                      <path
                        d="M144 33L152 41L167 25"
                        stroke="#6e648c"
                        strokeWidth="4"
                        strokeLinecap="round"
                        fill="none"
                      />
                    </>
                  )}
                </svg>
              </div>
              <StoryText text={current.caption} enabled={enabled} />
            </>
          ) : mini ? (
            <>
              <p className="comic-check-label">Tebak cepat · tanpa tambahan XP</p>
              <h3>{current.question}</h3>
              <div className="comic-check-options" role="group" aria-label="Pilihan tebak cepat">
                {current.options.map((option, i) => (
                  <m.button
                    type="button"
                    key={i}
                    aria-pressed={selected === i}
                    className={`comic-choice ${selected === i ? (correct ? 'is-correct' : 'is-learning') : ''}`}
                    animate={
                      enabled && checked && selected === i && !correct
                        ? { x: [-6, 6, -4, 4, 0] }
                        : { x: 0 }
                    }
                    transition={{ duration: 0.35 }}
                    onClick={() => {
                      setAnswers((value) => ({ ...value, [index]: i }))
                      if (i === current.correct_index) playSound('correct')
                    }}
                  >
                    <span>{'ABC'[i]}</span>
                    {option}
                    {selected === i && correct && <Check size={17} />}
                  </m.button>
                ))}
              </div>
              {checked && (
                <div className={`comic-feedback ${correct ? 'correct' : ''}`} role="status">
                  <strong>
                    {correct
                      ? 'Tepat! Hebat, detektif kecil! ✨'
                      : 'Hampir tepat! Yuk lihat rahasianya…'}
                  </strong>
                  <p>
                    {correct
                      ? current.feedback
                      : `Jawaban yang sesuai: ${current.options[current.correct_index]}. ${String(current.feedback || '').replace(/^(?:Hebat[^!]*!|Tepat!|Bagus!)\s*/u, '')}`}
                  </p>
                </div>
              )}
            </>
          ) : (
            <>
              <p className="comic-speaker">{current.speaker || characterNames[character]}</p>
              <StoryText text={current.text} enabled={enabled} />
            </>
          )}
        </m.div>
      </div>
      {scenes.length > 1 && (
        <nav className="comic-navigation" aria-label="Navigasi adegan">
          <button
            type="button"
            className="comic-nav-button"
            aria-label="Adegan sebelumnya"
            disabled={index === 0}
            onClick={() => go(index - 1)}
          >
            <ArrowLeft size={18} />
          </button>
          <div className="comic-dots">
            {scenes.map((_, i) => (
              <button
                type="button"
                key={i}
                aria-label={`Buka adegan ${i + 1}`}
                aria-current={i === index ? 'step' : undefined}
                onClick={() => go(i)}
              />
            ))}
          </div>
          <button
            type="button"
            className="comic-nav-button"
            aria-label="Adegan berikutnya"
            disabled={index === scenes.length - 1}
            onClick={() => go(index + 1)}
          >
            <ArrowRight size={18} />
          </button>
        </nav>
      )}
    </section>
  )
}
