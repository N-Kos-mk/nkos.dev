import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowDown, ExternalLink } from 'lucide-react'
import About from './pages/About.jsx'
import './App.css'

function HubCard({ link, index }) {
  const style = { '--delay': `${index * 80}ms` }
  const icon = link.external
    ? <ExternalLink size={18} className="hub-card-icon" />
    : link.iconDown
    ? <ArrowDown size={18} className="hub-card-icon" />
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

  const cls = `hub-card${link.variant ? ` hub-card--${link.variant}` : ''}`

  if (link.external) {
    return (
      <a href={link.href} className={cls} style={style} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    )
  }
  if (link.onClick) {
    return (
      <button className={cls} style={style} onClick={link.onClick}>
        {inner}
      </button>
    )
  }
  return (
    <Link to={link.to} className={cls} style={style}>
      {inner}
    </Link>
  )
}

function App() {
  const [aboutOpen, setAboutOpen] = useState(window.location.pathname === '/about')

  const openAbout = () => {
    setAboutOpen(true)
    window.history.pushState(null, '', '/about')
  }

  const closeAbout = () => {
    setAboutOpen(false)
    window.history.pushState(null, '', '/')
  }

  useEffect(() => {
    const onPop = () => {
      setAboutOpen(window.location.pathname === '/about')
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const LINKS = [
    { label: 'About Me', onClick: openAbout, description: 'Who I am', iconDown: true, variant: 'about' },
    { label: 'Blog',     to: '/blog',         description: 'Thoughts & notes' },
    { label: 'Works',    to: '/works',         description: 'Creative works' },
    { label: 'GitHub',   href: 'https://github.com/n-kos-mk', description: 'Open source', external: true, variant: 'github' },
  ]

  return (
    <>
      <div className={`wrapper${aboutOpen ? ' wrapper--about-open' : ''}`}>
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
              <span className="title-accent">
                <span className="title-dot-wrap">
                  <Link to="/troll" className="title-dot">.</Link>
                </span>
                dev
              </span>
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

      <About isOpen={aboutOpen} onClose={closeAbout} />
    </>
  )
}

export default App
