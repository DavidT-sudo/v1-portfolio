import { identity } from '../lib/data';
import ContactForm from './ContactForm';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

const publicChannels = [
  { label: 'GITHUB', value: 'DavidT-sudo', href: identity.github },
  { label: 'CODEPEN', value: 'Thuto-Tlhobogang', href: identity.codepen },
];

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <Reveal>
        <SectionHeading
          index="04"
          title="Contact"
          caption="Open channel — projects, contracts, and collaborations."
        />
      </Reveal>

      <Reveal delay={100}>
        <div className="panel reg-marks p-8 sm:p-12">
          <p className="font-mono text-2xs tracking-[0.25em] text-sage-500">
            <span className="mr-2 text-volt">$</span>
            ./init_handshake --channel [whatsapp|email]
          </p>

          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-sage-400">
            Direct contact details are kept off the page to keep the bots out.
            Pick a channel, leave your own contact, and the message lands
            with me directly — usually answered within a day.
          </p>

          <ContactForm />

          <div className="mt-12 grid gap-px border-t border-line bg-line pt-px sm:grid-cols-2">
            {publicChannels.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-graphite-850 p-5 transition-colors duration-200 hover:bg-graphite-800"
              >
                <div className="font-mono text-2xs tracking-[0.25em] text-sage-500 transition-colors group-hover:text-ohm">
                  {channel.label} ↗
                </div>
                <div className="mt-2 break-all font-mono text-xs text-sage-300 transition-colors group-hover:text-porcelain">
                  {channel.value}
                </div>
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
