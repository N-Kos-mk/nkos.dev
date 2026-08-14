import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ImageOff, LayoutGrid, List } from 'lucide-react'
import PageFrame from '../components/PageFrame.jsx'
import Module from '../components/Module.jsx'
import ArchivePanel from '../components/ArchivePanel.jsx'
import { HLine } from '../components/Rule.jsx'
import { posts } from '../lib/blog.js'
import { buildAnchors } from '../lib/archive.js'
import { fmtDate } from '../lib/site.js'
import './Blog.css'

const ANCHORS = buildAnchors(posts)

const MODES = [
  { key: 'block', label: 'Block', Icon: LayoutGrid },
  { key: 'list', label: 'List', Icon: List },
]

const countLabel = n => `${n} ${n === 1 ? 'entry' : 'entries'}`

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
      <div className="p-row p-row--index">
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

        <ArchivePanel items={posts} note={countLabel(posts.length)} order={2} />
      </div>
    </PageFrame>
  )
}
