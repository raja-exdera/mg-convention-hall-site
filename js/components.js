
(() => {
  const path = location.pathname;
  const prefix = path.includes("/pages/") ? "../" : "";
  const isSubPage = path.includes("/pages/") || !document.querySelector(".lux-hero");
  const isHome = !path.includes("/pages/") && (path.endsWith("index.html") || path.endsWith("/") || !path.includes(".html"));
  const isAbout = path.includes("about");
  const isGallery = path.includes("gallery");
  const isContact = path.includes("contact");
  const cfg = window.MG_CONFIG || {};

  const header = document.createElement("header");
  header.className = `site-header ${isSubPage ? "header-dark-text" : ""} ${isContact ? "is-contact-page" : ""}`;
  header.id = "site-header";
  header.innerHTML = `
    <div class="site-header-inner">
      <div class="header-left">
        <a class="brand" href="${prefix}index.html" aria-label="${cfg.venueName || "Saptha Aradhana Convention Hall"}">
          <img src="${prefix}assets/logo.png" alt="Saptha Aradhana Logo" class="brand-logo-img">
          <img src="${prefix}assets/logo-light-text.png" alt="Saptha Aradhana" class="brand-logo-text brand-logo-text-light">
          <img src="${prefix}assets/logo-dark-text.png" alt="Saptha Aradhana" class="brand-logo-text brand-logo-text-dark">
        </a>
      </div>

      <nav class="nav-links header-center" aria-label="Primary navigation">
        <a href="${prefix}index.html" class="${isHome ? "active" : ""}">Home</a>
        <a href="${prefix}pages/about.html" class="${isAbout ? "active" : ""}">About</a>
        <a href="${prefix}index.html#highlights" data-nav-space>Spaces</a>
        <a href="${prefix}pages/gallery.html" class="${isGallery ? "active" : ""}">Gallery</a>
      </nav>

      <div class="header-right">
        <a href="${prefix}pages/contact.html" class="header-enquire-btn">
          <span>Enquiry</span>
          <svg class="icon-arrow-diagonal" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
        </a>
        <button class="menu-btn" id="menu-btn" aria-label="Toggle navigation" aria-expanded="false"><span></span><span></span><span></span></button>
      </div>
    </div>

    <div class="mobile-menu" id="mobile-menu">
      <a href="${prefix}index.html">Home</a>
      <a href="${prefix}pages/about.html">About</a>
      <a href="${prefix}index.html#highlights" data-nav-space>Spaces</a>
      <a href="${prefix}pages/gallery.html">Gallery</a>
      <a href="${prefix}pages/contact.html" class="mobile-enquire-link">
        <span>Enquiry Now</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
      </a>
    </div>
  `;

  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `
    <div class="footer-inner">
      <div class="footer-mid-grid">
        <div class="footer-mid-col footer-col-intro">
          <a class="footer-brand" href="${prefix}index.html" aria-label="${cfg.venueName || "Saptha Aradhana Convention Hall"}">
            <img src="${prefix}assets/logo.png" alt="Saptha Aradhana Emblem" class="footer-logo-img">
            <img src="${prefix}assets/logo-light-text.png" alt="Saptha Aradhana" class="footer-logo-text">
          </a>
          <p class="footer-tagline-text">Your Ceremony.<br>Our Sacred Promise.</p>
          <p class="footer-desc-text">Where heritage, majestic celebration spaces, and heartfelt hospitality unite in Bengaluru.</p>
        </div>

        <div class="footer-mid-col footer-col-links">
          <nav class="footer-nav-list" aria-label="Footer navigation">
            <a class="footer-link-item" href="${prefix}index.html">Home</a>
            <a class="footer-link-item" href="${prefix}pages/about.html">About </a>
            <a class="footer-link-item" href="${prefix}index.html#highlights"> Spaces</a>
            <a class="footer-link-item" href="${prefix}pages/gallery.html"> Gallery</a>
            <a class="footer-link-item" href="${prefix}pages/contact.html">Contact Us</a>
          </nav>
        </div>

        <div class="footer-mid-col footer-col-venue-info">
          <p class="footer-title">Address</p>
          <p class="footer-address-line">${cfg.address || "2,3, No. 41/1, 4, Annapoorneshwari Nagar, Health Layout, Srigandadakaval, Bengaluru, Karnataka 560091"}</p>
          <a data-map-link href="#" target="_blank" rel="noopener" class="footer-map-action" aria-label="Open location in Google Maps">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
            <span>View on Google Maps</span>
          </a>
          
          <div class="footer-call-wrap">
            <a class="footer-call-link" data-phone-link href="${cfg.phoneHref || "#"}">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              <span data-phone-text>${cfg.phoneDisplay || "+91 99165 62870"}</span>
            </a>
          </div>
        </div>
      </div>

      <div class="footer-bottom-row">
        <span>© ${new Date().getFullYear()} Saptha Aradhana Convention Hall. All rights reserved.</span>
        <a href="https://www.bangalorefruits.com/" target="_blank" rel="noopener" class="footer-credit-link">Site by Bangalore Fruits</a>
      </div>
    </div>
  `;

  // Floating WhatsApp button
  const floatingWa = document.createElement("a");
  floatingWa.className = "floating-whatsapp-btn";
  floatingWa.setAttribute("data-whatsapp-link", "");
  floatingWa.href = "#";
  floatingWa.target = "_blank";
  floatingWa.rel = "noopener";
  floatingWa.setAttribute("aria-label", "Chat on WhatsApp");
  floatingWa.innerHTML = `
    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" class="floating-whatsapp-icon" width="54" height="54">
  `;

  document.getElementById("site-header")?.replaceWith(header);
  document.getElementById("site-footer")?.replaceWith(footer);
  document.body.appendChild(floatingWa);
})();
