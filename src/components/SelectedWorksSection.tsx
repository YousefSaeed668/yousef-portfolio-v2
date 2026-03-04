import { urlFor } from "@/sanity/lib/image";
import { type ProjectListItem } from "@/sanity/lib/queries";
import Link from "next/link";
import ProjectCard from "./ProjectCard";

interface Props {
  projects: ProjectListItem[];
}

export default function SelectedWorksSection({ projects }: Props) {
  return (
    <section className="py-20 bg-surface-dark px-6 md:px-12" id="projects">
      <div className="max-w-350 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8">
          <h2 className="font-serif text-5xl md:text-7xl text-white">
            Selected
            <br />
            <span className="text-white/20">Works</span>
          </h2>
          <p className="text-slate-400 text-right max-w-sm mt-8 md:mt-0">
            A curation of projects that define the intersection of luxury design
            and robust engineering.
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

        <div className="flex justify-center mt-24">
          <Link
            href="/projects"
            className="text-white border border-white/20 rounded-full px-10 py-4 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
