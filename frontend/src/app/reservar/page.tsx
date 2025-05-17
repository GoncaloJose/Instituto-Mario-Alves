"use client";

import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useUsuarioStore } from "@/context/usuario";
import { useState, useEffect } from "react";
import Link from "next/link";

type Inputs = {
  livroId: number;
  usuarioId: number;
  datadaReserva: string;
  titulo: string;
};

export default function Reservar() {
  const { register, handleSubmit, setValue } = useForm<Inputs>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { usuario } = useUsuarioStore();
  const [mensagemSucesso, setMensagemSucesso] = useState<string | null>(null);

  useEffect(() => {
    const livroId = searchParams?.get("livroId");

    if (livroId) {
      async function getLivro() {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_URL_API}/livros/${livroId}`
          );
          const livro = await response.json();
          setValue("livroId", livro.id);
          setValue("titulo", livro.titulo);
        } catch (error) {
          console.error("Erro ao buscar informações do livro:", error);
        }
      }
      getLivro();
    }

    if (usuario?.id) {
      setValue("usuarioId", usuario.id);
    }
  }, [usuario, searchParams, setValue]);

  async function verificaReserva(data: Inputs) {
    data.usuarioId = usuario?.id || 0;
    data.datadaReserva = new Date(data.datadaReserva)
      .toISOString()
      .split("T")[0];

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/reservas`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(data),
        }
      );

      if (response.status === 201) {
        setMensagemSucesso("Reserva realizada com sucesso!");
        setTimeout(() => {
          setMensagemSucesso(null);
          router.push(
            `/minha_pagina?livroId=${data.livroId}&titulo=${encodeURIComponent(
              data.titulo
            )}&usuarioId=${data.usuarioId}&datadaReserva=${data.datadaReserva}`
          );
        }, 2000);
      } else {
        alert("Erro... Verifique os dados preenchidos.");
      }
    } catch (error) {
      alert("Erro ao se comunicar com o servidor. Tente novamente.");
    }
  }

  useEffect(() => {
    setValue("datadaReserva", new Date().toISOString().split("T")[0]);
  }, [setValue]);

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="flex flex-row items-center justify-center bg-white rounded-lg shadow dark:border sm:max-w-4xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-5">
          <img className="h-150 w-150" src="./livro2.jpg" alt="logo" />
        </div>

        <div className="w-full p-6">
          <h1 className="text-black text-3xl text-center mb-4">Reservar</h1>

          {mensagemSucesso && (
            <div className="mb-4 p-4 text-green-700 bg-green-100 rounded">
              {mensagemSucesso}
            </div>
          )}

          <form className="mt-5" onSubmit={handleSubmit(verificaReserva)}>
            <div className="mb-5">
              <label
                htmlFor="clienteId"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                ID do Cliente
              </label>
              <input
                type="number"
                id="clienteId"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Id do Cliente"
                {...register("usuarioId")}
                disabled
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="livroId"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                ID do Livro
              </label>
              <input
                type="number"
                id="livroId"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Digite o ID do livro"
                {...register("livroId")}
                required
              />
            </div>

            <div className="mb-5">
              <input
                type="text"
                id="titulo"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Título do Livro"
                {...register("titulo")}
                required
              />
            </div>

            <div className="mb-5">
              <input
                type="date"
                id="datadaReserva"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Data da Reserva"
                {...register("datadaReserva")}
                required
              />
            </div>

            <button
              type="submit"
              className="align-middle inline-flex items-center justify-center text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-inter rounded-lg text-semibold px-5 py-2.5"
            >
              Confirmar Reserva
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
