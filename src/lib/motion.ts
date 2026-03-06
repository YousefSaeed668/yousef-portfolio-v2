import type { Variants } from 'framer-motion'


export const springSnappy = { type: 'spring', stiffness: 400, damping: 40 } as const
export const springGentle = { type: 'spring', stiffness: 200, damping: 30 } as const
export const springMolasses = { type: 'spring', stiffness: 120, damping: 25 } as const


export const easePrecise = [0.16, 1, 0.3, 1] as const
export const easeEditorial = [0.25, 0.46, 0.45, 0.94] as const


export const containerVariants = (stagger = 0.1, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
})


export const itemUpVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...springGentle },
  },
}


export const itemLeftVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { ...springGentle },
  },
}


export const itemRightVariants: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { ...springGentle },
  },
}


export const clipRevealVariants: Variants = {
  hidden: {
    clipPath: 'inset(100% 0% 0% 0%)',
    opacity: 0,
  },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    opacity: 1,
    transition: {
      clipPath: { duration: 0.7, ease: easePrecise },
      opacity: { duration: 0.01 },
    },
  },
}


export const horizontalWipeVariants: Variants = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  visible: {
    clipPath: 'inset(0 0% 0 0)',
    transition: { duration: 1.1, ease: easePrecise },
  },
}


export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { ...springSnappy },
  },
}


export const lineDrawVariants: Variants = {
  hidden: { scaleY: 0, transformOrigin: 'top' },
  visible: {
    scaleY: 1,
    transformOrigin: 'top',
    transition: { duration: 1.4, ease: easeEditorial },
  },
}


export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: easeEditorial } },
}
