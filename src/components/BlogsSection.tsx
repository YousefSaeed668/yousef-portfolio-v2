import { ArrowRight, Clock, Tag } from "lucide-react";

interface BlogPost  {
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  featured?: boolean;
  gradient: string; 
};

const posts: BlogPost[] = [
  {
    title: "Building Scalable APIs with Node.js and PostgreSQL",
    excerpt:
      "A deep dive into designing REST APIs that handle millions of requests — covering connection pooling, query optimization, and clean architecture patterns.",
    category: "Backend",
    readTime: "8 min read",
    date: "Feb 2025",
    featured: true,
    gradient: "from-orange-900/40 via-background-dark to-background-dark",
  },
  {
    title: "The Art of Micro-Interactions in React",
    excerpt:
      "How subtle animations transform a good UI into an unforgettable experience — practical examples with Framer Motion.",
    category: "Frontend",
    readTime: "5 min read",
    date: "Jan 2025",
    gradient: "from-slate-800/60 to-background-dark",
  },
  {
    title: "TypeScript Patterns Every Dev Should Know",
    excerpt:
      "Discriminated unions, mapped types, and template literal types — the advanced features that make TypeScript truly shine.",
    category: "TypeScript",
    readTime: "6 min read",
    date: "Dec 2024",
    gradient: "from-blue-900/30 to-background-dark",
  },
  {
    title: "Database Indexing: Beyond the Basics",
    excerpt:
      "Partial indexes, composite indexes, and when NOT to index — a practical guide to squeezing maximum performance from your database.",
    category: "Database",
    readTime: "7 min read",
    date: "Nov 2024",
    gradient: "from-emerald-900/30 to-background-dark",
  },
];

function FeaturedCard({ post }: { post: BlogPost }) {
  return (
    <a
      href="#"
      className="group relative flex flex-col justify-end rounded-2xl overflow-hidden min-h-110 bg-surface-dark border border-white/5 hover:border-primary/30 transition-all duration-500"
    >
      <div
        className={`absolute inset-0 bg-linear-to-br ${post.gradient} transition-opacity duration-500 group-hover:opacity-80`}
      />
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />

      <div className="absolute top-6 left-6">
        <span className="bg-primary text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Featured
        </span>
      </div>

      <div className="relative z-10 p-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-widest">
            <Tag className="w-3 h-3" />
            {post.category}
          </span>
          <span className="flex items-center gap-1.5 text-slate-400 text-xs">
            <Clock className="w-3 h-3" />
            {post.readTime}
          </span>
          <span className="text-slate-500 text-xs ml-auto">{post.date}</span>
        </div>
        <h3 className="font-serif text-3xl md:text-4xl text-white leading-tight mb-4 group-hover:text-primary transition-colors duration-300">
          {post.title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-lg">
          {post.excerpt}
        </p>
        <div className="inline-flex items-center gap-2 text-white text-sm font-bold uppercase tracking-widest border-b border-primary pb-1 group-hover:text-primary transition-colors">
          <span>Read Article</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </a>
  );
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <a
      href="#"
      className="group relative flex flex-col rounded-2xl overflow-hidden bg-surface-dark border border-white/5 hover:border-primary/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(236,127,19,0.07)]"
    >
      <div
        className={`h-32 w-full bg-linear-to-br ${post.gradient} transition-all duration-500 group-hover:h-36`}
      />

      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-primary text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
            <Tag className="w-3 h-3" />
            {post.category}
          </span>
          <span className="text-slate-500 text-xs ml-auto">{post.date}</span>
        </div>

        <h3 className="font-serif text-xl text-white mb-3 leading-snug group-hover:text-primary transition-colors duration-300 flex-1">
          {post.title}
        </h3>

        <p className="text-slate-400 text-sm leading-relaxed mb-5 line-clamp-2">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
          <span className="flex items-center gap-1.5 text-slate-500 text-xs">
            <Clock className="w-3 h-3" />
            {post.readTime}
          </span>
          <span className="text-primary text-xs font-bold uppercase tracking-wider flex items-center gap-1 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
            Read <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </a>
  );
}

export default function BlogsSection() {
  const featured = posts.find((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);

  return (
    <section
      className="py-32 px-6 md:px-12 bg-background-dark"
      id="blog"
    >
      <div className="max-w-350 mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/10">
          <div>
            <span className="text-primary text-sm font-bold tracking-[0.2em] uppercase block mb-4">
              Writing
            </span>
            <h2 className="font-serif text-5xl md:text-7xl text-white leading-tight">
              Latest{" "}
              <span className="text-white/20">Articles</span>
            </h2>
          </div>
          <p className="text-slate-400 max-w-xs mt-6 md:mt-0 text-sm leading-relaxed md:text-right">
            Thoughts on engineering, architecture, and the craft of building
            great software.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {featured && (
            <div className="lg:col-span-3">
              <FeaturedCard post={featured} />
            </div>
          )}

          <div className="lg:col-span-2 flex flex-col gap-6">
            {rest.map((post, i) => (
              <BlogCard key={i} post={post} />
            ))}
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href="#"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 text-white text-sm font-bold uppercase tracking-widest hover:border-primary hover:text-primary transition-all duration-300 group"
          >
            View All Articles
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
}
