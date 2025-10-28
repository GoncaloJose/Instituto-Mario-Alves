"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
// Remova as importações da lista, pois elas ficarão na outra página
// import { EmprestimoI } from "@/utils/types/emprestimos";
// import ItemEmprestimo from "@/components/ItemEmprestimo";
import Link from "next/link"; // Importe o Link

interface Usuario {
  id: number;
  nome: string;
}

interface Livro {
  id: number;
  titulo: string;
}

type Inputs = {
  usuarioId: number;
  livroId: number;
  dataRetirada: string;
  dataEntrega: string;
};

// Componente principal focado APENAS no formulário
function EmprestimosForm() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [livros, setLivros] = useState<Livro[]>([]); // Removidos os states da lista: emprestimos, mostrarLista, carregando
  const { register, handleSubmit, setFocus, setValue } = useForm<Inputs>(); // UseEffect agora busca APENAS o que o formulário precisa

  useEffect(() => {
    async function fetchData(endpoint: string, setData: Function) {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_URL_API}/${endpoint}`
        );
        setData(response.data);
      } catch (error) {
        console.error(`Erro ao buscar ${endpoint}:`, error);
      }
    }

    fetchData("usuarios", setUsuarios);
    fetchData("livros", setLivros);
    // Removido o fetch de "emprestimos"

    setFocus("usuarioId"); // Lógica para setar as datas (continua igual)

    const hoje = new Date();
    const retirada = hoje.toISOString().split("T")[0];
    const entrega = new Date(hoje);
    entrega.setDate(hoje.getDate() + 7);
    const entregaFormatada = entrega.toISOString().split("T")[0];

    setValue("dataRetirada", retirada);
    setValue("dataEntrega", entregaFormatada);
  }, [setFocus, setValue]); // Removidas as funções da lista: handleToggleLista, listaEmprestimos // Função para o submit do formulário (continua igual)

  async function realizarEmprestimo(data: Inputs) {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL_API}/emprestimos`,
        data
      );
      if (response.status === 201) {
        alert("Empréstimo realizado com sucesso!");
      } else {
        alert("Erro ao realizar empréstimo...");
      }
    } catch (error) {
      console.error("Erro ao realizar empréstimo:", error);
      alert("Erro ao realizar empréstimo!");
    }
  }

  return (
    <div className="mb-4 mt-24">  
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Cadastrar Empréstimos:        
        </h1>
        <Link
          href="/principal/emprestimos/lista" // IMPORTANTE: Este é o caminho da nova página
          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-500 font-bold rounded-lg text-md px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-blue-800"
        >
        Ver Lista de Empréstimos      
        </Link>            
      </div>
            {/* O formulário continua aqui, exatamente como antes */}     
      <form onSubmit={handleSubmit(realizarEmprestimo)} className="mt-4">            
        <div className="mb-5 grid grid-cols-1 md:grid-cols-1 gap-2">                
          <div className="mb-5">                      
            <label
              htmlFor="usuarioId"
              className="block mb-2 ms-2 text-sm font-medium text-red-900 dark:text-white"
            >
            Usuário           
            </label>                      
            <select
              id="usuarioId"
              className="block w-full border border-gray-500 rounded-md p-2 text-black"
              {...register("usuarioId")}
            >
              <option value="">Selecione um usuário</option>                        
              {usuarios.map((usuario) => (
                <option key={usuario.id} value={usuario.id}>
                                    {usuario.nome}              
                </option>
              ))}                        
            </select>                     
          </div>                  
          <div className="mb-5">            
            <label
              htmlFor="livroId"
              className="block mb-2 text-sm font-medium text-red-900 dark:text-white"
            >              
            Livro           
            </label>          
            <select
              id="livroId"
              className="block w-full border border-gray-500 rounded-md p-2 text-black"
              {...register("livroId")}
            >
              <option value="">Selecione um livro</option>       
                  
              {livros.map((livro) => (
                <option key={livro.id} value={livro.id}>
                                    {livro.titulo}               
                </option>
              ))}           
            </select>          
          </div>      
          <div className="mb-5">            
            <label
              htmlFor="dataRetirada"
              className="block mb-2 text-sm font-medium text-red-900 dark:text-white"
            >
            Data da Retirada            
            </label>           
            <input
              type="date"
              id="dataRetirada"
              className="block w-full border border-gray-500 rounded-md p-2 text-black"
              {...register("dataRetirada")}
              readOnly
            />            
          </div>        
          <div className="mb-5">              
            <label
              htmlFor="dataEntrega"
              className="block mb-2 text-sm font-medium text-red-900 dark:text-white"
            >                       
            Data da Entrega            
            </label>           
            <input
              type="date"
              id="dataEntrega"
              className="block w-full border border-gray-500 rounded-md p-2 text-black"
              {...register("dataEntrega")}
              readOnly
            />            
          </div>      
        </div>     
        <button
          type="submit"
          className="bg-vermelho hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
        Realizar Empréstimo        
        </button>
      </form>
            {/* O bloco 'mostrarLista' foi totalmente removido daqui */}   
    </div>
  );
}

export default EmprestimosForm;
