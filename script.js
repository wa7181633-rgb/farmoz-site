/* ═══════════════════════════════════════════════
   Farmoz — site script
   No dependencies. Works from file:// too.
   ═══════════════════════════════════════════════ */

(function () {
  "use strict";

  /* ── 0. Apply config.js (single source of truth) ── */
  const CFG = Object.assign(
    {
      brand: "Farmoz",
      tagline: "Web & AI Systems",
      email: "farmoz98@gmail.com",
      whatsapp: "923122581354",
      github: "Farmoz",
      website: "",
    },
    window.FARMOZ_CONFIG || {}
  );

  const waDigits = String(CFG.whatsapp).replace(/[^\d]/g, "");

  // Contact links
  const mailLink = document.getElementById("mailLink");
  if (mailLink) {
    mailLink.href = "mailto:" + CFG.email;
    mailLink.textContent = CFG.email;
  }

  const waLink = document.getElementById("waLink");
  if (waLink && waDigits) {
    waLink.href = "https://wa.me/" + waDigits;
  }

  // Quick WhatsApp links (form + footer)
  ["waQuick", "footWa"].forEach((id) => {
    const el = document.getElementById(id);
    if (el && waDigits) el.href = "https://wa.me/" + waDigits;
  });

  const footMail = document.getElementById("footMail");
  if (footMail) footMail.href = "mailto:" + CFG.email;

  document.querySelectorAll("[data-github]").forEach((el) => {
    el.href = "https://github.com/" + CFG.github;
    el.textContent = "github.com/" + CFG.github;
  });

  // Brand text
  document.querySelectorAll("[data-brand]").forEach((el) => {
    el.childNodes[0].nodeValue = CFG.brand;
  });
  document.querySelectorAll("[data-tagline]").forEach((el) => {
    el.textContent = CFG.tagline;
  });

  /* ── 1. Sticky header shadow ─────────────────── */
  const header = document.querySelector(".site-header");
  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ── 2. Mobile menu ──────────────────────────── */
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");

  const closeMenu = () => {
    nav.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Open menu");
  };

  burger.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));

  document.addEventListener("click", (e) => {
    if (!nav.classList.contains("open")) return;
    if (nav.contains(e.target) || burger.contains(e.target)) return;
    closeMenu();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  /* ── 3. Reveal on scroll ─────────────────────── */
  const revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el, i) => {
      el.style.transitionDelay = Math.min(i % 3, 2) * 90 + "ms";
      io.observe(el);
    });
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  /* ── 4. Year ─────────────────────────────────── */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ── 5. Pricing / template CTA prefill ───────── */
  const typeSelect = document.querySelector('select[name="type"]');
  const messageField = document.querySelector('textarea[name="message"]');

  document.querySelectorAll("[data-plan], [data-template]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const plan = btn.getAttribute("data-plan");
      const tpl = btn.getAttribute("data-template");

      if (typeSelect) {
        if (plan && plan.toLowerCase().includes("ai")) {
          typeSelect.value = "AI automation";
        } else if (tpl) {
          typeSelect.value = "Buy a template";
        } else if (plan) {
          typeSelect.value = plan === "Starter" ? "Starter website" : "Business website";
        }
      }

      if (messageField) {
        const label = plan || tpl;
        if (label && !messageField.value.trim()) {
          messageField.value =
            tpl
              ? `Hi, I'd like to buy the "${tpl}" template. Please send me the details.`
              : `Hi, I'm interested in the "${plan}" package. Here's what I need:\n\n`;
          messageField.focus();
          messageField.setSelectionRange(messageField.value.length, messageField.value.length);
        }
      }

      // Let the anchor scroll normally; focus happens after jump.
      setTimeout(() => {
        const nameField = document.querySelector('input[name="name"]');
        if (nameField) nameField.focus({ preventScroll: true });
      }, 500);
    });
  });

  /* ── 6. Contact form (no backend) ────────────── */
  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const contact = String(data.get("contact") || "").trim();
      const message = String(data.get("message") || "").trim();
      const type = String(data.get("type") || "");
      const budget = String(data.get("budget") || "");

      // Validate
      if (!name || !contact || !message) {
        note.textContent = "Please fill in your name, contact and message.";
        note.classList.add("error");
        return;
      }
      if (contact.length < 5 || message.length < 10) {
        note.textContent = "That looks a little short — please add a bit more detail.";
        note.classList.add("error");
        return;
      }

      note.classList.remove("error");

      // Build a mailto: fallback so the form works with zero backend.
      const email = CFG.email;
      const subject = `New enquiry — ${type} (${budget})`;
      const body = [
        `Name: ${name}`,
        `Contact: ${contact}`,
        `Type: ${type}`,
        `Budget: ${budget}`,
        "",
        message,
      ].join("\n");

      const href =
        `mailto:${email}?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(body)}`;

      window.location.href = href;

      note.textContent = "Opening your email app… if nothing happens, message me on WhatsApp.";
    });

    // Clear the error state as soon as the user types.
    form.querySelectorAll("input, textarea, select").forEach((el) => {
      el.addEventListener("input", () => {
        if (note.classList.contains("error")) {
          note.textContent = "";
          note.classList.remove("error");
        }
      });
    });
  }

  /* ── 7. Smooth anchor offset for old browsers ── */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (id === "#" || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 88;
      window.scrollTo({ top, behavior: "smooth" });
      history.replaceState(null, "", id);
    });
  });
})();
