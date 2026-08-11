/**
 * TwunnyFour signature motion
 * 1) Hero char + plane intro
 * 2) Magnetic buttons
 * 3) Scroll-linked blur reveals
 * 4) Red plane parallax
 * 5) Theatre stage transitions (exported)
 */
(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function splitBrand(el) {
    if (!el || el.dataset.split === "1") return;
    const html = el.innerHTML;
    // Preserve <em>Four</em> structure
    const parts = [];
    el.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        [...node.textContent].forEach((ch) => {
          if (ch === " ") parts.push('<span class="char" style="width:0.28em">&nbsp;</span>');
          else parts.push(`<span class="char">${ch}</span>`);
        });
      } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName === "EM") {
        const inner = [...node.textContent]
          .map((ch) => `<span class="char">${ch}</span>`)
          .join("");
        parts.push(`<em>${inner}</em>`);
      }
    });
    el.innerHTML = parts.join("");
    el.querySelectorAll(".char").forEach((c, i) => {
      c.style.animationDelay = `${0.08 + i * 0.035}s`;
    });
    el.dataset.split = "1";
  }

  function initHero() {
    const hero = document.querySelector(".hero");
    if (!hero) return;
    const brand = hero.querySelector(".hero__brand");
    splitBrand(brand);
    requestAnimationFrame(() => {
      hero.classList.add("is-ready");
    });

    const plane = hero.querySelector(".hero__plane-inner");
    if (plane && !reduce) {
      window.addEventListener(
        "scroll",
        () => {
          const y = Math.min(window.scrollY, 420);
          plane.style.transform = `translateY(${y * 0.12}px) scale(${1 + y * 0.00008})`;
        },
        { passive: true },
      );
    }
  }

  function initMagnetic() {
    if (reduce || window.matchMedia("(pointer: coarse)").matches) return;
    document.querySelectorAll(".mag").forEach((wrap) => {
      const btn = wrap.querySelector(".btn") || wrap;
      wrap.addEventListener("mousemove", (e) => {
        const r = wrap.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.22}px, ${y * 0.28}px)`;
      });
      wrap.addEventListener("mouseleave", () => {
        btn.style.transform = "";
      });
    });
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
