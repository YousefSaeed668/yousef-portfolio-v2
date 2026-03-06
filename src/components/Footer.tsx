import Link from "next/link";


export default function Footer() {
  const date = new Date().getFullYear();
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
            href="mailto:yousefsaeed668@gmail.com"
          >
            yousefsaeed668@gmail.com
          </a>
        </div>
        <div className="grid grid-cols-2 gap-x-16 gap-y-4">
          <div className="flex flex-col gap-2">
            <span className="text-slate-500 text-xs uppercase tracking-widest mb-2">
              Socials
            </span>
            <a className="text-white hover:text-primary transition-colors" href="https://github.com/YousefSaeed668/" target="_blank">
              GitHub
            </a>
            <a className="text-white hover:text-primary transition-colors" href="https://www.linkedin.com/in/yousefsaeed668/" target="_blank">
              LinkedIn
            </a>
            <a className="text-white hover:text-primary transition-colors" href="https://x.com/YousefSaeed668" target="_blank">
              Twitter / X
            </a>
            <a className="text-white hover:text-primary transition-colors" href="https://wa.me/+201203862400?text=Hi Yousef, I visited your portfolio and I would like to connect with you." target="_blank">
              WhatsApp
            </a>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-slate-500 text-xs uppercase tracking-widest mb-2">
              Sitemap
            </span>
            <Link className="text-white hover:text-primary transition-colors" href="/#home">
              Home
            </Link>
            <Link className="text-white hover:text-primary transition-colors" href="/projects">
              Projects
            </Link>
            <Link className="text-white hover:text-primary transition-colors" href="/blogs">
              Blogs
            </Link>
            <Link className="text-white hover:text-primary transition-colors" href="/#contact">
              Contact
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-24">
        <a className="group block w-full text-center" href="mailto:yousefsaeed668@gmail.com">
          <span className="block text-[12vw] leading-none font-bold text-transparent text-outline-stroke group-hover:text-primary transition-all duration-500 ease-in-out">
            LET&apos;S WORK
          </span>
        </a>
        <div className="flex justify-between items-end mt-8 border-t border-white/10 pt-8">
          <p className="text-slate-500 text-xs md:text-sm">
            © {date} Yousef Saeed. All Rights Reserved.
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
