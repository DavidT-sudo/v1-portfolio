'use client';
import { useState } from 'react';
import { ProjectCard, ProjectCardProps } from './ProjectCard';

type Category = 'web' | 'systems';

interface Project extends ProjectCardProps {
  id: number;
  category: Category;
}

const projects: Project[] = [
  {
    id: 1,
    name: 'Khombe',
    description:
      "Mobile app mapping Botswana's public transit routes and computing the shortest combination of buses/combies between two points.",
    tags: ['React Native', 'TypeScript'],
    href: 'https://github.com/DavidT-sudo/khombe-ui',
    linkLabel: 'View repo',
    category: 'web',
  },
  {
    id: 2,
    name: 'This Portfolio',
    description:
      'Personal portfolio built with Next.js and Tailwind CSS v4, including a documented design system, light/dark theming, and Vercel Analytics.',
    tags: ['Next.js', 'Tailwind CSS', 'TypeScript'],
    href: 'https://github.com/DavidT-sudo/v1-portfolio',
    linkLabel: 'View repo',
    category: 'web',
  },
  {
    id: 3,
    name: 'SCADA & Industrial Automation',
    description:
      'Managed SCADA systems and programmed PLCs with ladder logic and C at Water Utilities Corporation, plus Linux-based tooling for instrumentation and industrial network equipment.',
    tags: ['SCADA', 'PLC / Ladder Logic', 'C', 'Linux'],
    category: 'systems',
  },
  {
    id: 4,
    name: 'Research Data Systems',
    description:
      'Built data-driven systems and UIs for research studies at Botswana Harvard Health Partnership, streamlining data cycles and improving analysis turnaround.',
    tags: ['Python', 'Django', 'pandas', 'scikit-learn'],
    category: 'systems',
  },
];

const filters: { key: 'all' | Category; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'web', label: 'Web & Software' },
  { key: 'systems', label: 'Systems & Automation' },
];

export const Projects = () => {
  const [filter, setFilter] = useState<'all' | Category>('all');
  const visibleProjects =
    filter === 'all' ? projects : projects.filter(p => p.category === filter);

  return (
    <section className="project" id="projects">
      <div className="container mx-auto px-6 xl:px-12">
        <div className="flex flex-col items-center max-w-full">
          <h2>My Projects</h2>
          <p>
            With a unique blend of mechatronics engineering and software
            development expertise, I&apos;ve worked on diverse projects
            ranging from industrial automation to full-stack web
            applications. My work demonstrates a commitment to creating
            efficient, user-focused solutions that solve real-world problems.
          </p>

          <div className="project-filters">
            {filters.map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`project-filter-btn ${filter === f.key ? 'active' : ''}`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="project-grid">
            {visibleProjects.map(project => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
