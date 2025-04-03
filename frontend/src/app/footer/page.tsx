import Link from "next/link";

export default function Ima() {
  return (
    <>
      <div className="m-4">
        <img
          className="max-w-sm mx-auto mt-5 flex-1 align-items-center justify-center"
          src="./imacasa.jpg"
          alt="logo"
        />
      </div>

      <p className="mb-3 text-gray-500 dark:text-gray-400 first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-gray-100 first-letter:me-3 first-letter:float-start mx-4 my-4">
        O Instituto Mário Alves é uma OSCIP, não partidária e sem fins
        lucrativos. É um espaço de construção e formação política, que tem na
        pluralidade e na justiça social seus valores principais. Ajuda a
        organizar e se faz presente nas lutas cotidianas em defesa desses
        valores.
      </p>

      <p className="text-gray-500 dark:text-gray-400 mx-4 my-4">
        Sua atuação se dá também através da realização de projetos, seminários,
        cursos e debates relativos aos temas políticos mais relevantes, bem como
        busca desenvolver estudos e pesquisas na área. É, igualmente, um espaço
        de apoio aos mais diversos grupos políticos da cidade e região, propondo
        a participação das pessoas, instituições, movimentos sociais e
        entidades. E, por isso, é um espaço importante de resistência.
      </p>
      <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />
      <p className="text-gray-500 dark:text-gray-400 mx-4 my-4">
        Foi fundado no dia 26 de maio de 2001, na cidade de Pelotas/RS, Brasil.
        Sua criação surgiu da necessidade sentida por diversos militantes
        opositores ao projeto capitalista, de construir um espaço alternativo.
        Foi pensado para que servisse de ponto de encontro entre as diversas
        reflexões sobre a esquerda brasileira e internacional. Uma esquerda
        ligada às lutas populares e aos trabalhadores, que mantém viva a
        concepção política de resgatar a importância dos movimentos sociais como
        agentes transformadores da ordem social discriminadora e capitalista.
      </p>

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

