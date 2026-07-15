'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { navLinks } from '../lib/data';
import ThemeToggle from './ThemeToggle';

function Wordmark() {
  return (
    <a
      href="#top"
      className="flex items-center gap-2.5"
      aria-label="OmerOhm LABS — back to top"
    >
      <Image
        src="/brand/mark.png"
        alt=""
        width={32}
        height={32}
        priority
        className="h-8 w-8"
      />
      <span className="font-display text-sm font-bold tracking-[0.12em]">
        <span className="text-porcelain">OmerOhm</span>
        <span className="ml-1.5 text-ohm">LABS</span>
      </span>
      <span className="led ml-1 text-volt" aria-hidden />
    </a>
  );
}

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open
          ? 'border-line bg-graphite-900/90 backdrop-blur-md'
          : 'border-transparent bg-transparent'
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8"
        aria-label="Primary"
      >
        <Wordmark />

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group font-mono text-xs tracking-[0.15em] text-sage-400 transition-colors hover:text-porcelain"
              >
                <span className="text-sage-500 transition-colors group-hover:text-volt">
                  ./
                </span>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="border border-ohm/60 px-4 py-2 font-mono text-xs font-bold tracking-[0.15em] text-volt transition-all duration-200 hover:bg-ohm hover:text-porcelain hover:shadow-glow-ohm"
            >
              INIT_CONTACT
            </a>
          </li>
          <li>
            <ThemeToggle />
          </li>
        </ul>

        {/* Mobile: theme toggle + menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen(v => !v)}
          >
            <span
              className={`h-px w-5 bg-porcelain transition-transform duration-200 ${
                open ? 'translate-y-[3.5px] rotate-45' : ''
              }`}
            />
            <span
              className={`h-px w-5 bg-porcelain transition-transform duration-200 ${
                open ? '-translate-y-[3.5px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div id="mobile-menu" className="border-t border-line md:hidden">
          <ul className="space-y-1 bg-graphite-900/95 px-5 py-4 backdrop-blur-md">
            {navLinks.map((link, i) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-mono text-sm tracking-[0.15em] text-sage-300 transition-colors hover:text-volt"
                >
                  <span className="mr-3 text-2xs text-sage-500">0{i + 1}</span>
                  ./{link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
