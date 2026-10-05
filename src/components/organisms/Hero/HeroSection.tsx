"use client";

import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef } from "react";
import { ArrowRightIcon, CodeIcon, GraduationCapIcon, TrophyIcon } from "@/assets/icons/icons";
import { images } from "@/assets/images/images";
import { Badge, ButtonLink, GlowOrb, Spinner, StatusDot } from "@/components/atoms";
import { SocialLinks, StatCard } from "@/components/molecules";
import { WebGLGuard } from "@/guards/WebGLGuard";
import { richText } from "@/lib/rich-text";
import type { TechItem } from "@/modules/portfolio";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <SceneLoading />,
});

function SceneLoading() {
  const t = useTranslations("common");
  return (
    <div className="grid h-full place-items-center">
      <Spinner label={t("loading3d")} />
    </div>
  );
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

interface HeroSectionProps {
  techStack: TechItem[];
}

export function HeroSection({ techStack }: HeroSectionProps) {
  const t = useTranslations("hero");
  const tAbout = useTranslations("about");
  const { resolvedTheme } = useTheme();
  const reducedMotion = useReducedMotion() ?? false;
  const stageRef = useRef<HTMLDivElement>(null);
  const stageInView = useInView(stageRef, { margin: "120px" });

  const orbitTech = techStack.map((tech) => ({ ...tech, description: t(`tech.${tech.id}`) }));

  const fallbackAvatar = (
    <div className="grid h-full place-items-center">
      <Image
        src={images.avatar.src}
        width={images.avatar.width}
        height={images.avatar.height}
        alt={tAbout("imageAlt")}
        priority
        className="h-4/5 w-auto animate-ds-float drop-shadow-2xl"
      />
    </div>
  );

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pt-[calc(var(--ds-nav-height)+2.5rem)] pb-16 md:pb-24"
    >
      {/* Background atmosphere */}
      <div aria-hidden className="ds-grid-bg absolute inset-0 -z-10" />
      <GlowOrb className="-top-40 start-1/2 -z-10 size-[36rem] -translate-x-1/2 opacity-60 rtl:translate-x-1/2" />

      <motion.div variants={container} initial="hidden" animate="show" className="ds-container">
        {/* Heading block */}
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 text-center">
          <motion.div variants={item}>
            <Badge tone="primary" className="ds-glass px-4 py-1.5 text-[0.8rem] shadow-ds-sm">
              {t("badge")}
            </Badge>
          </motion.div>
          <motion.p variants={item} className="text-lg font-medium text-ds-muted sm:text-xl">
            {t("greeting")}
          </motion.p>
          <motion.h1 variants={item} id="hero-title" className="ds-display">
            {t.rich("headline", richText)}
          </motion.h1>
        </div>

        {/* Stage: copy · avatar · stats */}
        <div className="mt-8 grid items-center gap-10 lg:mt-4 lg:grid-cols-[1fr_minmax(0,1.25fr)_1fr] lg:gap-6">
          <motion.div variants={item} className="order-2 flex flex-col gap-6 text-center lg:order-1 lg:text-start">
            <p className="ds-lead mx-auto max-w-md lg:mx-0">{t("description")}</p>
            <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <ButtonLink href="#projects">
                {t("ctaProjects")}
                <ArrowRightIcon className="size-4 rtl:rotate-180" />
              </ButtonLink>
              <ButtonLink href="#contact" variant="ghost">
                {t("ctaContact")}
              </ButtonLink>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-ds-muted lg:justify-start">
              <StatusDot />
              {t("available")}
            </div>
          </motion.div>

          <motion.div variants={item} className="order-1 lg:order-2">
            <div
              ref={stageRef}
              role="group"
              aria-label={t("avatarLabel")}
              className="relative mx-auto aspect-square w-full max-w-[560px]"
            >
              {/* Theme-reactive ambient glow behind the character */}
              <div
                aria-hidden
                className="absolute inset-[14%] -z-10 rounded-full bg-[radial-gradient(circle,var(--ds-glow)_0%,transparent_68%)] opacity-90 blur-2xl dark:bg-[radial-gradient(circle,rgb(255_122_0/0.35)_0%,transparent_70%)]"
              />
              <WebGLGuard fallback={fallbackAvatar}>
                <HeroScene
                  isDark={resolvedTheme === "dark"}
                  active={stageInView}
                  reducedMotion={reducedMotion}
                  tech={orbitTech}
                />
              </WebGLGuard>
            </div>
          </motion.div>

          <motion.div
            variants={item}
            className="order-3 flex flex-col items-center gap-5 lg:items-end"
          >
            <div className="grid w-full max-w-sm grid-cols-3 gap-3 lg:max-w-56 lg:grid-cols-1">
              <StatCard
                icon={<TrophyIcon className="size-5" />}
                value={t("statValues.hackathon")}
                label={t("stats.hackathon")}
                className="flex-col text-center lg:flex-row lg:text-start"
              />
              <StatCard
                icon={<GraduationCapIcon className="size-5" />}
                value={t("statValues.gpa")}
                label={t("stats.gpa")}
                className="flex-col text-center lg:flex-row lg:text-start"
              />
              <StatCard
                icon={<CodeIcon className="size-5" />}
                value={t("statValues.internships")}
                label={t("stats.internships")}
                className="flex-col text-center lg:flex-row lg:text-start"
              />
            </div>
            <SocialLinks />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
