"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { PointerEvent } from "react";
import { ArrowUpRightIcon, CodeIcon, CubeIcon, SparklesIcon } from "@/assets/icons/icons";
import { Badge, Button, ButtonLink, Chip } from "@/components/atoms";
import type { Project } from "@/modules/portfolio";
import { ProjectCover } from "./ProjectCover";

interface ProjectCardProps {
  project: Project;
  title: string;
  category: string;
  summary: string;
  labels: { featured: string; visitSite: string; livePreview: string; sourceCode: string };
  onPreview: (project: Project) => void;
  index: number;
}

const spring = { stiffness: 220, damping: 22, mass: 0.6 };

/** Project card with pointer-driven 3D tilt and a cursor-following spotlight. */
export function ProjectCard({ project, title, category, summary, labels, onPreview, index }: ProjectCardProps) {
  const reduceMotion = useReducedMotion();
  const rotateX = useSpring(0, spring);
  const rotateY = useSpring(0, spring);
  const spotX = useMotionValue(50);
  const spotY = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${spotX}% ${spotY}%, color-mix(in oklab, var(--ds-primary) 14%, transparent), transparent 60%)`;

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 8);
    rotateX.set((0.5 - py) * 8);
    spotX.set(px * 100);
    spotY.set(py * 100);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1000 }}
      className="h-full"
    >
      <motion.div
        onPointerMove={handlePointerMove}
        onPointerLeave={reset}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="ds-card group relative flex h-full flex-col overflow-hidden transition-[box-shadow,border-color] duration-500 hover:border-ds-primary/30 hover:shadow-ds-glow"
      >
        <motion.div
          aria-hidden
          style={{ background: spotlight }}
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        <div className="relative">
          <ProjectCover screenshot={project.screenshot} accent={project.accent} />
          {project.featured && (
            <Badge tone="primary" className="ds-glass absolute top-4 end-4 z-20">
              <SparklesIcon className="size-3.5" />
              {labels.featured}
            </Badge>
          )}
        </div>

        <div className="relative z-20 flex flex-1 flex-col gap-3 p-6">
          <span className="text-xs font-semibold tracking-wide text-ds-primary">{category}</span>
          <h3 className="ds-h3">{title}</h3>
          <p className="text-[0.95rem] leading-relaxed text-ds-muted">{summary}</p>

          <ul className="mt-1 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li key={tech}>
                <Chip>{tech}</Chip>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
            {project.liveUrl && (
              <ButtonLink size="sm" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                {labels.visitSite}
                <ArrowUpRightIcon className="size-3.5 rtl:-scale-x-100" />
              </ButtonLink>
            )}
            <Button
              size="sm"
              variant={project.liveUrl ? "ghost" : "primary"}
              onClick={() => onPreview(project)}
              aria-haspopup="dialog"
            >
              <CubeIcon className="size-3.5" />
              {labels.livePreview}
            </Button>
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ds-btn ds-btn-ghost h-9 px-4 text-sm"
              >
                <CodeIcon className="size-4" />
                {labels.sourceCode}
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}
