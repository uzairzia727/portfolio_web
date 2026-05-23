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
import { GitHubProjects } from "@/components/GitHubProjects";
import { Services } from "@/components/Services";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <UniversalSection
          id="home"
          bleed={<HeroMesh />}
          className="min-h-[min(100svh,900px)] sm:min-h-[min(100svh,920px)]"
        >
          <Hero />
        </UniversalSection>

        <UniversalSection
          id="about"
          bleed={<AboutGrid />}
          className="min-h-[min(100svh,900px)] sm:min-h-[min(100svh,920px)]"
        >
          <About />
        </UniversalSection>

        <UniversalSection
          id="experience"
          bleed={<ExperienceField />}
          className="max-md:min-h-0 max-md:py-12"
        >
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

        <UniversalSection
          id="projects-area"
          bleed={<DataStream />}
          className="min-h-0"
          innerClassName="relative z-10"
        >
          <ProjectsBento />
        </UniversalSection>

        <UniversalSection
          id="github-area"
          bleed={<DataStream />}
          className="min-h-0"
          innerClassName="relative z-10"
        >
          <GitHubProjects />
        </UniversalSection>

        <UniversalSection id="services" className="min-h-0">
          <Services />
        </UniversalSection>
      </main>
      <SiteFooter />
    </>
  );
}
