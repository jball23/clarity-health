import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatedSection } from '@/components/code-components/AnimatedSection'
import { sanityFetch } from '@/sanity/lib/live'
import { allBlogPostsQuery } from '@/sanity/lib/queries'
import type { SanityBlogPost } from '@/sanity/lib/types'

export const metadata: Metadata = {
  title: 'Resources',
  description: 'Mental health articles, research, and practical guidance from our clinical team.',
}

export default async function BlogPage() {
  const { data: posts } = await sanityFetch<SanityBlogPost[]>({ query: allBlogPostsQuery })

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <AnimatedSection>
        <h1 className="text-4xl font-bold text-gray-900">Resources</h1>
        <p className="mt-3 max-w-xl text-lg text-gray-500">
          Evidence-based guidance from our clinical team.
        </p>
      </AnimatedSection>

      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {(posts ?? []).map((post: SanityBlogPost, i: number) => (
          <AnimatedSection key={post._id} delay={i * 0.06}>
            <Link href={`/blog/${post.slug}`} className="group block overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
              {post.mainImage?.asset.url && (
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={post.mainImage.asset.url}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-5">
                {post.categories?.[0] && (
                  <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-wider text-[#007F79]">
                    {post.categories[0]}
                  </span>
                )}
                <h2 className="text-base font-semibold text-gray-900 group-hover:text-[#007F79] transition-colors">
                  {post.title}
                </h2>
                <p className="mt-2 line-clamp-2 text-sm text-gray-500">{post.excerpt}</p>
                <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                  {post.author?.photo?.asset.url && (
                    <Image src={post.author.photo.asset.url} alt={post.author.name} width={20} height={20} className="rounded-full" />
                  )}
                  <span>{post.author?.name}</span>
                  <span>·</span>
                  <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </div>
            </Link>
          </AnimatedSection>
        ))}
      </div>

      {(!posts || posts.length === 0) && (
        <p className="mt-20 text-center text-gray-400">No posts yet — check back soon.</p>
      )}
    </div>
  )
}
