import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

/* 一覧の 1 行。stamp は日付でも通し番号でもよい。
   行き先があることを矢印で示し、ホバーで真鍮に点く */
export default function EntryItem({ to, stamp, title, text }) {
  return (
    <Link className="entry" to={to}>
      <span className="entry-body">
        <span className="entry-date">{stamp}</span>
        <span className="entry-title">{title}</span>
        {text && <span className="entry-text">{text}</span>}
      </span>
      <ArrowUpRight className="entry-arrow" size={15} />
    </Link>
  )
}
