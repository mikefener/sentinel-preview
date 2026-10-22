/* Client-side search + function filter for [sentinel_ingredients]. Works on top of server-rendered HTML. */
(function () {
  document.querySelectorAll('[data-sn-ingredients]').forEach(function (root) {
    var items = Array.prototype.slice.call(root.querySelectorAll('.sn-ing'));
    var search = root.querySelector('[data-sn-search]');
    var chips = Array.prototype.slice.call(root.querySelectorAll('[data-sn-filter]'));
    var gchips = Array.prototype.slice.call(root.querySelectorAll('[data-sn-group]'));
    var empty = root.querySelector('[data-sn-empty]');
    var active = '', activeGroup = '';
    function apply() {
      var q = (search.value || '').trim().toLowerCase(), shown = 0;
      items.forEach(function (li) {
        var okFn = !active || (' ' + li.dataset.fn + ' ').indexOf(' ' + active + ' ') > -1;
        var okG = !activeGroup || (' ' + li.dataset.group + ' ').indexOf(' ' + activeGroup + ' ') > -1;
        var okQ = !q || li.dataset.hay.indexOf(q) > -1;
        li.hidden = !(okFn && okQ && okG);
        if (!li.hidden) shown++;
      });
      empty.hidden = shown > 0;
    }
    gchips.forEach(function (c) {
      c.addEventListener('click', function () {
        activeGroup = c.dataset.snGroup;
        gchips.forEach(function (x) { x.setAttribute('aria-pressed', x === c ? 'true' : 'false'); });
        apply();
      });
    });
    search.addEventListener('input', apply);
    chips.forEach(function (c) {
      c.addEventListener('click', function () {
        active = c.dataset.snFilter;
        chips.forEach(function (x) { x.setAttribute('aria-pressed', x === c ? 'true' : 'false'); });
        apply();
      });
    });
  });
})();
