# Payload CMS — Activate on local development branch

This branch contains the Payload route groups, content collections and PostgreSQL configuration. The main branch and existing Shopify website are untouched.

## Before pulling
Verify `git status` reports a clean working tree on `feature/payload-neon`.

## 1. Install dependencies (PowerShell)
```powershell
git pull origin feature/payload-neon
npm.cmd install payload @payloadcms/next @payloadcms/db-postgres @payloadcms/richtext-lexical sharp
npm.cmd install -D "typescript@^6.0.3"
```
This updates `package.json` and `package-lock.json` on your computer. Commit both after you verify startup.

## 2. Confirm private variables
Your local `.env.local` must contain:
- DATABASE_URL — Neon Singapore **development** branch `br-rough-math-b3weinrp`, database `neondb`.
- PAYLOAD_SECRET — 64-character random hex secret.
- NEXT_PUBLIC_SITE_URL — `http://localhost:3000`

Do not paste these values into chat or commit `.env.local`.

To verify variable keys only (no values) in PowerShell:
```powershell
$names = Get-Content .env.local | Where-Object { $_ -match '^\s*[A-Z_]+\s*=' } | ForEach-Object { ($_ -split '=',2)[0].Trim() }
'DATABASE_URL','PAYLOAD_SECRET' | ForEach-Object { "$_: $($_ -in $names)" }
```

## 3. Generate admin import map and run
```powershell
npx.cmd payload generate:importmap
npm.cmd run dev
```
Open `http://localhost:3000/admin` and create the **first admin user**. Add a sample category and product. Use only the development database branch. Note: Payload may create database tables on initial dev startup.

## 4. Verify the homepage
Check `http://localhost:3000`, `/products` and `/admin`. Existing public product pages still read `src/data/products.ts`. No customer checkout exists.

## 5. Build and commit after local testing
Stop dev server with Ctrl+C, then:
```powershell
npx.cmd tsc --noEmit
npm.cmd run lint
npm.cmd run build
git status
git add package.json package-lock.json src/app/\(payload\)/admin/importMap.js
git commit -m "Install Payload CMS and PostgreSQL dependencies"
git push
```
Note: In PowerShell quote paths containing parentheses, or use `git add package.json package-lock.json` and add any generated import-map changes separately. Don't commit `.env.local`.

## Media hosting
The starter Media collection uses local file storage in development. Configure cloud media storage before deploying to Vercel or production, where filesystem writes are ephemeral.

## Compatibility
Payload currently requires Node 24.15+, Next 16.4+ and TypeScript 6.0.3+. The previous Next cacheComponents option was disabled on this development branch because full Payload compatibility isn't guaranteed.

Sources:
https://payloadcms.com/docs/getting-started/installation
https://payloadcms.com/docs/database/postgres
