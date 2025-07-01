import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { logout } from "./auth/authSlice"; // ajuste o caminho conforme seu projeto

export default function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout()); // Atualiza o estado global para "deslogado"
    navigate("/login");
  };

  return (
    <Button variant="outline-danger" onClick={handleLogout}>
      Sair
    </Button>
  );
}