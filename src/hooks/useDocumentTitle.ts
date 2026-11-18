import { useEffect } from 'react'

const BASE = 'Akashveer Singh — Aspiring AI/ML Engineer'

export function useDocumentTitle(title?: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} · Akashveer Singh` : BASE
    if (description) {
      const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
      const prev = meta?.content
      if (meta) meta.content = description
      return () => {
        if (meta && prev) meta.content = prev
      }
    }
  }, [title, description])
}
