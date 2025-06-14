"use client";

import { LivroI } from "@/utils/types/livros";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useUsuarioStore } from "@/context/usuario";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Link from "next/link";

type Inputs = {
  descricao: string;
};

export default function Detalhes() {
  const params = useParams();
  const { usuario } = useUsuarioStore();
  const [livro, setLivro] = useState<LivroI | null>(null);
  const { register, handleSubmit, reset } = useForm<Inputs>();

  useEffect(() => {
    async function buscaDados() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/livros/${params.livro_id}`
      );
      const dados = await response.json();
      setLivro(dados);
    }
    buscaDados();
  }, [params.livro_id]);

  async function enviaComentario(data: Inputs) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/comentarios`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          usuarioId: usuario.id,
          livroId: Number(params.livro_id),
          descricao: data.descricao,
        }),
      }
    );
    if (response.status === 201) {
      toast.success("Obrigado. Seu comentário foi enviado. Aguarde retorno");
      reset();
    } else {
      toast.error("Erro... Não foi possível enviar seu comentário");
    }
  }

  return (
    <section>
      <h1 className="ms-48 mt-10 mb-5 text-2xl font-inter tracking-tight text-gray-900 dark:text-white flex items-center text-center">
        <strong>Sugestões de Leitura:&nbsp;</strong>
        <span className="decoration-none decoration-red-600">
          {" "}
          {livro?.titulo} {livro?.autor}{" "}
        </span>
      </h1>
      <div className="mt-10 mb-10 mx-auto flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-5xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <a href="#">
          <img
            className="mt-10 ms-2 object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
            src={livro?.foto}
            alt="Imagem do Livro"
          />
        </a>
        <div className="flex flex-col justify-between p-4 leading-normal">
          <a>
            <h5 className="mb-2 text-2xl font-inter tracking-tight text-gray-900 dark:text-white">
              <strong>Título:</strong> {livro?.titulo}
            </h5>
          </a>
          <a>
            <h5 className="mb-2 text-xl font-inter tracking-tight text-gray-900 dark:text-white">
              <strong>Sinopse:</strong> {livro?.sinopse}
            </h5>
          </a>

          {usuario.id ? (
            <>
              <form onSubmit={handleSubmit(enviaComentario)}>
                <input
                  type="text"
                  className="mb-2 mt-4 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={`${usuario.nome} (${usuario.email})`}
                  disabled
                  readOnly
                />
                <textarea
                  id="message"
                  className="mb-2 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Escreva seu comentário..."
                  required
                  {...register("descricao")}
                ></textarea>
                <button
                  type="submit"
                  className="ms-5 inline-flex items-center px-3 py-2 text-sm font-inter text-center text-white bg-vermelho rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                  Enviar Comentário
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </button>
              </form>
              <div className="ms-5 mt-5">
                <Link
                  href={`/reservar?livroId=${livro?.id}&titulo=${
                    livro?.titulo ? encodeURIComponent(livro.titulo) : ""
                  }`}
                  className="ms-5 mt-5 px-5 py-2 text-sm font-inter text-center text-white bg-vermelho rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                  Reservar
                </Link>
              </div>
            </>
          ) : (
            <>
              <h3 className="text-xl font-inter tracking-tight text-orange-700 dark:text-white">
                Faça login ou cadastro para reservar o livro!!
              </h3>
              <div className="ms-5 mt-5">
                <Link
                  href="/login"
                  className="ms-5 mt-5 px-5 py-2 text-sm font-inter text-center text-white bg-vermelho rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                  Login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
