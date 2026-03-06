import { BlogClientShell } from "@/app/blogs/_components/BlogClientShell";
import { BlogsPageHeader } from "@/app/blogs/_components/BlogsPageHeader";
import { calcReadTime } from "@/lib/helper";
import { client } from "@/sanity/lib/client";
import { POSTS_QUERY, type PostListItem } from "@/sanity/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles & Notes",
  description:
    "Practical write-ups on frontend, backend, and everything in between. A mix of quick tips and deep dives on engineering, architecture, and the craft of building great software.",
  openGraph: {
    title: "Articles & Notes — Yousef",
    description:
      "Practical write-ups on frontend, backend, and everything in between. A mix of quick tips and deep dives.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Articles & Notes — Yousef",
    description:
      "Practical write-ups on frontend, backend, and everything in between.",
  },
};

export const revalidate = 604800;


function buildCategories(posts: PostListItem[]): string[] {
  const unique = Array.from(new Set(posts.map((p) => p.category))).sort();
  return ["All", ...unique];
}


function buildStats(posts: PostListItem[]) {
  if (posts.length === 0) {
    return { totalArticles: 0, avgReadTime: "0 min", totalTopics: 0 };
  }
  const totalMins = posts.reduce((sum, p) => sum + calcReadTime(p.body ?? []), 0);
  const avgMins = Math.round(totalMins / posts.length);
  const uniqueCategories = new Set(posts.map((p) => p.category)).size;
  return {
    totalArticles: posts.length,
    avgReadTime: `${avgMins} min`,
    totalTopics: uniqueCategories,
  };
}

export default async function BlogPage() {
  const posts = await client.fetch<PostListItem[]>(POSTS_QUERY, {}, { next: { tags: ['post'] } });
  const categories = buildCategories(posts);
  const stats = buildStats(posts);

  return (
    <div className="min-h-screen bg-background-dark">


      <main className="max-w-350 mx-auto px-6 md:px-12 py-16">

        <BlogsPageHeader />


        <BlogClientShell posts={posts} categories={categories} stats={stats} />
      </main>
    </div>
  );
}
