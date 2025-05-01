'use client'
import { useForm } from "react-hook-form"
import Cookies from "js-cookie"
import { toast } from "sonner"
import { useState, useEffect } from "react"
import { LivroI } from "@/utils/types/livros"
import { AutorI } from "@/utils/types/autores"

type Inputs = {

    titulo:           string   
    foto:             string 
    autorId:          number 

}

function NovoLivro() {
  const [livros, setLivros] = useState<LivroI[]>([])
  const [autores, setAutores] = useState<AutorI[]>([])
  const {
    register,
    handleSubmit,
    reset,
    setFocus
  } = useForm<Inputs>()

  useEffect(() => {
    async function getAutores() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/autores`)
      const dados = await response.json()
      setAutores(dados)
    }
    getAutores()
    // getGenero()
    // getEditora()
    setFocus("titulo")
  }, [])

  const optionsAutores = autores.map(autor => (
    <option key={autor.id} value={autor.id}>{autor.nome}</option>
  ))

  async function incluirLivro(data: Inputs) {

    const novoLivro: Inputs = {
      titulo: data.titulo,
      foto: data.foto,
      autorId: data.autorId

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
      toast.success("Ok! Livro cadastrado com sucesso!!")
      reset()
    } else {
      toast.error("Erro no cadastro do Livro...")
    }
  }

  return (
    <>
      <h1 className="mb-4 mt-24 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white me-56">
        Cadastro de Livros
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
        <div className="mb-3">
          <label htmlFor="titulo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Autor</label>
          <select id="autorId" className="block" {...register("autorId")}>
            {optionsAutores}
          </select>
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
        </div>

        <button type="submit" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
          Incluir</button>
      </form>
    </>
  )
}

export default NovoLivro