import { SiGithub } from 'react-icons/si';
import { TbExternalLink, TbLock, TbWorld } from 'react-icons/tb';
import { projects, type Project } from '../lib/data';
import { FallbackTechIcon, techIcons } from '../lib/icons';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

const statusToneClass = {
  live: 'text-volt',
  copper: 'text-copper',
  signal: 'text-signal',
} as const;

const chipBase =
  'flex min-w-0 items-center gap-2 border px-3 py-2 font-mono text-2xs tracking-wider';
const chipLink =
  'border-line text-sage-300 transition-colors duration-200 hover:border-ohm/70 hover:text-volt';

function hostname(url: string) {
  return new URL(url).hostname;
}

/**
 * Repo + live domain, side by side. A GitHub link is only rendered for
 * public repos; private ones show a locked chip (no name, no dead link).
 */
function ProjectLinks({ project }: { project: Project }) {
  const { repo, liveUrl } = project;

  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {repo.visibility === 'public' ? (
        <a
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} source code on GitHub (opens in a new tab)`}
          className={`${chipBase} ${chipLink} shrink-0`}
        >
          <SiGithub className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          GitHub
          <TbExternalLink className="h-3 w-3 shrink-0" aria-hidden="true" />
        </a>
      ) : (
        <span
          title="Source repository is private"
          className={`${chipBase} shrink-0 cursor-default border-dashed border-line text-sage-400`}
        >
          <TbLock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          Private
        </span>
      )}

      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${hostname(liveUrl)} (opens in a new tab)`}
          title={liveUrl}
          className={`${chipBase} ${chipLink} flex-[1_1_15rem]`}
        >
          <TbWorld className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span className="truncate tracking-normal">{hostname(liveUrl)}</span>
          <TbExternalLink
            className="ml-auto h-3 w-3 shrink-0"
            aria-hidden="true"
          />
        </a>
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group h-full">
      <div className="panel reg-marks flex h-full flex-col p-6 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-line-bright sm:p-7">
        {/* Header strip */}
        <div className="flex items-center justify-between font-mono text-2xs tracking-[0.2em]">
          <span className="text-sage-500">{project.id}</span>
          <span className="border border-line px-2 py-1 text-sage-400">
            {project.domain}
          </span>
        </div>

        <h3 className="mt-5 font-display text-lg font-bold text-porcelain transition-colors duration-200 group-hover:text-volt">
          {project.title}
        </h3>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-sage-400">
          {project.description}
        </p>

        {/* Stack tags */}
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
          {project.stack.map((tech) => {
            const Icon = techIcons[tech] ?? FallbackTechIcon;
            return (
              <li
                key={tech}
                className="flex items-center gap-1.5 bg-graphite-800 px-2.5 py-1 font-mono text-2xs tracking-wider text-ohm"
              >
                <Icon className="h-3 w-3 shrink-0" aria-hidden="true" />
                {tech}
              </li>
            );
          })}
        </ul>

        {/* Repo + live domain */}
        <ProjectLinks project={project} />

        {/* Status footer */}
        <div className="mt-6 flex items-center gap-2.5 border-t border-line pt-4 font-mono text-2xs tracking-[0.2em]">
          <span
            className={`led ${statusToneClass[project.statusTone]}`}
            aria-hidden
          />
          <span className={statusToneClass[project.statusTone]}>
            {project.status}
          </span>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <Reveal>
        <SectionHeading
          index="01"
          title="Projects"
          caption="Selected systems — live frontends, with source where it's public."
        />
      </Reveal>
      <div className="grid gap-5 sm:grid-cols-2 sm:[&>*:last-child:nth-child(odd)]:col-span-2">
        {projects.map((project, i) => (
          <Reveal key={project.id} delay={(i % 2) * 90}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
