import { Download } from "lucide-react";
import Image from "next/image";

interface Props {
  cvUrl: string | null;
}

export default function HeroSection({ cvUrl }: Props) {
  return (
    <section className="relative h-screen w-full flex flex-col justify-end pb-20 px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-linear-to-b from-background-dark/30 via-transparent to-background-dark z-10" />
        <Image
          src="/heroimage.jpg"
          alt="Hero background"
          fill
          priority
          className="object-cover opacity-60 grayscale"
          style={{ objectPosition: "72% 43%" }}
        />
      </div>

      <div className="relative z-20 max-w-350 w-full mx-auto">
        <div className="flex flex-col items-start">
          <span className="text-primary text-sm md:text-base font-bold tracking-[0.2em] uppercase mb-4 animate-pulse">
            FULL-STACK DEVELOPER
          </span>
          <h1 className="font-serif text-6xl md:text-8xl lg:text-[10rem] leading-[0.9] text-white mix-blend-overlay opacity-90">
            YOUSEF
            <br />
            <span className="italic font-light ml-12 md:ml-32">SAEED</span>
          </h1>
        </div>
        <div className="mt-12 flex flex-col md:flex-row justify-between items-end gap-8 border-t border-white/10 pt-8">
          <p className="max-w-md text-slate-300 text-lg leading-relaxed font-light">
            Full-stack engineer turning complex problems into clean, scalable products. I care deeply about performance, clarity, and great UX
          </p>

          {cvUrl ? (
            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="group flex items-center gap-3 px-7 py-3.5 rounded-full border border-primary/50 text-primary hover:bg-primary hover:text-black transition-all duration-300"
            >
              <Download className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0" />
              <span className="text-sm font-bold uppercase tracking-widest">
                Download CV
              </span>
            </a>
          ) : (
            <button disabled className="flex items-center gap-3 px-7 py-3.5 rounded-full border border-white/10 text-white/30 cursor-not-allowed select-none">
              <Download className="w-4 h-4" />
              <span className="text-sm font-bold uppercase tracking-widest">
                Download CV
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
