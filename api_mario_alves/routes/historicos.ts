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
    const historicos = await prisma.historico.findMany();
    res.status(200).json(historicos);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/", async (req, res) => {
  const { livroId, titulo, datadaReserva, status, datadaEntrega, clienteId, renovacoes } = req.body;

  if (!livroId || !titulo || !datadaReserva || !status || !datadaEntrega || !clienteId || !renovacoes) {
    res.status(400).json({ "erro": "Informe livro, titulo, datadaReserva, status, datadaEntrega e renovacoes" });
    return;
  }

  try {
    const historico = await prisma.historico.create({
      data: {
        livroId,
        titulo,
        datadaReserva: new Date(datadaReserva).toISOString(),
        status,
        datadaEntrega: new Date(datadaEntrega).toISOString(),
        clienteId,
        renovacoes
      }
    });
    res.status(201).json(historico);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const historicos = await prisma.historico.delete({
      where: { id: Number(id) }
    });
    res.status(200).json(historicos);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { livroId, titulo, datadaReserva, status, datadaEntrega, clienteId, renovacoes } = req.body;

  if (!livroId || !titulo || !datadaReserva || !status || !datadaEntrega || !clienteId || !renovacoes) {
    res.status(400).json({ "erro": "Informe livro, titulo, datadaReserva, status, datadaEntrega, clienteId e renovacoes" });
    return;
  }

  try {
    const historicos = await prisma.historico.update({
      where: { id: Number(id) },
      data: {
        clienteId,
        livroId,
        titulo,
        datadaReserva: new Date(datadaReserva).toISOString(),
        status,
        datadaEntrega: new Date(datadaEntrega).toISOString(),
        renovacoes
      }
    });
    res.status(200).json(historicos);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/historicos", async (req, res) => { 
  try { 
    const historicos = await prisma.historico.findMany(); 
    res.status(200).json(historicos); 
  } catch (error) { 
    res.status(400).json(error); 
  } 
});

export default router;
