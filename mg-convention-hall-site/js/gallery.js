
(() => {
  const base = "../assets/images/";
  const items = [
    ["landscape/landscape-03.jpg","hall","Site masterplan aerial"],
    ["landscape/landscape-05.jpg","parking","Landscaped parking"],
    ["landscape/landscape-06.jpg","parking","Parking arrival view"],
    ["landscape/landscape-09.jpg","hall","Main exterior"],
    ["landscape/landscape-11.jpg","garden","Garden facade"],
    ["landscape/landscape-12.jpg","garden","Garden and pavilion"],
    ["landscape/landscape-14.jpg","garden","Lawn and outdoor setting"],
    ["landscape/landscape-15.jpg","garden","Landscape detail"],
    ["landscape/landscape-16.jpg","hall","Covered arrival walkway"],
    ["landscape/landscape-17.jpg","garden","Meditative landscape detail"],
    ["landscape/landscape-20.jpg","garden","Outdoor lawn"],
    ["landscape/landscape-21.jpg","garden","Outdoor pavilion"],
    ["landscape/landscape-22.jpg","garden","Pavilion interior"],
    ["landscape/landscape-24.jpg","rooms","Room-stay exterior"],
    ["landscape/landscape-26.jpg","hall","Overall property view"],
    ["rooms/room-11.jpg","rooms","Entrance"],
    ["rooms/room-12.jpg","rooms","Reception"],
    ["rooms/room-13.jpg","rooms","Reception lounge"],
    ["rooms/room-15.jpg","rooms","Reception seating"],
    ["rooms/room-17.jpg","dining","Dining"],
    ["rooms/room-18.jpg","dining","Dining"],
    ["rooms/room-19.jpg","dining","Dining"],
    ["rooms/room-21.jpg","rooms","Bride room"],
    ["rooms/room-23.jpg","rooms","Bride room"],
    ["rooms/room-24.jpg","rooms","Bride dressing room"],
    ["rooms/room-25.jpg","rooms","Bride dressing room"],
    ["rooms/room-26.jpg","rooms","Bridegroom room"],
    ["rooms/room-28.jpg","rooms","Typical room"],
    ["rooms/room-29.jpg","rooms","Typical room"],
    ["rooms/room-30.jpg","rooms","Typical room"],
    ["rooms/room-31.jpg","rooms","Typical room"],
    ["rooms/room-32.jpg","conference","Conference room"],
    ["rooms/room-34.jpg","conference","Corridor"],
    ["rooms/room-37.jpg","conference","Lounge"],
    ["rooms/room-38.jpg","conference","Lounge"]
  ];

  const grid = document.getElementById("gallery-grid");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const caption = document.getElementById("lightbox-caption");
  if (!grid) return;

  const render = filter => {
    grid.innerHTML = items.filter(i => filter === "all" || i[1] === filter).map((i, idx) => `
      <button class="gallery-item" type="button" data-index="${items.indexOf(i)}" aria-label="Open ${i[2]}">
        <img src="${base}${i[0]}" alt="${i[2]}" loading="${idx < 8 ? "eager" : "lazy"}">
        <span class="gallery-shade"></span><span class="gallery-caption">${i[2]}</span>
      </button>`).join("");

    grid.querySelectorAll(".gallery-item").forEach(btn => btn.addEventListener("click", () => {
      const item = items[Number(btn.dataset.index)];
      lightboxImage.src = base + item[0]; lightboxImage.alt = item[2]; caption.textContent = item[2];
      lightbox.classList.add("open"); lightbox.setAttribute("aria-hidden","false"); document.body.style.overflow="hidden";
    }));
  };

  document.querySelectorAll(".filter-btn").forEach(btn => btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active"); render(btn.dataset.filter);
  }));

  const requested = new URLSearchParams(location.search).get("filter");
  const initial = ["all","hall","parking","garden","rooms","dining","conference"].includes(requested) ? requested : "all";
  document.querySelector(`.filter-btn[data-filter="${initial}"]`)?.click() || render("all");

  const close = () => { lightbox.classList.remove("open"); lightbox.setAttribute("aria-hidden","true"); document.body.style.overflow=""; };
  document.getElementById("lightbox-close")?.addEventListener("click", close);
  lightbox?.addEventListener("click", e => { if (e.target === lightbox) close(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
})();
