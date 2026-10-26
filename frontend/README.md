# Frontend Petualangan Ilmu

Antarmuka memakai React, Vite, Tailwind CSS, React Router, dan Framer Motion.

| Letak                             | Isi                                          |
| --------------------------------- | -------------------------------------------- |
| `src/pages/`                      | Halaman siswa, tutor, admin, dan autentikasi |
| `src/components/`                 | Komponen UI, materi, kuis, dan petualangan   |
| `src/context/`                    | State demo dan integrasi Supabase            |
| `src/services/`                   | Klien layanan dan validasi impor             |
| `src/lib/`                        | Katalog, konfigurasi, dan utilitas           |
| `src/content/`                    | Naskah materi dan bank soal demo             |
| `src/styles/` dan `src/index.css` | Gaya tampilan                                |
| `public/`                         | Aset statis                                  |
| `index.html`                      | Halaman masuk Vite                           |

Jalankan `npm run dev` dari **folder utama `petualangan-ilmu`**. `package.json`, dependensi, `vite.config.js`, dan `.env.local` berada di folder utama. Hasil `npm run build` berada di `dist/` pada folder utama.

Frontend memanggil Supabase untuk autentikasi, data, storage, dan RPC. Konfigurasi browser menggunakan publishable key; service-role key digunakan pada lingkungan server.
