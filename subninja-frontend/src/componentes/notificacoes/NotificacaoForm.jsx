import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNotificacao } from "./notificacoesThunks";

export default function NotificacaoForm() {
  const dispatch = useDispatch();
  const [titulo, setTitulo] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addNotificacao({ titulo, mensagem }));
    setTitulo("");
    setMensagem("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={titulo} onChange={e => setTitulo(e.target.value)} placeholder="Título" required />
      <input value={mensagem} onChange={e => setMensagem(e.target.value)} placeholder="Mensagem" required />
      <button type="submit">Criar Notificação</button>
    </form>
  );
}