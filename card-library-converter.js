(function (root) {
  var DEFAULT_CATEGORY_ID = '00000000-0000-0000-0000-000000000001';

  var MESSAGES = {
    'zh-Hant': {
      noFile: '請先選擇支援格式的備份 JSON 檔。',
      unsupported: '抱歉，此格式暫時不支援轉換',
      converted: '轉換完成，確認統計後可下載 DreamChat 字卡庫 JSON。',
      downloaded: '已下載 DreamChat 字卡庫 JSON。',
      cleared: '已清除選擇的檔案。',
      fileSelected: '已選擇：',
      noFileSelected: '尚未選擇檔案'
    },
    'zh-Hans': {
      noFile: '请先选择支持格式的备份 JSON 文件。',
      unsupported: '抱歉，此格式暂时不支持转换',
      converted: '转换完成，确认统计后即可下载 DreamChat 字卡库 JSON。',
      downloaded: '已下载 DreamChat 字卡库 JSON。',
      cleared: '已清除选择的文件。',
      fileSelected: '已选择：',
      noFileSelected: '尚未选择文件'
    },
    ja: {
      noFile: '対応形式のバックアップ JSON ファイルを選択してください。',
      unsupported: '申し訳ありません。この形式は現在変換に対応していません。',
      converted: '変換が完了しました。件数を確認してから DreamChat 定型文集 JSON をダウンロードできます。',
      downloaded: 'DreamChat 定型文集 JSON をダウンロードしました。',
      cleared: '選択したファイルをクリアしました。',
      fileSelected: '選択済み：',
      noFileSelected: 'ファイル未選択'
    },
    en: {
      noFile: 'Choose a supported backup JSON file first.',
      unsupported: 'Sorry, this format is not supported for conversion yet.',
      converted: 'Conversion complete. Review the counts, then download the DreamChat phrase library JSON.',
      downloaded: 'The DreamChat phrase library JSON has been downloaded.',
      cleared: 'The selected file has been cleared.',
      fileSelected: 'Selected: ',
      noFileSelected: 'No file selected'
    }
  };

  function currentLang() {
    if (typeof document === 'undefined') return 'zh-Hant';
    var lang = document.documentElement.getAttribute('lang');
    return MESSAGES[lang] ? lang : 'zh-Hant';
  }

  function message(key) {
    return MESSAGES[currentLang()][key] || MESSAGES['zh-Hant'][key];
  }

  function compactISOString(date) {
    return date.toISOString().replace(/\.\d{3}Z$/, 'Z');
  }

  function normalizedText(value) {
    return typeof value === 'string' ? value.trim() : '';
  }

  function normalizedStrings(values) {
    var result = [];
    for (var i = 0; i < values.length; i += 1) {
      var text = normalizedText(values[i]);
      if (text) result.push(text);
    }
    return result;
  }

  function isObject(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }

  function validateMilkBackup(data) {
    if (!isObject(data)) return false;
    if (!Array.isArray(data.customReplies)) return false;
    if (!Array.isArray(data.customReplyGroups)) return false;

    for (var i = 0; i < data.customReplies.length; i += 1) {
      if (typeof data.customReplies[i] !== 'string') return false;
    }

    for (var j = 0; j < data.customReplyGroups.length; j += 1) {
      var group = data.customReplyGroups[j];
      if (!isObject(group)) return false;
      if (typeof group.name !== 'string') return false;
      if (!Array.isArray(group.items)) return false;
      for (var k = 0; k < group.items.length; k += 1) {
        if (typeof group.items[k] !== 'string') return false;
      }
    }

    return true;
  }

  function fallbackUUID() {
    var template = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
    return template.replace(/[xy]/g, function (char) {
      var random = Math.floor(Math.random() * 16);
      var value = char === 'x' ? random : (random & 0x3) | 0x8;
      return value.toString(16);
    }).toUpperCase();
  }

  function randomUUID() {
    var cryptoObject = root.crypto;
    if (cryptoObject && typeof cryptoObject.randomUUID === 'function') {
      return cryptoObject.randomUUID().toUpperCase();
    }
    return fallbackUUID();
  }

  function includedGroups(data, options) {
    var groups = [];
    for (var i = 0; i < data.customReplyGroups.length; i += 1) {
      var group = data.customReplyGroups[i];
      if (group.disabled === true && !options.includeDisabledGroups) continue;
      var cards = normalizedStrings(group.items);
      if (cards.length === 0) continue;
      groups.push({
        name: normalizedText(group.name) || '自訂字卡組 ' + (groups.length + 1),
        cards: cards,
        disabled: group.disabled === true
      });
    }
    return groups;
  }

  function groupedTextSet(groups) {
    var seen = Object.create(null);
    for (var i = 0; i < groups.length; i += 1) {
      for (var j = 0; j < groups[i].cards.length; j += 1) {
        seen[groups[i].cards[j]] = true;
      }
    }
    return seen;
  }

  function defaultReplies(data, groups, options) {
    var replies = normalizedStrings(data.customReplies);
    if (!options.excludeGroupedFromDefault) return replies;

    var grouped = groupedTextSet(groups);
    var result = [];
    for (var i = 0; i < replies.length; i += 1) {
      if (!grouped[replies[i]]) result.push(replies[i]);
    }
    return result;
  }

  function skippedDisabledGroupCount(data, options) {
    if (options.includeDisabledGroups) return 0;
    var count = 0;
    for (var i = 0; i < data.customReplyGroups.length; i += 1) {
      if (data.customReplyGroups[i].disabled === true) count += 1;
    }
    return count;
  }

  function convertMilkBackup(data, options) {
    if (!validateMilkBackup(data)) {
      throw new Error('unsupported-format');
    }

    var settings = {
      excludeGroupedFromDefault: options && options.excludeGroupedFromDefault !== false,
      includeDisabledGroups: options && options.includeDisabledGroups === true
    };
    var now = compactISOString(new Date());
    var groups = includedGroups(data, settings);
    var defaults = defaultReplies(data, groups, settings);
    var outputGroups = [
      {
        id: DEFAULT_CATEGORY_ID,
        isDefault: true,
        name: '通用',
        usageDescription: '',
        triggerTags: [],
        contextTagIDs: [],
        sortOrder: -1,
        cards: defaults
      }
    ];

    for (var i = 0; i < groups.length; i += 1) {
      outputGroups.push({
        isDefault: false,
        name: groups[i].name,
        usageDescription: '',
        triggerTags: [],
        contextTagIDs: [],
        sortOrder: i,
        cards: groups[i].cards
      });
    }

    return {
      payload: {
        formatVersion: 1,
        exportedAt: now,
        profileSetID: randomUUID(),
        profileSetName: '格式轉換字卡庫',
        contextTags: null,
        groups: outputGroups
      },
      summary: {
        defaultCount: defaults.length,
        customGroupCount: groups.length,
        customCardCount: groups.reduce(function (sum, group) { return sum + group.cards.length; }, 0),
        outputTotal: defaults.length + groups.reduce(function (sum, group) { return sum + group.cards.length; }, 0),
        removedFromDefaultCount: normalizedStrings(data.customReplies).length - defaults.length,
        skippedDisabledGroups: skippedDisabledGroupCount(data, settings)
      }
    };
  }

  function setStatus(form, type, text) {
    var status = form.querySelector('[data-converter-status]');
    if (!status) return;
    status.textContent = text;
    status.className = 'converter-status ' + type;
  }

  function updateSummary(form, summary) {
    var panel = form.querySelector('[data-summary-panel]');
    if (!panel) return;
    panel.hidden = false;
    var values = {
      default: summary.defaultCount,
      groups: summary.customGroupCount,
      customCards: summary.customCardCount,
      total: summary.outputTotal,
      moved: summary.removedFromDefaultCount,
      skipped: summary.skippedDisabledGroups
    };

    Object.keys(values).forEach(function (key) {
      var node = panel.querySelector('[data-summary="' + key + '"]');
      if (node) node.textContent = String(values[key]);
    });
  }

  function clearSummary(form) {
    var panel = form.querySelector('[data-summary-panel]');
    if (panel) panel.hidden = true;
  }

  function setDownloadReady(form, ready) {
    var button = form.querySelector('[data-download-button]');
    var panel = form.querySelector('[data-download-panel]');
    if (button) button.disabled = !ready;
    if (panel) panel.hidden = !ready;
  }

  function updateFileName(form) {
    var input = form.querySelector('[data-file-input]');
    var label = form.querySelector('[data-file-name]');
    if (!input || !label) return;
    var file = input.files && input.files[0];
    label.textContent = file ? message('fileSelected') + file.name : message('noFileSelected');
  }

  function downloadPayload(payload) {
    var datePart = new Date().toISOString().slice(0, 10);
    var blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'DreamChatCardLibrary_converted_' + datePart + '.json';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  function handleUnsupported(form) {
    clearSummary(form);
    setDownloadReady(form, false);
    setStatus(form, 'error', message('unsupported'));
  }

  function handleSubmit(form, event, onConverted) {
    event.preventDefault();
    onConverted(null);
    var input = form.querySelector('[data-file-input]');
    if (!input || !input.files || !input.files[0]) {
      clearSummary(form);
      setDownloadReady(form, false);
      setStatus(form, 'error', message('noFile'));
      return;
    }

    var reader = new FileReader();
    reader.onload = function () {
      try {
        var data = JSON.parse(String(reader.result || ''));
        var result = convertMilkBackup(data, {
          excludeGroupedFromDefault: form.querySelector('[data-option="exclude-grouped"]').checked,
          includeDisabledGroups: form.querySelector('[data-option="include-disabled"]').checked
        });
        updateSummary(form, result.summary);
        setDownloadReady(form, true);
        setStatus(form, 'success', message('converted'));
        onConverted(result.payload);
      } catch (error) {
        onConverted(null);
        handleUnsupported(form);
      }
    };
    reader.onerror = function () {
      onConverted(null);
      handleUnsupported(form);
    };
    reader.readAsText(input.files[0]);
  }

  function initializeForm(form) {
    var input = form.querySelector('[data-file-input]');
    var clearButton = form.querySelector('[data-clear-button]');
    var downloadButton = form.querySelector('[data-download-button]');
    var optionInputs = form.querySelectorAll('[data-option]');
    var convertedPayload = null;
    updateFileName(form);
    setDownloadReady(form, false);

    if (input) {
      input.addEventListener('change', function () {
        convertedPayload = null;
        updateFileName(form);
        clearSummary(form);
        setDownloadReady(form, false);
        setStatus(form, 'idle', '');
      });
    }

    for (var i = 0; i < optionInputs.length; i += 1) {
      optionInputs[i].addEventListener('change', function () {
        convertedPayload = null;
        clearSummary(form);
        setDownloadReady(form, false);
        setStatus(form, 'idle', '');
      });
    }

    if (clearButton) {
      clearButton.addEventListener('click', function () {
        convertedPayload = null;
        if (input) input.value = '';
        updateFileName(form);
        clearSummary(form);
        setDownloadReady(form, false);
        setStatus(form, 'idle', message('cleared'));
      });
    }

    if (downloadButton) {
      downloadButton.addEventListener('click', function () {
        if (!convertedPayload) return;
        downloadPayload(convertedPayload);
        setStatus(form, 'success', message('downloaded'));
      });
    }

    form.addEventListener('submit', function (event) {
      handleSubmit(form, event, function (payload) {
        convertedPayload = payload;
      });
    });
  }

  root.DreamChatMilkConverter = {
    validateMilkBackup: validateMilkBackup,
    convertMilkBackup: convertMilkBackup
  };

  if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function () {
      var forms = document.querySelectorAll('[data-milk-converter]');
      for (var i = 0; i < forms.length; i += 1) {
        initializeForm(forms[i]);
      }
    });
  }
})(typeof window !== 'undefined' ? window : globalThis);
