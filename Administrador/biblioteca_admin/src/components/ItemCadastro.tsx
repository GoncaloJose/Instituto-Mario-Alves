'use client'
import { Dispatch, SetStateAction, useEffect } from "react"
import { TiDeleteOutline } from "react-icons/ti"
import { FaRegStar } from "react-icons/fa"
import Cookies from "js-cookie"
import { CadastroI } from "@/utils/types/cadastros"

interface listaCadastroProps {
  cadastro: CadastroI,
  cadastros: CadastroI[],
  setCadastros: Dispatch<SetStateAction<CadastroI[]>>
}

function ItemCadastro({ cadastro, cadastros, setCadastros }: listaCadastroProps) {

  async function excluirCadastro() {

    if (confirm(`Confirma a exclusão`)) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/cadastros/${cadastro.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
          },
        },
      )

      if (response.status == 200) {
        const cadastros2 = cadastros.filter(x => x.id != cadastro.id)
        setCadastros(cadastros2)
        alert("Cadastro excluído com sucesso")
      } else {
        alert("Erro... Cadastro não foi excluído")
      }
    }
  }

  async function alterarDestaque() {

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/cadastros/destacar/${cadastro.id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
        },
      },
    )

    if (response.status == 200) {
      const cadastros2 = cadastros.map(x => {
        if (x.id == cadastro.id) {
          return { ...x, destaque: !x.destaque }
        }
        return x
      })
      setCadastros(cadastros2)
    }
  }

  return (
    <tr key={cadastro.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">

      <td className={`px-6 py-4 ${cadastro.destaque ? "font-extrabold" : ""}`}>
        {cadastro.nome}
      </td>
      <td className={`px-6 py-4 ${cadastro.destaque ? "font-extrabold" : ""}`}>
        {cadastro.email}
      </td>
      <td className={`px-6 py-4 ${cadastro.destaque ? "font-extrabold" : ""}`}>
        {cadastro.senha}
      </td>
      <td className={`px-6 py-4 ${cadastro.destaque ? "font-extrabold" : ""}`}>
        {cadastro.confirmaSenha}
      </td>
      <td className={`px-6 py-4 ${cadastro.destaque ? "font-extrabold" : ""}`}>
        {cadastro.escolaridade}
      </td>
      <td className={`px-6 py-4 ${cadastro.destaque ? "font-extrabold" : ""}`}>
        {cadastro.telefone}
      </td>
      <td className={`px-6 py-4 ${cadastro.destaque ? "font-extrabold" : ""}`}>
        {cadastro.instituicao}
      </td>
      <td className="px-6 py-4">
        <TiDeleteOutline className="text-3xl text-red-600 inline-block cursor-pointer" title="Excluir"
          onClick={excluirCadastro} />&nbsp;
        <FaRegStar className="text-3xl text-yellow-600 inline-block cursor-pointer" title="Destacar"
          onClick={alterarDestaque} />
      </td>
    </tr>
  )
}

export default ItemCadastro