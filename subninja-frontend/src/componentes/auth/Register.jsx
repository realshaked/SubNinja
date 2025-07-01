import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "./authThunks";
import { clearError } from "./authSlice";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

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
    // Limpa erros ao desmontar o componente
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  // Redireciona quando autenticado
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
      newErrors.email = "Email deve ter um formato válido";
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
      newErrors.confirmarSenha = "Confirmação de senha é obrigatória";
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

      <Form.Group className="mb-3" controlId="formBasicPhone">
        <Form.Label>Telefone</Form.Label>
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
        <Form.Control.Feedback type="invalid">
          {errors.telefone}
        </Form.Control.Feedback>
        <Form.Text className="text-muted">
          Digite seu telefone com DDD.
        </Form.Text>
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

      <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
        <Form.Label>Confirmar Senha</Form.Label>
        <Form.Control
          type="password"
          name="confirmarSenha"
          placeholder="Confirme sua senha"
          value={formData.confirmarSenha}
          onChange={handleChange}
          isInvalid={!!errors.confirmarSenha}
          required
        />
        <Form.Control.Feedback type="invalid">
          {errors.confirmarSenha}
        </Form.Control.Feedback>
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
