'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Github, Linkedin, CodeSquare, Envelope } from 'react-bootstrap-icons';
import logo from '@/app/assets/images/OmerohmLogo.svg';

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/DavidT-sudo', icon: <Github size={18} /> },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/thuto-tlhobogang-334a2b10a',
    icon: <Linkedin size={18} />,
  },
  { label: 'CodePen', href: 'https://codepen.io/Thuto-Tlhobogang', icon: <CodeSquare size={18} /> },
  { label: 'Email', href: 'mailto:thutotlhobogang@gmail.com', icon: <Envelope size={18} /> },
];

function Footer() {
  return (
    <footer className="footer">
      <div className="container mx-auto px-6 xl:px-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <Image
            src={logo}
            alt="Logo"
            width={120}
            height={40}
            className="footer-logo"
          />
          <div className="flex flex-col items-center sm:items-end gap-4">
            <div className="footer-social">
              {socialLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={
                    link.href.startsWith('http')
                      ? 'noopener noreferrer'
                      : undefined
                  }
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
            <div className="footer-links">
              <Link href="#home">Home</Link>
              <Link href="#skills">Skills</Link>
              <Link href="#projects">Projects</Link>
              <Link href="#contact">Contact</Link>
            </div>
            <p className="copyright">
              Copyright &copy; {new Date().getFullYear()}. All Rights
              Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
