import { Link } from 'react-router-dom'
import { TABS, navFor } from '../lib/site.js'
import Rail from './Rail.jsx'
import IndexNav from './IndexNav.jsx'
import { HLine } from './Rule.jsx'
import './PageFrame.css'

/* 下層ページ共通の枠。トップページの観測盤と同じ言語（1px の罫線・角丸なし・
   有彩色は真鍮のみ）で、銘板・上部の帯・銘板見出し・最下段の索引を用意する。

   current   … いま居るページの key。上部タブの現在地表示と、索引から自分を外すのに使う
   navExclude… 索引から外す項目を current 以外にしたいとき（記事ページなど）に指定する */
export default function PageFrame({
  current,
  tag,
  title,
  jpTitle = false,
  meta,
  lead,
  figure,
  railText,
  navExclude,
  children,
}) {
  return (
    <div className="page">
      <Rail text={railText} />

      <div className="page-main">
        {/* ページを移っても nkos.dev と行き先が残るよう、帯は上端に貼り付けておく */}
        <div className="p-top">
          <HLine />
          <Link className="p-brand" to="/" aria-label="nkos.dev トップへ">
            <span className="p-brand-mark" aria-hidden="true" />
            nkos.dev
          </Link>
          <nav className="p-tabs">
            {TABS.map(t => (
              <Link
                key={t.key}
                className="p-tab"
                to={t.to}
                aria-current={t.key === current ? 'page' : undefined}
              >
                {t.label}
              </Link>
            ))}
          </nav>
        </div>

        <header className="p-banner" style={{ '--i': 0 }}>
          <HLine />
          <div className="mod-head">
            <span className="mod-tag">{tag}</span>
            {meta && <span className="mod-meta">{meta}</span>}
          </div>
          <div className="p-banner-inner">
            <div className="p-banner-body">
              <h1 className={`p-title${jpTitle ? ' p-title--jp' : ''}`}>{title}</h1>
              {lead && <p className="p-lead">{lead}</p>}
            </div>
            {figure}
          </div>
        </header>

        {children}

        <IndexNav links={navFor(navExclude ?? current)} />
      </div>
    </div>
  )
}
