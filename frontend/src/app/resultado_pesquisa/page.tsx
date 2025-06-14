'use client'
import { useSearchParams} from 'next/navigation'
import { useEffect, useState } from 'react'
import { ItemLivros } from "@/components/ItemLivros"
import { LivroI } from '@/utils/types/livros'

function ResultadoPesquisa() { 
    const [livrosEncontrados, setLivrosEncontrados] = useState<LivroI[]>([]);
    const searchParams = useSearchParams() 
    const termoPesquisa = searchParams.get('termo') 

    useEffect(() => {
        async function resultados() {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/livros/pesquisa/${termoPesquisa}`)
            const dados = await response.json()
            setLivrosEncontrados(dados)
        }
        resultados()
    },[termoPesquisa]) //toda vez que modifica o terPesquisa ele executa o de estiver dentro do useffect.

        console.log ('livros encontrados', livrosEncontrados)
    return (
    
        <section className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
        Resultado Pesquisa
        </h1>
             <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {livrosEncontrados.map((livro) => (
                 <ItemLivros data={livro} key={livro.id} />
                ))}
            </section>

        </section>

    )


}

export default ResultadoPesquisa