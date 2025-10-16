"use client";

import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

interface livrosReservaI {
  categoria: string; // Pode ser "Livro", "Cliente", "Reserva" ou "Comentário"
  num: number;
}

interface geralDadosI {
  usuarios: number;
  livros: number;
  reservas: number;
  emprestimos: number;
}

type DataRow = [string, number, string];

export default function Principal() {
  const [livrosReserva, setLivrosReserva] = useState<livrosReservaI[]>([]);
  const [dados, setDados] = useState<geralDadosI>({} as geralDadosI);

  useEffect(() => {
    async function getDadosGerais() {
      const response = await fetch("http://localhost:3004/dashboard/gerais");
      const dados = await response.json();
      setDados(dados);
    }
    getDadosGerais();

    async function getDadosGrafico() {
      const response = await fetch(
        "http://localhost:3004/dashboard/livrosReserva"
      );
      const dados = await response.json();
      setLivrosReserva(dados);
    }
    getDadosGrafico();
  }, []);

  const data: (["Categoria", "Quantidade", { role: string }] | DataRow)[] = [
    ["Categoria", "Quantidade", { role: "style" }],
  ];

  const cores = [
    "red",
    "blue",
    "violet",
    "green",
    "gold",
    "cyan",
    "chocolate",
    "purple",
    "brown",
    "orangered",
  ];

  // Adicione as categorias ao array data
  data.push(["Livros", dados.livros, cores[0]]);
  data.push(["Usuarios", dados.usuarios, cores[1]]);
  data.push(["Reservas", dados.reservas, cores[2]]);
  data.push(["emprestimos", dados.emprestimos, cores[3]]);


  return (
    <div className="container mt-24">
      <h2 className="text-3xl mb-4 font-bold">Atividades do Sistema</h2>

      <div className="w-2/3 flex justify-between mx-auto mb-5">
        <div className="border-red-600 border rounded p-6 w-1/3 me-3">
          <span className="bg-blue-100 text-red-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-red-900 dark:text-blue-300">
            {dados.usuarios}
          </span>
          <p className="font-bold mt-2 text-center">Usuários</p>
        </div>

        <div className="border-red-600 border rounded p-6 w-1/3 me-3">
          <span className="bg-red-100 text-red-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-red-900 dark:text-red-300">
            {dados.livros}
          </span>
          <p className="font-bold mt-2 text-center">Livros</p>
        </div>

        <div className="border-red-600 border rounded p-6 w-1/3 me-3">
          <span className="bg-red-100 text-red-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-red-900 dark:text-red-300">
            {dados.reservas}
          </span>
          <p className="font-bold mt-2 text-center">Reservas</p>
        </div>

        <div className="border-green-600 border rounded p-6 w-1/3">
          <span className="bg-green-100 text-green-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-green-900 dark:text-green-300">
            {dados.emprestimos}
          </span>
          <p className="font-bold mt-2 text-center">Empréstimo</p>
        </div>
      </div>

      
    </div>
  );
}
