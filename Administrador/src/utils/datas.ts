import { isBefore, sub } from "date-fns";

const verificaData = (data : string) => {
  const hoje = new Date();
  const dataVerificada = new Date(data);
  return dataVerificada >= hoje;
}

const mensalidadeExpirou = (data : string) => {
  const hoje = new Date();
  const dataVerificada = new Date(data);
  const umMesAtras = sub(hoje, { months: 1 });
  return isBefore(umMesAtras, dataVerificada);
}

const devolucaoLivro = (data : string) => {
  const hoje = new Date();
  const dataVerificada = new Date(data);
  const umSemanaAtras = sub(hoje, { weeks: 1 });
  return isBefore(umSemanaAtras, dataVerificada);
}

export { verificaData, mensalidadeExpirou, devolucaoLivro } 