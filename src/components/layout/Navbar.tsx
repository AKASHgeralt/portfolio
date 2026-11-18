import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'
import { navItems, profile } from '../../data/profile'
import { socialList } from '../../data/socialLinks'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useScrolled } from '../../hooks/useScrolled'
import { socialIcon } from '../ui/BrandIcons'
import { SectionLink } from '../ui/SectionLink'

const sectionIds = navItems.map((n) => n.id)

function Monogram() {
  return (
    <span
      aria-hidden
      className="grid size-8 place-items-center rounded-[7px] border border-line-strong bg-surface font-mono text-[0.72rem] font-medium tracking-tight"
    >
      <span>
        A<span className="text-accent-soft">S</span>
      </span>
    </span>
  )
}

export function Navbar() {
  const { pathname } = useLocation()
  const onHome = pathname === '/'
  const scrolled = useScrolled()
  const active = useActiveSection(sectionIds, onHome)
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

  // Close the menu on route change.
  useEffect(() => setOpen(false), [pathname])

  // Lock scroll + Escape to close while the mobile menu is open.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  // Close the mobile menu if the viewport grows past the breakpoint.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 64rem)')
    const onChange = () => mq.matches && setOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const elevated = scrolled || open

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        elevated ? 'border-b border-line bg-ink/75 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded focus:bg-fg focus:px-3 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <nav aria-label="Primary" className="container-x flex h-16 items-center justify-between">
        <SectionLink to="home" className="flex items-center gap-3 rounded-md" aria-current={undefined}>
          <Monogram />
          <span className="text-[0.8rem] font-medium uppercase tracking-[0.16em]">{profile.name}</span>
        </SectionLink>

        <div className="hidden items-center gap-1 lg:flex">
          <ul className="flex items-center">
            {navItems.map((item) => {
              const isActive = onHome && active === item.id
              return (
                <li key={item.id}>
                  <SectionLink
                    to={item.id}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative isolate block rounded-full px-3.5 py-2 text-[0.85rem] transition-colors duration-300 ${
                      isActive ? 'text-fg' : 'text-muted hover:text-fg'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full bg-white/[0.06] ring-1 ring-line"
                        transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                      />
                    )}
                    {item.label}
                  </SectionLink>
                </li>
              )
            })}
          </ul>
          <SectionLink
            to="contact"
            className="group ml-3 inline-flex h-9 items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-4 text-[0.85rem] font-medium text-fg transition-colors duration-300 hover:border-accent/70 hover:bg-accent/20"
          >
            Let’s Talk
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden
            />
          </SectionLink>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="-mr-2 grid size-11 place-items-center rounded-full text-fg lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? 'x' : 'menu'}
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              transition={{ duration: 0.2 }}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </nav>
    </header>

      {/* Rendered outside <header>: its backdrop-filter would otherwise become
          the containing block for this fixed overlay. */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-ink lg:hidden"
          >
            <div className="container-x flex min-h-full flex-col justify-between pb-10 pt-6">
              <ul className="border-t border-line">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * i + 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="border-b border-line"
                  >
                    <SectionLink
                      to={item.id}
                      onNavigate={() => setOpen(false)}
                      aria-current={onHome && active === item.id ? 'true' : undefined}
                      className="flex items-baseline justify-between py-4"
                    >
                      <span className="text-[2rem] font-medium tracking-[-0.03em]">{item.label}</span>
                      <span className="font-mono text-xs text-subtle">0{i + 1}</span>
                    </SectionLink>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="mt-10 flex flex-col gap-6"
              >
                <SectionLink
                  to="contact"
                  onNavigate={() => setOpen(false)}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-fg font-medium text-ink"
                >
                  Let’s Talk <ArrowUpRight size={16} aria-hidden />
                </SectionLink>
                <ul className="flex justify-center gap-2">
                  {socialList.map((s) => {
                    const Icon = socialIcon[s.key]
                    return (
                      <li key={s.key}>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${s.label} (opens in a new tab)`}
                          className="grid size-12 place-items-center rounded-full border border-line-strong text-muted hover:text-fg"
                        >
                          <Icon size={18} />
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
