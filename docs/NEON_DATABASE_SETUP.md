# SKYWORTH Philippines — Singapore Neon PostgreSQL

## Verified project details

- Project: `skyworth-philippines-sg`
- Project ID: `sweet-wildflower-59714934`
- Region: **AWS Singapore (aws-ap-southeast-1)**
- PostgreSQL: **18**
- Default branch: `production` (ID: `br-hidden-lab-b30uw3ej`)
- Development branch: `development` (ID: `br-rough-math-b3weinrp`)
- Current database: `neondb`
- Database owner/role: `neondb_owner`

These are non-secret IDs. Never commit or share a real DATABASE_URL, role password, or PAYLOAD_SECRET.

## Get the development connection string

1. Open https://console.neon.tech/ and select the **skyworth-philippines-sg** project.
2. Click **Connect**.
3. Set **Branch = development** and **Database = neondb** (NOT the production branch).
4. Choose the connection string for a Node.js/PostgreSQL client. Prefer a direct connection for local setup.
5. Copy the connection string privately into `.env.local` at the root of the local Next.js project.

```dotenv
DATABASE_URL="postgresql://ROLE:PASSWORD@HOST/neondb?sslmode=require"
PAYLOAD_SECRET="GENERATE_A_LONG_RANDOM_SECRET_LOCALLY"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

The above values are examples only. `.env.local` is ignored by Git and must remain on the developer machine.

A safe local PowerShell command to create a cryptographic secret:

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Only use the output locally as PAYLOAD_SECRET; never paste it into chat or GitHub.

## Code safety

- The live Next.js prototype remains on GitHub `main` and is not modified by the database provisioning process.
- Backend work stays on `feature/payload-neon`.
- Current `src/data/products.ts` demo catalog remains until a tested Payload adapter is available.
- No changes to Shopify, domain, or SEO.
- Do NOT use production DB branch for local Payload schema push/migrations.

## Next implementation

1. Pull and switch to the backend feature branch only when working tree is clean.
2. Verify Next.js 16.4 + TypeScript + compatible Payload versions and app route layout structure.
3. Install Payload and packages for Postgres, Next.js, rich text editing, and image handling.
4. Configure `payload.config.ts`, public vs admin layouts, media/auth collections and /admin route.
5. Run local typecheck and production build before introducing live content.
6. Test a sample product; later switch frontend catalog reads from demo data to published CMS content.

References:
- https://payloadcms.com/docs/database/postgres
- https://payloadcms.com/docs/getting-started/installation
- https://neon.com/docs/get-started/connect-neon
