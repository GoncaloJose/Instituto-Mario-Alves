"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type Emprestimo = {
  id: number;
  livroId: number;
  usuarioId: number;
  titulo: string;
  datadaReserva: string;
  renovacoes: number;
  status: string;
};

export default function Emprestimo() {
  const [emprestimos, setEmprestimos] = useState<Emprestimo[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    async function getReservas() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/reservas`);
        const dados = await response.json();
        setEmprestimos(dados);
        
      } catch (error) {
        console.error("Erro ao buscar reservas:", error);
      }
    }

    getReservas();
  }, []);

  
  async function excluirReserva(id: number) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/reservas/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setEmprestimos((emprestimos) => emprestimos.filter((emprestimo) => emprestimo.id !== id));
      } else {
        alert("Erro ao excluir a reserva.");
      }
    } catch (error) {
      console.error("Erro ao excluir reserva:", error);
      alert("Erro ao excluir reserva.");
    }
  }

  return (
    <section className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
        Detalhes do Empréstimo
      </h1>

      {emprestimos.length > 0 ? (
        emprestimos.map((emprestimo) => (
          <div key={emprestimo.id} className="p-4 mb-4 border border-gray-300 rounded-lg bg-white shadow-lg relative">
            <p className="text-lg font-semibold text-left ml-10">📖 Título: {emprestimo.titulo}</p>
            <p className="text-lg font-semibold text-left ml-10">🆔 ID do Livro: {emprestimo.livroId}</p>
            <p className="text-lg font-semibold text-left ml-10">👤 ID do Usuário: {emprestimo.usuarioId}</p>
            <p className="text-lg font-semibold text-left ml-10">📅 Data da Reserva: {emprestimo.datadaReserva}</p>

       
            <button
              onClick={() => excluirReserva(emprestimo.id)}
              className="absolute bottom-4 right-4 bg-vermelho text-white text-sm px-3 py-2 rounded-lg hover:bg-red-800"
            >
              Excluir
            </button>
          </div>
        ))
      ) : (
        <p className="text-lg font-semibold text-center text-gray-700">Nenhuma reserva encontrada.</p>
      )}
    </section>
  );
}