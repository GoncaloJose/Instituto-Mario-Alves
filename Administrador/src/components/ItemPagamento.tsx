'use client'
import { Dispatch, SetStateAction, useEffect } from "react"
import Cookies from "js-cookie"
import { PagamentoI } from "@/utils/types/pagamentos"

interface listaPagamentoProps {
  pagamento: PagamentoI,
  pagamentos: PagamentoI[],
  setPagamentos: Dispatch<SetStateAction<PagamentoI[]>>
}

function ItemPagamento({ pagamento, pagamentos, setPagamentos }: listaPagamentoProps) {


  return (
    <tr key={pagamento.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <td className={`px-6 py-4`}>
        {pagamento.usuario.nome}
      </td>
      <td className={`px-6 py-4`}>
        {new Date(pagamento.dataPagamento).toLocaleDateString('pt-BR')}
      </td>
      <td className={`px-6 py-4`}>
        {pagamento.valor}
        </td>
      <td className={`px-6 py-4`}>
        {pagamento.formaPagamento}
      </td>
    </tr>
  )
}

export default ItemPagamento