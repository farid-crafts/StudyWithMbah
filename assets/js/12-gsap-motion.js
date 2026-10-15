/* Study with Mbah — GSAP motion layer, part 2 (new animations).
   Loaded after 10-gsap-premium.js. Pure progressive enhancement:
   - no GSAP / ScrollTrigger (CDN failure) or reduced motion  -> exits, page stays fully usable.
   - never touches elements whose transform is owned by another engine
     (intro WAAPI, mascot rigs, carousel cards, hero letters, magnetic buttons). */
(() => {
  const gsap = window.gsap;
  const ST = window.ScrollTrigger;
  if (!gsap || !ST || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const root = document.documentElement;
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
  const vh = () => window.innerHeight || document.documentElement.clientHeight;
  // Already on screen at load: leave it alone so nothing flashes or replays.
  const onScreen = (el, line = 0.8) => {
    const r = el.getBoundingClientRect();
    return r.top < vh() * line && r.bottom > 0;
  };
  const introDone = () => !root.classList.contains('intro-pending') && !document.body.classList.contains('lock');
  const whenIntroDone = (fn) => {
    if (introDone()) { fn(); return; }
    const mo = new MutationObserver(() => {
      if (!introDone()) return;
      mo.disconnect();
      requestAnimationFrame(fn);
    });
    mo.observe(root, { attributes: true, attributeFilter: ['class'] });
    mo.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  };
  const safe = (name, fn) => {
    try { fn(); } catch (error) { console.warn('[StudyWithMbah] GSAP effect skipped: ' + name, error); }
  };

  try { gsap.registerPlugin(ST); } catch (error) { return; }

  /* 1. Score badge counts up once the intro hands the hero over. */
  safe('score counter', () => {
    const badge = $('.tag.s');
    const node = badge && Array.from(badge.childNodes).find((n) => n.nodeType === 3 && /730/.test(n.nodeValue));
    if (!node) return;
    const state = { v: 0 };
    whenIntroDone(() => {
      node.nodeValue = '0+';
      gsap.to(state, {
        v: 730, duration: 1.7, ease: 'power2.out', delay: 0.25,
        onUpdate: () => { node.nodeValue = Math.round(state.v) + '+'; },
        onComplete: () => { node.nodeValue = '730+'; }
      });
      gsap.fromTo(badge, { scale: 0.86 }, { scale: 1, duration: 0.9, ease: 'back.out(2)', delay: 0.25, clearProps: 'transform' });
    });
  });

  /* 2. Countdown boxes drop in with a springy stagger. */
  safe('countdown', () => {
    const boxes = $$('.cd .cds > div');
    const group = $('.cd .cds');
    if (!boxes.length || !group || onScreen(group, 0.75)) return;
    gsap.fromTo(boxes,
      { autoAlpha: 0, y: 60, rotation: -6, scale: 0.9 },
      {
        autoAlpha: 1, y: 0, rotation: 0, scale: 1, duration: 0.95, stagger: 0.09, ease: 'back.out(1.6)',
        clearProps: 'opacity,visibility,transform',
        scrollTrigger: { trigger: group, start: 'top 82%', once: true }
      });
  });

  /* 3. Campus carousel frame rises in (cards inside are driven by their own loop). */
  safe('carousel', () => {
    const frame = $('#cf');
    if (!frame || onScreen(frame, 0.9)) return;
    gsap.fromTo(frame,
      { autoAlpha: 0, y: 56, scale: 0.95 },
      {
        autoAlpha: 1, y: 0, scale: 1, duration: 1.15, ease: 'power3.out', clearProps: 'opacity,visibility,transform',
        scrollTrigger: { trigger: frame, start: 'top 92%', once: true }
      });
  });

  /* 4. Paragraphs light up word by word while scrolling (scrubbed). */
  safe('word scrub', () => {
    const escape = (s) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
    $$('#alt .rv > p, .swm-motion-heading > p').forEach((p) => {
      if (p.dataset.swmWords === 'true') return;
      const text = p.textContent.trim();
      if (!text) return;
      p.dataset.swmWords = 'true';
      p.setAttribute('aria-label', text);
      p.innerHTML = text.split(/\s+/).map((w) => '<span class="swm-w" aria-hidden="true">' + escape(w) + '</span>').join(' ');
      gsap.fromTo($$('.swm-w', p), { opacity: 0.2 }, {
        opacity: 1, ease: 'none', stagger: 0.08,
        scrollTrigger: { trigger: p, start: 'top 88%', end: 'bottom 58%', scrub: 0.4 }
      });
    });
  });

  /* 5. ALT photo parallax inside its frame. */
  safe('alt parallax', () => {
    const img = $('#alt .ph img');
    if (!img) return;
    gsap.fromTo(img, { scale: 1.16, yPercent: -7 }, {
      scale: 1.16, yPercent: 7, ease: 'none',
      scrollTrigger: { trigger: '#alt .ph', start: 'top bottom', end: 'bottom top', scrub: 0.6 }
    });
  });

  /* 6. Mascot Lab heading + stamp. */
  safe('mascot lab intro', () => {
    const section = $('#mascot-motion-lab');
    if (!section) return;
    const title = $('.swm-motion-heading h2', section);
    const eyebrow = $('.swm-eyebrow', section);
    const stamp = $('.swm-motion-stamp', section);
    const tl = gsap.timeline({
      defaults: { ease: 'power4.out' },
      scrollTrigger: { trigger: section, start: 'top 72%', once: true }
    });
    if (eyebrow) tl.fromTo(eyebrow, { autoAlpha: 0, x: -24 }, { autoAlpha: 1, x: 0, duration: 0.7, clearProps: 'opacity,visibility,transform' }, 0);
    if (title) tl.fromTo(title, { clipPath: 'inset(0 100% 0 0)', x: -28 }, { clipPath: 'inset(0 0% 0 0)', x: 0, duration: 1.05, clearProps: 'clipPath,transform' }, 0.08);
    if (stamp) tl.fromTo(stamp, { autoAlpha: 0, scale: 0.6, rotation: -14 }, { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.9, ease: 'back.out(2)', clearProps: 'opacity,visibility,transform' }, 0.25);
  });

  /* 7. Footer settles in. */
  safe('footer', () => {
    const footer = $('footer');
    if (!footer || onScreen(footer, 0.98)) return;
    gsap.fromTo(footer, { autoAlpha: 0, y: 36 }, {
      autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out', clearProps: 'opacity,visibility,transform',
      scrollTrigger: { trigger: footer, start: 'top 99%', once: true }
    });
  });

  /* 8. WhatsApp button gets attention a few times, then stays quiet. */
  safe('whatsapp nudge', () => {
    const wa = $('#wa');
    if (!wa) return;
    whenIntroDone(() => {
      const tl = gsap.timeline({ repeat: 2, repeatDelay: 9, delay: 7 });
      tl.to(wa, { y: -12, duration: 0.2, ease: 'power2.out' })
        .to(wa, { y: 0, duration: 0.7, ease: 'bounce.out' })
        .to(wa, { rotation: -3, duration: 0.07, repeat: 5, yoyo: true, ease: 'sine.inOut' }, '-=0.35')
        .set(wa, { clearProps: 'transform' });
    });
  });

  /* Layout shifts (fonts, images, #alt removal after the deadline) -> recalc trigger positions. */
  const refresh = () => ST.refresh();
  window.addEventListener('load', refresh, { once: true });
  window.addEventListener('resize', () => { window.clearTimeout(refresh.t); refresh.t = window.setTimeout(refresh, 200); });
  window.SWM_GSAP_EXTRAS = true;
})();
