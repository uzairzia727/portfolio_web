export type ProjectCategory = "aiml" | "automation" | "sql" | "hardware" | "shopify" | "wordpress";

export type ExperienceItem = {
  id: string;
  title: string;
  company: string;
  meta: string;
  duration: string;
  bullets: string[];
  stackIds: string[];
};

export type ProjectItem = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  category: ProjectCategory;
  span: "hero" | "wide" | "tall" | "normal";
  highlight?: string;
  /** Live site URL when applicable */
  url?: string;
};

export const experiences: ExperienceItem[] = [
  {
    id: "freelance",
    title: "Freelance Developer & AI Automation Specialist",
    company: "Independent, remote",
    meta: "Active · 2023-Present",
    duration: "2023-Present",
    bullets: [
      "Shopify store Toyz for Kids (toyzforkids.com): theme and UX work, collection-led merchandising, and checkout tuned for families buying toys and gifts.",
      "WordPress builds for telecom clients a3technologies.co.uk and ocs7.com, plus ai-technologies.co.uk for professional positioning and lead capture.",
      "Research and deploy multi-agent GPT orchestration with autonomous model communication.",
    ],
    stackIds: ["shopify", "wordpress", "openai"],
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    company: "ConnectX (Technoligent) · Islamabad",
    meta: "Mar 2023-Sep 2023",
    duration: "Mar 2023-Sep 2023",
    bullets: [
      "Built dynamic inventory tracking in Excel with full ETL-style pipelines.",
      "Implemented cleaning, transformation, and validation workflows.",
      "Designed Power BI dashboards for stock levels, trends, and operational visibility.",
    ],
    stackIds: ["excel", "powerbi"],
  },
  {
    id: "innovo",
    title: "Operations Executive / Development",
    company: "Innovo Xpress · Islamabad",
    meta: "Project-based · ~1 mo · 2023",
    duration: "2023",
    bullets: [
      "Audited logistics workflows, documented bottlenecks, and proposed automation paths.",
      "Delivered workflow prototypes and automated internal sheets with Google Apps Script.",
    ],
    stackIds: ["appscript", "github"],
  },
  {
    id: "nie",
    title: "Engineering Intern",
    company: "National Institute of Electronics (NIE) · Islamabad",
    meta: "May-Jun 2024",
    duration: "May-Jun 2024",
    bullets: [
      "Collaborated on FPGA-based chip design using Cadence and Microwind.",
      "Supported planning and task allocation for hardware design milestones.",
    ],
    stackIds: ["fpga", "cadence"],
  },
];

export const projects: ProjectItem[] = [
  {
    id: "zenith",
    number: "NEW",
    title: "Zenith Tech Rentals",
    subtitle: "SQL · Databases · Analytics",
    description:
      "Design and implementation of a relational system for a high-end technology rental business: customer profiles, inventory, rental transactions, and payment processing. ER diagrams, normalized relational schema, primary/foreign keys, and differentiated SQL credentials (role-based access) for secure operations. Heavy use of analytical SQL for reporting and business insight. Implemented with PostgreSQL and MySQL for portability and comparison.",
    tech: ["PostgreSQL", "MySQL", "ER modeling", "Relational schema", "SQL analytics", "RBAC-style access"],
    category: "sql",
    span: "hero",
    highlight: "Relational core + credentials + analytics",
  },
  {
    id: "toyzforkids",
    number: "SH",
    title: "Toyz for Kids",
    subtitle: "Shopify · E-commerce",
    description:
      "Full Shopify storefront for a children's toy retailer: brand-forward homepage, category and collection navigation, product detail storytelling, trust badges, and a smooth mobile checkout path aimed at busy parents. Built with attention to performance and clear paths from browse to purchase.",
    tech: ["Shopify", "Theme UX", "Collections", "Checkout"],
    category: "shopify",
    span: "wide",
    url: "https://toyzforkids.com",
  },
  {
    id: "a3technologies",
    number: "W1",
    title: "A3 Technologies",
    subtitle: "WordPress · Telecom",
    description:
      "Corporate WordPress site for a telecom-aligned technology business on a3technologies.co.uk: service pillars, credibility-focused layout, and straightforward routes for enquiries so prospects understand offerings quickly on desktop and mobile.",
    tech: ["WordPress", "Telecom sector", "Responsive UI"],
    category: "wordpress",
    span: "normal",
    url: "https://a3technologies.co.uk",
  },
  {
    id: "ocs7",
    number: "W2",
    title: "OCS7",
    subtitle: "WordPress · Telecom",
    description:
      "WordPress presence for OCS7 on ocs7.com: telecom-focused messaging, structured service sections, and contact pathways suited to B2B visitors evaluating connectivity and related solutions.",
    tech: ["WordPress", "Telecom sector", "Lead routing"],
    category: "wordpress",
    span: "normal",
    url: "https://ocs7.com",
  },
  {
    id: "lead-enrich",
    number: "01",
    title: "Lead Enrichment Tool",
    subtitle: "NRW · 2023",
    description:
      "API-powered enrichment from multiple sources with voice output (ElevenLabs), Gmail integration, Grok AI, and Facebook API, orchestrated into spreadsheet workflows.",
    tech: ["SERP API", "ElevenLabs", "Gmail API", "Grok", "Facebook API"],
    category: "automation",
    span: "wide",
  },
  {
    id: "financial-rag",
    number: "02",
    title: "Financial Analysis RAG",
    subtitle: "RAG · LLM",
    description:
      "Llama 3.3 RAG pulling live Yahoo Finance and News API data, vectorized into ChromaDB for context-aware summaries.",
    tech: ["Llama 3.3", "ChromaDB", "News API", "Yahoo Finance"],
    category: "aiml",
    span: "tall",
  },
  {
    id: "fake-news",
    number: "03",
    title: "Fake News Detection",
    subtitle: "NLP · ML",
    description:
      "Django app with NLP + Naive Bayes (~96% accuracy). Placed 3rd at the Final Year Project Exhibition.",
    tech: ["Python", "Django", "NLP", "scikit-learn"],
    category: "aiml",
    span: "normal",
  },
  {
    id: "text-pipeline",
    number: "04",
    title: "Text Generation Pipeline",
    subtitle: "LLM · Pipeline",
    description: "End-to-end LangChain pipeline: preprocessing, tokenization, prompt engineering, and evaluation.",
    tech: ["LangChain", "LLMs", "Prompt engineering"],
    category: "aiml",
    span: "normal",
  },
  {
    id: "inventory",
    number: "05",
    title: "Inventory Management System",
    subtitle: "Systems · Automation",
    description: "Full CRUD for products, suppliers, and orders with real-time tracking and reporting.",
    tech: ["Python", "MySQL", "Reporting"],
    category: "sql",
    span: "normal",
  },
  {
    id: "evm",
    number: "06",
    title: "Electronic Voting Machine",
    subtitle: "FPGA · Hardware",
    description: "Secure voting machine on Spartan-3E FPGA using Verilog/VHDL.",
    tech: ["Verilog/VHDL", "Spartan-3E", "FPGA"],
    category: "hardware",
    span: "normal",
  },
];

export const skills = {
  aiml: ["TensorFlow", "scikit-learn", "Hugging Face", "LangChain", "LlamaIndex", "RAG/Agentic", "NumPy", "Pandas", "OpenCV"],
  web: ["Python", "Django", "Shopify", "WordPress", "Apps Script", "GHL", "REST APIs"],
  data: ["Power BI", "Firebase", "MySQL", "ChromaDB", "Excel/ETL"],
  net: ["TCP/IP", "OSPF", "IPsec VPN", "Cisco PT"],
  tools: ["Git", "Figma", "VS Code", "MATLAB", "Arduino", "Proteus"],
};

export const certifications = [
  "Agentic RAG with LlamaIndex",
  "Generative AI with LLMs & LangChain",
  "CCNA Fundamentals",
  "Project Management Kickoff",
  "Machine Learning Specialization (Coursera)",
];
