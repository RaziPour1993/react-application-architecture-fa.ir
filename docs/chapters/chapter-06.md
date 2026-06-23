# فصل ۶: مدیریت state اپلیکیشن {#h1_189 .chapterTitle}

مدیریت state جنبهٔ مهمی از هر اپلیکیشن تعاملی وب است. تعیین می‌کند داده چگونه در اپلیکیشن جریان می‌یابد، UI چگونه به تعاملات کاربر پاسخ می‌دهد، و چگونه اپلیکیشن را با API هماهنگ نگه داریم. بدون مدیریت state مناسب، اپلیکیشن‌هایمان نگهداری‌شان سخت و مستعد باگ خواهند بود.

State به دادهٔ اپلیکیشن اشاره دارد که در طول زمان تغییر می‌کند و بر آنچه در UI رندر می‌شود اثر دارد. وقتی state تغییر می‌کند، React کامپوننت‌هایی که به آن state وابسته‌اند را دوباره رندر می‌کند و UI را برای بازتاب دادهٔ جدید به‌روز می‌رساند. این مکانیزم همان چیزی است که اپلیکیشن‌های تعاملی وب را واکنش‌پویا و پویا می‌کند.

در اپلیکیشن‌های React، انواع مختلف state بسته به اینکه داده از کجا می‌آید، چقدر باید ماندگار باشد، و کدام کامپوننت‌ها به آن نیاز دارند، وجود دارد. فهم این انواع مختلف state به ما کمک می‌کند تصمیم‌های معماری بهتری بگیریم و code قابل‌نگهداری‌تری بنویسیم. موارد زیر را پوشش می‌دهیم:

- مدیریت local state
- اشتراک‌گذاری state سراسری بین کامپوننت‌ها
- مدیریت دادهٔ ناهمگام از سرور
- مدیریت form state با validation
- استفاده از URL state برای پایداری و اشتراک‌گذاری

در پایان این فصل، درکی از انواع مختلف state در اپلیکیشن‌های React و زمان استفاده از هر رویکرد خواهیم داشت. مثال‌های عملی از اپلیکیشنمان می‌بینیم که الگوهای واقعی مدیریت state را نشان می‌دهند.

## پیش‌نیازهای فنی {#h1_190}

قبل از شروع، باید پروژه را راه‌اندازی کنیم. برای توسعهٔ پروژه، ابزارهای زیر باید روی کامپیوتر نصب باشند:

- Node.js نسخهٔ ۲۴ یا بالاتر. npm نسخهٔ ۱۱ یا بالاتر همراه Node ارائه می‌شود. می‌توانیم با اجرای `node -v` و `npm -v` در ترمینال تأیید کنیم. روش‌های مختلفی برای نصب Node.js و npm وجود دارد. این مقالهٔ مفید جزئیات بیشتری دارد: [https://www.nodejsdesignpatterns.com/blog/5-ways-to-install-node-js](https://www.nodejsdesignpatterns.com/blog/5-ways-to-install-node-js).
- VS Code (اختیاری)، یک ویرایشگر محبوب برای JavaScript و TypeScript. متن‌باز است، پشتیبانی TypeScript خوبی دارد، و افزونه‌های زیادی ارائه می‌دهد. می‌توانید از [https://code.visualstudio.com](https://code.visualstudio.com) دانلود کنید.

کد این کتاب در مخزن کتاب موجود است. برای دسترسی به لینک مخزن، مراحل بخش «*دانلود فایل‌های کد نمونه*» در *پیشگفتار* را دنبال کنید. آن را کلون کنید و وارد ریشهٔ مخزن شوید:

```
git clone https://github.com/PacktPublishing/React-Application-Architecture-for-Production-Second-Edition.git
```

مخزن شامل پوشه‌های فصل‌ها با کد هر فصل به همراه یک پوشهٔ مشترک `api` است که سرور API مورد استفاده در همهٔ فصل‌ها را شامل می‌شود.

ما روی فصل ۶ کار می‌کنیم، پس وارد پوشهٔ `chapter-06` شوید:

```
cd React-Application-Architecture-for-Production-Second-Edition/chapter-06
```

سپس dependencyها را نصب کنید:

```
npm install
```

همچنین باید متغیرهای محیطی را فراهم کنیم:

```
cp .env.example .env
```

در این مرحله، frontend باید آماده باشد و روی [http://localhost:5173](http://localhost:5173) اجرا شود.

همچنین باید سرور API را اجرا کنیم.

یک پنجرهٔ ترمینال جدید باز کنید و وارد پوشهٔ `api` شوید:

```
cd React-Application-Architecture-for-Production-Second-Edition/api
```

اسکریپت setup فصل ۶ را برای پیکربندی همه‌چیز اجرا کنید:

```
npm run setup 06
```

سپس سرور API را اجرا کنید:

```
npm run dev
```

سرور API اکنون باید روی [http://localhost:9999](http://localhost:9999) اجرا شود.

برای اطلاعات بیشتر دربارهٔ جزئیات setup، فایل `README.md` را بررسی کنید.

## مدیریت state محلی {#h1_191}

Local state ساده‌ترین و بنیادی‌ترین نوع state در React است. در یک کامپوننت واحد زندگی می‌کند و فقط برای همان کامپوننت و فرزندانش از طریق props قابل دسترسی است. این کپسوله‌سازی باعث می‌شود local state دلیل‌پذیر و قابل نگهداری باشد.

باید state را تا جایی که ممکن است نزدیک کامپوننتی که به آن نیاز دارد نگه داریم. اگر یک قطعه state فقط در بخش کوچکی از اپلیکیشن لازم است و نیازی به ماندگاری ندارد، دلیلی برای پیچیده‌تر کردنش نیست. این اصل colocate کردن state به ما کمک می‌کند از پیچیدگی غیرضروری اجتناب کنیم و کامپوننت‌هایمان قابل استفاده‌تر شوند.

بیایید یک مثال عملی از اپلیکیشنمان ببینیم. وقتی می‌خواهیم از صفحهٔ جزئیات ایده review جدیدی ایجاد کنیم، باید باز یا بسته بودن modal review را پیگیری کنیم.

اول، باید روی دکمهٔ «نوشتن review» کلیک کنیم:

شکل ۶.۱ — دکمهٔ Write Review

وقتی روی دکمه کلیک می‌کنیم، modal review باید باز شود:

شکل ۶.۲ — modal review در حال اجرا

کد کامپوننت `CreateReview` به این صورت است:

```tsx
// src/features/reviews/components/create-review.tsx

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { ReviewFormModal } from '@/features/reviews/components/review-form-modal';

export function CreateReview({ ideaId }: { ideaId: string }) {

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const createReviewMutation = useCreateReviewMutation({
    options: {
      onSuccess: () => {
        setIsReviewModalOpen(false);
      },
    },
  });


  const handleOpenReviewModalForCreate = () => {
    setIsReviewModalOpen(true);
  };


  const handleCloseReviewModal = () => {
    setIsReviewModalOpen(false);
    createReviewMutation.reset();
  };

  // ...

  return (
    <>
      <Button
        onClick={handleOpenReviewModalForCreate}
        disabled={createReviewMutation.isPending}
      >
        Write Review
      </Button>
      <ReviewFormModal
        isOpen={isReviewModalOpen}
        onClose={handleCloseReviewModal}
        onSubmit={handleReviewSubmit}
        isSubmitting={createReviewMutation.isPending}
        ideaId={ideaId}
        error={createReviewMutation.error}
      />
    </>
  );
}
```

در این مثال، از hook `useState` برای مدیریت state باز/بسته بودن modal استفاده می‌کنیم. boolean `isReviewModalOpen` پیگیری می‌کند آیا modal در حال حاضر نمایش داده می‌شود یا نه، و دو تابع handler برای باز و بسته کردن آن داریم. این مثال خوبی از استفادهٔ local state است چون:

- State modal فقط در این کامپوننت لازم است
- هیچ کامپوننت دیگری در اپلیکیشن نیاز ندارد بداند آیا این modal باز است یا نه
- State نیازی به ماندگاری هنگام unmount شدن کامپوننت ندارد
- Logic خودکفا و آسان برای فهم است

وقتی کاربر روی دکمهٔ «نوشتن review» کلیک می‌کند، `handleOpenReviewModalForCreate` را فراخوانی می‌کنیم که state را روی `true` تنظیم می‌کند و modal را باز می‌کند. وقتی کاربر modal را می‌بندد یا review را ارسال می‌کند، `handleCloseReviewModal` را فراخوانی می‌کنیم که state را به `false` برمی‌گرداند.

این الگو برای UI state که در یک کامپوننت منفرد ایزوله شده عالی کار می‌کند. اما با رشد اپلیکیشن، با موقعیت‌هایی مواجه می‌شویم که چند کامپوننت به state یکسانی نیاز دارند یا باید state را از بخش‌های مختلف اپلیکیشن به‌روز کنیم. آنجاست که global state وارد می‌شود.

## اشتراک‌گذاری state سراسری {#h1_192}

Global state state اپلیکیشنی است که از هر کامپوننتی در اپلیکیشن که به تغییرات subscribed است، قابل دسترسی یا تغییر است، صرف‌نظر از جایگاهش در درخت کامپوننت‌ها. برخلاف local state که در یک کامپوننت منفرد کپسوله شده، global state در بخش‌های مختلف اپلیکیشن مشترک است.

متداول‌ترین موارد استفادهٔ global state ویژگی‌هایی هستند که باید از هر جای اپلیکیشن قابل فعال‌سازی یا دسترسی باشند. مثلاً نمایش notification، مدیریت preference تم، یا پیگیری سبد خرید کاربر فعلی.

در اپلیکیشنمان، از global state برای سیستم notification استفاده می‌کنیم. وقتی کاربر review ایجاد می‌کند، پروفایل خود را به‌روز می‌کند، یا با خطایی مواجه می‌شود، می‌خواهیم notification toast نشان دهیم. از آنجا که این عملیات می‌توانند از هر صفحه یا کامپوننتی رخ دهند، به روشی برای فعال‌سازی notification به‌صورت سراسری نیاز داریم.

روش‌های مختلفی برای مدیریت global state در React وجود دارد:

- **Prop drilling** - انتقال state از طریق سطوح زیادی از کامپوننت‌ها، اما به سرعت مدیریتش سخت می‌شود با رشد اپلیکیشن. کامپوننت‌های میانی باید propsهایی را بپذیرند و forward کنند که هرگز نمی‌خوانند، پس با داده‌ای که استفاده نمی‌کنند coupled می‌شوند که نگهداری اپلیکیشن را سخت می‌کند.
- **Context API** - راه‌حل داخلی React برای اشتراک‌گذاری state. ارزش ذکر دارد که context API فقط مکانیزمی برای انتقال داده از درخت کامپوننت‌هاست، نه یک راه‌حل کامل مدیریت state و اگر با دقت استفاده نشود می‌تواند مشکل performance ایجاد کند، چون همهٔ consumerها هنگام تغییر مقدار provider دوباره رندر می‌شوند.
- **Redux** - یک کتابخانهٔ قدرتمند اما verbose برای مدیریت state. boilerplate اضافه می‌کند اما بسیار محبوب است.
- **Zustand** - یک کتابخانهٔ سبک‌وزن برای مدیریت state با حداقل boilerplate که انتخاب ما برای این پروژه است.

Zustand را برای اپلیکیشنمان انتخاب کردیم چون API ساده‌ای ارائه می‌دهد، پشتیبانی TypeScript خوبی دارد، و بدون پیچیدگی راه‌حل‌های بزرگ‌تر مثل Redux عملکرد خوبی دارد. دقیقاً همان چیزی است که نیاز داریم.

ببینیم چگونه store notification را با Zustand پیاده‌سازی می‌کنیم:

```ts
// src/stores/notifications.ts

import { create } from 'zustand';

import { uid } from '@/lib/uid';

export type NotificationType = 'info' | 'warning' | 'success' | 'error';

export type Notification = {
  id: string;
  type: NotificationType;
  title?: string;
  duration?: number;
  message?: string;
};

type NotificationsStore = {
  notifications: Notification[];
  actions: {
    showNotification: (notification: Omit<Notification, 'id'>) => void;
    dismissNotification: (id: string) => void;
  };
};

const useNotificationsStore = create<NotificationsStore>((set, get) => ({
  notifications: [],
  actions: {
    showNotification: (notification) => {
      const id = uid();
      const duration = notification.duration ?? 5000;

      set((state) => ({
        notifications: [
          ...state.notifications,
          { id, duration, ...notification },
        ],
      }));
      if (duration > 0) {
        setTimeout(() => {
          get().actions.dismissNotification(id);
        }, duration);
      }
    },
    dismissNotification: (id) => {
      set((state) => ({
        notifications: state.notifications.filter(
          (notification) => notification.id !== id,
        ),
      }));
    },
  },
}));

export const useNotifications = () =>
  useNotificationsStore((state) => state.notifications);

export const useNotificationActions = () =>
  useNotificationsStore((state) => state.actions);
```

این store چند الگوی مهم برای مدیریت global state را نشان می‌دهد. یک Zustand store با تابع `create` می‌سازیم که callback تابعی می‌گیرد که ساختار state ما را تعریف می‌کند. Store شامل یک آرایهٔ `notifications` برای نگهداری همهٔ notificationهای فعال و یک شیء `actions` با متدهای نمایش و بستن notificationهاست.

اکشن `showNotification` برای هر notification یک ID یکتا تولید می‌کند، آن را به آرایهٔ notifications اضافه می‌کند، و یک بستن خودکار پس از مدت زمان مشخص (پیش‌فرض ۵ ثانیه) تنظیم می‌کند. اکشن `dismissNotification` با فیلتر کردن بر اساس ID یک notification را از آرایه حذف می‌کند.

بهینه‌سازی عملکرد مهمی که اینجا استفاده می‌کنیم جداسازی state و actions در hookهای selector متفاوت است. به‌جای export کردن مستقیم store، دو custom hook صادر می‌کنیم: `useNotifications` برای دسترسی به آرایهٔ notifications و `useNotificationActions` برای دسترسی به متدهای action. این جداسازی به این معناست که کامپوننت‌هایی که فقط از actions استفاده می‌کنند هنگام تغییر آرایهٔ notifications دوباره رندر نمی‌شوند و عملکرد را بهبود می‌دهد. با تعریف store، به کامپوننتی برای نمایش notificationها به کاربران نیاز داریم:

```tsx
// src/components/notifications.tsx

import {
  useNotifications,
  useNotificationActions,
  type Notification,
} from '@/stores/notifications';

type NotificationItemProps = {
  notification: Notification;
};

export function NotificationItem({ notification }: NotificationItemProps) {
  // ...
}

export function Notifications() {
  const notifications = useNotifications();

  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed inset-0 z-50 flex items-end px-4 py-6 sm:items-start sm:p-6"
    >
      <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </div>
    </div>
  );
}
```

کامپوننت `Notifications` ساده است. از hook `useNotifications` برای دسترسی به آرایهٔ notifications از store سراسری استفاده می‌کند و برای هر notification یک `NotificationItem` رندر می‌کند تا آن‌ها را به کاربر نشان دهد.

برای در دسترس قرار دادن notificationها در کل اپلیکیشن، باید این کامپوننت را در سطح root رندر کنیم. این تضمین می‌کند صرف‌نظر از اینکه کاربر در کدام صفحه است، notificationها ظاهر شوند:

```tsx
// src/app/root.tsx

import { Notifications } from '@/components/notifications';

export default function App() {
  const [queryClient] = useState(() => createQueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Notifications />
      <Outlet />
    </QueryClientProvider>
  );
}
```

با قرار دادن کامپوننت `Notifications` در ریشهٔ اپلیکیشن، از هر صفحه‌ای رندر می‌شود. کامپوننت `<Outlet />` محتوای صفحهٔ ما را رندر می‌کند، در حالی که کامپوننت `Notifications` بالای آن قرار دارد و آمادهٔ نمایش notificationهایی است که از هر جای اپلیکیشن فعال شده‌اند.

اکنون قدرت واقعی global state مشخص می‌شود: می‌توانیم از هر کامپوننتی notification نشان دهیم بدون prop drilling یا انتقال state پیچیده.

این‌طوری می‌توانیم کاربر را از ایجاد review مطلع کنیم:

```tsx
// src/features/reviews/components/create-review.tsx

import { useState } from 'react';

import { useCreateReviewMutation } from '@/features/reviews/api/create-review';
import { useNotificationActions } from '@/stores/notifications';

export function CreateReview({ ideaId }: { ideaId: string }) {

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const { showNotification } = useNotificationActions();

  const createReviewMutation = useCreateReviewMutation({
    options: {
      onSuccess: () => {
        // trigger the notification to be shown
        showNotification({
          type: 'success',
          title: 'Review created',
        });
        setIsReviewModalOpen(false);
      },
    },
  });
  // ... 
}
```

در کامپوننت `CreateReview`، از hook `useNotificationActions` برای دسترسی به اکشن `showNotification` استفاده می‌کنیم. وقتی review با موفقیت ایجاد شد، این اکشن را با جزئیات notification فراخوانی می‌کنیم. Notification در گوشهٔ بالا-راست صفحه ظاهر می‌شود، بعد از ۵ ثانیه خودکار محو می‌شود، و توسط کاربر قابل بستن است، همان‌طور که در شکل ۶.۳ نشان داده شده:

شکل ۶.۳ — Notificationها در حال اجرا

این مزیت مدیریت global state است. نیازی نیست سیستم notification را از طریق props پایین بدهیم یا نگران جایگاهمان در درخت کامپوننت‌ها باشیم. هر کامپوننتی می‌تواند با فراخوانی سادهٔ `showNotification` یک notification نشان دهد. این کد را تمیزتر و ویژگی‌ها را آسان‌تر برای پیاده‌سازی می‌کند.

حالا اگر state‌ای از سرور بیاید چه؟ مثلاً می‌خواهیم reviewهای کاربر فعلی را از سرور بگیریم و در صفحهٔ reviewهای داشبورد نمایش دهیم. آنجاست که state ناهمگام وارد می‌شود.

## مدیریت state ناهمگام {#h1_193}

State ناهمگام state‌ای است که از منابع خارجی مثل requestهای API می‌آید. برخلاف local یا global state که کاملاً در سمت client کنترل می‌کنیم، async state کمی چالش‌برانگیزتر است چون به‌صورت ناهمگام بارگذاری می‌شود و می‌تواند loading باشد، با خطا مواجه شود، stale شود، و نیاز به هماهنگ‌سازی بین منبع و اپلیکیشن داشته باشد.

مدیریت دستی async state با `useState` و `useEffect` به سرعت پیچیده می‌شود. باید stateهای loading را پیگیری کنیم، خطاها را handle کنیم، از race condition جلوگیری کنیم، caching پیاده‌سازی کنیم، و refetching را مدیریت کنیم. آنجاست که React Query بسیار مفید می‌شود. روشی قدرتمند و توصیفی برای مدیریت همهٔ جنبه‌های دادهٔ ناهمگام ارائه می‌دهد.

قبلاً React Query را در فصل قبل بررسی کردیم، اما بیایید دوباره ببینیم چگونه در استراتژی کلی مدیریت state ما جا می‌شود.

فرض کنیم این کامپوننت را داریم:

```tsx
const loadData = () => api.get('/data');

const DataComponent = () => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState();
  useEffect(() => {
    setIsLoading(true);
    loadData()
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  if (isLoading) return <div>Loading</div>;
  if (error) return <div>{error}</div>;
  return <div>{data}</div>;
};
```

این اگر فقط یک بار از API داده بگیریم خوب است، اما در بیشتر موارد باید از endpointهای مختلف بگیریم. می‌بینیم مقداری boilerplate اینجا هست:

- باید قطعه‌های state یکسان data، error و isLoading تعریف شوند
- قطعه‌های مختلف state باید به‌طور مناسب به‌روز شوند
- داده به محض دور شدن از کامپوننت دور ریخته می‌شود

آنجاست که React Query وارد می‌شود. می‌توانیم کامپوننتمان را به صورت زیر به‌روز کنیم:

```tsx
import { useQuery } from '@tanstack/react-query';

const loadData = () => api.get('/data');

const DataComponent = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['data'],
    queryFn: loadData,
  });
  if (isLoading) return <div>Loading</div>;
  if (error) return <div>{error}</div>;
  return <div>{data}</div>;
};
```

این بسیار تمیزتر و قابل‌نگهداری‌تر است. نیازی نیست همان قطعه‌های state را بارها و بارها تعریف کنیم. فقط از hook `useQuery` برای دریافت داده استفاده می‌کنیم و React Query بقیه را handle می‌کند.

ببینیم این در practice چگونه کار می‌کند. وقتی review در اپلیکیشن ایجاد می‌کنیم، باید آن‌ها را در صفحهٔ reviewهای داشبورد ببینیم:

شکل ۶.۴ — صفحهٔ reviewهای داشبورد

بیایید کدی که مسئول دریافت reviewهای کاربر فعلی است را ببینیم:

```ts
// src/features/reviews/api/get-current-user-reviews.ts

import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api';
import type { GetReviewsByUserResponse } from '@/types/generated/types.gen';
import { zGetReviewsByUserResponse } from '@/types/generated/zod.gen';

import { reviewsQueryKeys } from '../config/query-keys';

export async function getCurrentUserReviews(): Promise<GetReviewsByUserResponse> {
  const response = await api.get<GetReviewsByUserResponse>('/reviews/current');

  return zGetReviewsByUserResponse.parse(response);
}

export function getCurrentUserReviewsQueryOptions() {
  return queryOptions({
    queryKey: reviewsQueryKeys.current(),
    queryFn: () => getCurrentUserReviews(),
  });
}

export function useCurrentUserReviewsQuery({
  options,
}: {
  options?: Omit<
    ReturnType<typeof getCurrentUserReviewsQueryOptions>,
    'queryKey' | 'queryFn'
  >;
} = {}) {
  return useQuery({
    ...getCurrentUserReviewsQueryOptions(),
    ...options,
  });
}
```

این کد الگوی ما برای مدیریت async state را نشان می‌دهد. سه بخش می‌سازیم:

- **Fetcher function** (`getCurrentUserReviews`) - فراخوانی API واقعی با validation ورودی و خروجی
- **Query options factory** (`getCurrentUserReviewsQueryOptions`) - پیکربندی React Query شامل cache key، تابع fetcher، و هر شرطی
- **Custom hook** (`useCurrentUserReviewsQuery`) - hook راحتی که `useQuery` از React Query را با گزینه‌های ما wrap می‌کند

این الگو چند مزیت ارائه می‌دهد. Fetcher function می‌تواند مستقلاً برای دریافت دادهٔ سمت سرور یا تست استفاده شود. Query options می‌توانند برای prefetching داده استفاده شوند، و custom hook API تمیزی برای کامپوننت‌ها فراهم می‌کند.

حالا ببینیم چگونه این را در یک کامپوننت استفاده می‌کنیم:

```tsx
// src/app/routes/dashboard/reviews.tsx

import { Seo } from '@/components/seo';
import { useCurrentUserReviewsQuery } from '@/features/reviews/api/get-current-user-reviews';
import { ReviewsList } from '@/features/reviews/components/reviews-list';

export default function MyReviewsPage() {
  const reviewsQuery = useCurrentUserReviewsQuery();
  const reviews = reviewsQuery.data?.data;

  return (
    <div className="container mx-auto px-4 py-8">
      <Seo
        title="My Reviews | AIdeas"
        description="View and manage all reviews you've written for AI application ideas"
      />
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Reviews</h1>
          <p className="text-muted-foreground">
            View and manage all reviews you've written
          </p>
        </div>

        <ReviewsList
          reviews={reviews}
          isLoading={reviewsQuery.isLoading}
          showIdeaTitle
          emptyMessage="You haven't written any reviews yet. Explore ideas and share your feedback!"
          error={reviewsQuery.error}
        />
      </div>
    </div>
  );
}
```

کامپوننت `MyReviewsPage` نشان می‌دهد مدیریت async state با React Query چقدر ساده می‌شود. hook سفارشی‌مان را فراخوانی می‌کنیم و React Query بقیه را با hook `useQuery` در زیر handle می‌کند. داده، state loading، و state error را خودکار دریافت می‌کنیم. وقتی کامپوننت رندر می‌شود، React Query داده را دریافت می‌کند. اگر کامپوننت دیگری قبلاً reviewهای کاربر فعلی را گرفته باشد، React Query دادهٔ کش‌شده را فوراً برمی‌گرداند بدون تکرار request.

React Query همچنین بسیاری از سناریوهای پیچیده را برای ما handle می‌کند:

- **کش خودکار**: داده کش می‌شود و بین کامپوننت‌ها مجدداً استفاده می‌شود
- **Refetching در پس‌زمینه**: دادهٔ stale خودکار در پس‌زمینه تازه می‌شود
- **حذف تکرار**: درخواست‌های متعدد کامپوننت‌ها برای دادهٔ یکسان فقط یک request شبکه ایجاد می‌کنند
- **Handle خطا**: requestهای ناموفق خودکار retry می‌شوند
- **Stateهای loading**: کنترل دقیق روی stateهای loading برای UX بهتر داریم

به همین دلیل async state را متفاوت از انواع دیگر state مدیریت می‌کنیم. کتابخانه‌هایی مثل React Query به‌طور خاص برای handle پیچیدگی‌های دادهٔ سرور طراحی شده‌اند و این کار را بسیار بهتر از مدیریت دستی state انجام می‌دهند.

ارزش ذکر دارد که async state فقط برای داده‌ای که از API می‌آید نیست، بلکه هر داده‌ای که به‌صورت ناهمگام بارگذاری می‌شود. مثلاً می‌توانیم از React Query برای دریافت داده از یک API مرورگر مثل Geolocation API یا Web Speech API استفاده کنیم.

## مدیریت state فرم {#h1_194}

فرم‌ها برای جمع‌آوری اطلاعات کاربر در اپلیکیشن‌های وب استفاده می‌شوند. چه کاربران محتوا ایجاد کنند، پروفایل خود را به‌روز کنند، یا review ارسال کنند، از فرم استفاده می‌کنند. مدیریت مؤثر form state برای تجربهٔ کاربری خوب مهم است.

می‌توانیم از local state برای پیگیری مقدار فرم استفاده کنیم، اما form state فقط شامل مقدار فعلی inputها نیست، بلکه خطای validation، وضعیت ارسال، فیلدهای touched شده، و موارد دیگر را هم شامل می‌شود. مدیریت همهٔ این‌ها به‌صورت دستی مستعد خطا و تکراری می‌شود. آنجاست که کتابخانه‌هایی مثل React Hook Form وارد می‌شوند.

React Hook Form روشی با عملکرد بالا و انعطاف‌پذیر برای handle کردن فرم‌ها با حداقل re-render ارائه می‌دهد. با Zod برای schema validation ترکیب شده، فرم‌های type-safe با validation خودکار به ما می‌دهد. بیایید فرم review خود را به‌عنوان مثال ببینیم. این فرم چند مفهوم کلیدی مدیریت form state را نشان می‌دهد. بیایید جزئیات را بررسی کنیم:

```tsx
// src/features/reviews/components/review-form.tsx

export function ReviewForm({
  onSubmit,
  isSubmitting,
  onModalClose,
  initialReview,
  error,
  ideaId,
}: ReviewFormProps) {
  const form = useForm<CreateReviewData['body']>({
    resolver: zodResolver(zCreateReviewData.shape.body),
    defaultValues: {
      content: initialReview?.content || '',
      rating: initialReview?.rating || 5,
      ideaId: initialReview?.ideaId || ideaId || '',
    },
  });

  const handleClose = () => {
    form.reset();
    onModalClose();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 py-4"
      >
        {/* ... */}
      </form>
    </Form>
  );
}
```

اول، فرم را با hook `useForm` از React Hook Form مقداردهی اولیه می‌کنیم. `zodResolver` با schema Zod خودمان را برای validation فیلدها پاس می‌دهیم. توجه کنید چگونه همان schema را ارائه می‌دهیم که request body را در API ما validate می‌کند. این schema خودکار از OpenAPI specification تولید شده و تضمین می‌کند validation frontend و backend هماهنگ بمانند.

`defaultValues` می‌تواند از یک review موجود که ویرایش می‌کنیم یا مقادیر خالی برای ایجاد review جدید باشد.

فرم همهٔ پیچیدگی form state را برای ما مدیریت می‌کند:

- **مقدار فیلدها**: مقادار فعلی input خودکار پیگیری می‌شوند
- **Validation**: schemaهای Zod هنگام blur و submit اعتبارسنجی می‌کنند
- **پیام خطا**: خطاهای validation کنار فیلدها نمایش داده می‌شوند
- **ارسال فرم**: wrapper `handleSubmit` رفتار پیش‌فرض را جلوگیری می‌کند و قبل از فراخوانی callback ما validate می‌کند
- **قابلیت بازنشانی**: می‌توانیم فرم را با `form.reset()` به مقادیر اولیه بازنشانی کنیم

حالا ببینیم چگونه فیلدها را به فرم اضافه کنیم:

```tsx
// src/features/reviews/components/review-form.tsx

export function ReviewForm({
  // ...
  return (
    <Form {...form}>
      <form {/* ... */}>
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <div className="flex space-x-1 mt-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-6 w-6 cursor-pointer ${
                        i < field.value
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                      onClick={() => field.onChange(i + 1)}
                    />
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Review</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write your review here..."
                  rows={4}
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

{error&&<ErrorMessage error={error} />}

        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
```

کامپوننت‌های `FormField` React Hook Form را به کامپوننت‌های UI ما متصل می‌کنند. هر فیلد از الگوی prop `render` برای دسترسی به مقدار فیلد، تابع change handler، و وضعیت validation استفاده می‌کند. این کنترل کاملی روی نحوهٔ رندر شدن هر فیلد به ما می‌دهد در حالی که React Hook Form مدیریت state را در پشت صحنه انجام می‌دهد.

فرم در حالت اجرا به این صورت است:

شکل ۶.۵ — فرم review در حال اجرا

با پوشش form state، بیایید آخرین نوع state را که در این فصل بحث می‌کنیم بررسی کنیم: URL state.

## پایدارسازی state در URL {#h1_195}

URL state که به آن URL search parameters یا query parameters هم گفته می‌شود، نوع خاصی از state است که در نوار آدرس مرورگر زندگی می‌کند. یکی از کم‌استفاده‌شده اما بسیار قدرتمند انواع state در اپلیکیشن‌های وب است.

چرا می‌خواهیم state را در URL ذخیره کنیم؟ URL state مزایای منحصربه‌فردی دارد:

- **پایدار**: URL state از reload صفحه ماندگار می‌ماند
- **قابل اشتراک‌گذاری**: کاربران می‌توانند URLهایی به اشتراک بگذارند که state دقیق صفحه را حفظ کنند
- **قابل bookmark**: کاربران می‌توانند URLها را bookmark کنند و به همان نمای دقیق برگردند
- **Navigation مرورگر**: دکمه‌های عقب و جلو طبیعی با URL state کار می‌کنند
- **Server-side rendering**: URL state در سمت سرور برای دریافت اولیهٔ داده در دسترس است

در اپلیکیشنمان، از URL state برای فیلترهای جستجو و مرتب‌سازی در صفحهٔ ایده‌ها استفاده می‌کنیم. وقتی کاربر ایده‌ها را جستجو می‌کند، بر اساس tag فیلتر می‌کند، یا ترتیب مرتب‌سازی را تغییر می‌دهد، این ترجیحات در URL بازتاب داده می‌شوند. این یعنی می‌توانند لینکی به نمای فیلتر شده به اشتراک بگذارند یا صفحه را بدون از دست دادن فیلترها refresh کنند.

در حالی که React Router قابلیت داخلی برای مدیریت query params از طریق hook `useSearchParams` دارد، کتابخانه‌ای به نام nuqs وجود دارد که روش بهتری برای مدیریت URL state با React hooks ارائه می‌دهد. برای شروع، باید اپلیکیشنمان را با adapter nuqs بپیچانیم:

```tsx
// src/app/root.tsx

import { NuqsAdapter } from 'nuqs/adapters/react-router/v7';

export default function App() {
  const [queryClient] = useState(() => createQueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <Notifications />
        <Outlet />
      </NuqsAdapter>
    </QueryClientProvider>
  );
}
```

`NuqsAdapter` context لازم برای کار nuqs با React Router را فراهم می‌کند. حالا ببینیم چگونه از آن برای مدیریت state جستجو و فیلتر استفاده می‌کنیم:

```ts
// src/features/ideas/hooks/use-search-and-filters.ts

import { useQueryState, parseAsArrayOf, parseAsString } from 'nuqs';

export function useSearchAndFilters() {
  const [urlSearchTerm, setUrlSearchTerm] = useQueryState(
    'search',
    parseAsString.withDefault(''),
  );

  const [selectedTags, setSelectedTags] = useQueryState(
    'tags',
    parseAsArrayOf(parseAsString).withDefault([]),
  );

  const [sortBy, setSortBy] = useQueryState(
    'sortBy',
    parseAsString.withDefault(''),
  );

  const toggleTag = (tag: string) => {
    setSelectedTags((currentTags) => {
      const newTags = currentTags.includes(tag)
        ? currentTags.filter((t) => t !== tag)
        : [...currentTags, tag];
      return newTags.length > 0 ? newTags : null;
    });
  };

  const clearFilters = () => {
    setUrlSearchTerm('');
    setSelectedTags(null);
    setSortBy(null);
  };

  const hasActiveFilters =
    selectedTags.length > 0 || urlSearchTerm.length > 0 || sortBy.length > 0;

  return {
    searchTerm: urlSearchTerm,
    urlSearchTerm,
    selectedTags,
    sortBy,
    params: {
      ...(selectedTags.length > 0 && { tags: selectedTags.join(',') }),
      ...(urlSearchTerm && { search: urlSearchTerm }),
      ...(sortBy && { sortBy }),
    },
    hasActiveFilters,
    setSearchTerm: setUrlSearchTerm,
    setSelectedTags,
    toggleTag,
    setSortBy,
    clearFilters,
  };
}
```

این custom hook قدرت مدیریت URL state را نشان می‌دهد. بیایید جزئیات را بررسی کنیم:

از `useQueryState` از `nuqs` برای هر قطعهٔ state فیلتر استفاده می‌کنیم: عبارت جستجو، tagهای انتخاب‌شده، ترتیب مرتب‌سازی، و صفحهٔ فعلی. هر فراخوانی `useQueryState` مقدار فعلی از URL و تابع setter را برمی‌گرداند که هم URL و هم state را به‌روز می‌کند. توابع `parseAs` ایمنی نوع و serialization مناسب را تضمین می‌کنند.

Hook شامل چند ویژگی مفید است:

- **هماهنگ‌سازی خودکار URL**: وقتی توابع setter را فراخوانی می‌کنیم، URL خودکار به‌روز می‌شود
- **Parse ایمن نوع**: توابع `parseAs` رشته‌های URL را به انواع صحیح تبدیل می‌کنند
- **مقادیر پیش‌فرض**: هر پارامتر اگر در URL نباشد مقدار پیش‌فرض منطقی دارد
- **پارامترهای computed**: شیئی می‌سازیم که آمادهٔ ارسال به queryهای API ماست
- **توابع کمکی**: توابعی مثل `toggleTag` و `clearFilters` API را راحت استفاده می‌کنند

یک جزئیات مهم `useEffect` است که صفحه را هنگام تغییر فیلترها به ۱ بازمی‌گرداند. این جلوگیری می‌کند کاربران روی صفحهٔ ۱۰ نتایج فیلتر شده‌ای قرار بگیرند که فقط ۲ صفحه دارد.

حالا ببینیم چگونه این hook را در کامپوننت UI جستجو و فیلترها استفاده می‌کنیم:

```tsx
// src/features/ideas/components/idea-search-and-filters.tsx


import { useSearchAndFilters } from '@/features/ideas/hooks/use-search-and-filters';

export function IdeaSearchAndFilters() {
  const {
    searchTerm,
    selectedTags,
    sortBy,
    hasActiveFilters,
    setSearchTerm,
    toggleTag,
    setSortBy,
    clearFilters,
  } = useSearchAndFilters();

  const tagsQuery = useTagsQuery();
  const availableTags = tagsQuery.data?.data || [];

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search ideas by title or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium">Filter by tags:</span>
        {availableTags.map((tag) => (
          <Badge
            key={tag}
            variant={selectedTags.includes(tag) ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>
      {/* ... */}
    </div>
  );
}
```

کامپوننت `IdeaSearchAndFilters` از hook سفارشی ما برای ارائهٔ رابط تعاملی فیلتر استفاده می‌کند. کاربران می‌توانند با متن جستجو کنند، بر اساس tag فیلتر کنند، و ترتیب مرتب‌سازی را تغییر دهند. همهٔ این تغییرات فوراً در URL بازتاب داده می‌شوند، که یعنی:

- تایپ کردن در باکس جستجو URL را با `?search=text` به‌روز می‌کند
- کلیک روی یک tag آن را با `?tags=tag1,tag2` به URL اضافه می‌کند
- تغییر ترتیب مرتب‌سازی URL را با `?sortBy=rating` به‌روز می‌کند
- همهٔ پارامترها می‌توانند ترکیب شوند: `?search=ai&tags=ml,nlp&sortBy=rating&page=2`

زیبایی این رویکرد این است که هر عمل کاربر یک URL قابل اشتراک‌گذاری ایجاد می‌کند. کاربران می‌توانند نماهای فیلتر شدهٔ مورد علاقه‌شان را bookmark کنند یا لینک‌ها را با کاربران دیگر به اشتراک بگذارند. دکمهٔ عقب و جلو مرورگر طبیعی کار می‌کنند و به کاربران اجازه می‌دهند از تاریخچهٔ فیلترشان عبور کنند.

حالا ببینیم این چگونه در اپلیکیشنمان در صفحهٔ ایده‌ها استفاده می‌شود:

```tsx
// src/app/routes/ideas/ideas.tsx

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const ideasParams = {
    search: searchParams.get('search') || undefined,
    tags: searchParams.get('tags') || undefined,
    sortBy: searchParams.get('sortBy') || undefined,
  } as GetAllIdeasData['query'];
  const queryClient = createQueryClient();

  await Promise.all([
    queryClient.prefetchQuery(getIdeasQueryOptions(ideasParams)),
    queryClient.prefetchQuery(getTagsQueryOptions()),
  ]);

  return routerData({
    dehydratedState: dehydrate(queryClient),
  });
}

export default function IdeasPage({ loaderData }: Route.ComponentProps) {
  return (
    <HydrationBoundary state={loaderData.dehydratedState}>
      <Ideas />
    </HydrationBoundary>
  );
}

function Ideas() {
  const { params } = useSearchAndFilters();

  const ideasQuery = useIdeasQuery({
    params: params as GetAllIdeasData['query'],
  });

  const allIdeas = ideasQuery.data?.data || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <Seo
        title="Discover AI Ideas | AIdeas"
        description="Browse and explore innovative AI application ideas from the community"
      />
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Discover AI Ideas</h1>
        <p className="text-muted-foreground mb-6">
          Browse and explore innovative AI application ideas from the community
        </p>
        <IdeaSearchAndFilters />
      </div>

      <IdeasList
        ideas={allIdeas}
        isLoading={ideasQuery.isLoading && allIdeas.length === 0}
        emptyMessage={'No ideas available yet'}
        error={ideasQuery.error}
      />
    </div>
  );
}
```

این صفحه انواع مختلف مدیریت state را در یک مثال منسجم کنار هم می‌آورد. بیایید ردیابی کنیم انواع مختلف state چگونه با هم کار می‌کنند:

تابع `loader` روی سرور قبل از رندر شدن صفحه اجرا می‌شود. پارامترهای search URL را می‌خواند و از آن‌ها برای prefetching داده با React Query استفاده می‌کند. این تضمین می‌کند صفحه با دادهٔ صحیح فیلتر شده در رندر اولیهٔ سمت سرور بارگذاری شود.

کامپوننت `Ideas` از hook `useSearchAndFilters` برای دسترسی به URL state فعلی و ساختن شیء params استفاده می‌کند. این params به `useIdeasQuery` پاس داده می‌شوند که ایده‌ها را از API در سمت client دریافت می‌کند.

وقتی کاربران با جستجو و فیلترها تعامل می‌کنند، URL خودکار به‌روز می‌شود. چون params URL را به query key از React Query پاس می‌دهیم، هر تغییری در فیلترها یک دریافت دادهٔ جدید را فعال می‌کند. React Query به اندازهٔ کافی هوشمند است که دادهٔ کش‌شده را نشان دهد در حالی که نتایج به‌روز شده را در پس‌زمینه دریافت می‌کند و تجربهٔ کاربری روانی فراهم می‌کند.

کامپوننت pagination پارامتر page را در URL به‌روز می‌کند که query جدیدی برای صفحهٔ بعدی نتایج فعال می‌کند. همهٔ این‌ها بدون وقفه اتفاق می‌افتد و URL همیشه state فعلی صفحه را بازتاب می‌دهد.

URL state در صفحهٔ ایده‌ها به این صورت استفاده می‌شود:

شکل ۶.۶ — استفادهٔ URL state در صفحهٔ ایده‌ها

توجه کنید پارامترهای URL در UI بازتاب داده شده‌اند. عبارت جستجو در input جستجو نمایش داده شده، tagهای انتخاب‌شده به‌صورت badge نمایش داده شده، و ترتیب مرتب‌سازی در dropdown انتخاب نمایش داده شده.

این مثال نشان می‌دهد انواع مختلف state چگونه در یک اپلیکیشن واقعی با هم کار می‌کنند. URL state تعیین می‌کند چه داده‌ای دریافت کنیم، async state دادهٔ سرور را مدیریت می‌کند، و local state تعاملات UI را handle می‌کند. هر نوع state نقش خود را دارد و استفاده از رویکرد مناسب برای هر قطعه state اپلیکیشنی قابل‌نگهداری و با عملکرد بالا می‌سازد.

## خلاصه {#h1_196}

در این فصل، پنج نوع اصلی state در اپلیکیشن‌های React را بررسی کردیم و یاد گرفتیم چه زمانی و چگونه از هر رویکرد استفاده کنیم.

با local state شروع کردیم، ساده‌ترین شکل مدیریت state با hook `useState` از React. Local state برای UI state خودکفا در یک کامپوننت منفرد عالی است، مثل اینکه modal باز است یا بسته. یاد گرفتیم همیشه با local state شروع کنیم و فقط در صورت نیاز به راه‌حل‌های پیچیده‌تر برویم.

سپس مدیریت global state با Zustand را بررسی کردیم. Global state برای داده‌ای مفید است که باید از چند کامپوننت در سراسر اپلیکیشن قابل دسترسی باشد، مثل notification یا وضعیت احراز هویت. سیستم notification پیاده‌سازی کردیم که از هر کامپوننتی قابل فعال‌سازی است و نشان می‌دهد global state چگونه ویژگی‌هایی فراتر از مرزهای کامپوننت را فعال می‌کند.

بعد مدیریت async state با React Query را دیدیم. State سرور چالش‌های منحصربه‌فردی شامل stateهای loading، خطا، کش، و هماهنگ‌سازی دارد. React Query همهٔ این پیچیدگی‌ها را برای ما handle می‌کند و API توصیفی برای دریافت، کش، و به‌روزرسانی دادهٔ سرور ارائه می‌دهد. دیدیم چگونه با لایهٔ API ما یکپارچه می‌شود تا استراتژی دریافت دادهٔ قدرتمندی ایجاد کند.

مدیریت form state موضوع بعدی ما بود، با استفاده از React Hook Form همراه با Zod برای schema validation. فرم‌ها نیاز به مدیریت چندین قطعه state شامل مقدار فیلدها، خطای validation، فیلدهای touched شده، و وضعیت ارسال دارند. React Hook Form همهٔ این‌ها را با حداقل re-render به‌طور مؤثر handle می‌کند، در حالی که Zod validation ایمن نوع ارائه می‌دهد.

در نهایت، مدیریت URL state با nuqs را بررسی کردیم. URL state خاص است چون قابل اشتراک‌گذاری، قابل bookmark، و طبیعی با navigation مرورگر کار می‌کند. سیستم جستجو و فیلتر کاملی پیاده‌سازی کردیم که همهٔ ترجیحات کاربر در URL ذخیره می‌شوند و هر نمای فیلتر شده قابل اشتراک‌گذاری و ماندگار از reload صفحه می‌شود.

در طول فصل، دیدیم این انواع مختلف state چگونه در یک اپلیکیشن واقعی با هم کار می‌کنند. صفحهٔ ایده‌ها این را به‌طور کامل نشان می‌دهد: URL state تعیین می‌کند چه داده‌ای دریافت شود، async state دادهٔ سرور را مدیریت می‌کند، form state ورودی کاربر را handle می‌کند، global state notificationها را نشان می‌دهد، و local state تعاملات UI را مدیریت می‌کند. فهمیدن اینکه چه زمانی از هر نوع state استفاده کنیم برای ساخت اپلیکیشن‌های React قابل‌نگهداری حیاتی است.
