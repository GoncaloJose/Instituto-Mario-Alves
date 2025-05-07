'use client'
import { useForm } from "react-hook-form"
import Cookies from "js-cookie"
import { toast } from "sonner"
import { useState, useEffect, use } from "react"
import { LivroI } from "@/utils/types/livros"
import { AutorI } from "@/utils/types/autores"
import { GeneroI } from "@/utils/types/generos" 
import { EditoraI } from "@/utils/types/editoras"

type Inputs = {

    titulo:           string   
    foto:             string 
    autorId:          number 
    generoId:         number 
    editoraId:        number
  

}

function NovoLivro() {
  const [livros, setLivros] = useState<LivroI[]>([]);
  const [autores, setAutores] = useState<AutorI[]>([]);
  const [generos, setGeneros] = useState<GeneroI[]>([]);
  const [editoras, setEditoras] = useState<EditoraI[]>([]);
  const { register, handleSubmit, reset, setFocus } = useForm<Inputs>();

  useEffect(() => {
    async function getAutores() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/autores`
      );
      const dados = await response.json();
      setAutores(dados);
    }

    async function getGenero() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/generos`)
      const dados = await response.json()
      setGeneros(dados)
    }

    async function getEditora() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/editoras`)
      const dados = await response.json()
      setEditoras(dados)
    }

    getAutores()
    getGenero()
    getEditora()
    setFocus("titulo")
  }, [])

  const optionsAutores = autores.map((autor) => (
    <option key={autor.id} value={autor.id}>
      {autor.nome}
    </option>
  ));

  const optionsGeneros = generos.map(genero => (
    <option key={genero.id} value={genero.id}>{genero.tipo}</option>
  ))

  const optionsEditoras = editoras.map(editora => (
    <option key={editora.id} value={editora.id}>{editora.nome}</option>
  ))

  async function incluirLivro(data: Inputs) {
    const novoLivro: Inputs = {
      titulo: data.titulo,
      foto: data.foto,
      autorId: data.autorId,
      generoId: data.generoId,
      editoraId: data.editoraId
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/livros`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
        },
        body: JSON.stringify(novoLivro)
    });

    if (response.status == 201) {
      toast.success("Ok! Livro cadastrado com sucesso!!");
      reset();
    } else {
      toast.error("Erro no cadastro do Livro...");
    }
  }

  return (
    <>
      <h1 className="mb-4 mt-24 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white me-56">
        Cadastro de Livros
      </h1>

      <form className="max-w-xl mx-auto" onSubmit={handleSubmit(incluirLivro)}>
        <div className="mb-3">
          <label
            htmlFor="autorId"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Título
          </label>
          <select
            id="titulo"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
            {...register("titulo")}
          >
            <option value=""></option> {/* Opção fixa */}
          </select>
        </div>
        <div className="mb-3">
          <label
            htmlFor="autorId"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Autor
          </label>
          <select
            id="autorId"
            className="block border border-gray-500 rounded-md p-2"
            {...register("autorId")}
          >
            <option value="" className="border border-gray-700"></option>{" "}
            {/* Opção fixa com contorno */}
            {optionsAutores} {/* Lista dinâmica de autores cadastrados */}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="titulo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Gênero</label>
          <select id="generoId" className="block" {...register("generoId")}>
            {optionsGeneros}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="titulo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Editora</label>
          <select id="editoraId" className="block" {...register("editoraId")}>
            {optionsEditoras}
          </select>
        </div>
        <div className="grid gap-6 mb-3 md:grid-cols-2">
          <div className="mb-3">
            <label
              htmlFor="foto"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              URL da Foto
            </label>
            <select
              id="foto"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
              {...register("foto")}
            >
              <option value=""></option> {/* Opção fixa */}
            </select>
          </div>
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
