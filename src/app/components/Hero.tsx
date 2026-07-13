import { identity } from '../lib/data';
import Terminal from './Terminal';

export default function Hero() {
  return (
    <section
      id="top"
      className="mx-auto grid min-h-svh max-w-6xl items-center gap-14 px-5 pt-28 pb-16 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10"
    >
      {/* -- Left: identity ------------------------------------ */}
      <div className="animate-fade-up">
        <p className="font-mono text-2xs tracking-[0.3em] text-ohm">
          {'//'} OHMEROHM LABS — TECHWORKS DIVISION
        </p>

        <h1 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-porcelain sm:text-5xl lg:text-6xl">
          T. G. David
          <br />
          Tlhobogang
          <span className="text-volt">_</span>
        </h1>

        <p className="mt-5 font-display text-sm tracking-wide text-sage-300 sm:text-base">
          {identity.tagline}
        </p>

        <p className="mt-6 max-w-xl text-sm leading-relaxed text-sage-400">
          <span className="text-porcelain">Full-stack software engineer</span>{' '}
          and{' '}
          <span className="text-porcelain">
            mechatronics / instrumentation engineer
          </span>
          . {identity.summary}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className="bg-volt px-6 py-3 font-mono text-xs font-bold tracking-[0.15em] text-graphite-950 transition-all duration-200 hover:shadow-glow-volt hover:-translate-y-0.5"
          >
            VIEW_PROJECTS →
          </a>
          <a
            href="#contact"
            className="border border-line-bright px-6 py-3 font-mono text-xs font-bold tracking-[0.15em] text-sage-300 transition-all duration-200 hover:border-ohm hover:text-volt hover:-translate-y-0.5"
          >
            GET_IN_TOUCH
          </a>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-2xs tracking-[0.15em] text-sage-400">
          <span className="flex items-center gap-2.5">
            <span className="led text-volt" aria-hidden />
            AVAILABLE FOR PROJECTS
          </span>
          <span className="flex items-center gap-2.5">
            <span className="text-sage-500" aria-hidden>
              ⌖
            </span>
            {identity.location.toUpperCase()}
          </span>
        </div>
      </div>

      {/* -- Right: live terminal ------------------------------- */}
      <div className="animate-fade-up [animation-delay:200ms]">
        <Terminal />
      </div>
    </section>
  );
}
