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

## GitHub (Private)

```bash
git init
git add .
git commit -m "Initial setup: VitePress translation project"
gh repo create react-application-architecture --private --source=. --push
```

## منبع کتاب

مسیر EPUB روی سیستم شما:

```
/Users/mohammad/Documents/react-application-architecture-production-2nd/
```

این فایل‌ها در git commit **نمی‌شوند** — فقط خروجی `source/` استخراج شده است.
