'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/app/assets/images/OmerohmLogo.svg';
import { useTheme } from 'next-themes';
import { Moon, Sun, List, X, Github, Linkedin, CodeSquare } from 'react-bootstrap-icons';

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/DavidT-sudo', icon: <Github size={16} /> },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/thuto-tlhobogang-334a2b10a',
    icon: <Linkedin size={16} />,
  },
  { label: 'CodePen', href: 'https://codepen.io/Thuto-Tlhobogang', icon: <CodeSquare size={16} /> },
];

export default function NavBar() {
  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onUpdateLink = (value: string) => {
    setActiveLink(value);
    setMobileMenuOpen(false);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-bg-secondary/95 backdrop-blur-lg shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 xl:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link href="#home" className="flex items-center shrink-0">
          <Image
            src={logo}
            alt="Logo"
            width={140}
            height={38}
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8 xl:gap-12">
          {/* Menu Links */}
          <div className="flex items-center gap-8">
            <Link
              href="#home"
              onClick={() => onUpdateLink('home')}
              className={`text-[17px] font-medium tracking-wide transition-colors duration-300 ${
                activeLink === 'home'
                  ? (scrolled ? 'text-text-primary' : 'text-white')
                  : (scrolled ? 'text-text-secondary hover:text-text-primary' : 'text-white/70 hover:text-white')
              }`}
            >
              Home
            </Link>
            <Link
              href="#skills"
              onClick={() => onUpdateLink('skills')}
              className={`text-[17px] font-medium tracking-wide transition-colors duration-300 ${
                activeLink === 'skills'
                  ? (scrolled ? 'text-text-primary' : 'text-white')
                  : (scrolled ? 'text-text-secondary hover:text-text-primary' : 'text-white/70 hover:text-white')
              }`}
            >
              Skills
            </Link>
            <Link
              href="#projects"
              onClick={() => onUpdateLink('projects')}
              className={`text-[17px] font-medium tracking-wide transition-colors duration-300 ${
                activeLink === 'projects'
                  ? (scrolled ? 'text-text-primary' : 'text-white')
                  : (scrolled ? 'text-text-secondary hover:text-text-primary' : 'text-white/70 hover:text-white')
              }`}
            >
              Projects
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-5 pl-8 border-l border-border-custom">
             {/* Socials */}
             <div className="flex items-center gap-3">
                {socialLinks.map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`social-icon-btn ${scrolled ? 'text-text-primary' : 'text-white'}`}
                  >
                    <span className="sr-only">{link.label}</span>
                    {link.icon}
                  </a>
                ))}
             </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`w-[42px] h-[42px] rounded-full border border-border-custom hover:bg-bg-tertiary transition-colors flex items-center justify-center bg-transparent ${scrolled ? 'text-text-primary' : 'text-white border-white/30'}`}
              aria-label="Toggle Theme"
            >
              {mounted && (theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />)}
            </button>

            {/* CTA */}
            <Link
              href="#contact"
              onClick={() => onUpdateLink('contact')}
              className={`px-6 py-2.5 border font-bold text-sm transition-all duration-300 whitespace-nowrap rounded-sm ${scrolled ? 'border-text-primary text-text-primary hover:bg-text-primary hover:text-bg-primary' : 'border-white text-white hover:bg-white hover:text-black'}`}
            >
              Let&apos;s Connect
            </Link>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden p-2 text-text-primary hover:bg-bg-tertiary rounded-md transition-colors"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open Menu"
        >
          <List size={34} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden flex justify-end transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
          onClick={() => setMobileMenuOpen(false)}
        />

        <div
          className={`relative w-[85%] max-w-sm h-full bg-bg-secondary shadow-2xl transition-transform duration-300 transform flex flex-col p-8 border-l border-border-custom ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex justify-between items-center mb-12">
            <Image src={logo} alt="Logo" width={140} height={35} priority className="object-contain" />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-text-primary p-2 hover:bg-bg-tertiary rounded-full transition-colors"
              aria-label="Close Menu"
            >
              <X size={32} />
            </button>
          </div>

          <div className="flex flex-col gap-6">
            <Link
              href="#home"
              onClick={() => onUpdateLink('home')}
              className={`text-2xl font-bold tracking-wide transition-colors ${
                activeLink === 'home' ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Home
            </Link>
            <Link
              href="#skills"
              onClick={() => onUpdateLink('skills')}
              className={`text-2xl font-bold tracking-wide transition-colors ${
                activeLink === 'skills' ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Skills
            </Link>
            <Link
              href="#projects"
              onClick={() => onUpdateLink('projects')}
              className={`text-2xl font-bold tracking-wide transition-colors ${
                activeLink === 'projects' ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Projects
            </Link>
            <Link
              href="#contact"
              onClick={() => onUpdateLink('contact')}
              className={`text-2xl font-bold tracking-wide transition-colors ${
                activeLink === 'contact' ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Contact
            </Link>
          </div>

          <div className="mt-auto flex flex-col gap-8 pb-8">
            <div className="flex justify-center gap-6">
              {socialLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn scale-110 text-text-primary"
                >
                  <span className="sr-only">{link.label}</span>
                  {link.icon}
                </a>
              ))}
            </div>

            <div className="flex justify-between items-center border-t border-b border-border-custom py-5">
              <span className="text-text-secondary text-lg font-medium">Appearance</span>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-3 px-5 py-2.5 rounded-full border border-border-custom hover:bg-bg-tertiary transition-colors"
              >
                {mounted && (theme === 'dark' ? (
                  <>
                    <Sun size={20} className="text-text-primary" />
                    <span className="text-sm font-medium text-text-primary">Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon size={20} className="text-text-primary" />
                    <span className="text-sm font-medium text-text-primary">Dark Mode</span>
                  </>
                ))}
              </button>
            </div>

            <Link
              href="#contact"
              onClick={() => onUpdateLink('contact')}
              className="w-full py-4 border-2 border-text-primary font-bold text-text-primary hover:bg-text-primary hover:text-bg-primary transition-all duration-300 text-lg rounded-lg uppercase tracking-wider text-center"
            >
              Let&apos;s Connect
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
