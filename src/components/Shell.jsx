import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Rail from './Rail.jsx'
import { sectionOf, railLabelOf } from '../lib/site.js'
import './Shell.css'

/* 盤面の外枠。銘板はここが持つため、ページを移っても引き直されない */
export default function Shell() {
  const { pathname } = useLocation()
  const section = sectionOf(pathname)

  /* ページを移ったら先頭から読ませる。前のページの位置が残ると、
     開いた瞬間に本文の途中から始まってしまう */
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    document.title = `Kos.N - ${section}`
  }, [section])

  return (
    <div className="shell" data-top={section === 'HOME' || undefined}>
      <Rail label={railLabelOf(pathname)} />
      <Outlet />
    </div>
  )
}
