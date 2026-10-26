import { memo } from 'react'
import { m } from 'framer-motion'
import { characterNames } from '../../lib/islandThemes'
import { useAdventureMotion } from './AdventureMotion'

const ink = '#34304c'
const colors = {
  rubi: '#ff985f',
  bobo: '#aa94e8',
  tobi: '#6fd0a6',
  kiki: '#f7c3db',
  momo: '#faf7ee',
  piko: '#79baf4',
}

function Face({ emotion, enabled, character }) {
  return (
    <>
      <ellipse cx="68" cy="103" rx="10" ry="6" fill="#ff8e9c" opacity=".55" />
      <ellipse cx="132" cy="103" rx="10" ry="6" fill="#ff8e9c" opacity=".55" />
      <m.g
        style={{ transformOrigin: '100px 88px' }}
        animate={enabled ? { scaleY: [1, 1, 0.06, 1] } : { scaleY: 1 }}
        transition={{ duration: 4, times: [0, 0.94, 0.97, 1], repeat: Infinity }}
      >
        {emotion === 'senang' || emotion === 'semangat' ? (
          <g fill="none" stroke={ink} strokeWidth="4.5" strokeLinecap="round">
            <path d="M76 91Q83 80 90 91M110 91Q117 80 124 91" />
            {emotion === 'semangat' && <path d="M75 76L89 80M111 80L125 76" strokeWidth="3" />}
          </g>
        ) : (
          <g fill={ink}>
            <ellipse
              cx="83"
              cy="88"
              rx={emotion === 'kaget' ? 7 : 5}
              ry={emotion === 'kaget' ? 9 : 7}
            />
            <ellipse
              cx="117"
              cy="88"
              rx={emotion === 'kaget' ? 7 : 5}
              ry={emotion === 'kaget' ? 9 : 7}
            />
            <circle cx="85" cy="85" r="2" fill="white" />
            <circle cx="119" cy="85" r="2" fill="white" />
            {emotion === 'berpikir' && (
              <path
                d="M75 73Q84 67 91 73"
                fill="none"
                stroke={ink}
                strokeWidth="3"
                strokeLinecap="round"
              />
            )}
          </g>
        )}
      </m.g>
      {character === 'bobo' || character === 'piko' ? (
        <path
          d="M94 98L106 98L100 106Z"
          fill="#ffbe55"
          stroke={ink}
          strokeWidth="2"
          strokeLinejoin="round"
        />
      ) : (
        <ellipse cx="100" cy="100" rx="5" ry="3.5" fill={ink} />
      )}
      {emotion === 'kaget' ? (
        <ellipse cx="100" cy="114" rx="6" ry="7" fill="#bd617b" stroke={ink} strokeWidth="2.5" />
      ) : emotion === 'berpikir' ? (
        <path d="M96 113L105 111" stroke={ink} strokeWidth="3" strokeLinecap="round" />
      ) : (
        <path
          d="M89 111Q100 127 111 111"
          fill={emotion === 'semangat' ? '#f695a5' : 'none'}
          stroke={ink}
          strokeWidth="3"
          strokeLinecap="round"
        />
      )}
    </>
  )
}

function CharacterArt({ character, color }) {
  return (
    <g stroke={ink} strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round">
      {character === 'rubi' && <path d="M139 172Q190 188 176 128Q150 130 143 148" fill="#ff985f" />}
      {character === 'rubi' && (
        <path d="M176 128Q179 151 169 159L153 144Q160 131 176 128Z" fill="#fff5d9" />
      )}
      {character === 'kiki' && (
        <>
          <ellipse cx="76" cy="37" rx="15" ry="31" fill={color} transform="rotate(-13 76 37)" />
          <ellipse cx="124" cy="37" rx="15" ry="31" fill={color} transform="rotate(13 124 37)" />
          <path d="M76 21L79 49M124 21L121 49" stroke="#e995b6" strokeWidth="7" />
        </>
      )}
      {character === 'momo' && (
        <>
          <circle cx="65" cy="51" r="19" fill={ink} />
          <circle cx="135" cy="51" r="19" fill={ink} />
        </>
      )}
      <ellipse cx="77" cy="197" rx="22" ry="10" fill={character === 'piko' ? '#ffc660' : color} />
      <ellipse cx="123" cy="197" rx="22" ry="10" fill={character === 'piko' ? '#ffc660' : color} />
      <path
        d="M63 152Q49 186 76 197H125Q151 185 137 152Q100 125 63 152Z"
        fill={character === 'piko' ? '#547eac' : color}
      />
      <ellipse
        cx="100"
        cy="173"
        rx="27"
        ry="25"
        fill={character === 'bobo' ? '#e7dcff' : '#fff8e8'}
        stroke="none"
      />
      <path
        d="M64 151Q37 155 46 178Q57 185 70 170M136 151Q164 155 154 178Q143 185 130 170"
        fill={color}
      />
      {character === 'tobi' && (
        <>
          <path d="M69 148L91 157L100 191L108 157L131 148L141 190H59Z" fill="white" />
          <path
            d="M73 155L86 170L80 180M127 155L114 170L120 180"
            fill="none"
            stroke="#bfdee0"
            strokeWidth="3"
          />
          <circle cx="105" cy="178" r="2" fill={ink} stroke="none" />
        </>
      )}
      {character === 'rubi' ? (
        <path
          d="M53 70L47 30L81 48Q100 41 119 48L153 30L147 70Q161 106 133 123Q100 142 67 123Q39 106 53 70Z"
          fill={color}
        />
      ) : character === 'piko' ? (
        <path d="M55 92Q52 40 100 39Q148 40 145 92L142 117Q100 149 58 117Z" fill="#547eac" />
      ) : (
        <ellipse cx="100" cy="88" rx="49" ry="44" fill={color} />
      )}
      {character === 'rubi' && (
        <>
          <path d="M57 52L61 72L76 59M143 52L139 72L124 59" fill="#ffc0a0" stroke="none" />
          <path
            d="M56 92Q78 98 100 99Q122 98 144 92Q141 126 100 131Q59 126 56 92"
            fill="#fff5dc"
            stroke="none"
          />
        </>
      )}
      {character === 'piko' && (
        <path
          d="M62 86Q67 64 88 73L100 86L112 73Q133 64 138 86L137 118Q100 139 63 118Z"
          fill="#f5fbff"
          stroke="none"
        />
      )}
      {character === 'bobo' && (
        <>
          <path d="M54 79L56 48L77 58M146 79L144 48L123 58" fill={color} />
          <ellipse cx="79" cy="89" rx="21" ry="24" fill="#fff8df" stroke="none" />
          <ellipse cx="121" cy="89" rx="21" ry="24" fill="#fff8df" stroke="none" />
        </>
      )}
      {character === 'momo' && (
        <>
          <ellipse
            cx="80"
            cy="88"
            rx="15"
            ry="19"
            fill="#cbd0dd"
            stroke="none"
            transform="rotate(20 80 88)"
          />
          <ellipse
            cx="120"
            cy="88"
            rx="15"
            ry="19"
            fill="#cbd0dd"
            stroke="none"
            transform="rotate(-20 120 88)"
          />
        </>
      )}
      <path d="M64 70Q69 58 80 57" stroke="white" opacity=".55" strokeWidth="5" fill="none" />
      {character === 'rubi' && (
        <>
          <path d="M64 45L64 29Q100 12 136 29V45Z" fill="#f4fbff" />
          <path d="M61 45H139L129 54H71Z" fill="#568eae" />
          <path
            d="M100 24L103 31L111 32L105 37L106 44L100 40L94 44L95 37L89 32L97 31Z"
            fill="#ffc65c"
            strokeWidth="2"
          />
          <path d="M73 144H127L118 158H82Z" fill="#5da0b5" />
        </>
      )}
      {character === 'bobo' && (
        <>
          <path d="M68 49L79 24L110 24L134 49Z" fill="#b5a0db" />
          <path d="M59 51Q100 38 143 51" fill="none" strokeWidth="8" />
          <path d="M82 28L111 46" stroke="#75628f" strokeWidth="3" />
          <path
            d="M73 161Q87 156 100 165Q113 156 127 161V187Q112 183 100 191Q88 183 73 187Z"
            fill="#91c7f5"
          />
          <path
            d="M100 166V189M79 169H92M108 169H121"
            fill="none"
            stroke="#527da2"
            strokeWidth="2"
          />
        </>
      )}
      {character === 'tobi' && (
        <>
          <path d="M59 72H141" stroke="#438a79" strokeWidth="4" />
          <rect x="65" y="74" width="29" height="24" rx="10" fill="#e4fff5" fillOpacity=".35" />
          <rect x="106" y="74" width="29" height="24" rx="10" fill="#e4fff5" fillOpacity=".35" />
          <path d="M94 83H106" fill="none" />
          <path d="M146 166L157 183" stroke="#f0b453" strokeWidth="8" />
          <circle
            cx="140"
            cy="154"
            r="16"
            fill="#caf3ff"
            fillOpacity=".7"
            stroke="#e3a853"
            strokeWidth="6"
          />
        </>
      )}
      {character === 'kiki' && (
        <>
          <path d="M59 64Q100 48 141 64" fill="none" stroke="#e28aa5" strokeWidth="8" />
          <path d="M65 60L77 50L82 64" fill="#fff5f9" strokeWidth="2" />
          <path d="M83 146L100 155L117 146L111 166H89Z" fill="#ba8ad8" />
          <path d="M45 154L32 146M43 166L27 166" stroke="#d99ab6" strokeWidth="3" />
        </>
      )}
      {character === 'momo' && (
        <>
          <path d="M78 142L100 150L122 142L117 160H83Z" fill="#ffbf67" />
          <path
            d="M100 163L104 172L114 173L107 180L109 190L100 185L91 190L93 180L86 173L96 172Z"
            fill="#ffc658"
            strokeWidth="2"
          />
        </>
      )}
      {character === 'piko' && (
        <>
          <path d="M62 58Q100 27 138 58" fill="#e9c28e" />
          <path d="M56 62Q100 52 144 62" fill="none" stroke="#e9c28e" strokeWidth="10" />
          <path d="M77 137L100 146L123 137L117 157H83Z" fill="#ffb767" />
          <path d="M119 152L132 170L120 174L111 155" fill="#ffb767" />
          <rect x="68" y="164" width="24" height="23" rx="6" fill="#a7ddd0" />
          <path d="M74 173L81 178L87 170" fill="none" stroke="#498779" strokeWidth="2" />
        </>
      )}
    </g>
  )
}

function CharacterAvatar({
  character = 'rubi',
  emotion = 'senang',
  size = 160,
  className = '',
  decorative = false,
  idle = true,
}) {
  const { enabled } = useAdventureMotion()
  const name = characterNames[character] ? character : 'rubi'
  const safeEmotion = ['senang', 'berpikir', 'kaget', 'semangat'].includes(emotion)
    ? emotion
    : 'senang'
  const energetic = safeEmotion === 'semangat'
  return (
    <svg
      viewBox="0 0 200 220"
      width={size}
      height={size * 1.1}
      className={`character-avatar ${className}`}
      role={decorative ? undefined : 'img'}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : `${characterNames[name]}, ${safeEmotion}`}
      data-character={name}
      data-emotion={safeEmotion}
      focusable="false"
    >
      <ellipse cx="100" cy="208" rx="50" ry="7" fill="#414061" opacity=".12" />
      <m.g
        initial={false}
        animate={
          enabled && idle
            ? {
                y: [0, energetic ? -7 : -3, 0],
                rotate: safeEmotion === 'berpikir' ? [-2, 1, -2] : [0, energetic ? -2 : 0, 0],
              }
            : { y: 0, rotate: 0 }
        }
        transition={{ duration: energetic ? 1.5 : 3.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '100px 190px' }}
      >
        <CharacterArt character={name} color={colors[name]} />
        <Face character={name} emotion={safeEmotion} enabled={enabled && idle} />
      </m.g>
    </svg>
  )
}

export default memo(CharacterAvatar)
