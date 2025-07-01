import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "./authThunks";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    senha: "",
  });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error, isAuthenticated } = useSelector((state) => state.auth);

  // Redireciona quando o registro for bem-sucedido
  useEffect(() => {
    if (isAuthenticated && status === "succeeded") {
      navigate("/assinaturas");
    }
  }, [isAuthenticated, status, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove erro do campo quando usuário começar a digitar
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Usuário é obrigatório";
    } else if (formData.username.length < 3) {
      newErrors.username = "Usuário deve ter pelo menos 3 caracteres";
    }

    if (!formData.senha) {
      newErrors.senha = "Senha é obrigatória";
    } else if (formData.senha.length < 6) {
      newErrors.senha = "Senha deve ter pelo menos 6 caracteres";
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

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Usuário</Form.Label>
        <Form.Control
          type="text"
          name="username"
          placeholder="Digite seu usuário"
          value={formData.username}
          onChange={handleChange}
          isInvalid={!!errors.username}
          required
        />
        <Form.Control.Feedback type="invalid">
          {errors.username}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Digite seu email"
          value={formData.email}
          onChange={handleChange}
          isInvalid={!!errors.email}
          required
        />
        <Form.Control.Feedback type="invalid">
          {errors.email}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Senha</Form.Label>
        <Form.Control
          type="password"
          name="senha"
          placeholder="Digite sua senha"
          value={formData.senha}
          onChange={handleChange}
          isInvalid={!!errors.senha}
          required
        />
        <Form.Control.Feedback type="invalid">
          {errors.senha}
        </Form.Control.Feedback>
        <Form.Text className="text-muted">
          A senha deve ter pelo menos 6 caracteres.
        </Form.Text>
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
        {status === "loading" ? "Registrando..." : "Registrar"}
      </Button>

      <div className="text-center mt-3">
        <small className="text-muted">
          Já tem uma conta?{" "}
          <Button
            variant="link"
            className="p-0"
            onClick={() => navigate("/login")}
          >
            Faça login
          </Button>
        </small>
      </div>
    </Form>
  );
};

export default Register;
