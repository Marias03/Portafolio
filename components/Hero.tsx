"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 sm:grid-cols-[1fr_340px] lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-28">
      <div className="flex flex-col gap-8">
        <div className="inline-flex w-fit rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200">
          {t("tag")}
        </div>

        <div>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-7xl">
            {t("title")}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
            {t("description")}
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <a
            href="#projects"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-cyan-200"
          >
            {t("projects")}
          </a>

          <a
            href="#contact"
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/10"
          >
            {t("contact")}
          </a>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-6 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-2 shadow-2xl shadow-cyan-500/10">
          <Image
            src="/hero-ai.png"
            alt="Full stack and AI product builder illustration"
            width={900}
            height={900}
            priority
            className="h-[360px] w-full rounded-[1.5rem] object-cover object-center sm:h-[420px] lg:h-[520px]"
          />
        </div>
      </div>
    </section>
  );
}
