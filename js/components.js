
(() => {
  const path = location.pathname;
  const prefix = "";
  const isSubPage = !document.querySelector(".lux-hero");
  const isHome = (path.endsWith("index.html") || path.endsWith("/") || path === "");
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
        <a class="brand" href="/" aria-label="${cfg.venueName || "Saptha Aradhana Convention Hall"}">
          <img src="${prefix}assets/logo.png" alt="Saptha Aradhana Logo" class="brand-logo-img">
          <img src="${prefix}assets/logo-light-text.png" alt="Saptha Aradhana" class="brand-logo-text brand-logo-text-light">
          <img src="${prefix}assets/logo-dark-text.png" alt="Saptha Aradhana" class="brand-logo-text brand-logo-text-dark">
        </a>
      </div>

      <nav class="nav-links header-center" aria-label="Primary navigation">
        <a href="/" class="${isHome ? "active" : ""}">Home</a>
        <a href="${prefix}about-us" class="${isAbout ? "active" : ""}">About</a>
        <a href="${prefix}gallery" class="${isGallery ? "active" : ""}">Gallery</a>
      </nav>

      <div class="header-right">
        <a href="${prefix}contact" class="header-enquire-btn">
          <span>Enquiry</span>
          <svg class="icon-arrow-action" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </a>
        <button class="menu-btn" id="menu-btn" aria-label="Toggle navigation" aria-expanded="false"><span></span><span></span><span></span></button>
      </div>
    </div>

    <div class="mobile-menu" id="mobile-menu">
      <a href="/">Home</a>
      <a href="${prefix}about-us">About</a>
      <a href="${prefix}gallery">Gallery</a>
      <a href="${prefix}contact" class="mobile-enquire-link">
        <span>Enquiry Now</span>
        <svg class="icon-arrow-action" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
      </a>
    </div>
  `;

  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `
    <div class="footer-inner">
      <div class="footer-mid-grid">
        <div class="footer-mid-col footer-col-intro">
          <a class="footer-brand" href="/" aria-label="${cfg.venueName || "Saptha Aradhana Convention Hall"}">
            <img src="${prefix}assets/logo.png" alt="Saptha Aradhana Emblem" class="footer-logo-img">
            <img src="${prefix}assets/logo-light-text.png" alt="Saptha Aradhana" class="footer-logo-text">
          </a>
          <p class="footer-tagline-text">Your Ceremony.<br>Our Sacred Promise.</p>
          <p class="footer-desc-text">Where heritage, majestic celebration spaces, and heartfelt hospitality unite in Bengaluru.</p>
        </div>

        <div class="footer-mid-col footer-col-links">
          <nav class="footer-nav-list" aria-label="Footer navigation">
            <a class="footer-link-item footer-link-home" href="/">Home</a>
            <a class="footer-link-item" href="${prefix}about-us">About</a>
            <a class="footer-link-item" href="${prefix}gallery">Gallery</a>
            <a class="footer-link-item" href="${prefix}contact">Contact Us</a>
          </nav>
        </div>

        <div class="footer-mid-col footer-col-venue-info">
          <p class="footer-title">Address</p>
          <a data-map-link href="${cfg.mapDirectUrl || "https://maps.app.goo.gl/oUzMWXAy881o2V538"}" target="_blank" rel="noopener" class="footer-address-line" data-address aria-label="Open location in Google Maps">${cfg.address || "2,3, No. 41/1, 4, Annapoorneshwari Nagar, Health Layout, Srigandadakaval, Bengaluru, Karnataka 560091"}</a>
          
          <div class="footer-call-wrap">
            <a class="footer-call-link" data-phone-link href="${cfg.phoneHref || "#"}">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              <span data-phone-text>${cfg.phoneDisplay || "+91 99165 62870"}</span>
            </a>
          </div>
        </div>

        <div class="footer-mid-col footer-col-qr">
          <div class="footer-qr-card">
            <p class="footer-qr-caption">Scan to Get Directions</p>
            <a data-map-link href="${cfg.mapDirectUrl || "https://maps.app.goo.gl/oUzMWXAy881o2V538"}" target="_blank" rel="noopener" class="footer-qr-link" aria-label="Open location in Google Maps">
              <img src="${prefix}assets/map-qr.svg" alt="Google Maps Location QR Code" class="footer-qr-img" width="96" height="96">
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
