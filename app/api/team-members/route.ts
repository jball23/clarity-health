import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'
import { featuredTeamQuery } from '@/sanity/lib/queries'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

export async function GET() {
  const members = await client.fetch(featuredTeamQuery)
  return NextResponse.json(members)
}
