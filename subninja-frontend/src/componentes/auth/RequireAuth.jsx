import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    // Redireciona para login, mas guarda a página original
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}