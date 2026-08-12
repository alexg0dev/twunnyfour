/**
 * TwunnyFour motion — smoother, richer, still restrained
 */
(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarse = window.matchMedia("(pointer: coarse)").matches;

  window.TW24_theatreSwap = function (body, _mark, paint) {
    if (!body) return paint();
    body.classList.add("is-swap");
    setTimeout(() => {
      paint();
      requestAnimationFrame(() => body.classList.remove("is-swap"));
    }, 220);
  };

  function initProgress() {
    let bar = document.querySelector(".tf-progress");
    if (!bar) {
      bar = document.createElement("div");
      bar.className = "tf-progress";
      document.body.prepend(bar);
    }
    let current = 0;
    let target = 0;
    const tick = () => {
      current += (target - current) * 0.12;
      bar.style.width = `${current}%`;
      requestAnimationFrame(tick);
    };
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      target = max > 0 ? (window.scrollY / max) * 100 : 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    if (!reduce) requestAnimationFrame(tick);
    else {
      window.addEventListener(
        "scroll",
        () => {
          bar.style.width = `${target}%`;
        },
        { passive: true },
      );
    }
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
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" },
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

  function initMagnetic() {
    if (reduce || coarse) return;
    document.querySelectorAll(".tf-btn--primary, .tf-nav__cta").forEach((btn) => {
      const wrap = document.createElement("span");
      wrap.className = "tf-mag";
      btn.parentNode.insertBefore(wrap, btn);
      wrap.appendChild(btn);

      wrap.addEventListener("mousemove", (e) => {
        const r = wrap.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.18}px, ${y * 0.22}px)`;
      });
      wrap.addEventListener("mouseleave", () => {
        btn.style.transform = "";
      });
    });
  }

  function initAsideParallax() {
    if (reduce || coarse) return;
    const aside = document.querySelector(".tf-hero__aside");
    const glow = document.querySelector(".tf-hero__aside-glow");
    const mark = document.querySelector(".tf-hero__aside-mark");
    if (!aside) return;

    aside.addEventListener("mousemove", (e) => {
      const r = aside.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      if (glow) glow.style.transform = `translate(${x * 18}px, ${y * 14}px) scale(1.05)`;
      if (mark) mark.style.transform = `translate(${x * -10}px, ${y * -8}px)`;
    });
    aside.addEventListener("mouseleave", () => {
      if (glow) glow.style.transform = "";
      if (mark) mark.style.transform = "";
    });
  }

  function initCardTilt() {
    if (reduce || coarse) return;
    document.querySelectorAll(".tf-card--link, .tf-card--featured").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `translateY(-4px) rotateX(${(-y * 3).toFixed(2)}deg) rotateY(${(x * 3).toFixed(2)}deg)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("is-ready");
    initProgress();
    initReveals();
    initNavScroll();
    initMagnetic();
    initAsideParallax();
    initCardTilt();
  });
})();
