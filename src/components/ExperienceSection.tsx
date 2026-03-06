'use client'

import { formatPeriod } from '@/lib/helper'
import { easePrecise, lineDrawVariants, springGentle, springSnappy } from '@/lib/motion'
import { type ExperienceQueryResult } from '@/sanity/lib/queries'
import { motion, useInView } from 'framer-motion'
import { Briefcase, CalendarDays, MapPin } from 'lucide-react'
import { useRef } from 'react'

interface Props {
  experiences: ExperienceQueryResult[]
}

function ExperienceCard({ exp, index }: { exp: ExperienceQueryResult; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })
  const fromLeft = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      key={exp._id}
      className="group relative flex flex-col md:flex-row gap-0 md:gap-16"
      initial={{ opacity: 0, x: fromLeft ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ ...springGentle, delay: 0.1 }}
    >
      <div className="md:w-55 md:shrink-0 mb-8 md:mb-0 md:pt-1 md:text-right">
        <div className="flex items-center gap-2 md:justify-end text-slate-500 text-xs uppercase tracking-widest mb-3">
          <CalendarDays className="w-3 h-3 md:order-2" />
          <span>{formatPeriod(exp.startDate, exp.endDate)}</span>
        </div>
        {exp.location && (
          <div className="flex items-center gap-2 md:justify-end text-slate-500 text-xs">
            <MapPin className="w-3 h-3 md:order-2" />
            <span>{exp.location}</span>
          </div>
        )}
      </div>

      <div className="hidden md:flex flex-col items-center relative">
        <motion.div
          className="w-3 h-3 rounded-full bg-primary shrink-0 mt-1.5"
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ ...springSnappy, delay: 0.25 }}
        />
        {inView && (
          <motion.div
            className="absolute top-1.5 left-0 w-3 h-3 rounded-full border border-primary"
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 3.5, opacity: 0 }}
            transition={{ duration: 1.0, ease: 'easeOut', delay: 0.3 }}
          />
        )}
      </div>

      <div className="flex-1 pb-20">
        <motion.div
          className="bg-surface-dark border border-white/5 rounded-2xl p-8 md:p-10 hover:border-primary/20 transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(236,127,19,0.05)]"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...springGentle, delay: 0.2 }}
        >
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <h3 className="font-serif text-3xl md:text-4xl text-white mb-1 group-hover:text-primary transition-colors duration-300">
                {exp.company}
              </h3>
              <div className="flex items-center gap-3 mt-2">
                <Briefcase className="w-4 h-4 text-primary shrink-0" />
                <span className="text-primary font-semibold text-base">{exp.jobTitle}</span>
              </div>
            </div>
            <motion.span
              className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-primary/30 text-primary bg-primary/5"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ ...springSnappy, delay: 0.35 }}
            >
              {exp.employmentType}
            </motion.span>
          </div>

          <div className="border-t border-white/5 mb-6" />

          {exp.description && (
            <p className="text-slate-400 leading-relaxed mb-8 text-sm md:text-base">{exp.description}</p>
          )}

          {(exp.achievements ?? []).length > 0 && (
            <ul className="space-y-3 mb-8">
              {(exp.achievements ?? []).map((text, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, ease: easePrecise, delay: 0.4 + i * 0.06 }}
                >
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <span className="text-slate-300 text-sm leading-relaxed">{text}</span>
                </motion.li>
              ))}
            </ul>
          )}

          {(exp.techStack ?? []).length > 0 && (
            <motion.div
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {(exp.techStack ?? []).map((tag, i) => (
                <motion.span
                  key={tag}
                  className="px-3 py-1 text-xs rounded-full border border-white/10 text-slate-400 bg-white/3 hover:border-primary/40 hover:text-primary transition-colors"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ ...springSnappy, delay: 0.5 + i * 0.04 }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function ExperienceSection({ experiences }: Props) {
  const headingRef = useRef<HTMLDivElement>(null)
  const headingInView = useInView(headingRef, { once: true, amount: 0.5 })
  const lineRef = useRef<HTMLDivElement>(null)
  const lineInView = useInView(lineRef, { once: true, amount: 0.1 })

  return (
    <section className="py-32 px-6 md:px-12 relative bg-background-dark" id="experience">
      <div className="max-w-275 mx-auto">
        <div
          ref={headingRef}
          className="flex flex-col md:flex-row md:items-end justify-between mb-20 pb-8 border-b border-white/10"
        >
          <div>
            <div className="overflow-hidden">
              <motion.span
                className="text-primary text-sm font-bold tracking-[0.2em] uppercase block mb-4"
                initial={{ y: '100%' }}
                animate={headingInView ? { y: '0%' } : {}}
                transition={{ duration: 0.6, ease: easePrecise }}
              >
                Career
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                className="font-serif text-5xl md:text-7xl text-white leading-tight"
                initial={{ y: '110%' }}
                animate={headingInView ? { y: '0%' } : {}}
                transition={{ duration: 0.75, ease: easePrecise, delay: 0.1 }}
              >
                Experience
              </motion.h2>
            </div>
          </div>
          <motion.p
            className="text-slate-400 max-w-xs mt-6 md:mt-0 text-sm leading-relaxed md:text-right"
            initial={{ opacity: 0, x: 20 }}
            animate={headingInView ? { opacity: 1, x: 0 } : {}}
            transition={{ ...springGentle, delay: 0.3 }}
          >
            Where I&apos;ve worked, what I&apos;ve built, and the impact I&apos;ve made.
          </motion.p>
        </div>

        <div className="relative" ref={lineRef}>
          {experiences.length > 1 && (
            <motion.div
              className="absolute left-0 md:left-55 top-0 bottom-0 w-px bg-white/5 hidden md:block"
              variants={lineDrawVariants}
              initial="hidden"
              animate={lineInView ? 'visible' : 'hidden'}
            />
          )}

          <div className="flex flex-col gap-0">
            {experiences.map((exp, index) => (
              <ExperienceCard key={exp._id} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
