/* content 配下のディレクトリ走査の結果を、日付の降順に並べた一覧に整える。
   import.meta.glob はリテラルのパスを要求するため、走査そのものは
   呼び出し側（blog.js / works.js）に置き、ここでは整形だけを受け持つ */
export function buildCollection(modules, covers) {
  return Object.entries(modules)
    .map(([path, mod]) => {
      const dir = path.split('/').at(-2)
      const slug = dir.replace(/^\d{4}-\d{2}-\d{2}_/, '')
      const cover = Object.entries(covers).find(([p]) => p.includes(`/${dir}/`))?.[1] ?? null
      return {
        slug,
        ...mod.frontmatter,
        thumbnail: cover,
        Component: mod.default,
      }
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}
