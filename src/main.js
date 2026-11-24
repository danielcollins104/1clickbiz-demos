// HydroMax demo — interactions
(function () {
  'use strict';

  // Footer year
  var q = new URLSearchParams(window.location.search);
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();


  // ---- Before/after sliders ----
  // The range input is the single source of truth: pointer drag updates it,
  // keyboard arrows work natively, clip-path follows the value.
  document.querySelectorAll('[data-ba]').forEach(function (ba) {
    var range = ba.querySelector('input[type=range]');
    function setCut(v) { ba.style.setProperty('--cut', v + '%'); }
    setCut(range.value);
    range.addEventListener('input', function () { setCut(range.value); });

    function fromEvent(e) {
      var rect = ba.getBoundingClientRect();
      var x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
      var v = Math.max(0, Math.min(100, (x / rect.width) * 100));
      range.value = v;
      setCut(v);
    }
    var dragging = false;
    ba.addEventListener('pointerdown', function (e) {
      dragging = true;
      ba.setPointerCapture && ba.setPointerCapture(e.pointerId);
      fromEvent(e);
    });
    ba.addEventListener('pointermove', function (e) { if (dragging) fromEvent(e); });
    ['pointerup', 'pointercancel'].forEach(function (ev) {
      ba.addEventListener(ev, function () { dragging = false; });
    });
  });

  // ---- Scroll reveal ----
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els = document.querySelectorAll('.rv');
  if (reduce || !('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('on'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('on'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  }

  // ---- Quote form: opens the visitor's SMS app with a prefilled message ----
  // No backend needed; swap this number when reselling the site.
  var BIZ_PHONE = q.get('ph') || '+15554829100';
  var form = document.getElementById('quoteForm');
  var msg = document.getElementById('formMsg');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = form.name.value.trim();
    var contact = form.contact.value.trim();
    var service = form.service.value;
    if (!name || !contact) {
      msg.textContent = 'Add your name and a phone or email so we can reach you.';
      (!name ? form.name : form.contact).focus();
      return;
    }
    var body = 'Quote request — ' + name + ' (' + contact + '): ' + service;
    msg.textContent = 'Opening your messages app — just hit send!';
    window.location.href = 'sms:' + BIZ_PHONE + '?&body=' + encodeURIComponent(body);
  });
})();
