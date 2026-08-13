import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Code2, AppWindow } from 'lucide-react'
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

const COLS = 7

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

/* 奥付。自己紹介ではなく、この盤面そのものの仕様を書く */
const COLOPHON = [
  ['Type', 'Archivo / Zen Kaku Gothic New'],
  ['Stack', 'React · Vite'],
  ['Host', 'Cloudflare Pages'],
]

const INDEX_LINKS = [
  { label: 'About', note: '経歴と人となり', to: '/about' },
  { label: 'Blog', note: '書いたもの', to: '/blog' },
  { label: 'Works', note: '準備中', to: '/works' },
  { label: 'GitHub', note: 'ソースコード', href: GITHUB },
]

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
  const [hoverCat, setHoverCat] = useState(null)
  const [pinCat, setPinCat] = useState(null)
  const [hoverItem, setHoverItem] = useState(null)
  const activeCat = hoverCat ?? pinCat

  useEffect(() => {
    const id = setInterval(() => setClock(tokyoTime()), 1000)
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
                <p className="d2-id-role">つくったものと、考えたことの置き場</p>
              </div>
              <figure className="d2-id-plate">
                <img src="/images/avatar.png" alt="" />
              </figure>
            </div>
          </Module>

          {/* ── WORKS ── */}
          <Module tag="Works" meta={`${WORKS.length} items`} className="d2-works" order={1}>
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

            <ul className="d2-cells">
              {STACK_FLAT.map((item, n) => (
                <li
                  key={item.name}
                  className="d2-cell"
                  style={{
                    '--brand': brandColor(item),
                    '--col': n % COLS,
                    '--row': Math.floor(n / COLS),
                  }}
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

          {/* ── LOG ── */}
          <Module
            tag="Log"
            meta={`${posts.length} ${posts.length === 1 ? 'entry' : 'entries'}`}
            className="d2-log"
            order={3}
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

          {/* ── COLOPHON ── */}
          <Module tag="Colophon" meta="JST" className="d2-colophon" order={4}>
            <dl className="d2-facts">
              {COLOPHON.map(([k, v]) => (
                <div className="d2-fact" key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
              <div className="d2-fact">
                <dt>Time</dt>
                <dd className="d2-clock">{clock}</dd>
              </div>
            </dl>
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
