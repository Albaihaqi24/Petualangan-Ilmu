import { Route, Routes } from 'react-router-dom'
import AppLayout, { ScrollManager } from './layouts/AppLayout'
import LandingPage, { PublicCatalogPage } from './pages/LandingPage'
import AuthPage from './pages/auth/AuthPage'
import { PasswordPage, AuthCallbackPage } from './pages/auth/SupabaseAuthPage'
import AccountPage from './pages/AccountPage'
import ResourceLibraryPage from './pages/ResourceLibraryPage'
import DashboardPage from './pages/student/DashboardPage'
import LessonPage from './pages/student/LessonPage'
import QuizPage, { QuizResultPage } from './pages/student/QuizPage'
import ClassesPage from './pages/student/ClassesPage'
import ProgressPage from './pages/student/ProgressPage'
import ProfilePage from './pages/student/ProfilePage'
import TutorPage from './pages/tutor/TutorPage'
import AdminPage from './pages/admin/AdminPage'
import ProtectedRoute from './components/ui/ProtectedRoute'
import { Brand, EmptyState, LinkButton } from './components/ui/Primitives'

export default function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sumber-belajar" element={<ResourceLibraryPage />} />
        <Route path="/jelajah/:subjectSlug" element={<PublicCatalogPage />} />
        <Route path="/login" element={<AuthPage key="login" />} />
        <Route path="/register" element={<AuthPage key="register" register />} />
        <Route path="/forgot-password" element={<PasswordPage />} />
        <Route path="/reset-password" element={<PasswordPage reset />} />
        <Route path="/auth/callback" element={<AuthCallbackPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/account" element={<AccountPage />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute role="student" />}>
          <Route element={<AppLayout />}>
            <Route path="/student" element={<DashboardPage />} />
            <Route path="/student/lesson/:slug" element={<LessonPage />} />
            <Route path="/student/quiz/:lessonId" element={<QuizPage />} />
            <Route path="/student/quiz/:lessonId/result/:attemptId" element={<QuizResultPage />} />
            <Route path="/student/classes" element={<ClassesPage />} />
            <Route path="/student/progress" element={<ProgressPage />} />
            <Route path="/student/profile" element={<ProfilePage />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute role="tutor" />}>
          <Route element={<AppLayout />}>
            <Route path="/tutor" element={<TutorPage />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute role="admin" />}>
          <Route element={<AppLayout />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>
        </Route>
        <Route
          path="*"
          element={
            <main className="standalone">
              <Brand />
              <EmptyState
                title="Sepertinya kita mengambil jalan lain"
                action={<LinkButton to="/">Kembali ke beranda</LinkButton>}
              >
                Halaman ini belum ada. Peta petualanganmu masih menunggu.
              </EmptyState>
            </main>
          }
        />
      </Routes>
    </>
  )
}
