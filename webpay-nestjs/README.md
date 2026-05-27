# webpay-nestjs

**Transbank Webpay Plus** integration backend built with NestJS. Acts as a stateless HTTP proxy between the Next.js frontend and the Transbank API.

## Stack

| Technology | Version |
|---|---|
| NestJS | 11.x |
| TypeScript | 6.0.3 |
| Transbank SDK | 6.1.1 |
| pnpm | 11.4.0 |

## Prerequisites

- Node.js 22+
- pnpm 11.4.0 (via corepack — see below)

## Installation

> **Global prerequisite (once per machine):** Node.js 16.9+ ships with corepack. Run from any directory:
> ```bash
> corepack enable
> ```
> Corepack reads the `packageManager` field in `package.json` and automatically uses `pnpm@11.4.0`.

Install dependencies (run inside this folder):

```bash
pnpm install
```

## Development

```bash
pnpm start:dev   # server at http://localhost:3000 with hot-reload
```

## Available scripts

```bash
pnpm start:dev     # dev with hot-reload (port 3000)
pnpm build         # compile to dist/
pnpm start:prod    # run production build

pnpm lint          # oxlint + eslint (dual pass required)
pnpm lint:fix      # auto-fix with both linters
pnpm format        # Prettier (write)
pnpm format:check  # Prettier (check only)

pnpm test          # unit tests (Jest)
pnpm test:e2e      # E2E tests (supertest)
pnpm test:cov      # coverage report
```

## API

### `POST /webpay`

Creates a transaction in Transbank and returns the token and redirect URL.

**Body:**
```json
{ "amount": 5000 }
```

**Response:**
```json
{ "token": "...", "url": "https://webpay3gint.transbank.cl/..." }
```

### `GET /webpay/commit?token_ws=<token>`

Transbank callback after a successful payment. Confirms the transaction and redirects to the frontend.

### `POST /webpay/commit`

Transbank callback for payment timeout or cancellation. Redirects to the error page.

## Architecture

The application is a **stateless HTTP proxy** — no database. All payment state lives in the Transbank API.

```
Frontend (port 4000)
    │
    ▼  POST /webpay
Backend NestJS (port 3000)
    │
    ▼  Transbank SDK (integration/test mode)
Transbank API
    │
    ▼  GET or POST /webpay/commit
Backend NestJS
    │
    ▼  Redirects to /result/success or /result/error
Frontend (port 4000)
```

## Configuration

| Parameter | Value (dev) |
|---|---|
| Backend port | `3000` |
| Allowed CORS origin | `http://localhost:4000` |
| Transbank return URL | `http://localhost:3000/webpay/commit` |
| Transbank credentials | Integration mode (test) |

> These values are for local development only. For production, update `src/main.ts` and the Webpay service accordingly.

## Structure

```
src/
├── main.ts                        # Bootstrap, CORS, ValidationPipe
├── app.module.ts
├── app.controller.ts
├── app.service.ts
└── webpay/
    ├── webpay.module.ts
    ├── webpay.controller.ts       # /webpay and /webpay/commit endpoints
    ├── webpay.service.ts          # Transbank SDK logic
    ├── dto/
    │   └── create-webpay.dto.ts
    └── entities/
        └── webpay.entity.ts
```

## Linting

Requires a **dual pass**: oxlint first (fast, Rust-based), then ESLint (TypeScript-aware). Running only one misses checks.

```bash
pnpm lint   # oxlint + eslint sequentially
```
