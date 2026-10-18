import { createContext, useContext, useEffect, useState } from 'react'
import { LazyMotion, MotionConfig, useReducedMotion } from 'framer-motion'

const MotionPreference = createContext({ paused: false, visible: true, toggle: () => {} })
let features
export const preloadAdventureMotion = () =>
  (features ||= import('../../lib/motionFeatures').then((module) => module.default))

export function AdventureMotion({ children }) {
  const [paused, setPaused] = useState(false)
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const update = () => setVisible(document.visibilityState !== 'hidden')
    update()
    document.addEventListener('visibilitychange', update)
    return () => document.removeEventListener('visibilitychange', update)
  }, [])
  return (
    <MotionPreference.Provider
      value={{ paused, visible, toggle: () => setPaused((value) => !value) }}
    >
      <LazyMotion features={preloadAdventureMotion} strict>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </LazyMotion>
    </MotionPreference.Provider>
  )
}

export function useAdventureMotion() {
  const reduced = useReducedMotion()
  const preference = useContext(MotionPreference)
  return {
    ...preference,
    enabled: !reduced && !preference.paused && preference.visible,
    reduced: Boolean(reduced),
  }
}
