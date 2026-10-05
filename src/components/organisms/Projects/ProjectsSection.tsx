"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { ProjectCard, SectionHeader } from "@/components/molecules";
import { richText } from "@/lib/rich-text";
import type { Project } from "@/modules/portfolio";
import { ProjectPreviewModal } from "./ProjectPreviewModal";

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const t = useTranslations("projects");
  const [selected, setSelected] = useState<Project | null>(null);

  const labels = {
    featured: t("featured"),
    visitSite: t("visitSite"),
    livePreview: t("livePreview"),
    sourceCode: t("sourceCode"),
  };

  return (
    <section id="projects" aria-labelledby="projects-title" className="ds-section">
      <div className="ds-container">
        <SectionHeader
          id="projects-title"
          eyebrow={t("eyebrow")}
          title={t.rich("title", richText)}
          description={t("description")}
        />

        <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <li key={project.id} className={project.featured ? "md:col-span-2 lg:col-span-1" : undefined}>
              <ProjectCard
                project={project}
                index={index}
                title={t(`items.${project.id}.title`)}
                category={t(`items.${project.id}.category`)}
                summary={t(`items.${project.id}.summary`)}
                labels={labels}
                onPreview={setSelected}
              />
            </li>
          ))}
        </ul>
      </div>

      <ProjectPreviewModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
