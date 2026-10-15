/* 13-gsap-signature.js — one memorable moment plus restrained visual polish.
   Runs after 10-gsap-premium.js and 12-gsap-motion.js. */
(() => {
  const gsap = window.gsap;
  const ST = window.ScrollTrigger;
  if (!gsap || !ST || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
  const root = document.documentElement;
  const introDone = () =>
    !root.classList.contains("intro-pending") &&
    !document.body.classList.contains("lock");

  const whenIntroDone = (fn) => {
    if (introDone()) {
      fn();
      return;
    }
    const observer = new MutationObserver(() => {
      if (!introDone()) return;
      observer.disconnect();
      requestAnimationFrame(fn);
    });
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
  };

  const safe = (name, fn) => {
    try {
      fn();
    } catch (error) {
      console.warn("[StudyWithMbah] visual effect skipped: " + name, error);
    }
  };

  safe("register ScrollTrigger", () => gsap.registerPlugin(ST));

  /* 1. Signature moment: marker circle first, then the LULUS stamp lands. */
  safe("LULUS stamp", () => {
    const stamp = $(".swm-stamp");
    const path = $(".swm-scribble path");
    const length = path ? path.getTotalLength() : 0;

    if (stamp) gsap.set(stamp, { autoAlpha: 0, scale: 3, rotation: -24 });
    if (path && length) {
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    }

    whenIntroDone(() => {
      const timeline = gsap.timeline({ delay: 1.2 });
      if (path && length) {
        timeline.to(path, { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut" });
      }
      if (stamp) {
        timeline
          .to(stamp, {
            autoAlpha: 1,
            scale: 0.9,
            rotation: 0,
            duration: 0.3,
            ease: "power4.in"
          }, path && length ? "+=0.1" : 0)
          .to(stamp, {
            scale: 1,
            duration: 0.45,
            ease: "elastic.out(1, 0.4)",
            clearProps: "opacity,visibility"
          });
      }
    });
  });

  /* 2. Kawung texture drifts with scroll using CSS variables, not section transforms. */
  safe("batik drift", () => {
    ["#top", ".cd", "footer"].forEach((selector) => {
      const element = $(selector);
      if (!element) return;
      gsap.fromTo(element, { "--by": "0px" }, {
        "--by": "-180px",
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
          invalidateOnRefresh: true
        }
      });
    });
  });

  /* 3. Hand-drawn red marker beneath the existing .ttl headings. */
  safe("title marker", () => {
    $$(".ttl").forEach((title) => {
      gsap.set(title, { "--ink": 0 });
      ST.create({
        trigger: title,
        start: "top 88%",
        once: true,
        onEnter: () => gsap.to(title, {
          "--ink": 1,
          duration: 0.7,
          ease: "power3.out",
          delay: 0.35
        })
      });
    });
  });

  /* 4. Cat paw tracks the current scroll progress line. */
  safe("progress paw", () => {
    const paw = document.createElement("div");
    paw.className = "swm-progress-paw";
    paw.setAttribute("aria-hidden", "true");
    paw.innerHTML =
      '<svg viewBox="0 0 40 40"><g transform="rotate(-20 20 20)" fill="#FFA51F" stroke="#2A1608" stroke-width="2.4" stroke-linejoin="round">' +
      '<path d="M20 19c-5.5 0-10 4.2-10 8.8 0 3.2 2.3 5.2 5.2 5.2 2 0 3.2-1 4.8-1s2.8 1 4.8 1c2.9 0 5.2-2 5.2-5.2C30 23.2 25.5 19 20 19z"/>' +
      '<ellipse cx="9.5" cy="17" rx="3.2" ry="4.2"/><ellipse cx="16" cy="9.5" rx="3.2" ry="4.6"/>' +
      '<ellipse cx="24" cy="9.5" rx="3.2" ry="4.6"/><ellipse cx="30.5" cy="17" rx="3.2" ry="4.2"/>' +
      "</g></svg>";
    document.body.append(paw);

    const setX = gsap.quickSetter(paw, "x", "px");
    const setRotation = gsap.quickSetter(paw, "rotation", "deg");
    ST.create({
      start: 0,
      end: () => ST.maxScroll(window),
      onUpdate: (self) => {
        setX(self.progress * Math.max(0, window.innerWidth - 26));
        setRotation(self.direction * 14 * Math.min(1, Math.abs(self.getVelocity()) / 900));
      }
    });
  });

  window.addEventListener("load", () => ST.refresh(), { once: true });
  window.SWM_GSAP_SIGNATURE = true;
})();