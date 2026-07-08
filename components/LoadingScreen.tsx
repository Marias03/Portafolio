"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function LoadingScreen() {
  const t = useTranslations("Loading");
  const [visible, setVisible] = useState(true);
  const [render, setRender] = useState(true);

  useEffect(() => {
    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, 1400);

    const removeTimer = setTimeout(() => {
      setRender(false);
    }, 1900);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!render) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#0B0F17] transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="relative flex h-28 w-28 items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-cyan-300/20" />
          <div className="absolute inset-0 rounded-full border-t-2 border-cyan-300 motion-safe:animate-spin" />
          <div className="absolute inset-3 rounded-full border border-purple-400/20" />
          <div className="absolute inset-3 rounded-full border-b-2 border-purple-400 motion-safe:animate-spin" />

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-300/10 text-xl font-black text-cyan-200 shadow-2xl shadow-cyan-500/20">
            MJ
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-200">
            Maria Juliana
          </p>

          <p className="mt-3 text-sm text-white/50">{t("text")}</p>
        </div>
      </div>
    </div>
  );
}
