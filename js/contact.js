
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
      el.href = `https://wa.me/${cfg.whatsappNumber}?text=${encodeURIComponent(`Hello! I would like to enquire about ${cfg.venueName || "Saptha Aradhana Convention Hall"}.`)}`;
      el.target = "_blank";
      el.rel = "noopener";
    }
  });
  document.querySelectorAll("[data-address]").forEach(el => {
    if (cfg.address) el.textContent = cfg.address;
  });
  document.querySelectorAll("[data-map-link]").forEach(el => {
    el.href = cfg.mapDirectUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cfg.mapsQuery || "APSARA CONVENTION HALL")}`;
    el.target = "_blank";
    el.rel = "noopener";
  });

  // ================================================================
  // CUSTOM LUXURY SELECT & CALENDAR (DATE PICKER) UI
  // ================================================================
  const initCustomSelects = () => {
    document.querySelectorAll("select[name='eventType']").forEach(nativeSelect => {
      if (nativeSelect.dataset.customSelectInit) return;
      nativeSelect.dataset.customSelectInit = "true";

      nativeSelect.classList.add("custom-visually-hidden");
      nativeSelect.removeAttribute("required");

      const wrapper = document.createElement("div");
      wrapper.className = "custom-select-wrap";

      const trigger = document.createElement("button");
      trigger.type = "button";
      trigger.className = "custom-select-trigger";
      trigger.setAttribute("aria-haspopup", "listbox");
      trigger.setAttribute("aria-expanded", "false");

      const label = document.createElement("span");
      label.className = "custom-select-label is-placeholder";
      label.textContent = nativeSelect.options[0]?.text || "Select event";

      const chevron = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      chevron.setAttribute("class", "custom-select-chevron");
      chevron.setAttribute("width", "14");
      chevron.setAttribute("height", "14");
      chevron.setAttribute("viewBox", "0 0 24 24");
      chevron.setAttribute("fill", "none");
      chevron.setAttribute("stroke", "currentColor");
      chevron.setAttribute("stroke-width", "2.2");
      chevron.setAttribute("stroke-linecap", "round");
      chevron.setAttribute("stroke-linejoin", "round");
      chevron.innerHTML = '<polyline points="6 9 12 15 18 9"></polyline>';

      trigger.appendChild(label);
      trigger.appendChild(chevron);

      const dropdown = document.createElement("div");
      dropdown.className = "custom-select-dropdown hidden";
      dropdown.setAttribute("role", "listbox");

      Array.from(nativeSelect.options).forEach((opt, idx) => {
        if (!opt.value && idx === 0) return; // Skip empty placeholder from dropdown list
        const item = document.createElement("div");
        item.className = `custom-select-option ${opt.selected && opt.value ? "is-selected" : ""}`;
        item.setAttribute("role", "option");
        item.setAttribute("data-value", opt.value);
        item.innerHTML = `
          <span>${opt.text}</span>
          <svg class="opt-check" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        `;

        item.addEventListener("click", e => {
          e.stopPropagation();
          nativeSelect.value = opt.value;
          nativeSelect.dispatchEvent(new Event("change", { bubbles: true }));
          label.textContent = opt.text;
          label.classList.remove("is-placeholder");

          dropdown.querySelectorAll(".custom-select-option").forEach(o => o.classList.remove("is-selected"));
          item.classList.add("is-selected");

          closeSelect();
          trigger.focus();
        });

        dropdown.appendChild(item);
      });

      const openSelect = () => {
        // Close any other open popups
        document.querySelectorAll(".custom-select-wrap.is-open").forEach(w => {
          if (w !== wrapper) {
            w.classList.remove("is-open");
            w.querySelector(".custom-select-dropdown")?.classList.add("hidden");
            w.querySelector(".custom-select-trigger")?.setAttribute("aria-expanded", "false");
          }
        });
        document.querySelectorAll(".custom-date-picker-wrap.is-open").forEach(w => {
          w.classList.remove("is-open");
          w.querySelector(".custom-calendar-popup")?.classList.add("hidden");
          w.querySelector(".custom-date-trigger")?.setAttribute("aria-expanded", "false");
        });

        wrapper.classList.add("is-open");
        dropdown.classList.remove("hidden");
        trigger.setAttribute("aria-expanded", "true");
      };

      const closeSelect = () => {
        wrapper.classList.remove("is-open");
        dropdown.classList.add("hidden");
        trigger.setAttribute("aria-expanded", "false");
      };

      trigger.addEventListener("click", e => {
        e.preventDefault();
        e.stopPropagation();
        if (wrapper.classList.contains("is-open")) {
          closeSelect();
        } else {
          openSelect();
        }
      });

      trigger.addEventListener("keydown", e => {
        if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openSelect();
        } else if (e.key === "Escape") {
          closeSelect();
        }
      });

      wrapper.appendChild(trigger);
      wrapper.appendChild(dropdown);
      nativeSelect.parentNode.insertBefore(wrapper, nativeSelect.nextSibling);

      nativeSelect.addEventListener("change", () => {
        const selected = nativeSelect.options[nativeSelect.selectedIndex];
        if (selected && selected.value) {
          label.textContent = selected.text;
          label.classList.remove("is-placeholder");
          dropdown.querySelectorAll(".custom-select-option").forEach(o => {
            o.classList.toggle("is-selected", o.dataset.value === selected.value);
          });
        } else {
          label.textContent = nativeSelect.options[0]?.text || "Select event";
          label.classList.add("is-placeholder");
          dropdown.querySelectorAll(".custom-select-option").forEach(o => o.classList.remove("is-selected"));
        }
      });
    });
  };

  const initCustomDatePickers = () => {
    document.querySelectorAll("input[type='date'][name='date']").forEach(nativeInput => {
      if (nativeInput.dataset.customDateInit) return;
      nativeInput.dataset.customDateInit = "true";

      nativeInput.classList.add("custom-visually-hidden");
      nativeInput.removeAttribute("required");

      const wrapper = document.createElement("div");
      wrapper.className = "custom-date-picker-wrap";

      const trigger = document.createElement("button");
      trigger.type = "button";
      trigger.className = "custom-date-trigger";
      trigger.setAttribute("aria-haspopup", "dialog");
      trigger.setAttribute("aria-expanded", "false");

      const display = document.createElement("span");
      display.className = "custom-date-display is-placeholder";
      display.textContent = "Select event date";

      const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      icon.setAttribute("class", "custom-date-icon");
      icon.setAttribute("width", "18");
      icon.setAttribute("height", "18");
      icon.setAttribute("viewBox", "0 0 24 24");
      icon.setAttribute("fill", "none");
      icon.setAttribute("stroke", "currentColor");
      icon.setAttribute("stroke-width", "2");
      icon.setAttribute("stroke-linecap", "round");
      icon.setAttribute("stroke-linejoin", "round");
      icon.innerHTML = '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>';

      trigger.appendChild(display);
      trigger.appendChild(icon);

      // Popup container
      const popup = document.createElement("div");
      popup.className = "custom-calendar-popup hidden";
      popup.setAttribute("role", "dialog");
      popup.setAttribute("aria-label", "Event date selector");

      // ==========================================
      // VIEW 1: DAYS VIEW
      // ==========================================
      const daysView = document.createElement("div");
      daysView.className = "cal-view cal-view-days";

      const daysHeader = document.createElement("div");
      daysHeader.className = "cal-header";

      const prevBtn = document.createElement("button");
      prevBtn.type = "button";
      prevBtn.className = "cal-nav-btn cal-prev-btn";
      prevBtn.setAttribute("aria-label", "Previous month");
      prevBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>';

      const monthYearTitleBtn = document.createElement("button");
      monthYearTitleBtn.type = "button";
      monthYearTitleBtn.className = "cal-month-year-btn";
      monthYearTitleBtn.setAttribute("aria-label", "Select month and year");
      monthYearTitleBtn.innerHTML = '<span class="cal-title-text"></span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>';

      const nextBtn = document.createElement("button");
      nextBtn.type = "button";
      nextBtn.className = "cal-nav-btn cal-next-btn";
      nextBtn.setAttribute("aria-label", "Next month");
      nextBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>';

      daysHeader.appendChild(prevBtn);
      daysHeader.appendChild(monthYearTitleBtn);
      daysHeader.appendChild(nextBtn);

      const weekdaysRow = document.createElement("div");
      weekdaysRow.className = "cal-weekdays";
      ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].forEach(day => {
        const span = document.createElement("span");
        span.textContent = day;
        weekdaysRow.appendChild(span);
      });

      const daysGrid = document.createElement("div");
      daysGrid.className = "cal-days-grid";

      const footer = document.createElement("div");
      footer.className = "cal-footer";

      const todayBtn = document.createElement("button");
      todayBtn.type = "button";
      todayBtn.className = "cal-action-btn cal-today-btn";
      todayBtn.textContent = "Today";

      const clearBtn = document.createElement("button");
      clearBtn.type = "button";
      clearBtn.className = "cal-action-btn cal-clear-btn";
      clearBtn.textContent = "Clear";

      footer.appendChild(todayBtn);
      footer.appendChild(clearBtn);

      daysView.appendChild(daysHeader);
      daysView.appendChild(weekdaysRow);
      daysView.appendChild(daysGrid);
      daysView.appendChild(footer);

      // ==========================================
      // VIEW 2: MONTHS VIEW (SCREENSHOT 2)
      // ==========================================
      const monthsView = document.createElement("div");
      monthsView.className = "cal-view cal-view-months hidden";

      const monthsHeader = document.createElement("div");
      monthsHeader.className = "cal-header";

      const switchYearBtn = document.createElement("button");
      switchYearBtn.type = "button";
      switchYearBtn.className = "cal-switch-year-btn";
      switchYearBtn.innerHTML = '<span class="cal-year-label">Year: 2026</span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>';

      const backToDaysBtn = document.createElement("button");
      backToDaysBtn.type = "button";
      backToDaysBtn.className = "cal-back-pill-btn";
      backToDaysBtn.textContent = "Back to Days";

      monthsHeader.appendChild(switchYearBtn);
      monthsHeader.appendChild(backToDaysBtn);

      const monthsGrid = document.createElement("div");
      monthsGrid.className = "cal-months-grid";

      monthsView.appendChild(monthsHeader);
      monthsView.appendChild(monthsGrid);

      // ==========================================
      // VIEW 3: YEARS VIEW (SCREENSHOT 3)
      // ==========================================
      const yearsView = document.createElement("div");
      yearsView.className = "cal-view cal-view-years hidden";

      const yearsHeader = document.createElement("div");
      yearsHeader.className = "cal-header";

      const yearsHeading = document.createElement("span");
      yearsHeading.className = "cal-view-heading";
      yearsHeading.textContent = "Select Event Year";

      const backToMonthsBtn = document.createElement("button");
      backToMonthsBtn.type = "button";
      backToMonthsBtn.className = "cal-back-pill-btn";
      backToMonthsBtn.textContent = "Back to Months";

      yearsHeader.appendChild(yearsHeading);
      yearsHeader.appendChild(backToMonthsBtn);

      const yearsGrid = document.createElement("div");
      yearsGrid.className = "cal-years-grid";

      yearsView.appendChild(yearsHeader);
      yearsView.appendChild(yearsGrid);

      // Append all views to popup
      popup.appendChild(daysView);
      popup.appendChild(monthsView);
      popup.appendChild(yearsView);

      wrapper.appendChild(trigger);
      wrapper.appendChild(popup);
      nativeInput.parentNode.insertBefore(wrapper, nativeInput.nextSibling);

      // State
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      let viewDate = new Date();
      let selectedDate = null;
      let currentView = "days";

      const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];

      if (nativeInput.value) {
        const parts = nativeInput.value.split("-");
        if (parts.length === 3) {
          selectedDate = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
          viewDate = new Date(selectedDate);
          formatAndDisplay(selectedDate);
        }
      }

      function formatAndDisplay(d) {
        if (!d) {
          display.textContent = "Select event date";
          display.classList.add("is-placeholder");
          return;
        }
        const options = { weekday: "short", day: "numeric", month: "short", year: "numeric" };
        display.textContent = d.toLocaleDateString("en-IN", options);
        display.classList.remove("is-placeholder");
      }

      function switchView(target) {
        currentView = target;
        daysView.classList.toggle("hidden", target !== "days");
        monthsView.classList.toggle("hidden", target !== "months");
        yearsView.classList.toggle("hidden", target !== "years");

        if (target === "days") renderDays();
        else if (target === "months") renderMonths();
        else if (target === "years") renderYears();
      }

      // RENDER DAYS
      function renderDays() {
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();

        monthYearTitleBtn.querySelector(".cal-title-text").textContent = `${monthNames[month]} ${year}`;

        const isCurrentOrPastMonth = year < today.getFullYear() || (year === today.getFullYear() && month <= today.getMonth());
        prevBtn.style.opacity = isCurrentOrPastMonth ? "0.3" : "1";
        prevBtn.style.pointerEvents = isCurrentOrPastMonth ? "none" : "auto";

        daysGrid.innerHTML = "";

        const firstDayIndex = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < firstDayIndex; i++) {
          const empty = document.createElement("div");
          empty.className = "cal-day is-empty";
          daysGrid.appendChild(empty);
        }

        for (let d = 1; d <= daysInMonth; d++) {
          const dateObj = new Date(year, month, d);
          dateObj.setHours(0, 0, 0, 0);

          const dayCell = document.createElement("div");
          dayCell.className = "cal-day";
          dayCell.textContent = d;

          const isPast = dateObj < today;
          const isToday = dateObj.getTime() === today.getTime();
          const isSelected = selectedDate && dateObj.getTime() === selectedDate.getTime();

          if (isPast) dayCell.classList.add("is-past");
          if (isToday) dayCell.classList.add("is-today");
          if (isSelected) dayCell.classList.add("is-selected");

          if (!isPast) {
            dayCell.addEventListener("click", e => {
              e.stopPropagation();
              selectedDate = dateObj;
              const yyyy = dateObj.getFullYear();
              const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
              const dd = String(dateObj.getDate()).padStart(2, "0");
              nativeInput.value = `${yyyy}-${mm}-${dd}`;
              nativeInput.dispatchEvent(new Event("change", { bubbles: true }));

              formatAndDisplay(dateObj);
              closePicker();
              trigger.focus();
            });
          }

          daysGrid.appendChild(dayCell);
        }
      }

      // RENDER MONTHS (SCREENSHOT 2)
      function renderMonths() {
        const year = viewDate.getFullYear();
        switchYearBtn.querySelector(".cal-year-label").textContent = `Year: ${year}`;

        monthsGrid.innerHTML = "";
        monthNames.forEach((name, idx) => {
          const mBtn = document.createElement("button");
          mBtn.type = "button";
          mBtn.className = "cal-month-card";
          mBtn.textContent = name;

          const isPastMonth = (year < today.getFullYear()) || (year === today.getFullYear() && idx < today.getMonth());
          const isCurrentViewMonth = (idx === viewDate.getMonth());

          if (isPastMonth) {
            mBtn.classList.add("is-past");
          } else {
            if (isCurrentViewMonth) mBtn.classList.add("is-selected");

            mBtn.addEventListener("click", e => {
              e.stopPropagation();
              viewDate.setMonth(idx);
              switchView("days");
            });
          }

          monthsGrid.appendChild(mBtn);
        });
      }

      // RENDER YEARS (SCREENSHOT 3)
      function renderYears() {
        yearsGrid.innerHTML = "";
        const currentYear = today.getFullYear();
        const selectedYear = viewDate.getFullYear();

        // Show 12 years starting from current year
        for (let yr = currentYear; yr <= currentYear + 11; yr++) {
          const yBtn = document.createElement("button");
          yBtn.type = "button";
          yBtn.className = "cal-year-card";
          yBtn.textContent = yr;

          if (yr === selectedYear) {
            yBtn.classList.add("is-selected");
          }

          yBtn.addEventListener("click", e => {
            e.stopPropagation();
            viewDate.setFullYear(yr);
            switchView("months");
          });

          yearsGrid.appendChild(yBtn);
        }
      }

      // View transition buttons
      monthYearTitleBtn.addEventListener("click", e => {
        e.stopPropagation();
        switchView("months");
      });

      switchYearBtn.addEventListener("click", e => {
        e.stopPropagation();
        switchView("years");
      });

      backToDaysBtn.addEventListener("click", e => {
        e.stopPropagation();
        switchView("days");
      });

      backToMonthsBtn.addEventListener("click", e => {
        e.stopPropagation();
        switchView("months");
      });

      prevBtn.addEventListener("click", e => {
        e.stopPropagation();
        viewDate.setMonth(viewDate.getMonth() - 1);
        renderDays();
      });

      nextBtn.addEventListener("click", e => {
        e.stopPropagation();
        viewDate.setMonth(viewDate.getMonth() + 1);
        renderDays();
      });

      todayBtn.addEventListener("click", e => {
        e.stopPropagation();
        selectedDate = new Date(today);
        viewDate = new Date(today);
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const dd = String(today.getDate()).padStart(2, "0");
        nativeInput.value = `${yyyy}-${mm}-${dd}`;
        nativeInput.dispatchEvent(new Event("change", { bubbles: true }));

        formatAndDisplay(today);
        closePicker();
        trigger.focus();
      });

      clearBtn.addEventListener("click", e => {
        e.stopPropagation();
        selectedDate = null;
        nativeInput.value = "";
        nativeInput.dispatchEvent(new Event("change", { bubbles: true }));
        formatAndDisplay(null);
        renderDays();
      });

      const openPicker = () => {
        document.querySelectorAll(".custom-select-wrap.is-open").forEach(w => {
          w.classList.remove("is-open");
          w.querySelector(".custom-select-dropdown")?.classList.add("hidden");
          w.querySelector(".custom-select-trigger")?.setAttribute("aria-expanded", "false");
        });
        document.querySelectorAll(".custom-date-picker-wrap.is-open").forEach(w => {
          if (w !== wrapper) {
            w.classList.remove("is-open");
            w.querySelector(".custom-calendar-popup")?.classList.add("hidden");
            w.querySelector(".custom-date-trigger")?.setAttribute("aria-expanded", "false");
          }
        });

        wrapper.classList.add("is-open");
        popup.classList.remove("hidden");
        trigger.setAttribute("aria-expanded", "true");
        switchView("days");
      };

      const closePicker = () => {
        wrapper.classList.remove("is-open");
        popup.classList.add("hidden");
        trigger.setAttribute("aria-expanded", "false");
      };

      trigger.addEventListener("click", e => {
        e.preventDefault();
        e.stopPropagation();
        if (wrapper.classList.contains("is-open")) {
          closePicker();
        } else {
          openPicker();
        }
      });

      trigger.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
          e.preventDefault();
          openPicker();
        } else if (e.key === "Escape") {
          closePicker();
        }
      });
    });
  };

  document.addEventListener("click", () => {
    document.querySelectorAll(".custom-select-wrap.is-open").forEach(w => {
      w.classList.remove("is-open");
      w.querySelector(".custom-select-dropdown")?.classList.add("hidden");
      w.querySelector(".custom-select-trigger")?.setAttribute("aria-expanded", "false");
    });
    document.querySelectorAll(".custom-date-picker-wrap.is-open").forEach(w => {
      w.classList.remove("is-open");
      w.querySelector(".custom-calendar-popup")?.classList.add("hidden");
      w.querySelector(".custom-date-trigger")?.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      document.querySelectorAll(".custom-select-wrap.is-open").forEach(w => {
        w.classList.remove("is-open");
        w.querySelector(".custom-select-dropdown")?.classList.add("hidden");
        w.querySelector(".custom-select-trigger")?.setAttribute("aria-expanded", "false");
      });
      document.querySelectorAll(".custom-date-picker-wrap.is-open").forEach(w => {
        w.classList.remove("is-open");
        w.querySelector(".custom-calendar-popup")?.classList.add("hidden");
        w.querySelector(".custom-date-trigger")?.setAttribute("aria-expanded", "false");
      });
    }
  });

  initCustomSelects();
  initCustomDatePickers();

  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();

    const name = form.elements.name ? form.elements.name.value.trim() : "";
    const contact = form.elements.contact ? form.elements.contact.value.trim() : "";
    const date = form.elements.date ? form.elements.date.value.trim() : "";
    const eventType = form.elements.eventType ? form.elements.eventType.value.trim() : "";

    const dateTrigger = form.querySelector(".custom-date-trigger");
    const selectTrigger = form.querySelector(".custom-select-trigger");

    if (dateTrigger) dateTrigger.style.borderColor = "";
    if (selectTrigger) selectTrigger.style.borderColor = "";

    if (!name) {
      status.textContent = "Please enter your full name.";
      status.classList.remove("hidden");
      form.elements.name?.focus();
      return;
    }

    if (!contact) {
      status.textContent = "Please enter your phone or WhatsApp number.";
      status.classList.remove("hidden");
      form.elements.contact?.focus();
      return;
    }

    if (!date) {
      if (dateTrigger) {
        dateTrigger.style.borderColor = "#d9534f";
        dateTrigger.focus();
      }
      status.textContent = "Please select the event date.";
      status.classList.remove("hidden");
      return;
    }

    if (!eventType) {
      if (selectTrigger) {
        selectTrigger.style.borderColor = "#d9534f";
        selectTrigger.focus();
      }
      status.textContent = "Please select the type of event.";
      status.classList.remove("hidden");
      return;
    }

    const data = new FormData(form);
    const message = [
      `*New Event Enquiry — ${cfg.venueName || "Saptha Aradhana Convention Hall"}*`,
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
