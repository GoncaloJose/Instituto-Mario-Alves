"use client";

import { useEffect, useState } from "react";
// As duas importações abaixo não estão sendo usadas, mas mantive caso precise delas.
import { formataData } from "@/utils/formataData";
import { isToday, differenceInDays } from "date-fns";
import { Tooltip } from "react-tooltip";
import { toast } from "sonner";

import { useUsuarioStore } from "@/context/usuario";

// Tipos (sem alterações)
type Pagamento = {
  id: number;
  valor: number;
  formaPagamento: string;
  dataPagamento: string;
  pago: boolean;
};

type PagamentoFuturo = {
  mes: string;
  ano: number;
  id: string;
};

// Componente BotaoStatusPagamento (sem alterações)
const BotaoStatusPagamento = ({
  pagamento,
  onPagar,
}: {
  pagamento: Pagamento;
  onPagar: (id: number) => void;
}) => {
  if (pagamento.pago) {
    return (
      <button
        className="bg-green-500 text-white font-bold py-2 px-4 rounded cursor-not-allowed opacity-70"
        disabled
      >
        Pago
      </button>
    );
  }

  return (
    <button
      onClick={() => onPagar(pagamento.id)}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
    >
      Pagar
    </button>
  );
};

// Função para gerar os meses do ano (sem alterações)
const gerarMesesDoAno = (): PagamentoFuturo[] => {
  const mesesGerados: PagamentoFuturo[] = [];
  const anoAtual = new Date().getFullYear();

  const nomesDosMeses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  for (let i = 0; i < 12; i++) {
    mesesGerados.push({
      mes: nomesDosMeses[i],
      ano: anoAtual,
      id: `${anoAtual}-${i}`,
    });
  }
  return mesesGerados;
};

// --- Componente Principal ---
export default function MeusPagamentos() {
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
  const [pagamentosFuturos, setPagamentosFuturos] = useState<PagamentoFuturo[]>(
    [],
  );
  const { usuario, atualizaUsuario } = useUsuarioStore();

  useEffect(() => {
    async function getPagamentos() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL_API}/pagamentos/usuario/${usuario.id}`,
        );

        if (!response.ok) {
          setPagamentos([]);
          return;
        }

        const dados = await response.json();
        setPagamentos(dados);
      } catch (error) {
        console.error("Erro ao buscar pagamentos:", error);
        setPagamentos([]);
      }
    }
    if (usuario.id) {
      getPagamentos();
    }

    const mesesParaGerar = gerarMesesDoAno();
    setPagamentosFuturos(mesesParaGerar);
  }, [usuario.id]);

  const handlePagar = async (pagamentoId: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/pagamentos/${pagamentoId}/pagar`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
        },
      );

      if (!response.ok) {
        toast.error("Erro ao tentar realizar o pagamento.");
        return;
      }

      setPagamentos((pagamentosAtuais) =>
        pagamentosAtuais.map((pag) => {
          if (pag.id === pagamentoId) {
            return { ...pag, pago: true };
          }
          return pag;
        }),
      );

      // Se o pagamento for dentro dos ultimos 30 dias, a gente atualiza o usuario para nao inadimplente
      if (usuario.inadimplente) {
        const pagamento = pagamentos.find((p) => p.id === pagamentoId);
        if (pagamento) {
          const dataPagamento = new Date(pagamento.dataPagamento);
          const hoje = new Date();
          // usa o date-fns
          const diffEmDias = differenceInDays(hoje, dataPagamento);
          if (diffEmDias <= 30) {
            usuario.inadimplente = false;
            atualizaUsuario(usuario);
          }
        }
      }

      toast.success("Pagamento realizado com sucesso!");
    } catch (error) {
      console.error("Erro de conexão ao pagar:", error);

      toast.error("Erro de conexão. Não foi possível realizar o pagamento.");
    }
  };

  const handleGerarPagamentoFuturo = async (
    pagamento: PagamentoFuturo,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (!usuario.id) {
      toast.error("Erro: ID do usuário não encontrado. Faça login novamente.");
      return;
    }

    const nomesDosMeses = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];
    const mesNumero = nomesDosMeses.indexOf(pagamento.mes);

    if (mesNumero === -1) {
      toast.error("Erro interno: Mês inválido.");
      return;
    }

    const botao = event.currentTarget;
    botao.innerText = "Gerando...";
    botao.disabled = true;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/pagamentos`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            dataPagamento: new Date(
              pagamento.ano,
              mesNumero,
              new Date().getDate(),
            ),
            valor: 150.0,
            formaPagamento: "Boleto",
            usuarioId: Number(usuario.id),
          }),
        },
      );

      const novoPagamento = await response.json();

      if (response.ok) {
        toast.success(
          `Fatura para ${pagamento.mes}/${pagamento.ano} gerada com sucesso!`,
        );

        setPagamentos((pagamentosAtuais) =>
          [...pagamentosAtuais, novoPagamento].sort(
            (a, b) =>
              new Date(b.dataPagamento).getTime() -
              new Date(a.dataPagamento).getTime(),
          ),
        );
      } else {
        toast.error(`Erro: ${novoPagamento.erro}`);

        botao.innerText = "Gerar Fatura";
        botao.disabled = false;
      }
    } catch (error) {
      toast.error("Erro de conexão. Não foi possível gerar a fatura.");

      botao.innerText = "Gerar Fatura";
      botao.disabled = false;
    }
  };

  return (
    <section className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="w-full">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Pagamentos de {new Date().getFullYear()}
          </h1>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">
                    Mês
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">
                    Ano
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-gray-900 dark:text-gray-100">
                    Ação
                  </th>
                </tr>
              </thead>
              <tbody>
                {pagamentosFuturos.map((pagamento, index) => {
                  const pagamentoCorrespondente = pagamentos.find(
                    (p) =>
                      new Date(p.dataPagamento).getMonth() === index &&
                      new Date(p.dataPagamento).getFullYear() === pagamento.ano,
                  );

                  return (
                    <tr
                      key={pagamento.id}
                      className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="px-6 py-4 text-gray-800 dark:text-gray-200">
                        {pagamento.mes}
                      </td>
                      <td className="px-6 py-4 text-gray-800 dark:text-gray-200">
                        {pagamento.ano}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {pagamentoCorrespondente ? (
                          <div className="flex items-center justify-center gap-4">
                            <button
                              className="bg-gray-300 text-gray-600 font-bold py-2 px-4 rounded cursor-not-allowed"
                              disabled
                            >
                              Ver Fatura
                            </button>
                            <BotaoStatusPagamento
                              pagamento={pagamentoCorrespondente}
                              onPagar={handlePagar}
                            />
                          </div>
                        ) : (
                          <button
                            onClick={(e) =>
                              handleGerarPagamentoFuturo(pagamento, e)
                            }
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-wait"
                          >
                            Gerar Fatura
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
