"use client";

import { useRef } from "react";
import { profile } from "@/data/profile";
import { orbitIcons } from "@/data/skills";
import { gsap, ScrollTrigger, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap";
import { Button } from "../ui/Button";
import { ArrowDown, Globe } from "../ui/Icons";

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Lets fixed chrome (the Design/System switch) clear the hero's bottom bar
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top bottom",
        end: "bottom 85%",
        onToggle: (self) =>
          document.documentElement.classList.toggle(
            "hero-in-view",
            self.isActive,
          ),
      });

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        window.__introDone = true;

        // Entrance: orbit, title, line, actions settle in from 95%
        gsap.fromTo(
          "[data-intro]",
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.9,
            stagger: 0.15,
            ease: "power3.out",
          },
        );

        // Rotating titles: each line rises in word by word, holds, then lifts away
        const lines = gsap.utils.toArray<HTMLElement>(".hero-line");
        const splits = lines.map((line) =>
          SplitText.create(line, { type: "words", aria: "none" }),
        );
        gsap.set(lines, { opacity: 1 });
        splits.slice(1).forEach((s) => gsap.set(s.words, { opacity: 0 }));

        const titles = gsap.timeline({ repeat: -1, delay: 0.3 });
        splits.forEach((s, i) => {
          const at = i * 3;
          titles
            .fromTo(
              s.words,
              { opacity: 0, y: "2rem" },
              { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "expo.out" },
              at,
            )
            .to(
              s.words,
              {
                opacity: 0,
                y: "-2rem",
                duration: 0.8,
                stagger: 0.08,
                ease: "power2.in",
              },
              at + 2.2,
            );
        });

        // Every few seconds the orbiting icons flip in sequence
        const flips = gsap.timeline({ repeat: -1, delay: 3, repeatDelay: 6 });
        flips
          .to(".hero-icon", {
            rotationY: 360,
            transformPerspective: 600,
            duration: 1.7,
            stagger: 0.3,
            ease: "power2.inOut",
          })
          .set(".hero-icon", { rotationY: 0 });
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="top"
      aria-labelledby="hero-title"
      className="relative flex h-svh min-h-[38rem] flex-col items-center justify-center overflow-hidden px-4"
    >
      {/* Orbit of tools */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div
          data-intro
          className="aspect-square w-[min(118vw,80svh)] shrink-0 sm:w-[min(84vw,78svh)]"
        >
          <ul className="orbit relative size-full">
            {orbitIcons.map((icon, i) => {
              const angle = (i / orbitIcons.length) * Math.PI * 2;
              return (
                <li
                  key={icon.name}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${50 + 50 * Math.sin(angle)}%`,
                    top: `${50 - 50 * Math.cos(angle)}%`,
                  }}
                >
                  <div className="orbit__item">
                    {/* Dashed oval tile, as on the Webflow site */}
                    <div className="grid h-[4.25rem] w-[3.25rem] place-items-center rounded-[50%] border-2 border-dashed border-grey-200 sm:h-[7.5rem] sm:w-[5.75rem] lg:h-[9rem] lg:w-[6.75rem]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={icon.src}
                        alt=""
                        width={64}
                        height={64}
                        className="hero-icon size-7 sm:size-12 lg:size-16"
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <h1 id="hero-title" className="sr-only">
          {profile.name}, {profile.role}
        </h1>
        <div
          data-intro
          aria-hidden="true"
          className="grid max-w-[15rem] place-items-center sm:max-w-[32rem]"
        >
          {profile.heroTitles.map((t, i) => (
            <p
              key={t}
              className={`hero-line col-start-1 row-start-1 text-[2.5rem] leading-none tracking-[-0.03em] sm:text-[3.5rem] lg:text-[4.5rem] ${i > 0 ? "opacity-0" : ""}`}
            >
              {t}
            </p>
          ))}
        </div>
        <p
          data-intro
          className="mt-5 max-w-[18rem] text-base sm:mt-6 sm:max-w-[25.625rem] text-grey-400 sm:text-lg"
        >
          {profile.heroLine}
        </p>
        <div
          data-intro
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Button href="/contact" variant="light">
            Hire me
          </Button>
          <Button href={profile.resume} download="Zensi_Korat_Resume.pdf">
            Download resume
          </Button>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="absolute inset-x-0 bottom-5 z-10 px-4 md:bottom-8 md:px-12">
        <div className="mx-auto flex max-w-[90rem] items-center justify-between gap-4 text-sm">
          <p className="flex items-center gap-1.5">
            <Globe />
            {profile.location}
          </p>
          <a
            href="#about"
            className="hidden items-center gap-2 font-mono text-xs tracking-[0.1em] text-grey-300 uppercase hover:text-ink sm:flex"
          >
            Scroll to explore <ArrowDown className="size-3.5" />
          </a>
          <p className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="pulse relative size-2 rounded-full bg-emerald-600"
            />
            {profile.available}
          </p>
        </div>
      </div>
    </section>
  );
}
