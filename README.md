# معماری React برای Production — ترجمه فارسی

ترجمهٔ فارسی کتاب **React Application Architecture for Production, 2nd Edition** (Packt Publishing).

## ساختار پروژه

```
docs/              ← ترجمهٔ فارسی (ویت‌پرس)
docs/chapters/     ← فایل‌های فصل‌ها
docs/public/images/ ← تصاویر کتاب
```

## شروع سریع

```bash
npm install
npm run docs:dev      # http://localhost:5173
npm run docs:build    # build برای deploy
```

## مشاهدهٔ سایت

**https://react-application-architecture.ir**

### Deploy با GitHub Pages

این پروژه **VitePress** است، نه Jekyll. در تنظیمات GitHub:

1. **Settings → Pages → Build and deployment → Source** را روی **GitHub Actions** بگذارید (نه Deploy from a branch)
2. با push به `main`، workflow `Deploy to GitHub Pages` اجرا می‌شود
3. خروجی build: `docs/.vitepress/dist`


## مشارکت

برای مشارکت در بهبود ترجمه:

1. Fork کنید
2. Branch جدید بسازید
3. تغییرات را commit کنید
4. Pull Request ارسال کنید

### قراردادهای ترجمه

- کدها و اصطلاحات فنی انگلیسی باقی بمانند
- اصطلاحات رایج فنی ترجمه نشوند (مثلاً React، TypeScript، component)
- تصاویر در `docs/public/images/` ذخیره شوند
- لینک تصاویر: `![توضیح](/images/B31385_1_1.png)`

## منبع کتاب

کتاب **React Application Architecture for Production, 2nd Edition**  
نویسنده: Carlton Gibson، Jack Herrington، Emilio Aguilar  
