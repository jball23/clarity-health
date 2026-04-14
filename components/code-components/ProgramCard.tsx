'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface Program {
  _id: string
  title: string
  slug: string
  shortDescription: string
  features?: string[]
  ctaLabel?: string
  icon?: { asset: { url: string } }
}

interface ProgramsGridProps {
  programs: Program[]
}

function ProgramCard({ program, index }: { program: Program; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-shadow hover:shadow-md"
    >
      {program.icon?.asset.url && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E6F7F6]">
          <Image src={program.icon.asset.url} alt={program.title} width={28} height={28} />
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-900">{program.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500">{program.shortDescription}</p>

      {program.features && program.features.length > 0 && (
        <ul className="mt-4 space-y-1.5">
          {program.features.slice(0, 3).map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
              <span className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#007F79]">✓</span>
              {f}
            </li>
          ))}
        </ul>
      )}

      <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.15 }}>
        <Link
          href={`/programs/${program.slug}`}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#007F79] hover:text-[#005F5A]"
        >
          {program.ctaLabel ?? 'Learn More'} →
        </Link>
      </motion.div>
    </motion.div>
  )
}

export function ProgramsGrid({ programs = [] }: ProgramsGridProps) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {programs.map((p, i) => (
          <ProgramCard key={p._id} program={p} index={i} />
        ))}
      </div>
    </section>
  )
}
