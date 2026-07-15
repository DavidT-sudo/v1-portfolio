# OmerOhm LABS — Design System

This documents the design system actually implemented in this repo, derived from the **OmerOhm LABS Brand Identity System v1.0** ("circuitry first, foliage second"). Tokens live in [`src/app/globals.css`](src/app/globals.css) as Tailwind CSS v4 `@theme` variables; components are Next.js (App Router) + React 19.

## Identity

The site reads as the Techworks division of an engineering studio: part terminal, part instrument panel, part spec sheet — rendered in the brand's green-tinted graphite and leaf-derived greens. The mark (Ω-ring enclosing a leaf/omer, `public/brand/mark.png`) is used as supplied; the name is standardized as **OmerOhm** per the brand guide.

## Color tokens

All hues pulled from the brand guide's palette.

| Token | Value | Brand name / role |
| --- | --- | --- |
| `--color-graphite-950…700` | `#0d100d` → `#242b24` | Graphite ramp — green-tinted charcoal surfaces (guide neutral dark `#1B1F1A` ≈ `graphite-800`) |
| `--color-line` / `--color-line-bright` | `#263026` / `#3d4a3d` | Hairlines and emphasized borders |
| `--color-porcelain` | `#f4f7f1` | Porcelain — primary text, lab-bench white |
| `--color-sage-300/400/500` | `#ccd6c6` / `#9dae96` / `#6f7d69` | Sage — secondary/muted text (guide `#9DAE96`) |
| `--color-ohm` | `#3f8f33` | **Ohm Green** — primary brand: headings accents, tags, hover borders |
| `--color-volt` | `#8ed32e` | **Volt Lime** — the voltage spike: CTAs, live LEDs, cursor, `$` prompt. Small doses only |
| `--color-circuit` | `#245c1d` | **Circuit Deep** — anchoring fills (e.g. selected channel in the contact form) |
| `--color-copper` | `#c9762b` | Copper amber (Audio division) — warm highlight, MVP status |
| `--color-signal` | `#2e86c9` | Signal blue (Media division) — frontend group accent, in-dev status |
| `--color-brick` | `#9a3b2e` | Fault tone; terminal chrome |

## Typography (brand type system)

| Role | Face | Token | Usage |
| --- | --- | --- | --- |
| Display / headings | **Space Grotesk** | `font-display` | h1–h3, project titles, wordmark |
| Body | **Inter** | default on `body` | paragraphs, descriptions |
| Technical / mono | **JetBrains Mono** | `font-mono` | spec labels, nav links, buttons, terminal, tags, form labels |

All three load via `next/font`; the tokens are declared in `@theme inline` because the font variables are injected on `<body>` (a `:root`-level `var()` reference would not resolve).

Extra size: `text-2xs` (0.6875rem) for machine labels (`P-01`, `SYS-A`, `OOL-01 / REV.01`).

## Theming (light / dark)

Dark is the brand default (graphite surfaces); light is the "Porcelain / lab-bench" inversion. Because Tailwind v4 compiles color utilities to `var(--color-*)`, the whole site re-skins by overriding those tokens under `html[data-theme='light']` in [`globals.css`](src/app/globals.css) — no per-component theme logic. Surfaces flip to porcelain/white, text to graphite, and accents deepen for contrast on white (Ohm `#2f7d27`, Volt `#3f9120`).

- `ThemeToggle.tsx` flips the `data-theme` attribute on `<html>` and persists to `localStorage['oo-theme']`.
- An inline script in `layout.tsx` `<head>` applies the stored/system theme **before paint** (no flash); `<html>` carries `suppressHydrationWarning`.
- Defaults to the OS `prefers-color-scheme` when no choice is stored.

## Technology logos

Tech/skill icons are the official brand glyphs from **Simple Icons** via `react-icons/si` (Python, Django, Docker, PostgreSQL, Supabase, React, Next.js, Flutter, Tailwind, TypeScript, Prisma, GitHub Actions, Turborepo, pnpm, Go, Gemini, …), with **Tabler** (`react-icons/tb`) concept icons for non-branded skills (PLC/SCADA, instrumentation, LLM agents, security). All render **monochrome via `currentColor`** so they read as one system and stay legible in both themes. Mapping lives in [`lib/icons.tsx`](src/app/lib/icons.tsx); used by both `Stack` and project stack tags.

## Depth & motion

- `--shadow-panel` — inset top highlight + long soft drop.
- `--shadow-glow-volt` / `--shadow-glow-ohm` — hover glow for interactive elements.
- `--ease-precise` — `cubic-bezier(0.22, 1, 0.36, 1)`.
- Keyframes: `blink` (cursor), `fade-up` (hero entrance), `led-pulse` (status dots). Full `prefers-reduced-motion` opt-out.

## Primitives (globals.css)

| Class | What it is |
| --- | --- |
| `.grid-backdrop` | Blueprint grid (48px) + faint Ohm Green radial glow |
| `.panel` | Standard surface: `graphite-850`, hairline border, panel shadow |
| `.reg-marks` | Crosshair corner ticks; turn Volt Lime on `.group` hover |
| `.reveal` / `.is-visible` | Scroll-triggered fade-up, staggered via `--reveal-delay` (see `Reveal.tsx`) |
| `.led` | 7px pulsing status dot, colored via `currentColor` |
| `.field` | Spec-sheet form input: graphite fill, Ohm Green focus border |

## Contact privacy architecture

Direct contact details (email, WhatsApp number) never appear in page markup — they live in server-side env vars (`CONTACT_EMAIL`, `WHATSAPP_NUMBER`, see `.env.example`) and are only used inside the server action [`src/app/actions/contact.ts`](src/app/actions/contact.ts):

- **WhatsApp** → server builds a `wa.me` click-to-chat URL prefilled with the message + the client's reply contact; the client opens it.
- **Email** → sent server-side via Resend when `RESEND_API_KEY` is set; otherwise the server returns a prefilled `mailto:` URL.

The form (`ContactForm.tsx`) captures name, reply contact, channel (WhatsApp/email), and message; the submit button names the selected channel.

**Anti-harvesting / anti-spam** — enforced in `contact.ts` in strict order, and no `wa.me`/`mailto` URL is built until every check passes:

1. **Honeypot** — an off-screen `company` field no human fills; if present, the server returns a generic fake success and sends nothing.
2. **Rate limit** — `src/app/lib/rate-limit.ts`, 5 requests / 10 min per client IP (in-memory; swap for Upstash Redis if multi-region durability is needed). Verified blocking at the 6th request.
3. **Cloudflare Turnstile** — verified server-side when `TURNSTILE_SECRET_KEY` is set; the widget renders only when `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is set. Absent keys → the challenge is skipped (dev/local) so the form still works.

Enable full email privacy by setting `RESEND_API_KEY` (removes the `mailto:` fallback). The contact values are never logged.

## Architecture

- All copy lives in [`src/app/lib/data.ts`](src/app/lib/data.ts); components are presentational.
- Client components only where interactivity demands it: `NavBar`, `Terminal`, `Reveal`, `ContactForm` (React 19 `useActionState`). Everything else is server-rendered.
- Favicon comes from `src/app/icon.png` (the brand mark).
