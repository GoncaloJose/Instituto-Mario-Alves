import { PrismaClient } from "@prisma/client";
import { Router } from "express";

// const prisma = new PrismaClient()
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
    const emprestimos = await prisma.emprestimo.findMany();
    res.status(200).json(emprestimos);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/", async (req, res) => {
  const { livroId, titulo, datadaReserva, status, datadaEntrega, usuarioId, renovacoes } = req.body;

  if (!livroId || !titulo || !datadaReserva || !status || !datadaEntrega || !usuarioId || !renovacoes) {
    res.status(400).json({ "erro": "Informe livro, título, usuário datadaReserva, status, datadaEntrega e renovacoes" });
    return;
  }

  try {
    const emprestimo = await prisma.emprestimo.create({
      data: {
        livroId,
        titulo,
        datadaReserva: new Date(datadaReserva).toISOString(),
        status,
        datadaEntrega: new Date(datadaEntrega).toISOString(),
        usuarioId,
        renovacoes
      }
    });
    res.status(201).json(emprestimo);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const emprestimos = await prisma.emprestimo.delete({
      where: { id: Number(id) }
    });
    res.status(200).json(emprestimos);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { livroId, titulo, datadaReserva, status, datadaEntrega, usuarioId, renovacoes } = req.body;

  if (!livroId || !titulo || !datadaReserva || !status || !datadaEntrega || !usuarioId || !renovacoes) {
    res.status(400).json({ "erro": "Informe livro, titulo, datadaReserva, status, datadaEntrega, usuarioId e renovacoes" });
    return;
  }

  try {
    const emprestimos = await prisma.emprestimo.update({
      where: { id: Number(id) },
      data: {
        usuarioId,
        livroId,
        titulo,
        datadaReserva: new Date(datadaReserva).toISOString(),
        status,
        datadaEntrega: new Date(datadaEntrega).toISOString(),
        renovacoes
      }
    });
    res.status(200).json(emprestimos);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/emprestimos", async (req, res) => { 
  try { 
    const emprestimos = await prisma.emprestimo.findMany(); 
    res.status(200).json(emprestimos); 
  } catch (error) { 
    res.status(400).json(error); 
  } 
});

export default router;
