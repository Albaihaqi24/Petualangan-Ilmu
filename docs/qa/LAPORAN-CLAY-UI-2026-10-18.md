# QA visual dan interaksi Petualangan Ilmu

Tanggal: 18 Oktober 2026, Asia/Jakarta. Browser: Microsoft Edge headless lokal melalui Playwright. Ini bukan pengujian Android fisik atau Supabase cloud.

## Hasil

Regresi **112 tes lulus, 0 gagal**; build Vite demo berhasil. Build Supabase offline dan audit pemisahan bank soal demo juga lulus dalam regresi. Tujuh tes baru mencakup karakter, komik, avatar, XP dan audio.

| Pemeriksaan    | Hasil                                                                                                                                    |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Enam karakter  | Rubi/Bobo/Tobi/Kiki/Momo/Piko; empat ekspresi dan label aksesibel diuji DOM                                                              |
| Responsif      | Dashboard tidak overflow horizontal pada 375, 390, 412, 1440 piksel                                                                      |
| Kontrol suara  | Dalam header; tidak mengambang di atas teks atau tombol kuis                                                                             |
| Audio opt-in   | Nol AudioContext sebelum klik; satu context running setelah opt-in. Unit test: pop, dua nada benar, fanfare, mute, deduplikasi, fallback |
| Jeda           | Dua dekorasi dashboard berubah menjadi off; animasi dapat dilanjutkan                                                                    |
| Reduced motion | Preferensi perangkat diikuti; confetti tidak dirender                                                                                    |
| Komik          | Pergantian adegan dan mentor Kiki; mini-check salah/benar tanpa mutasi XP/storage                                                        |
| Kuis browser   | Lima soal selesai: tiga benar, dua salah; Momo dan pembahasan ramah tampil, tanpa page error                                             |
| XP             | Hadiah aktual 35 XP; badge 10 XP hanya pada kontribusi jawaban yang memang mendapat hadiah                                               |
| Avatar         | Piko tersimpan dan dipulihkan. Migration 005 dapat diulang; profil lama tetap, metadata tidak dapat menaikkan role/XP                    |

Reaksi benar/salah kuis bank muncul sesudah penilaian tersedia. Kunci tidak ditambahkan ke sesi kuis aktif. Mini-check adalah latihan formatif materi, tanpa tambahan XP.

## Performa dan batas

Animasi berulang memakai transform/opacity. Confetti dibatasi 14 partikel dan selesai sekitar 1,1 detik. Avatar pada pemilih dan mentor kecil di pulau memakai pose statis; pulau tetap mengapung. Audio tidak memakai MP3/request media eksternal. Fitur `domAnimation` dimuat melalui chunk terpisah setelah render awal, tanpa bundle drag/layout.

Gerakan berhenti saat tab tersembunyi, mendukung jeda serta reduced motion. **60 FPS di Android fisik belum diukur**, sehingga hasil headless tidak dianggap sebagai jaminan performa perangkat. Cloud/Auth nyata dan review pedagogi tetap memerlukan verifikasi terpisah.

Happy DOM memiliki cancellation promise Web Animations API yang berbeda dari browser. Tes DOM memakai driver animasi JavaScript; Edge memeriksa jalur native. Modul fitur ditunggu sebelum teardown tes.

## Bukti

QA browser dapat diulang dengan `scripts/verify-adventure-browser.mjs` setelah menjalankan build dan preview. Playwright adalah alat QA opsional, bukan dependensi runtime aplikasi. Pasang lokal dengan `npm install --no-save --package-lock=false playwright`, lalu jalankan `node scripts/verify-adventure-browser.mjs http://127.0.0.1:4173`. Default executable memakai Edge Windows; `BROWSER_QA_EXECUTABLE` dan `BROWSER_QA_MODULE` dapat menunjuk instalasi lokal lain.

- [Regresi](evidence/2026-10-18-clay-ui-regression.txt), [build](evidence/2026-10-18-clay-ui-build.txt), [pemeriksaan browser](evidence/2026-10-18-clay-browser-checks.json).
- Dashboard [desktop](evidence/2026-10-18-clay-dashboard-desktop.png) dan [HP](evidence/2026-10-18-clay-dashboard-mobile.png).
- Peta [desktop](evidence/2026-10-18-clay-map-desktop.png) dan [HP](evidence/2026-10-18-clay-map-mobile.png).
- [Komik HP](evidence/2026-10-18-clay-reader-mobile.png), [kuis HP](evidence/2026-10-18-clay-quiz-mobile.png), [hasil HP](evidence/2026-10-18-clay-result-mobile.png), [pembahasan ramah](evidence/2026-10-18-clay-feedback-mobile.png).

Avatar Supabase baru memerlukan [migration 005](../../supabase/migrations/202610180005_adventure_avatars.sql); belum diterapkan ke Supabase pengguna.

Referensi: [Motion lazy loading](https://motion.dev/docs/react-reduce-bundle-size), [reduced motion](https://motion.dev/docs/react-use-reduced-motion), [MDN Web Audio](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices).
