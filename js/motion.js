/**
 * TwunnyFour premium motion
 */
(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  window.TW24_theatreSwap = function (body, _mark, paint) {
    if (!body) return paint();
    body.classList.add("is-swap");
    setTimeout(() => {
      paint();
      body.classList.remove("is-swap");
    }, 90);
  };

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
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  }

  function initNavScroll() {
    const nav = document.querySelector(".site-nav");
    if (!nav) return;
    const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function initVizParallax() {
    if (reduce) return;
    const viz = document.querySelector(".hero__viz");
    const canvas = document.querySelector(".hero__viz-canvas");
    if (!viz || !canvas) return;
    viz.addEventListener("mousemove", (e) => {
      const r = viz.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      canvas.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 6}deg) scale(1.02)`;
    });
    viz.addEventListener("mouseleave", () => {
      canvas.style.transform = "";
    });
  }

  function initMagnetic() {
    if (reduce || window.matchMedia("(pointer: coarse)").matches) return;
    document.querySelectorAll(".hero__cta .btn, .cta-band .btn").forEach((btn) => {
      const wrap = btn.parentElement?.classList.contains("mag")
        ? btn.parentElement
        : btn;
      wrap.addEventListener("mousemove", (e) => {
        const r = wrap.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.12}px, ${y * 0.18}px)`;
      });
      wrap.addEventListener("mouseleave", () => {
        btn.style.transform = "";
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initReveals();
    initNavScroll();
    initVizParallax();
    initMagnetic();
  });
})();
