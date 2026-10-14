# Mascot Motion System — Architecture & Upgrade Guide

This page documents the React + Remotion expression lab integrated into the existing static StudyWithMbah homepage. The original home page remains vanilla HTML/CSS/JS; the mascot studio is an isolated React island mounted into `#mascot-motion-root`. This limits the migration blast radius and keeps the site's existing content, intro choreography, study-module links, and GSAP scroll effects intact.

## Runtime / dependency versions

The homepage uses an HTML import map to load React 19.2.0 and Remotion / `@remotion/player` 4.0.528 as ESM from esm.sh. Remotion packages are pinned to the same version. The site can therefore remain static without a build step. For stricter production supply-chain control, the next migration step can move the same modules into a locked npm/Vite workspace and self-host the generated bundle.

Official Player reference: https://www.remotion.dev/docs/player

## File map

```text
index.html
  ├─ imports assets/css/03-mascot-neubrutalism.css
  ├─ import map: react / react-dom / remotion / @remotion/player
  ├─ #mascot-motion-root
  └─ assets/js/11-mascot-react.js
       ├─ assets/js/mascot/config.js      asset landmarks + expression registry
       ├─ assets/js/mascot/artwork.js     reusable layered React artwork
       ├─ assets/js/mascot/studio.js      picker, live pointer preview, Player controls
       └─ assets/js/mascot/sequence.js    deterministic frame-driven composition
```

The previous static rig remains in `assets/js/09-mascot-rig.js`. It has been updated to resolve extracted assets by filename instead of relying only on the length of the image URL. Its public helper `window.MbahRig.setExpression(name)` allows future website events to control the legacy mascot reaction states.

## Responsibility boundaries

### HTML — `index.html`

Contains page metadata and semantic section structure only:
- the `#mascot-motion-lab` landing-page section and React mount point;
- the CSS include and pinned module import map;
- the module entrypoint `assets/js/11-mascot-react.js`.

Do not place expression logic or styling in inline HTML. Keep the loading/fallback content inside `#mascot-motion-root` accessible if the module can't load.

### CSS — `assets/css/03-mascot-neubrutalism.css`

Owns all studio styles: neo-brutalist card borders and offset shadows, controls, expression chips, responsive layouts, Remotion frame dressing, focus rings, and reduced-motion behavior. Styles are scoped with the `swm-` namespace to avoid collisions with the existing page CSS.

Palette reuses site tokens: `--ink`, `--gold`, `--blue`, `--lime`, `--sky`, `--red`, `--d`, and `--b`, each with fallbacks where helpful.

### Asset registry — `assets/js/mascot/config.js`

`MASCOTS` is the source of truth for selectable image assets and normalized landmarks. Each eye stores `x`, `y`, and radius `r` as fractions of the original width/height basis. The head cutoff and expression anchor are per mascot because each artwork has a different crop.

To add a mascot:
1. Add the file under `assets/images/`.
2. Add a new entry to `MASCOTS` with `src`, natural dimensions, `headCut`, `expressionAnchor`, and eye landmarks.
3. Make sure the eye and mouth overlays align at desktop and mobile sizes.

The old DOM rig's asset lookup is currently explicit for `image-002.webp`, `image-004.webp`, and `image-006.webp`. Add matching entries to `ASSET_RIG` in `assets/js/09-mascot-rig.js` if more assets should use that legacy gaze rig.

### React art layer — `assets/js/mascot/artwork.js`

`MbahArtwork` is a presentation-only component. Props:
- `mascotId`: a key in `MASCOTS`;
- `expression`: a key in `EXPRESSIONS`;
- `gaze`: normalized `[x, y]` target where each axis is roughly -1…1;
- `blink`: 0 open, 1 closed;
- `headTilt`: small rotation in degrees;
- `breath`: subtle breathing multiplier;
- `interactive`, `onPointerMove`, `onPointerLeave`: optional interaction hooks.

The eye overlay crops the actual source-image pixels around each original eye landmark, then translates that crop inside a clipped circular window to preserve the mascot's original eye texture while animating gaze. The art component is built without JSX so the static homepage can load it as standard browser ESM; the `h()` calls are equivalent to `React.createElement`. Brows and mouth are overlays that approximate expression changes, rather than a destructive edit to the source artwork.

### Motion controller — `assets/js/mascot/studio.js`

Owns interactive state and controls. State changes are passed through React props, not applied by manually mutating nodes. It includes:
- live pointer-driven gaze with a reduced-motion fallback;
- random idle blinks while the live view is mounted;
- selectable mascot assets and eight expression presets;
- an embedded Remotion Player whose sequence re-renders from the chosen props.

Presets: `neutral`, `happy`, `curious`, `confused`, `focused`, `surprised`, `sad`, `proud`.

### Deterministic animation — `assets/js/mascot/sequence.js`

`MbahMotionSequence` uses `useCurrentFrame()` and `interpolate()` to calculate gaze travel, blink timing, and head movement. A 240-frame / 30-fps sequence gives the Player an 8-second loop that can be paused or scrubbed. Motion is derived from frame position rather than ambient timers, so it is reproducible when checking timing and when rendered by Remotion.

### Entrypoint — `assets/js/11-mascot-react.js`

Mounts `MascotMotionStudio` only when the root element exists. Keep this file small; new behavior belongs to the modules above.

## Triggering legacy reactions from other features

```js
// Examples: call after a study milestone, a correct-answer streak, or a modal event.
window.MbahRig?.setExpression("happy");
window.MbahRig?.setExpression("curious");
window.MbahRig?.setExpression("focused");
window.MbahRig?.blink();
window.MbahRig?.happy();
```

Supported legacy reaction names are `happy`, `curious`, `focused`, `calm`, `proud`, `surprised`, and `sad`. The picker preview provides detailed face overlays; the legacy art currently maps those choices into blink/gaze/head-motion presets rather than redrawing every source image's mouth.

## Motion guidelines

- Use transform/opacity for motion where practical; avoid animating layout.
- Keep the live view pointer-driven, but keep the Remotion clip frame-driven.
- Prefer small, eased head tilts and gaze changes; avoid continuous aggressive shaking.
- Respect `prefers-reduced-motion`, pause unnecessary work off screen, and avoid tying every animation to scroll.
- Keep semantic text/control states available even when animation is reduced.
- If exact native facial articulation becomes a requirement, prepare separate layered face artwork (eye whites/pupils/brows/mouth) per mascot; source-image overlays can only approximate a full rig.

## Smoke-test checklist

- [ ] Homepage and existing study cards still load without a build step.
- [ ] The React expression section appears when external ESM dependencies are available.
- [ ] Pointer movement changes the live gaze; leaving the artwork returns the gaze to the preset.
- [ ] Each of the eight presets updates the mouth/brow overlay and active-state control.
- [ ] Remotion Player loops, pauses, scrubs, and reflects the current mascot/expression.
- [ ] `window.MbahRig.setExpression()` exists after the legacy rig initializes.
- [ ] On narrow screens, controls wrap without horizontal overflow.
- [ ] `prefers-reduced-motion: reduce` disables live idle blinking and softens control transitions.
