import { useRef, useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { getPost } from '../lib/blog.js'
import './Blog.css'

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPost(slug)
  const backRef = useRef(null)
  const [sticky, setSticky] = useState(false)

  useEffect(() => {
    const el = backRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setSticky(!entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  if (!post) {
    return (
      <div className="old-blog-page">
        <div className="old-blog-inner">
          <Link to="/blog" className="old-blog-back"><ArrowLeft size={14} /> Blog</Link>
          <p className="old-blog-not-found">記事が見つかりませんでした。</p>
        </div>
      </div>
    )
  }

  const { Component } = post

  return (
    <>
      {/* スクロール時に現れるミニバー */}
      <div className={`old-blog-sticky${sticky ? ' old-blog-sticky--visible' : ''}`}>
        <Link to="/blog" className="old-blog-back">
          <ArrowLeft size={14} /> Blog
        </Link>
        <span className="old-blog-sticky-title">{post.title}</span>
      </div>

      <div className="old-blog-page">
        <div className="bg-orbs" aria-hidden="true">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
        </div>

        <div className="old-blog-inner">
          <Link to="/blog" className="old-blog-back" ref={backRef}>
            <ArrowLeft size={14} />
            Blog
          </Link>

          <article className="old-post">
            <header className="old-post-header">
              <time className="old-post-date">{post.date}</time>
              <h1 className="old-post-title">{post.title}</h1>
              {post.excerpt && (
                <p className="old-post-excerpt">{post.excerpt}</p>
              )}
            </header>
            <div className="old-prose">
              <Component />
            </div>
          </article>

          <Link to="/blog" className="old-post-footer-back">
            <ArrowLeft size={14} />
            Blog 一覧へ
          </Link>
        </div>
      </div>
    </>
  )
}
