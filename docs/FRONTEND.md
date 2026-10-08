# Arsitektur Frontend

React 19 + TypeScript + Inertia 3 + Tailwind 4 + shadcn (`radix-nova`).
Entrypoint: `resources/js/app.tsx`; CSS: `resources/css/app.css`;
alias `@/*` → `resources/js/*`.

## 1. Resolusi layout sentral (`app.tsx`)

Layout dipilih otomatis dari nama halaman — **jangan bungkus halaman manual**:

| Nama halaman | Layout |
|---|---|
| `welcome` | tanpa layout |
| `auth/*` | `AuthLayout` |
| `settings/*` | `AppLayout` + `SettingsLayout` |
| lainnya | `AppLayout` |

Global wrapper: `TooltipProvider` + `Toaster` (sonner); judul tab
`{title} - {VITE_APP_NAME}`; `initializeTheme()` untuk light/dark.

Varian layout tersedia: `layouts/app/` (header vs sidebar), `layouts/auth/`
(card/simple/split), `layouts/settings/layout.tsx`. Shell: `app-shell`,
`app-sidebar` + `nav-main`/`nav-user`, `app-header`, `breadcrumbs`.

## 2. Pola halaman tipis + komponen domain

Halaman di `pages/` hanya menyusun section dan meneruskan props;
tabel/form/dialog tinggal di `components/<domain>/`:

- `pages/admin/dashboard.tsx` + `pages/dashboard.tsx`, `pages/customers.tsx`
- `pages/admin/item/` (`item`, `create-item`, `edit-item`)
  ← `components/item/` (`items-table`, `action-item`, `create-item`, `pagination-items`)
- `pages/admin/rental/rental.tsx` ← `components/rental/` (`rentals-table`, `create-rental`)
- Kategori **tanpa halaman sendiri**: `components/category/`
  (`categories-table`, `create/edit-category`, `action-categories`)
  di-render lewat halaman item (lihat anomali di bawah).
- `components/customers/` (`customers-table`, `create-customer`, `dialog-edit-customer`)
  — yatim, belum ada route (lihat `docs/API_ROUTES.md`).
- `components/ui/*` = shadcn generated — **jangan restyle manual**,
  ubah via pola shadcn (cva/variant) bila perlu.

Anomali tercatat: `Admin\CategoryController@create` me-render `admin/item/item`;
`Rental.layout` (di `rental.tsx`) memakai properti statis `breadcrumbs`
sementara halaman lain mengandalkan layout sentral — seragamkan saat menyentuh file itu.

## 3. Data, form & navigasi

- Data turun sebagai props Inertia dari controller (ketik di `types/`:
  `item.ts`, `category.ts`, `itemImage.ts`, `paginatorItem.ts`, ...).
  Contoh: tipe `Item` membawa `category` + `images[]` yang terisi via eager load.
- Navigasi/links: `route()` (ziggy) + komponen `<Link>` Inertia;
  helper Wayfinder di `wayfinder/`, `actions/`, `routes/` adalah **generated —
  jangan edit manual**.
- Flash message: controller memakai `Inertia::flash('message', ...)` /
  redirect `with('success', ...)`; frontend menampilkannya via
  `hooks/use-flash-toast.ts` + `Toaster`.
- Pencarian/filter item memakai query string Inertia (`search`, `category`) +
  `withQueryString()` di paginasi — tiru pola ini untuk filter lain.

## 4. Hooks & util

`use-appearance` (tema), `use-mobile`/`use-mobile-navigation`,
`use-flash-toast`, `use-initials`, `use-clipboard`, `use-current-url`,
`use-two-factor-auth`; `lib/utils.ts` (`cn` = clsx + tailwind-merge).

## 5. Aturan main (dari eslint/prettier + compiler)

- `import type` untuk tipe; urutan import builtin → external → internal →
  parent → sibling (alfabetis).
- `curly: all`, brace 1tbs tanpa single-line, baris kosong di sekitar
  `if/return/for/while/do/switch/try/throw`.
- Prettier: single quote, semicolon, tab 4, plugin tailwind (urutan class
  otomatis — jangan "merapikan" manual).
- Babel `react-compiler` aktif: taati rules-of-hooks, jangan mutasi props/state;
  `react-hooks/recommended-latest` di-enforce.
- Catatan dari kode: beberapa halaman memakai `any[]` untuk props
  (mis. `rental.tsx`: `rentals: any[]`) padahal tipe domain sudah ada —
  ganti ke tipe `types/` saat menyentuh file tersebut.
