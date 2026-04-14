'use client'

import { initPlasmicLoader } from '@plasmicapp/loader-nextjs'

import { AnimatedSection } from './components/code-components/AnimatedSection'
import { FAQAccordion } from './components/code-components/FAQAccordion'
import { HeroSection } from './components/code-components/HeroSection'
import { ProgramsGrid } from './components/code-components/ProgramCard'
import { RecentPosts } from './components/code-components/RecentPosts'
import { StatsCounter } from './components/code-components/StatsCounter'
import { TeamGrid } from './components/code-components/TeamGrid'
import { TestimonialCarousel } from './components/code-components/TestimonialCarousel'

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: process.env.NEXT_PUBLIC_PLASMIC_PROJECT_ID!,
      token: process.env.NEXT_PUBLIC_PLASMIC_PUBLIC_KEY!,
    },
  ],
  // Fetch fresh data in development; use cached data in production
  preview: process.env.NODE_ENV === 'development',
})

// ─── Register code components ────────────────────────────────────────────────

PLASMIC.registerComponent(HeroSection, {
  name: 'HeroSection',
  description: 'Full-width hero with stagger animation and teal/marigold palette',
  props: {
    headline: { type: 'string', defaultValue: 'Mental wellness that meets you where you are.' },
    subheadline: { type: 'string' },
    ctaLabel: { type: 'string', defaultValue: 'Get Started' },
    ctaHref: { type: 'string', defaultValue: '/get-started' },
    secondaryCtaLabel: { type: 'string', defaultValue: 'Learn More' },
    secondaryCtaHref: { type: 'string', defaultValue: '/programs' },
  },
  importPath: './components/code-components/HeroSection',
})

PLASMIC.registerComponent(AnimatedSection, {
  name: 'AnimatedSection',
  description: 'Wraps children with a scroll-triggered entrance animation',
  props: {
    animationType: {
      type: 'choice',
      options: ['fadeUp', 'fadeIn', 'slideLeft', 'slideRight'],
      defaultValue: 'fadeUp',
    },
    delay: { type: 'number', defaultValue: 0 },
    children: { type: 'slot' },
    className: { type: 'string' },
  },
  importPath: './components/code-components/AnimatedSection',
})

PLASMIC.registerComponent(StatsCounter, {
  name: 'StatsCounter',
  description: 'Animated number counters — counts up from 0 when scrolled into view',
  props: {
    stats: {
      type: 'array',
      itemType: {
        type: 'object',
        fields: {
          label: 'string',
          value: 'number',
          suffix: 'string',
          prefix: 'string',
        },
      },
    },
  },
  importPath: './components/code-components/StatsCounter',
})

// The data-driven components receive data via server-side fetching;
// they're registered here so Plasmic knows their prop shapes.
// In Plasmic Studio, use placeholder data for preview.

PLASMIC.registerComponent(ProgramsGrid, {
  name: 'ProgramsGrid',
  description: 'Grid of treatment program cards (data from Sanity)',
  props: {
    programs: {
      type: 'array',
      itemType: {
        type: 'object',
        fields: {
          _id: 'string',
          title: 'string',
          slug: 'string',
          shortDescription: 'string',
        },
      },
    },
  },
  importPath: './components/code-components/ProgramCard',
})

PLASMIC.registerComponent(TeamGrid, {
  name: 'TeamGrid',
  description: 'Grid of clinician cards (data from Sanity)',
  props: {
    members: {
      type: 'array',
      itemType: {
        type: 'object',
        fields: {
          _id: 'string',
          name: 'string',
          slug: 'string',
          role: 'string',
          credentials: 'string',
        },
      },
    },
    title: { type: 'string', defaultValue: 'Meet Our Clinical Team' },
  },
  importPath: './components/code-components/TeamGrid',
})

PLASMIC.registerComponent(TestimonialCarousel, {
  name: 'TestimonialCarousel',
  description: 'Auto-advancing testimonial carousel (data from Sanity)',
  props: {
    testimonials: {
      type: 'array',
      itemType: {
        type: 'object',
        fields: {
          _id: 'string',
          quote: 'string',
          patientName: 'string',
          patientContext: 'string',
          rating: 'number',
        },
      },
    },
  },
  importPath: './components/code-components/TestimonialCarousel',
})

PLASMIC.registerComponent(FAQAccordion, {
  name: 'FAQAccordion',
  description: 'Animated accordion FAQ (data from Sanity)',
  props: {
    faqs: {
      type: 'array',
      itemType: {
        type: 'object',
        fields: {
          _id: 'string',
          question: 'string',
          answer: 'string',
          category: 'string',
        },
      },
    },
    title: { type: 'string', defaultValue: 'Frequently Asked Questions' },
  },
  importPath: './components/code-components/FAQAccordion',
})

PLASMIC.registerComponent(RecentPosts, {
  name: 'RecentPosts',
  description: 'Section showing cards for the 3 most recent blog posts (data from Sanity)',
  props: {
    posts: {
      type: 'array',
      itemType: {
        type: 'object',
        fields: {
          _id: 'string',
          title: 'string',
          slug: 'string',
          publishedAt: 'string',
          excerpt: 'string',
        },
      },
    },
    title: { type: 'string', defaultValue: 'From Our Clinical Team' },
  },
  importPath: './components/code-components/RecentPosts',
})

// Note: SanityCredentialsProvider, SanityFetcher, and SanityField are registered
// automatically via the plasmic-sanity-io project dependency in Plasmic Studio.
// Calling registerSanityComponents() here would double-register them.
