import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const prisma = new PrismaClient();
const router = Router();

router.get("/", async (req, res) => {
  try {
    const reservas = await prisma.reserva.findMany();
    res.status(200).json(reservas);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/", async (req, res) => {
  const { livroId, usuarioId, datadaReserva, titulo } = req.body;

  if (!livroId || !usuarioId || !datadaReserva || !titulo) {
    return res.status(400).json({
      erro: "Informe livroId, usuarioId, datadaReserva e titulo"
    });
  }

  try {
    console.log("Dados recebidos:", { livroId, usuarioId, datadaReserva, titulo });

    // Verificar se o livro existe
    const livroExistente = await prisma.livro.findUnique({
      where: { id: Number(livroId) },
    });
    if (!livroExistente) {
      return res.status(404).json({ erro: "Livro não encontrado" });
    }

    const hoje = new Date();
    const dataReserva = new Date(datadaReserva);
    const dataEntrega = new Date(dataReserva);
    dataEntrega.setDate(dataReserva.getDate() + 5);

    // Criar nova reserva
    const reserva = await prisma.reserva.create({
      data: {
        livroId: Number(livroId),
        usuarioId: Number(usuarioId),
        titulo: livroExistente.titulo,
        datadaReserva: dataReserva,
        
      },
    });

    res.status(201).json({
      mensagem: "Reserva feita com sucesso", reserva
    });
  } catch (error) {
    console.error("Erro ao criar reserva:", error);
    res.status(400).json({ erro: "Erro ao criar reserva" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const reservas = await prisma.reserva.delete({
      where: { id: Number(id) },
    });
    res.status(200).json(reservas);
  } catch (error) {
    console.error("Erro ao deletar reserva:", error);
    res.status(400).json({ erro: "Erro ao deletar reserva" });
  }
});

// Rota para cancelar uma reserva por ID
router.delete("/reservas/:id", async (req, res) => {
  const { id } = req.params;

// Verifica se o ID é válido
if (isNaN(Number(id))) {
  return res.status(400).json({ erro: "ID inválido." });
}

try {
  // Verifica se a reserva existe
  const reservaExistente = await prisma.reserva.findUnique({
    where: { id: Number(id) },
  });

  if (!reservaExistente) {
    return res.status(404).json({ erro: "Reserva não encontrada." });
  }

  // Exclui a reserva
  const reservaCancelada = await prisma.reserva.delete({
    where: { id: Number(id) },
  });

  res.status(200).json({
    mensagem: "Reserva cancelada com sucesso.",
    reserva: reservaCancelada,
  });
} catch (error) {
  console.error("Erro ao cancelar reserva:", error);
  res.status(500).json({ erro: "Erro ao cancelar reserva." });
}
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const parsedId = parseInt(id, 10); // Convertendo o id para número

  if (isNaN(parsedId)) {
    return res.status(400).json({ erro: "Reserva inválida" });
  }

  try {
    const reserva = await prisma.reserva.findUnique({
      where: { id: parsedId }, // Usando parsedId
    });

    if (reserva == null) {
      res.status(400).json({ erro: "Não reservado!!" });
      return;
    } else {
      res.status(200).json({
        id: reserva.id,
        
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;