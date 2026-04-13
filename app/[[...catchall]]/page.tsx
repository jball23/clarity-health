import { notFound } from 'next/navigation'
import { PLASMIC } from '@/plasmic-init-server'
import { sanityFetch } from '@/sanity/lib/live'
import {
  allProgramsQuery,
  featuredTeamQuery,
  featuredTestimonialsQuery,
  faqByCategoryQuery,
} from '@/sanity/lib/queries'
import type { SanityFAQItem, SanityProgram, SanityTeamMember, SanityTestimonial } from '@/sanity/lib/types'
import { PlasmicPage } from './plasmic-page'

export const revalidate = 60

interface CatchallProps {
  params: Promise<{ catchall?: string[] }>
}

export async function generateStaticParams() {
  const pages = await PLASMIC.fetchPages()
  return pages.map((p) => ({ catchall: p.path.split('/').filter(Boolean) }))
}

export default async function CatchallPage({ params }: CatchallProps) {
  const { catchall } = await params
  const plasmicPath = '/' + (catchall?.join('/') ?? '')

  // Skip root path — handled by app/page.tsx
  if (plasmicPath === '/') notFound()

  const plasmicData = await PLASMIC.maybeFetchComponentData(plasmicPath)
  if (!plasmicData) notFound()

  const [programs, teamMembers, testimonials, faqs] = await Promise.all([
    sanityFetch<SanityProgram[]>({ query: allProgramsQuery }),
    sanityFetch<SanityTeamMember[]>({ query: featuredTeamQuery }),
    sanityFetch<SanityTestimonial[]>({ query: featuredTestimonialsQuery }),
    sanityFetch<SanityFAQItem[]>({ query: faqByCategoryQuery, params: { category: '' } }),
  ])

  return (
    <PlasmicPage
      plasmicData={plasmicData}
      plasmicPath={plasmicPath}
      programs={programs.data ?? []}
      teamMembers={teamMembers.data ?? []}
      testimonials={testimonials.data ?? []}
      faqs={faqs.data ?? []}
    />
  )
}
