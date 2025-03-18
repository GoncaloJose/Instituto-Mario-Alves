'use client'
import { useEffect, useState } from "react"
import Link from 'next/link'

import  ItemCliente  from '@/components/ItemCliente'
import { ClienteI } from "@/utils/types/clientes"

function CadClientes() {
  const [clientes, setClientes] = useState<ClienteI[]>([])

  useEffect(() => {
    async function getClientes() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/clientes`)
      const dados = await response.json()
      setClientes(dados)
    }
    getClientes()
  }, [])

  const listaClientes = clientes.map(cliente => (
    <ItemCliente key={cliente.id} cliente={cliente} clientes={clientes} setClientes={setClientes} />
  ))

  return (
    <div className='m-4 mt-24'>
      <div className='flex justify-between'>
        <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
          Controle de Clientes
        </h1>
        <Link href="clientes/novo" 
          className="text-black bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-bold rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">
          Novo Cliente
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
                Destacar
              </th>
            </tr>
          </thead>
          <tbody>
            {listaClientes}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CadClientes