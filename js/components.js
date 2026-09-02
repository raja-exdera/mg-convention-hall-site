
(() => {
  const path = location.pathname;
  const prefix = path.includes("/pages/") ? "../" : "";
  const isSubPage = path.includes("/pages/") || !document.querySelector(".lux-hero");
  const isAbout = path.includes("about");
  const isGallery = path.includes("gallery");
  const cfg = window.MG_CONFIG || {};

  const header = document.createElement("header");
  header.className = `site-header ${isSubPage ? "header-dark-text" : ""}`;
  header.id = "site-header";
  header.innerHTML = `
    <div class="site-header-inner">
      <div class="header-left">
        <a class="brand" href="${prefix}index.html" aria-label="${cfg.venueName || "M.G Convention Hall"} home">
          <span class="brand-mark">MG</span>
          <span class="brand-copy">
            <strong>M.G Convention Hall</strong>
            <small>Bidarahalli</small>
          </span>
        </a>
      </div>

      <nav class="nav-links header-center" aria-label="Primary navigation">
        <a href="${prefix}pages/about.html" class="${isAbout ? "active" : ""}">About</a>
        <a href="${prefix}pages/gallery.html" class="${isGallery ? "active" : ""}">Gallery</a>
      </nav>

      <div class="header-right">
        <a href="${prefix}pages/contact.html#enquiry" class="header-enquire-btn">
          <span>Enquiry</span>
          <svg class="icon-arrow-diagonal" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
        </a>
        <button class="menu-btn" id="menu-btn" aria-label="Toggle navigation" aria-expanded="false">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" y1="7" x2="20" y2="7"></line><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="17" x2="20" y2="17"></line></svg>
        </button>
      </div>
    </div>

    <div class="mobile-menu" id="mobile-menu">
      <a href="${prefix}index.html">Home</a>
      <a href="${prefix}pages/about.html">About</a>
      <a href="${prefix}pages/gallery.html">Gallery</a>
      <a href="${prefix}pages/contact.html#enquiry" class="mobile-enquire-link">
        <span>Enquiry Now</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
      </a>
    </div>
  `;

  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `
    <div class="footer-inner">
      <div class="footer-grid">
        <div class="footer-col-brand">
          <div class="footer-statement">Make room<br>for the moment.</div>
          <p class="footer-sub">M.G Convention Hall · Bidarahalli. A contemporary destination shaped around the occasion.</p>
        </div>
        <div class="footer-col-nav">
          <p class="footer-label">Explore</p>
          <a class="footer-link" href="${prefix}index.html">Home</a>
          <a class="footer-link" href="${prefix}pages/about.html">About</a>
          <a class="footer-link" href="${prefix}index.html#highlights">Spaces</a>
          <a class="footer-link" href="${prefix}pages/gallery.html">Gallery</a>
          <a class="footer-link" href="${prefix}index.html#location">Location</a>
        </div>
        <div class="footer-col-address">
          <p class="footer-label">Address</p>
          <p class="footer-address-text">${cfg.address || "M.G Convention Hall, Bidarahalli, Bengaluru, Karnataka - 560049"}</p>
          <div class="footer-contact-actions">
            <a class="footer-contact-link" data-phone-link href="${cfg.phoneHref || "#"}">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              <span data-phone-text>${cfg.phoneDisplay || "+91 XXXXX XXXXX"}</span>
            </a>
            <a class="footer-contact-link" data-whatsapp-link href="#">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} M.G Convention Hall. All rights reserved.</span>
        <span class="footer-credit">Developed by Creative Nuts</span>
      </div>
    </div>
  `;

  document.getElementById("site-header")?.replaceWith(header);
  document.getElementById("site-footer")?.replaceWith(footer);
})();
