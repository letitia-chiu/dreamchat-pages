# DreamChat Pages

Public support and privacy pages for DreamChat.

This repository contains the static website used for DreamChat's App Store support URL and privacy policy URL. It is intentionally small: plain HTML, CSS, and JavaScript only, with no build step, backend, analytics, cookies, external fonts, or third-party scripts.

Live site:

- Home: https://letitia-chiu.github.io/dreamchat-pages/
- User Guide: https://letitia-chiu.github.io/dreamchat-pages/guide.html
- Phrase Library Format Converter: https://letitia-chiu.github.io/dreamchat-pages/card-library-converter.html
- Privacy Policy: https://letitia-chiu.github.io/dreamchat-pages/privacy.html
- Support: https://letitia-chiu.github.io/dreamchat-pages/support.html

## Pages

- `index.html` - DreamChat overview and links to support/privacy pages
- `guide.html` - public user guide for first-time users
- `card-library-converter.html` - browser-local converter for supported phrase backups
- `card-library-converter.js` - converter logic for DreamChat phrase library JSON
- `privacy.html` - privacy policy in Traditional Chinese, Simplified Chinese, Japanese, and English
- `support.html` - support and FAQ in the same four languages
- `styles.css` - shared visual styling
- `lang.js` - client-side language switching
- `assets/` - app icon and social preview banner

## Languages

The site supports:

- Traditional Chinese (`zh-Hant`)
- Simplified Chinese (`zh-Hans`)
- Japanese (`ja`)
- English (`en`)

Language variants live in the same HTML file and are switched with `data-lang` attributes. Visitors can choose a language manually, or the site will infer an initial language from the URL, saved preference, or browser language.

## Privacy

This website uses `localStorage` only to remember the visitor's selected language under the key `dreamchat-lang`.

The phrase library converter reads user-selected JSON files locally in the browser and downloads a converted JSON file. It does not upload, store, or transmit the selected file.

It does not use:

- cookies
- analytics
- advertising or tracking pixels
- external CDN scripts
- external web fonts
- user identification

## GitHub Pages

The site is prepared for GitHub Pages from the `main` branch root:

1. Open the repository on GitHub.
2. Go to `Settings` -> `Pages`.
3. Set `Source` to `Deploy from a branch`.
4. Select branch `main` and folder `/ (root)`.
5. Save.

The expected GitHub Pages URL is:

```text
https://letitia-chiu.github.io/dreamchat-pages/
```

Use these URLs in App Store Connect:

```text
Privacy Policy URL:
https://letitia-chiu.github.io/dreamchat-pages/privacy.html

Support URL:
https://letitia-chiu.github.io/dreamchat-pages/support.html
```

## Local Preview

The pages can be opened directly in a browser. For a local server:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

## Maintenance

When DreamChat app terminology changes, keep the public pages aligned with the app's localization glossary. Current core terms include:

- `定時來訊 / 定时来信 / 予約受信 / Scheduled messages`
- `字卡 / 字卡 / 定型文 / Chat Phrases`
- `貼圖 / 表情包 / スタンプ / Stickers`

Before publishing major copy changes, check that `privacy.html`, `support.html`, and `index.html` use the same product terminology.
