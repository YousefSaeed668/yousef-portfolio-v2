import { client } from "@/sanity/lib/client";
import type { MetadataRoute } from "next";

interface ProjectSitemapItem {
  _updatedAt?: string;
  slug: string;
}

interface PostSitemapItem {
  _updatedAt?: string;
  publishedAt?: string;
  slug: string;
}

const PROJECT_SITEMAP_QUERY = `*[_type == "project" && defined(slug.current)]{
  "slug": slug.current,
  _updatedAt
}`;

const POST_SITEMAP_QUERY = `*[_type == "post" && defined(slug.current)]{
  "slug": slug.current,
  publishedAt,
  _updatedAt
}`;

function toDate(value?: string): Date | undefined {
  if (!value) return undefined;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/blogs`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  try {
    const [projects, posts] = await Promise.all([
      client.fetch<ProjectSitemapItem[]>(PROJECT_SITEMAP_QUERY, {}, { next: { tags: ["project"] } }),
      client.fetch<PostSitemapItem[]>(POST_SITEMAP_QUERY, {}, { next: { tags: ["post"] } }),
    ]);

    const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      lastModified: toDate(project._updatedAt) ?? now,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

    const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${siteUrl}/blogs/${post.slug}`,
      lastModified: toDate(post.publishedAt) ?? toDate(post._updatedAt) ?? now,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

    return [...staticRoutes, ...projectRoutes, ...postRoutes];
  } catch {
    return staticRoutes;
  }
}
