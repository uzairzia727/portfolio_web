import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";


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

// src/app/layout.tsx

export const metadata = {
  title: "Uzair Zia | AI Architect & Web Developer",
  description: "Portfolio of Muhammad Uzair Zia specializing in AI, ETL, and Web Development.",
  // Add this section:
  icons: {
    icon: "/logo.png", // Replace with your filename in the public folder
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable}`}>
      <body className="min-h-dvh bg-ink font-sans">
        {children}
        <Analytics /> {/* 2. Add this right here */}
      </body>
    </html>
  );

}
