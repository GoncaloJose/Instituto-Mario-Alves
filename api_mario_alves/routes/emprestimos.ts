import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const prisma = new PrismaClient();
const router = Router();

// Rota: listar todos os empréstimos
router.get("/", async (req, res) => {
  try {
    const emprestimos = await prisma.emprestimo.findMany({
      include: {
        usuario: true,
        livro: {
          include: {
            autores: true
          }
        }
      }
    });
    res.status(200).json(emprestimos);
  } catch (error) {
    console.error("Erro ao buscar empréstimos:", error);
    res.status(400).json({ erro: "Erro ao buscar empréstimos." });
  }
});

// Rota: criar novo empréstimo com data atual e +7 dias
router.post("/", async (req, res) => {
  const { livroId, usuarioId } = req.body;

  if (!livroId || !usuarioId) {
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

    const hoje = new Date();
    const dataEntrega = new Date(hoje);
    dataEntrega.setDate(dataEntrega.getDate() + 7);

    const emprestimo = await prisma.emprestimo.create({
      data: {
        livroId: parseInt(livroId),
        titulo: livro.titulo,
        datadaReserva: hoje,
        datadaEntrega: dataEntrega,
        status: "LOCADO",
        usuarioId: parseInt(usuarioId)
      },
    });

    res.status(201).json(emprestimo);
  } catch (error) {
    console.error("Erro ao criar empréstimo:", error);
    res.status(500).json({ erro: "Erro interno ao processar o empréstimo." });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const emprestimo = await prisma.emprestimo.findUnique({
      where: { id: Number(id) },
    });
    if (emprestimo) {
      res.status(200).json(emprestimo);
    } else {
      res.status(404).json({ erro: "Empréstimo não encontrado." });
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

// Rota: excluir empréstimo
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.emprestimo.delete({ where: { id: Number(id) } });
    res.status(200).json({ mensagem: "Empréstimo excluído com sucesso." });
  } catch (error) {
    console.error("Erro ao excluir empréstimo:", error);
    res.status(400).json({ erro: "Erro ao excluir empréstimo." });
  }
});

// Rota: renovar empréstimo (adiciona +7 dias à entrega atual)
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const emprestimoExistente = await prisma.emprestimo.findUnique({
      where: { id: Number(id) },
    });

    if (!emprestimoExistente || !emprestimoExistente.datadaEntrega) {
      return res.status(404).json({ erro: "Empréstimo não encontrado ou data inválida." });
    }

    const novaDataEntrega = new Date(emprestimoExistente.datadaEntrega);
    novaDataEntrega.setDate(novaDataEntrega.getDate() + 7);

    const emprestimoAtualizado = await prisma.emprestimo.update({
      where: { id: Number(id) },
      data: { datadaEntrega: novaDataEntrega },
    });

    res.status(200).json({
      mensagem: "Empréstimo renovado com sucesso!",
      emprestimo: emprestimoAtualizado,
    });
  } catch (error) {
    console.error("Erro ao renovar empréstimo:", error);
    res.status(500).json({ erro: "Erro ao renovar empréstimo." });
  }
});

router.get("/:id/retorno", async (req, res) => {
  const { id } = req.params;

  try {
    const emprestimoExistente = await prisma.emprestimo.findUnique({
      where: { id: Number(id) },
    });

    if (!emprestimoExistente) {
      return res.status(404)
        .json({ erro: "Empréstimo não encontrado ou data inválida." });
    }

    const emprestimoAtualizado = await prisma.emprestimo.update({
      where: { id: Number(id) },
      data: { datadaEntrega: new Date(), status: 'RETORNADO' },
    });

    res.status(200).json({
      mensagem: "Empréstimo entregue com sucesso!",
      emprestimo: emprestimoAtualizado,
    });
  } catch (error) {
    console.error("Erro ao marcar empréstimo como retornado:", error);
    res.status(500).json({ erro: "Erro ao renovar empréstimo." });
  }
});

export default router;
