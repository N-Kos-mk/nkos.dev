import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ImageOff, LayoutGrid, List } from 'lucide-react'
import PageFrame from '../components/PageFrame.jsx'
import Module from '../components/Module.jsx'
import { HLine } from '../components/Rule.jsx'
import { posts } from '../lib/blog.js'
import { fmtDate } from '../lib/site.js'
import './Blog.css'

const parts = value => {
  const d = new Date(value)
  return Number.isNaN(d.getTime())
    ? null
    : { year: String(d.getFullYear()), month: String(d.getMonth() + 1).padStart(2, '0') }
}

/* 年 → 月の入れ子。年ごとの合計と、月ごとの本数を持つ */
const ARCHIVE = (() => {
  const years = new Map()
  posts.forEach(p => {
    const t = parts(p.date)
    const year = t?.year ?? '—'
    if (!years.has(year)) years.set(year, { year, total: 0, months: new Map() })
    const entry = years.get(year)
    entry.total += 1
    if (t) entry.months.set(t.month, (entry.months.get(t.month) ?? 0) + 1)
  })
  return [...years.values()]
    .sort((a, b) => b.year.localeCompare(a.year))
    .map(y => ({
      ...y,
      months: [...y.months.entries()].sort((a, b) => b[0].localeCompare(a[0])),
    }))
})()

/* 各月の先頭にあたる記事に印をつけ、そこへ飛べるようにする。
   posts は日付の降順なので、月が切り替わった最初の 1 件がその月の先頭になる */
const ANCHORS = (() => {
  const seen = new Set()
  const map = new Map()
  posts.forEach(p => {
    const t = parts(p.date)
    if (!t) return
    const key = `${t.year}-${t.month}`
    if (seen.has(key)) return
    seen.add(key)
    map.set(p.slug, `m-${key}`)
  })
  return map
})()

const MODES = [
  { key: 'block', label: 'Block', Icon: LayoutGrid },
  { key: 'list', label: 'List', Icon: List },
]

const countLabel = n => `${n} ${n === 1 ? 'entry' : 'entries'}`

const jumpToMonth = key => {
  const el = document.getElementById(`m-${key}`)
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
}

export default function Blog() {
  const [mode, setMode] = useState('block')

  return (
    <PageFrame
      current="blog"
      tag="Blog"
      title="Blog"
      meta={countLabel(posts.length)}
      lead="Thoughts & notes"
      railText="BLOG — KOS.N — 2026"
    >
      <div className="p-row p-row--aside bl-row">
        <HLine />

        <Module tag="Entries" meta={countLabel(posts.length)} order={1}>
          <div className="cats bl-modes" role="group" aria-label="表示形式">
            {MODES.map(({ key, label, Icon }) => (
              <button
                key={key}
                type="button"
                className="cat"
                data-on={mode === key || undefined}
                aria-pressed={mode === key}
                onClick={() => setMode(key)}
              >
                <Icon size={13} strokeWidth={1.7} aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>

          {posts.length > 0 ? (
            <ul className="bl-list" data-mode={mode}>
              {posts.map(post => (
                <li key={post.slug} id={ANCHORS.get(post.slug)}>
                  <Link className="bl-entry" to={`/blog/${post.slug}`}>
                    <span className="bl-thumb">
                      {post.thumbnail ? (
                        <img src={post.thumbnail} alt="" />
                      ) : (
                        <ImageOff size={16} strokeWidth={1.5} aria-hidden="true" />
                      )}
                    </span>
                    <span className="bl-body">
                      <span className="entry-date">{fmtDate(post.date)}</span>
                      <span className="entry-title">{post.title}</span>
                      {post.excerpt && <span className="entry-text">{post.excerpt}</span>}
                    </span>
                    <ArrowUpRight className="bl-arrow" size={15} />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty">まだ記事はありません</p>
          )}

          {posts.length > 0 && <p className="readout">latest {fmtDate(posts[0].date)}</p>}
        </Module>

        <Module tag="Archive" meta="by month" order={2}>
          <ul className="bl-years">
            {ARCHIVE.map(y => (
              <li key={y.year}>
                <div className="bl-year-row">
                  <span className="bl-year">{y.year}</span>
                  <span className="bl-year-n">{y.total}</span>
                </div>

                {y.months.length > 0 && (
                  <ul className="bl-months">
                    {y.months.map(([month, n]) => (
                      <li key={month}>
                        <button
                          type="button"
                          className="bl-month"
                          onClick={() => jumpToMonth(`${y.year}-${month}`)}
                        >
                          <span className="bl-month-label">{month}</span>
                          <span className="bl-month-n">{n}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <p className="readout">{countLabel(posts.length)}</p>
        </Module>
      </div>
    </PageFrame>
  )
}
