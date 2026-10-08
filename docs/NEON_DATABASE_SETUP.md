# SKYWORTH Philippines — Neon PostgreSQL setup

Backend work branch: `feature/payload-neon`

## Keep the website safe

The public homepage and product catalog on `main` are unchanged.
Payload routes, the PostgreSQL adapter, dependencies and migrations are **not** active yet.

### Provision Neon database
1. Go to https://console.neon.tech and sign in with an authorized SKYWORTH account.
2. Create a new project named `skyworth-philippines`.
3. Choose region Singapore (`ap-southeast-1`) when available; use the region closest to the deployment host if not.
4. Name the database `skyworth_db`.
5. Open **Connect** and copy the connection string; for initial development a direct connection is fine.
6. Do not paste secrets into GitHub, a public issue or chat.

### Local-only configuration

Copy the following placeholders into a new local `.env.local` in the project root. Git ignores `.env*`.

```dotenv
DATABASE_URL="postgresql://USERNAME:PASSWORD@HOST/skyworth_db?sslmode=require"
PAYLOAD_SECRET="REPLACE_WITH_A_RANDOM_64_CHARACTER_SECRET"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

Do not check this file into version control. Do not commit a real password or secret to `.env.example`.

### Next development steps (after database exists)
1. Check compatibility: the current Next.js version is 16.4.0 and Node is 24.21.0. The current Payload installation guide requires TypeScript 6.0.3+; the repository currently uses TypeScript ^5, so upgrade TypeScript on this feature branch when installing Payload. Check whether cacheComponents / partialPrefetching should be disabled during integration, since Payload's cacheComponents compatibility is not yet guaranteed.
2. Install compatible `payload`, `@payloadcms/next`, `@payloadcms/db-postgres`, `@payloadcms/richtext-lexical`, and media dependencies.
3. Introduce separate `(frontend)` and `(payload)` route groups to avoid root layout conflicts; preserve existing routes and all homepage content.
4. Create protected Users and Media collections and model Products, Categories, News, Promotions, Dealers.
5. Configure `src/payload.config.ts` with `postgresAdapter({ pool: { connectionString: process.env.DATABASE_URL! } })`.
6. Create admin account locally under `/admin` when all services run.
7. Test staging product workflow before replacing demo catalog data.

## Key references

- https://neon.com/docs/get-started/connect-neon
- https://payloadcms.com/docs/getting-started/installation
- https://payloadcms.com/docs/database/postgres

### Project verification checkpoint
The linked Neon tools require a **Project ID** and do not provide a project-listing or project-creation action in this session. Finish creating the project in the Neon Console and find its project ID under Project Settings or in the console URL. Sharing the Project ID is OK; **never share the PostgreSQL connection string**. Once the ID is known, verify its branches and databases before creating any new database to avoid duplicates.
