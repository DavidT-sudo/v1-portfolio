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

/**
 * Source repository for a project. Most repos are private, so a URL is only
 * modelled for public ones — private repos carry no name or org in the
 * shipped bundle and render as a locked chip instead of a dead link.
 * Flip `visibility` to 'public' (and add the url) to light up the link.
 */
export type RepoLink =
  | { visibility: 'private' }
  | { visibility: 'public'; url: string };

export type Project = {
  id: string;
  title: string;
  domain:
    | 'BACKEND'
    | 'MOBILE'
    | 'PLATFORM'
    | 'E-COMMERCE'
    | 'FINTECH'
    | 'AI'
    | 'WEBSITE';
  status: 'IN PRODUCTION' | 'DEPLOYED' | 'MVP' | 'IN DEVELOPMENT';
  statusTone: 'live' | 'copper' | 'signal';
  description: string;
  stack: string[];
  repo: RepoLink;
  /**
   * Public FRONTEND url only. Never list API, admin (pgAdmin, Dozzle,
   * Coolify), mail (Mailpit) or object-storage hosts here.
   */
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    id: 'P-01',
    title: 'Django CMMS Backend',
    domain: 'BACKEND',
    status: 'IN PRODUCTION',
    statusTone: 'live',
    description:
      'Uptime CMMS — a computerized maintenance management system for a government printing workshop. Job-ticket tracking and digitized asset records cut maintenance turnaround by over 1.5×, with brute-force lockout, rate limiting, and CI security scanning (bandit + safety).',
    stack: ['Django', 'PostgreSQL', 'Docker', 'Python', 'Security Hardening'],
    repo: { visibility: 'private' },
    liveUrl: 'https://gppsms.omerohmlabs.com',
  },
  {
    id: 'P-02',
    title: 'Government Bookstore',
    domain: 'E-COMMERCE',
    status: 'DEPLOYED',
    statusTone: 'live',
    description:
      'The digital e-commerce and inventory platform for Botswana government publications — acts, gazettes, statistical reports, and parliamentary papers, as downloads or printed copies. A React storefront on an Express API, with its own documentation wiki.',
    stack: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Docker'],
    repo: { visibility: 'private' },
    liveUrl: 'https://govbookstore.omerohmlabs.com',
  },
  {
    id: 'P-03',
    title: 'TutorLink BW — ThubleAi',
    domain: 'PLATFORM',
    status: 'MVP',
    statusTone: 'copper',
    description:
      'Online tutoring platform for the Botswana curriculum (BGCSE, PSLE, IGCSE). Connects students with tutors, handling enrollment, sessions, and assessments — built API-first with an OpenAPI-documented, fully tested backend.',
    stack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'REST / OpenAPI'],
    repo: { visibility: 'private' },
    liveUrl: 'https://tubleai.omerohmlabs.com',
  },
  {
    id: 'P-04',
    title: 'Fleet Management App',
    domain: 'MOBILE',
    status: 'DEPLOYED',
    statusTone: 'live',
    description:
      'Cross-platform fleet operations app: driver assignment tracking, document scanning, and automated permit-expiration alerts so no vehicle runs on expired paperwork. Built on Supabase with PowerSync for offline-capable sync.',
    stack: ['Flutter', 'Dart', 'Supabase', 'PowerSync'],
    repo: { visibility: 'private' },
    liveUrl: 'https://app.omerohmlabs.com',
  },
  {
    id: 'P-05',
    title: 'Abed Live',
    domain: 'WEBSITE',
    status: 'DEPLOYED',
    statusTone: 'live',
    description:
      'Artist website for Abednico Wadingalo — contemporary gospel, Afro-jazz, praise and worship from Molepolole, Botswana. Implemented from a Claude Design mockup into a production Next.js app.',
    stack: ['Next.js', 'TypeScript', 'Drizzle ORM', 'PostgreSQL'],
    repo: {
      visibility: 'public',
      url: 'https://github.com/DavidT-sudo/AbedLive',
    },
    liveUrl: 'https://abedlive.omerohmlabs.com',
  },
  {
    id: 'P-06',
    title: 'TechieBoss',
    domain: 'WEBSITE',
    status: 'DEPLOYED',
    statusTone: 'live',
    description:
      'Studio site for fast websites, custom web apps, and automations for individuals and small businesses.',
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    repo: { visibility: 'private' },
    liveUrl: 'https://techieboss.omerohmlabs.com',
  },
  {
    id: 'P-07',
    title: 'OmerOhm Labs',
    domain: 'WEBSITE',
    status: 'DEPLOYED',
    statusTone: 'live',
    description:
      'The studio site — systems engineering, integration, and mechatronics consulting bridging industrial hardware and modern software for SMEs and industrial enterprises across the SADC region.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Drizzle ORM', 'PostgreSQL'],
    repo: { visibility: 'private' },
    liveUrl: 'https://omerohmlabs.com',
  },
  {
    id: 'P-08',
    title: 'NxtGenPay',
    domain: 'FINTECH',
    status: 'IN DEVELOPMENT',
    statusTone: 'signal',
    description:
      'Mobile payments platform — a cross-platform Flutter front end with Supabase authentication and session management, laying the rails for a next-generation payment experience.',
    stack: ['Flutter', 'Dart', 'Supabase'],
    repo: { visibility: 'private' },
  },
  {
    id: 'P-09',
    title: 'Gemini Tool-Use Agent',
    domain: 'AI',
    status: 'DEPLOYED',
    statusTone: 'copper',
    description:
      'An agentic AI coding assistant in Python: it plans over a function-calling loop with Google Gemini, then reads files, runs code, and writes changes through a controlled tool interface.',
    stack: ['Python', 'Google Gemini', 'LLM / AI Agents'],
    repo: {
      visibility: 'public',
      url: 'https://github.com/DavidT-sudo/bootdev_ai-agent',
    },
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
