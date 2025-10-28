"use client";
import { useState } from "react";
import { LivroI } from "@/utils/types/livros";
import { UsuarioI } from "@/utils/types/usuarios";

type EmprestimoI = {
  id: string | number; // ajuste os campos abaixo conforme o seu modelo real
  livro?: string;
  usuario?: string;
  dataEmprestimo?: string; // Mapeado para "Data da Reserva"
  dataDevolucao?: string | null; // Mapeado para "Data da Entrega"
};

function CadEmprestimos() {
  const [emprestimos, setEmprestimos] = useState<EmprestimoI[]>([]);
  const [mostrarLista, setMostrarLista] = useState(false);
  const [carregando, setCarregando] = useState(false);

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

  const handleToggleLista = () => {
    const vaiMostrar = !mostrarLista;
    if (vaiMostrar && emprestimos.length === 0) {
      getEmprestimos();
    }
    setMostrarLista(vaiMostrar);
  };

  const listaEmprestimos = emprestimos.map((emprestimo) => (
    <div
      key={emprestimo.id}
      className="border p-4 mb-3 rounded-lg shadow-md bg-white dark:bg-gray-800"
    >
           {" "}
      <p className="text-gray-900 dark:text-white">
                <strong>Usuário:</strong>{" "}
        {emprestimo.usuario ?? "Não informado"}     {" "}
      </p>
           {" "}
      <p className="text-gray-900 dark:text-white">
                <strong>Livro:</strong> {emprestimo.livro ?? "Não informado"}   
         {" "}
      </p>
           {" "}
      <p className="text-gray-900 dark:text-white">
                <strong>Data da Reserva:</strong>{" "}
        {emprestimo.dataEmprestimo ?? "Não informada"}     {" "}
      </p>
           {" "}
      <p className="text-gray-900 dark:text-white">
                <strong>Data da Entrega:</strong>{" "}
        {emprestimo.dataDevolucao ?? "Pendente"}     {" "}
      </p>
         {" "}
    </div>
  ));

  return (
    <div className="m-4 mt-24">
      <div className="flex justify-between items-center flex-wrap">
        <button
          type="button"
          onClick={handleToggleLista}
          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-500 font-bold rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
        >
                  {mostrarLista ? "Esconder Empréstimos" : "Mostrar Empréstimos"} 
        </button>
      </div>
      {mostrarLista && (
        <div className="mt-4">
                   {" "}
          {carregando ? (
            <p>Carregando...</p>
          ) : emprestimos.length > 0 ? (
            listaEmprestimos
          ) : (
            <p>Nenhum empréstimo encontrado.</p>
          )}
                 {" "}
        </div>
      )}
         {" "}
    </div>
  );
}

export default CadEmprestimos;
