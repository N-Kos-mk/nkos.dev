import {
  ExternalLink, Mail, GraduationCap, Calendar, MapPin, Home, Gamepad2, Wrench, Camera,
} from 'lucide-react'
import PageFrame from '../components/PageFrame.jsx'
import Module from '../components/Module.jsx'
import StackIcon from '../components/StackIcon.jsx'
import { HLine } from '../components/Rule.jsx'
import { STACK_COUNT, brandColor } from '../lib/stack.js'
import { STACK } from '../data/stack.js'
import { GITHUB } from '../lib/site.js'
import './About.css'

const age = new Date().getFullYear() - 2002

const FACTS = [
  { Icon: GraduationCap, text: '電気通信大学 大学院 情報学専攻 / 修士 2 年' },
  { Icon: Calendar, text: `今年で ${age} 歳` },
  { Icon: MapPin, text: '京都府生まれ 静岡県育ち' },
  { Icon: Home, text: '東京都在住' },
]

/* 盤面では絵文字を使わないため、線のアイコンに置き換えている */
const INTERESTS = [
  { Icon: Gamepad2, label: 'ゲーム' },
  { Icon: Wrench, label: '個人開発' },
]

/* 写真は未投入。枠だけ先に据えて、入ったときに面が動かないようにしておく */
function PhotoSlot() {
  return (
    <figure className="ab-shot">
      <div className="ab-shot-body">
        <Camera size={18} strokeWidth={1.5} aria-hidden="true" />
      </div>
      <figcaption>Photo placeholder</figcaption>
    </figure>
  )
}

export default function About() {
  return (
    <PageFrame
      current="about"
      tag="About"
      title="Kos.N"
      meta="he / him"
      lead="Building things with code and curiosity."
      railText="ABOUT — KOS.N — 2026"
      figure={
        <figure className="id-plate">
          <img src="/images/avatar.png" alt="" />
        </figure>
      }
    >
      <div className="p-row p-row--split">
        <HLine />

        <Module tag="Bio" meta="profile" order={1}>
          <p className="ab-bio">
            ゲームと個人開発が趣味です。デザインの定量評価に関する研究をしており、
            その前は数年間生物分野にてタンパク質をこねこねしていました。
            このサイトはモチベーションに応じて日々更新中。
          </p>

          <ul className="ab-facts">
            {FACTS.map(({ Icon, text }) => (
              <li key={text}>
                <span className="fact-mark">
                  <Icon size={12} strokeWidth={1.8} />
                </span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </Module>

        <Module tag="Photo" meta="pending" className="ab-photo" order={2}>
          <PhotoSlot />
        </Module>
      </div>

      <div className="p-row">
        <HLine />

        <Module tag="Skills" meta={`${STACK_COUNT} items`} order={3}>
          <div className="sk-groups">
            {STACK.map(g => (
              <div className="sk-group" key={g.key}>
                <span className="sk-group-name">{g.title}</span>
                <ul className="sk-items">
                  {g.items.map(item => (
                    <li className="sk-item" key={item.name} style={{ '--brand': brandColor(item) }}>
                      <span className="sk-mark">
                        <StackIcon item={item} size={15} />
                      </span>
                      <span className="sk-name">{item.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <a
            className="more"
            href={GITHUB}
            target="_blank"
            rel="noopener noreferrer"
          >
            詳細(GitHub)
            <ExternalLink size={14} />
          </a>
        </Module>
      </div>

      <div className="p-row p-row--half">
        <HLine />

        <Module tag="Interests" meta={`${INTERESTS.length} items`} order={4}>
          <ul className="int-list">
            {INTERESTS.map(({ Icon, label }) => (
              <li key={label}>
                <span className="fact-mark">
                  <Icon size={12} strokeWidth={1.8} />
                </span>
                <span>{label}</span>
              </li>
            ))}
          </ul>
          <PhotoSlot />
        </Module>

        <Module tag="Contact" meta="pending" order={5}>
          <ul className="ct-list">
            <li>
              <span className="fact-mark">
                <Mail size={12} strokeWidth={1.8} />
              </span>
              <span className="ct-pending">（準備中...）</span>
            </li>
          </ul>
          <p className="readout">pending</p>
        </Module>
      </div>
    </PageFrame>
  )
}
