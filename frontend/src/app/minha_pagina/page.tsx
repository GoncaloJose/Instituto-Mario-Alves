"use client";

import { useEffect, useState } from "react";
import { formataData } from "@/utils/formataData";
import { isToday } from "date-fns";
import { Tooltip } from 'react-tooltip';

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

  useEffect(() => {
    const usuarioId = Number(localStorage.getItem("client_key")); // 👈 ID do usuário logado

    async function getEmprestimos() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/emprestimos`);
        const dados = await response.json();
        const filtrados = dados.filter((item: Emprestimo) => item.usuarioId === usuarioId);
        setEmprestimos(filtrados);
      } catch (error) {
        console.error("Erro ao buscar empréstimos:", error);
      }
    }

    async function getReservas() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/reservas`);
        const dados = await response.json();
        const filtrados = dados.filter((item: Reserva) => item.usuarioId === usuarioId);
        setReservas(filtrados);
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
        setEmprestimos((emprestimos) =>
          emprestimos.filter((emprestimo) => emprestimo.id !== id)
        );
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
        setReservas((reservas) =>
          reservas.filter((reserva) => reserva.id !== id)
        );
        alert("Reserva excluída com sucesso!");
      } else {
        alert("Erro ao excluir a reserva.");
      }
    } catch (error) {
      console.error("Erro ao excluir reserva:", error);
      alert("Erro ao excluir reserva.");
    }
  }

  async function renovarEmprestimo(id: number, datadaEntrega: string) {
    try {
      const novaData = new Date(datadaEntrega);
      novaData.setDate(novaData.getDate() + 7);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/emprestimos/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ datadaEntrega: novaData.toISOString() }),
        }
      );

      if (response.ok) {
        setEmprestimos((emprestimos) =>
          emprestimos.map((emprestimo) =>
            emprestimo.id === id
              ? { ...emprestimo, datadaEntrega: novaData.toISOString() }
              : emprestimo
          )
        );
        alert("Empréstimo renovado com sucesso!");
      } else {
        alert("Erro ao renovar o empréstimo.");
      }
    } catch (error) {
      console.error("Erro ao renovar empréstimo:", error);
      alert("Erro ao renovar empréstimo.");
    }
  }

  return (
    <section className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col gap-6">
      <div className="w-full text-right">
      <a href="/pagamentos">
        Meus Pagamentos
      </a>
      </div>
      <div className="flex gap-6">
        <div className="w-1/2">
        
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Empréstimos
          </h1>
          {emprestimos.length > 0 ? (
            emprestimos.map((emprestimo) => (
              <div
                key={emprestimo.id}
                className="p-4 mb-4 border border-gray-300 rounded-lg bg-white shadow-lg"
              >
                <p className="text-lg font-semibold">📖 {emprestimo.titulo}</p>
                <p className="text-lg">🆔 Livro ID: {emprestimo.livroId}</p>
                <p className="text-lg">👤 Usuário ID: {emprestimo.usuarioId}</p>
                <p className="text-lg">
                  📅 Retirada: {formataData(emprestimo.datadaReserva.split("T")[0])}
                </p>
                <p className="text-lg">
                  📅 Entrega: {new Date(emprestimo.datadaEntrega).toLocaleDateString("pt-BR")}
                </p>

                <div className="mt-4 flex justify-end gap-4">
                  <button
                    disabled={!isToday(new Date(emprestimo.datadaEntrega))}
                    onClick={() => renovarEmprestimo(emprestimo.id, emprestimo.datadaEntrega)}
                    data-tooltip-hidden={isToday(emprestimo.datadaEntrega)}
                    data-tooltip-id="renovacao-emprestimo"
                    data-tooltip-content="Não disponivel. Somente na data de entrega"
                    className={`${!isToday(emprestimo.datadaEntrega)
                      ? 'bg-gray-300'
                      : 'bg-red-500 hover:bg-vermelho'} text-white px-4 py-2 rounded`}
                  >
                    Renovar Empréstimo
                  </button>
                  <Tooltip id="renovacao-emprestimo" />

                  <button
                    onClick={() => excluirEmprestimo(emprestimo.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-vermelho"
                  >
                    Excluir Empréstimo
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-lg font-semibold text-gray-700">
              Nenhum empréstimo encontrado.
            </p>
          )}
        </div>

        <div className="w-1/2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Reservas
          </h1>
          {reservas.length > 0 ? (
            reservas.map((reserva) => (
              <div
                key={reserva.id}
                className="p-4 mb-4 border border-gray-300 rounded-lg bg-white shadow-lg"
              >
                <p className="text-lg font-semibold">📖 {reserva.titulo}</p>
                <p className="text-lg">🆔 Livro ID: {reserva.livroId}</p>
                <p className="text-lg">👤 Usuário ID: {reserva.usuarioId}</p>
                <p className="text-lg">📅 Reserva: {formataData(reserva.datadaReserva)}</p>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => excluirReserva(reserva.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-800"
                  >
                    Excluir Reserva
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-lg font-semibold text-gray-700">
              Nenhuma reserva encontrada.
            </p>
          )}
        </div>
    </div>
    </section> 
  );
}