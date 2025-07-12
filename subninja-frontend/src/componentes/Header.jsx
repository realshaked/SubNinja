import { Button, Navbar, Container } from "react-bootstrap";
import { List, PlusCircle } from "react-bootstrap-icons";
import LogoutButton from "./LogoutButton";
import { Link } from "react-router-dom";
import { PersonCircle } from "react-bootstrap-icons";

const Header = ({ onToggleSidebar }) => {
  return (
    <header className="header bg-light shadow-sm">
      <Navbar expand="lg">
        <Container fluid>
          <Button
            variant="link"
            className="menu-button"
            onClick={onToggleSidebar}
          >
            <List className="menu-icon" size={24} />
          </Button>

          <div className="brand d-flex align-items-center ms-3">
            <a href="/" className="logo-link text-decoration-none">
              <img
                src=".\src\assets\logo_subninja.png"
                alt="Logo - Voltar para página inicial"
                className="logo-image"
                style={{ height: "40px" }}
              />
            </a>
            <h1 className="title ms-2 mb-0">SubNinja</h1>
          </div>
          <Link to="/area-usuario" className="btn btn-link bi bi-person-circle">
            <PersonCircle className="add-icon" size={20} />
          </Link>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
