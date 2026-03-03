import { BlogCard } from '@/components/BlogCard'
import { portableTextComponents } from '@/components/PortableTextComponents'
import { ReadingProgress } from '@/components/ReadingProgress'
import { TableOfContents, type TocHeading } from '@/components/TableOfContents'
import { calcReadTime, formatReadTime, getCategoryGradient, isQuickRead } from '@/lib/helper'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import {
  POST_BY_SLUG_QUERY,
  POSTS_QUERY,
  type PostBodyBlock,
  type PostBodyItem,
  type PostBySlugResult,
  type PostListItem,
} from '@/sanity/lib/queries'
import { PortableText } from '@portabletext/react'
import { Clock, Tag } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const revalidate = 604800

export async function generateStaticParams() {
  const posts = await client.fetch<PostListItem[]>(POSTS_QUERY, {}, { next: { tags: ['post'] } })
  return posts.map((p) => ({ slug: p.slug.current }))
}

interface PageProps {
  params: Promise<{ slug: string }>
}

function isHeadingBlock(block: PostBodyItem): block is PostBodyBlock {
  return block._type === 'block' && (block.style === 'h2' || block.style === 'h3')
}

function getBlockText(block: PostBodyBlock): string {
  return (block.children ?? []).map((child) => child.text).join('')
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await client.fetch<PostBySlugResult | null>(POST_BY_SLUG_QUERY, { slug }, { next: { tags: ['post'] } })
  if (!post) return {}
  return {
    title: post.seo?.metaTitle ?? post.title,
    description: post.seo?.metaDescription ?? post.excerpt,
    openGraph: {
      images: post.seo?.ogImage
        ? [urlFor(post.seo.ogImage).width(1200).height(630).url()]
        : post.coverImage
        ? [urlFor(post.coverImage).width(1200).height(630).url()]
        : [],
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params

  const [post, allPosts] = await Promise.all([
    client.fetch<PostBySlugResult | null>(POST_BY_SLUG_QUERY, { slug }, { next: { tags: ['post'] } }),
    client.fetch<PostListItem[]>(POSTS_QUERY, {}, { next: { tags: ['post'] } }),
  ])

  if (!post) notFound()

  const readTime = calcReadTime(post.body ?? [])
  const gradient = getCategoryGradient(post.category)

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })

  const sameCat = allPosts
    .filter((candidate) => candidate.slug.current !== slug && candidate.category === post.category)
    .slice(0, 3)
  const others = allPosts
    .filter((candidate) => candidate.slug.current !== slug && candidate.category !== post.category)
    .slice(0, 3 - sameCat.length)
  const related = [...sameCat, ...others].slice(0, 3)

  const headings: TocHeading[] = (post.body ?? []).filter(isHeadingBlock).map((b) => ({
    _key: b._key,
    style: b.style ?? 'h2',
    text: getBlockText(b),
  }))

  return (
    <div className="min-h-screen bg-background-dark text-white">
      <ReadingProgress />

      <div className="relative overflow-hidden">
        {post.coverImage ? (
          <Image
            src={urlFor(post.coverImage).url()}
            alt={post.title}
            fill
            sizes="100vw"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className={`absolute inset-0 bg-linear-to-br ${gradient} opacity-70`} />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-background-dark via-background-dark/60 to-transparent" />
        <div className="relative max-w-350 mx-auto px-6 md:px-12 pt-24 pb-20">
          <div className="max-w-3xl">
            <div className="mb-8">
              <div className="inline-flex flex-wrap items-center gap-4 rounded-full bg-black/50 backdrop-blur-sm px-4 py-2">
                <span className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-[0.2em]">
                  <Tag className="w-3 h-3" />
                  {post.category}
                </span>
                <span className="text-slate-200 text-xs">{formattedDate}</span>
                <span className="flex items-center gap-1.5 text-slate-200 text-xs">
                  <Clock className="w-3 h-3" />
                  {formatReadTime(readTime)}
                </span>
                {isQuickRead(readTime) && (
                  <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                    Quick Read
                  </span>
                )}
              </div>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-8">
              {post.title}
            </h1>
            <p className="text-slate-300 text-xl leading-relaxed max-w-2xl">
              {post.excerpt}
            </p>
          </div>
        </div>
      </div>

      <main className="max-w-350 mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-16">

          <article className="flex flex-col gap-6 min-w-0">
            <PortableText value={post.body ?? []} components={portableTextComponents} />

            <div className="mt-12 pt-8 border-t border-white/5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
                <span className="text-primary font-bold text-sm">YS</span>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Yousef Saeed</p>
                <p className="text-slate-500 text-xs">Full-Stack Developer · Cairo, Egypt</p>
              </div>
            </div>
          </article>

          <TableOfContents headings={headings} category={post.category} label="In this article" />
        </div>

        {related.length > 0 && (
          <div className="mt-24 pt-12 border-t border-white/5">
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="text-primary text-xs font-bold uppercase tracking-[0.2em] block mb-2">
                  Keep Reading
                </span>
                <h2 className="font-serif text-3xl md:text-4xl text-white">
                  Related Articles
                </h2>
              </div>
              <Link
                href="/blogs"
                className="hidden md:inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors text-sm font-bold uppercase tracking-wider"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((relatedPost) => (
                <BlogCard key={relatedPost._id} post={relatedPost} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
