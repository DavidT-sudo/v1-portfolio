import {
  Envelope,
  TelephoneFill,
  Github,
  Linkedin,
  CodeSquare,
} from 'react-bootstrap-icons';

const contactLinks = [
  {
    label: 'Email',
    value: 'thutotlhobogang@gmail.com',
    href: 'mailto:thutotlhobogang@gmail.com',
    icon: <Envelope size={22} />,
  },
  {
    label: 'Phone',
    value: '+267 72 858 873',
    href: 'tel:+26772858873',
    icon: <TelephoneFill size={20} />,
  },
  {
    label: 'GitHub',
    value: 'github.com/DavidT-sudo',
    href: 'https://github.com/DavidT-sudo',
    icon: <Github size={20} />,
  },
  {
    label: 'LinkedIn',
    value: 'in/thuto-tlhobogang',
    href: 'https://www.linkedin.com/in/thuto-tlhobogang-334a2b10a',
    icon: <Linkedin size={20} />,
  },
  {
    label: 'CodePen',
    value: 'codepen.io/Thuto-Tlhobogang',
    href: 'https://codepen.io/Thuto-Tlhobogang',
    icon: <CodeSquare size={20} />,
  },
];

function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="container mx-auto px-6 xl:px-12">
        <div className="flex flex-col items-center">
          <h2>Get In Touch</h2>
          <p>
            Have a project in mind, or just want to talk shop about
            mechatronics and software? I&apos;m always open to a
            conversation.
          </p>
          <div className="contact-grid">
            {contactLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={
                  link.href.startsWith('http')
                    ? 'noopener noreferrer'
                    : undefined
                }
                className="contact-card"
              >
                <span className="contact-card-icon">{link.icon}</span>
                <span className="contact-card-text">
                  <span className="contact-card-label">{link.label}</span>
                  <span className="contact-card-value">{link.value}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
