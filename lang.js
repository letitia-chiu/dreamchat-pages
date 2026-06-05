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
        'zh-Hant': '快速了解聊天、角色、字卡庫、情境標籤、定時來訊、權限與備份。',
        'zh-Hans': '快速了解聊天、角色、字卡库、情境标签、定时来信、权限与备份。',
        ja: 'チャット、キャラクター、定型文集、コンテキストタグ、予約受信、権限、バックアップをひと通り確認できます。',
        en: 'Quickly learn chat, characters, phrase libraries, context tags, scheduled messages, permissions, and backup.'
      },
      text: {
        'zh-Hant': '快速開始 聊天 角色 字卡庫 情境標籤 定時來訊 貼圖 設定 權限 備份 智慧輔助 匿名截圖 追加 取代',
        'zh-Hans': '快速开始 聊天 角色 字卡库 情境标签 定时来信 表情包 设置 权限 备份 智能辅助 匿名截图 追加 替换',
        ja: 'はじめに チャット キャラクター 定型文集 コンテキストタグ 予約受信 スタンプ 設定 権限 バックアップ スマートアシスト 匿名スクリーンショット 追加 置き換え',
        en: 'start chat characters chat phrases context tags scheduled messages stickers settings permissions backup smart assist anonymous screenshots append replace'
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
        'zh-Hant': '詳細說明 功能文章 版本更新 即將推出 語音訊息 語音包 擴充包 視訊通話 天氣提醒 分享檔 備份檔 聊天室導覽 智慧輔助 字卡庫格式轉換 情境標籤',
        'zh-Hans': '详细说明 功能文章 版本更新 即将推出 语音消息 语音包 扩展包 视频通话 天气提醒 分享文件 备份文件 聊天室导览 智能辅助 字卡库格式转换 情境标签',
        ja: '詳しい説明 記事 アップデート 近日公開 ボイスメッセージ 音声パッケージ 追加パック ビデオ通話 天気リマインダー 共有ファイル バックアップ チャット画面ガイド スマートアシスト 定型文集フォーマット変換 コンテキストタグ',
        en: 'detailed help articles version update coming soon voice messages voice packages expansion packs video calls weather reminders share files backup files chatroom guide smart assist phrase library converter context tags'
      }
    },
    {
      url: 'articles/v3-1-0-update.html',
      title: {
        'zh-Hant': '3.1.0 版本更新內容',
        'zh-Hans': '3.1.0 版本更新内容',
        ja: '3.1.0 アップデート内容',
        en: "What's New in 3.1.0"
      },
      description: {
        'zh-Hant': '角色語音訊息、獨立語音包、語音容量摘要、語音擴充包，以及音樂、語音與視訊通話狀態修復。',
        'zh-Hans': '角色语音消息、独立语音包、语音容量摘要、语音扩展包，以及音乐、语音与视频通话状态修复。',
        ja: 'キャラクターのボイスメッセージ、独立した音声パッケージ、容量概要、追加パック、音楽・ボイス・ビデオ通話状態の修正。',
        en: 'Character Voice Messages, standalone voice packages, capacity summaries, expansion packs, and fixes for music, voice, and Video Call states.'
      },
      text: {
        'zh-Hant': '3.1.0 版本更新 即將推出 語音訊息 角色語音 短音檔 顯示文字 字卡組 語音包 dreamchatvoices 語音容量 擴充包 備份 角色分享 音樂播放 視訊通話 修復',
        'zh-Hans': '3.1.0 版本更新 即将推出 语音消息 角色语音 短音频 显示文字 字卡组 语音包 dreamchatvoices 语音容量 扩展包 备份 角色分享 音乐播放 视频通话 修复',
        ja: '3.1.0 アップデート 近日公開 ボイスメッセージ キャラクター音声 短い音声 表示テキスト 定型文セット 音声パッケージ dreamchatvoices 容量 追加パック バックアップ キャラクター共有 音楽再生 ビデオ通話 修正',
        en: '3.1.0 update coming soon character voice messages short audio display text phrase sets voice packages dreamchatvoices voice capacity expansion packs backup character sharing music playback video call fixes'
      }
    },
    {
      url: 'articles/voice-messages-guide.html',
      title: {
        'zh-Hant': '語音訊息詳細說明',
        'zh-Hans': '语音消息详细说明',
        ja: 'ボイスメッセージ詳しい説明',
        en: 'Voice Messages Guide'
      },
      description: {
        'zh-Hant': '設定角色語音訊息、了解方案限制、語音擴充包、容量計算、語音包、備份與角色分享差異。',
        'zh-Hans': '设置角色语音消息、了解方案限制、语音扩展包、容量计算、语音包、备份与角色分享差异。',
        ja: 'ボイスメッセージの設定、プラン制限、追加パック、容量計算、音声パッケージ、バックアップと共有の違い。',
        en: 'Set up voice messages and understand plan limits, expansion packs, capacity calculation, packages, backups, and character sharing.'
      },
      text: {
        'zh-Hant': '語音訊息 功能說明 即將推出 角色設定 短音檔 顯示文字 字卡組 方案限制 免費版 單夢輕量版 多夢輕量版 夢行者 擴充包 +10 +20 +30 120 容量計算 封存 dreamchatvoices 備份 角色分享',
        'zh-Hans': '语音消息 功能说明 即将推出 角色设置 短音频 显示文字 字卡组 方案限制 免费版 单梦轻量版 多梦轻量版 梦行者 扩展包 +10 +20 +30 120 容量计算 封存 dreamchatvoices 备份 角色分享',
        ja: 'ボイスメッセージ 機能説明 近日公開 キャラクター設定 短い音声 表示テキスト 定型文セット プラン制限 無料版 一途 Lite グループ Lite ドリームウォーカー 追加パック +10 +20 +30 120 容量計算 アーカイブ dreamchatvoices バックアップ キャラクター共有',
        en: 'voice messages feature guide coming soon character settings short audio display text phrase sets plan limits free Single Dream Lite Multi Dream Lite Dream Walker expansion packs +10 +20 +30 120 capacity calculation archived dreamchatvoices backup character sharing'
      }
    },
    {
      url: 'articles/v3-0-0-update.html',
      title: {
        'zh-Hant': '3.0.0 版本更新內容',
        'zh-Hans': '3.0.0 版本更新内容',
        ja: '3.0.0 アップデート内容',
        en: "What's New in 3.0.0"
      },
      description: {
        'zh-Hant': '模擬視訊通話、天氣提醒、情境包含 / 排除標籤、分享檔與備份檔格式更新、長範圍截圖穩定性。',
        'zh-Hans': '模拟视频通话、天气提醒、情境包含 / 排除标签、分享文件与备份文件格式更新、长范围截图稳定性。',
        ja: '模擬ビデオ通話、天気リマインダー、コンテキストタグの含める / 除外、共有ファイルとバックアップ形式の更新、長い範囲のスクリーンショット安定化。',
        en: 'Simulated video calls, weather reminders, Include/Exclude context tags, updated share and backup file formats, and steadier long-range screenshots.'
      },
      text: {
        'zh-Hant': '3.0.0 版本更新 新推出 Build 37 視訊通話 讓他來電 本機通知 天氣提醒 WeatherKit 目前位置 聊天情境 包含情境 排除情境 情境標籤 字卡組 貼圖群組 分享檔 備份檔 格式更新 匯出 匯入 dreamchatstickers dreamchatcharacter dreamchatbackup 長範圍截圖 匿名截圖 通話背景 短影片',
        'zh-Hans': '3.0.0 版本更新 新推出 Build 37 视频通话 让他来电 本地通知 天气提醒 WeatherKit 当前位置 聊天情境 包含情境 排除情境 情境标签 字卡组 表情包群组 分享文件 备份文件 格式更新 导出 导入 dreamchatstickers dreamchatcharacter dreamchatbackup 长范围截图 匿名截图 通话背景 短视频',
        ja: '3.0.0 アップデート 新着 Build 37 ビデオ通話 あとでかけて ローカル通知 天気リマインダー WeatherKit 現在地 チャット コンテキスト 含める 除外 タグ 定型文セット スタンプグループ 共有ファイル バックアップ 形式更新 書き出し 読み込み dreamchatstickers dreamchatcharacter dreamchatbackup 長い範囲 スクリーンショット 匿名 通話背景 動画',
        en: '3.0.0 update new Build 37 video calls ask them to call local notifications weather reminders WeatherKit current location chat context include exclude tags phrase groups sticker groups share files backup files format update export import dreamchatstickers dreamchatcharacter dreamchatbackup long-range screenshots anonymous call backgrounds short videos'
      }
    },
    {
      url: 'articles/weather-reminder-guide.html',
      title: {
        'zh-Hant': '天氣提醒詳細說明',
        'zh-Hans': '天气提醒详细说明',
        ja: '天気リマインダー詳しい説明',
        en: 'Weather Reminder Guide'
      },
      description: {
        'zh-Hant': '設定每日天氣提醒、地區、聊天中詢問天氣與提醒字卡。',
        'zh-Hans': '设置每日天气提醒、地区、聊天中询问天气与提醒字卡。',
        ja: '毎日の天気リマインダー、地域、チャット内質問、定型文を設定します。',
        en: 'Set up daily weather reminders, regions, in-chat weather questions, and phrases.'
      },
      text: {
        'zh-Hant': '天氣提醒 功能說明 新功能 WeatherKit 手動地區 目前位置 定位權限 聊天中詢問 氣溫 天氣 提醒字卡 備用內容 預設提醒',
        'zh-Hans': '天气提醒 功能说明 新功能 WeatherKit 手动地区 当前位置 定位权限 聊天中询问 气温 天气 提醒字卡 备用内容 默认提醒',
        ja: '天気リマインダー 機能説明 新機能 WeatherKit 手動地域 現在地 位置情報 チャット内質問 気温 天気 定型文 予備内容 既定リマインダー',
        en: 'weather reminder feature guide new feature WeatherKit manual region current location permission ask in chat temperature weather phrases backup content default reminder'
      }
    },
    {
      url: 'articles/weather-reminder-phrase-tips.html',
      title: {
        'zh-Hant': '天氣提醒專用字卡設定技巧',
        'zh-Hans': '天气提醒专用字卡设置技巧',
        ja: '天気リマインダー専用定型文のコツ',
        en: 'Weather Reminder Phrase Tips'
      },
      description: {
        'zh-Hant': '了解氣溫狀況與天氣狀況如何組句，讓提醒文字更自然。',
        'zh-Hans': '了解气温状况与天气状况如何组句，让提醒文字更自然。',
        ja: '気温の状態と天気の状態を自然に組み合わせるコツ。',
        en: 'Write temperature and weather condition phrases that combine naturally.'
      },
      text: {
        'zh-Hant': '設定技巧 新功能 天氣提醒 字卡 氣溫狀況 天氣狀況 組句 炎熱 微涼 下雨 風大 溫差大',
        'zh-Hans': '设置技巧 新功能 天气提醒 字卡 气温状况 天气状况 组句 炎热 微凉 下雨 风大 温差大',
        ja: '設定のコツ 新機能 天気リマインダー 定型文 気温 天気 組み合わせ 暑い 涼しい 雨 風 寒暖差',
        en: 'setup tips new feature weather reminder phrases temperature conditions weather conditions composition hot cool rain windy temperature swing'
      }
    },
    {
      url: 'articles/video-call-guide.html',
      title: {
        'zh-Hant': '視訊通話詳細說明',
        'zh-Hans': '视频通话详细说明',
        ja: 'ビデオ通話詳しい説明',
        en: 'Video Call Guide'
      },
      description: {
        'zh-Hant': '設定視訊通話、主動來電、重撥、通話事件與 App 外通知限制。',
        'zh-Hans': '设置视频通话、主动来电、重拨、通话事件与 App 外通知限制。',
        ja: 'ビデオ通話、自発着信、再着信、通話イベント、アプリ外通知の制限。',
        en: 'Set up Video Calls, incoming calls, redials, call events, and outside-app notification limits.'
      },
      text: {
        'zh-Hant': '視訊通話 功能說明 新功能 模擬通話 讓他來電 主動來電 重撥 本機通知 CallKit VoIP 相機 麥克風 通話背景 短影片',
        'zh-Hans': '视频通话 功能说明 新功能 模拟通话 让他来电 主动来电 重拨 本地通知 CallKit VoIP 摄像头 麦克风 通话背景 短视频',
        ja: 'ビデオ通話 機能説明 新機能 模擬通話 あとでかけて 自発着信 再着信 ローカル通知 CallKit VoIP カメラ マイク 通話背景 動画',
        en: 'video call feature guide new feature simulated call ask them to call incoming redial local notification CallKit VoIP camera microphone call background short video'
      }
    },
    {
      url: 'articles/v2-9-0-update.html',
      title: {
        'zh-Hant': '2.9.0 版本更新內容',
        'zh-Hans': '2.9.0 版本更新内容',
        ja: '2.9.0 アップデート内容',
        en: "What's New in 2.9.0"
      },
      description: {
        'zh-Hant': '匿名截圖、字卡庫追加／取代、系統權限頁、iOS 18 穩定性與夢行者試用提示。',
        'zh-Hans': '匿名截图、字卡库追加／替换、系统权限页、iOS 18 稳定性与梦行者试用提示。',
        ja: '匿名スクリーンショット、定型文集の追加／置き換え、システム権限、iOS 18 安定性、無料体験案内。',
        en: 'Anonymous screenshots, append/replace phrase imports, system permissions, iOS 18 stability, and trial prompts.'
      },
      text: {
        'zh-Hant': '2.9.0 版本更新 匿名截圖 原始 匿名 字卡庫 追加 取代 系統權限 通知 選取圖片 儲存截圖 Music 資料庫 iOS 18 夢行者 免費試用',
        'zh-Hans': '2.9.0 版本更新 匿名截图 原始 匿名 字卡库 追加 替换 系统权限 通知 图片选择 截图保存 Music 资料库 iOS 18 梦行者 免费试用',
        ja: '2.9.0 アップデート 匿名スクリーンショット オリジナル 匿名 定型文集 追加 置き換え システム権限 通知 画像選択 スクリーンショット保存 Music ライブラリ iOS 18 ドリームウォーカー 無料体験',
        en: '2.9.0 update anonymous screenshots original anonymous phrase library append replace system permissions notifications photo selection screenshot saving Music library iOS 18 Dream Walker free trial'
      }
    },
    {
      url: 'articles/chatroom-screen-guide.html',
      title: {
        'zh-Hant': '聊天室畫面導覽',
        'zh-Hans': '聊天室画面导览',
        ja: 'チャット画面ガイド',
        en: 'Chatroom Screen Guide'
      },
      description: {
        'zh-Hant': '認識聊天室工具列、搜尋、右上角選單、長按訊息操作、截圖、輸入列與播放器。',
        'zh-Hans': '认识聊天室工具栏、搜索、右上角菜单、长按消息操作、截图、输入栏与播放器。',
        ja: 'ツールバー、検索、右上メニュー、長押し操作、スクリーンショット、入力欄、音楽プレイヤーを確認できます。',
        en: 'Learn the toolbar, search, top-right menu, long-press actions, screenshots, input bar, and music player.'
      },
      text: {
        'zh-Hant': '聊天室 畫面 導覽 工具列 搜尋 右上角選單 聊天模式 是否模式 幫我選 角色設定 群組設定 目前情境 暫停定時來訊 回覆 複製 截圖 刪除 匿名 貼圖 表情 音樂播放器',
        'zh-Hans': '聊天室 画面 导览 工具栏 搜索 右上角菜单 聊天模式 是否模式 帮我选 角色设置 群组设置 当前情境 暂停定时来信 回复 复制 截图 删除 匿名 表情包 表情 音乐播放器',
        ja: 'チャット画面 ガイド ツールバー 検索 右上メニュー チャットモード はい いいえ 選んで キャラクター設定 グループ設定 現在のコンテキスト 予約受信 返信 コピー スクリーンショット 削除 匿名 スタンプ 絵文字 音楽プレイヤー',
        en: 'chatroom screen guide toolbar search top-right menu chat mode yes no choose for me character settings group settings current context pause scheduled messages reply copy screenshot delete anonymous stickers emoji music player'
      }
    },
    {
      url: 'articles/smart-assist-keyword-guide.html',
      title: {
        'zh-Hant': '智慧輔助設定技巧',
        'zh-Hans': '智能辅助设置技巧',
        ja: 'スマートアシスト設定のコツ',
        en: 'Smart Assist Setup Tips'
      },
      description: {
        'zh-Hant': '調整字卡組名稱、適用情境與觸發關鍵字，讓智慧輔助更容易選到合適字卡組。',
        'zh-Hans': '调整字卡组名称、适用情境与触发关键词，让智能辅助更容易选到合适字卡组。',
        ja: 'セット名、使う場面、トリガーキーワードを整えて、スマートアシストが合う定型文セットを選びやすくします。',
        en: 'Tune set names, usage context, and trigger keywords so Smart Assist can choose better phrase sets.'
      },
      text: {
        'zh-Hant': '智慧輔助 自然 精準 多變 關閉 觸發關鍵字 適用情境 字卡組 Apple 語言處理 Foundation Models',
        'zh-Hans': '智能辅助 自然 精准 多变 关闭 触发关键词 适用情境 字卡组 Apple 语言处理 Foundation Models',
        ja: 'スマートアシスト 自然 精密 多彩 オフ トリガーキーワード 使う場面 定型文セット Apple 言語処理 Foundation Models',
        en: 'smart assist natural precise varied off trigger keywords usage context phrase set Apple language processing Foundation Models'
      }
    },
    {
      url: 'articles/context-tags.html',
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
      url: 'articles/chat-modes.html',
      title: {
        'zh-Hant': '聊天模式詳細說明',
        'zh-Hans': '聊天模式详细说明',
        ja: 'チャットモードの詳しい説明',
        en: 'Chat Modes Guide'
      },
      description: {
        'zh-Hant': '了解聊天模式、是否模式與「幫我選」適合什麼情境。',
        'zh-Hans': '了解聊天模式、是否模式与「帮我选」适合什么情境。',
        ja: 'チャットモード、はい/いいえモード、「選んで」の使いどころを確認できます。',
        en: 'Understand when to use Chat Mode, Yes/No Mode, and Choose for Me.'
      },
      text: {
        'zh-Hant': '聊天模式 是否模式 幫我選 字卡庫 套用預設範本 三種回覆 隱藏回覆',
        'zh-Hans': '聊天模式 是否模式 帮我选 字卡库 应用预设模板 三种回复 隐藏回复',
        ja: 'チャットモード はい いいえ 選んで 定型文集 サンプルテンプレート 隠し返信',
        en: 'chat mode yes no mode choose for me chat phrases apply default template hidden reply'
      }
    },
    {
      url: 'articles/card-library-converter.html',
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
        'zh-Hant': '了解本機資料、權限、智慧輔助、語音訊息、日常、塔羅、聊天圖片、相簿、診斷與備份如何處理。',
        'zh-Hans': '了解本机数据、权限、智能辅助、语音消息、日常、塔罗、聊天图片、相册、诊断与备份如何处理。',
        ja: '端末内データ、権限、スマートアシスト、音声メッセージ、Daily、タロット、チャット画像、写真、診断、バックアップの扱いを確認できます。',
        en: 'Learn how local data, permissions, Smart Assist, voice messages, Daily, Tarot, chat images, albums, diagnostics, and backups are handled.'
      },
      text: {
        'zh-Hant': '隱私 本機資料 Apple Music 照片 智慧輔助 Apple Intelligence 語音訊息 語音包 日常 塔羅 聊天圖片 相簿 診斷 備份 localStorage',
        'zh-Hans': '隐私 本机数据 Apple Music 照片 智能辅助 Apple Intelligence 语音消息 语音包 日常 塔罗 聊天图片 相册 诊断 备份 localStorage',
        ja: 'プライバシー 端末内データ Apple Music 写真 スマートアシスト Apple Intelligence 音声メッセージ 音声パッケージ Daily タロット チャット画像 写真 診断 バックアップ localStorage',
        en: 'privacy local data Apple Music Photos Smart Assist Apple Intelligence voice messages voice packages Daily Tarot chat images albums diagnostics backup localStorage'
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
        'zh-Hant': '訂閱、語音擴充購買、恢復購買、權限、日常、塔羅、聊天圖片、相簿、匯入匯出、資料刪除與聯絡方式。',
        'zh-Hans': '订阅、语音扩充购买、恢复购买、权限、日常、塔罗、聊天图片、相册、导入导出、数据删除与联系方式。',
        ja: 'サブスクリプション、音声拡張購入、購入復元、権限、Daily、タロット、チャット画像、写真、読み込み・書き出し、データ削除、連絡先。',
        en: 'Subscriptions, voice expansion purchases, restore purchases, permissions, Daily, Tarot, chat images, albums, import/export, data deletion, and contact.'
      },
      text: {
        'zh-Hant': '支援 FAQ 訂閱 語音擴充 恢復購買 權限 智慧輔助 Apple Intelligence 語音訊息 日常 塔羅 聊天圖片 相簿 匯入 匯出 刪除資料 聯絡',
        'zh-Hans': '支持 FAQ 订阅 语音扩充 恢复购买 权限 智能辅助 Apple Intelligence 语音消息 日常 塔罗 聊天图片 相册 导入 导出 删除数据 联系',
        ja: 'サポート FAQ サブスクリプション 音声拡張 購入復元 権限 スマートアシスト Apple Intelligence 音声メッセージ Daily タロット チャット画像 写真 読み込み 書き出し データ削除 連絡',
        en: 'support FAQ subscription voice expansion restore purchases permissions Smart Assist Apple Intelligence voice messages Daily Tarot chat images albums import export delete data contact'
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

  function siteRootUrl() {
    var path = window.location.pathname;
    var articlesIndex = path.indexOf('/articles/');
    var rootPath = articlesIndex === -1
      ? path.slice(0, path.lastIndexOf('/') + 1)
      : path.slice(0, articlesIndex + 1);
    return new URL(rootPath || '/', window.location.origin);
  }

  function urlWithLang(url, lang) {
    try {
      var target = new URL(url, siteRootUrl());
      target.searchParams.set('lang', lang);
      return target.pathname + target.search + target.hash;
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

    function isCompactSearch() {
      return window.matchMedia && window.matchMedia('(max-width: 640px)').matches;
    }

    function expandCompactSearch(searchRoot, input) {
      if (!searchRoot || !input) return;
      if (searchRoot._collapseTimer) {
        window.clearTimeout(searchRoot._collapseTimer);
        searchRoot._collapseTimer = null;
      }
      searchRoot.classList.remove('search-collapsing');
      searchRoot.classList.add('search-expanded');
      var header = searchRoot.closest('.site-header');
      if (header) header.classList.add('search-open');
      input.removeAttribute('tabindex');
      input.focus();
    }

    function collapseCompactSearch(searchRoot) {
      if (!searchRoot || !isCompactSearch()) return;
      var input = searchRoot.querySelector('[data-site-search-input]');
      var header = searchRoot.closest('.site-header');
      closeSiteSearch(searchRoot);
      if (input) {
        input.blur();
        input.setAttribute('tabindex', '-1');
      }
      if (!searchRoot.classList.contains('search-expanded')) {
        if (header) header.classList.remove('search-open');
        return;
      }
      searchRoot.classList.add('search-collapsing');
      if (searchRoot._collapseTimer) {
        window.clearTimeout(searchRoot._collapseTimer);
      }
      searchRoot._collapseTimer = window.setTimeout(function () {
        searchRoot.classList.remove('search-expanded');
        searchRoot.classList.remove('search-collapsing');
        if (header) header.classList.remove('search-open');
        searchRoot._collapseTimer = null;
      }, 180);
    }

    for (var i = 0; i < searchRoots.length; i++) {
      (function (searchRoot) {
        var form = searchRoot.querySelector('[data-site-search-form]');
        var input = searchRoot.querySelector('[data-site-search-input]');
        if (!form || !input) return;

        if (isCompactSearch()) {
          input.setAttribute('tabindex', '-1');
        }

        input.addEventListener('input', function () {
          renderSiteSearchResults(searchRoot);
        });

        input.addEventListener('focus', function () {
          renderSiteSearchResults(searchRoot);
        });

        input.addEventListener('keydown', function (ev) {
          if (ev.key === 'Escape') {
            input.value = '';
            collapseCompactSearch(searchRoot);
          }
        });

        form.addEventListener('submit', function (ev) {
          ev.preventDefault();
          if (isCompactSearch() && !searchRoot.classList.contains('search-expanded')) {
            expandCompactSearch(searchRoot, input);
            return;
          }
          if (isCompactSearch() && searchRoot.classList.contains('search-expanded') && !input.value.trim()) {
            collapseCompactSearch(searchRoot);
            return;
          }
          var matches = matchingSearchItems(input.value);
          if (!matches.length) return;
          window.location.href = urlWithLang(matches[0].url, currentLang);
        });
      })(searchRoots[i]);
    }

    document.addEventListener('click', function (ev) {
      for (var j = 0; j < searchRoots.length; j++) {
        if (!searchRoots[j].contains(ev.target)) {
          collapseCompactSearch(searchRoots[j]);
          closeSiteSearch(searchRoots[j]);
        }
      }
    });

    window.addEventListener('resize', function () {
      for (var j = 0; j < searchRoots.length; j++) {
        var input = searchRoots[j].querySelector('[data-site-search-input]');
        if (!input) continue;
        if (isCompactSearch() && !searchRoots[j].classList.contains('search-expanded')) {
          input.setAttribute('tabindex', '-1');
        } else {
          input.removeAttribute('tabindex');
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
