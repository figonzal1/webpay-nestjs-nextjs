# webpay-nestjs-nextjs

Demo integration of **Transbank Webpay Plus** using a monorepo with NestJS as the backend and Next.js as the frontend.

> Demo project using integration-mode (test) credentials. Not suitable for production without proper security hardening.

## Monorepo structure

```
webpay-nestjs-nextjs/
├── webpay-nestjs/   # Backend — HTTP proxy to the Transbank API
└── webpay-nextjs/   # Frontend — payment form and result pages
```

## Prerequisites

- Node.js 22+
- pnpm 11.4.0 (managed by corepack)

## Quick start

**1. Enable pnpm via corepack (once per machine):**

Node.js 16.9+ ships with corepack. Run from any directory:

```bash
corepack enable
```

Corepack reads the `"packageManager"` field in each `package.json` and automatically downloads `pnpm@11.4.0` when you invoke `pnpm`.

**2. Install dependencies in each project:**

```bash
cd webpay-nestjs
pnpm install

cd ../webpay-nextjs
pnpm install
```

**3. Start both services in separate terminals:**

```bash
# Terminal 1 — Backend (port 3000)
cd webpay-nestjs
pnpm start:dev

# Terminal 2 — Frontend (port 4000)
cd webpay-nextjs
pnpm dev
```

Open [http://localhost:4000](http://localhost:4000) in your browser.

## Payment flow

```
User enters amount
    │
    ▼
Next.js Server Action → POST http://localhost:3000/webpay
    │
    ▼
NestJS → Transbank SDK (integration/test mode)
    │
    ▼ { token, url }
Next.js → Redirects to Transbank's payment form
    │
    ▼ (payment in Transbank sandbox)
GET/POST http://localhost:3000/webpay/commit
    │
    ▼
NestJS confirms transaction → Redirects to Next.js
    │
    ├── /result/success  (approved)
    └── /result/error    (rejected / timeout)
```

## Ports

| Service | Port | URL |
|---|---|---|
| Backend (NestJS) | 3000 | http://localhost:3000 |
| Frontend (Next.js) | 4000 | http://localhost:4000 |

## Tech stack

| | Backend | Frontend |
|---|---|---|
| Framework | NestJS 11 | Next.js 16 |
| Language | TypeScript 6 | TypeScript 6 |
| Runtime | Node.js 22+ | Node.js 22+ |
| UI | — | React 19, Tailwind v4 |
| Payments | Transbank SDK 6.1.1 | — |
| Package manager | pnpm 11.4.0 | pnpm 11.4.0 |
| Linting | oxlint + ESLint 10 | oxlint + ESLint 10 |
| Formatting | Prettier | Prettier |

## Test cards (integration environment)

### Credit

| Type | Number | CVV | Expiry | Result |
|---|---|---|---|---|
| VISA | 4051 8856 0044 6623 | 123 | Any future date | Approved |
| AMEX | 3700 0000 0002 032 | 1234 | Any future date | Approved |
| MASTERCARD | 5186 0595 5959 0568 | 123 | Any future date | Rejected |

### Debit (Redcompra)

| Number | Result |
|---|---|
| 4051 8842 3993 7763 | Approved |
| 4511 3466 6003 7060 | Approved |
| 5186 0085 4123 3829 | Rejected |

### Prepaid

| Type | Number | CVV | Result |
|---|---|---|---|
| VISA | 4051 8860 0005 6590 | 123 | Approved |
| MASTERCARD | 5186 1741 1062 9480 | 123 | Rejected |

### Authentication

When the RUT and password form appears on the Transbank portal:

- **RUT:** 11.111.111-1
- **Password:** 123

## Project documentation

- [webpay-nestjs/README.md](./webpay-nestjs/README.md) — commands, API endpoints, backend architecture
- [webpay-nextjs/README.md](./webpay-nextjs/README.md) — commands, routes, frontend configuration
