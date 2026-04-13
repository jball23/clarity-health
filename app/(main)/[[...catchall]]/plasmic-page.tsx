'use client'

import { PlasmicComponent, PlasmicRootProvider } from '@plasmicapp/loader-nextjs'
import type { ComponentRenderData } from '@plasmicapp/loader-nextjs'
import { PLASMIC } from '@/plasmic-init'
import type { SanityFAQItem, SanityProgram, SanityTeamMember, SanityTestimonial } from '@/sanity/lib/types'

interface PlasmicPageProps {
  plasmicData: ComponentRenderData
  plasmicPath: string
  programs: SanityProgram[]
  teamMembers: SanityTeamMember[]
  testimonials: SanityTestimonial[]
  faqs: SanityFAQItem[]
}

export function PlasmicPage({
  plasmicData,
  plasmicPath,
  programs,
  teamMembers,
  testimonials,
  faqs,
}: PlasmicPageProps) {
  return (
    <PlasmicRootProvider loader={PLASMIC} prefetchedData={plasmicData}>
      <PlasmicComponent
        component={plasmicPath}
        componentProps={{
          ProgramsGrid: { programs },
          TeamGrid: { members: teamMembers },
          TestimonialCarousel: { testimonials },
          FAQAccordion: { faqs },
        }}
      />
    </PlasmicRootProvider>
  )
}
