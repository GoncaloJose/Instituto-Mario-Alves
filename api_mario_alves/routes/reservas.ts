import { PrismaClient } from "@prisma/client"
import { Router } from "express"
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()
const router = Router()

router.get("/", async (req, res) => {
  try {
    const reservas = await prisma.reserva.findMany()
    res.status(200).json(reservas)
  } catch (error) {
    res.status(400).json(error)
  }
})

function validaReserva(codigodoCliente: string) {
  const mensa: string[] = []

  if (codigodoCliente.length < 8) {
    mensa.push("Erro... digite o código do cliente corretamente")
  }

  let pequenas = 0
  let grandes = 0
  let numeros = 0

  for (const letra of codigodoCliente) {
    if ((/[a-z]/).test(letra)) {
      pequenas++
    } else if ((/[A-Z]/).test(letra)) {
      grandes++
    } else if ((/[0-9]/).test(letra)) {
      numeros++
    }
  }

  if (pequenas == 0 || grandes == 0 || numeros == 0) {
    mensa.push("Erro... código deve possuir letras e números!!")
  }

  return mensa
}

router.post("/", async (req, res) => {
  const { codigodoCliente, codigodoLivro, datadaReserva, datadaEntrega, clienteId, livroId } = req.body;

  if (!codigodoCliente || !codigodoLivro || !datadaReserva || !datadaEntrega || !clienteId || !livroId) {
    res.status(400).json({ erro: "Informe codigodoCliente, codigodoLivro, datadaReserva, datadaEntrega, clienteId, livroId" });
    return;
  }

  const erros = validaReserva(codigodoCliente);
  if (erros.length > 0) {
    res.status(400).json({ erro: erros.join("; ") });
    return;
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(codigodoCliente, salt);

  let dataReservaFormatada = new Date(datadaReserva);
  let dataEntregaFormatada = new Date(datadaEntrega);

  if (isNaN(dataReservaFormatada.getTime()) || isNaN(dataEntregaFormatada.getTime())) {
    res.status(400).json({ erro: "Data inválida" });
    return;
  }

  try {
    const reserva = await prisma.reserva.create({
      data: {
        codigodoCliente: hash,
        codigodoLivro,
        datadaReserva: dataReservaFormatada.toISOString(),
        datadaEntrega: dataEntregaFormatada.toISOString(),
        cliente: { connect: { id: clienteId } },
        livro: { connect: { id: livroId } },
      },
    });
    console.log("Reserva criada com sucesso:", reserva);
    res.status(201).json(reserva);
  } catch (error) {
    console.error("Erro ao criar reserva:", error);
    res.status(400).json({ erro: "Erro ao criar reserva" });
  }
})

// Defina a rota para login fora da outra rota
router.post("/reserva/logReserva", async (req, res) => {
  const { codigodoCliente, codigodoLivro } = req.body
  const mensaPadrao = "Código do Cliente ou Código do Livro incorretos"

  if (!codigodoCliente || !codigodoLivro) {
    res.status(400).json({ erro: mensaPadrao })
    return
  }

  try {
    const reserva = await prisma.reserva.findFirst({
      where: { codigodoCliente }
    })

    if (reserva == null) {
      res.status(400).json({ erro: mensaPadrao })
      return
    }

    if (bcrypt.compareSync(codigodoCliente, reserva.codigodoCliente)) {
      res.status(200).json({
        id: reserva.id,
        codigodoCliente: reserva.codigodoCliente,
        codigodoLivro: reserva.codigodoLivro
      })
    } else {
      res.status(400).json({ erro: mensaPadrao })
    }
  } catch (error) {
    res.status(400).json(error)
  }
})

export default router
