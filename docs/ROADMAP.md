# Roadmap

Status per item mengacu pada kondisi kode saat ini.
Legenda: ✅ jalan · 🚧 stub/sebagian · 📋 belum ada.

## Fase 0 — Fondasi (✅ selesai)

- Auth Fortify (register/login/2FA/verify/reset), settings profile/security/appearance.
- Layout app/auth/settings + komponen shadcn.
- Skema DB lengkap (users → reviews) + seeder 2 akun (1 admin, 1 user).
- Halaman admin item (list + search + filter kategori + paginasi, create + upload
  ≤ 5 foto) dan halaman admin rental (list + modal create).

## Fase 1 — MVP: wiring alur sewa (prioritas tertinggi)

1. 🚧 `Admin\RentalController`: hanya `index/create/store` terisi;
   `show/edit/update/destroy` kosong. `store()` memakai pola
   `$request->validated([...])` yang **tidak memvalidasi apa pun**
   (`StoreRentalRequest::rules()` kosong) — tulis ulang memakai validasi eksplisit
   seperti `ItemController@store` + hitung `total_days/total_price` di server.
2. 📋 Halaman katalog & pengajuan sewa untuk user (saat ini user hanya punya
   `dashboard` + `customers` generik). Tanpa ini penyewa tidak bisa transaksi mandiri.
3. 📋 Wire `PaymentController` + `ReviewController` ke route (file ada, route belum ada).
   Perbaiki dulu `StorePaymentRequest::authorize()` yang mengembalikan `false`.
4. 🚧 Isi `rules()` semua `FormRequest` (saat ini semuanya `[]`) atau hapus dan
   konsisten validasi inline. Campuran keduanya rawan lolos validasi.
5. 📋 Pengecekan ketersediaan: overlap tanggal × quantity vs stok — saat ini
   double-booking dimungkinkan.
6. 🚧 Putuskan nasib `rentals.quantity` (abaikan vs libatkan dalam total harga;
   lihat `docs/DATABASE.md` temuan #1).

## Fase 2 — Penguatan operasional

- Verifikasi pembayaran oleh admin (setujui/tolak + ubah status rental terkait).
- Status transition guard: hanya transisi valid
  (`ditunda→disetujui/ditolak/dibatalkan→berjalan→selesai`).
- KYC: wajibkan `user_details` (telepon + foto KTP) sebelum sewa disetujui.
- Aktifkan Policy yang relevan (semua masih `false`) atau hapus jika otorisasi
  cukup via middleware + FormRequest.
- Lengkapi factory + seeder realistis untuk development/demo.
- Test Pest untuk alur kritis (buat rental, tolak overlap, verifikasi bayar).

## Fase 3 — Nice-to-have (di luar MVP)

- Payment gateway (midtrans/dll.) menggantikan bukti transfer manual.
- Kalender ketersediaan, denda keterlambatan, deposit.
- Notifikasi status (email/WA), laporan pendapatan + ekspor.
- Rating agregat item + pencarian/filter katalog lanjutan.

## Urutan eksekusi yang disarankan

Fase 1 item 1 → 4 → 6 (perbaiki fondasi validasi & harga) → item 2 → 3 → 5.
Jangan menambah fitur Fase 3 sebelum guard ketersediaan dan validasi beres —
itu sumber bug finansial (stok ganda, harga manipulabel).
