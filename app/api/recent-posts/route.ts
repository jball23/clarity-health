import { NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'
import { recentBlogPostsQuery } from '@/sanity/lib/queries'

export async function GET() {
  const posts = await client.fetch(recentBlogPostsQuery)
  return NextResponse.json(posts)
}
