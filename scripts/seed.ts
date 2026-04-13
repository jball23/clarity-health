/**
 * Seed script — populates Sanity with demo content for Clarity Health
 * Run: npx tsx scripts/seed.ts
 *
 * Requires NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET,
 * and SANITY_API_READ_TOKEN (write token) in .env.local
 */
import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN ?? process.env.SANITY_API_READ_TOKEN,
  useCdn: false,
})

async function seed() {
  console.log('🌱 Seeding Clarity Health demo content...\n')

  // ─── Programs ─────────────────────────────────────────────────────────────
  const programs = [
    {
      _type: 'program',
      title: 'Anxiety & Depression',
      slug: { current: 'anxiety-depression' },
      shortDescription: 'Evidence-based CBT and mindfulness interventions for anxiety disorders and clinical depression.',
      features: ['Individual therapy sessions', 'Medication management support', 'DBT skill-building', '24/7 crisis support'],
      ctaLabel: 'Learn More',
      order: 1,
    },
    {
      _type: 'program',
      title: 'Eating Disorder Recovery',
      slug: { current: 'eating-disorder-recovery' },
      shortDescription: 'Comprehensive virtual care for anorexia, bulimia, binge eating, and ARFID, backed by FBT and CBT-E.',
      features: ['Family-based treatment (FBT)', 'Dietitian-led nutrition counseling', 'Medical monitoring', 'Peer support groups'],
      ctaLabel: 'Learn More',
      order: 2,
    },
    {
      _type: 'program',
      title: 'Trauma & PTSD',
      slug: { current: 'trauma-ptsd' },
      shortDescription: 'Specialized trauma-informed care using EMDR, CPT, and prolonged exposure therapy.',
      features: ['EMDR therapy', 'Cognitive Processing Therapy (CPT)', 'Somatic approaches', 'Safety planning'],
      ctaLabel: 'Learn More',
      order: 3,
    },
    {
      _type: 'program',
      title: 'OCD Support',
      slug: { current: 'ocd-support' },
      shortDescription: 'Gold-standard ERP therapy for OCD delivered by certified specialists in a virtual setting.',
      features: ['Exposure & Response Prevention (ERP)', 'Acceptance & Commitment Therapy', 'Family psychoeducation', 'Medication coordination'],
      ctaLabel: 'Learn More',
      order: 4,
    },
    {
      _type: 'program',
      title: 'Family & Adolescent',
      slug: { current: 'family-adolescent' },
      shortDescription: 'Whole-family treatment for adolescents aged 10–17, bringing caregivers into the healing process.',
      features: ['Adolescent-specialized therapists', 'Parent coaching sessions', 'School coordination', 'Multi-family groups'],
      ctaLabel: 'Learn More',
      order: 5,
    },
    {
      _type: 'program',
      title: 'Substance Use',
      slug: { current: 'substance-use' },
      shortDescription: 'Integrated dual-diagnosis care for substance use co-occurring with depression, anxiety, or trauma.',
      features: ['Motivational interviewing', 'MAT coordination', 'Relapse prevention planning', 'Recovery coaching'],
      ctaLabel: 'Learn More',
      order: 6,
    },
  ]

  // ─── Team Members ─────────────────────────────────────────────────────────
  const teamMembers = [
    {
      _type: 'teamMember',
      name: 'Dr. Sarah Chen',
      slug: { current: 'dr-sarah-chen' },
      role: 'Clinical Director',
      credentials: 'PhD, ABPP',
      specialties: ['Eating Disorders', 'Anxiety & Depression', 'Family Therapy'],
      bio: 'Dr. Chen brings 15 years of clinical experience specializing in eating disorder treatment and evidence-based care. She completed her fellowship at Stanford and has published extensively on FBT outcomes.',
      featured: true,
    },
    {
      _type: 'teamMember',
      name: 'Marcus Rivera, LCSW',
      slug: { current: 'marcus-rivera' },
      role: 'Lead Therapist',
      credentials: 'LCSW, CEDS',
      specialties: ['Trauma & PTSD', 'OCD', 'Adolescent Mental Health'],
      bio: 'Marcus specializes in trauma-informed care and EMDR therapy. He has worked with adolescents and young adults for over a decade, with a focus on resilience-building.',
      featured: true,
    },
    {
      _type: 'teamMember',
      name: 'Dr. Priya Nair',
      slug: { current: 'dr-priya-nair' },
      role: 'Psychiatrist',
      credentials: 'MD, Board Certified',
      specialties: ['Anxiety & Depression', 'Eating Disorders', 'Substance Use'],
      bio: 'Dr. Nair is a board-certified psychiatrist with expertise in medication management for mood and eating disorders. She trained at UCSF and Johns Hopkins.',
      featured: true,
    },
    {
      _type: 'teamMember',
      name: 'Jordan Wilder, RD',
      slug: { current: 'jordan-wilder' },
      role: 'Registered Dietitian',
      credentials: 'RD, CEDS-S',
      specialties: ['Eating Disorders', 'Family Therapy'],
      bio: 'Jordan is a certified eating disorder specialist dietitian who takes a non-diet, weight-inclusive approach to nutrition therapy.',
      featured: true,
    },
  ]

  // ─── Testimonials ─────────────────────────────────────────────────────────
  const testimonials = [
    {
      _type: 'testimonial',
      quote: "Clarity Health gave me my life back. After two years of struggling with anorexia, I finally found a team that understood me and didn't give up. The virtual format made it possible to stay in treatment through the hardest moments.",
      patientName: 'Emily',
      patientContext: 'Eating disorder recovery, 2 years',
      rating: 5,
      featured: true,
    },
    {
      _type: 'testimonial',
      quote: "I was skeptical about online therapy for OCD, but the ERP program here is better than anything I tried in person. My therapist is incredible and I've reduced my compulsions by 80% in six months.",
      patientName: 'Daniel',
      patientContext: 'OCD treatment, 6 months',
      rating: 5,
      featured: true,
    },
    {
      _type: 'testimonial',
      quote: "As a mom, finding care for my daughter that included our whole family was everything. The family-based treatment approach helped all of us understand her eating disorder, not just her.",
      patientName: 'Maria',
      patientContext: 'Parent of a patient, adolescent program',
      rating: 5,
      featured: true,
    },
    {
      _type: 'testimonial',
      quote: "The combination of therapy and medication management from one coordinated team made all the difference. I don't have to explain my history to a new provider every time.",
      patientName: 'James',
      patientContext: 'Anxiety & depression, ongoing care',
      rating: 5,
      featured: true,
    },
  ]

  // ─── FAQ Items ─────────────────────────────────────────────────────────────
  const faqs = [
    {
      _type: 'faqItem',
      question: 'Does Clarity Health accept insurance?',
      answer: [{ _type: 'block', _key: 'faq1', style: 'normal', children: [{ _type: 'span', _key: 's1', text: "Yes. We work with most major commercial insurance plans including Aetna, Cigna, UnitedHealth, Anthem, and BCBS. We'll verify your benefits before your first appointment so you know exactly what to expect." }] }],
      category: 'Insurance',
      order: 1,
    },
    {
      _type: 'faqItem',
      question: 'How quickly can I get started?',
      answer: [{ _type: 'block', _key: 'faq2', style: 'normal', children: [{ _type: 'span', _key: 's2', text: 'Most patients are matched with a care team within 48 hours of completing their intake assessment. Your first appointment can typically be scheduled within the same week.' }] }],
      category: 'Getting Started',
      order: 1,
    },
    {
      _type: 'faqItem',
      question: 'Is virtual care effective for eating disorders and serious mental health conditions?',
      answer: [{ _type: 'block', _key: 'faq3', style: 'normal', children: [{ _type: 'span', _key: 's3', text: 'Yes. Multiple peer-reviewed studies have demonstrated that virtual delivery of evidence-based treatments — including FBT, CBT-E, and ERP — produces outcomes equivalent to in-person care. Our clinical team uses the same evidence-based protocols as the leading in-person programs.' }] }],
      category: 'Treatment',
      order: 1,
    },
    {
      _type: 'faqItem',
      question: 'How is my health information protected?',
      answer: [{ _type: 'block', _key: 'faq4', style: 'normal', children: [{ _type: 'span', _key: 's4', text: 'Clarity Health is fully HIPAA-compliant. All video sessions are conducted over encrypted connections. We never share your information without your explicit consent, except as required by law.' }] }],
      category: 'Privacy',
      order: 1,
    },
    {
      _type: 'faqItem',
      question: 'What technology do I need?',
      answer: [{ _type: 'block', _key: 'faq5', style: 'normal', children: [{ _type: 'span', _key: 's5', text: 'A smartphone, tablet, or computer with a camera and internet connection is all you need. We support all major browsers and have a dedicated mobile app for iOS and Android.' }] }],
      category: 'Technology',
      order: 1,
    },
  ]

  // ─── Site Settings ─────────────────────────────────────────────────────────
  const settings = {
    _type: 'siteSettings',
    _id: 'siteSettings',
    siteName: 'Clarity Health',
    siteDescription: 'Evidence-based virtual mental health care for anxiety, depression, eating disorders, and trauma.',
    nav: [
      { label: 'Programs', href: '/programs' },
      { label: 'Our Team', href: '/team' },
      { label: 'Resources', href: '/blog' },
      { label: 'About', href: '/about' },
    ],
    footerCta: {
      headline: 'Ready to start your recovery?',
      body: 'Connect with a licensed clinician within 48 hours.',
      buttonLabel: 'Get Started',
      buttonHref: '/get-started',
    },
  }

  // ─── Write to Sanity ───────────────────────────────────────────────────────
  const tx = client.transaction()

  for (const p of programs) tx.createOrReplace({ ...p, _id: `program-${p.slug.current}` })
  for (const m of teamMembers) tx.createOrReplace({ ...m, _id: `team-${m.slug.current}` })
  for (const t of testimonials) tx.createOrReplace({ ...t, _id: `testimonial-${Math.random().toString(36).slice(2, 8)}` })
  for (const f of faqs) tx.createOrReplace({ ...f, _id: `faq-${Math.random().toString(36).slice(2, 8)}` })
  tx.createOrReplace(settings)

  await tx.commit({ autoGenerateArrayKeys: true })
  console.log('✅ Seeded:')
  console.log(`   ${programs.length} programs`)
  console.log(`   ${teamMembers.length} team members`)
  console.log(`   ${testimonials.length} testimonials`)
  console.log(`   ${faqs.length} FAQ items`)
  console.log('   1 site settings document\n')
  console.log('🎉 Done! Open your Sanity Studio to review the content.')
}

seed().catch((err) => {
  console.error('Seed failed:', err.message)
  process.exit(1)
})
