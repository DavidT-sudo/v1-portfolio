'use client';
import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Col, Container, Row } from 'react-bootstrap';
import { ProjectCard } from './ProjectCard';
import projImg1 from '@/app/assets/images/project-img1.png';
import projImg2 from '@/app/assets/images/project-img2.png';
import projImg3 from '@/app/assets/images/project-img3.png';
import colorSharp2 from '../assets/img/color-sharp2.png';
import 'animate.css';
import TrackVisibility from 'react-on-screen';

const projects = [
  {
    id: 1,
    name: 'Project One',
    description: 'Description for project one',
    imgUrl: projImg1,
  },
  {
    id: 2,
    name: 'Project Two',
    description: 'Description for project two',
    imgUrl: projImg2,
  },
  {
    id: 3,
    name: 'Project Three',
    description: 'Description for project three',
    imgUrl: projImg3,
  },
];

export const Projects = () => {
  const [key, setKey] = useState('home');

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col>
            <h2>My Projects</h2>
            <p>
              Exercitation occaecat consequat irure fugiat anim consequat
              aliquip occaecat ut non in. Sint pariatur tempor fugiat esse Lorem
              commodo et ipsum voluptate mollit do id nulla. Occaecat incididunt
              nulla ut reprehenderit ea id sunt velit.
            </p>
            <Tab.Container id="projects-tabs" defaultActiveKey="first">
              <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={k => setKey(k)}
                className="mb-3"
              >
                <Tab eventKey="first" title="Project-one">
                  <Row>
                    {projects.map((project, index) => {
                      return <ProjectCard key={index} {...project} />;
                    })}
                  </Row>
                </Tab>
                <Tab eventKey="second" title="Project-two">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Cumque quam, quod neque provident velit, rem explicabo
                    excepturi id illo molestiae blanditiis, eligendi dicta
                    officiis asperiores delectus quasi inventore debitis quo.
                  </p>
                </Tab>
                <Tab eventKey="third" title="Project-three">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Cumque quam, quod neque provident velit, rem explicabo
                    excepturi id illo molestiae blanditiis, eligendi dicta
                    officiis asperiores delectus quasi inventore debitis quo.
                  </p>
                </Tab>
              </Tabs>
            </Tab.Container>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
