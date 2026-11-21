export type Job = {
  company: string;
  role: string;
  period: string;
  location: string;
  points: string[];
};

export const experience: Job[] = [
  {
    company: "Simform Solutions LLP",
    role: "Frontend Developer",
    period: "Feb 2023 – Present",
    location: "Ahmedabad, Gujarat",
    points: [
      "Deliver production-ready React.js and Next.js apps with reusable components, Custom Hooks, and a scalable folder structure.",
      "Manage client and server state with Redux Toolkit, Zustand, Context API, and TanStack Query (caching, refetching, mutations).",
      "Integrate REST APIs through a reusable service layer for full CRUD flows, with clear loading, error, and empty states.",
      "Speed up pages with code splitting, lazy loading, memoization, and SSR/SSG in Next.js for faster loads and better SEO.",
      "Led WCAG 2.2 AA remediation on a legacy ASP.NET app: screen readers, keyboard navigation, and WAI-ARIA.",
      "Built AI-powered interfaces: conversational platforms, anime-style AI characters, creator bots with monetization, and a finance AI bot.",
      "Built an event ticketing system with an admin panel, ticket flows, event discovery, and Google Ad banners.",
      "Shipped SEO-friendly landing pages, story views, reels sections, micro-animations, and healthcare websites in Webflow.",
      "Use Figma MCP, GitHub Copilot, and spec-driven development to move faster from design to code.",
      "Write component tests with React Testing Library and Vitest, and work with product, design, and backend teams through code review.",
    ],
  },
  {
    company: "SoftCoding Solutions",
    role: "Frontend Intern",
    period: "June 2022 · 1 month",
    location: "Ahmedabad, Gujarat",
    points: [
      "Learned JavaScript DOM manipulation and event handling to add interactivity to web pages.",
      "Built responsive layouts with CSS Flexbox, Grid, and media queries.",
    ],
  },
];

export type Credential = {
  name: string;
  issuer: string;
  detail?: string;
  link?: string;
  logo: { src: string; width: number; height: number; alt: string };
  tone: "light" | "dark";
};

export const certifications: Credential[] = [
  {
    name: "Claude Certified Architect – Foundations",
    issuer: "Anthropic",
    detail: "CCA-F",
    link: "https://www.credly.com/badges/936472f2-99ea-4fcf-849e-214692b1b1d7",
    logo: { src: "/logos/claude.svg", width: 100, height: 100, alt: "Claude" },
    tone: "light",
  },
  {
    name: "Web Accessibility Specialist",
    issuer: "International Association of Accessibility Professionals",
    detail: "IAAP WAS",
    logo: {
      src: "/logos/iaap.webp",
      width: 1154,
      height: 123,
      alt: "IAAP, International Association of Accessibility Professionals",
    },
    tone: "dark",
  },
];

export type School = {
  name: string;
  school: string;
  period: string;
  detail?: string;
};

export const education: School[] = [
  {
    name: "B.E. in Information Technology",
    school: "Silver Oak College of Engineering and Technology, Ahmedabad",
    period: "2019 – 2023",
    detail: "CGPA 9.20",
  },
  {
    name: "Higher Secondary (H.S.C., GSEB)",
    school: "A-One Xavier's English School, Ahmedabad",
    period: "2019",
  },
  {
    name: "Secondary (S.S.C., GSEB)",
    school: "A-One Xavier's English School, Ahmedabad",
    period: "2017",
  },
];
