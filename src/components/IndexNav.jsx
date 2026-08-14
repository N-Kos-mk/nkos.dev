import { Link } from 'react-router-dom'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { VLine } from './Rule.jsx'

/* 盤面の最下段に敷く索引。行き先は 4 つに揃え、内部と外部を矢印で描き分ける */
export default function IndexNav({ links }) {
  return (
    <nav className="index-nav">
      {links.map(l => {
        const Arrow = l.external ? ExternalLink : ArrowUpRight
        const inner = (
          <>
            <VLine />
            <span className="index-label">{l.label}</span>
            {l.note && <span className="index-note">{l.note}</span>}
            <Arrow className="index-arrow" size={16} />
          </>
        )
        return l.external ? (
          <a
            key={l.label}
            className="index-item"
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {inner}
          </a>
        ) : (
          <Link key={l.label} className="index-item" to={l.to}>
            {inner}
          </Link>
        )
      })}
    </nav>
  )
}
