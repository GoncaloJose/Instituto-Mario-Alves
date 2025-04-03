import Link from "next/link";

export default function Contato() {
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-screen-xl">
          {/* Primeiro Card */}
          <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
              Nosso Endereço:
            </h5>
            <div className="font-normal text-gray-700 dark:text-gray-400">
              <p className="text-xl text-black font-semibold">Endereço: Coronel Alberto Rosa</p>
              <p className="text-xl text-black font-semibold">nº 164</p>
              <p className="text-xl text-black font-semibold">Pelotas-RS</p>
              <p className="text-xl text-black font-semibold">Cep: 0000-00</p>
            </div>
          </div>

          {/* Segundo Card */}
          <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
              Nosso Telefone:
            </h5>
            <div className="font-normal text-gray-700 dark:text-gray-400">
              <p className="text-xl text-black font-semibold">Telefone: (53) 3025-7241</p>
              <p className="text-xl text-black font-semibold">WhatsApp: (53) 98425-7241</p>
            </div>
          </div>

          {/* Terceiro Card */}
          <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
              Nosso E-mail:
            </h5>
            <div className="font-normal text-gray-700 dark:text-gray-400">
              <p className="text-xl text-black font-semibold">Email: institutomarioalves@gmail.com</p>
            </div>
          </div>

          {/* Quarto Card */}
          <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
              Horário de Atendimento:
            </h5>
            <div className="font-normal text-gray-700 dark:text-gray-400">
              <p className="text-xl text-red-600 font-semibold">Horário Atendimento:</p>
              <p className="text-xl text-red-600 font-semibold">Segunda a Sexta das 13h às 19h.</p>
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
