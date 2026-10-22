/* Collapsible groups: open on wide screens, closed behind a tap-to-open summary on small screens. */
(function () {
  var mq = window.matchMedia('(max-width: 781px)');
  function sync() {
    document.querySelectorAll('details.sn-collapse').forEach(function (d) { d.open = !mq.matches; });
  }
  sync();
  if (mq.addEventListener) mq.addEventListener('change', sync); else mq.addListener(sync);
  // keep the visible summary label in step with the pressed chip in client-side filters
  document.addEventListener('click', function (e) {
    var chip = e.target.closest && e.target.closest('.sn-chip[aria-pressed]');
    if (!chip) return;
    var d = chip.closest('details.sn-collapse'); if (!d) return;
    var em = d.querySelector('summary em'); if (em) em.textContent = chip.textContent.trim();
    if (mq.matches) d.open = false;
  });
})();

/* Gentle scroll-in for panels and cards (skipped when the visitor prefers reduced motion). */
(function () {
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var sel = '.sn-job, .sn-pil > *, .sn-bi, ul.products li.product, .sn-ing, .wp-block-post-template li, .sn-statement h2, .sn-statement p';
  var els = Array.prototype.slice.call(document.querySelectorAll(sel));
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  els.forEach(function (el, i) { el.classList.add('sn-reveal'); el.style.setProperty('--d', ((i % 5) * 70) + 'ms'); io.observe(el); });
})();
