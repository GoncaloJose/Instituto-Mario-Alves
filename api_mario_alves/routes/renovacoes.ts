import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import emprestimosRoutes from "./emprestimos";

const prisma = new PrismaClient();
const router = Router();

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
   
    const emprestimo = await prisma.emprestimo.findUnique({
      where: { id: Number(id) },
    });

    if (!emprestimo) {
      return res.status(404).json({ erro: "Empréstimo não encontrado." });
    }

    
    const novaDataEntrega = new Date(emprestimo.datadaEntrega);
    novaDataEntrega.setDate(novaDataEntrega.getDate() + 7);

    
    const emprestimoAtualizado = await prisma.emprestimo.update({
      where: { id: Number(id) },
      data: { datadaEntrega: novaDataEntrega.toISOString() },
    });

    res.status(200).json({
      mensagem: "Empréstimo renovado com sucesso!",
      novaDataEntrega: emprestimoAtualizado.datadaEntrega,
    });

  } catch (error) {
    console.error("Erro ao renovar empréstimo:", error);
    res.status(500).json({ erro: "Erro interno no servidor." });
  }
});

export default router;