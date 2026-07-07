import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { posts } from '../lib/blog.js'
import './Blog.css'

export default function Blog() {
  return (
    <div className="blog-page">
      <div className="bg-orbs" aria-hidden="true">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
      </div>

      <div className="blog-inner">
        <header className="blog-header">
          <Link to="/" className="blog-back">
            <ArrowLeft size={14} />
            Home
          </Link>
          <h1 className="blog-title">Blog</h1>
          <p className="blog-sub">Thoughts & notes</p>
        </header>

        <div className="blog-grid">
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="blog-card"
              style={{ '--delay': `${i * 60}ms` }}
            >
              {post.thumbnail
                ? <img src={post.thumbnail} alt="" className="blog-card-thumb" />
                : <div className="blog-card-thumb-empty" />
              }
              <div className="blog-card-body">
                <time className="blog-card-date">{post.date}</time>
                <h2 className="blog-card-title">{post.title}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
