/* 一覧を年月の目盛りに落とす。ブログと制作物で同じ仕組みを使う */

const parts = value => {
  const d = new Date(value)
  return Number.isNaN(d.getTime())
    ? null
    : { year: String(d.getFullYear()), month: String(d.getMonth() + 1).padStart(2, '0') }
}

/* 年 → 月の入れ子。年ごとの合計と、月ごとの本数を持つ */
export function buildArchive(items) {
  const years = new Map()
  items.forEach(item => {
    const t = parts(item.date)
    const year = t?.year ?? '—'
    if (!years.has(year)) years.set(year, { year, total: 0, months: new Map() })
    const entry = years.get(year)
    entry.total += 1
    if (t) entry.months.set(t.month, (entry.months.get(t.month) ?? 0) + 1)
  })
  return [...years.values()]
    .sort((a, b) => b.year.localeCompare(a.year))
    .map(y => ({
      ...y,
      months: [...y.months.entries()].sort((a, b) => b[0].localeCompare(a[0])),
    }))
}

/* 各月の先頭にあたる項目に印をつけ、そこへ飛べるようにする。
   一覧は日付の降順なので、月が切り替わった最初の 1 件がその月の先頭になる */
export function buildAnchors(items) {
  const seen = new Set()
  const map = new Map()
  items.forEach(item => {
    const t = parts(item.date)
    if (!t) return
    const key = `${t.year}-${t.month}`
    if (seen.has(key)) return
    seen.add(key)
    map.set(item.slug, `m-${key}`)
  })
  return map
}

export function jumpToMonth(key) {
  const el = document.getElementById(`m-${key}`)
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
}
