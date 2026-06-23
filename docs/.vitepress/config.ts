import { defineConfig } from 'vitepress'
import { sidebar } from './toc'

export default defineConfig({
  lang: 'fa-IR',
  title: 'معماری React برای Production',
  description: 'ترجمه شخصی — React Application Architecture for Production, 2nd Edition',
  ignoreDeadLinks: [/^http:\/\/localhost/],
  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;600;700&display=swap',
      },
    ],
  ],
  themeConfig: {
    nav: [
      { text: 'خانه', link: '/' },
      { text: 'پیش‌گفتار', link: '/preface' },
    ],
    sidebar,
    outline: { level: [2, 3] },
    docFooter: { prev: 'قبلی', next: 'بعدی' },
    returnToTopLabel: 'بازگشت به بالا',
    sidebarMenuLabel: 'منو',
    darkModeSwitchLabel: 'حالت تاریک',
    lastUpdated: {
      text: 'آخرین به‌روزرسانی',
      formatOptions: { dateStyle: 'medium', timeStyle: 'short' },
    },
  },
  lastUpdated: true,
})
