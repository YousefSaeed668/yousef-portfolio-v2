import { ArrowDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full flex flex-col justify-end pb-20 px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-linear-to-b from-background-dark/30 via-transparent to-background-dark z-10"></div>
        <div
          className="w-full h-full bg-cover bg-center grayscale opacity-60"
          style={{
            backgroundImage:
              "url('/heroimage.jpg')",
          }}
        ></div>
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
            Specializing in deep-impact digital experiences. Building the future
            of web infrastructure, one line at a time.
          </p>
          <div className="flex items-center gap-2 text-white/60 hover:text-primary transition-colors cursor-pointer group">
            <span className="text-sm font-medium uppercase tracking-widest group-hover:mr-2 transition-all">
              Scroll to Explore
            </span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
