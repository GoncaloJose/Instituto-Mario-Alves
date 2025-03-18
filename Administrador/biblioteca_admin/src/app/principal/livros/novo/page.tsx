'use client'
import { useForm } from "react-hook-form"
import Cookies from "js-cookie"
import { toast } from "sonner"
import { useState, useEffect } from "react"
import { LivroI } from "@/utils/types/livros"

type Inputs = {

    titulo:           string   
    autor:            string   
    codigodoLivro:    string   
    secao:            string
    sinopse:          string
    foto:             string
    genero:           string

}

function NovoLivro() {
  const [livros, setLivros] = useState<LivroI[]>([])
  const {
    register,
    handleSubmit,
    reset,
    setFocus
  } = useForm<Inputs>()

  useEffect(() => {
    async function getLivros() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/livros`)
      const dados = await response.json()
      setLivros(dados)
    }
    getLivros()
    setFocus("titulo")
  }, [])

  const optionsLivro = livros.map(livro => (
    <option key={livro.id} value={livro.id}>{livro.titulo}</option>
  ))

  async function incluirLivro(data: Inputs) {

    const novoLivro: Inputs = {
      titulo: data.titulo,
      autor: data.autor,
      codigodoLivro: data.codigodoLivro,
      secao: data.secao,
      sinopse: data.sinopse,
      foto: data.foto,
      genero: data.genero
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/livros`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
        },
        body: JSON.stringify(novoLivro)
      },
    )

    if (response.status == 201) {
      toast.success("Ok! Livro cadastrado com sucesso")
      reset()
    } else {
      toast.error("Erro no cadastro do Livro...")
    }
  }

  return (
    <>
      <h1 className="mb-4 mt-24 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white me-56">
        Inclusão de Livros
      </h1>

      <form className="max-w-xl mx-auto" onSubmit={handleSubmit(incluirLivro)}>
        <div className="mb-3">
          <label htmlFor="titulo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Título</label>
          <input type="text" id="titulo"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" required
            {...register("titulo")}
          />
        </div>
        <div className="grid gap-6 mb-3 md:grid-cols-2">
          <div className="mb-3">
            <label htmlFor="autor" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Autor</label>
            <input type="text" id="autor"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" required
              {...register("autor")}
            >
            </input>
          </div>
          <div className="mb-3">
            <label htmlFor="codigodoLivro" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Código do Livro</label>
            <input type="text" id="codigodoLivro"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" required
              {...register("codigodoLivro")}
            />
          </div>
        </div>
        <div className="grid gap-6 mb-3 md:grid-cols-2">
          <div className="mb-3">
            <label htmlFor="secao" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Seção</label>
            <input type="text" id="secao"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" required
              {...register("secao")}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="sinopse" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Sinopse</label>
            <input type="text" id="sinopse"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" required
              {...register("sinopse")}
            />
          </div>
        </div>
        <div className="grid gap-6 mb-3 md:grid-cols-2">
          <div className="mb-3">
            <label htmlFor="foto" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              URL da Foto</label>
            <input type="text" id="foto"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" required
              {...register("foto")}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="genero" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Gênero</label>
            <input type="text" id="genero"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" required
              {...register("genero")} >
            </input>
          </div>
        </div>

        <button type="submit" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
          Incluir</button>
      </form>
    </>
  )
}

export default NovoLivro