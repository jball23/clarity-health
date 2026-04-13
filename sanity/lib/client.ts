import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
const apiVersion = '2024-01-01'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  stega: {
    studioUrl: '/studio',
    enabled: process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview',
  },
})

// Draft-mode client — uses read token, bypasses CDN
export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
  stega: {
    studioUrl: '/studio',
    enabled: true,
  },
})
