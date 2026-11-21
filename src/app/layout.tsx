import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/profile";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Cursor } from "@/components/chrome/Cursor";
import { SystemView } from "@/components/chrome/SystemView";
import { BackToTop } from "@/components/chrome/BackToTop";
import { siteUrl } from "@/lib/site";

const bdo = localFont({
  src: "../fonts/BDOGrotesk-VF.woff2",
  variable: "--font-bdo",
  weight: "300 900",
  display: "swap",
});

const mono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-roboto-mono",
  display: "swap",
});

const title = `${profile.name} | ${profile.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s | ${profile.name}` },
  description: profile.seoDescription,
  keywords: ["Frontend Developer", "React", "Next.js", "TypeScript", "GSAP", "Web Accessibility", "WCAG", "Ahmedabad"],
  authors: [{ name: profile.name, url: siteUrl }],
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: siteUrl, title, description: profile.seoDescription, siteName: profile.name, locale: "en_IN" },
  twitter: { card: "summary_large_image", title, description: profile.seoDescription, creator: "@zensikorat" },
};

export const viewport: Viewport = {
  themeColor: "#f8f7f3",
};

/** Runs before paint: restore Design/System view, and hide intro elements only when motion is allowed (4s failsafe). */
const bootScript = `(function(){try{var d=document.documentElement;if(localStorage.getItem('view')==='system'&&matchMedia('(hover: hover) and (pointer: fine) and (min-width: 768px)').matches)d.dataset.view='system';if(matchMedia('(prefers-reduced-motion: no-preference)').matches){d.classList.add('motion-ok');setTimeout(function(){if(!window.__introDone)d.classList.remove('motion-ok')},4000)}}catch(e){}})();`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  url: siteUrl,
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Ahmedabad", addressRegion: "Gujarat", addressCountry: "IN" },
  worksFor: { "@type": "Organization", name: "Simform Solutions" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Silver Oak College of Engineering and Technology" },
  sameAs: profile.socials.map((s) => s.href),
  knowsAbout: ["React", "Next.js", "TypeScript", "Vue.js", "Angular", "Web Accessibility", "GSAP"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bdo.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-white"
        >
          Skip to main content
        </a>
        <SmoothScroll />
        <SystemView />
        <Header />
        <main id="main" tabIndex={-1} className="relative z-10 outline-none">
          {children}
        </main>
        <Footer />
        <BackToTop />
        <Cursor />
      </body>
    </html>
  );
}
