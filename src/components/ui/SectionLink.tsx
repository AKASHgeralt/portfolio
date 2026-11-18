import type { MouseEvent, ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { prefersReducedMotion, scrollToSection } from '../../lib/scroll'

type Props = {
  to: string // section id, without '#'
  children: ReactNode
  className?: string
  onNavigate?: () => void
  'aria-current'?: 'true' | undefined
}

/**
 * Link to a section of the home page. Scrolls smoothly when already on the
 * home page; otherwise navigates home and the page scrolls to the hash.
 */
export function SectionLink({ to, children, className, onNavigate, ...rest }: Props) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const href = to === 'home' ? '/' : `/#${to}`

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    onNavigate?.()
    if (pathname !== '/') {
      navigate(href)
      return
    }
    const go = () => {
      if (to === 'home') {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
        history.replaceState(null, '', '/')
      } else if (scrollToSection(to)) {
        history.replaceState(null, '', `#${to}`)
      }
    }
    // When closing the mobile menu, wait for its scroll lock to be released first.
    if (onNavigate) window.setTimeout(go, 60)
    else go()
  }

  return (
    <a href={href} onClick={handleClick} className={className} {...rest}>
      {children}
    </a>
  )
}
