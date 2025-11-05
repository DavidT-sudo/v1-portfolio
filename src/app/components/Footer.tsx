'use client';
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/app/assets/images/vecteezy_abstract-tech-logo-design-vector-illustration_19511172.svg';

function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center">
          <Col sm={6}>
            <Image
              src={logo}
              alt="Logo"
              width={120}
              height={40}
              className="footer-logo"
            />
          </Col>
          <Col sm={6} className="text-center text-sm-end">
            <div className="social-icon footer-social">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/images/nav-icon1.svg"
                  alt="LinkedIn"
                  width={24}
                  height={24}
                />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/images/nav-icon2.svg"
                  alt="Facebook"
                  width={24}
                  height={24}
                />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/images/nav-icon3.svg"
                  alt="Instagram"
                  width={24}
                  height={24}
                />
              </a>
            </div>
            <div className="footer-links">
              <Link href="#home">Home</Link>
              <Link href="#skills">Skills</Link>
              <Link href="#projects">Projects</Link>
            </div>
            <p className="copyright">
              Copyright © {new Date().getFullYear()}. All Rights Reserved
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
