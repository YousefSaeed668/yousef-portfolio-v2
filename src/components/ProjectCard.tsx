import Image from "next/image";
import Link from "next/link";

type ProjectCardProps = {
  slug: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  reverse?: boolean;
};

export default function ProjectCard({
  slug,
  category,
  title,
  description,
  tags,
  imageUrl,
  reverse = false,
}: ProjectCardProps) {
  return (
    <article className="group relative grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
      <div
        className={`md:col-span-7 relative overflow-hidden rounded-lg aspect-4/3 md:aspect-[16/10]${reverse ? " md:order-2" : ""}`}
      >
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover  object-top transition-transform duration-700 group-hover:scale-101"
          sizes="(max-width: 768px) 100vw, 58vw"
        />
      </div>
      <div
        className={`md:col-span-5 flex flex-col justify-center${reverse ? " md:order-1 md:text-right md:items-end" : ""}`}
      >
        <span className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-4">
          {category}
        </span>
        <h3 className="font-serif text-4xl md:text-5xl text-white mb-6 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className={`text-slate-400 mb-8 leading-relaxed${reverse ? " max-w-md" : ""}`}>
          {description}
        </p>
        <div className={`flex flex-wrap gap-2 mb-8${reverse ? " md:justify-end" : ""}`}>
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 border border-white/10 rounded-full text-xs text-slate-300"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link
          href={`/projects/${slug}`}
          className={`${reverse ? "" : "self-start "}text-white border border-white/20 rounded-full px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all w-fit`}
        >
          View Project
        </Link>
      </div>
    </article>
  );
}
