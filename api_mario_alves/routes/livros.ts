import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { parse } from "path";
import { startOfDay, endOfDay, addDays, parse as parseDate } from "date-fns";

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

// [CORREÇÃO 1: Nome da rota e lógica de data]
// O nome da rota deve ser "/:id/disponibilidade" para bater com o frontend
router.get("/:id/disponibilidade", async (req, res) => {
  const { id } = req.params;
  const { data, usuarioId } = req.query;

  if (!data || typeof data !== 'string') {
    return res.status(400).json({
      erro: "Formato de data inválido ou ausente."
    });
  }

  try {
    const dataConsulta = new Date(data + "T00:00:00.000");
    const hoje = startOfDay(new Date());

    // Puxa o ultimo empréstimo (ativo ou recente)
    const ultimoEmprestimo = await prisma.emprestimo.findFirst({
      where: { livroId: Number(id), status: 'LOCADO' },
      orderBy: { datadaEntrega: "desc" },
    });

    const hojeComOffset = new Date(hoje.getTime() - hoje.getTimezoneOffset() * 60000);
    // Todas as reservas futuras (ordenadas)
    const reservasFuturas = await prisma.reserva.findMany({
      where: {
        livroId: Number(id),
        NOT: {
          usuarioId: {
            equals: usuarioId ? Number(usuarioId) : undefined
          }
        },
        datadaReserva: { gte: hojeComOffset } // Ajuste de fuso horário
      },
      orderBy: { datadaReserva: "asc" },
    });

    // Cata o intervalo total de bloqueio
    let inicioBloqueio: Date | null = null;
    let fimBloqueio: Date | null = null;

    // Se existe um empréstimo, começa nele
    if (ultimoEmprestimo) {
      inicioBloqueio = new Date(
        startOfDay(ultimoEmprestimo.datadaReserva)
      );

      fimBloqueio = new Date(
        endOfDay(ultimoEmprestimo.datadaEntrega)
      );
    }


    // Caso existam reservas
    if (reservasFuturas.length > 0) {
      // Se o livro ainda não foi emprestado ou já voltou, o bloqueio começa
      // agora (pois já está reservado)
      if (!inicioBloqueio || fimBloqueio! < hoje) {
        inicioBloqueio = hoje;
      }

      // Percorre todas as reservas e vai estendendo o bloqueio
      for (const reserva of reservasFuturas) {
        const dataReserva = new Date(
          startOfDay(reserva.datadaReserva)
        );

        // Soma mais um dia pq a reserva dura 24h
        const fimReserva = addDays(new Date(dataReserva), 1);

        // Se ainda não há fim definido, ou a reserva é mais longe, estende
        if (!fimBloqueio || fimReserva > fimBloqueio) {
          fimBloqueio = fimReserva;
        }
      }
    }

    console.log("Reservas futuras: ", reservasFuturas);
    console.log("inicio, fim, data consultada", inicioBloqueio, fimBloqueio, dataConsulta)

    // Se a data consultada cai dentro do bloqueio
    if (inicioBloqueio && fimBloqueio && dataConsulta >= inicioBloqueio && dataConsulta <= fimBloqueio) {
      return res.status(200).json({
        disponivel: false,
        motivo: reservasFuturas.length > 0 ? "reservado" : "emprestado",
        periodoBloqueado: { inicio: inicioBloqueio, fim: fimBloqueio },
      });
    }

    // Caso contrário, tá disponível
    return res.status(200).json({ disponivel: true });
  } catch (error) {
    console.error("Erro ao verificar disponibilidade:", error);

    return res.status(500)
      .json({ erro: "Erro interno ao verificar disponibilidade." });
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
      include: {
        autores: true,
        generos: true
      }
    });
    res.status(200).json(livro);
  } catch (error) {
    res.status(400).json(error);
  }
});


export default router;
