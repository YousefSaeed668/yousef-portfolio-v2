import { Menu } from "lucide-react";

export default function Header() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 mix-blend-difference px-6 py-6 md:px-12 flex justify-between items-center pointer-events-none">
      <a className="pointer-events-auto group" href="#">
        <span className="font-bold text-xl tracking-tight text-white group-hover:text-primary transition-colors duration-300">
          YOUSEF.DEV
        </span>
      </a>
      <div className="pointer-events-auto hidden md:flex gap-8 items-center">
        <a
          className="text-sm font-medium uppercase tracking-widest text-white/80 hover:text-primary transition-colors"
          href="#work"
        >
          Work
        </a>
        <a
          className="text-sm font-medium uppercase tracking-widest text-white/80 hover:text-primary transition-colors"
          href="#about"
        >
          About
        </a>
        <a
          className="text-sm font-medium uppercase tracking-widest text-white/80 hover:text-primary transition-colors"
          href="#contact"
        >
          Contact
        </a>
      </div>
      <button className="pointer-events-auto md:hidden text-white">
        <Menu className="w-6 h-6" />
      </button>
    </nav>
  );
}
