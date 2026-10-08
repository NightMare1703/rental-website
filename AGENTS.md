# AGENTS.md

Laravel 13 (PHP ^8.3) + Inertia 3 + React 19 + TS + Tailwind 4 + shadcn. Not a monorepo (`pnpm-workspace.yaml` is a stub, `pnpm-lock.yaml` is stale).

## Package manager

Use `npm` — CI (`.github/workflows/tests.yml`) and `composer setup`/`composer dev` both use `npm i` / `npm run ...`. Do not switch to pnpm/yarn.

## Commands

```bash
composer setup          # install + key:generate + migrate + npm install + build
composer dev            # serve + queue:listen + vite, concurrently
composer test           # config:clear + pint --test + artisan test (Pest)
composer ci:check       # eslint:check + prettier:check + tsc + test
composer lint           # pint (PHP, preset laravel); check-only: composer lint:check

npm run dev / build / build:ssr
npm run lint            # eslint --fix | lint:check for check-only
npm run format          # prettier --write resources/ | format:check for check-only
npm run types:check     # tsc --noEmit
./vendor/bin/pest --filter=TestName        # single backend test
php artisan test --filter=TestName          # alternative single-test runner
```

- Frontend verification order: `lint:check -> format:check -> types:check`; full gate is `composer ci:check`.
- Tests use sqlite `:memory:` (`phpunit.xml`); default local DB is sqlite file. No external services needed.
- `tests/Pest.php`: `RefreshDatabase` is commented out — add `->use(RefreshDatabase::class)` per-file or enable explicitly when a test needs a DB.

## Architecture

- Entrypoints: `routes/web.php`, `bootstrap/app.php` (middleware wiring), `resources/js/app.tsx`, `resources/css/app.css`, `vite.config.ts` (laravel + inertia + react-compiler + tailwind + wayfinder plugins).
- Backend: `app/Http/Controllers/` (split `Admin/` vs user-facing + `Settings/`), `app/Models/` (Category, Item, ItemImage, Rental, Payment, Review, User, UserDetail), `app/Actions/Fortify/` (auth actions), `app/Policies/`, `app/Concerns/` (validation rules). Auth via Fortify; settings routes in `routes/settings.php`.
- Route groups in `routes/web.php`: `admin` prefix + `auth,admin,verified` middleware vs user `auth,verified,redirectAdmin`. Aliases `admin` / `redirectAdmin` defined in `bootstrap/app.php`.
- Frontend: `resources/js/pages/` (Inertia pages, auto layout in `app.tsx` by name prefix: `welcome` = none, `auth/` = AuthLayout, `settings/` = AppLayout+SettingsLayout), `components/` (`components/ui/*` = shadcn, don't restyle by hand), `layouts/`, `hooks/`, `lib/`. Path alias `@/*` → `resources/js/*` (`tsconfig.json`, `components.json` style `radix-nova`).
- Inertia layout is resolved centrally in `app.tsx` — don't wrap pages in layouts manually.

## Generated code — do not hand-edit

`resources/js/wayfinder/`, `resources/js/actions/`, `resources/js/routes/`, `resources/js/ziggy.js` (Wayfinder/Ziggy output, eslint-ignored). Regenerate via artisan/wayfinder commands instead of editing.

## Style quirks (enforced by eslint/pint)

- ESLint: `curly: all`, 1tbs braces (no single-line), blank lines around control statements (`if/return/for/while/do/switch/try/throw`), `import/order` (builtin→external→internal→parent→sibling, alphabetical) + `consistent-type-imports` (use `import type`).
- Prettier: single quotes, semicolons, 4-space tabs, `prettier-plugin-tailwindcss` (class order matters). Only formats `resources/`.
- React Compiler babel plugin is on — follow rules-of-hooks / no-mutation norms, `react-hooks/recommended-latest` is enforced.
