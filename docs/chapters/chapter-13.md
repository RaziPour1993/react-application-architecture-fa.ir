# فصل ۱۳: تکامل اپلیکیشن

در این مرحله، یک اپلیکیشن React کامل از صفر ساخته‌ایم و آن را تا مرحلهٔ production برده‌ایم. معماری محکمی داریم، تست‌های خودکار، pipeline CI/CD و deploy زنده داریم.

اما رسیدن به production فقط شروع مسیر است. اپلیکیشن‌های واقعی تکامل می‌یابند. تیم‌ها رشد می‌کنند. نیازمندی‌ها تغییر می‌کنند. این فصل موضوعاتی را معرفی می‌کند که به‌طور طبیعی با بلوغ اپلیکیشن مطرح می‌شوند.

موضوعات زیر را پوشش می‌دهیم:

- استفاده از AI برای اعمال معماری اپلیکیشن
- React Server Components
- monitoring و observability اپلیکیشن
- feature flag و A/B testing
- مقیاس‌پذیری لایه API
- monorepo
- microfrontend

در پایان این فصل، می‌دانیم هر کدام از این موضوعات چه چیزی را حل می‌کنند، چه زمانی ارزش بررسی دارند و برای کسب اطلاعات بیشتر به کجا مراجعه کنیم.

## استفاده از AI برای اعمال معماری اپلیکیشن {#h1_309}

همهٔ ما تا حدی از ابزارهای AI برای تولید بخش‌هایی از کد استفاده می‌کنیم. با این حال یکی از کم‌ارجاع‌ترین کاربردهای AI در برنامه‌نویسی تولید کد نیست، بلکه حفظ معماری‌ای است که از پیش تعریف کرده‌ایم. با رشد codebase، الگوها ممکن است منحرف شوند. یک component چیزی را import می‌کند که نباید. یک feature مستقیماً به internalهای feature دیگری دسترسی پیدا می‌کند و isolation feature‌ها را نقض می‌کند. این نقض‌های کوچک در طول زمان جمع می‌شوند تا جایی که معماری فقط در ذهن افراد وجود دارد.

البته، قبلاً ابزارهای linting، testing و type checking را پیکربندی کرده‌ایم تا بعضی از این نقض‌ها را بگیرند، اما اگر از AI استفاده می‌کنیم باید به آن بگوییم معماری‌ای که می‌خواهیم اعمال کنیم چیست و کد تولیدشده چگونه باید در آن جا بگیرد.

AI می‌تواند بسیار کارآمد و مفید باشد، اما فقط به شرطی که محدودیت‌هایی را که تعیین کرده‌ایم بفهمد.

### درک mental model درست {#h2_310}

می‌توانیم AI را به‌عنوان یک توسعه‌دهندهٔ بسیار capable تصور کنیم که تازه به تیم پیوسته. باهوش و سریع است، اما هیچ ایده‌ای دربارهٔ تصمیم‌های معماری خاصی که گرفته‌ایم ندارد. بدون context، کدی می‌نویسد که کار می‌کند اما ممکن است با الگوهایی که تعیین کرده‌ایم سازگار نباشد.

نکتهٔ کلیدی این است که AI باید محدودیت‌های ما را بفهمد، نه فقط کدمان را. وقتی معماری‌مان را به‌وضوح توصیف می‌کنیم — مثلاً چه لایه‌هایی وجود دارد، چه چیزی به چه چیزی وابسته است و logic خاص در کجا قرار دارد — می‌توانیم از AI استفاده کنیم تا کدی تولید کند که واقعاً جا بگیرد.

### فایل‌های context {#h2_311}

هر ابزار AI برنامه‌نویسی بزرگ مکانیزمی برای خواندن دستورالعمل‌های سطح پروژه دارد — یک فایل markdown متنی ساده در ریشهٔ repository که ابزار خودکار آن را شناسایی می‌کند. نام فایل مشخص متفاوت است: Cursor از `.cursorrules` استفاده می‌کند، Claude Code فایل `CLAUDE.md` را می‌خواند، GitHub Copilot فایل `.github/copilot-instructions.md` را می‌خواند و بقیه هر کدام قرارداد خودشان را دارند و این قراردادها با تکامل ابزارها تغییر می‌کنند.

ایدهٔ زیربنایی برای همهٔ ابزارها یکسان است. فایلی را که ابزار فعلی‌تان انتظار دارد انتخاب کنید، ruleها را در آن بنویسید و آن را مثل هر فایل source دیگری مدیریت کنید: version control داشته باشید، review کنید و همراه کدی که توصیف می‌کند به‌روزرسانی کنید. اگر تیم‌تان از چند ابزار استفاده می‌کند، ساده‌ترین رویکرد داشتن یک فایل معتبر واحد و symlink یا کپی کردن آن به هر نامی است که هر ابزار انتظار دارد.

### نوشتن ruleهای مؤثر {#h2_312}

کیفیت خروجی AI به دقت ruleهایی که به آن داده می‌شود بستگی دارد. راهنمای مبهم نتایج مبهم تولید می‌کند.

این یک rule ضعیف است:

```programlisting
Abstract API calls. Do not make them directly in components.
```

اگر از AI بخواهیم کدی بسازد که API call انجام دهد و از rule ضعیف ما استفاده کند، احتمالاً API call را مستقیماً انجام نمی‌دهد، اما دستورالعمل بیشتری دربارهٔ نحوهٔ abstract کردن آن وجود ندارد، یعنی راه‌های زیادی برای انجام آن هست. در عوض، می‌توانیم از rule قوی‌تری استفاده کنیم:

```programlisting
Abstract API calls. Never call fetch() directly in a component or hook. All API calls go through src/lib/api.ts using its HTTP verb methods (api.get, api.post, etc.). Every file in src/features/<name>/api/ exports exactly three things: a fetcher function that validates input and output with Zod, a query options factory for use in loaders and tests, and a custom hook that wraps the options factory with useQuery or useMutation.
```

rule قوی محدودیت دقیق، جایگزین درست و شکل مورد انتظار کد نتیجه را مشخص می‌کند. AI می‌تواند آن را به‌طور قابل اعتماد اعمال کند. rule ضعیف به قضاوتی نیاز دارد که AI ندارد.

ساختار مفید برای هر rule:

- **چه چیزی لازم است**: رفتار مثبت و مکان آن
- **چه چیزی ممنوع است**: anti-pattern صریحی که باید اجتناب شود
- **چرا**: دلیل مختصر که به AI کمک می‌کند دربارهٔ edge case‌ها به‌درستی استدلال کند

همچنین ارزش دارد ruleهایی دربارهٔ آنچه *نباید* انجام شود بگنجانیم، نه فقط آنچه باید انجام شود. منع‌های صریح مانند «هرگز `fetch()` را مستقیماً از component فرا نخوانید» معمولاً مؤثرتر از توصیف‌های مثبت به‌تنهایی هستند چون رایج‌ترین میانبر را متوقف می‌کنند.

نسخهٔ خلاصه‌شدهٔ یک فایل context پروژه این‌طور به نظر می‌رسد:

```programlisting
# Architecture Guide

## Feature Isolation

Features follow a unidirectional dependency graph enforced by ESLint's
`import/no-restricted-paths` rule in `infra/eslint-import-rules.js`.
Features may only import from other features if explicitly listed in
`allowedFeatures` in that file. If code is needed by multiple features,
move it to the shared layer instead.

## Data Fetching

Abstract API calls. Never call `fetch()` directly in a component. All API calls go through `src/lib/api.ts`. Every file in `src/features/<name>/api/` exports
three things: a fetcher function (Zod-validated in and out), a query
options factory, and a custom hook.

...
```

### موارد کاربرد عملی {#h2_313}

چند جا هست که اعمال AI می‌تواند مفید باشد:

- **Code review**: diff را paste کنید و از AI بخواهید آن را با ruleهای معماری بررسی کند. اغلب می‌تواند نقض‌هایی را بگیرد که reviewerها از دست می‌دهند چون روی logic تغییر تمرکز کرده‌اند.
- **Scaffolding**: از AI بخواهید یک component، utility، API call یا test suite جدید را با الگوهای established ایجاد کند. با context خوب، ساختار پوشهٔ درست را ایجاد می‌کند، فایل‌ها را در مکان درست قرار می‌دهد و قراردادهای نام‌گذاری را رعایت می‌کند.
- **Refactoring**: تغییرات را توصیف کنید و از AI بخواهید بدون تغییر رفتار آن‌ها را پیاده‌سازی کند. این کار خسته‌کننده‌ای است که AI خوب از پس آن برمی‌آید.
- **Onboarding**: اعضای جدید تیم می‌توانند از AI بخواهند ساختار پروژه را توضیح دهد یا یک feature را مرور کند و پاسخ‌هایی دریافت کنند که الگوهای واقعی را بازتاب دهد نه توصیه‌های generic.

در همهٔ این موارد، AI زمانی بیشترین مفید بودن را دارد که ruleها مشخص باشند. هرچه دقیق‌تر توصیف کنیم چه چیزی کجاست و چرا، AI آن تصمیم‌ها را مطمئن‌تر اعمال می‌کند.

### به‌روز نگه‌داشتن ruleها {#h2_314}

باید مطمئن شویم فایل context به‌طور منظم به‌روزرسانی می‌شود. فایل contextی که ماه‌هاست به‌روز نشده ممکن است از عدم وجود فایل هم بدتر باشد. AI با اطمینان ruleهایی را اعمال می‌کند که دیگر صادق نیستند و کدی تولید می‌کند که الگوهای رهاشده را دنبال می‌کند.

مدیریت فایل rule به‌عنوان مستندات زنده کمک می‌کند. یک رویکرد خوب به‌روزرسانی آن به‌عنوان بخشی از هر pull request‌ای است که یک قرارداد معماری را تغییر می‌دهد، جایی که همان PR که الگوی جدیدی معرفی می‌کند باید rule توصیف‌کنندهٔ آن را اضافه کند. code review نقطهٔ بازبینی مناسب است: اگر PR جایی را که logic خاصی زندگی می‌کند تغییر دهد، reviewer باید بپرسد آیا فایل rule قرارداد جدید را بازتاب می‌دهد یا نه.

با معماری در جایگاه بهتر، بیایید نگاهی به حوزهٔ دیگری بیندازیم که با بلوغ اپلیکیشن فزاینده مهم می‌شود: عملکرد و رفتار اپلیکیشن برای کاربران واقعی در production.

## React Server Components {#h1_315}

**React Server Components** (**RSC**) مدل نسبتاً جدیدی است که جای اجرای componentهای React را تغییر می‌دهد. به‌طور سنتی، همهٔ componentهای React در مرورگر اجرا می‌شوند. با RSC، بعضی componentها فقط روی server اجرا می‌شوند؛ می‌توانند داده fetch کنند، مستقیماً به database دسترسی پیدا کنند و هرگز JavaScript خود را به client نفرستند.

### چرا Server Component؟ {#h2_316}

جذابیت اصلی performance است. وقتی component روی server اجرا می‌شود، مرورگر نیازی ندارد bundle JavaScript آن را دانلود کند، منتظر اجرایش بماند و سپس داده fetch کند. server کار را انجام می‌دهد و HTML تمام‌شده را برمی‌گرداند. این به‌خصوص برای صفحات محتوا-محور یا بخش‌هایی از UI که نیاز به interactivity ندارند ارزشمند است.

mental model کمی زمان می‌برد تا عادت کنید چون boundary روشنی بین server component (data fetching، بدون hook، بدون browser API) و client component (interactive، قابلیت استفاده از state و effects) وجود دارد. اشتباه گرفتن این boundary خطاهای گیج‌کننده تولید می‌کند.

اگر اپلیکیشنی می‌سازید که performance بارگذاری اولیهٔ صفحه حیاتی است یا می‌خواهید data fetching را با اجرای نزدیک‌تر به database ساده‌تر کنید، RSC ارزش بررسی دارد. مستندات رسمی React در https://react.dev/reference/rsc/servercomponents و مقالهٔ Josh Comeau در https://www.joshwcomeau.com/react/server-components/ هر دو نقطهٔ شروع خوبی هستند. shift ذهنی لازم را در نظر بگیرید و وقتی فهمیدید boundary server/client کجاست، بیشتر سردرگمی‌ها برطرف می‌شود.

## Monitoring و observability اپلیکیشن {#h1_317}

رسیدن به production زمانی است که شگفتی‌های واقعی شروع می‌شوند. کاربران با edge case‌هایی روبه‌رو می‌شوند که هرگز فکر تستشان را نکرده‌ایم. خطاها روی دستگاه‌ها و مرورگرهایی رخ می‌دهند که نداریم و هرگز اپلیکیشن را رویشان تست نکرده‌ایم. صفحات تحت شرایطی که نمی‌توانیم locally بازتولید کنیم کند بارگذاری می‌شوند.

observability راهی است که قبل از ناامید شدن کاربران و ترک سایت از این مشکلات باخبر شویم.

### ردیابی خطا با Sentry {#h2_318}

**Sentry** رایج‌ترین ابزار error tracking در اکوسیستم JavaScript است. exceptionهای مدیریت‌نشده را capture می‌کند، stack trace، مرورگر و دستگاه کاربر، URLای که روی آن بوده و درخواست‌های network اخیر را ضبط می‌کند — همهٔ چیزی که برای بازتولید و رفع مشکل لازم است.

اضافه کردن Sentry به یک اپلیکیشن React چند دقیقه طول می‌کشد. بعد از نصب SDK و مقداردهی اولیه با DSN (شناسهٔ پروژه‌ای که از dashboard Sentry دریافت می‌کنیم)، خطاها خودکار capture می‌شوند:

```programlisting
// src/app/entry.client.tsx

import * as Sentry from "@sentry/react-router";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";
Sentry.init({
  dsn: "https://examplePublicKey@o0.ingest.sentry.io/0",
  sendDefaultPii: true,
});
startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <HydratedRouter />
    </StrictMode>,
  );
});
```

از آنجا، Sentry خطاهای مشابه را گروه‌بندی می‌کند، تکرار آن‌ها را ردیابی می‌کند و می‌تواند از طریق Slack، email یا PagerDuty وقتی چیز جدیدی خراب شد به ما هشدار دهد.

![شکل ۱۳.۱ — داشبورد error tracking Sentry](/images/B31385_13_1.png)

**شکل ۱۳.۱ — داشبورد error tracking Sentry**

برای بیشتر اپلیکیشن‌های production، این اولین ابزار monitoring ارزشمندی است که باید اضافه شود.

### Monitoring عملکرد {#h2_319}

فراتر از خطاها، می‌خواهیم بفهمیم اپلیکیشن برای کاربران واقعی چقدر سریع به نظر می‌رسد. Web Vitals مجموعه‌ای از معیارهاست که توسط Google تعریف شده و بخش‌هایی از performance را اندازه می‌گیرد که کاربران واقعاً متوجه می‌شوند:

- **LCP (Largest Contentful Paint)** — محتوای اصلی چقدر سریع بارگذاری می‌شود
- **CLS (Cumulative Layout Shift)** — صفحه چقدر در حین بارگذاری جابه‌جا می‌شود
- **INP (Interaction to Next Paint)** — صفحه چقدر سریع به عملکردهای کاربر پاسخ می‌دهد

Sentry خودکار Web Vitals را وقتی monitoring عملکرد فعال باشد capture می‌کند. به‌جای آن، Lighthouse CI می‌تواند auditهای performance را به‌عنوان بخشی از pipeline CI اجرا کند و build را اگر امتیازها زیر آستانه‌ای سقوط کنند fails کند.

### Logging ساخت‌یافته و alertها {#h2_320}

logging ساخت‌یافته یعنی الحاق metadata یکسان به هر خطا یا رویدادی که می‌خواهید ردیابی کنید. log غیرساخت‌یافته‌ای مثل این:

```programlisting
console.error("Something went wrong");
```

این capture و ذخیره می‌شود اما چیز مفیدی به شما نمی‌گوید. نمی‌توانید بر اساس کاربر، route یا component فیلتر کنید، فقط یک رشته در انبوهی از داده است. با ارسال یک object ساخت‌یافته به‌جای آن، هر فیلد به‌صورت جداگانه index می‌شود:

```programlisting
console.error("Something went wrong", {
  route: "/dashboard",
  componentName: "Dashboard",
  userId: "123",
});
```

حالا می‌توانید همهٔ خطاها را از یک component خاص جستجو کنید، بر اساس کاربر فیلتر کنید و وقتی نرخ خطا بعد از deploy افزایش یافت alert تنظیم کنید.

برای مفید بودن در production، این logها باید جایی ذخیره شوند تا بتوانیم آن‌ها را مرور کنیم. ابزارهایی مثل Datadog و New Relic SDKهای مرورگر ارائه می‌دهند که خودکار فراخوانی‌های `console` را intercept می‌کنند و آن‌ها را به پلتفرمشان ارسال می‌کنند جایی که قابل query و alert هستند.

## Feature flag {#h1_321}

**Feature flag** راهی برای کنترل اینکه کدام کاربران کدام featureها را در runtime ببینند بدون deploy کردن کد جدید است. به‌جای release کردن یک feature به همهٔ کاربران به‌یک‌باره، آن را در یک flag check می‌پیچانیم. flag به‌طور پیش‌فرض خاموش است. می‌توانیم ابتدا آن را برای کاربران internal روشن کنیم، سپس درصد کوچکی از کاربران واقعی و در نهایت همه.

این چند مزیت مهم دارد. deployment را از release جداسازی می‌کند، بنابراین می‌توانیم کد را زودتر merge کنیم بدون نمایان کردن featureهای ناقص. rollback را آنی می‌کند؛ اگر مشکلی پیش آمد، flag را برعکس می‌کنیم به‌جای revert کردن deploy.

### پیاده‌سازی ساده در برابر ابزار اختصاصی {#h2_322}

برای تعداد کمی flag، می‌توانیم با environment variable یا یک database table ساده شروع کنیم. flag فقط یک boolean است که قبل از render کردن چیزی چک می‌کنیم:

```programlisting
// src/lib/flags.ts

export const flags = {
  newIdeaDashboard: import.meta.env.VITE_FLAG_NEW_IDEA_DASHBOARD === 'true',
};

// src/components/dashboard.tsx

import { flags } from "@/lib/flags";

function Dashboard() {
  if (!flags.newIdeaDashboard) return <LegacyDashboard />;

  return <NewIdeaDashboard />;
}
```

این برای چند flag خوب کار می‌کند اما خوب scale نمی‌شود. وقتی flagها زیاد می‌شوند، می‌خواهیم بتوانیم بدون دوباره deploy کردن آن‌ها را toggle کنیم، کاربران یا segmentهای خاصی را هدف بگیریم و audit کنیم چه کسی چه چیزی و چه زمانی تغییر داده.

ابزارهای اختصاصی مثل LaunchDarkly و Flagsmith همهٔ این‌ها را فراهم می‌کنند. SDKهای React دارند که flag evaluation، به‌روزرسانی real-time و targeting rule را مدیریت می‌کنند.

مثال مشابه با Flagsmith:

```programlisting
// src/components/dashboard.tsx
import { useFlags } from "flagsmith/react";

function Dashboard() {
  const { new_idea_dashboard } = useFlags(["new_idea_dashboard"]);

  if (!new_idea_dashboard.enabled) return <LegacyDashboard />;

  return <NewIdeaDashboard />;
}
```

flag با غیرفعال شروع می‌شود. مثلاً می‌توانیم ابتدا آن را برای کاربران internal فعال کنیم و سپس به‌تدریج آن را برای همه rollout کنیم، همه از dashboard Flagsmith، بدون دست زدن به کد.

### A/B testing {#h2_323}

Feature flag پایهٔ **A/B testing** هم هست. به‌جای flag سادهٔ روشن/خاموش، کاربران را به variant A یا variant B اختصاص می‌دهیم و بر اساس معیارهای جمع‌آوری‌شده اندازه می‌گیریم کدام عملکرد بهتری دارد. بیشتر ابزارهای اختصاصی feature flag به‌طور native از این پشتیبانی می‌کنند. اگر قبلاً از flag برای deployهای ایمن استفاده می‌کنید، اضافه کردن experimentation روی آن یک قدم کوچک است.

```programlisting
// src/components/dashboard.tsx
import { useFlags } from "flagsmith/react";

function Dashboard() {
  const { new_idea_dashboard } = useFlags(["new_idea_dashboard"]);

  if (!new_idea_dashboard.enabled) return <LegacyDashboard />;

  if (new_idea_dashboard.value === "A") return <NewIdeaDashboardA />;
  if (new_idea_dashboard.value === "B") return <NewIdeaDashboardB />;
}
```

Flagsmith به‌طور ثابت هر کاربر را به یک variant اختصاص می‌دهد، بنابراین کاربر همیشه همان تجربه را می‌بیند. engagement بین دو variant را در ابزار analytics خود مقایسه می‌کنیم و برنده را با به‌روزرسانی flag برای همه rollout می‌کنیم.

## مقیاس‌پذیری لایه API {#h1_324}

REST API برای بیشتر اپلیکیشن‌ها خوب کار می‌کند، اما با رشد اپلیکیشن‌ها، دو چالش ظاهر می‌شوند. اول، frontend به دادهٔ بیشتری نیاز دارد تا آنچه هر REST endpoint فراهم می‌کند، که منجر به درخواست‌های متعدد round-trip (under-fetching) یا endpointهای متورمی می‌شود که همه‌چیز را فقط برای احتیاط برمی‌گردانند (over-fetching). دوم، clientهای مختلف (web، mobile، third-party) به دادهٔ یکسانی با شکل متفاوت نیاز دارند.

### الگوی BFF {#h2_325}

الگوی **Backend for Frontend (BFF)** هر دو مشکل را با اضافه کردن یک لایهٔ API نازک که جلوی backend ما نشسته و مخصوص نیازهای یک client خاص طراحی شده حل می‌کند.

به‌جای یک API generic که همهٔ clientها مشترک هستند، هر client BFF خودش را دارد. BFF web دقیقاً می‌داند web app به چه داده‌ای نیاز دارد و آن را در یک درخواست aggregate می‌کند. اگر دادهٔ زیربنایی از سه سرویس متفاوت می‌آید، BFF fan-out را مدیریت می‌کند و یک response ترکیب‌شدهٔ واحد برمی‌گرداند. نمودار زیر نشان می‌دهد این بین clientها و backend چگونه قرار می‌گیرد:

![شکل ۱۳.۲ — الگوی BFF](/images/B31385_13_2.png)

**شکل ۱۳.۲ — الگوی BFF**

در این تنظیم، هر client فقط با BFF خودش صحبت می‌کند. BFF شکل‌دهی مجدد داده از سرویسهای backend را مدیریت می‌کند و دقیقاً چیزی را که آن client نیاز دارد در یک response برمی‌گرداند.

این backend serviceها را تمیز و generic نگه می‌دارد در حالی که دقیقاً چیزی را که هر client نیاز دارد فراهم می‌کند. نقطهٔ ضعف کد بیشتری است که باید نگهداری شود چون لایهٔ دیگری بین client و backend اضافه می‌کنیم. زمانی بیشترین منطق را دارد که clientهای متعدد با نیازهای متفاوت از backend یکسان فراخوانی می‌کنند.

وقتی آن clientهای متعدد شروع به ظاهر شدن می‌کنند (یک web app، یک mobile app، شاید یک API عمومی)، سؤال نحوهٔ سازمان‌دهی کل کد مرتبط شروع به اهمیت کردن می‌کند. آنجاست که monorepo مرتبط می‌شود.

## Monorepo {#h1_326}

با رشد پروژه‌ها، رایج است که به چند codebase مرتبط برسید: web app اصلی، app داشبورد، mobile app، کتابخانهٔ component، typeهای TypeScript مشترک و توابع utility. وقتی این‌ها در repositoryهای جداگانه زندگی می‌کنند، همگام نگه‌داشتن آن‌ها دردناک می‌شود. تغییر در کتابخانهٔ component نیاز به به‌روزرسانی، versioning، publishing و نصب نسخهٔ جدید در همهٔ consumer دارد. تغییر شکستنی در typeهای مشترک نیاز به هماهنگی بین چند تیم دارد.

**Monorepo** یک repository واحد است که چند اپلیکیشن و package را شامل می‌شود. تغییرات کد با هم رخ می‌دهند، بنابراین تغییر شکستنی و همهٔ consumerهایی که نیاز به به‌روزرسانی دارند می‌توانند در یک pull request واحد باشند. نمودار زیر نشان می‌دهد در practice چه شکلی است:

![شکل ۱۳.۳ — monorepo با چند اپلیکیشن](/images/B31385_13_3.png)

**شکل ۱۳.۳ — monorepo با چند اپلیکیشن**

اینجا هر app package خودش است، اما همه از packageهای مشترک در همان repository کد مشترک دارند. تغییر در یک package مشترک فوراً برای هر app در دسترس است بدون cycle publish-and-install.

### اشتراک package بین appها {#h2_327}

ایدهٔ اصلی monorepo اشتراک کد بین اپلیکیشن‌هاست. candidateهای رایج:

- **کتابخانهٔ UI component** — componentهای React مشترک که توسط چند app استفاده می‌شوند
- **TypeScript type** — typeهای پاسخ API که بین frontend و backend مشترک هستند
- **توابع utility** — قالب‌بندی تاریخ، validation و helperهای دیگر

هر کدام از این‌ها به‌عنوان package خودش در monorepo زندگی می‌کنند. اپلیکیشن‌ها آن‌ها را مثل هر dependency دیگری import می‌کنند، اما تغییرات بلافاصله در deploy جدید منعکس می‌شوند بدون نیاز به ارتقای dependencyها. این چیزها را consistent نگه می‌دارد و احتمال عدم هماهنگی اپلیکیشن‌ها را کم می‌کند. همچنین خطر تغییرات شکستنی را به همراه دارد که می‌توانند بلافاصله بعد از deploy منتشر شوند، پس باید مراقب باشیم.

## Microfrontend {#h1_328}

می‌توانیم **microfrontend** را به‌عنوان microservice برای frontend تصور کنیم. به‌جای اینکه یک تیم مالک کل frontend باشد، تیم‌های مختلف مالک بخش‌های مختلف اپلیکیشن هستند. هر تیم slice خود را مستقل build و deploy می‌کند. نمودار زیر نشان می‌دهد این تقسیم چه شکلی است:

![شکل ۱۳.۴ — معماری microfrontend](/images/B31385_13_4.png)

**شکل ۱۳.۴ — معماری microfrontend**

هر تیم مالکیت کامل روی slice خود، codebase خود، pipeline خود و فرآیند deploy خود دارد. یک shell application sliceها را در runtime به هم می‌دوزد.

### چه زمانی microfrontend منطقی است {#h2_329}

Microfrontend بیشتر یک مشکل سازمانی را حل می‌کند تا فنی. اگر یک تیم واحد بتواند کل frontend را delivery دهد، monolith ساده‌تر است. Microfrontend زمانی ارزش بررسی پیدا می‌کند که:

- چند تیم بزرگ نیاز به deploy مستقل frontend بدون هماهنگی release دارند
- بخش‌های مختلف اپلیکیشن نیازمندی‌های فناوری متفاوت دارند
- frontend آن‌قدر بزرگ شده که زمان build و navigation در codebase تیم‌ها را کند می‌کند

برای بیشتر اپلیکیشن‌ها، این نقطه هرگز نمی‌رسد. معرفی زودهنگام پیچیدگی microfrontend نمونهٔ کلاسیک over-engineering است.

### Trade-offهایی که قبل از پذیرش باید بدانید {#h2_330}

Microfrontend هزینه‌های واقعی دارد:

- **پیچیدگی عملیاتی** — هر microfrontend یک deploy جداگانه با pipeline، versioning و monitoring خودش است
- **Dependencyهای مشترک** — مدیریت کتابخانه‌های مشترک بین appهای مستقل deploy شده سخت است. عدم تطابق version می‌تواند باگهای ظریف یا bundleهای متورم ایجاد کند
- **UX یکسان** — حفظ ظاهر و حس یکسان بین تیم‌ها نیاز به هماهنگی دارد، معمولاً از طریق design system مشترک
- **Performance** — بارگذاری چند bundle مستقل در runtime overhead دارد که باید دقیق مدیریت شود

تیم‌هایی که با microfrontend موفق می‌شوند معمولاً قبل از تقسیم frontend سنگین در زیرساخت مشترک (design system، ابزار deployment، contract testing) سرمایه‌گذاری می‌کنند. بدون آن بنیان، مزایای سازمانی بر پیچیدگی اضافه‌شده سنگینی نمی‌کنند.

## خلاصه {#h1_331}

در این فصل چند موضوع را بررسی کردیم که با بلوغ اپلیکیشن فراتر از launch اولیه مرتبط می‌شوند.

با استفاده از AI برای اعمال معماری شروع کردیم و دیدیم فایل‌های context چگونه به ابزارهای AI محدودیت‌هایی را می‌دهند که برای تولید کدی که با الگوهای established جا بگیرد لازم است. پوشش دادیم چه چیزی rule را مؤثر می‌کند: مشخص بودن، منع‌های صریح، دلیل واضح و چرا به‌روز نگه‌داشتن ruleها به اندازهٔ نوشتن اولیه‌شان مهم است.

از آنجا، React Server Components و چگونگی تغییر انتقال rendering به server مدل performance و data fetching را بررسی کردیم، سپس monitoring و observability اپلیکیشن را پوشش دادیم: capture خطا با Sentry، ردیابی Web Vitals و ساختاردهی logها طوری که در production قابل query باشند.

سپس feature flag را به‌عنوان راهی برای جداسازی deployment از release بررسی کردیم که rollout ایمن و rollback آنی بدون deploy کامل مجدد را ممکن می‌سازد. دیدیم چگونه همان مکانیزم به‌طور طبیعی به A/B testing گسترش می‌یابد.

در نهایت، الگوهای مقیاس‌پذیری لایه API با الگوی BFF، سازمان‌دهی چند codebase مرتبط با monorepo و تقسیم مالکیت frontend بین تیم‌ها با microfrontend را بررسی کردیم، همراه با trade-offها و سیگنالهای سازمانی که نشان می‌دهند هر کدام چه زمانی ارزش پیچیدگی اضافه‌شده را دارند.

همهٔ این‌ها همیشه به یک اندازه مرتبط نیستند. حرکت درست این است که بدانیم وجود دارند، سیگنالهایی را که نشان می‌دهند یک موضوع ارزش سرمایه‌گذاری پیدا کرده بشناسیم و وقتی زمان رسید عمیق شویم. codebase‌ای که در طول این کتاب ساخته‌ایم بنیان محکمی برای هر کدام از این جهات است.

به یاد داشته باشید، نرم‌افزار خوب هرگز تمام نمی‌شود؛ تکامل می‌یابد. به iterate کردن ادامه دهید، به یاد گرفتن ادامه دهید و چیزهایی بسازید که ارزش ساختن داشته باشند.
