import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { posts } from './lib/blog.js'
import './App.css'

/* 既存ページと App.css のクラス名が衝突しないよう、すべて d2- を接頭辞にしている */

const GITHUB = 'https://github.com/N-Kos-mk'
const AGE = new Date().getFullYear() - 2002

const STACK = [
  { key: 'lang', label: '言語', items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Python', 'PHP'] },
  { key: 'fw', label: 'フレームワーク', items: ['React', 'Vite', 'Node.js', 'FastAPI'] },
  { key: 'db', label: 'データベース', items: ['MySQL', 'PostgreSQL', 'SQLite'] },
  {
    key: 'infra',
    label: 'インフラ・ツール',
    items: ['Git', 'GitHub', 'VS Code', 'Linux', 'Windows', 'Cloudflare', 'Workers', 'Vercel'],
  },
]
const STACK_FLAT = STACK.flatMap(g => g.items.map(name => ({ name, key: g.key })))

const FOCUS_TAGS = ['HCI', '評価指標', '前歴: タンパク質工学']

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

function Module({ tag, meta, className = '', order, children }) {
  return (
    <section className={`d2-mod ${className}`} style={{ '--i': order }}>
      <header className="d2-mod-head">
        <span className="d2-mod-tag">{tag}</span>
        {meta && <span className="d2-mod-meta">{meta}</span>}
      </header>
      {children}
    </section>
  )
}

function App() {
  const [clock, setClock] = useState(tokyoTime)
  const [hoverCat, setHoverCat] = useState(null)
  const [pinCat, setPinCat] = useState(null)
  const activeCat = hoverCat ?? pinCat

  useEffect(() => {
    const id = setInterval(() => setClock(tokyoTime()), 1000)
    return () => clearInterval(id)
  }, [])

  const latest = posts.slice(0, 2)

  return (
    <div className="d2">
      {/* 左端の銘板。ページ全体の縁を締める */}
      <aside className="d2-rail" aria-hidden="true">
        <span className="d2-rail-text">PORTFOLIO — KOS.N — 2026</span>
      </aside>

      <main className="d2-main">
        <div className="d2-row d2-row--a">
          {/* ── IDENTITY ── */}
          <Module tag="Identity" meta="he / him" className="d2-id" order={0}>
            <img className="d2-id-photo" src="/images/avatar.png" alt="" aria-hidden="true" />
            <div className="d2-id-body">
              <h1 className="d2-id-name">Kos.N</h1>
              <p className="d2-id-domain">
                nkos
                <Link className="d2-id-dot" to="/troll">
                  .
                </Link>
                dev
              </p>
              <p className="d2-id-role">電気通信大学 大学院 情報学専攻 / 修士 2 年</p>
            </div>
          </Module>

          {/* ── FOCUS ── */}
          <Module tag="Focus" meta="2026 —" className="d2-focus" order={1}>
            <h2 className="d2-focus-title">デザインの定量評価</h2>
            <p className="d2-focus-text">
              good / bad で語られてきたものを、数値で扱えるようにする研究をしています。
              その前は数年間、生物分野でタンパク質を扱っていました。
              対象は変わりましたが、つくって、測って、確かめるという手順は変わっていません。
            </p>
            <ul className="d2-tags">
              {FOCUS_TAGS.map(t => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </Module>
        </div>

        <div className="d2-row d2-row--b">
          {/* ── STACK ── */}
          <Module tag="Stack" meta={`${STACK_FLAT.length} items`} className="d2-stack" order={2}>
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
              {STACK_FLAT.map(s => (
                <li
                  key={s.name}
                  className="d2-cell"
                  data-state={activeCat ? (activeCat === s.key ? 'on' : 'off') : undefined}
                >
                  {s.name}
                </li>
              ))}
            </ul>
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

          {/* ── META ── */}
          <Module tag="Meta" meta="JST" className="d2-meta" order={4}>
            <dl className="d2-facts">
              <div className="d2-fact">
                <dt>拠点</dt>
                <dd>東京都</dd>
              </div>
              <div className="d2-fact">
                <dt>出身</dt>
                <dd>京都府生まれ / 静岡県育ち</dd>
              </div>
              <div className="d2-fact">
                <dt>年齢</dt>
                <dd>{AGE}</dd>
              </div>
              <div className="d2-fact">
                <dt>現地時刻</dt>
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
                <span className="d2-index-label">{l.label}</span>
                <span className="d2-index-note">{l.note}</span>
                <ArrowUpRight className="d2-index-arrow" size={16} />
              </a>
            ) : (
              <Link key={l.label} className="d2-index-item" to={l.to}>
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
