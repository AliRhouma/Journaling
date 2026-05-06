# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

### Doodle Journal (`artifacts/doodle-journal`)
- **Framework**: Next.js 15 (App Router, JavaScript, no TypeScript)
- **Preview path**: `/`
- **Port**: 24109
- **Type**: Clickable prototype — no database, no auth, no API calls
- **Mock data**: `data/mock.js`
- **Design system**: Doodle Design System (CSS variables in `app/globals.css`)
  - Fonts: Caveat (display), Patrick Hand (body), Reem Kufi Fun / Tajawal (RTL)
  - Colors: `--yellow: #F5C842`, grid-paper background, 2.5px black borders, offset shadows
  - RTL support via `[dir="rtl"]` CSS override + LangContext
- **Pages**: `/`, `/onboarding`, `/new`, `/entry/[id]`, `/mood`, `/calendar`, `/search`, `/insights`, `/lock`, `/settings`
- **Components**: `Button`, `Card`, `Badge`, `Input`, `Sidebar`, `PageHeader`, `LangSwitcher`
- **Language context**: `context/LangContext.js` — toggles `lang` and `dir` on `<html>`

### API Server (`artifacts/api-server`)
- **Preview path**: `/api`
- **Port**: 8080
- **Framework**: Express 5

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally
- `pnpm --filter @workspace/doodle-journal run dev` — run Doodle Journal locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
