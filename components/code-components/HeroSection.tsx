'use client'

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from 'framer-motion'
import Link from 'next/link'
import { useRef } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface HeroSectionProps {
  headline?: string
  subheadline?: string
  ctaLabel?: string
  ctaHref?: string
  secondaryCtaLabel?: string
  secondaryCtaHref?: string
}

// ─── Orb config ───────────────────────────────────────────────────────────────
// left/top: where the orb center is placed on the section
// size/negHalf: orb diameter and negative half (for centering via margin)
// depth: parallax factor — higher = moves more with mouse
// dur: autonomous animation duration (seconds)

const ORBS = [
  { left: '10%',  top: '22%',  size: '34rem', negHalf: '-17rem', color: '#00C4BA', opacity: 0.45, depth: 0.06, dur: 20 },
  { left: '84%',  top: '10%',  size: '56rem', negHalf: '-28rem', color: '#003D3A', opacity: 0.75, depth: 0.10, dur: 26 },
  { left: '62%',  top: '84%',  size: '42rem', negHalf: '-21rem', color: '#FFC52E', opacity: 0.18, depth: 0.08, dur: 17 },
  { left: '5%',   top: '76%',  size: '38rem', negHalf: '-19rem', color: '#009990', opacity: 0.38, depth: 0.05, dur: 30 },
  { left: '91%',  top: '60%',  size: '26rem', negHalf: '-13rem', color: '#FFD45E', opacity: 0.14, depth: 0.12, dur: 13 },
  { left: '40%',  top: '32%',  size: '72rem', negHalf: '-36rem', color: '#005F5A', opacity: 0.32, depth: 0.02, dur: 36 },
] as const

const RINGS = [0, 1, 2] as const

// ─── Animation variants ───────────────────────────────────────────────────────

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
}

// ─── ParallaxOrb ─────────────────────────────────────────────────────────────

function ParallaxOrb({
  orb,
  springX,
  springY,
  index,
}: {
  orb: typeof ORBS[number]
  springX: MotionValue<number>
  springY: MotionValue<number>
  index: number
}) {
  const x = useTransform(springX, (v) => v * orb.depth)
  const y = useTransform(springY, (v) => v * orb.depth)

  return (
    <div
      className="pointer-events-none absolute"
      style={{ left: orb.left, top: orb.top }}
    >
      <motion.div
        className="rounded-full"
        style={{
          width: orb.size,
          height: orb.size,
          marginLeft: orb.negHalf,
          marginTop: orb.negHalf,
          backgroundColor: orb.color,
          opacity: orb.opacity,
          filter: 'blur(88px)',
          x,
          y,
        }}
        animate={{ scale: [1, 1.07, 0.96, 1.05, 1] }}
        transition={{
          duration: orb.dur,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 1.8,
        }}
      />
    </div>
  )
}

// ─── ScrollRing ───────────────────────────────────────────────────────────────

function ScrollRing({
  scrollY,
  index,
}: {
  scrollY: MotionValue<number>
  index: number
}) {
  // All rings animate over the same pixel range so they grow together immediately on scroll.
  // Each ring starts and ends at a different size to stay visually layered.
  const initialScale = 2 + index * 2   // 2, 4, 6
  const finalScale   = 8 + index * 2   // 8, 10, 12

  const scale   = useTransform(scrollY, [0, 700], [initialScale, finalScale])
  const opacity = useTransform(scrollY, [0, 600], [0.5 - index * 0.1, 0])

  return (
    <motion.div
      className="pointer-events-none absolute rounded-full border border-white/8"
      style={{
        width: '8rem',
        height: '8rem',
        left: '50%',
        top: '50%',
        marginLeft: '-4rem',
        marginTop: '-4rem',
        scale,
        opacity,
      }}
    />
  )
}

// ─── HeroSection ─────────────────────────────────────────────────────────────

export function HeroSection({
  headline = 'Mental wellness that meets you where you are.',
  subheadline = 'Evidence-based care for anxiety, depression, eating disorders, and trauma — delivered virtually by licensed clinicians.',
  ctaLabel = 'Get Started',
  ctaHref = '/get-started',
  secondaryCtaLabel = 'Learn More',
  secondaryCtaHref = '/programs',
}: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)

  // Global scroll position in pixels — starts animating immediately at scroll=0
  const { scrollY } = useScroll()

  // Raw mouse offset from section center (px)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  // Slow, heavy spring — for orb parallax
  const springX = useSpring(rawX, { stiffness: 32, damping: 20, mass: 1.4 })
  const springY = useSpring(rawY, { stiffness: 32, damping: 20, mass: 1.4 })

  // Fast spring — for cursor glow tracking
  const glowX = useSpring(rawX, { stiffness: 110, damping: 26 })
  const glowY = useSpring(rawY, { stiffness: 110, damping: 26 })

  function onMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    rawX.set(e.clientX - rect.left - rect.width / 2)
    rawY.set(e.clientY - rect.top - rect.height / 2)
  }

  function onMouseLeave() {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative w-full overflow-hidden px-6 py-24 md:py-36"
      style={{
        background:
          'radial-gradient(ellipse at 28% 18%, #009990 0%, #00706A 38%, #004D49 100%)',
      }}
    >
      {/* ── Background canvas ────────────────────── */}

      {/* Parallax orbs */}
      {ORBS.map((orb, i) => (
        <ParallaxOrb key={i} orb={orb} springX={springX} springY={springY} index={i} />
      ))}

      {/* Cursor spotlight — follows mouse with spring lag */}
      <motion.div
        className="pointer-events-none absolute rounded-full"
        style={{
          width: '38rem',
          height: '38rem',
          left: '50%',
          top: '50%',
          marginLeft: '-19rem',
          marginTop: '-19rem',
          background:
            'radial-gradient(circle, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 40%, transparent 70%)',
          x: glowX,
          y: glowY,
        }}
      />

      {/* Concentric rings — grow as you scroll down, shrink as you scroll up */}
      {RINGS.map((i) => (
        <ScrollRing key={i} scrollY={scrollY} index={i} />
      ))}

      {/* Dot grid — subtle depth texture */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.35) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          opacity: 0.07,
        }}
      />

      {/* ── Content ──────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-4xl text-center text-white">
        <motion.div variants={container} initial="hidden" animate="visible">
          <motion.div variants={item}>
            <span className="mb-4 inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium tracking-wide text-white/90 backdrop-blur-sm">
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

          <motion.div
            variants={item}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
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
          transition={{ delay: 0.85, duration: 0.6 }}
          className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-white/60"
        >
          {[
            '4.9★ patient rating',
            '2,000+ patients served',
            'In-network with major insurers',
            '50 states covered',
          ].map((stat) => (
            <span key={stat} className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FFC52E]" />
              {stat}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
