'use client'
import { useForm } from "react-hook-form"
import Cookies from "js-cookie"
import { toast } from "sonner"
import { useState, useEffect } from "react"
import { UsuarioI } from "@/utils/types/usuarios"
import { PagamentoI } from "@/utils/types/pagamentos"
import Link from "next/link"

type Inputs = {
    usuarioId: number
    dataPagamento: string
    valor: number
    formaPagamento: string
}

function NovoPagamento() {
  const [usuarios, setUsuarios] = useState<UsuarioI[]>([]);
  const { register, handleSubmit, reset, setFocus } = useForm<Inputs>();

  const metodoPagamentos = [
    { valor: 'PIX', nome: 'Pix' },
    { valor: 'CARTAO_CREDITO', nome: 'Cartão de Crédito' },
    { valor: 'DINHEIRO', nome: 'Dinheiro' },
    { valor: 'CARTAO_DEBITO', nome: 'Cartão de Débito' }
  ]
  useEffect(() => {
    async function fetchData(endpoint: string, setData: Function) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/${endpoint}`);
      const dados = await response.json();
      setData(dados);
    }

    fetchData("usuarios", setUsuarios);

    setFocus("usuarioId");
  }, []);

  async function incluirPagamento(data: Inputs) {
    const dados = {
      ...data,
      dataPagamento: new Date().toISOString(),
      pago: true
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/pagamentos`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
      },
      body: JSON.stringify(dados)
    });

    if (response.status === 201) {
      toast.success("Ok! Pagamento realizado com sucesso!!");
      reset();
    } else {
      toast.error("Erro ao pagar mensalidade...");
    }
  }

  return (
    <>
      <div className="flex flex-col mt-24 mb-4 w-full">
       <Link
          href="/principal/pagamentos"
          className="text-gray-400 hover:text-red-700 focus:ring-4 focus:ring-red-500 font-bold rounded-lg text-md py-2.5 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">
          ← Voltar a Lista de Pagamentos        
        </Link>

        <h1 className="text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
          Pagamento de Mensalidade
        </h1>

        <form className="max-w-xl w-full mx-auto" onSubmit={handleSubmit(incluirPagamento)}>
          <div className="mb-3">
            <label htmlFor="titulo" className="block mb-2 mt-3 text-sm font-medium text-gray-900 dark:text-white">
              Valor(R$)
            </label>
            <input
              type="number"
              id="pagamento"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
              {...register("valor")}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="formaPagamento" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Usuário
            </label>
            <select id="formaPgamento" className="block border border-gray-500 rounded-md p-2" {...register("usuarioId")}>
              <option value="">Seleciona o Usuário</option>
              {usuarios.map(usuario => (
                <option key={usuario.id} value={usuario.id}>{usuario.nome}</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="formaPagamento" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Forma de Pagamento
            </label>
            <select id="formaPgamento" className="block border border-gray-500 rounded-md p-2" {...register("formaPagamento")}>
              <option value="">Forma de Pagamento</option>
              {metodoPagamentos.map(metodoPagamento => (
                <option key={metodoPagamento.valor} value={metodoPagamento.valor}>{metodoPagamento.nome}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            Pagar
          </button>
        </form>
      </div>
    </>
  );
}

export default NovoPagamento;