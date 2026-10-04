"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useState } from "react";
import {
  ArrowUpRightIcon,
  CheckIcon,
  CloseIcon,
  CubeIcon,
  GlobeIcon,
  MonitorIcon,
  PhoneIcon,
  TabletIcon,
} from "@/assets/icons/icons";
import { Chip, IconButton, Spinner } from "@/components/atoms";
import { Modal, SegmentedControl } from "@/components/ui";
import { WebGLGuard } from "@/guards/WebGLGuard";
import { cn } from "@/lib/cn";
import type { Project } from "@/modules/portfolio";

const ProjectMiniature = dynamic(() => import("./ProjectMiniature"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full place-items-center">
      <Spinner />
    </div>
  ),
});

type PreviewTab = "live" | "3d";
type Device = "desktop" | "tablet" | "mobile";

const deviceWidth: Record<Device, string> = {
  desktop: "100%",
  tablet: "768px",
  mobile: "390px",
};

interface ProjectPreviewModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectPreviewModal({ project, onClose }: ProjectPreviewModalProps) {
  // Keep showing the last project while the dialog plays its exit animation.
  const [shown, setShown] = useState(project);
  if (project && project !== shown) setShown(project);

  return (
    <Modal open={project !== null} onClose={onClose} labelledBy="project-preview-title">
      {/* Keyed so tab/device/loading state resets for each project */}
      {shown && <PreviewBody key={shown.id} project={shown} onClose={onClose} />}
    </Modal>
  );
}

function PreviewBody({ project, onClose }: { project: Project; onClose: () => void }) {
  const t = useTranslations("projects");
  const tCommon = useTranslations("common");
  const { resolvedTheme } = useTheme();
  const reducedMotion = useReducedMotion() ?? false;

  const hasLive = Boolean(project.liveUrl);
  const [tab, setTab] = useState<PreviewTab>("3d");
  const [device, setDevice] = useState<Device>("desktop");
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const title = t(`items.${project.id}.title`);
  const tabs = [
    { value: "3d" as const, label: t("modal.tab3d"), icon: <CubeIcon className="size-3.5" /> },
    ...(hasLive ? [{ value: "live" as const, label: t("modal.tabLive"), icon: <GlobeIcon className="size-3.5" /> }] : []),
  ];

  return (
    <>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ds-border px-5 py-4 sm:px-6">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-ds-primary">{t(`items.${project.id}.category`)}</p>
          <h2 id="project-preview-title" className="ds-h3 truncate">
            {title}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {tabs.length > 1 && (
            <SegmentedControl options={tabs} value={tab} onChange={setTab} label={title} size="sm" />
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={tCommon("openInNewTab")}
              title={tCommon("openInNewTab")}
              className="ds-icon-btn"
            >
              <ArrowUpRightIcon className="size-4 rtl:-scale-x-100" />
            </a>
          )}
          <IconButton label={tCommon("close")} onClick={onClose}>
            <CloseIcon className="size-4" />
          </IconButton>
        </div>
      </div>

      {/* Body */}
      <div className="grid min-h-0 flex-1 overflow-y-auto lg:grid-cols-[1fr_18rem]">
        <div className="relative min-h-[22rem] bg-ds-surface-2 sm:min-h-[28rem]">
          <AnimatePresence mode="wait" initial={false}>
            {tab === "live" && project.liveUrl ? (
              <motion.div
                key="live"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex h-full flex-col items-center gap-3 p-3 sm:p-4"
              >
                <SegmentedControl
                  size="sm"
                  label={t("modal.devices")}
                  value={device}
                  onChange={setDevice}
                  options={[
                    { value: "desktop", label: t("modal.desktop"), icon: <MonitorIcon className="size-3.5" /> },
                    { value: "tablet", label: t("modal.tablet"), icon: <TabletIcon className="size-3.5" /> },
                    { value: "mobile", label: t("modal.mobile"), icon: <PhoneIcon className="size-3.5" /> },
                  ]}
                />
                <motion.div
                  layout
                  style={{ width: deviceWidth[device] }}
                  className="relative h-[60dvh] max-w-full overflow-hidden rounded-ds-md border border-ds-border bg-ds-surface shadow-ds"
                >
                  {!iframeLoaded && (
                    <div className="absolute inset-0 grid place-items-center">
                      <Spinner label={tCommon("loading")} />
                    </div>
                  )}
                  <iframe
                    src={project.liveUrl}
                    title={title}
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    referrerPolicy="no-referrer"
                    onLoad={() => setIframeLoaded(true)}
                    className={cn("size-full transition-opacity duration-500", iframeLoaded ? "opacity-100" : "opacity-0")}
                  />
                </motion.div>
                <p className="text-center text-xs text-ds-muted">{t("modal.iframeHint")}</p>
              </motion.div>
            ) : (
              <motion.div
                key="3d"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0"
              >
                <div aria-hidden className="ds-grid-bg absolute inset-0" />
                <WebGLGuard fallback={null}>
                  <ProjectMiniature
                    screenshot={project.screenshot}
                    isDark={resolvedTheme === "dark"}
                    reducedMotion={reducedMotion}
                  />
                </WebGLGuard>
                <span className="ds-glass absolute bottom-4 start-1/2 -translate-x-1/2 rounded-full px-3 py-1 font-mono text-xs text-ds-muted rtl:translate-x-1/2">
                  {t("modal.dragHint")}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Details */}
        <aside className="flex flex-col gap-5 border-t border-ds-border p-5 sm:p-6 lg:border-t-0 lg:border-s">
          {!hasLive && (
            <p className="rounded-ds-sm bg-ds-primary/10 p-3 text-xs leading-relaxed text-ds-fg">{t("modal.noLive")}</p>
          )}
          <p className="text-sm leading-relaxed text-ds-muted">{t(`items.${project.id}.summary`)}</p>
          <div>
            <h3 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-ds-fg">{t("role")}</h3>
            <p className="text-sm text-ds-muted">{t(`items.${project.id}.role`)}</p>
          </div>
          <ul className="flex flex-col gap-2.5">
            {Array.from({ length: project.featureCount }, (_, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-ds-muted">
                <CheckIcon className="mt-0.5 size-4 shrink-0 text-ds-primary" />
                {t(`items.${project.id}.features.${i}`)}
              </li>
            ))}
          </ul>
          <ul className="mt-auto flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li key={tech}>
                <Chip>{tech}</Chip>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </>
  );
}
