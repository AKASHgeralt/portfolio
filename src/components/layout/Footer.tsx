import { profile } from '../../data/profile'
import { socialList } from '../../data/socialLinks'
import { socialIcon } from '../ui/BrandIcons'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-line">
      <div className="container-x flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[0.95rem] font-medium tracking-[-0.01em]">{profile.name}</p>
          <p className="mt-1 text-sm text-muted">{profile.title}</p>
        </div>
        <ul className="flex gap-2" aria-label="Social profiles">
          {socialList.map((s) => {
            const Icon = socialIcon[s.key]
            return (
              <li key={s.key}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label} (opens in a new tab)`}
                  className="grid size-10 place-items-center rounded-full border border-line text-muted transition-colors duration-300 hover:border-line-strong hover:text-fg"
                >
                  <Icon size={16} />
                </a>
              </li>
            )
          })}
        </ul>
        <p className="font-mono text-xs text-muted">
          © {year} {profile.name}
        </p>
      </div>
    </footer>
  )
}
