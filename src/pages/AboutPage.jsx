import { useNavigate } from 'react-router-dom'
import About from './About.jsx'

/* About はトップページ内のパネルから独立したルートに変更した。
   About 本体は開閉状態を props で受け取るため、ここで常時 open として渡す */
export default function AboutPage() {
  const navigate = useNavigate()
  return <About isOpen onClose={() => navigate('/')} />
}
