export type Project = {
  slug: string;
  /** Descriptive title. Client names stay private unless the client allows it. */
  title: string;
  category: string;
  /** lucide icon name, see components/sections/Projects.tsx */
  icon: "villa" | "building" | "accessibility" | "live" | "bot" | "tennis" | "calendar";
  tech: string[];
  summary: string;
  highlights: string[];
  /** Public link, only where the client allows it */
  link?: string;
};

export const projects: Project[] = [
  {
    slug: "property-management",
    title: "Multi-organization Property Management System",
    category: "SaaS platform",
    icon: "building",
    tech: ["React.js", "Next.js", "TypeScript"],
    summary: "A platform to manage properties, units, and tenants across many organizations, each with its own roles and dashboards.",
    highlights: [
      "Role-based access control for Org Admin, Admin, and Tenant users",
      "Protected routes and role-specific dashboards",
      "Tenant portal to move or transfer units and upload lease documents",
      "Online rent payments through a payment gateway",
    ],
  },
  {
    slug: "accessibility-remediation",
    title: "Enterprise Accessibility Remediation",
    category: "Staff augmentation & employee management",
    icon: "accessibility",
    tech: ["ASP.NET", "Bootstrap", "WAI-ARIA"],
    summary: "Brought a legacy enterprise application up to WCAG 2.1 AA.",
    highlights: [
      "Screen reader support (NVDA, JAWS) with semantic HTML, ARIA labels, roles, and live regions",
      "Full keyboard access: logical tab order, visible focus, skip links, modal focus management",
      "Fixed labels, error messages, headings, alt text, and contrast",
      "Tested with axe, WAVE, and Lighthouse",
    ],
  },
  {
    slug: "live-dating",
    title: "Live-Streaming Dating & Social Platform",
    category: "Social app",
    icon: "live",
    tech: ["React.js", "Styled Components", "Ant Design"],
    summary: "A dating platform that connects people through live streams and social interaction.",
    highlights: [
      "Live streams, image and video posts, and friend requests",
      "Daily coin rewards and coin-based features",
      "Animated level-ups and real-time UI built with React Hooks",
    ],
  },
  {
    slug: "ai-creator-chat",
    title: "AI Creator Persona Chat Platform",
    category: "AI product",
    icon: "bot",
    tech: ["Vue.js", "SCSS", "Ant Design"],
    summary: "A real-time platform where fans chat with AI personas of their favourite creators.",
    highlights: [
      "Real-time chat UI for creator personas",
      "Coin-based virtual gifting flows",
      "Personality-based onboarding that shapes each creator's AI persona",
    ],
  },
  {
    slug: "villa-website",
    title: "Basera Living",
    category: "Luxury villa real estate website",
    icon: "villa",
    tech: ["React.js", "Next.js"],
    summary: "A website for a boutique real estate brand in North Goa, built to rank and to convert.",
    highlights: [
      "Villa detail pages with Next.js dynamic routing",
      "Full SEO: meta tags, Open Graph, canonical URLs",
      "Featured projects slider and a validated contact form",
      "Optimized images and fully responsive layouts",
    ],
    link: "https://baseraliving.in/",
  },
  {
    slug: "tennis-coaching",
    title: "Virtual Tennis Coaching Platform",
    category: "Sports & coaching",
    icon: "tennis",
    tech: ["Angular", "SCSS", "Material UI"],
    summary: "Connects players with ATP/WTA and professional coaches for remote training.",
    highlights: [
      "1:1 virtual coaching sessions",
      "Stroke-analysis video uploads",
      "Community feed to follow coaches and content",
    ],
  },
  {
    slug: "event-marketplace",
    title: "Event Planning Marketplace",
    category: "Marketplace",
    icon: "calendar",
    tech: ["React.js", "Styled Components", "Ant Design"],
    summary: "One marketplace for venues, vendors, travel, and stays.",
    highlights: [
      "Supports in-person, virtual, and hybrid events",
      "Reusable React components with React Router",
      "End-to-end planning flow across vendors and logistics",
    ],
  },
];

/** Smaller pieces, listed in one line each. */
export const otherWork: { title: string; tech: string; text: string; link?: string }[] = [
  {
    title: "Architect's portfolio",
    tech: "Webflow",
    text: "Responsive layouts and smooth scroll animations.",
    link: "https://yash-korat.webflow.io/",
  },
  {
    title: "Appvalt Systems",
    tech: "WordPress",
    text: "IT services website with multiple service pages built with WordPress plugins.",
    link: "https://appvalt.com/",
  },
  { title: "Healthcare websites", tech: "Webflow", text: "Fast, responsive sites with clear navigation." },
];
