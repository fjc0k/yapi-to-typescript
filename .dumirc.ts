import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'YTT',
  favicons: [
    'https://cdn.jsdelivr.net/gh/fjc0k/yapi-to-typescript/assets/logo.png',
  ],
  logo: 'https://cdn.jsdelivr.net/gh/fjc0k/yapi-to-typescript/assets/logo.png',
  locales: [
    {
      id: 'zh-CN',
      name: '中文',
    },
  ],
  outputPath: 'docs/dist',
  ssr: false,
  exportStatic: {
    htmlSuffix: true,
  },
  base: '/yapi-to-typescript/v4/',
  publicPath:
    process.env.NODE_ENV === 'production' ? '/yapi-to-typescript/v4/' : '/',
  styles: [`.__dumi-default-badge:first-child { margin-left: 0; }`],
});
