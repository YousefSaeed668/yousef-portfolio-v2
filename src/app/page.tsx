import { client } from "@/sanity/lib/client";
import {
  CV_QUERY,
  EXPERIENCE_QUERY,
  POSTS_PREVIEW_QUERY,
  PROJECTS_PREVIEW_QUERY,
  type CvQueryResult,
  type ExperienceQueryResult,
  type PostListItem,
  type ProjectListItem,
} from "@/sanity/lib/queries";
import BlogsSection from "../components/BlogsSection";
import ExperienceSection from "../components/ExperienceSection";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import SelectedWorksSection from "../components/SelectedWorksSection";

export const revalidate = 604800;

export default async function Home() {
  const [projects, experiences, posts, cv] = await Promise.all([
    client.fetch<ProjectListItem[]>(PROJECTS_PREVIEW_QUERY, {}, { next: { tags: ['project'] } }),
    client.fetch<ExperienceQueryResult[]>(EXPERIENCE_QUERY, {}, { next: { tags: ['experience'] } }),
    client.fetch<PostListItem[]>(POSTS_PREVIEW_QUERY, {}, { next: { tags: ['post'] } }),
    client.fetch<CvQueryResult | null>(CV_QUERY, {}, { next: { tags: ['cv'] } }),
  ]);

  return (
    <main className="relative w-full">
      <HeroSection cvUrl={cv?.fileUrl ?? null} />
      <ExperienceSection experiences={experiences} />
      <SelectedWorksSection projects={projects} />
      <BlogsSection posts={posts} />
      <Footer />
    </main>
  );
}
