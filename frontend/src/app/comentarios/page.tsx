"use client";
import "./page.css";
import { useEffect, useState } from "react";
import { useUsuarioStore } from "@/context/usuario";
import { ComentarioI } from "@/utils/types/comentarios";

export default function Comentarios() {
  const [comentarios, setComentarios] = useState<ComentarioI[]>([]);
  const { usuario } = useUsuarioStore();

  useEffect(() => {
    async function buscaDados() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/comentarios/${usuario.id}`
      );
      const dados = await response.json();
      setComentarios(dados);
    }
    buscaDados();
  }, []);

  // para retornar apenas a data do campo no banco de dados
  // 2024-10-10T22:46:27.227Z => 10/10/2024
  function dataDMA(data: string) {
    const ano = data.substring(0, 4);
    const mes = data.substring(5, 7);
    const dia = data.substring(8, 10);
    return dia + "/" + mes + "/" + ano;
  }

  const comentariosTable = comentarios.map((comentario) => (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {comentario.livro.titulo}
      </th>
      <td className="px-6 py-4">
        <img
          src={comentario.livro.foto}
          className="fotoLivro"
          alt="Foto Livro"
        />
      </td>
      <td className="px-6 py-4">
        <p>
          <b>{comentario.descricao}</b>
        </p>
        <p>
          <i>Enviado em: {dataDMA(comentario.createdAt)}</i>
        </p>
      </td>
      <td className="px-6 py-4">
        {comentario.resposta ? (
          <>
            <p>
              <b>{comentario.resposta}</b>
            </p>
            <p>
              <i>Respondido em: {dataDMA(comentario.updatedAt as string)}</i>
            </p>
          </>
        ) : (
          <i>Aguardando...</i>
        )}
      </td>
    </tr>
  ));

  return (
    <section className="max-w-7xl mx-auto">
      <h1 className="mb-6 mt-4 text-3xl font-inter leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
        Listagem de{" "}
        <span className="underline underline-offset-3 decoration-8 decoration-red-400 dark:decoration-red-600">
          Meus Comentários
        </span>
      </h1>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Título do Livro
            </th>
            <th scope="col" className="px-6 py-3">
              Foto
            </th>
            <th scope="col" className="px-6 py-3">
              Comentário
            </th>
            <th scope="col" className="px-6 py-3">
              Resposta
            </th>
          </tr>
        </thead>
        <tbody>{comentariosTable}</tbody>
      </table>
    </section>
  );
}
