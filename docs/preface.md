# پیش‌گفتار

ساخت اپلیکیشن‌های بزرگ و حرفه‌ای در محیط production با React می‌تواند به‌دلیل گستردگی انتخاب‌ها و نبود منابع منسجم، کاری طاقت‌فرسا باشد. این کتاب به‌عنوان راهنمایی عملی، practiceها و نمونه‌های کاربردی را به اشتراک می‌گذارد تا به شما در ساخت اپلیکیشن‌های سازمانی با React کمک کند.

در این کتاب، ابتدا اصول معماری پشت اپلیکیشن‌های مقیاس‌پذیر React را بررسی می‌کنیم. سپس بنیاد پروژه را با Vite، TypeScript، ESLint، Prettier و Husky پی‌ریزی کرده و ساختار پوشه‌ای مبتنی بر feature را پیاده‌سازی می‌کنیم. در ادامه، componentهای قابل استفادهٔ مجدد و مستندشده را با Shadcn UI و Storybook می‌سازیم و یاد می‌گیریم چگونه routing و استراتژی‌های مختلف rendering — از جمله pre-rendering، SSR، CSR و رویکرد hybrid با React Router در framework mode — را پیاده‌سازی کنیم.

پس از آماده‌سازی بنیادها، نحوهٔ ارتباط type-safe با APIها را با استفاده از typeهای تولیدشده از OpenAPI، اعتبارسنجی با Zod و React Query برای مدیریت server state پوشش می‌دهیم. ابزار مناسب state management را برای هر use case بررسی می‌کنیم — از جمله local state، global state، form state و URL state — و سپس به پیاده‌سازی authentication مبتنی بر cookie، authorization policy و بهترین practiceهای امنیتی محتوا می‌پردازیم.

در نهایت، کیفیت اپلیکیشن را از طریق بهینه‌سازی performance با memoization، code splitting و streaming ارتقا می‌دهیم، قابلیت بین‌المللی‌سازی را با react-i18next اضافه می‌کنیم، اصول WCAG را برای تضمین accessibility رعایت می‌کنیم و test suite جامعی با Vitest و Playwright می‌نویسیم. در پایان، pipeline CI/CD را با GitHub Actions راه‌اندازی کرده و به موضوعات پیشرفته‌ای همچون enforce کردن معماری با AI، React Server Components، feature flag، monorepo و microfrontend می‌پردازیم.

با مطالعهٔ این کتاب و پیروی از بهترین practiceهای صنعتی و نکات کارشناسان، خواهید توانست به‌طور مؤثر اپلیکیشن‌های production-ready بسازید.

## این کتاب برای چه کسانی است {#h1_2}

این کتاب برای توسعه‌دهندگان وب در سطح intermediate است که درک خوبی از JavaScript، React و توسعهٔ وب به‌طور کلی دارند و می‌خواهند اپلیکیشن‌های React در مقیاس بزرگ را به‌طور مؤثر بسازند. علاوه بر تجربه با JavaScript و React، آشنایی با TypeScript نیز مفید خواهد بود.

## این کتاب چه موضوعاتی را پوشش می‌دهد {#h1_3}

*[فصل ۱، درک معماری اپلیکیشن‌های React](/chapters/chapter-01)*، نحوهٔ نگرش معمارانه به اپلیکیشن‌ها را بررسی می‌کند. ابتدا اهمیت و مزایای معماری خوب را توضیح می‌دهد، سپس practiceهای خوب و بد در اپلیکیشن‌های React را معرفی می‌کند و در نهایت، برنامه‌ریزی اپلیکیشن واقعی ما — **AI Ideas Community Platform** — که در سراسر کتاب می‌سازیم، پوشش می‌دهد.

*[فصل ۲، راه‌اندازی و ساختار پروژه](/chapters/chapter-02)*، پی‌ریزی بنیاد پروژه با تمام ابزارها و تنظیمات لازم را توضیح می‌دهد. ابزارهایی مانند React Router، Vite، TypeScript، ESLint، Prettier و Husky معرفی می‌شوند. در پایان، ساختار پروژهٔ مبتنی بر feature که سازمان‌دهی codebase را بهبود می‌بخشد، ارائه می‌گردد.

*[فصل ۳، ساخت و مستندسازی کامپوننت‌ها](/chapters/chapter-03)*، اصول طراحی component و Shadcn UI — کتابخانهٔ copy-paste component مبتنی بر primitiveهای Radix UI — را معرفی می‌کند. نحوهٔ setup و استفاده از آن برای ساخت componentهای قابل استفادهٔ مجدد که UI اپلیکیشن را یکدست نگه می‌دارند، توضیح داده می‌شود. در نهایت، مستندسازی componentها با Storybook را یاد خواهید گرفت.

*[فصل ۴، مسیریابی و استراتژی‌های رندر](/chapters/chapter-04)*، عمیق‌تر به React Router در framework mode و استراتژی‌های مختلف rendering می‌پردازد. ابتدا مبانی مانند routing، nested layout و data prefetching با loader را پوشش می‌دهد. سپس استراتژی‌های rendering پشتیبانی‌شده را بررسی می‌کند: pre-rendering، SSR، CSR و hybrid. در نهایت، با ساخت routeها و layoutهای اپلیکیشن، این مفاهیم را عملی پیاده‌سازی می‌کنیم.

*[فصل ۵، ارتباط با API](/chapters/chapter-05)*، گام‌به‌گام نحوهٔ ارتباط type-safe با backend API را توضیح می‌دهد. ابتدا یاد می‌گیریم چگونه typeهای TypeScript را از OpenAPI specification تولید کرده و پاسخ‌های API را در runtime اعتبارسنجی کنیم. سپس React Query را configure کرده و لایهٔ API اپلیکیشن را با آن می‌سازیم — شامل query، mutation و cache invalidation.

*[فصل ۶، مدیریت state اپلیکیشن](/chapters/chapter-06)*، آموزش می‌دهد برای هر use case ابزار state management مناسب را انتخاب کنیم. با local UI state شروع می‌کنیم، سپس به global state با Zustand می‌پردازیم. از آنجا form state با React Hook Form و Zod را بررسی کرده و با مدیریت URL state برای featureهایی مانند filter و search parameter به پایان می‌رسانیم.

*[فصل ۷، پیاده‌سازی احراز هویت و امن‌سازی اپلیکیشن](/chapters/chapter-07)*، با گام‌به‌گام پیاده‌سازی authentication مبتنی بر cookie شروع می‌کند. سپس نحوهٔ محافظت از routeها و enforce کردن authorization policy برای مالکیت resource را نشان می‌دهد. در نهایت، بهترین practiceهای امنیتی مانند sanitization محتوا و security header را پوشش می‌دهد.

*[فصل ۸، بهبود عملکرد اپلیکیشن](/chapters/chapter-08)*، بر بهینه‌سازی performance در اپلیکیشن‌های React تمرکز دارد. ابتدا نحوهٔ تشخیص و عیب‌یابی bottleneckهای performance با React DevTools Profiler را توضیح می‌دهد. سپس تکنیک‌های بهینه‌سازی مختلف را پوشش می‌دهد: memoization، code splitting با lazy loading، server-side streaming، debouncing، infinite scroll و optimistic UI update.

*[فصل ۹، بین‌المللی‌سازی](/chapters/chapter-09)*، راه‌اندازی internationalization برای اپلیکیشن React را آموزش می‌دهد. ابتدا نحوهٔ configure کردن react-i18next و سازمان‌دهی translationها بر اساس feature namespace را پوشش می‌دهد. سپس مفاهیم کلیدی مانند تشخیص زبان سمت server، pluralization، variable interpolation و قالب‌بندی تاریخ با در نظر گرفتن locale مرور می‌شود. در نهایت، component language switcher می‌سازیم که ترجیح کاربر را در cookie ذخیره کرده و پس از reload صفحه حفظ می‌شود.

*[فصل ۱۰، دسترس‌پذیر کردن اپلیکیشن](/chapters/chapter-10)*، practiceهای دسترس‌پذیری با رعایت استانداردهای WCAG را بررسی می‌کند. با اصول POUR به‌عنوان چارچوبی برای درک accessibility شروع می‌کند. سپس تکنیک‌های عملی مانند semantic HTML، skip link، attributeهای ARIA، live region برای اعلان محتوای پویا و focus style قابل مشاهده برای keyboard navigation را توضیح می‌دهد.

*[فصل ۱۱، تست اپلیکیشن](/chapters/chapter-11)*، رویکرد عملی تست اپلیکیشن‌های React با استراتژی testing trophy را دنبال می‌کند. unit test و component test با Vitest و React Testing Library را پوشش می‌دهد — با تمرکز روی logic پیچیدهٔ isolated و رفتار UI. سپس از Playwright برای integration test و end-to-end test استفاده می‌کنیم — شامل route mocking و ساختاردهی test با test step.

*[فصل ۱۲، استقرار در Production](/chapters/chapter-12)*، مبانی راه‌اندازی pipeline CI/CD با GitHub Actions را توضیح می‌دهد. ابتدا pipeline CI را با jobهای موازی برای linting، type checking، format checking و تمام سطوح test configure می‌کنیم. سپس pipeline CD را به‌گونه‌ای setup می‌کنیم که پس از اجرای موفق CI روی branch اصلی trigger شده و اپلیکیشن را روی Render deploy کند.

*[فصل ۱۳، تکامل اپلیکیشن](/chapters/chapter-13)*، به موضوعات پیشرفته‌ای برای ارتقای اپلیکیشن فراتر از وضعیت فعلی می‌پردازد. استفاده از AI برای enforce کردن استانداردهای معماری، React Server Components، observability اپلیکیشن، feature flag، الگوی backend for frontend و scale کردن codebase با monorepo و microfrontend بررسی می‌شود.

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
          console.log(`Decrecremented to ${newValue}`);
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
          console.log(`Decrecremented to ${newValue}`);
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

### درباره این ترجمه

این ترجمهٔ فارسی کتاب **React Application Architecture for Production** (ویرایش دوم، Packt Publishing) است.

می‌توانید این ترجمه را آنلاین در [react-application-architecture.ir](http://react-application-architecture.ir/) بخوانید. متن و سورس در [گیت‌هاب](https://github.com/RaziPour1993/react-application-architecture.ir) نیز منتشر شده است.

<div class="translation-notice">

اگر وسط مطالعه به غلط املایی، اصطلاح نامفهوم، جمله‌ای که روان نیست، یا هر مشکل دیگری برخوردید، حتماً به من بگویید تا اصلاح کنم — از طریق [لینکدین](https://www.linkedin.com/in/razipour1993)، [تلگرام](https://t.me/razipour1993) یا [گیت‌هاب](https://github.com/RaziPour1993/react-application-architecture.ir).

</div>
