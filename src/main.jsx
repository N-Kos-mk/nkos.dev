import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ComingSoon from './pages/ComingSoon.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/projects" element={<ComingSoon label="Projects" />} />
        <Route path="/blog" element={<ComingSoon label="Blog" />} />
        <Route path="/works" element={<ComingSoon label="Works" />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
