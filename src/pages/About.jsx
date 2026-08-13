import { ArrowLeft, Mail, ExternalLink, GraduationCap, Calendar, MapPin, Home, Code2, AppWindow, Bot } from 'lucide-react'
import {
  siHtml5, siCss, siJavascript, siTypescript, siPython, siPhp,
  siReact, siVite, siNodedotjs, siFastapi,
  siMysql, siPostgresql, siSqlite,
  siGit, siGithub, siLinux, siCloudflare, siCloudflareworkers, siVercel,
} from 'simple-icons/icons'
import './About.css'

const age = new Date().getFullYear() - 2002

const FACTS = [
  { Icon: GraduationCap, text: '電気通信大学 大学院 情報学専攻 / 修士 2 年' },
  { Icon: Calendar,      text: `今年で ${age} 歳` },
  { Icon: MapPin,        text: '京都府生まれ 静岡県育ち' },
  { Icon: Home,          text: '東京都在住' },
]

// GitHub のブランドカラーはダーク背景で視認しづらいため、代わりに --old-text-h で描画する
const DARK_ICON_SLUGS = new Set(['github', 'vercel'])

function SkillIcon({ item, size = 16 }) {
  if (item.Icon) {
    const { Icon } = item
    return <Icon size={size} color="var(--old-text-h)" strokeWidth={1.8} style={{ flexShrink: 0 }} />
  }
  const { icon } = item
  const color = DARK_ICON_SLUGS.has(icon.slug) ? 'var(--old-text-h)' : `#${icon.hex}`
  return (
    <svg role="img" viewBox="0 0 24 24" width={size} height={size} fill={color} style={{ flexShrink: 0 }}>
      <path d={icon.path} />
    </svg>
  )
}

const SKILL_GROUPS = [
  {
    title: '言語',
    items: [
      { name: 'HTML', icon: siHtml5 },
      { name: 'CSS', icon: siCss },
      { name: 'JavaScript', icon: siJavascript },
      { name: 'TypeScript', icon: siTypescript },
      { name: 'Python', icon: siPython },
      { name: 'PHP', icon: siPhp },
    ],
  },
  {
    title: 'フレームワーク・ライブラリ',
    items: [
      { name: 'React', icon: siReact },
      { name: 'Vite', icon: siVite },
      { name: 'Node.js', icon: siNodedotjs },
      { name: 'FastAPI', icon: siFastapi },
    ],
  },
  {
    title: 'データベース',
    items: [
      { name: 'MySQL', icon: siMysql },
      { name: 'PostgreSQL', icon: siPostgresql },
      { name: 'SQLite', icon: siSqlite },
    ],
  },
  {
    title: 'インフラ・ツール',
    items: [
      { name: 'Git', icon: siGit },
      { name: 'GitHub', icon: siGithub },
      { name: 'VS Code', Icon: Code2 },
      { name: 'Linux', icon: siLinux },
      { name: 'Windows', Icon: AppWindow },
      { name: 'Cloudflare', icon: siCloudflare },
      { name: 'Workers', icon: siCloudflareworkers },
      { name: 'Vercel', icon: siVercel },
    ],
  },
]

const INTERESTS = [
  { icon: '🎮', label: 'ゲーム' },
  { icon: '🛠️', label: '個人開発' },
]

export default function About({ isOpen, onClose }) {
  return (
    <div className={`old-about-panel${isOpen ? ' old-about-panel--open' : ''}`}>

      {/* sticky topbar */}
      <div className="old-about-topbar">
        <button className="old-about-back" onClick={onClose}>
          <ArrowLeft size={16} />
          Back to home
        </button>
      </div>

      <article className="old-about-content">

        {/* Hero */}
        <section className="old-about-hero">
          <img src="/images/avatar.png" alt="avatar" className="old-about-avatar" />
          <h1 className="old-about-name">Kos.N</h1>
          <p className="old-about-role">he / him</p>
          <p className="old-about-tagline">Building things with code and curiosity.</p>
        </section>

        {/* Bio */}
        <section className="old-about-section">
          <h2 className="old-about-section-title">Bio</h2>
          <p className="old-about-bio">
            ゲームと個人開発が趣味です。デザインの定量評価に関する研究をしており、
            その前は数年間生物分野にてタンパク質をこねこねしていました。
            このサイトはモチベーションに応じて日々更新中。
          </p>
          <ul className="old-about-facts">
            {FACTS.map(({ Icon, text }) => (
              <li key={text}>
                <Icon size={15} className="old-fact-icon" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
          <div className="old-dummy-photo"><span>📷 Photo placeholder</span></div>
        </section>

        {/* Skills */}
        <section className="old-about-section">
          <h2 className="old-about-section-title">Skills</h2>

          {SKILL_GROUPS.map(group => (
            <div key={group.title} className="old-skill-block">
              <h3 className="old-skill-block-title">{group.title}</h3>
              <div className="old-skill-chips">
                {group.items.map(item => (
                  <span key={item.name} className="old-skill-chip">
                    <SkillIcon item={item} />
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          ))}

          <a
            href="https://github.com/N-Kos-mk"
            target="_blank"
            rel="noopener noreferrer"
            className="old-skill-more-link"
          >
            詳細(GitHub)
            <ExternalLink size={14} />
          </a>
        </section>

        {/* Interests */}
        <section className="old-about-section">
          <h2 className="old-about-section-title">趣味・興味</h2>
          <div className="old-interests-grid">
            {INTERESTS.map(item => (
              <div key={item.label} className="old-interest-item">
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
          <div className="old-dummy-photo"><span>📷 Photo placeholder</span></div>
        </section>

        {/* Works — 非表示（コンテンツ追加後に解除） */}
        {/* <section className="old-about-section">
          <h2 className="old-about-section-title">Works</h2>
        </section> */}

        {/* Contact */}
        <section className="old-about-section">
          <h2 className="old-about-section-title">Contact</h2>
          <ul className="old-contact-list">
            <li>
              <Mail size={16} />
              <span className="old-contact-pending">（準備中...）</span>
            </li>
            {/*<li>
              <ExternalLink size={16} />
              <a href="https://github.com/N-Kos-mk" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </li>*/}
          </ul>
        </section>

      </article>
    </div>
  )
}
