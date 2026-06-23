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

## Cloudflare Pages و دامنه

دامنه: **react-application-architecture.ir**

GitHub Pages روی ریپوی Private بدون GitHub Pro کار نمی‌کند.  
**Cloudflare Pages** رایگان است، با ریپوی Private سازگار است، و SSL هم رایگان می‌دهد.

### ۱. اضافه کردن دامنه به Cloudflare

1. وارد [dash.cloudflare.com](https://dash.cloudflare.com) شوید
2. **Add a site** → `react-application-architecture.ir`
3. پلن **Free** را انتخاب کنید
4. دو nameserver که Cloudflare می‌دهد را کپی کنید
5. در پنل ثبت‌کنندهٔ دامنه `.ir` (مثلاً ایرنیک/نیک‌ایران) nameserverها را عوض کنید
6. صبر کنید تا وضعیت دامنه در Cloudflare **Active** شود (معمولاً ۱ تا ۲۴ ساعت)

### ۲. ساخت پروژهٔ Pages

1. **Workers & Pages → Create → Pages → Connect to Git**
2. GitHub را authorize کنید و ریپوی `RaziPour1993/react-application-architecture` را انتخاب کنید
3. تنظیمات build:

| فیلد | مقدار |
|------|--------|
| Production branch | `main` |
| Framework preset | `None` |
| Build command | `npm run docs:build` |
| Build output directory | `docs/.vitepress/dist` |

4. **Environment variables** (اختیاری — فایل `.node-version` هم کافی است):

| نام | مقدار |
|-----|--------|
| `NODE_VERSION` | `22` |

5. **Save and Deploy** — اولین build چند دقیقه طول می‌کشد

### ۳. اتصال دامنهٔ سفارشی

1. در پروژهٔ Pages → **Custom domains → Set up a custom domain**
2. `react-application-architecture.ir` را اضافه کنید
3. (اختیاری) `www.react-application-architecture.ir` را هم اضافه کنید
4. Cloudflare DNS را خودکار تنظیم می‌کند — اگر دامنه روی Cloudflare باشد، کاری لازم نیست
5. **SSL/TLS → Overview** → حالت **Full** یا **Full (strict)** باشد

### ۴. بعد از deploy

هر `git push` به `main` → build و deploy خودکار.

سایت: **https://react-application-architecture.ir**

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
