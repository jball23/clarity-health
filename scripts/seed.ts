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

// ─── Image upload helper ──────────────────────────────────────────────────────
// Fetches an image from a URL and uploads it to Sanity, returning a proper
// image reference that GROQ can resolve via asset->.

type SanityImageRef = { _type: 'image'; asset: { _type: 'reference'; _ref: string } }

async function uploadImage(url: string, filename: string): Promise<SanityImageRef | undefined> {
  try {
    const res = await fetch(url)
    if (!res.ok) return undefined
    const buf = Buffer.from(await res.arrayBuffer())
    const contentType = res.headers.get('content-type') ?? 'image/jpeg'
    const asset = await client.assets.upload('image', buf, { filename, contentType })
    return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
  } catch {
    return undefined
  }
}

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

  // ─── Blog Images ──────────────────────────────────────────────────────────
  // Upload images to Sanity so they become proper assets (resolved by GROQ as asset->).
  console.log('📸 Uploading blog images...')
  const [cbtImage, edImage, teenImage] = await Promise.all([
    uploadImage(
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&h=630&fit=crop&q=80',
      'blog-cbt.jpg',
    ),
    uploadImage(
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=630&fit=crop&q=80',
      'blog-virtual-care.jpg',
    ),
    uploadImage(
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=630&fit=crop&q=80',
      'blog-teen-mental-health.jpg',
    ),
  ])

  // ─── Blog Posts ───────────────────────────────────────────────────────────
  const blogPosts = [
    {
      _id: 'blog-understanding-cbt',
      ...(cbtImage && { mainImage: cbtImage }),
      _type: 'blogPost',
      title: 'How Cognitive Behavioral Therapy Actually Works',
      slug: { current: 'how-cbt-works' },
      publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      author: { _type: 'reference', _ref: 'team-dr-sarah-chen' },
      categories: ['Mental Health', 'Anxiety', 'Depression'],
      excerpt: "CBT is one of the most researched therapies in existence — but what's actually happening in a session? Our clinical director explains the core principles and what to expect.",
      body: [
        { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "Cognitive Behavioral Therapy, or CBT, is one of the most widely studied and consistently effective treatments for anxiety, depression, and a wide range of other mental health conditions. Yet for many people beginning therapy, the inner workings of CBT remain a mystery. How does talking about your thoughts actually change how you feel?" }] },
        { _type: 'block', style: 'h2', children: [{ _type: 'span', text: "The Core Premise: Thoughts, Feelings, and Behaviors Are Linked" }] },
        { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "CBT is built on a deceptively simple insight: the way we interpret events — not the events themselves — determines how we feel and behave. When we're caught in patterns of depression or anxiety, those interpretations tend to be systematically distorted. We catastrophize. We overgeneralize. We mind-read. We discount positives." }] },
        { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "A CBT therapist helps you notice these patterns in real time, then teaches you concrete skills to examine and challenge them. Over time, this restructuring changes not just your thinking but your emotional responses and behaviors as well." }] },
        { _type: 'block', style: 'h2', children: [{ _type: 'span', text: "What Actually Happens in a Session" }] },
        { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "CBT sessions are collaborative and structured — more like working sessions than open-ended conversations. A typical session might begin with a mood check, review of the previous week's homework (yes, CBT has homework), and then focus on a specific situation that triggered distress." }] },
        { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "Your therapist will help you map out the thought-feeling-behavior sequence that occurred: What happened? What went through your mind? How did that thought make you feel? What did you do as a result? This Socratic process — guided discovery — is the engine of CBT. The therapist doesn't tell you your thoughts are wrong; they help you examine the evidence yourself." }] },
        { _type: 'block', style: 'h2', children: [{ _type: 'span', text: "The Research Behind It" }] },
        { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "CBT has been studied in hundreds of randomized controlled trials. For depression and generalized anxiety disorder, it produces outcomes equivalent to medication — with more durable effects after treatment ends. The skills you develop become part of how you think, which means they continue to protect you long after therapy concludes." }] },
        { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "At Clarity Health, CBT forms the foundation of our anxiety and depression program. Our therapists are trained to tailor the approach to your specific patterns, integrating elements from DBT and ACT as clinically indicated." }] },
      ],
    },
    {
      _id: 'blog-virtual-therapy-eating-disorders',
      ...(edImage && { mainImage: edImage }),
      _type: 'blogPost',
      title: 'Virtual Treatment for Eating Disorders: What the Research Says',
      slug: { current: 'virtual-treatment-eating-disorders-research' },
      publishedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
      author: { _type: 'reference', _ref: 'team-dr-sarah-chen' },
      categories: ['Eating Disorders', 'Research'],
      excerpt: 'Skepticism about virtual eating disorder care is understandable — these are serious conditions requiring close clinical monitoring. But the evidence is stronger than most people realize.',
      body: [
        { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "When people first hear about virtual treatment for eating disorders, the reaction is often skepticism. Eating disorders are among the most medically serious psychiatric conditions — how can remote care be adequate? The concern is legitimate, and it deserves a direct, evidence-based answer." }] },
        { _type: 'block', style: 'h2', children: [{ _type: 'span', text: "What the Studies Actually Show" }] },
        { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "The research on telehealth for eating disorders has accelerated significantly since 2020, and the findings are consistent: for patients who are medically stable, virtual delivery of Family-Based Treatment (FBT) and Cognitive Behavioral Therapy for Eating Disorders (CBT-E) produces outcomes equivalent to in-person care." }] },
        { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "A 2022 randomized controlled trial published in the International Journal of Eating Disorders found that patients receiving FBT via telehealth achieved similar weight restoration and behavioral outcomes at 12-month follow-up compared to those receiving in-person FBT. Similar results have been replicated for CBT-E in adult populations with bulimia nervosa and binge eating disorder." }] },
        { _type: 'block', style: 'h2', children: [{ _type: 'span', text: "The Real Advantage of Virtual Care" }] },
        { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "Beyond equivalent outcomes, virtual care offers several genuine advantages for this population. Geographic access is the most obvious: specialized eating disorder programs are concentrated in major urban centers, leaving patients in rural and suburban areas with no realistic treatment options. Virtual care eliminates that barrier entirely." }] },
        { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "Family involvement is another area where telehealth often outperforms in-person care. FBT requires parents to be active participants in treatment — and coordinating in-person sessions around work schedules is a genuine barrier that virtual care removes. Our data shows higher caregiver session attendance in virtual FBT compared to in-person programs." }] },
        { _type: 'block', style: 'h2', children: [{ _type: 'span', text: "When In-Person Care Is Necessary" }] },
        { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "Virtual care is not appropriate for all patients. Medical instability, active suicidality, or lack of a safe home environment are indicators for higher levels of care — residential or PHP. Our clinical team conducts thorough assessments and maintains active medical monitoring for all virtual eating disorder patients. We have clear protocols for stepping up care when needed." }] },
      ],
    },
    {
      _id: 'blog-supporting-teen-mental-health',
      ...(teenImage && { mainImage: teenImage }),
      _type: 'blogPost',
      title: "Supporting Your Teenager's Mental Health: A Guide for Parents",
      slug: { current: 'supporting-teen-mental-health-parents-guide' },
      publishedAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
      author: { _type: 'reference', _ref: 'team-marcus-rivera' },
      categories: ['Family Support', 'Mental Health'],
      excerpt: "Watching your teenager struggle is one of the hardest experiences a parent can face. Knowing when to step in — and how — makes all the difference.",
      body: [
        { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "The teenage years are developmentally turbulent even under ideal circumstances. Adolescents are navigating identity formation, social complexity, academic pressure, and the beginnings of adult autonomy — all while their prefrontal cortex is still years from full development. For parents, distinguishing normal developmental stress from something that warrants clinical attention is genuinely difficult." }] },
        { _type: 'block', style: 'h2', children: [{ _type: 'span', text: "Warning Signs That Go Beyond 'Normal Teen Stuff'" }] },
        { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "Duration and intensity are your best guides. Moodiness is normal; a persistently low or irritable mood lasting more than two weeks is not. Social withdrawal is common; complete disengagement from friends, family, and activities that used to bring joy is a flag. Changes in sleep, appetite, and academic performance — particularly sudden or dramatic changes — warrant attention." }] },
        { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "Any expression of hopelessness, worthlessness, or talk of not wanting to be alive requires immediate action. These are not phases. Do not wait to see if things improve on their own." }] },
        { _type: 'block', style: 'h2', children: [{ _type: 'span', text: "How to Start the Conversation" }] },
        { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "Timing matters. Don't try to talk when tensions are high or when your teen is on the defensive. Car rides — side by side rather than face to face — remove some of the intensity. Lead with observation rather than accusation: \"I've noticed you seem really tired lately\" lands very differently than \"You've been so withdrawn.\"" }] },
        { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "Listen without immediately pivoting to problem-solving. Teenagers often just need to feel heard before they can accept help. Resist the urge to minimize (\"It's not that bad\") or catastrophize (\"I can't believe this is happening\"). Regulate yourself first — your teen is reading your emotional state as much as your words." }] },
        { _type: 'block', style: 'h2', children: [{ _type: 'span', text: "What Treatment Actually Looks Like" }] },
        { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "Effective adolescent mental health care almost always involves the family. Individual therapy alone, while useful, is rarely sufficient when a teenager is struggling. Family-based approaches — where parents are active participants, not just drop-off drivers — consistently produce better outcomes. At Clarity Health, our adolescent program includes dedicated parent coaching sessions alongside individual teen therapy, because we know that recovery happens in the context of relationships." }] },
      ],
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
  for (const b of blogPosts) tx.createOrReplace(b)
  tx.createOrReplace(settings)

  await tx.commit({ autoGenerateArrayKeys: true })
  console.log('✅ Seeded:')
  console.log(`   ${programs.length} programs`)
  console.log(`   ${teamMembers.length} team members`)
  console.log(`   ${testimonials.length} testimonials`)
  console.log(`   ${faqs.length} FAQ items`)
  console.log(`   ${blogPosts.length} blog posts`)
  console.log('   1 site settings document\n')
  console.log('🎉 Done! Open your Sanity Studio to review the content.')
}

seed().catch((err) => {
  console.error('Seed failed:', err.message)
  process.exit(1)
})
