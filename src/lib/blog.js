const modules = import.meta.glob('../content/blog/*/index.mdx', { eager: true })
const covers  = import.meta.glob('../content/blog/*/cover.*',   { eager: true, import: 'default' })

export const posts = Object.entries(modules)
  .map(([path, mod]) => {
    const dir  = path.split('/').at(-2)
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

export function getPost(slug) {
  return posts.find(p => p.slug === slug) ?? null
}
