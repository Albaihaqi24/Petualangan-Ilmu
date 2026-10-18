import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useLearning } from '../../context/LearningContext'
import { EmptyState, LinkButton } from './Primitives'

export default function ProtectedRoute({ role }) {
  const { session, mode } = useLearning()
  const location = useLocation()
  if (!session) return <Navigate to="/login" state={{ from: location.pathname }} replace />
  if (role && session.role !== role)
    return (
      <main className="standalone">
        <EmptyState
          title="Ruang ini untuk peran yang berbeda"
          action={
            <LinkButton to={mode === 'demo' ? '/login' : `/${session.role}`}>
              {mode === 'demo' ? 'Pilih peran demo' : 'Kembali ke ruang belajar'}
            </LinkButton>
          }
        >
          Akun yang sedang aktif tidak mempunyai akses ke halaman ini.
        </EmptyState>
      </main>
    )
  return <Outlet />
}
