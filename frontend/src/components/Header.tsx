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
        {/* Logo e título */}
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="./vermelho.png" className="h-16" alt="Biblioteca IMA" />
          <span className="self-center text-3xl font-inter whitespace-nowrap dark:text-white">
            Instituto Mário Alves
          </span>
        </a>

        {/* Área de ações */}
        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          {usuario.id ? (
            <div className="flex items-center space-x-3">
              {/* Nome do usuário */}
              <p className="text-extrabold text-lg font-inter text-black dark:text-white">
                Olá, {usuario.nome}
              </p>

              {/* Link para Minha Página */}
              <Link
                href="/minha_pagina"
                className="text-sm font-inter text-white bg-vermelho hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg px-3 py-1 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Minha&nbsp;Página
              </Link>

              {/* Botão Login ADM */}
              <a
                href="http://localhost:3000"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-inter text-white bg-vermelho hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg px-3 py-1 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Login ADM
              </a>

              {/* Botão de Sair */}
              <span
                className="cursor-pointer text-extrabold font-inter text-black-900 dark:text-black-900 hover:underline"
                onClick={sairUsuario}
              >
                Sair
              </span>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              {/* Botão Login ADM visível mesmo sem login */}
              <a
                href="http://localhost:3000"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-inter text-white bg-vermelho hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg px-3 py-1 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Login ADM
              </a>

              {/* Links para cadastro e login */}
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
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}