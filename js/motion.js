/**
 * TwunnyFour motion — enter, scroll, hover, click
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
      current += (target - current) * 0.14;
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
      document.querySelectorAll(".tf-reveal, .tf-reveal-child").forEach((el) => {
        el.classList.add("is-in");
      });
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
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

  function initHeroParallax() {
    if (reduce) return;
    const hero = document.querySelector(".tf-hero");
    const bg = document.querySelector(".tf-hero__bg");
    const main = document.querySelector(".tf-hero__main");
    const visual = document.querySelector(".tf-hero__visual");
    if (!hero || !bg) return;

    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      const h = hero.offsetHeight || 1;
      const p = Math.min(1, Math.max(0, y / h));
      bg.style.transform = `translate3d(0, ${y * 0.22}px, 0)`;
      if (main) {
        main.style.transform = `translate3d(0, ${y * 0.08}px, 0)`;
        main.style.opacity = String(1 - p * 0.7);
      }
      if (visual) {
        visual.style.transform = `translate3d(0, ${y * 0.14}px, 0)`;
        visual.style.opacity = String(1 - p * 0.85);
      }
      ticking = false;
    };
    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      },
      { passive: true },
    );
  }

  function initCountUp() {
    const nodes = document.querySelectorAll("[data-count-up]");
    if (!nodes.length) return;
    const format = (n) => n.toLocaleString("en-US");
    const run = (el) => {
      const to = Number(el.getAttribute("data-to") || "0");
      if (reduce) {
        el.textContent = format(to);
        return;
      }
      const start = performance.now();
      const dur = 1800;
      const tick = (now) => {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = format(Math.round(to * eased));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          run(e.target);
          io.unobserve(e.target);
        });
      },
      { threshold: 0.4 },
    );
    nodes.forEach((n) => io.observe(n));
  }

  function initScanForm() {
    const form = document.getElementById("domain-scan");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("input");
      const value = (input?.value || "").trim();
      if (!value) return;
      try {
        sessionStorage.setItem("tf_scan_target", value);
      } catch (_) {}
      if (window.TW24?.toast) {
        window.TW24.toast(`Scan queued for ${value}. Choose a plan to protect it.`);
      }
      setTimeout(() => {
        location.href = `pricing.html?domain=${encodeURIComponent(value)}`;
      }, 450);
    });
  }

  function initMagnetic() {
    if (reduce || coarse) return;
    document.querySelectorAll(".tf-btn--primary, .tf-nav__cta, .tf-login__submit").forEach((btn) => {
      if (btn.closest(".tf-mag")) return;
      const wrap = document.createElement("span");
      wrap.className = "tf-mag";
      btn.parentNode.insertBefore(wrap, btn);
      wrap.appendChild(btn);

      wrap.addEventListener("mousemove", (e) => {
        const r = wrap.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.22}px, ${y * 0.26}px)`;
      });
      wrap.addEventListener("mouseleave", () => {
        btn.style.transform = "";
      });
    });
  }

  function initRipple() {
    if (reduce) return;
    const targets = document.querySelectorAll(
      ".tf-btn, .tf-nav__cta, .tf-nav__signin, .tf-nav__link, .tf-card--link, .tf-chat-toggle, .tf-login__submit, .tf-scan__btn",
    );
    targets.forEach((el) => {
      el.addEventListener("pointerdown", (e) => {
        if (e.button !== 0) return;
        const r = el.getBoundingClientRect();
        const ripple = document.createElement("span");
        ripple.className = "tf-ripple";
        const size = Math.max(r.width, r.height) * 1.35;
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - r.left - size / 2}px`;
        ripple.style.top = `${e.clientY - r.top - size / 2}px`;
        el.appendChild(ripple);
        ripple.addEventListener("animationend", () => ripple.remove());
      });
    });
  }

  function initPress() {
    if (reduce) return;
    document.querySelectorAll(".tf-btn, .tf-nav__cta, .tf-nav__signin, .tf-card--link, .tf-chat-toggle, .tf-login__submit").forEach((el) => {
      el.addEventListener("pointerdown", () => el.classList.add("is-press"));
      const clear = () => el.classList.remove("is-press");
      el.addEventListener("pointerup", clear);
      el.addEventListener("pointerleave", clear);
      el.addEventListener("pointercancel", clear);
    });
  }

  function initCardTilt() {
    if (reduce || coarse) return;
    document.querySelectorAll(".tf-card, .tf-price-card, .tf-cap").forEach((card) => {
      card.classList.add("tf-tilt");
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `translateY(-6px) rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(x * 4).toFixed(2)}deg)`;
        card.style.setProperty("--mx", `${(x + 0.5) * 100}%`);
        card.style.setProperty("--my", `${(y + 0.5) * 100}%`);
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  function initLinkHover() {
    if (reduce || coarse) return;
    document.querySelectorAll(".tf-nav__link, .tf-footer__col a").forEach((a) => {
      a.classList.add("tf-hover-line");
    });
  }

  function initCursorGlow() {
    if (reduce || coarse) return;
    const glow = document.createElement("div");
    glow.className = "tf-cursor-glow";
    document.body.appendChild(glow);
    let x = 0;
    let y = 0;
    let cx = 0;
    let cy = 0;
    window.addEventListener(
      "pointermove",
      (e) => {
        x = e.clientX;
        y = e.clientY;
        glow.classList.add("is-on");
      },
      { passive: true },
    );
    window.addEventListener(
      "pointerleave",
      () => glow.classList.remove("is-on"),
      { passive: true },
    );
    const tick = () => {
      cx += (x - cx) * 0.12;
      cy += (y - cy) * 0.12;
      glow.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("is-ready");
    initProgress();
    initReveals();
    initNavScroll();
    initHeroParallax();
    initMagnetic();
    initRipple();
    initPress();
    initCardTilt();
    initLinkHover();
    initCursorGlow();
    initCountUp();
    initScanForm();
  });
})();
