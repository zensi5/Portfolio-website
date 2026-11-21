export type SkillGroup = {
  title: string;
  /** lucide icon name, see components/sections/Skills.tsx */
  icon: "code" | "atom" | "palette" | "accessibility" | "flask" | "sparkles" | "layers";
  items: string[];
};

/** Straight from the resume skills section. */
export const skills: SkillGroup[] = [
  {
    title: "Frontend",
    icon: "code",
    items: ["React.js", "Next.js", "Vue.js", "Angular", "JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3"],
  },
  {
    title: "Web accessibility",
    icon: "accessibility",
    items: ["WCAG 2.1 AA", "WAI-ARIA", "NVDA", "JAWS", "VoiceOver", "Keyboard navigation", "Focus management", "Semantic HTML", "axe DevTools", "WAVE", "Lighthouse"],
  },
  {
    title: "React ecosystem",
    icon: "atom",
    items: [
      "React Hooks",
      "Custom Hooks",
      "Context API",
      "Redux Toolkit",
      "Zustand",
      "TanStack Query",
      "React Router",
      "React Hook Form",
      "Code splitting",
      "Lazy loading",
      "React.memo · useMemo · useCallback",
      "SSR",
      "SSG",
    ],
  },
  {
    title: "Testing & debugging",
    icon: "flask",
    items: ["React Testing Library", "Vitest", "React DevTools", "Browser DevTools"],
  },
  {
    title: "UI & styling",
    icon: "palette",
    items: ["Tailwind CSS", "Styled Components", "SCSS", "Ant Design", "Material UI", "Shadcn UI", "Vuetify", "Bootstrap", "Framer Motion"],
  },
  {
    title: "Tools & AI",
    icon: "sparkles",
    items: ["Git", "REST APIs", "Webflow", "WordPress", "Claude", "GitHub Copilot", "Figma MCP", "Spec-driven development"],
  },
  {
    title: "Other expertise",
    icon: "layers",
    items: ["Responsive design", "Component-driven architecture", "Atomic design", "SEO-friendly UI", "Cross-browser compatibility", "Web performance", "UX design"],
  },
];

/** The eight tools orbiting the hero. Files live in /public/icons. */
export const orbitIcons = [
  { name: "Figma", src: "/icons/figma.svg" },
  { name: "Sass", src: "/icons/sass.svg" },
  { name: "Angular", src: "/icons/angular.svg" },
  { name: "Tailwind CSS", src: "/icons/tailwind.svg" },
  { name: "Vue.js", src: "/icons/vue.svg" },
  { name: "React", src: "/icons/react.svg" },
  { name: "Webflow", src: "/icons/webflow.svg" },
  { name: "JavaScript", src: "/icons/javascript.svg" },
];

/** Words in the scrolling strip under About. */
export const marqueeWords = [
  "React",
  "Next.js",
  "TypeScript",
  "Vue",
  "Angular",
  "GSAP",
  "Accessibility",
  "Tailwind",
  "Performance",
  "Design systems",
  "AI interfaces",
  "Webflow",
];
