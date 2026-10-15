/* Study Reel — 8-second Remotion composition (240 frames at 30fps).
   Motion is frame-driven. The composition returns to a clean gold frame for seamless looping. */
import React, { useEffect, useRef, useState } from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig
} from "remotion";
import { Player, Thumbnail } from "@remotion/player";

const h = React.createElement;
const C = {
  ink: "#2A1608",
  gold: "#FFA51F",
  blue: "#1D4A8C",
  lime: "#BFE36B",
  sky: "#E3ECFF",
  red: "#FF6A55"
};
const FONT = "'Bricolage Grotesque','Arial Narrow',Arial,sans-serif";
const CHIPS = ["PU", "PPU", "PBM", "PK", "LBI", "LBE", "PM"];
const out = Easing.bezier(0.16, 1, 0.3, 1);
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" };
const big = (size) => ({
  fontFamily: FONT,
  fontWeight: 800,
  fontSize: size,
  lineHeight: 0.9,
  letterSpacing: "-0.02em",
  color: C.ink
});

export function MbahReel() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return h(AbsoluteFill, {
    style: { background: C.gold, overflow: "hidden" }
  },
    /* Title scene fades out to the same clean gold frame that begins the loop. */
    h(AbsoluteFill, {
      style: { opacity: interpolate(frame, [0, 2, 220, 239], [0, 1, 1, 0], clamp) }
    },
      h(AbsoluteFill, {
        style: { justifyContent: "center", padding: "0 96px" }
      },
        h("div", { style: { ...big(190), overflow: "hidden" } },
          h("div", {
            style: {
              translate: "0 " + interpolate(frame, [2, 26], [110, 0], { ...clamp, easing: out }) + "%"
            }
          }, "TEMBUS")
        ),
        h("div", { style: { ...big(190), color: C.blue, overflow: "hidden" } },
          h("div", {
            style: {
              translate: interpolate(frame, [12, 36], [-60, 0], { ...clamp, easing: out }) + "% 0",
              rotate: interpolate(frame, [12, 36], [-5, 0], { ...clamp, easing: out }) + "deg"
            }
          }, "PTN.")
        )
      )
    ),

    /* Scene B: the seven existing subtest abbreviations. */
    h(AbsoluteFill, {
      style: {
        background: C.blue,
        justifyContent: "center",
        padding: "0 96px",
        opacity: interpolate(frame, [66, 84, 225, 239], [0, 1, 1, 0], clamp),
        clipPath: "inset(0 0 0 " + interpolate(frame, [66, 84], [100, 0], { ...clamp, easing: out }) + "%)"
      }
    },
      h("div", { style: { ...big(150), color: "#fff" } }, "7 SUBTES"),
      h("div", { style: { display: "flex", flexWrap: "wrap", gap: 18, marginTop: 40 } },
        CHIPS.map((chip, index) => h("div", {
          key: chip,
          style: {
            ...big(54),
            padding: "14px 26px",
            background: index === 3 ? C.gold : "#fff",
            border: "5px solid " + C.ink,
            boxShadow: "6px 6px 0 " + C.ink,
            scale: Math.max(0, spring({
              frame: frame - (86 + index * 5),
              fps,
              config: { damping: 11, mass: 0.6 }
            })),
            rotate: (index % 2 ? 1 : -1) * 3 + "deg"
          }
        }, chip))
      )
    ),

    /* Scene C: score lands with the LULUS message. */
    h(AbsoluteFill, {
      style: {
        background: C.lime,
        justifyContent: "center",
        alignItems: "center",
        opacity: interpolate(frame, [136, 154, 224, 239], [0, 1, 1, 0], clamp),
        clipPath: "inset(0 0 " + interpolate(frame, [136, 154], [100, 0], { ...clamp, easing: out }) + "% 0)"
      }
    },
      h("div", {
        style: { ...big(330), fontVariantNumeric: "tabular-nums" }
      }, Math.round(interpolate(frame, [148, 188], [0, 730], { ...clamp, easing: Easing.out(Easing.cubic) })) + "+"),
      h("div", {
        style: {
          position: "absolute",
          right: 150,
          top: 120,
          ...big(120),
          color: C.red,
          border: "10px double " + C.red,
          padding: "10px 34px",
          opacity: frame >= 190 ? 1 : 0,
          rotate: "-12deg",
          scale: frame >= 190
            ? interpolate(spring({ frame: frame - 190, fps, config: { damping: 9, mass: 0.7 } }), [0, 1], [3.2, 1])
            : 3.2
        }
      }, "LULUS")
    ),

    /* Scene D: Mbah flies across, then fades to gold at the loop seam. */
    h(AbsoluteFill, {
      style: {
        background: C.sky,
        justifyContent: "center",
        alignItems: "center",
        opacity: interpolate(frame, [200, 210, 228, 239], [0, 1, 1, 0], clamp)
      }
    },
      h(Img, {
        src: "assets/images/image-002.webp",
        style: {
          width: 760,
          height: "auto",
          translate:
            interpolate(frame, [200, 222, 239], [-900, 0, 1000], { ...clamp, easing: Easing.bezier(0.5, 0, 0.3, 1) }) +
            "px " + Math.sin(frame / 6) * 10 + "px",
          rotate: Math.sin(frame / 9) * 3 + "deg"
        }
      })
    )
  );
}

/* Play only while visible; reduced-motion users receive a single static frame. */
export function ReelPlayer() {
  const wrap = useRef(null);
  const player = useRef(null);
  const [reduced] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const shared = {
    component: MbahReel,
    compositionWidth: 1280,
    compositionHeight: 720,
    durationInFrames: 240,
    fps: 30,
    style: { width: "100%", height: "100%" }
  };

  useEffect(() => {
    if (reduced || !wrap.current) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      const instance = player.current;
      if (!instance) return;
      if (entry.isIntersecting) instance.play();
      else instance.pause();
    }, { threshold: 0.35 });
    observer.observe(wrap.current);
    return () => observer.disconnect();
  }, [reduced]);

  return h("div", { ref: wrap, style: { width: "100%", height: "100%" } },
    reduced
      ? h(Thumbnail, { ...shared, frameToDisplay: 215 })
      : h(Player, {
          ...shared,
          ref: player,
          loop: true,
          autoPlay: false,
          controls: false,
          clickToPlay: true
        })
  );
}