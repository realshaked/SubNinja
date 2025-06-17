import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Form,
  FormControl,
  FormSelect,
  InputGroup,
  Row,
  Col,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useSelector, useDispatch  } from "react-redux";
import { updateAssinatura } from "./assinaturaThunks";
import { selectAllCategorias } from "../categorias/categoriasSlice";
import { fetchCategorias } from "../categorias/categoriasThunks";
import { useNavigate } from "react-router-dom";

const EditarAssinatura = ({ show, onHide, assinatura }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    valor: "",
    categoriaId: "",
    dataAssinatura: "",
    dataVencimento: "",
    frequencia: "",
    metodoPagamento: "",
    notificacao: "",
    plano: "",
    linkCancelamento: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const categorias = useSelector(selectAllCategorias);
  const status = useSelector((state) => state.categorias.status);

  // Garante que as categorias estejam carregadas
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategorias());
    }
  }, [dispatch, status]);

  // Preenche o formulário quando a assinatura muda
  useEffect(() => {
    if (assinatura) {
      setFormData({
        nome: assinatura.nome || "",
        valor: assinatura.valor || "",
        categoriaId: assinatura.categoriaId || "",
        dataAssinatura: assinatura.dataAssinatura?.split("T")[0] || "",
        dataVencimento: assinatura.dataVencimento || "",
        frequencia: assinatura.frequencia || "",
        metodoPagamento: assinatura.metodoPagamento || "",
        notificacao: assinatura.notificacao || "",
        plano: assinatura.plano || "",
        linkCancelamento: assinatura.linkCancelamento || "",
      });
    }
  }, [assinatura]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const calcularDataVencimento = (dataAssinatura, frequencia) => {
    let data = new Date(dataAssinatura);
    switch (frequencia) {
      case "mensal":
        data.setMonth(data.getMonth() + 1);
        break;
      case "trimestral":
        data.setMonth(data.getMonth() + 3);
        break;
      case "semestral":
        data.setMonth(data.getMonth() + 6);
        break;
      case "anual":
        data.setFullYear(data.getFullYear() + 1);
        break;
      case "semanal":
        data.setDate(data.getDate() + 7);
        break;
      default:
        break;
    }
    return data.toISOString().split("T")[0];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const novaDataVencimento = calcularDataVencimento(
      formData.dataAssinatura,
      formData.frequencia
    );

    if (!assinatura?._id) {
      setError("ID da assinatura inválido");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await dispatch(
        updateAssinatura({
          _id: assinatura._id,
          ...formData,
          valor: Number(formData.valor),
          dataVencimento: novaDataVencimento,
        })
      ).unwrap();

      onHide(); // Fecha o modal após sucesso
      navigate("/assinaturas");
    } catch (err) {
      console.error("Falha ao atualizar assinatura:", err);
      setError(
        err.message ||
          "Falha ao atualizar assinatura. Por favor, tente novamente."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={isSubmitting ? null : onHide} size="lg">
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Assinatura</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && (
            <Alert variant="danger" className="mb-3">
              {error}
            </Alert>
          )}
          <Form.Group className="mb-3">
            <Form.Label className="fw-medium">Nome</Form.Label>
            <FormControl
              type="text"
              size="sm"
              id="nome"
              placeholder="Ex: Netflix Premium"
              value={formData.nome}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-medium">Data de Assinatura</Form.Label>
            <FormControl
              type="date"
              size="sm"
              id="dataAssinatura"
              value={formData.dataAssinatura}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-medium">Frequência</Form.Label>
            <FormSelect
              size="sm"
              id="frequencia"
              value={formData.frequencia}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            >
              <option disabled value="">
                Selecione a frequência
              </option>
              <option value="mensal">Mensal</option>
              <option value="anual">Anual</option>
              <option value="semanal">Semanal</option>
              <option value="trimestral">Trimestral</option>
              <option value="semestral">Semestral</option>
            </FormSelect>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-medium">Método de Pagamento</Form.Label>
            <FormSelect
              size="sm"
              id="metodoPagamento"
              value={formData.metodoPagamento}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            >
              <option disabled value="">
                Selecione o método
              </option>
              <option value="credito">Cartão de Crédito</option>
              <option value="debito">Cartão de Débito</option>
              <option value="boleto">Boleto</option>
              <option value="pix">PIX</option>
            </FormSelect>
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-medium">Categoria</Form.Label>
                <FormSelect
                  size="sm"
                  id="categoriaId"
                  value={formData.categoriaId}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                >
                  <option disabled value="">
                    Selecione a categoria
                  </option>
                  {categorias.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.nome}
                    </option>
                  ))}
                </FormSelect>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-medium">Valor</Form.Label>
                <InputGroup size="sm">
                  <InputGroup.Text>R$</InputGroup.Text>
                  <FormControl
                    type="number"
                    id="valor"
                    placeholder="0,00"
                    step="0.01"
                    value={formData.valor}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-medium">Plano</Form.Label>
                <FormControl
                  type="text"
                  size="sm"
                  id="plano"
                  placeholder="Ex: Premium"
                  value={formData.plano}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-medium">Notificação</Form.Label>
                <FormSelect
                  size="sm"
                  id="notificacao"
                  value={formData.notificacao}
                  onChange={handleChange}
                  disabled={isSubmitting}
                >
                  <option disabled value="">
                    Selecione a notificação
                  </option>
                  <option value="email">E-mail</option>
                  <option value="sms">SMS</option>
                  <option value="app">Notificação no App</option>
                  <option value="nenhuma">Nenhuma</option>
                </FormSelect>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label className="fw-medium">Link de Cancelamento</Form.Label>
                <FormControl
                   type="url"
                   id="linkCancelamento"
                   placeholder="https://..."
                   value={formData.linkCancelamento}
                   onChange={handleChange}
                />                
          </Form.Group>
        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" size="sm" onClick={onHide}>
            Cancelar
          </Button>
          <Button
            variant="dark"
            size="sm"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Atualizando...
              </>
            ) : (
              "Salvar Alterações"
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditarAssinatura;