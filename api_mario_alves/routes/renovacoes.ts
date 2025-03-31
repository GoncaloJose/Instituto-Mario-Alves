import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import express from 'express';

const prisma = new PrismaClient();
const router = Router();

router.get("/", async (req, res) => {
  try {
    const renovacoes = await prisma.renovacao.findMany();
    res.status(200).json(renovacoes);
  } catch (error) {
    res.status(400).json(error);
  }
});

function validaRenovacao(id: string): string[] {
  const mensa: string[] = [];

  let numeros = 0;
  for (const letra of id) {
    if (/[0-9]/.test(letra)) {
      numeros++;
    }
  }
  if (numeros === 0) {
    mensa.push("Erro... código deve possuir letras e números!!");
  }
  return mensa;
}

router.post("/", async (req, res) => {
  const { livroId, usuarioId, datadaEntrega } = req.body;

  if (!livroId || !usuarioId || !datadaEntrega) {
    return res.status(400).json({
      erro: "Informe livroId, usuarioId e datadaEntrega"
    });
  }


  try {
    console.log("Dados recebidos:", { livroId, usuarioId, datadaEntrega });

    // Verificar se o livro existe
    const livroExistente = await prisma.livro.findUnique({
      where: { id: Number(livroId) },
    });
    if (!livroExistente) {
      return res.status(404).json({ erro: "Livro não encontrado" });
    }

    // Criar nova reserva
    const renovacao = await prisma.renovacao.create({
      data: {
        livroId: Number(livroId),
        usuarioId: Number(usuarioId),
        datadaEntrega: new Date(datadaEntrega),
      },
    });

    res.status(201).json(renovacao);
  } catch (error) {
    console.error("Erro ao criar renovacao:", error);
    res.status(400).json({ erro: "Erro ao criar renovacao" });
  }
});

router.post("/logRenovacao", async (req, res) => {
  const { livroId, usuarioId, datadaEntrega } = req.body;

  console.log("Dados recebidos:", { livroId, usuarioId, datadaEntrega });

  const mensaPadrao = "DatadaEntrega, UsuarioId e LivroId incorretos.";
  if (!livroId || !usuarioId || !datadaEntrega) {
    console.log("Erro: Dados ausentes");
    return res.status(400).json({ erro: mensaPadrao });
  }

  try {
    const datadaEntregaFormatada = new Date(datadaEntrega);

    if (isNaN(datadaEntregaFormatada.getTime())) {
      return res.status(400).json({ erro: "Data inválida" });
    }

    const renovacoes = await prisma.renovacao.findFirst({
      where: {
        livroId,
        usuarioId,
        datadaEntrega: datadaEntregaFormatada,
      }
    });

    console.log("Reserva encontrada:", renovacoes);

    if (!renovacoes) {
      console.log("Erro: Renovacão não encontrada");
      return res.status(404).json({ erro: "Renovação não encontrada" });
    } 
      return res.status(200).json({

        livroId: renovacoes.livroId,
        clienteId: renovacoes.usuarioId,
        datadaEntrega: renovacoes.datadaEntrega
      });
    
  } catch (error) {
    console.error("Erro ao buscar a renovação:", error);
    return res.status(500).json({ erro: "Erro interno do servidor" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const renovacoes = await prisma.renovacao.delete({
      where: { id: Number(id) },
    });
    res.status(200).json(renovacoes);
  } catch (error) {
    console.error("Erro ao deletar renovacao:", error);
    res.status(400).json({ erro: "Erro ao deletar renovacao" });
  }
});

export default router;