// Formata valor para exibição (1234.56 → "1.234,56")
export const formatarMoeda = (valor, incluirSimbolo = true) => {
  const valorNumerico = typeof valor === 'string' 
    ? parseFloat(valor.replace(/[^\d,-]/g, '').replace(',', '.')) 
    : Number(valor) || 0;
  
  return new Intl.NumberFormat('pt-BR', {
    style: incluirSimbolo ? 'currency' : 'decimal',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(valorNumerico);
};

// Formata data para input type="date" (YYYY-MM-DD)
export const formatarDataParaInput = (data) => {
  if (!data) return '';
  const dateObj = new Date(data);
  if (isNaN(dateObj.getTime())) return '';
  
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

// Formata frequência para exibição
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

// Formata método de pagamento para exibição
export const formatarMetodoPagamento = (metodo) => {
  const metodos = {
    credito: 'Cartão de Crédito',
    debito: 'Cartão de Débito',
    boleto: 'Boleto',
    pix: 'PIX'
  };
  return metodos[metodo] || metodo;
};

// Calcula data de vencimento (mesma função usada no backend)
export const calcularDataVencimento = (dataAssinatura, frequencia) => {
  const data = new Date(dataAssinatura);
  
  // Verifica se a data é válida
  if (isNaN(data.getTime())) {
    throw new Error('Data de assinatura inválida');
  }

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
      throw new Error('Frequência inválida');
  }

  return data.toISOString();
};