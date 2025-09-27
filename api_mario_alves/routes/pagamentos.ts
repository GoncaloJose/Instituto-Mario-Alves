import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const prisma = new PrismaClient();
const router = Router();

router.get("/", async (req, res) => {
  try {
    const pagamentos = await prisma.pagamento.findMany({include: {usuario: true}});
    res.status(200).json(pagamentos);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/", async (req, res) => {
  const { usuarioId, dataPagamento, valor, formaPagamento } = req.body;


  if (!usuarioId || !dataPagamento || !valor || !formaPagamento) {
    res.status(400).json({ erro: "Informe dados obrigatório!" });
    return;
  }

  try {
    const pagamento = await prisma.pagamento.create({
      data: { usuarioId, dataPagamento, valor, formaPagamento },
    });

    if (pagamento == null) {
      console.log("Erro ao cadastrar pagamento!");
      res.status(400).json({ erro: "Erro ao cadastrar pagamento!" });
      return;
    }
      res.status(201).json(pagamento);
  } catch (error) { 
    console.log(error);
    res.status(400).json(error);
  }

});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const parsedId = parseInt(id, 10); // Convertendo o id para número

  if (isNaN(parsedId)) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  try {
    const pagamentos = await prisma.pagamento.findMany({
      where: { usuarioId: parsedId }, // Usando parsedId
      include: { usuario: true },
      orderBy: { dataPagamento: 'desc' }
    });

    if (pagamentos == null) {
      res.status(400).json({ erro: "Não cadastrado" });
      return;
    } else {
      res.status(200).json(pagamentos.map(pagamento => ({

        id: pagamento.id,
        nome: pagamento.usuario.nome,
        email: pagamento.usuario.email,
        dataPagamento: pagamento.dataPagamento,
        valor: pagamento.valor,
        formaPagamento: pagamento.formaPagamento
      })));
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;