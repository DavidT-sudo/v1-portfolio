import { stackGroups, type StackGroup } from '../lib/data';
import { FallbackTechIcon, techIcons } from '../lib/icons';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

const accentText = {
  ohm: 'text-ohm',
  signal: 'text-signal',
  copper: 'text-copper',
} as const;

const accentHover = {
  ohm: 'hover:border-ohm/70 hover:text-porcelain',
  signal: 'hover:border-signal/70 hover:text-porcelain',
  copper: 'hover:border-copper/70 hover:text-porcelain',
} as const;

const iconHover = {
  ohm: 'group-hover/skill:text-ohm',
  signal: 'group-hover/skill:text-signal',
  copper: 'group-hover/skill:text-copper',
} as const;

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
        {group.skills.map((skill) => {
          const Icon = techIcons[skill] ?? FallbackTechIcon;
          return (
            <li
              key={skill}
              className={`group/skill flex cursor-default items-center gap-2.5 border border-line bg-graphite-800 px-3 py-2 font-mono text-xs text-sage-300 transition-all duration-200 hover:-translate-y-0.5 ${accentHover[group.accent]}`}
            >
              <Icon
                className={`h-4 w-4 shrink-0 text-sage-400 transition-colors duration-200 ${iconHover[group.accent]}`}
                aria-hidden="true"
              />
              <span>{skill}</span>
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
