import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Layout from './componentes/Layout';
import AssinaturaLista from './componentes/assinaturas/AssinaturaLista';
import NovaAssinatura from './componentes/assinaturas/NovaAssinatura';


function App() {
  return (
  
    <Layout>
      <AssinaturaLista />
    </Layout>
    
   
    
    
    
    // <Router>
    //   <Routes>
    //     <Route> 
    //       <Route path="/" element={<AssinaturaLista />} />
    //       <Route path="/nova-assinatura" element={<NovaAssinatura />} />
    //     </Route>
    //   </Routes>
    // </Router>
  );
}

export default App
