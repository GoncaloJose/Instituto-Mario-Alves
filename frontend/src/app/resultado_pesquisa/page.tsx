'use client'
import { useSearchParams} from 'next/navigation'
import { useEffect, useState } from 'react'


function ResultadoPesquisa() { 
    const [livrosEncontrados, setLivrosEncontrados] = useState([])
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

        console.log ('livros encontrados',livrosEncontrados)
    return (
        <div>

             tetas {livrosEncontrados.map((livro) => (
                <div> {livro.titulo} </div>
             ))}

            </div>

    )


}

export default ResultadoPesquisa