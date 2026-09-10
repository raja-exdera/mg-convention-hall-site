
(() => {
  const cfg = window.MG_CONFIG || {};
  const header = document.getElementById("site-header");

  document.querySelectorAll("[data-phone-link]").forEach(a => a.href = cfg.phoneHref || "#");
  document.querySelectorAll("[data-phone-text]").forEach(el => el.textContent = cfg.phoneDisplay || "");
  document.querySelectorAll("[data-address]").forEach(el => el.textContent = cfg.address || cfg.location || "Address and location to be confirmed");

  const mapUrl = cfg.mapDirectUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cfg.mapsQuery || "APSARA CONVENTION HALL")}`;
  document.querySelectorAll("[data-map-link]").forEach(a => {
    a.href = mapUrl;
    a.target = "_blank";
    a.rel = "noopener";
  });

  if (cfg.mapEmbedSrc) {
    document.querySelectorAll(".map-wrap iframe").forEach(iframe => {
      iframe.src = cfg.mapEmbedSrc;
    });
  }

  const wa = cfg.whatsappNumber && !cfg.whatsappNumber.includes("X")
    ? `https://wa.me/${cfg.whatsappNumber}?text=${encodeURIComponent(`Hello, I would like to enquire about ${cfg.venueName || "Saptha Aradhana Convention Hall"}.`)}`
    : "#";

  document.querySelectorAll("[data-whatsapp-link]").forEach(a => {
    a.href = wa;
    if (wa !== "#") { a.target = "_blank"; a.rel = "noopener"; }
  });

  let lastScrollY = window.scrollY;
  let ticking = false;

  const updateScrollState = () => {
    if (!header) return;
    const currentScrollY = window.scrollY;

    if (currentScrollY <= 20) {
      header.classList.remove("scrolled", "header-hidden");
    } else {
      header.classList.add("scrolled");
      const mobileMenu = document.getElementById("mobile-menu");
      if (!mobileMenu?.classList.contains("open")) {
        const diff = currentScrollY - lastScrollY;
        if (diff > 8 && currentScrollY > 120) {
          // Scrolling DOWN -> hide header
          header.classList.add("header-hidden");
        } else if (diff < -8) {
          // Scrolling UP -> show header
          header.classList.remove("header-hidden");
        }
      }
    }

    lastScrollY = currentScrollY;

    // Dynamic Header Theme (Opposite contrast: light nav over dark sections, dark nav over light sections)
    const headerY = 50;
    const darkElements = document.querySelectorAll(
      ".lux-hero, .lux-section-dark, .page-hero-canvas, .site-footer, [data-theme='dark']"
    );
    let isOverDark = false;
    for (const el of darkElements) {
      const rect = el.getBoundingClientRect();
      if (rect.top <= headerY && rect.bottom >= headerY) {
        isOverDark = true;
        break;
      }
    }

    if (currentScrollY <= 20) {
      // At top (transparent header):
      // Only index.html has a full bleed dark hero (.lux-hero) from top 0
      const isFullBleedDarkHero = document.querySelector(".lux-hero");
      if (isFullBleedDarkHero) {
        header.classList.remove("header-dark-text");
      } else {
        header.classList.add("header-dark-text");
      }
    } else {
      // While scrolled (floating pill):
      // Over dark bg -> nav in LIGHT theme (white glass pill, dark text)
      // Over light bg -> nav in DARK theme (dark pine glass pill, white text)
      if (isOverDark) {
        header.classList.add("header-dark-text");
      } else {
        header.classList.remove("header-dark-text");
      }
    }

    const hero = document.querySelector("[data-parallax]");
    if (hero && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      hero.style.transform = `translate3d(0,${Math.min(window.scrollY * .045, 42)}px,0) scale(1.06)`;
    }
    const garden = document.querySelector("[data-parallax-slow]");
    if (garden && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const y = Math.max(-30, Math.min(30, (window.scrollY - garden.offsetTop) * .018));
      garden.style.transform = `translate3d(0,${y}px,0) scale(1.06)`;
    }

    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScrollState);
      ticking = true;
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  updateScrollState();

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:.1});
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  menuBtn?.addEventListener("click", () => {
    const open = mobileMenu?.classList.toggle("open");
    menuBtn.classList.toggle("is-open", !!open);
    menuBtn.setAttribute("aria-expanded", String(!!open));
  });
  mobileMenu?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    menuBtn?.classList.remove("is-open");
    menuBtn?.setAttribute("aria-expanded", "false");
  }));

  // Clean URL smooth scrolling: do not expose or keep #hashes (like #highlights) in the browser URL
  document.addEventListener("click", e => {
    const link = e.target.closest("a");
    if (!link) return;
    const href = link.getAttribute("href");
    if (!href || !href.includes("#")) return;

    try {
      const targetUrl = new URL(link.href, window.location.href);
      if (targetUrl.origin === window.location.origin && targetUrl.pathname === window.location.pathname && targetUrl.hash) {
        const targetEl = document.querySelector(targetUrl.hash);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
          if (window.location.hash) {
            history.replaceState(null, "", window.location.pathname + window.location.search);
          }
        }
      }
    } catch (_) {}
  });

  // Handle cross-page section navigation cleanly: if URL has a hash on load, scroll to it and remove hash from address bar
  if (window.location.hash) {
    const hash = window.location.hash;
    const targetEl = document.querySelector(hash);
    history.replaceState(null, "", window.location.pathname + window.location.search);
    if (targetEl) {
      setTimeout(() => {
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }
})();
