import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./componentes/Layout";
import AssinaturaLista from "./componentes/assinaturas/AssinaturaLista";
import NovaAssinatura from "./componentes/assinaturas/NovaAssinatura";
import Categorias from "./componentes/categorias/Categorias"; // Importando a página de Categorias
import store from "./store"; // Importando o store do Redux
import { Provider } from "react-redux"; // Importando o Provider do Redux
import DetalhesAssinatura from "./componentes/assinaturas/DetalhesAssinatura";
import Relatorios from "./componentes/relatorios/Relatorios";
import NotificacaoLista from "./componentes/notificacoes/NotificacaoLista";
import NotificacaoForm from "./componentes/notificacoes/NotificacaoForm";
import Notificacoes from "./componentes/notificacoes/Notificacoes";
import Login from "./componentes/auth/Login"; // Importando o componente de Login
import Register from "./componentes/auth/Register"; // Importando o componente de Registro
import RequireAuth from "./componentes/auth/RequireAuth"; // Importando o componente de autenticação 
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/registro" element={<Register />} />
            <Route path="/login" element={<Login />} /> {/* Rota para Login */}
            <Route
              path="/"
              element={
                <RequireAuth>
                  <AssinaturaLista />
                </RequireAuth>
              }
            />
            <Route
              path="/assinaturas"
              element={
                <RequireAuth>
                  <AssinaturaLista />
                </RequireAuth>
              }
            />
            <Route
              path="/nova-assinatura"
              element={
                <RequireAuth>
                  <NovaAssinatura />
                </RequireAuth>
              }
            />
            <Route
              path="/categorias"
              element={
                <RequireAuth>
                  <Categorias />
                </RequireAuth>
              }
            />
            <Route
              path="/assinaturas/:id"
              element={
                <RequireAuth>
                  <DetalhesAssinatura />
                </RequireAuth>
              }
            />
            <Route
              path="/relatorios"
              element={
                <RequireAuth>
                  <Relatorios />
                </RequireAuth>
              }
            />
            <Route
              path="/notificacoes"
              element={
                <RequireAuth>
                  <Notificacoes />
                </RequireAuth>
              }
            />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
