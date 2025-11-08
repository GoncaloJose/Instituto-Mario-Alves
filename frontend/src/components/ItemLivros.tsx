import { useState } from "react";
import { LivroI } from "@/utils/types/livros";
import Link from "next/link";
import { useUsuarioStore } from "@/context/usuario";

export function ItemLivros({ data }: { data: LivroI }) {
  const [expanded, setExpanded] = useState(false);
  const { usuario } = useUsuarioStore();

  const charLimit = 100;
  const isLongSinopse = data.sinopse?.length > charLimit;
  const previewSinopse = data.sinopse?.slice(0, charLimit) + "...";

  return (
    <div className="mt-10 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-center">
        <img
          className="rounded-t-lg w-1/2 h-auto"
          src={data.foto}
          alt={`Imagem do Livro`}
        />
      </div>

      <div className="p-5 text-center">
        <h5 className="mb-2 text-xl font-inter tracking-tight text-gray-900 dark:text-white">
          {data.titulo}
        </h5>
        <h5 className="mb-2 text-lg font-inter tracking-tight text-gray-900 dark:text-white">
          {data.autor}
        </h5>

        {/* Sinopse com “Ver Mais” */}
        <p className="mb-2 text-sm font-inter text-gray-700 dark:text-gray-400">
          {isLongSinopse && !expanded ? previewSinopse : data.sinopse}
        </p>

        {isLongSinopse && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mb-3 text-sm text-red-600 hover:underline font-medium"
          >
            {expanded ? "Ver Menos" : "Ver Mais"}
          </button>
        )}

        {/* Botões lado a lado com espaçamento */}
        <div className="flex justify-center gap-3 mt-4">
          <Link
            href={`/detalhes/${data.id}`}
            className="px-3 py-1.5 text-sm font-inter text-white bg-vermelho rounded-md hover:bg-red-500 focus:ring-2 focus:outline-none focus:ring-red-500 dark:bg-red-500 dark:hover:bg-red-500 dark:focus:ring-red-500"
          >
            Sinopse
          </Link>

        {(usuario && !usuario.inadimplente) && (
          <Link
          href={`/reservar?livroId=${data.id}`}
          className="px-3 py-1.5 text-sm font-inter rounded-md text-white bg-vermelho hover:bg-red-500 focus:ring-red-500 focus:ring-2 focus:outline-none dark:bg-red-500 dark:hover:bg-red-500 dark:focus:ring-red-500"
          >
          Reservar
          </Link>
        )}
        </div>
      </div>
    </div>
  );
}
