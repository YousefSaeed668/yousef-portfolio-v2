'use client'

import { easePrecise, springGentle } from '@/lib/motion'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export function BlogsPageHeader() {
  const headingRef = useRef<HTMLDivElement>(null)
  const headingInView = useInView(headingRef, { once: true, amount: 0.5 })

  return (
    <div ref={headingRef} className="mb-14">
      <div className="overflow-hidden mb-4">
        <motion.span
          className="text-primary text-sm font-bold tracking-[0.2em] uppercase block"
          initial={{ y: '100%' }}
          animate={headingInView ? { y: '0%' } : {}}
          transition={{ duration: 0.55, ease: easePrecise }}
        >
          Writing
        </motion.span>
      </div>

      <div className="overflow-hidden">
        <motion.h1
          className="font-serif text-6xl md:text-8xl text-white leading-none mb-6"
          initial={{ y: '110%' }}
          animate={headingInView ? { y: '0%' } : {}}
          transition={{ duration: 0.75, ease: easePrecise, delay: 0.1 }}
        >
          Articles &amp;{' '}
          <span className="text-white/20">Notes</span>
        </motion.h1>
      </div>

      <motion.p
        className="text-slate-400 text-lg max-w-xl leading-relaxed"
        initial={{ opacity: 0, x: 20 }}
        animate={headingInView ? { opacity: 1, x: 0 } : {}}
        transition={{ ...springGentle, delay: 0.3 }}
      >
        Practical write-ups on frontend, backend, and everything in between.
        Mix of quick tips and deep dives.
      </motion.p>
    </div>
  )
}
