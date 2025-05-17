'use client'
import{ useSearchParams} from 'next/navigation'


function ResultadoPesquisa() { 
    const searchParams = useSearchParams() 
    const termoPesquisa = searchParams.get('termo')
    return (
        <div>
            tetas {termoPesquisa}

            </div>

    )
}

export default ResultadoPesquisa