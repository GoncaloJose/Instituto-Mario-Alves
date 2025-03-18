'use client'

import { useEffect, useState } from "react"
import Link from 'next/link'
import  ItemCadastro  from '@/components/ItemCadastro'
import { CadastroI } from "@/utils/types/cadastros"

function CadCadastros() {
  const [cadastros, setCadastros] = useState<CadastroI[]>([])

  useEffect(() => {
    async function getCadastros() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/cadastros`)
      const dados = await response.json()
      setCadastros(dados)
    }
    getCadastros()
  }, [])

  const listaCadastros = cadastros.map(cadastro => (
    <ItemCadastro key={cadastro.id} cadastro={cadastro} cadastros={cadastros} setCadastros={setCadastros} />
  ))

  return (
    <div className='m-4 mt-24'>
      <div className='flex justify-between'>
        <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
          Cadastro de Clientes
        </h1>
        <Link href="cadastros/novo" 
          className="text-black bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-bold rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">
          Novo Cadastro
        </Link>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xl text-gray-700 uppercase bg-red-500 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nome
              </th>
              <th scope="col" className="px-6 py-3">
                E-mail
              </th>
              <th scope="col" className="px-6 py-3">
                Senha
              </th>
              <th scope="col" className="px-6 py-3">
                confirmaSenha
              </th>
              <th scope="col" className="px-6 py-3">
                Escolaridade
              </th>
              <th scope="col" className="px-6 py-3">
                Telefone
              </th>
              <th scope="col" className="px-6 py-3">
                Instituição
              </th>
              <th scope="col" className="px-6 py-3">
                Destacar
              </th>
            </tr>
          </thead>
          <tbody>
            {listaCadastros}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CadCadastros