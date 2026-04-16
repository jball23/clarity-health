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
  testimonials?: Testimonial[]
}

export function TestimonialCarousel({ testimonials = [] }: TestimonialCarouselProps) {
  const [fetched, setFetched] = useState<Testimonial[]>([])
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  // When no testimonials are passed (e.g. Plasmic Studio canvas), self-fetch from the API.
  useEffect(() => {
    if (testimonials.length > 0) return
    fetch('/api/testimonials')
      .then((r) => r.json())
      .then((data) => setFetched(data))
      .catch(() => {})
  }, [testimonials.length])

  const visible = testimonials.length > 0 ? testimonials : fetched

  useEffect(() => {
    if (visible.length <= 1) return
    const id = setInterval(() => {
      setDirection(1)
      setCurrent((c) => (c + 1) % visible.length)
    }, 6000)
    return () => clearInterval(id)
  }, [visible.length])

  function go(index: number) {
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
  }

  if (!visible.length) {
    return (
      <section className="w-full bg-[#007F79] py-20">
        <p className="text-center text-white/50">No testimonials yet.</p>
      </section>
    )
  }

  const t = visible[current]
  const xOffset = direction * 40

  return (
    <section className="w-full bg-[#007F79] py-20">
      <div className="mx-auto max-w-3xl px-6 text-center">
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
        {visible.length > 1 && (
          <div className="mt-10 flex justify-center gap-2">
            {visible.map((_, i) => (
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
