export default function Footer() {
  return (
    <footer
      className="relative bg-background-dark min-h-screen flex flex-col justify-between px-6 md:px-12 py-12 overflow-hidden"
      id="contact"
    >
      <div className="flex flex-col md:flex-row justify-between items-start gap-12 pt-20">
        <div className="max-w-xl">
          <h3 className="text-white text-2xl md:text-3xl font-serif mb-6">
            Available for select freelance opportunities.
          </h3>
          <p className="text-slate-400 text-lg leading-relaxed mb-8">
            Have a project in mind that requires technical excellence and
            editorial precision? Let&apos;s build something iconic.
          </p>
          <a
            className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors text-lg font-bold border-b border-primary pb-1"
            href="mailto:alexander@example.com"
          >
            alexander@example.com
          </a>
        </div>
        <div className="grid grid-cols-2 gap-x-16 gap-y-4">
          <div className="flex flex-col gap-2">
            <span className="text-slate-500 text-xs uppercase tracking-widest mb-2">
              Socials
            </span>
            <a className="text-white hover:text-primary transition-colors" href="#">
              GitHub
            </a>
            <a className="text-white hover:text-primary transition-colors" href="#">
              LinkedIn
            </a>
            <a className="text-white hover:text-primary transition-colors" href="#">
              Twitter / X
            </a>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-slate-500 text-xs uppercase tracking-widest mb-2">
              Sitemap
            </span>
            <a className="text-white hover:text-primary transition-colors" href="#">
              Home
            </a>
            <a className="text-white hover:text-primary transition-colors" href="#">
              Work
            </a>
            <a className="text-white hover:text-primary transition-colors" href="#">
              About
            </a>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-24">
        <a className="group block w-full text-center" href="mailto:alexander@example.com">
          <span className="block text-[12vw] leading-none font-bold text-transparent text-outline-stroke group-hover:text-primary transition-all duration-500 ease-in-out">
            LET&apos;S WORK
          </span>
        </a>
        <div className="flex justify-between items-end mt-8 border-t border-white/10 pt-8">
          <p className="text-slate-500 text-xs md:text-sm">
            © 2024 Alexander Dev. All Rights Reserved.
          </p>
          <div className="text-slate-500 text-xs md:text-sm text-right">
            Designed with Precision
            <br />
            Coded with Passion
          </div>
        </div>
      </div>
    </footer>
  );
}
