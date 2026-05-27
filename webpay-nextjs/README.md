# webpay-nextjs

Frontend de integración con **Transbank Webpay Plus** construido con Next.js 16. Parte de un monorepo con el backend NestJS en `../webpay-nestjs`.

## Stack

| Tecnología | Versión |
|---|---|
| Next.js | 16.2.6 |
| React | 19.2.6 |
| Tailwind CSS | 4.x |
| TypeScript | 6.0.3 |
| pnpm | 11.4.0 |

## Requisitos previos

- Node.js 22+
- pnpm 11.4.0 (via corepack — ver más abajo)
- Backend NestJS corriendo en `http://localhost:3000`

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
pnpm dev   # servidor en http://localhost:4000 con Turbopack
```

## Scripts disponibles

```bash
pnpm dev           # dev con Turbopack (puerto 4000)
pnpm build         # build de producción
pnpm start         # servir build de producción (puerto 4000)

pnpm lint          # oxlint + eslint (orden importa: oxlint primero)
pnpm lint:fix      # auto-fix con ambos linters
pnpm format        # Prettier (escribe)
pnpm format:check  # Prettier (solo verifica)
```

## Flujo de pago

```
1. /                 → Formulario de pago (PaymentForm)
2. Server Action      → crearTransaccion(amount) → POST al backend NestJS
3. Backend            → Transbank SDK → { token, url }
4. Cliente            → Formulario oculto con token_ws → Redirección a Transbank
5. Transbank          → Redirige de vuelta al backend /webpay/commit
6. Backend            → Confirma y redirige a:
   /result/success    → Pago aprobado
   /result/error      → Pago rechazado, anulado o timeout
```

## Rutas

| Ruta | Descripción |
|---|---|
| `/` | Formulario para ingresar monto e iniciar el pago |
| `/result/success` | Página de confirmación de pago exitoso |
| `/result/error` | Página de error o pago rechazado |

## Configuración

**`API_URL`** se define en `next.config.ts` (no en `.env`). Cambiar ahí cuando el backend apunte a otro entorno.

```ts
// next.config.ts
env: {
  API_URL: 'http://localhost:3000',
}
```

> Por defecto apunta a `http://localhost:3000` (backend NestJS local).

## Estructura

```
src/app/
├── layout.tsx               # Layout raíz
├── page.tsx                 # Página principal con formulario
├── globals.css              # Estilos globales y tema Tailwind v4
├── actions.ts               # Server Action: crearTransaccion()
├── components/
│   └── PaymentForm.tsx      # Componente cliente del formulario
└── result/
    ├── success/page.tsx     # Resultado pago exitoso
    └── error/page.tsx       # Resultado pago fallido
```

## Notas de configuración

- **Tailwind v4**: no hay `tailwind.config.ts`. La personalización del tema vive en `globals.css` con bloques `@theme {}`.
- **ESLint flat config**: usa `eslint.config.mjs`, no `.eslintrc`.
- **Path alias**: `@/*` apunta a `./src/*`.
- **Textos en español**: toda la UI está en español.
