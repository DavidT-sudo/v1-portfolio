# OhmerOhm Labs — Portfolio

Engineering portfolio of **Thuto Tlhobogang** — full-stack software engineer and mechatronics / industrial instrumentation engineer. Built on the OhmerOhm Labs brand identity system: green-tinted graphite surfaces, Ohm Green / Volt Lime accents, Space Grotesk + Inter + JetBrains Mono, terminal-style hero, and spec-sheet UI details.

## Stack

- [Next.js 15](https://nextjs.org) (App Router) + React 19
- [Tailwind CSS v4](https://tailwindcss.com) with brand `@theme` tokens
- Space Grotesk / Inter / JetBrains Mono via `next/font`
- Server action contact form (WhatsApp click-to-chat + email)
- Vercel Analytics

## Development

```bash
npm install
cp .env.example .env.local   # then fill in your contact channels
npm run dev     # dev server (Turbopack)
npm run build   # production build
npm run lint    # eslint
```

## Contact privacy

The email address and WhatsApp number are **not** in the page source — bots can't scrape them. They live in env vars (`CONTACT_EMAIL`, `WHATSAPP_NUMBER`) and are only used server-side by the contact form's server action, which builds a `wa.me` chat link or sends/opens an email. Optional `RESEND_API_KEY` enables true server-side email delivery. Set the same vars in your Vercel project settings when deploying.

## Structure

```
src/app/
├── globals.css          # brand design tokens (@theme) + primitives
├── layout.tsx           # fonts, metadata
├── page.tsx             # section assembly
├── icon.png             # favicon (brand mark)
├── lib/data.ts          # all site copy (projects, stack, experience)
├── actions/contact.ts   # server action — env-hidden WhatsApp/email channels
└── components/          # NavBar, Hero, Terminal, Projects, Stack,
                         # ExperienceLog, Contact, ContactForm, Footer,
                         # Reveal, SectionHeading
public/brand/mark.png    # OhmerOhm Labs mark (Ω-ring + leaf)
```

See [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) for the full token reference and design principles.
