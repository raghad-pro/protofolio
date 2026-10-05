import { setRequestLocale } from "next-intl/server";
import { LandingTemplate } from "@/components/templates/LandingTemplate";
import { portfolioService } from "@/services/portfolio.service";

export default async function LandingPage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [techStack, timeline, projects] = await Promise.all([
    portfolioService.getTechStack(),
    portfolioService.getTimeline(),
    portfolioService.getProjects(),
  ]);

  return <LandingTemplate techStack={techStack} timeline={timeline} projects={projects} />;
}
