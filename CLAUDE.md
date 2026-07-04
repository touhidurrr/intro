# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio site for Md. Touhidur Rahman, styled as an API reference document. The entire site is a single-page React app rendered as a sequence of "API endpoints" (GET /, GET /experience, GET /projects, GET /skills, POST /contact).

## Commands

```bash
bun install          # install dependencies
bun run dev          # start Vite dev server
bun run build        # type-check (tsc) + production build to dist/
bun run preview      # serve the production build locally
bun run format       # format all files with Prettier
```

No test suite is configured.

## Architecture

This is a minimal, flat project — four source files total:

- **`src/data.ts`** — Single source of truth for all site content: identity, stats, roles, projects, skills, and external links. Edit this file to update the site; no other file needs changing.
- **`src/App.tsx`** — All UI components in one file. The page is composed of `Header`, `Root` (hero), `Experience`, `Projects`, `Skills`, `Contact`, and `Footer`. Each section is styled to look like an HTTP endpoint response (method badge, path, JSON body).
- **`src/main.tsx`** — React entry point; mounts `<App />` into `#root`.
- **`src/index.css`** — Tailwind v4 import + design tokens (`@theme` block) and a custom `display` utility.

## Key Patterns

- **Content as data**: All text lives in `src/data.ts` exports (`identity`, `stats`, `roles`, `projects`, `skills`, `links`). Components import and render them — never inline content.
- **Tailwind v4**: Uses the new `@theme` directive for design tokens (colors, fonts). No `tailwind.config.js` — configuration lives in CSS.
- **React Compiler**: Enabled via `babel-plugin-react-compiler` through `@rolldown/plugin-babel` in `vite.config.ts`. Components are auto-memoized; manual `useMemo`/`useCallback` is unnecessary (the one `useMemo` in `highlightJson` is for a CPU-heavy tokenizer, not a render optimization).
- **Fonts**: Archivo (variable width axis `wdth` 62–125, used via `font-stretch: 72%` for condensed headlines) and JetBrains Mono. Loaded from Google Fonts in `index.html`.
- **Punycode**: The `useHostname` hook decodes the IDN domain (touhidur.bd) for display using the `punycode` package.
- **Live counter**: `useRequestTicker` uses `requestAnimationFrame` to animate a requests-served counter based on the constant `REQUESTS_PER_SECOND` (38 ≈ 100M/month).

## Tech Stack

React 19, TypeScript 6, Vite 8, Tailwind CSS 4, Bun (package manager).
