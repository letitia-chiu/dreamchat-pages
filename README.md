# DreamChat Pages

DreamChat 的 App Store 支援與隱私權政策靜態網站。

本網站為純靜態頁面，沒有後端、沒有框架、沒有 build step，可直接部署到 GitHub Pages。

---

## 檔案結構

```
dreamchat-pages/
├── index.html      # 首頁（簡介 + 連往 Privacy / Support）
├── privacy.html    # 隱私權政策（四語系）
├── support.html    # 支援頁（四語系）
├── styles.css      # 全站樣式
├── lang.js         # 語言切換邏輯
└── README.md
```

## 支援語言

- 繁體中文 (`zh-Hant`) — 預設語言
- 簡體中文 (`zh-Hans`)
- 日本語 (`ja`)
- English (`en`)

四種語言的內容已全部翻譯完成，皆寫在同一個 HTML 檔內，透過 `data-lang` 屬性切換顯示。語言切換在純前端完成，不會重新載入頁面。

## 語言切換方式

- 每個頁面右上方都有四個語言按鈕（繁體中文 / 简体中文 / 日本語 / English）。
- 點擊按鈕即可切換顯示語言。
- 程式會嘗試依使用者瀏覽器語言自動選擇初始語言，找不到對應時退回繁體中文。

## 關於 localStorage

本網站僅使用 `localStorage` 來記住使用者選擇的語言（key：`dreamchat-lang`）。

- 此用途**僅限於記住語言偏好**。
- 不用於追蹤、分析、廣告或任何識別使用者的目的。
- 不使用 cookie。
- 不使用 Google Analytics 或任何分析服務。
- 不使用外部字體、外部 CDN 或第三方 JavaScript。

## 本機預覽

直接在瀏覽器打開 `index.html` 即可預覽。

或者用 Python 起一個簡易伺服器：

```bash
python3 -m http.server 8000
```

然後開啟 `http://localhost:8000/` 。

## 部署到 GitHub Pages

1. 在 GitHub 建立一個新的 repository（例如 `dreamchat-pages`）。
2. 把本資料夾內所有檔案上傳到 repo 的根目錄。
3. 進到 repo 的 **Settings → Pages**。
4. **Source** 選 `Deploy from a branch`。
5. **Branch** 選 `main`，資料夾選 `/ (root)`，按 **Save**。
6. 稍等幾分鐘後，畫面上方會出現您的 GitHub Pages URL，例如：
   `https://<your-username>.github.io/<your-repo>/`

## App Store Connect 填寫

部署完成後，可在 App Store Connect 填入：

- **Privacy Policy URL**：
  `https://<your-username>.github.io/<your-repo>/privacy.html`
- **Support URL**：
  `https://<your-username>.github.io/<your-repo>/support.html`

## 待替換項目

部署到正式 URL 之前，請對所有 HTML 檔做以下 find/replace：

- ~~`support@example.com` → 您的正式客服信箱~~（已替換為 `dreamchat.app.support@gmail.com`）
- `https://your-username.github.io/your-repo` → 您部署後的 GitHub Pages 完整 URL（不含結尾斜線）

第二項影響的是 `<head>` 內的 hreflang、Open Graph、Twitter card 等 SEO 標籤——這些必須是絕對 URL 才會被搜尋引擎與社群平台正確識別。

## SEO 設定說明

頁面 `<head>` 已包含以下 SEO/社群預覽設定：

- **hreflang**：告訴搜尋引擎四種語言版本的對應 URL（透過 `?lang=` query parameter 切換）
- **Open Graph** 與 **Twitter card**：分享連結到社群平台時會顯示 DreamChat banner 預覽圖
- **`?lang=` query parameter**：lang.js 會優先讀取 URL 的 `?lang=` 參數，因此搜尋引擎可以為四種語言分別建立索引。使用者切換語言時，URL 會自動更新但不重新載入頁面。

## 設計備註

- 主色：淡紫、霧白、柔和灰紫。
- 字型使用系統字（不載入外部字體）。
- 響應式設計，支援桌面與手機瀏覽器。
- 沒有重的動畫或會影響閱讀的特效。
