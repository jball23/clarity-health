import type { Metadata } from 'next'
import type { PortableTextBlock } from '@portabletext/types'

function readingTime(body: PortableTextBlock[]): number {
  const words = body
    .filter((b) => b._type === 'block')
    .flatMap((b) => (b.children as { text?: string }[] | undefined)?.map((c) => c.text ?? '') ?? [])
    .join(' ')
    .split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { AnimatedSection } from '@/components/code-components/AnimatedSection'
import { sanityFetch } from '@/sanity/lib/live'
import { allBlogPostsQuery, blogPostBySlugQuery } from '@/sanity/lib/queries'
import type { SanityBlogPost } from '@/sanity/lib/types'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const { data: posts } = await sanityFetch<SanityBlogPost[]>({ query: allBlogPostsQuery })
  return (posts ?? []).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const { data: post } = await sanityFetch<SanityBlogPost | null>({ query: blogPostBySlugQuery, params: { slug } })
  if (!post) return {}
  return {
    title: post.seo?.metaTitle ?? post.title,
    description: post.seo?.metaDescription ?? post.excerpt,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const { data: post } = await sanityFetch<SanityBlogPost | null>({ query: blogPostBySlugQuery, params: { slug } })
  if (!post) notFound()

  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <AnimatedSection>
        <Link href="/blog" className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-[#007F79] hover:underline">
          ← Back to Resources
        </Link>

        {post.categories?.[0] && (
          <span className="mb-3 block text-xs font-semibold uppercase tracking-wider text-[#007F79]">
            {post.categories[0]}
          </span>
        )}
        <h1 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl">{post.title}</h1>

        <div className="mt-5 flex items-center gap-3">
          {post.author?.photo?.asset.url && (
            <Image src={post.author.photo.asset.url} alt={post.author.name} width={36} height={36} className="rounded-full" />
          )}
          <div className="text-sm">
            <p className="font-medium text-gray-900">{post.author?.name}</p>
            <p className="text-gray-400">
            {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            {post.body && <span> · {readingTime(post.body)} min read</span>}
          </p>
          </div>
        </div>
      </AnimatedSection>

      {post.mainImage?.asset.url && (
        <AnimatedSection delay={0.1} className="mt-10">
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-gray-100">
            <Image src={post.mainImage.asset.url} alt={post.title} fill className="object-cover" />
          </div>
        </AnimatedSection>
      )}

      <AnimatedSection delay={0.15} className="mt-10">
        <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-a:text-[#007F79]">
          <PortableText value={post.body} />
        </div>
      </AnimatedSection>
    </article>
  )
}
