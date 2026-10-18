# Checkpoint sebelum Tahap 2 (arsip; jalur relatif mengacu root proyek lama)

Proyek awal adalah HTML/JavaScript. Pondasi React Tahap 1 disiapkan terlebih dahulu sesuai instruksi untuk tidak melompat tahap.

| Pemeriksaan | Hasil |
|---|---|
| Node dan Git | Node 24.19.0; Git 2.53.0 tersedia melalui runtime Codex |
| Dependensi | Terpasang; package-lock.json tersedia |
| Konfigurasi | React + Vite + plugin Tailwind terpasang |
| Struktur folder | Semua 11 direktori yang diminta sudah dibuat |
| Build produksi | Berhasil dengan Vite 8.3.4 |
| CSS bg-sky-100, text-sky-900 | Kedua selector ada dalam CSS hasil build |
| Server Vite | Melaporkan ready pada port 5173 |
| Akses HTTP dan browser localhost | **Belum lulus: koneksi timeout dari lingkungan agen** |

Tahap 2 belum dimulai. Upaya menjalankan proses latar belakang ditolak otomatis oleh kebijakan sandbox. Tidak ada perubahan firewall atau pengaturan keamanan sistem.

## Coba langsung dari laptop

1. Klik dua kali `JALANKAN-LOKAL.cmd` di folder ini dan biarkan terminal terbuka.
2. Buka http://localhost:5173 di browser laptop.
3. Pastikan halaman Petualangan Ilmu muncul dengan latar biru muda, tulisan biru tua, dan tanpa layar error Vite.
4. Laporkan hasil atau pesan error agar pengerjaan Tahap 2 dapat dilanjutkan sesuai urutan.

Jika Node tersedia di PATH, perintah standar tetap berlaku:

```sh
npm ci
npm run dev
npm run build
```

Proyek menetapkan Node >=22.12; Node 18 tidak kompatibel dengan Vite terkini yang terpasang.

Untuk memeriksa Tahap 1 secara otomatis, hentikan dev server lalu jalankan `node verify-stage1.mjs`. Skrip memeriksa struktur folder, membuka Vite sementara di 5173, menguji HTTP 200, dan memeriksa transformasi JSX/CSS. Skrip belum lulus di lingkungan agen karena akses localhost. Jika port sudah dipakai, hentikan hanya server Vite milik proyek ini sebelum pengujian.

## Berkas yang dipertahankan

- `legacy/dist/`: salinan demo HTML lama.
- `legacy/README-DEMO-LAMA.md`: catatan implementasi sebelumnya.
- `supabase/schema.sql`: SQL lama yang belum dijalankan/dihubungkan.
- `PRD_ASLI.txt`: dokumen awal pengguna.
- `dist/`: hasil build React Tahap 1; perlu server HTTP, jangan dibuka melalui file://.

Setelah checkpoint lulus, Tahap 2 meliputi data dummy berbentuk subjects/lessons/questions, semua rute React Router yang diminta, pembaca teks/tips/gambar/video, kuis dengan ringkasan dan pembahasan, dashboard tutor/admin, pengujian lebar 375–412px, dan build produksi. Belum ada integrasi database dalam tahap tersebut.
