import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { getPost } from '../lib/blog.js'
import './Blog.css'

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPost(slug)

  if (!post) {
    return (
      <div className="blog-page">
        <div className="blog-inner">
          <Link to="/blog" className="blog-back"><ArrowLeft size={14} /> Blog</Link>
          <p className="blog-not-found">記事が見つかりませんでした。</p>
        </div>
      </div>
    )
  }

  const { Component } = post

  return (
    <div className="blog-page">
      <div className="bg-orbs" aria-hidden="true">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
      </div>

      <div className="blog-inner">
        <Link to="/blog" className="blog-back">
          <ArrowLeft size={14} />
          Blog
        </Link>

        <article className="post">
          <header className="post-header">
            <time className="post-date">{post.date}</time>
            <h1 className="post-title">{post.title}</h1>
          </header>
          <div className="prose">
            <Component />
          </div>
        </article>
      </div>
    </div>
  )
}
