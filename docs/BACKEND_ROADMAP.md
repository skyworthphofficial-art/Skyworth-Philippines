# Backend Activation Plan

The folders in this commit are **structure only**. They do not make the backend functional.

## Phase A: Prepare a safe working branch
- Confirm a clean working tree and current working homepage.
- Review Payload/Next.js version compatibility and existing Next.js Cache Components configuration.
- Use a dedicated integration branch before changing the App Router root layout.

## Phase B: Install and configure Payload
- Install a compatible Payload CMS release with @payloadcms/next, @payloadcms/db-postgres, and required editor/media packages.
- Add the real root `payload.config.ts`, wrap `next.config.ts` using `withPayload`, and add `@payload-config` to `tsconfig.json`.
- Set `DATABASE_URL` and `PAYLOAD_SECRET` in local environment variables (never push secrets).
- Add the official `src/app/(payload)/` admin and API route handlers. If required, move public site routes into `src/app/(frontend)/` with a separate layout.

## Phase C: Content models
- Collections: Users, Media, ProductCategories, Products, Dealers, Promotions, News, Downloads.
- Globals: SiteSettings, Homepage.
- Authorization: public read for published content; authenticated, role-based content changes.
- Product fields: slug, series, model, category, size variants, images, features, specs, brochure, visibility and SEO.

## Phase D: Replace demo content safely
- Create server-side content access helpers in `src/lib/server`.
- Update catalog and detail pages to read published records from CMS.
- Preserve public slugs or create 301 redirects for old Shopify URLs.
- Keep unpublished content private.

## Phase E: Quality and deployment
- Run type-check, lint, and production build.
- Test authentication, permissions, media uploads, validation, accessibility, speed and SEO.
- Verify staging analytics, redirects, sitemap and robots rules before switching DNS.
- Keep Shopify and the existing domain untouched until migration approval.

No payment or checkout services are part of this plan.
