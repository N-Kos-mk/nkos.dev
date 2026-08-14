import PageFrame from '../components/PageFrame.jsx'
import Module from '../components/Module.jsx'
import WorkItem from '../components/WorkItem.jsx'
import RotationSushi from '../components/RotationSushi.jsx'
import { HLine } from '../components/Rule.jsx'
import { WORKS } from '../lib/works.js'
import './Works.css'

export default function Works() {
  return (
    <PageFrame
      current="works"
      tag="Works"
      title="Works"
      meta={`${WORKS.length} items`}
      lead="This page is under construction."
      railText="WORKS — KOS.N — 2026"
    >
      <div className="p-row p-row--aside">
        <HLine />

        <Module tag="Items" meta={`${WORKS.length} items`} order={1}>
          <ul className="work-list">
            {WORKS.map(w => (
              <li key={w.name}>
                <WorkItem work={w} />
              </li>
            ))}
          </ul>
          <p className="readout">{WORKS.length} listed</p>
        </Module>

        <Module tag="Status" meta="pending" order={2}>
          <p className="wk-eyebrow">Coming Soon</p>

          {/* 旧ページから引き継いだ小ネタ。押すたびに回転が速くなる */}
          <div className="wk-sushi">
            <RotationSushi size="3rem" />
            <p className="wk-sushi-cap">This is rotation sushi.</p>
          </div>
        </Module>
      </div>
    </PageFrame>
  )
}
