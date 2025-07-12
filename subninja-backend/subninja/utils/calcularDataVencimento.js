//utils/calcularDataVencimento.js
function calcularDataVencimento(dataAssinatura, frequencia) {
  const data = new Date(dataAssinatura);
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
}

module.exports = calcularDataVencimento;