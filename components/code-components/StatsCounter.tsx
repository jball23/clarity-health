'use client'

import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface Stat {
  label: string
  value: number
  suffix?: string
  prefix?: string
}

interface StatsCounterProps {
  stats?: Stat[]
}

const DEFAULT_STATS: Stat[] = [
  { label: 'Patients Served', value: 2000, suffix: '+' },
  { label: 'Licensed Clinicians', value: 150, suffix: '+' },
  { label: 'States Covered', value: 50 },
  { label: 'Patient Satisfaction', value: 98, suffix: '%' },
]

function Counter({ value, suffix = '', prefix = '' }: Omit<Stat, 'label'>) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString())

  useEffect(() => {
    if (!inView) return
    const controls = animate(count, value, { duration: 1.8, ease: 'easeOut' })
    return controls.stop
  }, [inView, value, count])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}

export function StatsCounter({ stats = DEFAULT_STATS }: StatsCounterProps) {
  return (
    <section className="bg-[#F0FAFA] py-16">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center"
          >
            <p className="text-4xl font-bold text-[#007F79] md:text-5xl">
              <Counter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
            </p>
            <p className="mt-2 text-sm font-medium text-gray-500">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
