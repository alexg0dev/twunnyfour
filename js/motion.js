/**
 * TwunnyFour motion — intentional, not ornamental.
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
    document.querySelectorAll(".tf-reveal").forEach((el) => io.observe(el));
  }

  function initNavScroll() {
    const nav = document.querySelector(".tf-nav");
    if (!nav) return;
    const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  document.addEventListener("DOMContentLoaded", () => {
    initReveals();
    initNavScroll();
  });
})();
