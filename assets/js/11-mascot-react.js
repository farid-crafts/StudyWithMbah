/* React + Remotion-powered mascot studio. Uses import-map dependencies declared in index.html. */
import React from "react";
import { createRoot } from "react-dom/client";
import { MascotMotionStudio } from "./mascot/studio.js";

const mount = document.getElementById("mascot-motion-root");
if (mount) {
  try {
    createRoot(mount).render(React.createElement(MascotMotionStudio));
  } catch (error) {
    console.error("[StudyWithMbah] Mascot studio failed to mount.", error);
    mount.classList.add("swm-motion-failed");
  }
}
