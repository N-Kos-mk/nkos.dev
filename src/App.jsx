import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Code2, AppWindow, MapPin, GraduationCap } from 'lucide-react'
import {
  siHtml5, siCss, siJavascript, siTypescript, siPython, siPhp,
  siReact, siVite, siNodedotjs, siFastapi,
  siMysql, siPostgresql, siSqlite,
  siGit, siGithub, siLinux, siCloudflare, siCloudflareworkers, siVercel,
} from 'simple-icons/icons'
import { posts } from './lib/blog.js'
import './App.css'

/* 既存ページと App.css のクラス名が衝突しないよう、すべて d2- を接頭辞にしている */

const GITHUB = 'https://github.com/N-Kos-mk'
const REPO = 'https://github.com/n-kos-mk/nkos.dev'

/* ブランドカラーが黒に近く、暗い背景で沈むアイコンは白で描く */
const DARK_ICON_SLUGS = new Set(['github', 'vercel'])

const ID_FACTS = [
  { Icon: MapPin, text: '東京都' },
  { Icon: GraduationCap, text: 'The University of Electro-Communications' },
]

/* 差し替え用のダミー。同じ画像を object-position だけ変えて並べている。
   実写真が入ったら src / place / note を入れ替えるだけでよい */
const PHOTOS = [
  { src: '/images/avatar.png', place: '東京都', note: 'dummy', pos: 'center 28%' },
  { src: '/images/avatar.png', place: '静岡県', note: 'dummy', pos: 'center 55%' },
  { src: '/images/avatar.png', place: '京都府', note: 'dummy', pos: 'center 82%' },
]

const WORKS = [
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

const STACK = [
  {
    key: 'lang',
    label: '言語',
    items: [
      { name: 'HTML', icon: siHtml5 },
      { name: 'CSS', icon: siCss },
      { name: 'JavaScript', icon: siJavascript },
      { name: 'TypeScript', icon: siTypescript },
      { name: 'Python', icon: siPython },
      { name: 'PHP', icon: siPhp },
    ],
  },
  {
    key: 'fw',
    label: 'フレームワーク',
    items: [
      { name: 'React', icon: siReact },
      { name: 'Vite', icon: siVite },
      { name: 'Node.js', icon: siNodedotjs },
      { name: 'FastAPI', icon: siFastapi },
    ],
  },
  {
    key: 'db',
    label: 'データベース',
    items: [
      { name: 'MySQL', icon: siMysql },
      { name: 'PostgreSQL', icon: siPostgresql },
      { name: 'SQLite', icon: siSqlite },
    ],
  },
  {
    key: 'infra',
    label: 'インフラ・ツール',
    items: [
      { name: 'Git', icon: siGit },
      { name: 'GitHub', icon: siGithub },
      { name: 'VS Code', Icon: Code2 },
      { name: 'Linux', icon: siLinux },
      { name: 'Windows', Icon: AppWindow },
      { name: 'Cloudflare', icon: siCloudflare },
      { name: 'Workers', icon: siCloudflareworkers },
      { name: 'Vercel', icon: siVercel },
    ],
  },
]
const STACK_FLAT = STACK.flatMap(g => g.items.map(item => ({ ...item, key: g.key })))

const INDEX_LINKS = [
  { label: 'About', note: '経歴と人となり', to: '/about' },
  { label: 'Blog', note: '書いたもの', to: '/blog' },
  { label: 'Works', note: '準備中', to: '/works' },
  { label: 'GitHub', note: 'ソースコード', href: GITHUB },
]

/* 決定的なゆらぎ。index から生成するので、再描画しても値は変わらない。
   乱数だと状態が更新されるたびに配置が飛ぶ */
const jitter = (seed, range) => {
  const x = Math.sin((seed + 1) * 127.1) * 43758.5453
  return (x - Math.floor(x) - 0.5) * range
}

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v))

/* 並べも送りもせず、面のなかに散らして漂わせる。
   粗い格子を下敷きにして各点をずらすが、格子をそのまま使うと
   ずらし幅が間隔より小さく、列が透けて整列して見える。
   奇数行を半セル横にずらして列を噛み合わせ、ずらし幅も広く取る */
const FLOAT_COLS = 4
const FLOAT_ROWS = Math.ceil(STACK_FLAT.length / FLOAT_COLS)
/* 半セルずらした分だけ横幅を広げ、右端がはみ出さないようにする */
const FLOAT_SPAN = FLOAT_COLS + 0.5

/* 配置そのものは固定の枠として持ち、どのアイコンがどの枠に入るかだけを
   表示のたびに入れ替える。枠を作り直すと散らばり具合が毎回変わってしまう */
const FLOAT_SLOTS = STACK_FLAT.map((_, i) => {
  const col = i % FLOAT_COLS
  const row = Math.floor(i / FLOAT_COLS)
  const stagger = row % 2 ? 0.5 : 0
  return {
    x: clamp(((col + 0.5 + stagger + jitter(i, 0.72)) / FLOAT_SPAN) * 100, 9, 91),
    y: clamp(((row + 0.5 + jitter(i + 31, 0.68)) / FLOAT_ROWS) * 100, 7, 93),
    size: 17 + Math.abs(jitter(i + 7, 8)),
    dur: 7 + Math.abs(jitter(i + 13, 7)),
    delay: -Math.abs(jitter(i + 19, 12)),
    /* 漂う振れ幅も個体差をつける。同じ軌跡だと群れとして揃って見える */
    amp: 0.6 + Math.abs(jitter(i + 53, 1.3)),
    rev: i % 2 === 0,
  }
})

/* 表示のたびに並び順を入れ替える。マウント時に一度だけ実行し、
   以降の再描画では固定する。描画のたびに引き直すと、ホバーなどで
   状態が変わるたびにアイコンが枠を飛び移ってしまう */
const shuffleFloats = () => {
  const items = [...STACK_FLAT]
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[items[i], items[j]] = [items[j], items[i]]
  }
  return items.map((item, i) => ({ ...item, ...FLOAT_SLOTS[i] }))
}

const tokyoTime = () =>
  new Intl.DateTimeFormat('ja-JP', {
    timeZone: 'Asia/Tokyo',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(new Date())

const fmtDate = value => {
  const d = new Date(value)
  return Number.isNaN(d.getTime())
    ? String(value)
    : `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}

const brandColor = item =>
  item.icon && !DARK_ICON_SLUGS.has(item.icon.slug) ? `#${item.icon.hex}` : 'var(--d2-white)'

/* 罫線。border ではなく要素にすることで、引かれる向きと順番を制御できる */
const VLine = () => <span className="d2-vline" aria-hidden="true" />
const HLine = () => <span className="d2-hline" aria-hidden="true" />

function StackIcon({ item }) {
  if (item.Icon) {
    const { Icon } = item
    return <Icon size={19} strokeWidth={1.6} aria-hidden="true" />
  }
  return (
    <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor" aria-hidden="true">
      <path d={item.icon.path} />
    </svg>
  )
}

function Module({ tag, meta, className = '', order, children }) {
  return (
    <section className={`d2-mod ${className}`} style={{ '--i': order }}>
      <VLine />
      <header className="d2-mod-head">
        <span className="d2-mod-tag">{tag}</span>
        {meta && <span className="d2-mod-meta">{meta}</span>}
      </header>
      {children}
    </section>
  )
}

function WorkItem({ work }) {
  const inner = (
    <>
      <span className="d2-work-name">{work.name}</span>
      <ArrowUpRight className="d2-work-arrow" size={15} />
      <span className="d2-work-note">{work.note}</span>
    </>
  )
  return work.href ? (
    <a className="d2-work" href={work.href} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  ) : (
    <Link className="d2-work" to={work.to}>
      {inner}
    </Link>
  )
}

function App() {
  const [clock, setClock] = useState(tokyoTime)
  const [shot, setShot] = useState(0)
  const [hoverCat, setHoverCat] = useState(null)
  const [pinCat, setPinCat] = useState(null)
  const [hoverItem, setHoverItem] = useState(null)
  const [floats] = useState(shuffleFloats)
  const activeCat = hoverCat ?? pinCat

  useEffect(() => {
    const id = setInterval(() => setClock(tokyoTime()), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setShot(i => (i + 1) % PHOTOS.length), 4600)
    return () => clearInterval(id)
  }, [])

  const latest = posts.slice(0, 2)

  /* アイコンだけでは名前が読めないため、指したものを下段に表示する */
  const readout =
    hoverItem ??
    (activeCat ? STACK.find(g => g.key === activeCat).label : `${STACK_FLAT.length} items`)

  return (
    <div className="d2">
      {/* 左端の銘板。ページ全体の縁を締める */}
      <aside className="d2-rail" aria-hidden="true">
        <VLine />
        <span className="d2-rail-clock">{clock}</span>
        <span className="d2-rail-text">PORTFOLIO — KOS.N — 2026</span>
      </aside>

      <main className="d2-main">
        <div className="d2-row d2-row--a">
          <HLine />

          {/* ── IDENTITY ── */}
          <Module tag="Identity" meta="he / him" className="d2-id" order={0}>
            <div className="d2-id-inner">
              <div className="d2-id-body">
                <h1 className="d2-id-name">Kos.N</h1>
                <p className="d2-id-domain">
                  nkos
                  <Link className="d2-id-dot" to="/troll">
                    .
                  </Link>
                  dev
                </p>
              </div>
              <figure className="d2-id-plate">
                <img src="/images/avatar.png" alt="" />
              </figure>
            </div>

            {/* 面の下端に敷く注記帯。アイコンは枠に収めて盤面の言語に合わせる */}
            <ul className="d2-id-facts">
              {ID_FACTS.map(({ Icon, text }) => (
                <li key={text}>
                  <span className="d2-fact-mark">
                    <Icon size={12} strokeWidth={1.8} />
                  </span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </Module>

          {/* ── GALLERY ── */}
          <Module
            tag="Gallery"
            meta={`${shot + 1} / ${PHOTOS.length}`}
            className="d2-gallery"
            order={1}
          >
            <figure className="d2-shots">
              {PHOTOS.map((p, i) => (
                <img
                  key={`${p.src}-${i}`}
                  src={p.src}
                  alt=""
                  style={{ objectPosition: p.pos }}
                  data-on={i === shot || undefined}
                />
              ))}
              <figcaption className="d2-shot-cap">
                <MapPin size={13} strokeWidth={1.8} />
                <span>{PHOTOS[shot].place}</span>
                {PHOTOS[shot].note && <span className="d2-shot-note">{PHOTOS[shot].note}</span>}
              </figcaption>
            </figure>

            <div className="d2-shot-ticks">
              {PHOTOS.map((p, i) => (
                <button
                  key={`tick-${i}`}
                  type="button"
                  className="d2-tick"
                  data-on={i === shot || undefined}
                  aria-label={`${i + 1} 枚目 — ${p.place}`}
                  onClick={() => setShot(i)}
                />
              ))}
            </div>
          </Module>
        </div>

        <div className="d2-row d2-row--b">
          <HLine />

          {/* ── STACK ── */}
          <Module tag="Stack" meta={`${STACK.length} groups`} className="d2-stack" order={2}>
            <div className="d2-cats">
              {STACK.map(g => (
                <button
                  key={g.key}
                  type="button"
                  className="d2-cat"
                  data-on={activeCat === g.key || undefined}
                  aria-pressed={pinCat === g.key}
                  onMouseEnter={() => setHoverCat(g.key)}
                  onMouseLeave={() => setHoverCat(null)}
                  onFocus={() => setHoverCat(g.key)}
                  onBlur={() => setHoverCat(null)}
                  onClick={() => setPinCat(p => (p === g.key ? null : g.key))}
                >
                  {g.label}
                  <span className="d2-cat-n">{g.items.length}</span>
                </button>
              ))}
            </div>

            {/* 面のなかを漂う。ホバーで全体が止まるので、動いていても選べる */}
            <ul className="d2-float">
              {floats.map(item => (
                <li
                  key={item.name}
                  className="d2-icon"
                  style={{
                    '--brand': brandColor(item),
                    '--x': `${item.x.toFixed(2)}%`,
                    '--y': `${item.y.toFixed(2)}%`,
                    '--sz': `${item.size.toFixed(1)}px`,
                    '--dur': `${item.dur.toFixed(2)}s`,
                    '--delay': `${item.delay.toFixed(2)}s`,
                    '--amp': item.amp.toFixed(2),
                  }}
                  data-rev={item.rev || undefined}
                  data-state={activeCat ? (activeCat === item.key ? 'on' : 'off') : undefined}
                  onMouseEnter={() => setHoverItem(item.name)}
                  onMouseLeave={() => setHoverItem(null)}
                >
                  <StackIcon item={item} />
                  <span className="d2-sr">{item.name}</span>
                </li>
              ))}
            </ul>

            <p className="d2-readout">{readout}</p>
          </Module>

          {/* ── WORKS ── */}
          <Module tag="Works" meta={`${WORKS.length} items`} className="d2-works" order={3}>
            <ul className="d2-work-list">
              {WORKS.map(w => (
                <li key={w.name}>
                  <WorkItem work={w} />
                </li>
              ))}
            </ul>
            <Link className="d2-more" to="/works">
              ほかの制作物
              <span className="d2-more-note">準備中</span>
            </Link>
          </Module>

          {/* ── LOG ── */}
          <Module
            tag="Log"
            meta={`${posts.length} ${posts.length === 1 ? 'entry' : 'entries'}`}
            className="d2-log"
            order={4}
          >
            {latest.length > 0 ? (
              <ul className="d2-entries">
                {latest.map(p => (
                  <li key={p.slug}>
                    <Link className="d2-entry" to={`/blog/${p.slug}`}>
                      <span className="d2-entry-date">{fmtDate(p.date)}</span>
                      <span className="d2-entry-title">{p.title}</span>
                      {p.excerpt && <span className="d2-entry-text">{p.excerpt}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="d2-empty">まだ記事はありません</p>
            )}
          </Module>
        </div>

        {/* ── INDEX ── */}
        <nav className="d2-index" style={{ '--i': 5 }}>
          {INDEX_LINKS.map(l =>
            l.href ? (
              <a
                key={l.label}
                className="d2-index-item"
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <VLine />
                <span className="d2-index-label">{l.label}</span>
                <span className="d2-index-note">{l.note}</span>
                <ArrowUpRight className="d2-index-arrow" size={16} />
              </a>
            ) : (
              <Link key={l.label} className="d2-index-item" to={l.to}>
                <VLine />
                <span className="d2-index-label">{l.label}</span>
                <span className="d2-index-note">{l.note}</span>
                <ArrowUpRight className="d2-index-arrow" size={16} />
              </Link>
            ),
          )}
        </nav>
      </main>
    </div>
  )
}

export default App
