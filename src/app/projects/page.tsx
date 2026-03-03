import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PROJECTS_QUERY, type ProjectListItem } from "@/sanity/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Projects",
  description:
    "A full collection of projects spanning design, engineering, and everything in between — from web apps to developer tooling.",
  openGraph: {
    title: "All Projects — Yousef",
    description:
      "A full collection of projects spanning design, engineering, and everything in between.",

    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "All Projects — Yousef",
    description:
      "A full collection of projects spanning design, engineering, and everything in between.",
  },
};

export const revalidate = 604800;

export default async function ProjectsPage() {
  const projects = await client.fetch<ProjectListItem[]>(
    PROJECTS_QUERY,
    {},
    { next: { tags: ["project"] } }
  );

  return (
    <>
      <main className="relative w-full">
        <section className="py-20 bg-surface-dark px-6 md:px-12 min-h-screen">
          <div className="max-w-350 mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8">
              <h1 className="font-serif text-5xl md:text-7xl text-white">
                All
                <br />
                <span className="text-white/20">Projects</span>
              </h1>
              <p className="text-slate-400 text-right max-w-sm mt-8 md:mt-0">
                A full collection of projects spanning design, engineering, and
                everything in between.
              </p>
            </div>

            <div className="flex flex-col gap-24">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project._id}
                  slug={project.slug.current}
                  category={project.category}
                  title={project.title}
                  description={project.shortDescription}
                  tags={project.techStack ?? []}
                  imageUrl={
                    project.coverImage
                      ? urlFor(project.coverImage).url()
                      : ""
                  }
                  reverse={index % 2 !== 0}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
