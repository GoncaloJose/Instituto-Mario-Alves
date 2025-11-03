import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Ajuste o caminho do seu prisma client

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const livroId = parseInt(params.id);
  const { searchParams } = new URL(request.url);
  const dataReserva = searchParams.get('data');

  if (!livroId || !dataReserva) {
    return NextResponse.json(
      { error: 'ID do livro e data da reserva são obrigatórios' },
      { status: 400 }
    );
  }

  try {
    const dataReservaISO = new Date(dataReserva);

    // --- LÓGICA CORRIGIDA ---
    // A lógica agora procura por um empréstimo ATIVO na data selecionada.
    //
    // Queremos encontrar um empréstimo que satisfaça AMBAS as condições:
    // 1. A data de reserva dele (no banco) é ANTERIOR ou IGUAL à data que o usuário quer.
    // 2. E a data de entrega dele (no banco) é POSTERIOR à data que o usuário quer.
    //
    // Ex: Empréstimo existente: 25/10 a 30/10
    //    Usuário tenta reservar: 28/10
    //    1. 25/10 (datadaReserva) <= 28/10 ? (Sim)
    //    2. 30/10 (datadaEntrega) >  28/10 ? (Sim)
    //    Resultado: Encontra o empréstimo, livro indisponível.
    //
    const emprestimoExistente = await prisma.emprestimo.findFirst({
      where: {
        livroId: livroId,
        AND: [ // Garante que a data da reserva esteja DENTRO do período
          {
            datadaReserva: {
              lte: dataReservaISO, // lte = Less Than or Equal (Menor ou igual)
            },
          },
          {
            datadaEntrega: {
              gt: dataReservaISO, // gt = Greater Than (Maior que)
            },
          },
        ],
        // Você também pode querer adicionar um filtro de status,
        // mas a lógica de data acima já é robusta.
      },
    });
    // --- FIM DA LÓGICA CORRIGIDA ---

    // A lógica de resposta permanece a mesma:
    // Se 'emprestimoExistente' for 'null' (não achou nada), o livro está disponível.
    const isDisponivel = emprestimoExistente === null;

    return NextResponse.json({ isDisponivel });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Erro interno ao verificar disponibilidade' },
      { status: 500 }
    );
  }
}