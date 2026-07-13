'use client';
import React from 'react';
import { CodeSlash, Stack, Tools, BarChart } from 'react-bootstrap-icons';

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: string[];
}

const categories: SkillCategory[] = [
  {
    title: 'Languages',
    icon: <CodeSlash size={22} />,
    skills: ['JavaScript/TypeScript', 'Python', 'Java', 'C/C++', 'SQL (Postgres)', 'HTML/CSS'],
  },
  {
    title: 'Frameworks',
    icon: <Stack size={22} />,
    skills: ['React / Next.js', 'Node.js', 'Django', 'Flask', 'MongoDB', 'WordPress'],
  },
  {
    title: 'Developer Tools',
    icon: <Tools size={22} />,
    skills: ['Git', 'Docker', 'Linux', 'Nginx', 'Azure', 'BASH', 'Vim'],
  },
  {
    title: 'Libraries',
    icon: <BarChart size={22} />,
    skills: ['Pandas', 'NumPy', 'Matplotlib', 'D3.js', 'scikit-learn'],
  },
];

export const Skills = () => {
  return (
    <section className="skill" id="skills">
      <div className="container mx-auto px-6 xl:px-12">
        <div className="skill-bx">
          <h2>Technical Skills</h2>
          <p>
            Experienced full-stack developer with expertise in modern web
            technologies and industrial automation. Proficient in both
            front-end and back-end development, with a strong foundation in
            systems engineering. Skilled in developing scalable applications,
            implementing CI/CD pipelines, and utilizing cloud technologies.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map(category => (
              <div key={category.title} className="skill-category">
                <div className="skill-category-icon">{category.icon}</div>
                <h5>{category.title}</h5>
                <ul className="skill-tag-list">
                  {category.skills.map(skill => (
                    <li key={skill} className="skill-tag">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
