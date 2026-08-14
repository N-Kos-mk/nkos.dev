import { Code2, AppWindow } from 'lucide-react'
import {
  siHtml5, siCss, siJavascript, siTypescript, siPython, siPhp,
  siReact, siVite, siNodedotjs, siFastapi,
  siMysql, siPostgresql, siSqlite,
  siGit, siGithub, siLinux, siCloudflare, siCloudflareworkers, siVercel,
} from 'simple-icons/icons'

/* ブランドカラーが黒に近く、暗い盤面で沈むアイコンは紙色で描く */
export const DARK_ICON_SLUGS = new Set(['github', 'vercel'])

/* label = トップページのチップ用の短い表記、title = About ページの見出し用 */
export const STACK = [
  {
    key: 'lang',
    label: '言語',
    title: '言語',
    items: [
      { name: 'HTML', icon: siHtml5 },
      { name: 'CSS', icon: siCss },
      { name: 'JavaScript', icon: siJavascript },
      { name: 'TypeScript', icon: siTypescript },
      { name: 'Python', icon: siPython },
      { name: 'PHP', icon: siPhp },
    ],
  },
  {
    key: 'fw',
    label: 'フレームワーク',
    title: 'フレームワーク・ライブラリ',
    items: [
      { name: 'React', icon: siReact },
      { name: 'Vite', icon: siVite },
      { name: 'Node.js', icon: siNodedotjs },
      { name: 'FastAPI', icon: siFastapi },
    ],
  },
  {
    key: 'db',
    label: 'データベース',
    title: 'データベース',
    items: [
      { name: 'MySQL', icon: siMysql },
      { name: 'PostgreSQL', icon: siPostgresql },
      { name: 'SQLite', icon: siSqlite },
    ],
  },
  {
    key: 'infra',
    label: 'インフラ・ツール',
    title: 'インフラ・ツール',
    items: [
      { name: 'Git', icon: siGit },
      { name: 'GitHub', icon: siGithub },
      { name: 'VS Code', Icon: Code2 },
      { name: 'Linux', icon: siLinux },
      { name: 'Windows', Icon: AppWindow },
      { name: 'Cloudflare', icon: siCloudflare },
      { name: 'Workers', icon: siCloudflareworkers },
      { name: 'Vercel', icon: siVercel },
    ],
  },
]

export const STACK_FLAT = STACK.flatMap(g => g.items.map(item => ({ ...item, key: g.key })))

export const STACK_COUNT = STACK_FLAT.length

/* 既定は単色で、指したときだけ本来のブランド色にする。その色の取り出し口 */
export const brandColor = item =>
  item.icon && !DARK_ICON_SLUGS.has(item.icon.slug) ? `#${item.icon.hex}` : 'var(--paper)'
