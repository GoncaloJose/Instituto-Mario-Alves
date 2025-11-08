"use client";
import React from "react";
// 1. Importe 'useWatch' (ou 'watch' se preferir)
import { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from 'sonner'; 
import { addDays, startOfDay } from 'date-fns';
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
  const { register, handleSubmit, setFocus, setValue, control, reset } = useForm<Inputs>();

  // 4. "Assista" aos campos do formulário
  const watchedLivroId = useWatch({ control, name: "livroId" });
  const watchedDataRetirada = useWatch({ control, name: "dataRetirada" });
  const watchedUsuarioId = useWatch({ control, name: "usuarioId" });

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

    const hoje = new Date().toISOString().split("T")[0];
    setValue("dataRetirada", hoje);
  }, [setFocus, setValue]);

  // 5. NOVO useEffect - Roda a lógica de verificação
  useEffect(() => {
    // Calcula a data de entrega baseada na retirada
    const dataRetirada = new Date(watchedDataRetirada || new Date());
    const entrega = addDays(new Date(dataRetirada), 7);

    const entregaFormatada = entrega.toISOString().split("T")[0];
    setValue("dataEntrega", entregaFormatada);

    // Se o usuário ainda não selecionou um livro ou data, não faça nada
    if (!watchedLivroId || !watchedDataRetirada || !watchedUsuarioId) {
      //setIsDisponivel(true); // Reseta para o padrão
      return;
    }

    setIsLoadingDisponibilidade(true);
    // Chama a API que criamos no Passo 1
    fetch(`${process.env.NEXT_PUBLIC_URL_API}/livros/${watchedLivroId}/disponibilidade?data=${watchedDataRetirada}&usuarioId=${watchedUsuarioId}`)
      .then((res) => res.json())
      .then((data) => {
        setIsDisponivel(data.disponivel);
        setIsLoadingDisponibilidade(false);
      })
      .catch((err) => {
        console.error("Erro ao checar API:", err);
        setIsDisponivel(false); // Por segurança, bloqueia se a API falhar
        setIsLoadingDisponibilidade(false);
      });
      
  }, [watchedLivroId, watchedDataRetirada, watchedUsuarioId, setValue]); // Roda sempre que o livro ou a data mudam

  async function realizarEmprestimo(data: Inputs) {
    // 6. Checagem final no momento do submit (redundância de segurança)
    if (!isDisponivel) {
      toast.error("Este livro não está disponível para esta data!");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL_API}/emprestimos`,
        data
      );

      if (response.status === 201) {
        toast.success("Empréstimo realizado com sucesso!");

        setIsDisponivel(false);
        reset();
        const hoje = new Date().toISOString().split("T")[0];
        setValue("dataRetirada", hoje);
      } else {
        toast.error("Erro ao realizar empréstimo...");
      }
    } catch (error) {
      console.error("Erro ao realizar empréstimo:", error);
      toast.error("Erro ao realizar empréstimo!");
    }
  }

 return (
    <div className="m-4 mt-24">
      {/* --- CABEÇALHO DA PÁGINA --- */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
          Cadastrar Empréstimos:
        </h3>
        <Link
          href="/principal/emprestimos/lista"
          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-500 font-bold
            rounded-lg text-md px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
        >
          Ver Lista de Empréstimos
        </Link>
      </div>

      {/* --- INÍCIO DO FORMULÁRIO --- */}
      <form
        onSubmit={handleSubmit(realizarEmprestimo)}
        className="max-w-4xl mx-auto mt-10"
      >
        {/* MUDANÇA: Adicionado um "card" principal para o formulário 
          com sombra, bordas arredondadas e espaçamento interno.
        */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sm:p-8 space-y-8">
          
          {/* --- SEÇÃO 1: DADOS DO EMPRÉSTIMO --- */}
          <section>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
              Dados do Empréstimo
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Campo Usuário */}
              <div>
                <label
                  htmlFor="usuarioId"
                  className="block mb-2 text-sm font-medium text-red-900 dark:text-white"
                >
                  Usuário
                </label>
                <select
                  id="usuarioId"
                  {...register("usuarioId")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">Selecione um usuário</option>
                  {usuarios.map((usuario) => (
                    <option key={usuario.id} value={usuario.id}>
                      {usuario.nome}
                    </option>
                  ))}
                </select>
              </div>

              {/* Campo Livro */}
              <div>
                <label
                  htmlFor="livroId"
                  className="block mb-2 text-sm font-medium text-red-900 dark:text-white"
                >
                  Livro
                </label>
                <select
                  id="livroId"
                  {...register("livroId")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">Selecione um livro</option>
                  {livros.map((livro) => (
                    <option key={livro.id} value={livro.id}>
                      {livro.titulo}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* --- SEÇÃO 2: PERÍODO --- */}
          <section>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
              Período
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Campo Data da Retirada */}
              <div>
                <label
                  htmlFor="dataRetirada"
                  className="block mb-2 text-sm font-medium text-red-900 dark:text-white"
                >
                  Data da Retirada
                </label>
                <input
                  type="date"
                  id="dataRetirada"
                  readOnly
                  className="bg-gray-100 border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 cursor-not-allowed"
                  {...register("dataRetirada")}
                />
              </div>

              {/* Campo Data da Entrega */}
              <div>
                <label
                  htmlFor="dataEntrega"
                  className="block mb-2 text-sm font-medium text-red-900 dark:text-white"
                >
                  Data da Entrega
                </label>
                <input
                  type="date"
                  id="dataEntrega"
                  // MUDANÇA: Estilo de "desabilitado" melhorado
                  className="bg-gray-100 border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 cursor-not-allowed"
                  {...register("dataEntrega")}
                  readOnly // A data de entrega continua automática
                />
              </div>
            </div>
          </section>

          {/* --- SEÇÃO 3: AÇÕES E STATUS --- */}
          <section>
            {/* Mensagem de Status */}
            <div className="my-4 h-6 text-center">
              {isLoadingDisponibilidade && (
                <p className="text-gray-600 dark:text-gray-400">Verificando disponibilidade...</p>
              )}
              {!isLoadingDisponibilidade && !isDisponivel && (
                <p className="text-red-600 font-bold">
                  ❗️ Este livro está indisponivel nesta data.
                </p>
              )}
              {!isLoadingDisponibilidade && isDisponivel && watchedLivroId && (
                <p className="text-green-600 font-bold">
                  ✓ Livro disponível!
                </p>
              )}
            </div>

            {/* Botão de Envio */}
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                disabled={!isDisponivel || isLoadingDisponibilidade}
                // MUDANÇA: Usei 'bg-red-600' como padrão do Tailwind
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-6 rounded-lg
                           disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-150"
              >
                {isLoadingDisponibilidade ? "Verificando..." : "Realizar Empréstimo"}
              </button>
            </div>
          </section>

        </div>
      </form>
    </div>
  );
}

export default EmprestimosForm;
