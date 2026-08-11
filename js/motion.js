/**
 * TwunnyFour motion — subtle scroll reveals only
 */
(function () {
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

  function initChapterBar() {
    const bar = document.querySelector("[data-chapter-bar]");
    if (!bar) return;
    const fill = bar.querySelector("span");
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? (window.scrollY / max) * 100 : 0;
      fill.style.width = `${Math.min(100, Math.max(0, p))}%`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  window.TW24_theatreSwap = function (body, mark, paint) {
    if (!body) {
      paint();
      return;
    }
    body.classList.remove("is-in");
    body.classList.add("is-swap");
    setTimeout(() => {
      paint();
      body.classList.remove("is-swap");
      body.classList.add("is-in");
    }, 120);
  };

  document.addEventListener("DOMContentLoaded", () => {
    initReveals();
    initChapterBar();
  });
})();
