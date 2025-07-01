import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "./authThunks";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

const Login = () => {
  const [username, setUsername] = useState("");
  const [senha, setSenha] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error, isAuthenticated } = useSelector((state) => state.auth);

  // Redireciona quando o login for bem-sucedido
  useEffect(() => {
    if (isAuthenticated && status === "succeeded") {
      navigate("/assinaturas");
    }
  }, [isAuthenticated, status, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ username, senha }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Usuário</Form.Label>
        <Form.Control
          type="text"
          placeholder="Digite seu usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Senha</Form.Label>
        <Form.Control
          type="password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
      </Form.Group>

      {error && (
        <Alert variant="danger" className="mb-3">
          {error}
        </Alert>
      )}

      <Button
        variant="primary"
        type="submit"
        disabled={status === "loading"}
        className="w-100"
      >
        {status === "loading" ? "Entrando..." : "Entrar"}
      </Button>
            <div className="text-center mt-3">
        <small className="text-muted">
          Não tem uma conta?{" "}
          <Button
            variant="link"
            className="p-0"
            onClick={() => navigate("/registro")}
          >
            Cadastre-se
          </Button>
        </small>
      </div>
    </Form>
  );
};

export default Login;
