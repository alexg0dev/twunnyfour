/**
 * TwunnyFour motion — restrained, product-site quality
 */
(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function initHero() {
    const hero = document.querySelector(".hero");
    if (!hero) return;
    requestAnimationFrame(() => hero.classList.add("is-ready"));
  }

  function initMagnetic() {
    /* Disabled — felt gimmicky for enterprise */
  }

  function initReveals() {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -6% 0px" },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  }

  function initChapterBar() {
    const bar = document.querySelector("[data-chapter-bar]");
    if (!bar) return;
    const fill = bar.querySelector("span");
    const sections = [...document.querySelectorAll("[data-chapter]")];
    if (!sections.length) return;
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? (window.scrollY / max) * 100 : 0;
      fill.style.width = `${Math.min(100, Math.max(0, p))}%`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  window.TW24_theatreSwap = function (contentEl, watermarkEl, renderFn) {
    if (!contentEl) return renderFn();
    contentEl.classList.remove("is-in");
    contentEl.classList.add("is-swap");
    const stage = contentEl.closest(".theatre-stage");
    if (stage) stage.classList.add("is-swap");
    setTimeout(() => {
      renderFn();
      contentEl.classList.remove("is-swap");
      contentEl.classList.add("is-in");
      if (stage) stage.classList.remove("is-swap");
      if (watermarkEl) {
        watermarkEl.style.transform = "translateY(-8px)";
        requestAnimationFrame(() => {
          watermarkEl.style.transform = "";
        });
      }
    }, reduce ? 0 : 200);
  };

  document.addEventListener("DOMContentLoaded", () => {
    initHero();
    initMagnetic();
    initReveals();
    initChapterBar();
  });
})();
