"use client";

import { BlogCard } from "@/components/BlogCard";
import { containerVariants, easePrecise, springGentle, springSnappy } from "@/lib/motion";
import { urlFor } from "@/sanity/lib/image";
import type { PostListItem } from "@/sanity/lib/queries";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Search, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


function HeroCard({ post }: { post: PostListItem }) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  return (
    <Link
      href={`/blogs/${post.slug.current}`}
      className="group relative flex flex-col justify-end rounded-2xl overflow-hidden min-h-110 bg-surface-dark border border-white/5 hover:border-primary/30 transition-all duration-500"
    >
      {post.coverImage ? (
        <>
          <Image
            src={urlFor(post.coverImage).url()}
            alt={post.title}
            fill
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="absolute inset-0 object-cover transition-opacity duration-500 group-hover:opacity-80"
          />

          <div className="absolute inset-0 bg-linear-to-t from-background-dark via-background-dark/50 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 h-3/4 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
        </>
      ) : (
        <div className="absolute inset-0 bg-linear-to-br from-primary/30 to-surface-dark transition-opacity duration-500 group-hover:opacity-80" />
      )}

      <div className="relative z-10 p-8 md:p-10">
        <div className="flex flex-wrap items-center gap-4 mb-5">
          <span className="flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-widest [text-shadow:0_1px_8px_rgba(0,0,0,0.9)]">
            <Tag className="w-3 h-3" />
            {post.category}
          </span>
          <span className="text-slate-200 text-xs ml-auto [text-shadow:0_1px_8px_rgba(0,0,0,0.9)]">{formattedDate}</span>
        </div>
        <h2 className="font-serif text-3xl md:text-5xl text-white leading-tight mb-4 group-hover:text-primary transition-colors duration-300 [text-shadow:0_2px_12px_rgba(0,0,0,0.8)]">
          {post.title}
        </h2>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8 max-w-2xl">
          {post.excerpt}
        </p>
        <div className="inline-flex items-center gap-2 text-white text-sm font-bold uppercase tracking-widest border-b border-primary pb-1 group-hover:text-primary transition-colors">
          <span>Read Article</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </Link>
  );
}

interface BlogClientShellProps {
  posts: PostListItem[];
  categories: string[];
  stats: {
    totalArticles: number;
    avgReadTime: string;
    totalTopics: number;
  };
}

export function BlogClientShell({ posts, categories, stats }: BlogClientShellProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = posts.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch =
      query === "" ||
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchSearch;
  });

  const hero = filtered[0];
  const rest = filtered.slice(1);

  return (
    <>
      <motion.div
        className="flex items-center gap-4 mb-8"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springGentle, delay: 0.15 }}
      >
        <div className="relative flex-1 md:max-w-xs">
          <Search className="absolute left-3 w-4 h-4 text-slate-500 pointer-events-none top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search articles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-surface-dark border border-white/10 rounded-full pl-9 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>
      </motion.div>

      <motion.div
        className="flex flex-wrap gap-2 mb-12"
        variants={containerVariants(0.06, 0.25)}
        initial="hidden"
        animate="visible"
      >
        {categories.map((cat) => (
          <motion.button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="relative px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-colors duration-200 overflow-hidden"
            style={{
              borderColor: activeCategory === cat ? 'var(--color-primary)' : 'rgba(255,255,255,0.1)',
              color: activeCategory === cat ? 'black' : 'rgb(148,163,184)',
            }}
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { ...springSnappy } } }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence>
              {activeCategory === cat && (
                <motion.span
                  layoutId="activePill"
                  className="absolute inset-0 bg-primary rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22, ease: easePrecise }}
                />
              )}
            </AnimatePresence>
            <span className="relative z-10">{cat}</span>
          </motion.button>
        ))}
      </motion.div>


      <AnimatePresence mode="wait">
        {filtered.length === 0 && (
          <motion.div
            key="empty"
            className="py-32 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ ...springGentle }}
          >
            <p className="text-5xl mb-4">🔍</p>
            <h3 className="font-serif text-2xl text-white mb-2">No articles found</h3>
            <p className="text-slate-400 text-sm">Try a different category or search term.</p>
          </motion.div>
        )}
      </AnimatePresence>


      {filtered.length > 0 && (
        <>
          {hero && (
            <div className="mb-6">
              <HeroCard post={hero} />
            </div>
          )}

          {rest.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </>
      )}


      <motion.div
        className="mt-20 pt-8 border-t border-white/5 flex flex-wrap gap-8 text-center justify-center"
        variants={containerVariants(0.1, 0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        {[
          { value: stats.totalArticles.toString(), label: "Articles" },
          { value: stats.avgReadTime, label: "Avg. read time" },
          { value: stats.totalTopics.toString(), label: "Topics covered" },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            className="flex flex-col items-center"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { ...springGentle } } }}
          >
            <span className="font-serif text-4xl text-white mb-1">{stat.value}</span>
            <span className="text-slate-500 text-xs uppercase tracking-widest">{stat.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}
