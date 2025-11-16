"use client";

import Link from "next/link";
import { useUsuarioStore } from "@/context/usuario";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function Header() {
  const {
    usuario,
    atualizaUsuario,
    deslogaUsuario
  } = useUsuarioStore();

  const router = useRouter();

  function sairUsuario() {
    deslogaUsuario();

    router.push("/login");
  }

  useEffect(() => {
		const verificaInadimplencia  = async() => {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_URL_API}/usuarios/${usuario.id}/inadimplente`
				);

        if (response.ok) {
          const dados = await response.json()

          usuario.inadimplente = dados.inadimplente;
          atualizaUsuario(usuario);
        }
			} catch (error) {
				console.error(error)
			}
		}

    if (usuario.id) {
      // Atualiza em background esse usuário e guarda na store
      verificaInadimplencia();
    }
  }, [usuario?.id]);

  return (
	  <>
		  {usuario && usuario.inadimplente && (
			  <div className="w-full flex bg-vermelho text-white font-bold items-center justify-center text-center p-2">
				  <p>
					  ⚠️ Atenção: Seu acesso está bloqueado devido a pagamentos
					  vencidos. Por favor, regularize sua situação para continuar
					  utilizando nossos serviços. ⚠️
				  </p>
			  </div>
		  )}
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
				  <p className="text-extra-xl text-lg font-inter text-black dark:text-white">
					Olá, {usuario.nome}
				  </p>

				  {/* Link para Minha Página */}
				  <Link
					href="/minha_pagina"
					className="text-sm font-inter text-white bg-vermelho hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-600 rounded-lg px-3 py-1 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
				  >
					Minha&nbsp;Página
				  </Link>

				  {/* Botão Login ADM */}
				  <a
					href="http://localhost:3001"
					target="_blank"
					rel="noopener noreferrer"
					className="text-sm font-inter text-white bg-vermelho hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-red-600 rounded-lg px-3 py-1 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
				  >
					Login ADM
				  </a>

				  {/* Botão de Sair */}
				  <span
					className="cursor-pointer text-xl font-inter text-black-900 dark:text-red-900 hover:text-red-600 transition-colors duration-200"
					onClick={sairUsuario}
				  >
					Sair
				  </span>
				</div>
			  ) : (
				<div className="flex items-center space-x-3">
				  {/* Botão Login ADM visível mesmo sem login */}
				  <a
					href="http://localhost:3001"
					target="_blank"
					rel="noopener noreferrer"
					className="text-sm font-inter text-white bg-vermelho hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg px-3 py-1 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
				  >
					Login ADM
				  </a>

				  {/* Links para cadastro e login */}
				  <Link
					href="/cadastro"
					className="cursor-pointer text-extrabold text-xl text-black-500 dark:text-black hover:text-red-600 font-medium transition-colors duration-200"
				  >
					Cadastre-se
				  </Link>

				  <Link
					href="/login"
					className="text-extrabold text-xl text-black-900 dark:text-black-900 hover:text-red-600 font-medium transition-colors duration-200"
				  >
					Entrar
				  </Link>
				</div>
			  )}
			</div>
		  </div>
		</nav>
	</>
  );
}
