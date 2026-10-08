# SKYWORTH Philippines — Approved Tech Stack

Decision made on 2026-10-08.

## Core frontend (already running)
- Next.js 16 + React + TypeScript
- Tailwind CSS 4
- GitHub source control
- No Shopify dependency
- Corporate website + product catalog. No checkout.

## GSAP — Optional
Use when a major product story benefits from scroll-driven animations. Do not add GSAP as a required package just for hover effects; use CSS/Tailwind initially. Avoid unnecessary animation for accessibility and page speed.

## Payload CMS — Approved for integration
Payload will become the protected admin area for SKYWORTH product content. This does **not** provide online payments or a store checkout.
- Admin CRUD for products, images, specs, categories, brochures, news, promotions and dealer information
- Payload's Next.js API routes, permissions and editorial publishing workflow
- PostgreSQL database adapter (must provision a database first)
- Existing storefront demo product data remains active until the CMS has been configured and tested.

## Activation checklist
1. Choose a database: managed PostgreSQL (recommended) or local PostgreSQL for development.
2. Set up the database account outside GitHub; save the connection string in local `.env.local`, never commit it.
3. Create a feature branch for Payload and verify compatible dependency versions for Next.js 16.4.
4. Install `payload`, `@payloadcms/next`, `@payloadcms/db-postgres`, and required editor / media packages.
5. Add `src/payload.config.ts`, collections, authentication, the official `src/app/(payload)` routes and `withPayload`.
6. Split the existing frontend and Payload root layouts into separate route groups as needed.
7. Create first admin account at `/admin`; test adding and publishing a sample product.
8. Connect product pages to published CMS data.
9. Review security, image storage, staging SEO and migration redirects.

## Current status
Payload is APPROVED, **not yet installed or connected**. GSAP is optional and **not installed**. Frontend remains unchanged. Do not attempt `/admin` until the backend activation steps are complete.

References:
- https://payloadcms.com/docs/getting-started/installation
- https://payloadcms.com/docs/database/postgres
