'use client'

import { calcReadTime, formatReadTime, getCategoryGradient } from '@/lib/helper'
import { springSnappy } from '@/lib/motion'
import { urlFor } from '@/sanity/lib/image'
import type { PostListItem } from '@/sanity/lib/queries'
import { motion } from 'framer-motion'
import { Clock, Tag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

type BlogCardPost = Pick<PostListItem, 'slug' | 'title' | 'category' | 'coverImage' | 'body' | 'publishedAt'>

export function BlogCard({ post, index = 0 }: { post: BlogCardPost; index?: number }) {
  const readTime = calcReadTime(post.body ?? [])
  const gradient = getCategoryGradient(post.category)
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ ...springSnappy, delay: index * 0.07 }}
      whileHover={{ y: -6 }}
    >
      <Link
        href={`/blogs/${post.slug.current}`}
        className="group flex flex-col rounded-2xl overflow-hidden bg-surface-dark border border-white/5 hover:border-primary/30 transition-all duration-500 h-full"
      >
        {post.coverImage ? (
          <div className="relative h-48 w-full overflow-hidden transition-all duration-500 group-hover:h-28">
            <Image
              src={urlFor(post.coverImage).url()}
              alt={post.title}
              fill
              sizes="(max-width: 640px) 100vw, 400px"
              className="object-cover"
            />
          </div>
        ) : (
          <div className={`h-24 w-full bg-linear-to-br ${gradient} transition-all duration-500 group-hover:h-28`} />
        )}
        <div className="p-5 flex-1 flex flex-col">
          <span className="text-primary text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5">
            <Tag className="w-3 h-3" />
            {post.category}
          </span>
          <h4 className="font-serif text-lg text-white group-hover:text-primary transition-colors duration-300 leading-snug flex-1 mb-3">
            {post.title}
          </h4>
          <div className="flex items-center justify-between mt-auto">
            <span className="flex items-center gap-1.5 text-slate-500 text-xs">
              <Clock className="w-3 h-3" />
              {formatReadTime(readTime)}
            </span>
            <span className="text-slate-500 text-xs">{formattedDate}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
