"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowRightIcon, CheckIcon, MailIcon, SparklesIcon } from "@/assets/icons/icons";
import { Button } from "@/components/atoms";
import { SectionHeader, TextField } from "@/components/molecules";
import { siteConfig } from "@/config/site";
import { richText } from "@/lib/rich-text";
import { contactSchema, type ContactErrorKey, type ContactInput } from "@/modules/contact";
import { sendContactMessage } from "@/services/contact.service";

type Status = "idle" | "success" | "error";

export function ContactSection() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: { name: "", email: "", message: "", company: "" },
  });

  const errorText = (key?: string) => (key ? t(`errors.${key as ContactErrorKey}`) : undefined);

  const onSubmit = async (values: ContactInput) => {
    setStatus("idle");
    try {
      await sendContactMessage(values);
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="ds-section">
      <div className="ds-container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* Intro + details */}
        <div className="flex flex-col gap-8">
          <SectionHeader
            id="contact-title"
            eyebrow={t("eyebrow")}
            title={t.rich("title", richText)}
            description={t("description")}
          />


          <dl className="grid max-w-md gap-4">
            <div className="ds-card flex items-center gap-3 p-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-ds-primary/12 text-ds-primary">
                <MailIcon className="size-5" />
              </span>
              <div className="min-w-0">
                <dt className="text-xs text-ds-muted">{t("info.email")}</dt>
                <dd className="truncate text-sm font-semibold">
                  <a href={`mailto:${siteConfig.email}`} className="hover:text-ds-primary">
                    {siteConfig.email}
                  </a>
                </dd>
              </div>
            </div>
            <div className="ds-card flex items-center gap-3 p-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-ds-primary/12 text-ds-primary">
                <SparklesIcon className="size-5" />
              </span>
              <div>
                <dt className="text-xs text-ds-muted">{t("info.response")}</dt>
                <dd className="text-sm font-semibold">{t("info.responseValue")}</dd>
              </div>
            </div>
          </dl>

        </div>

        {/* Form */}
        <div className="ds-card relative self-start overflow-hidden p-6 sm:p-8">
          <AnimatePresence mode="wait" initial={false}>
            {status === "success" ? (
              <motion.div
                key="success"
                role="status"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="flex min-h-[26rem] flex-col items-center justify-center gap-4 text-center"
              >
                <motion.span
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.1 }}
                  className="relative grid size-16 place-items-center rounded-full bg-ds-primary text-ds-primary-contrast shadow-ds-glow"
                >
                  <span aria-hidden className="absolute inset-0 animate-ds-pulse-ring rounded-full border-2 border-ds-primary" />
                  <CheckIcon className="size-8" />
                </motion.span>
                <h3 className="ds-h3">{t("success.title")}</h3>
                <p className="max-w-xs text-sm text-ds-muted">{t("success.body")}</p>
                <Button variant="ghost" size="sm" onClick={() => setStatus("idle")}>
                  {t("success.again")}
                </Button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <TextField
                    label={t("form.name")}
                    placeholder={t("form.namePlaceholder")}
                    autoComplete="name"
                    registration={register("name")}
                    error={errorText(errors.name?.message)}
                  />
                  <TextField
                    label={t("form.email")}
                    placeholder={t("form.emailPlaceholder")}
                    type="email"
                    autoComplete="email"
                    registration={register("email")}
                    error={errorText(errors.email?.message)}
                  />
                </div>
                <TextField
                  label={t("form.message")}
                  placeholder={t("form.messagePlaceholder")}
                  multiline
                  registration={register("message")}
                  error={errorText(errors.message?.message)}
                />

                {/* Honeypot: invisible to people, tempting to bots */}
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden
                  className="absolute -start-[9999px] size-px opacity-0"
                  {...register("company")}
                />

                {status === "error" && (
                  <p role="alert" className="rounded-ds-sm bg-red-500/10 p-3 text-sm text-red-500">
                    {t("form.error")}
                  </p>
                )}

                <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto sm:self-start">
                  {isSubmitting ? (
                    <>
                      <span aria-hidden className="size-4 animate-spin rounded-full border-2 border-current/30 border-t-current" />
                      {t("form.sending")}
                    </>
                  ) : (
                    <>
                      {t("form.submit")}
                      <ArrowRightIcon className="size-4 rtl:rotate-180" />
                    </>
                  )}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
