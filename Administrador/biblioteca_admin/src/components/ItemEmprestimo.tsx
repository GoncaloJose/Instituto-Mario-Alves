"use client";
import { useState } from "react";

type EmprestimoI = {
  id: string | number;
  livro?: string;
  usuario?: string;
  dataEmprestimo?: string; // Mapeado para "Data da Reserva"
  dataDevolucao?: string | null; // Mapeado para "Data da Entrega"
};

// ==================================================================
// 1. NOVO COMPONENTE CRIADO PARA CADA ITEM DO EMPRÉSTIMO
// ==================================================================
// Isso isola o estado "isEntregue" para cada item da lista.
function EmprestimoItem({ emprestimo }: { emprestimo: EmprestimoI }) {
  // ✅ O HOOK AGORA ESTÁ AQUI DENTRO
  // Ele usa a 'dataDevolucao' para definir o estado inicial
  const [isEntregue, setIsEntregue] = useState(!!emprestimo.dataDevolucao);

  // Esta função agora afeta APENAS este item
  async function handleToggleEntrega() {
    setIsEntregue(!isEntregue);
    // TODO: Aqui você pode adicionar a lógica para
    // salvar essa alteração no banco de dados via API.
    // Ex: await fetch(`/api/emprestimos/${emprestimo.id}/devolver`, { method: 'PATCH' });
  }

  return (
    <div
      key={emprestimo.id}
      className="border p-4 mb-3 rounded-lg shadow-md bg-white dark:bg-gray-800"
    >  
      <p className="text-gray-900 dark:text-white">
        <strong>Usuário:</strong> {emprestimo.usuario ?? "Não informado"}
      </p>
      <p className="text-gray-900 dark:text-white">
        <strong>Livro:</strong> {emprestimo.livro ?? "Não informado"}
      </p>
      <p className="text-gray-900 dark:text-white">
        <strong>Data da Reserva:</strong>{" "}
        {emprestimo.dataEmprestimo ?? "Não informada"}
      </p>
      <p className="text-gray-900 dark:text-white">
        <strong>Data da Entrega:</strong>{" "}
        {/* Lógica melhorada: mostra 'Pendente' ou a data original */}
        {isEntregue ? emprestimo.dataDevolucao ?? "Entregue" : "Pendente"}
      </p>

      {/* Correção de HTML: <td> (célula de tabela) não deve ser usado
          dentro de uma <div>. Substituí por uma <div>. */}
      <div className="px-3 py-2 mt-2">
        <button
          onClick={handleToggleEntrega} // Chama a função local
          className={
            isEntregue
              ? "text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-500 font-bold rounded-lg text-sm px-4 py-2 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800" // Verde
              : "text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-500 font-bold rounded-lg text-sm px-4 py-2 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800" // Vermelho
          }
        >
          {/* Texto do botão melhorado */}
          {isEntregue ? "✓ Entregue" : "Marcar Entrega"}
        </button>
      </div>
    </div>
  );
}

// ==================================================================
// 2. SEU COMPONENTE PRINCIPAL (MODIFICADO)
// ==================================================================
function CadEmprestimos() {
  // Hooks de estado do componente principal
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

  // 3. O MAP FOI SIMPLIFICADO
  // Agora ele apenas chama o novo componente 'EmprestimoItem'
  const listaEmprestimos = emprestimos.map((emprestimo) => (
    <EmprestimoItem key={emprestimo.id} emprestimo={emprestimo} />
  )); // 4. A FUNÇÃO 'editarLivro' FOI REMOVIDA DAQUI

  // (A lógica dela agora está dentro de 'EmprestimoItem')
  // async function editarLivro() { ... }

  return (
    <div className="m-4 mt-5">
      <div className="flex justify-between">
        <button
          type="button"
          onClick={handleToggleLista}
          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-500 font-bold rounded-lg text-md px-5 py-2.5 me-2 mb-4 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
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
            listaEmprestimos // Renderiza a lista de novos componentes
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
