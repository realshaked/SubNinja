import { Button, Nav } from 'react-bootstrap';
import { X, HouseDoor, PlusCircle, BarChart } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <div 
      id="sidebar" 
      className={`sidebar bg-dark ${isOpen ? 'open' : ''}`}
      style={{
        width: isOpen ? '250px' : '0',
        position: 'fixed',
        height: '100vh',
        zIndex: 1000,
        transition: 'width 0.3s ease',
        overflowX: 'hidden'
      }}
    >
      <Button variant="secondary" className="mt-3 ms-2" onClick={onClose}>
        <X className="menu-icon" />
      </Button>

      <Nav className="flex-column px-3 pt-3">
        <Nav.Link as={Link} to="/" className="text-white mb-2">
          <HouseDoor className="me-2" /> Home
        </Nav.Link>
        <Nav.Link as={Link} to="/nova-assinatura" className="text-white mb-2">
          <PlusCircle className="me-2" /> Nova Assinatura
        </Nav.Link>
        <Nav.Link as={Link} to="/categorias" className="text-white mb-2">
          <PlusCircle className="me-2" /> Categorias
        </Nav.Link>
        <Nav.Link as={Link} to="/notificacoes" className="text-white mb-2">
          <PlusCircle className="me-2" /> Notificações
        </Nav.Link>
        <Nav.Link as={Link} to="/relatorios" className="text-white mb-2">
          <BarChart className="me-2" /> Relatório de Gastos
        </Nav.Link>
        <LogoutButton />
      </Nav>
    </div>
  );
};

export default Sidebar;