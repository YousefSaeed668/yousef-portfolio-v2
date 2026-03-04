import { formatPeriod } from "@/lib/helper";
import { type ExperienceQueryResult } from "@/sanity/lib/queries";
import { Briefcase, CalendarDays, MapPin } from "lucide-react";

interface Props {
  experiences: ExperienceQueryResult[];
}


export default function ExperienceSection({ experiences }: Props) {
  return (
    <section
      className="py-32 px-6 md:px-12 relative bg-background-dark"
      id="experience"
    >
      <div className="max-w-275 mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 pb-8 border-b border-white/10">
          <div>
            <span className="text-primary text-sm font-bold tracking-[0.2em] uppercase block mb-4">
              Career
            </span>
            <h2 className="font-serif text-5xl md:text-7xl text-white leading-tight">
              Experience
            </h2>
          </div>
          <p className="text-slate-400 max-w-xs mt-6 md:mt-0 text-sm leading-relaxed md:text-right">
            Where I&apos;ve worked, what I&apos;ve built, and the impact I&apos;ve made.
          </p>
        </div>

        <div className="relative">
          {experiences.length > 1 && (
            <div className="absolute left-0 md:left-55 top-0 bottom-0 w-px bg-white/5 hidden md:block" />
          )}

          <div className="flex flex-col gap-0">
            {experiences.map((exp) => (
              <div
                key={exp._id}
                className="group relative flex flex-col md:flex-row gap-0 md:gap-16"
              >
                <div className="md:w-55 md:shrink-0 mb-8 md:mb-0 md:pt-1 md:text-right">
                  <div className="flex items-center gap-2 md:justify-end text-slate-500 text-xs uppercase tracking-widest mb-3">
                    <CalendarDays className="w-3 h-3 md:order-2" />
                    <span>{formatPeriod(exp.startDate, exp.endDate)}</span>
                  </div>
                  {exp.location && (
                    <div className="flex items-center gap-2 md:justify-end text-slate-500 text-xs">
                      <MapPin className="w-3 h-3 md:order-2" />
                      <span>{exp.location}</span>
                    </div>
                  )}
                </div>

                <div className="hidden md:flex flex-col items-center relative">
                  <div className="w-3 h-3 rounded-full bg-primary ring-4 ring-primary/20 shrink-0 mt-1.5 group-hover:scale-125 transition-transform duration-300" />
                </div>

                <div className="flex-1 pb-20">
                  <div className="bg-surface-dark border border-white/5 rounded-2xl p-8 md:p-10 hover:border-primary/20 transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(236,127,19,0.05)]">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                      <div>
                        <h3 className="font-serif text-3xl md:text-4xl text-white mb-1 group-hover:text-primary transition-colors duration-300">
                          {exp.company}
                        </h3>
                        <div className="flex items-center gap-3 mt-2">
                          <Briefcase className="w-4 h-4 text-primary shrink-0" />
                          <span className="text-primary font-semibold text-base">
                            {exp.jobTitle}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-primary/30 text-primary bg-primary/5">
                        {exp.employmentType}
                      </span>
                    </div>

                    <div className="border-t border-white/5 mb-6" />

                    {exp.description && (
                      <p className="text-slate-400 leading-relaxed mb-8 text-sm md:text-base">
                        {exp.description}
                      </p>
                    )}

                    {(exp.achievements ?? []).length > 0 && (
                      <ul className="space-y-3 mb-8">
                        {(exp.achievements ?? []).map((text, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                            <span className="text-slate-300 text-sm leading-relaxed">
                              {text}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {(exp.techStack ?? []).length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {(exp.techStack ?? []).map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-xs rounded-full border border-white/10 text-slate-400 bg-white/3 hover:border-primary/40 hover:text-primary transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
