(function () {
  "use strict";

  var ROTATE_MS = 4000;

  var SLIDES = [
    {
      eyebrow: "2.0 PRO® Installation",
      headline: "The Last Gutter Guard You'll <span class=\"hero-orange\">Ever Need</span>",
      sub: "Our patented 2.0 PRO® system blocks pine needles, roof grit and storm debris for good — engineered with an aircraft-grade aluminum frame and 440-micron stainless mesh."
    },
    {
      eyebrow: "2.0 PRO® Guard Installation",
      headline: "Aircraft-Grade Protection, <span class=\"hero-orange\">Installed for Life</span>",
      sub: "2.0 PRO® guards are custom cut and fastened to your exact gutter line, with every corner and end cap sealed in 50-year tri-polymer sealant."
    },
    {
      eyebrow: "Why 2.0 PRO®",
      headline: "Premium Protection, <span class=\"hero-orange\">By Design</span>",
      sub: "440-micron stainless mesh stops pine needles, roof grit and storm debris before they ever reach your gutters."
    },
    {
      eyebrow: "Seamless Gutters",
      headline: "Custom-Fit Seamless Gutters, <span class=\"hero-orange\">Formed On-Site</span>",
      sub: "Sagging seams and years of trapped leaves lead straight to fascia rot — pair new seamless gutters with 2.0 PRO® guards and never climb up to clean them again."
    }
  ];

  function init() {
    var section = document.getElementById("hero");
    if (!section) return;

    var slideEls = section.querySelectorAll(".hc-slide");
    var dotEls = section.querySelectorAll(".hc-dot");
    var eyebrowEl = document.getElementById("hc-eyebrow-text");
    var headlineWrap = document.getElementById("hc-headline-wrap");
    var headlineEl = document.getElementById("hc-headline");
    var subEl = document.getElementById("hc-sub");
    var progressBar = document.getElementById("hc-progress-bar");
    if (!slideEls.length || !headlineEl) return;

    var active = 0;
    var timer = null;
    var paused = false;

    function restartProgress() {
      if (!progressBar) return;
      progressBar.classList.remove("is-animating");
      void progressBar.offsetWidth; // force reflow so the animation restarts
      progressBar.classList.add("is-animating");
    }

    function goTo(index) {
      active = index;

      slideEls.forEach(function (el, i) {
        el.classList.toggle("is-active", i === active);
      });
      dotEls.forEach(function (el, i) {
        el.classList.toggle("is-active", i === active);
      });

      var data = SLIDES[active];
      if (data) {
        eyebrowEl.textContent = data.eyebrow;
        headlineEl.innerHTML = data.headline;
        subEl.textContent = data.sub;
      }

      headlineWrap.classList.remove("hc-rise");
      void headlineWrap.offsetWidth; // force reflow so the crossfade replays
      headlineWrap.classList.add("hc-rise");

      restartProgress();
    }

    function next() {
      goTo((active + 1) % SLIDES.length);
    }

    function start() {
      stop();
      timer = setInterval(function () {
        if (!paused) next();
      }, ROTATE_MS);
    }

    function stop() {
      if (timer) clearInterval(timer);
      timer = null;
    }

    dotEls.forEach(function (el, i) {
      el.addEventListener("click", function () {
        goTo(i);
        start();
      });
    });

    section.addEventListener("mouseenter", function () {
      paused = true;
    });
    section.addEventListener("mouseleave", function () {
      paused = false;
    });

    goTo(0);
    start();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
