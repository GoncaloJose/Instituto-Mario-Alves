'use client'
import { Dispatch, SetStateAction, useEffect } from "react"
import { TiDeleteOutline } from "react-icons/ti"
import { FaRegStar } from "react-icons/fa"
import Cookies from "js-cookie"
import { UsuarioI } from "@/utils/types/usuarios"

interface listaUsuarioProps {
  usuario: UsuarioI,
  usuarios: UsuarioI[],
  setUsuarios: Dispatch<SetStateAction<UsuarioI[]>>
}

function ItemUsuario({ usuario, usuarios, setUsuarios }: listaUsuarioProps) {

  async function excluirUsuario() {

    if (confirm(`Confirma a exclusão`)) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/usuarios/${usuario.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
          },
        },
      )

      if (response.status == 200) {
        const usuarios2 = usuarios.filter(x => x.id != usuario.id)
        setUsuarios(usuarios2)
        alert("Usuário excluído com sucesso")
      } else {
        alert("Erro... Usuário não foi excluído")
      }
    }
  }

  return (
    <tr key={usuario.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <td className={`px-6 py-4`}>
        {usuario.nome}
      </td>
      <td className={`px-6 py-4`}>
        {usuario.email}
      </td>
      <td className={`px-6 py-4`}>
        {usuario.telefone}
        </td>
      <td className={`px-6 py-4`}>
        {usuario.admin ? "Sim" : "Não"}
      </td>
      <td className="px-6 py-4">
        <TiDeleteOutline className="text-3xl text-red-600 inline-block cursor-pointer" title="Excluir"
          onClick={excluirUsuario} />&nbsp;
      </td>
    </tr>
  )
}

export default ItemUsuario