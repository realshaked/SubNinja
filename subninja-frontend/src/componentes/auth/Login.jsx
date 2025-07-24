import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "./authThunks";
import { clearError } from "./authSlice";
import {
  Button,
  Form,
  Alert,
  Card,
  Container,
  Row,
  Col,
  FloatingLabel,
  Spinner,
} from "react-bootstrap";
import { LockFill, PersonFill } from "react-bootstrap-icons";

const Login = () => {
  const [username, setUsername] = useState("");
  const [senha, setSenha] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/assinaturas");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ username, senha }));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 50%, #f5f5f5 100%)",
        padding: "20px 0",
      }}
    >
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "calc(100vh - 40px)" }}
      >
        <Row className="w-100">
          <Col md={{ span: 6, offset: 3 }} lg={{ span: 4, offset: 4 }}>
            <Card className="shadow-sm border-0">
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <h3 className="fw-bold">Bem-vindo de volta</h3>
                  <p className="text-muted">
                    Por favor, faça login para continuar
                  </p>
                </div>

                {error && (
                  <Alert variant="danger" className="text-center">
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <FloatingLabel
                    controlId="floatingUsername"
                    label="Usuário"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Digite seu usuário"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                    <PersonFill className="text-muted position-absolute end-0 top-50 me-3 translate-middle-y" />
                  </FloatingLabel>

                  <FloatingLabel
                    controlId="floatingPassword"
                    label="Senha"
                    className="mb-4"
                  >
                    <Form.Control
                      type="password"
                      placeholder="Digite sua senha"
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                      required
                    />
                    <LockFill className="text-muted position-absolute end-0 top-50 me-3 translate-middle-y" />
                  </FloatingLabel>

                  <Button
                    variant="primary"
                    type="submit"
                    disabled={status === "loading"}
                    className="w-100 py-2 mb-3 fw-bold"
                  >
                    {status === "loading" ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        Entrando...
                      </>
                    ) : (
                      "Entrar"
                    )}
                  </Button>

                  <div className="text-center mt-3">
                    <small className="text-muted">
                      Não tem uma conta?{" "}
                      <Button
                        variant="link"
                        className="p-0 text-decoration-none fw-normal"
                        onClick={() => navigate("/registro")}
                      >
                        Cadastre-se
                      </Button>
                    </small>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
