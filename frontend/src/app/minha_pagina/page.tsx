"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type Emprestimo = {
  id: number;
  livroId: number;
  usuarioId: number;
  titulo: string;
  datadaReserva: string;
  datadaEntrega: string;
  status: string;
};

type Reserva = {
  id: number;
  livroId: number;
  usuarioId: number;
  titulo: string;
  datadaReserva: string;
};

export default function MinhaPagina() {
  const [emprestimos, setEmprestimos] = useState<Emprestimo[]>([]);
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    async function getEmprestimos() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/emprestimos`);
        const dados = await response.json();
        setEmprestimos(dados);
      } catch (error) {
        console.error("Erro ao buscar empréstimos:", error);
      }
    }

    async function getReservas() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/reservas`);
        const dados = await response.json();
        setReservas(dados);
      } catch (error) {
        console.error("Erro ao buscar reservas:", error);
      }
    }

    getEmprestimos();
    getReservas();
  }, []);

  async function excluirEmprestimo(id: number) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/emprestimos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setEmprestimos((emprestimos) => emprestimos.filter((emprestimo) => emprestimo.id !== id));
        alert("Empréstimo excluído com sucesso!");
      } else {
        alert("Erro ao excluir o empréstimo.");
      }
    } catch (error) {
      console.error("Erro ao excluir empréstimo:", error);
      alert("Erro ao excluir empréstimo.");
    }
  }

  async function excluirReserva(id: number) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/reservas/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setReservas((reservas) => reservas.filter((reserva) => reserva.id !== id));
        alert("Reserva excluída com sucesso!");
      } else {
        alert("Erro ao excluir a reserva.");
      }
    } catch (error) {
      console.error("Erro ao excluir reserva:", error);
      alert("Erro ao excluir reserva.");
    }
  }

  return (
    <section className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen flex gap-6">
      
      <div className="w-1/2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Empréstimos</h1>
        {emprestimos.length > 0 ? (
          emprestimos.map((emprestimo) => (
            <div key={emprestimo.id} className="p-4 mb-4 border border-gray-300 rounded-lg bg-white shadow-lg">
              <p className="text-lg font-semibold">📖 {emprestimo.titulo}</p>
              <p className="text-lg">🆔 Livro ID: {emprestimo.livroId}</p>
              <p className="text-lg">👤 Usuário ID: {emprestimo.usuarioId}</p>
              <p className="text-lg">📅 Retirada: {new Date(emprestimo.datadaReserva).toLocaleDateString("pt-BR")}</p>
              <p className="text-lg">📅 Entrega: {new Date(emprestimo.datadaEntrega).toLocaleDateString("pt-BR")}</p>

              
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => excluirEmprestimo(emprestimo.id)}
                  className="bg-vermelho text-white px-4 py-2 rounded hover:bg-red-800"
                >
                  Excluir Empréstimo
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-lg font-semibold text-gray-700">Nenhum empréstimo encontrado.</p>
        )}
      </div>

      
      <div className="w-1/2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reservas</h1>
        {reservas.length > 0 ? (
          reservas.map((reserva) => (
            <div key={reserva.id} className="p-4 mb-4 border border-gray-300 rounded-lg bg-white shadow-lg">
              <p className="text-lg font-semibold">📖 {reserva.titulo}</p>
              <p className="text-lg">🆔 Livro ID: {reserva.livroId}</p>
              <p className="text-lg">👤 Usuário ID: {reserva.usuarioId}</p>
              <p className="text-lg">📅 Reserva: {new Date(reserva.datadaReserva).toLocaleDateString("pt-BR")}</p>

              
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => excluirReserva(reserva.id)}
                  className="bg-vermelho text-white px-4 py-2 rounded hover:bg-red-800"
                >
                  Excluir Reserva
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-lg font-semibold text-gray-700">Nenhuma reserva encontrada.</p>
        )}
      </div>
    </section>
  );
}