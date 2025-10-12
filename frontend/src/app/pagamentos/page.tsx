"use client";

import { useEffect, useState } from "react";
// As duas importações abaixo não estão sendo usadas, mas mantive caso precise delas.
import { formataData } from "@/utils/formataData";
import { isToday } from "date-fns";
import { Tooltip } from "react-tooltip";

// 1. Corrigido o type Pagamento para usar 'pago: boolean' como no banco de dados.
type Pagamento = {
  id: number;
  valor: number;
  formaPagamento: string;
  dataPagamento: string;
  pago: boolean; // Alterado de 'pagarMensal: number' para 'pago: boolean'
};

// Define o formato para os meses que vamos gerar dinamicamente
type PagamentoFuturo = {
  mes: string;
  ano: number;
  id: string; 
};

// 2. Corrigido o Componente BotaoStatusPagamento para usar 'pago'
const BotaoStatusPagamento = ({
  pagamento,
  onPagar,
}: {
  pagamento: Pagamento;
  onPagar: (id: number) => void;
}) => {
  const dataAtual = new Date();
  const dataPagamento = new Date(pagamento.dataPagamento);

  const primeiroDiaMesPagamento = new Date(
    dataPagamento.getFullYear(),
    dataPagamento.getMonth(),
    1
  );
  const primeiroDiaMesAtual = new Date(
    dataAtual.getFullYear(),
    dataAtual.getMonth(),
    1
  );

  // Lógica agora usa 'pagamento.pago' que é um boolean
  if (pagamento.pago || primeiroDiaMesPagamento < primeiroDiaMesAtual) {
    return (
      <button
        className="bg-green-500 text-white font-bold py-2 px-4 rounded cursor-not-allowed opacity-70"
        disabled
      >
        Pago
      </button>
    );
  }

  return (
    <button
      onClick={() => onPagar(pagamento.id)}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
    >
      Pagar
    </button>
  );
};

// A função que gera os meses futuros (mantida sem alterações)
const gerarProximosMeses = (): PagamentoFuturo[] => {
  const mesesGerados: PagamentoFuturo[] = [];
  const dataAtual = new Date();
  const mesAtual = dataAtual.getMonth(); // 0 = Janeiro, 11 = Dezembro
  const anoAtual = dataAtual.getFullYear();

  const nomesDosMeses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  if (mesAtual === 0) { // Se for Janeiro, gera o ano todo
    for (let i = 0; i < 12; i++) {
      mesesGerados.push({ mes: nomesDosMeses[i], ano: anoAtual, id: `${anoAtual}-${i}` });
    }
  } else { // Senão, gera só os meses restantes
    for (let i = mesAtual + 1; i < 12; i++) {
      mesesGerados.push({ mes: nomesDosMeses[i], ano: anoAtual, id: `${anoAtual}-${i}` });
    }
  }
  return mesesGerados;
};


// --- Componente Principal da Página ---
export default function MeusPagamentos() {
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
  const [pagamentosFuturos, setPagamentosFuturos] = useState<PagamentoFuturo[]>([]);

  useEffect(() => {
    const usuarioId = Number(localStorage.getItem("client_key"));
    async function getPagamentos() {
      try {
        // --- ALTERAÇÃO PRINCIPAL AQUI ---
        // A URL foi corrigida para usar a nova rota da API
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL_API}/pagamentos/usuario/${usuarioId}` 
        );
        // --- FIM DA ALTERAÇÃO PRINCIPAL ---

        if (!response.ok) {
            setPagamentos([]);
            return;
        }
        const dados = await response.json();
        setPagamentos(dados);
      } catch (error) {
        console.error("Erro ao buscar pagamentos:", error);
        setPagamentos([]);
      }
    }
    if (usuarioId) {
      getPagamentos();
    }

    const mesesParaGerar = gerarProximosMeses();
    setPagamentosFuturos(mesesParaGerar);
  }, []);

  const handlePagar = (pagamentoId: number) => {
    alert(`Iniciando processo de pagamento para o ID: ${pagamentoId}`);
  };

  const handleVerFatura = (pagamentoId: number) => {
    alert(`Exibindo detalhes da fatura ID: ${pagamentoId}`);
  };

  const handleGerarPagamentoFuturo = async (pagamento: PagamentoFuturo, event: React.MouseEvent<HTMLButtonElement>) => {
    const usuarioId = localStorage.getItem("client_key");
    if (!usuarioId) {
      alert("Erro: ID do usuário não encontrado. Faça login novamente.");
      return;
    }

    const nomesDosMeses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const mesNumero = nomesDosMeses.indexOf(pagamento.mes);

    if (mesNumero === -1) {
      alert("Erro interno: Mês inválido.");
      return;
    }
    
    const botao = event.currentTarget;
    botao.innerText = "Gerando...";
    botao.disabled = true;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/pagamentos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mes: mesNumero,
          ano: pagamento.ano,
          usuarioId: Number(usuarioId),
        }),
      });

      const resultado = await response.json();

      if (response.ok) {
        alert(`Fatura para ${pagamento.mes}/${pagamento.ano} gerada com sucesso!`);
        window.location.reload();
      } else {
        alert(`Erro: ${resultado.erro}`);
        botao.innerText = "Gerar Fatura";
        botao.disabled = false;
      }
    } catch (error) {
      alert("Erro de conexão. Não foi possível gerar a fatura.");
      botao.innerText = "Gerar Fatura";
      botao.disabled = false;
    }
  };

  return (
    <section className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Histórico de Pagamentos
        </h1>
        {pagamentos.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">ID</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">Forma de Pagamento</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">Valor</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">Data de Vencimento</th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-gray-900 dark:text-gray-100">Ações</th>
                </tr>
              </thead>
              <tbody>
                {pagamentos.map((pagamento) => (
                  <tr key={pagamento.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{pagamento.id}</td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{pagamento.formaPagamento}</td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{pagamento.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{new Date(pagamento.dataPagamento).toLocaleDateString("pt-BR", { timeZone: "UTC" })}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-4">
                        <BotaoStatusPagamento pagamento={pagamento} onPagar={handlePagar} />
                        <button onClick={() => handlePagar(pagamento.id)} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" title="Pagar agora">Pagar</button>
                        <button onClick={() => handleVerFatura(pagamento.id)} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded" title="Ver todos os pagamentos">Ver Pagtos</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Nenhum pagamento encontrado no histórico.
          </p>
        )}

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Gerar Próximos Pagamentos
          </h2>
          {pagamentosFuturos.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">Mês</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">Ano</th>
                    <th className="px-6 py-3 text-center text-sm font-medium text-gray-900 dark:text-gray-100">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {pagamentosFuturos.map((pagamento) => (
                    <tr key={pagamento.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{pagamento.mes}</td>
                      <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{pagamento.ano}</td>
                      <td className="px-6 py-4 text-center">
                        <button onClick={(e) => handleGerarPagamentoFuturo(pagamento, e)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-wait">
                          Gerar Fatura
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Não há novos pagamentos a serem gerados para este ano.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}