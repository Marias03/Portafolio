"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="mx-auto grid w-full max-w-6xl items-center gap-8 px-6 py-12 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-28">
      <div className="flex min-w-0 flex-col gap-6">
        <div className="inline-flex w-fit max-w-full rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-[10px] font-semibold uppercase leading-4 tracking-[0.16em] text-cyan-200 sm:text-xs sm:tracking-[0.25em]">
          {t("tag")}
        </div>

        <div className="min-w-0">
          <h1
            className="max-w-[11ch] text-[2rem] font-black leading-[1.08] tracking-[-0.04em] text-white sm:max-w-3xl sm:text-5xl lg:text-7xl"
            style={{ textWrap: "balance" }}
          >
            {t("title")}
          </h1>

          <p className="mt-6 max-w-2xl text-[15px] leading-7 text-white/70 sm:text-lg sm:leading-8">
            {t("description")}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href="#projects"
            className="w-fit rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-cyan-200"
          >
            {t("projects")}
          </a>

          <a
            href="#contact"
            className="w-fit rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/10"
          >
            {t("contact")}
          </a>
        </div>
      </div>

      <div className="relative min-w-0">
        <div className="absolute inset-8 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-2 shadow-2xl shadow-cyan-500/10 lg:rounded-[2rem]">
          <Image
            src="/hero-ai.png"
            alt="Full stack and AI product builder illustration"
            width={900}
            height={900}
            priority
            className="h-[220px] w-full rounded-[1rem] object-cover object-center sm:h-[360px] lg:h-[520px] lg:rounded-[1.5rem]"
          />
        </div>
      </div>
    </section>
  );
}
