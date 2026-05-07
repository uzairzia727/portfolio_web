import { SiteHeader } from "@/components/SiteHeader";
import { UniversalSection } from "@/components/UniversalSection";
import { HeroMesh } from "@/components/backgrounds/HeroMesh";
import { AboutGrid } from "@/components/backgrounds/AboutGrid";
import { ExperienceField } from "@/components/backgrounds/ExperienceField";
import { DataStream } from "@/components/backgrounds/DataStream";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { ProjectsBento } from "@/components/ProjectsBento";
import { Services } from "@/components/Services";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <UniversalSection id="home" bleed={<HeroMesh />}>
          <Hero />
        </UniversalSection>

        <UniversalSection id="about" bleed={<AboutGrid />}>
          <About />
        </UniversalSection>

        <UniversalSection id="experience" bleed={<ExperienceField />}>
          <header className="max-w-3xl space-y-4">
            <p className="text-xs uppercase tracking-[0.26em] text-accent">Experience</p>
            <h2 className="font-display text-2xl text-mist sm:text-3xl lg:text-4xl">
              Career Milestones & Highlights
            </h2>
            <p className="text-sm leading-relaxed text-mist/70">
              Bridging the gap between sophisticated Web UI/UX and robust data architectures. 
              Specializing in Python-driven AI integration, high-performance SQL databases, 
              and automated ETL pipelines.
            </p>
          </header>
          <ExperienceTimeline />
        </UniversalSection>

        <UniversalSection id="projects-area" bleed={<DataStream />}>
          <ProjectsBento />
        </UniversalSection>

        {/* Corrected: Wrapped in UniversalSection to ensure visibility and layout */}
        <UniversalSection id="services">
          <Services />
        </UniversalSection>
      </main>
      <SiteFooter />
    </>
  );
}
