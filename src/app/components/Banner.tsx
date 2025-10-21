'use client';
import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { ArrowRightCircle } from 'react-bootstrap-icons';
import Image from 'next/image';
import headerImg from '../assets/images/header-img.svg';

export default function Banner() {
  const toRotate = ['web developer', 'web designer', 'UI/UX designer'];
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
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
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
    <section className="banner bg-amber-500" id="home">
      <Container>
        <Row className="items-center">
          <Col xs={12} md={6} xl={7}>
            <span className="tagline">Welcome to my website</span>
            <h1>
              {"Hi I'm webcoded"}
              <span className="wrap">{text}</span>
            </h1>
            <p>
              Non quis non sint deserunt officia reprehenderit ipsum eiusmod
              Lorem labore officia ullamco. Veniam ut ea ullamco reprehenderit
              exercitation enim id commodo pariatur culpa. Mollit reprehenderit
              laborum eiusmod adipisicing.
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
