export const formatarData = (dataISO) => {
  try {
    const data = new Date(dataISO);
    if (isNaN(data.getTime())) return "Data inválida";
    
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } catch {
    return "Data inválida";
  }
};

export const formatarMoeda = (valor) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor || 0);
};

export const formatarFrequencia = (frequencia) => {
  const map = {
    mensal: 'Mensal',
    trimestral: 'Trimestral',
    semestral: 'Semestral',
    anual: 'Anual',
    semanal: 'Semanal'
  };
  return map[frequencia] || frequencia;
};

// Adicione estas funções ao seu arquivo de utilitários
export const formatarMetodoPagamento = (metodo) => {
  const metodos = {
    credito: "Cartão de Crédito",
    debito: "Cartão de Débito",
    boleto: "Boleto",
    pix: "PIX"
  };
  return metodos[metodo] || metodo;
};

export const formatarNotificacao = (tipo) => {
  const tipos = {
    email: "E-mail",
    sms: "SMS",
    app: "Notificação no App",
    nenhuma: "Sem notificação"
  };
  return tipos[tipo] || tipo;
};