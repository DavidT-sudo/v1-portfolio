import { experienceLog } from '../lib/data';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function ExperienceLog() {
  return (
    <section id="log" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <Reveal>
        <SectionHeading
          index="03"
          title="Field Log"
          caption="Where the engineering happened — factory floors to research labs."
        />
      </Reveal>

      <div className="panel reg-marks divide-y divide-line">
        {experienceLog.map((entry, i) => (
          <Reveal key={`${entry.org}-${entry.period}`} delay={i * 70}>
            <div className="group grid gap-2 p-5 transition-colors duration-200 hover:bg-graphite-800/60 sm:grid-cols-[150px_1fr] sm:gap-6 sm:p-6">
              <div className="font-mono text-2xs tracking-[0.2em] text-sage-500 transition-colors group-hover:text-volt sm:pt-1">
                {entry.period}
              </div>
              <div>
                <h3 className="font-display text-sm font-bold text-porcelain">
                  {entry.role}
                  <span className="ml-2 font-sans font-normal text-sage-400">
                    @ {entry.org}
                  </span>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-sage-400">
                  {entry.note}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
