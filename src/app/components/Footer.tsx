import Image from 'next/image';
import { identity, navLinks } from '../lib/data';

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 py-10 text-center sm:flex-row sm:justify-between sm:px-8 sm:text-left">
        <div className="flex items-center gap-3">
          <Image
            src="/brand/mark.png"
            alt=""
            width={36}
            height={36}
            className="h-9 w-9"
          />
          <div>
            <p className="font-display text-xs font-bold tracking-[0.12em]">
              <span className="text-porcelain">OhmerOhm</span>
              <span className="ml-1 text-ohm">LABS</span>
            </p>
            <p className="mt-1 font-mono text-2xs tracking-wider text-sage-500">
              {identity.divisions.join(' · ')} — © {new Date().getFullYear()}{' '}
              {identity.name}, {identity.location}
            </p>
          </div>
        </div>

        <nav aria-label="Footer">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-mono text-2xs tracking-[0.15em] text-sage-400 transition-colors hover:text-volt"
                >
                  ./{link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
