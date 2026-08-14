import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Troll.css'

export default function Troll() {
  const [clicked, setClicked] = useState(false)
  const btnRef = useRef(null)
  const posRef = useRef({
    x: window.innerWidth / 2 - 70,
    y: window.innerHeight / 2 - 22,
  })
  const mouseRef = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    if (clicked) return

    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMouseMove)

    let raf
    const tick = () => {
      const btn = btnRef.current
      if (!btn) { raf = requestAnimationFrame(tick); return }

      const btnW = btn.offsetWidth
      const btnH = btn.offsetHeight
      const W = window.innerWidth
      const H = window.innerHeight
      const { x: px, y: py } = posRef.current
      const { x: mx, y: my } = mouseRef.current

      let fx = 0
      let fy = 0

      // カーソル反発（近づくほど強くなる二乗カーブ）
      const dx = mx - (px + btnW / 2)
      const dy = my - (py + btnH / 2)
      const dist = Math.sqrt(dx * dx + dy * dy)
      const threshold = 200
      if (dist < threshold && dist > 0) {
        const t = 1 - dist / threshold
        const force = t * t * 100
        fx -= (dx / dist) * force
        fy -= (dy / dist) * force
        if (dist < 80) {
          fx += (Math.random() - 0.5) * 30
          fy += (Math.random() - 0.5) * 30
        }
      }

      // 壁反発（常時。壁に近いほど強く押し返す）
      const wallMargin = 180
      const wallStr = 40
      const wPow = (v) => wallStr * Math.pow(v, 2)
      if (px < wallMargin)              fx += wPow(1 - px / wallMargin)
      if (px > W - btnW - wallMargin)   fx -= wPow(1 - (W - btnW - px) / wallMargin)
      if (py < wallMargin)              fy += wPow(1 - py / wallMargin)
      if (py > H - btnH - wallMargin)   fy -= wPow(1 - (H - btnH - py) / wallMargin)

      // カーソルが遠いとき中心に引き戻す
      if (dist > threshold) {
        fx += (W / 2 - btnW / 2 - px) * 0.03
        fy += (H / 2 - btnH / 2 - py) * 0.03
      }

      posRef.current = {
        x: Math.max(10, Math.min(W - btnW - 10, px + fx)),
        y: Math.max(10, Math.min(H - btnH - 10, py + fy)),
      }
      btn.style.left = posRef.current.x + 'px'
      btn.style.top  = posRef.current.y + 'px'

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(raf)
    }
  }, [clicked])

  if (clicked) {
    return (
      <div className="old-troll-result">
        <p className="old-result-emoji">🤡</p>
        <h1 className="old-result-title">なんもないよ</h1>
        <p className="old-result-sub">本当になんもないよ。<br />なんであのボタン頑張って押したの？</p>
        <Link to="/" className="old-result-home">nkos.devへ</Link>
      </div>
    )
  }

  return (
    <div className="old-troll-wrapper">
      <button
        ref={btnRef}
        className="old-rainbow-btn"
        style={{ left: posRef.current.x, top: posRef.current.y }}
        onClick={() => setClicked(true)}
      >
        すごいページへ
      </button>
    </div>
  )
}
