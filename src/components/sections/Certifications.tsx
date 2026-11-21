"use client";

import Image from "next/image";
import { useRef } from "react";
import { BadgeCheck } from "lucide-react";
import { certifications } from "@/data/experience";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { ArrowUpRight } from "../ui/Icons";
import { SectionLabel } from "../ui/SectionLabel";

export function Certifications() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Cards open from the bottom edge like a reveal, then their logos settle in
        gsap.utils.toArray<HTMLElement>(".cert-card").forEach((card, i) => {
          const tl = gsap.timeline({ scrollTrigger: { trigger: card, start: "top 85%" }, delay: i * 0.12 });
          tl.from(card, { clipPath: "inset(100% 0% 0% 0% round 2rem)", duration: 1.2, ease: "expo.out" })
            .from(card.querySelector(".cert-logo"), { y: 30, opacity: 0, duration: 0.9, ease: "expo.out" }, 0.25)
            .from(card.querySelectorAll(".cert-line"), { y: 20, opacity: 0, duration: 0.8, stagger: 0.08, ease: "expo.out" }, 0.35);
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="certifications" aria-labelledby="cert-heading" className="px-4 py-24 md:px-8 md:py-36">
      <div className="mx-auto max-w-[72rem]">
        <div className="mx-auto max-w-[64rem]">
          <SectionLabel id="cert-heading">Certifications</SectionLabel>
        </div>
        <ul className="mt-12 grid gap-5 md:mt-16 md:grid-cols-2">
          {certifications.map((c) => {
            const dark = c.tone === "dark";
            return (
              <li key={c.name}>
                <article
                  className={`cert-card spotlight group flex h-full min-h-[22rem] flex-col justify-between rounded-[2rem] p-8 md:min-h-[26rem] md:p-12 ${
                    dark ? "bg-night text-white [--spot-alpha:0.2]" : "border border-ink/10 bg-white"
                  }`}
                >
                  <div className="cert-logo flex h-16 items-center md:h-20">
                    <Image
                      src={c.logo.src}
                      alt={c.logo.alt}
                      width={c.logo.width}
                      height={c.logo.height}
                      className={`h-full w-auto transition-transform duration-700 ease-(--ease-soft) group-hover:scale-105 ${dark ? "max-h-12 md:max-h-14" : ""} ${
                        !dark ? "group-hover:rotate-[30deg]" : ""
                      }`}
                    />
                  </div>
                  <div>
                    <h3 className="cert-line text-[1.75rem] leading-[1.05] tracking-[-0.03em] md:text-[2.5rem]">{c.name}</h3>
                    <p className={`cert-line mt-3 text-lg ${dark ? "text-white/70" : "text-grey-400"}`}>{c.issuer}</p>
                    <p className={`cert-line mt-4 flex items-center gap-2 font-mono text-xs tracking-[0.1em] uppercase ${dark ? "text-white/70" : "text-grey-300"}`}>
                      <BadgeCheck className={`size-4 ${dark ? "text-emerald-400" : "text-emerald-600"}`} aria-hidden="true" />
                      Certified · {c.detail}
                    </p>
                    {c.link && (
                      <a
                        href={c.link}
                        target="_blank"
                        rel="noreferrer"
                        className="cert-line mt-6 inline-flex items-center gap-1.5 underline underline-offset-4 hover:no-underline"
                      >
                        Verify on Credly
                        <ArrowUpRight className="size-4" />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    )}
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
