'use client'
// 1. O 'useState' continua sendo necessário
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { TiDeleteOutline } from "react-icons/ti"
import { FaRegStar } from "react-icons/fa"
import Cookies from "js-cookie"
import { EmprestimoI } from "@/utils/types/emprestimos"
import { useRouter } from 'next/navigation';

interface listaEmprestimoProps {
  emprestimo: EmprestimoI,
  emprestimos: EmprestimoI[],
  setEmprestimos: Dispatch<SetStateAction<EmprestimoI[]>>
}

function ItemEmprestimo({ emprestimo, emprestimos, setEmprestimos }: listaEmprestimoProps) {
const router = useRouter();

// 2. O estado inicial (pode ser 'false' ou o status vindo do 'livro')
const [isEntregue, setIsEntregue] = useState(false)

  async function excluirLivro() {
    // ... (função original sem mudanças) ...
    if (confirm(`Confirma a exclusão`)) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/emprestimos/${emprestimo.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
          },
        },
      )
    }
  }

}

export default ItemEmprestimo