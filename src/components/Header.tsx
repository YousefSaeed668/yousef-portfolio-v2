'use client'

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
    <div className="hidden md:flex gap-8 items-center">
      {NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm font-medium uppercase tracking-widest text-white/80 hover:text-primary transition-colors"
        >
          {link.label}
        </Link>
      ))}
    </div>
  )

  const hamburger = (
    <button
      onClick={() => setMobileOpen(true)}
      className="md:hidden text-white p-1"
      aria-label="Open menu"
    >
      <Menu className="size-7" />
    </button>
  )


  if (isHome) {
    return (
      <>
        <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12 flex justify-between items-center pointer-events-none">
          <a className="pointer-events-auto group" href="#">
            <Image
              src="/logo.png"
              alt="Logo"
              width={40}
              height={40}
              className="size-11 rounded-full object-cover object-center overflow-hidden"
            />
          </a>

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

          {backLink ? (
            <Link
              href={backLink.href}
              className="flex items-center gap-2 text-white hover:text-primary transition-colors shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-bold uppercase tracking-widest hidden sm:inline">
                {backLink.label}
              </span>
            </Link>
          ) : (
            <div className="w-24" />
          )}

          <Link href="/" className="shrink-0">
            <Image
              src="/logo.png"
              alt="Logo"
              width={40}
              height={40}
              className="size-10 rounded-full object-cover object-center overflow-hidden"
            />
          </Link>

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