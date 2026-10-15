/* Mount the decorative Study Reel; failure must not affect the landing page. */
const mount = document.getElementById("study-reel-root");

async function start() {
  if (!mount) return;
  try {
    const [{ default: React }, { createRoot }, { ReelPlayer }] = await Promise.all([
      import("react"),
      import("react-dom/client"),
      import("./reel/reel.js")
    ]);
    createRoot(mount).render(React.createElement(ReelPlayer));
  } catch (error) {
    console.warn("[StudyWithMbah] Study Reel skipped.", error);
    mount.remove();
  }
}

start();