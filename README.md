# webpay-nestjs-nextjs

Ejemplo de integración de **Transbank Webpay Plus** usando un monorepo con NestJS como backend y Next.js como frontend.

> Proyecto de demostración con credenciales de integración (modo test). No apto para producción sin los ajustes de seguridad correspondientes.

## Estructura del monorepo

```
webpay-nestjs-nextjs/
├── webpay-nestjs/   # Backend — proxy HTTP hacia la API de Transbank
└── webpay-nextjs/   # Frontend — formulario de pago y páginas de resultado
```

## Requisitos previos

- Node.js 22+
- pnpm 11.4.0 (gestionado por corepack)

## Inicio rápido

**1. Activar pnpm con corepack (una sola vez por máquina):**

Node.js 16.9+ incluye corepack. Ejecutar desde cualquier directorio:

```bash
corepack enable
```

Corepack detecta el campo `"packageManager"` en cada `package.json` y descarga `pnpm@11.4.0` automáticamente al invocar `pnpm`.

**2. Instalar dependencias en cada proyecto:**

```bash
cd webpay-nestjs
pnpm install

cd ../webpay-nextjs
pnpm install
```

Levantar backend y frontend en terminales separadas:

```bash
# Terminal 1 — Backend (puerto 3000)
cd webpay-nestjs
pnpm start:dev

# Terminal 2 — Frontend (puerto 4000)
cd webpay-nextjs
pnpm dev
```

Abrir [http://localhost:4000](http://localhost:4000) en el navegador.

## Flujo de pago

```
Usuario ingresa monto
    │
    ▼
Next.js Server Action → POST http://localhost:3000/webpay
    │
    ▼
NestJS → Transbank SDK (integración/test)
    │                                   
    ▼ { token, url }                    
Next.js → Redirige al formulario de Transbank
    │
    ▼ (pago en sandbox de Transbank)
GET/POST http://localhost:3000/webpay/commit
    │
    ▼
NestJS confirma transacción → Redirige a Next.js
    │
    ├── /result/success  (pago aprobado)
    └── /result/error    (rechazado / timeout)
```

## Puertos

| Servicio | Puerto | URL |
|---|---|---|
| Backend (NestJS) | 3000 | http://localhost:3000 |
| Frontend (Next.js) | 4000 | http://localhost:4000 |

## Tecnologías

| | Backend | Frontend |
|---|---|---|
| Framework | NestJS 11 | Next.js 16 |
| Lenguaje | TypeScript 6 | TypeScript 6 |
| Runtime | Node.js 22+ | Node.js 22+ |
| UI | — | React 19, Tailwind v4 |
| Pago | Transbank SDK 6.1.1 | — |
| Package manager | pnpm 11.4.0 | pnpm 11.4.0 |
| Linting | oxlint + ESLint 10 | oxlint + ESLint 10 |
| Formato | Prettier | Prettier |

## Documentación por proyecto

- [webpay-nestjs/README.md](./webpay-nestjs/README.md) — comandos, API, arquitectura del backend
- [webpay-nextjs/README.md](./webpay-nextjs/README.md) — comandos, rutas, configuración del frontend
