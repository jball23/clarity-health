export interface SanityImageAsset {
  asset: { url: string }
  hotspot?: { x: number; y: number }
  crop?: { top: number; bottom: number; left: number; right: number }
}

export interface SanityProgram {
  _id: string
  title: string
  slug: string
  shortDescription: string
  features?: string[]
  ctaLabel?: string
  icon?: SanityImageAsset
}

export interface SanityTeamMember {
  _id: string
  name: string
  slug: string
  role: string
  credentials?: string
  specialties?: string[]
  bio?: string
  photo?: SanityImageAsset
}

export interface SanityTestimonial {
  _id: string
  quote: string
  patientName: string
  patientContext?: string
  rating?: number
}

export interface SanityFAQItem {
  _id: string
  question: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  answer: any[]
  category: string
}

export interface SanityBlogPost {
  _id: string
  title: string
  slug: string
  publishedAt: string
  excerpt: string
  categories?: string[]
  mainImage?: SanityImageAsset
  author?: Pick<SanityTeamMember, 'name' | 'role' | 'credentials'> & { photo?: SanityImageAsset }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any[]
  seo?: {
    metaTitle?: string
    metaDescription?: string
    ogImage?: SanityImageAsset
  }
}

export interface SanityNavLink {
  label: string
  href: string
}

export interface SanityFooterCta {
  headline?: string
  body?: string
  buttonLabel?: string
  buttonHref?: string
}

export interface SanitySiteSettings {
  siteName?: string
  siteDescription?: string
  logo?: SanityImageAsset
  nav?: SanityNavLink[]
  footerCta?: SanityFooterCta
  socialLinks?: {
    twitter?: string
    linkedin?: string
    instagram?: string
  }
}
