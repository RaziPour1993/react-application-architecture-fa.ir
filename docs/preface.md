# پیش‌گفتار

ساخت اپلیکیشن‌های بزرگ در production با React می‌تواند به‌دلیل تعداد انتخاب‌ها و نبود منابع منسجم، طاقت‌فرسا باشد. این راهنمای عملی برای به‌اشتراک گذاشتن practiceها و مثال‌ها طراحی شده تا در ساخت اپلیکیشن‌های enterprise-ready با React به این چالش‌ها کمک کند.

در این کتاب، ابتدا اصول معماری پشت اپلیکیشن‌های React مقیاس‌پذیر را بحث می‌کنیم. سپس بنیاد پروژه را با Vite، TypeScript، ESLint، Prettier و Husky می‌چینیم و آن را با ساختار پوشهٔ مبتنی بر feature سازمان‌دهی می‌کنیم. بعد componentهای قابل استفادهٔ مجدد و مستندشده را با Shadcn UI و Storybook می‌سازیم و یاد می‌گیریم routing و استراتژی‌های rendering — از جمله pre-rendering، SSR، CSR و رویکرد hybrid با React Router در framework mode — را handle کنیم.

وقتی بنیادها آماده شد، پوشش می‌دهیم چگونه با APIها به‌صورت type-safe با typeهای تولیدشده از OpenAPI، validation با Zod و React Query برای server state ارتباط برقرار کنیم. ابزار مناسب state management را برای هر use case بررسی می‌کنیم — local state، global state، form state و URL state — پیش از پیاده‌سازی authentication مبتنی بر cookie، authorization policy و practiceهای امنیت محتوا.

در پایان، کیفیت اپلیکیشن را با بهینه‌سازی performance از طریق memoization، code splitting و streaming بهبود می‌دهیم، internationalization با react-i18next اضافه می‌کنیم، با پیروی از اصول WCAG accessibility را تضمین می‌کنیم و test suite جامعی با Vitest و Playwright می‌نویسیم. با راه‌اندازی pipeline CI/CD با GitHub Actions تمام می‌کنیم و به موضوعات پیشرفته‌ای مثل enforce کردن معماری با AI، React Server Components، feature flag، monorepo و microfrontend می‌پردازیم.

در پایان کتاب، می‌توانید با پیروی از practiceهای صنعتی و نکات کارشناسان، به‌طور مؤثر اپلیکیشن‌های production-ready بسازید.

## این کتاب برای چه کسانی است {#h1_2}

این کتاب برای توسعه‌دهندگان وب در سطح intermediate است که درک خوبی از JavaScript، React و توسعهٔ web به‌طور کلی دارند و می‌خواهند اپلیکیشن‌های React در مقیاس بزرگ را به‌طور مؤثر بسازند. علاوه بر تجربه با JavaScript و React، مقداری تجربه با TypeScript مفید خواهد بود.

## این کتاب چه موضوعاتی را پوشش می‌دهد {#h1_3}

*[فصل ۱، درک معماری اپلیکیشن‌های React](/chapters/chapter-01)*، بررسی می‌کند چگونه از منظر معماری به اپلیکیشن‌ها فکر کنیم. با پوشش اهمیت معماری خوب و مزایای آن شروع می‌کند. سپس بعضی practiceهای بد و خوب در اپلیکیشن‌های React را می‌پوشاند. در پایان، برنامه‌ریزی یک اپلیکیشن React واقعی — **AI Ideas Community Platform** — را که در سراسر کتاب می‌سازیم، پوشش می‌دهد.

*[فصل ۲، راه‌اندازی و ساختار پروژه](/chapters/chapter-02)*، چیدن بنیاد پروژه با همهٔ ابزارها و setup لازم برای اپلیکیشنی که می‌سازیم را پوشش می‌دهد. ابزارهایی مثل React Router، Vite، TypeScript، ESLint، Prettier و Husky را معرفی می‌کند. در پایان، ساختار پروژهٔ مبتنی بر feature را که سازمان‌دهی codebase را بهبود می‌دهد، پوشش می‌دهد.

*[فصل ۳، ساخت و مستندسازی کامپوننت‌ها](/chapters/chapter-03)*، اصول طراحی component و Shadcn UI — کتابخانهٔ copy-paste component ساخته‌شده روی primitiveهای Radix UI — را معرفی می‌کند. نحوهٔ setup و استفاده از آن برای ساخت componentهای قابل استفادهٔ مجدد که در سراسر اپلیکیشن برای یکدست نگه داشتن UI به کار می‌روند را پوشش می‌دهد. در پایان، مستندسازی آن componentها با Storybook را یاد می‌گیریم.

*[فصل ۴، مسیریابی و استراتژی‌های رندر](/chapters/chapter-04)*، عمیق‌تر به React Router در framework mode و استراتژی‌های مختلف rendering می‌پردازد. ابتدا مبانی مثل routing، nested layout و data prefetching با loader را پوشش می‌دهد. سپس استراتژی‌های rendering پشتیبانی‌شده را بررسی می‌کند: pre-rendering، SSR، CSR و hybrid. در پایان، با ساخت routeها و layoutهای اپلیکیشن، این مفاهیم را به کار می‌بریم.

*[فصل ۵، ارتباط با API](/chapters/chapter-05)*، گام‌به‌گام نحوهٔ ارتباط type-safe با backend API را توضیح می‌دهد. ابتدا یاد می‌گیریم چگونه typeهای TypeScript را از specification OpenAPI تولید کنیم و پاسخ‌های API را در runtime validate کنیم. سپس React Query را configure می‌کنیم و با آن لایهٔ API اپلیکیشن را می‌سازیم — شامل query، mutation و cache invalidation.

*[فصل ۶، مدیریت state اپلیکیشن](/chapters/chapter-06)*، آموزش می‌دهد برای هر use case ابزار state management مناسب را استفاده کنیم. با local UI state شروع می‌کنیم، سپس به global state با Zustand می‌رویم. از آنجا form state با React Hook Form و Zod را بررسی می‌کنیم و با مدیریت URL state برای featureهایی مثل filter و search parameter تمام می‌کنیم.

*[فصل ۷، پیاده‌سازی احراز هویت و امن‌سازی اپلیکیشن](/chapters/chapter-07)*، با گام‌به‌گام پیاده‌سازی authentication برای اپلیکیشن با session مبتنی بر cookie شروع می‌کند. سپس نشان می‌دهد چگونه routeها را محافظت کنیم و authorization policy برای مالکیت resource enforce کنیم. در پایان، best practiceهای امنیتی مثل sanitization محتوا و security header را پوشش می‌دهد.

*[فصل ۸، بهبود عملکرد اپلیکیشن](/chapters/chapter-08)*، روی بهینه‌سازی performance در اپلیکیشن React تمرکز دارد. با پوشش نحوهٔ تشخیص و diagnose کردن bottleneckهای performance با React DevTools Profiler شروع می‌کند. سپس تکنیک‌های بهینه‌سازی مختلف را پوشش می‌دهد: memoization، code splitting با lazy loading، server-side streaming، debouncing، infinite scroll و optimistic UI update.

*[فصل ۹، بین‌المللی‌سازی](/chapters/chapter-09)*، شما را در راه‌اندازی internationalization برای اپلیکیشن React راهنمایی می‌کند. ابتدا نحوهٔ configure کردن react-i18next و سازمان‌دهی translationها بر اساس namespace feature را پوشش می‌دهد. سپس مفاهیم کلیدی مثل تشخیص زبان سمت server، pluralization، variable interpolation و قالب‌بندی تاریخ locale-aware را مرور می‌کنیم. در پایان، component language switcher می‌سازیم که ترجیح کاربر را در cookie ذخیره می‌کند و بعد از reload صفحه حفظ می‌شود.

*[فصل ۱۰، دسترس‌پذیر کردن اپلیکیشن](/chapters/chapter-10)*، practiceهای دسترس‌پذیر کردن اپلیکیشن با پیروی از استانداردهای WCAG را بررسی می‌کند. با اصول POUR به‌عنوان چارچوب فکر کردن دربارهٔ accessibility شروع می‌کند. سپس تکنیک‌های عملی مثل semantic HTML، skip link، attributeهای ARIA، live region برای اعلان محتوای dynamic و focus style قابل مشاهده برای keyboard navigation را پوشش می‌دهد.

*[فصل ۱۱، تست اپلیکیشن](/chapters/chapter-11)*، رویکرد عملی تست اپلیکیشن React با استراتژی testing trophy را دنبال می‌کند. unit test و component test با Vitest و React Testing Library را پوشش می‌دهد — با تمرکز روی logic پیچیدهٔ isolated و رفتار UI. سپس از Playwright برای integration test و end-to-end test استفاده می‌کنیم — شامل route mocking و ساختاردهی test با test step.

*[فصل ۱۲، استقرار در Production](/chapters/chapter-12)*، مبانی راه‌اندازی pipeline CI/CD با GitHub Actions را پوشش می‌دهد. ابتدا pipeline CI را با jobهای موازی برای linting، type checking، format checking و همهٔ سطوح test configure می‌کنیم. سپس pipeline CD را طوری setup می‌کنیم که بعد از اجرای موفق CI روی branch اصلی trigger شود و اپلیکیشن را روی Render deploy کند.

*[فصل ۱۳، تکامل اپلیکیشن](/chapters/chapter-13)*، به بعضی موضوعات پیشرفته برای بردن اپلیکیشن فراتر از وضعیت فعلی می‌پردازد. استفاده از AI برای enforce کردن استانداردهای معماری، React Server Components، observability اپلیکیشن، feature flag، الگوی backend for frontend و scale کردن codebase با monorepo و microfrontend را بررسی می‌کنیم.

## قراردادهای به‌کاررفته {#h2_7}

در سراسر این کتاب از چند قرارداد متنی استفاده شده است.

`CodeInText`: نشان‌دهندهٔ کلمات code در متن، نام جدول پایگاه داده، نام پوشه، نام فایل، پسوند فایل، pathname، URLهای dummy، ورودی کاربر و handleهای Twitter است. برای مثال: «می‌توانیم همین component `Counter` را چند بار در یک صفحه استفاده کنیم».

یک بلوک code به این شکل نمایش داده می‌شود:

```tsx
export default function HomePage() {
  return (
    <div>
      <h1>Home</h1>
      <Counter
        initialValue={0}
        label="Click Counter"
        onIncrement={(newValue) => {
          console.log(`Incremented to ${newValue}`);
        }}
        onDecrement={(newValue) => {
          console.log(`Decremented to ${newValue}`);
        }}
      />
    </div>
  );
}
```

وقتی بخواهیم توجه شما را به بخشی خاص از یک بلوک code جلب کنیم، خطوط یا موارد مرتبط **پررنگ** می‌شوند:

```tsx{5-14}
export default function HomePage() {
  return (
    <div>
      <h1>Home</h1>
      <Counter
        initialValue={0}
        label="Click Counter"
        onIncrement={(newValue) => {
          console.log(`Incremented to ${newValue}`);
        }}
        onDecrement={(newValue) => {
          console.log(`Decremented to ${newValue}`);
        }}
      />
    </div>
  );
}
```

هر ورودی یا خروجی command-line به این شکل نوشته می‌شود:

```bash
npm run dev
```

**Bold (پررنگ):** نشان‌دهندهٔ اصطلاح جدید، کلمهٔ مهم یا عبارتی است که روی صفحه می‌بینید. مثلاً کلمات منوها یا dialog boxها در متن این‌طور ظاهر می‌شوند. برای مثال: «این یک **MVP** (**Minimum Viable Product**) است».

::: info Note
هشدارها یا یادداشت‌های مهم به این شکل نمایش داده می‌شوند.
:::

::: tip
نکات و ترفندها به این شکل نمایش داده می‌شوند.
:::
