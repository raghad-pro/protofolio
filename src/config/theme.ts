/**
 * Theme colors for WebGL. three.js materials can't read CSS custom
 * properties, so these mirror `src/styles/variables.css`.
 */
export const sceneColors = {
  light: {
    primary: "#FF6B35",
    glow: "#FFA07A",
    fg: "#1A1A1A",
    surface: "#FFFFFF",
    device: "#D9D4CC",
  },
  dark: {
    primary: "#FF7A00",
    glow: "#FFB15C",
    fg: "#F4F4F5",
    surface: "#161618",
    device: "#2A2A2E",
  },
} as const;

export type ScenePalette = (typeof sceneColors)[keyof typeof sceneColors];

export const getScenePalette = (isDark: boolean): ScenePalette =>
  isDark ? sceneColors.dark : sceneColors.light;
