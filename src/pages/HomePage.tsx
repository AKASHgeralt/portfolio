import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { About } from '../components/sections/About'
import { Contact } from '../components/sections/Contact'
import { Education } from '../components/sections/Education'
import { Hero } from '../components/sections/Hero'
import { Projects } from '../components/sections/Projects'
import { Skills } from '../components/sections/Skills'
import { scrollToSection } from '../lib/scroll'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function HomePage() {
  const { hash } = useLocation()
  useDocumentTitle()

  // Arriving from another route with a hash (e.g. /#projects): scroll once laid out.
  useEffect(() => {
    if (!hash) return
    const id = decodeURIComponent(hash.slice(1))
    const t = window.setTimeout(() => scrollToSection(id), 60)
    return () => window.clearTimeout(t)
  }, [hash])

  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Education />
      <Contact />
    </>
  )
}
