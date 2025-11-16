import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const prisma = new PrismaClient();
const router = Router();

// Rota para listar todos os pagamentos (sem alterações)
router.get("/", async (req, res) => {
  try {
    const pagamentos = await prisma.pagamento.findMany({ include: { usuario: true } });
    res.status(200).json(pagamentos);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/usuario/:usuarioId", async (req, res) => {
  const { usuarioId } = req.params;
  const parsedId = parseInt(usuarioId, 10);

  if (isNaN(parsedId)) {
    return res.status(400).json({ erro: "ID de usuário inválido" });
  }

  try {
    const pagamentos = await prisma.pagamento.findMany({
      where: { usuarioId: parsedId },
      orderBy: { dataPagamento: 'desc' },
    });

    if (pagamentos.length === 0) {
      res.status(200).json([]);
      return;
    } else {
      res.status(200).json(pagamentos.map(pagamento => ({
        id: pagamento.id,
        dataPagamento: pagamento.dataPagamento,
        valor: pagamento.valor,
        formaPagamento: pagamento.formaPagamento,
        pago: pagamento.pago
      })));
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

// Rota para criar um novo pagamento (sem alterações na lógica principal)
router.post("/", async (req, res) => {
  const { usuarioId, dataPagamento, valor, formaPagamento, pago } = req.body;

  if (!usuarioId || !dataPagamento || !valor || !formaPagamento) {
    res.status(400).json({ erro: "Informe todos os dados obrigatórios!" });
    return;
  }

  try {
    const pagamento = await prisma.pagamento.create({
      data: { usuarioId: Number(usuarioId), dataPagamento, valor, formaPagamento, pago }, // o campo 'pago' será 'false' por padrão (definido no schema.prisma)
    });

    res.status(201).json(pagamento);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});


// --- NOVO: Rota para marcar um pagamento como 'pago' ---
// Utiliza o método PATCH, que é o ideal para atualizações parciais.
router.patch("/:id/pagar", async (req, res) => {
  const { id } = req.params;

  try {
    // Encontra e atualiza o pagamento com o ID fornecido, mudando 'pago' para 'true'
    const pagamentoAtualizado = await prisma.pagamento.update({
      where: { id: Number(id) },
      data: { pago: true },
    });

    res.status(200).json(pagamentoAtualizado); // Retorna o pagamento com o novo status

  } catch (error) {
    // O Prisma lança um erro P2025 se o registro a ser atualizado não for encontrado.
    // Isso já serve como uma verificação de "pagamento não existe".
    console.error(error);
    res.status(400).json({ erro: "Erro ao tentar processar o pagamento." });
  }
});


export default router;
