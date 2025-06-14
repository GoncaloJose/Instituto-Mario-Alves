export function formataData(dataISO) {

    // Extraindo apenas ano, mês e dia
    const [ano, mes, dia] = dataISO.split("T")[0].split("-");

    // Criando um Date no formato local, sem ajuste de fuso horário
    const dataSemTimezone = new Date(Number(ano), Number(mes) - 1, Number(dia));

    return dataSemTimezone.toLocaleDateString("pt-BR"); // ✅ "14/06/2025"
}