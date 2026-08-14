import { useMemo } from 'react'
import Module from './Module.jsx'
import { buildArchive, jumpToMonth } from '../lib/archive.js'
import './ArchivePanel.css'

/* 年月の目盛り。年で区切り、その内側に月をひと段下げて並べる。
   月を押すとその月の先頭にあたる項目へ飛ぶ */
export default function ArchivePanel({ items, note, order }) {
  const archive = useMemo(() => buildArchive(items), [items])

  return (
    <Module tag="Archive" meta="by month" className="arch" order={order}>
      {/* 一覧を下まで送っても目盛りが残るよう、この面だけ別に留めて畳む */}
      <div className="arch-inner">
        <ul className="arch-years">
          {archive.map(y => (
            <li key={y.year}>
              <div className="arch-year-row">
                <span className="arch-year">{y.year}</span>
                <span className="arch-year-n">{y.total}</span>
              </div>

              {y.months.length > 0 && (
                <ul className="arch-months">
                  {y.months.map(([month, n]) => (
                    <li key={month}>
                      <button
                        type="button"
                        className="arch-month"
                        onClick={() => jumpToMonth(`${y.year}-${month}`)}
                      >
                        <span className="arch-month-label">{month}</span>
                        <span className="arch-month-n">{n}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {note && <p className="readout">{note}</p>}
      </div>
    </Module>
  )
}
