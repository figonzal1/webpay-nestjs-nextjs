# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Package Manager

Use **pnpm** exclusively (pnpm@11.4.0). Do not use npm or yarn.

```bash
pnpm install
pnpm start:dev     # dev server on port 3000
pnpm build         # compile to dist/
pnpm start:prod    # run compiled output
```

## Linting & Formatting

Linting requires a **dual pass** — oxlint runs first (fast, Rust-based), then ESLint (TypeScript-aware). Running only one misses checks.

```bash
pnpm lint          # oxlint + eslint sequentially (required for full check)
pnpm lint:fix      # auto-fix with both linters
pnpm format        # Prettier write
pnpm format:check  # Prettier check only
```

Prettier config: single quotes, trailing commas everywhere, `printWidth: 100`, 2-space indent, semicolons.

## Testing

```bash
pnpm test          # Jest unit tests (src/**/*.spec.ts)
pnpm test:e2e      # E2E tests (test/**/*.e2e-spec.ts, supertest)
pnpm test:cov      # coverage report
```

Unit test stubs for `webpay.controller.spec.ts` and `webpay.service.spec.ts` are intentionally minimal — expand only when needed.

## Architecture

This is a **stateless HTTP proxy** to the Transbank Webpay Plus API — no database. All payment state lives in Transbank's API. The app:
1. Creates a transaction (`POST /webpay`) → returns token + redirect URL
2. Receives callback from Transbank (`GET /webpay/commit?token_ws=...` or `POST /webpay/commit` for timeout/abort)
3. Commits transaction and redirects to frontend result page

## CORS & Ports

- Backend: port **3000**
- Frontend (Next.js): port **4000** — CORS origin is hardcoded to `http://localhost:4000` in `src/main.ts`
- Transbank return URL is hardcoded to `http://localhost:3000/webpay/commit`

These are dev-only values. The app uses Transbank integration-mode (test) credentials.

## TypeScript

Experimental decorators and `emitDecoratorMetadata` are enabled (NestJS requirement). `strictNullChecks` and `noImplicitAny` are disabled by design — do not enable them without a full codebase audit.

## Git Conventions

Follow Conventional Commits: `feat:`, `fix:`, `chore:`, `style:`, `refactor:`, `test:`, `update:`, `docs:`. Branch names use the same prefixes (e.g., `feat/add-logging`, `fix/cors-origin`).
