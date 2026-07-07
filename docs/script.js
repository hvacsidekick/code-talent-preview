(() => {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Header scroll state ---------- */
  const header = document.querySelector("[data-header]");
  const setHeaderState = () => {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 24);
  };
  window.addEventListener("scroll", setHeaderState, { passive: true });
  setHeaderState();

  /* ---------- Mobile nav ---------- */
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const mobileNav = document.querySelector("[data-mobile-nav]");
  if (menuToggle && header && mobileNav) {
    const closeMenu = () => {
      header.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open menu");
    };
    menuToggle.addEventListener("click", () => {
      const isOpen = header.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });
    mobileNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && header.classList.contains("is-open")) closeMenu();
    });
  }

  /* ---------- Reveal on scroll (staggered per group) ---------- */
  const revealItems = Array.from(document.querySelectorAll(".reveal"));

  if (!prefersReduced) {
    // Stagger items that share a parent so groups cascade rather than pop.
    const groups = new Map();
    revealItems.forEach((el) => {
      const order = el.dataset.revealOrder;
      if (order) {
        el.style.animationDelay = `${(Number(order) - 1) * 80}ms`;
        return;
      }
      const list = groups.get(el.parentElement) || [];
      list.push(el);
      groups.set(el.parentElement, list);
    });
    groups.forEach((list) => {
      if (list.length < 2) return;
      list.forEach((el, i) => {
        el.style.animationDelay = `${Math.min(i, 6) * 60}ms`;
      });
    });
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  /* ---------- Stat count-up ---------- */
  const counters = document.querySelectorAll("[data-count]");
  if (counters.length && !prefersReduced && "IntersectionObserver" in window) {
    const countObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const node = entry.target;
          const target = Number(node.dataset.count);
          obs.unobserve(node);
          if (!Number.isFinite(target)) return;
          const duration = 1000;
          const start = performance.now();
          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            node.textContent = Math.round(target * eased).toLocaleString();
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((node) => countObserver.observe(node));
  }

  /* ---------- Host-a-meetup CTA preselects the contact reason ---------- */
  const reasonSelect = document.querySelector('[data-contact-form] select[name="reason"]');
  document.querySelectorAll("[data-reason]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      if (!reasonSelect) return;
      const wanted = trigger.dataset.reason;
      const match = Array.from(reasonSelect.options).find((opt) => opt.value === wanted || opt.text === wanted);
      if (match) reasonSelect.value = match.value || match.text;
    });
  });

  /* ---------- Contact form (static preview) ---------- */
  const form = document.querySelector("[data-contact-form]");
  const formNote = document.querySelector("[data-form-note]");
  if (form && formNote) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        formNote.textContent = "Please complete name, email, reason, and message.";
        form.reportValidity();
        return;
      }
      formNote.textContent = "Thanks — this preview captured your intent. Production will route it to the right person.";
      form.reset();
    });
  }

  /* ---------- Glowing wave hero canvas ----------
     Vanilla adaptation of the React GlowyWavesHero: several stacked sine
     lines in the indigo brand ramp, additively blended so crossings bloom,
     with a smoothed pointer bulge. Enhancement only — the hero renders fully
     without it (see .hero-media fallback glow + static frame below). */
  const heroCanvas = document.querySelector("[data-hero-waves]");
  const heroCtx = heroCanvas && heroCanvas.getContext ? heroCanvas.getContext("2d") : null;

  if (heroCanvas && heroCtx) {
    const hero = heroCanvas.closest(".hero") || heroCanvas.parentElement;
    // Cap devicePixelRatio: a decorative layer never needs full retina density,
    // and 4x pixel buffers on phones tank the frame budget.
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Wave lines: brand indigo ramp, y as a fraction of hero height.
    const LINES = [
      { amp: 34, freq: 1.3, speed: 0.16, phase: 0.0, y: 0.6, color: "120, 122, 235", width: 2.2, alpha: 0.9 },
      { amp: 26, freq: 1.7, speed: -0.12, phase: 1.7, y: 0.68, color: "90, 92, 220", width: 1.8, alpha: 0.7 },
      { amp: 46, freq: 0.9, speed: 0.09, phase: 3.1, y: 0.52, color: "60, 62, 170", width: 3, alpha: 0.5 },
      { amp: 20, freq: 2.3, speed: -0.2, phase: 4.6, y: 0.76, color: "150, 152, 255", width: 1.4, alpha: 0.6 },
    ];

    // Layout + pointer state cached outside the frame loop — no per-frame DOM reads.
    let cssW = 1;
    let cssH = 1;
    let rectLeft = 0;
    let rectTop = 0;
    let pointerActive = false;
    const pointer = { tx: 0.5, ty: 0.5, x: 0.5, y: 0.5, active: 0 };

    const measure = () => {
      const rect = hero.getBoundingClientRect();
      rectLeft = rect.left;
      rectTop = rect.top;
      cssW = Math.max(1, rect.width);
      cssH = Math.max(1, rect.height);
      heroCanvas.width = Math.round(cssW * dpr);
      heroCanvas.height = Math.round(cssH * dpr);
      // Draw in CSS pixels; the transform bakes in the DPR scale.
      heroCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t) => {
      // Exponential smoothing toward the pointer target (and its influence).
      pointer.x += (pointer.tx - pointer.x) * 0.06;
      pointer.y += (pointer.ty - pointer.y) * 0.06;
      pointer.active += ((pointerActive ? 1 : 0) - pointer.active) * 0.05;

      heroCtx.clearRect(0, 0, cssW, cssH);
      heroCtx.globalCompositeOperation = "lighter";

      const time = t * 0.001;
      const px = pointer.x * cssW;
      const py = pointer.y * cssH;
      const step = Math.max(6, Math.floor(cssW / 140));

      for (const line of LINES) {
        const baseY = line.y * cssH;
        heroCtx.beginPath();
        for (let x = -step; x <= cssW + step; x += step) {
          const nx = x / cssW;
          // Gaussian bulge pulling the line toward the cursor, fading with distance.
          const dx = x - px;
          const infl = Math.exp(-(dx * dx) / (2 * 220 * 220)) * (baseY - py) * -0.35 * pointer.active;
          const y =
            baseY +
            Math.sin(nx * Math.PI * 2 * line.freq + time * line.speed * Math.PI * 2 + line.phase) * line.amp +
            Math.sin(nx * Math.PI * 4 * line.freq + time * line.speed * Math.PI + line.phase) * (line.amp * 0.3) +
            infl;
          if (x === -step) heroCtx.moveTo(x, y);
          else heroCtx.lineTo(x, y);
        }
        heroCtx.lineCap = "round";
        // Soft glow pass...
        heroCtx.strokeStyle = `rgba(${line.color}, ${line.alpha * 0.5})`;
        heroCtx.lineWidth = line.width * 3;
        heroCtx.shadowColor = `rgba(${line.color}, ${line.alpha})`;
        heroCtx.shadowBlur = 18;
        heroCtx.stroke();
        // ...then a crisp core with no shadow.
        heroCtx.shadowBlur = 0;
        heroCtx.strokeStyle = `rgba(${line.color}, ${line.alpha})`;
        heroCtx.lineWidth = line.width;
        heroCtx.stroke();
      }

      heroCtx.globalCompositeOperation = "source-over";
    };

    let rafId = 0;
    let running = false;
    let onScreen = true;

    const frame = (t) => {
      draw(t);
      rafId = requestAnimationFrame(frame);
    };
    const start = () => {
      if (running || prefersReduced || !onScreen || document.hidden) return;
      running = true;
      rafId = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
    };

    // Pointer target updates happen on move (event-rate), not per frame.
    window.addEventListener(
      "pointermove",
      (event) => {
        const x = (event.clientX - rectLeft) / cssW;
        const y = (event.clientY - rectTop) / cssH;
        pointer.tx = Math.min(1.2, Math.max(-0.2, x));
        pointer.ty = Math.min(1.2, Math.max(-0.2, y));
        pointerActive = x >= 0 && x <= 1 && y >= 0 && y <= 1;
      },
      { passive: true }
    );
    window.addEventListener("blur", () => {
      pointerActive = false;
    });

    // Keep the cached hero rect fresh without reading layout inside draw().
    window.addEventListener("resize", measure, { passive: true });
    window.addEventListener(
      "scroll",
      () => {
        const rect = hero.getBoundingClientRect();
        rectLeft = rect.left;
        rectTop = rect.top;
      },
      { passive: true }
    );

    // Pause when the hero scrolls offscreen; resume when it returns.
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          onScreen = entries[0].isIntersecting;
          if (onScreen) start();
          else stop();
        },
        { threshold: 0 }
      );
      io.observe(hero);
    }

    // Pause when the tab is hidden.
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stop();
      else start();
    });

    measure();
    if (prefersReduced) {
      // Reduced motion: one static frame, no RAF loop.
      draw(0);
      heroCanvas.classList.add("is-live");
    } else {
      // Prime a first frame, fade the layer in, then run.
      draw(0);
      heroCanvas.classList.add("is-live");
      start();
    }
  }
})();
