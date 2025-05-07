"use client";

import { useForm } from "react-hook-form";

type Inputs = {
  email: string;
};

export default function RecuperarSenha() {
  const { register, handleSubmit } = useForm<Inputs>();

  async function enviarEmailRecuperacao(data: Inputs) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/usuarios/recuperar-senha`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ email: data.email }),
    });

    if (response.status == 200) {
      alert("E-mail de recuperação enviado!");
    } else {
      alert("Erro! E-mail não encontrado.");
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-inter leading-tight text-gray-900 md:text-2xl dark:text-white">
              Recuperação de Senha
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(enviarEmailRecuperacao)}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm text-gray-900 dark:text-white">
                  Digite seu e-mail cadastrado:
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700"
                  placeholder="seuemail@exemplo.com"
                  required
                  {...register("email")}
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-red-500 hover:bg-red-600 focus:ring-4 rounded-lg px-5 py-2.5"
              >
                Enviar link de recuperação
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}