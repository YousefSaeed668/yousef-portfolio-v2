import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { defineQuery } from 'next-sanity'

export interface SanitySlug {
  _type?: 'slug'
  current: string
}

export type SanityImage = SanityImageSource | null

export interface PortableTextSpan {
  _key: string
  _type: 'span'
  marks?: string[]
  text: string
}

export interface PortableTextLinkMarkDef {
  _key: string
  _type: 'link'
  href?: string
  openInNewTab?: boolean
}

export interface PostBodyBlock {
  _key: string
  _type: 'block'
  children?: PortableTextSpan[]
  markDefs?: PortableTextLinkMarkDef[]
  style?: 'normal' | 'h2' | 'h3' | 'h4' | string
}

export interface PostCodeBlock {
  _key: string
  _type: 'codeBlock'
  code?: string
  language?: 'ts' | 'js' | 'tsx' | 'jsx' | 'bash' | 'json' | 'css' | 'html' | string
  filename?: string
}

export interface PostCalloutBlock {
  _key: string
  _type: 'callout'
  text?: string
}

export type PostBodyItem = PostBodyBlock | PostCodeBlock | PostCalloutBlock
export type PostBody = PostBodyItem[]

export interface ExperienceQueryResult {
  _id: string
  achievements?: string[]
  company: string
  description?: string
  employmentType: string
  endDate?: string
  jobTitle: string
  location?: string
  startDate: string
  techStack?: string[]
}

export interface ProjectListItem {
  _id: string
  category: string
  coverImage?: SanityImage
  shortDescription: string
  slug: SanitySlug
  techStack?: string[]
  title: string
}

export interface ProjectBySlugResult {
  _id: string
  body?: PostBody
  category: string
  codeUrl?: string
  coverImage?: SanityImage
  liveUrl?: string
  shortDescription: string
  techStack?: string[]
  title: string
  videoUrl?: string
}

export interface PostSeo {
  metaDescription?: string
  metaTitle?: string
  ogImage?: SanityImage
}

export interface PostListItem {
  _id: string
  body?: PostBody
  category: string
  coverImage?: SanityImage
  excerpt: string
  publishedAt: string
  slug: SanitySlug
  title: string
}

export interface PostBySlugResult extends PostListItem {
  seo?: PostSeo
}

export const EXPERIENCE_QUERY = defineQuery(`
  *[_type == "experience"] | order(startDate desc) {
    _id,
    company,
    jobTitle,
    employmentType,
    location,
    startDate,
    endDate,
    description,
    achievements,
    techStack
  }
`)

export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project"] | order(order asc) {
    _id,
    title,
    slug,
    category,
    shortDescription,
    coverImage,
    techStack
  }
`)

export const PROJECTS_PREVIEW_QUERY = defineQuery(`
  *[_type == "project"] | order(order asc) [0...3] {
    _id,
    title,
    slug,
    category,
    shortDescription,
    coverImage,
    techStack
  }
`)

export const PROJECT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    category,
    shortDescription,
    coverImage,
    techStack,
    liveUrl,
    codeUrl,
    videoUrl,
    body
  }
`)

export const POSTS_QUERY = defineQuery(`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    category,
    publishedAt,
    coverImage,
    excerpt,
    body
  }
`)

export const POSTS_PREVIEW_QUERY = defineQuery(`
  *[_type == "post"] | order(publishedAt desc) [0...4] {
    _id,
    title,
    slug,
    category,
    publishedAt,
    coverImage,
    excerpt,
    body
  }
`)

export const POST_BY_SLUG_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category,
    publishedAt,
    coverImage,
    excerpt,
    body,
    seo
  }
`)

export interface CvQueryResult {
  fileUrl: string | null
}

export const CV_QUERY = defineQuery(`
  *[_type == "cv"][0] {
    "fileUrl": file.asset->url
  }
`)
