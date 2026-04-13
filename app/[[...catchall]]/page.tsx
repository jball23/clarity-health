import { ComponentRenderData, PlasmicComponent, PlasmicRootProvider } from '@plasmicapp/loader-nextjs'
import { notFound } from 'next/navigation'
import { PLASMIC } from '@/plasmic-init'
import { sanityFetch } from '@/sanity/lib/live'
import {
  allProgramsQuery,
  featuredTeamQuery,
  featuredTestimonialsQuery,
  faqByCategoryQuery,
} from '@/sanity/lib/queries'
import type { SanityFAQItem, SanityProgram, SanityTeamMember, SanityTestimonial } from '@/sanity/lib/types'

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

  // Fetch Plasmic page data
  const plasmicData: ComponentRenderData | null = await PLASMIC.maybeFetchComponentData(plasmicPath)
  if (!plasmicData) notFound()

  // Pre-fetch all Sanity data needed for code components on this page
  const [programs, teamMembers, testimonials, faqs] = await Promise.all([
    sanityFetch<SanityProgram[]>({ query: allProgramsQuery }),
    sanityFetch<SanityTeamMember[]>({ query: featuredTeamQuery }),
    sanityFetch<SanityTestimonial[]>({ query: featuredTestimonialsQuery }),
    sanityFetch<SanityFAQItem[]>({ query: faqByCategoryQuery, params: { category: '' } }),
  ])

  return (
    <PlasmicRootProvider loader={PLASMIC} prefetchedData={plasmicData}>
      <PlasmicComponent
        component={plasmicPath}
        componentProps={{
          // Pass Sanity data into registered code components
          ProgramsGrid: { programs: programs.data ?? [] },
          TeamGrid: { members: teamMembers.data ?? [] },
          TestimonialCarousel: { testimonials: testimonials.data ?? [] },
          FAQAccordion: { faqs: faqs.data ?? [] },
        }}
      />
    </PlasmicRootProvider>
  )
}
