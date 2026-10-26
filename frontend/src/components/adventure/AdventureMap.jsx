import { Link } from 'react-router-dom'
import { Flag, Sparkles } from 'lucide-react'
import { m } from 'framer-motion'
import { useLearning } from '../../context/LearningContext'
import { SubjectIcon } from '../ui/Primitives'
import CharacterAvatar from './CharacterAvatar'
import FloatingDecorations from '../ui/FloatingDecorations'
import { useAdventureMotion } from './AdventureMotion'
import { islandTheme, characterNames } from '../../lib/islandThemes'

function IslandArt({ type, color }) {
  return (
    <svg viewBox="0 0 200 130" className={`island-art island-${color}`} aria-hidden="true">
      <ellipse cx="100" cy="111" rx="77" ry="12" fill="#bddbd2" opacity=".35" />
      <path
        d="M24 80Q22 65 48 60L66 43Q82 36 98 42L122 35Q144 33 151 53L174 66Q191 77 175 91L145 105L66 104L33 93Z"
        fill="var(--island-side)"
      />
      <path
        d="M24 71Q22 56 48 51L66 34Q82 27 98 33L122 26Q144 24 151 44L174 57Q191 68 175 82L145 96L66 95L33 84Z"
        fill="var(--island-top)"
        stroke="var(--island-edge)"
        strokeWidth="2"
      />
      {type === 'calculator' ? (
        <>
          <path d="M63 62L92 15L121 62Z" fill="#56988b" />
          <path d="M78 38L92 15L106 38L95 33L88 41Z" fill="#f5faf2" />
          <path d="M105 68L130 30L155 68Z" fill="#8ebd9e" />
          <path d="M120 46L130 30L141 46L130 41Z" fill="#fffbed" />
          <rect x="65" y="61" width="34" height="24" rx="4" fill="#fcf4d9" />
          <path d="M73 73H91M82 65V81" stroke="#478778" strokeWidth="3" />
        </>
      ) : type === 'book' ? (
        <>
          <rect x="75" y="23" width="48" height="57" rx="8" fill="#d88465" />
          <path d="M75 30H67V84H114" stroke="#fff3cf" strokeWidth="7" fill="none" />
          <path d="M86 39H112M86 48H107M86 58H111" stroke="#ffedcf" strokeWidth="3" />
          <circle cx="136" cy="51" r="17" fill="#ecb98d" />
          <rect x="133" y="56" width="5" height="30" rx="2" fill="#8c7256" />
        </>
      ) : type === 'leaf' ? (
        <>
          <rect x="95" y="42" width="8" height="43" rx="3" fill="#9e8454" />
          <path d="M97 57Q59 57 70 22Q102 19 104 51Z" fill="#77a85e" />
          <path d="M102 61Q134 57 137 30Q105 25 102 61Z" fill="#a0bd68" />
          <circle cx="59" cy="77" r="9" fill="#e5be67" />
          <circle cx="145" cy="80" r="7" fill="#f1b181" />
        </>
      ) : type === 'heart' ? (
        <>
          <path d="M70 57L98 28L129 57V85H70Z" fill="#f7e4d0" />
          <path
            d="M62 57L98 22L137 57"
            fill="none"
            stroke="#c67e7a"
            strokeWidth="10"
            strokeLinejoin="round"
          />
          <rect x="91" y="63" width="15" height="22" rx="3" fill="#bd7978" />
          <path d="M141 71C129 62 133 49 141 53C150 45 159 59 141 71Z" fill="#c77b7d" />
        </>
      ) : type === 'globe' ? (
        <>
          <circle cx="100" cy="46" r="28" fill="#75a7bd" />
          <path
            d="M82 27L93 35L88 44L99 52L94 69M112 23L106 35L120 43L115 54L124 61"
            fill="none"
            stroke="#b6d3a0"
            strokeWidth="9"
          />
          <path d="M80 76H121M100 73V85" stroke="#4f7c94" strokeWidth="5" />
          <circle cx="146" cy="72" r="8" fill="#f6d27a" />
        </>
      ) : (
        <>
          <path d="M79 70L96 22L119 72Z" fill="#b39cc6" />
          <path d="M89 44L96 22L106 44Z" fill="#f5deaa" />
          <path d="M114 75L136 34L151 47L129 84Z" fill="#e4ad91" />
          <path d="M136 34L147 19L159 30L151 47Z" fill="#8e7ba7" />
          <circle cx="65" cy="79" r="8" fill="#f1cf78" />
        </>
      )}
      <path
        d="M47 81L54 70L61 81M153 88L159 78L165 88"
        fill="none"
        stroke="#6a9b73"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function AdventureMap({ grade = 3, completed = [], compact = false, publicMode = false }) {
  const { subjects, lessons } = useLearning()
  const { enabled } = useAdventureMotion()
  return (
    <div className={`adventure-map ${compact ? 'map-compact' : ''}`}>
      <FloatingDecorations clouds />
      <div className="map-label">
        <span className="row gap-sm">
          <Flag size={14} /> PETA PETUALANGANMU
        </span>
        <span className="map-coordinate">
          {subjects.length} pulau · kelas {grade}
        </span>
      </div>
      <svg
        className="map-route"
        viewBox="0 0 900 600"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M150 170C300 35 370 340 470 170S790 90 750 310S400 540 170 410"
          fill="none"
          stroke="#b8cfc4"
          strokeWidth="3"
          strokeDasharray="7 10"
        />
      </svg>
      <div className="map-islands">
        {subjects.map((subject, index) => {
          const theme = islandTheme(subject.slug)
          const done = lessons.some(
            (l) => l.subject_id === subject.id && l.grade === grade && completed.includes(l.id),
          )
          return (
            <Link
              key={subject.id}
              className={`island-node node-${index} island-clay-${theme.id} ${done ? 'island-done' : ''}`}
              to={publicMode ? `/jelajah/${subject.slug}` : `/student?subject=${subject.id}#materi`}
            >
              <m.div
                className="island-floating-art"
                initial={false}
                animate={enabled ? { y: [0, -8, 0] } : { y: 0 }}
                transition={{
                  duration: 3.2 + index * 0.15,
                  delay: index * 0.13,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <span className={`island-halo bg-linear-to-br ${theme.gradient}`} />
                <IslandArt type={subject.icon} color={subject.color} />
                {theme.id !== 'adventure' && (
                  <CharacterAvatar
                    character={theme.character}
                    size={72}
                    className="island-mentor"
                    decorative
                    idle={false}
                  />
                )}
              </m.div>
              <span className="island-name">
                {theme.name || subject.island}
                {done && <span aria-label="Materi selesai"> ✓</span>}
              </span>
              {theme.id !== 'adventure' && (
                <span className="island-mentor-label">
                  Bersama {characterNames[theme.character]}
                </span>
              )}
              <span className="island-subject">
                <SubjectIcon name={subject.icon} size={13} />
                {subject.name}
              </span>
            </Link>
          )
        })}
      </div>
      <m.div
        className="map-boat"
        aria-hidden="true"
        initial={false}
        animate={
          enabled
            ? { x: [0, 26, 0], y: [0, -5, 0], rotate: [-3, 3, -3] }
            : { x: 0, y: 0, rotate: 0 }
        }
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg viewBox="0 0 65 55" width="54">
          <path d="M8 37H57L48 49H19Z" fill="#d8b1fb" stroke="#75618f" strokeWidth="2.5" />
          <path
            d="M31 6V36M35 8L52 29H35ZM27 14L13 30H27Z"
            fill="#fff8df"
            stroke="#75618f"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </svg>
      </m.div>
      <span className="map-sparkle sparkle-a">
        <Sparkles size={20} />
      </span>
      <span className="map-sparkle sparkle-b">✦</span>
      <div className="map-key">
        <CharacterAvatar character="piko" size={48} decorative idle={false} />
        <span className="map-key-copy">
          <strong>Piko siap memandu!</strong>Pilih pulau untuk mulai belajar
        </span>
      </div>
    </div>
  )
}
