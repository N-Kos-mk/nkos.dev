import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

/* 制作物の 1 行。名前・矢印・注記の 3 点で組み、外部と内部で要素だけ切り替える */
export default function WorkItem({ work }) {
  const inner = (
    <>
      <span className="work-name">{work.name}</span>
      <ArrowUpRight className="work-arrow" size={15} />
      <span className="work-note">{work.note}</span>
    </>
  )
  return work.href ? (
    <a className="work" href={work.href} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  ) : (
    <Link className="work" to={work.to}>
      {inner}
    </Link>
  )
}
