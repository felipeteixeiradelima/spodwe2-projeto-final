function formatarDataISO(isoString) {
  const data = new Date(isoString);

  // Função auxiliar para adicionar o zero à esquerda quando o número for menor que 10
  const pad = (num) => String(num).padStart(2, "0");

  const dia = pad(data.getDate());
  const mes = pad(data.getMonth() + 1); // Janeiro é 0, então precisamos somar 1
  const ano = data.getFullYear();

  const horas = pad(data.getHours());
  const minutos = pad(data.getMinutes());
  const segundos = pad(data.getSeconds());

  return `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;
}

export default formatarDataISO;
