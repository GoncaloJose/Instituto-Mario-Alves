import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { parse } from "path";

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
  const { titulo, foto, generoId, editoraId, autorId } = req.body;

  if (!titulo  || !foto || !generoId || !editoraId || !autorId) { // aqui falta editora autor e genero?
    res.status(400).json({ erro: "Informe titulo, foto, genero, editora e autor!!" });
    return;
  }
const generos = await prisma.genero.findUnique({
  where: { id: parseInt("1") },// generoId },//???????????????????????????? é o numero 2 ou generoId e não tem que ter a const de editora e autor tbm??
  // aqui falta uma const de editora e autor?
})
const editoras = await prisma.editora.findUnique({
  where: { id: parseInt(editoraId) },
})
const autores = await prisma.autor.findUnique({
  where: { id: parseInt(autorId) },
})


  try {
  const livros = await prisma.livro.create({
  data: { 
    titulo, 
    foto, 
    generos: { connect: { id: 2 } }, 
    editoras: { connect: { id: 1 } }, 
    autores: { connect: { id: 1 } } 
  },
});
    res.status(201).json({});
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
    
    // Em seguida, exclua o livro
    const livros = await prisma.livro.delete({
      where: { id: Number(id) },
    });

    res.status(200).json(livros);

});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { titulo, foto } = req.body; // aqui falta editora autor e genero?

  if (!titulo || !foto) { // aqui falta editora autor e genero?
    res.status(400).json({ erro: "Informe titulo e foto" });
    return;
  }

  try {
    const livros = await prisma.livro.update({
      where: { id: Number(id) },
      data: { titulo, foto },
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
            { titulo: { contains: termo } },
            { foto:   { contains: termo } },
             // aqui falta editora autor e genero?
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
            { titulo: { contains: termo } },
            { foto:   { contains: termo } },
            // aqui falta editora autor e genero?
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
