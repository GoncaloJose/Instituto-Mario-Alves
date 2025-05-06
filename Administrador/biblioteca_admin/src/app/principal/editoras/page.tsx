'use client'
import { useEffect, useState } from "react"
import Link from 'next/link'
import { EditoraI } from "@/utils/types/editoras"
import { userAgent } from "next/server"



function Editoras() {
  const [editoras, setEditoras] = useState<EditoraI[]>([])

  useEffect(() => {
    async function getEditoras() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/editoras`)
      const dados = await response.json()
      setEditoras(dados)
    }
    getEditoras()
    
  }, [])
    return (
        <div className='m-4 mt-24'>
        <div className='flex justify-between'>
          <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
            Lista de Editoras
          </h1>
          <Link href="editoras/novo" 
            className="text-black bg-vermelho hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-bold rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">
             Nova Editora
          </Link>
        </div>
  
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xl text-gray-700 uppercase bg-vermelho dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Nome
                </th>
              </tr>
            </thead>
            <tbody>
              {editoras.map((editora) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {editora.nome}
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
}


export default Editoras