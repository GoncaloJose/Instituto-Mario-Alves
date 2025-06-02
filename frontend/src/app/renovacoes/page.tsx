"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useUsuarioStore } from "@/context/usuario";
import Link from "next/link";

type Inputs = {
  livroId: number;
  usuarioId: number;
  datadaEntrega: string; // Aceitar como string inicialmente
};

export default function Renovar() {
  const { register, handleSubmit, setValue } = useForm<Inputs>();
  const router = useRouter();
  const { logaUsuario, usuario } = useUsuarioStore(); // Obtém o usuario logado do contexto

  async function verificaRenovacao(data: Inputs) {
    // Converte campos numéricos
    data.livroId = parseInt(data.livroId as unknown as string, 10);
    data.usuarioId = usuario?.id || 0; // Usa o id do usuario logado
    data.datadaEntrega = new Date(data.datadaEntrega).toISOString();
    // Converte a data para um objeto Date
    const datadaRenovacaoFormatada = new Date(data.datadaEntrega);

    console.log("Dados para envio:", {
      ...data,
      datadaEntrega: datadaRenovacaoFormatada,
    }); // Log dos dados enviados

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/renovacoes`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            livroId: data.livroId,
            usuarioId: data.usuarioId,
            datadaEntrega: data.datadaEntrega,
          }),
        }
      );

      console.log("Resposta recebida:", response); // Log da resposta recebida

      if (response.status === 201) {
        const dados = await response.json();
        logaUsuario(dados);
        router.push("/");
      } else {
        const error = await response.json();
        console.error("Erro ao criar renovacão:", error); // Log do erro
        alert("Erro... DatadaEntrega, UsuarioId ou LivroId incorretos");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao se comunicar com o servidor. Tente novamente mais tarde.");
    }
  }

  // Define o valor padrão da data
  setValue("datadaEntrega", new Date().toISOString().split("T")[0]);

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex justify-between items-center mb-6">
                <Link
                  href="/emprestimo"
                  className="ml-auto text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                  Voltar
                </Link>
              </div>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <img
                className="mx-auto h-15 w-auto"
                src="./mulher2.jpg"
                alt="logo"
              />



              <form
                className="max-w-sm mx-auto"
                onSubmit={handleSubmit(verificaRenovacao)}
              >
                <div className="mb-5">
                  <input
                    type="text"
                    id="livroId"
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Id do Livro"
                    required
                    {...register("livroId")}
                  />

                  <input
                    type="date"
                    id="datadaEntrega"
                    className="mt-5 mb-2 block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Data da Entrega"
                    required
                    defaultValue={
                      new Date(new Date().setDate(new Date().getDate() + 5))
                        .toISOString()
                        .split("T")[0]
                    } // Adiciona 5 dias à data atual
                    {...register("datadaEntrega")}
                  />
                </div>

                <button
                  type="submit"
                  className="text-white bg-vermelho hover:bg-red-600 focus:ring-4 focus:ring-blue-300 font-inter rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                >
                  Renovar
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
