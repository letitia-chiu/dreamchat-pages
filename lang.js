// Simple language switcher for DreamChat static site.
// localStorage is used ONLY to remember the visitor's preferred language
// across pages. It is NOT used for analytics, tracking, advertising,
// or any user identification.

(function () {
  var SUPPORTED = ['zh-Hant', 'zh-Hans', 'ja', 'en'];
  var STORAGE_KEY = 'dreamchat-lang';
  var DEFAULT = 'zh-Hant';

  // Read ?lang=... from the URL.
  // This lets hreflang links (e.g. ?lang=ja) and shared URLs open the page
  // in the requested language.
  function langFromQuery() {
    try {
      var params = new URLSearchParams(window.location.search);
      var v = params.get('lang');
      if (v && SUPPORTED.indexOf(v) !== -1) return v;
    } catch (e) { /* URLSearchParams may not be available; fall through */ }
    return null;
  }

  function detectInitialLang() {
    // 1) URL query parameter takes priority (deep links from search results).
    var q = langFromQuery();
    if (q) return q;

    // 2) Previously remembered choice.
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;
    } catch (e) { /* localStorage may be disabled; fall back to default. */ }

    // 3) Browser language.
    var nav = (navigator.language || '').toLowerCase();
    if (nav.indexOf('zh') === 0) {
      if (nav.indexOf('cn') !== -1 || nav.indexOf('hans') !== -1 || nav.indexOf('sg') !== -1) {
        return 'zh-Hans';
      }
      return 'zh-Hant';
    }
    if (nav.indexOf('ja') === 0) return 'ja';
    if (nav.indexOf('en') === 0) return 'en';

    // 4) Default.
    return DEFAULT;
  }

  function applyLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = DEFAULT;

    document.documentElement.setAttribute('lang', lang);

    var nodes = document.querySelectorAll('[data-lang]');
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].getAttribute('data-lang') === lang) {
        nodes[i].classList.add('active');
      } else {
        nodes[i].classList.remove('active');
      }
    }

    var buttons = document.querySelectorAll('[data-lang-btn]');
    for (var j = 0; j < buttons.length; j++) {
      if (buttons[j].getAttribute('data-lang-btn') === lang) {
        buttons[j].classList.add('active');
      } else {
        buttons[j].classList.remove('active');
      }
    }
  }

  function setLang(lang) {
    applyLang(lang);
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignore */ }

    // Reflect the chosen language in the URL (without reloading) so the URL
    // remains shareable in the user's current language.
    try {
      var url = new URL(window.location.href);
      url.searchParams.set('lang', lang);
      window.history.replaceState({}, '', url);
    } catch (e) { /* History API may not be available; non-critical */ }
  }

  document.addEventListener('DOMContentLoaded', function () {
    applyLang(detectInitialLang());

    var buttons = document.querySelectorAll('[data-lang-btn]');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function (ev) {
        setLang(ev.currentTarget.getAttribute('data-lang-btn'));
      });
    }
  });
})();
