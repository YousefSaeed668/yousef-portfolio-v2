'use client'

import { easePrecise, springGentle, springSnappy } from '@/lib/motion'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'

type ProjectCardProps = {
  slug: string
  category: string
  title: string
  description: string
  tags: string[]
  imageUrl: string
  reverse?: boolean
  index?: number
}

export default function ProjectCard({
  slug,
  category,
  title,
  description,
  tags,
  imageUrl,
  reverse = false,
  index = 0,
}: ProjectCardProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })


  return (
    <motion.article
      ref={ref}
      className="group relative grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
      initial={{ opacity: 0, x: reverse ? 60 : -60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ ...springGentle, delay: index * 0.08 }}
    >
      <div
        className={`md:col-span-7 relative overflow-hidden rounded-lg aspect-4/3 md:aspect-[16/10]${reverse ? ' md:order-2' : ''}`}
      >
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover object-top transition-transform duration-700 group-hover:scale-101"
          sizes="(max-width: 768px) 100vw, 58vw"
        />
      </div>

      <div className={`md:col-span-5 flex flex-col justify-center${reverse ? ' md:order-1 md:text-right md:items-end' : ''}`}>
        <div className="overflow-hidden">
          <motion.span
            className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-4 block"
            initial={{ y: '100%' }}
            animate={inView ? { y: '0%' } : {}}
            transition={{ duration: 0.5, ease: easePrecise, delay: 0.15 }}
          >
            {category}
          </motion.span>
        </div>
        <div className="overflow-hidden">
          <motion.h3
            className="font-serif text-4xl md:text-5xl text-white mb-6 group-hover:text-primary transition-colors"
            initial={{ y: '110%' }}
            animate={inView ? { y: '0%' } : {}}
            transition={{ duration: 0.65, ease: easePrecise, delay: 0.22 }}
          >
            {title}
          </motion.h3>
        </div>
        <motion.p
          className={`text-slate-400 mb-8 leading-relaxed${reverse ? ' max-w-md' : ''}`}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...springGentle, delay: 0.32 }}
        >
          {description}
        </motion.p>

        <motion.div
          className={`flex flex-wrap gap-2 mb-8${reverse ? ' md:justify-end' : ''}`}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          {tags.map((tag, i) => (
            <motion.span
              key={tag}
              className="px-3 py-1 border border-white/10 rounded-full text-xs text-slate-300"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ ...springSnappy, delay: 0.42 + i * 0.04 }}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...springGentle, delay: 0.5 }}
        >
          <Link
            href={`/projects/${slug}`}
            className={`${reverse ? '' : 'self-start '}text-white border border-white/20 rounded-full px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all w-fit`}
          >
            View Project
          </Link>
        </motion.div>
      </div>
    </motion.article>
  )
}
