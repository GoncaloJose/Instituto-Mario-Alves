import { useState } from "react";
import { AutorI } from "@/utils/types/autores";

export function ItemAutores({ data }: { data: AutorI }) {
  const [rating, setRating] = useState(0);

  const handleClick = (value: number) => {
    setRating(value);
  };

  return (

      <div className="p-5 text-center">
        <h5 className="mb-2 text-2xl font-inter tracking-tight text-gray-900 dark:text-white">
          {data.nome}
        </h5>

        <h5 className="mb-2 text-2xl font-inter tracking-tight text-gray-900 dark:text-white">
          {data.pais}
        </h5>

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
  );
}