
(() => {
  const form = document.getElementById("enquiry-form");
  const status = document.getElementById("form-status");
  const cfg = window.MG_CONFIG || {};

  // Wire up dynamic elements across page
  document.querySelectorAll("[data-phone-link]").forEach(el => {
    if (cfg.phoneHref) el.href = cfg.phoneHref;
  });
  document.querySelectorAll("[data-phone-text]").forEach(el => {
    if (cfg.phoneDisplay) el.textContent = cfg.phoneDisplay;
  });
  document.querySelectorAll("[data-whatsapp-link]").forEach(el => {
    if (cfg.whatsappNumber) {
      el.href = `https://wa.me/${cfg.whatsappNumber}?text=${encodeURIComponent("Hello! I would like to enquire about M.G Convention Hall.")}`;
      el.target = "_blank";
      el.rel = "noopener";
    }
  });
  document.querySelectorAll("[data-address]").forEach(el => {
    if (cfg.address) el.textContent = cfg.address;
  });
  document.querySelectorAll("[data-map-link]").forEach(el => {
    if (cfg.mapsQuery) {
      el.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cfg.mapsQuery)}`;
      el.target = "_blank";
      el.rel = "noopener";
    }
  });

  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();

    const data = new FormData(form);
    const message = [
      `*New Event Enquiry — ${cfg.venueName || "M.G Convention Hall"}*`,
      ``,
      `*Name:* ${data.get("name")}`,
      `*Contact:* ${data.get("contact")}`,
      `*Event Date:* ${data.get("date")}`,
      `*Event Type:* ${data.get("eventType")}`,
      `*Requirements:* ${data.get("message") || "—"}`
    ].join("\n");

    if (cfg.whatsappNumber && !cfg.whatsappNumber.includes("X")) {
      window.open(`https://wa.me/${cfg.whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
      status.textContent = "Opening WhatsApp to send your enquiry…";
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank", "noopener");
      status.textContent = "Opening WhatsApp with your event enquiry details…";
    }

    status.classList.remove("hidden");
  });
})();
