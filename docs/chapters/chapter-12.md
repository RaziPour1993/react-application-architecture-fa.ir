# فصل ۱۲: استقرار در Production {#h1_288 .chapterTitle}

اپلیکیشن ما سرانجام آماده‌ی مواجهه با نخستین کاربرانش است. همهٔ featureها را ساخته‌ایم، linting را تنظیم کرده‌ایم، تست‌های unit و integration نوشته‌ایم، و تست‌های end-to-end اضافه کرده‌ایم. همهٔ این‌ها اطمینان می‌دهد که کد درست کار می‌کند. اما در حال حاضر، هر یک از این بررسی‌ها باید به‌صورت دستی روی ماشین محلی اجرا شود. هر بار که می‌خواهیم تغییری در اپلیکیشن ایجاد کنیم، باید همهٔ اسکریپت‌ها را خودمان اجرا کنیم و سپس deployment را به‌صورت دستی آغاز کنیم. این کند، مستعد خطا و صادقانه بسیار خسته‌کننده است.

آنچه واقعاً می‌خواهیم این است که همهٔ این‌ها به‌صورت خودکار اتفاق بیفتد. هر بار که تغییرات کد را push می‌کنیم، یک pipeline باید بررسی‌ها را اجرا کند و اگر همه چیز ردیف بود، نسخهٔ جدید را بدون مراحل دستی deploy کند. دقیقاً همان چیزی است که CI/CD به ما می‌دهد.

موارد زیر را پوشش خواهیم داد:

- CI/CD چیست
- استفاده از GitHub Actions
- تنظیم pipeline برای continuous integration
- تنظیم pipeline برای continuous deployment

در پایان این فصل، یک CI/CD pipeline کاملاً خودکار خواهیم داشت که بررسی‌هایمان را در هر push اجرا می‌کند و اپلیکیشن را هر بار که همهٔ بررسی‌ها ردیف باشند به Render deploy می‌کند.

## پیش‌نیازهای فنی {#h1_289 .heading-1}

قبل از شروع، باید پروژه را تنظیم کنیم. برای توسعهٔ پروژه، موارد زیر باید روی کامپیوترمان نصب باشد:

- Node.js نسخهٔ ۲۴ یا بالاتر. npm نسخهٔ ۱۱ یا بالاتر همراه Node ارائه می‌شود. می‌توانیم با اجرای `node -v` و `npm -v` در ترمینال این را تأیید کنیم. راه‌های مختلفی برای نصب Node.js و npm وجود دارد. اینجا مقالهٔ خوبی است که جزئیات بیشتری توضیح می‌دهد: [https://www.nodejsdesignpatterns.com/blog/5-ways-to-install-node-js](https://www.nodejsdesignpatterns.com/blog/5-ways-to-install-node-js).
- VS Code (اختیاری) یک ادیتور محبوب برای JavaScript و TypeScript است: متن‌باز، پشتیبانی قوی از TypeScript، و extensionهای متعدد. از [https://code.visualstudio.com](https://code.visualstudio.com) قابل دانلود است.

کد این کتاب در مخزن کتاب موجود است. برای دسترسی به لینک مخزن، مراحل بخش «دانلود فایل‌های مثال» در پیش‌گفتار را دنبال کنید. آن را clone کنید و وارد ریشهٔ مخزن شوید:

```bash
git clone https://github.com/PacktPublishing/React-Application-Architecture-for-Production-Second-Edition.git
```

مخزن شامل پوشه‌های فصل‌ها با کد هر فصل و یک پوشهٔ مشترک `api` با سرور API مورد استفاده در همهٔ فصل‌ها است.

ما در فصل ۱۲ هستیم، پس باید به پوشهٔ `chapter-12` برویم:

```bash
cd React-Application-Architecture-for-Production-Second-Edition/chapter-12
```

سپس باید dependencyها را نصب کنیم:

```bash
npm install
```

همچنین باید متغیرهای محیطی را فراهم کنیم:

```bash
cp .env.example .env
```

حالا باید فرانت‌اند آماده و در [http://localhost:5173](http://localhost:5173) در حال اجرا باشد.

همچنین باید سرور API ما در حال اجرا باشد.

بیایید پنجرهٔ ترمینال جدیدی باز کنیم و به پوشهٔ `api` برویم:

```bash
cd React-Application-Architecture-for-Production-Second-Edition/api
```

حالا باید اسکریپت setup را برای فصل ۱۲ اجرا کنیم تا همه چیز را برایمان تنظیم کند:

```bash
npm run setup 12
```

سپس باید سرور API را اجرا کنیم:

```bash
npm run dev
```

باید سرور API را روی [http://localhost:9999](http://localhost:9999) ببینیم. برای اطلاعات بیشتر دربارهٔ جزئیات setup، فایل `README.md` را بررسی کنید.

## CI/CD چیست؟ {#h1_290 .heading-1}

**Continuous integration/continuous deployment (CI/CD)** شیوهٔ تحویل تغییرات اپلیکیشن به کاربران به‌صورت خودکار و قابل اعتماد است. به‌جای اجرای دستی بررسی‌ها و کلیک روی deploy، pipeline این کار را هر بار برایمان انجام می‌دهد.

هر یک از این دو بخش هدف متفاوتی دارد:

- Continuous Integration (CI) فرآیند خودکار تأیید صحت تغییرات کد قبل از merge شدن است. یعنی اجرای build، تست و هر بررسی کیفیت دیگری که برایمان مهم است.
- Continuous Deployment (CD) فرآیند خودکار push کردن تغییرات تأیید شده به سرور production است تا کاربران آخرین نسخه را دریافت کنند بدون اینکه کسی مجبور باشد release را به‌صورت دستی آغاز کند.

برای اپلیکیشن ما، فرآیند به این شکل خواهد بود:

1. اجرای همهٔ بررسی‌های کیفیت کد مثل linting، type checking و format checking
2. اجرای تست‌های unit
3. اجرای تست‌های integration
4. اجرای تست‌های end-to-end
5. اگر همهٔ موارد بالا در شاخهٔ main ردیف بود، deploy کردن اپلیکیشن به production

نمودار زیر نشان می‌دهد همهٔ این مراحل چگونه کنار هم قرار می‌گیرند.

![شکل ۱۲.۱ – نمای کلی pipeline](/images/B31385_12_1.png)

**شکل ۱۲.۱ — نمای کلی pipeline**

این نوع تنظیم واقعاً با رشد تیم خودش را نشان می‌دهد. به‌جای تکیه بر اینکه هر توسعه‌دهنده به یاد داشته باشد بررسی‌ها را اجرا و درست deploy کند، pipeline هر بار که کد push می‌شود به‌صورت ثابت این کار را انجام می‌دهد.

حالا که فهمیدیم CI/CD چیست، بیایید ابزاری را ببینیم که برای ساخت pipeline استفاده خواهیم کرد.

## استفاده از GitHub Actions {#h1_291 .heading-1}

برای خودکارسازی CI/CD pipeline، از **GitHub Actions** استفاده خواهیم کرد، پلتفرمی که مستقیماً در GitHub تعبیه شده. workflowهای خودکاری تعریف می‌کنیم که در واکنش به اتفاقاتی مثل push یا pull request در مخزن اجرا می‌شوند و GitHub اجرای آن‌ها را مدیریت می‌کند. نیازی به راه‌اندازی و نگهداری سرور CI خارجی نیست.

قبل از نوشتن اولین workflow، بیایید با مفاهیم کلیدی آشنا شویم تا اصطلاحات GitHub Actions را بفهمیم.

### Workflowها {#h2_292 .heading-2}

یک **workflow** فرآیند خودکاری است که از یک یا چند job تشکیل شده. workflowها را به‌صورت فایل‌های YAML در پوشهٔ `.github/workflows` مخزن تعریف می‌کنیم. یک workflow هر زمان که یک event خاص رخ دهد اجرا می‌شود، مثلاً push یا pull request. همچنین می‌توانیم آن را به‌صورت دستی از رابط کاربری GitHub با استفاده از event `workflow_dispatch` آغاز کنیم. یک مخزن می‌تواند به تعداد دلخواه workflow داشته باشد.

### Eventها {#h2_293 .heading-2}

یک **event** چیزی است که یک workflow را آغاز می‌کند. می‌تواند push کردن کد به مخزن، باز کردن pull request یا حتی یک زمان زمان‌بندی‌شده باشد. eventها همچنین می‌توانند از طریق درخواست HTTP به‌صورت خارجی آغاز شوند که برای تنظیمات پیشرفته‌تر مفید است.

### Jobها {#h2_294 .heading-2}

یک **job** مجموعه‌ای از مراحل است که به‌عنوان بخشی از یک workflow اجرا می‌شوند. هر مرحله یا دستور shell است که ما می‌نویسیم یا یک action از پیش ساخته‌شده. به‌طور پیش‌فرض، همهٔ jobها در یک workflow به‌صورت موازی اجرا می‌شوند، هرچند می‌توانیم تنظیم کنیم یک job قبل از شروع منتظر اتمام job دیگری بماند.

### Steps {#h2_295 .heading-2}

یک **step** واحد کاری ساده در درون یک job است، چه دستور shell باشد که ما می‌نویسیم و چه action از marketplace. مراحل درون یک job همیشه به‌صورت متوالی اجرا می‌شوند و هر مرحله محیط یکسانی با مراحل قبلی خود دارد.

### Actionها {#h2_296 .heading-2}

یک **action** واحد قابل استفادهٔ مجددی از کار است که یک وظیفهٔ رایج را انجام می‌دهد. GitHub Actions Marketplace ([https://github.com/marketplace?type=actions](https://github.com/marketplace?type=actions)) actionهای از پیش ساخته‌شدهٔ زیادی دارد. آن‌ها را مثل packageهای npm در نظر بگیرید، اما برای pipelineهای CI. از چند مورد آن‌ها استفاده خواهیم کرد، مثل actionهایی برای checkout کردن کد، تنظیم Node.js و deploy کردن به پلتفرمی مثل Render.

### Runnerها {#h2_297 .heading-2}

یک **runner** سروری است که وقتی یک workflow آغاز می‌شود آن را اجرا می‌کند. GitHub runnerهای میزبانی‌شده روی Ubuntu، macOS و Windows ارائه می‌دهد. اگر به چیز سفارشی‌تری نیاز داشته باشیم، می‌توانیم runnerهای self-hosted خودمان را هم راه‌اندازی کنیم.

حالا که با بلوک‌های سازنده آشنا شدیم، بیایید آن‌ها را کنار هم بگذاریم و CI/CD pipeline را بسازیم. با CI pipeline شروع کنیم.

## تنظیم pipeline برای continuous integration {#h1_298 .heading-1}

CI pipeline ما چهار job خواهد داشت که به‌صورت موازی اجرا می‌شوند: **بررسی‌های کیفیت کد**، **تست‌های unit**، **تست‌های integration** و **تست‌های end-to-end**. اجرای موازی آن‌ها یعنی سریع‌تر نتیجه می‌گیریم چون منتظر اتمام یک job قبل از شروع بعدی نمی‌مانیم.

بیایید فایل `.github/workflows/ci.yml` را بسازیم و با تعریف سطح بالای workflow شروع کنیم:

```yaml
# .github/workflows/ci.yml

name: Continuous Integration
on:
  - push
  - pull_request
jobs:
  # We will define the jobs here
```

بیایید آنچه اینجا تعریف کرده‌ایم را بررسی کنیم:

- `name` - نام نمایشی workflow که در رابط کاربری GitHub Actions نشان داده می‌شود
- `on` - eventهایی که این workflow را آغاز می‌کنند. به push و pull_request گوش می‌دهیم، پس pipeline هر بار که کد به هر شاخه‌ای push شود یا pull request باز شود اجرا می‌شود
- `jobs` - ظرفی که همهٔ jobهای ما در آن قرار می‌گیرند

حالا بیایید اولین job را اضافه کنیم که بررسی‌های کیفیت کد را مدیریت می‌کند:

```yaml
# .github/workflows/ci.yml

# ...
jobs:
  code-checks:
    name: Code Checks
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./chapter-12
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-node@v6
        with:
          node-version: 24
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm run format:check
```

بیایید بررسی کنیم این job چگونه کار می‌کند:

- `runs-on: ubuntu-latest` - این job را روی آخرین runner اوبونتو اجرا می‌کند که انتخاب استاندارد برای پروژه‌های Node.js است
- `defaults.run.working-directory` - دایرکتوری کاری برای همهٔ مراحل `run` را روی `./chapter-12` تنظیم می‌کند. مخزن ما شامل چندین فصل است، پس باید مطمئن شویم دستورات روی پوشهٔ درست اجرا شوند.
- `actions/checkout@v6` - از یک GitHub action در marketplace استفاده می‌کند که کد مخزن را روی runner checkout می‌کند تا مراحل بعدی بتوانند به آن دسترسی داشته باشند.
- `actions/setup-node@v6` - از یک GitHub action در marketplace استفاده می‌کند که Node.js نسخهٔ ۲۴ را روی runner نصب می‌کند
- `npm ci` - dependencyها را دقیقاً از `package-lock.json` نصب می‌کند بدون به‌روزرسانی چیزی، که آن را سریع‌تر و با نصب تمیز و قابل بازتولید می‌کند، دقیقاً همان چیزی که در CI می‌خواهیم.
- `npm run lint`، `npm run typecheck`، `npm run format:check` - هر بررسی کیفیت را به‌ترتیب اجرا می‌کنند. اگر هر کدام از آن‌ها fail شود، job متوقف و کل pipeline به‌عنوان ناموفق علامت‌گذاری می‌شود.

حالا بیایید job تست‌های unit را اضافه کنیم:

```yaml
# .github/workflows/ci.yml

# ...
jobs:
  # ...
  unit-tests:
    name: Unit Tests
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./chapter-12
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-node@v6
        with:
          node-version: 24
      - run: npm ci
      - run: cp .env.example .env
      - run: npm run test:unit
```

این از همان الگوی قبلی پیروی می‌کند، با یک اضافهٔ کوچک: قبل از اجرای تست‌ها `.env.example` را به `.env` کپی می‌کنیم. اپلیکیشن ما به متغیرهای محیطی نیاز دارد تا اجرا شود و `.env.example` همهٔ کلیدهای لازم را با مقادیر placeholder ایمن دارد که در CI کار می‌کنند.

سپس، job تست‌های integration:

```yaml
# .github/workflows/ci.yml

# ...
jobs:
  # ...
  integration-tests:
    name: Integration Tests
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./chapter-12
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-node@v6
        with:
          node-version: 24
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: cp .env.example .env
      - run: npm run test:integration
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report-integration
          path: chapter-12/playwright-report/
          retention-days: 30
```

چون تست‌های integration ما از Playwright استفاده می‌کنند، باید قبل از اجرای تست‌ها مرورگرهای آن را با `npx playwright install --with-deps` نصب کنیم. مرحلهٔ آخر جالب است؛ report HTML Playwright را به‌عنوان artifact قابل دانلود آپلود می‌کند، اما فقط وقتی که job fail شود (`if: failure()`). آپلود کردن آن در هر اجرای موفق بی‌فایده است، اما وقتی چیزی خراب می‌شود، داشتن report در دسترس debug را بسیار آسان‌تر می‌کند. GitHub آن را به مدت ۳۰ روز نگه می‌دارد و سپس به‌صورت خودکار پاک می‌کند.

و در نهایت، job تست‌های end-to-end:

```yaml
# .github/workflows/ci.yml

# ...
jobs:
  # ...
  e2e-tests:
    name: E2E Tests
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./chapter-12
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-node@v6
        with:
          node-version: 24
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: cp .env.example .env
      - run: npm run test:e2e
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report-e2e
          path: chapter-12/playwright-report/
          retention-days: 30
```

این تقریباً یکسان با job تست‌های integration است. تفاوت‌ها دستور تست (`npm run test:e2e`) و نام artifact (`playwright-report-e2e`) هستند. جدا نگه داشتن نام‌ها یعنی یک نگاه می‌توانیم بفهمیم آیا fail از integration tests آمده یا end-to-end tests.

وقتی فایل `ci.yml` را commit و push کردیم، GitHub آن را به‌صورت خودکار تشخیص می‌دهد و اجرای pipeline را شروع می‌کند. می‌توانیم اجرای هر چهار job را در تب Actions تماشا کنیم:

![شکل ۱۲.۲ – Pipeline continuous integration](/images/B31385_12_2.png)

**شکل ۱۲.۲ — Pipeline continuous integration**

هر چهار job همزمان اجرا می‌شوند. pipeline فقط زمانی به‌عنوان موفق علامت‌گذاری می‌شود که همهٔ jobها pass شوند. اگر هر کدام از آن‌ها fail شود، GitHub به ما اطلاع می‌دهد تا قبل از رسیدن به production آن را رفع کنیم.

با CI حل شد، بیایید به بخش deployment بپردازیم.

## تنظیم pipeline برای continuous deployment {#h1_299 .heading-1}

گزینه‌های مختلف زیادی برای deploy کردن اپلیکیشن React Router وجود دارد، مثل پلتفرم‌های serverless (Vercel، Netlify و Cloudflare Pages)، پلتفرم‌های سرور بلندمدت (Fly.io، Render، Railway) یا راه‌حل‌های self-hosted روی VPS. برای اپلیکیشن ما از **Render** استفاده خواهیم کرد چون ساده است و tier رایگان بخشنده‌ای دارد.

pipeline deployment ما یک job دارد که deployment را آغاز می‌کند، اما فقط بعد از ردیف شدن CI و فقط برای push به شاخهٔ `main`. قطعاً نمی‌خواهیم هر بار که کسی به شاخهٔ feature push می‌کند deployment آغاز شود.

### ساختن workflow deployment {#h2_300 .heading-2}

بیایید فایل جدیدی در `.github/workflows/cd.yml` بسازیم:

```yaml
# .github/workflows/cd.yml

name: Continuous Deployment
run-name: ${{ github.event.workflow_run.head_commit.message &#125;&#125;
on:
  workflow_run:
    workflows: [Continuous Integration]
    branches: [main]
    types: [completed]
jobs:
  deploy:
    runs-on: ubuntu-latest
    if: github.event.workflow_run.conclusion == 'success' && github.event.workflow_run.event == 'push'
    env:
      RENDER_SERVICE_ID: ${{ secrets.RENDER_SERVICE_ID &#125;&#125;
      RENDER_API_KEY: ${{ secrets.RENDER_API_KEY &#125;&#125;
    steps:
      - if: env.RENDER_SERVICE_ID != '' && env.RENDER_API_KEY != ''
        uses: JorgeLNJunior/render-deploy@v1.5.0
        with:
          service_id: ${{ secrets.RENDER_SERVICE_ID &#125;&#125;
          api_key: ${{ secrets.RENDER_API_KEY &#125;&#125;
          wait_deploy: true
```

بیایید بخش‌های کلیدی را بررسی کنیم:

- `run-name` - نام هر اجرای workflow را روی پیام commit‌ای که آن را آغاز کرده تنظیم می‌کند. این باعث می‌شود با یک نگاه بفهمیم چه چیزی deploy می‌شود بدون نیاز به کند و کاو در جزئیات.
- `workflow_run` - این trigger هر زمان که workflow دیگری با نام مشخص تمام شود آغاز می‌شود. به‌جای trigger شدن روی یک event خاص، منتظر اتمام Continuous Integration در شاخهٔ `main` می‌مانیم.
- `if: conclusion == 'success' && event == 'push'` - این دروازهٔ حیاتی است. job deploy فقط اجرا می‌شود اگر CI با موفقیت تمام شده باشد و فقط اگر با push آغاز شده باشد.
- `JorgeLNJunior/render-deploy@v1.5.0` - action از پیش ساخته‌شده‌ای که deploy کردن Render را برایمان مدیریت می‌کند. به service ID و API key ما نیاز دارد که آن‌ها را به‌عنوان repository secret پاس می‌دهیم تا هرگز در کد ظاهر نشوند.
- `wait_deploy: true` - job را تا اتمام deployment توسط Render نگه می‌دارد. این یعنی workflow دقیقاً بازتاب می‌دهد که آیا deployment واقعاً موفق بوده یا فقط درخواست فرستاده شده.

قبل از اینکه این workflow بتواند چیزی deploy کند، باید یک سرویس روی Render بسازیم و credentialهای لازم را دریافت کنیم.

### راه‌اندازی Render {#h2_301 .heading-2}

برای شروع، به [https://dashboard.render.com](https://dashboard.render.com) بروید و وارد داشبورد Render شوید. روی **New** کلیک کنید و **Web Service** را از منوی کشویی انتخاب کنید.

![شکل ۱۲.۳ – ساختن سرویس جدید در Render](/images/B31385_12_3.png)

**شکل ۱۲.۳ — ساختن سرویس جدید در Render**

این ما را به صفحه‌ای می‌برد که Render را به مخزن GitHub متصل می‌کنیم. مخزنی که کد اپلیکیشن ما را دارد انتخاب می‌کنیم.

![شکل ۱۲.۴ – اتصال سرویس به مخزن](/images/B31385_12_4.png)

**شکل ۱۲.۴ — اتصال سرویس به مخزن**

وقتی مخزن متصل شد، Render از ما می‌خواهد سرویس را تنظیم کنیم. اینجا نام سرویس، شاخهٔ مورد نظر برای deploy، دستور build و دستور start را تنظیم می‌کنیم.

![شکل ۱۲.۵ – تنظیم سرویس جدید](/images/B31385_12_5.png)

**شکل ۱۲.۵ — تنظیم سرویس جدید**

با اسکرول به پایین، می‌توانیم نوع instance و متغیرهای محیطی مورد نیاز اپلیکیشن در زمان اجرا را هم اضافه کنیم.

![شکل ۱۲.۶ – تنظیم instance و محیط](/images/B31385_12_6.png)

**شکل ۱۲.۶ — تنظیم instance و محیط**

به‌طور پیش‌فرض، Render در هر push به شاخهٔ پیکربندی‌شده به‌صورت خودکار deploy می‌کند. این را نمی‌خواهیم چون می‌خواهیم فقط GitHub Actions چیزی باشد که deploymentها را آغاز می‌کند. بیایید بخش **Advanced** را باز کنیم و **Auto-Deploy** را روی **Off** قرار دهیم تا deploymentهای خودکار غیرفعال شوند.

![شکل ۱۲.۷ – غیرفعال کردن deploymentهای خودکار](/images/B31385_12_7.png)

**شکل ۱۲.۷ — غیرفعال کردن deploymentهای خودکار**

با غیرفعال شدن این مورد، Render منتظر می‌ماند تا workflow CD ما به آن بگوید deploy کند.

### دریافت service ID و API key {#h2_302 .heading-2}

حالا به دو چیز از Render نیاز داریم: service ID و یک API key. workflow ما از این‌ها برای احراز هویت با API Render و آغاز deployment استفاده خواهد کرد.

service ID مستقیماً در صفحهٔ تنظیمات سرویس موجود است.

![شکل ۱۲.۸ – دریافت service ID](/images/B31385_12_8.png)

**شکل ۱۲.۸ — دریافت service ID**

برای API key، به **Account Settings** و سپس بخش **API Keys** بروید تا کلید جدیدی بسازید.

![شکل ۱۲.۹ – دریافت API key](/images/B31385_12_9.png)

**شکل ۱۲.۹ — دریافت API key**

حالا باید به workflow GitHub دسترسی به این credentialها را بدهیم.

### اضافه کردن secretها به مخزن {#h2_303 .heading-2}

این credentialها را از طریق repository secretها به workflow GitHub فراهم می‌کنیم؛ مقادیر رمزنگاری‌شده‌ای که workflowها می‌توانند در زمان اجرا بخوانند اما هرگز در کد یا log ظاهر نمی‌شوند.

 به تب **Settings** مخزن بروید، به **Secrets and Variables → Actions** بروید و دو secret اضافه کنید: `RENDER_SERVICE_ID` و `RENDER_API_KEY`.

![شکل ۱۲.۱۰ – اضافه کردن service ID و API key به repository secretها](/images/B31385_12_10.png)

**شکل ۱۲.۱۰ — اضافه کردن service ID و API key به repository secretها**

این نام‌ها دقیقاً با آنچه در `cd.yml` با `${{ secrets.RENDER_SERVICE_ID &#125;&#125;` و `${{ secrets.RENDER_API_KEY &#125;&#125;` مرجع دادیم مطابقت دارند. وقتی workflow اجرا می‌شود، GitHub مقادیر را به‌صورت خودکار تزریق می‌کند.

### تأیید deployment {#h2_304 .heading-2}

بیایید یک commit جدید به `main` push کنیم و کل فرآیند را در عمل ببینیم. اول pipeline CI اجرا می‌شود و وقتی ردیف شد، workflow CD به‌صورت خودکار آغاز می‌شود:

![شکل ۱۲.۱۱ – Pipeline continuous deployment](/images/B31385_12_11.png)

**شکل ۱۲.۱۱ — Pipeline continuous deployment**

می‌توانیم پیشرفت deployment را به‌صورت لحظه‌ای تماشا کنیم. در داشبورد Render می‌توانیم ببینیم deployment جدید آغاز شده:

![شکل ۱۲.۱۲ – وضعیت deployment در Render](/images/B31385_12_12.png)

**شکل ۱۲.۱۲ — وضعیت deployment در Render**

و وقتی تمام شد، اپلیکیشن ما live است.

![شکل ۱۲.۱۳ – اپلیکیشن live](/images/B31385_12_13.png)

**شکل ۱۲.۱۳ — اپلیکیشن live**

از این به بعد، هر push به `main` که CI را ردیف کند به‌طور خودکار به یک deployment تازه منجر می‌شود. دیگر خبری از اجرای دستی اسکریپت‌ها و آغاز دستی release نیست — pipeline همهٔ این کارها را انجام می‌دهد.

## خلاصه {#h1_305 .heading-1}

در این فصل، یک CI/CD pipeline کامل با استفاده از GitHub Actions و Render راه‌اندازی کردیم.

با فهمیدن اینکه CI/CD چیست و چرا مهم است شروع کردیم. به‌جای اجرای دستی بررسی‌ها و deploy کردن هر بار، pipeline این کار را به‌طور قابل اعتماد و ثابت در هر push انجام می‌دهد. سپس مفاهیم کلیدی GitHub Actions را بررسی کردیم: workflowها، eventها، jobها، actionها، runnerها و مراحل، که واژگان لازم برای فهم آنچه می‌ساختیم را به ما داد.

از آنجا، workflow CI را با چهار job موازی شامل بررسی‌های کیفیت کد، تست‌های unit، تست‌های integration و تست‌های end-to-end ساختیم. آپلود reportهای Playwright را تنظیم کردیم که فقط در صورت fail شدن فعال شوند تا همیشه چیزی برای debug کردن وقتی مشکلی پیش می‌آید داشته باشیم.

در نهایت، workflow CD را ساختیم که ردیف شدن CI در `main` را رصد می‌کند و به‌طور خودکار به Render deploy می‌کند. سرویس Render را پیکربندی کردیم، auto-deploy داخلی آن را غیرفعال کردیم و credentialها را از طریق repository secretهای GitHub متصل کردیم.
