import type { ElementType } from 'react';
import { stackGroups, type StackGroup } from '../lib/data';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import BoltIcon from '@mui/icons-material/Bolt';
import CloudIcon from '@mui/icons-material/Cloud';
import CodeIcon from '@mui/icons-material/Code';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import SettingsRemoteIcon from '@mui/icons-material/SettingsRemote';
import StorageIcon from '@mui/icons-material/Storage';
import TerminalIcon from '@mui/icons-material/Terminal';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

const accentText = {
  ohm: 'text-ohm',
  signal: 'text-signal',
} as const;

const accentHover = {
  ohm: 'hover:border-ohm/70 hover:text-porcelain',
  signal: 'hover:border-signal/70 hover:text-porcelain',
} as const;

const skillIconMap: Record<string, ElementType> = {
  Python: CodeIcon,
  Django: TerminalIcon,
  Docker: CloudIcon,
  PostgreSQL: StorageIcon,
  Supabase: CloudIcon,
  'Industrial Instrumentation': PrecisionManufacturingIcon,
  'PLC / SCADA Automation': SettingsRemoteIcon,
  React: AutoAwesomeIcon,
  'Next.js': BoltIcon,
  Flutter: MobileFriendlyIcon,
  'Tailwind CSS': DesignServicesIcon,
};

function StackPanel({ group }: { group: StackGroup }) {
  return (
    <div className="panel reg-marks h-full p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <h3
          className={`font-display text-sm font-bold uppercase tracking-[0.25em] ${accentText[group.accent]}`}
        >
          {group.label}
        </h3>
        <span className="font-mono text-2xs tracking-widest text-sage-500">
          {group.id}
        </span>
      </div>
      <p className="mt-2 text-sm text-sage-400">{group.blurb}</p>

      <ul className="mt-6 flex flex-wrap gap-2.5">
        {group.skills.map((skill, i) => {
          const Icon = skillIconMap[skill] ?? CodeIcon;

          return (
            <li
              key={skill}
              className={`cursor-default border border-line bg-graphite-800 px-3 py-2 font-mono text-xs text-sage-300 transition-all duration-200 hover:-translate-y-0.5 ${accentHover[group.accent]}`}
            >
              <span
                className={`mr-2 text-2xs ${accentText[group.accent]}`}
                aria-hidden
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="inline-flex items-center gap-2">
                <Icon className="h-4 w-4 text-sage-400" aria-hidden="true" />
                <span>{skill}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function Stack() {
  return (
    <section id="stack" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <Reveal>
        <SectionHeading
          index="02"
          title="Stack"
          caption="Core engineering toolchain, grouped by system layer."
        />
      </Reveal>
      <div className="grid gap-5 lg:grid-cols-2">
        {stackGroups.map((group, i) => (
          <Reveal key={group.id} delay={i * 120}>
            <StackPanel group={group} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
