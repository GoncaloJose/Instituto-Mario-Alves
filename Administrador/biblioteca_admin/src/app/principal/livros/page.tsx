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
      <div className="flex flex-wrap gap-4 justify-start items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Lista de Livros
        </h1>
        <Link href="livros/novo" className="btn-vermelho">Novo Livro</Link>
        <Link href="autores/novo" className="btn-vermelho">Novo Autor</Link>
        <Link href="editoras/novo" className="btn-vermelho">Nova Editora</Link>
        <Link href="generos/novo" className="btn-vermelho">Novo Gênero</Link>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xl text-white uppercase bg-vermelho dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Foto</th>
              <th className="px-6 py-3">Título</th>
              <th className="px-6 py-3">Autores</th>
              <th className="px-6 py-3">Editora</th>
              <th className="px-6 py-3">Gêneros</th>
              <th className="px-6 py-3">Sinopse</th>
              <th className="px-6 py-3">Editar / Excluir</th>
              <th className="px-6 py-3">
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