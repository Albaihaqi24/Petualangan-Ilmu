import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  Calculator,
  Compass,
  Globe2,
  Heart,
  Leaf,
  Palette,
  Sparkles,
  Star,
} from 'lucide-react'
import { levelFromXp } from '../../lib/learning'

const icons = {
  calculator: Calculator,
  book: BookOpen,
  leaf: Leaf,
  heart: Heart,
  globe: Globe2,
  palette: Palette,
}
export function SubjectIcon({ name, size = 24, ...props }) {
  const Icon = icons[name] || BookOpen
  return <Icon size={size} strokeWidth={1.8} aria-hidden="true" {...props} />
}
export function Brand({ compact = false }) {
  return (
    <Link className="brand" to="/" aria-label="Petualangan Ilmu — beranda">
      <span className="brand-icon">
        <Compass size={26} strokeWidth={1.9} />
      </span>
      {!compact && (
        <span>
          Petualangan
          <span className="brand-second">
            Ilmu<span className="brand-dot">.</span>
          </span>
        </span>
      )}
    </Link>
  )
}
export function Button({
  as: Component = 'button',
  variant = 'primary',
  className = '',
  children,
  ...props
}) {
  return (
    <Component className={`button button-${variant} ${className}`} {...props}>
      {children}
    </Component>
  )
}
export function LinkButton({ to, children, variant = 'primary', ...props }) {
  return (
    <Button as={Link} to={to} variant={variant} {...props}>
      {children}
    </Button>
  )
}
export function Tag({ children, color = 'mint' }) {
  return <span className={`tag tone-${color}`}>{children}</span>
}
export function Notice({ children, error = false }) {
  return (
    <div className={`notice ${error ? 'notice-error' : ''}`} role={error ? 'alert' : 'status'}>
      {children}
    </div>
  )
}
export function EmptyState({ title, children, action }) {
  return (
    <div className="empty-state">
      <span className="empty-icon">
        <Sparkles size={25} />
      </span>
      <h3>{title}</h3>
      <p>{children}</p>
      {action}
    </div>
  )
}
export function PageHeading({ eyebrow, title, children, action }) {
  return (
    <div className="page-heading">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {children && <p className="muted">{children}</p>}
      </div>
      {action}
    </div>
  )
}
export function XPBar({ xp = 0 }) {
  const { level, progress } = levelFromXp(xp)
  return (
    <div className="xp-card">
      <div className="row between">
        <span className="row gap-sm">
          <span className="star-icon">
            <Star size={17} fill="currentColor" />
          </span>
          <strong>Level {level}</strong>
        </span>
        <span className="muted small">{xp} XP</span>
      </div>
      <div
        className="xp-track"
        role="progressbar"
        aria-label={`Progres menuju level ${level + 1}`}
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <span style={{ width: `${progress}%` }} />
      </div>
      <p className="small muted">
        {100 - progress} XP lagi ke level {level + 1}. Pelan-pelan, kamu bisa!
      </p>
    </div>
  )
}
export function TextLink({ to, children }) {
  return (
    <Link className="text-link" to={to}>
      {children}
      <ArrowRight size={16} aria-hidden="true" />
    </Link>
  )
}
export function Field({ label, children, hint }) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
      {hint && <small className="muted">{hint}</small>}
    </label>
  )
}
export const formatDate = (value) =>
  new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeZone: 'Asia/Jakarta' }).format(
    new Date(value),
  )
