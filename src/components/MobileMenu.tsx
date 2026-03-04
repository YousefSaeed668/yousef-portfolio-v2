'use client'

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
  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      <div
        className={`fixed inset-0 z-60 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 right-0 z-70 h-full w-70 bg-[#0a0a0a] border-l border-white/10 flex flex-col transition-transform duration-300 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
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
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors p-1"
            aria-label="Close menu"
          >
            <X className="size-6" />
          </button>
        </div>

        <nav className="flex flex-col gap-1 px-4 py-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="text-white/80 hover:text-primary hover:bg-white/5 transition-colors px-4 py-3 rounded-lg text-base font-semibold uppercase tracking-widest"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto px-6 py-6 border-t border-white/10">
          <p className="text-xs text-white/30 uppercase tracking-widest">Navigation</p>
        </div>
      </div>
    </>
  )
}
