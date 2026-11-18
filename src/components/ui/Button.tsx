import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router'

type Variant = 'primary' | 'ghost' | 'quiet'

const styles: Record<Variant, string> = {
  primary:
    'bg-fg text-ink hover:bg-white shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_8px_30px_-12px_rgba(140,123,255,0.55)]',
  ghost: 'border border-line-strong text-fg hover:border-fg/40 hover:bg-white/[0.04]',
  quiet: 'text-muted hover:text-fg',
}

const baseClass =
  'group/btn relative inline-flex items-center justify-center gap-2 rounded-full px-5 h-11 text-[0.9rem] font-medium tracking-[-0.01em] transition-[background-color,border-color,color,transform] duration-300 ease-out-expo active:scale-[0.97] select-none whitespace-nowrap'

type Common = { variant?: Variant; children: ReactNode; className?: string }

/** External link styled as a button. Always opens in a new tab safely. */
export function ExternalButton({
  href,
  variant = 'ghost',
  children,
  className = '',
  ...rest
}: Common & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClass} ${styles[variant]} ${className}`}
      {...rest}
    >
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}

/** Internal route link styled as a button. */
export function RouteButton({ to, variant = 'ghost', children, className = '' }: Common & { to: string }) {
  return (
    <Link to={to} className={`${baseClass} ${styles[variant]} ${className}`}>
      {children}
    </Link>
  )
}

export const buttonClass = (variant: Variant = 'ghost', extra = '') => `${baseClass} ${styles[variant]} ${extra}`
