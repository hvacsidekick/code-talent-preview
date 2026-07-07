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
})();
