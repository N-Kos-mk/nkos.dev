import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

/* 制作物の 1 行。名前・矢印・注記の 3 点で組む */
export default function WorkItem({ work }) {
  return (
    <Link className="work" to={`/works/${work.slug}`}>
      <span className="work-name">{work.title}</span>
      <ArrowUpRight className="work-arrow" size={15} />
      {work.excerpt && <span className="work-note">{work.excerpt}</span>}
    </Link>
  )
}
