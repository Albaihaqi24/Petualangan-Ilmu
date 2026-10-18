# Template eksekusi, bug, dan sign-off

Salin bagian yang diperlukan menjadi dokumen run baru. Jangan mengubah katalog expected result untuk menyesuaikan perilaku yang ternyata gagal. Versi expected result dapat direvisi setelah kebutuhan dikonfirmasi, dengan alasan yang tercatat.

## 1. Identitas test run

| Field | Isi |
| --- | --- |
| Run ID | `QA-YYYYMMDD-01` |
| Tanggal/jam | `YYYY-MM-DD HH:mm WIB` |
| Tester / reviewer | ... |
| Versi aplikasi / commit / hash snapshot | ... |
| Lingkungan / URL / mode | D/C/H/P; URL persis termasuk port |
| Browser / versi / OS / perangkat | ... |
| Viewport / zoom / jaringan | ... |
| Dataset / seed / akun rekaan dan peran | ... |
| Scope | Daftar ID kasus dan subrun |
| Perubahan sejak baseline | ... |
| Entry criteria | Terpenuhi / belum, alasan |

## 2. Lembar hasil per kasus

| Run / kasus / subrun | Prasyarat & data | Langkah aktual | Expected result | Actual result | Status | Bukti | Bug ID / pemilik |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ... | ... | 1. ...; 2. ...; 3. ... | ... | ... | NOT RUN | ... | ... |

Status yang sah: NOT RUN, PASS, FAIL, BLOCKED, N/A. Bila satu kasus memiliki nilai 0/1/200/201, simpan hasil tiap nilai; jangan memberi satu PASS jika salah satu subrun gagal. N/A wajib disertai alasan. BLOCKED wajib memiliki blocker dan tindakan berikutnya.

Untuk bukti CLI, simpan perintah, runtime, exit code, dan log lengkap. Untuk UI, simpan tangkapan layar sebelum/sesudah langkah penting serta versi browser. Untuk API, simpan metode/path, actor/peran, payload rekaan, expected/actual status dan efek data; hapus token/header rahasia. Untuk race test, simpan jumlah request, urutan/waktu, attempt/batch ID rekaan, dan saldo sebelum/sesudah.

## 3. Ringkasan run

| Metrik | Nilai |
| --- | --- |
| Total kasus dipilih | ... |
| PASS | ... |
| FAIL | ... |
| BLOCKED | ... |
| NOT RUN | ... |
| N/A | ... |
| P0 belum PASS | ... |
| P1 belum PASS | ... |
| Bug S1/S2 terbuka | ... |

Hitung **pass rate eksekusi** = PASS / (PASS + FAIL) ×100%. Hitung **completion rate** = (PASS + FAIL) / (total dipilih − N/A) ×100%. BLOCKED dan NOT RUN menurunkan completion dan tidak masuk PASS. Jika denominator nol, laporkan N/A. Cantumkan kedua metrik agar hasil tidak menyesatkan.

Jumlah assertion/test otomatis tidak langsung sebanding dengan jumlah kasus manual. Laporkan keduanya terpisah; satu tes dapat memuat beberapa assertion/subtes dan satu kasus manual dapat memerlukan banyak tes.

## 4. Laporan defect

```text
Bug ID: BUG-YYYYMMDD-001
Judul: [Area] Perilaku aktual pada pemicu konkret
Status: New
Severity: S1 / S2 / S3 / S4
Prioritas perbaikan: P0 / P1 / P2
Run / kasus / subrun terkait:
Ditemukan pada versi / commit / snapshot:
Lingkungan / URL / mode:
Browser / OS / viewport / jaringan:
Akun rekaan / peran / kepemilikan data:
Prasyarat dan dataset:
Langkah reproduksi:
1.
2.
3.
Expected result:
Actual result:
Dampak pengguna / luas data terdampak:
Frekuensi: ... dari ... percobaan
Bukti: screenshot / log / request tersanitasi
Workaround (bila ada):
Pemilik:
Versi perbaikan:
Kasus regresi yang harus dijalankan:
Hasil retest / tanggal / tester:
Keputusan akhir:
```

Contoh **hipotetis**, bukan temuan run ini: `[Kuis] Double-submit attempt yang sama menambah XP dua kali`. Expected: satu hadiah; actual yang harus dibuktikan: saldo bertambah dua kali dengan attempt ID sama. Lampirkan saldo awal/akhir dan dua respons. Jangan membuka bug hanya berdasarkan dugaan dari nama fungsi atau coverage rendah.

## 5. Siklus bug dan retest

Alur: New → Triaged → In Progress → Ready for Retest → Verified → Closed. Bila masih dapat direproduksi: Reopened. Duplicate mencantumkan bug induk; Deferred mencantumkan pemilik keputusan dan alasan; Cannot Reproduce mencantumkan lingkungan/data/percobaan yang digunakan.

Retest mengulang langkah pemicu dengan dataset yang sama jenisnya dan versi perbaikan. Regresi memeriksa jalur sekitar: misalnya perbaikan XP mencakup membaca, first quiz, remedial, replay, dan penilaian; perbaikan role mencakup UI, RPC, tabel, serta Storage yang terkait.

| Bug ID | Versi perbaikan | Reproduksi lama | Kasus regresi | Actual retest | Bukti | Status akhir |
| --- | --- | --- | --- | --- | --- | --- |
| ... | ... | ... | ... | ... | ... | ... |

## 6. Register blocker dan gap

| ID | Area/kasus | Hambatan konkret | Dampak kesimpulan | Pemilik | Tindakan berikutnya | Status |
| --- | --- | --- | --- | --- | --- | --- |
| ... | ... | Browser/staging/data belum tersedia | Belum dapat menyatakan ... | ... | ... | OPEN |

Gap cakupan berbeda dari bug produk. Misalnya belum ada hasil Android berarti kompatibilitas Android belum terbukti; bukan berarti Android pasti gagal.

## 7. Checklist keputusan rilis

- [ ] Seluruh kasus P0 dan P1 yang berlaku sudah dieksekusi dan lulus.
- [ ] Tidak ada bug S1/S2 terbuka.
- [ ] Unit/integrasi/database/build lulus untuk snapshot rilis.
- [ ] Browser, viewport mobile, keyboard, dan perangkat target diperiksa.
- [ ] Cloud Auth, Data API/RLS, Storage dan konkurensi diuji pada staging nyata.
- [ ] Email/recovery, backup/restore dan penghapusan diuji pada data disposable.
- [ ] Materi yang diterbitkan mendapat persetujuan peninjau pendidikan.
- [ ] Bukti dan defect dapat ditelusuri dari ID kebutuhan/kasus.
- [ ] Risiko P2 tersisa memiliki pemilik, mitigasi, dan keputusan tertulis.

```text
Keputusan: GO / GO terbatas / NO-GO / Belum dapat diputuskan
Lingkup keputusan: demo internal / staging / rilis publik
Snapshot yang dinilai:
Ringkasan hasil dan bukti:
Kasus FAIL/BLOCKED/NOT RUN yang tersisa:
Risiko yang diterima (jika ada):
Mitigasi / pemilik / batas waktu:
Penanggung jawab QA:
Penanggung jawab teknis:
Peninjau pendidikan (untuk konten terbit):
Penanggung jawab rilis:
Tanggal keputusan WIB:
```
