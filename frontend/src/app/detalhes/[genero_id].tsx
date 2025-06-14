"use client";

import { GeneroI } from "@/utils/types/generos";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useUsuarioStore } from "@/context/usuario";
import Link from "next/link";


export default function Detalhes() {
  const params = useParams();
  const { usuario } = useUsuarioStore();
  const [genero, setGenero] = useState<GeneroI | null>(null);


  useEffect(() => {
    async function buscaDados() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/generos/${params.genero_id}`
      );
      const dados = await response.json();
      setGenero(dados);
    }
    buscaDados();
  }, [params.genero_id]);

  return (
    <section>
        <div className="flex flex-col justify-between p-4 leading-normal">
          <a>
            <h5 className="mb-2 text-2xl font-inter tracking-tight text-gray-900 dark:text-white">
              {genero?.tipo}
            </h5>
          </a>

            <Link
            href={"/reservar"}
            className="inline-flex items-center ms-5 px-3 py-2 text-sm font-inter text-center text-white bg-vermelho rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            Reservar
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
        </div>
    </section>
  );
}