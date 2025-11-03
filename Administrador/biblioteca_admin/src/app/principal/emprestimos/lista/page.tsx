"use client";
import React from "react";
import { useState, useEffect } from "react";
import { EmprestimoI } from "@/utils/types/emprestimos"; // Importe seu tipo
import ItemEmprestimo from "@/components/ItemEmprestimo"; // Importe seu componente de item
import Link from "next/link";

// Esta é a nova página que só mostra a lista
function ListaDeEmprestimos() {
  const [emprestimos, setEmprestimos] = useState<EmprestimoI[]>([]);
  const [carregando, setCarregando] = useState(true); // Começa como 'true' // useEffect busca os empréstimos quando a página carrega

  useEffect(() => {
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
    getEmprestimos();
  }, []); // Roda apenas uma vez // Mapeia os empréstimos para o componente ItemEmprestimo

  const ItemComp = ItemEmprestimo as unknown as React.ComponentType<any>;
  const listaEmprestimos = emprestimos.map((emprestimo: EmprestimoI) => (
    <ItemComp
      key={emprestimo.id}
      emprestimo={emprestimo}
      emprestimos={emprestimos}
      setEmprestimos={setEmprestimos}
    />
  ));

  return (
    <div className="m-4 mt-24">
           
      <div className="flex justify-between items-center mb-6">
               
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Lista de Empréstimos        
        </h1>
        {/* Este link volta para a página do formulário */}       
        <Link
          href="/principal/emprestimos"
          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-500 font-bold rounded-lg text-md px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
        >
                    ← Voltar ao Cadastro        
        </Link>
             
      </div>
           
      <div className="mt-4">
               
        {carregando ? (
          <p>Carregando...</p>
        ) : (
          <div className="border rounded-lg dark:border-gray-700 overflow-hidden">
                       {" "}
            {listaEmprestimos.length > 0 ? (
              listaEmprestimos
            ) : (
              <p className="p-4">Nenhum empréstimo encontrado.</p>
            )}
                     
          </div>
        )}
      </div>
    </div>
  );
}

export default ListaDeEmprestimos;
