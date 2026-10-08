# SKYWORTH Philippines — Full-Stack Project Structure

One Next.js + TypeScript repository for the corporate website and its future Payload CMS backend.

## Current status
- FRONTEND: Next.js pages, navigation, and demo product catalog exist and run locally.
- BACKEND: Module folders are scaffolded, but Payload CMS, database, admin and API routes are NOT installed yet.
- DEPLOYMENT: Shopify and the existing production domain remain unchanged.

## Folder ownership

```text
skyworth-philippines/
├── public/
│   ├── images/
│   │   ├── banners/
│   │   ├── products/
│   │   ├── technologies/
│   │   └── corporate/
│   ├── videos/
│   └── brochures/
├── src/
│   ├── app/                      # Existing frontend routes; Payload routes added later
│   │   ├── page.tsx              # Home
│   │   ├── products/             # List and [slug] detail
│   │   ├── technologies/
│   │   ├── about/
│   │   ├── promotions/
│   │   ├── news/
│   │   ├── where-to-buy/
│   │   ├── support/
│   │   └── (payload)/            # Reserved for future Payload admin/API route group
│   ├── components/
│   │   ├── layout/               # Shared site header/footer
│   │   ├── home/                 # Home page sections
│   │   ├── products/             # Product cards, filters, comparison
│   │   ├── ui/                   # Shared buttons, inputs, modals
│   │   └── admin/                # Optional Payload UI extensions
│   ├── data/                     # Current DEMO content; CMS replaces it later
│   ├── types/                    # Shared frontend/backend data contracts
│   ├── collections/              # Future Payload: Products, Categories, Dealers, News, Promotions, Media, Users
│   ├── globals/                  # Future Payload: Site Settings, Homepage
│   ├── fields/                   # Shared Payload field definitions
│   ├── access/                   # Backend authorization rules
│   ├── hooks/                    # Future CMS lifecycle hooks
│   └── lib/
│       ├── server/               # Server-side CMS/data access helpers
│       └── seo/                  # Metadata and SEO helpers
├── docs/
│   ├── FULL_FILE_STRUCTURE.md
│   └── BACKEND_ROADMAP.md
├── .env.example
├── package.json
├── next.config.ts
└── tsconfig.json
```

## Important details
- Git does not track empty folders: README and .gitkeep files make the intended directories visible.
- Do not move existing `src/app` files until the Payload integration step, which may require a frontend route group with its own layout.
- Do not create `src/app/(payload)/api` routes manually before installing and configuring Payload. Payload owns its admin and API route handlers.
- Do not replace the current `src/data/products.ts` until real product content has been approved and a data adapter is ready.
- No direct checkout or shopping-cart backend is planned.
