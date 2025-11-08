'use client'
import { useEffect, useState } from "react"
import Link from 'next/link'
import * as XLSX from 'xlsx'

import ItemUsuario from '@/components/ItemUsuario'
import { UsuarioI } from "@/utils/types/usuarios"

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

  function exportarParaExcel() {
    const dados = usuarios.map(({ nome, email, telefone, admin, }) => ({
      Nome: nome,
      Email: email,
      Telefone: telefone,
      Admin: admin ? 'Sim' : 'Não',
    
    }))

    const worksheet = XLSX.utils.json_to_sheet(dados)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Usuários')
    XLSX.writeFile(workbook, 'usuarios.xlsx')
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
        <Link href="usuarios/novo" 
          className="text-white bg-vermelho hover:bg-vermelho focus:ring-4 focus:ring-red-500 font-bold rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">
          Novo Usuário
        </Link>
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