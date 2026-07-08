"use client";

import { useTranslations } from "next-intl";

export default function Contact() {
  const t = useTranslations("Contact");

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-24">
      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 md:p-10">
        <h2 className="max-w-2xl text-3xl font-bold text-white md:text-4xl">
          {t("title")}
        </h2>

        <p className="mt-4 max-w-2xl text-white/70">{t("description")}</p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="https://github.com/Marias03"
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-200"
          >
            {t("github")}
          </a>

          <a
            href="mailto:mariasher0310@gmail.com"
            className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/10"
          >
            {t("Gmail")}
          </a>
          <a
            href="https://t.me/Marias03_h"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/10"
          >
            Telegram
          </a>
        </div>
      </div>
    </section>
  );
}
