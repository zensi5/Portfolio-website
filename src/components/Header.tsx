"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";
import { Button } from "./ui/Button";
import { RollText } from "./ui/RollText";

const links = [
  { hash: "top", label: "Home" },
  { hash: "about", label: "About" },
  { hash: "work", label: "Projects" },
  { hash: "experience", label: "Experience" },
  { hash: "skills", label: "Skills" },
];

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`text-[1.625rem] leading-none tracking-[-0.03em] ${className}`}
    >
      <span className="font-bold">{profile.firstName}</span>
      <span className="font-normal">{profile.lastName}</span>
    </span>
  );
}

/** Sticky header, matching the Webflow navbar: wordmark left, links and Contact inside a dark glass pill. */
export function Header() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: lock scroll, Escape closes, focus moves in and back out
  useEffect(() => {
    if (!open) return;
    window.__lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const behind = [
      document.getElementById("main"),
      document.querySelector("footer"),
    ];
    behind.forEach((el) => el?.setAttribute("inert", ""));
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      behind.forEach((el) => el?.removeAttribute("inert"));
      window.__lenis?.start();
    };
  }, [open]);

  const href = (hash: string) => (onHome ? `#${hash}` : `/#${hash}`);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Soft beige fade keeps the wordmark readable over content once scrolled */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 h-[calc(var(--header-h)+2rem)] bg-linear-to-b from-beige from-60% to-transparent transition-opacity duration-500 ${
          scrolled && !open ? "opacity-100" : "opacity-0"
        }`}
      />
      <nav
        aria-label="Main"
        className="relative mx-auto flex h-(--header-h) max-w-[90rem] items-center justify-between px-4 md:px-12"
      >
        <Link
          href="/"
          className="relative z-10"
          aria-label={`${profile.name}, home`}
        >
          <Wordmark />
        </Link>

        <div className="hidden items-center gap-6 rounded-[1.25rem] bg-ink/55 py-2 pr-2 pl-7 backdrop-blur-md md:flex">
          <ul className="flex items-center gap-6">
            {links.map((l) => (
              <li key={l.hash}>
                <a
                  href={href(l.hash)}
                  className="roll-host block py-2 text-sm text-white"
                >
                  <RollText text={l.label} />
                </a>
              </li>
            ))}
          </ul>
          <Button href="/contact" size="small" variant="light">
            Contact
          </Button>
        </div>

        <button
          ref={buttonRef}
          type="button"
          className="relative z-10 grid size-12 place-items-center rounded-2xl bg-ink/55 text-white backdrop-blur-md md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden="true" className="relative block h-2.5 w-5">
            <span
              className={`absolute inset-x-0 top-0 h-0.5 rounded bg-current transition-transform duration-300 ease-(--ease-out-expo) ${open ? "translate-y-1 rotate-45" : ""}`}
            />
            <span
              className={`absolute inset-x-0 bottom-0 h-0.5 rounded bg-current transition-transform duration-300 ease-(--ease-out-expo) ${open ? "-translate-y-1 -rotate-45" : ""}`}
            />
          </span>
        </button>
      </nav>

      <div
        id="mobile-menu"
        ref={menuRef}
        hidden={!open}
        className="fixed inset-0 bg-beige px-4 pt-(--header-h) md:hidden"
      >
        <ul className="mt-6 flex flex-col">
          {[...links, { hash: "", label: "Contact" }].map((l, i) => (
            <li
              key={l.label}
              className="mobile-link border-b border-ink/10"
              style={{ "--i": i } as React.CSSProperties}
            >
              <a
                href={l.hash ? href(l.hash) : "/contact"}
                onClick={() => setOpen(false)}
                className="block py-4 text-4xl tracking-[-0.03em] text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <Button
            href={profile.resume}
            download="Zensi_Korat_Resume.pdf"
            variant="light"
          >
            Download resume
          </Button>
        </div>
      </div>
    </header>
  );
}
