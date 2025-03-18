import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import express from 'express';

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
  const { livroId, clienteId, datadaReserva, titulo } = req.body;

  if (!livroId || !clienteId || !datadaReserva || !titulo) {
    return res.status(400).json({
      erro: "Informe livroId, clienteId, datadaReserva e titulo"
    });
  }

  try {
    console.log("Dados recebidos:", { livroId, clienteId, datadaReserva });

    // Verificar se o livro existe
    const livroExistente = await prisma.livro.findUnique({
      where: { id: Number(livroId) },
    });
    if (!livroExistente) {
      return res.status(404).json({ erro: "Livro não encontrado" });
    }

    const dataReserva = new Date(datadaReserva);
    const dataEntrega = new Date(dataReserva);
    dataEntrega.setDate(dataReserva.getDate() + 5);

    // Criar nova reserva
    const reserva = await prisma.reserva.create({
      data: {
        livroId: Number(livroId),
        clienteId: Number(clienteId),
        datadaReserva: dataReserva,
      },
    });

    // Criar histórico automaticamente
    await prisma.historico.create({
      data: {
        livroId: Number(livroId),
        clienteId: Number(clienteId),
        titulo: titulo,
        datadaReserva: dataReserva,
        status: "Reservado",
        datadaEntrega: dataEntrega

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
  const id = Number(req.params.id);

  // Verifica se o ID é válido
  if (isNaN(id)) {
    return res.status(400).json({ erro: "ID inválido." });
  }

  try {
    console.log("Tentando cancelar a reserva com ID:", id);

    // Verifica se a reserva existe
    const reservaExistente = await prisma.reserva.findUnique({
      where: { id },
    });

    if (!reservaExistente) {
      return res.status(404).json({ erro: "Reserva não encontrada." });
    }

    // Tenta deletar a reserva
    const reservaCancelada = await prisma.reserva.delete({
      where: { id },
    });

    console.log("Reserva cancelada:", reservaCancelada);

    // Deleta o histórico correspondente
    const historicoDeletado = await prisma.historico.deleteMany({
      where: { livroId: reservaCancelada.livroId, clienteId: reservaCancelada.clienteId },
    });

    console.log("Histórico deletado:", historicoDeletado);

    res.status(200).json({
      mensagem: "Reserva e histórico cancelados com sucesso.",
      reserva: reservaCancelada,
    });
  } catch (error: any) {
    console.error("Erro ao cancelar reserva:", error);

    res.status(500).json({ erro: "Erro ao cancelar reserva." });
  }
});

export default router;