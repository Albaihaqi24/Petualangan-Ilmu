import { lazy, Suspense, useState } from 'react'

const CpReferenceDetails = lazy(() => import('./CpReferenceDetails'))

export default function CpReferencePanel({ scopeIds = [], elementIds = [] }) {
  const [opened, setOpened] = useState(false)
  if (!scopeIds.length && !elementIds.length) return null
  return (
    <details
      className="panel cp-reference-panel"
      onToggle={(event) => {
        if (event.currentTarget.open) setOpened(true)
      }}
    >
      <summary>Acuan CP untuk pendamping (opsional)</summary>
      <p className="small muted">
        CP adalah target akhir fase. Hubungan dengan unit atau bab di aplikasi masih usulan yang
        perlu diperiksa guru.
      </p>
      {opened && (
        <Suspense fallback={<p role="status">Memuat rumusan CP…</p>}>
          <CpReferenceDetails scopeIds={scopeIds} elementIds={elementIds} />
        </Suspense>
      )}
    </details>
  )
}
