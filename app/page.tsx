import { AnimatedSection } from '@/components/code-components/AnimatedSection'
import { FAQAccordion } from '@/components/code-components/FAQAccordion'
import { HeroSection } from '@/components/code-components/HeroSection'
import { ProgramsGrid } from '@/components/code-components/ProgramCard'
import { StatsCounter } from '@/components/code-components/StatsCounter'
import { TeamGrid } from '@/components/code-components/TeamGrid'
import { TestimonialCarousel } from '@/components/code-components/TestimonialCarousel'
import { sanityFetch } from '@/sanity/lib/live'
import {
  allProgramsQuery,
  faqByCategoryQuery,
  featuredTeamQuery,
  featuredTestimonialsQuery,
} from '@/sanity/lib/queries'
import type { SanityFAQItem, SanityProgram, SanityTeamMember, SanityTestimonial } from '@/sanity/lib/types'

export default async function HomePage() {
  const [programs, team, testimonials, faqs] = await Promise.all([
    sanityFetch<SanityProgram[]>({ query: allProgramsQuery }),
    sanityFetch<SanityTeamMember[]>({ query: featuredTeamQuery }),
    sanityFetch<SanityTestimonial[]>({ query: featuredTestimonialsQuery }),
    sanityFetch<SanityFAQItem[]>({ query: faqByCategoryQuery, params: { category: '' } }),
  ])

  return (
    <>
      <HeroSection />

      <StatsCounter />

      <div className="bg-white">
        <AnimatedSection className="mx-auto max-w-6xl px-6 pt-20 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-[#007F79]">
            What We Treat
          </span>
          <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
            Evidence-based programs for lasting recovery
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-lg text-gray-500">
            Every program is delivered by licensed clinicians and tailored to your specific needs.
          </p>
        </AnimatedSection>
        <ProgramsGrid programs={programs.data ?? []} />
      </div>

      {(testimonials.data?.length ?? 0) > 0 && (
        <TestimonialCarousel testimonials={testimonials.data ?? []} />
      )}

      {(team.data?.length ?? 0) > 0 && (
        <div className="bg-[#F9FAFB]">
          <TeamGrid members={team.data ?? []} />
        </div>
      )}

      <section className="mx-auto max-w-5xl px-6 py-20">
        <AnimatedSection className="text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-[#007F79]">
            The Process
          </span>
          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            Get started in three simple steps
          </h2>
        </AnimatedSection>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {[
            { step: '01', title: 'Complete your assessment', desc: 'Tell us about yourself and your goals in a brief 10-minute intake.' },
            { step: '02', title: 'Meet your care team', desc: 'Get matched with a licensed therapist and care coordinator within 48 hours.' },
            { step: '03', title: 'Begin your journey', desc: 'Attend sessions from home, track progress, and access 24/7 support.' },
          ].map(({ step, title, desc }, i) => (
            <AnimatedSection key={step} delay={i * 0.1}>
              <div className="relative rounded-2xl border border-gray-100 bg-white p-7 shadow-sm">
                <span className="text-5xl font-black text-[#007F79]/10">{step}</span>
                <h3 className="mt-3 text-lg font-semibold text-gray-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {(faqs.data?.length ?? 0) > 0 && (
        <div className="bg-[#F0FAFA]">
          <FAQAccordion faqs={faqs.data ?? []} />
        </div>
      )}
    </>
  )
}
