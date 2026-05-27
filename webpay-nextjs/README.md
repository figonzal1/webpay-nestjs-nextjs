# webpay-nextjs

**Transbank Webpay Plus** integration frontend built with Next.js 16. Part of a monorepo with the NestJS backend in `../webpay-nestjs`.

## Stack

| Technology | Version |
|---|---|
| Next.js | 16.2.6 |
| React | 19.2.6 |
| Tailwind CSS | 4.x |
| TypeScript | 6.0.3 |
| pnpm | 11.4.0 |

## Prerequisites

- Node.js 22+
- pnpm 11.4.0 (via corepack — see below)
- NestJS backend running at `http://localhost:3000`

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
pnpm dev   # server at http://localhost:4000 with Turbopack
```

## Available scripts

```bash
pnpm dev           # dev with Turbopack (port 4000)
pnpm build         # production build
pnpm start         # serve production build (port 4000)

pnpm lint          # oxlint + eslint (order matters: oxlint first)
pnpm lint:fix      # auto-fix with both linters
pnpm format        # Prettier (write)
pnpm format:check  # Prettier (check only)
```

## Payment flow

```
1. /                  → Payment form (PaymentForm)
2. Server Action       → createTransaction(amount) → POST to NestJS backend
3. Backend             → Transbank SDK → { token, url }
4. Client              → Hidden form with token_ws → Redirect to Transbank
5. Transbank           → Redirects back to backend /webpay/commit
6. Backend             → Confirms and redirects to:
   /result/success     → Payment approved
   /result/error       → Payment rejected, cancelled, or timeout
```

## Routes

| Route | Description |
|---|---|
| `/` | Form to enter amount and start payment |
| `/result/success` | Payment confirmed page |
| `/result/error` | Payment failed or rejected page |

## Configuration

**`API_URL`** is set in `next.config.ts` (not `.env`). Change it there when pointing the backend to a different environment.

```ts
// next.config.ts
env: {
  API_URL: 'http://localhost:3000',
}
```

> Defaults to `http://localhost:3000` (local NestJS backend).

## Structure

```
src/app/
├── layout.tsx               # Root layout
├── page.tsx                 # Home page with payment form
├── globals.css              # Global styles and Tailwind v4 theme
├── actions.ts               # Server Action: createTransaction()
├── components/
│   └── PaymentForm.tsx      # Client-side form component
└── result/
    ├── success/page.tsx     # Successful payment result
    └── error/page.tsx       # Failed payment result
```

## Configuration notes

- **Tailwind v4**: no `tailwind.config.ts`. Theme customization lives in `globals.css` via `@theme {}` blocks.
- **ESLint flat config**: uses `eslint.config.mjs`, not `.eslintrc`.
- **Path alias**: `@/*` maps to `./src/*`.
