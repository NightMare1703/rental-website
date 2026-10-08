# API / Route Contract

Aplikasi ini Inertia-first: tidak ada API JSON publik. "Kontrak" = route web +
props Inertia yang dikirim controller. Sumber: `routes/web.php`,
`routes/settings.php`, controller terkait.

## 1. Route aktual

### Publik
| Method | Path | Nama | Controller / target |
|---|---|---|---|
| GET | `/` | `home` | Inertia `welcome` (+ `canRegister`) |
| GET | `/up` | — | Health check Laravel |

Auth (Fortify): register/login/reset/2FA/verify-email — halaman di `pages/auth/*`.

### Admin (`auth, admin, verified`, prefix `admin`, nama `admin.*`)
| Method | Path | Nama | Implementasi |
|---|---|---|---|
| GET | `/admin/dashboard` | `admin.dashboard` | `Admin\DashboardController@index` → `admin/dashboard` (props: `users`) |
| Resource | `/admin/category` | `admin.category.*` | ⚠️ menyimpang: `index()` **kosong**, `create()` me-render `admin/item/item` (bukan halaman kategori); `store()` validasi inline; sisanya kosong |
| Resource | `/admin/item` | `admin.item.*` | `index` (search + filter kategori + paginasi 10), `create`, `store` (validasi lengkap + upload ≤ 5 foto) → `admin/item/*`; `show/edit/update/destroy` kosong |
| Resource | `/admin/rental` | `admin.rental.*` | `index` (with user/item/payment) → `admin/rental/rental`; `create` (+ items) ; `store` validasi **rusak** (lihat §3); `show/edit/update/destroy` kosong |

### User (`auth, verified, redirectAdmin`)
| Method | Path | Nama | Implementasi |
|---|---|---|---|
| GET | `/dashboard` | `dashboard` | `UserController@indexDashboard` → `dashboard` (props: `users`) |

`UserController@index/create` (`customers`, `customers/create-customer`) ada tapi
**tidak punya route** — halaman `customers.tsx` yatim.

### Settings (`routes/settings.php`)
| Method | Path | Nama |
|---|---|---|
| GET redirect | `settings` → `/settings/profile` | — |
| GET/PATCH | `settings/profile` | `profile.edit/update` |
| DELETE | `settings/profile` | `profile.destroy` (perlu `verified`) |
| GET | `settings/security` | `security.edit` |
| PUT (throttle 6/menit) | `settings/password` | `user-password.update` |
| Inertia | `settings/appearance` | `appearance.edit` |

## 2. Controller tanpa route (stub — perlu di-wire atau dihapus)

`ItemImageController`, `PaymentController`, `ReviewController`,
`UserDetailController` — file lengkap ada di `app/Http/Controllers/`
tetapi tidak direferensikan route mana pun.

## 3. Peringatan kontrak (bug yang memengaruhi integrasi)

1. `Admin\RentalController@store` memanggil `$request->validated([...])` dengan
   array aturan sebagai argumen. Tanda tangan `validated($key = null, $default)` —
   array itu diperlakukan sebagai *key*, bukan rules; karena
   `StoreRentalRequest::rules()` kosong, praktis **tidak ada validasi** dan data
   yang disimpan tidak terjamin. Frontend tidak boleh mengandalkan kontrak ini.
2. Harga (`total_price`, `price_per_day`, `total_days`) diterima dari request —
   client bisa memanipulasi total. Perbaikan: hitung ulang di server.
3. Semua `FormRequest::rules()` kosong; `StorePaymentRequest::authorize() = false`
   (selalu 403 bila dipakai).
4. Semua Policy `false` — jangan pasang `can:` middleware dengan asumsi policy
   sudah benar sebelum diperbaiki.

## 4. Regenerasi route helper frontend

`resources/js/wayfinder/*`, `resources/js/actions/*`, `resources/js/routes/*`,
`resources/js/ziggy.js` adalah output generator — jangan edit manual.
Setelah menambah/mengubah route Laravel, regenerasi via perintah
artisan/wayfinder lalu pakai `route('admin.rental.index')` di frontend.
