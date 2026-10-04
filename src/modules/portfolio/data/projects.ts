import { projectScreenshots } from "@/assets/images/images";
import type { Project } from "../types";

/** Projects listed on the CV. `repoUrl` adds a "Source code" button when set. */
export const projects: Project[] = [
  {
    id: "workflow",
    accent: "#26C6DA",
    stack: ["React", "JavaScript", "Tailwind CSS v4", "REST API"],
    featureCount: 3,
    featured: true,
    screenshot: projectScreenshots.workflow,
    liveUrl: "https://www.workflownets.com/",
  },
  {
    id: "prowess-lift",
    accent: "#12C9DB",
    stack: ["React", "Tailwind CSS", "Framer Motion"],
    featureCount: 3,
    screenshot: projectScreenshots["prowess-lift"],
    liveUrl: "https://raghad-pro.github.io/prowess-lift/",
  },
  {
    id: "skincare-store",
    accent: "#1F6B4F",
    stack: ["React", "Tailwind CSS", "Context API"],
    featureCount: 3,
    screenshot: projectScreenshots["skincare-store"],
    liveUrl: "https://raghad-pro.github.io/raghad/",
  },
];
