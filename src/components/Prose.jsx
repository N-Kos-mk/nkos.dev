import './Prose.css'

/* MDX の本文を包む面。記事と制作物で共用する */
export default function Prose({ children }) {
  return <article className="prose">{children}</article>
}
