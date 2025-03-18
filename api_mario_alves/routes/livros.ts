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
    const livros = await prisma.livro.findMany();
    res.status(200).json(livros);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/", async (req, res) => {
  const { titulo, autor, codigodoLivro, secao, sinopse, foto, genero } = req.body;

  if (!titulo || !autor || !codigodoLivro || !secao || !sinopse || !foto || !genero) {
    res.status(400).json({ erro: "Informe nome, endereco, telefone e datanasc" });
    return;
  }

  try {
    const livros = await prisma.livro.create({
      data: { titulo, autor, codigodoLivro, secao, sinopse, foto, genero },
    });
    res.status(201).json(livros);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

    // Remova as reservas associadas ao livro
    await prisma.reserva.deleteMany({
      where: { livroId: Number(id) },
    });

    await prisma.comentario.deleteMany({
      where: { livroId: Number(id) },
    });
    
    await prisma.foto.deleteMany({
      where: { livroId: Number(id) },
    });


    // Em seguida, exclua o livro
    const livros = await prisma.livro.delete({
      where: { id: Number(id) },
    });

    res.status(200).json(livros);

});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { titulo, autor, codigodoLivro, secao, sinopse, foto, genero } = req.body;

  if (!titulo || !autor || !codigodoLivro || !secao || !sinopse || !foto || !genero) {
    res.status(400).json({ erro: "Informe titulo, autor, codigo, secao, sinopse, foto e genero" });
    return;
  }

  try {
    const livros = await prisma.livro.update({
      where: { id: Number(id) },
      data: { titulo, autor, codigodoLivro, secao, sinopse, foto, genero },
    });
    res.status(200).json(livros);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/pesquisa/:termo", async (req, res) => {
  const { termo } = req.params;
  const termoNumero = Number(termo);

  if (isNaN(termoNumero)) {
    try {
      const livros = await prisma.livro.findMany({
        where: {
          OR: [
            { autor: { contains: termo } },
            { genero: { contains: termo } },
            { titulo: { contains: termo } },
          ],
        },
      });
      res.status(200).json(livros);
    } catch (error) {
      res.status(400).json(error);
    }
  } else {
    try {
      const livros = await prisma.livro.findMany({
        where: {
          OR: [
            { codigodoLivro: { contains: termo } },
            { secao: { contains: termo } },
            { genero: { contains: termo } },
          ],
        },
      });
      res.status(200).json(livros);
    } catch (error) {
      res.status(400).json(error);
    }
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const livro = await prisma.livro.findUnique({
      where: { id: Number(id) },
    });
    res.status(200).json(livro);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;
