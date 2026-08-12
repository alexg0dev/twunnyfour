/**
 * TwunnyFour motion — paced, intentional
 */
(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  window.TW24_theatreSwap = function (body, _mark, paint) {
    if (!body) return paint();
    body.classList.add("is-swap");
    setTimeout(() => {
      paint();
      body.classList.remove("is-swap");
    }, 180);
  };

  function initProgress() {
    let bar = document.querySelector(".tf-progress");
    if (!bar) {
      bar = document.createElement("div");
      bar.className = "tf-progress";
      document.body.prepend(bar);
    }
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? (window.scrollY / max) * 100 : 0;
      bar.style.width = `${Math.min(100, Math.max(0, p))}%`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function initReveals() {
    if (reduce) {
      document.querySelectorAll(".tf-reveal").forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    document.querySelectorAll(".tf-reveal").forEach((el) => io.observe(el));
  }

  function initNavScroll() {
    const nav = document.querySelector(".tf-nav");
    if (!nav) return;
    const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("is-ready");
    initProgress();
    initReveals();
    initNavScroll();
  });
})();
