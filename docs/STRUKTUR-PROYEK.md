# Struktur Proyek Petualangan Ilmu

```text
petualangan-ilmu/
├── frontend/             Aplikasi React dan aset browser
│   ├── src/              Halaman, komponen, state, layanan, dan gaya
│   ├── public/           Gambar dan aset statis
│   └── index.html        Halaman masuk aplikasi
├── backend/              Alat administrasi server Supabase
├── database/             Migration, seed, RPC, RLS, dan verifikasi SQL
├── docs/                 Dokumentasi teknis, materi, dan QA
├── content/              Manifest materi dan acuan kurikulum
├── scripts/              Generator konten, build, dan pemeriksaan
├── tests/                Tes UI, logika, dan database lokal
├── dist/                 Hasil build; dibuat otomatis
├── node_modules/         Dependensi; dibuat otomatis oleh npm ci
├── .env.example          Contoh konfigurasi lingkungan
├── package.json          Perintah npm dan dependensi proyek
├── vite.config.js        Root frontend, environment, dan output build
├── vercel.json           Fallback rute untuk deployment
├── JALANKAN-LOKAL.cmd    Peluncur Windows
└── README.md             Panduan utama
```

## Alur aplikasi

Browser menjalankan frontend React. Mode demo menyimpan progres di browser. Mode Supabase memakai klien pada `frontend/src/services/` dan provider pada `frontend/src/context/` untuk mengakses Auth, PostgreSQL, Storage, dan RPC.

Logika server seperti penilaian kuis, pemberian XP, dan pembatasan akses dijalankan oleh fungsi serta kebijakan SQL dalam `database/migrations/`. Alat yang membutuhkan kredensial server berada di `backend/`.

`content/` berisi manifest dan referensi lintas alat. Naskah demo berada di `frontend/src/content/`. Generator di `scripts/` mengolahnya menjadi dokumentasi dan paket SQL. Mode produksi Supabase memuat katalog database dan diperiksa agar bank soal demo tidak masuk bundle.

## Cara bekerja

Semua perintah dijalankan dari folder `petualangan-ilmu`:

```sh
npm ci
npm run dev
npm test
npm run build
```

Simpan `.env.local` di folder utama. Build tetap menghasilkan `dist/`. Nama produk adalah **Petualangan Ilmu**, sedangkan nama folder dan package adalah **`petualangan-ilmu`**.

## Lokasi lama

Proyek sebelumnya berada di `2026-10-16/bu/outputs/petualangan-ilmu`. Proyek aktif sekarang berada langsung di `Codex/petualangan-ilmu`. Hasil kerja terdahulu disimpan dalam `Codex/arsip` dengan folder tanggal agar asalnya tetap dapat ditelusuri. Git beserta riwayat proyek ikut berada di folder utama baru.
