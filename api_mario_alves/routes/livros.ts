import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const prisma = new PrismaClient({
  log: [
    { emit: "event", level: "query" },
    { emit: "stdout", level: "error" },
    { emit: "stdout", level: "info" },
    { emit: "stdout", level: "warn" },
  ],
});

prisma.$on("query", (e) => {
  console.log("Query: " + e.query);
  console.log("Params: " + e.params);
  console.log("Duration: " + e.duration + "ms");
});

const router = Router();

// GET todos os livros
router.get("/", async (req, res) => {
  try {
    const livros = await prisma.livro.findMany({
      include: { generos: true, autores: true, editoras: true },
    });
    res.status(200).json(livros);
  } catch (error) {
    res.status(400).json(error);
  }
});

// POST criar novo livro
router.post("/", async (req, res) => {
  const { titulo, foto, sinopse, generoId, editoraId, autorId } = req.body;

  if (!titulo || !foto || !sinopse || !generoId || !editoraId || !autorId) {
    res.status(400).json({
      erro: "Informe título, foto, sinopse, gênero, editora e autor!",
    });
    return;
  }

  try {
    const novoLivro = await prisma.livro.create({
      data: {
        titulo,
        foto,
        sinopse,
        autorId,
        generoId,
        editoraId
      },
      include: { generos: true, autores: true, editoras: true },
    });
    res.status(201).json(novoLivro);
  } catch (error) {
    res.status(400).json(error);
  }
});

// DELETE remover livro (exclui primeiro registros dependentes do livro)
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // Remova os registros dependentes que referenciam o livro (por exemplo, reservas e comentários)
    await prisma.reserva.deleteMany({
      where: { livroId: Number(id) },
    });
    await prisma.comentario.deleteMany({
      where: { livroId: Number(id) },
    });
    // Em seguida, exclua o livro
    const livroRemovido = await prisma.livro.delete({
      where: { id: Number(id) },
    });
    res.status(200).json(livroRemovido);
  } catch (error) {
    res.status(400).json(error);
  }
});

// PUT atualizar livro
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { titulo, foto, sinopse, editoraId, autorId, generoId } = req.body;

  if (!titulo || !foto || !sinopse || !editoraId || !autorId || !generoId) {
    res
      .status(400)
      .json({ erro: "Informe título, foto, sinopse, editora, autor e gênero!" });
    return;
  }

  try {
    const livroAtualizado = await prisma.livro.update({
      where: { id: Number(id) },
      data: {
        titulo,
        foto,
        sinopse,
        editoraId, 
        autorId, 
        generoId, 
      },
      include: { generos: true, autores: true, editoras: true },
    });
    res.status(200).json(livroAtualizado);
  } catch (error) {
    res.status(400).json(error);
  }
});

// GET pesquisar livros por termo
router.get("/pesquisa/:termo", async (req, res) => {
  const { termo } = req.params;
  try {
    const livros = await prisma.livro.findMany({
      where: {
        OR: [
          { titulo: { contains: termo } },
          // Pesquisa por autorId apenas se o termo for um número válido
          ...(isNaN(Number(termo)) ? [] : [{ autorId: Number(termo) }])
        ]
      },
      include: { generos: true, autores: true, editoras: true },
    });
    res.status(200).json(livros);
  } catch (error) {
    res.status(400).json(error);
  }
});

// GET livro por id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const livro = await prisma.livro.findUnique({
      where: { id: Number(id) },
      include: { generos: true, autores: true, editoras: true },
    });
    res.status(200).json(livro);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;