'use client'

import { springGentle } from '@/lib/motion'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'

const NAV_LINKS = [
  { href: '/projects', label: 'Projects' },
  { href: '/#about', label: 'About' },
  { href: '/blogs', label: 'Blogs' },
  { href: '/#contact', label: 'Contact' },
]

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-60 bg-black/60 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          <motion.div
            key="panel"
            className="fixed top-0 right-0 z-70 h-full w-70 bg-[#0a0a0a] border-l border-white/10 flex flex-col md:hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={springGentle}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <Link href="/" onClick={onClose}>
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={36}
                  height={36}
                  className="size-9 rounded-full object-cover object-center"
                />
              </Link>
              <motion.button
                onClick={onClose}
                className="text-white/70 hover:text-white transition-colors p-1"
                aria-label="Close menu"
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <X className="size-6" />
              </motion.button>
            </div>

            <nav className="flex flex-col gap-1 px-4 py-6">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ ...springGentle, delay: 0.08 + i * 0.07 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="block text-white/80 hover:text-primary hover:bg-white/5 transition-colors px-4 py-3 rounded-lg text-base font-semibold uppercase tracking-widest"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto px-6 py-6 border-t border-white/10">
              <p className="text-xs text-white/30 uppercase tracking-widest">Navigation</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
