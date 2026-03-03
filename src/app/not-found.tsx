import { ArrowLeft, ArrowRight, FileText, Home, Layers } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background-dark px-6 md:px-12 py-20">
      <section className="max-w-350 mx-auto min-h-[calc(100vh-10rem)] flex items-center">
        <div className="w-full rounded-3xl border border-white/10 bg-surface-dark p-8 md:p-14">
          <span className="text-primary text-xs md:text-sm font-bold tracking-[0.2em] uppercase block mb-4">
            Error 404
          </span>

          <div className="border-b border-white/10 pb-8 mb-10">
            <p className="font-serif text-6xl md:text-8xl text-white/15 leading-none mb-4">
              404
            </p>
            <h1 className="font-serif text-4xl md:text-6xl text-white leading-tight mb-5">
              This page could not be found.
            </h1>
            <p className="text-slate-400 text-base md:text-lg max-w-2xl leading-relaxed">
              The link may be broken, or the page may have been moved. Use one
              of the routes below to continue browsing.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mb-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-black text-sm font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back To Home
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 text-white text-sm font-bold uppercase tracking-widest hover:border-primary hover:text-primary transition-colors"
            >
              View Projects
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/"
              className="group rounded-2xl border border-white/10 bg-background-dark/50 p-5 hover:border-primary/40 transition-colors"
            >
              <Home className="w-4 h-4 text-primary mb-3" />
              <p className="text-white font-semibold mb-1 group-hover:text-primary transition-colors">
                Portfolio Home
              </p>
              <p className="text-slate-500 text-sm">
                Return to the main landing page.
              </p>
            </Link>

            <Link
              href="/projects"
              className="group rounded-2xl border border-white/10 bg-background-dark/50 p-5 hover:border-primary/40 transition-colors"
            >
              <Layers className="w-4 h-4 text-primary mb-3" />
              <p className="text-white font-semibold mb-1 group-hover:text-primary transition-colors">
                All Projects
              </p>
              <p className="text-slate-500 text-sm">
                Explore selected work and case studies.
              </p>
            </Link>

            <Link
              href="/blogs"
              className="group rounded-2xl border border-white/10 bg-background-dark/50 p-5 hover:border-primary/40 transition-colors"
            >
              <FileText className="w-4 h-4 text-primary mb-3" />
              <p className="text-white font-semibold mb-1 group-hover:text-primary transition-colors">
                Articles & Notes
              </p>
              <p className="text-slate-500 text-sm">
                Read engineering write-ups and guides.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
