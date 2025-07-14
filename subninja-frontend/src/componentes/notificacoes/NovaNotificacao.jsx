import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addNotificacao } from "./notificacoesThunks";
import { selectAllAssinaturas } from "../assinaturas/assinaturaSlice";

// Função para calcular próxima renovação
function calcularProximaRenovacao(dataAssinatura, frequencia) {
  const agora = new Date();
  let data = new Date(dataAssinatura);

  while (data <= agora) {
    switch (frequencia) {
      case "mensal":
        data.setMonth(data.getMonth() + 1);
        break;
      case "anual":
        data.setFullYear(data.getFullYear() + 1);
        break;
      case "semanal":
        data.setDate(data.getDate() + 7);
        break;
      case "trimestral":
        data.setMonth(data.getMonth() + 3);
        break;
      case "semestral":
        data.setMonth(data.getMonth() + 6);
        break;
      default:
        data.setMonth(data.getMonth() + 1);
    }
  }
  return data;
}

const NovaNotificacao = ({ show, onHide, onSalvar }) => {
  const dispatch = useDispatch();
  const assinaturas = useSelector(selectAllAssinaturas);
  const usuarioId = useSelector((state) => state.auth.user?._id);

  const [horaNotificacao, setHoraNotificacao] = useState("09:00");
  const [titulo, setTitulo] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [canal, setCanal] = useState("app");
  const [assinaturaId, setAssinaturaId] = useState("");
  const [diasAntes, setDiasAntes] = useState(1);
  const [email, setEmail] = useState("");

  // Busca assinatura selecionada
  const assinaturaSelecionada = assinaturas.find(a => a._id === assinaturaId);

  const handleSubmit = (e) => {
  e.preventDefault();

  if (!assinaturaSelecionada) return;

  // Calcula próxima renovação
  const proximaRenovacao = calcularProximaRenovacao(
    assinaturaSelecionada.dataAssinatura,
    assinaturaSelecionada.frequencia
  );

  // Subtrai os dias antes
  const dataNotificacao = new Date(proximaRenovacao);
  dataNotificacao.setDate(dataNotificacao.getDate() - Number(diasAntes));

  // Aplica o horário escolhido
  if (horaNotificacao) {
    const [h, m] = horaNotificacao.split(":");
    dataNotificacao.setHours(Number(h), Number(m), 0, 0);
  }

  const novaNotificacao = {
    titulo,
    mensagem,
    data_envio_programada: dataNotificacao.toISOString(),
    canal,
    status: "Ativa",
    usuarioId,
    assinaturaId,
    diasAntes: Number(diasAntes),
    horaNotificacao, // Salva o horário
  };

  if (canal === "email") {
    novaNotificacao.email = email;
  }

  if (onSalvar) {
    onSalvar(novaNotificacao);
  } else {
    dispatch(addNotificacao(novaNotificacao));
  }

  // Resetando os campos
  setTitulo("");
  setMensagem("");
  setCanal("app");
  setAssinaturaId("");
  setDiasAntes(1);
  setEmail("");
  setHoraNotificacao("09:00");

  onHide();
};

  return (
    <Modal show={show} onHide={onHide}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Nova Notificação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mensagem</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Assinatura</Form.Label>
            <Form.Select
              value={assinaturaId}
              onChange={(e) => setAssinaturaId(e.target.value)}
              required
            >
              <option value="">Selecione uma assinatura</option>
              {assinaturas.map((a) => (
                <option key={a._id} value={a._id}>
                  {a.nome}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Quantos dias antes da renovação avisar?</Form.Label>
            <Form.Control
              type="number"
              min={1}
              max={365}
              value={diasAntes}
              onChange={(e) => setDiasAntes(e.target.value)}
              required
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Horário da Notificação</Form.Label>
            <Form.Control
              type="time"
              value={horaNotificacao}
              onChange={e => setHoraNotificacao(e.target.value)}
              required
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Canal de Envio</Form.Label>
            <Form.Select
              value={canal}
              onChange={(e) => setCanal(e.target.value)}
              required
            >
              <option value="app">App</option>
              <option value="email">Email</option>
              <option value="sms">SMS</option>
            </Form.Select>
          </Form.Group>

          {canal === "email" && (
            <Form.Group className="mb-3">
              <Form.Label>E-mail para notificação</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </Form.Group>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" disabled={!assinaturaId || (canal === "email" && !email)}>
            Salvar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default NovaNotificacao;