import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { posts } from '../lib/blog.js'
import './Blog.css'

export default function Blog() {
  const headerRef = useRef(null)
  const [sticky, setSticky] = useState(false)

  useEffect(() => {
    const el = headerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setSticky(!entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div className={`old-blog-sticky${sticky ? ' old-blog-sticky--visible' : ''}`}>
        <Link to="/" className="old-blog-back">
          <ArrowLeft size={14} /> Home
        </Link>
        <span className="old-blog-sticky-title">Blog</span>
      </div>

      <div className="old-blog-page">
        <div className="bg-orbs" aria-hidden="true">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
        </div>

        <div className="old-blog-inner">
          <header className="old-blog-header" ref={headerRef}>
            <Link to="/" className="old-blog-back">
              <ArrowLeft size={14} />
              Home
            </Link>
            <h1 className="old-blog-title">Blog</h1>
            <p className="old-blog-sub">Thoughts & notes</p>
          </header>

          <div className="old-blog-grid">
            {posts.map((post, i) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="old-blog-card"
                style={{ '--delay': `${i * 60}ms` }}
              >
                {post.thumbnail
                  ? <img src={post.thumbnail} alt="" className="old-blog-card-thumb" />
                  : <div className="old-blog-card-thumb-empty" />
                }
                <div className="old-blog-card-body">
                  <time className="old-blog-card-date">{post.date}</time>
                  <h2 className="old-blog-card-title">{post.title}</h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
