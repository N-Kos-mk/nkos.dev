import { STACK } from '../data/stack.js'

/* 中身は src/data/stack.js にある。ここは表示側で使う導出だけを持つ */

/* ブランドカラーが黒に近く、暗い盤面で沈むアイコンは紙色で描く */
export const DARK_ICON_SLUGS = new Set(['github', 'vercel'])

export const STACK_FLAT = STACK.flatMap(g => g.items.map(item => ({ ...item, key: g.key })))

export const STACK_COUNT = STACK_FLAT.length

/* 既定は単色で、指したときだけ本来のブランド色にする。その色の取り出し口 */
export const brandColor = item =>
  item.icon && !DARK_ICON_SLUGS.has(item.icon.slug) ? `#${item.icon.hex}` : 'var(--paper)'
