---
name: Zensi Korat Portfolio
description: A warm beige stage where motion does the talking, ported from the Webflow original to Next.js.
colors:
  beige: "#f8f7f3"
  sand: "#dddbd1"
  ink: "#000000"
  paper: "#ffffff"
  night: "#1b1a1f"
  signal: "#ff4d00"
  grey-100: "#dddddd"
  grey-200: "#b6b6b6"
  grey-300: "#6b6b6b"
  grey-400: "#474747"
  grey-500: "#333333"
  grey-600: "#292929"
  rule-orange: "#ff4d00"
  rule-yellow: "#e7eb4c"
  rule-sky: "#0b90cb"
  rule-blue: "#0c59c1"
typography:
  display:
    fontFamily: "BDO Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "4.5rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "BDO Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "3.5rem"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  card-title:
    fontFamily: "BDO Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "3rem"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  title:
    fontFamily: "BDO Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "2rem"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  lead:
    fontFamily: "BDO Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 500
    lineHeight: 1.35
    letterSpacing: "-0.02em"
  body:
    fontFamily: "BDO Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 500
    lineHeight: 1.45
  label:
    fontFamily: "Roboto Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    letterSpacing: "0.1em"
  section-label:
    fontFamily: "Roboto Mono, ui-monospace, monospace"
    fontSize: "1.75rem"
    fontWeight: 400
    letterSpacing: "0.1em"
  wordmark-giant:
    fontFamily: "BDO Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "16.5vw"
    fontWeight: 500
    lineHeight: 0.95
    letterSpacing: "-0.05em"
rounded:
  field: "0.75rem"
  button-sm: "1rem"
  frame: "1.25rem"
  button: "1.5rem"
  tile: "1.75rem"
  card: "2rem"
  card-xl: "2.5rem"
  card-lg: "3rem"
  pill: "999px"
spacing:
  gutter-sm: "1rem"
  gutter: "2rem"
  gutter-wide: "3rem"
  section-sm: "6rem"
  section: "9rem"
  header: "5.5rem"
  container: "64rem"
  container-mid: "72rem"
  container-wide: "90rem"
components:
  button-dark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.button}"
    padding: "1.5rem 2rem"
  button-light:
    backgroundColor: "{colors.sand}"
    textColor: "{colors.ink}"
    rounded: "{rounded.button}"
    padding: "1.5rem 2rem"
  button-small:
    backgroundColor: "{colors.sand}"
    textColor: "{colors.ink}"
    rounded: "{rounded.button-sm}"
    padding: "1rem 1.5rem"
  nav-pill:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.frame}"
    padding: "0.5rem 0.5rem 0.5rem 1.75rem"
  nav-link:
    textColor: "{colors.paper}"
    padding: "0.5rem 0"
  chip:
    backgroundColor: "{colors.beige}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 0.875rem"
  chip-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
  input:
    backgroundColor: "{colors.beige}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "0.875rem 1rem"
  project-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card-xl}"
    padding: "3.5rem"
  project-card-night:
    backgroundColor: "{colors.night}"
    textColor: "{colors.paper}"
    rounded: "{rounded.card-xl}"
    padding: "3.5rem"
  skill-tile:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.tile}"
    padding: "2rem"
  skill-tile-dark:
    backgroundColor: "{colors.night}"
    textColor: "{colors.paper}"
    rounded: "{rounded.tile}"
    padding: "2rem"
  cert-card:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.card}"
    padding: "3rem"
  cta-card:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.card-lg}"
    padding: "4rem"
  footer-card:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.button}"
    padding: "4rem 2.5rem 0"
  cursor:
    backgroundColor: "{colors.signal}"
    size: "14px"
  back-to-top:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    size: "3.5rem"
---

# Design System: Zensi Korat Portfolio

## Overview

**Creative North Star: "The Quiet Stage"**

A warm, near-white beige stage carries black type and almost nothing else, so the motion can do the talking. This is the incumbent Webflow site's identity ported to code and pinned by the owner: the rotating hero titles, the orbiting tool ring, the sticky "I build ... for Modern Web" reveal, the gradient-ball buttons and the giant footer wordmark are binding brand commitments, not decoration to be traded away. Behind the stage runs a faint 12-column drafting grid, and one hot accent, Signal orange, marks everything that answers the visitor: selection, focus, the cursor, the System inspector, progress.

Density is generous and editorial. Sections breathe with tall vertical padding, reading copy sits in a 64rem column while card stacks widen to 72rem, and large medium-weight grotesk headlines with tight negative tracking do the structural work. Objects are generously rounded cards and tiles on tonal grounds (paper, sand, night, ink); the stage itself stays flat.

Motion is expo-out and soft long-tailed arrivals, scroll-scrubbed reveals and slow decorative loops. A Design/System switch lets the visitor flip the page into a blueprint of itself. Every animation has a reduced-motion path where the content is simply there, fully inked and in place.

**Key Characteristics:**
- Beige ground, black ink, a grey ladder for hierarchy; Signal orange for interaction and system feedback; full colour only in the gradient rule and the hover-revealed button balls.
- A fixed 12-column grid (4 on mobile) drawn in near-invisible hairlines behind all content; System view turns it orange and numbers it.
- BDO Grotesk at medium weight with tight negative tracking; Roboto Mono uppercase for section labels, metadata and the inspector.
- Rounded rectangles, not pills, for buttons and cards (1rem to 3rem); pills only for chips and the back-to-top disc; dashed circles and ovals frame icons.
- A square Signal cursor that trails the pointer on fine-pointer devices.
- Reduced motion gets full content instantly. There is no global pause control (removed by the owner).

## Colors

A warm off-white and true black, one hot interaction accent, and a gradient signature rationed to thin marks.

### Primary
- **Ink Black** (`ink`): All text, the dark button, selected chips, the fourth project-card ground, the nav glass pill at 55%, hairline dividers at 10-15% opacity. The voice of the page.

### Secondary
- **Signal Orange** (`signal`): The interaction and system colour. Text selection (white on signal), the global focus ring (2px, 3px offset), the input caret, the custom cursor, the back-to-top progress ring, the "AA" in the Accessibility tile, the current-item dot on the Education timeline, the active System button, and every System-view overlay (grid lines at 35%, column numbers, inspector box, tags and dimension lines). Pointer spotlights inside tiles and cards glow in signal at 9% (20-22% on night grounds). It shares its hex with the gradient rule's first stop by design.

### Tertiary
- **Signature Gradient Rule** (`rule-orange` to `rule-yellow` to `rule-sky` to `rule-blue`, as `linear-gradient(90deg, #ff4d00, #e7eb4c 31%, #0b90cb 68%, #0c59c1)`): The short bar before every section heading and the 3px list markers in Experience and in project "What I built" lists. Thin and small, never a fill.
- **Night** (`night`): The near-black violet ground for the "I build" video window, the second project-card ground, the dark Accessibility tile and the dark certification card. The default dark surface.
- **Button Balls** (red-yellow `#fd3846` to `#ffd000`; violet-green `#a600ff` to `#2bff00`): Blurred, overlay-blended gradients inside buttons, invisible at rest and fading in on hover or focus. Material, not palette: never text or fill elsewhere.

### Neutral
- **Stage Beige** (`beige`): Page background, the mobile menu sheet, the scrolled-header fade, input fills, light-tile chip fills, the System switch at 90%.
- **Sand** (`sand`): Third project-card ground and the bottom stop of the light button's vertical gradient (from `#f2f1ed`).
- **Paper White** (`paper`): Raised objects: the first project-card ground, skill tiles (at 70%), certification, CTA, contact and footer cards, the back-to-top disc (at 90%).
- **Grey ladder** (`grey-100` to `grey-600`): `grey-200` for dashed icon rings and oval tiles; `grey-300` for metadata, captions, mono labels, footer social labels; `grey-400` for supporting paragraphs; `grey-500` for intro and list body text; `grey-100` for dividers. Grid lines are ink at 5.5%.

### Named Rules
**The Signal Answers Rule.** Signal orange marks only what responds to the visitor or exposes the system: focus, selection, cursor, progress, inspection, the single current-item marker. It is never a section background, a headline colour or decoration at rest.

**The Rationed Colour Rule.** Beyond signal, colour appears only as the gradient rule and the hover-revealed balls. A new surface adds no new hue; it reaches for a grey step, a tonal ground, or the rule.

**The Grey Floor Rule.** Text on beige or white never goes lighter than `grey-300`; that is the lightest step that holds AA contrast at body sizes. On night and ink grounds, supporting text holds at white 70%.

## Typography

**Display Font:** BDO Grotesk (variable, 300 to 900; fallback Helvetica Neue, Arial)
**Label Font:** Roboto Mono (400, 500)

**Character:** A friendly geometric grotesk set at medium weight with tight tracking reads confident without shouting; the mono caps add a technical, annotated counter-voice that the System view extends into a live spec sheet.

### Hierarchy
- **Display** (500, 2.5rem to 4.5rem, line-height 1, -0.03em): The rotating hero titles only.
- **Headline** (500, 1.75rem to 3.5rem, 1.05, -0.02em): The "I build" side words and reveal line; the Accessibility tile's "WCAG 2.1 AA" at up to 3.25rem, -0.04em.
- **Card Title** (500, 2rem to 3rem, 1.02, -0.03em): Project card titles; certification names at 1.75rem to 2.5rem.
- **Title** (500, 1.25rem to 2.75rem, -0.02em): Experience company names (to 2.75rem), skill tile titles, Education entries (the current one at 2.25rem), "Also built" heading.
- **Lead** (500, 1.25rem to 1.5rem, 1.35, -0.02em): Section intro paragraphs in `grey-500`; About paragraphs scrub from grey to ink.
- **Body** (500, 1rem to 1.125rem, 1.45): Summaries, highlights and descriptions, capped near 30-46rem.
- **Label** (Roboto Mono 400, 0.75rem, 0.1em, uppercase): Project category and index, "What I built", skill counts, certification status, "Scroll to explore", cursor labels (11px). Section labels scale this to 1.25rem (0.05em) on mobile and 1.75rem (0.1em) from md and are the real h2s.
- **Giant Wordmark** (500, 15vw mobile / 16.5vw from md, 0.95, -0.05em): The footer name, edge to edge inside the footer card.

### Named Rules
**The Medium Voice Rule.** Body and headings both sit at weight 500. Hierarchy comes from size and tracking, not weight; bold is reserved for the first name in the "ZensiKorat" wordmark (1.625rem, -0.03em).

**The Mono Means Metadata Rule.** Roboto Mono uppercase labels name or count things (a section, a category, an index, a group). They never carry sentences.

## Layout

A centred column over a fixed drafting grid. The grid is 12 equal columns from md (4 below), inset by the page gutter (1rem mobile, 3rem from md), drawn as 1px hairlines in ink at 5.5% and pinned behind all content (z 0, no pointer events). Reading content sits in a 64rem container; project, skills and certification grids widen to 72rem; header, hero bar, CTA and footer reach 90rem. Sections use 6rem vertical padding on mobile and 9rem from md.

Two-column splits appear only from md: project cards at 1.1fr / 1fr with a hairline between, experience at 1fr / 1.35fr with a sticky left column, CTA at 1fr / 1.75fr, Education at a 9rem date rail plus content. Skills is a 6-column bento: rows span 4/2, 3/3, then 2/2/2, collapsing to one column on mobile. Certifications sit two-up. Lists use hairline rules (`ink` at 10%) between rows rather than boxes.

The hero is a full-height stage (100svh, min 38rem) with the title centred inside the orbit and a bottom bar pinned 1.25rem to 2rem from the edge. The "I build" section runs a 300svh scroll runway with a sticky full-viewport stage, only when motion is allowed. Project cards stack: each is sticky from md at the header height plus 0.75rem per index, so the deck fans down slightly. The header is fixed and always visible at 5.5rem.

Floating chrome sits in the bottom corners: the Design/System switch bottom-left (1.5rem in, fine pointers at md and up only), back-to-top bottom-right (1rem, 1.5rem from md). The switch steps aside while the footer name is on screen.

Breakpoints are Tailwind defaults (sm 640px, md 768px, lg 1024px); md is the main switch.

## Elevation & Depth

The stage is flat; objects on it are tonal. Depth comes from ground changes (paper, sand, night, ink cards on beige) and from motion (stacking, scale, clip, blur). Shadows exist only where something physically sits above something else: the stacked project cards, and chrome that floats over the page.

### Shadow Vocabulary
- **Stack shadow** (`box-shadow: 0 24px 60px -30px rgb(0 0 0 / 0.35)`): Under project cards, so each reads as lying on the one before.
- **Float shadow** (`box-shadow: 0 10px 30px -12px rgb(0 0 0 / 0.35)`; the System switch uses `-15px` at 0.3): Back-to-top disc and System switch, both with backdrop blur.
- **Button inner glow** (`box-shadow: inset 0 0 7px #ffffff47`, hover `inset 0 0 7px #fff9`): A soft lit edge inside buttons.
- **Legibility shadow** (`text-shadow: 0 2px 24px rgb(0 0 0 / 0.55)`): Only for white text over the "I build" video.

Glass appears twice: the header's nav pill (ink at 55%, medium backdrop blur) and the mobile menu toggle in the same material. The scrolled header adds a beige-to-transparent fade (7rem) behind the wordmark instead of a bar.

### Named Rules
**The Flat Stage Rule.** Sections and in-flow blocks never float on drop shadows; separate them by tone. A shadow is earned only by stacking (project cards) or by floating over the page (chrome).

## Shapes

Everything is rounded; nothing is sharp, except the cursor, which is a deliberate square. Buttons are soft rounded rectangles (1.5rem, 1rem when small), not pills. Containers scale their radius with their size: fields 0.75rem, header pill 1.25rem, footer card 1.5rem, skill tiles 1.75rem, certification, contact and project cards 2rem on mobile, project cards 2.5rem and CTA 3rem from md. Pills are kept for chips, tech tags and the Education detail tag; the back-to-top button is a full disc.

Icons always sit in a dashed frame: lucide line icons (1.5 stroke) in dashed circles (2.75rem in skill tiles, 3.5rem on project cards), and tool logos in 2px dashed ovals (50% radius on a taller-than-wide tile) in the hero orbit and the Frontend skill tile. The "I build" window clips from a 16px-rounded chip to a 32px-rounded near-full-bleed frame; certification cards reveal through a 2rem-rounded clip from the bottom.

## Components

### Buttons (gradient-ball)
Calm at rest, lit on contact: a rounded rectangle whose colour arrives only when you reach for it.
- **Shape:** 1.5rem radius (1rem small), `overflow: clip`, isolated stacking.
- **Dark:** Ink fill, white text, 1.25rem by 1.75rem padding (1.5rem by 2rem from md), 1rem / 500 type.
- **Light:** Vertical gradient from `#f2f1ed` to sand, ink text. The primary human action ("Hire me", "Let's connect") and the header Contact button.
- **Small:** 1rem by 1.5rem padding at 0.875rem type; balls blur 13px instead of 20px.
- **Balls:** A red-yellow and a violet-green ball, each half the button's size, blurred and overlay-blended, drifting on 12s and 16s loops. Hidden at rest.
- **Hover / Focus:** Balls fade in over 0.7s and a second unblended copy glows to 60%; both fade out over 0.9s, all on the soft ease. Inner glow brightens. Active presses to 0.97. Under reduced motion the fade shortens to 0.2s and stays as feedback.

### Chips
- **Tech chips (project cards):** Pill, 1px border tuned to the card ground, 1rem by 0.5rem padding, 0.875rem type.
- **Skill chips:** Pill on beige (light tiles) or white 5% (dark tile), 0.95rem type. Hover inverts to ink (or to white on the dark tile).
- **Topic chips (contact):** Pill, 1px border at 15% ink; selected fills ink with white text, backed by a visually hidden radio.

### Cards / Containers
- **Project card (signature):** Anonymised, stacked and sticky. Grounds cycle white, night, sand, ink in order. 2rem radius (2.5rem from md), 1.5rem to 3.5rem padding, min 30rem tall from md. Left: dashed-circle lucide icon, mono category and "01 / 07" index, title, summary, tech chips. Right, past a hairline: a mono "What I built" heading and highlights marked by 3px gradient-rule dashes. As the next card arrives, the previous scales to 0.92 and dims to 85% brightness (scrubbed, md and up). Hovering shows the "Project" cursor label and a signal spotlight.
- **Skill tile:** Paper at 70% with a 10% ink border, 1.75rem radius, 1.5rem to 2rem padding; header row of dashed-circle icon, title and a mono item count; chips pinned to the bottom. The Accessibility tile is night with a large "WCAG 2.1 AA" where "AA" is signal. The Frontend tile carries the tool logos in dashed oval tiles that bob 6px on a 4s offset loop.
- **Certification card:** Paper with 10% ink border, or night; 2rem radius, min 22rem to 26rem tall; logo top, status, name and issuer bottom. Reveals by clip from the bottom edge, then the logo and lines rise.
- **CTA and contact cards:** Paper, 2rem radius (CTA 3rem from md), 2rem to 4rem padding. The CTA pairs with a tile holding a blurred looping video.
- **Footer card:** Paper, 1.5rem radius, inset 0.75rem to 1.5rem from the viewport edge. Copyright and resume link bottom-left in `grey-300`; socials right-aligned, each a `grey-300` label with a black icon; the giant name below. The card rises 18% into place as the page runs out.

### Inputs / Fields
- **Style:** Beige fill inside the white form card, 1px border at 15% ink, 0.75rem radius, 0.875rem by 1rem padding. Placeholder in `grey-300`; caret in signal.
- **Focus:** Border goes full ink plus the global signal focus ring. Hover lifts the border to 40% ink.
- **Error:** A soft red notice block (`#fdecea` ground, `#8a1c12` text) with a mailto fallback.

### Navigation
- **Desktop:** Fixed and always visible. Wordmark left ("Zensi" bold, "Korat" regular). Links and a light small Contact button sit together inside a dark glass pill (ink at 55%, backdrop blur, 1.25rem radius). Links are white 0.875rem with the char roll: letters slide up and a duplicate row rolls in, 0.45s on the soft ease with a 22ms per-character delay, on hover and focus.
- **Mobile:** A 3rem glass square (same material) holds a two-bar toggle that morphs to an X. The menu is a full beige sheet, links at 2.25rem with hairline dividers rising in at 50ms stagger; scroll locks, content behind goes inert, Escape closes and returns focus.

### Section Label
A short gradient-rule bar (1.75rem to 3.5rem wide, 2px tall, pill-capped) beside a Roboto Mono uppercase h2. This is the section heading itself.

### Education Timeline
A 1px ink-20% rule on a 9rem date rail draws itself downward as you scroll (scrubbed). Entries carry an 11px dot: signal for the current entry, beige with a 40% ink ring for the rest. Optional detail sits in a mono pill.

### Custom Cursor (signature)
After Clapat's Jetton. On fine pointers the system cursor is hidden (fields keep the text cursor) and a 14px signal square follows the pointer with a 0.2 lerp (instant under reduced motion). Over links and buttons it grows to a 46px signal outline with an 8% fill; over `[data-cursor]` it grows to 92px and shows the attribute's text in 11px mono caps; over fields it fades out. Presses squeeze to 0.8. Sizes ease on the soft curve over 0.35s. In System view it becomes an outline. It also feeds the pointer position to spotlights underneath.

### Design / System Switch (signature)
After moisez.com. A two-button segmented control (Design with an eye, System with a ruler) in 11px mono caps on beige glass, bottom-left, toggled by click or the S key; the choice persists. Offered only to fine pointers at md and up. System view turns the grid lines signal at 35%, drops in column numbers ("01" to "12", staggered 38ms), and turns hover into inspection: a dashed signal outline around the element, a tag reading font / size / line-height / tracking / weight / column span (or tag and W by H for media), signal dimension lines with W and H labels, and a dashed "Npx of space" measure to the next element below.

### Back to Top
A 3.5rem white disc (90%, blur, float shadow) bottom-right with an up arrow. A 2px signal ring around it fills with scroll progress over an 8% ink track. Appears after 60% of a viewport; scrolls home via Lenis and moves focus to main. Hides on mobile while the footer name is in view.

### Motion Grammar (signature)
Arrivals use expo-out (`cubic-bezier(0.16, 1, 0.3, 1)`); hover reveals, cursor, grid and inspector use the soft ease (`cubic-bezier(0.65, 0.05, 0, 1)`); scrubs are linear with 0.6 to 0.8s smoothing.
- **Rotating hero titles:** Three lines share one grid cell, rising word by word, holding, lifting away on a repeating cycle. Screen readers get one static h1.
- **Orbit and icon flips:** Tool logos in dashed oval tiles ring the title on a 100s rotation, each counter-rotating to stay upright, flipping in sequence on a 6s repeat.
- **Hero entrance:** Orbit, title, line and actions settle from 95% scale and zero opacity, staggered.
- **"I build" reveal:** Sticky stage over a 300svh runway. A clip-path window grows from a small 16px-rounded chip to a frame inset 24px (12px on mobile) at 32px radius; the video inside (`build.webm` / `build.mp4`, poster fallback, plays only on screen) scales 1.4 to 1; "I build" and "for Modern Web" slide apart; "Interfaces that become Experiences" fades up past the midpoint.
- **Project stack:** Title words rise through a mask, highlights slide in, chips pop, the icon spins in; the previous card sinks to 0.92.
- **Skill tiles:** Batch rise (60px, 1.1s, 0.12s stagger), then chips pop in with back-out.
- **Word fill:** About paragraphs and company names fill from grey to ink as they scroll through. Fully inked by default.
- **Footer:** Card rises into place (scrubbed); socials slide in from the right; the name rises letter by letter from 5vw below (1s, 0.05s stagger), replaying each time it re-enters.
- **Marquee:** A 50s endless strip of skills, paused on hover.
- **Small loops:** Globe meridians flip on 2s; the availability dot pulses on 2s; Frontend logos bob on 4s.

### Reduced Motion
Under `prefers-reduced-motion: reduce`, every GSAP timeline and scrub is skipped, Lenis is off, CSS animations and transitions collapse to near zero, the "I build" runway and side words are removed so the reveal line shows in a static framed window over the poster, loop videos stay on their posters, the cursor follows without lag, and the button colour fade keeps a short 0.2s as action feedback. Hero intro elements only start hidden when motion is allowed and JS has run, with a 4s safety that reveals them anyway.

There is no global pause control: the owner removed it. Decorative loops run while on screen for visitors who have not asked for reduced motion.

## Do's and Don'ts

### Do:
- **Do** keep the stage beige and the text ink; reach for a grey step (never lighter than `grey-300`) for hierarchy.
- **Do** use signal for every focus, selection, progress or inspection state, and for nothing at rest.
- **Do** mark section headings with the gradient-rule bar plus a mono caps h2.
- **Do** use the gradient-ball button for every primary action: light for the human action, dark for the resume or utility action, balls hidden until hover or focus.
- **Do** frame icons in dashed circles (lucide, 1.5 stroke) or dashed ovals (tool logos).
- **Do** give large objects tonal grounds from the set (paper, sand, night, ink) and let radius grow with size.
- **Do** ease arrivals with expo-out, hover reveals with the soft curve, and tie scroll effects to scrub, not timers.
- **Do** gate every animation behind the reduced-motion query, leaving content readable with no JS.
- **Do** keep split text accessible: animated copy is hidden from assistive tech and a whole-sentence equivalent carries the meaning.

### Don't:
- **Don't** introduce new hues or fill large areas with the gradient or with signal.
- **Don't** put drop shadows on in-flow sections or blocks; only stacked cards and floating chrome earn a shadow.
- **Don't** square any corner other than the cursor.
- **Don't** use bold for hierarchy; weight stays at 500 outside the wordmark's first name.
- **Don't** replace the binding motion set (rotating titles, orbit, "I build" reveal, gradient-ball buttons, footer wordmark) with generic fades.
