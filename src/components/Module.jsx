import { VLine } from './Rule.jsx'

/* 盤面の基本単位。左端の縦罫と、真鍮のモジュール名＋右肩のメタ情報を持つ。
   order は立ち上がりの時間割に使う添え字 */
export default function Module({ tag, meta, className = '', order = 0, children }) {
  return (
    <section className={`mod ${className}`} style={{ '--i': order }}>
      <VLine />
      <header className="mod-head">
        <span className="mod-tag">{tag}</span>
        {meta && <span className="mod-meta">{meta}</span>}
      </header>
      {children}
    </section>
  )
}
