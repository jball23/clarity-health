'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { SanityBlogPost } from '@/sanity/lib/types'

interface RecentPostsProps {
  posts?: SanityBlogPost[]
  title?: string
}

export function RecentPosts({ posts = [], title = 'From Our Clinical Team' }: RecentPostsProps) {
  const [fetched, setFetched] = useState<SanityBlogPost[]>([])

  // When no posts are passed via server props (e.g. inside Plasmic Studio canvas),
  // self-fetch from the API so the canvas shows real data.
  useEffect(() => {
    if (posts.length > 0) return
    fetch('/api/recent-posts')
      .then((r) => r.json())
      .then((data) => setFetched(data))
      .catch(() => {})
  }, [posts.length])

  const visible = (posts.length > 0 ? posts : fetched).slice(0, 3)

  if (visible.length === 0) {
    return (
      <section className="w-full py-20">
        <p className="text-center text-gray-400">No recent posts yet.</p>
      </section>
    )
  }

  return (
    <section className="w-full py-20">
      <div className="mx-auto max-w-6xl px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 flex items-end justify-between"
      >
        <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
        <Link
          href="/blog"
          className="text-sm font-semibold text-[#007F79] hover:underline"
        >
          View all →
        </Link>
      </motion.div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((post, i) => (
          <motion.div
            key={post._id}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
          >
            <Link
              href={`/blog/${post.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              {post.mainImage?.asset.url ? (
                <div className="relative h-44 w-full shrink-0 overflow-hidden bg-gray-100">
                  <Image
                    src={post.mainImage.asset.url}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ) : (
                <div className="h-44 w-full shrink-0 bg-linear-to-br from-[#007F79]/10 to-[#FFC52E]/10" />
              )}

              <div className="flex flex-1 flex-col p-5">
                {post.categories?.[0] && (
                  <span className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#007F79]">
                    {post.categories[0]}
                  </span>
                )}
                <h3 className="flex-1 text-base font-semibold leading-snug text-gray-900 transition-colors group-hover:text-[#007F79]">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-gray-500">{post.excerpt}</p>

                <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                  {post.author?.photo?.asset.url && (
                    <Image
                      src={post.author.photo.asset.url}
                      alt={post.author.name ?? ''}
                      width={18}
                      height={18}
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
          </motion.div>
        ))}
      </div>
      </div>
    </section>
  )
}
