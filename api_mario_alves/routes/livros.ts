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
    const livros = await prisma.livro.findMany({
      include: {
        generos: true,
        autores: true,
        editoras: true
      },
    });
    
    res.status(200).json(livros);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/disponivel/:id", async (req, res) => {
  const { id } = req.params;
  const { data } = req.query; 
  try {
    const reserva = await prisma.reserva.findFirst({
      where: { 
        livroId: Number(id),
        datadaReserva: { gte: new Date(data as string)},
        
      },
    });

    if (reserva) {
      return res.status(200).json({ disponivel: false });
    } else {
      const emprestimo = await prisma.emprestimo.findFirst({
        where: { 
          livroId: Number(id),
          datadaEntrega: { gte: new Date(data as string) },
        },
      });
      if (emprestimo) {
        return res.status(200).json({ disponivel: false });
      } else {
        return res.status(200).json({ disponivel: true });
      }
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/", async (req, res) => {
  const { titulo, foto, sinopse, generoId, editoraId, autorId } = req.body;

  if (!titulo  || !foto || !sinopse || !generoId || !editoraId || !autorId) { 
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
    sinopse,
    generos: { connect: { id: parseInt(generoId) } }, 
    editoras: { connect: { id: parseInt(editoraId) } }, 
    autores: { connect: { id: parseInt(autorId) } } 
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

    await prisma.emprestimo.deleteMany({
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
  const { titulo, foto, sinopse, editoraId, autorId, generoId } = req.body; // aqui falta editora autor e genero?

  if (!titulo || !foto || !sinopse || !editoraId || !autorId || !generoId) { // aqui falta editora autor e genero?
    res.status(400).json({ erro: "Informe titulo, foto, editora, autor ou gênero!!" });
    return;
  }

  try {
    const livros = await prisma.livro.update({
      where: { id: Number(id) },
      data: { 
        titulo, 
        foto, 
        sinopse, 
        editoras: { connect: { id: Number(editoraId) } }, 
        autores: { connect: { id: Number(autorId) } }, 
        generos: { connect: { id: Number(generoId) } } 
      }, // editora genero
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
            { sinopse:   { contains: termo } },
            { generos: { some: { tipo: { contains: termo } } } },
            { autores: { some: { nome: { contains: termo } } } },
            { editoras: { nome: { contains: termo } }}
          ],
        },
        include: {
          generos: true,
          autores: true,
          editoras: true
        }
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
            { sinopse: { contains: termo } },
            { generos: { some: { tipo: { contains: termo } } } },
            { autores: { some: { nome: { contains: termo } } } },
            { editoras: { nome: { contains: termo } }}

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