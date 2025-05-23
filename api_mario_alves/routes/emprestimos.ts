import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const prisma = new PrismaClient();

const router = Router();

router.get("/", async (req, res) => {
  try {
    const emprestimos = await prisma.emprestimo.findMany();
    res.status(200).json(emprestimos);
  } catch (error) {
    res.status(400).json({ erro: "Erro ao buscar empréstimos." });
  }
});

router.post("/", async (req, res) => {
  const { livroId, dataRetirada, dataEntrega, usuarioId } = req.body;

  if (!livroId || !dataRetirada || !dataEntrega || !usuarioId) {
    return res.status(400).json({ erro: "Dados incompletos." });
  }

  try {
    const livro = await prisma.livro.findUnique({
      where: { id: parseInt(livroId) },
      select: { titulo: true },
    });

    if (!livro) {
      return res.status(404).json({ erro: "Livro não encontrado." });
    }

    const emprestimo = await prisma.emprestimo.create({
      data: {
        livroId: parseInt(livroId),
        titulo: livro.titulo,
        datadaReserva: new Date(dataRetirada).toISOString(),
        status: "Locado",
        datadaEntrega: new Date(dataEntrega).toISOString(),
        usuarioId: parseInt(usuarioId),
      },
    });

    res.status(201).json(emprestimo);
  } catch (error) {
    res.status(500).json({ erro: "Erro interno ao processar o empréstimo." });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.emprestimo.delete({ where: { id: Number(id) } });
    res.status(200).json({ mensagem: "Empréstimo excluído com sucesso." });
  } catch (error) {
    res.status(400).json({ erro: "Erro ao excluir empréstimo." });
  }
});

export default router;