import { useState } from 'react'
import './RotationSushi.css'

export default function RotationSushi({ size = '1.6rem', initialDuration = 1.8 }) {
  const [duration, setDuration] = useState(initialDuration)
  return (
    <span
      className="rotation-sushi"
      style={{ fontSize: size, animationDuration: `${duration}s` }}
      onClick={() => setDuration(d => d / 1.5)}
    >🍣</span>
  )
}
