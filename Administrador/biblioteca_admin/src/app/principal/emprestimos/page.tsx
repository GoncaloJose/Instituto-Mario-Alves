"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

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

function Emprestimos() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [livros, setLivros] = useState<Livro[]>([]);
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

    setFocus("usuarioId");

  
    const hoje = new Date();
    const retirada = hoje.toISOString().split("T")[0]; 
    const entrega = new Date(hoje);
    entrega.setDate(hoje.getDate() + 7); 
    const entregaFormatada = entrega.toISOString().split("T")[0];

    setValue("dataRetirada", retirada);
    setValue("dataEntrega", entregaFormatada);
  }, []);

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
      <h1>Cadastro de Empréstimos</h1>

      <form onSubmit={handleSubmit(realizarEmprestimo)} className="max-w-xl mx-auto">
        <div className="mb-3">
          <label htmlFor="usuarioId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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

        <div className="mb-3">
          <label htmlFor="livroId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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

        <div className="mb-3">
          <label htmlFor="dataRetirada" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Data da Retirada
          </label>
          <input type="date" id="dataRetirada" className="block border border-gray-500 rounded-md p-2" {...register("dataRetirada")} readOnly />
        </div>

        <div className="mb-3">
          <label htmlFor="dataEntrega" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Data da Entrega
          </label>
          <input type="date" id="dataEntrega" className="block border border-gray-500 rounded-md p-2" {...register("dataEntrega")} readOnly />
        </div>

        <button type="submit" className="bg-vermelho hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Realizar Empréstimo
        </button>
      </form>
    </div>
  );
}

export default Emprestimos;