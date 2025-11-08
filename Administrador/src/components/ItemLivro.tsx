"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { FaPencilAlt, FaRegStar } from "react-icons/fa";
import Cookies from "js-cookie";
import { LivroI } from "@/utils/types/livros";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Link não é mais usado para editar, mas pode ser usado em outro lugar

interface listaLivroProps {
  livro: LivroI;
  onDelete: any;
  onDestacar: any;
}

function ItemLivro({ livro, onDelete, onDestacar }: listaLivroProps) {
  const router = useRouter();

  async function excluirLivro(id: number) {
    if (confirm(`Confirma a exclusão`)) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/livros/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: ("Bearer " +
              Cookies.get("admin_logado_token")) as string,
          },
        }
      );

      if (response.ok) {
        onDelete(id); // Chama a função passada via props para atualizar a lista
      } else {
        alert("Erro... Livro não foi excluído");
      }
    }
  }

  async function alterarDestaque(id: number) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/livros/destacar/${id}`, // Usei o 'id' do argumento
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: ("Bearer " +
            Cookies.get("admin_logado_token")) as string,
        },
      }
    );

    if (response.ok) {
      onDestacar(id);
    } else {
      // ???
    }

    // if (response.status == 200) {
    //   const livros2 = livros.map((x) => {
    //     if (x.id == id) { // Usei o 'id' do argumento
    //       return { ...x, destaque: !x.destaque };
    //     }
    //     return x;
    //   });
    //   setLivros(livros2);
    // }
  }

  return (
        <div
          key={livro.id}
          className="block group bg-white dark:bg-gray-800 min-h-[750px]"
        >
            <div className="aspect-[2/3] bg-gray-100 rounded-md overflow-hidden mb-2">
              <img
                src={livro.foto}
                alt={`Capa do Livro: ${livro.titulo}`}
				className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>

            {/* Informações */}
            <div className="flex flex-col justify-between p-4">
              <div>
                <h3
                  className={`text-lg font-bold mb-2 ${
                    livro.destaque
                      ? "text-yellow-500"
                      : "text-gray-900 dark:text-white"
                  }`}
                >
                  {livro.titulo}
                </h3>

                {/* ... (Detalhes: Autor, Editora, Gênero, Sinopse - sem mudanças) ... */}
                <div className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                  <strong className="text-gray-900 dark:text-white">Autor(a):</strong>
                  {livro.autores.map((autor) => (
                    <span key={autor.id} className="block ml-2">{autor.nome}</span>
                  ))}
                </div>

                <div className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                  <strong className="text-gray-900 dark:text-white">Editora:</strong>
                  <span className="block ml-2">{livro.editoras.nome}</span>
                </div>

                <div className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                  <strong className="text-gray-900 dark:text-white">Gênero(s):</strong>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {livro.generos.map((genero) => (
                      <span key={genero.id} className="text-xs bg-gray-200 dark:bg-gray-700 rounded-full px-2 py-0.5">
                        {genero.tipo}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <strong className="text-gray-900 dark:text-white text-sm">Sinopse:</strong>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-3">
                    {livro.sinopse}
                  </p>
                </div>
              </div>

              {/* Botões */}
              <div className="flex justify-end items-center gap-3 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => alterarDestaque(livro.id)}
                  title={livro.destaque ? "Remover Destaque" : "Destacar"}
                  className="p-2 text-gray-500 hover:text-yellow-600 dark:text-gray-400 dark:hover:text-yellow-400 transition-colors"
                >
                  <FaRegStar
                    className={`text-xl ${
                      livro.destaque ? "text-yellow-500" : ""
                    }`}
                  />
                </button>

                <button
                  onClick={() => excluirLivro(livro.id)}
                  title="Excluir"
                  className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500 transition-colors"
                >
                  <TiDeleteOutline className="text-2xl" />
                </button>

                {/* --- MUDANÇA FEITA AQUI --- */}
                {/* 1. Trocado <Link> por <button> */}
                {/* 2. Adicionado onClick com a função solicitada */}
                <Link
                  href={`/principal/livros/${livro.id}`}
                  className="flex items-center gap-1.5 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-500 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-red-500 dark:hover:bg-red-600 focus:outline-none dark:focus:ring-red-800 transition-colors"
                >
                  <FaPencilAlt />
                  Editar
                </Link>
                {/* --- FIM DA MUDANÇA --- */}
              </div>
            </div>
        </div>
  );
}

export default ItemLivro;
