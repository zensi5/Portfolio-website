"use client";

import { useRef } from "react";
import { Accessibility, Atom, Code2, FlaskConical, Layers, Palette, Sparkles, type LucideIcon } from "lucide-react";
import { orbitIcons, skills, type SkillGroup } from "@/data/skills";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";
import { SectionLabel } from "../ui/SectionLabel";

const icons: Record<SkillGroup["icon"], LucideIcon> = {
  code: Code2,
  atom: Atom,
  palette: Palette,
  accessibility: Accessibility,
  flask: FlaskConical,
  sparkles: Sparkles,
  layers: Layers,
};

/** Bento spans in data order, sized to content: [3,3] / [4,2] / [2,2,2] on a six-column grid. */
const spans = ["md:col-span-3", "md:col-span-3", "md:col-span-4", "md:col-span-2", "md:col-span-2", "md:col-span-2", "md:col-span-2"];

export function Skills() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.set(".skill-tile", { opacity: 0, y: 60 });
        ScrollTrigger.batch(".skill-tile", {
          start: "top 88%",
          once: true,
          onEnter: (tiles) => {
            gsap.to(tiles, { opacity: 1, y: 0, duration: 1.1, stagger: 0.12, ease: "expo.out" });
            tiles.forEach((tile, i) =>
              gsap.from(tile.querySelectorAll(".skill-chip"), {
                opacity: 0,
                scale: 0.6,
                y: 12,
                duration: 0.55,
                stagger: 0.035,
                delay: 0.25 + i * 0.12,
                ease: "back.out(2.2)",
              }),
            );
          },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="skills" aria-labelledby="skills-heading" className="px-4 py-24 md:px-8 md:py-36">
      <div className="mx-auto max-w-[72rem]">
        <div className="mx-auto max-w-[64rem]">
          <SectionLabel id="skills-heading">Skills</SectionLabel>
          <p className="mt-10 max-w-[40rem] text-xl leading-[1.35] tracking-[-0.02em] text-grey-500 md:mt-14 md:text-2xl">
            The tools and practices I reach for every day, from component architecture to screen reader testing.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:mt-20 md:grid-cols-6 md:gap-5">
          {skills.map((group, i) => {
            const Icon = icons[group.icon];
            const dark = group.icon === "accessibility";
            return (
              <article
                key={group.title}
                className={`skill-tile spotlight flex flex-col rounded-[1.75rem] border p-6 md:p-8 ${spans[i]} ${
                  dark ? "border-transparent bg-night text-white [--spot-alpha:0.22]" : "border-ink/10 bg-white/70"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <span
                      className={`grid size-11 place-items-center rounded-full border border-dashed ${dark ? "border-white/30" : "border-grey-200"}`}
                    >
                      <Icon className="size-5" strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <h3 className="text-xl tracking-[-0.02em] md:text-2xl">{group.title}</h3>
                  </div>
                </div>

                {dark && (
                  <p className="mt-8 text-[2.5rem] leading-none tracking-[-0.04em] md:text-[3.25rem]">
                    WCAG 2.1 <span className="text-signal">AA</span>
                  </p>
                )}

                {group.icon === "code" && (
                  <ul className="mt-8 flex flex-wrap gap-3" aria-hidden="true">
                    {orbitIcons.map((icon, k) => (
                      <li
                        key={icon.name}
                        className="skill-float grid h-16 w-12 place-items-center rounded-[50%] border-2 border-dashed border-grey-200 lg:h-24 lg:w-[4.5rem]"
                        style={{ "--i": k } as React.CSSProperties}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={icon.src} alt="" width={40} height={40} className="size-7 lg:size-10" />
                      </li>
                    ))}
                  </ul>
                )}

                <ul className="mt-8 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className={`skill-chip rounded-full border px-3.5 py-2 text-[0.95rem] leading-none transition-colors duration-300 ${
                        dark
                          ? "border-white/20 bg-white/5 hover:border-white hover:bg-white hover:text-ink"
                          : "border-ink/12 bg-beige hover:border-ink hover:bg-ink hover:text-white"
                      }`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
