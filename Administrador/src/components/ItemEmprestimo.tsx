"use client";
import { useState } from "react";
import { MdOutlineArchive } from "react-icons/md";
import { isAfter } from 'date-fns';


type EmprestimoI = {
  id: string | number;
  livroId?: string;
  usuarioId?: string;
  datadaReserva?: string; // Mapeado para "Data da Reserva"
  datadaEntrega?: string | null; // Mapeado para "Data da Entrega"
  status?: string;
  usuario: {
    nome: string;
  }
  livro: {
    titulo: string;
    autores: Array<{ id: number, nome: string }>
  }
};

const ItemEmprestimo = ({ emprestimo, onEntregue }: { emprestimo: EmprestimoI, onEntregue: any }) => {
  const [isEntregue, setIsEntregue] = useState(!!emprestimo.datadaEntrega);

  async function handleToggleEntrega() {
    setIsEntregue(!isEntregue);
    // TODO: Aqui você pode adicionar a lógica para
    // salvar essa alteração no banco de dados via API.
    // Ex: await fetch(`/api/emprestimos/${emprestimo.id}/devolver`, { method: 'PATCH' });
  }

  const marcarComoEntregue = () => {
    onEntregue(emprestimo.id)
  }

  const status = () => {
    if (isAfter(emprestimo.datadaEntrega, new Date())) {
      return (<span className="text-red-600">Atrasado</span>)
    } else if (emprestimo.status == 'RETORNADO') {
      return (<span className="text-green-600">Retornado</span>)
    } else {
      return (<span className="font-bold text-gray-600">Locado</span>)
    }
  }

  return (
    <tr key={emprestimo.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <td className={`px-6 py-4`}>
        {emprestimo.usuario.nome}
      </td>
      <td className={`px-6 py-4`}>
        {emprestimo.livro.titulo}
      </td>
      <td className={`px-6 py-4`}>
        {emprestimo.livro.autores.map((autor) => autor.nome).join(', ')}
      </td>
      <td className={`px-6 py-4`}>
        {status()}
      </td>
      <td className="px-6 py-4">
        <button className="text-3xl cursor-pointer" 
          onClick={marcarComoEntregue}
          disabled={emprestimo.status == 'RETORNADO'}>
          <MdOutlineArchive
            className={`${emprestimo.status == 'RETORNADO' ? 'text-gray-600' : 'text-red-600'}`}
            title="Excluir"/>
        </button>
      </td>
    </tr>
  );
}

export default ItemEmprestimo;
