'use client'

import { easePrecise, springGentle } from '@/lib/motion'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

type Direction = 'up' | 'left' | 'right' | 'none'

interface ScrollRevealProps {
  children: React.ReactNode
  delay?: number
  direction?: Direction
  className?: string
  amount?: number
  once?: boolean
}

function getInitial(direction: Direction) {
  switch (direction) {
    case 'up': return { opacity: 0, y: 36 }
    case 'left': return { opacity: 0, x: -36 }
    case 'right': return { opacity: 0, x: 36 }
    case 'none': return { opacity: 0 }
  }
}

function getAnimate(direction: Direction) {
  switch (direction) {
    case 'up': return { opacity: 1, y: 0 }
    case 'left': return { opacity: 1, x: 0 }
    case 'right': return { opacity: 1, x: 0 }
    case 'none': return { opacity: 1 }
  }
}

function getTransition(direction: Direction, delay: number) {
  if (direction === 'none') {
    return { duration: 0.5, ease: easePrecise, delay }
  }
  return { ...springGentle, delay }
}

export function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  className,
  amount = 0.15,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once, amount })

  return (
    <motion.div
      ref={ref}
      initial={getInitial(direction)}
      animate={inView ? getAnimate(direction) : getInitial(direction)}
      transition={getTransition(direction, delay)}
      className={className}
    >
      {children}
    </motion.div>
  )
}


interface StaggerRevealProps {
  children: React.ReactNode
  className?: string
  stagger?: number
  delayChildren?: number
  amount?: number
}

export function StaggerReveal({
  children,
  className,
  stagger = 0.08,
  delayChildren = 0,
  amount = 0.1,
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
