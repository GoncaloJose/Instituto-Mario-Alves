"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Eye, EyeOff } from "lucide-react"; // ícones

type Inputs = {
  email: string;
  senha: string;
};

export default function Home() {
  const { register, handleSubmit, setFocus } = useForm<Inputs>();
  const router = useRouter();
  const [mostrarSenha, setMostrarSenha] = useState(false);

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  async function verificaLogin(data: Inputs) {
    const response = await fetch("http://localhost:3004/usuarios/login", {
      method: "POST",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify({ email: data.email, senha: data.senha }),
    });

    if (response.status === 200) {
      const usuario = await response.json();

      if (usuario.admin) {
        Cookies.set("admin_logado_id", usuario.id);
        Cookies.set("admin_logado_nome", usuario.nome);
        Cookies.set("admin_logado_token", usuario.token);
        router.push("/principal");
      } else {
        toast.error("Erro... Acesso Restrito!!");
      }
    } else if (response.status === 400) {
      toast.error("Erro... Login ou senha incorretos");
    }
  }

  return (
    <main className="max-w-screen-xl flex flex-col items-center mx-auto p-6">
      <img
        src="./vermelho.png"
        alt="Biblioteca"
        style={{ width: 240 }}
        className="d-block"
      />
      <div className="max-w-sm w-full">
        <h1 className="text-3xl font-bold my-8">Administrador: Subversivo</h1>
        <form onSubmit={handleSubmit(verificaLogin)} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              E-mail:
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Senha:
            </label>
            <input
              type={mostrarSenha ? "text" : "password"}
              id="password"
              {...register("senha")}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
            <button
              type="button"
              onClick={() => setMostrarSenha((prev) => !prev)}
              className="absolute right-3 top-9 transform -translate-y-1/2 text-gray-600 dark:text-gray-300"
            >
              {mostrarSenha ? <EyeOff size={20} className="mt-7"/> : <Eye size={20} className="mt-7"/>}
            </button>
          </div>

          <button
            type="submit"
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-600 font-medium rounded-lg text-sm w-full px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}
