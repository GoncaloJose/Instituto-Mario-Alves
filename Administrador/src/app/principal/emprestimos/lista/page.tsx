"use client";
import React from "react";
import { useState, useEffect } from "react";
import { EmprestimoI } from "@/utils/types/emprestimos";
import ItemEmprestimo from "@/components/ItemEmprestimo";
import Link from "next/link";
import { toast } from 'sonner';

function ListaDeEmprestimos() {
  const [emprestimos, setEmprestimos] = useState<EmprestimoI[]>([]);
  const [carregando, setCarregando] = useState(true);

  async function getEmprestimos() {
    setCarregando(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/emprestimos`
      );
      const dados = await response.json();
      setEmprestimos(dados);
    } catch (error) {
      console.error("Erro ao buscar empréstimos:", error);
    }

    setCarregando(false);
  }

  useEffect(() => {
    getEmprestimos();
  }, []);

  const onEntregar = async (id: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/emprestimos/${id}/retorno`
      );

      if (response.ok) {
        getEmprestimos()
      }
    } catch (error) {
      console.error("Erro ao buscar empréstimos:", error);
    } finally {
      toast.success('Livro foi marcado como retornado');
    }
  }

  const listaEmprestimos = emprestimos.map((emprestimo: EmprestimoI) => (
    <ItemEmprestimo
      key={emprestimo.id}
      emprestimo={emprestimo}
      onEntregue={onEntregar}
    />
  ));

  return (
    <div className='m-4 mt-24'>
      <div className="flex">
        <Link
        href="/principal/emprestimos"
        className="text-gray-400 hover:text-red-700 focus:ring-4 focus:ring-red-500 font-bold rounded-lg text-md py-2.5 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
        >
          ← Voltar ao Cadastro        
        </Link>
      </div>
      <div className='flex justify-between items-center mb-4'>
        <h1 className="text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
          Controle de Emprestimos
        </h1>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {(emprestimos.length && (
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xl text-white uppercase bg-vermelho dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">Nome</th>
                    <th scope="col" className="px-6 py-3">Livro</th>
                    <th scope="col" className="px-6 py-3">Autores</th>
                    <th scope="col" className="px-6 py-3">Saida</th>
                    <th scope="col" className="px-6 py-3">Retorno</th>
                    <th scope="col" className="px-6 py-3">Status</th>
                    <th scope="col" className="px-6 py-3">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {listaEmprestimos}
                </tbody>
              </table>
            ))}
      </div>
    </div>
  );
}

export default ListaDeEmprestimos;
