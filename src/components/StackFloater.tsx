"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  Database,
  LayoutGrid,
  Sparkles,
  ShoppingBag,
  Sheet,
  BarChart3,
  Cpu,
  Blocks,
} from "lucide-react";

const iconMap: Record<string, { label: string; Icon: typeof Database }> = {
  shopify: { label: "Shopify", Icon: ShoppingBag },
  wordpress: { label: "WordPress", Icon: LayoutGrid },
  openai: { label: "GPT", Icon: Sparkles },
  excel: { label: "Excel", Icon: Sheet },
  powerbi: { label: "Power BI", Icon: BarChart3 },
  appscript: { label: "Apps Script", Icon: Sheet },
  github: { label: "Git", Icon: Blocks },
  fpga: { label: "FPGA", Icon: Cpu },
  cadence: { label: "Cadence", Icon: Cpu },
  postgres: { label: "PostgreSQL", Icon: Database },
  mysql: { label: "MySQL", Icon: Database },
  tensorflow: { label: "TF", Icon: Cpu },
};

type Props = { stackIds: string[] };

export function StackFloater({ stackIds }: Props) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const pills = el.querySelectorAll<HTMLElement>("[data-pill]");
    const ctx = gsap.context(() => {
      pills.forEach((pill, i) => {
        gsap.to(pill, {
          y: "+=12",
          x: `${(i % 2 === 0 ? 1 : -1) * 4}`,
          duration: 3.8 + i * 0.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.15,
        });
      });
    }, el);
    return () => ctx.revert();
  }, [stackIds]);

  return (
    <div ref={root} className="relative mt-10 flex flex-wrap gap-3 md:absolute md:right-0 md:top-6 md:mt-0 md:max-w-[220px] md:justify-end">
      {stackIds.map((id) => {
        const meta = iconMap[id];
        if (!meta) return null;
        const { Icon, label } = meta;
        return (
          <div
            data-pill
            key={id}
            className="flex items-center gap-2 rounded-full border border-accent/25 bg-white/5 px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-mist shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-md"
          >
            <Icon className="h-4 w-4 text-accent" aria-hidden />
            <span>{label}</span>
          </div>
        );
      })}
    </div>
  );
}
