import { Link } from 'react-router-dom'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { INDEX_LINKS } from '../lib/site.js'
import { VLine } from './Rule.jsx'

/* 盤面の最下段に敷く索引。並びは全ページ共通で固定し、
   いま居るページだけは行き先を持たない目盛りとして据える */
export default function IndexNav({ current }) {
  return (
    <nav className="index-nav">
      {INDEX_LINKS.map(l => {
        const isCurrent = l.key === current
        const Arrow = l.external ? ExternalLink : ArrowUpRight
        const inner = (
          <>
            <VLine />
            <span className="index-label">{l.label}</span>
            {l.note && <span className="index-note">{l.note}</span>}
            {isCurrent ? (
              <span className="index-mark" aria-hidden="true" />
            ) : (
              <Arrow className="index-arrow" size={16} />
            )}
          </>
        )

        if (isCurrent) {
          return (
            <span key={l.key} className="index-item index-item--current" aria-current="page">
              {inner}
            </span>
          )
        }

        return l.external ? (
          <a
            key={l.key}
            className="index-item"
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {inner}
          </a>
        ) : (
          <Link key={l.key} className="index-item" to={l.to}>
            {inner}
          </Link>
        )
      })}
    </nav>
  )
}
