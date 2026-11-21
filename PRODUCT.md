# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Recruiters and hiring managers** screening front-end candidates. They skim fast, want proof of React/Next.js depth, real experience, and a resume they can download.
- **Freelance clients** looking for someone to build or improve a site. They want to see shipped work and a quick way to get in touch.

Both audiences matter equally. Neither should have to scroll past content meant for the other to find their next step.

## Product Purpose

Personal portfolio for Zensi Korat, Front-End Developer at Simform Solutions (Ahmedabad, India). It turns a visitor's first impression into either a resume download or a contact message. The site is itself a work sample: its motion, speed, and accessibility are evidence of the skills it describes.

## Positioning

A front-end developer who pairs expressive motion (GSAP, Framer Motion) with verified accessibility skill (WCAG 2.1 AA remediation, IAAP WAS certified) and AI-assisted delivery (Claude Certified Architect, Figma MCP, spec-driven development). Most motion-heavy portfolios are inaccessible; this one must not be.

## Operating Context

- Visitors arrive from LinkedIn, GitHub, the resume link, or job applications, on desktop and mobile.
- Recruiters often open the site in one tab next to an ATS or a job description.
- Previous version: Webflow site at https://zensi-korat.webflow.io/ (being replaced by this Next.js build).

## Capabilities and Constraints

- Stack: Next.js (App Router), TypeScript, Tailwind CSS, GSAP (ScrollTrigger, SplitText), Lenis smooth scroll.
- Contact: a form posting to Web3Forms (access key supplied by the owner via `NEXT_PUBLIC_WEB3FORMS_KEY`), plus a direct email link. Phone number is not published.
- Experience is stated as "3+ years", matching the resume (owner decision).
- Resume PDF lives at `public/Zensi_Korat_Resume.pdf`.
- All content lives in `src/data/` so the owner can edit it without touching components.

## Brand Commitments

- Name and wordmark: "ZensiKorat" (bold first name, regular surname).
- Voice: first person, plain, confident, no buzzword stacking.
- The Webflow site's motion identity is binding: rotating hero titles, orbiting tech-icon ring in dashed tiles, the sticky "I build ... for Modern Web" scroll reveal playing the original animation, gradient-ball buttons that light up on hover, the dark glass nav pill, and the white footer card with the giant letter-by-letter wordmark.
- Owner-requested additions: a "How I work" pencil line that draws on scroll (sketch, React, screen), footer physics balls (after moisez.com) in the site palette, a Jetton-style square cursor, and a moisez.com-style column grid with a Design/System switch whose System view shows type specs and pixel measurements on hover.

## Evidence on Hand

- Resume: `public/Zensi_Korat_Resume.pdf` (source of all facts below).
- Experience: Simform Solutions LLP, Frontend Developer, Feb 2023 to present; SoftCoding Solutions, Frontend Intern, June 2022 (1 month).
- Education: B.E. Information Technology, Silver Oak College of Engineering and Technology, 2019 to 2023, CGPA 9.20.
- Certifications: Claude Certified Architect, Foundations (CCA-F), Anthropic, with Credly link; IAAP Web Accessibility Specialist (WAS), certified.
- Certification logos in `public/logos/` (Claude, IAAP).
- **Client names, links, and screenshots are hidden by default** (owner decision): projects are presented by type with full technical detail, as on the resume. Named with links by permission: Basera Living (https://baseraliving.in/), an architect's portfolio in Webflow (https://yash-korat.webflow.io/), and Appvalt Systems in WordPress (https://appvalt.com/).
- **Absent, must not be fabricated:** testimonials, client logos, metrics or performance numbers, blog posts.

## Product Principles

1. Every animation must leave the content readable and reachable: nothing hides behind motion, and reduced-motion users get the full content instantly.
2. Show, then tell. Concrete technical detail of shipped work comes before claims.
3. Two clear exits on every screen: download the resume, or get in touch.
4. Fast on a mid-range phone. Motion is earned by staying smooth.

## Accessibility & Inclusion

WCAG 2.1 AA is the floor, given the owner's specialty. Keyboard access, visible focus, screen-reader-friendly split text (whole words announced, not letters), `prefers-reduced-motion` respected everywhere, and no information conveyed by motion alone. The owner chose to remove the visible pause-motion control; reduced-motion users still get a fully static page.
