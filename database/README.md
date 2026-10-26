# Database Petualangan Ilmu

Database memakai PostgreSQL pada Supabase. Folder ini menyimpan skema, fungsi RPC, kebijakan RLS, data awal, dan query verifikasi.

| Letak                     | Kegunaan                                                         |
| ------------------------- | ---------------------------------------------------------------- |
| `migrations/`             | Perubahan skema dan fitur, dijalankan berurutan berdasarkan nama |
| `seed_materi_lengkap.sql` | Paket ringan: 36 materi dan 216 soal                             |
| `seed.sql`                | Paket seed awal alternatif                                       |
| `books/`                  | Paket bahan ajar per buku                                        |
| `curriculum-draft.sql`    | Paket materi draf tambahan                                       |
| `paket-72-bab.sql`        | Paket tambahan 72 bab                                            |
| `verify-setup.sql`        | Pemeriksaan skema, RLS, dan hak akses                            |
| `verify-platform.sql`     | Pemeriksaan fitur platform                                       |

Untuk proyek Supabase baru, jalankan migration 001–005 sesuai urutan, lalu pilih paket seed sesuai kebutuhan. Ikuti **[panduan seed materi lengkap](README-seed-materi-lengkap.md)** dan [panduan operasional](../docs/OPERASIONAL.md). Pada database yang sudah berisi data, periksa migration yang telah terpasang.

Tes database lokal dijalankan dari folder utama:

```sh
npm run test:db
```

Tes memakai PGlite. Pemindahan folder ini tidak menjalankan SQL atau mengubah database cloud.
