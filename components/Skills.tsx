"use client";

import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import {
  SiDocker,
  SiFastapi,
  SiGit,
  SiGrafana,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPostman,
  SiPrisma,
  SiPrometheus,
  SiPython,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiGithub,
} from "react-icons/si";

type Skill = {
  name: string;
  icon: ReactNode;
};

const skills: Skill[] = [
  { name: "Next.js", icon: <SiNextdotjs /> },
  { name: "React", icon: <SiReact /> },
  { name: "TypeScript", icon: <SiTypescript /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss /> },
  { name: "Python", icon: <SiPython /> },
  { name: "FastAPI", icon: <SiFastapi /> },
  { name: "Supabase", icon: <SiSupabase /> },
  { name: "PostgreSQL", icon: <SiPostgresql /> },
  { name: "Ollama", icon: <span className="text-3xl">🦙</span> },
  { name: "Git", icon: <SiGit /> },
  { name: "Vercel", icon: <SiVercel /> },
  { name: "Docker", icon: <SiDocker /> },
  { name: "Postman", icon: <SiPostman /> },
  { name: "Node.js", icon: <SiNodedotjs /> },
  { name: "Prisma", icon: <SiPrisma /> },
  { name: "Grafana", icon: <SiGrafana /> },
  { name: "GitHub", icon: <SiGithub /> },
  { name: "Prometheus", icon: <SiPrometheus /> },
  {
    name: "Yandex Metrica",
    icon: (
      <img
        src="/yandex-metrica.png"
        alt="Yandex Metrica"
        className="h-9 w-9 object-contain"
      />
    ),
  },
  {
    name: "RAG",
    icon: (
      <img
        src="/rag.jpg"
        alt="RAG"
        className="h-16 w-16 scale-150  object-contain"
      />
    ),
  },
];
export default function Skills() {
  const t = useTranslations("Skills");

  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-10 flex flex-col gap-3">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-cyan-300">
          Stack
        </p>

        <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          {t("title")}
        </h2>

        <p className="max-w-2xl text-white/55">
          Technologies I use to build full-stack products, AI features,
          dashboards, databases and production-ready web applications.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {skills.map((skill, index) => (
          <div
            key={`${skill.name}-${index}`}
            className="group flex flex-col items-center justify-center gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.06]"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-[#101524] text-4xl text-cyan-200 shadow-lg shadow-cyan-500/10 transition group-hover:border-cyan-300/40">
              <div className="motion-safe:animate-[spin_8s_linear_infinite]">
                {skill.icon}
              </div>
            </div>

            <p className="text-center text-sm font-semibold text-white/75">
              {skill.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
