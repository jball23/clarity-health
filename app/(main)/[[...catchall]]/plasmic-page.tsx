'use client'

import { PlasmicComponent, PlasmicRootProvider } from '@plasmicapp/loader-nextjs'
import type { ComponentRenderData } from '@plasmicapp/loader-nextjs'
import { PLASMIC } from '@/plasmic-init'
import type { SanityBlogPost, SanityFAQItem, SanityProgram, SanityTeamMember, SanityTestimonial } from '@/sanity/lib/types'

interface PlasmicPageProps {
  plasmicData: ComponentRenderData
  plasmicPath: string
  programs: SanityProgram[]
  teamMembers: SanityTeamMember[]
  testimonials: SanityTestimonial[]
  faqs: SanityFAQItem[]
  recentPosts: SanityBlogPost[]
}

export function PlasmicPage({
  plasmicData,
  plasmicPath,
  programs,
  teamMembers,
  testimonials,
  faqs,
  recentPosts,
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
          RecentPosts: { posts: recentPosts },
        }}
      />
    </PlasmicRootProvider>
  )
}
