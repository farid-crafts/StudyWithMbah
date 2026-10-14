import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { EXPRESSIONS, MASCOTS } from "./config.js";
import { MbahArtwork } from "./artwork.js";

const h = React.createElement;

export function MbahMotionSequence({ mascotId = "hero", expression = "neutral" }) {
  const frame = useCurrentFrame();
  const mascot = MASCOTS[mascotId] || MASCOTS.hero;
  const mood = EXPRESSIONS[expression] || EXPRESSIONS.neutral;

  // Scrubbable gaze choreography: center → right → up → left → center.
  const gazeX = interpolate(frame, [0, 24, 54, 84, 124, 164, 204, 239], [0, 0.72, 0.78, 0.08, -0.78, -0.3, 0.45, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });
  const gazeY = interpolate(frame, [0, 44, 68, 105, 145, 190, 239], [0, -0.1, -0.52, -0.05, 0.45, 0.08, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });
  const cycle = frame % Math.round(82 / mood.blinkRate);
  const blink = interpolate(cycle, [0, 2, 4, 6], [0, 0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const breath = Math.sin(frame / 21) * 0.7;
  const tilt = Math.sin(frame / 48) * (expression === "curious" ? 1.8 : 0.7);

  return h("div", { className: "swm-remotion-scene" },
    h("div", { className: "swm-scene-sticker swm-scene-sticker-one" }, "STUDY MODE: ON"),
    h("div", { className: "swm-scene-sticker swm-scene-sticker-two" }, "730+"),
    h("div", { className: "swm-scene-grid" }),
    h("div", { className: "swm-remotion-mascot" },
      h(MbahArtwork, {
        mascotId,
        expression,
        gaze: [gazeX + mood.gaze[0] * 0.12, gazeY + mood.gaze[1] * 0.12],
        blink,
        headTilt: tilt,
        breath,
      }),
    ),
    h("div", { className: "swm-remotion-caption" },
      h("span", { className: "swm-live-dot" }),
      h("strong", null, mood.label.toUpperCase()),
      h("span", null, "LIRIKAN MATA · KEDIPAN · EKSPRESI"),
    ),
  );
}
