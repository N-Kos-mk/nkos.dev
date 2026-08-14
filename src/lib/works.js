import { buildCollection } from './collection.js'
import { FEATURED_WORKS, FEATURED_FALLBACK } from '../data/featured.js'

/* ブログとまったく同じ仕組み。走査先のディレクトリだけが違う */
const modules = import.meta.glob('../content/works/*/index.mdx', { eager: true })
const covers = import.meta.glob('../content/works/*/cover.*', { eager: true, import: 'default' })

export const works = buildCollection(modules, covers)

export function getWork(slug) {
  return works.find(w => w.slug === slug) ?? null
}

/* 並び順にそのまま振る通し番号。制作物は台帳として数えられた方が読める */
export const serial = i => String(i + 1).padStart(2, '0')

/* トップページの送りに出す分。選抜が空なら新しい順に拾う。
   選抜に書かれていても実体がなければ黙って飛ばす */
export const featured = FEATURED_WORKS.length
  ? FEATURED_WORKS.map(slug => getWork(slug)).filter(Boolean)
  : works.slice(0, FEATURED_FALLBACK)
