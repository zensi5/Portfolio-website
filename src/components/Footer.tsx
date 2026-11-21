"use client";

import { usePathname } from "next/navigation";
import { useRef } from "react";
import { profile } from "@/data/profile";
import { gsap, ScrollTrigger, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap";
import { SocialIcon } from "./ui/Icons";
import { FooterBalls } from "./motion/FooterBalls";

/** Footer from the Webflow site: a white card that rises into place, socials on the right, the name set huge. */
export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      // Floating chrome steps aside while the name is on screen (with or without motion)
      ScrollTrigger.create({
        trigger: ".footer-card",
        start: "center bottom",
        end: "bottom top",
        onToggle: (self) => document.documentElement.classList.toggle("footer-in-view", self.isActive),
      });

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const card = ref.current!.querySelector(".footer-card")!;

        // The card slides up from below as the page runs out
        gsap.fromTo(
          card,
          { yPercent: 18 },
          { yPercent: 0, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "top 35%", scrub: 0.6 } },
        );

        gsap.from(".footer-social", {
          opacity: 0,
          x: 24,
          duration: 0.9,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none reverse" },
        });

        // Name rises letter by letter, replaying each time it comes back into view
        const split = SplitText.create(".footer-brand", { type: "words,chars", aria: "none" });
        gsap.from(split.chars, {
          opacity: 0,
          y: "5vw",
          duration: 1,
          stagger: 0.05,
          ease: "expo.out",
          // Anchored to the card: the name itself can sit in the page's last few pixels, past where a trigger can fire
          scrollTrigger: { trigger: ".footer-card", start: "top 80%", toggleActions: "restart none none reverse" },
        });

        // Pages differ in height: measure again once the new route has painted
        requestAnimationFrame(() => ScrollTrigger.refresh());
      });
    },
    { scope: ref, dependencies: [pathname], revertOnUpdate: true },
  );

  const links = [...profile.socials, { label: profile.email, href: `mailto:${profile.email}`, icon: "email" }];

  return (
    <footer ref={ref} className="relative z-10 overflow-hidden px-3 pt-16 pb-3 max-md:-mt-24 max-md:pt-40 md:px-6 md:pt-24 md:pb-6">
      <div className="footer-card relative rounded-[1.5rem] bg-white px-5 pt-10 md:px-10 md:pt-16">
        {/* Drop zone starts above the card, in the beige gap (on phones the footer reaches up over the last section's bottom padding for more room) */}
        <div className="absolute inset-x-0 -top-40 bottom-0 md:-top-24">
          <FooterBalls />
        </div>
        <div className="flex md:justify-end">
          <ul data-ball-solid="text" className="flex flex-col items-start gap-3 md:items-end">
            {links.map((s) => {
              const external = s.icon !== "email";
              return (
                <li key={s.label} className="footer-social">
                  <a
                    href={s.href}
                    {...(external && { target: "_blank", rel: "noreferrer" })}
                    className="flex items-center gap-3 text-xl tracking-[-0.02em] text-grey-300 transition-opacity duration-300 hover:opacity-60"
                  >
                    {s.label}
                    <SocialIcon name={s.icon} className="size-6 text-ink" />
                    {external && <span className="sr-only">(opens in a new tab)</span>}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <p
          aria-hidden="true"
          className="footer-brand mt-14 pb-4 motion-safe:max-md:mt-36 text-[15vw] leading-[0.95] font-medium tracking-[-0.05em] whitespace-nowrap md:mt-20 md:pb-6 md:text-[16.5vw]"
        >
          <span data-ball-solid="word">{profile.firstName}</span> <span data-ball-solid="word">{profile.lastName}</span>
        </p>

      </div>
    </footer>
  );
}
