import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './componentes/Layout';
import AssinaturaLista from './componentes/assinaturas/AssinaturaLista';
import NovaAssinatura from './componentes/assinaturas/NovaAssinatura';
import Categorias from './componentes/categorias/Categorias';  // Importando a página de Categorias

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<AssinaturaLista />} />
          <Route path="/nova-assinatura" element={<NovaAssinatura />} />
          <Route path="/categorias" element={<Categorias />} /> {/* Rota para Categorias */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
