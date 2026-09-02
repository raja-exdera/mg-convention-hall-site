
(() => {
  const cfg = window.MG_CONFIG || {};
  const header = document.getElementById("site-header");

  document.querySelectorAll("[data-phone-link]").forEach(a => a.href = cfg.phoneHref || "#");
  document.querySelectorAll("[data-phone-text]").forEach(el => el.textContent = cfg.phoneDisplay || "");
  document.querySelectorAll("[data-address]").forEach(el => el.textContent = cfg.address || cfg.location || "M.G Convention Hall, Bidarahalli, Bengaluru");

  const mapQuery = cfg.mapsQuery || "M.G Convention Hall Bidarahalli";
  document.querySelectorAll("[data-map-link]").forEach(a => {
    a.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;
  });

  const wa = cfg.whatsappNumber && !cfg.whatsappNumber.includes("X")
    ? `https://wa.me/${cfg.whatsappNumber}?text=${encodeURIComponent(`Hello, I would like to enquire about ${cfg.venueName || "M.G Convention Hall"}.`)}`
    : "#";

  document.querySelectorAll("[data-whatsapp-link]").forEach(a => {
    a.href = wa;
    if (wa !== "#") { a.target = "_blank"; a.rel = "noopener"; }
  });

  let lastScrollY = window.scrollY;

  const onScroll = () => {
    if (!header) return;
    const currentScrollY = window.scrollY;

    if (currentScrollY <= 20) {
      header.classList.remove("scrolled", "header-hidden");
    } else {
      header.classList.add("scrolled");
      if (currentScrollY > lastScrollY + 6 && currentScrollY > 100) {
        // Scrolling DOWN -> hide header
        header.classList.add("header-hidden");
      } else if (currentScrollY < lastScrollY - 6) {
        // Scrolling UP -> show header with glassmorphism #545B45
        header.classList.remove("header-hidden");
      }
    }

    lastScrollY = currentScrollY;

    const hero = document.querySelector("[data-parallax]");
    if (hero && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      hero.style.transform = `translate3d(0,${Math.min(window.scrollY * .045, 42)}px,0) scale(1.06)`;
    }
    const garden = document.querySelector("[data-parallax-slow]");
    if (garden && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const y = Math.max(-30, Math.min(30, (window.scrollY - garden.offsetTop) * .018));
      garden.style.transform = `translate3d(0,${y}px,0) scale(1.06)`;
    }
  };
  window.addEventListener("scroll", onScroll, {passive:true});
  onScroll();

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
    menuBtn.setAttribute("aria-expanded", String(!!open));
  });
  mobileMenu?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    menuBtn?.setAttribute("aria-expanded", "false");
  }));
})();
