import { useParams, Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import PageFrame from '../components/PageFrame.jsx'
import Module from '../components/Module.jsx'
import { HLine } from '../components/Rule.jsx'
import { posts, getPost } from '../lib/blog.js'
import { fmtDate } from '../lib/site.js'
import './Blog.css'

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPost(slug)

  if (!post) {
    return (
      <PageFrame
        current="blog"
        navExclude="github"
        tag="Entry"
        title="Not found"
        meta="404"
        lead="記事が見つかりませんでした。"
        railText="ENTRY — KOS.N — 2026"
      >
        <div className="p-row">
          <HLine />
          <Module tag="Index" meta="blog" order={1}>
            <Link className="more" to="/blog">
              Blog 一覧へ
              <ArrowUpRight size={15} />
            </Link>
          </Module>
        </div>
      </PageFrame>
    )
  }

  const { Component } = post
  /* 記事の下に置く行き先。いま読んでいるものは外す */
  const others = posts.filter(p => p.slug !== post.slug).slice(0, 3)

  return (
    <PageFrame
      current="blog"
      navExclude="github"
      tag="Entry"
      title={post.title}
      jpTitle
      meta={fmtDate(post.date)}
      lead={post.excerpt}
      railText="ENTRY — KOS.N — 2026"
    >
      <div className="p-row p-row--aside">
        <HLine />

        <Module tag="Text" meta={post.slug} order={1}>
          <article className="prose">
            <Component />
          </article>
        </Module>

        <Module tag="Index" className="bl-side" meta="blog" order={2}>
          <Link className="bl-side-back" to="/blog">
            <ArrowUpRight size={15} />
            Blog 一覧へ
          </Link>

          {others.length > 0 && (
            <ul className="entries">
              {others.map(p => (
                <li key={p.slug}>
                  <Link className="entry" to={`/blog/${p.slug}`}>
                    <span className="entry-date">{fmtDate(p.date)}</span>
                    <span className="entry-title">{p.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <p className="readout">{fmtDate(post.date)}</p>
        </Module>
      </div>
    </PageFrame>
  )
}
