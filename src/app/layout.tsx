import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Muhammad Uzair Zia | Computer Engineer & AI/ML",
  description:
    "Building end-to-end AI systems using LLM pipelines, agentic RAG, intelligent automation, and full-stack web solutions.",
  openGraph: {
    title: "Muhammad Uzair Zia | Portfolio",
    description:
      "Computer Engineer & AI/ML Specialist. LLM pipelines, RAG, automation, Shopify, Django, PostgreSQL/MySQL.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable}`}>
      <body className="min-h-dvh bg-ink font-sans">{children}</body>
    </html>
  );
}
