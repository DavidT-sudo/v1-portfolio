'use client';
import React, { useState, useEffect } from 'react';
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
      <div className="container mx-auto px-6 xl:px-12">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-8">
          <div className="w-full md:w-7/12">
            <span className="tagline">Welcome to my Portfolio</span>
            <h2>
              Hi, I&apos;m Thuto Tlhobogang
              <br />I am a <span className="wrap">{text}</span>
            </h2>
            <p>
              A Mechatronics &amp; Industrial Instrumentation engineer
              (B.Eng., BIUST) turned full-stack developer, trained through
              FreeCodeCamp and The Odin Project. I combine control-systems
              engineering with modern web technologies&mdash;currently
              building React/Django products at Africort Investments, after
              shipping SCADA and research-data systems in the field.
            </p>
            <a href="#contact" className="banner-cta">
              Let&apos;s Connect
              <ArrowRightCircle size={25} />
            </a>
          </div>
          <div className="w-full md:w-5/12">
            <Image
              src={headerImg}
              alt="Header Img"
              width={500}
              height={500}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
