# StudyWithMbah — separated frontend files

Halaman utama `index.html` sekarang memuat struktur HTML dan mereferensikan CSS serta JavaScript dari folder `assets/`.

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
```

## Catatan

- Urutan tag JavaScript di HTML dipertahankan untuk menjaga dependensi antarskrip.
- Data gambar berbasis `data:image/...;base64` tetap berada di berkas JavaScript yang memang menggunakannya; belum dikonversi menjadi aset terpisah agar perubahan tetap berupa pemisahan struktur, bukan perubahan runtime.
- Tidak diperlukan bundler. Sajikan/deploy repositori sebagai situs statis dari root seperti sebelumnya.
- File HTML versi terdahulu di root dibiarkan apa adanya; refactor ini ditujukan pada `index.html` yang digunakan sebagai halaman utama.
