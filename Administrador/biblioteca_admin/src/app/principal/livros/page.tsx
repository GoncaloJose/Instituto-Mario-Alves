'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LivroI } from '@/utils/types/livros';
import ItemLivro from '@/components/ItemLivro';

function CadLivros() {
  const [livros, setLivros] = useState<LivroI[]>([]);

  useEffect(() => {
    async function getLivros() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/livros`);
      const dados = await response.json();
      setLivros(dados);
    }
    getLivros();
  }, []);

  function exportarCSV() {
    const cabecalho = [
      'ID',
      'Título',
      'Autores',
      'Editora',
      'Gêneros',
      'Criado em',
    ];

    const linhas = livros.map((livro) => [
      livro.id,
      livro.titulo?.replace(/[\n\r]/g, ' ') || '',
      livro.autores?.map((a) => a.nome).join(' | ') || '',
      livro.editoras?.nome || '',
      livro.generos?.map((g) => g.tipo).join(' | ') || '',
      new Date(livro.createdAt).toLocaleDateString('pt-BR'),
    ]);

    const conteudo = [cabecalho, ...linhas]
      .map((linha) => linha.map((campo) => `"${campo}"`).join(';'))
      .join('\n');

    const blob = new Blob([`\uFEFF${conteudo}`], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'livros.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const listaLivros = livros.map((livro) => (
    <ItemLivro key={livro.id} livro={livro} livros={livros} setLivros={setLivros} />
  ));

  return (
    <div className="m-4 mt-24">
      <div className="flex justify-between">
        <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
          Lista de Livros:
        </h1>
        <Link
          href="livros/novo"
          className="text-white bg-vermelho hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-bold rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
        >
          Novo Livro
        </Link>
        <Link
          href="autores/novo"
          className="text-white bg-vermelho hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-bold rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
        >
          Novo Autor
        </Link>
        <Link
          href="editoras/novo"
          className="text-white bg-vermelho hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-bold rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
        >
          Nova Editora
        </Link>
        <Link
          href="generos/novo"
          className="text-white bg-vermelho hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-bold rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
        >
          Novo Gênero
        </Link>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xl text-white uppercase bg-vermelho dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Livro</th>
              <th scope="col" className="px-6 py-3">Título</th>
              <th scope="col" className="px-6 py-3">Autor(a)</th>
              <th scope="col" className="px-6 py-3">Editora</th>
              <th scope="col" className="px-6 py-3">Gênero</th>
              <th scope="col" className="px-6 py-3">Sinopse</th>
              <th scope="col" className="px-6 py-3">Destacar & Excluir</th>
              <th scope="col" className="px-6 py-3">
                <button
                  onClick={exportarCSV}
                  className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-bold rounded-lg text-sm px-4 py-2 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800"
                >
                  Exportar CSV
                </button>
              </th>
            </tr>
          </thead>
          <tbody>{listaLivros}</tbody>
        </table>
      </div>
    </div>
  );
}

export default CadLivros;