import { projects, techStack, timeline } from "@/modules/portfolio";
import type { Project, TechItem, TimelineEntry } from "@/modules/portfolio";

/**
 * Data-access layer for portfolio content. Today it serves static modules;
 * swapping to a CMS or REST API only changes this file — components keep
 * receiving the same typed data.
 */
export const portfolioService = {
  async getTechStack(): Promise<TechItem[]> {
    return techStack;
  },
  async getTimeline(): Promise<TimelineEntry[]> {
    return timeline;
  },
  async getProjects(): Promise<Project[]> {
    return projects;
  },
};
