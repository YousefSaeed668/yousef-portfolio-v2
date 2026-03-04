import { portableTextComponents } from '@/components/PortableTextComponents'
import { ReadingProgress } from '@/components/ReadingProgress'
import { TableOfContentsPanel, type TocHeading } from '@/components/TableOfContents'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import {
  PROJECT_BY_SLUG_QUERY,
  PROJECTS_QUERY,
  type PostBodyBlock,
  type PostBodyItem,
  type ProjectBySlugResult,
  type ProjectListItem,
} from '@/sanity/lib/queries'
import { PortableText } from '@portabletext/react'
import { ArrowUpRight, Code2, ExternalLink, Tag } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const revalidate = 604800

export async function generateStaticParams() {
  const projects = await client.fetch<ProjectListItem[]>(PROJECTS_QUERY, {}, { next: { tags: ['project'] } })
  return projects.map((p) => ({ slug: p.slug.current }))
}

interface PageProps {
  params: Promise<{ slug: string }>
}

function isHeadingBlock(block: PostBodyItem): block is PostBodyBlock {
  return block._type === 'block' && (block.style === 'h2' || block.style === 'h3')
}

function getBlockText(block: PostBodyBlock): string {
  return (block.children ?? []).map((child) => child.text).join('')
}


export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await client.fetch<ProjectBySlugResult | null>(PROJECT_BY_SLUG_QUERY, { slug }, { next: { tags: ['project'] } })
  if (!project) return {}
  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: {
      images: project.coverImage
        ? [urlFor(project.coverImage).width(1200).height(630).url()]
        : [],
    },
  }
}

export default async function WorkPage({ params }: PageProps) {
  const { slug } = await params

  const [project, allProjects] = await Promise.all([
    client.fetch<ProjectBySlugResult | null>(PROJECT_BY_SLUG_QUERY, { slug }, { next: { tags: ['project'] } }),
    client.fetch<ProjectListItem[]>(PROJECTS_QUERY, {}, { next: { tags: ['project'] } }),
  ])

  if (!project) notFound()

  const related = allProjects.filter((p) => p.slug.current !== slug).slice(0, 2)
  const headings: TocHeading[] = (project.body ?? []).filter(isHeadingBlock).map((b) => ({
    _key: b._key,
    style: b.style ?? 'h2',
    text: getBlockText(b),
  }))

  return (
    <div className="min-h-screen bg-background-dark text-white">
      <ReadingProgress />

      <div className="relative overflow-hidden">
        {project.coverImage ? (
          <Image
            src={urlFor(project.coverImage).url()}
            alt={project.title}
            fill
            sizes="100vw"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-transparent opacity-70" />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-background-dark via-background-dark/60 to-transparent" />
        <div className="relative max-w-350 mx-auto px-6 md:px-12 pt-48 pb-36">
          <div className="max-w-3xl">
            <div className="mb-8">
              <span className="inline-flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-[0.2em]">
                <Tag className="w-3 h-3" />
                {project.category}
              </span>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-8">
              {project.title}
            </h1>
            <p className="text-slate-300 text-xl leading-relaxed max-w-2xl">
              {project.shortDescription}
            </p>
          </div>
        </div>
      </div>

      <main className="max-w-350 mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16">

          <article className="flex flex-col gap-6 min-w-0">
            {(project.techStack ?? []).length > 0 && (
              <div className="flex flex-wrap gap-2 pb-10 border-b border-white/5">
                {project.techStack!.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 border border-white/10 rounded-full text-xs text-slate-300 bg-white/3"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {project.videoUrl && (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10">
                <iframe
                  src={`${project.videoUrl}?rel=0`}
                  title={`${project.title} preview`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            )}

            {project.body && project.body.length > 0 ? (
              <PortableText value={project.body} components={portableTextComponents} />
            ) : (
              <p className="text-slate-500 italic">No content yet.</p>
            )}

            <div className="mt-12 pt-8 border-t border-white/5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
                <span className="text-primary font-bold text-sm">YS</span>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Yousef Saeed</p>
                <p className="text-slate-500 text-xs">Full-Stack Developer · Cairo, Egypt</p>
              </div>
            </div>
          </article>

          <aside className="hidden lg:flex flex-col gap-8">
            <div className="sticky top-24 flex flex-col gap-4">

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-primary text-black text-sm font-bold uppercase tracking-widest rounded-xl hover:bg-primary/90 transition-colors group"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Preview
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              )}

              {project.codeUrl && (
                <a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-transparent text-white text-sm font-bold uppercase tracking-widest rounded-xl border border-white/15 hover:border-primary hover:text-primary transition-colors group"
                >
                  <Code2 className="w-4 h-4" />
                  View Code
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              )}

              {(project.techStack ?? []).length > 0 && (
                <div className="mt-4 p-5 rounded-xl bg-surface-dark border border-white/5">
                  <p className="text-slate-500 text-xs uppercase tracking-widest mb-4">Tech Stack</p>
                  <div className="flex flex-col gap-2">
                    {project.techStack!.map((tag) => (
                      <div key={tag} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        <span className="text-slate-300 text-sm">{tag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <TableOfContentsPanel headings={headings} label="On this page" />
            </div>
          </aside>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-12 lg:hidden">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-primary text-black text-sm font-bold uppercase tracking-widest rounded-xl hover:bg-primary/90 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Live Preview
            </a>
          )}
          {project.codeUrl && (
            <a
              href={project.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 text-white text-sm font-bold uppercase tracking-widest rounded-xl border border-white/15 hover:border-primary hover:text-primary transition-colors"
            >
              <Code2 className="w-4 h-4" />
              View Code
            </a>
          )}
        </div>

        {related.length > 0 && (
          <div className="mt-24 pt-12 border-t border-white/5">
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="text-primary text-xs font-bold uppercase tracking-[0.2em] block mb-2">
                  More Projects
                </span>
                <h2 className="font-serif text-3xl md:text-4xl text-white">Other Projects</h2>
              </div>
              <Link
                href="/#projects"
                className="hidden md:inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors text-sm font-bold uppercase tracking-wider"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {related.map((rp) => (
                <Link
                  key={rp._id}
                  href={`/projects/${rp.slug.current}`}
                  className="group relative rounded-2xl overflow-hidden aspect-video bg-surface-dark border border-white/5 hover:border-primary/30 transition-all duration-500"
                >
                  {rp.coverImage ? (
                    <Image
                      src={urlFor(rp.coverImage).width(800).height(450).url()}
                      alt={rp.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent" />
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <span className="text-primary text-xs font-bold uppercase tracking-widest block mb-1">
                      {rp.category}
                    </span>
                    <h3 className="font-serif text-2xl text-white group-hover:text-primary transition-colors">
                      {rp.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
