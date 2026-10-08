# PRD — Website Rental

Dokumen kebutuhan produk untuk aplikasi penyewaan barang (Laravel 13 + Inertia + React).
Status implementasi mengacu pada kondisi kode saat ini, bukan target.

## 1. Visi & Tujuan

Menyediakan platform sewa-menyewa barang dengan alur: katalog → pengajuan sewa →
verifikasi admin → pembayaran manual (bukti transfer) → pelaksanaan sewa → pengembalian →
ulasan. Admin mengelola inventaris, pesanan, dan pelanggan dari satu dasbor.

## 2. Persona

| Persona | Ciri di sistem | Kebutuhan utama |
|---|---|---|
| Penyewa terdaftar | `users.role = user`, `type = registered` | Lihat katalog, ajukan sewa, unggah bukti bayar, beri ulasan |
| Pelanggan walk-in | `users.type = walk-in` (dibuatkan admin) | Dilayani langsung oleh admin tanpa akun mandiri |
| Admin | `users.role = admin`, middleware `admin` | Kelola kategori, item, rental, verifikasi pembayaran |

Profil pelengkap (KYC ringan) disimpan di `user_details`: avatar, no. HP, alamat,
foto KTP (`identity_card_photo`).

## 3. User Stories

### Penyewa
- Sebagai penyewa, saya bisa mendaftar/login (termasuk 2FA opsional via Fortify)
  agar data sewa saya tercatat.
- Sebagai penyewa, saya bisa melihat katalog item beserta harga per hari, stok,
  dan foto agar bisa memilih barang.
- Sebagai penyewa, saya bisa mengajukan sewa (item, jumlah, tanggal mulai–selesai)
  agar admin memverifikasi.
- Sebagai penyewa, saya bisa mengunggah bukti pembayaran agar sewa disetujui.
- Sebagai penyewa, saya bisa memberi rating + komentar setelah sewa selesai.

### Admin
- Sebagai admin, saya bisa mengelola kategori (CRUD) agar katalog terorganisir.
- Sebagai admin, saya bisa mengelola item + hingga 5 foto per item agar katalog menarik.
- Sebagai admin, saya bisa membuat/mengubah/membatalkan rental atas nama pelanggan
  (termasuk walk-in) agar layanan offline tetap tercatat.
- Sebagai admin, saya bisa menyetujui/menolak pembayaran berdasarkan bukti transfer.
- Sebagai admin, saya bisa melihat dasbor pengguna dan daftar pesanan.

## 4. Alur Status (kontrak yang sudah dikunci di migrasi)

Rental (`rentals.status`):
`ditunda → disetujui → berjalan → selesai`, dengan jalur keluar
`ditolak` / `dibatalkan`.

Pembayaran (`payments.status`): `ditunda → disetujui`, atau `ditolak`.

Aturan harga: `total_days = selisih hari (end − start)`,
`total_price = price_per_day × total_days`
(helper `Rental::getTotalDays`, `Rental::getTotalPrice`).

## 5. Scope MVP

Masuk MVP:
- Auth + verifikasi email + 2FA (Fortify, sudah tersedia dari starter kit).
- Katalog + kategori + stok + foto item (admin; sebagian besar sudah jalan).
- Rental lifecycle + pembayaran manual + ulasan (model & migrasi ada,
  wiring user-side belum lengkap — lihat `docs/ROADMAP.md`).
- Dasbor admin & halaman pelanggan.

Di luar MVP (belum ada di kode):
- Payment gateway otomatis, denda keterlambatan, deposit/jaminan.
- Notifikasi (email/WA) perubahan status.
- Kalender ketersediaan & pengecekan overlap tanggal otomatis.
- Laporan pendapatan / ekspor.

## 6. Kriteria Penerimaan (per alur)

- Sewa: tanggal akhir ≥ tanggal mulai; jumlah ≤ stok tersedia pada rentang itu;
  total harga terhitung otomatis dan tidak bisa dimanipulasi dari client.
- Pembayaran: nominal = total sewa; bukti file gambar wajib; satu rental satu payment
  (`payments.rental_id` unik secara logis).
- Ulasan: satu ulasan per rental yang statusnya `selesai`.
- Admin: hanya `role = admin` yang lolos middleware `admin`; admin yang
  ter-login tidak jatuh ke dasbor user (`redirectAdmin`).

## 7. Risiko / Catatan Implementasi

- Seluruh `FormRequest` (`Store*`, `Update*`) masih kosong (`rules()` = `[]`);
  validasi berjalan inline di controller (khusus item sudah lengkap, rental belum).
- `StorePaymentRequest::authorize()` mengembalikan `false` — endpoint pembayaran
  berbasis request ini akan selalu 403 sampai diperbaiki.
- Semua Policy mengembalikan `false` — belum dipakai untuk otorisasi berbasis resource.
- Detail lengkap di `docs/DATABASE.md`, `docs/API_ROUTES.md`, `docs/ROADMAP.md`.
