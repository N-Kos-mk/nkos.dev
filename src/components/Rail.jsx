import { useEffect, useState } from 'react'
import { tokyoTime, tokyoYear } from '../lib/site.js'
import { VLine } from './Rule.jsx'

/* 左端の銘板。盤面の縁を締める幅 46px の柱で、上に東京時刻、下に固定テキストを縦組みで置く。
   ページを移っても作り直さない。区画の呼び名だけが、畳まれて下へ送られ、
   次の呼び名が下から生えてくる */
export default function Rail({ label }) {
  const [now, setNow] = useState(() => ({ clock: tokyoTime(), year: tokyoYear() }))
  const [shown, setShown] = useState(label)
  /* 一度でも入れ替えたか。初回だけは落下で登場させたいので区別している */
  const [swapped, setSwapped] = useState(false)

  useEffect(() => {
    const id = setInterval(() => setNow({ clock: tokyoTime(), year: tokyoYear() }), 1000)
    return () => clearInterval(id)
  }, [])

  /* idle = 初回の落下、out = 畳んで下へ、in = 下から生える。
     表示中の呼び名と行き先の呼び名の食い違いがそのまま out にあたるため、
     状態として持たずに描画のたびに導く */
  const phase = label !== shown ? 'out' : swapped ? 'in' : 'idle'

  /* 呼び名を畳み終えたところで差し替え、下から生やす。
     畳みは 2 つの性質を動かしているので 2 回上がってくるが、
     1 回目で phase が変わるため 2 回目は素通りする */
  const onEnd = e => {
    if (phase !== 'out' || !e.target.classList?.contains('rail-label')) return
    setShown(label)
    setSwapped(true)
  }

  return (
    <aside className="rail" aria-hidden="true">
      <VLine />
      <span className="rail-clock">{now.clock}</span>
      <span className="rail-text" data-phase={phase} onTransitionEnd={onEnd}>
        <span className="rail-label">
          <span className="rail-label-in">{shown}</span>
        </span>
        <span className="rail-rest">— KOS.N — {now.year}</span>
      </span>
    </aside>
  )
}
