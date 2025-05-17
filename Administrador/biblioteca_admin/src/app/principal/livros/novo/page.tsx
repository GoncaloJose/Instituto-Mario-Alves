'use client'
import { useForm } from "react-hook-form"
import Cookies from "js-cookie"
import { toast } from "sonner"
import { useState, useEffect } from "react"
import { LivroI } from "@/utils/types/livros"
import { AutorI } from "@/utils/types/autores"
import { GeneroI } from "@/utils/types/generos" 
import { EditoraI } from "@/utils/types/editoras"

type Inputs = {
    titulo: string   
    foto: string 
    autorId: number 
    generoId: number 
    editoraId: number
}

function NovoLivro() {
  const [autores, setAutores] = useState<AutorI[]>([]);
  const [generos, setGeneros] = useState<GeneroI[]>([]);
  const [editoras, setEditoras] = useState<EditoraI[]>([]);
  const { register, handleSubmit, reset, setFocus } = useForm<Inputs>();

  useEffect(() => {
    async function fetchData(endpoint: string, setData: Function) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/${endpoint}`);
      const dados = await response.json();
      setData(dados);
    }

    fetchData("autores", setAutores);
    fetchData("generos", setGeneros);
    fetchData("editoras", setEditoras);

    setFocus("titulo");
  }, []);

  async function incluirLivro(data: Inputs) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/livros`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
      },
      body: JSON.stringify(data)
    });

    if (response.status === 201) {
      toast.success("Ok! Livro cadastrado com sucesso!!");
      reset();
    } else {
      toast.error("Erro no cadastro do Livro...");
    }
  }

  return (
    <>
      <h1 className="mb-4 mt-24 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
        Cadastro de Livros
      </h1>

      <form className="max-w-xl mx-auto" onSubmit={handleSubmit(incluirLivro)}>
        <div className="mb-3">
          <label htmlFor="titulo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Título
          </label>
          <input
            type="text"
            id="titulo"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
            {...register("titulo")}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="autorId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Autor
          </label>
          <select id="autorId" className="block border border-gray-500 rounded-md p-2" {...register("autorId")}>
            <option value="">Selecione um autor</option>
            {autores.map(autor => (
              <option key={autor.id} value={autor.id}>{autor.nome}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="generoId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Gênero
          </label>
          <select id="generoId" className="block border border-gray-500 rounded-md p-2" {...register("generoId")}>
            <option value="">Selecione um gênero</option>
            {generos.map(genero => (
              <option key={genero.id} value={genero.id}>{genero.tipo}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="editoraId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Editora
          </label>
          <select id="editoraId" className="block border border-gray-500 rounded-md p-2" {...register("editoraId")}>
            <option value="">Selecione uma editora</option>
            {editoras.map(editora => (
              <option key={editora.id} value={editora.id}>{editora.nome}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="foto" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            URL da Foto
          </label>
          <input
            type="text"
            id="foto"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
            {...register("foto")}
          />
        </div>

        <button
          type="submit"
          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
          Incluir
        </button>
      </form>
    </>
  );
}

export default NovoLivro;