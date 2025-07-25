import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Form,
  FormControl,
  FormSelect,
  InputGroup,
  Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createAssinatura } from "./assinaturaThunks";
import { useNavigate } from "react-router-dom";
import { selectAllCategorias } from "../categorias/categoriasSlice";
import { fetchCategorias } from "../categorias/categoriasThunks";

const NovaAssinatura = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categorias = useSelector(selectAllCategorias);
  const status = useSelector((state) => state.categorias.status);

  const [formData, setFormData] = useState({
    nome: "",
    frequencia: "",
    metodoPagamento: "",
    categoriaId: "",
    valor: "",
    plano: "",
    notificacao: "",
    dataAssinatura: new Date().toISOString().split("T")[0],
    linkCancelamento: "",
  });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategorias());
    }
  }, [dispatch, status]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const novaAssinatura = {
      ...formData,
      valor: Number(formData.valor),
    };

    dispatch(createAssinatura(novaAssinatura))
      .then(() => {
        navigate("/assinaturas");
      })
      .catch((error) => {
        console.error("Erro ao criar assinatura:", error);
      });
  };

  const handleCancel = () => {
    navigate("/assinaturas");
  };

  return (
    <Row className="justify-content-center">
      <Col xs={12} md={10} lg={8}>
        <div className="text-center mb-4">
          <h1 className="h3 fw-bold">Nova Assinatura</h1>
          <p className="text-muted">Preencha os dados da sua assinatura</p>
        </div>

        <Card className="shadow-sm border-0">
          <Card.Body className="p-3 p-md-4">
            <Form onSubmit={handleSubmit}>
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
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-medium">
                  Data de Assinatura
                </Form.Label>
                <FormControl
                  type="date"
                  size="sm"
                  id="dataAssinatura"
                  value={formData.dataAssinatura}
                  onChange={handleChange}
                  required
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
                <Form.Label className="fw-medium">
                  Método de Pagamento
                </Form.Label>
                <FormSelect
                  size="sm"
                  id="metodoPagamento"
                  value={formData.metodoPagamento}
                  onChange={handleChange}
                  required
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
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label className="fw-medium">
                  Link de Cancelamento
                </Form.Label>
                <FormControl
                  type="url"
                  id="linkCancelamento"
                  placeholder="https://..."
                  value={formData.linkCancelamento}
                  onChange={handleChange}
                />
              </Form.Group>

              <div className="d-grid gap-2 d-flex justify-content-between mt-4">
                <Button
                  variant="outline-secondary"
                  size="sm"
                  className="flex-grow-1"
                  onClick={handleCancel}
                  type="button"
                >
                  Cancelar
                </Button>
                <Button
                  variant="dark"
                  size="sm"
                  type="submit"
                  className="flex-grow-1"
                  disabled={
                    !formData.nome || !formData.frequencia || !formData.valor
                  }
                >
                  Salvar
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default NovaAssinatura;
