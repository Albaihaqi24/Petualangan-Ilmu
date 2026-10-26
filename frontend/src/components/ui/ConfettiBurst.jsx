import { m } from 'framer-motion'
import { useAdventureMotion } from '../adventure/AdventureMotion'

const colors = ['#ffbc4b', '#fb8e8e', '#a998ed', '#6dd3b2', '#79bff3']
export default function ConfettiBurst({ burstKey = 0 }) {
  const { enabled } = useAdventureMotion()
  if (!enabled) return null
  return (
    <div className="confetti-burst" aria-hidden="true" key={burstKey}>
      {Array.from({ length: 14 }, (_, i) => {
        const angle = (Math.PI * 2 * i) / 14
        const radius = 70 + (i % 3) * 22
        return (
          <m.span
            key={i}
            className={i % 3 ? 'confetti-chip' : 'confetti-star'}
            style={{
              color: colors[i % colors.length],
              backgroundColor: i % 3 ? colors[i % colors.length] : 'transparent',
            }}
            initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
            animate={{
              x: Math.cos(angle) * radius,
              y: [0, Math.sin(angle) * radius - 35, Math.sin(angle) * radius + 24],
              opacity: [0, 1, 1, 0],
              scale: [0.4, 1, 0.7],
              rotate: i * 47,
            }}
            transition={{ duration: 1.1, ease: 'easeOut', delay: (i % 3) * 0.03 }}
          >
            {i % 3 ? '' : '✦'}
          </m.span>
        )
      })}
    </div>
  )
}
