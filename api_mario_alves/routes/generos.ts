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
    const generos = await prisma.genero.findMany();
    res.status(200).json(generos);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/", async (req, res) => {
  const { tipo } = req.body;

  if (!tipo ) {
    res.status(400).json({ erro: "Informe gênero do livro!!" });
    return;
  }

  try {
    const generos = await prisma.genero.create({
      data: { tipo },
    });
    res.status(201).json(generos);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const generos = await prisma.genero.delete({
        where: { id: Number(id) },
      });
      res.status(200).json(generos);
    } catch (error) {
      console.error("Erro ao deletar gênero:", error);
      res.status(400).json({ erro: "Erro ao deletar gênero" });
    }
  });

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { tipo } = req.body;

  if (!tipo) {
    res.status(400).json({ erro: "Informe o gênero do livro!!" });
    return;
  }

  try {
    const generos = await prisma.genero.update({
      where: { id: Number(id) },
      data: { tipo },
    });
    res.status(200).json(generos);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const genero = await prisma.genero.findUnique({
      where: { id: Number(id) },
    });
    res.status(200).json(genero);
  } catch (error) {
    res.status(400).json(error);
  }
});


export default router;