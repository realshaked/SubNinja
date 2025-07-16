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
import { useSelector, useDispatch } from "react-redux";
import { updateAssinatura } from "./assinaturaThunks";
import { selectAllCategorias } from "../categorias/categoriasSlice";
import { fetchCategorias } from "../categorias/categoriasThunks";
import { useNavigate } from "react-router-dom";
import {
  formatarDataParaInput,
  formatarMoeda,
  formatarFrequencia,
  formatarMetodoPagamento,
  calcularDataVencimento,
} from "../../utils/formatadores.js";

const EditarAssinatura = ({ show, onHide, assinatura }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    valor: "",
    categoriaId: "",
    dataAssinatura: "",
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

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategorias());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (assinatura) {
      setFormData({
        nome: assinatura.nome || "",
        valor: formatarMoeda(assinatura.valor, false), // Formata para exibição
        categoriaId: categorias.some(
          (cat) => String(cat._id) === String(assinatura.categoriaId)
        )
          ? assinatura.categoriaId
          : "",
        dataAssinatura: formatarDataParaInput(assinatura.dataAssinatura),
        frequencia: assinatura.frequencia || "",
        metodoPagamento: assinatura.metodoPagamento || "",
        notificacao: assinatura.notificacao || "",
        plano: assinatura.plano || "",
        linkCancelamento: assinatura.linkCancelamento || "",
      });
    }
  }, [assinatura, categorias]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleValorChange = (e) => {
    const { value } = e.target;
    const apenasNumeros = value.replace(/\D/g, "");
    const valorDecimal = (apenasNumeros / 100).toFixed(2);
    setFormData({
      ...formData,
      valor: formatarMoeda(valorDecimal, false), // Mantém formatado durante edição
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!assinatura?._id) {
      setError("ID da assinatura inválido");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const valorNumerico =
        parseFloat(formData.valor.replace(/[^\d,-]/g, "").replace(",", ".")) ||
        0;

      const novaDataVencimento = calcularDataVencimento(
        formData.dataAssinatura,
        formData.frequencia
      );

      await dispatch(
        updateAssinatura({
          _id: assinatura._id,
          ...formData,
          valor: valorNumerico,
          dataVencimento: novaDataVencimento,
        })
      ).unwrap();

      onHide();
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
                    type="text"
                    id="valor"
                    placeholder="0,00"
                    value={formData.valor}
                    onChange={handleValorChange}
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
              disabled={isSubmitting}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={onHide}
            disabled={isSubmitting}
          >
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
