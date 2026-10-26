# Backend Petualangan Ilmu

Backend utama memakai **Supabase**:

- Auth menangani akun dan sesi.
- PostgreSQL menyimpan profil, materi, kelas, tugas, dan progres.
- RPC SQL menangani penilaian kuis dan pemberian XP di server.
- RLS membatasi akses berdasarkan pengguna dan peran.
- Storage menyimpan lampiran pada bucket privat.

Skema, RPC, dan kebijakan akses berada di [database](../database/README.md). Langkah pemasangan dijelaskan di [panduan operasional](../docs/OPERASIONAL.md).

## Alat administrasi

`process-account-deletion.mjs` memproses permintaan penghapusan akun. Jalankan dari folder utama proyek dalam terminal privat:

```sh
node backend/process-account-deletion.mjs --request UUID_PEMOHON
```

Perintah tersebut memeriksa permintaan tanpa menghapus data. Penghapusan memerlukan argumen konfirmasi yang dijelaskan dalam panduan operasional. Pasang `SUPABASE_URL` dan `SUPABASE_SERVICE_ROLE_KEY` pada environment terminal server.

Untuk demo, cukup jalankan frontend; layanan backend terpisah di localhost tidak diperlukan.
