# BMB Centennial · 1926–2026

A multi-page event website for the Fresno State Bulldog Marching Band's 100-year
celebration. Heritage/commemorative aesthetic; designed to receive page
implementations from Claude Design handoff bundles.

## Stack

- [Next.js](https://nextjs.org) (App Router) · TypeScript · ESLint
- [Tailwind CSS](https://tailwindcss.com) v4 (CSS-first config via `@theme`)
- [Motion](https://motion.dev) (animation; formerly Framer Motion)
- [react-hook-form](https://react-hook-form.com) + [zod](https://zod.dev) +
  `@hookform/resolvers` (wired up as forms get added)

## Project layout

```
app/
  layout.tsx            shared Nav + Footer, font setup, metadata
  page.tsx              homepage placeholder
  globals.css           Tailwind import + design tokens (@theme)
  timeline/page.tsx     placeholder
  gallery/page.tsx      placeholder
  reunion/page.tsx      placeholder
components/
  Nav.tsx               shared top nav
  Footer.tsx            shared footer
  ui/                   shared primitives (empty — populated from design handoff)
lib/
  timeline.ts           typed Movement + Milestone data
  utils.ts              cn() Tailwind class-merge helper
public/
  photos/               archival photo directory
```

## Design tokens

Defined in [app/globals.css](app/globals.css) via Tailwind v4's `@theme` directive.

| Token              | Value     | Notes                                   |
| ------------------ | --------- | --------------------------------------- |
| `--color-cardinal` | `#CE0E2D` | also aliased as `primary`               |
| `--color-navy`    | `#003594` | also aliased as `secondary`             |
| `--color-cream`   | `#F4EFE2` | warm off-white; default page background |

Fonts are wired via `next/font` as CSS variables so families can be swapped to
match the final design output without touching component code:

| Variable        | Placeholder      | Use                        |
| --------------- | ---------------- | -------------------------- |
| `--font-serif`  | Playfair Display | weighty heritage headlines |
| `--font-sans`   | Inter            | body / UI                  |
| `--font-script` | Pinyon Script    | display logotype accents   |

## Local development

```bash
npm install
npm run dev
```

The dev server runs at <http://localhost:3000>. The four routes (`/`,
`/timeline`, `/gallery`, `/reunion`) all render placeholder content with the
shared Nav + Footer.

## Environment variables

Copy `.env.example` to `.env.local` when v2 features (Supabase-backed reunion
registration) come online. Nothing in the current scaffold reads env vars.

## Deployment

Auto-deploys to [Vercel](https://vercel.com) on `git push` to `main`. No build
configuration needed — Next.js is detected automatically.
