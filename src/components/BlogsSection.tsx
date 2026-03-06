'use client'

import { BlogCard } from '@/components/BlogCard'
import { easePrecise, springGentle, springSnappy } from '@/lib/motion'
import { urlFor } from '@/sanity/lib/image'
import { type PostListItem } from '@/sanity/lib/queries'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Clock, Tag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'

interface Props {
  posts: PostListItem[]
}

const GRADIENTS = [
  'from-primary/20 to-violet-900/30',
  'from-violet-800/25 to-primary/15',
  'from-cyan-900/25 to-primary/20',
  'from-rose-900/20 to-primary/10',
]

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function estimateReadTime(body?: PostListItem['body']): string {
  if (!body || body.length === 0) return '1 min read'
  const text = body.map((block) => {
    if (block._type === 'block') {
      return ((block as { children?: { text: string }[] }).children ?? []).map((c) => c.text).join(' ')
    }
    return ''
  }).join(' ')
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return `${Math.max(1, Math.ceil(words / 200))} min read`
}

function FeaturedCard({
  post,
  gradient,
  coverImageUrl,
}: {
  post: PostListItem
  gradient: string
  coverImageUrl: string | null
}) {
  return (
    <motion.a
      href={`/blogs/${post.slug.current}`}
      className="group relative flex flex-col justify-end rounded-2xl overflow-hidden min-h-110 bg-surface-dark border border-white/5 hover:border-primary/30 transition-all duration-500"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ ...springGentle }}
      whileHover={{ scale: 1.005 }}
    >
      {coverImageUrl ? (
        <Image
          src={coverImageUrl}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 60vw"
        />
      ) : (
        <div className={`absolute inset-0 bg-linear-to-br ${gradient} transition-opacity duration-500 group-hover:opacity-80`} />
      )}
      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-transparent" />

      <div className="absolute top-6 left-6">
        <motion.span
          className="bg-primary text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ ...springSnappy, delay: 0.3 }}
        >
          Featured
        </motion.span>
      </div>

      <div className="relative z-10 p-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-widest">
            <Tag className="w-3 h-3" />
            {post.category}
          </span>
          <span className="flex items-center gap-1.5 text-slate-400 text-xs">
            <Clock className="w-3 h-3" />
            {estimateReadTime(post.body)}
          </span>
          <span className="text-slate-500 text-xs ml-auto">{formatDate(post.publishedAt)}</span>
        </div>
        <h3 className="font-serif text-3xl md:text-4xl text-white leading-tight mb-4 group-hover:text-primary transition-colors duration-300">
          {post.title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-lg">{post.excerpt}</p>
        <div className="inline-flex items-center gap-2 text-white text-sm font-bold uppercase tracking-widest border-b border-primary pb-1 group-hover:text-primary transition-colors">
          <span>Read Article</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </motion.a>
  )
}

export default function BlogsSection({ posts }: Props) {
  const featured = posts[0] ?? null
  const rest = posts.slice(1)

  const headingRef = useRef<HTMLDivElement>(null)
  const headingInView = useInView(headingRef, { once: true, amount: 0.5 })
  const ctaRef = useRef<HTMLDivElement>(null)
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.5 })

  return (
    <section className="py-32 px-6 md:px-12 bg-background-dark" id="blog">
      <div className="max-w-350 mx-auto">
        <div
          ref={headingRef}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/10"
        >
          <div>
            <div className="overflow-hidden">
              <motion.span
                className="text-primary text-sm font-bold tracking-[0.2em] uppercase block mb-4"
                initial={{ y: '100%' }}
                animate={headingInView ? { y: '0%' } : {}}
                transition={{ duration: 0.55, ease: easePrecise }}
              >
                Writing
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                className="font-serif text-5xl md:text-7xl text-white leading-tight"
                initial={{ y: '110%' }}
                animate={headingInView ? { y: '0%' } : {}}
                transition={{ duration: 0.75, ease: easePrecise, delay: 0.1 }}
              >
                Latest{' '}
                <span className="text-white/20">Articles</span>
              </motion.h2>
            </div>
          </div>
          <motion.p
            className="text-slate-400 max-w-xs mt-6 md:mt-0 text-sm leading-relaxed md:text-right"
            initial={{ opacity: 0, x: 20 }}
            animate={headingInView ? { opacity: 1, x: 0 } : {}}
            transition={{ ...springGentle, delay: 0.3 }}
          >
            Thoughts on engineering, architecture, and the craft of building great software.
          </motion.p>
        </div>

        <div className="flex flex-col gap-6">
          {featured && (
            <FeaturedCard
              post={featured}
              gradient={GRADIENTS[0]}
              coverImageUrl={featured.coverImage ? urlFor(featured.coverImage).url() : null}
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post, i) => (
              <BlogCard key={post._id} post={post} index={i} />
            ))}
          </div>
        </div>

        <div ref={ctaRef} className="mt-12 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...springGentle }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              href="/blogs"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 text-white text-sm font-bold uppercase tracking-widest hover:border-primary hover:text-primary transition-all duration-300 group"
            >
              View All Articles
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
