import { REPO } from './site.js'

/* トップページの Works モジュールと /works の一覧が同じ内容を指すよう、
   ここ 1 か所で持つ */
export const WORKS = [
  {
    name: 'nkos.dev',
    note: 'このサイト。React + Vite で組み、Cloudflare Pages に置いている',
    href: REPO,
  },
  {
    name: 'MDX ブログ基盤',
    note: '記事を MDX で書き、React コンポーネントをそのまま埋め込める仕組み',
    to: '/blog',
  },
]
