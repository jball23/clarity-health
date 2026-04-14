'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Testimonial {
  _id: string
  quote: string
  patientName: string
  patientContext?: string
  rating?: number
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[]
}

export function TestimonialCarousel({ testimonials = [] }: TestimonialCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    if (testimonials.length <= 1) return
    const id = setInterval(() => {
      setDirection(1)
      setCurrent((c) => (c + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(id)
  }, [testimonials.length])

  function go(index: number) {
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
  }

  if (!testimonials.length) return null

  const t = testimonials[current]
  const xOffset = direction * 40

  return (
    <section className="bg-[#007F79] px-6 py-20">
      <div className="mx-auto max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-sm font-semibold uppercase tracking-widest text-[#FFC52E]"
        >
          Patient Stories
        </motion.p>

        <div className="relative min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={t._id}
              initial={{ opacity: 0, x: xOffset }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -xOffset }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="text-xl font-medium leading-relaxed text-white md:text-2xl"
            >
              &ldquo;{t.quote}&rdquo;
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`meta-${t._id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="mt-6"
          >
            {t.rating && (
              <div className="mb-2 flex justify-center gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="text-[#FFC52E]">★</span>
                ))}
              </div>
            )}
            <p className="font-semibold text-white">{t.patientName}</p>
            {t.patientContext && (
              <p className="mt-0.5 text-sm text-white/60">{t.patientContext}</p>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Dot navigation */}
        {testimonials.length > 1 && (
          <div className="mt-10 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? 'w-6 bg-[#FFC52E]' : 'w-2 bg-white/30 hover:bg-white/60'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
