// Simple language switcher for DreamChat static site.
// localStorage is used ONLY to remember the visitor's preferred language
// across pages. It is NOT used for analytics, tracking, advertising,
// or any user identification.

(function () {
  var SUPPORTED = ['zh-Hant', 'zh-Hans', 'ja', 'en'];
  var STORAGE_KEY = 'dreamchat-lang';
  var DEFAULT = 'zh-Hant';
  var LABELS = {
    'zh-Hant': '繁體中文',
    'zh-Hans': '简体中文',
    ja: '日本語',
    en: 'English'
  };
  var currentLang = DEFAULT;
  var SEARCH_LABELS = {
    'zh-Hant': {
      placeholder: '搜尋說明',
      empty: '找不到相關說明',
      resultLabel: '搜尋結果',
      clear: '清除搜尋'
    },
    'zh-Hans': {
      placeholder: '搜索说明',
      empty: '找不到相关说明',
      resultLabel: '搜索结果',
      clear: '清除搜索'
    },
    ja: {
      placeholder: 'ヘルプを検索',
      empty: '関連するヘルプは見つかりません',
      resultLabel: '検索結果',
      clear: '検索をクリア'
    },
    en: {
      placeholder: 'Search help',
      empty: 'No matching help found',
      resultLabel: 'Search results',
      clear: 'Clear search'
    }
  };
  var SEARCH_INDEX = [
    {
      url: 'guide.html',
      title: {
        'zh-Hant': '使用說明',
        'zh-Hans': '使用说明',
        ja: '使い方ガイド',
        en: 'User Guide'
      },
      description: {
        'zh-Hant': '快速了解聊天、角色、字卡庫、情境標籤、定時來訊與備份。',
        'zh-Hans': '快速了解聊天、角色、字卡库、情境标签、定时来信与备份。',
        ja: 'チャット、キャラクター、定型文集、コンテキストタグ、予約受信、バックアップをひと通り確認できます。',
        en: 'Quickly learn chat, characters, phrase libraries, context tags, scheduled messages, and backup.'
      },
      text: {
        'zh-Hant': '快速開始 聊天 角色 字卡庫 情境標籤 定時來訊 貼圖 設定 備份 智慧輔助',
        'zh-Hans': '快速开始 聊天 角色 字卡库 情境标签 定时来信 表情包 设置 备份 智能辅助',
        ja: 'はじめに チャット キャラクター 定型文集 コンテキストタグ 予約受信 スタンプ 設定 バックアップ スマートアシスト',
        en: 'start chat characters chat phrases context tags scheduled messages stickers settings backup smart assist'
      }
    },
    {
      url: 'articles.html',
      title: {
        'zh-Hant': '專欄',
        'zh-Hans': '专栏',
        ja: '記事',
        en: 'Articles'
      },
      description: {
        'zh-Hant': '收集需要較完整步驟或行為說明的功能頁。',
        'zh-Hans': '收集需要较完整步骤或行为说明的功能页。',
        ja: '詳しい手順や動作説明が必要な機能ページをまとめています。',
        en: 'Detailed help pages for setup steps and behavior notes.'
      },
      text: {
        'zh-Hant': '詳細說明 功能文章 字卡庫格式轉換 情境標籤',
        'zh-Hans': '详细说明 功能文章 字卡库格式转换 情境标签',
        ja: '詳しい説明 記事 定型文集フォーマット変換 コンテキストタグ',
        en: 'detailed help articles phrase library converter context tags'
      }
    },
    {
      url: 'context-tags.html',
      title: {
        'zh-Hant': '情境標籤詳細說明',
        'zh-Hans': '情境标签详细说明',
        ja: 'コンテキストタグの詳しい説明',
        en: 'Context Tags Guide'
      },
      description: {
        'zh-Hant': '建立標籤、套用到字卡組，並在聊天室指定目前情境。',
        'zh-Hans': '建立标签、套用到字卡组，并在聊天室指定当前情境。',
        ja: 'タグを作成し、定型文セットに割り当て、チャットの現在のコンテキストを指定します。',
        en: 'Create tags, assign them to phrase sets, and choose the current chat context.'
      },
      text: {
        'zh-Hant': '情境標籤 目前情境 自訂字卡組 通用字卡組 聊天脈絡 回覆選擇 備份 匯入 24 200 8',
        'zh-Hans': '情境标签 当前情境 自定义字卡组 通用字卡组 聊天脉络 回复选择 备份 导入 24 200 8',
        ja: 'コンテキストタグ 現在のコンテキスト カスタム定型文セット 基本セット 返信選択 バックアップ 読み込み 24 200 8',
        en: 'context tags current context custom phrase sets general phrase set reply selection backup import 24 200 8'
      }
    },
    {
      url: 'card-library-converter.html',
      title: {
        'zh-Hant': '字卡庫格式轉換器',
        'zh-Hans': '字卡库格式转换器',
        ja: '定型文集フォーマット変換ツール',
        en: 'Phrase Library Format Converter'
      },
      description: {
        'zh-Hant': '把支援的字卡備份 JSON 轉成 DreamChat 可匯入的字卡庫格式。',
        'zh-Hans': '把支持的字卡备份 JSON 转成 DreamChat 可导入的字卡库格式。',
        ja: '対応している定型文バックアップ JSON を DreamChat で読み込める形式に変換します。',
        en: 'Convert supported phrase backup JSON into DreamChat import format.'
      },
      text: {
        'zh-Hant': '字卡庫 格式轉換 匯入 JSON milk 自訂回覆 customReplies customReplyGroups',
        'zh-Hans': '字卡库 格式转换 导入 JSON milk 自定义回复 customReplies customReplyGroups',
        ja: '定型文集 フォーマット変換 読み込み JSON milk customReplies customReplyGroups',
        en: 'phrase library format converter import JSON milk customReplies customReplyGroups'
      }
    },
    {
      url: 'privacy.html',
      title: {
        'zh-Hant': '隱私權政策',
        'zh-Hans': '隐私权政策',
        ja: 'プライバシーポリシー',
        en: 'Privacy Policy'
      },
      description: {
        'zh-Hant': '了解本機資料、權限、智慧輔助、診斷與備份如何處理。',
        'zh-Hans': '了解本机数据、权限、智能辅助、诊断与备份如何处理。',
        ja: '端末内データ、権限、スマートアシスト、診断、バックアップの扱いを確認できます。',
        en: 'Learn how local data, permissions, Smart Assist, diagnostics, and backups are handled.'
      },
      text: {
        'zh-Hant': '隱私 本機資料 Apple Music 照片 智慧輔助 診斷 備份 localStorage',
        'zh-Hans': '隐私 本机数据 Apple Music 照片 智能辅助 诊断 备份 localStorage',
        ja: 'プライバシー 端末内データ Apple Music 写真 スマートアシスト 診断 バックアップ localStorage',
        en: 'privacy local data Apple Music Photos Smart Assist diagnostics backup localStorage'
      }
    },
    {
      url: 'support.html',
      title: {
        'zh-Hant': '支援與常見問題',
        'zh-Hans': '支持与常见问题',
        ja: 'サポートとよくある質問',
        en: 'Support and FAQ'
      },
      description: {
        'zh-Hant': '訂閱、恢復購買、權限、匯入匯出、資料刪除與聯絡方式。',
        'zh-Hans': '订阅、恢复购买、权限、导入导出、数据删除与联系方式。',
        ja: 'サブスクリプション、購入復元、権限、読み込み・書き出し、データ削除、連絡先。',
        en: 'Subscriptions, restore purchases, permissions, import/export, data deletion, and contact.'
      },
      text: {
        'zh-Hant': '支援 FAQ 訂閱 恢復購買 權限 智慧輔助 匯入 匯出 刪除資料 聯絡',
        'zh-Hans': '支持 FAQ 订阅 恢复购买 权限 智能辅助 导入 导出 删除数据 联系',
        ja: 'サポート FAQ サブスクリプション 購入復元 権限 スマートアシスト 読み込み 書き出し データ削除 連絡',
        en: 'support FAQ subscription restore purchases permissions Smart Assist import export delete data contact'
      }
    },
    {
      url: 'index.html',
      title: {
        'zh-Hant': 'DreamChat 首頁',
        'zh-Hans': 'DreamChat 首页',
        ja: 'DreamChat ホーム',
        en: 'DreamChat Home'
      },
      description: {
        'zh-Hant': 'DreamChat 官方網站入口。',
        'zh-Hans': 'DreamChat 官方网站入口。',
        ja: 'DreamChat 公式サイトの入口です。',
        en: 'The DreamChat website home page.'
      },
      text: {
        'zh-Hant': '首頁 自訂角色 虛擬陪伴 聊天 App 字卡 定時來訊 貼圖 本機私密保存',
        'zh-Hans': '首页 自定义角色 虚拟陪伴 聊天 App 字卡 定时来信 表情包 本机私密保存',
        ja: 'ホーム カスタムキャラクター バーチャルチャット 定型文 予約受信 スタンプ 端末内保存',
        en: 'home custom characters virtual companion chat app phrases scheduled messages stickers local private storage'
      }
    }
  ];

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

  function searchLabels() {
    return SEARCH_LABELS[currentLang] || SEARCH_LABELS[DEFAULT];
  }

  function localizedValue(value) {
    return value[currentLang] || value[DEFAULT] || value.en || '';
  }

  function normalizeSearchText(text) {
    return String(text || '')
      .toLocaleLowerCase()
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function urlWithLang(url, lang) {
    try {
      var target = new URL(url, window.location.href);
      target.searchParams.set('lang', lang);
      return target.pathname.split('/').pop() + target.search + target.hash;
    } catch (e) {
      return url;
    }
  }

  function matchingSearchItems(query) {
    var normalizedQuery = normalizeSearchText(query);
    if (!normalizedQuery) return [];
    var terms = normalizedQuery.split(' ').filter(Boolean);
    return SEARCH_INDEX.map(function (item) {
      var haystack = normalizeSearchText(localizedValue(item.title) + ' ' + localizedValue(item.text));
      var score = 0;
      for (var i = 0; i < terms.length; i++) {
        if (haystack.indexOf(terms[i]) === -1) return null;
        score += haystack.indexOf(terms[i]) === 0 ? 3 : 1;
      }
      return { item: item, score: score };
    })
      .filter(Boolean)
      .sort(function (a, b) { return b.score - a.score; })
      .slice(0, 6)
      .map(function (result) { return result.item; });
  }

  function closeSiteSearch(searchRoot) {
    if (!searchRoot) return;
    var input = searchRoot.querySelector('[data-site-search-input]');
    var results = searchRoot.querySelector('[data-site-search-results]');
    if (results) {
      results.hidden = true;
      results.innerHTML = '';
    }
    if (input) {
      input.setAttribute('aria-expanded', 'false');
    }
  }

  function renderSiteSearchResults(searchRoot) {
    if (!searchRoot) return;
    var input = searchRoot.querySelector('[data-site-search-input]');
    var results = searchRoot.querySelector('[data-site-search-results]');
    if (!input || !results) return;

    var query = input.value;
    var labels = searchLabels();
    if (!query.trim()) {
      closeSiteSearch(searchRoot);
      return;
    }

    var matches = matchingSearchItems(query);
    results.innerHTML = '';
    results.setAttribute('aria-label', labels.resultLabel);

    if (!matches.length) {
      var empty = document.createElement('div');
      empty.className = 'site-search-empty';
      empty.textContent = labels.empty;
      results.appendChild(empty);
    } else {
      for (var i = 0; i < matches.length; i++) {
        var item = matches[i];
        var link = document.createElement('a');
        link.className = 'site-search-result';
        link.href = urlWithLang(item.url, currentLang);

        var title = document.createElement('strong');
        title.textContent = localizedValue(item.title);

        var description = document.createElement('span');
        description.textContent = localizedValue(item.description || item.text);

        link.appendChild(title);
        link.appendChild(description);
        results.appendChild(link);
      }
    }

    results.hidden = false;
    input.setAttribute('aria-expanded', 'true');
  }

  function updateSiteSearchLabels() {
    var labels = searchLabels();
    var inputs = document.querySelectorAll('[data-site-search-input]');
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].placeholder = labels.placeholder;
      inputs[i].setAttribute('aria-label', labels.placeholder);
    }

    var buttons = document.querySelectorAll('.site-search-submit');
    for (var j = 0; j < buttons.length; j++) {
      buttons[j].setAttribute('aria-label', labels.placeholder);
      buttons[j].title = labels.placeholder;
    }

    var searchRoots = document.querySelectorAll('[data-site-search]');
    for (var k = 0; k < searchRoots.length; k++) {
      renderSiteSearchResults(searchRoots[k]);
    }
  }

  function applyLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = DEFAULT;
    currentLang = lang;

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
        buttons[j].setAttribute('aria-checked', 'true');
      } else {
        buttons[j].classList.remove('active');
        buttons[j].setAttribute('aria-checked', 'false');
      }
    }

    var currentLabels = document.querySelectorAll('[data-current-lang]');
    for (var k = 0; k < currentLabels.length; k++) {
      currentLabels[k].textContent = LABELS[lang] || LABELS[DEFAULT];
    }

    updateSiteSearchLabels();
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

  function closeLanguageMenu(menu, toggle) {
    if (!menu || !toggle) return;
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  function toggleLanguageMenu(menu, toggle) {
    if (!menu || !toggle) return;
    var isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }

  function setupSiteSearch() {
    var searchRoots = document.querySelectorAll('[data-site-search]');
    for (var i = 0; i < searchRoots.length; i++) {
      (function (searchRoot) {
        var form = searchRoot.querySelector('[data-site-search-form]');
        var input = searchRoot.querySelector('[data-site-search-input]');
        if (!form || !input) return;

        input.addEventListener('input', function () {
          renderSiteSearchResults(searchRoot);
        });

        input.addEventListener('focus', function () {
          renderSiteSearchResults(searchRoot);
        });

        input.addEventListener('keydown', function (ev) {
          if (ev.key === 'Escape') {
            input.value = '';
            closeSiteSearch(searchRoot);
            input.blur();
          }
        });

        form.addEventListener('submit', function (ev) {
          ev.preventDefault();
          var matches = matchingSearchItems(input.value);
          if (!matches.length) return;
          window.location.href = urlWithLang(matches[0].url, currentLang);
        });
      })(searchRoots[i]);
    }

    document.addEventListener('click', function (ev) {
      for (var j = 0; j < searchRoots.length; j++) {
        if (!searchRoots[j].contains(ev.target)) {
          closeSiteSearch(searchRoots[j]);
        }
      }
    });

    updateSiteSearchLabels();
  }

  document.addEventListener('DOMContentLoaded', function () {
    applyLang(detectInitialLang());
    setupSiteSearch();

    var buttons = document.querySelectorAll('[data-lang-btn]');
    var languageMenu = document.querySelector('.language-menu');
    var languageToggle = document.querySelector('.language-menu-toggle');

    if (languageMenu && languageToggle) {
      languageToggle.addEventListener('click', function () {
        toggleLanguageMenu(languageMenu, languageToggle);
      });

      document.addEventListener('click', function (ev) {
        if (!languageMenu.contains(ev.target)) {
          closeLanguageMenu(languageMenu, languageToggle);
        }
      });

      document.addEventListener('keydown', function (ev) {
        if (ev.key === 'Escape' && languageMenu.classList.contains('open')) {
          closeLanguageMenu(languageMenu, languageToggle);
          languageToggle.focus();
        }
      });
    }

    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function (ev) {
        setLang(ev.currentTarget.getAttribute('data-lang-btn'));
        closeLanguageMenu(languageMenu, languageToggle);
      });
    }
  });
})();
