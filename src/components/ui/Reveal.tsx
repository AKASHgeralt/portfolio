import { motion, type HTMLMotionProps } from 'motion/react'
import type { ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'li' | 'section' | 'article'
} & Omit<HTMLMotionProps<'div'>, 'children'>

/**
 * Fades and lifts content in once, as it enters the viewport.
 * Transform is skipped automatically for reduced-motion users via <MotionConfig reducedMotion="user">.
 */
export function Reveal({ children, delay = 0, y = 24, className, as = 'div', ...rest }: RevealProps) {
  const Comp = motion[as] as typeof motion.div
  return (
    <Comp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </Comp>
  )
}
