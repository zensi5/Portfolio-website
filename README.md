# Zensi Korat – Portfolio

Next.js 16 + TypeScript + Tailwind CSS 4 + GSAP (ScrollTrigger, SplitText) + Lenis.
A code port of the Webflow site at https://zensi-korat.webflow.io/, with its motion rebuilt in GSAP.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production check
```

## Edit content

All text lives in `src/data/`. You rarely need to touch components.

| File | What it holds |
| --- | --- |
| `src/data/profile.ts` | Name, hero titles, About copy, CTA text, email, socials, quick facts. |
| `src/data/projects.ts` | `projects` (anonymised: title, category, icon, summary, highlights, tech) and `otherWork` |
| `src/data/experience.ts` | Jobs, certifications (with logos in `public/logos/`), education |
| `src/data/skills.ts` | Skill groups, the 8 orbiting hero icons, marquee words |

- **Add a project:** add an entry to `projects.ts`; `icon` picks a line icon (see the map in `sections/Projects.tsx`).
- **Update the resume:** replace `public/Zensi_Korat_Resume.pdf` (keep the name).

## Environment variables

Copy `.env.example` to `.env.local`:

- `NEXT_PUBLIC_WEB3FORMS_KEY`: free key from https://web3forms.com. Without it, the contact form opens the visitor's email app instead.
- `NEXT_PUBLIC_SITE_URL`: your final domain (canonical URLs, sitemap, social cards).

## Structure

```
src/
  app/            layout (fonts, SEO, JSON-LD), page, contact/, not-found, sitemap, robots, OG image
  components/
    sections/     Hero, About, Marquee, Build (sticky "I build" scroll), Projects (stacked cards), Experience,
                  Skills (bento), Sketch (scroll-drawn line), Certifications, Education, Cta
    chrome/       Cursor, SystemView (grid + Design/System switch + inspector), BackToTop
    motion/       SmoothScroll (Lenis), ScrubText, LoopVideo, FooterBalls (Matter.js physics)
    ui/           Button (gradient balls), SectionLabel, RollText, Icons
  data/           all site content
  lib/            gsap setup, site URL
  fonts/          BDO Grotesk (self-hosted, Latin subset)
```

## Accessibility and motion

- Every animation is wrapped in `prefers-reduced-motion: no-preference`; reduced-motion visitors get the full content, static.
- **System view** (desktop): press `S` or use the switch in the bottom-left to see the column grid and hover anything for its type spec, size, and spacing.
- The custom cursor only runs on devices with a mouse; touch devices keep the native behaviour.
- Footer balls (after moisez.com): Matter.js loads only when the footer is near, runs only while it's on screen, and is skipped entirely for reduced motion. Mark any element `data-ball-solid` to make balls rest on it.
- Split-text animations keep whole words for screen readers; decorative motion is `aria-hidden`.
- Skip link, visible focus, labelled form fields, focus moves to form status messages, mobile menu traps focus and closes with Escape.

## Deploy (Vercel)

1. Push to GitHub, import at https://vercel.com/new, click **Deploy**.
2. Add the two environment variables in the Vercel project settings.

## Design system

- `PRODUCT.md`: who the site is for and what it must prove (Impeccable context)
- `DESIGN.md`: tokens, components, and motion grammar
- `.impeccable/`: Impeccable working files. Commit `surfaces/`, `config.json`, and `design.json`; `review/` holds screenshots and can be deleted.
