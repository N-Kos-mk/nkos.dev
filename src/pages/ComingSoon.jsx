import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import './ComingSoon.css'

export default function ComingSoon({ label }) {
  return (
    <div className="cs-wrapper">
      <div className="bg-orbs" aria-hidden="true">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
      </div>
      <main className="cs-content">
        <p className="cs-eyebrow">Coming Soon</p>
        <h1 className="cs-title">{label}</h1>
        <p className="cs-sub">This page is under construction.</p>
        <Link to="/" className="cs-back">
          <ArrowLeft size={16} />
          Back to home
        </Link>
      </main>
    </div>
  )
}
