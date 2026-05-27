# webpay-nestjs

Backend de integración con **Transbank Webpay Plus** construido con NestJS. Actúa como proxy HTTP sin estado entre el frontend Next.js y la API de Transbank.

## Stack

| Tecnología | Versión |
|---|---|
| NestJS | 11.x |
| TypeScript | 6.0.3 |
| Transbank SDK | 6.1.1 |
| pnpm | 11.4.0 |

## Requisitos previos

- Node.js 22+
- pnpm 11.4.0 (via corepack — ver más abajo)

## Instalación

> **Prerequisito global (una sola vez por máquina):** Node.js 16.9+ incluye corepack. Ejecutar desde cualquier directorio:
> ```bash
> corepack enable
> ```
> Corepack leerá el campo `packageManager` del `package.json` y usará automáticamente `pnpm@11.4.0`.

Instalar dependencias (ejecutar dentro de esta carpeta):

```bash
pnpm install
```

## Desarrollo

```bash
pnpm start:dev   # servidor en http://localhost:3000 con hot-reload
```

## Scripts disponibles

```bash
pnpm start:dev     # dev con hot-reload (puerto 3000)
pnpm build         # compilar a dist/
pnpm start:prod    # ejecutar build de producción

pnpm lint          # oxlint + eslint (doble pasada requerida)
pnpm lint:fix      # auto-fix con ambos linters
pnpm format        # Prettier (escribe)
pnpm format:check  # Prettier (solo verifica)

pnpm test          # tests unitarios (Jest)
pnpm test:e2e      # tests E2E (supertest)
pnpm test:cov      # reporte de cobertura
```

## API

### `POST /webpay`

Crea una transacción en Transbank y retorna el token y la URL de redirección.

**Body:**
```json
{ "amount": 5000 }
```

**Respuesta:**
```json
{ "token": "...", "url": "https://webpay3gint.transbank.cl/..." }
```

### `GET /webpay/commit?token_ws=<token>`

Callback de Transbank tras el pago exitoso. Confirma la transacción y redirige al frontend.

### `POST /webpay/commit`

Callback de Transbank para timeout o anulación del pago. Redirige a la página de error.

## Arquitectura

La aplicación es un **proxy HTTP sin estado** — no usa base de datos. Todo el estado de pago reside en la API de Transbank.

```
Frontend (puerto 4000)
    │
    ▼  POST /webpay
Backend NestJS (puerto 3000)
    │
    ▼  Transbank SDK (modo integración/test)
API Transbank
    │
    ▼  GET o POST /webpay/commit
Backend NestJS
    │
    ▼  Redirige a /result/success o /result/error
Frontend (puerto 4000)
```

## Configuración

| Parámetro | Valor (dev) |
|---|---|
| Puerto backend | `3000` |
| CORS permitido | `http://localhost:4000` |
| URL de retorno Transbank | `http://localhost:3000/webpay/commit` |
| Credenciales Transbank | Modo integración (test) |

> Estos valores son solo para desarrollo local. Para producción se deben actualizar en `src/main.ts` y en el servicio de Webpay.

## Estructura

```
src/
├── main.ts                        # Bootstrap, CORS, ValidationPipe
├── app.module.ts
├── app.controller.ts
├── app.service.ts
└── webpay/
    ├── webpay.module.ts
    ├── webpay.controller.ts       # Endpoints /webpay y /webpay/commit
    ├── webpay.service.ts          # Lógica con Transbank SDK
    ├── dto/
    │   └── create-webpay.dto.ts
    └── entities/
        └── webpay.entity.ts
```

## Linting

Requiere **doble pasada**: oxlint primero (rápido, basado en Rust), luego ESLint (análisis TypeScript). Ejecutar solo uno deja checos sin cubrir.

```bash
pnpm lint   # oxlint + eslint secuencialmente
```
