'use client'
import { useEffect, useState } from "react"
import Link from 'next/link'
import { UsuarioI } from "@/utils/types/usuarios"
import ItemUsuario from '@/components/ItemUsuario'

function CadUsuarios() {
  const [usuarios, setUsuarios] = useState<UsuarioI[]>([])

  useEffect(() => {
    async function getUsuarios() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/usuarios`)
      const dados = await response.json()
      setUsuarios(dados)
    }
    getUsuarios()
  }, [])

  function exportarCSV() {
    const cabecalho = ["ID", "Nome", "Email", "Telefone", "Admin", "Criado em"]

    const linhas = usuarios.map((usuario) => [
      usuario.id,
      usuario.nome?.replace(/[\n\r]/g, " ") || "",
      usuario.email || "",
      usuario.telefone || "",
      usuario.admin ? "Sim" : "Não",
    ])

    const conteudo = [cabecalho, ...linhas]
      .map((linha) => linha.map((campo) => `"${campo}"`).join(";"))
      .join("\n")

    const blob = new Blob([`\uFEFF${conteudo}`], {
      type: "text/csv;charset=utf-8;",
    })
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", "usuarios.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const listaUsuarios = usuarios.map((usuario: UsuarioI) => (
    <ItemUsuario
      key={usuario.id}
      usuario={usuario}
      usuarios={usuarios}
      setUsuarios={setUsuarios}
    />
  ))

  return (
    <div className='m-4 mt-24'>
      <div className='flex justify-between items-center mb-4'>
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
          Controle de Usuários
        </h3>
        <div className="flex gap-2">
          <Link
            href="usuarios/novo"
            className="text-white bg-vermelho hover:bg-vermelho focus:ring-4 focus:ring-red-500 font-bold rounded-lg text-md px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
          >
            Novo Usuário
          </Link>
          <button
            onClick={exportarCSV}
            className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-bold rounded-lg text-md px-5 py-2.5 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800"
          >
            Exportar CSV
          </button>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xl text-white uppercase bg-vermelho dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Nome</th>
              <th scope="col" className="px-6 py-3">E-mail</th>
              <th scope="col" className="px-6 py-3">Telefone</th>
              <th scope="col" className="px-6 py-3">Admin?</th>
              <th scope="col" className="px-6 py-3">Pago?</th>
              <th scope="col" className="px-6 py-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {listaUsuarios}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CadUsuarios