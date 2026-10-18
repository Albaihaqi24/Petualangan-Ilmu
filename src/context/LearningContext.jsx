import { createContext, useContext } from 'react'
export const LearningContext = createContext(null)
export function useLearning() {
  const value = useContext(LearningContext)
  if (!value) throw new Error('Halaman harus berada di dalam penyedia data belajar.')
  return value
}
