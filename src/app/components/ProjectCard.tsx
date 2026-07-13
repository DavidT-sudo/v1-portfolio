import { BoxArrowUpRight, Briefcase } from 'react-bootstrap-icons';

export interface ProjectCardProps {
  name: string;
  description: string;
  tags: string[];
  href?: string;
  linkLabel?: string;
}

export const ProjectCard = ({
  name,
  description,
  tags,
  href,
  linkLabel = 'View project',
}: ProjectCardProps) => {
  return (
    <div className="project-card">
      <h4>{name}</h4>
      <p>{description}</p>
      <ul className="project-tag-list">
        {tags.map(tag => (
          <li key={tag} className="project-tag">
            {tag}
          </li>
        ))}
      </ul>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="project-link"
        >
          {linkLabel}
          <BoxArrowUpRight size={14} />
        </a>
      ) : (
        <span className="project-case-study">
          <Briefcase size={14} />
          Case study
        </span>
      )}
    </div>
  );
};
