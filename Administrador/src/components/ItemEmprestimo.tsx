"use client";
import { useState } from "react";
import { MdOutlineArchive } from "react-icons/md";
import { isAfter, endOfDay, lightFormat } from 'date-fns';


type EmprestimoI = {
  id: string | number;
  livroId: string;
  usuarioId: string;
  datadaReserva: Date;
  datadaEntrega: Date;
  status: string;
  usuario: {
    nome: string;
  }
  livro: {
    titulo: string;
    autores: Array<{ id: number, nome: string }>
  }
};

const ItemEmprestimo = ({ emprestimo, onEntregue }: { emprestimo: EmprestimoI, onEntregue: any }) => {
  const marcarComoEntregue = () => {
    onEntregue(emprestimo.id)
  }

  const status = () => {
	const hojeMeiaNoite = endOfDay(new Date());

    if (emprestimo.status == 'RETORNADO') {
      return (<span className="text-green-600">Retornado</span>)
    } else if (isAfter(hojeMeiaNoite, endOfDay(emprestimo.datadaEntrega))) {
      return (<span className="text-red-600">Atrasado</span>)
    } else {
      return (<span className="font-bold text-gray-600">Locado</span>)
    }
  }

  console.log(emprestimo)

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
		{lightFormat(emprestimo.datadaReserva, 'dd/MM/yyyy')}
      </td>
      <td className={`px-6 py-4`}>
		{lightFormat(emprestimo.datadaEntrega, 'dd/MM/yyyy')}
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
            title="Marcar como Retornado"/>
        </button>
      </td>
    </tr>
  );
}

export default ItemEmprestimo;
