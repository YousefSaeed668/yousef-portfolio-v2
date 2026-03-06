'use client'

import { easePrecise, springGentle } from '@/lib/motion'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Download } from 'lucide-react'
import Image from 'next/image'
import { useRef } from 'react'

interface Props {
  cvUrl: string | null
}

const WORDS_LINE1 = ['YOUSEF']
const WORDS_LINE2 = ['SAEED']

function WordReveal({ word, delay = 0, italic = false }: { word: string; delay?: number; italic?: boolean }) {
  return (
    <span className="inline-block overflow-hidden">
      <motion.span
        className={`inline-block${italic ? ' italic font-light pr-2' : ''}`}
        initial={{ y: '110%', opacity: 0 }}
        animate={{ y: '0%', opacity: 1 }}
        transition={{ duration: 0.9, ease: easePrecise, delay }}
      >
        {word}
      </motion.span>
    </span>
  )
}

export default function HeroSection({ cvUrl }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    <section ref={sectionRef} className="relative h-screen w-full flex flex-col justify-end pb-20 px-6 md:px-12 overflow-hidden">
      <motion.div className="absolute inset-0 w-full h-full z-0" style={{ y: bgY }}>
        <div className="absolute inset-0 bg-linear-to-b from-background-dark/30 via-transparent to-background-dark z-10" />
        <Image
          src="/heroimage.jpg"
          alt="Hero background"
          fill
          priority
          className="object-cover opacity-60 grayscale"
          style={{ objectPosition: '72% 43%' }}
        />
      </motion.div>

      <div className="relative z-20 max-w-350 w-full mx-auto">
        <div className="flex flex-col items-start">
          <div className="overflow-hidden mb-4">
            <motion.span
              className="text-primary text-sm md:text-base font-bold tracking-[0.2em] uppercase block"
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.6, ease: easePrecise, delay: 0.1 }}
            >
              FULL-STACK DEVELOPER
            </motion.span>
          </div>

          <h1 className="font-serif text-6xl md:text-8xl lg:text-[10rem] leading-[0.9] text-white mix-blend-overlay opacity-90">
            <span className="block">
              {WORDS_LINE1.map((w, i) => (
                <WordReveal key={w} word={w} delay={0.25 + i * 0.1} />
              ))}
            </span>
            <span className="block ml-12 md:ml-32">
              {WORDS_LINE2.map((w, i) => (
                <WordReveal key={w} word={w} delay={0.45 + i * 0.1} italic />
              ))}
            </span>
          </h1>
        </div>

        <motion.div
          className="mt-12 flex flex-col md:flex-row justify-between items-end gap-8 border-t border-white/10 pt-8"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springGentle, delay: 0.85 }}
        >
          <p className="max-w-md text-slate-300 text-lg leading-relaxed font-light">
            Full-stack engineer turning complex problems into clean, scalable products. I care deeply about performance, clarity, and great UX
          </p>

          {cvUrl ? (
            <motion.a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="group flex items-center gap-3 px-7 py-3.5 rounded-full border border-primary/50 text-primary hover:bg-primary hover:text-black transition-all duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...springGentle, delay: 1.05 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <Download className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
              <span className="text-sm font-bold uppercase tracking-widest">Download CV</span>
            </motion.a>
          ) : (
            <button disabled className="flex items-center gap-3 px-7 py-3.5 rounded-full border border-white/10 text-white/30 cursor-not-allowed select-none">
              <Download className="w-4 h-4" />
              <span className="text-sm font-bold uppercase tracking-widest">Download CV</span>
            </button>
          )}
        </motion.div>
      </div>
    </section>
  )
}
