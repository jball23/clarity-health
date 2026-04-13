import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
const apiVersion = '2024-01-01'

const fetchClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  stega: {
    studioUrl: '/studio',
    enabled: process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview',
  },
})

interface SanityFetchOptions {
  query: string
  params?: Record<string, unknown>
  revalidate?: number
}

export async function sanityFetch<T>({ query, params = {}, revalidate = 30 }: SanityFetchOptions): Promise<{ data: T }> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = await (fetchClient as any).fetch(query, params, { next: { revalidate } }) as T
  return { data }
}

/** Placeholder — real-time preview requires next-sanity v13+ defineLive */
export function SanityLive() {
  return null
}
