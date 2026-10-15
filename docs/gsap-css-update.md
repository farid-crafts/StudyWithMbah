# Update: perbaikan error + animasi CSS + animasi GSAP baru

## Error yang diperbaiki
| Masalah | Penyebab | Perbaikan |
|---|---|---|
| Section **Mascot Lab** tidak terlihat saat di-scroll | Section sticky `.cd` (hitung mundur) tetap menempel dan menutupinya; Mascot Lab tidak ikut tumpukan section | `07-scroll-effects.js`: `#mascot-motion-lab` dimasukkan ke daftar `stk` |
| Tulisan "Menyiapkan mascot studio…" bisa macet selamanya jika esm.sh gagal dimuat | `import` statis di module: kegagalan jaringan menghentikan modul sebelum `try/catch` berjalan | `11-mascot-react.js`: import dinamis + tampilan fallback yang ramah |
| Konten berkedip (tampil → hilang → muncul lagi) saat GSAP selesai dimuat | `10-gsap-premium.js` menyembunyikan ulang elemen yang sudah terlihat | Elemen yang sudah di layar dilewati |
| Meta `description`, `og:title`, `og:description` ganda dan 3 `theme-color` | Tag ganda hasil gabungan versi | Dibersihkan, tersisa satu set |

## Animasi CSS (`assets/css/02-motion.css`)
- Token easing `--swm-ease-out` dan `--swm-ease-spring` (`linear()` jika browser mendukung).
- Badge hero melayang pelan (`swm-float`).
- Backdrop modal memudar masuk.
- Umpan balik tekan pada tombol non-magnetik.
- Bayangan header bertambah saat scroll (CSS `animation-timeline`, tanpa JS).
- Semua dimatikan pada `prefers-reduced-motion`.

## Animasi GSAP baru (`assets/js/12-gsap-motion.js`)
1. Angka skor `730+` menghitung naik setelah intro.
2. Kotak hitung mundur jatuh bergantian dengan pantulan.
3. Bingkai carousel kampus naik saat terlihat.
4. Paragraf ALT dan Mascot Lab menyala kata demi kata mengikuti scroll (scrub).
5. Foto ALT bergeser parallax di dalam bingkainya.
6. Judul, label, dan stempel Mascot Lab masuk berurutan.
7. Footer muncul halus.
8. Tombol WhatsApp memberi isyarat 3 kali lalu diam.

Prinsip: tidak menyentuh elemen yang transform-nya dipegang mesin lain (intro, rig maskot, kartu carousel, huruf hero, tombol magnetik). Tanpa GSAP/CDN atau pada reduced motion, file ini berhenti sendiri dan halaman tetap utuh.

## Hasil pengujian yang disertakan

Catatan dari pembuat ZIP menyebutkan Chromium headless pada lebar 1280 px dan 390 px, tanpa error halaman dan tanpa scroll horizontal, serta jalur tanpa GSAP yang bersih. Saya belum dapat mereproduksi uji browser yang sama dalam alur ini; GSAP/ScrollTrigger asli dan esm.sh perlu diuji lagi ketika jaringan tersedia.
