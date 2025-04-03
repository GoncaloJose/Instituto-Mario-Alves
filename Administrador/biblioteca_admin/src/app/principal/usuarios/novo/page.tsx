"use client";

import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { UsuarioI } from "@/utils/types/usuarios";

type Entradas = {
  nome: string;
  email: string;
  senha: string;

};

function NovoUsuario() {
  const [usuarios, setUsuarios] = useState<UsuarioI[]>([]);
  const { register, handleSubmit, reset, setFocus } = useForm<Entradas>();

  useEffect(() => {
    async function getUsuarios() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/usuarios`);
      const dados = await response.json();
      setUsuarios(dados);
    }
    getUsuarios();
    setFocus("nome");
  }, [setFocus]);

  const optionsUsuario = usuarios.map((usuario: { id: any; nome: any; }) => (
    <option key={usuario.id} value={usuario.id}>
      {usuario.nome}
    </option>
  ));

  async function incluirUsuario( dados : Entradas ) {
    const novoUsuario : Entradas = {
      nome: dados . nome,
      email: dados . email,
      senha: dados . senha,

    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/usuarios`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + (Cookies.get("admin_logado_token") as string),
      },
      body: JSON.stringify(novoUsuario),
    });

    if (response.status == 201) {
      toast.success("Ok! Usuário cadastrado com sucesso");
      reset();
    } else {
      toast.error("Erro no cadastro do Usuário...");
    }
  }

  return (
    <>
      <h1 className="mb-4 mt-24 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white me-56">
        Inclusão de Usuários
      </h1>

      <form className="max-w-xl mx-auto" onSubmit={handleSubmit(incluirUsuario)}>
        <div className="mb-3">
          <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Nome
          </label>
          <input
            type="text"
            id="nome"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
            required
            {...register("nome")}
          />
        </div>

          <div className="mb-3">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
              required
              {...register("email")}
            />
          </div>

        <div className="grid gap-6 mb-3 md:grid-cols-2">
          <div className="mb-3">
            <label htmlFor="senha" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Senha
            </label>
            <input
              type="senha"
              id="senha"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
              required
              {...register("senha")}
            />
          </div>
        </div>
          
        <button
          type="submit"
          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
          Incluir
        </button>
      </form>
    </>
  );
}

export default NovoUsuario;