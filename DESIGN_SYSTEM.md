# Design System

This document describes the design system actually implemented in this repo — not an aspirational spec. Tokens live in [`src/app/globals.css`](src/app/globals.css); components are Next.js + Tailwind CSS v4.

## Principles

- **Engineering precision, web craft.** The visual identity leans on the same rigor as the site owner's mechatronics background: clean grids, deliberate spacing, no decorative clutter.
- **One accent, used sparingly.** A single cyan (`--accent`, no gradient) marks primary actions, active states, and small highlights; everything else stays neutral slate so the accent keeps its weight.
- **The hero is a fixed dark panel.** `--hero-bg` (and the footer, which mirrors it) is deliberately dark in both themes — it's the one surface that doesn't flip with light/dark, giving the site a consistent "control panel" anchor.
- **Light and dark are equally first-class.** Every token is defined in both `:root` and `.dark`; no component should hardcode a color that isn't a token.

## Color tokens

Defined in `src/app/globals.css`, switched via the `.dark` class (driven by `next-themes`, see `src/app/providers.tsx`).

| Token | Light | Dark | Use |
|---|---|---|---|
| `--background-primary` | `#ffffff` | `#0a0e0f` | Page background |
| `--background-secondary` | `#f1f5f9` | `#111827` | Section/card background |
| `--background-tertiary` | `#e2e8f0` | `#0d1317` | Nested surfaces (tags, skill cards) |
| `--text-primary` | `#0f172a` | `#f1f5f9` | Headings, primary text |
| `--text-secondary` | `#334155` | `#cbd5e1` | Body copy |
| `--text-muted` | `#64748b` | `#94a3b8` | Captions, descriptions |
| `--text-inverted` | `#ffffff` | `#0a0e0f` | Text/icons on filled accent surfaces |
| `--border-color` | `#cbd5e1` | `rgba(255,255,255,.14)` | Card/input borders |
| `--accent` | `#0891b2` (cyan-600) | `#22d3ee` (cyan-400) | Focus rings, links, active states, icon fills |
| `--accent-soft` | `rgba(8,145,178,.12)` | `rgba(34,211,238,.14)` | Badge/tag backgrounds, subtle glows |
| `--hero-bg` | `#0f172a` | `#0a0e0f` | Hero + footer panel — stays dark in both themes |

No gradients — the previous green→blue brand gradient has been replaced by a single solid cyan accent, used sparingly against neutral slate surfaces.

These are re-exposed as Tailwind theme colors in the `@theme` block (`bg-bg-primary`, `text-text-secondary`, `border-border-custom`, `text-accent`, `text-hero-bg`, etc.) — prefer the Tailwind utility over a raw `var()` when styling with class names; use the CSS variable directly in `globals.css` component rules.

## Radius scale

```
--radius-sm:   12px   /* icon chips, small buttons */
--radius-md:   24px   /* cards: project, skill, contact */
--radius-lg:   40px   /* section containers: skill-bx, footer top corners */
--radius-pill: 999px  /* tags, filter buttons, badges */
```

## Typography

- Font: **Centra** (self-hosted, `src/app/assets/fonts`), weights 700 (Bold) / 500 (Medium) / 400 (Book). Falls back to system sans-serif.
- Section heading (`h2`): `45px` / `700`, centered in section headers (`65px` in the hero, `38px` on mobile).
- Body copy: `18px` / `1.5` line-height, `var(--text-muted)`.
- Card titles (`h4`/`h5`): `17–22px` / `700`.
- Tags/badges: `12–13px` / `500`, uppercase not required.

## Spacing & layout

- Sections use the shared container: `container mx-auto px-6 xl:px-12`.
- Section vertical rhythm: hero `140px 0 100px`, standard sections `80px 0`.
- Breakpoints: Tailwind defaults (`sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px). Nav collapses to the mobile drawer below `lg`.

## Motion

- Standard transition: `0.3s ease-in-out` for hovers, theme toggle, filter buttons.
- Hover lift on cards: `transform: translateY(-4px)` (or `-3px` for contact cards) combined with `border-color: var(--accent)`.
- Hero image: gentle `updown` float keyframe, 3s linear infinite.

## Components

**Buttons / CTAs**
- Primary: bordered pill/rect with `border-text-primary`, fills solid on hover (see NavBar "Let's Connect", `.banner-cta`).
- Filter buttons (`.project-filter-btn`): pill-shaped, solid `--accent` fill + `--text-inverted` text when `.active`.

**Cards**
- `.skill-category`, `.project-card`, `.contact-card`: `var(--background-secondary)` surface, `1px solid var(--border-color)`, `var(--radius-md)`, hover → accent border + lift.
- Tag chips (`.skill-tag`, `.project-tag`): pill, `var(--background-tertiary)` fill, `var(--border-color)` border.

**Icon buttons**
- `.social-icon-btn` (NavBar): circular, icon in `currentColor` via `react-bootstrap-icons`, fills solid `--text-primary` on hover. `.footer-social a` (Footer, always on the dark `--hero-bg` panel): fills solid cyan (`#22d3ee`) on hover.

**Navigation**
- Fixed, transparent over the hero, gains a blurred `bg-bg-secondary/95` surface once scrolled (`NavBar.tsx`'s `scrolled` state).
- Mobile: full-height right-side drawer, same link set plus a theme toggle and CTA.

## Accessibility

- All interactive elements get a visible focus ring: `:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }` (global, in `globals.css`).
- Icon-only links carry a `sr-only` label (see NavBar/Footer social links).
- Color pairs (text on background) use the token pairs above, which meet WCAG AA contrast in both themes — don't introduce one-off colors outside this table without checking contrast.

## Content sections

`src/app/page.tsx` composes the page as: `NavBar → Banner → Skills → Projects → Contact → Footer`. Each section owns its own top-level class (`.banner`, `.skill`, `.project`, `.contact`, `.footer`) in `globals.css` for section-level background/padding; component-level rules use the shared card/tag/button patterns above rather than inventing new ones.
