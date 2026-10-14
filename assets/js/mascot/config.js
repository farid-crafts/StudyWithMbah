/* StudyWithMbah mascot registry. Keep landmarks in normalized percentages so assets can be resized safely. */
export const MASCOTS = {
  hero: {
    id: "hero",
    label: "Mbah — Hero",
    src: "assets/images/image-002.webp",
    width: 852,
    height: 634,
    headCut: 0.62,
    expressionAnchor: { x: 32.1, y: 53.2, scale: 1 },
    eyes: [
      { x: 0.2507, y: 0.4304, r: 0.0232 },
      { x: 0.3735, y: 0.394, r: 0.0232 },
    ],
    pupil: "#2A1608",
    eyeWhite: "#FFF4D6",
    originalPreset: "fly",
  },
  wave: {
    id: "wave",
    label: "Mbah — Lambaikan Tangan",
    src: "assets/images/image-004.webp",
    width: 266,
    height: 300,
    headCut: 0.528,
    expressionAnchor: { x: 49.1, y: 41.2, scale: 0.78 },
    eyes: [
      { x: 0.4134, y: 0.2854, r: 0.0216 },
      { x: 0.5717, y: 0.2858, r: 0.0207 },
    ],
    pupil: "#2A1608",
    eyeWhite: "#FFF4D6",
    originalPreset: "wave",
  },
  buddy: {
    id: "buddy",
    label: "Mbah — Buddy",
    src: "assets/images/image-006.webp",
    width: 258,
    height: 300,
    headCut: 0.6,
    expressionAnchor: { x: 39.3, y: 45.6, scale: 0.72 },
    eyes: [
      { x: 0.3178, y: 0.3583, r: 0.0203 },
      { x: 0.4661, y: 0.3589, r: 0.0203 },
    ],
    pupil: "#2A1608",
    eyeWhite: "#FFF4D6",
    originalPreset: "read",
  },
};

export const EXPRESSIONS = {
  neutral: { label: "Natural", tag: "calm", eyebrow: "neutral", mouth: "neutral", gaze: [0, 0], blinkRate: 1 },
  happy: { label: "Senang", tag: "happy", eyebrow: "happy", mouth: "smile", gaze: [0, 0], blinkRate: 1.12 },
  curious: { label: "Penasaran", tag: "curious", eyebrow: "curious", mouth: "round", gaze: [0.45, -0.35], blinkRate: 0.88 },
  confused: { label: "Bingung", tag: "confused", eyebrow: "confused", mouth: "crooked", gaze: [-0.32, -0.2], blinkRate: 0.9 },
  focused: { label: "Fokus", tag: "focused", eyebrow: "focused", mouth: "flat", gaze: [0, 0.08], blinkRate: 0.68 },
  surprised: { label: "Kaget", tag: "surprised", eyebrow: "surprised", mouth: "open", gaze: [0, -0.35], blinkRate: 0.72 },
  sad: { label: "Sedih", tag: "sad", eyebrow: "sad", mouth: "frown", gaze: [0, 0.48], blinkRate: 0.84 },
  proud: { label: "Bangga", tag: "proud", eyebrow: "proud", mouth: "grin", gaze: [0.18, -0.2], blinkRate: 1 },
};

export const MASCOT_IDS = Object.keys(MASCOTS);
export const EXPRESSION_IDS = Object.keys(EXPRESSIONS);
