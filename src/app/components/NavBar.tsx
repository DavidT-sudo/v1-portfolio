"use client";
import {useState, useEffect} from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "next/image";
import logo from "@/app/assets/images/vecteezy_abstract-tech-logo-design-vector-illustration_19511172.svg";
import navIcon1 from "@/app/assets/images/linkedin-icon-svgrepo-com.svg";
import navIcon2 from "@/app/assets/images/facebook-1-svgrepo-com.svg";
import navIcon3 from "@/app/assets/images/instagram-color-svgrepo-com.svg";
import {Button} from "react-bootstrap";
import {HashLink} from "react-router-hash-link";

function NavBar() {
  const [activeLink, setActiveLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onUpdateLink = (value: string) => {
    setActiveLink(value);
  };

  return (
    <Navbar expand="lg" className={scrolled ? "scrolled" : ""}>
      <Container>
        <Navbar.Brand href="#home" className="flex">
          <Image
            src={logo}
            alt="Logo"
            width={150}
            height={50}
            className="object-fill"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              href="#home"
              className={
                activeLink === "home" ? "active navbar-Link" : "navbar-Link"
              }
              onClick={() => onUpdateLink("home")}
            >
              Home
            </Nav.Link>
            <Nav.Link
              href="#skills"
              className={
                activeLink === "skills" ? "active navbar-Link" : "navbar-Link"
              }
              onClick={() => onUpdateLink("skills")}
            >
              Skills
            </Nav.Link>
            <Nav.Link
              href="#projects"
              className={
                activeLink === "projects" ? "active navbar-Link" : "navbar-Link"
              }
              onClick={() => onUpdateLink("projects")}
            >
              Projects
            </Nav.Link>
          </Nav>
          <span className="navbar-text svg">
            <a href="#">
              <Image src={navIcon1} alt="LinkedIn" width={24} height={24} />
            </a>
            <a href="#">
              <Image src={navIcon2} alt="Facebook" width={24} height={24} />
            </a>
            <a href="#">
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
