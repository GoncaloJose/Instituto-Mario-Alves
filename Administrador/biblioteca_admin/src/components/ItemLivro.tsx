'use client'
import { Dispatch, SetStateAction, useEffect } from "react"
import { TiDeleteOutline } from "react-icons/ti"
import { FaRegStar } from "react-icons/fa"
import Cookies from "js-cookie"
import { LivroI } from "@/utils/types/livros"

interface listaLivroProps {
  livro: LivroI,
  livros: LivroI[],
  setLivros: Dispatch<SetStateAction<LivroI[]>>
}

function ItemLivro({ livro, livros, setLivros }: listaLivroProps) {

  async function excluirLivro() {

    if (confirm(`Confirma a exclusão`)) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/livros/${livro.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
          },
        },
      )

      if (response.status == 200) {
        const livros2 = livros.filter(x => x.id != livro.id)
        setLivros(livros2)
        alert("Livro excluído com sucesso")
      } else {
        alert("Erro... Livro não foi excluído")
      }
    }
  }

  async function alterarDestaque() {

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/livros/destacar/${livro.id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
        },
      },
    )

    if (response.status == 200) {
      const livros2 = livros.map(x => {
        if (x.id == livro.id) {
          return { ...x, destaque: !x.destaque }
        }
        return x
      })
      setLivros(livros2)
    }
  }

  return (
    <tr key={livro.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <img src={livro.foto} alt="Capa do Livro"
          style={{width: 200}} />
      </th>
      <td className={`px-6 py-4 ${livro.destaque ? "font-extrabold" : ""}`}>
        {livro.titulo}
      </td>
      <td className={`px-6 py-4 ${livro.destaque ? "font-extrabold" : ""}`}>
        {livro.autor}
      </td>
      <td className={`px-6 py-4 ${livro.destaque ? "font-extrabold" : ""}`}>
        {livro.codigodoLivro}
      </td>
      <td className={`px-6 py-4 ${livro.destaque ? "font-extrabold" : ""}`}>
        {livro.secao}
      </td>
      <td className="px-6 py-4">
        <TiDeleteOutline className="text-3xl text-red-600 inline-block cursor-pointer" title="Excluir"
          onClick={excluirLivro} />&nbsp;
        <FaRegStar className="text-3xl text-yellow-600 inline-block cursor-pointer" title="Destacar"
          onClick={alterarDestaque} />
      </td>
    </tr>
  )
}

export default ItemLivro