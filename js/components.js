
(() => {
  const path = location.pathname;
  const prefix = path.includes("/pages/") ? "../" : "";
  const cfg = window.MG_CONFIG || {};

  const header = document.createElement("header");
  header.className = "site-header";
  header.id = "site-header";
  header.innerHTML = `
    <div class="site-header-inner">
      <a class="brand" href="${prefix}index.html" aria-label="${cfg.venueName || "M.G Convention Hall"} home">
        <span class="brand-mark">MG</span>
        <span class="brand-copy">
          <strong>M.G Convention Hall</strong>
          <small>Bidarahalli</small>
        </span>
      </a>

      <nav class="nav-links" aria-label="Primary navigation">
        <a href="${prefix}index.html">Home</a>
        <a href="${prefix}index.html#about">About</a>
        <a href="${prefix}index.html#highlights">Spaces</a>
        <a href="${prefix}pages/gallery.html">Gallery</a>
        <a href="${prefix}index.html#location">Location</a>
        <a href="${prefix}index.html#enquiry" class="header-enquire">Enquire</a>
      </nav>

      <button class="menu-btn" id="menu-btn" aria-label="Open navigation" aria-expanded="false">☰</button>
    </div>

    <div class="mobile-menu" id="mobile-menu">
      <a href="${prefix}index.html">Home</a>
      <a href="${prefix}index.html#about">About</a>
      <a href="${prefix}index.html#highlights">Spaces</a>
      <a href="${prefix}pages/gallery.html">Gallery</a>
      <a href="${prefix}index.html#location">Location</a>
      <a href="${prefix}index.html#enquiry">Enquire Now</a>
    </div>
  `;

  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `
    <div class="footer-inner">
      <div class="footer-grid">
        <div>
          <div class="footer-statement">Make room<br>for the moment.</div>
          <p class="footer-sub">M.G Convention Hall · Bidarahalli. A contemporary destination shaped around the occasion.</p>
        </div>
        <div>
          <p class="footer-label">Explore</p>
          <a class="footer-link" href="${prefix}index.html">Home</a>
          <a class="footer-link" href="${prefix}index.html#about">About</a>
          <a class="footer-link" href="${prefix}pages/gallery.html">Gallery</a>
          <a class="footer-link" href="${prefix}index.html#location">Location</a>
        </div>
        <div>
          <p class="footer-label">Connect</p>
          <a class="footer-link" data-phone-link href="#">Call</a>
          <a class="footer-link" data-whatsapp-link href="#">WhatsApp</a>
          <a class="footer-link" data-email-link href="#">Email</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} M.G Convention Hall</span>
        <span>Bidarahalli</span>
      </div>
    </div>
  `;

  document.getElementById("site-header")?.replaceWith(header);
  document.getElementById("site-footer")?.replaceWith(footer);
})();
