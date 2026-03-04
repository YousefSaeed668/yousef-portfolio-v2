import type { PostBody, PostBodyBlock, PostBodyItem } from '@/sanity/lib/queries'

function isPostBodyBlock(node: PostBodyItem): node is PostBodyBlock {
  return node._type === 'block'
}

export function calcReadTime(body: PostBody = []): number {
  const text = body
    .filter(isPostBodyBlock)
    .flatMap((block) => block.children ?? [])
    .map((child) => child.text)
    .join(' ')
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

export function formatReadTime(minutes: number): string {
  return `${minutes} min read`
}

export function isQuickRead(minutes: number): boolean {
  return minutes <= 3
}

const gradientMap: Record<string, string> = {
  'NEXT.JS':     'from-blue-900/40 to-cyan-900/20',
  'TYPESCRIPT':  'from-blue-800/40 to-indigo-900/20',
  'REACT':       'from-cyan-900/40 to-blue-900/20',
  'NODE.JS':     'from-green-900/40 to-emerald-900/20',
  'CSS':         'from-pink-900/40 to-purple-900/20',
  'JAVASCRIPT':  'from-yellow-900/40 to-amber-900/20',
  'DATABASE':    'from-red-900/40 to-rose-900/20',
  'BACKEND':     'from-violet-900/40 to-purple-900/20',
  'FRONTEND':    'from-teal-900/40 to-cyan-900/20',
  'FINTECH':     'from-emerald-900/40 to-green-900/20',
}

export function getCategoryGradient(category: string): string {
  return (
    gradientMap[category?.toUpperCase()] ??
    'from-orange-900/20 to-amber-900/10'
  )
}
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\u0600-\u06ff\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}
export function formatPeriod(start: string, end?: string): string {
  const fmt = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };
  return `${fmt(start)} — ${end ? fmt(end) : "Present"}`;
}
