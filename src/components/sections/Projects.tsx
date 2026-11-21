"use client";

import { useRef } from "react";
import { Accessibility, Bot, Building2, CalendarRange, Home, Radio, Trophy, type LucideIcon } from "lucide-react";
import { otherWork, projects, type Project } from "@/data/projects";
import { gsap, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap";
import { ArrowUpRight } from "../ui/Icons";
import { SectionLabel } from "../ui/SectionLabel";

const icons: Record<Project["icon"], LucideIcon> = {
  villa: Home,
  building: Building2,
  accessibility: Accessibility,
  live: Radio,
  bot: Bot,
  tennis: Trophy,
  calendar: CalendarRange,
};

/** Card grounds cycle through the palette so each stacked card reads as its own object. */
const themes = [
  { card: "bg-white text-ink", muted: "text-grey-400", line: "border-ink/10", chip: "border-ink/15", ring: "border-grey-200" },
  { card: "bg-night text-white", muted: "text-white/70", line: "border-white/15", chip: "border-white/25", ring: "border-white/30" },
  { card: "bg-sand text-ink", muted: "text-grey-500", line: "border-ink/15", chip: "border-ink/20", ring: "border-ink/25" },
  { card: "bg-ink text-white", muted: "text-white/70", line: "border-white/15", chip: "border-white/25", ring: "border-white/30" },
];

export function Projects() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const cards = gsap.utils.toArray<HTMLElement>(".project-card");

        cards.forEach((card, i) => {
          // As the next card slides over, this one sinks back (stacking only where cards fit the screen)
          const next = cards[i + 1];
          if (next && window.matchMedia("(min-width: 768px)").matches) {
            gsap.fromTo(
              card,
              { scale: 1, filter: "brightness(1)" },
              {
                scale: 0.92,
                filter: "brightness(0.88)",
                ease: "none",
                scrollTrigger: { trigger: next, start: "top 70%", end: "top 25%", scrub: true },
              },
            );
          }

          // Title words and highlights arrive softly when a card enters
          const title = card.querySelector(".project-title")!;
          const split = SplitText.create(title, { type: "words", mask: "words" });
          const tl = gsap.timeline({ scrollTrigger: { trigger: card, start: "top 75%" } });
          tl.from(split.words, { yPercent: 110, duration: 0.9, stagger: 0.04, ease: "expo.out" })
            .from(card.querySelectorAll(".project-point"), { opacity: 0, x: 24, duration: 0.7, stagger: 0.07, ease: "expo.out" }, 0.15)
            .from(card.querySelectorAll(".project-chip"), { opacity: 0, scale: 0.7, duration: 0.5, stagger: 0.04, ease: "back.out(2)" }, 0.3)
            .from(card.querySelector(".project-icon"), { rotate: -90, scale: 0.4, opacity: 0, duration: 1, ease: "expo.out" }, 0);
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="work" aria-labelledby="work-heading" className="px-4 py-24 md:px-8 md:py-36">
      <div className="mx-auto max-w-[72rem]">
        <div className="mx-auto max-w-[64rem]">
          <SectionLabel id="work-heading">Projects</SectionLabel>
          <p className="mt-10 max-w-[46rem] text-xl leading-[1.35] tracking-[-0.02em] text-grey-500 md:mt-14 md:text-2xl">
            A look at the products I&apos;ve helped ship, from SaaS dashboards and AI platforms to live streaming and real
            estate. Client names stay private; the engineering is all here.
          </p>
        </div>

        <ol className="mt-16 flex flex-col gap-6 md:mt-24 md:gap-10">
          {projects.map((p, i) => {
            const t = themes[i % themes.length];
            const Icon = icons[p.icon];
            return (
              <li
                key={p.slug}
                className="md:sticky"
                style={{ top: `calc(var(--header-h) + ${i * 0.75}rem)` }}
              >
                <article
                  data-cursor="Project"
                  className={`project-card spotlight origin-top rounded-[2rem] p-6 shadow-[0_24px_60px_-30px_rgb(0_0_0/0.35)] sm:p-10 md:min-h-[30rem] md:rounded-[2.5rem] md:p-14 ${t.card}`}
                >
                  <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:gap-16">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-4">
                        <span className={`project-icon grid size-14 place-items-center rounded-full border border-dashed ${t.ring}`}>
                          <Icon className="size-6" strokeWidth={1.5} aria-hidden="true" />
                        </span>
                      </div>
                      <h3 className="project-title mt-8 text-[2rem] leading-[1.02] tracking-[-0.03em] md:mt-12 md:text-[3rem]">
                        {p.title}
                      </h3>
                      <p className="mt-3 font-mono text-xs tracking-[0.1em] uppercase">{p.category}</p>
                      <p className={`mt-5 max-w-[30rem] text-lg leading-[1.45] ${t.muted}`}>{p.summary}</p>
                      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 md:mt-auto md:pt-10">
                        <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
                          {p.tech.map((tech) => (
                            <li key={tech} className={`project-chip rounded-full border px-4 py-2 text-sm ${t.chip}`}>
                              {tech}
                            </li>
                          ))}
                        </ul>
                        {p.link && (
                          <a
                            href={p.link}
                            target="_blank"
                            rel="noreferrer"
                            className="group/link inline-flex items-center gap-1.5 underline underline-offset-4 hover:no-underline"
                          >
                            Visit {new URL(p.link).hostname.replace(/^www\./, "")}
                            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                            <span className="sr-only">(opens in a new tab)</span>
                          </a>
                        )}
                      </div>
                    </div>

                    <div className={`border-t pt-8 md:border-t-0 md:border-l md:pt-0 md:pl-12 ${t.line}`}>
                      <h4 className={`font-mono text-xs tracking-[0.1em] uppercase ${t.muted}`}>What I built</h4>
                      <ul className="mt-6 flex flex-col gap-5">
                        {p.highlights.map((h) => (
                          <li key={h} className="project-point flex gap-4 text-lg leading-[1.35]">
                            <span
                              aria-hidden="true"
                              className="mt-[0.6em] h-[3px] w-5 shrink-0 rounded-full"
                              style={{ backgroundImage: "var(--gradient-rule)" }}
                            />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>

        <div className="mx-auto mt-28 max-w-[64rem] md:mt-40">
          <h3 className="text-2xl tracking-[-0.02em] md:text-[2rem]">Also built</h3>
          <ul className="mt-8 border-t border-ink/10">
            {otherWork.map((w) => (
              <li
                key={w.title}
                className="group relative grid gap-1 border-b border-ink/10 py-6 transition-colors sm:grid-cols-[1fr_1.4fr_auto] sm:items-baseline sm:gap-8"
              >
                <p className="text-xl tracking-[-0.02em] transition-transform duration-500 ease-(--ease-soft) group-hover:translate-x-2">
                  {w.link ? (
                    <a
                      href={w.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 after:absolute after:inset-0 after:content-['']"
                    >
                      {w.title}
                      <ArrowUpRight className="size-4" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  ) : (
                    w.title
                  )}
                </p>
                <p className="text-grey-400">{w.text}</p>
                <p className="font-mono text-xs tracking-[0.1em] text-grey-300 uppercase">{w.tech}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
