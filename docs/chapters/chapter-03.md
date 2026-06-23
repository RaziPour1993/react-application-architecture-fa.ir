# فصل ۳: ساخت و مستندسازی کامپوننت‌ها

در React، همه‌چیز یک **component** است. این paradigma به ما اجازه می‌دهد رابط کاربری را به بخش‌های کوچک‌تر تقسیم کنیم و ساخت رابط کاربری و اپلیکیشن‌های بزرگ‌تر را آسان‌تر کنیم. همچنین با فعال کردن استفادهٔ مجدد از component از اصل DRY (خودتان را تکرار نکنید) پیروی می‌کند چون می‌توانیم همان componentها را در چندین مکان استفاده کنیم.

در این فصل یاد می‌گیریم چگونه componentهای بنیادی برای design system اپلیکیشنمان بسازیم. این UI اپلیکیشن را یکدستتر و آسان‌تر برای فهم و نگهداری می‌کند. همچنین یاد می‌گیریم چگونه این componentها را با **Storybook** مستند کنیم — ابزار عالی که به‌عنوان کاتالوگ برای همهٔ elementهای UI قابل استفادهٔ مجدد ما عمل می‌کند.

موارد زیر را پوشش می‌دهیم:

- آناتومی یک component
- ساخت کتابخانهٔ component ما
- مستندسازی componentها

در پایان این فصل، درک محکمی از معماری component و کتابخانهٔ component قابل استفادهٔ مجدد مستند شده با Storybook خواهیم داشت که می‌توانیم در سراسر اپلیکیشن از آن استفاده کنیم.

## پیش‌نیازهای فنی {#h1_108}

قبل از شروع، باید پروژه را راه‌اندازی کنیم. برای توسعهٔ پروژه به ابزارهای زیر روی کامپیوتر نیاز داریم:

- **Node.js** نسخهٔ ۲۴ یا بالاتر. نسخهٔ **npm** ۱۱ یا بالاتر همراه Node ارائه می‌شود. می‌توانیم با اجرای دستورات `node -v` و `npm -v` در terminal این را تأیید کنیم. راه‌های مختلفی برای نصب Node.js و npm وجود دارد. این مقالهٔ مفید را ببینید: [https://www.nodejsdesignpatterns.com/blog/5-ways-to-install-node-js](https://www.nodejsdesignpatterns.com/blog/5-ways-to-install-node-js).
- **VS Code** (اختیاری)، یک ویرایشگر محبوب برای JavaScript و TypeScript. open source است، پشتیبانی TypeScript قوی دارد و extensionهای زیادی ارائه می‌دهد. از [https://code.visualstudio.com](https://code.visualstudio.com) قابل دانلود است.

کد این کتاب در repo کتاب موجود است. برای دسترسی به لینک repository، مراحل بخش «دانلود فایل‌های کد نمونه» در پیش‌گفتار را دنبال کنید. آن را clone کنید و وارد root repository شوید:

```
git clone https://github.com/PacktPublishing/React-Application-Architecture-for-Production-Second-Edition.git
```

repository شامل پوشه‌های فصل با کد هر فصل است، همراه با پوشهٔ مشترک `api` که سرور API مورد استفاده در همهٔ فصل‌ها را شامل می‌شود.

ما روی فصل ۳ کار می‌کنیم، پس وارد پوشهٔ `chapter-03` شوید:

```
cd React-Application-Architecture-for-Production-Second-Edition/chapter-03
```

سپس dependencyها را نصب کنید:

```
npm install
```

همچنین باید environment variableها را فراهم کنیم:

```
cp .env.example .env
```

در این مرحله، frontend باید آماده باشد و روی [http://localhost:5173](http://localhost:5173) اجرا شود.

حالا کد پروژه باید آماده باشد.

برای اطلاعات بیشتر دربارهٔ جزئیات راه‌اندازی، فایل `README.md` را ببینید.

## آناتومی یک component {#h1_109}

قبل از شروع ساخت کتابخانهٔ component، باید بفهمیم component چیست و چگونه کار می‌کند. در این بخش موارد زیر را پوشش می‌دهیم:

- component چیست؟
- propهای component
- state component
- event handler
- TypeScript و component

بیایید هر یک از این مفاهیم را با یک مثال عملی بررسی کنیم.

### component چیست؟ {#h2_110}

component تکهٔ UI خودبسنده و قابل استفادهٔ مجددی است که ساختار، رفتار و styling خودش را encapsulate می‌کند. componentها با هم ترکیب می‌شوند تا رابط کاربری کامل بسازند.

این یک مثال ساده است:

```tsx
// src/components/counter.tsx
import { useState } from 'react';

export type CounterProps = {
  initialValue: number;
  label: string;
  onIncrement?: (newValue: number) => void;
  onDecrement?: (newValue: number) => void;
};

export function Counter(props: CounterProps) {
  const [value, setValue] = useState(props.initialValue);

  const handleIncrement = () => {
    const newValue = value + 1;
    setValue(newValue);
    props.onIncrement?.(newValue);
  };

  const handleDecrement = () => {
    const newValue = value - 1;
    setValue(newValue);
    props.onDecrement?.(newValue);
  };

  return (
    <div>
      <label>{props.label}</label>
      <div className="flex items-center gap-2">
        <button onClick={handleDecrement}>-</button>
        <p>{value}</p>
        <button onClick={handleIncrement}>+</button>
      </div>
    </div>
  );
}
```

این component بخش‌های کلیدی یک component React را نشان می‌دهد:

- **تابع component**: در هستهٔ خود، component فقط یک تابع JavaScript است که JSX (JavaScript XML) برمی‌گرداند که شبیه HTML است اما در واقع JavaScript است. تابع توصیف می‌کند چه چیزی باید روی صفحه ظاهر شود. در زیرساخت، کامپایلر JSX markup را به فراخوانی‌های سادهٔ `React.createElement` تبدیل می‌کند، پس `<button onClick={fn}>Click</button>` تبدیل می‌شود به: `React.createElement('button', { onClick: fn }, 'Click')`.
- **Props (ویژگی‌ها)**: پارامتر `props` نحوهٔ ارسال داده به componentها است. Props می‌تواند هر چیزی باشد — string، number، function، object، array یا حتی componentهای دیگر. Props componentها را پویا و قابل استفادهٔ مجدد می‌کند.
- **TypeScript type**: تعریف type `CounterProps` را ببینید. TypeScript از ارسال string در جایی که عدد نیاز داریم یا فراموش کردن propهای ضروری جلوگیری می‌کند. همچنین IntelliSense عالی در IDE به ما می‌دهد.
- **State**: هوک `useState` به component اجازه می‌دهد مقدارها را بین renderها به یاد بسپارد. وقتی `setValue` را فراخوانی می‌کنیم، React component را با مقدار جدید دوباره render می‌کند و آنچه کاربران روی صفحه می‌بینند را به‌روز می‌کند.
- **Event handler**: توابعی مثل `handleIncrement` به تعاملات کاربر پاسخ می‌دهند. وقتی کسی روی دکمهٔ افزایش کلیک می‌کند، state را به‌روز می‌کنیم و اختیاراً callback prop را فراخوانی می‌کنیم.

### استفاده از component {#h2_111}

وقتی componentی را تعریف کردیم، می‌توانیم آن را در هر جای اپلیکیشن استفاده کنیم:

```tsx
// src/app/routes/home.tsx
import { Counter } from '@/components/counter';

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

وقتی render می‌شود، کاربران برچسب **Click Counter**، مقدار فعلی شمارنده و دو دکمه را می‌بینند. کلیک روی دکمه‌ها عدد نمایش‌داده‌شده را به‌روز می‌کند و پیام‌ها را در console ثبت می‌کند.

می‌توانیم همان component `Counter` را چند بار در یک صفحه با propهای مختلف `initialValue` و `label` استفاده کنیم و همه به‌صورت مستقل کار می‌کنند.

حالا که مبانی component را فهمیدیم، بیایید کتابخانهٔ componentی بسازیم که به‌عنوان پایهٔ اپلیکیشنمان عمل می‌کند.

## ساخت کتابخانهٔ component ما {#h1_112}

وقتی اپلیکیشن production می‌سازیم، به مجموعهٔ یکدستی از componentهای UI نیاز داریم — دکمه‌ها، inputها، dialogها، فرم‌ها و موارد دیگر. چند گزینه برای دریافت این componentها داریم. در این بخش موارد زیر را پوشش می‌دهیم:

- کتابخانهٔ component چیست و چرا به آن نیاز داریم؟
- رویکردهای مختلف به کتابخانهٔ component
- Shadcn UI چیست و چرا آن را انتخاب کردیم؟
- چگونه Shadcn UI را راه‌اندازی کنیم

بیایید با فهمیدن اینکه کتابخانهٔ component چیست و چرا به آن نیاز داریم شروع کنیم.

### کتابخانهٔ component چیست و چرا به آن نیاز داریم؟ {#h2_113}

بدون کتابخانهٔ component، هر دکمه، input یا modal را هر بار که نیاز داریم از صفر می‌ساختیم. این منجر به موارد زیر می‌شود:

- **UI ناهمگون**: دکمه‌های مختلف با استایل‌های مختلف در سراسر اپ
- **کد تکراری**: همان componentها چندین بار ساخته می‌شوند
- **نگهداری سخت‌تر**: نیاز به به‌روزرسانی همان component در چندین مکان
- **مشکلات accessibility**: راحتی فراموش کردن keyboard navigation، screen reader و attributeهای ARIA
- **توسعهٔ کندتر**: ساخت همه‌چیز از صفر زمان‌بر است

کتابخانهٔ component این مشکلات را با فراهم کردن مجموعه‌ای از componentهای از پیش ساخته‌شده، tested و accessible حل می‌کند که می‌توانیم در سراسر اپلیکیشن از آن‌ها استفاده کنیم.

### رویکردهای مختلف به کتابخانهٔ component {#h2_114}

چندین راه برای دریافت کتابخانهٔ component برای اپلیکیشن React ما وجود دارد:

### گزینه ۱: نصب بسته (Material-UI، Ant Design، Chakra UI، Mantine) {#h2_115}

کتابخانه‌ای را از طریق `npm` نصب و componentها را import می‌کنیم:

```tsx
import Button from '@mui/material/Button';

<Button variant="contained">Click me</Button>
```

#### مزایا:

- شروع سریع
- خوب tested و نگهداری شده
- مستندات و جامعهٔ خوب

#### معایب:

- اندازهٔ bundle بزرگ (حتی اگر از چند component استفاده کنیم کل کتابخانه را ارسال می‌کنیم)
- سفارشی‌سازی محدود (پیروی از design system کتابخانه)
- به‌روزرسانی‌ها می‌توانند چیزها را خراب کنند

در انتهای دیگر طیف، گزینهٔ ساخت همه‌چیز توسط خودمان را داریم.

### گزینه ۲: ساخت از صفر {#h2_116}

همهٔ componentها را خودمان از elementهای HTML پایه می‌سازیم.

#### مزایا:

- کنترل کامل روی همه‌چیز
- dependency اضافی نداریم
- دقیقاً همان چیزی که نیاز داریم

#### معایب:

- ساخت زمان‌بر
- باید accessibility را خودمان handle کنیم
- باید همه‌چیز را test کنیم
- اختراع مجدد چرخ

وسط راهی هم وجود دارد که مزایای هر دو رویکرد را ترکیب می‌کند.

### گزینه ۳: Shadcn UI (componentهای copy-paste) {#h2_117}

Shadcn UI رویکرد متفاوتی دارد — یک بستهٔ npm نیست. در عوض، مجموعه‌ای از componentهای accessible است که مستقیماً در پروژهٔ ما کپی می‌کنیم. componentها با Radix UI یا Base UI (کتابخانه‌های component headless برای accessibility و رفتار) ساخته شده‌اند و با Tailwind CSS استایل داده می‌شوند. برای پروژهٔ ما از Base UI استفاده می‌کنیم چون در زمان نوشتن این کتاب نگهداری فعال‌تری دارد که همیشه چیزی است که هنگام انتخاب کتابخانهٔ component باید در نظر گرفت.

#### مزایا:

- componentها در codebase ما زندگی می‌کنند (کنترل و سفارشی‌سازی کامل)
- dependency runtime برای مدیریت نداریم
- اندازهٔ bundle کوچک‌تر (فقط آنچه استفاده می‌کنیم نصب و ارسال می‌کنیم)
- روی Base UI برای functionality و accessibility ساخته شده
- آسان برای تغییر و گسترش

#### معایب:

- اگر Shadcn UI بهبود منتشر کند یا به‌روزرسانی upstream Base UI یا Tailwind باشد باید componentها را به‌صورت دستی به‌روز کنیم
- راه‌اندازی اولیه لازم است

برای این پروژه از Shadcn UI استفاده می‌کنیم. بیایید ببینیم چرا با نیازهای ما می‌خواند.

### چرا Shadcn UI را انتخاب کردیم {#h2_118}

برای این پروژه، Shadcn UI را به دلایل زیر انتخاب کردیم:

- **مالکیت**: componentها بخشی از codebase ما می‌شوند، پس می‌توانیم هر طور نیاز داریم سفارشی‌سازی کنیم بدون نگرانی از محدودیت‌های کتابخانه یا تغییرات breaking از upstream
- **استک مدرن**: از Tailwind CSS برای styling استفاده می‌کند که با practiceهای توسعهٔ مدرن React هماهنگ است و styling را intuitive و سریع می‌کند
- **Accessibility**: روی Base UI ساخته شده که نیازمندی‌های پیچیدهٔ accessibility (keyboard navigation، focus management، attributeهای ARIA) را handle می‌کند که implement کردن صحیح آن‌ها توسط خودمان زمان قابل توجهی می‌برد
- **اندازهٔ Bundle**: فقط componentهایی را شامل می‌کنیم که واقعاً استفاده می‌کنیم و اپلیکیشن را lean نگه می‌داریم
- **تجربهٔ توسعه‌دهنده**: CLI اضافه کردن componentها را ساده می‌کند و چون در codebase ما هستند دقیقاً می‌توانیم ببینیم چگونه کار می‌کنند

### پیکربندی Shadcn UI {#h2_119}

componentهای Shadcn UI را می‌توان با CLI یا دستی به پروژه اضافه کرد. بیایید هر دو رویکرد را ببینیم.

#### استفاده از CLI {#h3_120}

CLI Shadcn همهٔ فایل‌ها و پیکربندی‌های لازم را برای ما راه‌اندازی می‌کند اگر دستور زیر را اجرا کنیم:

```
npx shadcn@latest init --base=base --preset=vega
```

Base UI را به‌عنوان کتابخانهٔ component و Vega را به‌عنوان preset انتخاب می‌کنیم. این دستور موارد زیر را انجام می‌دهد:

- نصب dependencyهای لازم
- ایجاد فایل‌های پیکربندی
- راه‌اندازی styleهای Tailwind CSS
- پیکربندی path alias

CLI فایل `components.json` تولید می‌کند که پیکربندی تولید componentها را دارد:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "base-vega",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/app/app.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "rtl": false,
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "menuColor": "default",
  "menuAccent": "subtle",
  "registries": {}
}
```

پیکربندی چه کاری انجام می‌دهد:

- `style`: style طراحی مورد استفاده (`base-vega` برای استفاده از Base UI به‌عنوان کتابخانهٔ component با preset Vega)
- `tailwind.css`: محل پیدا کردن فایل Tailwind CSS
- `aliases`: نگاشت مسیرهایی که با پیکربندی TypeScript ما مطابقت دارند که Shadcn UI باید بداند چون از این پوشه‌ها برای ذخیرهٔ componentها و utilityهای لازم استفاده می‌کند
- `iconLibrary`: کتابخانهٔ آیکون مورد استفاده (`lucide-react`)

#### اضافه کردن component {#h3_121}

حالا می‌توانیم با CLI component اضافه کنیم:

```
npx shadcn@latest add button
```

این دستور component را تولید و به codebase ما اضافه می‌کند. component تولیدشدهٔ button این‌طور به نظر می‌رسد:

```tsx
// src/components/ui/button.tsx

import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-md border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/80',
        outline:
          'border-border bg-background shadow-xs hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground',
        ghost:
          'hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50',
        destructive:
          'bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default:
          'h-9 gap-1.5 px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),8px)] px-2 text-xs in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: 'h-8 gap-1 rounded-[min(var(--radius-md),10px)] px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5',
        lg: 'h-10 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3',
        icon: 'size-9',
        'icon-xs':
          "size-6 rounded-[min(var(--radius-md),8px)] in-data-[slot=button-group]:rounded-md [&_svg:not([class*='size-'])]:size-3",
        'icon-sm':
          'size-8 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-md',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonPrimitive.Props&VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
```

ویژگی‌های کلیدی component تولیدشده:

- **Type-safe**: از TypeScript برای validate کردن propها استفاده می‌کند
- **Variant**: استایل‌های بصری مختلف (`default`، `destructive`، `outline`، `secondary`، `ghost`، `link`)
- **Size**: اندازه‌های مختلف (`default, sm, lg, icon`)
- قابل گسترش: می‌توانیم styleها را با prop className override کنیم
- **Accessible**: روی primitiveهای Base UI ساخته شده

می‌توانیم چندین component را یکجا با ارائهٔ چندین component به دستور `add` تولید کنیم:

```
npx shadcn@latest add button card
```

### ساخت component به‌صورت دستی {#h2_122}

همچنین می‌توانیم با مراجعه به وبسایت Shadcn UI componentها را به‌صورت دستی اضافه کنیم:

![Figure 3.1 – Installing Shadcn UI components manually](/images/B31385_3_1.png)

**Figure 3.1 — نصب دستی componentهای Shadcn UI**

فرایند دستی شامل موارد زیر است:

- ایجاد فایل component در `src/components/ui/`
- کپی کد component از وبسایت به فایل component
- نصب dependencyهای لازم به‌صورت دستی

در حالی که CLI سریع‌تر است، رویکرد دستی کنترل بیشتری روی آنچه به پروژه اضافه می‌شود به ما می‌دهد.

حالا که componentهایمان را داریم، به راهی برای مستند کردن و آزمایش آن‌ها نیاز داریم.

برای آخرین دستورالعمل‌های راه‌اندازی، همیشه مستندات رسمی Shadcn UI را در https://ui.shadcn.com/ ببینید.

## مستندسازی component {#h1_129}

component `Button` ما variantها و اندازه‌های مختلفی دارد. به راهی برای مستند کردن و test کردن این stateهای مختلف نیاز داریم. در این بخش دو رویکرد را بررسی می‌کنیم:

- ایجاد route اختصاصی در اپلیکیشن
- استفاده از Storybook برای مستندسازی component

می‌توانیم از ساده‌ترین رویکرد شروع کنیم.

### ایجاد route component {#h2_130}

راه سادهٔ مشاهدهٔ componentها ایجاد یک route اختصاصی است. می‌توانیم یک route components در اپلیکیشن ایجاد کنیم:

```tsx
// src/app/routes/components.tsx
import { Button } from '@/components/ui/button';

export default function Components() {
  return (
    <div className="container mx-auto py-8 space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-8">Components in Action</h1>
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Button Component</h2>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Variants</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="default">Default</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Sizes</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon-sm">⌕</Button>
              <Button size="icon">⌕</Button>
              <Button size="icon-lg">⌕</Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
```

همهٔ variantهای button را render می‌کند:

![Figure 3.2 – Documenting components on a dedicated application route](/images/B31385_3_2.png)

**Figure 3.2 — مستندسازی componentها در route اختصاصی اپلیکیشن**

این رویکرد بدون setup اضافی زیاد کار می‌کند، اما چندین مشکل دارد:

- **componentها را در اپلیکیشن expose می‌کند**: Routeهای اپلیکیشن باید روی featureها تمرکز کنند، نه مستندسازی component
- **نگهداری سخت**: اضافه کردن هر component و variant به یک route شلوغ می‌شود
- **interactivity ندارد**: نمی‌توانیم به‌راحتی ترکیب‌های مختلف prop را test کنیم
- **ایزولاسیون ندارد**: componentها از اپلیکیشن جداگانه develop نمی‌شوند

به راه‌حل بهتری نیاز داریم. اینجاست که Storybook وارد میدان می‌شود.

### Storybook چیست؟ {#h2_131}

Storybook ابزاری برای develop و test کردن componentهای UI به‌صورت ایزوله است. به‌عنوان کاتالوگ componentهای اپلیکیشن ما عمل می‌کند.

مزایای استفاده از Storybook:

- **ایزولاسیون component**: develop و test کردن componentها بدون اجرای کل اپلیکیشن
- **تست بصری**: دیدن همهٔ variantهای یک component در یک جا
- playground تعاملی: آزمایش با ترکیب‌های مختلف prop به‌صورت real-time
- **مستندات زنده**: Story با کد ما به‌روز می‌مانند
- **همکاری تیمی**: طراحان و product manager می‌توانند componentها را بدون setup فنی بررسی کنند
- **تست regression**: گرفتن باگهای بصری با مقایسهٔ screenshot از storyها. اگر می‌خواهید عمیق‌تر دربارهٔ تست regression با Storybook بدانید، مستندات آن‌ها را در [https://storybook.js.org/docs/writing-tests/visual-testing](https://storybook.js.org/docs/writing-tests/visual-testing) ببینید.

بیایید ببینیم چگونه Storybook را برای کار با پروژهٔ ما پیکربندی کنیم.

### پیکربندی Storybook {#h2_132}

می‌توانیم از Storybook CLI برای نصب و پیکربندی خودکار همه‌چیز استفاده کنیم.

Storybook با دستور زیر در پروژه مقداردهی اولیه می‌شود:

```
npm create storybook@latest
```

این دستور موارد زیر را انجام می‌دهد:

- نصب Storybook و dependencyهایش
- ایجاد پوشهٔ `.storybook` با فایل‌های پیکربندی
- اضافه کردن اسکریپت‌های Storybook به `package.json`
- تشخیص setup پروژه (React، Vite، TypeScript) و پیکربندی بر اساس آن

چند چیز هست که باید پیکربندی کنیم تا Storybook با پروژهٔ ما کار کند.

### پیکربندی Vite برای Storybook {#h2_133}

چون از React Router با Vite استفاده می‌کنیم، باید تنظیم کوچکی در پیکربندی Vite انجام دهیم. پلاگین React Router فقط باید هنگام build کردن اپلیکیشن اجرا شود، نه هنگام اجرای Storybook.

باید `vite.config.ts` را به‌روز کنیم:

```ts
// vite.config.ts
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const isStorybook = process.env.STORYBOOK === 'true';

export default defineConfig({
  plugins: [tailwindcss(), !isStorybook && reactRouter(), tsconfigPaths()],
});
```

تغییرات:

- `const isStorybook = process.env.STORYBOOK === 'true';`: تشخیص اینکه آیا Storybook اجرا می‌شود
- `!isStorybook && reactRouter()`: فقط پلاگین React Router را وقتی Storybook اجرا نمی‌شود بارگذاری می‌کنیم. در Storybook به آن نیاز نداریم؛ به همین دلیل غیرفعالش می‌کنیم

این از conflict بین React Router و Storybook در setup Vite جلوگیری می‌کند.

#### پیکربندی preview Storybook {#h3_134}

فایل `.storybook/preview.ts` نحوهٔ نمایش storyهای ما را کنترل می‌کند. باید styleهای اپلیکیشنمان را import کنیم تا componentها در Storybook دقیقاً همان‌طور به نظر برسند که در اپلیکیشن هستند:

```ts
// .storybook/preview.ts
import type { Preview } from '@storybook/react-vite'
import '../src/app/app.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;
```

پیکربندی چه کاری انجام می‌دهد:

- `import '../src/app/app.css'`: styleهای Tailwind CSS ما را import می‌کند تا componentها با styling صحیح render شوند
- `parameters.controls.matchers`: به Storybook می‌گوید color picker برای propهای color و date picker برای propهای date فراهم کند

### اجرای Storybook {#h2_135}

CLI دو اسکریپت جدید به `package.json` اضافه کرده:

```json
{
  "scripts": {
    "storybook": "STORYBOOK=true storybook dev -p 6006",
    "build-storybook": "STORYBOOK=true storybook build"
  }
}
```

حالا می‌توانیم Storybook را با دستورات زیر اجرا کنیم:

```
# شروع development server Storybook
npm run storybook

# build کردن Storybook static برای deployment
npm run build-storybook
```

دستور `storybook` development server روی پورت `6006` راه‌اندازی می‌کند. وقتی [http://localhost:6006](http://localhost:6006) را در مرورگر باز کنیم، رابط Storybook با همهٔ componentهای مستند شده را می‌بینیم.

### مستندسازی component با Storybook {#h2_136}

حالا که Storybook را پیکربندی کردیم، بیایید اولین story خود را بسازیم. Story نمونه‌هایی از نحوهٔ استفادهٔ component با propهای مختلف هستند.

#### ایجاد فایل story {#h3_137}

فایل‌های story از convention نام‌گذاری `ComponentName.stories.tsx` استفاده می‌کنند. از **Component Story Format version 3** (**CSF3**) استفاده می‌کنیم که روش مدرن نوشتن storyهای Storybook است. بیایید story برای component `Button` بسازیم:

```tsx
// src/components/ui/button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from './button';

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
      ],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'default',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Delete',
    variant: 'destructive',
  },
};

// ... storyهای بیشتر ...
```

بیایید ببینیم هر بخش چه کاری انجام می‌دهد:

#### پیکربندی Meta {#h4_138}

آبجکت `meta` پیکربندی برای همهٔ storyهای این component را تعریف می‌کند:

- `title: 'UI/Button'`: story را در sidebar Storybook زیر **UI > Button** سازمان‌دهی می‌کند
- `component: Button`: به Storybook می‌گوید این storyها برای کدام component هستند
- `parameters: { layout: 'centered' }`: component را در canvas وسط قرار می‌دهد
- `tags: ['autodocs']`: به‌طور خودکار مستندات از propها و storyهای component تولید می‌کند
- `argTypes`: controlهای تعاملی برای propهای component در پنل controls Storybook تعریف می‌کند

#### پیکربندی ArgTypes {#h4_139}

بخش `argTypes` controlهای تعاملی در Storybook ایجاد می‌کند:

- `variant`: dropdown با همهٔ گزینه‌های variant ایجاد می‌کند
- `size`: dropdown با همهٔ گزینه‌های size ایجاد می‌کند
- `asChild` و `disabled`: switch toggle برای propهای boolean ایجاد می‌کنند

#### Storyهای جداگانه {#h4_140}

هر story export شده نمایانگر state یا variation متفاوت component است:

- `Default`: دکمهٔ پیش‌فرض را نشان می‌دهد
- `Destructive`: variant مخرب (برای عملیات حذف) را نشان می‌دهد
- `Outline`، `Secondary`، `Ghost`، `Link`: استایل‌های بصری مختلف را نشان می‌دهند
- `Small` و `Large`: اندازه‌های مختلف را نشان می‌دهند
- `Disabled`: state غیرفعال را نشان می‌دهد

هر story آبجکت `args` دارد که propهای ارسالی به component را تعریف می‌کند. این‌ها را می‌توان در پنل controls Storybook تغییر داد تا ببینیم component به ورودی‌های مختلف چگونه پاسخ می‌دهد.

### مشاهدهٔ storyها در Storybook {#h2_137}

وقتی `npm run storybook` را اجرا و [http://localhost:6006](http://localhost:6006) را باز کنیم، رابط Storybook را می‌بینیم:

![Figure 3.3 – Viewing documented components in Storybook](/images/B31385_3_3.png)

**Figure 3.3 — مشاهدهٔ componentهای مستند شده در Storybook**

رابط Storybook چندین بخش کلیدی دارد:

- **Sidebar (چپ)**: همهٔ componentها و storyهای آن‌ها را فهرست می‌کند
- **Canvas (مرکز)**: component render شده را نشان می‌دهد
- **Controls panel (پایین)**: controlهای تعاملی برای تغییر propهای component
- **تب Docs**: مستندات خودکار تولید شده که همهٔ variantها و توضیحات prop را نشان می‌دهد

می‌توانیم:

- روی storyهای مختلف کلیک کنیم تا stateهای مختلف را ببینیم
- از پنل controls برای تغییر تعاملی propها استفاده کنیم
- به تب **Docs** سوئیچ کنیم تا همهٔ variantها را یکجا ببینیم
- مثال‌های کد نحوهٔ استفاده از component را کپی کنیم

با داشتن کتابخانهٔ component و سیستم مستندات، می‌توانیم با اطمینان UI اپلیکیشنمان را بسازیم.

## خلاصه {#h1_142}

در این فصل بنیان رابط کاربری اپلیکیشنمان را ساختیم.

با فهمیدن اینکه componentها چیستند شروع کردیم — تکه‌های خودبسندهٔ UI که از prop برای ورودی، state برای مدیریت مقدارها، event handler برای تعاملات و TypeScript برای type safety استفاده می‌کنند.

سپس رویکردهای مختلف کتابخانهٔ component را ارزیابی کردیم. Shadcn UI را انتخاب کردیم چون با کپی مستقیم componentها در codebase کنترل کامل به ما می‌دهد و در عین حال از Base UI برای accessibility و Tailwind CSS برای styling بهره‌مند می‌شویم. می‌توانیم از shadcn CLI برای اضافه کردن componentها استفاده کنیم یا کد را دستی کپی کنیم.

در پایان، Storybook را برای مستندسازی component راه‌اندازی کردیم. Storybook را طوری پیکربندی کردیم که با React Router و Vite کار کند، فایل‌های story ساختیم که stateهای مختلف component را نمایش می‌دهند و یاد گرفتیم Storybook محیط ایزوله‌ای برای develop و test کردن componentها فراهم می‌کند. این کاتالوگ زنده‌ای به ما می‌دهد که طراحان، توسعه‌دهندگان و stakeholder می‌توانند به آن مراجعه کنند.

با داشتن کتابخانهٔ component و سیستم مستندات، آماده‌ایم ساخت featureهای اپلیکیشنمان را شروع کنیم.
