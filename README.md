# Swasti Foundation — Website Frontend

Production-quality React frontend for Swasti Foundation, a registered trust
(est. 2020, Trust Reg. No. DL/2020/341) working in education, healthcare,
livelihood, and community welfare across India.

This is a **frontend-only** build. No backend, database, authentication, or
payment processing is implemented — every dynamic feature has a clearly
marked `TODO` placeholder ready for backend integration. See
`REQUIREMENTS_CHECKLIST.md` for a full requirements-to-implementation map.

## Tech stack

- React 19 + React Router 7
- Vite 8 (rolldown-powered build)
- Plain CSS with custom properties (design tokens in `src/styles/tokens.css`)
- No UI framework dependency — all components are hand-built and reusable

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # preview the production build locally
```

## Project structure

```
src/
  components/
    layout/      Header, Footer, WhatsApp button, page Layout wrapper
    sections/     Homepage sections (Hero, ImpactNumbers, FounderMessage, …)
    ui/           Reusable primitives (Button, Card, Section, icons, …)
  context/        ThemeContext (light/dark mode)
  i18n/           LanguageContext + en/hi locale files
  data/           orgData.js — single source of truth for all org content
  hooks/          useReveal (scroll animation), useCountUp (stat counters)
  pages/          One file per route
  styles/         Design tokens, global resets, shared form/page-hero styles
```

## Content source of truth

All organisational content (mission, programs, leadership, success stories,
impact stats, etc.) lives in `src/data/orgData.js`, sourced directly from
the project's requirements document. To update content, edit that file —
every page reads from it, so there's no content duplicated across components.

## Internationalization

English is the default language; Hindi is fully wired for UI chrome (nav,
buttons, form labels, etc.) via `src/i18n/`. To add a new language, create a
new locale file under `src/i18n/locales/` and register it in
`LanguageContext.jsx`.

## Theming

Light mode is the default; dark mode is available via the header toggle and
persists across sessions (localStorage). All colors are CSS custom
properties in `src/styles/tokens.css` — change the palette there, not in
individual components.

## Deployment (Cloudflare Pages)

This project is Cloudflare Pages-ready out of the box:

- `public/_redirects` handles SPA client-side routing
- No Node.js server dependency — `npm run build` produces a fully static
  `dist/` folder
- Route-based code splitting via `React.lazy` keeps the initial bundle small
- `.env.example` documents the environment variables a future backend
  integration (API base URL, Razorpay key, etc.) will need

To deploy: connect this repo to Cloudflare Pages, set the build command to
`npm run build` and the output directory to `dist`.

## What's intentionally not implemented

- Backend / database / CMS / authentication
- Payment gateway (Razorpay) — UI and dummy handlers are in place; wire in
  the real integration in `src/pages/DonatePage.jsx`
- Real images, videos, and documents — every media slot has a labeled
  placeholder and a `TODO` comment

See `REQUIREMENTS_CHECKLIST.md` for the complete list of what's done, what's
a faithful empty-state (matching the source requirements document), and
what's still outstanding before launch.
