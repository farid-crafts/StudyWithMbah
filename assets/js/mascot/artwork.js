import React from "react";
import { EXPRESSIONS, MASCOTS } from "./config.js";

const h = React.createElement;

/** Pure visual layer used by both the interactive React island and Remotion. */
export function MbahArtwork({
  mascotId = "hero",
  expression = "neutral",
  gaze = [0, 0],
  blink = 0,
  headTilt = 0,
  breath = 0,
  interactive = false,
  onPointerMove,
  onPointerLeave,
}) {
  const mascot = MASCOTS[mascotId] || MASCOTS.hero;
  const mood = EXPRESSIONS[expression] || EXPRESSIONS.neutral;
  const cut = mascot.headCut * 100;
  const baseMask = `linear-gradient(to bottom, transparent ${cut - 1}%, #000 ${cut + 1}%)`;
  const headMask = `linear-gradient(to bottom, #000 ${cut + 3}%, transparent ${cut + 7}%)`;
  const rootStyle = {
    "--mascot-ratio": `${mascot.width} / ${mascot.height}`,
    "--breath": breath,
  };
  const headStyle = {
    maskImage: headMask,
    WebkitMaskImage: headMask,
    transform: `translateY(${breath * -0.55}%) rotate(${headTilt}deg)`,
  };
  const baseStyle = { maskImage: baseMask, WebkitMaskImage: baseMask };
  const eyeNodes = mascot.eyes.map((eye, index) => {
    // Preserve the original eye pixels from the mascot art and move that crop
    // inside a clipped circle. This ports the legacy canvas rig's gaze behavior.
    const diameter = 2.9 * eye.r;
    const aspect = mascot.height / mascot.width;
    return h("span", {
      className: "swm-eye",
      key: index,
      style: {
        left: `${eye.x * 100}%`,
        top: `${eye.y * 100}%`,
        width: `${diameter * 100}%`,
        background: `radial-gradient(circle, ${mascot.eyeWhite} 70%, transparent 100%)`,
      },
      "aria-hidden": "true",
    },
      h("span", {
        className: "swm-eye-crop-window",
        style: { transform: `translate(${gaze[0] * 16}%, ${gaze[1] * 16}%)` },
      },
        h("img", {
          className: "swm-eye-source-crop",
          src: mascot.src,
          alt: "",
          draggable: false,
          style: {
            width: `${100 / diameter}%`,
            height: `${100 * aspect / diameter}%`,
            left: `${-eye.x / diameter * 100}%`,
            top: `${-eye.y * aspect / diameter * 100}%`,
          },
        }),
      ),
      h("span", { className: "swm-eye-glint" }),
      h("span", { className: "swm-eyelid", style: { transform: `scaleY(${blink})` } }),
    );
  });
  const face = mascot.expressionAnchor;
  const brows = mascot.eyes.map((eye, index) => {
    const x = eye.x * 100;
    const y = eye.y * 100 - 3.25;
    let d = `M ${x - 2.35} ${y} Q ${x} ${y - 1.1} ${x + 2.35} ${y}`;
    if (mood.eyebrow === "surprised") d = `M ${x - 2.35} ${y - 0.9} Q ${x} ${y - 2.9} ${x + 2.35} ${y - 0.9}`;
    if (mood.eyebrow === "focused") d = `M ${x - 2.35} ${y + 1.0} Q ${x} ${y - 1.15} ${x + 2.35} ${y + 1.0}`;
    if (mood.eyebrow === "sad") d = index === 0
      ? `M ${x - 2.35} ${y - 0.3} Q ${x} ${y - 2.2} ${x + 2.35} ${y + 0.4}`
      : `M ${x - 2.35} ${y + 0.4} Q ${x} ${y - 2.2} ${x + 2.35} ${y - 0.3}`;
    if (mood.eyebrow === "confused" && index === 0) d = `M ${x - 2.2} ${y - 1.5} Q ${x} ${y - 3.1} ${x + 2.4} ${y - 0.2}`;
    return h("path", { d, key: index, className: "swm-brow", fill: "none", stroke: "#3A1D0B", strokeWidth: "0.72", strokeLinecap: "round" });
  });
  let mouth;
  switch (mood.mouth) {
    case "smile": mouth = h("path", { d: "M -2.9 -0.1 Q 0 3.2 2.9 -0.1", className: "swm-mouth-line" }); break;
    case "round": mouth = h("ellipse", { cx: 0, cy: 1.25, rx: 1.1, ry: 1.65, fill: "#3A1D0B" }); break;
    case "crooked": mouth = h("path", { d: "M -2.9 0.2 Q -0.5 -1.7 0.7 0.4 Q 2.2 1.7 3 0", className: "swm-mouth-line" }); break;
    case "flat": mouth = h("path", { d: "M -2.6 0.6 L 2.6 0.6", className: "swm-mouth-line" }); break;
    case "open": mouth = h("g", null, h("ellipse", { cx: 0, cy: 1.05, rx: 1.75, ry: 2.1, fill: "#3A1D0B" }), h("ellipse", { cx: 0, cy: 1.75, rx: 0.9, ry: 0.55, fill: "#FF6A55" })); break;
    case "frown": mouth = h("path", { d: "M -2.9 1.7 Q 0 -1.2 2.9 1.7", className: "swm-mouth-line" }); break;
    case "grin": mouth = h("path", { d: "M -3.05 -0.2 Q 0 3.5 3.05 -0.2", className: "swm-mouth-line" }); break;
    default: mouth = h("path", { d: "M -2.3 0.7 L 2.3 0.7", className: "swm-mouth-line" });
  }
  const faceNodes = h("svg", {
    className: "swm-expression",
    viewBox: "0 0 100 100",
    preserveAspectRatio: "none",
    "aria-hidden": "true",
  },
    ...brows,
    h("g", { transform: `translate(${face.x} ${face.y}) scale(${face.scale})` },
      h("ellipse", { cx: 0, cy: 0.7, rx: 6.8, ry: 4.6, fill: "#F7B52B" }),
      h("ellipse", { cx: -2.2, cy: -0.5, rx: 2.7, ry: 2.2, fill: "#FFF0C4" }),
      h("ellipse", { cx: 2.2, cy: -0.5, rx: 2.7, ry: 2.2, fill: "#FFF0C4" }),
      h("path", { d: "M 0 -2.5 L 0 -0.35", stroke: "#3A1D0B", strokeWidth: "0.55", strokeLinecap: "round" }),
      mouth,
    ),
  );

  return h("div", {
    className: `swm-mascot-art ${interactive ? "is-interactive" : ""}`,
    style: rootStyle,
    onPointerMove,
    onPointerLeave,
    role: interactive ? "img" : undefined,
    "aria-label": interactive ? `Maskot Mbah dengan ekspresi ${mood.label}` : undefined,
  },
    h("img", { className: "swm-mascot-base", src: mascot.src, alt: "", draggable: false, style: baseStyle }),
    h("div", { className: "swm-mascot-head", style: headStyle },
      h("img", { className: "swm-mascot-head-image", src: mascot.src, alt: "", draggable: false }),
      ...eyeNodes,
      faceNodes,
    ),
  );
}
