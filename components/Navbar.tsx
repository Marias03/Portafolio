"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

const languages = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
  { code: "ru", label: "RU" },
];

export default function Navbar() {
  const t = useTranslations("Navbar");
  const locale = useLocale();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0B0F17]/80 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href={`/${locale}`} className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-300/10 text-sm font-bold text-cyan-200 shadow-lg shadow-cyan-500/10 transition group-hover:border-cyan-300/60 group-hover:bg-cyan-300/20">
            MJ
          </div>

          <div className="leading-tight">
            <p className="text-sm font-bold text-white">Maria Juliana</p>
            <p className="hidden text-xs text-white/45 sm:block">
              Full Stack · AI Products
            </p>
          </div>
        </Link>

        <nav className="hidden items-center rounded-full border border-white/10 bg-white/[0.04] px-2 py-2 shadow-2xl shadow-black/20 md:flex">
          <a
            href="#projects"
            className="rounded-full px-4 py-2 text-sm font-medium text-white/65 transition hover:bg-white/10 hover:text-white"
          >
            {t("projects")}
          </a>

          <a
            href="#skills"
            className="rounded-full px-4 py-2 text-sm font-medium text-white/65 transition hover:bg-white/10 hover:text-white"
          >
            {t("skills")}
          </a>

          <a
            href="#contact"
            className="rounded-full px-4 py-2 text-sm font-medium text-white/65 transition hover:bg-white/10 hover:text-white"
          >
            {t("contact")}
          </a>
        </nav>

        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] p-1">
          {languages.map((language) => (
            <Link
              key={language.code}
              href={`/${language.code}`}
              className={`rounded-full px-3 py-2 text-xs font-bold transition ${
                locale === language.code
                  ? "bg-white text-black shadow-lg shadow-white/10"
                  : "text-white/50 hover:bg-white/10 hover:text-white"
              }`}
            >
              {language.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-6 pb-4 md:hidden">
        <a
          href="#projects"
          className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/70"
        >
          {t("projects")}
        </a>

        <a
          href="#skills"
          className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/70"
        >
          {t("skills")}
        </a>

        <a
          href="#contact"
          className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/70"
        >
          {t("contact")}
        </a>
      </div>
    </header>
  );
}
