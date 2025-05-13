import React, {useState} from 'react';
import {
  Row,
  Col,
  Card,
  Form,
  FormControl,
  FormSelect,
  InputGroup,
  Button
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addAssinatura } from './assinaturaSlice';

const NovaAssinatura = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nome: '',
    frequencia: '',
    metodoPagamento: '',
    categoria: '',
    valor: '',
    tipo: '',
    notificacao: '',
  
  });
  
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addAssinatura({
      ...formData,
      valor: Number(formData.valor)  // conversão para número
    }));
    navigate('/'); // Redireciona para a lista de assinaturas após salvar
  }
  
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
                />
              </Form.Group>

              <Form.Group className="mb-3">
  <Form.Label className="fw-medium">Frequência</Form.Label>
  <FormSelect
    size="sm"
    id="frequencia"
    value={formData.frequencia}
    onChange={handleChange}
  >
    <option disabled value="">Selecione a frequência</option>
    <option value="mensal">Mensal</option>
    <option value="anual">Anual</option>
    <option value="semanal">Semanal</option>
    <option value="trimestral">Trimestral</option>
  </FormSelect>
</Form.Group>

<Form.Group className="mb-3">
  <Form.Label className="fw-medium">Método de Pagamento</Form.Label>
  <FormSelect
    size="sm"
    id="metodoPagamento"
    value={formData.metodoPagamento}
    onChange={handleChange}
  >
    <option disabled value="">Selecione o método</option>
    <option value="credito">Cartão de Crédito</option>
    <option value="debito">Cartão de Débito</option>
    <option value="boleto">Boleto</option>
    <option value="pix">PIX</option>
  </FormSelect>
</Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-medium">Categoria</Form.Label>
                <FormSelect
                  size="sm"
                  id="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                >
                  <option disabled value="">Selecione a categoria</option>
                  <option value="streaming">Streaming</option>
                  <option value="software">Software</option>
                  <option value="jogos">Jogos</option>
                  <option value="musica">Música</option>
                  <option value="outros">Outros</option>
                </FormSelect>
              </Form.Group>

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
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-medium">Tipo</Form.Label>
                <FormControl
                  type="text"
                  size="sm"
                  id="tipo"
                  placeholder="Ex: Premium"
                  onChange = {handleChange}
                  value={formData.tipo}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-medium">Notificação</Form.Label>
                <FormSelect size="sm" 
                id="notificacao"
                type="text"
                onChange = {handleChange}
                value={formData.notificacao}>
                  <option disabled value="">Selecione a notificação</option>
                  <option value="email">E-mail</option>
                  <option value="sms">SMS</option>
                  <option value="app">Notificação no App</option>
                  <option value="nenhuma">Nenhuma</option>
                </FormSelect>
              </Form.Group>

              <div className="d-grid gap-2 d-flex justify-content-between mt-4">
                <Button 
                variant="outline-secondary" 
                size="sm" 
                className="flex-grow-1"
                onClick={() => navigate('/')}
                >
                  Cancelar
                </Button>
                <Button variant="dark" size="sm" type="submit" className="flex-grow-1">
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