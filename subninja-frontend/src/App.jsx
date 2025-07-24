import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import Layout from "./componentes/Layout";
import AssinaturaLista from "./componentes/assinaturas/AssinaturaLista";
import NovaAssinatura from "./componentes/assinaturas/NovaAssinatura";
import Categorias from "./componentes/categorias/Categorias";
import DetalhesAssinatura from "./componentes/assinaturas/DetalhesAssinatura";
import Relatorios from "./componentes/relatorios/Relatorios";
import Notificacoes from "./componentes/notificacoes/Notificacoes";

import Login from "./componentes/auth/Login";
import Register from "./componentes/auth/Register";
import RequireAuth from "./componentes/auth/RequireAuth";
import AreaUsuario from "./componentes/auth/AreaUsuario";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Rotas públicas (sem layout) */}
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />

          {/* Rotas protegidas com Layout */}
          <Route
            element={
              <RequireAuth>
                <Layout />
              </RequireAuth>
            }
          >
            <Route path="/" element={<AssinaturaLista />} />
            <Route path="/area-usuario" element={<AreaUsuario />} />
            <Route path="/assinaturas" element={<AssinaturaLista />} />
            <Route path="/nova-assinatura" element={<NovaAssinatura />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/assinaturas/:id" element={<DetalhesAssinatura />} />
            <Route path="/relatorios" element={<Relatorios />} />
            <Route path="/notificacoes" element={<Notificacoes />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
