# OmerOhm LABS — Portfolio

Engineering portfolio of **Thuto Tlhobogang** — full-stack software engineer and mechatronics / industrial instrumentation engineer. Built on the OmerOhm LABS brand identity system: green-tinted graphite surfaces, Ohm Green / Volt Lime accents, Space Grotesk + Inter + JetBrains Mono, terminal-style hero, and spec-sheet UI details.

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

## Deployment (Docker)

The production image is a multi-stage build emitting Next.js [standalone](https://nextjs.org/docs/app/api-reference/config/next-config-js/output) output — it runs `node server.js` with no `node_modules`, as a non-root user, on a read-only filesystem.

```bash
cp .env.example .env.local    # fill in your contact channels
docker compose up -d --build  # build + run
docker compose logs -f web    # tail logs
docker compose down           # stop
```

The container listens on port 3000 and is published to `127.0.0.1:3000` by default — front it with a TLS reverse proxy (Nginx/Caddy/Traefik) in production. Override the binding with `HOST_BIND` / `HOST_PORT`:

```bash
HOST_BIND=0.0.0.0 HOST_PORT=8080 docker compose up -d
```

**Secrets** (`WHATSAPP_NUMBER`, `CONTACT_EMAIL`, `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`) are read from `.env.local` at **runtime** via `env_file` and are never baked into the image. The one exception is `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, which Next.js inlines at **build time** — it's public, and is passed as a build arg (set it in your shell or a compose `.env` file).

## Contact privacy

The email address and WhatsApp number are **not** in the page source — bots can't scrape them. They live in env vars (`CONTACT_EMAIL`, `WHATSAPP_NUMBER`) and are only used server-side by the contact form's server action, which builds a `wa.me` chat link or sends/opens an email. Optional `RESEND_API_KEY` enables true server-side email delivery. Set the same vars in your Vercel project settings when deploying.

The form is hardened against harvesting/spam: a **honeypot** field, per-IP **rate limiting** (5 / 10 min), and an optional **Cloudflare Turnstile** challenge — enforced in that order before any `wa.me`/`mailto` URL is built. See `DESIGN_SYSTEM.md` for details.

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
public/brand/mark.png    # OmerOhm LABS mark (Ω-ring + leaf)
```

See [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) for the full token reference and design principles.
