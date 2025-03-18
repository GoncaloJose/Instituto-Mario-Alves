import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const prisma = new PrismaClient();
const router = Router();

router.get("/gerais", async (req, res) => {
  try {
    const clientes = await prisma.cliente.count();
    const livros = await prisma.livro.count();
    const reservas = await prisma.reserva.count();
    const comentarios = await prisma.comentario.count();
    res.status(200).json({ clientes, livros, reservas, comentarios });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "Unknown error" });
    }
  }
});

router.get("/livrosReserva", async (req, res) => {
  try {
    const livros = await prisma.livro.groupBy({
      by: ['id'], // Certifique-se de usar um campo válido
      _count: {
        id: true, // Corrigir o campo _count para usar um campo válido
      },
    });

    const livrosReserva = await Promise.all(
      livros.map(async (livro) => {
        const reservaId = livro.id; // Use um campo válido para reservaId
        if (reservaId === null) {
          return { reserva: null, num: livro._count.id || 0 };
        }

        const reserva = await prisma.reserva.findUnique({
          where: { id: reservaId },
        });

        return {
          reserva: reserva?.livroId || null,
          num: livro._count.id || null, // Corrigir o campo _count
        };
      })
    );

    res.status(200).json(livrosReserva);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "Unknown error" });
    }
  }
});

export default router;
