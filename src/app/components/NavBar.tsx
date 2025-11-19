'use client';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'next/image';
import logo from '@/app/assets/images/OmerohmLogo.svg';
import navIcon1 from '@/app/assets/images/linkedin-icon-svgrepo-com.svg';
import navIcon2 from '@/app/assets/images/facebook-1-svgrepo-com.svg';
import navIcon3 from '@/app/assets/images/instagram-color-svgrepo-com.svg';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// import { HashLink } from 'react-router-hash-link';

function NavBar() {
  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onUpdateLink = (value: string) => {
    setActiveLink(value);
  };

  return (
    <Navbar
      expand="lg"
      expanded={expanded}
      onToggle={next => setExpanded(next)}
      className={scrolled ? 'scrolled' : ''}
    >
      <Container className="d-flex justify-content-center d-lg-block">
        <Navbar.Brand href="#home" className="flex">
          <Image
            src={logo}
            alt="Logo"
            width={150}
            height={25}
            className="object-fill"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className={
            expanded
              ? 'bg-black text-white absolute w-full left-0 top-14 z-50 py-4'
              : ''
          }
        >
          <Nav className="me-auto">
            <Nav.Link
              href="#home"
              className={
                activeLink === 'home' ? 'active navbar-Link' : 'navbar-Link'
              }
              onClick={() => onUpdateLink('home')}
            >
              Home
            </Nav.Link>
            <Nav.Link
              href="#skills"
              className={`nav-link ${
                activeLink === 'skills' ? 'active navbar-Link' : 'navbar-Link'
              }`}
              onClick={() => onUpdateLink('skills')}
            >
              Skills
            </Nav.Link>
            <Nav.Link
              href="#projects"
              className={
                activeLink === 'projects' ? 'active navbar-Link' : 'navbar-Link'
              }
              onClick={() => onUpdateLink('projects')}
            >
              Projects
            </Nav.Link>
          </Nav>
          <span className="navbar-text svg">
            <a href="#" aria-label="LinkedIn">
              <Image src={navIcon1} alt="LinkedIn" width={24} height={24} />
            </a>
            <a href="#" aria-label="Facebook">
              <Image src={navIcon2} alt="Facebook" width={24} height={24} />
            </a>
            <a href="#" aria-label="Instagram">
              <Image src={navIcon3} alt="Instagram" width={24} height={24} />
            </a>
            <Button className="vvd">
              <span>Contact Me</span>
            </Button>
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
