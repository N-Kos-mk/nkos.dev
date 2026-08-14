import { Link } from 'react-router-dom'
import { ArrowUpRight, ImageOff } from 'lucide-react'
import PageFrame from '../components/PageFrame.jsx'
import Module from '../components/Module.jsx'
import { HLine } from '../components/Rule.jsx'
import { posts } from '../lib/blog.js'
import { fmtDate } from '../lib/site.js'
import './Blog.css'

const yearOf = value => {
  const d = new Date(value)
  return Number.isNaN(d.getTime()) ? '—' : String(d.getFullYear())
}

/* 年ごとの本数。件数を出しておくと、記事が少ないうちも面が計器として読める */
const YEARS = [...posts.reduce((m, p) => m.set(yearOf(p.date), (m.get(yearOf(p.date)) ?? 0) + 1), new Map())]
  .sort((a, b) => b[0].localeCompare(a[0]))

const countLabel = n => `${n} ${n === 1 ? 'entry' : 'entries'}`

export default function Blog() {
  return (
    <PageFrame
      current="blog"
      tag="Blog"
      title="Blog"
      meta={countLabel(posts.length)}
      lead="Thoughts & notes"
      railText="BLOG — KOS.N — 2026"
    >
      <div className="p-row p-row--aside">
        <HLine />

        <Module tag="Entries" meta={countLabel(posts.length)} order={1}>
          {posts.length > 0 ? (
            <ul className="bl-list">
              {posts.map(post => (
                <li key={post.slug}>
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
        </Module>

        <Module tag="Archive" meta="by year" order={2}>
          <ul className="bl-years">
            {YEARS.map(([year, n]) => (
              <li key={year}>
                <span className="bl-year">{year}</span>
                <span className="bl-year-n">{n}</span>
              </li>
            ))}
          </ul>
          <p className="readout">{countLabel(posts.length)}</p>
        </Module>
      </div>
    </PageFrame>
  )
}
