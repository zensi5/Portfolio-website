export const experienceYears = "3+ years";

export const profile = {
  name: "Zensi Korat",
  firstName: "Zensi",
  lastName: "Korat",
  role: "Frontend Developer",
  location: "Ahmedabad, Gujarat",
  country: "India",
  email: "zensikorat5@gmail.com",
  resume: "/Zensi_Korat_Resume.pdf",
  available: "Open to roles & freelance",

  /** The rotating hero titles, in order. */
  heroTitles: ["Hey, I'm Zensi", "Frontend Developer", "Crafting Animations"],
  heroLine: "Building scalable, design-led interfaces for modern web products.",

  seoDescription: `Frontend developer with ${experienceYears} of experience building fast, accessible, animated interfaces with React, Next.js, Vue, and Angular.`,

  /** Rephrased from the resume summary */
  about: [
    "Hello, I'm Zensi Korat, a frontend developer with 3+ years of experience building production-ready web applications with React.js, Next.js, Vue.js, and Angular. I work with React Hooks, state management, and component-driven architecture, and I care a lot about performance.",
    "I've built role-based platforms, AI-driven interfaces, and real estate websites. Accessibility is part of how I work, not an afterthought: WCAG 2.1 AA, WAI-ARIA, and screen reader support, alongside SEO and responsive layouts that hold up on every device.",
  ],

  cta: "I'm drawn to products where clarity, scale, and real user impact matter. I enjoy shaping interfaces that feel intuitive and responsive, using motion thoughtfully with GSAP and Framer Motion to bring them to life. I'm open to new roles, freelance projects, and conversations about building things that feel purposeful, polished, and easy to use.",

  socials: [
    { label: "Linkedin", href: "https://www.linkedin.com/in/zensi-korat/", icon: "linkedin" },
    { label: "Github", href: "https://github.com/zensi5", icon: "github" },
    { label: "Twitter", href: "https://x.com/zensikorat", icon: "x" },
  ],
} as const;

/** Facts shown beside the About copy. Every value comes from the resume. */
export const facts = [
  { term: "Based in", value: "Ahmedabad, India" },
  { term: "Experience", value: experienceYears },
  { term: "Currently", value: "Simform Solutions" },
  { term: "Degree", value: "B.E. IT · CGPA 9.20" },
];
