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
    const autores = await prisma.autor.findMany();
    res.status(200).json(autores);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/", async (req, res) => {
  const { nome, pais } = req.body;

  if (!nome  || !pais ) {
    res.status(400).json({ erro: "Informe nome e país" });
    return;
  }

  try {
    const autores = await prisma.autor.create({
      data: { nome, pais },
    });
    res.status(201).json(autores);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const autores = await prisma.autor.delete({
        where: { id: Number(id) },
      });
      res.status(200).json(autores);
    } catch (error) {
      console.error("Erro ao deletar autor:", error);
      res.status(400).json({ erro: "Erro ao deletar autor" });
    }
  });

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, pais } = req.body;

  if (!nome || !pais) {
    res.status(400).json({ erro: "Informe nome e país" });
    return;
  }

  try {
    const autores = await prisma.autor.update({
      where: { id: Number(id) },
      data: { nome, pais },
    });
    res.status(200).json(autores);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const autor = await prisma.autor.findUnique({
      where: { id: Number(id) },
    });
    res.status(200).json(autor);
  } catch (error) {
    res.status(400).json(error);
  }
});


export default router;
