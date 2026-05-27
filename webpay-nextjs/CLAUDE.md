# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next.js 16 frontend for Transbank WebPay Plus payment integration. Part of a monorepo with a sibling NestJS backend (`../webpay-nestjs`). This is a template/demo — not hardened for production.

## Commands

```bash
pnpm dev          # Start dev server on port 4000 with Turbopack
pnpm build        # Production build
pnpm start        # Serve production build on port 4000
pnpm lint         # Run oxlint then ESLint (order matters — oxlint runs first to avoid double-reporting)
pnpm lint:fix     # Auto-fix lint issues (both tools)
pnpm format       # Format all src files with Prettier
pnpm format:check # Dry-run Prettier check (no writes)
```

## Architecture

**App Router** (Next.js 13+), all routes under `src/app/`.

Payment flow:
1. `src/app/page.tsx` renders the payment form (`PaymentForm` client component)
2. Form calls the `crearTransaccion(amount)` server action (`src/app/actions.ts`)
3. Server action POSTs to the NestJS backend at `API_URL/webpay` → receives `{ token, url }`
4. Client auto-submits a hidden form with `token_ws` to Transbank's URL (full-page redirect)
5. Transbank redirects back to `/result/success` or `/result/error`

## Configuration

**`API_URL`** is set in `next.config.ts` (not `.env`). Change it there when pointing to a different backend environment.

**Tailwind v4**: No `tailwind.config.ts`. Theme customization lives in `src/app/globals.css` via `@theme {}` blocks. Do not create a Tailwind config file.

**ESLint flat config**: Uses `eslint.config.mjs` — not `.eslintrc`. React version is manually set to `"19"` in the config to work around an ESLint 10 breaking change.

**Path alias**: `@/*` maps to `./src/*`.

## Code Style

- **Prettier**: single quotes, trailing commas, 100-char line width, 2-space indent, semicolons — run `pnpm format` after edits
- **Commits**: Conventional Commits (`feat:`, `fix:`, `chore:`, `style:`, `docs:`, `refactor:`)
- **Language**: UI text and user-facing strings are in Spanish
