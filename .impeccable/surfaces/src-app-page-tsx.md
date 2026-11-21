---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: ["src/app/contact/page.tsx"]
---

# Home (portfolio)

Scope: `/` single-page portfolio plus `/contact`. Visitor mode: Experience (the work and the motion lead), with two persuade exits on every screen: download resume, get in touch.

Audience/job: recruiters screening a front-end hire and freelance clients judging craft. Proof: seven shipped projects described in full technical detail (client names, links, and screenshots withheld at the owner's request), resume facts, CCA-F and IAAP WAS credentials. Constraints: WCAG 2.1 AA, reduced-motion parity, fast on mid-range phones, all content in `src/data/`.

## Direction contract

THESIS: The site is the work sample: a warm, quiet beige stage where motion does the talking, orchestrated like the Webflow original, while every animated word stays readable and keyboard-reachable. Refuses the template hero (headline + subcopy + button over a card grid).

OWN-WORLD: Beige ground #f8f7f3, ink #000, grey ladder #ddd to #0a0a0a. BDO Grotesk medium, tight -0.02em display tracking; Roboto Mono uppercase labels with a four-stop gradient rule (orange, yellow, blue). Pill buttons in beige-to-sand or black with two drifting blurred gradient balls (red-yellow, violet-green) blended in overlay. Large 16:9 project frames, 3rem-radius CTA cards, a blurred abstract video plate.

STORY: Visitor meets Zensi through a rotating title inside an orbit of Zensi's tools, understands she builds interfaces that become experiences, sees shipped work, scans experience and skills, then downloads the resume or sends a message.

FIRST VIEWPORT: Full-height centered stage. Rotating title (Hey, I'm Zensi / Frontend Developer / Crafting Animations) at 4.5rem in the middle, a slowly turning ring of eight tech icons around it at ~80% viewport height, one-line value statement below, Hire me gradient button + Download resume. Bottom bar: globe + Ahmedabad on the left, availability on the right; the Design/System switch floats bottom-left (no pause control, removed at the owner's request). Nav floats at top.

FORM: Webflow original, ported and extended. seed: none (pinned) "the website i build was in the webflow and now i wanto t make the react/nextjs" + "i want to make it as animated as in the webflow wesite". Signature interaction: the sticky "I build [orb] for Modern Web" scroll, where the orb window grows from a 12vw chip to full-bleed and reveals "Interfaces that become Experiences". Motion grammar: word-split rises with expo-out, scrubbed scale on project frames, scrubbed grey-to-ink word fill, char rises on the footer wordmark.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
