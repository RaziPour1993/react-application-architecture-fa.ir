# فصل ۴: روتینگ و استراتژی‌های رندرینگ {#h1_145 .chapterTitle}

وقتی کاربر به URL اپلیکیشن ما مراجعه می‌کند، اپلیکیشن باید تصمیم بگیرد چه UI‌ای به کاربر نمایش داده شود. اینجاست که روتینگ وارد میدان می‌شود. فراتر از فقط نمایش صفحهٔ درست، باید در نظر بگیریم چگونه و چه زمانی آن صفحه render می‌شود: روی سرور، در مرورگر یا ترکیبی از هر دو. این تصمیمات می‌توانند تأثیر قابل توجهی روی عملکرد، تجربهٔ کاربر و SEO داشته باشند.

موارد زیر را پوشش می‌دهیم:

- روتینگ با React Router
- استراتژی‌های رندرینگ
- اضافه کردن meta tag به صفحات
- اضافه کردن page layout

در پایان این فصل، درک محکمی از نحوهٔ کار روتینگ در اپلیکیشن‌های مدرن React، نحوهٔ پیکربندی مؤثر routeها و نحوهٔ انتخاب استراتژی رندرینگ مناسب برای هر صفحه برای بهینه‌سازی عملکرد و تجربهٔ کاربر خواهیم داشت.

## پیش‌نیازهای فنی {#h1_146}

قبل از شروع، باید پروژه را راه‌اندازی کنیم. برای توسعهٔ پروژه به ابزارهای زیر روی کامپیوتر نیاز داریم:

- **Node.js** نسخهٔ ۲۴ یا بالاتر. نسخهٔ **npm** ۱۱ یا بالاتر همراه Node ارائه می‌شود. می‌توانیم با اجرای دستورات `node -v` و `npm -v` در terminal این را تأیید کنیم. راه‌های مختلفی برای نصب Node.js و npm وجود دارد. این مقالهٔ مفید را ببینید: [https://www.nodejsdesignpatterns.com/blog/5-ways-to-install-node-js](https://www.nodejsdesignpatterns.com/blog/5-ways-to-install-node-js).
- **VS Code** (اختیاری)، یک ویرایشگر محبوب برای JavaScript و TypeScript. open source است، پشتیبانی TypeScript قوی دارد و extensionهای زیادی ارائه می‌دهد. از [https://code.visualstudio.com](https://code.visualstudio.com) قابل دانلود است.

کد این کتاب در repo کتاب موجود است. برای دسترسی به لینک repository، مراحل بخش «دانلود فایل‌های کد نمونه» در پیش‌گفتار را دنبال کنید. آن را clone کنید و وارد root repository شوید:

```bash
git clone https://github.com/PacktPublishing/React-Application-Architecture-for-Production-Second-Edition.git
```

repository شامل پوشه‌های فصل با کد هر فصل است، همراه با پوشهٔ مشترک `api` که سرور API مورد استفاده در همهٔ فصل‌ها را شامل می‌شود.

ما روی فصل ۴ کار می‌کنیم، پس وارد پوشهٔ `chapter-04` شوید:

```bash
cd React-Application-Architecture-for-Production-Second-Edition/chapter-04
```

سپس dependencyها را نصب کنید:

```bash
npm install
```

همچنین باید environment variableها را فراهم کنیم:

```bash
cp .env.example .env
```

در این مرحله، frontend باید آماده باشد و روی [http://localhost:5173](http://localhost:5173) اجرا شود.

حالا frontend باید آماده باشد.

برای اطلاعات بیشتر دربارهٔ جزئیات راه‌اندازی، فایل `README.md` را ببینید.

## روتینگ با React Router {#h1_147}

روتینگ در React Router بسیار ساده است. همه‌چیز با یک فایل پیکربندی route شروع می‌شود.

### پیکربندی routeها در React Router {#h2_148}

در React Router، می‌توانیم routeها را در فایل `src/app/routes.ts` پیکربندی کنیم. این فایل خاصی است که React Router انتظار دارد در پوشهٔ `src/app` پیدا کند و از آن برای مدیریت routeهای اپلیکیشن استفاده می‌کند.

این یک مثال ساده است:

```ts
// src/app/routes.ts

import {
  type RouteConfig,
  route,
} from '@react-router/dev/routes';

export default [
  route('/', './routes/home.tsx'),
] satisfies RouteConfig;
```

routeها را با تابع `route` تعریف می‌کنیم. آرگومان اول مسیر route و آرگومان دوم مسیر ماژول route است. در این مثال، مسیر route `/` است و ماژول route در `./routes/home.tsx` تعریف شده.

اما ماژول route چه شکلی است؟

React Router انتظار دارد ماژول route UI component صفحه را به‌عنوان default export خروجی دهد، پس چیزی شبیه این خواهد بود:

```tsx
// src/app/routes/home.tsx

export default function HomePage() {
  return <div>Welcome to the home page!</div>;
}
```

حالا اگر کاربر به `/` مراجعه کند، component `HomePage` render می‌شود و متن `Welcome to the home page!` نمایش داده می‌شود.

اما اگر صفحه‌ای داشته باشیم که به مسیر پویا نیاز دارد چه؟ مثلاً صفحهٔ جزئیات idea. در چنین مواردی، مسیری مثل `/ideas/1` داریم که `1` شناسهٔ idea است. چون می‌تواند ideaهای بیشتری با شناسه‌های مختلف وجود داشته باشد، تعریف route جداگانه برای هر idea بسیار غیرعملی است، پس باید از route پویا استفاده کنیم.

در آن صورت، می‌توانیم route را این‌طور تعریف کنیم:

```ts
// src/app/routes.ts

export default [
  route('/ideas/:id', './routes/ideas/idea.tsx'),
] satisfies RouteConfig;
```

این پیکربندی route‌ای تعریف می‌کند که با هر مسیری که با `/ideas/` شروع می‌شود مطابقت دارد و `:id` پارامتر پویایی است که به component پاس داده می‌شود.

```tsx
// src/app/routes/ideas/idea.tsx

export default function IdeaPage(props: Route.ComponentProps) {
  const ideaId = props.params.id;
  return <div>Idea {ideaId}</div>;
}
```

این بدان معناست که هر بار کاربر به `/ideas/1` مراجعه کند، component ` IdeaPage` render می‌شود و `id` از طریق `props.params.id` به‌عنوان prop به component پاس داده می‌شود.

وقتی routeها را پیکربندی کردیم، به مکانیزمی برای ناوبری بین صفحات اپلیکیشن نیاز داریم. نمی‌خواهیم هر بار که می‌خواهیم به صفحه‌ای ناوبری کنیم URL را در مرورگر تایپ کنیم؛ راه بهتری وجود دارد.

### ناوبری بین صفحات {#h2_149}

برای تعریف link بین صفحات در وب اپلیکیشن‌ها، معمولاً از تگ `<a>` برای لینک کردن به صفحات دیگر استفاده می‌کنیم.

در اپلیکیشن‌های سنتی چندصفحه‌ای، کلیک روی link باعث می‌شود مرورگر سند HTML کاملاً جدیدی از سرور درخواست کند. این منجر به refresh صفحه و وقفه در تجربهٔ کاربر می‌شود.

فریم‌ورک‌های مدرن مثل React Router این مشکل را با استفاده از **client-side routing** حل می‌کنند. وقتی کاربر روی link کلیک می‌کند، JavaScript ناوبری را intercept می‌کند، URL مرورگر را به‌روز می‌کند و سپس component مناسب را load و render می‌کند بدون درخواست سند HTML جدید از سرور. این تجربهٔ روان و مشابه اپلیکیشن ایجاد می‌کند چون refresh کامل صفحه را نمی‌بینیم.

آن‌ها می‌توانند این کار را با فراهم کردن componentهای `Link` و `NavLink` برای تعریف link بین صفحات به‌صورت declarative انجام دهند.

#### استفاده از Link برای ناوبری پایه {#h3_150}

component `Link` رایج‌ترین راه ناوبری بین صفحات است. تگ anchor (`<a>`) render می‌کند که کلیک‌ها را intercept می‌کند تا از reload کامل صفحه جلوگیری شود:

```tsx
// src/components/navigation.tsx
import { Link } from 'react-router';

<Link to="/" className="text-xl font-bold">
  AIdeas
</Link>
```

وقتی کاربر روی این link کلیک می‌کند، React Router URL را به `/` به‌روز می‌کند و component route مربوطه را بدون refresh صفحه render می‌کند. prop `to` مسیر مقصد را مشخص می‌کند.

#### استفاده از NavLink برای ناوبری با state فعال {#h3_151}

component `NavLink` مشابه component `Link` است اما آن را با قابلیت اعمال styling بر اساس مطابقت link با route فعلی گسترش می‌دهد. این برای menuهای ناوبری بسیار مفید است وقتی می‌خواهیم صفحهٔ فعلی را highlight کنیم:

```tsx
// src/components/navigation.tsx
import { NavLink } from 'react-router';

<NavLink
  to="/ideas"
  end
  className={({ isActive }) =>
    cn(
      'flex items-center gap-2 text-sm hover:text-primary px-3 py-2 rounded-md',
      isActive && 'font-semibold',
    )
  }
>
  <Lightbulb className="h-4 w-4" /> Discover Ideas
</NavLink>
```

prop `className` تابعی می‌پذیرد که boolean `isActive` را دریافت می‌کند. وقتی URL فعلی با مسیر `to` مطابقت دارد، `isActive` برابر `true` است و می‌توانیم styleهای مختلف اعمال کنیم. در این مثال، متن را وقتی link فعال است bold می‌کنیم.

prop `end` این `NavLink` را ببینید. به‌طور پیش‌فرض، `NavLink` route را «فعال» در نظر می‌گیرد اگر URL فعلی با مسیر `to` شروع شود. این بدان معناست که `/ideas/123` هم `/ideas` و هم `/ideas/123` را به‌عنوان فعال علامت‌گذاری می‌کند. prop `end` به `NavLink` می‌گوید فقط وقتی URL دقیقاً با مسیر `to` مطابقت دارد فعال باشد.

`Link` و `NavLink` هنگام کلیک کاربر روی link ناوبری را آغاز می‌کنند، اما اگر بخواهیم به‌صورت programmatic در واکنش به تعاملات کاربر غیر از کلیک روی link ناوبری کنیم، مثلاً بعد از ارسال فرم یا هنگام handle کردن کلیک دکمه چه؟

#### استفاده از useNavigate برای ناوبری programmatic {#h3_152}

React Router هوک `useNavigate` را فراهم می‌کند که می‌تواند برای ناوبری programmatic استفاده شود. بیایید یک مثال ساده ببینیم:

```tsx
import { useNavigate } from 'react-router';

function MyComponent() {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    await saveData(data);
    // ناوبری به صفحهٔ موفقیت
    navigate('/success');
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

هوک `useNavigate` تابعی برمی‌گرداند که می‌تواند برای ناوبری به مسیر دیگر استفاده شود. تابع مسیر را به‌عنوان آرگومان می‌پذیرد و به آن ناوبری می‌کند.

حالا که درک پایه‌ای از نحوهٔ کار روتینگ در React Router داریم، بیایید به استراتژی‌های رندرینگی بپردازیم که می‌توانیم برای ساخت صفحات اپلیکیشنمان استفاده کنیم.

## استراتژی‌های رندرینگ {#h1_153}

وقتی به صفحات اپلیکیشنمان فکر می‌کنیم، باید به نیازهایشان فکر کنیم تا درک بهتری از نحوهٔ render شدن آن‌ها داشته باشیم. برخی عوامل مورد توجه:

- فرکانس به‌روزرسانی محتوای صفحه
- تعداد صفحات
- نیازمندی‌های SEO
- نیازمندی‌های عملکرد
- زیرساخت
- عمومی یا خصوصی بودن محتوای صفحه

می‌توانیم برخی از استراتژی‌های رندرینگ زیر را انتخاب کنیم:

- **Server-side rendering** (**SSR**)
- **Client-side rendering** (**CSR**)
- **Hybrid rendering** (**SSR + CSR**)
- **Static pre-rendering**

هر استراتژی را با پیاده‌سازی آن در اپلیکیشن عمیق‌تر بررسی می‌کنیم تا بیشتر بفهمیم چرا از هر کدام استفاده می‌کنیم.

## Server-side rendering {#h2_154}

**Server-side rendering** (**SSR**) به این معناست که محتوای صفحه برای هر درخواست روی سرور تولید می‌شود. این به ما اجازه می‌دهد دادهٔ تازه از database یا API دریافت کنیم و محتوای شخصی‌سازی‌شده render کنیم و در عین حال بارگذاری سریع اولیهٔ صفحه و SEO عالی فراهم کنیم.

بیایید نحوهٔ کار SSR را بصری ببینیم:

![Figure 4.1 – Server-side rendering flow](/images/B31385_4_1.png)

**Figure 4.1 — جریان رندرینگ سمت سرور**

هر بار که کاربر صفحهٔ SSR بازدید می‌کند، سرور داده را از API دریافت و محتوای HTML صفحه را render می‌کند. مرورگر HTML کامل را دریافت و فوراً نمایش می‌دهد، سپس JavaScript بارگذاری می‌شود تا صفحه interactive شود.

مزایای اصلی استفاده از SSR:

- **SEO-friendly**: موتورهای جستجو محتوای کامل را می‌بینند چون همه‌چیز از قبل روی سرور render شده
- **بارگذاری سریع ادراکی**: محتوا فوراً بدون نیاز به انتظار برای بارگذاری JavaScript قابل مشاهده است
- **دادهٔ تازه**: همیشه از database یا API به‌روز چون داده در هر درخواست روی سرور دریافت می‌شود
- **بدون JavaScript کار می‌کند**: محتوا حتی اگر JavaScript خراب شود یا غیرفعال باشد قابل مشاهده است

پس چه زمانی باید از SSR استفاده کنیم؟ SSR برای صفحاتی ایده‌آل است که به محتوای تازه و پویا با SEO خوب نیاز دارند، مثل صفحهٔ جزئیات محصول در پلتفرم e-commerce، صفحهٔ پروفایل در پلتفرم شبکهٔ اجتماعی و غیره.

در بافت اپلیکیشن ما، صفحهٔ جزئیات idea نمونهٔ عالی صفحه‌ای است که به SSR نیاز دارد چون باید جزئیات idea و نظرات را نمایش دهد که می‌تواند به‌طور مکرر تغییر کند و باید SEO-friendly باشد.

### ساخت صفحهٔ جزئیات idea رندرشده توسط سرور {#h3_155}

چون صفحه را روی سرور render می‌کنیم، به راهی برای load کردن همهٔ داده در آنجا و پاس دادن آن به صفحه نیاز داریم:

```tsx
// src/app/routes/ideas/idea.tsx

export async function loader({ params }: Route.LoaderArgs) {
  const [idea, reviews] = await Promise.all([
    getIdeaById(params.id),
    getReviewsByIdea({ id: params.id }),
  ]);
  return routerData({
    idea,
    reviews,
  });
}
```

در React Router، این کار از طریق تابع `loader` انجام می‌شود که از ماژول `route` خروجی داده می‌شود و قبل از render شدن component روی سرور اجرا می‌شود. به ما اجازه می‌دهد داده را دریافت و برای component صفحه فراهم کنیم. Loader پارامتر `params.id` را از مسیر URL `/ideas/:id` دریافت، داده را از API دریافت و به component پاس می‌دهد:

```tsx
export default function IdeaDetailPage({ loaderData }: Route.ComponentProps) {
  const idea = loaderData?.idea;

  const reviews = loaderData?.reviews?.data;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* ... */}
      <div className="max-w-4xl mx-auto">
        <IdeaDetails idea={idea} currentUser={null} />
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Reviews ({reviews?.length || 0})
            </h2>
          </div>
          <ReviewsList
            reviews={reviews}
            emptyMessage="No reviews yet. Be the first to review this idea!"
          />
        </div>
      </div>
    </div>
  );
}
```

سپس، component داده را از تابع `loader` از طریق prop `loaderData` دریافت و می‌تواند از آن برای render کردن محتوای صفحه استفاده کند.

چیز عالی دیگر این است که کل ماژول route از نظر type از طریق typeهای TypeScript از `./+types/idea` که به‌طور خودکار توسط React Router تولید می‌شود، type-safe است.

اما اگر مشکلی با loader پیش بیاید و خطا throw کند، یا درخواست fails شود چه؟ برای handle کردن خطاها از loader، می‌توانیم `ErrorBoundary` را از ماژول `route` خروجی دهیم:

```tsx
export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* ... */}
    </div>
  );
}
```

اگر تابع `loader` خطا throw کند، component `ErrorBoundary` render می‌شود و خطا به کاربر نمایش داده می‌شود.

وقتی ماژول `route` ساخته شد، باید آن را در فایل `src/app/routes.ts` ثبت کنیم.

```ts
// src/app/routes.ts

export default [
  // ...
  route('/ideas/:id', './routes/ideas/idea.tsx'),
] satisfies RouteConfig;
```

حالا اگر به `/ideas/1` ناوبری کنیم، component `IdeaDetailPage` render می‌شود و جزئیات idea نمایش داده می‌شود.

![Figure 4.2 – Server-side rendered idea detail page](/images/B31385_4_2.png)

**Figure 4.2 — صفحهٔ جزئیات idea رندرشده توسط سرور**

برای تأیید اینکه SSR کار می‌کند، می‌توانیم JavaScript مرورگر را غیرفعال و صفحه را reload کنیم. همهٔ محتوا باید همچنان قابل مشاهده باشد.

![Figure 4.3 – Server-side rendered idea detail page without JavaScript](/images/B31385_4_3.png)

**Figure 4.3 — صفحهٔ جزئیات idea رندرشده توسط سرور بدون JavaScript**

SSR قدرتمند است، اما گاهی به SEO یا immediate content visibility نیاز نداریم. برای صفحات authenticated پشت login، client-side rendering کاملاً کافی است.

## Client-side rendering {#h2_156}

**Client-side rendering** (**CSR**) HTML حداقلی از سرور ارسال و با JavaScript بعد از بارگذاری صفحه داده دریافت می‌کند. این برای صفحات authenticated ایده‌آل است که SEO مهم نیست و می‌خواهیم بار سرور را کاهش دهیم.

CSR در اپلیکیشن ما این‌طور کار می‌کند:

![Figure 4.4 – CSR flow](/images/B31385_4_4.png)

**Figure 4.4 — جریان CSR**

وقتی کاربر به `/dashboard/ideas` مراجعه می‌کند، سرور HTML حداقلی ارسال می‌کند. JavaScript بارگذاری، محتوای صفحه render و سپس component داده دریافت می‌کند. صفحه ابتدا state بارگذاری را نمایش و سپس با رسیدن داده محتوای صفحه را به‌روز می‌کند.

برخی مزایای استفاده از CSR:

- **بار سرور را کاهش می‌دهد**: render سمت سرور در هر درخواست نداریم؛ فقط باید HTML حداقلی به client ارسال کنیم
- **زیرساخت ساده‌تر**: نیازی به پیکربندی سرور یا فرایند build نیست که برای کاهش هزینه‌های اجرای اپلیکیشن عالی است

برخی trade-offهای استفاده از CSR:

- کاربران ابتدا state بارگذاری به جای محتوا می‌بینند که تجربهٔ خوبی نیست.
- SEO بدتر (برای صفحات نیازمند auth خوب است) چون محتوای صفحه روی سرور تولید نمی‌شود. موتورهای جستجو می‌توانند JavaScript اجرا کنند و محتوای صفحه را ببینند اما به خوبی immediate content نیست.
- به JavaScript فعال در مرورگر نیاز دارد.

پس چه زمانی باید از CSR استفاده کنیم؟ CSR برای صفحاتی بهترین است که SEO مهم نیست و می‌خواهیم بار سرور را کاهش دهیم. صفحات dashboard ما (`/dashboard/ideas` و `/dashboard/reviews`) محتوای خاص کاربر را نمایش می‌دهند که به SEO نیاز ندارد و با authentication محافظت شده.

### ساخت صفحهٔ dashboard رندرشده توسط client {#h3_157}

صفحهٔ ideas dashboard ideaهای کاربر فعلی را نمایش می‌دهد. به جای دریافت در loader، با استفاده از هوک سفارشی روی client داده دریافت می‌کند:

```tsx
// src/app/routes/dashboard/ideas/ideas.tsx
import { useCurrentUserIdeasQuery } from '@/features/ideas/api/get-current-user-ideas';
import { IdeasList } from '@/features/ideas/components/ideas-list';

export default function MyIdeasPage() {
  const ideasQuery = useCurrentUserIdeasQuery();
  const ideas = ideasQuery.data?.data;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Ideas</h1>
            <p className="text-muted-foreground">
              Manage and track your submitted ideas
            </p>
          </div>
        </div>

        <IdeasList
          ideas={ideas}
          isLoading={ideasQuery.isLoading}
          emptyMessage="You haven't created any ideas yet."
          error={ideasQuery.error}
        />
      </div>
    </div>
  );
}
```

component `MyIdeasPage` بسیار ساده است چون فقط روی client با هوک سفارشی داده دریافت و محتوای صفحه را render می‌کند.

حالا که ماژول route برای این صفحه داریم، باید آن را در فایل `src/app/routes.ts` ثبت کنیم.

```ts
// src/app/routes.ts

export default [
  // ...
  route('/dashboard/ideas', './routes/dashboard/ideas/ideas.tsx'),
] satisfies RouteConfig;
```

اگر به `/dashboard/ideas` ناوبری کنیم، component `MyIdeasPage` render می‌شود و ideaهای کاربر فعلی نمایش داده می‌شود.

![Figure 4.5 – Client-rendered dashboard ideas page](/images/B31385_4_5.png)

**Figure 4.5 — صفحهٔ ideas dashboard رندرشده توسط client**

برای تأیید اینکه ابتدا چه چیزی نمایش داده می‌شود، می‌توانیم JavaScript مرورگر را غیرفعال و صفحه را reload کنیم.

![Figure 4.6 – Client-rendered dashboard ideas page without JavaScript](/images/B31385_4_6.png)

**Figure 4.6 — صفحهٔ ideas dashboard رندرشده توسط client بدون JavaScript**

ابتدا فقط state بارگذاری را می‌بینیم و سپس وقتی داده روی client دریافت شد، محتوای صفحه به‌روز می‌شود.

گاهی به بهترین هر دو دنیا نیاز داریم: محتوای immediate از سرور به‌علاوهٔ دریافت اضافی داده روی client. اینجاست که **hybrid rendering** وارد میدان می‌شود.

## Hybrid rendering {#h2_158}

**Hybrid rendering** ترکیبی از SSR و CSR است. به ما اجازه می‌دهد بهترین هر دو دنیا را داشته باشیم: محتوای immediate از سرور به‌علاوهٔ دریافت اضافی داده روی client.

hybrid rendering در اپلیکیشن ما این‌طور کار می‌کند:

![Figure 4.7 – Hybrid rendering flow](/images/B31385_4_7.png)

**Figure 4.7 — جریان رندرینگ هیبریدی**

وقتی کاربر به `/profile/johndoe` مراجعه می‌کند، loader سرور دادهٔ پروفایل را دریافت و HTML با جزئیات کامل پروفایل render می‌کند. مرورگر این را فوراً نمایش می‌دهد. بعد از hydrate شدن JavaScript، component صفحه render و بقیهٔ داده روی client دریافت می‌شود و state بارگذاری را تا رسیدن داده نمایش می‌دهد.

Hybrid rendering برای صفحاتی ایده‌آل است که هم به immediate content visibility بحرانی و هم به محتوای اضافی که می‌تواند روی client دریافت شود نیاز دارند. موارد استفاده اصلی:

- صفحات عمومی که به SEO نیاز دارند اما محتوای شخصی‌سازی‌شده هم نمایش می‌دهند
- صفحات با محتوای بحرانی (رندرشده توسط سرور) و محتوای مکمل (رندرشده توسط client)
- تعادل بین عملکرد و functionality

صفحهٔ پروفایل ما (`/profile/:username`) hybrid rendering را به دلایل زیر استفاده می‌کند:

- اطلاعات پروفایل باید فوراً برای SEO قابل مشاهده باشد
- ideaها و نظرات کاربر می‌توانند به‌صورت progressive روی client load شوند

بیایید ببینیم چگونه این در اپلیکیشن ما پیاده‌سازی می‌شود.

### ساخت صفحهٔ پروفایل هیبریدی {#h3_159}

صفحهٔ پروفایل دادهٔ بحرانی را روی سرور (اطلاعات پروفایل) و دادهٔ ideaها و نظرات اضافی را که می‌تواند روی client دریافت شود load می‌کند:

ابتدا باید ماژول `route` برای صفحهٔ پروفایل بسازیم:

```tsx
// src/app/routes/profile.tsx

import { data as routerData, Link } from 'react-router';

import { ErrorMessage } from '@/components/error-message';
import { Button } from '@/components/ui/button';
import { UserIdeas } from '@/features/ideas/components/user-ideas';
import { getProfileByUsername } from '@/features/profile/api/get-profile-by-username';
import { ProfileDetails } from '@/features/profile/components/profile-details';
import { UserReviews } from '@/features/reviews/components/user-reviews';

import type { Route } from './+types/profile';

export async function loader({ params }: Route.LoaderArgs) {
  const profile = await getProfileByUsername(params.username);

  return routerData({
    profile,
  });
}

export default function ProfilePage({
  params,
  loaderData,
}: Route.ComponentProps) {
  const profile = loaderData?.profile;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <ProfileDetails profile={profile} />
        <div className="mb-8">
          <UserIdeas username={params.username} />
        </div>
        <UserReviews username={params.username} />
      </div>
    </div>
  );
}
```

همان‌طور که می‌بینیم، دادهٔ پروفایل در تابع `loader` روی سرور دریافت و سپس از طریق prop `loaderData` به component پاس داده می‌شود.

componentهای مسئول دریافت و render کردن ideaها و نظرات، componentهای client-side هستند:

```tsx
// src/features/ideas/components/user-ideas.tsx
import { useIdeasByUserQuery } from '../api/get-ideas-by-user';
import { IdeasList } from '@/features/ideas/components/ideas-list';

export function UserIdeas({ username }: { username: string }) {
  const ideasQuery = useIdeasByUserQuery({ username });
  const ideas = ideasQuery.data?.data;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">
        Ideas by {username} ({ideas?.length || 0})
      </h2>
      <IdeasList
        ideas={ideas}
        isLoading={ideasQuery.isLoading}
        emptyMessage={`${username} hasn't shared any ideas yet.`}
        error={ideasQuery.error}
      />
    </div>
  );
}
```

و همچنین component `UserReviews`:

```tsx
// src/features/reviews/components/user-reviews.tsx
import { useReviewsByUserQuery } from '../api/get-reviews-by-user';
import { ReviewsList } from '@/features/reviews/components/reviews-list';

export function UserReviews({ username }: { username: string }) {
  const reviewsQuery = useReviewsByUserQuery({ username });
  const reviews = reviewsQuery.data?.data;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">
        Reviews by {username} ({reviews?.length || 0})
      </h2>

      <ReviewsList
        reviews={reviews}
        isLoading={reviewsQuery.isLoading}
        showIdeaTitle
        emptyMessage={`${username} hasn't written any reviews yet.`}
        error={reviewsQuery.error}
      />
    </div>
  );
}
```

هر دو component با استفاده از هوک سفارشی روی client داده دریافت می‌کنند. هنگام دریافت state بارگذاری نمایش و با رسیدن داده به‌روز می‌شوند. اما اشکالی ندارد چون می‌خواهیم دادهٔ پروفایل را هرچه سریع‌تر load کنیم و سپس دادهٔ ideaها و نظرات را به‌صورت progressive روی client load کنیم.

حالا که ماژول `route` برای این صفحه داریم، باید آن را در فایل `src/app/routes.ts` ثبت کنیم.

```ts
// src/app/routes.ts

export default [
  // ...
  route('/profile/:username', './routes/profile.tsx'),
] satisfies RouteConfig;
```

اگر به `/profile/johndoe` ناوبری کنیم، component `ProfilePage` render می‌شود و جزئیات پروفایل نمایش داده می‌شود.

![Figure 4.8 – Hybrid-rendered profile page](/images/B31385_4_8.png)

**Figure 4.8 — صفحهٔ پروفایل رندرشده به‌صورت هیبریدی**

برای تأیید اینکه ابتدا چه چیزی نمایش داده می‌شود، می‌توانیم JavaScript مرورگر را غیرفعال و صفحه را reload کنیم.

![Figure 4.9 – Hybrid-rendered profile page without JavaScript](/images/B31385_4_9.png)

**Figure 4.9 — صفحهٔ پروفایل رندرشده به‌صورت هیبریدی بدون JavaScript**

همان‌طور که می‌بینیم، دادهٔ پروفایل قابل مشاهده است اما ideaها و نظرات نیستند، پس فقط stateهای بارگذاری را می‌بینیم. وقتی داده روی client دریافت شد، محتوای صفحه به‌روز می‌شود.

اما اگر صفحاتی داشته باشیم که static هستند و محتوای صفحه نباید در هر درخواست تولید شود چه؟ اینجاست که **static pre-rendering** وارد میدان می‌شود.

## Static pre-rendering {#h2_160}

صفحات **static pre-rendered** صفحاتی هستند که در زمان build تولید و به‌عنوان فایل HTML سرو می‌شوند. سریع بارگذاری می‌شوند، بدون JavaScript کار می‌کنند و برای محتوایی که به‌طور مکرر تغییر نمی‌کند عالی هستند.

بیایید نحوهٔ کار static pre-rendering را بصری ببینیم:

![Figure 4.10 – Pre-rendering flow](/images/B31385_4_10.png)

**Figure 4.10 — جریان pre-rendering**

در زمان build، داده (در صورت نیاز) برای صفحه دریافت و محتوای HTML صفحه تولید می‌شود که به‌عنوان فایل static سرو خواهد شد. سپس مرورگر فایل HTML را بارگذاری و محتوا را نمایش می‌دهد.

Pre-rendering برای صفحاتی با محتوای static یا به‌ندرت تغییرکننده ایده‌آل است که از بارگذاری سریع و SEO بهره‌مند می‌شوند. موارد استفاده اصلی:

- صفحات بازاریابی و landing page با محتوای static
- پست‌های بلاگ و مستنداتی که به‌طور مکرر تغییر نمی‌کنند
- صفحاتی که به دادهٔ خاص کاربر نیاز ندارند
- محتوایی که برای همهٔ بازدیدکنندگان یکسان است

صفحات home و about ما کاندیداهای عالی برای pre-rendering هستند چون محتوای بازاریابی static را نمایش می‌دهند که برای همهٔ بازدیدکنندگان یکسان است.

### ساخت صفحات home و about pre-rendered {#h3_161}

صفحات home و about ما routeهای استاندارد با componentی هستند که UI را render می‌کند:

```tsx
// src/app/routes/home.tsx

export default function HomePage() {
  // ...
}
```

و صفحهٔ about:

```tsx
// src/app/routes/about.tsx

export default function AboutPage() {
  // ...
}
```

سپس باید routeها را در فایل `src/app/routes.ts` ثبت کنیم:

```ts
// src/app/routes.ts

export default [
  // ...
  index('routes/home.tsx'),
  route('/about', './routes/about.tsx'),
] satisfies RouteConfig;
```

برای فعال کردن pre-rendering، React Router را طوری پیکربندی می‌کنیم که HTML را در زمان build تولید کند در فایل `react-router.config.ts`:

```ts
// react-router.config.ts
import type { Config } from '@react-router/dev/config';

export default {
  ssr: true,
  appDirectory: 'src/app',
  async prerender() {
    return ['/', '/about'];
  },
} satisfies Config;
```

داریم به React Router می‌گوییم صفحات home و about را در زمان build pre-render کند. این فایل‌های HTML صفحات home و about را تولید و در پوشهٔ `build` ذخیره می‌کند، آماده برای سرو شدن به‌عنوان فایل‌های HTML pre-rendered.

اگر دستور `npm run build` را اجرا کنیم، فایل‌های HTML صفحات home و about در پوشهٔ `build` تولید می‌شوند.

![Figure 4.11 – Pre-rendered home and about page files](/images/B31385_4_11.png)

**Figure 4.11 — فایل‌های صفحات home و about pre-rendered**

همان‌طور که می‌بینیم، فایل‌های HTML در پوشهٔ `build` تولید شده و آمادهٔ سرو شدن به‌عنوان فایل‌های HTML pre-rendered هستند.

قبلاً اشاره کردیم که render کردن محتوای صفحه روی سرور برای SEO مهم است، اما هنوز یک بخش مرتبط با SEO باقی مانده: meta tag.

## اضافه کردن meta tag به صفحات {#h1_162}

React Router دو راه برای اضافه کردن meta tag به صفحات پشتیبانی می‌کند:

- خروجی دادن تابع `meta` از ماژول `route`
- استفاده از تگ `<meta>`

تابع `meta` تابعی است که می‌تواند در ماژول `route` تعریف شود. آرایه‌ای از meta tag خروجی می‌دهد که به صفحه اضافه می‌شوند.

```tsx
// src/app/routes/home.tsx

export function meta() {
  return [
    { title: 'AIdeas - Share and Discover AI Ideas' },
    { name: 'description', content: 'AIdeas - A community platform for sharing, reviewing, and discovering innovative AI application ideas' },
  ];
}
```

از React 19 به بعد، استفاده از عنصر داخلی `<meta>` که توسط React فراهم شده به جای تابع `meta` توصیه می‌شود.

```tsx
// src/app/routes/home.tsx

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <title>AIdeas - Share and Discover AI Ideas</title>
      <meta name="description" content="AIdeas - A community platform for sharing, reviewing, and discovering innovative AI application ideas" />
      {/* ... */}
    </div>
  );
}
```

می‌توانیم این کار را برای هر صفحه انجام دهیم. اگر این‌طور است، آیا بهتر نیست component قابل استفادهٔ مجددی برای meta tag بسازیم؟

بیایید component `Seo` را بسازیم که برای اضافه کردن تگهای `title` و `meta` به صفحه استفاده می‌شود. برای سادگی، فقط تگ `title` و تگ `meta` description را به صفحه اضافه می‌کنیم اما می‌تواند در آینده برای اضافه کردن meta tagهای بیشتر گسترش یابد.

```tsx
// src/components/seo.tsx

export function Seo({ title, description }: { title: string; description: string }) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
    </>
  );
}
```

حالا می‌توانیم این component را در صفحاتمان استفاده کنیم:

```tsx
// src/app/routes/home.tsx

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <Seo title="AIdeas - Share and Discover AI Ideas" description="AIdeas - A community platform for sharing, reviewing, and discovering innovative AI application ideas" />
      {/* ... */}
    </div>
  );
}
```

این صفحات ما را برای SEO بسیار بهینه‌تر می‌کند که به بهبود رتبهٔ موتورهای جستجوی اپلیکیشنمان کمک می‌کند.

تقریباً رسیدیم. بخش نهایی باقی‌ماندهٔ صفحات اپلیکیشن، ناوبری است. راه واضحی برای ناوبری بین صفحات نداریم. چون ناوبری componentی مشترک است که در هر صفحه render می‌شود، منطقی است که در هر صفحه قابل مشاهده باشد.

## اضافه کردن page layout {#h1_163}

در حال حاضر، صفحات اپلیکیشن ما خوب کار می‌کنند اما ناوبری وجود ندارد، پس راه واضحی برای ناوبری از صفحهٔ home به dashboard نیست. ما قبلاً component ناوبری در `src/components/navigation.tsx` داریم. در حالی که می‌توانیم آن را به‌طور جداگانه به هر صفحه اضافه کنیم، بهتر است آن را به layout اضافه کنیم چون layout از rerenderهای غیرضروری هنگام ناوبری بین صفحات جلوگیری می‌کند.

**Layout** componentهایی هستند که محتوای صفحات را wrap می‌کنند و ساختار مشترکی اطراف آن‌ها فراهم می‌کنند. مورد استفادهٔ رایج layout ناوبری است. می‌خواهیم ناوبری در هر صفحه قابل مشاهده بماند تا تجربهٔ کاربر یکدست فراهم شود. در اپلیکیشن ما، ۲ سطح ناوبری داریم:

- ناوبری اصلی که در هر صفحه render می‌شود
- ناوبری dashboard که در صفحات dashboard render می‌شود

برای دستیابی به این هدف، componentهای layout می‌سازیم که routeهای اپلیکیشن را wrap می‌کنند.

ابتدا component layout اصلی می‌سازیم که routeهای اپلیکیشن را wrap می‌کند:

![Figure 4.12 – Root layout structure](/images/B31385_4_12.png)

**Figure 4.12 — ساختار layout root**

همان‌طور که می‌بینیم، layout اصلی باید ناوبری را در بالای صفحه و محتوای صفحه را در زیر آن نمایش دهد.

در React Router، component layout UI elementهای مشترک را render و شامل `<Outlet />` componentی است که routeهای فرزند در آن render می‌شوند. می‌توانیم `Outlet` را به‌عنوان placeholder برای routeهایی که layout wrap می‌کند در نظر بگیریم. layout root ما:

```tsx
// src/app/routes/layout.tsx

import { Outlet } from 'react-router';

import { Navigation } from '@/components/navigation';

export default function Layout() {
  return (
    <div>
      <Navigation />
      <main className="min-h-screen bg-background">
        <Outlet />
      </main>
    </div>
  );
}
```

همان‌طور که می‌بینیم، component layout ناوبری را در بالای صفحه و محتوای صفحه را در زیر آن render می‌کند.

برای wrap کردن صفحات توسط layout، باید layout را در فایل پیکربندی `routes` ثبت کنیم:

```ts
// src/app/routes.ts

export default [
  layout('./routes/layout.tsx', [
    route('ideas/:id', './routes/ideas/idea.tsx'),
    route('ideas', './routes/ideas/ideas.tsx'),
    // ...
  ]),
] satisfies RouteConfig;
```

layout routeهایی را wrap می‌کند که ناوبری باید در آن‌ها قابل مشاهده باشد. وقتی کاربر صفحهٔ `/ideas/1` را بازدید می‌کند، layout render و ناوبری در بالای صفحه حضور خواهد داشت.

![Figure 4.13 – Top-level navigation](/images/B31385_4_13.png)

**Figure 4.13 — ناوبری سطح بالا**

حالا راه واضحی برای ناوبری بین صفحهٔ home، صفحهٔ ideas و dashboard داریم.

Dashboard ما هم به ناوبری برای ناوبری بین صفحات dashboard نیاز دارد.

![Figure 4.14 – Dashboard navigation](/images/B31385_4_14.png)

**Figure 4.14 — ناوبری dashboard**

بیایید component layout dashboard را بسازیم که routeهای dashboard را wrap می‌کند.

```tsx
// src/app/routes/dashboard/layout.tsx

import { LayoutDashboard, Home, MessageSquare } from 'lucide-react';
import { NavLink, Outlet } from 'react-router';

import { cn } from '@/lib/utils';

export default function DashboardLayout() {
  // ...

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-6">
          {/* ... */}
        </nav>
        <Outlet />
      </div>
    </div>
  );
}
```

حالا باید layout dashboard را در فایل `src/app/routes.ts` ثبت کنیم:

```ts
// src/app/routes.ts

export default [
  layout('./routes/layout.tsx', [
    route('ideas/:id', './routes/ideas/idea.tsx'),
    route('ideas', './routes/ideas/ideas.tsx'),
    layout('./routes/dashboard/layout.tsx', [
      route('dashboard', './routes/dashboard/dashboard.tsx'),
      route('dashboard/ideas', './routes/dashboard/ideas/ideas.tsx'),
      route('dashboard/reviews', './routes/dashboard/reviews.tsx'),
    ]),
    // ...
  ]),
] satisfies RouteConfig;
```

حالا می‌توانیم به `/dashboard` ناوبری و صفحهٔ dashboard را ببینیم. همچنین اگر به `/dashboard/ideas` یا `/dashboard/reviews` ناوبری کنیم، ناوبری dashboard هم قابل مشاهده خواهد بود چون layout تو در تو است.

![Figure 4.15 – Dashboard page](/images/B31385_4_15.png)

**Figure 4.15 — صفحهٔ dashboard**

همان‌طور که می‌بینیم، ناوبری dashboard و ناوبری سطح بالا هر دو قابل مشاهده هستند.

حالا راه واضحی برای ناوبری بین صفحات سطح بالا و dashboard داریم که تجربهٔ کاربر اپلیکیشنمان را بهبود می‌بخشد.

ساختار نهایی route تعریف‌شده در فایل `src/app/routes.ts` این‌طور به نظر می‌رسد:

```ts
// src/app/routes.ts

import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from '@react-router/dev/routes';

export default [
  layout('./routes/layout.tsx', [
    index('routes/home.tsx'),
    route('about', './routes/about.tsx'),
    ...prefix('dashboard', [
      layout('./routes/dashboard/layout.tsx', [
        index('./routes/dashboard/dashboard.tsx'),
        route('ideas', './routes/dashboard/ideas/ideas.tsx'),
        route('reviews', './routes/dashboard/reviews.tsx'),
      ]),
    ]),
    route('profile/:username', './routes/profile.tsx'),
    route('ideas/:id', './routes/ideas/idea.tsx'),
    route('ideas', './routes/ideas/ideas.tsx'),
    route('*', './routes/not-found.tsx'),
  ]),
] satisfies RouteConfig;
```

پیکربندی بسیار ساده است اما چند چیز هست که قبلاً پوشش ندادیم:

- تابع `prefix` برای گروه‌بندی routeها زیر یک prefix مشترک استفاده می‌شود. همهٔ routeهای داخل `prefix('dashboard', [...])` با `/dashboard` شروع می‌شوند.
- تابع `index` برای تعریف route پیش‌فرض یک مسیر استفاده می‌شود. مثلاً `index('routes/home.tsx')` صفحهٔ home را وقتی URL برابر `/` است render می‌کند.
- route `*` برای تعریف catch-all route استفاده می‌شود. با هر URL‌ای که با route قبلی مطابقت نداشته باشد مطابقت می‌کند و صفحهٔ not found را render می‌کند.

در صورتی که routeهای زیادی داشته باشیم و پیکربندی پیچیده شود، می‌توانیم آن‌ها را این‌طور ترکیب کنیم:

```ts
const dashboardRoutes = [/* ... */];
const profileRoutes = [/* ... */];
const ideasRoutes = [/* ... */];

const rootRoutes = [
  index('routes/home.tsx'),
  route('about', './routes/about.tsx'),
  ...dashboardRoutes,
  ...profileRoutes,
  ...ideasRoutes,
  route('*', './routes/not-found.tsx'),
];
```

حالا همهٔ صفحات اپلیکیشن پیکربندی شده و آمادهٔ استفاده هستند.

## خلاصه {#h1_164}

در این فصل، روتینگ و استراتژی‌های رندرینگ در React Router را بررسی کردیم و تصمیمات معماری ضروری برای ساخت اپلیکیشن‌های مدرن React را پوشش دادیم.

با یادگیری نحوهٔ پیکربندی routeها با استفاده از تابع `route` در `src/app/routes.ts` شروع کردیم، از جمله routeهای پویا با پارامتر. سپس ناوبری بین صفحات با componentهای `Link` و `NavLink` برای ناوبری declarative و هوک `useNavigate` برای ناوبری programmatic را پوشش دادیم.

چهار استراتژی رندرینگ را بررسی کردیم، هر کدام مناسب موارد استفادهٔ مختلف:

- **Server-side rendering** (**SSR**) محتوای صفحه را برای هر درخواست روی سرور تولید می‌کند. از SSR برای صفحهٔ جزئیات idea استفاده کردیم چون به دادهٔ تازه، SEO خوب و immediate content visibility نیاز دارد. این رویکرد برای صفحات عمومی با محتوای پویا که به‌طور مکرر تغییر می‌کند ایده‌آل است.
- **Client-side rendering** (**CSR**) HTML حداقلی load و داده را با JavaScript بعد از بارگذاری صفحه دریافت می‌کند. از CSR برای صفحات dashboard استفاده کردیم چون پشت authentication هستند، به SEO نیاز ندارند و از کاهش بار سرور بهره‌مند می‌شوند. این رویکرد برای صفحات authenticated که SEO مهم نیست عالی است.
- **Hybrid rendering** (**SSR + CSR**) هر دو استراتژی را ترکیب می‌کند تا بهترین هر دو دنیا را داشته باشیم. از hybrid rendering برای صفحهٔ پروفایل استفاده کردیم که دادهٔ بحرانی پروفایل را روی سرور برای SEO load و ideaها و نظرات را روی client برای progressive enhancement دریافت می‌کند. این رویکرد برای صفحات عمومی که هم به immediate content و هم به interactivity اضافی client-side نیاز دارند خوب عمل می‌کند.
- **Static pre-rendering** HTML را در زمان build برای صفحات با محتوای static تولید می‌کند. صفحات home و about را طوری پیکربندی کردیم که با استفاده از تابع `prerender` در `react-router.config.ts` pre-render شوند. این رویکرد برای صفحات بازاریابی و محتوایی که به‌طور مکرر تغییر نمی‌کند ایده‌آل است.

سپس بهینه‌سازی SEO را با ایجاد component قابل استفادهٔ مجدد `Seo` اضافه کردیم که تگهای `title` و `meta` را به صفحات اضافه می‌کند و رتبهٔ موتورهای جستجوی اپلیکیشنمان را بهبود می‌بخشد.

در نهایت، page layout را برای فراهم کردن ناوبری یکدست در سراسر اپلیکیشن پیاده‌سازی کردیم. layout اصلی با ناوبری سطح بالا و layout dashboard با ناوبری خاص dashboard ایجاد کردیم و از تابع `layout` و component `<Outlet />` برای render کردن UI elementهای مشترک استفاده کردیم.

با فهمیدن این الگوهای روتینگ و رندرینگ، می‌توانیم تصمیمات معماری آگاهانه دربارهٔ نحوهٔ ساخت اپلیکیشن‌های React با عملکرد بالا، SEO-friendly و کاربرپسند بگیریم. کلید تطبیق استراتژی رندرینگ با نیازمندی‌های خاص هر صفحه است: نیازمندیهای SEO، نیازمندیهای authentication، تازگی داده و اهداف تجربهٔ کاربر.
