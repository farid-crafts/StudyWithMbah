# HTML motion audit — Study with Mbah

Audit scope: all five root-level HTML documents on the `main` branch. Only `index.html` is the active root entrypoint used by the site's default URL; the other named files are historical variants and are left untouched to avoid changing archived versions.

| HTML file | Approx. source size | Existing motion implementation | Decision |
|---|---:|---|---|
| `index.html` | 8.5 KB after separation | External CSS/JS; custom cinematic intro; RAF-driven mascot/section effects; CSS reveal fallback | Add the GSAP premium motion layer here |
| `(MODE 1 TEMA )index.html` | 1.05 MB | Inline CSS and ~200 KB inline JavaScript, including custom motion logic | Keep as historical snapshot |
| `(VERSI 2) index.html` | 50 KB | Inline CSS, Tailwind CDN/config, and custom transition/reveal logic | Keep as historical snapshot |
| `(pre-final) index.html` | 601 KB | Large inline CSS and ~557 KB inline JavaScript, including embedded image data and custom animation logic | Keep as historical snapshot |
| `(versi 1)index.html` | 52 KB | Inline CSS/JS and an older GSAP + ScrollTrigger implementation | Treat as historical reference, not a second production entrypoint |

## Motion audit findings

- The active page already has a deliberately staged intro, plus custom requestAnimationFrame/WAAPI mascot animation and section stacking. Replacing those engines wholesale would risk transform and timeline conflicts.
- The existing `.rv` reveal and `.sb.in` card keyframe can compete with a second animation engine. The active app's IntersectionObserver now remains as the no-GSAP/reduced-motion fallback, while a successfully initialized GSAP layer owns those reveal targets.
- Images, HTML structure, theme toggling, navigation, modal/detail views, and existing mascot behavior are not redesigned by this motion pass.
- Reduced-motion preference bypasses GSAP enhancements; the original CSS/IntersectionObserver reveal path continues to make content visible.
- The GSAP CDN is loaded after the page markup, and its enhancement script is guarded. If GSAP or ScrollTrigger fails to load, the original reveal fallback stays active.

## Premium motion layer

- GSAP 3.15 + ScrollTrigger: per-element viewport reveals with restrained easing and stagger, module-card reveals, page progress line, subtle hero-background drift, header entrance after the intro overlay exits, and detail-view entrance.
- CSS: light-touch pointer hover feedback and motion-specific transition ownership to avoid CSS and GSAP fighting over the same transform during reveal.
