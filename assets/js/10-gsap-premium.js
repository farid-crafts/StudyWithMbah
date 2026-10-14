/* Study with Mbah — premium GSAP motion layer.
   The cinematic intro and mascot rigs stay on their existing WAAPI/RAF engines
   to avoid transform ownership conflicts. GSAP owns content reveals and scroll polish. */
(() => {
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Keep the existing IntersectionObserver + CSS reveal as a safe fallback.
  if (!gsap || !ScrollTrigger || reduceMotion) return;

  const root = document.documentElement;
  let progressBar = null;

  try {
    gsap.registerPlugin(ScrollTrigger);
    gsap.defaults({ ease: 'power3.out' });
    root.classList.add('swm-gsap-ready');

    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

    // A low-profile progress line gives long pages a quiet, useful sense of progress.
    progressBar = document.createElement('div');
    progressBar.id = 'swm-scroll-progress';
    progressBar.setAttribute('aria-hidden', 'true');
    document.body.append(progressBar);

    gsap.set(progressBar, { scaleX: 0, transformOrigin: 'left center' });
    gsap.to(progressBar, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: () => ScrollTrigger.maxScroll(window),
        scrub: 0.18,
        invalidateOnRefresh: true
      }
    });

    const reveal = (element, type = 'content') => {
      if (element.dataset.swmMotionPrepared === 'true') return;
      element.dataset.swmMotionPrepared = 'true';

      // Remove a fallback observer class in case it fired while the CDN was loading.
      element.classList.remove('in');
      const index = Number.parseFloat(element.style.getPropertyValue('--i')) || 0;
      const isCard = type === 'card';

      gsap.fromTo(element,
        {
          autoAlpha: 0,
          y: isCard ? 28 : 24,
          scale: isCard ? 0.965 : 0.985
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: isCard ? 0.86 : 0.78,
          delay: clamp(index * 0.045, 0, 0.18),
          ease: 'power3.out',
          overwrite: 'auto',
          scrollTrigger: {
            trigger: element,
            start: 'top 89%',
            once: true,
            invalidateOnRefresh: true
          },
          onStart: () => element.classList.add('swm-motion-running'),
          onComplete: () => {
            element.classList.remove('swm-motion-running');
            element.classList.add('swm-motion-done');
            // .rv.in is the existing visible state; .sb must not receive .in
            // because the legacy .sb.in CSS keyframe would compete with GSAP.
            if (type === 'content') element.classList.add('in');
            gsap.set(element, { clearProps: 'opacity,visibility,transform' });
          }
        }
      );
    };

    gsap.utils.toArray('.rv').forEach(element => reveal(element, 'content'));
    gsap.utils.toArray('.sb').forEach(element => reveal(element, 'card'));

    // A restrained background drift, independent of the existing scroll-stack effect.
    const ghost = document.querySelector('.hero .ghost');
    const hero = document.querySelector('#top');
    if (ghost && hero) {
      gsap.to(ghost, {
        yPercent: -7,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.55,
          invalidateOnRefresh: true
        }
      });
    }

    // The intro remains cinematic; animate the navigation only when its overlay exits.
    let headerPlayed = false;
    const playHeaderEntrance = () => {
      if (headerPlayed || root.classList.contains('intro-pending') || document.body.classList.contains('lock')) return;
      headerPlayed = true;
      const navItems = gsap.utils.toArray('header .logo, header .tg, header nav > a, header nav > button');
      if (!navItems.length) return;
      gsap.fromTo(navItems,
        { autoAlpha: 0, y: -10 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.62,
          stagger: 0.035,
          ease: 'power3.out',
          clearProps: 'opacity,visibility,transform',
          overwrite: 'auto'
        }
      );
    };

    if (!root.classList.contains('intro-pending') && !document.body.classList.contains('lock')) {
      playHeaderEntrance();
    } else {
      const introObserver = new MutationObserver(() => {
        if (!root.classList.contains('intro-pending') && !document.body.classList.contains('lock')) {
          introObserver.disconnect();
          requestAnimationFrame(playHeaderEntrance);
        }
      });
      introObserver.observe(root, { attributes: true, attributeFilter: ['class'] });
      introObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    }

    // Detail view content is rendered on demand; animate it only when opened.
    const detailObserver = new MutationObserver(() => {
      if (!document.body.classList.contains('det')) return;
      requestAnimationFrame(() => {
        const items = gsap.utils.toArray('#detail .wrap > *')
          .filter(element => getComputedStyle(element).display !== 'none');
        if (!items.length) return;
        gsap.fromTo(items,
          { autoAlpha: 0, y: 18 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.62,
            stagger: 0.045,
            ease: 'power3.out',
            clearProps: 'opacity,visibility,transform',
            overwrite: 'auto'
          }
        );
        ScrollTrigger.refresh();
      });
    });
    detailObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    // Tiny pointer feedback on controls not already governed by the magnetic-button engine.
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      const hoverTargets = gsap.utils.toArray('nav a, nav button, .btn:not([data-mag]), .tg, #wa, #replay');
      hoverTargets.forEach(element => {
        element.addEventListener('pointerenter', () => {
          gsap.to(element, { scale: 1.018, duration: 0.22, ease: 'power3.out', overwrite: 'auto' });
        }, { passive: true });
        element.addEventListener('pointerleave', () => {
          gsap.to(element, { scale: 1, duration: 0.36, ease: 'power3.out', overwrite: 'auto' });
        }, { passive: true });
      });
    }

    // Refresh positions when fonts and imagery finish loading, without forcing layout each frame.
    window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh()).catch(() => {});
    }

    // This flag tells the legacy observer to stand down for the targets owned by GSAP.
    window.SWM_GSAP_MOTION_READY = true;
  } catch (error) {
    delete window.SWM_GSAP_MOTION_READY;
    root.classList.remove('swm-gsap-ready');
    if (progressBar) progressBar.remove();
    console.error('[StudyWithMbah] Premium motion fallback enabled.', error);
  }
})();
