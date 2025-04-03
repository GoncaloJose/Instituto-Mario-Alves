"use client";

import { useEffect, useState } from "react";
import { useUsuarioStore } from "@/context/usuario";
import Link from "next/link";
import axios from "axios";

type Emprestimo = {
  id: number;
  livroId: number;
  usuarioId: number;
  titulo: string;
  datadaReserva: Date;
  datadaEntrega: Date;
  renovacoes: number;
  status: string;
};

export default function Emprestimo() {
  const [emprestimos, setEmprestimos] = useState<Emprestimo[]>([]);
  const { usuario } = useUsuarioStore(); // Obtém o cliente logado do contexto

  useEffect(() => {
    async function getEmprestimos() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/emprestimos`
      );
      const dados = await response.json();

      // Filtra empréstimos do cliente logado
      const emprestimosUsuario = dados.filter(
        (emprestimo: Emprestimo) => emprestimo.usuarioId === usuario?.id
      );
      setEmprestimos(emprestimosUsuario);
    }
    getEmprestimos();
  }, [usuario]);

  // Função para cancelar a reserva
  const cancelarReserva = async (id: number) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_URL_API}/reservas/${id}`
      );
      if (response.status === 200) {
        alert("Reserva cancelada com sucesso!");
        // Atualizar a lista de empréstimos após o cancelamento
        setEmprestimos((emprestimos) =>
          emprestimos.filter((emprestimo) => emprestimo.id !== id)
        );
      } else {
        alert("Erro ao cancelar a reserva.");
      }
    } catch (error) {
      console.error("Erro ao cancelar a reserva:", error);
      alert("Erro ao cancelar a reserva.");
    }
  };

  return (
    <>
      <section className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Reservas do Usuário:
          </h1>
          <Link
            href="/locacoes"
            className="align-middle inline-flex items-center justify-center text-white bg-red-700 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-inter rounded-lg text-semibold px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
          >
            Locações
          </Link>
          <Link
            href="/reservar"
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Voltar
          </Link>
        </div>

        <div
          id="alert-additional-content-3"
          className="p-4 mb-4 text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
          role="alert"
        >
          <div className="flex items-center">
            <svg
              className="shrink-0 w-4 h-4 me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <h3 className="text-lg font-medium">
              Retirada dos Livros na Biblioteca IMA.
            </h3>
          </div>
          <div className="mt-2 mb-4 text-sm">
            Mais informações sobre como retirar o livro podem ser encontradas
            aqui.
          </div>
          <div className="flex">
            <Link
              href="/contato"
              className="text-white bg-green-800 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              <svg
                className="me-2 h-3 w-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0C6.14 0 3 3.14 3 7c0 6.15 7 13 7 13s7-6.85 7-13c0-3.86-3.14-7-7-7Zm0 9.5A2.5 2.5 0 1 1 10 4a2.5 2.5 0 0 1 0 5Z" />
              </svg>
              Endereço
            </Link>

            <Link
              href="/contato"
              className="text-green-800 bg-transparent border border-green-800 hover:bg-green-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-green-600 dark:border-green-600 dark:text-green-400 dark:hover:text-white dark:focus:ring-green-800"
              data-dismiss-target="#alert-additional-content-3"
              aria-label="Close"
            >
              Contato
            </Link>
          </div>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Título do Livro</th>
                <th scope="col" className="px-6 py-3">Id do Livro</th>
                <th scope="col" className="px-6 py-3">Id do Cliente</th>
                <th scope="col" className="px-6 py-3">Data da Reserva</th>
                <th scope="col" className="px-6 py-3">Data da Entrega</th>
                <th scope="col" className="px-6 py-3">Reserva</th>
              </tr>
            </thead>
            <tbody>
              {emprestimos.map((emprestimo, index) => (
                <tr
                  key={index}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {emprestimo.titulo}
                  </td>
                  <td className="px-6 py-4">{emprestimo.livroId}</td>
                  <td className="px-6 py-4">{emprestimo.usuarioId}</td>
                  <td className="px-6 py-4">
                    {new Date(emprestimo.datadaReserva).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(emprestimo.datadaEntrega).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      type="button"
                      className="font-medium text-red-600 hover:underline"
                      onClick={() => cancelarReserva(emprestimo.id)}
                    >
                      Cancelar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

