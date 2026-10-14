import React, { useEffect, useState } from "react";
import { Player } from "@remotion/player";
import { EXPRESSIONS, EXPRESSION_IDS, MASCOTS, MASCOT_IDS } from "./config.js";
import { MbahArtwork } from "./artwork.js";
import { MbahMotionSequence } from "./sequence.js";

const h = React.createElement;

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);
  return reduced;
}

function LivePreview({ mascotId, expression }) {
  const reducedMotion = useReducedMotion();
  const [gaze, setGaze] = useState([0, 0]);
  const [blink, setBlink] = useState(0);
  const [tilt, setTilt] = useState(0);
  const mood = EXPRESSIONS[expression];

  useEffect(() => {
    if (reducedMotion) return undefined;
    let blinkTimer = 0;
    let closeTimer = 0;
    let stopped = false;
    const schedule = () => {
      blinkTimer = window.setTimeout(() => {
        if (stopped) return;
        setBlink(1);
        closeTimer = window.setTimeout(() => {
          setBlink(0);
          schedule();
        }, 115);
      }, 1700 + Math.random() * 3300);
    };
    schedule();
    return () => {
      stopped = true;
      clearTimeout(blinkTimer);
      clearTimeout(closeTimer);
    };
  }, [reducedMotion, mascotId]);

  useEffect(() => {
    setGaze(mood.gaze);
    setTilt(expression === "curious" ? -1.4 : expression === "confused" ? 1.2 : 0);
  }, [expression, mood.gaze]);

  const trackPointer = (event) => {
    if (reducedMotion || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const nx = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2));
    const ny = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2));
    setGaze([nx, ny]);
  };

  return h("div", { className: "swm-live-preview", onPointerMove: trackPointer, onPointerLeave: () => setGaze(mood.gaze) },
    h("div", { className: "swm-live-preview-bg", "aria-hidden": "true" }),
    h("div", { className: "swm-live-label" }, h("span", { className: "swm-live-dot" }), "LIVE POINTER TRACKING"),
    h(MbahArtwork, { mascotId, expression, gaze, blink, headTilt: tilt, interactive: true }),
    h("p", { className: "swm-live-hint" }, reducedMotion ? "Gerakan dikurangi mengikuti preferensi perangkat." : "Gerakkan kursor di area ini untuk mengarahkan lirikan Mbah."),
  );
}

function ExpressionPicker({ expression, onChange }) {
  return h("div", { className: "swm-expression-grid", role: "group", "aria-label": "Pilih ekspresi maskot" },
    ...EXPRESSION_IDS.map((id, index) => {
      const mood = EXPRESSIONS[id];
      return h("button", {
        type: "button",
        key: id,
        className: `swm-expression-button ${expression === id ? "is-active" : ""}`,
        onClick: () => onChange(id),
        "aria-pressed": expression === id,
        style: { "--swm-chip-index": index },
      },
        h("span", { className: `swm-expression-emoji swm-emoji-${id}`, "aria-hidden": "true" }),
        h("span", { className: "swm-expression-label" }, mood.label),
        h("span", { className: "swm-expression-tag" }, mood.tag),
      );
    }),
  );
}

export function MascotMotionStudio() {
  const [mascotId, setMascotId] = useState("hero");
  const [expression, setExpression] = useState("happy");
  const [showPlayer, setShowPlayer] = useState(true);
  const mascot = MASCOTS[mascotId];
  const mood = EXPRESSIONS[expression];

  useEffect(() => {
    // Keep the legacy site's mascot reactions available while testing an expression.
    if (window.MbahRig?.setExpression) {
      const legacyMap = {
        happy: "happy",
        curious: "curious",
        confused: "curious",
        focused: "focused",
        surprised: "surprised",
        sad: "sad",
        proud: "proud",
        neutral: "calm",
      };
      window.MbahRig.setExpression(legacyMap[expression] || expression);
    }
  }, [expression]);

  return h("div", { className: "swm-mascot-studio" },
    h("div", { className: "swm-studio-toolbar" },
      h("div", null,
        h("span", { className: "swm-eyebrow" }, "CHARACTER CONTROL / V1"),
        h("h3", null, "Mood switch."),
      ),
      h("label", { className: "swm-mascot-select-label" },
        h("span", null, "Maskot"),
        h("select", { value: mascotId, onChange: (event) => setMascotId(event.target.value), "aria-label": "Pilih aset maskot" },
          ...MASCOT_IDS.map((id) => h("option", { key: id, value: id }, MASCOTS[id].label)),
        ),
      ),
    ),
    h("div", { className: "swm-studio-grid" },
      h("article", { className: "swm-neo-card swm-live-card" },
        h("div", { className: "swm-card-head" },
          h("strong", null, "01 / INTERACTIVE PREVIEW"),
          h("span", { className: "swm-card-number" }, "LIVE"),
        ),
        h(LivePreview, { mascotId, expression }),
        h("div", { className: "swm-current-mood" },
          h("span", { className: "swm-current-mood-icon" }, expression === "happy" ? "✳" : expression === "surprised" ? "!" : "↗"),
          h("div", null,
            h("strong", null, mood.label),
            h("p", null, "State tersimpan sebagai prop React `expression` — bisa dipicu dari event, progress belajar, atau dialog."),
          ),
        ),
      ),
      h("article", { className: "swm-neo-card swm-controls-card" },
        h("div", { className: "swm-card-head" },
          h("strong", null, "02 / EXPRESSION PRESETS"),
          h("span", { className: "swm-card-number" }, "8 STATES"),
        ),
        h("p", { className: "swm-controls-copy" }, "Pilih state untuk memperbarui alis, mulut, arah lirikan, dan karakter kedipan."),
        h(ExpressionPicker, { expression, onChange: setExpression }),
        h("div", { className: "swm-expression-code" },
          h("span", null, "ACTIVE STATE"),
          h("code", null, `expression="${expression}"`),
          h("button", { type: "button", className: "swm-copy-code", onClick: () => navigator.clipboard?.writeText(`<MbahArtwork expression="${expression}" />`) }, "COPY JSX"),
        ),
      ),
    ),
    h("article", { className: "swm-neo-card swm-remotion-card" },
      h("div", { className: "swm-card-head" },
        h("strong", null, "03 / REMOTION TIMELINE"),
        h("button", { type: "button", className: "swm-toggle-player", onClick: () => setShowPlayer((value) => !value), "aria-expanded": showPlayer }, showPlayer ? "HIDE PLAYER −" : "SHOW PLAYER +"),
      ),
      h("div", { className: "swm-remotion-description" },
        h("p", null, "Lirikannya dirender dari frame, bukan timer browser. Putar, jeda, dan scrub untuk mengecek timing ekspresi secara konsisten."),
        h("span", null, "240 FRAMES / 30 FPS / 8s LOOP"),
      ),
      showPlayer ? h("div", { className: "swm-remotion-player-wrap" },
        h(Player, {
          component: MbahMotionSequence,
          inputProps: { mascotId, expression },
          durationInFrames: 240,
          compositionWidth: 760,
          compositionHeight: 500,
          fps: 30,
          loop: true,
          autoPlay: true,
          controls: true,
          clickToPlay: true,
          doubleClickToFullscreen: true,
          style: { width: "100%", aspectRatio: "760 / 500" },
        }),
      ) : null,
      h("div", { className: "swm-remotion-foot" },
        h("span", null, "FRAME-BASED / DETERMINISTIC"),
        h("span", null, "REACT + REMOTION PLAYER"),
      ),
    ),
  );
}
