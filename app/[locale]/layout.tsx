import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import { locales } from "@/i18n";
import "../globals.css";

export const metadata: Metadata = {
  title: "Maria Juliana | Full Stack Developer",
  description:
    "Personal website and portfolio of Maria Juliana, Full Stack Developer focused on AI-powered web applications and digital products.",
};

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
