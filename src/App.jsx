import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink } from 'lucide-react'
import './App.css'

const LINKS = [
  { label: 'Projects', to: '/projects', description: 'Things I built' },
  { label: 'Blog', to: '/blog', description: 'Thoughts & notes' },
  { label: 'Works', to: '/works', description: 'Creative works' },
  { label: 'GitHub', href: 'https://github.com/n-kos-mk', description: 'Open source', external: true },
]

function HubCard({ link, index }) {
  const style = { '--delay': `${index * 80}ms` }
  const icon = link.external
    ? <ExternalLink size={18} className="hub-card-icon" />
    : <ArrowRight size={18} className="hub-card-icon" />

  const inner = (
    <>
      <div className="hub-card-header">
        <span className="hub-card-label">{link.label}</span>
        {icon}
      </div>
      <span className="hub-card-desc">{link.description}</span>
    </>
  )

  if (link.external) {
    return (
      <a href={link.href} className="hub-card" style={style} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    )
  }
  return (
    <Link to={link.to} className="hub-card" style={style}>
      {inner}
    </Link>
  )
}

function App() {
  return (
    <div className="wrapper">
      <div className="bg-orbs" aria-hidden="true">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      <main className="hero">
        <div className="hero-content">
          <p className="eyebrow">Welcome</p>
          <h1 className="title">
            <span className="title-main">nkos</span>
            <span className="title-accent">.dev</span>
          </h1>
          <p className="subtitle">A space for things I make and think about.</p>
        </div>
      </main>

      <section className="hub">
        <div className="hub-grid">
          {LINKS.map((link, i) => (
            <HubCard key={link.label} link={link} index={i} />
          ))}
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 nkos.dev</p>
      </footer>
    </div>
  )
}

export default App
