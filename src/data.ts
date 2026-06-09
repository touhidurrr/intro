export const links = {
  email: "mailto:me@touhidur.bd",
  github: "https://github.com/touhidurrr",
  linkedin: "https://linkedin.com/in/touhidurrr",
  resume: "https://touhidur.bd/resume",
  whatsapp: "https://wa.me/8801794522043",
} as const;

export const identity = {
  name: "Md. Touhidur Rahman",
  role: "Backend & DevOps Engineer",
  certification: "MongoDB Associate Developer",
  coding_since: 2018,
  shipping_professionally_since: 2022,
  location: "Dhaka, BD (UTC+6)",
  remote: "worldwide",
} as const;

export const stats = [
  { value: "100M+", label: "requests / month" },
  { value: "500K+", label: "users / month" },
  { value: "480+", label: "GitHub stars" },
  { value: "8 yrs", label: "coding since 2018" },
] as const;

export interface Role {
  title: string;
  org: string;
  orgUrl: string;
  period: string;
  place: string;
  notes: string[];
  stack: string[];
}

export const roles: Role[] = [
  {
    title: "Backend Engineer",
    org: "Cottage Homecare Services",
    orgUrl: "https://cottagehomecare.com",
    period: "Oct 2025 — present",
    place: "New York, USA · remote",
    notes: [
      "Designed and built the entire backend of HHALearning.com, where 3,500+ caregivers complete state-mandated training.",
      "Automated HLS video transcoding and delivery with AWS MediaConvert + CloudFront; tuned CDN caching across all production sites.",
      "Rolled out GitHub Actions CI/CD across nearly every company project; hardened Docker images, cutting sizes up to 70%.",
      "Integrated HHAExchange APIs to auto-record caregiver hours — the data payroll runs on.",
    ],
    stack: [
      "Node.js",
      "TypeScript",
      "AWS",
      "Docker",
      "GitHub Actions",
      "Cloudflare",
    ],
  },
  {
    title: "Maintainer",
    org: "UncivServer.xyz",
    orgUrl: "https://uncivserver.xyz",
    period: "Jan 2022 — present",
    place: "open source · self-directed",
    notes: [
      "The most popular community multiplayer server for the 4X strategy game Unciv: 60M+ requests, ~70K visitors, 500K+ unique IPs a month.",
      "Rewrote the original Express server in TypeScript + Bun + ElysiaJS; server-side GET caching keeps MongoDB load flat at scale.",
      "Runs a verified Discord bot deployed across 70+ servers.",
    ],
    stack: ["Bun", "ElysiaJS", "TypeScript", "MongoDB", "Cloudflare"],
  },
  {
    title: "Software Engineer",
    org: "Possier",
    orgUrl: "https://possier.com",
    period: "Oct 2022 — Mar 2023",
    place: "Chennai, India · remote",
    notes: [
      "Core contributor to Possier 2.0, a restaurant POS trending across India — embedded MariaDB made it fully usable offline-first.",
      "Built NestJS APIs and a BullMQ queue system; owned the Tauri build pipeline producing MSI installers for client devices.",
      "Wrote printing logic for POS hardware and Puppeteer pipelines for user-response analysis.",
    ],
    stack: ["NestJS", "BullMQ", "MariaDB", "Tauri", "Puppeteer"],
  },
];

export interface Project {
  name: string;
  url: string;
  metric: string;
  desc: string;
}

export const projects: Project[] = [
  {
    name: "iplist-youtube",
    url: "https://github.com/touhidurrr/iplist-youtube",
    metric: "★ 394 · 56 forks",
    desc: "Continuously updated registry of all YouTube IP ranges, used in router and firewall configs worldwide.",
  },
  {
    name: "better-status-codes",
    url: "https://www.npmjs.com/package/better-status-codes",
    metric: "12K+ npm downloads / month",
    desc: "Zero-dependency TypeScript library for type-safe HTTP status codes.",
  },
  {
    name: "mirrorTouhidurrr",
    url: "https://github.com/touhidurrr/mirrorTouhidurrr",
    metric: "★ 41 · 38 forks",
    desc: "Web proxy built on Cloudflare Workers, deployed at the edge.",
  },
];

export const skills: { group: string; items: string }[] = [
  { group: "Languages", items: "TypeScript, JavaScript, SQL, Shell, HTML/CSS" },
  {
    group: "Backend",
    items: "Node.js, Bun, NestJS, Express, ElysiaJS, REST, WebSocket, BullMQ",
  },
  {
    group: "Databases",
    items: "PostgreSQL, MongoDB, MariaDB, Prisma, Mongoose",
  },
  {
    group: "Cloud & DevOps",
    items: "AWS, GCP, Cloudflare, Docker, GitHub Actions, CI/CD, Jest",
  },
  {
    group: "Frontend",
    items: "React, Next.js, React Native, Tauri, Tailwind CSS",
  },
];

/** ~100M requests/month across production systems ≈ 38 per second. */
export const REQUESTS_PER_SECOND = 38;
