"use client";

// 1. Importe 'useWatch' e 'control'
import { useForm, useWatch } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useUsuarioStore } from "@/context/usuario";
import { useState, useEffect } from "react";
import Link from "next/link";

type Inputs = {
  livroId: number;
  usuarioId: number;
  datadaReserva: string;
  datadaEntrega: string; // Adicionei esta data que estava faltando no seu type
  titulo: string;
};

export default function Reservar() {
  // 2. Adicione 'control' ao useForm
  const { register, handleSubmit, setValue, control } = useForm<Inputs>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { usuario } = useUsuarioStore();
  const [mensagemSucesso, setMensagemSucesso] = useState<string | null>(null);

  // 3. Adicione os novos estados para o bloqueio
  const [isDisponivel, setIsDisponivel] = useState(true);
  const [isLoadingDisponibilidade, setIsLoadingDisponibilidade] =
    useState(false);

  // 4. "Assista" aos campos para re-verificar em tempo real
  const watchedLivroId = useWatch({ control, name: "livroId" });
  const watchedDatadaReserva = useWatch({ control, name: "datadaReserva" });
  

  useEffect(() => {
    // (Este useEffect permanece o mesmo)
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
    // 5. Adicionada uma verificação de segurança antes de enviar
    if (!isDisponivel) {
      alert("Este livro não está disponível para esta data.");
      return;
    }

    data.usuarioId = usuario?.id || 0;
    
    // Converte as datas para o formato UTC
    // (Certifique-se de que seu backend está esperando UTC!)
    data.datadaReserva = new Date(data.datadaReserva + "T00:00:00.000Z").toUTCString();
    data.datadaEntrega = new Date(data.datadaEntrega + "T00:00:00.000Z").toUTCString();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/reservas`,
        {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify(data),
        }
      ); 
      
      if (response.status === 201) {
        setMensagemSucesso("Reserva realizada com sucesso!");
        setTimeout(() => {
          setMensagemSucesso(null);
          // Removi datadaEntrega do push, já que não temos o campo
          router.push(
            `/minha_pagina?livroId=${data.livroId}&titulo=${encodeURIComponent(
              data.titulo
            )}}&usuarioId=${data.usuarioId}&datadaReserva=${
              data.datadaReserva
            }&datadaEntrega=${data.datadaEntrega}`
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
    const today = new Date();
    const todayString = today.toISOString().split("T")[0];

    // 1. Define a data de reserva como hoje
    setValue("datadaReserva", todayString);

    // 2. Calcula e define a data de entrega padrão (Hoje + 7 dias)
    const sevenDaysFromNow = new Date(today);
    sevenDaysFromNow.setDate(today.getDate() + 7);
    const entregaString = sevenDaysFromNow.toISOString().split("T")[0];

    setValue("datadaEntrega", entregaString);
  }, [setValue]);

  useEffect(() => {
    // Não executa se os dados básicos ainda não carregaram
    if (!watchedLivroId || !watchedDatadaReserva) {
      setIsDisponivel(true); // Deixa o botão habilitado por padrão
      return;
    }

    async function verificaDisponibilidadeAPI() {
      setIsLoadingDisponibilidade(true);
      try {
        // [CORREÇÃO 1: A URL ESTAVA ERRADA]
        // Esta é a URL correta, que usa as variáveis do formulário
        // e bate com a rota da API que corrigimos (livros/:id/disponibilidade)
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL_API}/livros/${watchedLivroId}/disponibilidade?data=${watchedDatadaReserva}`
        );

        if (!response.ok) {
          throw new Error("Erro na API de disponibilidade");
        }

        const data = await response.json();
        
        // Salva a resposta (true ou false) no estado
        // A API responde com 'disponivel', não 'isDisponivel' (conforme API que corrigimos)
        setIsDisponivel(data.disponivel); 

      } catch (error) {
        console.error("Erro ao verificar disponibilidade:", error);
        setIsDisponivel(false); // Por segurança, bloqueia se a API falhar
      }
      setIsLoadingDisponibilidade(false);
    }

    // Roda esta verificação sempre que o livro ou a data mudarem
  }, [watchedLivroId, watchedDatadaReserva]);

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="flex flex-row items-center justify-center bg-white rounded-lg shadow dark:border sm:max-w-4xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-5">
          <img className="h-150 w-150" src="./livro2.jpg" alt="logo" />
        </div>
        <div className="w-full p-6">
          <h1 className="text-black text-3xl text-center mb-4">
            Reservar
          </h1>
          {mensagemSucesso && (
            <div className="mb-4 p-4 text-green-700 bg-green-100 rounded">
              {mensagemSucesso}{" "}
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
                disabled 
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="titulo"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Título do Livro
              </label>
              <input
                type="text"
                id="titulo"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Título do Livro"
                {...register("titulo")}
                disabled
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="datadaReserva"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Data da Reserva
              </label>
              <input
                type="date"
                id="datadaReserva"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Data da Reserva"
                {...register("datadaReserva")}
                required
                disabled
              />
            </div>           
             <div className="mb-5">
              <label
                htmlFor="datadaEntrega"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Data da Entrega
              </label>
              <input
                type="date"
                id="datadaEntrega"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Data da Entrega"
                {...register("datadaEntrega")}
                required
                disabled
              />
            </div> 

            {/* 8. ADICIONADO Bloco de Status da Disponibilidade */}
            <div className="mb-5 h-6">
              {isLoadingDisponibilidade &&  (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Verificando disponibilidade...
                </p>
              )}
              {!isLoadingDisponibilidade && !isDisponivel && (
                <p className="text-sm font-bold text-red-600">
                  ❗️ Livro indisponível para esta data.
                </p>
              )}
              {!isLoadingDisponibilidade &&
                isDisponivel &&
                watchedDatadaReserva && (
                  <p className="text-sm font-bold text-green-600">
                    ✓ Livro disponível!
                  </p>
                )}
            </div>
            <button
              type="submit"
              // 9. ADICIONADO Lógica de 'disabled' e 'className'
              disabled={!isDisponivel || isLoadingDisponibilidade}
              className="align-middle inline-flex items-center justify-center text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-inter rounded-lg text-semibold px-5 py-2.5 disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              {/* Texto do botão muda dinamicamente */}
              {isLoadingDisponibilidade
                ? "Verificando..."
                : "Confirmar Reserva"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}