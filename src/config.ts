/** Personalize the site here first. No account or database is required. */
export const siteConfig = {
  title: 'manBocchi.github.io',
  englishTitle: 'MOMENTS',
  author: 'manBocchi',
  description: '一些生活随笔，几帧日常光影，和慢慢积累的学习笔记。',
  tagline: '把日子写下来，把光留在这里。',
  github: 'https://github.com/mbc0426/manBocchi.github.io',
  // Leave empty to hide the email link.
  email: '',
  language: 'zh-CN',
};

export const navigation = [
  { title: '首页', path: '/' },
  { title: '随笔', path: '/essays/' },
  { title: '摄影', path: '/photography/' },
  { title: '笔记', path: '/notes/' },
  { title: '关于', path: '/about/' },
] as const;
