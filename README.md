# معماری React برای Production — ترجمه شخصی

ترجمه شخصی کتاب **React Application Architecture for Production, 2nd Edition** (Packt).

> ⚠️ این پروژه فقط برای مطالعه شخصی است. ریپوی **Private** نگه دارید.

## ساختار پروژه

```
docs/              ← ترجمه فارسی (نمایش در سایت)
source/en/         ← متن انگلیسی استخراج‌شده از EPUB
source/images/     ← تصاویر کتاب
scripts/           ← اسکریپت استخراج EPUB
```

## شروع سریع

```bash
npm install
npm run docs:dev      # http://localhost:5173
npm run docs:build    # build برای deploy
```

## ترجمه یک فصل

1. فایل انگلیسی را باز کنید: `source/en/chapter-01.md`
2. ترجمه را در فایل فارسی بنویسید: `docs/chapters/chapter-01.md`
3. کدها و اصطلاحات فنی را انگلیسی نگه دارید
4. برای تصاویر: `![توضیح](/images/B31385_1_1.png)` — تصاویر را به `docs/public/images/` کپی کنید

## استخراج مجدد از EPUB

```bash
npm run extract
# یا با مسیر دلخواه:
./scripts/extract-epub.sh /path/to/book.epub
```

## GitHub Pages و دامنه

دامنه: **react-application-architecture.ir**

### ۱. فعال‌سازی GitHub Pages

1. **Settings → Pages → Build and deployment → Source: GitHub Actions**
2. push به `main` → workflow خودکار deploy می‌کند
3. **Settings → Pages → Custom domain** → `react-application-architecture.ir`
4. **Enforce HTTPS** را فعال کنید

> **GitHub Pages روی Private repo** برای اکانت شخصی نیاز به **GitHub Pro** دارد.

### ۲. تنظیم DNS (پنل دامنه `.ir`)

برای **دامنه ریشه** (`react-application-architecture.ir`):

| نوع | نام | مقدار |
|-----|-----|--------|
| `A` | `@` | `185.199.108.153` |
| `A` | `@` | `185.199.109.153` |
| `A` | `@` | `185.199.110.153` |
| `A` | `@` | `185.199.111.153` |

برای **www** (اختیاری):

| نوع | نام | مقدار |
|-----|-----|--------|
| `CNAME` | `www` | `RaziPour1993.github.io` |

> اگر نام کاربری GitHub شما متفاوت است، مقدار CNAME را با `USERNAME.github.io` جایگزین کنید.

پس از تنظیم DNS، ۱۰ تا ۶۰ دقیقه صبر کنید تا propagate شود.

فایل [`docs/public/CNAME`](docs/public/CNAME) از قبل تنظیم شده است.

## GitHub (Private)

```bash
git push origin main
```

## منبع کتاب

مسیر EPUB روی سیستم شما:

```
/Users/mohammad/Documents/react-application-architecture-production-2nd/
```

این فایل‌ها در git commit **نمی‌شوند** — فقط خروجی `source/` استخراج شده است.
