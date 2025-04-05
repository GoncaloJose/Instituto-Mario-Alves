'use client'
import { useEffect, useState } from "react"
import Link from 'next/link'

import  ItemUsuario  from '@/components/ItemUsuario'
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
      <div className='flex justify-between'>
        <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
          Controle de Usuários
        </h1>
        <Link href="usuarios/novo" 
          className="text-black bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-bold rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">
          Novo Usuário
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
            {listaUsuarios}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CadUsuarios