import type { Metadata } from 'next'
import { AnimatedSection } from '@/components/code-components/AnimatedSection'
import { TeamGrid } from '@/components/code-components/TeamGrid'
import { sanityFetch } from '@/sanity/lib/live'
import { allTeamQuery } from '@/sanity/lib/queries'
import type { SanityTeamMember } from '@/sanity/lib/types'

export const metadata: Metadata = {
  title: 'Our Team',
  description: 'Meet the licensed clinicians and care coordinators behind Clarity Health.',
}

export default async function TeamPage() {
  const { data: members } = await sanityFetch<SanityTeamMember[]>({ query: allTeamQuery })

  return (
    <div>
      <div className="bg-[#F0FAFA] px-6 py-16 text-center">
        <AnimatedSection>
          <h1 className="text-4xl font-bold text-gray-900">Our Clinical Team</h1>
          <p className="mx-auto mt-3 max-w-xl text-lg text-gray-500">
            Licensed therapists, psychiatrists, and care coordinators — all specialized in evidence-based treatment.
          </p>
        </AnimatedSection>
      </div>

      <TeamGrid members={members ?? []} title="" />
    </div>
  )
}
