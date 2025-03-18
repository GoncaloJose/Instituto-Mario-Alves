'use client'
import { Dispatch, SetStateAction } from "react"
import { TiDeleteOutline } from "react-icons/ti"
import { FaRegEdit  } from "react-icons/fa"
import Cookies from "js-cookie"
import { ComentarioI } from "@/utils/types/comentarios"

interface listaComentarioProps {
  comentario: ComentarioI,
  comentarios: ComentarioI[],
  setComentarios: Dispatch<SetStateAction<ComentarioI[]>>
}

function ItemComentario({ comentario, comentarios, setComentarios }: listaComentarioProps) {

  async function excluirComentario() {

    if (confirm(`Confirma Exclusão do Comentário "${comentario.descricao}"?`)) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/comentarios/${comentario.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
          },
        },
      )

      if (response.status == 200) {
        const comentarios2 = comentarios.filter(x => x.id != comentario.id)
        setComentarios(comentarios2)
        alert("Comentário excluída com sucesso")
      } else {
        alert("Erro... Comentário não foi excluída")
      }
    }
  }

  async function responderComentario() {
    const respostaBiblioteca = prompt(`Resposta da Biblioteca para "${comentario.descricao}"`)

    if (respostaBiblioteca == null || respostaBiblioteca.trim() == "") {
      return
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/comentarios/${comentario.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
        },
        body: JSON.stringify({resposta: respostaBiblioteca})
      },
    )

    if (response.status == 200) {
      const comentarios2 = comentarios.map(x => {
        if (x.id == comentario.id) {
          return { ...x, resposta: respostaBiblioteca}
        }
        return x
      })
      setComentarios(comentarios2)
    }
  }

  return (
    <tr key={comentario.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <img src={comentario.livro.foto} alt="Foto do Livro"
          style={{ width: 200 }} />
      </th>
      <td className={"px-6 py-4"}>
        {comentario.livro.titulo}
      </td>
      <td className={"px-6 py-4"}>
        {comentario.livro.autor}
      </td>
      <td className={`px-6 py-4`}>
        {comentario.cliente.id}
      </td>
      <td className={`px-6 py-4`}>
        {comentario.descricao}
      </td>
      <td className={`px-6 py-4`}>
        {comentario.resposta}
      </td>
      <td className="px-6 py-4">
        {comentario.resposta ? 
          <>
            <img src="/ok.png" alt="Ok" style={{width: 60}} />
          </>
        :
          <>
            <TiDeleteOutline className="text-3xl text-red-600 inline-block cursor-pointer" title="Excluir"
              onClick={excluirComentario} />&nbsp;
            <FaRegEdit className="text-3xl text-yellow-600 inline-block cursor-pointer" title="Destacar"
              onClick={responderComentario} />
          </>
        }
      </td>

    </tr>
  )
}

export default ItemComentario