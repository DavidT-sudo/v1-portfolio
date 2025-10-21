'use client';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import Image from 'next/image';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export const Skills = () => {
  return (
    <section className="skill bg-blue-500" id="skills">
      <Container>
        <Row>
          <Col>
            <div className="skill-bx">
              <h2>Skills</h2>
              <p>
                Dolore dolor aliqua et velit quis veniam sit veniam commodo
                elit. Id cupidatat nostrud sit sint dolore velit do labore nisi
                officia elit proident consectetur. Adipisicing commodo et
                consequat veniam reprehenderit. Culpa ex ipsum proident eu ea
                dolor dolore ullamco dolor. Lorem labore nulla eu tempor.
                Pariatur in amet duis anim sit ex.
              </p>
              <Carousel
                responsive={responsive}
                infinite={true}
                className="skill-slider"
              >
                <div className="item">
                  <Image
                    src="/images/meter1.svg"
                    alt="Front-End Skills"
                    width={150}
                    height={150}
                  />
                  <h5>Front-End</h5>
                </div>
                <div className="item">
                  <Image
                    src="/images/meter2.svg"
                    alt="Back-end Skills"
                    width={150}
                    height={150}
                  />
                  <h5>Back-end</h5>
                </div>
                <div className="item">
                  <Image
                    src="/images/meter3.svg"
                    alt="DevOps Skills"
                    width={150}
                    height={150}
                  />
                  <h5>DevOps</h5>
                </div>
                <div className="item">
                  <Image
                    src="/images/meter1.svg"
                    alt="Database Skills"
                    width={150}
                    height={150}
                  />
                  <h5>Database</h5>
                </div>
              </Carousel>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
