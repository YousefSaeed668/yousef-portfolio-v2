'use client'

import {
  containerVariants,
  itemLeftVariants,
  itemRightVariants,
  itemUpVariants,
  springSnappy,
} from '@/lib/motion'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import MobileMenu from './MobileMenu'

const NAV_LINKS = [
  { href: '/projects', label: 'Projects' },
  { href: '/#about', label: 'About' },
  { href: '/blogs', label: 'Blogs' },
  { href: '/#contact', label: 'Contact' },
]

function getBackLink(pathname: string): { href: string; label: string } | null {
  if (pathname === '/blogs') return { href: '/', label: 'Portfolio' }
  if (pathname.startsWith('/blogs/')) return { href: '/blogs', label: 'All Articles' }
  if (pathname === '/projects') return { href: '/', label: 'Portfolio' }
  if (pathname.startsWith('/projects/')) return { href: '/projects', label: 'All Projects' }
  return null
}

export default function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isHome = pathname === '/'
  const backLink = getBackLink(pathname)

  const desktopNav = (
    <motion.div
      className="hidden md:flex gap-8 items-center"
      variants={containerVariants(0.08, 0.3)}
      initial="hidden"
      animate="visible"
    >
      {NAV_LINKS.map((link) => (
        <motion.div key={link.href} variants={itemUpVariants}>
          <Link
            href={link.href}
            className="text-sm font-medium uppercase tracking-widest text-white/80 hover:text-primary transition-colors"
          >
            {link.label}
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )

  const hamburger = (
    <motion.button
      onClick={() => setMobileOpen(true)}
      className="md:hidden text-white p-1"
      aria-label="Open menu"
      variants={itemRightVariants}
      initial="hidden"
      animate="visible"
    >
      <Menu className="size-7" />
    </motion.button>
  )

  if (isHome) {
    return (
      <>
        <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12 flex justify-between items-center pointer-events-none">
          <motion.a
            className="pointer-events-auto group"
            href="#"
            variants={itemLeftVariants}
            initial="hidden"
            animate="visible"
            transition={springSnappy}
          >
            <Image
              src="/logo.png"
              alt="Logo"
              width={40}
              height={40}
              className="size-11 rounded-full object-cover object-center overflow-hidden"
            />
          </motion.a>

          <div className="mix-blend-difference pointer-events-auto flex items-center gap-4">
            {desktopNav}
            {hamburger}
          </div>
        </nav>

        <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      </>
    )
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/5 bg-background-dark/80 backdrop-blur-md">
        <div className="max-w-350 mx-auto px-6 md:px-12 h-16 flex items-center justify-between gap-6">

          <AnimatePresence mode="wait">
            {backLink ? (
              <motion.div
                key="back"
                variants={itemLeftVariants}
                initial="hidden"
                animate="visible"
              >
                <Link
                  href={backLink.href}
                  className="flex items-center gap-2 text-white hover:text-primary transition-colors shrink-0"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm font-bold uppercase tracking-widest hidden sm:inline">
                    {backLink.label}
                  </span>
                </Link>
              </motion.div>
            ) : (
              <motion.div key="spacer" className="w-24" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
            )}
          </AnimatePresence>

          <motion.div
            variants={itemUpVariants}
            initial="hidden"
            animate="visible"
          >
            <Link href="/" className="shrink-0">
              <Image
                src="/logo.png"
                alt="Logo"
                width={40}
                height={40}
                className="size-10 rounded-full object-cover object-center overflow-hidden"
              />
            </Link>
          </motion.div>

          <div className="flex items-center gap-4 justify-end">
            {desktopNav}
            {hamburger}
          </div>

        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}