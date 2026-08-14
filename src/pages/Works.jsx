import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ImageOff, LayoutGrid, List } from 'lucide-react'
import PageFrame from '../components/PageFrame.jsx'
import Module from '../components/Module.jsx'
import ArchivePanel from '../components/ArchivePanel.jsx'
import { HLine } from '../components/Rule.jsx'
import { works, serial } from '../lib/works.js'
import { buildAnchors } from '../lib/archive.js'
import { fmtDate } from '../lib/site.js'
import './Works.css'

const ANCHORS = buildAnchors(works)

const MODES = [
  { key: 'block', label: 'Block', Icon: LayoutGrid },
  { key: 'list', label: 'List', Icon: List },
]

const countLabel = n => `${n} ${n === 1 ? 'item' : 'items'}`

export default function Works() {
  const [mode, setMode] = useState('block')

  return (
    <PageFrame
      current="works"
      tag="Works"
      title="Works"
      meta={countLabel(works.length)}
      lead="Things I've built"
      railText="WORKS — KOS.N — 2026"
    >
      <div className="p-row p-row--index">
        <HLine />

        <Module tag="Catalog" meta={countLabel(works.length)} order={1}>
          <div className="cats wk-modes" role="group" aria-label="表示形式">
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

          {works.length > 0 ? (
            <ul className="wk-list" data-mode={mode}>
              {works.map((work, i) => (
                <li key={work.slug} id={ANCHORS.get(work.slug)}>
                  <Link className="wk-entry" to={`/works/${work.slug}`}>
                    <span className="wk-head">
                      <span className="wk-no">{serial(i)}</span>
                      <span className="wk-date">{fmtDate(work.date)}</span>
                    </span>
                    <span className="wk-thumb">
                      {work.thumbnail ? (
                        <img src={work.thumbnail} alt="" />
                      ) : (
                        <ImageOff size={16} strokeWidth={1.5} aria-hidden="true" />
                      )}
                    </span>
                    <span className="wk-body">
                      <span className="entry-title">{work.title}</span>
                      {work.excerpt && <span className="entry-text">{work.excerpt}</span>}
                    </span>
                    <ArrowUpRight className="wk-arrow" size={15} />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty">まだ制作物はありません</p>
          )}

          {works.length > 0 && <p className="readout">latest {fmtDate(works[0].date)}</p>}
        </Module>

        <ArchivePanel items={works} note={countLabel(works.length)} order={2} />
      </div>
    </PageFrame>
  )
}
