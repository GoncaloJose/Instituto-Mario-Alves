"use client";

import { useEffect, useState } from "react";
import { formataData } from "@/utils/formataData";
import { isToday } from "date-fns";
import { Tooltip } from "react-tooltip";
import { useUsuarioStore } from "@/context/usuario";
import { EmprestimoI } from "@/types/emprestimo";
import { toast } from "sonner";

type Reserva = {
  id: number;
  livroId: number;
  usuarioId: number;
  titulo: string;
  datadaReserva: string;
};

export default function MinhaPagina() {
  const [emprestimos, setEmprestimos] = useState<EmprestimoI[]>([]);
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const { usuario } = useUsuarioStore();

  useEffect(() => {
    async function getEmprestimos() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL_API}/emprestimos`
        );

        const dados = await response.json();
        const filtrados = dados.filter(
          (item: EmprestimoI) => item.usuarioId === usuario.id
        ).sort((a: EmprestimoI, b: EmprestimoI) => new Date(b.datadaReserva).getTime() - new Date(a.datadaReserva).getTime());

        setEmprestimos(filtrados);
      } catch (error) {
        console.error("Erro ao buscar empréstimos:", error);
      }
    }

    async function getReservas() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL_API}/reservas`
        );
        const dados = await response.json();
        const filtrados = dados.filter(
          (item: Reserva) => item.usuarioId === usuario.id
        );

        setReservas(filtrados);
      } catch (error) {
        console.error("Erro ao buscar reservas:", error);
      }
    }

  if (usuario) {
    getEmprestimos();
    getReservas();
  }
  }, [usuario]);

  async function excluirReserva(id: number) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/reservas/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setReservas((reservas) =>
          reservas.filter((reserva) => reserva.id !== id)
        );

        toast.success("Reserva excluída com sucesso!");
      } else {
        toast.error("Erro ao excluir a reserva.");
      }
    } catch (error) {
      console.error("Erro ao excluir reserva:", error);
      toast.error("Erro ao excluir reserva.");
    }
  }

  async function renovarEmprestimo(emprestimo: EmprestimoI) {
    if (emprestimo.status != "RETORNADO") {
      try {
        const novaData = new Date(emprestimo.datadaEntrega);
        novaData.setDate(novaData.getDate() + 7);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL_API}/emprestimos/${emprestimo.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              datadaEntrega: novaData.toISOString()
            }),
          }
        );

        if (response.ok) {
          setEmprestimos((emprestimos) =>
            emprestimos.map((e) =>
              e.id === emprestimo.id
              ? { ...e, datadaEntrega: novaData.toISOString() }
              : e
            )
          );

          toast.success("Empréstimo renovado com sucesso!");
        } else {
          toast.error("Erro ao renovar o empréstimo.");
        }
      } catch (error) {
        console.error("Erro ao renovar empréstimo:", error);
        toast.error("Erro ao renovar empréstimo.");
      }
    }
  }

  const textoTooltip = (emprestimo) => {
    return {
      'LOCADO': "Renovação disponível somente na data de entrega.",
      'RETORNADO': "Empréstimo já foi retornado."
    }[emprestimo.status];
  }

  return (
    <section className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col gap-6">
      <div className="w-full text-right">
        <a
          href="/pagamentos"
          className="text-gray-700 hover:text-red-600 font-medium transition-colors duration-200"
        >
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
        {(emprestimo.status === "RETORNADO") && (
          <p className="text-lg font-semibold text-green-600">✅ Retornado</p>
        )}
                <p className="text-lg">🆔 Livro ID: {emprestimo.livroId}</p>
                <p className="text-lg">👤 Usuário ID: {emprestimo.usuarioId}</p>
                <p className="text-lg">
                  📅 Retirada:{" "}
                  {formataData(emprestimo.datadaReserva.split("T")[0])}
                </p>
                <p className="text-lg">
                  📅 Entrega:{" "}
                  {new Date(emprestimo.datadaEntrega).toLocaleDateString(
                    "pt-BR"
                  )}
                </p>

                <div className="mt-4 flex justify-end gap-4">
                  <button
                    disabled={!isToday(new Date(emprestimo.datadaEntrega)) && emprestimo.status != "RETORNADO"}
                    onClick={() =>
                      renovarEmprestimo(emprestimo)
                    }
                    data-tooltip-hidden={isToday(emprestimo.datadaEntrega) && emprestimo.status != "RETORNADO"}
                    data-tooltip-id="renovacao-emprestimo"
                    data-tooltip-content={textoTooltip(emprestimo)}
                    className={`${
                      isToday(emprestimo.datadaEntrega) && emprestimo.status != "RETORNADO"
            ? "bg-red-500 hover:bg-vermelho"
                        : "bg-gray-300"
                    } text-white px-4 py-2 rounded`}
                  >
                    Renovar Empréstimo
                  </button>
                  <Tooltip id="renovacao-emprestimo" />


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
                <p className="text-lg">
                  📅 Reserva: {formataData(reserva.datadaReserva)}
                </p>

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
