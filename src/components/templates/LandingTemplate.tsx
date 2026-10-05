import { useTranslations } from "next-intl";
import {
  AboutSection,
  ContactSection,
  Footer,
  HeroSection,
  Navbar,
  ProjectsSection,
  TimelineSection,
} from "@/components/organisms";
import type { Project, TechItem, TimelineEntry } from "@/modules/portfolio";

export interface LandingTemplateProps {
  techStack: TechItem[];
  timeline: TimelineEntry[];
  projects: Project[];
}

/** Page skeleton for the landing route: composes organisms, owns no data. */
export function LandingTemplate({ techStack, timeline, projects }: LandingTemplateProps) {
  const t = useTranslations("common");

  return (
    <>
      <a
        href="#main"
        className="ds-btn ds-btn-primary fixed top-3 start-3 z-[60] -translate-y-24 focus:translate-y-0"
      >
        {t("skipToContent")}
      </a>
      <Navbar />
      <main id="main" className="flex-1">
        <HeroSection techStack={techStack} />
        <AboutSection />
        <TimelineSection entries={timeline} />
        <ProjectsSection projects={projects} />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
