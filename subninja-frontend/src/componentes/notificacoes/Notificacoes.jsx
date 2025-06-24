import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchNotificacoes,
  addNotificacao,
  updateNotificacao,
  deleteNotificacao,
} from "./notificacoesThunks";
import NovaNotificacao from "./NovaNotificacao";
import EditarNotificacao from "./EditarNotificacao";
import ExcluirNotificacao from "./ExcluirNotificacao";
import { Button, Table, Spinner, Alert } from "react-bootstrap";

const Notificacoes = () => {
  const dispatch = useDispatch();
  const { itens, status, error } = useSelector((state) => state.notificacoes);

  const [showNova, setShowNova] = useState(false);
  const [showEditar, setShowEditar] = useState(false);
  const [showExcluir, setShowExcluir] = useState(false);
  const [notificacaoSelecionada, setNotificacaoSelecionada] = useState(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchNotificacoes());
    }
  }, [dispatch, status]);

  const handleNova = (dados) => {
    dispatch(addNotificacao(dados));
    setShowNova(false);
  };

  const handleEditar = (dados) => {
    dispatch(updateNotificacao(dados));
    setShowEditar(false);
    setNotificacaoSelecionada(null);
  };

  const handleExcluir = () => {
    dispatch(deleteNotificacao(notificacaoSelecionada._id));
    setShowExcluir(false);
    setNotificacaoSelecionada(null);
  };

  if (status === "loading") return <Spinner animation="border" className="m-4" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="container py-4">
      <Button className="mb-3" onClick={() => setShowNova(true)}>
        Nova Notificação
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Título</th>
            <th>Mensagem</th>
            <th>Data Programada</th>
            <th>Status</th>
            <th>Canal</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {itens.map((n) => (
            <tr key={n._id}>
              <td>{n.titulo}</td>
              <td>{n.mensagem}</td>
              <td>{new Date(n.data_envio_programada).toLocaleString()}</td>
              <td>{n.status}</td>
              <td>{n.canal}</td>
              <td>
                <Button
                  size="sm"
                  variant="warning"
                  className="me-2"
                  onClick={() => {
                    setNotificacaoSelecionada(n);
                    setShowEditar(true);
                  }}
                >
                  Editar
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => {
                    setNotificacaoSelecionada(n);
                    setShowExcluir(true);
                  }}
                >
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <NovaNotificacao
        show={showNova}
        onHide={() => setShowNova(false)}
        onSalvar={handleNova}
      />

      <EditarNotificacao
        show={showEditar}
        onHide={() => {
          setShowEditar(false);
          setNotificacaoSelecionada(null);
        }}
        onSubmit={handleEditar}
        notificacao={notificacaoSelecionada}
      />

      <ExcluirNotificacao
        show={showExcluir}
        onHide={() => {
          setShowExcluir(false);
          setNotificacaoSelecionada(null);
        }}
        onConfirm={handleExcluir}
        notificacao={notificacaoSelecionada}
      />
    </div>
  );
};

export default Notificacoes;