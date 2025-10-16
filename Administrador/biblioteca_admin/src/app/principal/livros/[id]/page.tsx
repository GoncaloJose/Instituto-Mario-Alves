'use client';
import { useEffect, useState } from "react"


const EditarLivro = ({id}: {id: number}) => { 
    // 1 atraves do id do livro recebido pelas propriedades do componente
    // 2 criar um estado para armazenar os dados do livro/usseState
    // 3 usar o useEffect para carregar os dados do livro quando o componente for montado/ useEffect
    // 4 criar um formulário para editar os dados do livro
    // 5 criar uma função para enviar os dados editados para a API
    // 6 tratar a resposta da API e exibir uma mensagem de sucesso ou erro
    return (
        <div className="text-black mt-20 ml-20">
            Editar Livro { id }
        </div>
       )

}

export default EditarLivro;