const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileNav = document.querySelector("[data-mobile-nav]");

const setHeaderState = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

window.addEventListener("scroll", setHeaderState, { passive: true });
setHeaderState();

if (menuToggle && header && mobileNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("is-open");
    menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => header.classList.remove("is-open"));
  });
}

const revealItems = document.querySelectorAll(".reveal");

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
    { threshold: 0.12 },
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reducedMotion) {
  document.querySelectorAll("[data-count]").forEach((node) => {
    const target = Number(node.dataset.count);
    if (!Number.isFinite(target)) return;

    let started = false;
    const run = () => {
      if (started) return;
      started = true;
      const duration = 900;
      const startTime = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        node.textContent = Math.round(target * eased).toLocaleString();
        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    };

    const statObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run();
          statObserver.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    statObserver.observe(node);
  });
}

const form = document.querySelector("[data-contact-form]");
const formNote = document.querySelector("[data-form-note]");

if (form && formNote) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    formNote.textContent = "Prototype captured the intent. Production needs email routing or CRM integration.";
  });
}
