"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Brain, Layout, Database, Zap, MessageSquare, Mail } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "AI & Machine Learning",
    desc: "Architecting agentic RAG systems, LLM pipelines, and computer vision models (YOLO/TensorFlow) optimized for real-time edge deployment.",
    icon: <Brain className="w-6 h-6" />,
  },
  {
    title: "Full-Stack Web UI/UX",
    desc: "Building high-performance Next.js applications with aesthetic precision, fluid GSAP animations, and conversion-driven user interfaces.",
    icon: <Layout className="w-6 h-6" />,
  },
  {
    title: "Data Engineering & SQL",
    desc: "Designing robust PostgreSQL schemas and automated ETL pipelines to transform raw data into clean, actionable intelligence.",
    icon: <Database className="w-6 h-6" />,
  },
  {
    title: "Process Automation",
    desc: "Developing Python-based headless automation and API integrations to eliminate manual bottlenecks and mirror logistics data.",
    icon: <Zap className="w-6 h-6" />,
  },
];

export function Services() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".service-card", {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 85%",
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={root} className="py-24 border-t border-white/5">
      <div className="mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          Professional <span className="text-accent">Services</span>
        </h2>
        <p className="text-mist/60 max-w-lg leading-relaxed">
          Summing up my engineering journey into high-impact digital solutions for modern businesses.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {services.map((service, index) => (
          <div
            key={index}
            className="service-card group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 transition-all hover:border-accent/30 hover:bg-white/[0.04]"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent border border-accent/20">
                {service.icon}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-mist/20">
                0{index + 1}
              </span>
            </div>

            <h3 className="text-xl font-semibold text-mist mb-3 group-hover:text-white transition-colors">
              {service.title}
            </h3>
            <p className="text-sm leading-relaxed text-mist/50 mb-8 max-w-sm">
              {service.desc}
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://wa.me/923331860154"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white/5 px-5 py-2.5 text-xs font-semibold text-mist border border-white/10 transition hover:bg-accent hover:text-ink hover:border-accent"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                WhatsApp
              </a>
              <a
                href="mailto:uzairzia080@gmail.com"
                className="inline-flex items-center gap-2 rounded-full bg-white/5 px-5 py-2.5 text-xs font-semibold text-mist border border-white/10 transition hover:bg-accent hover:text-ink hover:border-accent"
              >
                <Mail className="w-3.5 h-3.5" />
                Email
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}