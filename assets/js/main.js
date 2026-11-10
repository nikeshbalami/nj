/* Progressive enhancements. The site works fully without this file. */
(function () {
  'use strict';

  /* 1. Menu toggle */
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  if (header && toggle) {
    var setOpen = function (open) {
      header.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && header.classList.contains('nav-open')) {
        setOpen(false);
        toggle.focus();
      }
    });
    header.querySelectorAll('.nav a').forEach(function (a) {
      a.addEventListener('click', function () { setOpen(false); });
    });
  }

  /* 2. Project filter */
  var chips = document.querySelectorAll('.chip[data-filter]');
  var entries = document.querySelectorAll('.entry[data-pillar]');
  var count = document.querySelector('[data-count]');
  if (chips.length && entries.length) {
    var areas = Array.prototype.map.call(chips, function (c) { return c.dataset.filter; });
    var labelFor = function (f) {
      var chip = document.querySelector('.chip[data-filter="' + f + '"]');
      return chip ? chip.textContent.trim() : '';
    };

    var apply = function (filter, targetId) {
      var shown = 0;
      entries.forEach(function (el) {
        var show = filter === 'all' || el.dataset.pillar === filter;
        el.hidden = !show;
        el.classList.toggle('is-target', el.id === targetId);
        if (show) shown++;
      });
      chips.forEach(function (c) {
        c.setAttribute('aria-pressed', c.dataset.filter === filter ? 'true' : 'false');
      });
      if (count) {
        var noun = shown === 1 ? 'project' : 'projects';
        count.textContent = filter === 'all'
          ? 'Showing all ' + shown + ' ' + noun
          : 'Showing ' + shown + ' ' + noun + ' in ' + labelFor(filter);
      }
    };

    var fromHash = function () {
      var h = decodeURIComponent(location.hash.slice(1));
      if (h && h !== 'all' && areas.indexOf(h) !== -1) {
        apply(h, null);
      } else if (h && document.getElementById(h) && document.getElementById(h).classList.contains('entry')) {
        apply('all', h);
        var target = document.getElementById(h);
        target.scrollIntoView();
        target.focus({ preventScroll: true });
      } else {
        apply('all', null);
      }
    };

    chips.forEach(function (c) {
      c.addEventListener('click', function () {
        var f = c.dataset.filter;
        history.replaceState(null, '', f === 'all' ? location.pathname : '#' + f);
        apply(f, null);
      });
    });
    window.addEventListener('hashchange', fromHash);
    fromHash();
  }

  /* 3. Copy buttons */
  var status = document.querySelector('[data-copy-status]');
  var announce = function (msg) {
    if (!status) return;
    status.textContent = '';
    setTimeout(function () { status.textContent = msg; }, 50);
  };
  var fallbackCopy = function (text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'absolute';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    return ok;
  };
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var src = document.getElementById(btn.dataset.copy);
      if (!src) return;
      var text = src.textContent.trim();
      var label = btn.textContent.replace(/^Copy /, '');
      var done = function () { announce('Copied the ' + label + ' to the clipboard.'); };
      var fail = function () {
        if (fallbackCopy(text)) done();
        else announce('Copy did not work. Select the text and copy it manually.');
      };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(done, fail);
      } else {
        fail();
      }
    });
  });
})();
