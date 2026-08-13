import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import RotationSushi from '../components/RotationSushi.jsx'
import './ComingSoon.css'

export default function ComingSoon({ label }) {
  return (
    <div className="old-cs-wrapper">
      <div className="bg-orbs" aria-hidden="true">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
      </div>
      <main className="old-cs-content">
        <p className="old-cs-eyebrow">Coming Soon</p>
        <h1 className="old-cs-title">{label}</h1>
        <p className="old-cs-sub">This page is under construction.</p>
        <div className="old-cs-sushi-wrap">
          <RotationSushi size="4rem" />
          <p className="old-cs-sushi-caption">This is rotation sushi.</p>
        </div>
        <Link to="/" className="old-cs-back">
          <ArrowLeft size={16} />
          Back to home
        </Link>
      </main>
    </div>
  )
}
