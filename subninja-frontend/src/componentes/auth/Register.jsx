import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "./authThunks";
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
import {
  PersonFill,
  EnvelopeFill,
  PhoneFill,
  LockFill,
} from "react-bootstrap-icons";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    senha: "",
    email: "",
    telefone: "",
    confirmarSenha: "",
    role: "user",
  });
  const [errors, setErrors] = useState({});

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const cleanPhone = phone.replace(/\D/g, "");
    return cleanPhone.length >= 10 && cleanPhone.length <= 11;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Usuário é obrigatório";
    } else if (formData.username.length < 3) {
      newErrors.username = "Usuário deve ter pelo menos 3 caracteres";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.telefone.trim()) {
      newErrors.telefone = "Telefone é obrigatório";
    } else if (!validatePhone(formData.telefone)) {
      newErrors.telefone = "Telefone deve ter entre 10 e 11 dígitos";
    }

    if (!formData.senha) {
      newErrors.senha = "Senha é obrigatória";
    } else if (formData.senha.length < 6) {
      newErrors.senha = "Senha deve ter pelo menos 6 caracteres";
    }

    if (!formData.confirmarSenha) {
      newErrors.confirmarSenha = "Confirme sua senha";
    } else if (formData.senha !== formData.confirmarSenha) {
      newErrors.confirmarSenha = "As senhas não coincidem";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const { confirmarSenha, ...dataToSubmit } = formData;
      dispatch(register(dataToSubmit));
    }
  };

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 10) {
      return numbers
        .replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3")
        .replace(/-$/, "");
    } else {
      return numbers
        .replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3")
        .replace(/-$/, "");
    }
  };

  const handlePhoneChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = formatPhone(value);
    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
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
          <Col md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
            <Card className="shadow-sm border-0">
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <h3 className="fw-bold">Crie sua conta</h3>
                  <p className="text-muted">
                    Preencha os campos para se registrar
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
                      name="username"
                      placeholder="Digite seu usuário"
                      value={formData.username}
                      onChange={handleChange}
                      isInvalid={!!errors.username}
                      required
                    />
                    <PersonFill className="text-muted position-absolute end-0 top-50 me-3 translate-middle-y" />
                    <Form.Control.Feedback type="invalid">
                      {errors.username}
                    </Form.Control.Feedback>
                  </FloatingLabel>

                  <FloatingLabel
                    controlId="floatingEmail"
                    label="Email"
                    className="mb-3"
                  >
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Digite seu email"
                      value={formData.email}
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                      required
                    />
                    <EnvelopeFill className="text-muted position-absolute end-0 top-50 me-3 translate-middle-y" />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </FloatingLabel>

                  <FloatingLabel
                    controlId="floatingPhone"
                    label="Telefone"
                    className="mb-3"
                  >
                    <Form.Control
                      type="tel"
                      name="telefone"
                      placeholder="(XX) XXXXX-XXXX"
                      value={formData.telefone}
                      onChange={handlePhoneChange}
                      isInvalid={!!errors.telefone}
                      maxLength="15"
                      required
                    />
                    <PhoneFill className="text-muted position-absolute end-0 top-50 me-3 translate-middle-y" />
                    <Form.Control.Feedback type="invalid">
                      {errors.telefone}
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted ms-1">
                      Com DDD (ex: 11987654321)
                    </Form.Text>
                  </FloatingLabel>

                  <FloatingLabel
                    controlId="floatingPassword"
                    label="Senha"
                    className="mb-3"
                  >
                    <Form.Control
                      type="password"
                      name="senha"
                      placeholder="Digite sua senha"
                      value={formData.senha}
                      onChange={handleChange}
                      isInvalid={!!errors.senha}
                      required
                    />
                    <LockFill className="text-muted position-absolute end-0 top-50 me-3 translate-middle-y" />
                    <Form.Control.Feedback type="invalid">
                      {errors.senha}
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted ms-1">
                      Mínimo 6 caracteres
                    </Form.Text>
                  </FloatingLabel>

                  <FloatingLabel
                    controlId="floatingConfirmPassword"
                    label="Confirmar Senha"
                    className="mb-4"
                  >
                    <Form.Control
                      type="password"
                      name="confirmarSenha"
                      placeholder="Confirme sua senha"
                      value={formData.confirmarSenha}
                      onChange={handleChange}
                      isInvalid={!!errors.confirmarSenha}
                      required
                    />
                    <LockFill className="text-muted position-absolute end-0 top-50 me-3 translate-middle-y" />
                    <Form.Control.Feedback type="invalid">
                      {errors.confirmarSenha}
                    </Form.Control.Feedback>
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
                        Registrando...
                      </>
                    ) : (
                      "Registrar"
                    )}
                  </Button>

                  <div className="text-center mt-3">
                    <small className="text-muted">
                      Já tem uma conta?{" "}
                      <Button
                        variant="link"
                        className="p-0 text-decoration-none fw-normal"
                        onClick={() => navigate("/login")}
                      >
                        Faça login
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

export default Register;
