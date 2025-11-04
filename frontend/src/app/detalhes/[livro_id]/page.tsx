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

  return (
    <section>
      <h1 className="ms-48 mt-10 mb-5 text-2xl font-inter tracking-tight text-gray-900 dark:text-white flex items-center text-center">
        <span className="decoration-none decoration-red-600">
          {" "}
			{livro?.titulo} por {livro?.autores.map((autor) => autor.nome).join(", ")}{" "}
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
			(!usuario.inadimplente && (
            <>
              <div className="ms-5 mt-5">
                <Link
                  href={`/reservar?livroId=${livro?.id}`}
                  className="ms-5 mt-5 px-5 py-2 text-sm font-inter text-center text-white bg-vermelho rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                  Reservar
                </Link>
              </div>
            </>
			))) : (
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
