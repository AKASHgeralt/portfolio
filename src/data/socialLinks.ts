export type SocialKey = 'github' | 'linkedin' | 'leetcode'

export type SocialLink = {
  key: SocialKey
  label: string
  handle: string
  href: string
  description: string
}

export const socialLinks: Record<SocialKey, SocialLink> = {
  linkedin: {
    key: 'linkedin',
    label: 'LinkedIn',
    handle: 'Akashveer Singh',
    href: 'https://www.linkedin.com/in/akashveer-singh-0a1a83338/',
    description: 'The best place to reach me — messages, opportunities and collaboration.',
  },
  github: {
    key: 'github',
    label: 'GitHub',
    handle: 'AKASHgeralt',
    href: 'https://github.com/AKASHgeralt',
    description: 'Source code for every project on this page.',
  },
  leetcode: {
    key: 'leetcode',
    label: 'LeetCode',
    handle: 'AKASH_0w0',
    href: 'https://leetcode.com/u/AKASH_0w0/',
    description: 'Where I practise data structures and algorithms.',
  },
}

export const socialList: SocialLink[] = [socialLinks.linkedin, socialLinks.github, socialLinks.leetcode]
