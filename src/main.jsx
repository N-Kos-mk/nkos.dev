import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Shell from './components/Shell.jsx'
import App from './App.jsx'
import About from './pages/About.jsx'
import Blog from './pages/Blog.jsx'
import BlogPost from './pages/BlogPost.jsx'
import Works from './pages/Works.jsx'
import WorkPost from './pages/WorkPost.jsx'
import Troll from './pages/Troll.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* 盤面の外枠。左端の銘板はここが持つため、ページを移っても引き直されない */}
        <Route element={<Shell />}>
          <Route path="/" element={<App />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/works" element={<Works />} />
          <Route path="/works/:slug" element={<WorkPost />} />
        </Route>
        {/* 旧デザインの隠しページ。盤面の枠には入れない */}
        <Route path="/troll" element={<Troll />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
