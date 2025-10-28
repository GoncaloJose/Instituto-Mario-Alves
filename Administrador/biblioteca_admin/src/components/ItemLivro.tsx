"use client";
// 1. O 'useState' continua sendo necessário
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { FaRegStar } from "react-icons/fa";
import Cookies from "js-cookie";
import { LivroI } from "@/utils/types/livros";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface listaLivroProps {
  livro: LivroI;
  livros: LivroI[];
  setLivros: Dispatch<SetStateAction<LivroI[]>>;
}

function ItemLivro({ livro, livros, setLivros }: listaLivroProps) {
  const router = useRouter();

  // 2. O estado inicial (pode ser 'false' ou o status vindo do 'livro')
  

  async function excluirLivro() {
    // ... (função original sem mudanças) ...
    if (confirm(`Confirma a exclusão`)) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/livros/${livro.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: ("Bearer " +
              Cookies.get("admin_logado_token")) as string,
          },
        }
      );

      if (response.status == 200) {
        const livros2 = livros.filter((x) => x.id != livro.id);
        setLivros(livros2);
        alert("Livro excluído com sucesso");
      } else {
        alert("Erro... Livro não foi excluído");
      }
    }
  }

  async function alterarDestaque() {
    // ... (função original sem mudanças) ...
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/livros/destacar/${livro.id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: ("Bearer " +
            Cookies.get("admin_logado_token")) as string,
        },
      }
    );

    if (response.status == 200) {
      const livros2 = livros.map((x) => {
        if (x.id == livro.id) {
          return { ...x, destaque: !x.destaque };
        }

        return x;
      });
      setLivros(livros2);
    }
  }

  return (
    <div className="px-3 py-2">
      <th className="px-3 py-2">
        <tr
          key={livro.id}
          className="px-3 py-2 odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
          <th scope="row"
            className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            <img src={livro.foto} alt="Capa do Livro" style={{ width: 1600 }} /> 
          </th>
          <td className={`px-3 py-2 ${livro.destaque ? "font-extrabold" : ""}`}>
                    {livro.titulo}     
          </td>
          <td className="px-3 py-2">
            {livro.autores.map((autor) => (
              <span key={autor.id} className="block">
                {autor.nome}
              </span>
            ))}
          </td>
          <td className="px-3 py-2">
            {
              <span key={livro.editoras.id} className="block">
                {livro.editoras.nome}
              </span>
            }
          </td>
          <td className="px-3 py-2">
            {livro.generos.map((genero) => (
              <span key={genero.id} className="block">
                {genero.tipo}
              </span>
            ))}
          </td>
          <td className="px-3 py-2">        
            {livro.sinopse}      
            </td>   
          <td className="px-3 py-2">
            <TiDeleteOutline
              className="text-2xl text-red-600 inline-block cursor-pointer"
              title="Excluir"
              onClick={excluirLivro}
            />
            &nbsp;        
            <FaRegStar
              className="text-2xl text-yellow-600 inline-block cursor-pointer"
              title="Destacar"
              onClick={alterarDestaque}              
            />
          </td>                 
        </tr> 
      </th>
      <Link
                href="/principal/livros/novo"
                className="text-white bg-vermelho hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-bold rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
              >
                Editar Livro
              </Link>
    </div>
  );
}

export default ItemLivro;
