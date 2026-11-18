export const profile = {
  name: 'Akashveer Singh',
  initials: 'AS',
  title: 'Aspiring AI/ML Engineer',
  degree: 'Bachelor of Technology — Computer Science and Engineering',
  degreeShort: 'B.Tech, Computer Science & Engineering',
  university: 'Jawaharlal Nehru University',
  universityShort: 'JNU',
  location: 'New Delhi, India',
  graduation: 2028,
  interests: [
    'Artificial Intelligence',
    'Machine Learning',
    'Deep Learning',
    'Data Science',
    'Software Engineering',
    'Full-Stack Development',
    'Applied AI Products',
  ],
  openTo: [
    'AI/ML internships',
    'Software engineering roles',
    'Freelance projects',
    'International opportunities',
    "Master's programmes abroad",
  ],
} as const

export type NavItem = { id: string; label: string }

export const navItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]
