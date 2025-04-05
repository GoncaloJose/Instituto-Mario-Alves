import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
});

prisma.$on('query', (e) => {
  console.log('Query: ' + e.query);
  console.log('Params: ' + e.params);
  console.log('Duration: ' + e.duration + 'ms');
});

const router = Router();

router.get("/", async (req, res) => {
  try {
    const editoras = await prisma.editora.findMany();
    res.status(200).json(editoras);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/", async (req, res) => {
  const { nome, cnpj, ano, edicao, descricao } = req.body;

  if (!nome || !cnpj || !ano || !edicao || !descricao) {
    res.status(400).json({ erro: "Informe nome, cnpj, ano, edicao e descricao!!" });
    return;
  }

  try {
    const editoras = await prisma.editora.create({
      data: { nome, cnpj, ano, edicao, descricao },
    });
    res.status(201).json(editoras);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const editoras = await prisma.editora.delete({
        where: { id: Number(id) },
      });
      res.status(200).json(editoras);
    } catch (error) {
      console.error("Erro ao deletar Editora:", error);
      res.status(400).json({ erro: "Erro ao deletar Editora" });
    }
  });

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, cnpj, ano, edicao, descricao } = req.body;

  if (!nome || !cnpj || !ano || !edicao || !descricao) {
    res.status(400).json({ erro: "Informe nome, cnpj, ano, edicao e descricao!!" });
    return;
  }

  try {
    const editoras = await prisma.editora.update({
      where: { id: Number(id) },
      data: { nome, cnpj, ano, edicao, descricao },
    });
    res.status(200).json(editoras);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const editora = await prisma.editora.findUnique({
      where: { id: Number(id) },
    });
    res.status(200).json(editora);
  } catch (error) {
    res.status(400).json(error);
  }
});


export default router;