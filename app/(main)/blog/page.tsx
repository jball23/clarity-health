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
    <>
      {/* Hero */}
      <div className="bg-[#007F79] px-6 py-20 text-center">
        <AnimatedSection animationType="fadeIn">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#FFC52E]">
            Clinical Resources
          </p>
          <h1 className="text-4xl font-bold text-white md:text-5xl">Evidence-Based Insights</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">
            Research, guidance, and practical tools from our licensed clinical team.
          </p>
        </AnimatedSection>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-6xl px-6 py-16">
        {(!posts || posts.length === 0) ? (
          <p className="py-20 text-center text-gray-400">No posts yet — check back soon.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: SanityBlogPost, i: number) => (
              <AnimatedSection key={post._id} delay={i * 0.06}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  {post.mainImage?.asset.url ? (
                    <div className="relative h-48 w-full shrink-0 overflow-hidden bg-gray-100">
                      <Image
                        src={post.mainImage.asset.url}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="h-48 w-full shrink-0 bg-linear-to-br from-[#007F79]/10 to-[#FFC52E]/10" />
                  )}

                  <div className="flex flex-1 flex-col p-5">
                    {post.categories?.[0] && (
                      <span className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#007F79]">
                        {post.categories[0]}
                      </span>
                    )}
                    <h2 className="flex-1 text-base font-semibold leading-snug text-gray-900 transition-colors group-hover:text-[#007F79]">
                      {post.title}
                    </h2>
                    <p className="mt-2 line-clamp-2 text-sm text-gray-500">{post.excerpt}</p>

                    <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                      {post.author?.photo?.asset.url && (
                        <Image
                          src={post.author.photo.asset.url}
                          alt={post.author.name ?? ''}
                          width={20}
                          height={20}
                          className="rounded-full object-cover"
                        />
                      )}
                      {post.author?.name && <span>{post.author.name}</span>}
                      {post.author?.name && <span>·</span>}
                      <span>
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
