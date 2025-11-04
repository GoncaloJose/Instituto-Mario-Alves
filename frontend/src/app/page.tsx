"use client";

import { InputPesquisa } from "@/components/InputPesquisa";
import { ItemLivros } from "@/components/ItemLivros";
import { LivroI } from "@/utils/types/livros";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [livros, setLivros] = useState<LivroI[]>([]);

  useEffect(() => {
    async function buscarSugestoes() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/livros`);
      const dados = await response.json();

      setLivros(dados);
    }

    buscarSugestoes();
  }, []);

  const listaLivros = livros.map((livro) => (
    <ItemLivros data={livro} key={livro.id} />
  ));

  return (
    <>
      <InputPesquisa setLivros={setLivros} />

      <div className="d-flex align-items-center justify-center mx-5">
        <img src="./bibli 1.jpg" className="mx-auto mt-10 w-full" alt="Capa do livro" />

      </div>

      <div className="mx-auto max-w-screen-2xl flex justify-center">
        <h1 className="mt-5 mb-4 flex items-center text-5xl dark:text-black text-center">
          Sugestões de Leitura
        </h1>
      </div>


      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {listaLivros}
      </section>

      <footer className="bg-vermelho rounded-lg shadow dark:bg-gray-900 m-2">
        <div className="w-full max-w-screen-xl mt-5 mx-auto p-2">
          <ul className="flex flex-wrap items-center mb-2 text-sm font-inter text-black-500 dark:text-black-400 justify-between">
            <li className="flex-1 text-left pr-5">
              <Link
                href="/footer"
                className="cursor-pointer text-extrabold font-inter text-xl text-white dark:text-black hover:underline whitespace-nowrap"
              >
                Sobre o Ima
              </Link>
            </li>
            <li className="flex-1 text-center px-10">
              <Link
                href="/mario"
                className="cursor-pointer text-extrabold font-inter text-xl text-white dark:text-black hover:underline whitespace-nowrap"
              >
                Quem foi Mário Alves
              </Link>
            </li>
            <li className="flex-1 text-right pl-10">
              <Link
                href="/contato"
                className="cursor-pointer text-extrabold font-inter text-xl text-white dark:text-black hover:underline"
              >
                Contato
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-3 border-gray-200 sm:mx-auto dark:border-black-700" />
        <span className="block text-semibold text-white sm:text-center dark:text-black-400 mb-2">
          <a href="/" className="hover:underline text-xl me-5">
            Instituto Mário Alves™ © 2025. Todos os Direitos Reservados.
          </a>
        </span>
      </footer>
    </>
  );
}
