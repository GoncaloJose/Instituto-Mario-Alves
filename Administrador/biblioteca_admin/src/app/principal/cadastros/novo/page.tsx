'use client'
import { useForm } from "react-hook-form"
import Cookies from "js-cookie"
import { toast } from "sonner"
import { useState, useEffect } from "react"
import { CadastroI } from "@/utils/types/cadastros"

type Inputs = {

    nome:             string   
    email:            string   
    senha:            string   
    confirmaSenha:    string
    escolaridade:     string
    telefone:         string
    instituicao:      string

}

function NovoCadastro() {
  const [cadastros, setCadastros] = useState<CadastroI[]>([])
  const {
    register,
    handleSubmit,
    reset,
    setFocus
  } = useForm<Inputs>()

  useEffect(() => {
    async function getCadastros() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/cadastros`)
      const dados = await response.json()
      setCadastros(dados)
    }
    getCadastros()
    setFocus("nome")
  }, [])

  const optionsCadastro = cadastros.map(cadastro => (
    <option key={cadastro.id} value={cadastro.id}>{cadastro.nome}</option>
  ))

  async function incluirCadastro(data: Inputs) {

    const novoCadastro: Inputs = {
      nome: data.nome,
      email: data.email,
      senha: data.senha,
      confirmaSenha: data.confirmaSenha,
      escolaridade: data.escolaridade,
      telefone: data.telefone,
      instituicao: data.instituicao

    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/cadastros`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
        },
        body: JSON.stringify(novoCadastro)
      },
    )

    if (response.status == 201) {
      toast.success("Ok! Cadastrado realizado com sucesso")
      reset()
    } else {
      toast.error("Erro no cadastro do cliente...")
    }
  }

  return (
    <>
      <h1 className="mb-4 mt-24 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white me-56">
        Cadastros de Clientes
      </h1>

      <form className="max-w-xl mx-auto" onSubmit={handleSubmit(incluirCadastro)}>
        <div className="mb-3">
          <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Nome</label>
          <input type="text" id="nome"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
            placeholder="Nome Completo"
             required
            {...register("nome")}
          />
        </div>
        <div className="grid gap-6 mb-3 md:grid-cols-2">
          <div className="mb-3">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              E-mail</label>
            <input
            type="text" id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
              placeholder="name@company.com"
              required
              {...register("email")}
            >
            </input>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Senha</label>
            <input type="password" 
            id="password"
            placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" 
              required
              {...register("senha")}
            />
          </div>
        </div>
        <div className="mb-3">
            <label htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Confirma Senha</label>
            <input type="password" id="password"
            placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" required
              {...register("confirmaSenha")}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="escolaridade" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Escolaridade</label>
            <input type="text" id="escolaridade"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
              placeholder="Formação Acadêmica"
              required
              {...register("escolaridade")}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="telefone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Telefone</label>
            <input type="text" id="telefone"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
              placeholder="(53)90000-0000" 
              required
              {...register("telefone")} >
            </input>
          </div>
          <div className="mb-3">
            <label htmlFor="instituicao" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Instituição</label>
            <input type="text" id="instituicao"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
              placeholder="Instituição de Ensino" 
              required
              {...register("instituicao")} >
            </input>
          </div>

        <button type="submit" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
          Incluir</button>
      </form>
    </>
  )
}

export default NovoCadastro