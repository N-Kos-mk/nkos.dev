import { useEffect, useState } from 'react'
import { tokyoTime } from '../lib/site.js'
import { VLine } from './Rule.jsx'

/* 左端の銘板。盤面の縁を締める幅 46px の柱で、上に東京時刻、下に固定テキストを縦組みで置く */
export default function Rail({ text }) {
  const [clock, setClock] = useState(tokyoTime)

  useEffect(() => {
    const id = setInterval(() => setClock(tokyoTime()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <aside className="rail" aria-hidden="true">
      <VLine />
      <span className="rail-clock">{clock}</span>
      <span className="rail-text">{text}</span>
    </aside>
  )
}
