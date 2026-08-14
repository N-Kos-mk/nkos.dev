import { buildCollection } from './collection.js'

const modules = import.meta.glob('../content/blog/*/index.mdx', { eager: true })
const covers = import.meta.glob('../content/blog/*/cover.*', { eager: true, import: 'default' })

export const posts = buildCollection(modules, covers)

export function getPost(slug) {
  return posts.find(p => p.slug === slug) ?? null
}
