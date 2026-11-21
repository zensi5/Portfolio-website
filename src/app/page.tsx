import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Marquee } from "@/components/sections/Marquee";
import { Build } from "@/components/sections/Build";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Sketch } from "@/components/sections/Sketch";
import { Certifications } from "@/components/sections/Certifications";
import { Education } from "@/components/sections/Education";
import { Cta } from "@/components/sections/Cta";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Marquee />
      <Build />
      <Projects />
      <Experience />
      <Skills />
      <Sketch />
      <Certifications />
      <Education />
      <Cta />
    </>
  );
}
