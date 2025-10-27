"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { EmprestimoI } from "@/utils/types/emprestimos";
import ItemEmprestimo from "@/components/ItemEmprestimo";


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

type Emprestimo = {
  id: number;
  usuarioId: number;
  livroId: number;
};

function Emprestimos() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [livros, setLivros] = useState<Livro[]>([]);
  const [emprestimos, setEmprestimos] = useState<EmprestimoI[]>([]);
  const { register, handleSubmit, setFocus, setValue } = useForm<Inputs>();

  useEffect(() => {
    async function fetchData(endpoint: string, setData: Function) {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/${endpoint}`);
        setData(response.data);
      } catch (error) {
        console.error(`Erro ao buscar ${endpoint}:`, error);
      }
    }

    fetchData("usuarios", setUsuarios);
    fetchData("livros", setLivros);
    fetchData("emprestimos", setEmprestimos);

    setFocus("usuarioId");
    

  
    const hoje = new Date();
    const retirada = hoje.toISOString().split("T")[0]; 
    const entrega = new Date(hoje);
    entrega.setDate(hoje.getDate() + 7); 
    const entregaFormatada = entrega.toISOString().split("T")[0];

    setValue("dataRetirada", retirada);
    setValue("dataEntrega", entregaFormatada);
  }, []);


// Componente para exibir cada empréstimo
  function CadEmprestimos() {
    const [emprestimos, setEmprestimos] = useState<EmprestimoI[]>([])
  
    useEffect(() => {
      async function getEmprestimos() {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/emprestimos`)
        const dados = await response.json()
        setEmprestimos(dados)
      }
      getEmprestimos()
    }, [])
  
    const listaEmprestimos = emprestimos.map((emprestimo: EmprestimoI) => (
      <ItemEmprestimo
        key={emprestimo.id}
        emprestimo={emprestimo}
        emprestimos={emprestimos}
        setEmprestimos={setEmprestimos}
      />
    
    ))

  async function realizarEmprestimo(data: Inputs) {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_URL_API}/emprestimos`, data);
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
      <div className='flex justify-between'>
        <h6 className="mb-4 mt-5 text-3xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-2xl dark:text-white">
      <h1>Cadastro de Empréstimos:</h1>
      <button 
          className="text-black bg-vermelho hover:bg-vermelho focus:ring-4 focus:ring-red-500 font-bold rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">
          Lista de Empréstimos
        </button>

      <form onSubmit={handleSubmit(realizarEmprestimo)} className="max-w-xl mx-auto">
        <div className="mb-5">
          <label htmlFor="usuarioId" className="block mb-2 text-sm font-medium text-red-900 dark:text-white">
            Usuário
          </label>
          <select id="usuarioId" className="block border border-gray-500 rounded-md p-2" {...register("usuarioId")}>
            <option value="">Selecione um usuário</option>
            {usuarios.map((usuario) => (
              <option key={usuario.id} value={usuario.id}>
                {usuario.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-5">
          <label htmlFor="livroId" className="block mb-2 text-sm font-medium text-red-900 dark:text-white">
            Livro
          </label>
          <select id="livroId" className="block border border-gray-500 rounded-md p-2 text-black" {...register("livroId")}>
            <option value="">Selecione um livro</option>
            {livros.map((livro) => (
              <option key={livro.id} value={livro.id}>
                {livro.titulo}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-5">
          <label htmlFor="dataRetirada" className="block mb-2 text-sm font-medium text-red-900 dark:text-white">
            Data da Retirada
          </label>
          <input type="date" id="dataRetirada" className="block border border-gray-500 rounded-md p-2" {...register("dataRetirada")} readOnly />
        </div>

        <div className="mb-5">
          <label htmlFor="dataEntrega" className="block mb-2 text-sm font-medium text-red-900 dark:text-white">
            Data da Entrega
          </label>
          <input type="date" id="dataEntrega" className="block border border-gray-500 rounded-md p-2" {...register("dataEntrega")} readOnly />
        </div>

        <button type="submit" className="bg-vermelho hover:bg-red-700 text-back font-bold py-2 px-4 rounded">
          Realizar Empréstimo
        </button>
      </form>
      </h6>
      <tbody>
            {listaEmprestimos}
          </tbody>
    </div>
    </div>
    
  );
}

export default Emprestimos