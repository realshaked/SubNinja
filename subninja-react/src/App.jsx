import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './componentes/Layout';
import AssinaturaLista from './componentes/assinaturas/AssinaturaLista';
import NovaAssinatura from './componentes/assinaturas/NovaAssinatura';
import Categorias from './componentes/categorias/Categorias';  // Importando a página de Categorias
import store from './store'; // Importando o store do Redux
import { Provider } from 'react-redux'; // Importando o Provider do Redux
import DetalhesAssinatura from './componentes/assinaturas/DetalhesAssinatura';
import Relatorios from './componentes/relatorios/Relatorios';

function App() {
  return (
    
    <Provider store={store}>
      <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<AssinaturaLista />} />
          <Route path="/nova-assinatura" element={<NovaAssinatura />} />
          <Route path="/categorias" element={<Categorias />} /> {/* Rota para Categorias */}
          <Route path = "/assinatura/:id" element={<DetalhesAssinatura />} />
          <Route path="/relatorios" element={<Relatorios />} />
        </Routes>
      </Layout>
    </Router>
    </Provider>
  );
}

export default App;
