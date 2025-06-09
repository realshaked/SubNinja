import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div style={{ paddingTop: '56px' }}> {/* Espaço para o header */}
      <Header onToggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} />
      <main style={{ marginLeft: sidebarOpen ? '250px' : '0', transition: 'margin 0.3s ease' }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;