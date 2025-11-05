'use client';
import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Col, Container, Row } from 'react-bootstrap';
import { ProjectCard } from './ProjectCard';
// import projImg1 from '@/app/assets/images/project-img1.png';
// import projImg2 from '@/app/assets/images/project-img2.png';
// import projImg3 from '@/app/assets/images/project-img3.png';
// import colorSharp2 from '../assets/img/color-sharp2.png';
import 'animate.css';
// import TrackVisibility from 'react-on-screen';

const projects = [
  {
    id: 1,
    name: 'Full Stack Development',
    description:
      'Built responsive web applications using React/Next.js with modern UI/UX principles. Implemented backend services with Node.js and Django.',
    imgUrl: '/images/project-img1.png',
  },
  {
    id: 2,
    name: 'Industrial Automation',
    description:
      'Developed SCADA systems and PLC programming using ladder logic and C. Implemented industrial network solutions.',
    imgUrl: '/images/project-img2.png',
  },
  {
    id: 3,
    name: 'Data Analysis Systems',
    description:
      'Created data-driven solutions using Python, Django, and various data visualization libraries including D3.js, NumPy, and Pandas.',
    imgUrl: '/images/project-img3.png',
  },
];

export const Projects = () => {
  const [key, setKey] = useState<string>('home');

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col>
            <h2>My Projects</h2>
            <p>
              With a unique blend of mechatronics engineering and software
              development expertise, I&apos;ve worked on diverse projects
              ranging from industrial automation to full-stack web applications.
              My work demonstrates a commitment to creating efficient,
              user-focused solutions that solve real-world problems.
            </p>

            <Tabs
              id="projects-tabs"
              activeKey={key}
              onSelect={k => setKey(k as string)}
              className="mb-3"
              defaultActiveKey="first"
            >
              <Tab
                eventKey="first"
                title="first"
                className="nav-pills justify-center items-center"
                id="pills-tab"
              >
                <Row>
                  {projects.map((project, index) => {
                    return <ProjectCard key={index} {...project} />;
                  })}
                </Row>
              </Tab>
              <Tab eventKey="second" title="second">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Cumque quam, quod neque provident velit, rem explicabo
                  excepturi id illo molestiae blanditiis, eligendi dicta
                  officiis asperiores delectus quasi inventore debitis quo.
                </p>
              </Tab>
              <Tab eventKey="third" title="third">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Cumque quam, quod neque provident velit, rem explicabo
                  excepturi id illo molestiae blanditiis, eligendi dicta
                  officiis asperiores delectus quasi inventore debitis quo.
                </p>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
