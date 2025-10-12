"use client";

import { useEffect, useState } from "react";
// As duas importações abaixo não estão sendo usadas, mas mantive caso precise delas.
import { formataData } from "@/utils/formataData";
import { isToday } from "date-fns";
import { Tooltip } from "react-tooltip";

type Pagamento = {
  id: number;
  valor: number;
  formaPagamento: string;
  dataPagamento: string;
  pagarMensal: number; // Assumindo que 1 = pago, 0 = pendente
};

// --- Componente para o Botão Dinâmico (COM A LÓGICA ALTERADA) ---
const BotaoStatusPagamento = ({
  pagamento,
  onPagar,
}: {
  pagamento: Pagamento;
  onPagar: (id: number) => void;
}) => {
  const dataAtual = new Date();
  const dataPagamento = new Date(pagamento.dataPagamento);

  // Zera o dia para comparar apenas o mês e o ano
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

  // --- ALTERAÇÃO PRINCIPAL ---
  // A nova condição verifica DUAS coisas:
  // 1. Se o pagamento já está marcado como pago (pagarMensal === 1)
  // OU
  // 2. Se o mês do pagamento é anterior ao mês atual.
  // Se qualquer uma for verdade, o status será "Pago".
  if (pagamento.pagarMensal === 1 || primeiroDiaMesPagamento < primeiroDiaMesAtual) {
    return (
      <button
        className="bg-green-500 text-white font-bold py-2 px-4 rounded cursor-not-allowed opacity-70"
        disabled
      >
        Pago
      </button>
    );
  }

  // Se a condição acima for falsa, significa que o pagamento é do mês atual ou de um mês futuro
  // e ainda não foi pago. Nesse caso, mostramos o botão para "Pagar".
  return (
    <button
      onClick={() => onPagar(pagamento.id)}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
    >
      Pagar
    </button>
  );
};


// --- Componente Principal da Página (não foi alterado) ---
export default function MeusPagamentos() {
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);

  useEffect(() => {
    const usuarioId = Number(localStorage.getItem("client_key")); // 👈 ID do usuário logado

    async function getPagamentos() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL_API}/pagamentos/${usuarioId}`
        );
        const dados = await response.json();
        setPagamentos(dados);
      } catch (error) {
        console.error("Erro ao buscar pagamentos:", error);
      }
    }
    if (usuarioId) {
      getPagamentos();
    }
  }, []);

  // Função para lidar com a ação de pagar
  const handlePagar = (pagamentoId: number) => {
    alert(`Iniciando processo de pagamento para o ID: ${pagamentoId}`);
    // Aqui você pode adicionar a lógica para redirecionar para o checkout,
    // abrir um modal de pagamento, etc.
  };

  // Função para lidar com a ação de ver fatura
  const handleVerFatura = (pagamentoId: number) => {
    alert(`Exibindo detalhes da fatura ID: ${pagamentoId}`);
    // Lógica para mostrar detalhes da fatura
  };

  return (
    <section className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Pagamentos
        </h1>
        {pagamentos.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">
                    Forma de Pagamento
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">
                    Valor
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">
                    Data de Vencimento
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-gray-900 dark:text-gray-100">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {pagamentos.map((pagamento) => (
                  <tr
                    key={pagamento.id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-200">
                      {pagamento.id}
                    </td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-200">
                      {pagamento.formaPagamento}
                    </td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-200">
                      {pagamento.valor.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-200">
                      {new Date(pagamento.dataPagamento).toLocaleDateString(
                        "pt-BR",
                        { timeZone: "UTC" }
                      )}
                    </td>
                    {/* CÉLULA CORRIGIDA com os dois botões */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-4">
                        {/* Botão de Ação Principal (dinâmico) */}
                        <BotaoStatusPagamento
                          pagamento={pagamento}
                          onPagar={handlePagar}
                        />

                        {/* Botão de Ação Secundário (Pagar - exemplo) */}
                        <button
                          onClick={() => handlePagar(pagamento.id)} // Alterado para handlePagar
                          className="bg-green-700 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                          title="Pagar agora"
                        >
                          Pagar
                        </button>                      
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Nenhum pagamento encontrado.
          </p>
        )}
      </div>
    </section>
  );
}