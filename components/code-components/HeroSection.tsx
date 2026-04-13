'use client'

import { motion, type Variants } from 'framer-motion'
import Link from 'next/link'

interface HeroSectionProps {
  headline?: string
  subheadline?: string
  ctaLabel?: string
  ctaHref?: string
  secondaryCtaLabel?: string
  secondaryCtaHref?: string
}

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
}

export function HeroSection({
  headline = 'Mental wellness that meets you where you are.',
  subheadline = 'Evidence-based care for anxiety, depression, eating disorders, and trauma — delivered virtually by licensed clinicians.',
  ctaLabel = 'Get Started',
  ctaHref = '/get-started',
  secondaryCtaLabel = 'Learn More',
  secondaryCtaHref = '/programs',
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-[#007F79] px-6 py-24 md:py-36">
      {/* Decorative background blobs */}
      <motion.div
        className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[#00A89C]/30 blur-3xl"
        animate={{ scale: [1, 1.08, 1], rotate: [0, 6, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-[#FFC52E]/20 blur-3xl"
        animate={{ scale: [1, 1.12, 1], rotate: [0, -8, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      <div className="relative mx-auto max-w-4xl text-center text-white">
        <motion.div variants={container} initial="hidden" animate="visible">
          <motion.div variants={item}>
            <span className="mb-4 inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium tracking-wide text-white/90">
              Virtual Care · HIPAA Compliant · In-Network
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-4 text-4xl font-bold leading-tight tracking-tight md:text-6xl"
          >
            {headline}
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-2xl text-lg text-white/80 md:text-xl"
          >
            {subheadline}
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href={ctaHref}
                className="rounded-full bg-[#FFC52E] px-8 py-3.5 text-base font-semibold text-gray-900 shadow-lg transition-colors hover:bg-[#FFD45E]"
              >
                {ctaLabel}
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href={secondaryCtaHref}
                className="rounded-full border border-white/40 bg-white/10 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                {secondaryCtaLabel}
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Social proof strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-white/70"
        >
          {['4.9★ patient rating', '2,000+ patients served', 'In-network with major insurers', '50 states covered'].map(
            (stat) => (
              <span key={stat} className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FFC52E]" />
                {stat}
              </span>
            )
          )}
        </motion.div>
      </div>
    </section>
  )
}
