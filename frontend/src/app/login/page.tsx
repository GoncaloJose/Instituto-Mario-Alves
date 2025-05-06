"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useUsuarioStore } from "@/context/usuario";
import Link from "next/link";

type Inputs = {
  email: string;
  senha: string;
  continuar: boolean;
};

export default function Login() {
  const { register, handleSubmit } = useForm<Inputs>();
  const router = useRouter();
  const { logaUsuario } = useUsuarioStore();

  async function verificaLogin(data: Inputs) {
    // console.log(data)

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/usuarios/login`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ email: data.email, senha: data.senha }),
      }
    );
    // console.log(response)
    if (response.status == 200) {
      const dados = await response.json();
      //alert("Ok")
      logaUsuario(dados);
      router.push("/");

      if (data.continuar) {
        localStorage.setItem("client_key", dados.id);
      } else {
        if (localStorage.getItem("client_key")) {
          localStorage.removeItem("client_key");
        }
      }

      router.push("/");
    } else {
      alert("Erro... Login ou Senha incorretos");
    }
  }

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-inter leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Informe seus Dados de Acesso
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(verificaLogin)}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-inter text-gray-900 dark:text-white"
                  >
                    E-mail de Acesso:
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="nome@company.com"
                    required
                    {...register("email")}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-inter text-gray-900 dark:text-white"
                  >
                    Senha
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    {...register("senha")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5"></div>
                    <label className="inline-flex items-center mb-5 cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
                        className="sr-only peer"
                        required
                        {...register("continuar")}
                      />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-500 dark:peer-focus:ring-red-800 rounded-full peer dark:bg-red-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-red-600 peer-checked:bg-red-600"></div>
                      <span className="ms-3 text-sm font-inter text-gray-900 dark:text-gray-300">
                        Continuar Conectado
                      </span>
                    </label>
                  </div>
                  <a
                    href="/recuperar-senha"
                    className="text-sm font-inter text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Esqueceu sua Senha?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-vermelho hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-inter rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Entrar
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Não está Cadastrado?{" "}
                  <Link
                    href={"/cadastro"}
                    className="font-inter text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Cadastre-se
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
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
            Instituto Mário Alves™ © 2024. Todos os Direitos Reservados.
          </a>
        </span>
      </footer>
    </>
  );
}
