import type { TimelineEntry } from "../types";

/** Ordered newest → oldest. Copy lives under `timeline.items.<id>`. */
export const timeline: TimelineEntry[] = [
  { id: "taqat-hackathon", kind: "award", tags: ["Product thinking", "Rapid prototyping", "React"] },
  { id: "taqat", kind: "work", tags: ["React", "Tailwind CSS v4", "REST API"] },
  { id: "freelance", kind: "work", tags: ["Next.js", "UI/UX", "Deployment"], current: true },
  { id: "areisto", kind: "work", tags: ["React", "JavaScript (ES6+)", "Responsive UI"] },
  { id: "afaaqware", kind: "work", tags: ["React", "Tailwind CSS", "Git"] },
  { id: "alazhar", kind: "education", tags: ["Software Engineering", "GPA 87%"], current: true },
];
