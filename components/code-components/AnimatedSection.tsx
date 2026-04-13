'use client'

import { motion, Variants } from 'framer-motion'
import { ReactNode } from 'react'

type AnimationType = 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight'

interface AnimatedSectionProps {
  children: ReactNode
  animationType?: AnimationType
  delay?: number
  className?: string
}

const variants: Record<AnimationType, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 48 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -48 },
    visible: { opacity: 1, x: 0 },
  },
}

export function AnimatedSection({
  children,
  animationType = 'fadeUp',
  delay = 0,
  className,
}: AnimatedSectionProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay }}
      variants={variants[animationType]}
      className={className}
    >
      {children}
    </motion.div>
  )
}
