import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, ArrowUpRight, ImageOff } from 'lucide-react'
import { posts } from './lib/blog.js'
import { fmtDate } from './lib/site.js'
import { STACK_FLAT, brandColor } from './lib/stack.js'
import { featured } from './lib/works.js'
import { STACK } from './data/stack.js'
import { ID_FACTS } from './data/profile.js'
import { PHOTOS } from './data/photos.js'
import Module from './components/Module.jsx'
import EntryItem from './components/EntryItem.jsx'
import StackIcon from './components/StackIcon.jsx'
import IndexNav from './components/IndexNav.jsx'
import { HLine } from './components/Rule.jsx'
import './App.css'

/* 旧デザインのページ側は old- 接頭辞で隔離してあるため、こちらは接頭辞なし */

/* 送りを右方向のまま一周させるため、末尾に先頭の複製を 1 枚足す。
   最後まで送ったら複製の上で遷移を切り、先頭へ黙って戻す */
const REEL = featured.length > 0 ? [...featured, featured[0]] : []

/* 決定的なゆらぎ。index から生成するので、再描画しても値は変わらない。
   乱数だと状態が更新されるたびに配置が飛ぶ */
const jitter = (seed, range) => {
  const x = Math.sin((seed + 1) * 127.1) * 43758.5453
  return (x - Math.floor(x) - 0.5) * range
}

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v))

/* 並べも送りもせず、面のなかに散らして漂わせる。
   粗い格子を下敷きにして各点をずらすが、格子をそのまま使うと
   ずらし幅が間隔より小さく、列が透けて整列して見える。
   奇数行を半セル横にずらして列を噛み合わせ、ずらし幅も広く取る */
const FLOAT_COLS = 4
const FLOAT_ROWS = Math.ceil(STACK_FLAT.length / FLOAT_COLS)
/* 半セルずらした分だけ横幅を広げ、右端がはみ出さないようにする */
const FLOAT_SPAN = FLOAT_COLS + 0.5

/* 配置そのものは固定の枠として持ち、どのアイコンがどの枠に入るかだけを
   表示のたびに入れ替える。枠を作り直すと散らばり具合が毎回変わってしまう */
const FLOAT_SLOTS = STACK_FLAT.map((_, i) => {
  const col = i % FLOAT_COLS
  const row = Math.floor(i / FLOAT_COLS)
  const stagger = row % 2 ? 0.5 : 0
  return {
    x: clamp(((col + 0.5 + stagger + jitter(i, 0.72)) / FLOAT_SPAN) * 100, 9, 91),
    y: clamp(((row + 0.5 + jitter(i + 31, 0.68)) / FLOAT_ROWS) * 100, 7, 93),
    size: 17 + Math.abs(jitter(i + 7, 8)),
    dur: 7 + Math.abs(jitter(i + 13, 7)),
    delay: -Math.abs(jitter(i + 19, 12)),
    /* 漂う振れ幅も個体差をつける。同じ軌跡だと群れとして揃って見える */
    amp: 0.6 + Math.abs(jitter(i + 53, 1.3)),
    rev: i % 2 === 0,
  }
})

/* 表示のたびに並び順を入れ替える。マウント時に一度だけ実行し、
   以降の再描画では固定する。描画のたびに引き直すと、ホバーなどで
   状態が変わるたびにアイコンが枠を飛び移ってしまう */
const shuffleFloats = () => {
  const items = [...STACK_FLAT]
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[items[i], items[j]] = [items[j], items[i]]
  }
  return items.map((item, i) => ({ ...item, ...FLOAT_SLOTS[i] }))
}

function App() {
  const [shot, setShot] = useState(0)
  const [slide, setSlide] = useState(0)
  const [snapReel, setSnapReel] = useState(false)
  const [holdReel, setHoldReel] = useState(false)
  const [hoverCat, setHoverCat] = useState(null)
  const [pinCat, setPinCat] = useState(null)
  const [hoverItem, setHoverItem] = useState(null)
  const [floats] = useState(shuffleFloats)
  const activeCat = hoverCat ?? pinCat

  useEffect(() => {
    const id = setInterval(() => setShot(i => (i + 1) % PHOTOS.length), 4600)
    return () => clearInterval(id)
  }, [])

  /* 制作物の送り。Gallery と同期して見えないよう間隔をずらしてある。
     指している間は止める。コマが替わった先を誤って押さないため。
     複製の位置（= featured.length）まで進めてよく、戻しは遷移の終わりで行う */
  useEffect(() => {
    if (holdReel || featured.length < 2) return
    /* 複製に着いた時点で戻しが走っているのが通常。上限で丸めているのは、
       遷移が潰される環境で戻しが働かなかったときに空へ送らないための保険 */
    const id = setInterval(() => setSlide(i => (i >= featured.length ? 0 : i + 1)), 5200)
    return () => clearInterval(id)
  }, [holdReel])

  /* 複製に着いたら、遷移を切ってから先頭へ飛ばす。
     切り替えを 2 フレーム待つのは、位置の書き換えが遷移として拾われないようにするため */
  useEffect(() => {
    if (!snapReel) return
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setSnapReel(false)))
    return () => cancelAnimationFrame(id)
  }, [snapReel])

  const latest = posts.slice(0, 2)

  /* 複製の上に居るときは、実体としては先頭を指している */
  const active = featured.length > 0 ? slide % featured.length : 0

  /* 送り切ったところで遷移を切り、先頭へ黙って戻す。これで送りは常に右方向のまま。
     子の transition（画像のフィルタなど）が上がってくるので、帯自身の位置変化だけを拾う */
  const endReel = e => {
    if (e.target !== e.currentTarget || e.propertyName !== 'transform') return
    if (slide !== featured.length) return
    setSnapReel(true)
    setSlide(0)
  }

  /* アイコンだけでは名前が読めないため、指したものを下段に表示する */
  const readout =
    hoverItem ??
    (activeCat ? STACK.find(g => g.key === activeCat).label : `${STACK_FLAT.length} items`)

  return (
    <main className="board-main">
        <div className="row row--a">
          <HLine />

          {/* ── IDENTITY ── */}
          <Module tag="Identity" meta="he / him" className="id" order={0}>
            <div className="id-inner">
              <div className="id-body">
                <h1 className="id-name">Kos.N</h1>
                <p className="id-domain">
                  nkos
                  <Link className="id-dot" to="/troll">
                    .
                  </Link>
                  dev
                </p>
              </div>
              <figure className="id-plate">
                <img src="/images/avatar.png" alt="" />
              </figure>
            </div>

            {/* 面の下端に敷く注記帯。アイコンは枠に収めて盤面の言語に合わせる */}
            <ul className="id-facts">
              {ID_FACTS.map(({ Icon, text }) => (
                <li key={text}>
                  <span className="fact-mark">
                    <Icon size={12} strokeWidth={1.8} />
                  </span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </Module>

          {/* ── GALLERY ── */}
          <Module
            tag="Gallery"
            meta={`${shot + 1} / ${PHOTOS.length}`}
            className="gallery"
            order={1}
          >
            <figure className="shots">
              {PHOTOS.map((p, i) => (
                <img
                  key={`${p.src}-${i}`}
                  src={p.src}
                  alt=""
                  style={{ objectPosition: p.pos }}
                  data-on={i === shot || undefined}
                />
              ))}
              <figcaption className="shot-cap">
                <MapPin size={13} strokeWidth={1.8} />
                <span>{PHOTOS[shot].place}</span>
                {PHOTOS[shot].note && <span className="shot-note">{PHOTOS[shot].note}</span>}
              </figcaption>
            </figure>

            <div className="shot-ticks">
              {PHOTOS.map((p, i) => (
                <button
                  key={`tick-${i}`}
                  type="button"
                  className="tick"
                  data-on={i === shot || undefined}
                  aria-label={`${i + 1} 枚目 — ${p.place}`}
                  onClick={() => setShot(i)}
                />
              ))}
            </div>
          </Module>
        </div>

        <div className="row row--b">
          <HLine />

          {/* ── STACK ── */}
          <Module tag="Stack" meta={`${STACK.length} groups`} className="stack" order={2}>
            <div className="cats">
              {STACK.map(g => (
                <button
                  key={g.key}
                  type="button"
                  className="cat"
                  data-on={activeCat === g.key || undefined}
                  aria-pressed={pinCat === g.key}
                  onMouseEnter={() => setHoverCat(g.key)}
                  onMouseLeave={() => setHoverCat(null)}
                  onFocus={() => setHoverCat(g.key)}
                  onBlur={() => setHoverCat(null)}
                  onClick={() => setPinCat(p => (p === g.key ? null : g.key))}
                >
                  {g.label}
                  <span className="cat-n">{g.items.length}</span>
                </button>
              ))}
            </div>

            {/* 面のなかを漂う。ホバーで全体が止まるので、動いていても選べる */}
            <ul className="icon-field">
              {floats.map(item => (
                <li
                  key={item.name}
                  className="icon"
                  style={{
                    '--brand': brandColor(item),
                    '--x': `${item.x.toFixed(2)}%`,
                    '--y': `${item.y.toFixed(2)}%`,
                    '--sz': `${item.size.toFixed(1)}px`,
                    '--dur': `${item.dur.toFixed(2)}s`,
                    '--delay': `${item.delay.toFixed(2)}s`,
                    '--amp': item.amp.toFixed(2),
                  }}
                  data-rev={item.rev || undefined}
                  data-state={activeCat ? (activeCat === item.key ? 'on' : 'off') : undefined}
                  onMouseEnter={() => setHoverItem(item.name)}
                  onMouseLeave={() => setHoverItem(null)}
                >
                  <StackIcon item={item} />
                  <span className="sr-only">{item.name}</span>
                </li>
              ))}
            </ul>

            <p className="readout">{readout}</p>
          </Module>

          {/* ── WORKS ── */}
          <Module
            tag="Featured"
            meta={featured.length > 0 ? `${active + 1} / ${featured.length}` : undefined}
            className="works"
            order={3}
          >
            {featured.length > 0 ? (
              <>
                {/* 表紙を 1 コマずつ横に送る。指している間は送りを止める */}
                <div
                  className="reel"
                  onMouseEnter={() => setHoldReel(true)}
                  onMouseLeave={() => setHoldReel(false)}
                >
                  <ul
                    className="reel-track"
                    style={{ '--slide': slide }}
                    data-snap={snapReel || undefined}
                    onTransitionEnd={endReel}
                  >
                    {REEL.map((w, i) => {
                      const shown = i === slide
                      return (
                        <li
                          className="reel-slide"
                          key={`${w.slug}-${i}`}
                          aria-hidden={!shown || undefined}
                        >
                          <Link
                            className="reel-link"
                            to={`/works/${w.slug}`}
                            tabIndex={shown && i < featured.length ? undefined : -1}
                          >
                            {w.thumbnail ? (
                              <img src={w.thumbnail} alt="" />
                            ) : (
                              <span className="reel-blank">
                                <ImageOff size={18} strokeWidth={1.5} aria-hidden="true" />
                              </span>
                            )}
                            <span className="reel-cap">{w.title}</span>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>

                <div className="reel-ticks">
                  {featured.map((w, i) => (
                    <button
                      key={`tick-${w.slug}`}
                      type="button"
                      className="tick"
                      data-on={i === active || undefined}
                      aria-label={`${i + 1} 件目 — ${w.title}`}
                      onClick={() => setSlide(i)}
                    />
                  ))}
                </div>
              </>
            ) : (
              <p className="empty">まだ制作物はありません</p>
            )}
          </Module>

          {/* ── LOG ── */}
          <Module
            tag="Log"
            meta={`${posts.length} ${posts.length === 1 ? 'entry' : 'entries'}`}
            className="log"
            order={4}
          >
            {latest.length > 0 ? (
              <ul className="entries">
                {latest.map(p => (
                  <li key={p.slug}>
                    <EntryItem
                      to={`/blog/${p.slug}`}
                      stamp={fmtDate(p.date)}
                      title={p.title}
                      text={p.excerpt}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty">まだ記事はありません</p>
            )}

            <Link className="more" to="/blog">
              全ての記事を見る
              <ArrowUpRight size={15} />
            </Link>
          </Module>
        </div>

      {/* ── INDEX ── */}
      <IndexNav />
    </main>
  )
}

export default App
