"use client";

import Link from "next/link";
import { useUsuarioStore } from "@/context/usuario";
import { useRouter } from "next/navigation";

export function Header() {
  const { usuario, deslogaUsuario } = useUsuarioStore();
  const router = useRouter();

  function sairUsuario() {
    deslogaUsuario();
    if (localStorage.getItem("client_key")) {
      localStorage.removeItem("client_key");
    }
    router.push("/login");
  }

  return (
    <nav className="border-gray-200 dark:bg-gray-900">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="./vermelho.png" className="h-16" alt="Biblioteca IMA" />
          <span className="self-center text-3xl font-inter whitespace-nowrap dark:text-white">
            Instituto Mário Alves
          </span>
        </a>

        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          {usuario.id ? (
            <>
              {/* <div className="flex items-center justify-center space-x-6 rtl:space-x-reverse">
                <Link
                  href={"/reservar"}
                  className="mt-5 flex-1 align-items-center justify-center w-full text-white bg-vermelho hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-inter rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Reservar
                </Link>

                <Link
                  href={"/renovacao"}
                  className="mt-5 flex-1 align-items-center justify-center w-full text-white bg-vermelho hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-inter rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Renovar
                </Link> */}

              <Link
                href="/emprestimo"
                className="mt-5 flex-1 align-items-center justify-center w-full text-white bg-vermelho hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-inter rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Empréstimos
              </Link>

              <div className="flex flex-col items-center justify-center w-full h-full text-center">
                {/* Avatar */}
                <div className="relative w-16 h-16 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 mb-4">
                  <svg
                    className="absolute w-20 h-20 text-gray-400 -left-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                {/* Texto de boas-vindas */}
                <p className="text-extrabold text-lg font-inter text-black dark:text-white mb-2">
                  Olá, {usuario.nome}
                </p>
              </div>

              <span
                className="cursor-pointer text-extrabold font-inter text-black-900 dark:text-black-900 hover:underline"
                onClick={sairUsuario}
              >
                Sair
              </span>
            </>
          ) : (
            <>
              <Link
                href="/cadastro"
                className="cursor-pointer text-extrabold text-xl font-inter text-black-500 dark:text-black hover:underline"
              >
                Cadastre-se
              </Link>

              <Link
                href="/login"
                className="text-extrabold font-inter text-xl text-black-900 dark:text-black-900 hover:underline"
              >
                Entrar
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
