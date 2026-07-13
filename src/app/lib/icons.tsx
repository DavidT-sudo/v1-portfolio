import type { IconType } from 'react-icons';
import {
  SiC,
  SiCplusplus,
  SiDart,
  SiDjango,
  SiDocker,
  SiGit,
  SiGithubactions,
  SiGo,
  SiGooglegemini,
  SiLinux,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiOpenapiinitiative,
  SiPnpm,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTurborepo,
  SiTypescript,
} from 'react-icons/si';
import { TbApi, TbCpu, TbGauge, TbRobot, TbShieldLock } from 'react-icons/tb';

/**
 * Maps a technology label to its official brand logo (Simple Icons)
 * or a representative concept icon (Tabler) for non-branded skills.
 * Rendered monochrome via `currentColor` so the logos read as one
 * system and stay legible in both light and dark themes.
 */
export const techIcons: Record<string, IconType> = {
  // Languages
  Python: SiPython,
  TypeScript: SiTypescript,
  Dart: SiDart,
  Go: SiGo,
  C: SiC,
  'C/C++': SiCplusplus,
  'Embedded C/C++': SiCplusplus,

  // Backend & data
  Django: SiDjango,
  'Node.js': SiNodedotjs,
  PostgreSQL: SiPostgresql,
  Prisma: SiPrisma,
  Supabase: SiSupabase,
  'REST APIs': TbApi,
  'REST / OpenAPI': SiOpenapiinitiative,
  OpenAPI: SiOpenapiinitiative,

  // Frontend & mobile
  React: SiReact,
  'Next.js': SiNextdotjs,
  Flutter: SiDart,
  'Tailwind CSS': SiTailwindcss,

  // DevOps & CI/CD
  Docker: SiDocker,
  'GitHub Actions': SiGithubactions,
  'CI/CD': SiGithubactions,
  Turborepo: SiTurborepo,
  Monorepo: SiTurborepo,
  pnpm: SiPnpm,
  Nginx: SiNginx,
  Linux: SiLinux,
  Git: SiGit,

  // Systems, automation & AI
  'Industrial Instrumentation': TbGauge,
  'PLC / SCADA': TbCpu,
  'PLC / SCADA Automation': TbCpu,
  'LLM / AI Agents': TbRobot,
  'Google Gemini': SiGooglegemini,
  'Security Hardening': TbShieldLock,
};

/** Fallback icon for any label without an explicit mapping. */
export const FallbackTechIcon = TbCpu;
