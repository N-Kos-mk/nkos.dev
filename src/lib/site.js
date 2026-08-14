/* サイト共通の定数と、ページをまたいで使う小さな整形関数 */

export const GITHUB = 'https://github.com/N-Kos-mk'
export const REPO = 'https://github.com/n-kos-mk/nkos.dev'

/* 最下段の索引と上部タブが参照する行き先。
   note は英字の項目名だけでは行き先が読み取れないための添え書き */
export const SITE_LINKS = {
  home: { key: 'home', label: 'Home', note: 'トップへ', to: '/' },
  about: { key: 'about', label: 'About', note: '私について', to: '/about' },
  blog: { key: 'blog', label: 'Blog', note: '書き残し', to: '/blog' },
  works: { key: 'works', label: 'Works', note: 'プロジェクト等', to: '/works' },
  github: { key: 'github', label: 'GitHub', href: GITHUB, external: true },
}

const NAV_ORDER = ['home', 'about', 'blog', 'works', 'github']

/* 索引は 4 列で組む。いま居るページを 1 つ外すことで 4 項目に揃う。
   記事ページのように 5 つ残る場合は、外す対象を明示して呼ぶ */
export const navFor = current => NAV_ORDER.filter(k => k !== current).map(k => SITE_LINKS[k])

/* 上部の帯に常設するタブ。ページを移っても行き先が変わらないようにする */
export const TABS = [SITE_LINKS.about, SITE_LINKS.blog, SITE_LINKS.works]

export const tokyoTime = () =>
  new Intl.DateTimeFormat('ja-JP', {
    timeZone: 'Asia/Tokyo',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(new Date())

export const fmtDate = value => {
  const d = new Date(value)
  return Number.isNaN(d.getTime())
    ? String(value)
    : `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}
