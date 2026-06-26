import { ArrowLeft, Mail, ExternalLink, GraduationCap, Calendar, MapPin, Home } from 'lucide-react'
import { siPython, siJavascript, siTypescript, siDart, siHtml5, siCss } from 'simple-icons/icons'
import './About.css'

const age = new Date().getFullYear() - 2002

const FACTS = [
  { Icon: GraduationCap, text: '電気通信大学 大学院 情報学専攻 / 修士 2 年' },
  { Icon: Calendar,      text: `今年で ${age} 歳` },
  { Icon: MapPin,        text: '京都府生まれ 静岡県育ち' },
  { Icon: Home,          text: '東京都在住' },
]

function SiIcon({ icon, color, size = 18 }) {
  return (
    <svg role="img" viewBox="0 0 24 24" width={size} height={size} fill={`#${icon.hex}`} style={{ flexShrink: 0 }}>
      <path d={icon.path} />
    </svg>
  )
}

const LANGUAGES = [
  {
    name: 'Python',
    icons: [{ icon: siPython }],
    comment: '一番よく使ってた。10 年以上の相棒だけど最近は AI に全部書かせてる',
  },
  {
    name: 'JavaScript / TypeScript',
    icons: [{ icon: siJavascript }, { icon: siTypescript }],
    comment: '一番よく使う。最近は全部 AI に(ry',
  },
  {
    name: 'Dart',
    icons: [{ icon: siDart }],
    comment: '一番よく使いたい。最近勉強中',
  },
  {
    name: 'HTML / CSS',
    icons: [{ icon: siHtml5 }, { icon: siCss }],
    comment: '広く見れば一番よく使う',
  },
]

const FRAMEWORKS = ['React', 'Next.js', 'Flutter']

const INFRA = ['Cloudflare Workers', 'PostgreSQL', 'MySQL']

const ENV = ['VS Code', 'Git / GitHub', 'Windows', 'macOS', 'Linux']

const AI_TOOLS = ['Claude / Claude Code', 'Codex']

const INTERESTS = [
  { icon: '🎮', label: 'ゲーム' },
  { icon: '🛠️', label: '個人開発' },
]

export default function About({ isOpen, onClose }) {
  return (
    <div className={`about-panel${isOpen ? ' about-panel--open' : ''}`}>

      {/* sticky topbar */}
      <div className="about-topbar">
        <button className="about-back" onClick={onClose}>
          <ArrowLeft size={16} />
          Back to home
        </button>
      </div>

      <article className="about-content">

        {/* Hero */}
        <section className="about-hero">
          <img src="/images/avatar.png" alt="avatar" className="about-avatar" />
          <h1 className="about-name">Kos.N</h1>
          <p className="about-role">he / him</p>
          <p className="about-tagline">Building things with code and curiosity.</p>
        </section>

        {/* Bio */}
        <section className="about-section">
          <h2 className="about-section-title">Bio</h2>
          <p className="about-bio">
            ゲームと個人開発が趣味です。デザインの定量評価に関する研究をしており、
            その前は数年間生物分野にてタンパク質をこねこねしていました。
            このサイトはモチベーションに応じて日々更新中。
          </p>
          <ul className="about-facts">
            {FACTS.map(({ Icon, text }) => (
              <li key={text}>
                <Icon size={15} className="fact-icon" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
          <div className="dummy-photo"><span>📷 Photo placeholder</span></div>
        </section>

        {/* Skills */}
        <section className="about-section">
          <h2 className="about-section-title">Skills</h2>

          <div className="skill-block">
            <h3 className="skill-block-title">言語</h3>
            <ul className="lang-list">
              {LANGUAGES.map(lang => (
                <li key={lang.name} className="lang-item">
                  <div className="lang-icons">
                    {lang.icons.map(({ icon }) => (
                      <SiIcon key={icon.slug} icon={icon} size={18} />
                    ))}
                  </div>
                  <span className="lang-name">{lang.name}</span>
                  <span className="lang-comment">{lang.comment}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="skill-block">
            <h3 className="skill-block-title">フレームワーク</h3>
            <div className="skill-tags">
              {FRAMEWORKS.map(f => <span key={f} className="skill-tag">{f}</span>)}
            </div>
          </div>

          <div className="skill-block">
            <h3 className="skill-block-title">インフラ・DB</h3>
            <div className="skill-tags">
              {INFRA.map(s => <span key={s} className="skill-tag">{s}</span>)}
            </div>
          </div>

          <div className="skill-block">
            <h3 className="skill-block-title">開発環境</h3>
            <div className="skill-tags">
              {ENV.map(e => <span key={e} className="skill-tag">{e}</span>)}
            </div>
          </div>

          <div className="skill-block">
            <h3 className="skill-block-title">AI ツール</h3>
            <div className="skill-tags">
              {AI_TOOLS.map(a => <span key={a} className="skill-tag">{a}</span>)}
            </div>
          </div>
        </section>

        {/* Interests */}
        <section className="about-section">
          <h2 className="about-section-title">趣味・興味</h2>
          <div className="interests-grid">
            {INTERESTS.map(item => (
              <div key={item.label} className="interest-item">
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
          <div className="dummy-photo"><span>📷 Photo placeholder</span></div>
        </section>

        {/* Works — 非表示（コンテンツ追加後に解除） */}
        {/* <section className="about-section">
          <h2 className="about-section-title">Works</h2>
        </section> */}

        {/* Contact */}
        <section className="about-section">
          <h2 className="about-section-title">Contact</h2>
          <ul className="contact-list">
            <li>
              <Mail size={16} />
              <span className="contact-pending">（準備中...）</span>
            </li>
            <li>
              <ExternalLink size={16} />
              <a href="https://github.com/N-Kos-mk" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </li>
          </ul>
        </section>

      </article>
    </div>
  )
}
