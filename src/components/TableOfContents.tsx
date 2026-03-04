'use client'

import { slugifyHeading } from '@/lib/helper'
import { Tag } from 'lucide-react'
import { useEffect, useState } from 'react'

export interface TocHeading {
  _key: string
  style: 'h2' | 'h3' | string
  text: string
}

interface TableOfContentsProps {
  headings: TocHeading[]
  category?: string
  label?: string
  standalone?: boolean
}


export function TableOfContentsPanel({
  headings,
  category,
  label = 'In this article',
}: Omit<TableOfContentsProps, 'standalone'>) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '0px 0px -60% 0px', threshold: 0 }
    )

    headings.forEach((h) => {
      const el = document.getElementById(slugifyHeading(h.text))
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings])

  function scrollTo(text: string) {
    const id = slugifyHeading(text)
    const el = document.getElementById(id)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 100
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <>
      {category && (
        <div className="p-5 rounded-xl bg-surface-dark border border-white/5">
          <p className="text-slate-500 text-xs uppercase tracking-widest mb-3">Category</p>
          <span className="inline-flex items-center gap-2 text-primary text-sm font-bold">
            <Tag className="w-3.5 h-3.5" />
            {category}
          </span>
        </div>
      )}

      {headings.length > 0 && (
        <div className="p-5 rounded-xl bg-surface-dark border border-white/5">
          <p className="text-slate-500 text-xs uppercase tracking-widest mb-4">{label}</p>
          <nav className="flex flex-col gap-1">
            {headings.map((h) => {
              const id = slugifyHeading(h.text)
              const isActive = activeId === id
              const isH3 = h.style === 'h3'
              return (
                <button
                  key={h._key}
                  onClick={() => scrollTo(h.text)}
                  className={`text-left leading-snug transition-colors duration-200 cursor-pointer rounded px-2 py-1 ${isH3 ? 'pl-5 text-xs' : 'text-sm'
                    } ${isActive
                      ? 'text-primary font-medium'
                      : 'text-slate-400 hover:text-primary'
                    }`}
                >
                  {h.text}
                </button>
              )
            })}
          </nav>
        </div>
      )}
    </>
  )
}


export function TableOfContents(props: Omit<TableOfContentsProps, 'standalone'>) {
  return (
    <aside className="hidden lg:flex flex-col gap-8">
      <div className="sticky top-24 flex flex-col gap-6">
        <TableOfContentsPanel {...props} />
      </div>
    </aside>
  )
}
