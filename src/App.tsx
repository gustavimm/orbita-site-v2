import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { RouteEffects } from './components/RouteEffects'
import Home from './pages/Home'
import Solucoes from './pages/Solucoes'
import ComoTrabalhamos from './pages/ComoTrabalhamos'
import Sobre from './pages/Sobre'
import Contato from './pages/Contato'

function App() {
  return (
    <BrowserRouter>
      <RouteEffects />

      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>

      <Navbar />

      {/* tabIndex -1: o skip link precisa poder mover o foco para cá. */}
      <main id="conteudo" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/solucoes" element={<Solucoes />} />
          <Route path="/como-trabalhamos" element={<ComoTrabalhamos />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
          {/* Rota desconhecida volta para a home, sem 404 falso. */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  )
}

export default App
