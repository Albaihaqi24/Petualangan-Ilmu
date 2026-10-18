import { m } from 'framer-motion'
import { useAdventureMotion } from '../adventure/AdventureMotion'

const pieces = [
  ['✦', 5, 14],
  ['○', 19, 73],
  ['✧', 39, 8],
  ['+', 61, 82],
  ['✦', 82, 17],
  ['○', 93, 66],
]
export default function FloatingDecorations({ theme = 'adventure', clouds = false }) {
  const { enabled } = useAdventureMotion()
  return (
    <div
      className={`floating-decorations decor-${theme}`}
      aria-hidden="true"
      data-motion={enabled ? 'on' : 'off'}
    >
      {pieces.map(([symbol, left, top], i) => (
        <m.span
          className="floating-piece"
          key={i}
          style={{ left: `${left}%`, top: `${top}%` }}
          initial={false}
          animate={
            enabled
              ? { y: [0, -9, 0], opacity: [0.25, 0.65, 0.25], rotate: [0, i % 2 ? 12 : -12, 0] }
              : { y: 0, opacity: 0.35, rotate: 0 }
          }
          transition={{
            duration: 3.2 + i * 0.3,
            delay: i * 0.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {theme === 'numeria' && i === 3
            ? '2'
            : theme === 'kata' && i === 3
              ? 'Aa'
              : theme === 'eksplora' && i === 3
                ? '❧'
                : symbol}
        </m.span>
      ))}
      {clouds && (
        <svg className="map-clouds" viewBox="0 0 900 500" preserveAspectRatio="none">
          {[
            ['M55 82Q48 62 69 59Q78 34 104 48Q126 45 130 65Q152 66 147 82Z', 0],
            ['M667 62Q663 45 682 44Q692 22 713 35Q734 32 739 50Q762 50 754 65Z', 0.7],
          ].map(([d, delay]) => (
            <m.path
              key={d}
              d={d}
              fill="white"
              opacity=".8"
              initial={false}
              animate={enabled ? { x: [0, 15, 0], y: [0, -3, 0] } : { x: 0, y: 0 }}
              transition={{ duration: 8, repeat: Infinity, delay }}
            />
          ))}
        </svg>
      )}
    </div>
  )
}
