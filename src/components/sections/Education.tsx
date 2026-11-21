"use client";

import { useRef } from "react";
import { education } from "@/data/experience";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { SectionLabel } from "../ui/SectionLabel";

export function Education() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // The timeline rule draws itself as you read down it
        gsap.from(".edu-rule", {
          scaleY: 0,
          ease: "none",
          scrollTrigger: { trigger: ".edu-list", start: "top 75%", end: "bottom 60%", scrub: 0.6 },
        });
        gsap.utils.toArray<HTMLElement>(".edu-item").forEach((item) => {
          gsap.from(item.children, {
            opacity: 0,
            y: 30,
            duration: 0.9,
            stagger: 0.08,
            ease: "expo.out",
            scrollTrigger: { trigger: item, start: "top 80%" },
          });
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="education" aria-labelledby="edu-heading" className="px-4 pb-24 md:px-8 md:pb-36">
      <div className="mx-auto max-w-[64rem]">
        <SectionLabel id="edu-heading">Education</SectionLabel>
        <ol className="edu-list relative mt-12 md:mt-16">
          <span aria-hidden="true" className="edu-rule absolute top-2 bottom-2 left-[5px] w-px origin-top bg-ink/20 md:left-[9rem]" />
          {education.map((e, i) => (
            <li key={e.name} className="edu-item relative grid gap-2 pb-12 pl-10 last:pb-0 md:grid-cols-[9rem_1fr] md:gap-0 md:pl-0">
              <p className="font-mono text-sm tracking-[0.06em] text-grey-300 md:pt-1.5 md:pr-10">{e.period}</p>
              <div className="relative md:pl-12">
                <span
                  aria-hidden="true"
                  className={`absolute top-2.5 -left-10 size-[11px] rounded-full border-2 md:-left-[5px] ${
                    i === 0 ? "border-signal bg-signal" : "border-ink/40 bg-beige"
                  }`}
                />
                <h3 className={`tracking-[-0.02em] ${i === 0 ? "text-[1.75rem] leading-[1.1] md:text-[2.25rem]" : "text-xl md:text-2xl"}`}>{e.name}</h3>
                <p className="mt-2 text-lg text-grey-400">{e.school}</p>
                {e.detail && (
                  <p className="mt-4 inline-block rounded-full border border-ink/15 px-4 py-2 font-mono text-sm">{e.detail}</p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
