import { ArrowLeft } from 'lucide-react'
import { RouteButton } from '../components/ui/Button'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function NotFoundPage() {
  useDocumentTitle('Page not found')
  return (
    <section className="container-x flex min-h-[80svh] flex-col justify-center pt-24">
      <p className="eyebrow">404</p>
      <h1 className="display mt-5 text-[clamp(2.5rem,7vw,5.5rem)]">This page doesn’t exist.</h1>
      <p className="mt-5 max-w-md text-muted">The link may be outdated. Everything lives on the home page.</p>
      <div className="mt-8">
        <RouteButton to="/" variant="primary">
          <ArrowLeft size={16} aria-hidden /> Back home
        </RouteButton>
      </div>
    </section>
  )
}
