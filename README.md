# 1clickbiz demos

Self-rebranding local-service website template. One static page (`index.html`) that rebrands itself from URL parameters — no rebuilds, no code edits per prospect.

## Live

https://demo.1clickbiz.app

## Usage

Base URL shows the fictional default (HydroMax Pressure Washing). Add query params to make it the prospect's business:

```
?biz=Shine+Bright+Pressure+Washing&short=Shine+Bright&city=Tacoma&phone=(253)+555-0142&email=mike@shinebrightpw.com
```

| Param   | Effect |
|---------|--------|
| `biz`   | Full business name (footer, page title) |
| `short` | Logo / nav short name |
| `city`  | City references across the page |
| `phone` | Displayed number + `tel:` links (tap-to-call) |
| `email` | Footer email + `mailto:` |

The quote form opens the visitor's SMS app pre-filled to the business number — no backend required.

## Stack

Plain HTML/CSS/JS, zero dependencies, GitHub Pages friendly. Before/after images live in `assets/`.
