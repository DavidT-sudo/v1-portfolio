/* ============================================================
   OMEROHM LABS — site content
   Enriched from an audit of the GitHub footprint (personal +
   10 orgs). Components stay purely presentational.
   NOTE: no direct contact details here — email and WhatsApp
   live in server-side env vars (see actions/contact.ts) so
   bots can't scrape them from the page.
   ============================================================ */

export const identity = {
  name: 'Thuto Tlhobogang',
  studio: 'OmerOhm LABS',
  tagline: 'Engineering the shape of sound, light and signal.',
  location: 'Gaborone, Botswana',
  github: 'https://github.com/DavidT-sudo',
  codepen: 'https://codepen.io/Thuto-Tlhobogang',
  divisions: ['Audio', 'Media', 'Techworks'],
  summary:
    'Engineer operating across the full stack — from PLC ladder logic and SCADA floors to Django backends, Flutter apps, and CI/CD pipelines. I build systems that replace paper, spreadsheets, and downtime with software.',
};

export type Project = {
  id: string;
  title: string;
  domain: 'BACKEND' | 'MOBILE' | 'PLATFORM' | 'E-COMMERCE' | 'FINTECH' | 'AI';
  status: 'IN PRODUCTION' | 'DEPLOYED' | 'MVP' | 'IN DEVELOPMENT';
  statusTone: 'live' | 'copper' | 'signal';
  description: string;
  stack: string[];
};

export const projects: Project[] = [
  {
    id: 'P-01',
    title: 'Django CMMS Backend',
    domain: 'BACKEND',
    status: 'IN PRODUCTION',
    statusTone: 'live',
    description:
      'Computerized maintenance management system for a government printing workshop — job-ticket tracking and digitized asset records that cut maintenance turnaround by over 1.5×. Security-hardened with brute-force lockout, rate limiting, and CI security scanning (bandit + safety).',
    stack: ['Django', 'PostgreSQL', 'Docker', 'Python', 'Security Hardening'],
  },
  {
    id: 'P-02',
    title: 'TutorLink BW — ThubleAi',
    domain: 'PLATFORM',
    status: 'MVP',
    statusTone: 'copper',
    description:
      'Online tutoring platform for the Botswana curriculum (BGCSE, IGCSE, Cambridge). Connects students with tutors, handling enrollment, sessions, and assessments — built API-first with an OpenAPI-documented, fully tested backend.',
    stack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'REST / OpenAPI'],
  },
  {
    id: 'P-03',
    title: 'Fleet Management App',
    domain: 'MOBILE',
    status: 'DEPLOYED',
    statusTone: 'live',
    description:
      'Cross-platform mobile app for fleet operations: driver assignment tracking, on-device document scanning, and automated permit-expiration alerts so no vehicle runs on expired paperwork.',
    stack: ['Flutter', 'Dart', 'Supabase'],
  },
  {
    id: 'P-04',
    title: 'Government Bookstore E-commerce',
    domain: 'E-COMMERCE',
    status: 'IN DEVELOPMENT',
    statusTone: 'signal',
    description:
      'Storefront for hosting and distributing government publications, built as a Turborepo monorepo with pnpm workspaces and an optimized Prisma schema driving catalog, inventory, and order flows.',
    stack: ['Turborepo', 'Next.js', 'Prisma', 'TypeScript', 'pnpm'],
  },
  {
    id: 'P-05',
    title: 'NxtGenPay',
    domain: 'FINTECH',
    status: 'IN DEVELOPMENT',
    statusTone: 'signal',
    description:
      'Mobile payments platform — a cross-platform Flutter front end with Supabase authentication and session management, laying the rails for a next-generation payment experience.',
    stack: ['Flutter', 'Dart', 'Supabase'],
  },
  {
    id: 'P-06',
    title: 'Gemini Tool-Use Agent',
    domain: 'AI',
    status: 'DEPLOYED',
    statusTone: 'copper',
    description:
      'An agentic AI coding assistant in Python: it plans over a function-calling loop with Google Gemini, then reads files, runs code, and writes changes through a controlled tool interface.',
    stack: ['Python', 'Google Gemini', 'LLM / AI Agents'],
  },
];

export type StackGroup = {
  id: string;
  label: string;
  accent: 'ohm' | 'signal' | 'copper';
  blurb: string;
  skills: string[];
};

export const stackGroups: StackGroup[] = [
  {
    id: 'SYS-A',
    label: 'Backend & Data',
    accent: 'ohm',
    blurb: 'Server-side systems, APIs, and the data layer.',
    skills: [
      'Python',
      'Django',
      'Node.js',
      'PostgreSQL',
      'Prisma',
      'Supabase',
      'REST / OpenAPI',
    ],
  },
  {
    id: 'SYS-B',
    label: 'Frontend & Mobile',
    accent: 'signal',
    blurb: 'Interfaces that make complex systems legible.',
    skills: ['React', 'Next.js', 'TypeScript', 'Flutter', 'Tailwind CSS'],
  },
  {
    id: 'SYS-C',
    label: 'DevOps & CI/CD',
    accent: 'copper',
    blurb: 'Shipping, automating, and keeping it running.',
    skills: [
      'Docker',
      'GitHub Actions',
      'Turborepo',
      'pnpm',
      'Nginx',
      'Linux',
      'Git',
    ],
  },
  {
    id: 'SYS-D',
    label: 'Systems, Automation & AI',
    accent: 'ohm',
    blurb: 'From the factory floor to the language model.',
    skills: [
      'Industrial Instrumentation',
      'PLC / SCADA',
      'Embedded C/C++',
      'Go',
      'LLM / AI Agents',
    ],
  },
];

export type LogEntry = {
  period: string;
  role: string;
  org: string;
  note: string;
};

export const experienceLog: LogEntry[] = [
  {
    period: '2025 — NOW',
    role: 'Maintenance Engineer',
    org: 'Government Printing & Publishing Services',
    note: 'Digitized factory equipment records and built data-driven maintenance systems — breakdown time down, throughput up 1.5×.',
  },
  {
    period: '2024 — 2025',
    role: 'Systems Analyst / Developer',
    org: 'Botswana Harvard Health Partnership',
    note: 'Data-driven research systems and analysis UIs with Python, Django, pandas, and React.',
  },
  {
    period: '2024 — NOW',
    role: 'Full-Stack Software Engineer',
    org: 'Africort Investments',
    note: 'React frontends, Django API layers, Nginx server setup and build automation under SCRUM.',
  },
  {
    period: '2021 — 2022',
    role: 'Control & Instrumentation Intern',
    org: 'Water Utilities Corporation',
    note: 'SCADA management, PLC ladder-logic programming, and industrial network equipment on live water infrastructure.',
  },
  {
    period: '2015 — 2020',
    role: 'B.Eng — Mechatronics & Industrial Instrumentation',
    org: 'Botswana International University of Science & Technology',
    note: 'Embedded C/ASM, signal processing, robot motion planning, drones and control systems.',
  },
];

export const navLinks = [
  { href: '#projects', label: 'projects' },
  { href: '#stack', label: 'stack' },
  { href: '#log', label: 'log' },
  { href: '#contact', label: 'contact' },
];
