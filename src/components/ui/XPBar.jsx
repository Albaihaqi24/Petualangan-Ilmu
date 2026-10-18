import { useEffect, useRef, useState } from 'react'
import { m } from 'framer-motion'
import { Star } from 'lucide-react'
import { levelFromXp } from '../../lib/learning'
import { playSound } from '../../lib/adventureSound'
import { useAdventureMotion } from '../adventure/AdventureMotion'

export default function XPBar({ xp = 0, compact = false }) {
  const { level, progress } = levelFromXp(xp)
  const { enabled } = useAdventureMotion()
  const previous = useRef(xp)
  const [gain, setGain] = useState(0)
  useEffect(() => {
    const before = previous.current
    previous.current = xp
    if (xp <= before) {
      setGain(0)
      return
    }
    setGain(xp - before)
    if (levelFromXp(xp).level > levelFromXp(before).level) playSound('level')
    const timer = setTimeout(() => setGain(0), 1600)
    return () => clearTimeout(timer)
  }, [xp])
  return (
    <div className={`xp-card ${compact ? 'xp-compact' : ''}`}>
      <div className="row between">
        <span className="row gap-sm">
          <span className="star-icon">
            <Star size={17} fill="currentColor" />
          </span>
          <strong>Level {level}</strong>
        </span>
        <span className="xp-total">{xp} XP</span>
      </div>
      <div
        className="xp-track"
        role="progressbar"
        aria-label={`Progres menuju level ${level + 1}`}
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <m.span
          className="xp-fill"
          key={level}
          initial={false}
          animate={{ scaleX: progress / 100 }}
          style={{ width: '100%', transformOrigin: 'left center' }}
          transition={enabled ? { type: 'spring', stiffness: 130, damping: 22 } : { duration: 0 }}
        />
        {gain > 0 && enabled && (
          <m.i
            className="xp-shimmer"
            key={xp}
            initial={{ x: '-110%' }}
            animate={{ x: '500%' }}
            transition={{ duration: 0.85 }}
          />
        )}
      </div>
      {gain > 0 && (
        <m.span
          className="xp-gain"
          key={xp}
          aria-live="polite"
          initial={enabled ? { y: 5, opacity: 0 } : false}
          animate={{ y: enabled ? -14 : 0, opacity: 1 }}
        >
          +{gain} XP ✦
        </m.span>
      )}
      {!compact && (
        <p className="small muted">
          {100 - progress} XP lagi ke level {level + 1}. Pelan-pelan, kamu bisa!
        </p>
      )}
    </div>
  )
}
