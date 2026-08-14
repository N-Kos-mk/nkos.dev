import { useParams, Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import PageFrame from '../components/PageFrame.jsx'
import Module from '../components/Module.jsx'
import Prose from '../components/Prose.jsx'
import EntryItem from '../components/EntryItem.jsx'
import { HLine } from '../components/Rule.jsx'
import { works, getWork, serial } from '../lib/works.js'
import { fmtDate } from '../lib/site.js'
import './Works.css'

export default function WorkPost() {
  const { slug } = useParams()
  const work = getWork(slug)

  if (!work) {
    return (
      <PageFrame
        current="works"
        indexCurrent={null}
        tag="Item"
        title="Not found"
        meta="404"
        lead="制作物が見つかりませんでした。"
      >
        <div className="p-row">
          <HLine />
          <Module tag="Index" meta="works" order={1}>
            <Link className="more" to="/works">
              Works 一覧へ
              <ArrowUpRight size={15} />
            </Link>
          </Module>
        </div>
      </PageFrame>
    )
  }

  const { Component } = work
  const no = serial(works.findIndex(w => w.slug === work.slug))
  /* 台帳の隣に置く行き先。いま開いているものは外す */
  const others = works
    .map((w, i) => ({ ...w, no: serial(i) }))
    .filter(w => w.slug !== work.slug)
    .slice(0, 3)

  return (
    <PageFrame
      current="works"
      indexCurrent={null}
      tag="Item"
      title={work.title}
      jpTitle
      meta={`${no} — ${fmtDate(work.date)}`}
      lead={work.excerpt}
    >
      <div className="p-row p-row--aside">
        <HLine />

        <Module tag="Detail" meta={work.slug} order={1}>
          <Prose>
            <Component />
          </Prose>

          {/* 読み終わりの行き先。面が伸びても下端に着く */}
          <Link className="more" to="/works">
            Works 一覧へ
            <ArrowUpRight size={15} />
          </Link>
        </Module>

        <Module tag="Index" className="wk-side" meta="works" order={2}>
          <Link className="wk-side-back" to="/works">
            <ArrowUpRight size={15} />
            Works 一覧へ
          </Link>

          {others.length > 0 && (
            <ul className="entries">
              {others.map(w => (
                <li key={w.slug}>
                  <EntryItem to={`/works/${w.slug}`} stamp={w.no} title={w.title} />
                </li>
              ))}
            </ul>
          )}

          <p className="readout">{no}</p>
        </Module>
      </div>
    </PageFrame>
  )
}
