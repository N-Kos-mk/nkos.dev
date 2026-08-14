/* サイト共通の定数と、ページをまたいで使う小さな整形関数 */

export const GITHUB = 'https://github.com/N-Kos-mk'
export const REPO = 'https://github.com/n-kos-mk/nkos.dev'

/* 最下段の索引と上部タブが参照する行き先。
   note は英字の項目名だけでは行き先が読み取れないための添え書き。
   トップへはどのページでも左上の nkos.dev から戻れるため、索引には持たない */
export const SITE_LINKS = {
  about: { key: 'about', label: 'About', note: '私について', to: '/about' },
  blog: { key: 'blog', label: 'Blog', note: '書き残し', to: '/blog' },
  works: { key: 'works', label: 'Works', note: 'プロジェクト等', to: '/works' },
  github: { key: 'github', label: 'GitHub', href: GITHUB, external: true },
}

/* 索引の並びはどのページでも同じ。位置が変わると盤面の目盛りとして機能しない */
export const INDEX_LINKS = [
  SITE_LINKS.about,
  SITE_LINKS.blog,
  SITE_LINKS.works,
  SITE_LINKS.github,
]

/* 上部の帯に常設するタブ。ページを移っても行き先が変わらないようにする */
export const TABS = [SITE_LINKS.about, SITE_LINKS.blog, SITE_LINKS.works]

/* いま居る区画。銘板の文字とページタイトルの両方がこれを見る */
export const sectionOf = pathname => {
  if (pathname.startsWith('/about')) return 'ABOUT'
  if (pathname.startsWith('/blog')) return 'BLOG'
  if (pathname.startsWith('/works')) return 'WORKS'
  return 'HOME'
}

/* 銘板ではトップを PORTFOLIO と呼ぶ。ページタイトル側は HOME のまま */
export const railLabelOf = pathname => {
  const section = sectionOf(pathname)
  return section === 'HOME' ? 'PORTFOLIO' : section
}

export const tokyoTime = () =>
  new Intl.DateTimeFormat('ja-JP', {
    timeZone: 'Asia/Tokyo',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(new Date())

/* 年もビルド時に焼かず、時計と同じく実行時に取り直す */
export const tokyoYear = () =>
  new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Tokyo', year: 'numeric' }).format(new Date())

export const SITE_START_YEAR = 2026

/* 開始年から現在まで、の表記。同じ年のうちは「2026-」と開いたままにし、
   年をまたいだところで現在年まで伸ばす */
export const copyrightOf = year => {
  const now = Number(year)
  return Number.isNaN(now) || now <= SITE_START_YEAR
    ? `© ${SITE_START_YEAR}-`
    : `© ${SITE_START_YEAR}-${now}`
}

export const fmtDate = value => {
  const d = new Date(value)
  return Number.isNaN(d.getTime())
    ? String(value)
    : `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}
