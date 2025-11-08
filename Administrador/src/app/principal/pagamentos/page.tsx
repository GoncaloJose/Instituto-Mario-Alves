'use client'
import { useEffect, useState } from "react"
import Link from 'next/link'

import  ItemPagamento  from '@/components/ItemPagamento'
import { PagamentoI } from "@/utils/types/pagamentos"

function CadPagamentos() {
  const [pagamentos, setPagamentos] = useState<PagamentoI[]>([])

  useEffect(() => {
    async function getPagamentos() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/pagamentos`)
      const dados = await response.json()
      setPagamentos(dados)
    }
    getPagamentos()
  }, [])

  const listaPagamentos = pagamentos.map((pagamento: PagamentoI) => (
    <ItemPagamento
      key={pagamento.id}
      pagamento={pagamento}
      pagamentos={pagamentos}
      setPagamentos={setPagamentos}
    />
  
  ))

  return (
    <div className='m-4 mt-24'>
      <div className='flex justify-between'>
        <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
          Controle dos Pagamentos
        </h1>
         <Link href="pagamentos/novo" 
          className="text-white bg-vermelho hover:bg-vermelho focus:ring-4 focus:ring-red-300 font-bold rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">
          Novo Pagamento
        </Link>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xl text-white uppercase bg-vermelho dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nome do Usuário
              </th>
              <th scope="col" className="px-6 py-3">
                Data do Pagamento
              </th>
              <th scope="col" className="px-6 py-3">
                Valor
              </th>
              <th scope="col" className="px-6 py-3">
                Forma de Pagamento
              </th>
            </tr>
          </thead>
          <tbody>
            {listaPagamentos}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CadPagamentos