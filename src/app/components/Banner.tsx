'use client';
import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { ArrowRightCircle } from 'react-bootstrap-icons';
import Image from 'next/image';
import headerImg from '../assets/images/undraw_in-the-zone_07y7.svg';

export default function Banner() {
  const toRotate = [
    'Full Stack Developer',
    'Systems Engineer',
    'Mechatronics Engineer',
  ];
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const period = 2000;

  useEffect(() => {
    const ticker = setInterval(() => {
      tick();
    }, delta);

    return () => clearInterval(ticker);
  }, [text]);

  const tick = () => {
    const i = loopNum % toRotate.length;
    const fullText = toRotate[i];
    const updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }
    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(500);
    }
  };

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="items-center">
          <Col xs={12} md={6} xl={7}>
            <span className="tagline">Welcome to my Portfolio</span>
            <h2>
              Hi, I&apos;m David T.
              <br />I am a <span className="wrap">{text}</span>
            </h2>
            <p>
              A passionate Software Engineer with a background in Mechatronics
              and Industrial Instrumentation. I combine engineering principles
              with modern web technologies to build efficient, scalable
              applications. Experienced in full-stack development, systems
              engineering, and industrial automation.
            </p>
            <button onClick={() => console.log('Connect')}>
              Let&apos;s Connect
              <ArrowRightCircle size={25} />
            </button>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <Image
              src={headerImg}
              alt="Header Img"
              width={500}
              height={500}
              priority
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
}
