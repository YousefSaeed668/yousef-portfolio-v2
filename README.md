# Yousef Saeed Portfolio

A personal portfolio and writing platform built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, and **Sanity CMS**.

The project includes:
- A homepage with hero, experience timeline, selected projects, and latest articles
- Dedicated `Projects` and `Blogs` listing pages
- Dynamic detail pages for each project and blog post
- Embedded Sanity Studio at `/studio`
- SEO support via metadata, dynamic sitemap, and robots rules
- On-demand cache revalidation via a secured webhook endpoint

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- Sanity CMS (Studio + Content Lake)
- next-sanity
- Shiki (code highlighting)
- Lucide React (icons)

## Routes

- `/` Home
- `/projects` All projects
- `/projects/[slug]` Project details
- `/blogs` All articles
- `/blogs/[slug]` Article details
- `/studio` Sanity Studio
- `/api/revalidate` Sanity webhook revalidation endpoint

## Content Model (Sanity)

The Studio schema defines 4 document types:

- `project`
- `post`
- `experience`
- `cv`

### `project` highlights
- Title, slug, category, short description, cover image
- Tech stack tags
- Optional links (live preview, code, video)
- Rich body content with headings and callouts
- Custom display `order`

### `post` highlights
- Title, slug, category, publish date, cover image, excerpt
- Rich body content with:
  - Portable text blocks
  - Custom code blocks (language + code)
  - Custom callouts
- Optional SEO object (meta title, meta description, OG image)

### `experience` highlights
- Company, role, employment type, location
- Start/end dates
- Description, achievements, tech stack
- Optional custom `order`

### `cv` highlights
- PDF file field
- Optional update timestamp

## Project Structure

```text
.
├── public/
├── src/
│   ├── app/
│   │   ├── api/revalidate/
│   │   ├── blogs/
│   │   ├── projects/
│   │   ├── studio/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components/
│   ├── lib/
│   └── sanity/
├── sanity.config.ts
├── sanity.cli.ts
└── package.json
```

## Environment Variables

Create `.env.local` in the project root:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_REVALIDATE_SECRET=your_strong_secret
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SANITY_API_VERSION=2026-03-01
```

Notes:
- `NEXT_PUBLIC_SANITY_API_VERSION` is optional in this project (it falls back to `2026-03-01`).
- Keep `SANITY_REVALIDATE_SECRET` private and never commit `.env.local`.

## Getting Started

### 1) Install dependencies

Use one package manager (examples):

```bash
npm install
```

or

```bash
bun install
```

### 2) Start development server

```bash
npm run dev
```

Open `http://localhost:3000`.

### 3) Open Sanity Studio

Visit:

```text
http://localhost:3000/studio
```

## Revalidation Webhook

The app supports tag-based revalidation through:

```text
POST /api/revalidate
```

Requirements:
- Webhook must include a valid signature using `SANITY_REVALIDATE_SECRET`
- Payload must include `_type` (for example: `post`, `project`, `experience`, `cv`)

When valid, the endpoint revalidates the matching cache tag.

## Available Scripts

- `npm run dev` - Start dev server
- `npm run build` - Production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## SEO and Metadata

Implemented in-app:
- Global metadata in root layout
- Per-page metadata for projects/blog pages
- Dynamic sitemap including project and blog slugs
- Robots policy that disallows `/studio` and `/api/revalidate`

## Customization Notes

- Main personal/contact links are defined in footer and hero-related UI components.
- Project and blog presentation is content-driven from Sanity.
- Table of contents and reading-time behavior are generated from rich text content.

## Deployment

Deploy as a standard Next.js App Router project (for example on Vercel).

Set all required environment variables in your deployment platform before going live.
