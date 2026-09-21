(function () {
  "use strict";

  // Resolve the folder this script itself was loaded from, then fetch the
  // partials relative to that folder. Because <script src> is resolved by
  // the browser against the page's own URL, this stays correct whether the
  // site is served from a local dev server, a root domain, a custom domain,
  // or a GitHub Pages-style repository subfolder (https://user.github.io/repo/)
  // -- as long as the script tag that loads this file points at "scripts/
  // site-include.js" via a path that is itself correct for that page (see
  // the relative src= values used across the site's pages).
  function getSiteRoot() {
    var scriptEl = document.currentScript;
    if (!scriptEl) {
      var scripts = document.getElementsByTagName("script");
      for (var i = scripts.length - 1; i >= 0; i--) {
        if (/(^|\/)site-include\.js(\?.*)?$/.test(scripts[i].src)) {
          scriptEl = scripts[i];
          break;
        }
      }
    }
    if (!scriptEl || !scriptEl.src) return "/";
    return scriptEl.src.replace(/scripts\/site-include\.js(\?.*)?$/, "");
  }

  var SITE_ROOT = getSiteRoot();

  function setOpen(el, open, display) {
    el.style.display = open ? display : "none";
  }

  function initMobileNav() {
    var burger = document.getElementById("nav-burger-btn");
    var menu = document.getElementById("nav-mobile-menu");
    if (!burger || !menu) return;

    // Wired structurally off .mobile-acc / .mobile-acc-trigger / .mobile-acc-panel
    // / .faq-chevron instead of hardcoded ids, so any accordion added to the
    // mobile menu markup (Services, Service Areas, Compare, Resources, ...)
    // works automatically without a matching id having to be kept in sync here.
    var accordions = Array.prototype.slice.call(menu.querySelectorAll(".mobile-acc"));

    function closeAccordions() {
      accordions.forEach(function (acc) {
        var trigger = acc.querySelector(".mobile-acc-trigger");
        var panel = acc.querySelector(".mobile-acc-panel");
        var chevron = acc.querySelector(".faq-chevron");
        setOpen(panel, false, "flex");
        if (chevron) chevron.classList.remove("faq-chevron-open");
        if (trigger) trigger.setAttribute("aria-expanded", "false");
      });
    }

    burger.addEventListener("click", function () {
      var open = menu.style.display !== "flex";
      setOpen(menu, open, "flex");
      burger.setAttribute("aria-expanded", String(open));
      if (!open) closeAccordions();
    });

    accordions.forEach(function (acc) {
      var trigger = acc.querySelector(".mobile-acc-trigger");
      var panel = acc.querySelector(".mobile-acc-panel");
      var chevron = acc.querySelector(".faq-chevron");
      if (!trigger || !panel) return;
      trigger.addEventListener("click", function () {
        var open = panel.style.display !== "flex";
        setOpen(panel, open, "flex");
        if (chevron) chevron.classList.toggle("faq-chevron-open", open);
        trigger.setAttribute("aria-expanded", String(open));
      });
    });
  }

  function initFaqAccordions() {
    var triggers = document.querySelectorAll(".faq-trigger");
    triggers.forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        var item = trigger.closest(".faq-item");
        var panel = item && item.querySelector(".faq-panel");
        var chevron = trigger.querySelector(".faq-chevron");
        if (!panel) return;
        var open = panel.style.display !== "block";
        panel.style.display = open ? "block" : "none";
        trigger.setAttribute("aria-expanded", String(open));
        if (chevron) chevron.classList.toggle("faq-chevron-open", open);
      });
    });
  }

  function initFooterYear() {
    var el = document.getElementById("copyright-year");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  function mountPartial(targetId, url, afterMount) {
    var target = document.getElementById(targetId);
    if (!target) {
      console.error("Partial load failed: no #" + targetId + " element found on this page for " + url);
      return;
    }
    fetch(url, { cache: "no-store" })
      .then(function (res) {
        if (!res.ok) throw new Error(url + " responded with " + res.status + " " + res.statusText);
        return res.text();
      })
      .then(function (html) {
        target.innerHTML = html.split("__SITE_ROOT__").join(SITE_ROOT);
        if (afterMount) afterMount();
      })
      .catch(function (err) {
        console.error("Partial load failed:", err);
      });
  }

  function mount() {
    mountPartial("navbar-root", SITE_ROOT + "partials/navbar.html", initMobileNav);
    mountPartial("footer-root", SITE_ROOT + "partials/footer.html", initFooterYear);
    initFaqAccordions();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
