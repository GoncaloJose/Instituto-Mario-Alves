"use client";

import { useEffect, useState } from "react";
import { formataData } from "@/utils/formataData";
import { isToday } from "date-fns";
import { Tooltip } from 'react-tooltip';


type Pagamento = {
  id: number;
  valor: number;
  formaPagamento: string;
  dataPagamento: string;
  
};

export default function MeusPagamentos() {

  const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);

  useEffect(() => {
    const usuarioId = Number(localStorage.getItem("client_key")); // 👈 ID do usuário logado

    async function getPagamentos() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/pagamentos/${usuarioId}`);
        const dados = await response.json();
    
        setPagamentos(dados);
      } catch (error) {
        console.error("Erro ao buscar pagamentos:", error);
      }
    }

    getPagamentos();
  }, []);


  return (
    <section className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen flex gap-6">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Pagamentos
        </h1>
        {pagamentos.length > 0 ? (
            <table className="min-w-full mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <thead>
                    <tr>
                        <th className="px-6 py-3 border-b border-gray-200 dark:border-gray-700 text-left text-sm font-medium text-gray-900 dark:text-gray-100">ID</th>
                        <th className="px-6 py-3 border-b border-gray-200 dark:border-gray-700 text-left text-sm font-medium text-gray-900 dark:text-gray-100">Forma de Pagamento</th>
                        <th className="px-6 py-3 border-b border-gray-200 dark:border-gray-700 text-left text-sm font-medium text-gray-900 dark:text-gray-100">Valor (R$)</th>
                        <th className="px-6 py-3 border-b border-gray-200 dark:border-gray-700 text-right text-sm font-medium text-gray-900 dark:text-gray-100">Data do Pagamento</th>
                    </tr>
                </thead>
                <tbody>
                    
              {pagamentos.map((pagamento) => (
                <tr
                  key={pagamento.id}
                  className="p-4 mb-4 border border-gray-300 rounded-lg bg-white shadow-lg"
                >
                  <td className="p-4 text-lg font-semibold">📖 {pagamento.id}</td>
                  <td className="p-4 text-lg">👤 Forma do Pagamento: {pagamento.formaPagamento}</td>
                  <td className="p-4 text-lg">💰 Valor: R$ {pagamento.valor.toLocaleString("pt-BR")}</td>
                  <td className="p-4 text-lg text-right">
                    📅 Pagamento: {new Date(pagamento.dataPagamento).toLocaleDateString("pt-BR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-lg font-semibold text-gray-700">
            Nenhum pagamento encontrado.
          </p>
        )}
      </div>
    </section>
  );
}