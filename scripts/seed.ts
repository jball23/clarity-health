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

  // ─── Image uploads ────────────────────────────────────────────────────────
  // All uploads run in parallel before building the documents that reference them.
  console.log('📸 Uploading images...')
  const [
    sarahPhoto, marcusPhoto, priyaPhoto, jordanPhoto,
    cbtImage, edImage, teenImage, mindfulImage, clinicalImage, wellnessImage,
  ] = await Promise.all([
    uploadImage('https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=600&fit=crop&q=80', 'headshot-sarah-chen.jpg'),
    uploadImage('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&q=80', 'headshot-marcus-rivera.jpg'),
    uploadImage('https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&h=600&fit=crop&q=80', 'headshot-priya-nair.jpg'),
    uploadImage('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=600&fit=crop&q=80', 'headshot-jordan-wilder.jpg'),
    uploadImage('https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&h=630&fit=crop&q=80', 'blog-cbt.jpg'),
    uploadImage('https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=630&fit=crop&q=80', 'blog-virtual-care.jpg'),
    uploadImage('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=630&fit=crop&q=80', 'blog-teen-mental-health.jpg'),
    uploadImage('https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&h=630&fit=crop&q=80', 'blog-mindfulness.jpg'),
    uploadImage('https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=1200&h=630&fit=crop&q=80', 'blog-clinical.jpg'),
    uploadImage('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=630&fit=crop&q=80', 'blog-wellness.jpg'),
  ])

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
      ...(sarahPhoto && { photo: sarahPhoto }),
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
      ...(marcusPhoto && { photo: marcusPhoto }),
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
      ...(priyaPhoto && { photo: priyaPhoto }),
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
      ...(jordanPhoto && { photo: jordanPhoto }),
    },
  ]

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
    {
      _id: 'blog-what-to-expect-first-therapy',
      ...(cbtImage && { mainImage: cbtImage }),
      _type: 'blogPost',
      title: 'What to Expect in Your First Therapy Session',
      slug: { current: 'what-to-expect-first-therapy-session' },
      publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      author: { _type: 'reference', _ref: 'team-dr-sarah-chen' },
      categories: ['Mental Health', 'Getting Started'],
      excerpt: "Starting therapy is a significant step. Knowing what to expect from that first session can make the difference between walking in with dread and walking in with readiness.",
      body: [
        { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "For many people, the first therapy session carries a weight of uncertainty. Will I be judged? Do I have to talk about everything right away? What if I don't know what's wrong? These are reasonable questions, and the honest answer is that a good first session is primarily about establishing safety — not solving everything at once." }] },
        { _type: 'block', style: 'h2', children: [{ _type: 'span', text: "The Intake Process" }] },
        { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "Your therapist will spend much of the first session gathering background information. Where are you coming from? What's bringing you in now, rather than six months ago or six months from now? What have you tried before? This isn't interrogation — it's the clinician building a map of your experience so they can be genuinely useful to you." }] },
        { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "You don't have to have a perfectly articulated problem statement. \"I just know something isn't right\" is a completely valid starting point. You also don't have to disclose everything immediately. Pacing is yours to control. A good therapist will follow your lead." }] },
        { _type: 'block', style: 'h2', children: [{ _type: 'span', text: "What Makes a Good Fit" }] },
        { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "Research consistently shows that the therapeutic relationship — the quality of the connection between you and your therapist — is one of the strongest predictors of outcome. It matters more than the specific modality used. If after two or three sessions you don't feel heard, safe, or understood, that's important data. It may mean adjusting the approach, or it may mean finding a different clinician. Staying in a poor fit out of politeness doesn't serve your recovery." }] },
      ],
    },
    {
      _id: 'blog-ocd-myths-and-facts',
      ...(mindfulImage && { mainImage: mindfulImage }),
      _type: 'blogPost',
      title: 'OCD: Separating Myth from Clinical Reality',
      slug: { current: 'ocd-myths-clinical-reality' },
      publishedAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
      author: { _type: 'reference', _ref: 'team-marcus-rivera' },
      categories: ['OCD', 'Mental Health'],
      excerpt: 'OCD is one of the most misunderstood conditions in mental health. The pop-culture version — neat desks and color-coded closets — has almost nothing to do with the clinical reality.',
      body: [
        { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "When people say \"I'm so OCD\" about their preference for a clean workspace, they're describing a personality trait. When clinicians talk about OCD, they're describing a condition characterized by intrusive, unwanted thoughts (obsessions) and repetitive behaviors performed to neutralize the anxiety those thoughts create (compulsions). The gap between colloquial use and clinical reality is enormous — and it costs people real access to care." }] },
        { _type: 'block', style: 'h2', children: [{ _type: 'span', text: "What OCD Actually Looks Like" }] },
        { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "OCD presents in many forms that have nothing to do with cleanliness or orderliness. Intrusive thoughts about harming loved ones — despite having no desire to do so. Obsessive doubt about whether you've hurt someone. Religious or moral scrupulosity. Fear of contaminating others with illness. Sexual intrusive thoughts that are deeply ego-dystonic. These presentations are common, often hidden due to shame, and frequently misdiagnosed." }] },
        { _type: 'block', style: 'h2', children: [{ _type: 'span', text: "Why ERP Works" }] },
        { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "Exposure and Response Prevention (ERP) is the gold-standard treatment for OCD — not because it makes the thoughts go away, but because it teaches the brain that the anxiety will pass without performing the compulsion. Each exposure that is tolerated without a compulsion weakens the obsession-compulsion cycle. This is uncomfortable work. It is also reliably effective, with response rates of 60–80% in well-controlled trials." }] },
      ],
    },
    {
      _id: 'blog-emdr-for-trauma',
      ...(cbtImage && { mainImage: cbtImage }),
      _type: 'blogPost',
      title: "How EMDR Works: A Clinician's Explanation",
      slug: { current: 'how-emdr-works-clinician-explanation' },
      publishedAt: new Date(Date.now() - 42 * 24 * 60 * 60 * 1000).toISOString(),
      author: { _type: 'reference', _ref: 'team-marcus-rivera' },
      categories: ['Trauma', 'Treatment'],
      excerpt: "EMDR has an unusual name and an unusual method. Many patients are skeptical before they try it. Here's what's actually happening neurologically — and why it works for trauma when talk therapy alone doesn't.",
      body: [
        { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "Eye Movement Desensitization and Reprocessing — EMDR — sounds like something from science fiction. Bilateral eye movements? Tapping? How does any of that relate to trauma processing? The skepticism is understandable. The evidence, however, is substantial. EMDR is recognized by the WHO, the APA, and the Department of Veterans Affairs as a first-line treatment for PTSD." }] },
        { _type: 'block', style: 'h2', children: [{ _type: 'span', text: "The Mechanism: Memory Reconsolidation" }] },
        { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "Traumatic memories are stored differently than ordinary memories. Instead of being integrated into narrative memory — where you know the event happened but it feels like the past — they're stored with the original emotional charge intact. Something triggers the memory and you're flooded with the fear, shame, or helplessness of the original moment. EMDR works by activating these memories while simultaneously engaging in bilateral stimulation, which appears to engage the brain's natural memory reconsolidation process. The memory is held in working memory while being reprocessed, gradually losing its charge." }] },
        { _type: 'block', style: 'h2', children: [{ _type: 'span', text: "What a Session Feels Like" }] },
        { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "EMDR sessions are structured but not formulaic. Your therapist will help you identify a target memory, the negative belief it carries (\"I am powerless\"), the body sensation associated with it, and a positive belief you'd prefer to hold (\"I have survived and I am safe\"). The bilateral stimulation — following a moving finger, listening to alternating tones, or feeling taps on alternating hands — is then applied while you hold the memory loosely in mind. Many patients report that the emotional intensity of the memory decreases markedly over the course of a single session." }] },
      ],
    },
    {
      _id: 'blog-medication-and-therapy',
      ...(clinicalImage && { mainImage: clinicalImage }),
      _type: 'blogPost',
      title: 'Medication and Therapy Together: Why the Combination Works',
      slug: { current: 'medication-therapy-combination-mental-health' },
      publishedAt: new Date(Date.now() - 56 * 24 * 60 * 60 * 1000).toISOString(),
      author: { _type: 'reference', _ref: 'team-dr-priya-nair' },
      categories: ['Treatment', 'Mental Health'],
      excerpt: "The question isn't usually medication or therapy — it's how they work together. A psychiatrist explains the evidence for combined treatment and when each approach is most valuable.",
      body: [
        { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "One of the most persistent false choices in mental health is the one between medication and therapy. Patients often come in asking which they need, as if the two exist in competition. The clinical reality is that for most moderate-to-severe presentations, the combination outperforms either alone — and understanding why can help you engage more actively with your own treatment." }] },
        { _type: 'block', style: 'h2', children: [{ _type: 'span', text: "What Medication Does — and Doesn't Do" }] },
        { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "Psychiatric medication doesn't fix your life or change your personality. What it can do is reduce the intensity of symptoms enough that you can engage productively in therapy. For someone with severe depression, the cognitive effort required for CBT exercises may be genuinely impossible without first reducing the biological burden. Medication can lower the floor. Therapy builds the ceiling." }] },
        { _type: 'block', style: 'h2', children: [{ _type: 'span', text: "The Evidence for Combined Treatment" }] },
        { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "For major depressive disorder, multiple meta-analyses show that combined treatment produces remission rates significantly higher than either medication or psychotherapy alone. For anxiety disorders, combined approaches are particularly durable — the skills built in therapy persist after medication is tapered, reducing relapse risk. At Clarity Health, our psychiatrists and therapists collaborate directly, sharing clinical notes and aligning treatment goals, so medication decisions are always made in the context of the full clinical picture." }] },
      ],
    },
    {
      _id: 'blog-what-is-arfid',
      ...(edImage && { mainImage: edImage }),
      _type: 'blogPost',
      title: 'ARFID: When Picky Eating Is Something More',
      slug: { current: 'arfid-beyond-picky-eating' },
      publishedAt: new Date(Date.now() - 63 * 24 * 60 * 60 * 1000).toISOString(),
      author: { _type: 'reference', _ref: 'team-jordan-wilder' },
      categories: ['Eating Disorders', 'Family Support'],
      excerpt: "Avoidant/Restrictive Food Intake Disorder is often dismissed as fussiness — especially in children. But ARFID is a recognized eating disorder with real nutritional consequences and effective treatments.",
      body: [
        { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "Most children go through phases of food selectivity. ARFID is different. Avoidant/Restrictive Food Intake Disorder is characterized by persistent avoidance of foods based on sensory characteristics, fear of aversive consequences (choking, vomiting), or low interest in eating — to a degree that causes significant nutritional deficiency, weight loss, dependence on supplements, or interference with psychosocial functioning." }] },
        { _type: 'block', style: 'h2', children: [{ _type: 'span', text: "How ARFID Differs from Other Eating Disorders" }] },
        { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "Unlike anorexia or bulimia, ARFID is not driven by body image concerns. There's no distorted perception of weight or shape, no pursuit of thinness. The avoidance is driven by sensory hypersensitivity, anxiety about physical consequences, or genuine lack of interest in food. This distinction matters enormously for treatment: an approach designed for anorexia will not work for ARFID." }] },
        { _type: 'block', style: 'h2', children: [{ _type: 'span', text: "Effective Treatment Approaches" }] },
        { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "Treatment for ARFID typically involves a multidisciplinary team: a dietitian to address nutritional rehabilitation and systematically expand the safe foods list, a therapist (often using CBT-AR, a modification of CBT specifically for ARFID), and when relevant, a physician for medical monitoring. Family involvement is critical, particularly for pediatric presentations — parents and caregivers are active participants in exposure hierarchies and meal support. At Clarity Health, our dietitians specialize in ARFID and work closely with our clinical team to create individualized treatment plans." }] },
      ],
    },
    {
      _id: 'blog-nutrition-mental-health',
      ...(edImage && { mainImage: edImage }),
      _type: 'blogPost',
      title: "The Gut-Brain Connection: Nutrition's Role in Mental Health",
      slug: { current: 'nutrition-role-in-mental-health' },
      publishedAt: new Date(Date.now() - 77 * 24 * 60 * 60 * 1000).toISOString(),
      author: { _type: 'reference', _ref: 'team-jordan-wilder' },
      categories: ['Mental Health', 'Nutrition'],
      excerpt: "The relationship between what we eat and how we feel is more direct than most people realize. Here's what the emerging science on the gut-brain axis actually says — and what it means for your care.",
      body: [
        { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "The idea that nutrition affects mental health has moved from wellness culture into mainstream psychiatry over the past decade. The gut-brain axis — the bidirectional communication network between the gastrointestinal system and the central nervous system — is a legitimate area of clinical research, and the findings are beginning to inform how we approach treatment for depression, anxiety, and eating disorders." }] },
        { _type: 'block', style: 'h2', children: [{ _type: 'span', text: "What the Research Actually Shows" }] },
        { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "The evidence is more nuanced than popular headlines suggest. We know that approximately 90% of serotonin is produced in the gut, and that gut microbiome composition influences neurotransmitter availability. A 2017 randomized controlled trial (the SMILES trial) found that a dietary intervention for major depression produced remission rates more than double those of social support alone. These are meaningful findings — but they're a beginning, not a conclusion." }] },
        { _type: 'block', style: 'h2', children: [{ _type: 'span', text: "A Non-Diet Approach to Nutritional Mental Health" }] },
        { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "In eating disorder treatment, nutritional work must be handled with particular care. A weight-inclusive, non-diet approach avoids reinforcing the food morality and dietary restriction that often underlie disordered eating. The goal is adequacy and variety — ensuring the body and brain have sufficient fuel — not optimization or control. Our registered dietitians bring this lens to every patient interaction." }] },
      ],
    },
    {
      _id: 'blog-building-support-system',
      ...(wellnessImage && { mainImage: wellnessImage }),
      _type: 'blogPost',
      title: 'Building a Support System During Mental Health Recovery',
      slug: { current: 'building-support-system-mental-health-recovery' },
      publishedAt: new Date(Date.now() - 91 * 24 * 60 * 60 * 1000).toISOString(),
      author: { _type: 'reference', _ref: 'team-dr-sarah-chen' },
      categories: ['Mental Health', 'Recovery'],
      excerpt: "Recovery doesn't happen in isolation. But building the right support system — people who help rather than enable, who understand without overstepping — is a skill that takes intention.",
      body: [
        { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "The research on social connection and mental health is unambiguous: isolation worsens outcomes and support accelerates recovery. But \"support\" is not a monolithic thing. The wrong kind of support — overly protective, dismissive, or unwittingly enabling — can undermine treatment. Building a functional support system requires intentionality about who is in it and what role each person plays." }] },
        { _type: 'block', style: 'h2', children: [{ _type: 'span', text: "What Helpful Support Actually Looks Like" }] },
        { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "Helpful support is attuned rather than prescriptive. It follows the patient's lead on how much to share and when. It holds hope without dismissing difficulty — the difference between \"you're going to be fine\" (which can feel like minimizing) and \"I'm here, and I believe you can get through this\" (which validates the struggle while expressing confidence). Supportive people also understand the limits of their role: they are not therapists, and trying to be one often backfires." }] },
        { _type: 'block', style: 'h2', children: [{ _type: 'span', text: "When to Involve Your Treatment Team" }] },
        { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "At Clarity Health, we actively involve family members and close supports in treatment where clinically appropriate and where the patient consents. Family psychoeducation — helping loved ones understand what recovery looks like, what language is helpful, and how to respond to symptoms — is a formal part of many of our programs. If someone in your life wants to help but doesn't know how, that's something we can work on together." }] },
      ],
    },
    {
      _id: 'blog-managing-anxiety-work',
      ...(mindfulImage && { mainImage: mindfulImage }),
      _type: 'blogPost',
      title: 'Managing Anxiety in the Workplace',
      slug: { current: 'managing-anxiety-workplace' },
      publishedAt: new Date(Date.now() - 105 * 24 * 60 * 60 * 1000).toISOString(),
      author: { _type: 'reference', _ref: 'team-marcus-rivera' },
      categories: ['Anxiety', 'Mental Health'],
      excerpt: "Workplace anxiety is among the most common presenting concerns in outpatient therapy. These are practical, evidence-based strategies that actually help — not just \"breathe deeply\" advice.",
      body: [
        { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "Anxiety at work shows up differently for different people. For some it's performance anxiety before presentations. For others it's chronic dread on Sunday nights, an inability to delegate without spiraling, or rumination about a comment made in a meeting two weeks ago. What these experiences share is that anxiety hijacks cognitive resources at exactly the moments you need them most." }] },
        { _type: 'block', style: 'h2', children: [{ _type: 'span', text: "What Works: The Evidence" }] },
        { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "The most evidence-supported skill for acute anxiety is controlled breathing — specifically, extending the exhale to activate the parasympathetic nervous system. A 4-count inhale, 6–8 count exhale, repeated for 2 minutes, produces measurable changes in heart rate variability. This isn't soft advice. It's physiology. Beyond acute management, cognitive restructuring — specifically, examining the evidence for and against anxious predictions — reduces the frequency and intensity of anxiety over time." }] },
        { _type: 'block', style: 'h2', children: [{ _type: 'span', text: "When Coping Skills Aren't Enough" }] },
        { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "Coping skills manage symptoms; they don't address the underlying anxiety disorder. If workplace anxiety is significantly impairing your performance, relationships, or quality of life, that's a signal that coping skills alone won't be sufficient. Structured treatment — CBT, often combined with medication evaluation — is substantially more effective than self-management for clinical anxiety. Seeking treatment is not a sign of weakness; it's recognizing that your brain needs more than willpower to change." }] },
      ],
    },
    {
      _id: 'blog-sleep-mental-health',
      ...(wellnessImage && { mainImage: wellnessImage }),
      _type: 'blogPost',
      title: 'Sleep and Mental Health: The Bidirectional Relationship',
      slug: { current: 'sleep-mental-health-bidirectional-relationship' },
      publishedAt: new Date(Date.now() - 119 * 24 * 60 * 60 * 1000).toISOString(),
      author: { _type: 'reference', _ref: 'team-dr-priya-nair' },
      categories: ['Mental Health', 'Treatment'],
      excerpt: "Poor sleep worsens almost every psychiatric condition. Psychiatric conditions worsen sleep. Breaking this cycle is one of the highest-leverage interventions in mental health treatment.",
      body: [
        { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "Sleep and mental health exist in a bidirectional relationship so tight that it's often difficult to determine which came first. Insomnia is both a symptom and a risk factor for depression. Anxiety disrupts sleep architecture, reducing restorative slow-wave sleep. Sleep deprivation amplifies emotional reactivity and impairs the prefrontal regulation needed to use the coping skills learned in therapy. Understanding this cycle is the first step to breaking it." }] },
        { _type: 'block', style: 'h2', children: [{ _type: 'span', text: "CBT for Insomnia (CBT-I)" }] },
        { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "CBT-I is now the first-line treatment recommendation for chronic insomnia, ahead of sleep medication. It works by addressing the thoughts and behaviors that perpetuate insomnia — specifically, the conditioned arousal that turns the bed into a place associated with wakefulness and anxiety rather than sleep. Core components include sleep restriction (counterintuitively effective), stimulus control, and cognitive restructuring of catastrophic thoughts about sleeplessness. Outcomes are durable and don't carry medication side effects or dependence risk." }] },
        { _type: 'block', style: 'h2', children: [{ _type: 'span', text: "Sleep as a Treatment Target" }] },
        { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "At Clarity Health, we assess sleep in every intake and treat it as a first-class clinical concern rather than a secondary symptom to address after the \"real\" problem. In eating disorder recovery, sleep restoration often tracks closely with nutritional rehabilitation — the body uses sleep to repair and regulate, and adequate nutrition is required for normal sleep architecture. In trauma, nightmares and hypervigilance require targeted interventions including Image Rehearsal Therapy alongside primary trauma treatment." }] },
      ],
    },
    {
      _id: 'blog-understanding-dbt',
      ...(mindfulImage && { mainImage: mindfulImage }),
      _type: 'blogPost',
      title: 'DBT Explained: Skills for When Emotions Feel Overwhelming',
      slug: { current: 'dbt-skills-emotional-regulation' },
      publishedAt: new Date(Date.now() - 133 * 24 * 60 * 60 * 1000).toISOString(),
      author: { _type: 'reference', _ref: 'team-marcus-rivera' },
      categories: ['Treatment', 'Mental Health'],
      excerpt: "Dialectical Behavior Therapy was developed for people who feel emotions intensely. It's one of the most skill-dense therapies in existence — here's what you'd actually learn.",
      body: [
        { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "Dialectical Behavior Therapy was developed by Marsha Linehan in the late 1980s, initially for borderline personality disorder. Since then, it's been adapted and shown effective for eating disorders, depression, PTSD, and any presentation characterized by emotional dysregulation — difficulty tolerating distress, intense mood swings, impulsive behavior. The core insight of DBT is dialectical: you can accept yourself as you are right now while also working to change." }] },
        { _type: 'block', style: 'h2', children: [{ _type: 'span', text: "The Four Skill Modules" }] },
        { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "DBT teaches four categories of skills. Mindfulness — the foundation for all others — is the practice of observing your experience without judgment and without being swept away by it. Distress Tolerance provides crisis survival skills: getting through a moment of acute suffering without making it worse. Emotion Regulation teaches you to understand what emotions are, what triggers them, and how to reduce vulnerability and shift states. Interpersonal Effectiveness provides skills for asking for what you need and maintaining self-respect in relationships." }] },
        { _type: 'block', style: 'h2', children: [{ _type: 'span', text: "Who Benefits Most" }] },
        { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "DBT is particularly valuable for people who have tried standard CBT and found it insufficient — often because the emotional intensity is too high to use purely cognitive approaches during crisis moments. The skills taught in DBT are practical and concrete: TIPP for physiological crisis management, PLEASE for reducing emotional vulnerability, DEAR MAN for interpersonal requests. These are teachable, trainable, and effective — not just in therapy, but in daily life." }] },
      ],
    },
    {
      _id: 'blog-when-to-seek-help',
      ...(clinicalImage && { mainImage: clinicalImage }),
      _type: 'blogPost',
      title: 'When to Seek Professional Help: A Clinical Framework',
      slug: { current: 'when-to-seek-mental-health-help' },
      publishedAt: new Date(Date.now() - 147 * 24 * 60 * 60 * 1000).toISOString(),
      author: { _type: 'reference', _ref: 'team-dr-sarah-chen' },
      categories: ['Mental Health', 'Getting Started'],
      excerpt: "The most common barrier to treatment isn't cost or access — it's uncertainty about whether what you're experiencing \"counts.\" Here's a clinical answer to that question.",
      body: [
        { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "One of the most common things I hear from patients is that they waited years before seeking care because they weren't sure they were \"sick enough.\" They compared their struggles to others who seemed worse off, minimized their own experience, and convinced themselves to wait and see. By the time they arrived in my office, they had often lost years of functioning — and years of their lives — to a condition that was treatable from the start." }] },
        { _type: 'block', style: 'h2', children: [{ _type: 'span', text: "The Clinical Standard: Impairment and Duration" }] },
        { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "The clinical threshold for a mental health condition isn't a specific type of symptom — it's whether symptoms cause significant impairment in functioning and have persisted long enough to rule out transient stress responses. Impairment means your ability to work, maintain relationships, care for yourself, or experience pleasure has been meaningfully affected. Two weeks is the standard duration threshold for many diagnoses, though many conditions warrant earlier intervention." }] },
        { _type: 'block', style: 'h2', children: [{ _type: 'span', text: "You Don't Have to Be in Crisis" }] },
        { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "Mental health treatment is not reserved for emergencies. The analogy I use is cardiovascular health: you don't wait for a heart attack to address high blood pressure. Early intervention consistently produces better outcomes, shorter treatment duration, and lower risk of relapse. If something feels persistently wrong — even if you can't name it precisely — that's reason enough to seek an evaluation. An intake assessment costs you an hour. Untreated anxiety or depression can cost you years." }] },
      ],
    },
    {
      _id: 'blog-talking-to-your-doctor',
      ...(clinicalImage && { mainImage: clinicalImage }),
      _type: 'blogPost',
      title: 'How to Talk to Your Doctor About Mental Health',
      slug: { current: 'talking-to-your-doctor-about-mental-health' },
      publishedAt: new Date(Date.now() - 161 * 24 * 60 * 60 * 1000).toISOString(),
      author: { _type: 'reference', _ref: 'team-dr-priya-nair' },
      categories: ['Mental Health', 'Getting Started'],
      excerpt: "Primary care visits are often the first place mental health concerns surface — and the first place they get missed. Here's how to have a more productive conversation with your doctor.",
      body: [
        { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "Most people who receive mental health treatment are first identified in a primary care setting. And most mental health conditions in primary care go undetected — not because physicians don't care, but because visits are short, presenting concerns are often physical, and patients frequently don't know how to raise psychological symptoms in a medical context. Closing that gap is a shared responsibility." }] },
        { _type: 'block', style: 'h2', children: [{ _type: 'span', text: "How to Raise the Topic" }] },
        { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "The most effective approach is direct and specific. \"I've been struggling with anxiety\" will get more traction than waiting for your doctor to notice. Describe functional impact — \"I haven't been able to sleep more than four hours and I've missed two weeks of work\" — because that gives your physician measurable data to work with. Come prepared with a list: when symptoms started, what makes them better or worse, what you've already tried, and what you're hoping to understand or get help with." }] },
        { _type: 'block', style: 'h2', children: [{ _type: 'span', text: "Navigating Referrals and Next Steps" }] },
        { _type: 'block', style: 'normal', children: [{ _type: 'span', text: "Primary care physicians can prescribe psychiatric medication and screen for common conditions, but for specialized treatment — therapy, eating disorder care, OCD treatment — a referral to a mental health specialist is usually appropriate. If you leave an appointment without a clear next step, it's appropriate to call back and ask. Be your own advocate. The system requires it, and you deserve care that actually addresses what you're experiencing." }] },
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
