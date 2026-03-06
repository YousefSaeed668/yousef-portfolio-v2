'use client'

import { easePrecise, springGentle } from '@/lib/motion'
import { urlFor } from '@/sanity/lib/image'
import { type ProjectListItem } from '@/sanity/lib/queries'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { useRef } from 'react'
import ProjectCard from './ProjectCard'

interface Props {
  projects: ProjectListItem[]
}

export default function SelectedWorksSection({ projects }: Props) {
  const headingRef = useRef<HTMLDivElement>(null)
  const headingInView = useInView(headingRef, { once: true, amount: 0.5 })
  const btnRef = useRef<HTMLDivElement>(null)
  const btnInView = useInView(btnRef, { once: true, amount: 0.5 })

  return (
    <section className="py-20 bg-surface-dark px-6 md:px-12" id="projects">
      <div className="max-w-350 mx-auto">
        <div
          ref={headingRef}
          className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8"
        >
          <div className="overflow-hidden max-sm:w-full">
            <motion.h2
              className="font-serif text-5xl md:text-7xl text-white"
              initial={{ y: '110%' }}
              animate={headingInView ? { y: '0%' } : {}}
              transition={{ duration: 0.75, ease: easePrecise }}
            >
              Selected
              <br />
              <span className="text-white/20">Works</span>
            </motion.h2>
          </div>
          <motion.p
            className="text-slate-400 sm:text-right max-w-sm mt-8 md:mt-0"
            initial={{ opacity: 0, x: 20 }}
            animate={headingInView ? { opacity: 1, x: 0 } : {}}
            transition={{ ...springGentle, delay: 0.25 }}
          >
            A curation of projects that define the intersection of luxury design
            and robust engineering.
          </motion.p>
        </div>

        <div className="flex flex-col gap-24">
          {projects.map((project, index) => (
            <ProjectCard
              key={project._id}
              slug={project.slug.current}
              category={project.category}
              title={project.title}
              description={project.shortDescription}
              tags={project.techStack ?? []}
              imageUrl={project.coverImage ? urlFor(project.coverImage).url() : ''}
              reverse={index % 2 !== 0}
              index={index}
            />
          ))}
        </div>

        <div ref={btnRef} className="flex justify-center mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={btnInView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...springGentle }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              href="/projects"
              className="text-white border border-white/20 rounded-full px-10 py-4 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all block"
            >
              View All Projects
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
