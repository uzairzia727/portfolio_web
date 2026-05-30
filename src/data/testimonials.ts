export type Testimonial = {
  id: string;
  name: string;
  role: string;
  location: string;
  region: "UK" | "US";
  domain: "Web Development" | "AI / Automation";
  projectScope: string;
  review: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    id: "uk-ecommerce",
    name: "Charlotte Hughes",
    role: "Founder",
    location: "London, UK",
    region: "UK",
    domain: "Web Development",
    projectScope: "Shopify storefront rebuild & migration",
    review:
      "Uzair rebuilt our Shopify store with a clean, premium UI that finally matches our brand. Mobile conversion improved noticeably, and the migration from our old theme was seamless with zero downtime and every product page loads instantly.",
    rating: 5,
  },
  {
    id: "uk-fullstack",
    name: "James Whitfield",
    role: "Managing Director",
    location: "Manchester, UK",
    region: "UK",
    domain: "Web Development",
    projectScope: "Full-stack portfolio & client portal",
    review:
      "We needed a fast, polished business site with a lightweight client portal. Uzair delivered a performant Next.js build with excellent Core Web Vitals, clear information architecture, and a CMS workflow our team could manage without friction.",
    rating: 5,
  },
  {
    id: "us-ai-agents",
    name: "Daniel Mercer",
    role: "Head of Product",
    location: "Austin, TX, US",
    region: "US",
    domain: "AI / Automation",
    projectScope: "Multi-agent orchestration & local RAG pipeline",
    review:
      "Uzair architected a privacy-first multi-agent system with local RAG over our internal docs. Agents coordinate tasks reliably, retrieval quality is strong, and the pipeline runs entirely on-prem — exactly what our compliance team required.",
    rating: 5,
  },
  {
    id: "us-workflow",
    name: "Priya Shah",
    role: "Revenue Operations Lead",
    location: "San Francisco, CA, US",
    region: "US",
    domain: "AI / Automation",
    projectScope: "Lead enrichment & CRM workflow automation",
    review:
      "He automated our lead enrichment flow end-to-end withcustom API integrations, deduplication, and CRM sync. What used to take our team hours each morning now runs unattended, and our SDRs start every day with clean, enriched records.",
    rating: 5,
  },
  {
    id: "us-monitoring",
    name: "Marcus Cole",
    role: "Operations Director",
    location: "Denver, CO, US",
    region: "US",
    domain: "AI / Automation",
    projectScope: "Self-healing monitors & automated reporting",
    review:
      "Uzair built self-healing monitoring scripts and an automated reporting pipeline that surfaces business KPIs every morning. Failures auto-remediate where possible, and leadership finally has consistent dashboards without manual spreadsheet work.",
    rating: 5,
  },
];
