# Struktur Folder & File

Hasil pemetaan aktual repo. Tanda: ⚠️ stub/yatim · ✨ generated (jangan edit manual).

```text
rental-website/
├── app/
│   ├── Actions/Fortify/          # CreateNewUser, ResetUserPassword (auth)
│   ├── Concerns/                 # PasswordValidationRules, ProfileValidationRules
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Admin/            # Category, Dashboard, Item, Rental (rute /admin/*)
│   │   │   ├── Settings/         # Profile, Security
│   │   │   ├── Controller.php    # base controller
│   │   │   ├── UserController.php
│   │   │   └── ⚠️ ItemImage/Payment/Review/UserDetailController.php  # tanpa route
│   │   ├── Middleware/           # AdminMiddleware, RedirectAdminMiddleware,
│   │   │                         # HandleInertiaRequests, HandleAppearance
│   │   └── Requests/             # Store*/Update* per model (⚠️ rules() masih kosong)
│   │       └── Settings/         # Profile/Password/2FA requests
│   ├── Models/                   # Category, Item, ItemImage, Rental,
│   │                             # Payment, Review, User, UserDetail
│   ├── Policies/                 # ⚠️ semua masih return false
│   └── Providers/                # App, Fortify
├── bootstrap/app.php             # wiring middleware (alias admin/redirectAdmin)
├── config/                       # app, auth, database, fortify, inertia, ...
├── database/
│   ├── migrations/               # users, categories, items, item_images,
│   │                             # rentals (+quantity), payments, reviews, user_details
│   ├── factories/                # ⚠️ sebagian besar masih kosong
│   ├── seeders/                  # DatabaseSeeder (2 user: admin + user)
│   └── database.sqlite           # DB lokal default
├── docs/                         # PRD, DATABASE, ROADMAP, API_ROUTES,
│                                 # FRONTEND, STRUKTUR (file ini)
├── resources/
│   ├── css/app.css               # entry CSS (Tailwind 4)
│   ├── js/
│   │   ├── app.tsx               # entry JS: layout sentral + provider global
│   │   ├── pages/                # halaman Inertia (tipis, tanpa layout manual)
│   │   │   ├── welcome.tsx, dashboard.tsx, customers.tsx (⚠️ yatim, tanpa route)
│   │   │   ├── admin/dashboard.tsx, admin/item/*, admin/rental/*
│   │   │   ├── auth/*            # login/register/2FA/verify/...
│   │   │   └── settings/*        # profile/security/appearance
│   │   ├── components/
│   │   │   ├── ui/*              # ✨ shadcn (jangan restyle manual)
│   │   │   ├── category/ item/ rental/ customers/  # tabel + form per domain
│   │   │   └── *.tsx             # app-shell/sidebar/header, nav-*, breadcrumbs, ...
│   │   ├── layouts/              # app/ (header|sidebar), auth/ (card|simple|split),
│   │   │                         # settings/, app-layout.tsx, auth-layout.tsx
│   │   ├── hooks/                # use-flash-toast, use-appearance, use-mobile, ...
│   │   ├── lib/utils.ts          # cn() = clsx + tailwind-merge
│   │   ├── types/                # item, category, itemImage, paginatorItem, ...
│   │   └── ✨ actions/ routes/ wayfinder/ ziggy.js  # output generator (jangan edit)
│   └── views/                    # blade minimal (root Inertia)
├── routes/
│   ├── web.php                   # / (welcome), grup admin, grup user, dashboard
│   ├── settings.php              # settings/* (profile/security/appearance)
│   └── console.php
├── tests/
│   ├── Pest.php                  # ⚠️ RefreshDatabase dikomentari
│   ├── Feature/Auth/*, Feature/Settings/*, Feature/DashboardTest.php
│   └── Unit/ExampleTest.php
├── .github/workflows/           # tests.yml (pest, php 8.3–8.5) + lint.yml (pint/prettier/eslint)
├── AGENTS.md                     # instruksi kerja agen
├── composer.json / package.json  # perintah: composer dev|setup|test|ci:check, npm run ...
├── vite.config.ts                # laravel + inertia + react-compiler + tailwind + wayfinder
├── tsconfig.json                 # alias @/* → resources/js/*
├── eslint.config.js / .prettierrc / pint.json / components.json
└── .env.example / phpunit.xml    # sqlite default; test pakai :memory:
```

## Petunjuk baca

- Alur request: `routes/*` → `Http/Controllers/*` (+ `Requests` validasi) →
  `Models/*` → Inertia `pages/*` (+ `components/<domain>/*`) dalam `layouts/*`.
- Otorisasi: middleware `admin` / `redirectAdmin` (lihat `bootstrap/app.php`);
  Policy belum aktif.
- Detail tiap area: `docs/PRD.md` (produk), `docs/DATABASE.md` (skema),
  `docs/API_ROUTES.md` (kontrak route), `docs/FRONTEND.md` (pola UI),
  `docs/ROADMAP.md` (status stub vs jalan).
