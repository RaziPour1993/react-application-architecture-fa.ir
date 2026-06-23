# فصل ۱۱: تست اپلیکیشن

تست چیزی است که به ما اطمینان می‌دهد اپلیکیشن‌مان درست کار می‌کند. وقتی feature می‌سازیم، باگ fix می‌کنیم یا code را refactor می‌کنیم، باید بدانیم تغییراتمان عملکرد موجود را خراب نمی‌کند. بدون test، هر تغییری پرریسک می‌شود و در نهایت وقت بیشتری صرف بررسی دستی صرف می‌کنیم تا مطمئن شویم همه‌چیز هنوز کار می‌کند.

در این فصل یاد می‌گیریم چگونه با رویکردهای مختلف test اپلیکیشن‌مان را تست کنیم. هر رویکرد هدف متفاوتی دارد و با هم یک استراتژی test جامع می‌سازند که باگ‌ها را زود شناسایی می‌کند و اپلیکیشن‌مان را قابل اعتماد نگه می‌دارد.

موارد زیر را پوشش می‌دهیم:

- درک اهمیت test
- Unit testing
- Integration testing
- End-to-end testing

در پایان این فصل، یک استراتژی test محکم خواهیم داشت که اطمینان لازم برای ارسال سریع و ایمن تغییرات را فراهم می‌کند.

## پیش‌نیازهای فنی {#h1_280}

قبل از شروع، باید پروژه‌مان را setup کنیم. برای توسعهٔ پروژه، موارد زیر باید روی کامپیوترمان نصب باشند:

- Node.js نسخه ۲۴ یا بالاتر، npm نسخه ۱۱ یا بالاتر همراه Node عرضه می‌شود. می‌توانیم با اجرای `node -v` و `npm -v` در ترمینال این را تأیید کنیم. راه‌های مختلفی برای نصب Node.js و npm وجود دارد. این مقالهٔ عالی جزئیات بیشتری دارد: [https://www.nodejsdesignpatterns.com/blog/5-ways-to-install-node-js](https://www.nodejsdesignpatterns.com/blog/5-ways-to-install-node-js)
- VS Code (اختیاری) یک ویرایشگر محبوب برای JavaScript و TypeScript است: متن‌باز، پشتیبانی عالی از TypeScript، و extensionهای مختلف. می‌توانید آن را از [https://code.visualstudio.com](https://code.visualstudio.com) دانلود کنید.

کد این کتاب در مخزن کتاب موجود است. برای دسترسی به لینک مخزن، مراحل بخش *«Download the example code files»* در *Preface* را دنبال کنید. آن را clone کنید و وارد ریشهٔ مخزن شوید:

```bash
git clone https://github.com/PacktPublishing/React-Application-Architecture-for-Production-Second-Edition.git
```

مخزن شامل پوشه‌های فصل‌ها با کد هر فصل، به‌علاوهٔ پوشهٔ مشترک `api` با سرور API مورد استفاده در همهٔ فصل‌ها است.

ما در فصل ۱۱ هستیم، پس باید وارد پوشهٔ `chapter-11` شویم:

```bash
cd React-Application-Architecture-for-Production-Second-Edition/chapter-11
```

سپس باید dependencyها را نصب کنیم:

```bash
npm install
```

همچنین باید متغیرهای محیطی را فراهم کنیم:

```bash
cp .env.example .env
```

حالا باید فرانت‌اند در [http://localhost:5173](http://localhost:5173) اجرا شود.

همچنین باید سرور API ما در حال اجرا باشد.

بیایید یک پنجرهٔ ترمینال جدید باز کنیم و وارد پوشهٔ api شویم:

```bash
cd React-Application-Architecture-for-Production-Second-Edition/api
```

حالا باید اسکریپت setup را برای فصل ۱۱ اجرا کنیم تا همه‌چیز را برایمان configure کند:

```bash
npm run setup 11
```

سپس باید سرور API را اجرا کنیم:

```bash
npm run dev
```

باید سرور API را در [http://localhost:9999](http://localhost:9999) ببینیم.

برای اطلاعات بیشتر دربارهٔ جزئیات setup، فایل `README.md` را بررسی کنید.

## چرا تست مهم است {#h1_281}

فرض کنید تغییر کوچکی در logic احراز هویتتان ایجاد می‌کنید و ناگهان flow ورود برای همهٔ کاربران خراب می‌شود. یا componentی را refactor می‌کنید و ندانسته featureای را حذف می‌کنید که کاربران به آن وابسته‌اند. بدون test، این باگ‌ها فقط در production کشف می‌شوند وقتی کاربران آن‌ها را گزارش می‌دهند.

Testها به‌عنوان تور ایمنی عمل می‌کنند. تأیید می‌کنند کد ما مطابق انتظار کار می‌کند و فوراً وقتی چیزی خراب می‌شود به ما هشدار می‌دهند. یعنی می‌توانیم با اطمینان refactor کنیم، feature جدید بدون ترس اضافه کنیم و باگ‌ها را قبل از رسیدن به کاربران شناسایی کنیم.

اما همهٔ testها به یک اندازه ارزشمند نیستند. باید استراتژیک دربارهٔ اینکه چه چیزی تست کنیم و چگونه تست کنیم فکر کنیم. سه نوع اصلی test که استفاده می‌کنیم:

- **Unit testها** تکه‌های منفرد کد را به‌صورت مستقل verify می‌کنند. سریع اجرا می‌شوند و نوشتن آن‌ها آسان است، اما نمی‌توانند به ما بگویند بخش‌های مختلف اپلیکیشن درست با هم کار می‌کنند یا نه. از unit test برای utility function، custom hook و componentهای قابل استفادهٔ مجدد با input و output مشخص استفاده می‌کنیم.
- **Integration testها** نحوهٔ کار بخش‌های مختلف با هم را verify می‌کنند. ارزشمندتر از unit test هستند چون تأیید می‌کنند componentها، hookها و API callها درست با هم integrate می‌شوند. بیشتر testهای ما باید integration test باشند چون اطمینان بیشتری می‌دهند در حالی که هنوز نسبتاً سریع اجرا می‌شوند.
- **End-to-end testها** کل اپلیکیشن را از منظر کاربر verify می‌کنند. سیستم کامل با فرانت‌اند و بک‌اند اجرا می‌شوند و تعاملات واقعی کاربر را شبیه‌سازی می‌کنند. این testها کندتر و هزینهٔ نگهداریشان بیشتر است، پس به‌صورت selectiver استفاده می‌کنیم تا مسیرهای critical کاربر از ابتدا تا انتها درست کار کنند.

می‌توانیم از رویکرد testing trophy استفاده کنیم تا تصمیم بگیریم چه testهایی بنویسیم. بیشتر integration test، بعضی end-to-end test برای مسیرهای critical، و unit test برای logic پیچیدهٔ کسب‌وکار می‌نویسیم.

شکل ۱۱.۱ — Testing trophy

ایدهٔ پشت testing trophy تمرکز روی integration test برای بیشتر عملکردها، استفاده از unit test برای logic پیچیده‌ای که به‌صورت دیگر تست کردنش سخت است، و reserve کردن end-to-end test برای مهم‌ترین flowهای کاربر است. این پوشش خوبی بدون کند کردن workflow توسعه به ما می‌دهد.

حالا ببینیم هر نوع test را چگونه در اپلیکیشن‌مان پیاده‌سازی کنیم.

## Unit testing {#h1_282}

**Unit testing** روش testی است که در آن تکه‌های منفرد کد (function، hook، component) به‌صورت مستقل تست می‌شوند. dependencyهای خارجی با mock یا stub جایگزین می‌شوند تا testها سریع، قطعی و متمرکز صرفاً روی logic خود unit باشند.

نمودار زیر نحوهٔ کار unit test را نشان می‌دهد. یک تکهٔ منفرد کد را به‌صورت مستقل تست می‌کنیم، input فراهم می‌کنیم و output را verify می‌کنیم بدون درگیر کردن هیچ سیستم خارجی:

شکل ۱۱.۲ — Unit testing

برای نوشتن unit test می‌توانیم از **Vitest** به‌عنوان test runner و **React Testing Library** برای تست componentها و hookهای React استفاده کنیم. Vitest سریع است، developer experience عالی دارد و با اپلیکیشن مبتنی بر Vite ما یکپارچه می‌شود.

ببینیم چگونه بخش‌های مختلف اپلیکیشن‌مان را unit test کنیم. Utility function کاندیداهای عالی برای unit testing هستند. input و output مشخص دارند، side effect ندارند و به state خارجی وابسته نیستند. مثلاً policyهای authorization ما logic و edge case بیشتری دارند که باید پوشش داده شوند، پس از unit testing کامل بهره‌مند می‌شوند:

```typescript
// src/features/auth/lib/__tests__/authorization-policies.test.ts

const createUser = (id: string): CurrentUser => ({
  // ...
});

const createIdea = (authorId: string): Idea => ({
  // ...
});

const createReview = (authorId: string): Review => ({
  // ...
});

describe('IdeaPolicies', () => {
  describe('canCreate', () => {
    it('should return true for authenticated users', () => {
      expect(IdeaPolicies.canCreate(createUser('1'))).toBe(true);
    });

    it('should return false for unauthenticated users', () => {
      expect(IdeaPolicies.canCreate(null)).toBe(false);
    });
  });

  describe('canEdit', () => {
    it('should return true when user is the author', () => {
      const user = createUser('1');
      const idea = createIdea('1');
      expect(IdeaPolicies.canEdit(user, idea)).toBe(true);
    });

    it('should return false when user is not the author', () => {
      const user = createUser('2');
      const idea = createIdea('1');
      expect(IdeaPolicies.canEdit(user, idea)).toBe(false);
    });

    it('should return false when user is null', () => {
      const idea = createIdea('1');
      expect(IdeaPolicies.canEdit(null, idea)).toBe(false);
    });
  });

  describe('canDelete', () => {
    it('should return true when user is the author', () => {
      const user = createUser('1');
      const idea = createIdea('1');
      expect(IdeaPolicies.canDelete(user, idea)).toBe(true);
    });

    it('should return false when user is not the author', () => {
      const user = createUser('2');
      const idea = createIdea('1');
      expect(IdeaPolicies.canDelete(user, idea)).toBe(false);
    });
  });
});

describe('ReviewPolicies', () => {
  // ...
});
```

این test suite تأیید می‌کند `IdeaPolicies` و `ReviewPolicies` ما در سناریوهای مختلف مقادیر صحیح برمی‌گردانند: کاربران احراز هویت‌شده در برابر unauthenticated، نویسندگان در برابر non-authors، و انواع مختلف منابع. هر test روی یک رفتار منفرد و مشخص متمرکز است.

utility functionهایی مثل این‌ها ساده‌ترین چیزها برای unit test هستند چون logic خالص بدون dependency هستند. اما تست componentهای React چطور؟ در ادامه می‌بینیم.

## Integration testing {#h1_283}

Unit testها باید سریع و متمرکز باشند. باید تأیید کنند تکه‌های منفرد به‌صورت مستقل درست کار می‌کنند. اما نمی‌توانند به ما بگویند آیا همه‌چیز را درست به هم متصل کرده‌ایم و اپلیکیشن‌مان وقتی همهٔ این تکه‌ها کنار هم قرار می‌گیرند کار می‌کند یا نه. اینجاست که integration test وارد می‌شود.

unit testهای ما ممکن است pass کنند، اما اپلیکیشن‌مان هنوز می‌تواند خراب شود. Integration testing این شکاف‌ها را با تست کردن بخش‌های مختلف اپلیکیشن که با هم کار می‌کنند شناسایی می‌کند. به‌جای تست کردن یک بخش از اپلیکیشن به‌صورت مستقل، نحوهٔ کار آن را در context اپلیکیشن و همهٔ بخش‌هایش تست می‌کنیم. تنها چیزی که mock می‌کنیم لایهٔ API است.

این ارزشمندترین نوع test برای بیشتر اپلیکیشن‌ها است. رویکرد خوبی برای integration test تست کردن صفحات منفرد است. این تضمین می‌کند که flow کامل یک route شامل loaderها، error boundary و تعاملات کاربر در آن صفحه را تست می‌کنیم.

نمودار زیر نشان می‌دهد integration test چگونه بخش بیشتری از stack اپلیکیشن را نسبت به unit test پوشش می‌دهد:

شکل ۱۱.۳ — Integration testing

همان‌طور که نمودار نشان می‌دهد، integration test کل درخت component یک صفحه شامل routing و data loading را پوشش می‌دهد. تنها مرزی که mock می‌کنیم لایهٔ API است که کنترل داده را بدون نیاز به سرور بک‌اند در اختیارمان قرار می‌دهد.

دو گزینه برای ابزار مورد استفاده برای integration test داریم:

- **Vitest و React Testing Library با API requestهای mock شده** اما وقتی صفحات server-side rendered و data passing از سرور به client را تست می‌کنیم پیچیده می‌شود. React Testing Library می‌تواند componentها را render کند، اما نمی‌تواند نحوهٔ fetch و passing data از loaderها به route componentها را تست کند.
- **Playwright با API requestهای mock شده**. این رویکرد قدرتمند است چون دقیقاً اپلیکیشن را همان‌طور که کاربران تجربه می‌کنند تست می‌کنیم — در یک مرورگر واقعی با تعاملات واقعی اما بدون وابستگی به سرور بک‌اند. با mock کردن API requestها، می‌توانیم دقیقاً کنترل کنیم چه داده‌ای اپلیکیشن‌مان دریافت می‌کند و سناریوهای مختلف مثل success، error و edge case را تست کنیم. این نقطهٔ شیرین بین سرعت و اطمینان را به ما می‌دهد.

از آنجا که اپلیکیشن‌مان از React Router با server-side rendering استفاده می‌کند، گزینهٔ دوم مناسب‌تر است. در حالی که Playwright عمدتاً ابزار end-to-end testing است، برای integration test هم خوب کار می‌کند. Playwright مکانیزم built-in `page.route()` mocking دارد اما فقط می‌تواند requestهای ساخته‌شده توسط مرورگر را intercept کند. در یک اپلیکیشن SSR، سرور هم از loaderها API request می‌زند و آن requestها از client-side interception Playwright عبور می‌کنند. تا زمانی که Playwright این را پشتیبانی کند، می‌توانیم از کتابخانهٔ **Mocky Balboa** برای mock کردن API request از طریق `mocky.route()` در هر دو محیط server-side rendering و client-side navigation استفاده کنیم. این درخواست‌ها را در هر دو محیط intercept می‌کند، پس دادهٔ mock یکسانی چه صفحه در ابتدا server-rendered باشد و چه در حین navigation client-rendered باشد استفاده می‌شود. این رفتار test سازگار و قابل اعتماد به ما می‌دهد در حالی که هنوز سریع و قابل نگهداری باقی می‌ماند.

بیایید صفحهٔ ideas را تست کنیم تا ببینیم این در عمل چگونه کار می‌کند:

```typescript
// src/app/routes/ideas/__tests__/ideas.integration.test.ts

import { test, expect } from 'testing/fixtures/integration.fixture';
import { generateIdea } from 'testing/test-data';

test.describe('Ideas page', () => {
  test.beforeEach(async ({ mocky, API_URL }) => {
    const tags = ['technology', 'design', 'business', 'health'];

    mocky.route(`${API_URL}/ideas/tags`, (route) => {
      return route.fulfill({
        body: JSON.stringify({ data: tags }),
        status: 200,
      });
    });
  });

  test.describe('Display', () => {
    test('displays ideas list', async ({ page, mocky, API_URL }) => {
      const ideas = [generateIdea(), generateIdea()];
      mocky.route(`${API_URL}/ideas**`, async (route) => {
        return route.fulfill({
          body: JSON.stringify({
            data: ideas,
            pagination: {
              page: 1,
              limit: 10,
              total: ideas.length,
              totalPages: 1,
              prevPage: null,
              nextPage: null,
            },
          }),
          status: 200,
        });
      });

      await page.goto('/ideas');

      await expect(page.getByTestId('idea-list-item').first()).toContainText(
        ideas[0].title,
      );
      await expect(page.getByTestId('idea-list-item').nth(1)).toContainText(
        ideas[1].title,
      );
    });
  });

  test.describe('Error handling', () => {
    test('shows error when ideas fail to load', async ({
      page,
      mocky,
      API_URL,
    }) => {
      mocky.route(`${API_URL}/ideas**`, (route) => {
        return route.fulfill({
          body: JSON.stringify({ message: 'Failed to fetch ideas' }),
          status: 500,
        });
      });

      await page.goto('/ideas');

      await expect(page.getByTestId('ideas-skeleton')).not.toBeVisible();

      await expect(page.getByText('Failed to fetch ideas')).toBeVisible({
        timeout: 10000,
      });
    });
  });

  test.describe('Search and filter', () => {
    // ...
  });

  test.describe('Pagination', () => {
    // ...
  });
});
```

این integration test تأیید می‌کند صفحهٔ ideas ما درست کار می‌کند آن را در یک مرورگر واقعی با پاسخ‌های مختلف API تست می‌کند. بیایید conceptهای کلیدی را بررسی کنیم:

- **Mock کردن API route** — تابع `mocky.route()` درخواست‌های شبکه را intercept می‌کند و دادهٔ mock برمی‌گرداند. این کنترل کامل روی داده‌ای که اپلیکیشن‌مان دریافت می‌کند به ما می‌دهد. می‌توانیم سناریوهای success، error، state خالی و edge case را بدون نیاز به بک‌اند واقعی تست کنیم. فقط کافی است API routeهایی که در اپلیکیشن استفاده می‌شوند را mock کنیم و assertion روی صفحه انجام دهیم.
- **تست تعاملات کاربر** — دقیقاً مثل یک کاربر با صفحه تعامل می‌کنیم: inputهای جستجو را پر می‌کنیم، دکمه‌های filter را کلیک می‌کنیم، گزینه‌های sort را تغییر می‌دهیم. testها تأیید می‌کنند این تعاملات نتایج مورد انتظار را تولید می‌کنند.
- **سازمان‌دهی توصیفی test** — testها را در describe block بر اساس حوزهٔ feature سازمان‌دهی می‌کنیم: Display، Error handling، Search and filter، و Pagination. این درک اینکه چه چیزی تست می‌کنیم و پیدا کردن testهای مشخص بعداً را آسان می‌کند.

قدرت integration test این است که سناریوهای واقعی تست می‌کنند. داریم تست نمی‌کنیم که آیا یک component به‌صورت مستقل درست render می‌شود، داریم تست می‌کنیم که آیا کاربران واقعاً می‌توانند ideas را جستجو کنند، بر اساس tag فیلتر کنند و نتایج بیشتری بارگذاری کنند. این‌ها رفتارهایی هستند که برای کاربرانمان مهم‌اند.

Integration test به ما اطمینان می‌دهد featureها درست کار می‌کنند بدون burden نگهداری end-to-end test. اما هنوز ممکن است مشکلی پیش بیاید، پس هنوز تست کردن سیستم کامل با فرانت‌اند و بک‌اند ارزشمند است.

## End-to-end testing {#h1_284}

**End-to-end test** جایی است که اپلیکیشن کامل را با فرانت‌اند و بک‌اند در حال اجرا با هم تست می‌کنیم. برخلاف integration test که API را mock می‌کنیم، end-to-end test در محیطی مشابه production اجرا می‌شوند که به API وصل می‌شوند، با database تعامل می‌کنند و تأیید می‌کنند کل سیستم به‌صورت یکپارچه کار می‌کند.

این testها گران‌ترین برای نوشتن و نگهداری هستند. کندتر اجرا می‌شوند، احتمال flaky بودنشان بیشتر است و به infrastructure بیشتری نیاز دارند. اما واقع‌گرایانه‌ترین هم هستند چون دقیقاً آنچه کاربران در production تجربه می‌کنند را تست می‌کنند.

به‌خاطر هزینهٔ بالا، end-to-end test را به‌صورت selectiver استفاده می‌کنیم. روی journeyهای critical کاربر تمرکز می‌کنیم — flowهای اصلی که برای مفید بودن اپلیکیشن‌مان باید کار کنند. برای اپلیکیشن ما، journeyهای critical عبارت‌اند از احراز هویت کاربر، ایجاد ایده، review کردن ایدهٔ شخص دیگر، و مدیریت پروفایل کاربر.

نمودار زیر نشان می‌دهد end-to-end test چگونه با سیستم کامل تعامل می‌کنند:

شکل ۱۱.۴ — End-to-end testing

برخلاف integration test که API را mock کرده بودیم، end-to-end test از کل stack عبور می‌کنند. مرورگر درخواست‌هایی به فرانت‌اند ما می‌فرستد که با API واقعی ارتباط برقرار می‌کند که از database واقعی می‌خواند و می‌نویسد. هیچ چیزی mock نشده و کل flow تست می‌شود.

از Playwright برای اجرای این testها در یک مرورگر headless استفاده می‌کنیم و تعاملات واقعی کاربر را شبیه‌سازی می‌کنیم:

```typescript
// testing/e2e/smoke.spec.ts

import { test, expect } from '../fixtures/e2e.fixture';
import { generateIdea, generateReview, generateUser } from '../test-data';

test.describe('Smoke Test', () => {
  const testUser = {
    ...generateUser(),
    password: 'password123',
  };

  const testIdea = generateIdea();
  const testReview = generateReview();
  const updatedReviewContent = 'Updated review content';

  test('Complete User Journey', async ({ page }) => {
    await test.step('register a new user', async () => {
      await page.goto('/auth/register');

      await page
        .getByRole('textbox', { name: 'Username' })
        .fill(testUser.username);
      await page.getByRole('textbox', { name: 'Email' }).fill(testUser.email);
      await page.getByLabel('Password').fill(testUser.password);

      await page.getByRole('button', { name: 'Register' }).click();

      await expect(page).toHaveURL('/dashboard');
    });

    await test.step('log out the user', async () => {
      await page.getByRole('button', { name: 'Logout' }).click();
      await expect(page).toHaveURL('/');
    });

    await test.step('login with the same user', async () => {
      await page.getByRole('link', { name: 'Login' }).click();
      await expect(page).toHaveURL('/auth/login');

      await page.getByRole('textbox', { name: 'Email' }).fill(testUser.email);
      await page.getByLabel('Password').fill(testUser.password);

      await page.getByRole('button', { name: 'Login' }).click();

      await expect(page).toHaveURL('/dashboard');
    });

    await test.step('create a new idea', async () => {
     // ...
    });

    await test.step('edit the idea', async () => {
      // ...
    });

    await test.step('delete the idea', async () => {
      // ...
    });

    await test.step('discover ideas', async () => {
      // ...
    });

    await test.step('write a review for an idea of someone else', async () => {
      // ...
    });

    await test.step('edit the review', async () => {
      // ...
    });

    await test.step('delete the review', async () => {
      // ...
    });

    await test.step('update the user profile', async () => {
      // ...
    });
  });
});
```

این smoke test journey کامل کاربر را از ثبت‌نام تا به‌روزرسانی پروفایل طی می‌کند. به آن «smoke test» می‌گویند چون تأیید می‌کند هیچ آتشی نیست و عملکرد اصلی از ابتدا تا انتها کار می‌کند.

ببینیم چه چیزی این test را مؤثر می‌کند:

- **Test step برای شفافیت** — از `test.step()` استفاده کنید تا test را به بخش‌های منطقی تقسیم کنید. این test را قابل فهم‌تر می‌کند و به ما کمک می‌کند دقیقاً شناسایی کنیم کدام step اگر مشکلی پیش بیاید fail شده است.
- **Journey کامل کاربر** — همهٔ چیزی که یک کاربر ممکن است انجام دهد را پوشش دهید: ثبت‌نام، خروج، ورود، ایجاد محتوا، ویرایش، حذف، کشف محتوای دیگر، تعامل با آن، و به‌روزرسانی پروفایل. این استفادهٔ واقعی است.
- **بدون mock** — برخلاف integration test، هیچ API callی را mock نمی‌کنیم. این test به بک‌اند واقعی وصل می‌شود، رکوردهای database واقعی ایجاد می‌کند و تأیید می‌کند کل سیستم با هم کار می‌کند.

End-to-end testی مثل این تور ایمنی نهایی ما هستند. اگر این test pass کند، اطمینان قوی داریم که اپلیکیشن‌مان در production کار می‌کند. اما معمولاً به تعداد زیادی از این‌ها نیاز نداریم چون setup و اجرایشان گران‌تر و پیچیده‌تر است، پس یک یا دو smoke test جامع که مسیرهای critical را پوشش دهند معمولاً کافی است بسته به پیچیدگی اپلیکیشن.

با unit test برای logic پیچیده، integration test برای featureها، و end-to-end test برای journeyهای critical، استراتژی test داریم که باگ‌ها را در چند سطح شناسایی می‌کند در حالی که test suite ما قابل نگهداری و سریع باقی می‌ماند.

## خلاصه {#h1_285}

در این فصل یاد گرفتیم چگونه با سه رویکرد مکمل اپلیکیشن‌مان را تست کنیم. هر نوع test هدف متفاوتی دارد و با هم یک استراتژی test جامع می‌سازند.

با unit test شروع کردیم که تأیید می‌کنند function، hook و componentهای منفرد به‌صورت مستقل درست کار می‌کنند. این testها سریع و متمرکز هستند و برای تست utility function و logic پیچیده‌ای که به‌صورت دیگر تست کردنش سخت است عالی هستند.

سپس به integration test رسیدیم که نحوهٔ کار بخش‌های مختلف اپلیکیشن‌مان با هم را تست می‌کنند. این ارزشمندترین testها برای بیشتر اپلیکیشن‌ها هستند چون سناریوهای واقعی را بدون burden نگهداری end-to-end test تأیید می‌کنند. فقط لایهٔ API را mock کردن به ما اجازه می‌دهد دقیقاً اپلیکیشن را همان‌طور که کاربران تجربه می‌کنند تست کنیم در حالی که testهای سریع و قابل اعتماد حفظ می‌کنیم.

در نهایت، end-to-end test را پوشش دادیم که تأیید می‌کنند کل سیستم از ابتدا تا انتها کار می‌کند. این testها نگهداریشان گران است، پس selectiver برای journeyهای critical کاربر استفاده می‌کنیم. وقتی pass می‌کنند، اطمینان می‌دهند اپلیکیشن‌مان در production کار می‌کند.

نکتهٔ کلیدی تمرکز بیشتر تلاش test روی integration test، استفاده از unit test برای logic پیچیدهٔ مستقل، و reserve کردن end-to-end test برای مهم‌ترین flowهای کاربر است. این رویکرد متوازن اطمینان قوی بدون کند کردن توسعه به ما می‌دهد.

با یک استراتژی test محکم در جای خود، می‌توانیم code را refactor کنیم، feature جدید اضافه کنیم و باگ fix کنیم و بدانیم testهایمان هر regressionای را شناسایی می‌کنند. این چیزی است که به ما اجازه می‌دهد سریع حرکت کنیم در حالی که اپلیکیشن‌مان قابل اعتماد باقی می‌ماند.

## دریافت نسخهٔ PDF کتاب، bundle کد و موارد دیگر {#h1_286}

کد QR را اسکن کنید (یا به [packtpub.com/unlock](https://packtpub.com/unlock) بروید). کتاب را بر اساس نام جستجو کنید، edition را تأیید کنید و سپس مراحل صفحه را دنبال کنید.

*توجه: فاکتور خود را در دست داشته باشید. خریدهای انجام‌شده مستقیماً از وب‌سایت Packt نیازی به فاکتور ندارند.*
