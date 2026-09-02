
(() => {
  const form = document.getElementById("enquiry-form");
  const status = document.getElementById("form-status");
  const cfg = window.MG_CONFIG || {};
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();

    const data = new FormData(form);
    const message = [
      `Hello, I would like to enquire about ${cfg.venueName || "M.G Convention Hall"}.`,
      ``,
      `Name: ${data.get("name")}`,
      `Contact: ${data.get("contact")}`,
      `Event date: ${data.get("date")}`,
      `Event type: ${data.get("eventType")}`,
      `Message: ${data.get("message") || "—"}`
    ].join("\n");

    if (cfg.whatsappNumber && !cfg.whatsappNumber.includes("X")) {
      window.open(`https://wa.me/${cfg.whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
      status.textContent = "Opening WhatsApp with your enquiry…";
    } else if (cfg.email && !cfg.email.includes("example")) {
      window.location.href = `mailto:${cfg.email}?subject=${encodeURIComponent("M.G Convention Hall Enquiry")}&body=${encodeURIComponent(message)}`;
      status.textContent = "Opening your email app…";
    } else {
      status.textContent = "Add the real WhatsApp number or email in js/config.js to activate enquiry delivery.";
    }

    status.classList.remove("hidden");
  });
})();
