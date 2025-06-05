import { useState } from "react";
import { LivroI } from "@/utils/types/livros";
import Link from "next/link";

export function ItemLivros({ data }: { data: LivroI }) {
  const [rating, setRating] = useState(0);

  const handleClick = (value: number) => {
    setRating(value);
  };

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
        <h5 className="mb-2 text-2xl font-inter tracking-tight text-gray-900 dark:text-white">
          {data.titulo}
        </h5>
        <h5 className="mb-2 text-2xl font-inter tracking-tight text-gray-900 dark:text-white">
          {data.autor}
        </h5>       
        <Link
          href={`/detalhes/${data.id}`}
          type="button"
         className="px-3 py-2 font-inter text-sm text-white bg-vermelho rounded-lg hover:bg-yallow-500 focus:ring-4 focus:outline-none focus:ring-red-500 dark:bg-red-500 dark:hover:bg-red-500 dark:focus:ring-red-500"
        >
          Ver Sinopse
        </Link>

        <div className="flex items-center mt-4">
          {[1, 2, 3, 4, 5].map((value) => (
            <svg
              key={value}
              onClick={() => handleClick(value)}
              className={`w-6 h-6 cursor-pointer ms-1 ${
                value <= rating ? "text-yellow-300" : "text-gray-300 dark:text-gray-500"
              }`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
            </svg>
          ))}
        </div>
      </div>
    </div>
  );
}

