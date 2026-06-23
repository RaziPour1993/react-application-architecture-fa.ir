# فصل ۱۰: دسترس‌پذیر کردن اپلیکیشن {#h1_264 .chapterTitle}

تصور کنید کاربری هستید که برای حرکت در اپلیکیشن به keyboard وابسته‌اید. شاید نقص حرکتی استفاده از mouse را برایتان سخت کرده، یا شاید صرفاً ترجیح شما این است. اپلیکیشن را باز می‌کنید، Tab می‌زنید تا از رابط کاربری عبور کنید، و هیچ اتفاقی نمی‌افتد. نشانگرهای focus وجود ندارند، ترتیب tab منطقی نیست، و راهی به جلو نیست. تب را می‌بندید و ادامه می‌دهید. برای شما، اپلیکیشن غیرقابل استفاده است. **Accessibility** که معمولاً به اختصار **a11y** نامیده می‌شود، تضمین می‌کند اپلیکیشن‌های ما برای همه قابل استفاده باشند، از جمله افراد دارای معلولیت. این شامل کاربرانی است که به screen reader وابسته‌اند، با keyboard حرکت می‌کنند، بینایی کمی دارند، یا نقص حرکتی دارند. ساخت اپلیکیشن‌های accessible صرفاً کار درستی نیست. اغلب یک الزام قانونی است و دامنهٔ کاربران بالقوهٔ ما را به‌طور قابل‌توجهی گسترش می‌دهد.

موارد زیر را پوشش خواهیم داد:

- درک مبانی accessibility
- گذاشتن بنیان معماری با semantic HTML و accessible component libraryها
- بهینه‌سازی‌های عملی accessibility

تا پایان این فصل، یاد خواهیم گرفت چگونه از ابتدا به accessibility فکر کنیم. خواهیم دید انتخاب‌های درست از ابتدا چگونه اپلیکیشن‌های ما را قابل نگهداری‌تر می‌کند و به ما کمک می‌کند به کاربران بیشتری برسیم.

## الزامات فنی

قبل از شروع، باید پروژه‌مان را راه‌اندازی کنیم. برای توسعهٔ پروژه، موارد زیر باید روی کامپیوتر نصب باشند:

- Node.js نسخه ۲۴ یا بالاتر، npm نسخه ۱۱ یا بالاتر همراه Node عرضه می‌شود. می‌توانیم با اجرای `node -v` و `npm -v` در terminal این را تأیید کنیم. روش‌های متعددی برای نصب Node.js و npm وجود دارد. در اینجا مقالهٔ خوبی است که جزئیات بیشتری توضیح می‌دهد: [https://www.nodejsdesignpatterns.com/blog/5-ways-to-install-node-js](https://www.nodejsdesignpatterns.com/blog/5-ways-to-install-node-js).
- VS Code (اختیاری) یک editor محبوب برای JavaScript و TypeScript است: متن‌باز، پشتیبانی خوب از TypeScript و extensionها. می‌توان آن را از [https://code.visualstudio.com](https://code.visualstudio.com) دانلود کرد.

کد این کتاب در repo کتاب موجود است. برای دسترسی به لینک repository، مراحل بخش «*Download the example code files*» در *Preface* را دنبال کنید. آن را clone کرده و به ریشهٔ repository بروید:

```
git clone https://github.com/PacktPublishing/React-Application-Architecture-for-Production-Second-Edition.git
```

repository شامل پوشه‌های فصل با کد هر فصل است، به همراه پوشهٔ مشترک `api` با سرور API که در همهٔ فصل‌ها استفاده می‌شود.

ما در *فصل ۱۰* هستیم، پس باید به پوشهٔ `chapter‑10` برویم:

```
cd React-Application-Architecture-for-Production-Second-Edition/chapter-10
```

سپس باید dependencyها را نصب کنیم:

```
npm install
```

همچنین باید environment variableها را فراهم کنیم:

```
cp .env.example .env
```

حالا باید frontend روی [http://localhost:5173](http://localhost:5173) در حال اجرا باشد.

همچنین باید سرور API ما در حال اجرا باشد.

بیایید یک پنجرهٔ terminal جدید باز کنیم و به پوشهٔ `api` برویم:

```
cd React-Application-Architecture-for-Production-Second-Edition/api
```

حالا باید setup script را برای *فصل ۱۰* اجرا کنیم تا همه‌چیز برایمان پیکربندی شود:

```
npm run setup 10
```

سپس باید سرور API را اجرا کنیم:

```
npm run dev
```

باید سرور API را روی [http://localhost:9999](http://localhost:9999) ببینیم.

برای اطلاعات بیشتر دربارهٔ جزئیات setup، فایل `README.md` را ببینید.

## درک مبانی accessibility

قبل از ورود به جزئیات فنی، ببینیم چرا accessibility مهم است و کدام اصول کار ما را هدایت می‌کنند.

- **دربارهٔ انسان‌هاست**: بیش از یک میلیارد نفر نوعی معلولیت دارند. این معلولیت‌ها از شرایط دائمی مثل نابینایی تا شرایط موقتی مثل دست شکسته تا محدودیت‌های موقعیتی مثل تلاش برای استفاده از تلفن در نور شدید خورشید متغیرند. وقتی اپلیکیشن‌های غیرaccessible می‌سازیم، بخش قابل‌توجهی از کاربران بالقوه را حذف می‌کنیم.
- **برای کسب‌وکار خوب است**: اپلیکیشن‌های accessible به کاربران بیشتری می‌رسند. هر مانعی که برداریم اپلیکیشن را به افراد بیشتری باز می‌کند. شرکت‌های بزرگ فناوری دریافته‌اند اولویت دادن به accessibility نه‌تنها به کاربران دارای معلولیت کمک می‌کند؛ بلکه اغلب تجربهٔ همه را بهبود می‌بخشد.
- **اغلب الزام قانونی است**: بسیاری از کشورها قوانینی دارند که accessibility دیجیتال را الزام می‌کند. در ایالات متحده، **Americans with Disabilities Act** (**ADA**) دربارهٔ بسیاری از وب‌سایت‌ها اعمال می‌شود. اتحادیهٔ اروپا European Accessibility Act را دارد. قوانین مشابهی در سراسر جهان وجود دارند. سازمان‌ها زمانی که دارایی‌های دیجیتالشان accessible نیستند با شکایت روبه‌رو می‌شوند.
- **کد بهتری می‌سازد**: کد accessible معمولاً کد بهتری است. ما را مجبور به استفاده از practiceهای خوب می‌کند. وقتی semantic HTML استفاده می‌کنیم، markup ما معنادارتر می‌شود. وقتی محتوا را منطقی ساختاربندی می‌کنیم، نگهداری آن آسان‌تر می‌شود. وقتی با keyboard و screen reader تست می‌کنیم، باگ‌هایی پیدا می‌کنیم که همهٔ کاربران را تحت تأثیر قرار می‌دهند.

### اصول accessibility

**Web Content Accessibility Guidelines (WCAG)** چارچوبی برای accessible کردن محتوای وب فراهم می‌کند. WCAG حول چهار اصل سازمان‌دهی شده که معمولاً با مخفف **POUR** به یاد آورده می‌شوند:

- Percevable - اطلاعات باید به شکلی قابل درک برای کاربران ارائه شوند. یعنی فراهم کردن متن جایگزین برای تصاویر، زیرنویس برای ویدیوها و contrast رنگ کافی.
- Operable - کاربران باید بتوانند رابط کاربری را کنترل کنند. یعنی پشتیبانی از keyboard navigation، فراهم کردن زمان کافی برای خواندن محتوا و اجتناب از محتوایی که باعث تشنج می‌شود.
- Understandable - کاربران باید بتوانند اطلاعات و نحوهٔ عملکرد رابط کاربری را درک کنند. یعنی استفاده از زبان روشن، navigation یکسان و پیام خطای مفید.
- Robust - کاربران باید بتوانند به تفسیر درست محتوا توسط فناوری‌های مختلف اعتماد کنند. یعنی استفاده از HTML معتبر و پایبندی به استانداردها.

ما در طول این فصل از این اصول استفاده خواهیم کرد تا روی تصمیم‌های معماری تمرکز کنیم که بیشترین تأثیر را روی کاربران واقعی دارند.

## گذاشتن بنیان معماری

بنیان دو بخش مهم دارد: استفاده از semantic HTML و استفاده از accessible component library. مهم است از ابتدا درست عمل کنیم چون بر کل اپلیکیشن اثر خواهد گذاشت.

### Semantic HTML

HTML فقط markup نیست. یک accessibility API است که مرورگرها و assistive technologyها می‌فهمند. وقتی HTML element درست را استفاده می‌کنیم، رفتار رایگان دریافت می‌کنیم. وقتی element اشتباه را استفاده می‌کنیم، باید آن رفتار را خودمان بازسازی کنیم.

یک `<button>` در مقابل یک `<div>` با handler `onClick` را در نظر بگیرید. می‌توانند کاملاً یکسان به نظر برسند و هر دو به click پاسخ دهند. اما در پشت صحنه، متفاوت‌اند.

element button با رفتار built-in عرضه می‌شود. به keyboard event پاسخ می‌دهد. screen reader آن را به‌عنوان button اعلام می‌کند. form submission آن را می‌شناسد. سیستم‌های focus management نحوهٔ مدیریت آن را می‌دانند.

وقتی به‌جای آن از `div` استفاده می‌کنیم، همهٔ این‌ها را از دست می‌دهیم. باید `tabIndex` اضافه کنیم تا focusable شود، handlerهای `onKeyDown` برای پاسخ به Enter و Space و `role="button"` برای اعلام به screen readerها. و حتی با این‌ها، باز هم کم داریم. یک `div` هرگز نمی‌تواند در form participation شرکت کند یا semantics کامل `disabled` را داشته باشد. مشکل را حل نمی‌کنیم؛ دور آن وصله می‌زنیم.

در اپلیکیشن ما، وقتی کاربران ایده‌ها را بر اساس tag فیلتر می‌کنند از کامپوننت `Badge` استفاده می‌کنیم. وقتی روی badge کلیک می‌کنیم، فیلتر tag را toggle می‌کنیم. این شبیه رفتار یک button است. اما کامپوننت `Badge` ما به‌صورت پیش‌فرض یک `<span>` رندر می‌کند:

```tsx
// src/components/ui/badge.tsx

function Badge({
  className,
  variant = 'default',
  render,
  ...props
}: useRender.ComponentProps<'span'>&VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: 'span',
    props: mergeProps<'span'>(
      {
        className: cn(badgeVariants({ className, variant })),
      },
      props,
    ),
    render,
    state: {
      slot: 'badge',
      variant,
    },
  });
}
```

چگونه استایل `Badge` را حفظ کنیم در حالی که از button element استفاده می‌کنیم؟ باید مطمئن شویم design system ما به‌اندازهٔ کافی انعطاف‌پذیر است تا overrideهای لازم را پشتیبانی کند. خوشبختانه این به‌راحتی با استفاده از prop `render` امکان‌پذیر است که به ما اجازه می‌دهد element سفارشی برای رندر فراهم کنیم. وقتی آن را فراهم می‌کنیم، کامپوننت `Badge` استایل خود را به element فراهم‌شده منتقل می‌کند به‌جای اینکه span خودش را بسازد. این به ما اجازه می‌دهد button فراهم کنیم و ظاهر Badge را دریافت کنیم:

```tsx
// src/features/ideas/components/idea-search-and-filters.tsx

<Badge
  key={tag}
  variant={selectedTags.includes(tag) ? 'default' : 'outline'}
  className="cursor-pointer"
  render={
    <button
      type="button"
      aria-pressed={selectedTags.includes(tag)}
      aria-label={t('ideas:tagStatus', {
        tag,
        status: selectedTags.includes(tag)
          ? t('common:selected')
          : t('common:notSelected'),
      })}
      onClick={() => toggleTag(tag)}
    >
      {tag}
    </button>
  }
/>
```

element button همهٔ چیزی را که نیاز داریم فراهم می‌کند. focusable با keyboard است. به keyboard event پاسخ می‌دهد. screen reader آن را به‌عنوان button اعلام می‌کند.

اگر به‌جای آن از divها یا spanها استفاده می‌کردیم، باید همهٔ این رفتارها را به‌صورت دستی به هر فیلتر tag اضافه می‌کردیم. با استفاده از button، همهٔ این رفتار را از پلتفرم دریافت می‌کنیم: مدیریت keyboard، نقش ARIA و semantics رویداد بدون نوشتن حتی یک خط JavaScript.

اگر می‌خواستیم فراتر برویم، می‌توانستیم تجریدی مثل `SelectableBadge` روی کامپوننت `Badge` بسازیم تا مجبور نباشیم این الگو را همه‌جا تکرار کنیم.

### تعریف نشانه‌های صفحه

buttonها و linkها elementهای interactive را handle می‌کنند، اما semantic HTML elementهای ساختاری هم فراهم می‌کند که به کاربران کمک می‌کنند در خود صفحه حرکت کنند. elementهایی مثل `<header>`، `<main>`، `<nav>` و `<footer>` به مرورگرها و screen readerها می‌گویند هر بخش صفحه چیست.

بیایید ساختار layout اپلیکیشنمان را ببینیم:

```tsx
// src/app/routes/layout.tsx

export default function Layout() {
  // ...
  return (
    <div className="min-h-screen flex flex-col">
      {/* ... */}
      <header>
        <Navigation user={user} onLogout={handleLogout} />
      </header>
      <main id="main-content" className="flex-1 bg-background">
        <Outlet />
      </main>
      <footer className="border-t py-6 px-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} AIdeas. All rights reserved.
      </footer>
    </div>
  );
}
```

elementهای `<header>`، `<main>` و `<footer>` نشانه‌هایی (landmarks) ایجاد می‌کنند که screen readerها می‌توانند در آن‌ها حرکت کنند. کاربران می‌توانند مستقیماً به محتوای اصلی یا footer بپرند بدون اینکه از همه چیز با Tab عبور کنند. این بدون JavaScript کار می‌کند، در برابر شکست CSS مقاوم است و به assistive technologyها معنا می‌دهد.

### استفاده از accessible component libraryها

semantic HTML elementهای ساده را handle می‌کند، اما UIهای پیچیده به چیز بیشتری نیاز دارند. ساخت کامپوننت‌های interactive accessible از صفر سخت است و دشواری فقط به پیاده‌سازی اولیه ختم نمی‌شود. مرورگرها و assistive technologyها رفتار ناهمگون دارند و مستقل تکامل می‌یابند، پس حفظ صحیح کامپوننت‌ها در طول زمان جایی است که تیم‌ها بیشتر کم می‌آورند. یک dropdown menu به keyboard navigation با کلیدهای جهت‌دار، focus management، Escape برای بستن، مدیریت state disabled، اعلام screen reader و ARIA attributeهای صحیح نیاز دارد. اگر هر کدام را اشتباه بگیرید، بعضی کاربران نمی‌توانند از menu استفاده کنند.

جایی است که component library اهمیت پیدا می‌کند. نحوهٔ انتخاب component library را قبلاً در *فصل ۳* پوشش دادیم. علاوه بر functionality built-in، باید accessibility support فراهم کنند و به ما اجازه دهند روی logic و styling اپلیکیشن تمرکز کنیم.

dialog را به‌عنوان مثال در نظر بگیرید. یک dialog که به‌درستی accessible باشد نیاز دارد:

- Focus trapping - focus تا بسته شدن dialog داخل آن می‌ماند
- Return focus - focus هنگام بستن به trigger برمی‌گردد
- مدیریت keyboard - Escape dialog را می‌بندد، Tab از محتوا عبور می‌کند
- ARIA attribute - `role`، `aria-modal`، `aria-labelledby` به‌صورت خودکار تنظیم شوند
- قفل scroll بدنه - از scroll شدن محتوای صفحه پشت modal جلوگیری می‌کند
- Portal rendering - dialog را در ریشهٔ document برای stacking صحیح رندر می‌کند

وقتی component library درست را استفاده می‌کنیم، همهٔ این‌ها را رایگان دریافت می‌کنیم. به همین دلیل انتخاب درست اینجا بسیار مهم است چون بر کل اپلیکیشن اثر خواهد گذاشت و ممکن است بعداً تغییر دادنش سخت باشد.

## بهینه‌سازی‌های عملی accessibility

semantic HTML و component libraryهای accessible بیشتر نگرانی‌های accessibility را handle می‌کنند، اما بعضی موقعیت‌ها به کار اضافی نیاز دارند. بیایید رایج‌ترین بهینه‌سازی‌ها و جایگاهشان در اپلیکیشن را ببینیم.

### skip link برای keyboard navigation

وقتی کاربران با keyboard حرکت می‌کنند، از هر element interactive با Tab عبور می‌کنند. اگر navigation ما پنج link داشته باشد، کاربران keyboard باید در هر صفحه پنج بار Tab بزنند فقط تا به محتوای اصلی برسند. برای کاربرانی که فقط از keyboard استفاده می‌کنند، این خسته‌کننده می‌شود.

راه‌حل skip link است: یک anchor مخفی که مستقیماً به محتوای اصلی می‌رود. اولین element focusable در صفحه است.

```tsx
// src/app/routes/layout.tsx

export default function Layout() {
  const { t } = useTranslation(['navigation']);
  // ...

  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-background focus:text-foreground focus:px-4 focus:py-2 focus:border focus:rounded focus:ring-2 focus:ring-ring"
      >
        {t('navigation:skipToContent')}
      </a>
      <header>
        <Navigation user={user} onLogout={handleLogout} />
      </header>
      <main id="main-content" className="flex-1 bg-background">
        <Outlet />
      </main>
      <footer className="border-t py-6 px-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} AIdeas. All rights reserved.
      </footer>
    </div>
  );
}
```

skip link به‌صورت پیش‌فرض پنهان بصری است (`sr-only`) اما هنگام focus visible می‌شود. از طریق `id="main-content"` به element `main` هدف می‌گیرد، پس کاربران می‌توانند با یک Tab و Enter از navigation و elementهای کم‌اهمیت دیگر عبور کنند.

اگر کلید Tab را فشار دهیم، skip link visible می‌شود:

شکل ۱۰.۱: Skip link هنگام focus visible می‌شود

این ما را مستقیماً به محتوای اصلی می‌برد، از navigation و elementهای کم‌اهمیت دیگر عبور می‌کند.

### فراهم کردن accessible label

وقتی یک button فقط با icon نشان می‌دهیم (مثل button menu سه‌نقطه)، کاربران بینا می‌دانند menu باز می‌کند. اما کاربران screen reader فقط «button» می‌شنوند بدون اطلاعاتی دربارهٔ عملکردش چون متن visible وجود ندارد.

هر element interactive به accessible name نیاز دارد. برای هر element که متن visible ندارد، از `aria-label` استفاده می‌کنیم:

```tsx
// src/features/ideas/components/idea-actions.tsx

<DropdownMenuTrigger
  render={
    <Button
      variant="ghost"
      size="sm"
      className="h-8 w-8 p-0"
      aria-label={t('ideas:ideaActionsMenu')}
    >
      <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
    </Button>
  }
/>
```

`aria-label` accessible name را فراهم می‌کند که screen readerها اعلام می‌کنند: «Idea actions menu, button.» خود icon `aria-hidden="true"` دریافت می‌کند چون کاملاً بصری است و توسط screen reader اعلام نمی‌شود. این الگوی مشابه هر جایی اعمال می‌شود که باید متنی فراهم کنیم که screen reader بتواند اعلام کند اما کاربران بینا نیازی به دیدنش ندارند: buttonهای بستن، buttonهای menu، toggleهای icon یا هر نمای بصری که به خوبی به متن ترجمه نمی‌شود.

### اعلام تغییرات پویا

وقتی کاربران فیلتر tag انتخاب می‌کنند، React لیست را بدون reload صفحه به‌روز می‌کند. کاربران بینا تغییر لیست را می‌بینند، اما کاربران screen reader هیچ اعلانی دریافت نمی‌کنند. نمی‌دانند آیا فیلتر کار کرده یا چند نتیجه نشان داده می‌شود. برای اپلیکیشن‌های پویا، این شکافی بین action و feedback ایجاد می‌کند.

اپلیکیشن‌های React بدون reload صفحه به‌روز می‌شوند و screen readerها تغییرات DOM را اعلام نمی‌کنند مگر اینکه روی focus یا live region اثر بگذارند. برای حل این مشکل، می‌توانیم از ARIA live region استفاده کنیم.

بیایید ببینیم چگونه نتایج جستجو را به screen readerها اعلام می‌کنیم:

```tsx
// src/app/routes/ideas/ideas.tsx

function Ideas() {
  const { t } = useTranslation(['ideas', 'common']);
  const { params } = useSearchAndFilters();

  const ideasInfiniteQuery = useIdeasInfiniteQuery({
    params: params as GetAllIdeasData['query'],
  });

  const allIdeas =
    ideasInfiniteQuery.data?.pages.flatMap((page) => page.data) || [];

  // ...

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        {/* ... */}
        <IdeaSearchAndFilters />
      </div>

      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        role="status"
      >
        {t('ideas:resultsFound', { count: allIdeas.length })}
      </div>

      <ListComponent
        ideas={allIdeas}
        isLoading={ideasInfiniteQuery.isLoading && allIdeas.length === 0}
        emptyMessage={t('ideas:noIdeasAvailable')}
        error={ideasInfiniteQuery.error}
      />
    </div>
  );
}
```

live region به‌صورت بصری پنهان است (`sr-only`)، اما screen readerها آن را رصد می‌کنند. وقتی `allIdeas.length` تغییر می‌کند، screen readerها «۵ نتیجه یافت شد» را اعلام می‌کنند. `aria-live="polite"` به این معناست که اعلان منتظر مکث در گفتار می‌ماند. برای به‌روزرسانی‌های حیاتی مثل خطاها از `aria-live="assertive"` استفاده کنید. `role="status"` نشان می‌دهد این اطلاعات وضعیت است. برای scale بیشتر، می‌توانیم اعلان‌ها را در یک utility یا hook مشترک متمرکز کنیم تا logic live region یکسان بماند.

## خلاصه

accessibility به چند دلیل مهم است. دربارهٔ انسان‌هاست، برای کسب‌وکار خوب است، اغلب الزام قانونی است و به کد بهتری منجر می‌شود. می‌توانیم از اصول WCAG POUR برای هدایت تصمیم‌هایمان استفاده کنیم و اپلیکیشن‌هایی بسازیم که برای همه accessible باشند.

semantic HTML و component libraryهای accessible بنیان را تشکیل می‌دهند. semantic HTML پشتیبانی keyboard و سازگاری screen reader برای تعاملات ساده فراهم می‌کند. component libraryهای accessible الگوهای پیچیده را handle می‌کنند، focus و ARIA attribute را مدیریت می‌کنند تا مجبور نباشیم.

فراتر از بنیان، سه بهینه‌سازی کلیدی پوشش دادیم. skip link به کاربران keyboard اجازه می‌دهد مستقیماً به محتوای اصلی بپرند. accessible label برای buttonهای فقط-icon و elementهای بصری context فراهم می‌کند. live region تغییرات پویا را اعلام می‌کنند تا کاربران screen reader بدانند چه زمانی محتوا به‌روز می‌شود.
