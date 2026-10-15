/* React + Remotion-powered mascot studio.
   Dependencies come from the import map in index.html (esm.sh). They are imported dynamically so that
   a network/CDN failure shows a friendly fallback instead of leaving "Menyiapkan mascot studio…" forever. */
const mount = document.getElementById("mascot-motion-root");

function showFallback(error) {
  if (!mount) return;
  console.warn("[StudyWithMbah] Mascot studio unavailable, showing fallback.", error);
  mount.classList.add("swm-motion-failed");
  mount.innerHTML =
    '<div class="swm-motion-loading" role="status">' +
    '<img src="assets/images/image-002.webp" alt="">' +
    "<div><strong>Mascot studio belum bisa dimuat.</strong>" +
    "<p>Periksa koneksi internet lalu muat ulang halaman. Bagian lain situs tetap berfungsi normal.</p></div></div>";
}

async function start() {
  if (!mount) return;
  try {
    const [{ default: React }, { createRoot }, { MascotMotionStudio }] = await Promise.all([
      import("react"),
      import("react-dom/client"),
      import("./mascot/studio.js"),
    ]);
    createRoot(mount).render(React.createElement(MascotMotionStudio));
  } catch (error) {
    showFallback(error);
  }
}

start();
