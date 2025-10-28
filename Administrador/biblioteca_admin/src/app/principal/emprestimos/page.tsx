"use client";
import React from "react";
// 1. Importe 'useWatch' (ou 'watch' se preferir)
import { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form"; 
import axios from "axios";
import Link from "next/link";

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

function EmprestimosForm() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [livros, setLivros] = useState<Livro[]>([]);
  
  // 2. NOVOS ESTADOS para controlar a lógica
  const [isDisponivel, setIsDisponivel] = useState(true);
  const [isLoadingDisponibilidade, setIsLoadingDisponibilidade] = useState(false);

  // 3. Adicione 'control' para o useWatch
  const { register, handleSubmit, setFocus, setValue, control } = useForm<Inputs>();

  // 4. "Assista" aos campos do formulário
  const watchedLivroId = useWatch({ control, name: "livroId" });
  const watchedDataRetirada = useWatch({ control, name: "dataRetirada" });

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
    setFocus("usuarioId");

    // Define a data de retirada padrão como HOJE (mas o usuário pode mudar)
    const hoje = new Date().toISOString().split("T")[0];
    setValue("dataRetirada", hoje);
  }, [setFocus, setValue]);

  // 5. NOVO useEffect - Roda a lógica de verificação
  useEffect(() => {
    // Calcula a data de entrega baseada na retirada
    const dataRetirada = new Date(watchedDataRetirada || new Date());
    const entrega = new Date(dataRetirada);
    entrega.setDate(entrega.getDate() + 7); // Adiciona 7 dias
    const entregaFormatada = entrega.toISOString().split("T")[0];
    setValue("dataEntrega", entregaFormatada);

    // Se o usuário ainda não selecionou um livro ou data, não faça nada
    if (!watchedLivroId || !watchedDataRetirada) {
      setIsDisponivel(true); // Reseta para o padrão
      return;
    }

    setIsLoadingDisponibilidade(true);
    // Chama a API que criamos no Passo 1
    fetch(`/api/livros/${watchedLivroId}/disponibilidade?data=${watchedDataRetirada}`)
      .then((res) => res.json())
      .then((data) => {
        setIsDisponivel(data.isDisponivel);
        setIsLoadingDisponibilidade(false);
      })
      .catch((err) => {
        console.error("Erro ao checar API:", err);
        setIsDisponivel(false); // Por segurança, bloqueia se a API falhar
        setIsLoadingDisponibilidade(false);
      });
      
  }, [watchedLivroId, watchedDataRetirada, setValue]); // Roda sempre que o livro ou a data mudam

  async function realizarEmprestimo(data: Inputs) {
    // 6. Checagem final no momento do submit (redundância de segurança)
    if (!isDisponivel) {
      alert("Este livro não está disponível para esta data!");
      return;
    }

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
    <div className="m-4 mt-24">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Cadastrar Empréstimos:
        </h1>
        <Link
          href="/principal/emprestimos/lista"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-md px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Ver Lista de Empréstimos
        </Link>
      </div>

      <form
        onSubmit={handleSubmit(realizarEmprestimo)}
        className="max-w-4xl mx-auto mt-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="mb-5">
            <label htmlFor="usuarioId" /* ... */ >
              Usuário
            </label>
            <select id="usuarioId" {...register("usuarioId")} /* ... */ >
              <option value="">Selecione um usuário</option>
              {usuarios.map((usuario) => (
                <option key={usuario.id} value={usuario.id}>
                  {usuario.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-5">
            <label htmlFor="livroId" /* ... */ >
              Livro
            </label>
            <select id="livroId" {...register("livroId")} /* ... */ >
              <option value="">Selecione um livro</option>
              {livros.map((livro) => (
                <option key={livro.id} value={livro.id}>
                  {livro.titulo}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-5">
            <label htmlFor="dataRetirada" /* ... */ >
              Data da Retirada
            </label>
            {/* 7. REMOVIDO o 'readOnly' para permitir a seleção */}
            <input
              type="date"
              id="dataRetirada"
              className="block w-full border border-gray-500 rounded-md p-2 text-black"
              {...register("dataRetirada")}
            />
          </div>

          <div className="mb-5">
            <label htmlFor="dataEntrega" /* ... */ >
              Data da Entrega (Automática)
            </label>
            <input
              type="date"
              id="dataEntrega"
              className="block w-full border border-gray-500 rounded-md p-2 text-black bg-gray-100"
              {...register("dataEntrega")}
              readOnly // A data de entrega continua automática
            />
          </div>
        </div>

        {/* 8. MENSAGEM DE STATUS */}
        <div className="my-4 h-6">
          {isLoadingDisponibilidade && (
            <p className="text-gray-600 dark:text-gray-400">Verificando disponibilidade...</p>
          )}
          {!isLoadingDisponibilidade && !isDisponivel && (
            <p className="text-red-600 font-bold">
              ❗️ Este livro já está emprestado nesta data.
            </p>
          )}
          {!isLoadingDisponibilidade && isDisponivel && watchedLivroId && (
            <p className="text-green-600 font-bold">
              ✓ Livro disponível!
            </p>
          )}
        </div>

        <div className="flex justify-center mt-4">
          <button
            type="submit"
            // 9. BOTÃO DESABILITADO se não estiver disponível
            disabled={!isDisponivel || isLoadingDisponibilidade}
            className="bg-vermelho hover:bg-red-700 text-white font-bold py-2 px-4 rounded
                      disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoadingDisponibilidade ? "Verificando..." : "Realizar Empréstimo"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EmprestimosForm;
