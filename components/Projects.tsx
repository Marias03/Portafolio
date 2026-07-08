"use client";

import { useTranslations } from "next-intl";

type Project = {
  key: string;
  name: string;
  repo: string;
  url?: string;
  github?: string;
  icon: string;
  accent?: boolean;
};

const projects: Project[] = [
  {
    key: "aiProductMentor",
    name: "AI Product Mentor",
    repo: "Marias03/ai-product-mentor",
    url: "https://github.com/Marias03/ai-product-mentor",
    icon: "🤖",
    accent: true,
  },
  {
    key: "lockPoint",
    name: "LockPoint",
    repo: "Marias03/LockPoint",
    url: "https://electronic-locker-system.vercel.app/",
    github: "https://github.com/Marias03/-Electronic-Locker-System",
    icon: "🔐",
  },
  {
    key: "latam",
    name: "LATAM Association",
    repo: "Marias03/Latam",
    url: "https://asocialatam.vercel.app/en",
    github: "https://github.com/Marias03/Latam",
    icon: "🌎",
  },
  {
    key: "pigeonFree",
    name: "PigeonFree",
    repo: "Marias03/pigeonfree",
    url: "https://github.com/Marias03/pigeonfree",
    icon: "🕊️",
  },
];

export default function Projects() {
  const t = useTranslations("Projects");

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-12 max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-[0.35em] text-cyan-300">
          {t("tag")}
        </p>

        <h2 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
          {t("title")}
        </h2>

        <p className="mt-5 max-w-2xl text-base leading-8 text-white/55 md:text-lg">
          {t("description")}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.key}
            className={`group rounded-3xl border bg-[#101524] p-7 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-1 ${
              project.accent
                ? "border-purple-500/60 hover:border-purple-400"
                : "border-white/10 hover:border-cyan-300/40"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <span className="text-2xl text-white/45">⌘</span>

                <div className="min-w-0">
                  <h3 className="truncate text-xl font-bold text-white">
                    {project.name}
                  </h3>

                  <p className="mt-1 truncate text-sm text-white/40">
                    {project.repo}
                  </p>
                </div>
              </div>

              <span className="shrink-0 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-sm font-medium text-emerald-300">
                {t("status")}
              </span>
            </div>

            <div className="mt-5 grid grid-cols-[1fr_auto] gap-6">
              <p className="text-lg leading-8 text-white/75">
                {t(`items.${project.key}.description`)}
              </p>

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 text-4xl">
                {project.icon}
              </div>
            </div>

            <div className="my-7 h-px bg-white/10" />

            <div className="flex items-center justify-between gap-4">
              <p className="max-w-[70%] truncate font-mono text-sm text-white/45 md:text-base">
                {project.url}
              </p>

              <a
                href={project.github ?? project.url}
                target="_blank"
                rel="noreferrer"
                aria-label="Open project"
                className="text-xl text-white/70 transition hover:text-white"
              >
                ↗
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
