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

// ─── Sanity-driven components ─────────────────────────────────────────────────
// These components self-fetch live data in production. On the Plasmic canvas,
// useEffect is unreliable so we supply defaultValue arrays here — Plasmic passes
// them as props and the component renders immediately without any fetch.

PLASMIC.registerComponent(ProgramsGrid, {
  name: 'ProgramsGrid',
  description: 'Grid of treatment program cards (data from Sanity)',
  props: {
    programs: {
      type: 'array',
      defaultValue: [
        { _id: 'p1', title: 'Anxiety & Depression', slug: 'anxiety-depression', shortDescription: 'Evidence-based CBT and mindfulness interventions for anxiety disorders and clinical depression.' },
        { _id: 'p2', title: 'Eating Disorder Recovery', slug: 'eating-disorder-recovery', shortDescription: 'Comprehensive virtual care for anorexia, bulimia, binge eating, and ARFID.' },
        { _id: 'p3', title: 'Trauma & PTSD', slug: 'trauma-ptsd', shortDescription: 'Specialized trauma-informed care using EMDR, CPT, and prolonged exposure therapy.' },
        { _id: 'p4', title: 'OCD Support', slug: 'ocd-support', shortDescription: 'Gold-standard ERP therapy for OCD delivered by certified specialists.' },
      ],
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
      defaultValue: [
        { _id: 'm1', name: 'Dr. Sarah Chen', slug: 'dr-sarah-chen', role: 'Clinical Director', credentials: 'PhD, ABPP' },
        { _id: 'm2', name: 'Marcus Rivera', slug: 'marcus-rivera', role: 'Lead Therapist', credentials: 'LCSW, CEDS' },
        { _id: 'm3', name: 'Dr. Priya Nair', slug: 'dr-priya-nair', role: 'Psychiatrist', credentials: 'MD' },
        { _id: 'm4', name: 'Jordan Wilder', slug: 'jordan-wilder', role: 'Registered Dietitian', credentials: 'RD, CEDS-S' },
      ],
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
      defaultValue: [
        { _id: 't1', quote: 'Clarity Health gave me my life back. After two years of struggling, I finally found a team that understood me.', patientName: 'Emily', patientContext: 'Eating disorder recovery, 2 years', rating: 5 },
        { _id: 't2', quote: "I was skeptical about online therapy for OCD, but the ERP program here is better than anything I tried in person.", patientName: 'Daniel', patientContext: 'OCD treatment, 6 months', rating: 5 },
        { _id: 't3', quote: "The combination of therapy and medication management from one coordinated team made all the difference.", patientName: 'James', patientContext: 'Anxiety & depression, ongoing care', rating: 5 },
      ],
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
      defaultValue: [
        { _id: 'f1', question: 'Does Clarity Health accept insurance?', answer: 'Yes. We work with most major commercial insurance plans including Aetna, Cigna, UnitedHealth, Anthem, and BCBS.', category: 'Insurance' },
        { _id: 'f2', question: 'How quickly can I get started?', answer: 'Most patients are matched with a care team within 48 hours of completing their intake assessment.', category: 'Getting Started' },
        { _id: 'f3', question: 'Is virtual care effective for eating disorders?', answer: 'Yes. Multiple peer-reviewed studies show virtual FBT and CBT-E produce outcomes equivalent to in-person care.', category: 'Treatment' },
      ],
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
      defaultValue: [
        { _id: 'b1', title: 'How Cognitive Behavioral Therapy Actually Works', slug: 'how-cbt-works', publishedAt: new Date().toISOString(), excerpt: 'CBT is one of the most researched therapies in existence — but what\'s actually happening in a session?' },
        { _id: 'b2', title: 'Virtual Treatment for Eating Disorders: What the Research Says', slug: 'virtual-treatment-eating-disorders-research', publishedAt: new Date().toISOString(), excerpt: 'Skepticism about virtual eating disorder care is understandable. But the evidence is stronger than most people realize.' },
        { _id: 'b3', title: "Supporting Your Teenager's Mental Health: A Guide for Parents", slug: 'supporting-teen-mental-health-parents-guide', publishedAt: new Date().toISOString(), excerpt: 'Watching your teenager struggle is one of the hardest experiences a parent can face.' },
      ],
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
