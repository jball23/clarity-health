import { defineQuery } from 'next-sanity'

// ─── Programs ────────────────────────────────────────────────────────────────

export const allProgramsQuery = defineQuery(`
  *[_type == "program"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    features,
    ctaLabel,
    icon { asset->{ url } }
  }
`)

export const programBySlugQuery = defineQuery(`
  *[_type == "program" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    description,
    features,
    ctaLabel,
    icon { asset->{ url } }
  }
`)

// ─── Team Members ─────────────────────────────────────────────────────────────

export const featuredTeamQuery = defineQuery(`
  *[_type == "teamMember" && featured == true] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    role,
    credentials,
    specialties,
    photo { asset->{ url }, hotspot, crop }
  }
`)

export const allTeamQuery = defineQuery(`
  *[_type == "teamMember"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    role,
    credentials,
    specialties,
    bio,
    photo { asset->{ url }, hotspot, crop }
  }
`)

// ─── Testimonials ─────────────────────────────────────────────────────────────

export const featuredTestimonialsQuery = defineQuery(`
  *[_type == "testimonial" && featured == true] {
    _id,
    quote,
    patientName,
    patientContext,
    rating
  }
`)

// ─── FAQ ──────────────────────────────────────────────────────────────────────

export const faqByCategoryQuery = defineQuery(`
  *[_type == "faqItem" && ($category == "" || category == $category)] | order(order asc) {
    _id,
    question,
    answer,
    category
  }
`)

// ─── Blog ─────────────────────────────────────────────────────────────────────

export const recentBlogPostsQuery = defineQuery(`
  *[_type == "blogPost"] | order(publishedAt desc) [0...3] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    categories,
    mainImage { asset->{ url }, hotspot, crop },
    author->{ name, role, photo { asset->{ url } } }
  }
`)

export const allBlogPostsQuery = defineQuery(`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    categories,
    mainImage { asset->{ url }, hotspot, crop },
    author->{ name, role, photo { asset->{ url } } }
  }
`)

export const blogPostBySlugQuery = defineQuery(`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    body,
    categories,
    mainImage { asset->{ url }, hotspot, crop },
    author->{ name, role, credentials, photo { asset->{ url } } },
    seo
  }
`)

// ─── Site Settings ────────────────────────────────────────────────────────────

export const siteSettingsQuery = defineQuery(`
  *[_type == "siteSettings"][0] {
    siteName,
    siteDescription,
    logo { asset->{ url } },
    nav,
    footerCta,
    socialLinks
  }
`)
