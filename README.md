# StudyWithMbah — frontend terstruktur

Halaman utama telah dipisahkan menjadi HTML, CSS, JavaScript, dan aset gambar.

## Struktur

```text
index.html
assets/
  css/
    00-critical.css
    01-main.css
  js/
    01-intro-fallback.js
    02-theme-init.js
    03-app.js
    04-study-visual-data.js
    05-image-assets.js
    06-alt-countdown.js
    07-scroll-effects.js
    08-mascot-life.js
    09-mascot-rig.js
  images/
    image-001.webp
    ...
```

## Catatan

- Urutan dan posisi pemanggilan JavaScript dipertahankan agar dependensi antarskrip tetap sama.
- Data gambar raster yang sebelumnya tertanam sebagai data URI dipindahkan ke `assets/images/`; payload yang sama menggunakan file bersama.
- Data URI SVG kecil untuk kursor dekoratif tetap inline.
- Tidak diperlukan bundler; deploy situs statis dari root seperti sebelumnya.
- File versi HTML lama di root dibiarkan tanpa perubahan. Pemisahan ini diterapkan pada `index.html` utama.


## Premium GSAP motion

The active `index.html` uses GSAP 3.15 and ScrollTrigger for premium viewport reveals, module-card entrance, a thin scroll progress line, restrained background parallax, and post-intro navigation/detail transitions. The existing cinematic intro and mascot engines are intentionally preserved. Reduced-motion users and CDN failures keep the original CSS/IntersectionObserver fallback.

See [the full HTML motion audit](docs/html-motion-audit.md).


## Tautan latihan soal

Tombol **Bank Soal PDF → Buka G-Drive** pada halaman detail setiap materi menggunakan folder Google Drive khusus mata pelajaran. Pemetaan URL disimpan pada data `FUND` dan `SUB` di `assets/js/03-app.js`, sehingga tiap kartu membuka folder yang sesuai. Video materi tetap menggunakan tautan YouTube yang sudah ada.


## React + Remotion mascot motion

The new **Mascot Motion Lab** adds a React island to the existing static homepage instead of migrating every page at once. It includes pointer-driven gaze, soft blinking, mascot selection, eight expression presets, and an embedded Remotion Player sequence with scrubbing/loop controls.

See [the detailed architecture and upgrade guide](docs/mascot-motion-architecture.md).

Key files:
- `assets/js/mascot/config.js` — named mascot assets, eye landmarks and expression presets.
- `assets/js/mascot/artwork.js` — reusable layered React artwork, gaze, eyelids, brows and mouth.
- `assets/js/mascot/studio.js` — live preview and expression controls.
- `assets/js/mascot/sequence.js` — frame-driven Remotion sequence.
- `assets/js/11-mascot-react.js` — React mount point.
- `assets/css/03-mascot-neubrutalism.css` — isolated, responsive neo-brutalist styling.

The homepage pins React and Remotion Player via an import map to keep the no-build static hosting path. The legacy image rig in `assets/js/09-mascot-rig.js` now resolves the three extracted mascot assets by explicit filename rather than depending only on embedded data-URI length.

 
## Update motion & perbaikan

Lihat [docs/gsap-css-update.md](docs/gsap-css-update.md): perbaikan section Mascot Lab yang tertutup, fallback React/Remotion, animasi CSS baru (`02-motion.css`), dan 8 animasi GSAP baru (`assets/js/12-gsap-motion.js`).
