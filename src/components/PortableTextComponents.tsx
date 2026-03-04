import { CodeBlock } from '@/components/CodeBlock'
import { slugifyHeading } from '@/lib/helper'
import type {
  PortableTextLinkMarkDef,
  PostCalloutBlock,
  PostCodeBlock,
} from '@/sanity/lib/queries'
import {
  PortableTextComponents,
  PortableTextMarkComponentProps,
  PortableTextTypeComponentProps,
} from '@portabletext/react'

export const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-slate-300 leading-[1.9] text-lg">{children}</p>
    ),
    h2: ({ children, value }) => {
      const text = ((value?.children ?? []) as { text?: string }[]).map((c) => c.text ?? '').join('')
      return (
        <h2 id={slugifyHeading(text)} className="font-serif text-3xl md:text-4xl text-white mt-14 mb-4 leading-tight scroll-mt-28">
          {children}
        </h2>
      )
    },
    h3: ({ children, value }) => {
      const text = ((value?.children ?? []) as { text?: string }[]).map((c) => c.text ?? '').join('')
      return (
        <h3 id={slugifyHeading(text)} className="font-serif text-2xl text-white mt-10 mb-3 leading-snug scroll-mt-28">
          {children}
        </h3>
      )
    },
    h4: ({ children }) => (
      <h4 className="font-serif text-xl text-white mt-8 mb-2 leading-snug">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 pl-6 border-l-2 border-primary">
        <p className="text-xl font-serif text-white/80 italic leading-relaxed mb-2">
          &ldquo;{children}&rdquo;
        </p>
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="space-y-3 my-4 list-none pl-0">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="space-y-3 my-4 list-none pl-0">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-3 text-slate-300 leading-relaxed">
        <span className="shrink-0 mt-2.5 w-1.5 h-1.5 rounded-full bg-primary" />
        <span className="min-w-0 wrap-break-words">{children}</span>
      </li>
    ),
    number: ({ children, index }) => (
      <li className="flex items-start gap-3 text-slate-300 leading-relaxed">
        <span className="shrink-0 mt-1 w-6 h-6 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center">
          {(index ?? 0) + 1}
        </span>
        <span className="min-w-0 wrap-break-words">{children}</span> 
      </li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="text-white font-semibold">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-slate-200">{children}</em>
    ),
    code: ({ children }) => (
      <code className="px-1.5 py-0.5 rounded bg-white/10 text-primary font-mono text-sm">
        {children}
      </code>
    ),
    link: ({ children, value }: PortableTextMarkComponentProps<Omit<PortableTextLinkMarkDef, '_key'>>) => (
      <a
        href={value?.href}
        target={value?.openInNewTab ? '_blank' : undefined}
        rel={value?.openInNewTab ? 'noopener noreferrer' : undefined}
        className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
      >
        {children}
      </a>
    ),
  },

  types: {
    codeBlock: ({ value }: PortableTextTypeComponentProps<PostCodeBlock>) => (
      <CodeBlock code={value.code} language={value.language} filename={value.filename} />
    ),

    callout: ({ value }: PortableTextTypeComponentProps<PostCalloutBlock>) => (
      <div className="my-8 flex gap-4 p-5 rounded-xl bg-primary/5 border border-primary/20">
        <span className="shrink-0 text-xl">💡</span>
        <p className="text-sm text-slate-300 leading-relaxed">{value.text}</p>
      </div>
    ),
  },
}
