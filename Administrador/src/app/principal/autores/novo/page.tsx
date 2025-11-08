'use client'
import { useEffect, useState } from "react"
import Link from 'next/link'
import { useForm } from "react-hook-form"
import Cookies from "js-cookie"
import { toast } from "sonner"
import { AutorI } from "@/utils/types/autores"

type CamposAutor = {

    nome:           string   
    pais:           string  

}

function NovoAutor() {
  const [livros, setLivros] = useState<AutorI[]>([]);
  const { register, handleSubmit, reset, setFocus } = useForm<CamposAutor>();

  useEffect(() => {
    setFocus("nome");
  }, []);

  async function incluirAutor(data: CamposAutor) {
    const novoAutor: CamposAutor = {
      nome: data.nome,
      pais: data.pais,
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/autores`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: ("Bearer " +
          Cookies.get("admin_logado_token")) as string,
      },
      body: JSON.stringify(novoAutor),
    });

    if (response.status == 201) {
      toast.success("Ok! Autor cadastrado com sucesso!!");
      reset();
    } else {
      toast.error("Erro no cadastro do Autor...");
    }
  }

  return (
    <>
      <div className="flex flex-col mt-24 mb-4 w-full">
        <Link
          href="/principal/livros"
          className="text-gray-400 hover:text-red-700 focus:ring-4 focus:ring-red-500 font-bold rounded-lg text-md py-2.5 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
        >
          ← Voltar a Lista de Livros
        </Link>

        <h1 className="text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white me-56">
          Cadastro de Autores
        </h1>

        <form
          className="max-w-xl mx-auto"
          onSubmit={handleSubmit(incluirAutor)}
        >
          <div className="mb-3">
            <label
              htmlFor="titulo"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Nome
            </label>
            <input
              type="text"
              id="titulo"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
              required
              {...register("nome")}
            />
          </div>
          <div className="grid gap-6 mb-3 md:grid-cols-2">
            <div className="mb-3">
              <label
                htmlFor="foto"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Pais
              </label>
              <input
                type="text"
                id="foto"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                required
                {...register("pais")}
              />
            </div>
          </div>

          <button
            type="submit"
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            Incluir
          </button>
        </form>
      </div>
    </>
  );
}

export default NovoAutor